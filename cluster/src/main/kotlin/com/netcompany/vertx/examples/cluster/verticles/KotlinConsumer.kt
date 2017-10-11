package com.netcompany.vertx.examples.cluster.verticles

import com.netcompany.vertx.examples.cluster.EventBusVerticle
import io.vertx.core.AbstractVerticle
import io.vertx.core.CompositeFuture
import io.vertx.core.Future
import io.vertx.core.eventbus.MessageConsumer
import io.vertx.core.json.JsonObject
import io.vertx.core.logging.Logger
import io.vertx.core.logging.LoggerFactory

class KotlinConsumer : AbstractVerticle() {
    private val logger: Logger = LoggerFactory.getLogger(javaClass.simpleName)

    private var publishConsumer: MessageConsumer<JsonObject>? = null
    private var sendConsumer: MessageConsumer<JsonObject>? = null

    override fun start(startFuture: Future<Void>?) {
        setConsumers(startFuture)
    }

    private fun setConsumers(startFuture: Future<Void>?) {
        publishConsumer = vertx.eventBus().consumer<JsonObject>(EventBusVerticle.EXAMPLE_PUBLISH_ADDRESS, { message ->
            logger.info("Received publish message: " + message.body().encode())
        })

        val publishFuture: Future<Void> = Future.future()

        if (publishConsumer == null) {
            publishFuture.fail("Publish Consumer is null!")
        } else {
            publishConsumer?.completionHandler(publishFuture.completer())
        }

        sendConsumer = vertx.eventBus().consumer<JsonObject>(EventBusVerticle.EXAMPLE_SEND_ADDRESS, { message ->
            logger.info("Received send message from: " + message.replyAddress() +
                    " with " + message.body().encode())

            message.reply(JsonObject().put("replier", "Kotlin"))
        })

        val sendFuture: Future<Void> = Future.future()

        if (sendConsumer == null) {
            sendFuture.fail("Send Consumer is null!")
        } else {
            sendConsumer?.completionHandler(sendFuture.completer())
        }

        CompositeFuture.any(listOf(publishFuture, sendFuture)).setHandler({ res ->
            if (res.failed()) {
                logger.error("Unable to publish consumers!", res.cause())

                startFuture?.fail(res.cause())
            } else {
                startFuture?.complete()
            }
        })
    }

    override fun stop(stopFuture: Future<Void>?) {
        stopConsumers(stopFuture)
    }

    private fun stopConsumers(stopFuture: Future<Void>?) {
        val publishFuture: Future<Void> = Future.future()
        val sendFuture: Future<Void> = Future.future()

        if (publishConsumer == null) {
            publishFuture.fail("Publish Consumer is null!")
        } else {
            publishConsumer?.unregister(publishFuture.completer())
        }

        if (sendConsumer == null) {
            sendFuture.fail("Send Consumer is null!")
        } else {
            sendConsumer?.unregister(sendFuture.completer())
        }

        CompositeFuture.all(listOf(publishFuture, sendFuture)).setHandler({ unregister ->
            if (unregister.failed()) {
                logger.error("Failed deregister!", unregister.cause())

                stopFuture?.fail(unregister.cause())
            } else {
                logger.info("All Consumers unregistered!")

                stopFuture?.complete()
            }
        })
    }
}