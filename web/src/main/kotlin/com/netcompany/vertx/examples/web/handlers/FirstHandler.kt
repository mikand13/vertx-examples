package com.netcompany.vertx.examples.web.handlers

import io.vertx.core.Handler
import io.vertx.ext.web.RoutingContext

class FirstHandler : Handler<RoutingContext> {
    override fun handle(event: RoutingContext) {
        //TODO Implement something interesting here, then pass execution on to the next handler!

        event.next()
    }
}