package com.netcompany.vertx.examples.base;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Future;
import io.vertx.core.json.JsonObject;
import io.vertx.core.logging.Logger;
import io.vertx.core.logging.LoggerFactory;

public class JavaVerticle extends AbstractVerticle {
    private final Logger logger = LoggerFactory.getLogger(JavaVerticle.class.getSimpleName());

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
                setTimedHello();

                startFuture.complete();
            }
        });
    }

    private void setTimedHello() {
        long millis = System.currentTimeMillis();

        logger.info("Hello from Java!");

        vertx.setPeriodic(30000L, aLong ->
                logger.info("Hello from Java after: " + (System.currentTimeMillis() - millis) + "!"));
    }
}
