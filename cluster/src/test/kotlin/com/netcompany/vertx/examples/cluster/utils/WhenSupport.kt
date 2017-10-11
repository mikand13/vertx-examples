package com.netcompany.vertx.examples.cluster.utils

import io.restassured.specification.RequestSpecification

interface WhenSupport {
    fun RequestSpecification.When(): RequestSpecification {
        return this.`when`()
    }
}