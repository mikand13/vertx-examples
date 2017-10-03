var logger = Java.type("io.vertx.core.logging.LoggerFactory").getLogger("JsVerticle");

exports.vertxStartAsync = function(startFuture) {
    var config = vertx.getOrCreateContext().config();
    var port = config.ports.js;
    if (port === 'undefined') port = 8081;

    vertx.createHttpServer().requestHandler(function (req) {
        req.response()
            .putHeader("content-type", "text/plain")
            .end("Hello from JS Vert.x!");
    }).listen(port, function (res, err) {
        if (err) {
            startFuture.fail(err);
        } else {
            startFuture.complete();

            setTimedHello();
        }
    });
};

function setTimedHello() {
    vertx.setPeriodic(1000, function (id) {
        logger.info("Hello from JS!");
    });
}