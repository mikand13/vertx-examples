package com.netcompany.vertx.examples.serviceproxies.verticles

import com.netcompany.vertx.examples.serviceproxies.services.HeartBeatService
import com.netcompany.vertx.examples.serviceproxies.services.HeartBeatServiceImpl
import io.vertx.core.AbstractVerticle
import io.vertx.core.Future
import io.vertx.core.eventbus.MessageConsumer
import io.vertx.core.json.Json
import io.vertx.core.json.JsonObject
import io.vertx.core.logging.Logger
import io.vertx.core.logging.LoggerFactory
import io.vertx.serviceproxy.ProxyHelper
import io.vertx.ext.web.Router
import io.vertx.ext.web.handler.CookieHandler
import io.vertx.ext.web.handler.sockjs.BridgeEventType.*
import io.vertx.ext.web.handler.sockjs.BridgeOptions
import io.vertx.ext.web.handler.sockjs.PermittedOptions
import io.vertx.ext.web.handler.sockjs.SockJSHandler
import io.vertx.kotlin.ext.web.handler.sockjs.SockJSHandlerOptions
import java.util.ArrayList




class EventbusVerticle : AbstractVerticle() {
    private val logger: Logger = LoggerFactory.getLogger(javaClass.simpleName)

    private val heartBeat = HeartBeatServiceImpl()
    private var registerService: MessageConsumer<JsonObject>? = null
    private var ebHandler: SockJSHandler? = null

    override fun start(startFuture: Future<Void>?) {
        val router: Router = Router.router(vertx)
        router.get("/").handler({ context ->
            context.response()
                    .putHeader("content-type", "text/plain")
                    .end("Hello from Java Vert.x!")
        })

        val ports = config().getJsonObject("ports")
        val javaPort = if (ports?.getInteger("java") != null) ports.getInteger("java") else 8080

        vertx.createHttpServer().requestHandler(router::accept).listen(javaPort!!) { listenRes ->
            if (listenRes.failed()) {
                startFuture?.fail(listenRes.cause())
            } else {
                deployHeartBeatService()

                deployBridge(router)

                startFuture?.complete()
            }
        }
    }

    private fun deployHeartBeatService() {
        registerService = ProxyHelper.registerService(HeartBeatService::class.java, vertx, heartBeat, "com.netcompany.heart")

        logger.info("Deployed HeartBeatService")
    }

    private fun deployBridge(router: Router) {
        val options = SockJSHandlerOptions()
                .setHeartbeatInterval(150000L)
                .setInsertJSESSIONID(false)

        ebHandler = SockJSHandler.create(vertx, options)
        ebHandler?.bridge(createBridgeOptions(), { bridgeEvent ->
            logger.debug("Event received from external client!")

            if (bridgeEvent.type() != null) {
                when (bridgeEvent.type()) {
                    SEND -> {
                        logger.debug("Send Event is: " + Json.encodePrettily(bridgeEvent))

                        bridgeEvent.complete(true)
                    }

                    PUBLISH -> {
                        logger.debug("Publish Event is: " + Json.encodePrettily(bridgeEvent))

                        bridgeEvent.complete(true)
                    }

                    RECEIVE -> {
                        logger.debug("Receive Event is: " + Json.encodePrettily(bridgeEvent))

                        bridgeEvent.complete(true)
                    }

                    REGISTER -> {
                        logger.debug("Register Event is: " + Json.encodePrettily(bridgeEvent))

                        bridgeEvent.complete(true)
                    }

                    UNREGISTER -> {
                        logger.debug("UnRegister Event is: " + Json.encodePrettily(bridgeEvent))

                        bridgeEvent.complete(true)
                    }

                    SOCKET_IDLE -> {
                        logger.debug("Socket Idle Event is: " + Json.encodePrettily(bridgeEvent))

                        bridgeEvent.complete(true)
                    }

                    SOCKET_PING -> {
                        logger.debug("Socket Ping Event is: " + Json.encodePrettily(bridgeEvent))

                        bridgeEvent.complete(true)
                    }

                    SOCKET_CLOSED -> {
                        logger.debug("Socket Closed Event is: " + Json.encodePrettily(bridgeEvent))

                        bridgeEvent.complete(true)
                    }

                    SOCKET_CREATED -> {
                        logger.debug("Socket Created Event is: " + Json.encodePrettily(bridgeEvent))

                        bridgeEvent.complete(true)
                    }

                    else -> {
                        logger.error("Unknown bridgevent!")

                        bridgeEvent.complete(true)
                    }
                }
            } else {
                logger.error("Type is null!, Message is: " + Json.encodePrettily(bridgeEvent))
            }
        })

        router.route("/eventbus/*").handler(CookieHandler.create())
        router.route("/eventbus/*").handler(ebHandler)
    }

    private fun createBridgeOptions(): BridgeOptions {
        val opts = BridgeOptions()
        opts.setInboundPermitted(createInAdresses())
        opts.setOutboundPermitted(createOutAdresses())

        return opts
    }

    private fun createInAdresses(): List<PermittedOptions> {
        val permissions = ArrayList<PermittedOptions>()
        permissions.add(PermittedOptions().setAddress("com.netcompany.heart"))

        return permissions
    }

    private fun createOutAdresses(): List<PermittedOptions> {
        val permissions = ArrayList<PermittedOptions>()
        permissions.add(PermittedOptions().setAddress("com.netcompany.heart"))

        return permissions
    }

    override fun stop(stopFuture: Future<Void>?) {
        undeployHeartBeatService()

        super.stop(stopFuture)
    }

    private fun undeployHeartBeatService() {
        ProxyHelper.unregisterService(registerService)

        logger.info("UnDeployed HeartBeatService")
    }
}