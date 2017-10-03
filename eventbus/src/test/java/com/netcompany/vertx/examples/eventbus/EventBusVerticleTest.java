package com.netcompany.vertx.examples.eventbus;

import com.netcompany.vertx.examples.eventbus.utils.ConfigSupportJava;
import io.vertx.core.DeploymentOptions;
import io.vertx.core.Vertx;
import io.vertx.core.json.JsonObject;
import io.vertx.core.logging.Logger;
import io.vertx.core.logging.LoggerFactory;
import io.vertx.ext.unit.Async;
import io.vertx.ext.unit.TestContext;
import io.vertx.ext.unit.junit.VertxUnitRunner;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

import static junit.framework.Assert.assertNotNull;
import static junit.framework.TestCase.assertTrue;

@RunWith(VertxUnitRunner.class)
public class EventBusVerticleTest implements ConfigSupportJava {
    private final Logger logger = LoggerFactory.getLogger(EventBusVerticleTest.class.getSimpleName());
    private Vertx vertx;

    @Before
    public void setUp(TestContext context) {
        Async async = context.async();

        vertx = Vertx.vertx();
        vertx.deployVerticle(new MainVerticle(), new DeploymentOptions().setConfig(getTestConfig()), deployRes -> {
            if (deployRes.failed()) {
                logger.error("Failed deployment of EventBusVerticle!", deployRes.cause());
            }

            async.complete();
        });
    }

    @After
    public void tearDown() {
        vertx.close();
    }

    @Test(timeout = 20000L)
    public void testEventbusVerticlePublish(TestContext context) throws Exception {
        Async async = context.async();

        vertx.eventBus().<JsonObject>consumer(EventBusVerticle.EXAMPLE_PUBLISH_ADDRESS, message -> {
            assertNotNull(message.body().getString("testKey"));
            assertTrue(message.body().getString("testKey").equals("testValue"));

            async.complete();
        });
    }

    @Test(timeout = 5000L)
    public void testEventbusVerticleSend(TestContext context) throws Exception {
        Async async = context.async();

        vertx.eventBus().<JsonObject>consumer(EventBusVerticle.EXAMPLE_SEND_ADDRESS, message -> {
            assertNotNull(message.body().getString("testKey"));
            assertTrue(message.body().getString("testKey").equals("testValue"));

            async.complete();
        });
    }
}