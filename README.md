# vertx-examples
Vertx Examples of Basic Concepts 

Presentation: [https://docs.google.com/presentation/d/1sX5nZ65EgZuaWkNwj1y0E-pXKWdmzJJoUuFtcDbEI-c/edit?usp=sharing]

## Required Dependencies for all Examples (Varies from example to example)

- Docker
- Docker-Compose
- Java
- Node

### base

This example shows how we can run multiple verticles from different languages side by side, effortlessly.

- Java
- Kotlin
- Ruby
- JavaScript

Test: ./gradlew clean test

Run: ./gradlew clean run

### eventbus

---

This example shows how we can set up consumers and producers for eventbus messages, both sending and receiving in multiple veritcles in multiple languages.

Test: ./gradlew clean test

Run: ./gradlew clean run

### web

---

This example shows som simple routing for vertx-web and the way we chain handlers for building a request response.

Test: ./gradlew clean test

Run: ./gradlew clean run

### service-proxies

---

This example shows how to define an interface for auto-generating a service-proxy, and what you must include to auto-gen the proxies and clients you need. Includes a test for client side javascript. 

Test: ./gradlew clean test

Run: ./gradlew clean run

### cluster

---

This examples binds everything together and focuses on showing consumer/producer and service proxy communication cluster-wide.

Test: ./gradlew clean test

Run: ./gradlew clean shadowJar docker && docker-compose up
