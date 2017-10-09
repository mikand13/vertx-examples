package com.netcompany.vertx.examples.serviceproxies.services;

import io.vertx.codegen.annotations.DataObject;
import io.vertx.core.json.JsonObject;

import static com.netcompany.vertx.examples.serviceproxies.services.HeartBeatPOJOConverter.fromJson;

@DataObject(generateConverter = true)
public class HeartBeatPOJO {
    private Boolean ping;

    public HeartBeatPOJO(Boolean ping) {
        this.ping = ping;
    }

    public HeartBeatPOJO(JsonObject heartBeatPojo) {
        fromJson(heartBeatPojo, this);
    }

    public JsonObject toJson() {
        return JsonObject.mapFrom(this);
    }

    public Boolean getPing() {
        return ping;
    }

    public void setPing(Boolean ping) {
        this.ping = ping;
    }
}
