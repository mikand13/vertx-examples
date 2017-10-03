var logger = Java.type("io.vertx.core.logging.LoggerFactory").getLogger("JsVerticle");

exports.vertxStartAsync = function(startFuture) {
    var config = vertx.getOrCreateContext().config();
    var ports = config.ports;
    var port = 8081;

    if (ports != null && ports.js != null) {
        port = ports.js
    }

    vertx.createHttpServer().requestHandler(function (req) {
        req.response()
            .putHeader("content-type", "text/plain")
            .end("Hello from JS Vert.x!");
    }).listen(port, function (res, err) {
        if (err) {
            startFuture.fail(err);
        } else {
            setTimedHello();

            startFuture.complete();
        }
    });
};

function setTimedHello() {
    var millis = new Date().getTime();

    logger.info("Hello from JS!");

    vertx.setPeriodic(30000, function (id) {
        logger.info("Hello from JS after " + (new Date().getTime() - millis) + "!");
    });
}