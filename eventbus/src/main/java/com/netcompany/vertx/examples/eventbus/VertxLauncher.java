package com.netcompany.vertx.examples.eventbus;

import io.vertx.core.DeploymentOptions;
import io.vertx.core.Vertx;
import io.vertx.core.VertxOptions;
import io.vertx.core.impl.launcher.VertxCommandLauncher;
import io.vertx.core.impl.launcher.VertxLifecycleHooks;
import io.vertx.core.json.JsonObject;

public class VertxLauncher extends VertxCommandLauncher implements VertxLifecycleHooks {
    /**
     * Main entry point.
     *
     * @param args the user command line arguments.
     */
    public static void main(String[] args) {
        new VertxLauncher().dispatch(args);
    }

    /**
     * Utility method to execute a specific command.
     *
     * @param cmd  the command
     * @param args the arguments
     */
    public static void executeCommand(String cmd, String... args) {
        new VertxLauncher().execute(cmd, args);
    }

    @Override
    public void afterConfigParsed(JsonObject config) {

    }

    @Override
    public void beforeStartingVertx(VertxOptions options) {

    }

    @Override
    public void afterStartingVertx(Vertx vertx) {

    }

    @Override
    public void beforeDeployingVerticle(DeploymentOptions deploymentOptions) {

    }

    @Override
    public void beforeStoppingVertx(Vertx vertx) {

    }

    @Override
    public void afterStoppingVertx() {

    }

    @Override
    public void handleDeployFailed(Vertx vertx, String mainVerticle, DeploymentOptions deploymentOptions, Throwable cause) {

    }
}
