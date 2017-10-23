package com.netcompany.vertx.examples.cluster

import com.netcompany.vertx.examples.cluster.utils.ConfigSupport
import com.netcompany.vertx.examples.cluster.utils.WhenSupport
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
    private var vertx: Vertx? = null

    companion object {
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
        vertx?.deployVerticle(MainVerticle(), DeploymentOptions().setConfig(config), { deployRes ->
            if (deployRes.failed()) {
                logger.error("Could not deploy application!", deployRes.cause())
            }

            async.complete()
        })
    }

    @After
    fun tearDown(context: TestContext) {
        val async = context.async()

        vertx?.close({ async.complete() })
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