package com.netcompany.vertx.examples.web.handlers

import io.vertx.core.Handler
import io.vertx.ext.web.RoutingContext

class StarHandler : Handler<RoutingContext> {
    override fun handle(event: RoutingContext?) {
        //TODO Another handler

        event?.next()
    }
}