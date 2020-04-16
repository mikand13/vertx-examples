package com.netcompany.vertx.examples.eventbus

import com.netcompany.vertx.examples.eventbus.verticles.KotlinConsumer
import io.vertx.core.AbstractVerticle
import io.vertx.core.CompositeFuture
import io.vertx.core.DeploymentOptions
import io.vertx.core.Future
import io.vertx.core.logging.Logger
import io.vertx.core.logging.LoggerFactory

class MainVerticle : AbstractVerticle() {
    private val logger: Logger = LoggerFactory.getLogger(javaClass.simpleName)

    override fun start(startFuture: Future<Void>) {
        logger.debug("Config is: " + config().encodePrettily())

        val javaFuture: Future<String> = Future.future()
        val jsFuture: Future<String> = Future.future()
        val rubyFuture: Future<String> = Future.future()

        vertx.deployVerticle(KotlinConsumer(), DeploymentOptions().setConfig(config()), javaFuture)
        vertx.deployVerticle("js/javaScriptConsumerVerticle.js", DeploymentOptions().setConfig(config()), jsFuture)
        vertx.deployVerticle("ruby/ruby_consumer_verticle.rb", DeploymentOptions().setConfig(config()), rubyFuture)

        CompositeFuture.all(javaFuture, jsFuture, rubyFuture).setHandler {
            when {
                it.failed() -> startFuture.fail(it.cause())
                else -> deployEventBusVerticle(startFuture)
            }
        }
    }

    private fun deployEventBusVerticle(startFuture: Future<Void>) = vertx.deployVerticle(EventBusVerticle()) {
        when {
            it.failed() -> startFuture.fail(it.cause())
            else -> {
                startFuture.complete()

                logger.info("All verticles running, deployment complete!")
            }
        }
    }
}