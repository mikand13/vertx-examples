package com.netcompany.vertx.examples.serviceproxies

import com.netcompany.vertx.examples.serviceproxies.verticles.EventbusVerticle
import io.vertx.core.AbstractVerticle
import io.vertx.core.CompositeFuture
import io.vertx.core.DeploymentOptions
import io.vertx.core.Future
import io.vertx.core.logging.Logger
import io.vertx.core.logging.LoggerFactory

class MainVerticle : AbstractVerticle () {
    private val logger: Logger = LoggerFactory.getLogger(javaClass.simpleName)

    override fun start(startFuture: Future<Void>) {
        logger.debug("Config is: " + config().encodePrettily())

        vertx.deployVerticle(EventbusVerticle(), { eventBusRes ->
            if (eventBusRes.failed()) {
                startFuture.fail(eventBusRes.cause())
            } else {
                startRubyAndJs(startFuture)
            }
        })
    }

    private fun startRubyAndJs(startFuture: Future<Void>) {
        val rubyFuture : Future<String> = Future.future()
        val jsFuture : Future<String> = Future.future()

        vertx.deployVerticle("js/javaScriptConsumerVerticle.js", DeploymentOptions().setConfig(config()), jsFuture.completer())
        vertx.deployVerticle("ruby/ruby_consumer_verticle.rb", DeploymentOptions().setConfig(config()), rubyFuture.completer())

        CompositeFuture.all(rubyFuture, jsFuture).setHandler({ depRes ->
            if (depRes.failed()) {
                startFuture.fail(depRes.cause())
            } else {
                logger.info("All verticles running, deployment complete!")

                startFuture.complete()
            }
        })
    }
}