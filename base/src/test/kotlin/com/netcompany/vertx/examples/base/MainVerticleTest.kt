package com.netcompany.vertx.examples.base

import com.netcompany.vertx.examples.base.utils.ConfigSupport
import com.netcompany.vertx.examples.base.utils.WhenSupport
import io.restassured.RestAssured
import io.restassured.RestAssured.given
import io.vertx.core.DeploymentOptions
import io.vertx.core.Vertx
import io.vertx.core.logging.Logger
import io.vertx.core.logging.LoggerFactory
import io.vertx.ext.unit.TestContext
import io.vertx.ext.unit.junit.VertxUnitRunner
import org.hamcrest.CoreMatchers.equalTo
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
    fun tearDown() {
        vertx?.close()
    }

    @Test
    fun testHelloWorld() {
        testLanguage(8080, "Java")
        testLanguage(8081, "JS")
        testLanguage(8082, "Ruby")
    }

    fun testLanguage(port: Int, language: String) {
        RestAssured.port = port

        given().
        When().
                get("").
        then().
                statusCode(200).
                body(equalTo("Hello from $language Vert.x!"))
    }
}