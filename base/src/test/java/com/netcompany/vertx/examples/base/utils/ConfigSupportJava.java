package com.netcompany.vertx.examples.base.utils;

import io.vertx.core.json.JsonObject;
import org.jetbrains.annotations.NotNull;

import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Paths;

public interface ConfigSupportJava extends ConfigSupport {
    @SuppressWarnings("ConstantConditions")
    @NotNull
    @Override
    default JsonObject getTestConfig() {
        try {
            byte[] encoded = Files.readAllBytes(
                    Paths.get(getClass().getClassLoader().getResource("app-conf.json")
                            .toURI()));

            return new JsonObject(new String(encoded));
        } catch (IOException | NullPointerException | URISyntaxException e) {
            e.printStackTrace();

            return new JsonObject();
        }
    }
}
