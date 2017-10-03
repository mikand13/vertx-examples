var logger = Java.type("io.vertx.core.logging.LoggerFactory").getLogger("JsVerticle");
var EXAMPLE_PUBLISH_ADDRESS = "com.netcompany.vertx.example.publish";
var EXAMPLE_SEND_ADDRESS = "com.netcompany.vertx.example.send";

var publishConsumer, sendConsumer;

exports.vertxStartAsync = function(startFuture) {
    setConsumers();

    startFuture.complete();
};

exports.vertxStopAsync = function(startFuture) {
    stopConsumers();

    startFuture.complete();
};

function setConsumers() {
    var eb = vertx.eventBus();

    publishConsumer = eb.consumer(EXAMPLE_PUBLISH_ADDRESS, function (message) {
        logger.info("Received publish: " + JSON.stringify(message.body()))
    });

    sendConsumer = eb.consumer(EXAMPLE_SEND_ADDRESS, function (message) {
        logger.info("Received send message from: " + message.replyAddress() + " with " + JSON.stringify(message.body()));

        message.reply({ "replier" : "JavaScript" });
    });
}

function stopConsumers() {
    publishConsumer.unregister();
    sendConsumer.unregister();
}
