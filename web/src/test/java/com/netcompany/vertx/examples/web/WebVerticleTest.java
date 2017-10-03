package com.netcompany.vertx.examples.web;

import com.netcompany.vertx.examples.web.utils.ConfigSupportJava;
import io.vertx.core.DeploymentOptions;
import io.vertx.core.Vertx;
import io.vertx.core.logging.Logger;
import io.vertx.core.logging.LoggerFactory;
import io.vertx.ext.unit.Async;
import io.vertx.ext.unit.TestContext;
import io.vertx.ext.unit.junit.VertxUnitRunner;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

import static io.restassured.RestAssured.given;

@RunWith(VertxUnitRunner.class)
public class WebVerticleTest implements ConfigSupportJava {
    private final Logger logger = LoggerFactory.getLogger(WebVerticleTest.class.getSimpleName());
    private Vertx vertx;

    @Before
    public void setUp(TestContext context) {
        Async async = context.async();

        vertx = Vertx.vertx();
        vertx.deployVerticle(new WebVerticle(), new DeploymentOptions().setConfig(getTestConfig()), deployRes -> {
            if (deployRes.failed()) {
                logger.error("Failed deployment of WebVerticle!", deployRes.cause());
            }

            async.complete();
        });
    }

    @After
    public void tearDown() {
        vertx.close();
    }

    @Test
    public void testWebVerticle() throws Exception {
        testPath("/");
        testPath("/first");
        testPath("/anything/after/this/is/okay");
    }

    private void testPath(String path) {
        given().
                port(8080).
        when().
                get("http://localhost" + path).
        then().
                statusCode(200);
    }
}