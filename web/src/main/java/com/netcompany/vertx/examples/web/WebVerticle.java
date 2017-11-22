package com.netcompany.vertx.examples.web;

import com.netcompany.vertx.examples.web.handlers.EndHandler;
import com.netcompany.vertx.examples.web.handlers.FirstHandler;
import com.netcompany.vertx.examples.web.handlers.RootHandler;
import com.netcompany.vertx.examples.web.handlers.StarHandler;
import io.vertx.core.AbstractVerticle;
import io.vertx.core.Future;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;

public class WebVerticle extends AbstractVerticle {
    @Override
    public void start(Future<Void> startFuture) {
        Router router = Router.router(vertx);

        setRoutes(router);

        JsonObject ports = config().getJsonObject("ports");
        Integer javaPort = ports != null && ports.getInteger("java") != null ? ports.getInteger("java") : 8080;

        vertx.createHttpServer().requestHandler(router::accept).listen(javaPort, listenRes -> {
            if (listenRes.failed()) {
                startFuture.fail(listenRes.cause());
            } else {
                startFuture.complete();
            }
        });
    }

    private void setRoutes(Router router) {
        router.get("/").handler(new RootHandler());
        router.get("/first").handler(new FirstHandler());
        router.get("/first").handler(new EndHandler());

        Router anythingRouter = Router.router(vertx);
        anythingRouter.get("/after/this*").handler(new StarHandler());
        anythingRouter.get("/after/this*").handler(new EndHandler());

        router.mountSubRouter("/anything", anythingRouter);
    }
}
