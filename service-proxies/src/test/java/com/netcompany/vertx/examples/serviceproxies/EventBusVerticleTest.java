package com.netcompany.vertx.examples.serviceproxies;

import com.netcompany.vertx.examples.serviceproxies.services.HeartBeatService;
import com.netcompany.vertx.examples.serviceproxies.utils.ConfigSupportJava;
import io.vertx.core.DeploymentOptions;
import io.vertx.core.Vertx;
import io.vertx.core.json.Json;
import io.vertx.core.logging.Logger;
import io.vertx.core.logging.LoggerFactory;
import io.vertx.ext.unit.Async;
import io.vertx.ext.unit.TestContext;
import io.vertx.ext.unit.junit.VertxUnitRunner;
import io.vertx.serviceproxy.ProxyHelper;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

import static junit.framework.Assert.assertTrue;

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

    @Test
    public void testHeartBeat(TestContext context) {
        Async async = context.async();

        final HeartBeatService proxy = ProxyHelper.createProxy(HeartBeatService.class, vertx, "com.netcompany.heart");

        proxy.ping(pingRes -> {
            assertTrue(pingRes.result().getPing());
            async.complete();
        });
    }
}