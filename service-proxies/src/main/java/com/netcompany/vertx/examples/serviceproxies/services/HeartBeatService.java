package com.netcompany.vertx.examples.serviceproxies.services;

import io.vertx.codegen.annotations.ProxyGen;
import io.vertx.codegen.annotations.VertxGen;
import io.vertx.core.AsyncResult;
import io.vertx.core.Handler;
import io.vertx.core.Vertx;
import io.vertx.serviceproxy.ProxyHelper;

@ProxyGen
@VertxGen
public interface HeartBeatService {
    static HeartBeatService createProxy(Vertx vertx, String address) {
        return ProxyHelper.createProxy(HeartBeatService.class, vertx, address);
    }

    void ping(Handler<AsyncResult<HeartBeatPOJO>> pingHandler);
}