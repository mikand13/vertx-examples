package com.netcompany.vertx.examples.cluster;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Future;
import io.vertx.core.eventbus.Message;
import io.vertx.core.json.JsonObject;
import io.vertx.core.logging.Logger;
import io.vertx.core.logging.LoggerFactory;

import java.net.InetAddress;
import java.net.UnknownHostException;

public class EventBusVerticle extends AbstractVerticle {
    private final Logger logger = LoggerFactory.getLogger(EventBusVerticle.class.getSimpleName());

    public final static String EXAMPLE_PUBLISH_ADDRESS = "com.netcompany.vertx.example.publish";
    public final static String EXAMPLE_SEND_ADDRESS = "com.netcompany.vertx.example.send";

    @Override
    public void start(Future<Void> startFuture) {
        JsonObject ports = config().getJsonObject("ports");
        Integer javaPort = ports != null && ports.getInteger("java") != null ? ports.getInteger("java") : 8080;

        vertx.createHttpServer().requestHandler(req -> req.response()
                .putHeader("content-type", "text/plain")
                .end("Hello from Java Vert.x!")
        ).listen(javaPort, listenRes -> {
            if (listenRes.failed()) {
                startFuture.fail(listenRes.cause());
            } else {
                setPeriodicPublisher();

                startFuture.complete();
            }
        });
    }

    private void setPeriodicPublisher() {
        try {
            JsonObject data = new JsonObject()
                    .put("testKey", "testValue")
                    .put("host", InetAddress.getLocalHost().getHostName());

            vertx.setPeriodic(10000L, aLong -> {
                logger.info("Sending publish with: " + data.encode());

                vertx.eventBus().publish(EXAMPLE_PUBLISH_ADDRESS, data);
            });

            vertx.setPeriodic(1000L, aLong -> vertx.eventBus().<JsonObject>send(EXAMPLE_SEND_ADDRESS, data, reply -> {
                if (reply.failed()) {
                    logger.error("Error in retreiving reply!", reply.cause());
                } else {
                    final Message<JsonObject> message = reply.result();

                    logger.info("Received reply from: " + message.body().getString("replier") +
                            " at " + message.address() + " with " + message.body().encode());
                }
            }));
        } catch (UnknownHostException e) {
            logger.error("Unable to build data!", e);
        }
    }
}
