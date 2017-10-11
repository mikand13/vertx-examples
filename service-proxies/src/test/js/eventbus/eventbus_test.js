var EventBus = require("vertx3-eventbus-client");
var HeartBeatService = require("../../../../assembly/eventbus/netcompanyExampleServices-js/heart_beat_service-proxy");

doEventBusTest();

function doEventBusTest () {
    var eb;

    return new Promise(function (resolve, reject) {
        eb = new EventBus("http://localhost:8080/eventbus");

        eb.onopen = function () {
            var heartbeat = new HeartBeatService(eb, "com.netcompany.heart");

            heartbeat.ping(function (error, result) {
                if (error === null) {
                    resolve(result);
                } else {
                    reject(error);
                }
            });

        };
    }).then(function (result) {
        eb.close();

        process.exit(result.ping === true ? 0 : -1);
    }).catch(function (error) {
        console.log(error);

        eb.close();

        process.exit(-1);
    });
}

function wait () {
    setTimeout(wait, 10000);
}

wait();