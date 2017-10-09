package com.netcompany.vertx.examples.base;

import io.vertx.core.*;
import io.vertx.core.json.JsonObject;
import io.vertx.core.logging.Logger;
import io.vertx.core.logging.LoggerFactory;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.IntStream;

import static java.util.stream.Collectors.toList;

public class JavaVerticle extends AbstractVerticle {
    private final Logger logger = LoggerFactory.getLogger(JavaVerticle.class.getSimpleName());

    @Override
    public void start(Future<Void> startFuture) {
        JsonObject ports = config().getJsonObject("ports");
        Integer javaPort = ports != null && ports.getInteger("java") != null ? ports.getInteger("java") : 8080;

        vertx.createHttpServer().requestHandler(req -> req.response()
                .putHeader("content-type", "text/plain")
                .end("Hello from Java Vert.x!")
        ).listen(javaPort, listenRes -> {
            if (listenRes.failed()) {
                startFuture.fail(listenRes.cause());
            } else {
                setTimedHello();

                doFutureExamples(startFuture);
            }
        });
    }

    private void setTimedHello() {
        long millis = System.currentTimeMillis();

        logger.info("Hello from Java!");

        vertx.setPeriodic(30000L, aLong ->
                logger.info("Hello from Java after: " + (System.currentTimeMillis() - millis) + "!"));
    }

    private void doFutureExamples(Future<Void> startFuture) {
        getListOfRandomStrings(20)
                .compose(this::parseAllStrings)
                .compose(list -> printListAndStart(list, startFuture.completer()),
                        startFuture);
    }

    private void printListAndStart(List<String> strings, Handler<AsyncResult<Void>> resultHandler) {
        strings.forEach(logger::info);

        logger.info("Starting Java Verticle!");

        resultHandler.handle(Future.succeededFuture());
    }

    @SuppressWarnings("SameParameterValue")
    private Future<List<String>> getListOfRandomStrings(int size) {
        Future<List<String>> listFuture = Future.future();

        createRandomList(size, listFuture.completer());

        return listFuture;
    }

    private void createRandomList(int size, Handler<AsyncResult<List<String>>> resultHandler) {
        final List<String> collect = IntStream.range(0, size)
                .mapToObj(i -> UUID.randomUUID().toString() + i)
                .collect(toList());

        resultHandler.handle(Future.succeededFuture(collect));
    }

    private <U> Future<List<U>> parseAllStrings(List<U> strings) {
        Future<List<U>> listFuture = Future.future();

        newUUIDFromOldUUID(strings, listFuture.completer());

        return listFuture;
    }

    @SuppressWarnings("unchecked")
    private <U> void newUUIDFromOldUUID(List<U> strings, Handler<AsyncResult<List<U>>> completer) {
        List<Future> futureList = new ArrayList<>();
        strings.forEach(s -> {
            Future<U> item = Future.future();

            processObject(s, item.completer());

            futureList.add(item);
        });

        CompositeFuture.all(futureList).setHandler(allRes ->
                completer.handle(Future.succeededFuture(futureList.stream()
                        .map(Future::result)
                        .map(o -> (U) o)
                        .collect(toList()))));
    }

    @SuppressWarnings("unchecked")
    private <U> void processObject(U s, Handler<AsyncResult<U>> resultHandler) {
        resultHandler.handle(Future.succeededFuture((U) UUID.fromString(s.toString()).toString()));
    }
}
