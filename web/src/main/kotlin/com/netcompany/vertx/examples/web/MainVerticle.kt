package com.netcompany.vertx.examples.web

import io.vertx.core.AbstractVerticle
import io.vertx.core.DeploymentOptions
import io.vertx.core.Future
import io.vertx.core.logging.Logger
import io.vertx.core.logging.LoggerFactory

class MainVerticle : AbstractVerticle () {
    private val logger: Logger = LoggerFactory.getLogger(javaClass.simpleName)

    override fun start(startFuture: Future<Void>) {
        logger.debug("Config is: " + config().encodePrettily())

        val javaFuture: Future<String> = Future.future()
        javaFuture.setHandler { res ->
            when {
                res.failed() -> startFuture.fail(res.cause())
                else -> {
                    startFuture.complete()

                    logger.info("All verticles running, deployment complete!")
                }
            }
        }

        vertx.deployVerticle(WebVerticle(), DeploymentOptions().setConfig(config()), javaFuture)
    }
}