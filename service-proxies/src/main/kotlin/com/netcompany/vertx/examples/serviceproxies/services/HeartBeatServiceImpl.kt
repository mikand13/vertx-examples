package com.netcompany.vertx.examples.serviceproxies.services

import io.vertx.core.AsyncResult
import io.vertx.core.Future
import io.vertx.core.Future.succeededFuture
import io.vertx.core.Handler

class HeartBeatServiceImpl : HeartBeatService {
    override fun ping(pingHandler: Handler<AsyncResult<HeartBeatPOJO>>) =
        pingHandler.handle(succeededFuture(HeartBeatPOJO(true)))
}