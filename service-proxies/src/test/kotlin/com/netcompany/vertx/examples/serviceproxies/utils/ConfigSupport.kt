package com.netcompany.vertx.examples.serviceproxies.utils

import io.vertx.core.json.JsonObject
import java.io.File

interface ConfigSupport {
    fun getTestConfig() : JsonObject {
        val configFile = File(this::class.java.classLoader.getResource("app-conf.json").toURI())

        return JsonObject(configFile.readText())
    }
}