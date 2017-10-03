package com.netcompany.vertx.examples.base;

import com.netcompany.vertx.examples.base.utils.ConfigSupportJava;
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
import static org.hamcrest.CoreMatchers.equalTo;

@RunWith(VertxUnitRunner.class)
public class JavaVerticleTest implements ConfigSupportJava {
    private final Logger logger = LoggerFactory.getLogger(JavaVerticleTest.class.getSimpleName());
    private Vertx vertx;

    @Before
    public void setUp(TestContext context) throws Exception {
        Async async = context.async();

        vertx = Vertx.vertx();
        vertx.deployVerticle(new JavaVerticle(), new DeploymentOptions().setConfig(getTestConfig()), deployRes -> {
            if (deployRes.failed()) {
                logger.error("Failed deployment of JavaVerticle!", deployRes.cause());
            }

            async.complete();
        });
    }

    @After
    public void tearDown() throws Exception {
        vertx.close();
    }

    @Test
    public void testJavaVerticle() throws Exception {
        given().
                port(8080).
        when().
            get("http://localhost").
        then().
                statusCode(200).
                body(equalTo("Hello from Java Vert.x!"));
    }
}