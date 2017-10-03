package com.netcompany.vertx.examples.web.handlers

import io.vertx.core.Handler
import io.vertx.ext.web.RoutingContext

class RootHandler : Handler<RoutingContext> {
    override fun handle(event: RoutingContext?) {
        event?.response()?.setStatusCode(200)?.end()
    }
}