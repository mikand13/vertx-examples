var HeartBeatService = require('generated/netcompanyExampleServices-js/heart_beat_service.js');
var service = HeartBeatService.createProxy(vertx, "com.netcompany.heart");

var logger = Java.type("io.vertx.core.logging.LoggerFactory").getLogger("JsVerticle");

exports.vertxStartAsync = function(startFuture) {
    logger.info("Starting JS Heartbeat verticle...");

    service.ping(function (result, error) {
        if (error == null) {
            logger.info("Ping from Heartbeat!");

            startFuture.complete();
        } else {
            logger.error("Unable to start JS Heartbeat Verticle!", error);

            startFuture.fail("Unable to ping heartbeat!");
        }
    });
};
