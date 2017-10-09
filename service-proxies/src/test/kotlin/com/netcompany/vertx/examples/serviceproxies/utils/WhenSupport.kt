package com.netcompany.vertx.examples.serviceproxies.utils

import io.restassured.specification.RequestSpecification

interface WhenSupport {
    fun RequestSpecification.When(): RequestSpecification {
        return this.`when`()
    }
}