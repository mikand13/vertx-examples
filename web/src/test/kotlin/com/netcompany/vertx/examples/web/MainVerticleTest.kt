package com.netcompany.vertx.examples.web

import com.netcompany.vertx.examples.web.utils.ConfigSupport
import com.netcompany.vertx.examples.web.utils.WhenSupport
import io.restassured.RestAssured
import io.restassured.RestAssured.given
import io.vertx.core.DeploymentOptions
import io.vertx.core.Vertx
import io.vertx.core.logging.Logger
import io.vertx.core.logging.LoggerFactory
import io.vertx.ext.unit.TestContext
import io.vertx.ext.unit.junit.VertxUnitRunner
import org.junit.After
import org.junit.Before
import org.junit.BeforeClass
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(VertxUnitRunner::class)
class MainVerticleTest : WhenSupport, ConfigSupport {
    private var logger: Logger = LoggerFactory.getLogger(MainVerticleTest::class.simpleName)
    private lateinit var vertx: Vertx

    companion object {
        @Suppress("unused")
        @BeforeClass
        fun beforeClass() {
            RestAssured.port = 8080
            RestAssured.baseURI = "http://localhost"
            RestAssured.basePath = "/"
        }
    }

    @Before
    fun setUp(context: TestContext) {
        val async = context.async()
        val config = getTestConfig()

        vertx = Vertx.vertx()
        vertx.deployVerticle(MainVerticle(), DeploymentOptions().setConfig(config)) {
            if (it.failed()) {
                logger.error("Could not deploy application!", it.cause())
            }

            async.complete()
        }
    }

    @After
    fun tearDown() {
        vertx.close()
    }

    @Test
    fun testHelloWorld() {
        given().
        When().
                get("").
        then().
                statusCode(200)
    }
}