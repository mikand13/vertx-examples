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

        vertx.deployVerticle(EventbusVerticle()) {
            when {
                it.failed() -> startFuture.fail(it.cause())
                else -> startRubyAndJs(startFuture)
            }
        }
    }

    private fun startRubyAndJs(startFuture: Future<Void>) {
        val rubyFuture : Future<String> = Future.future()
        val jsFuture : Future<String> = Future.future()

        vertx.deployVerticle("js/javaScriptConsumerVerticle.js", DeploymentOptions().setConfig(config()), jsFuture)
        vertx.deployVerticle("ruby/ruby_consumer_verticle.rb", DeploymentOptions().setConfig(config()), rubyFuture)

        CompositeFuture.all(rubyFuture, jsFuture).setHandler {
            when {
                it.failed() -> startFuture.fail(it.cause())
                else -> {
                    logger.info("All verticles running, deployment complete!")

                    startFuture.complete()
                }
            }
        }
    }
}