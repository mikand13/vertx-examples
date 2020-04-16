package com.netcompany.vertx.examples.eventbus.verticles

import com.netcompany.vertx.examples.eventbus.EventBusVerticle
import io.vertx.core.AbstractVerticle
import io.vertx.core.CompositeFuture
import io.vertx.core.Future
import io.vertx.core.eventbus.MessageConsumer
import io.vertx.core.json.JsonObject
import io.vertx.core.logging.Logger
import io.vertx.core.logging.LoggerFactory

class KotlinConsumer : AbstractVerticle() {
    private val logger: Logger = LoggerFactory.getLogger(javaClass.simpleName)

    private lateinit var publishConsumer: MessageConsumer<JsonObject>
    private lateinit var sendConsumer: MessageConsumer<JsonObject>

    override fun start(startFuture: Future<Void>) {
        setConsumers(startFuture)
    }

    override fun stop(stopFuture: Future<Void>) {
        stopConsumers(stopFuture)
    }

    private fun setConsumers(startFuture: Future<Void>) {
        val publishFuture: Future<Void> = Future.future()
        val sendFuture: Future<Void> = Future.future()

        publishConsumer = vertx.eventBus().consumer(EventBusVerticle.EXAMPLE_PUBLISH_ADDRESS) {
            logger.info("Received publish message: " + it.body().encode())
        }
        sendConsumer = vertx.eventBus().consumer(EventBusVerticle.EXAMPLE_SEND_ADDRESS) {
            logger.info(
                "Received send message from: " + it.replyAddress() +
                " with " + it.body().encode()
            )

            it.reply(JsonObject().put("replier", "Kotlin"))
        }

        publishConsumer.completionHandler(publishFuture)
        sendConsumer.completionHandler(sendFuture)

        CompositeFuture.any(listOf(publishFuture, sendFuture)).setHandler {
            when {
                it.failed() -> {
                    logger.error("Unable to publish consumers!", it.cause())

                    startFuture.fail(it.cause())
                }
                else -> startFuture.complete()
            }
        }
    }

    private fun stopConsumers(stopFuture: Future<Void>) {
        val publishFuture: Future<Void> = Future.future()
        val sendFuture: Future<Void> = Future.future()

        publishConsumer.unregister(publishFuture)
        sendConsumer.unregister(sendFuture)

        CompositeFuture.all(listOf(publishFuture, sendFuture)).setHandler {
            when {
                it.failed() -> {
                    logger.error("Failed deregister!", it.cause())

                    stopFuture.fail(it.cause())
                }
                else -> {
                    logger.info("All Consumers unregistered!")

                    stopFuture.complete()
                }
            }
        }
    }
}