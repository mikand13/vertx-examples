/*
 * Copyright 2014 Red Hat, Inc.
 *
 * Red Hat licenses this file to you under the Apache License, version 2.0
 * (the "License"); you may not use this file except in compliance with the
 * License.  You may obtain a copy of the License at:
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

/** @module vertx-js/http_client */
var utils = require('vertx-js/util/utils');
var HttpClientRequest = require('vertx-js/http_client_request');
var HttpClientResponse = require('vertx-js/http_client_response');
var Measured = require('vertx-js/measured');
var MultiMap = require('vertx-js/multi_map');
var ReadStream = require('vertx-js/read_stream');
var WebSocket = require('vertx-js/web_socket');
var Future = require('vertx-js/future');

var io = Packages.io;
var JsonObject = io.vertx.core.json.JsonObject;
var JHttpClient = Java.type('io.vertx.core.http.HttpClient');
var RequestOptions = Java.type('io.vertx.core.http.RequestOptions');

/**
 An asynchronous HTTP client.
 <p>
 It allows you to make requests to HTTP servers, and a single client can make requests to any server.
 <p>
 It also allows you to open WebSockets to servers.
 <p>
 The client can also pool HTTP connections.
 <p>
 @class
*/
var HttpClient = function(j_val) {

  var j_httpClient = j_val;
  var that = this;
  Measured.call(this, j_val);

  /**
   Whether the metrics are enabled for this measured object

   @public

   @return {boolean} true if the metrics are enabled
   */
  this.isMetricsEnabled = function() {
    var __args = arguments;
    if (__args.length === 0) {
      return j_httpClient["isMetricsEnabled()"]();
    } else throw new TypeError('function invoked with invalid arguments');
  };

  /**
   Create an HTTP request to send to the server at the specified host and port, specifying a response handler to receive
   the response

   @public
   @param method {Object} the HTTP method 
   @param port {number} the port 
   @param host {string} the host 
   @param requestURI {string} the relative URI 
   @param responseHandler {function} the response handler 
   @return {HttpClientRequest} an HTTP client request object
   */
  this.request = function() {
    var __args = arguments;
    if (__args.length === 2 && typeof __args[0] === 'string' && (typeof __args[1] === 'object' && __args[1] != null)) {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["request(io.vertx.core.http.HttpMethod,io.vertx.core.http.RequestOptions)"](io.vertx.core.http.HttpMethod.valueOf(__args[0]), __args[1] != null ? new RequestOptions(new JsonObject(Java.asJSONCompatible(__args[1]))) : null));
    }  else if (__args.length === 2 && typeof __args[0] === 'string' && typeof __args[1] === 'string') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["request(io.vertx.core.http.HttpMethod,java.lang.String)"](io.vertx.core.http.HttpMethod.valueOf(__args[0]), __args[1]));
    }  else if (__args.length === 3 && typeof __args[0] === 'string' && typeof __args[1] === 'string' && typeof __args[2] === 'string') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["request(io.vertx.core.http.HttpMethod,java.lang.String,java.lang.String)"](io.vertx.core.http.HttpMethod.valueOf(__args[0]), __args[1], __args[2]));
    }  else if (__args.length === 3 && typeof __args[0] === 'string' && (typeof __args[1] === 'object' && __args[1] != null) && typeof __args[2] === 'function') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["request(io.vertx.core.http.HttpMethod,io.vertx.core.http.RequestOptions,io.vertx.core.Handler)"](io.vertx.core.http.HttpMethod.valueOf(__args[0]), __args[1] != null ? new RequestOptions(new JsonObject(Java.asJSONCompatible(__args[1]))) : null, function(jVal) {
      __args[2](utils.convReturnVertxGen(HttpClientResponse, jVal));
    }));
    }  else if (__args.length === 3 && typeof __args[0] === 'string' && typeof __args[1] === 'string' && typeof __args[2] === 'function') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["request(io.vertx.core.http.HttpMethod,java.lang.String,io.vertx.core.Handler)"](io.vertx.core.http.HttpMethod.valueOf(__args[0]), __args[1], function(jVal) {
      __args[2](utils.convReturnVertxGen(HttpClientResponse, jVal));
    }));
    }  else if (__args.length === 4 && typeof __args[0] === 'string' && typeof __args[1] ==='number' && typeof __args[2] === 'string' && typeof __args[3] === 'string') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["request(io.vertx.core.http.HttpMethod,int,java.lang.String,java.lang.String)"](io.vertx.core.http.HttpMethod.valueOf(__args[0]), __args[1], __args[2], __args[3]));
    }  else if (__args.length === 4 && typeof __args[0] === 'string' && typeof __args[1] === 'string' && typeof __args[2] === 'string' && typeof __args[3] === 'function') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["request(io.vertx.core.http.HttpMethod,java.lang.String,java.lang.String,io.vertx.core.Handler)"](io.vertx.core.http.HttpMethod.valueOf(__args[0]), __args[1], __args[2], function(jVal) {
      __args[3](utils.convReturnVertxGen(HttpClientResponse, jVal));
    }));
    }  else if (__args.length === 5 && typeof __args[0] === 'string' && typeof __args[1] ==='number' && typeof __args[2] === 'string' && typeof __args[3] === 'string' && typeof __args[4] === 'function') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["request(io.vertx.core.http.HttpMethod,int,java.lang.String,java.lang.String,io.vertx.core.Handler)"](io.vertx.core.http.HttpMethod.valueOf(__args[0]), __args[1], __args[2], __args[3], function(jVal) {
      __args[4](utils.convReturnVertxGen(HttpClientResponse, jVal));
    }));
    } else throw new TypeError('function invoked with invalid arguments');
  };

  /**
   Create an HTTP request to send to the server using an absolute URI, specifying a response handler to receive
   the response

   @public
   @param method {Object} the HTTP method 
   @param absoluteURI {string} the absolute URI 
   @param responseHandler {function} the response handler 
   @return {HttpClientRequest} an HTTP client request object
   */
  this.requestAbs = function() {
    var __args = arguments;
    if (__args.length === 2 && typeof __args[0] === 'string' && typeof __args[1] === 'string') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["requestAbs(io.vertx.core.http.HttpMethod,java.lang.String)"](io.vertx.core.http.HttpMethod.valueOf(__args[0]), __args[1]));
    }  else if (__args.length === 3 && typeof __args[0] === 'string' && typeof __args[1] === 'string' && typeof __args[2] === 'function') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["requestAbs(io.vertx.core.http.HttpMethod,java.lang.String,io.vertx.core.Handler)"](io.vertx.core.http.HttpMethod.valueOf(__args[0]), __args[1], function(jVal) {
      __args[2](utils.convReturnVertxGen(HttpClientResponse, jVal));
    }));
    } else throw new TypeError('function invoked with invalid arguments');
  };

  /**
   Create an HTTP GET request to send to the server at the specified host and port, specifying a response handler to receive
   the response

   @public
   @param port {number} the port 
   @param host {string} the host 
   @param requestURI {string} the relative URI 
   @param responseHandler {function} the response handler 
   @return {HttpClientRequest} an HTTP client request object
   */
  this.get = function() {
    var __args = arguments;
    if (__args.length === 1 && (typeof __args[0] === 'object' && __args[0] != null)) {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["get(io.vertx.core.http.RequestOptions)"](__args[0] != null ? new RequestOptions(new JsonObject(Java.asJSONCompatible(__args[0]))) : null));
    }  else if (__args.length === 1 && typeof __args[0] === 'string') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["get(java.lang.String)"](__args[0]));
    }  else if (__args.length === 2 && typeof __args[0] === 'string' && typeof __args[1] === 'string') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["get(java.lang.String,java.lang.String)"](__args[0], __args[1]));
    }  else if (__args.length === 2 && (typeof __args[0] === 'object' && __args[0] != null) && typeof __args[1] === 'function') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["get(io.vertx.core.http.RequestOptions,io.vertx.core.Handler)"](__args[0] != null ? new RequestOptions(new JsonObject(Java.asJSONCompatible(__args[0]))) : null, function(jVal) {
      __args[1](utils.convReturnVertxGen(HttpClientResponse, jVal));
    }));
    }  else if (__args.length === 2 && typeof __args[0] === 'string' && typeof __args[1] === 'function') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["get(java.lang.String,io.vertx.core.Handler)"](__args[0], function(jVal) {
      __args[1](utils.convReturnVertxGen(HttpClientResponse, jVal));
    }));
    }  else if (__args.length === 3 && typeof __args[0] ==='number' && typeof __args[1] === 'string' && typeof __args[2] === 'string') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["get(int,java.lang.String,java.lang.String)"](__args[0], __args[1], __args[2]));
    }  else if (__args.length === 3 && typeof __args[0] === 'string' && typeof __args[1] === 'string' && typeof __args[2] === 'function') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["get(java.lang.String,java.lang.String,io.vertx.core.Handler)"](__args[0], __args[1], function(jVal) {
      __args[2](utils.convReturnVertxGen(HttpClientResponse, jVal));
    }));
    }  else if (__args.length === 4 && typeof __args[0] ==='number' && typeof __args[1] === 'string' && typeof __args[2] === 'string' && typeof __args[3] === 'function') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["get(int,java.lang.String,java.lang.String,io.vertx.core.Handler)"](__args[0], __args[1], __args[2], function(jVal) {
      __args[3](utils.convReturnVertxGen(HttpClientResponse, jVal));
    }));
    } else throw new TypeError('function invoked with invalid arguments');
  };

  /**
   Create an HTTP GET request to send to the server using an absolute URI, specifying a response handler to receive
   the response

   @public
   @param absoluteURI {string} the absolute URI 
   @param responseHandler {function} the response handler 
   @return {HttpClientRequest} an HTTP client request object
   */
  this.getAbs = function() {
    var __args = arguments;
    if (__args.length === 1 && typeof __args[0] === 'string') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["getAbs(java.lang.String)"](__args[0]));
    }  else if (__args.length === 2 && typeof __args[0] === 'string' && typeof __args[1] === 'function') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["getAbs(java.lang.String,io.vertx.core.Handler)"](__args[0], function(jVal) {
      __args[1](utils.convReturnVertxGen(HttpClientResponse, jVal));
    }));
    } else throw new TypeError('function invoked with invalid arguments');
  };

  /**
   Sends an HTTP GET request to the server at the specified host and port, specifying a response handler to receive
   the response

   @public
   @param port {number} the port 
   @param host {string} the host 
   @param requestURI {string} the relative URI 
   @param responseHandler {function} the response handler 
   @return {HttpClient} a reference to this, so the API can be used fluently
   */
  this.getNow = function() {
    var __args = arguments;
    if (__args.length === 2 && (typeof __args[0] === 'object' && __args[0] != null) && typeof __args[1] === 'function') {
      j_httpClient["getNow(io.vertx.core.http.RequestOptions,io.vertx.core.Handler)"](__args[0] != null ? new RequestOptions(new JsonObject(Java.asJSONCompatible(__args[0]))) : null, function(jVal) {
      __args[1](utils.convReturnVertxGen(HttpClientResponse, jVal));
    });
      return that;
    }  else if (__args.length === 2 && typeof __args[0] === 'string' && typeof __args[1] === 'function') {
      j_httpClient["getNow(java.lang.String,io.vertx.core.Handler)"](__args[0], function(jVal) {
      __args[1](utils.convReturnVertxGen(HttpClientResponse, jVal));
    });
      return that;
    }  else if (__args.length === 3 && typeof __args[0] === 'string' && typeof __args[1] === 'string' && typeof __args[2] === 'function') {
      j_httpClient["getNow(java.lang.String,java.lang.String,io.vertx.core.Handler)"](__args[0], __args[1], function(jVal) {
      __args[2](utils.convReturnVertxGen(HttpClientResponse, jVal));
    });
      return that;
    }  else if (__args.length === 4 && typeof __args[0] ==='number' && typeof __args[1] === 'string' && typeof __args[2] === 'string' && typeof __args[3] === 'function') {
      j_httpClient["getNow(int,java.lang.String,java.lang.String,io.vertx.core.Handler)"](__args[0], __args[1], __args[2], function(jVal) {
      __args[3](utils.convReturnVertxGen(HttpClientResponse, jVal));
    });
      return that;
    } else throw new TypeError('function invoked with invalid arguments');
  };

  /**
   Create an HTTP POST request to send to the server at the specified host and port, specifying a response handler to receive
   the response

   @public
   @param port {number} the port 
   @param host {string} the host 
   @param requestURI {string} the relative URI 
   @param responseHandler {function} the response handler 
   @return {HttpClientRequest} an HTTP client request object
   */
  this.post = function() {
    var __args = arguments;
    if (__args.length === 1 && (typeof __args[0] === 'object' && __args[0] != null)) {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["post(io.vertx.core.http.RequestOptions)"](__args[0] != null ? new RequestOptions(new JsonObject(Java.asJSONCompatible(__args[0]))) : null));
    }  else if (__args.length === 1 && typeof __args[0] === 'string') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["post(java.lang.String)"](__args[0]));
    }  else if (__args.length === 2 && typeof __args[0] === 'string' && typeof __args[1] === 'string') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["post(java.lang.String,java.lang.String)"](__args[0], __args[1]));
    }  else if (__args.length === 2 && (typeof __args[0] === 'object' && __args[0] != null) && typeof __args[1] === 'function') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["post(io.vertx.core.http.RequestOptions,io.vertx.core.Handler)"](__args[0] != null ? new RequestOptions(new JsonObject(Java.asJSONCompatible(__args[0]))) : null, function(jVal) {
      __args[1](utils.convReturnVertxGen(HttpClientResponse, jVal));
    }));
    }  else if (__args.length === 2 && typeof __args[0] === 'string' && typeof __args[1] === 'function') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["post(java.lang.String,io.vertx.core.Handler)"](__args[0], function(jVal) {
      __args[1](utils.convReturnVertxGen(HttpClientResponse, jVal));
    }));
    }  else if (__args.length === 3 && typeof __args[0] ==='number' && typeof __args[1] === 'string' && typeof __args[2] === 'string') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["post(int,java.lang.String,java.lang.String)"](__args[0], __args[1], __args[2]));
    }  else if (__args.length === 3 && typeof __args[0] === 'string' && typeof __args[1] === 'string' && typeof __args[2] === 'function') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["post(java.lang.String,java.lang.String,io.vertx.core.Handler)"](__args[0], __args[1], function(jVal) {
      __args[2](utils.convReturnVertxGen(HttpClientResponse, jVal));
    }));
    }  else if (__args.length === 4 && typeof __args[0] ==='number' && typeof __args[1] === 'string' && typeof __args[2] === 'string' && typeof __args[3] === 'function') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["post(int,java.lang.String,java.lang.String,io.vertx.core.Handler)"](__args[0], __args[1], __args[2], function(jVal) {
      __args[3](utils.convReturnVertxGen(HttpClientResponse, jVal));
    }));
    } else throw new TypeError('function invoked with invalid arguments');
  };

  /**
   Create an HTTP POST request to send to the server using an absolute URI, specifying a response handler to receive
   the response

   @public
   @param absoluteURI {string} the absolute URI 
   @param responseHandler {function} the response handler 
   @return {HttpClientRequest} an HTTP client request object
   */
  this.postAbs = function() {
    var __args = arguments;
    if (__args.length === 1 && typeof __args[0] === 'string') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["postAbs(java.lang.String)"](__args[0]));
    }  else if (__args.length === 2 && typeof __args[0] === 'string' && typeof __args[1] === 'function') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["postAbs(java.lang.String,io.vertx.core.Handler)"](__args[0], function(jVal) {
      __args[1](utils.convReturnVertxGen(HttpClientResponse, jVal));
    }));
    } else throw new TypeError('function invoked with invalid arguments');
  };

  /**
   Create an HTTP HEAD request to send to the server at the specified host and port, specifying a response handler to receive
   the response

   @public
   @param port {number} the port 
   @param host {string} the host 
   @param requestURI {string} the relative URI 
   @param responseHandler {function} the response handler 
   @return {HttpClientRequest} an HTTP client request object
   */
  this.head = function() {
    var __args = arguments;
    if (__args.length === 1 && (typeof __args[0] === 'object' && __args[0] != null)) {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["head(io.vertx.core.http.RequestOptions)"](__args[0] != null ? new RequestOptions(new JsonObject(Java.asJSONCompatible(__args[0]))) : null));
    }  else if (__args.length === 1 && typeof __args[0] === 'string') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["head(java.lang.String)"](__args[0]));
    }  else if (__args.length === 2 && typeof __args[0] === 'string' && typeof __args[1] === 'string') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["head(java.lang.String,java.lang.String)"](__args[0], __args[1]));
    }  else if (__args.length === 2 && (typeof __args[0] === 'object' && __args[0] != null) && typeof __args[1] === 'function') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["head(io.vertx.core.http.RequestOptions,io.vertx.core.Handler)"](__args[0] != null ? new RequestOptions(new JsonObject(Java.asJSONCompatible(__args[0]))) : null, function(jVal) {
      __args[1](utils.convReturnVertxGen(HttpClientResponse, jVal));
    }));
    }  else if (__args.length === 2 && typeof __args[0] === 'string' && typeof __args[1] === 'function') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["head(java.lang.String,io.vertx.core.Handler)"](__args[0], function(jVal) {
      __args[1](utils.convReturnVertxGen(HttpClientResponse, jVal));
    }));
    }  else if (__args.length === 3 && typeof __args[0] ==='number' && typeof __args[1] === 'string' && typeof __args[2] === 'string') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["head(int,java.lang.String,java.lang.String)"](__args[0], __args[1], __args[2]));
    }  else if (__args.length === 3 && typeof __args[0] === 'string' && typeof __args[1] === 'string' && typeof __args[2] === 'function') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["head(java.lang.String,java.lang.String,io.vertx.core.Handler)"](__args[0], __args[1], function(jVal) {
      __args[2](utils.convReturnVertxGen(HttpClientResponse, jVal));
    }));
    }  else if (__args.length === 4 && typeof __args[0] ==='number' && typeof __args[1] === 'string' && typeof __args[2] === 'string' && typeof __args[3] === 'function') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["head(int,java.lang.String,java.lang.String,io.vertx.core.Handler)"](__args[0], __args[1], __args[2], function(jVal) {
      __args[3](utils.convReturnVertxGen(HttpClientResponse, jVal));
    }));
    } else throw new TypeError('function invoked with invalid arguments');
  };

  /**
   Create an HTTP HEAD request to send to the server using an absolute URI, specifying a response handler to receive
   the response

   @public
   @param absoluteURI {string} the absolute URI 
   @param responseHandler {function} the response handler 
   @return {HttpClientRequest} an HTTP client request object
   */
  this.headAbs = function() {
    var __args = arguments;
    if (__args.length === 1 && typeof __args[0] === 'string') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["headAbs(java.lang.String)"](__args[0]));
    }  else if (__args.length === 2 && typeof __args[0] === 'string' && typeof __args[1] === 'function') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["headAbs(java.lang.String,io.vertx.core.Handler)"](__args[0], function(jVal) {
      __args[1](utils.convReturnVertxGen(HttpClientResponse, jVal));
    }));
    } else throw new TypeError('function invoked with invalid arguments');
  };

  /**
   Sends an HTTP HEAD request to the server at the specified host and port, specifying a response handler to receive
   the response

   @public
   @param port {number} the port 
   @param host {string} the host 
   @param requestURI {string} the relative URI 
   @param responseHandler {function} the response handler 
   @return {HttpClient} a reference to this, so the API can be used fluently
   */
  this.headNow = function() {
    var __args = arguments;
    if (__args.length === 2 && (typeof __args[0] === 'object' && __args[0] != null) && typeof __args[1] === 'function') {
      j_httpClient["headNow(io.vertx.core.http.RequestOptions,io.vertx.core.Handler)"](__args[0] != null ? new RequestOptions(new JsonObject(Java.asJSONCompatible(__args[0]))) : null, function(jVal) {
      __args[1](utils.convReturnVertxGen(HttpClientResponse, jVal));
    });
      return that;
    }  else if (__args.length === 2 && typeof __args[0] === 'string' && typeof __args[1] === 'function') {
      j_httpClient["headNow(java.lang.String,io.vertx.core.Handler)"](__args[0], function(jVal) {
      __args[1](utils.convReturnVertxGen(HttpClientResponse, jVal));
    });
      return that;
    }  else if (__args.length === 3 && typeof __args[0] === 'string' && typeof __args[1] === 'string' && typeof __args[2] === 'function') {
      j_httpClient["headNow(java.lang.String,java.lang.String,io.vertx.core.Handler)"](__args[0], __args[1], function(jVal) {
      __args[2](utils.convReturnVertxGen(HttpClientResponse, jVal));
    });
      return that;
    }  else if (__args.length === 4 && typeof __args[0] ==='number' && typeof __args[1] === 'string' && typeof __args[2] === 'string' && typeof __args[3] === 'function') {
      j_httpClient["headNow(int,java.lang.String,java.lang.String,io.vertx.core.Handler)"](__args[0], __args[1], __args[2], function(jVal) {
      __args[3](utils.convReturnVertxGen(HttpClientResponse, jVal));
    });
      return that;
    } else throw new TypeError('function invoked with invalid arguments');
  };

  /**
   Create an HTTP OPTIONS request to send to the server at the specified host and port, specifying a response handler to receive
   the response

   @public
   @param port {number} the port 
   @param host {string} the host 
   @param requestURI {string} the relative URI 
   @param responseHandler {function} the response handler 
   @return {HttpClientRequest} an HTTP client request object
   */
  this.options = function() {
    var __args = arguments;
    if (__args.length === 1 && (typeof __args[0] === 'object' && __args[0] != null)) {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["options(io.vertx.core.http.RequestOptions)"](__args[0] != null ? new RequestOptions(new JsonObject(Java.asJSONCompatible(__args[0]))) : null));
    }  else if (__args.length === 1 && typeof __args[0] === 'string') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["options(java.lang.String)"](__args[0]));
    }  else if (__args.length === 2 && typeof __args[0] === 'string' && typeof __args[1] === 'string') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["options(java.lang.String,java.lang.String)"](__args[0], __args[1]));
    }  else if (__args.length === 2 && (typeof __args[0] === 'object' && __args[0] != null) && typeof __args[1] === 'function') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["options(io.vertx.core.http.RequestOptions,io.vertx.core.Handler)"](__args[0] != null ? new RequestOptions(new JsonObject(Java.asJSONCompatible(__args[0]))) : null, function(jVal) {
      __args[1](utils.convReturnVertxGen(HttpClientResponse, jVal));
    }));
    }  else if (__args.length === 2 && typeof __args[0] === 'string' && typeof __args[1] === 'function') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["options(java.lang.String,io.vertx.core.Handler)"](__args[0], function(jVal) {
      __args[1](utils.convReturnVertxGen(HttpClientResponse, jVal));
    }));
    }  else if (__args.length === 3 && typeof __args[0] ==='number' && typeof __args[1] === 'string' && typeof __args[2] === 'string') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["options(int,java.lang.String,java.lang.String)"](__args[0], __args[1], __args[2]));
    }  else if (__args.length === 3 && typeof __args[0] === 'string' && typeof __args[1] === 'string' && typeof __args[2] === 'function') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["options(java.lang.String,java.lang.String,io.vertx.core.Handler)"](__args[0], __args[1], function(jVal) {
      __args[2](utils.convReturnVertxGen(HttpClientResponse, jVal));
    }));
    }  else if (__args.length === 4 && typeof __args[0] ==='number' && typeof __args[1] === 'string' && typeof __args[2] === 'string' && typeof __args[3] === 'function') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["options(int,java.lang.String,java.lang.String,io.vertx.core.Handler)"](__args[0], __args[1], __args[2], function(jVal) {
      __args[3](utils.convReturnVertxGen(HttpClientResponse, jVal));
    }));
    } else throw new TypeError('function invoked with invalid arguments');
  };

  /**
   Create an HTTP OPTIONS request to send to the server using an absolute URI, specifying a response handler to receive
   the response

   @public
   @param absoluteURI {string} the absolute URI 
   @param responseHandler {function} the response handler 
   @return {HttpClientRequest} an HTTP client request object
   */
  this.optionsAbs = function() {
    var __args = arguments;
    if (__args.length === 1 && typeof __args[0] === 'string') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["optionsAbs(java.lang.String)"](__args[0]));
    }  else if (__args.length === 2 && typeof __args[0] === 'string' && typeof __args[1] === 'function') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["optionsAbs(java.lang.String,io.vertx.core.Handler)"](__args[0], function(jVal) {
      __args[1](utils.convReturnVertxGen(HttpClientResponse, jVal));
    }));
    } else throw new TypeError('function invoked with invalid arguments');
  };

  /**
   Sends an HTTP OPTIONS request to the server at the specified host and port, specifying a response handler to receive
   the response

   @public
   @param port {number} the port 
   @param host {string} the host 
   @param requestURI {string} the relative URI 
   @param responseHandler {function} the response handler 
   @return {HttpClient} a reference to this, so the API can be used fluently
   */
  this.optionsNow = function() {
    var __args = arguments;
    if (__args.length === 2 && (typeof __args[0] === 'object' && __args[0] != null) && typeof __args[1] === 'function') {
      j_httpClient["optionsNow(io.vertx.core.http.RequestOptions,io.vertx.core.Handler)"](__args[0] != null ? new RequestOptions(new JsonObject(Java.asJSONCompatible(__args[0]))) : null, function(jVal) {
      __args[1](utils.convReturnVertxGen(HttpClientResponse, jVal));
    });
      return that;
    }  else if (__args.length === 2 && typeof __args[0] === 'string' && typeof __args[1] === 'function') {
      j_httpClient["optionsNow(java.lang.String,io.vertx.core.Handler)"](__args[0], function(jVal) {
      __args[1](utils.convReturnVertxGen(HttpClientResponse, jVal));
    });
      return that;
    }  else if (__args.length === 3 && typeof __args[0] === 'string' && typeof __args[1] === 'string' && typeof __args[2] === 'function') {
      j_httpClient["optionsNow(java.lang.String,java.lang.String,io.vertx.core.Handler)"](__args[0], __args[1], function(jVal) {
      __args[2](utils.convReturnVertxGen(HttpClientResponse, jVal));
    });
      return that;
    }  else if (__args.length === 4 && typeof __args[0] ==='number' && typeof __args[1] === 'string' && typeof __args[2] === 'string' && typeof __args[3] === 'function') {
      j_httpClient["optionsNow(int,java.lang.String,java.lang.String,io.vertx.core.Handler)"](__args[0], __args[1], __args[2], function(jVal) {
      __args[3](utils.convReturnVertxGen(HttpClientResponse, jVal));
    });
      return that;
    } else throw new TypeError('function invoked with invalid arguments');
  };

  /**
   Create an HTTP PUT request to send to the server at the specified host and port, specifying a response handler to receive
   the response

   @public
   @param port {number} the port 
   @param host {string} the host 
   @param requestURI {string} the relative URI 
   @param responseHandler {function} the response handler 
   @return {HttpClientRequest} an HTTP client request object
   */
  this.put = function() {
    var __args = arguments;
    if (__args.length === 1 && (typeof __args[0] === 'object' && __args[0] != null)) {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["put(io.vertx.core.http.RequestOptions)"](__args[0] != null ? new RequestOptions(new JsonObject(Java.asJSONCompatible(__args[0]))) : null));
    }  else if (__args.length === 1 && typeof __args[0] === 'string') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["put(java.lang.String)"](__args[0]));
    }  else if (__args.length === 2 && typeof __args[0] === 'string' && typeof __args[1] === 'string') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["put(java.lang.String,java.lang.String)"](__args[0], __args[1]));
    }  else if (__args.length === 2 && (typeof __args[0] === 'object' && __args[0] != null) && typeof __args[1] === 'function') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["put(io.vertx.core.http.RequestOptions,io.vertx.core.Handler)"](__args[0] != null ? new RequestOptions(new JsonObject(Java.asJSONCompatible(__args[0]))) : null, function(jVal) {
      __args[1](utils.convReturnVertxGen(HttpClientResponse, jVal));
    }));
    }  else if (__args.length === 2 && typeof __args[0] === 'string' && typeof __args[1] === 'function') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["put(java.lang.String,io.vertx.core.Handler)"](__args[0], function(jVal) {
      __args[1](utils.convReturnVertxGen(HttpClientResponse, jVal));
    }));
    }  else if (__args.length === 3 && typeof __args[0] ==='number' && typeof __args[1] === 'string' && typeof __args[2] === 'string') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["put(int,java.lang.String,java.lang.String)"](__args[0], __args[1], __args[2]));
    }  else if (__args.length === 3 && typeof __args[0] === 'string' && typeof __args[1] === 'string' && typeof __args[2] === 'function') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["put(java.lang.String,java.lang.String,io.vertx.core.Handler)"](__args[0], __args[1], function(jVal) {
      __args[2](utils.convReturnVertxGen(HttpClientResponse, jVal));
    }));
    }  else if (__args.length === 4 && typeof __args[0] ==='number' && typeof __args[1] === 'string' && typeof __args[2] === 'string' && typeof __args[3] === 'function') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["put(int,java.lang.String,java.lang.String,io.vertx.core.Handler)"](__args[0], __args[1], __args[2], function(jVal) {
      __args[3](utils.convReturnVertxGen(HttpClientResponse, jVal));
    }));
    } else throw new TypeError('function invoked with invalid arguments');
  };

  /**
   Create an HTTP PUT request to send to the server using an absolute URI, specifying a response handler to receive
   the response

   @public
   @param absoluteURI {string} the absolute URI 
   @param responseHandler {function} the response handler 
   @return {HttpClientRequest} an HTTP client request object
   */
  this.putAbs = function() {
    var __args = arguments;
    if (__args.length === 1 && typeof __args[0] === 'string') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["putAbs(java.lang.String)"](__args[0]));
    }  else if (__args.length === 2 && typeof __args[0] === 'string' && typeof __args[1] === 'function') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["putAbs(java.lang.String,io.vertx.core.Handler)"](__args[0], function(jVal) {
      __args[1](utils.convReturnVertxGen(HttpClientResponse, jVal));
    }));
    } else throw new TypeError('function invoked with invalid arguments');
  };

  /**
   Create an HTTP DELETE request to send to the server at the specified host and port, specifying a response handler to receive
   the response

   @public
   @param port {number} the port 
   @param host {string} the host 
   @param requestURI {string} the relative URI 
   @param responseHandler {function} the response handler 
   @return {HttpClientRequest} an HTTP client request object
   */
  this.delete = function() {
    var __args = arguments;
    if (__args.length === 1 && (typeof __args[0] === 'object' && __args[0] != null)) {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["delete(io.vertx.core.http.RequestOptions)"](__args[0] != null ? new RequestOptions(new JsonObject(Java.asJSONCompatible(__args[0]))) : null));
    }  else if (__args.length === 1 && typeof __args[0] === 'string') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["delete(java.lang.String)"](__args[0]));
    }  else if (__args.length === 2 && typeof __args[0] === 'string' && typeof __args[1] === 'string') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["delete(java.lang.String,java.lang.String)"](__args[0], __args[1]));
    }  else if (__args.length === 2 && (typeof __args[0] === 'object' && __args[0] != null) && typeof __args[1] === 'function') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["delete(io.vertx.core.http.RequestOptions,io.vertx.core.Handler)"](__args[0] != null ? new RequestOptions(new JsonObject(Java.asJSONCompatible(__args[0]))) : null, function(jVal) {
      __args[1](utils.convReturnVertxGen(HttpClientResponse, jVal));
    }));
    }  else if (__args.length === 2 && typeof __args[0] === 'string' && typeof __args[1] === 'function') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["delete(java.lang.String,io.vertx.core.Handler)"](__args[0], function(jVal) {
      __args[1](utils.convReturnVertxGen(HttpClientResponse, jVal));
    }));
    }  else if (__args.length === 3 && typeof __args[0] ==='number' && typeof __args[1] === 'string' && typeof __args[2] === 'string') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["delete(int,java.lang.String,java.lang.String)"](__args[0], __args[1], __args[2]));
    }  else if (__args.length === 3 && typeof __args[0] === 'string' && typeof __args[1] === 'string' && typeof __args[2] === 'function') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["delete(java.lang.String,java.lang.String,io.vertx.core.Handler)"](__args[0], __args[1], function(jVal) {
      __args[2](utils.convReturnVertxGen(HttpClientResponse, jVal));
    }));
    }  else if (__args.length === 4 && typeof __args[0] ==='number' && typeof __args[1] === 'string' && typeof __args[2] === 'string' && typeof __args[3] === 'function') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["delete(int,java.lang.String,java.lang.String,io.vertx.core.Handler)"](__args[0], __args[1], __args[2], function(jVal) {
      __args[3](utils.convReturnVertxGen(HttpClientResponse, jVal));
    }));
    } else throw new TypeError('function invoked with invalid arguments');
  };

  /**
   Create an HTTP DELETE request to send to the server using an absolute URI, specifying a response handler to receive
   the response

   @public
   @param absoluteURI {string} the absolute URI 
   @param responseHandler {function} the response handler 
   @return {HttpClientRequest} an HTTP client request object
   */
  this.deleteAbs = function() {
    var __args = arguments;
    if (__args.length === 1 && typeof __args[0] === 'string') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["deleteAbs(java.lang.String)"](__args[0]));
    }  else if (__args.length === 2 && typeof __args[0] === 'string' && typeof __args[1] === 'function') {
      return utils.convReturnVertxGen(HttpClientRequest, j_httpClient["deleteAbs(java.lang.String,io.vertx.core.Handler)"](__args[0], function(jVal) {
      __args[1](utils.convReturnVertxGen(HttpClientResponse, jVal));
    }));
    } else throw new TypeError('function invoked with invalid arguments');
  };

  /**
   Connect a WebSocket to the specified port, host and relative request URI, with the specified headers, using
   the specified version of WebSockets, and the specified websocket sub protocols

   @public
   @param port {number} the port 
   @param host {string} the host 
   @param requestURI {string} the relative URI 
   @param headers {MultiMap} the headers 
   @param version {Object} the websocket version 
   @param subProtocols {string} the subprotocols to use 
   @param wsConnect {function} handler that will be called with the websocket when connected 
   @param failureHandler {function} handler that will be called if websocket connection fails 
   @return {HttpClient} a reference to this, so the API can be used fluently
   */
  this.websocket = function() {
    var __args = arguments;
    if (__args.length === 2 && (typeof __args[0] === 'object' && __args[0] != null) && typeof __args[1] === 'function') {
      j_httpClient["websocket(io.vertx.core.http.RequestOptions,io.vertx.core.Handler)"](__args[0] != null ? new RequestOptions(new JsonObject(Java.asJSONCompatible(__args[0]))) : null, function(jVal) {
      __args[1](utils.convReturnVertxGen(WebSocket, jVal));
    });
      return that;
    }  else if (__args.length === 2 && typeof __args[0] === 'string' && typeof __args[1] === 'function') {
      j_httpClient["websocket(java.lang.String,io.vertx.core.Handler)"](__args[0], function(jVal) {
      __args[1](utils.convReturnVertxGen(WebSocket, jVal));
    });
      return that;
    }  else if (__args.length === 3 && (typeof __args[0] === 'object' && __args[0] != null) && typeof __args[1] === 'function' && typeof __args[2] === 'function') {
      j_httpClient["websocket(io.vertx.core.http.RequestOptions,io.vertx.core.Handler,io.vertx.core.Handler)"](__args[0] != null ? new RequestOptions(new JsonObject(Java.asJSONCompatible(__args[0]))) : null, function(jVal) {
      __args[1](utils.convReturnVertxGen(WebSocket, jVal));
    }, function(jVal) {
      __args[2](utils.convReturnThrowable(jVal));
    });
      return that;
    }  else if (__args.length === 3 && typeof __args[0] === 'string' && typeof __args[1] === 'string' && typeof __args[2] === 'function') {
      j_httpClient["websocket(java.lang.String,java.lang.String,io.vertx.core.Handler)"](__args[0], __args[1], function(jVal) {
      __args[2](utils.convReturnVertxGen(WebSocket, jVal));
    });
      return that;
    }  else if (__args.length === 3 && (typeof __args[0] === 'object' && __args[0] != null) && typeof __args[1] === 'object' && __args[1]._jdel && typeof __args[2] === 'function') {
      j_httpClient["websocket(io.vertx.core.http.RequestOptions,io.vertx.core.MultiMap,io.vertx.core.Handler)"](__args[0] != null ? new RequestOptions(new JsonObject(Java.asJSONCompatible(__args[0]))) : null, __args[1]._jdel, function(jVal) {
      __args[2](utils.convReturnVertxGen(WebSocket, jVal));
    });
      return that;
    }  else if (__args.length === 3 && typeof __args[0] === 'string' && typeof __args[1] === 'function' && typeof __args[2] === 'function') {
      j_httpClient["websocket(java.lang.String,io.vertx.core.Handler,io.vertx.core.Handler)"](__args[0], function(jVal) {
      __args[1](utils.convReturnVertxGen(WebSocket, jVal));
    }, function(jVal) {
      __args[2](utils.convReturnThrowable(jVal));
    });
      return that;
    }  else if (__args.length === 3 && typeof __args[0] === 'string' && typeof __args[1] === 'object' && __args[1]._jdel && typeof __args[2] === 'function') {
      j_httpClient["websocket(java.lang.String,io.vertx.core.MultiMap,io.vertx.core.Handler)"](__args[0], __args[1]._jdel, function(jVal) {
      __args[2](utils.convReturnVertxGen(WebSocket, jVal));
    });
      return that;
    }  else if (__args.length === 4 && typeof __args[0] ==='number' && typeof __args[1] === 'string' && typeof __args[2] === 'string' && typeof __args[3] === 'function') {
      j_httpClient["websocket(int,java.lang.String,java.lang.String,io.vertx.core.Handler)"](__args[0], __args[1], __args[2], function(jVal) {
      __args[3](utils.convReturnVertxGen(WebSocket, jVal));
    });
      return that;
    }  else if (__args.length === 4 && typeof __args[0] === 'string' && typeof __args[1] === 'string' && typeof __args[2] === 'function' && typeof __args[3] === 'function') {
      j_httpClient["websocket(java.lang.String,java.lang.String,io.vertx.core.Handler,io.vertx.core.Handler)"](__args[0], __args[1], function(jVal) {
      __args[2](utils.convReturnVertxGen(WebSocket, jVal));
    }, function(jVal) {
      __args[3](utils.convReturnThrowable(jVal));
    });
      return that;
    }  else if (__args.length === 4 && (typeof __args[0] === 'object' && __args[0] != null) && typeof __args[1] === 'object' && __args[1]._jdel && typeof __args[2] === 'function' && typeof __args[3] === 'function') {
      j_httpClient["websocket(io.vertx.core.http.RequestOptions,io.vertx.core.MultiMap,io.vertx.core.Handler,io.vertx.core.Handler)"](__args[0] != null ? new RequestOptions(new JsonObject(Java.asJSONCompatible(__args[0]))) : null, __args[1]._jdel, function(jVal) {
      __args[2](utils.convReturnVertxGen(WebSocket, jVal));
    }, function(jVal) {
      __args[3](utils.convReturnThrowable(jVal));
    });
      return that;
    }  else if (__args.length === 4 && typeof __args[0] === 'string' && typeof __args[1] === 'string' && typeof __args[2] === 'object' && __args[2]._jdel && typeof __args[3] === 'function') {
      j_httpClient["websocket(java.lang.String,java.lang.String,io.vertx.core.MultiMap,io.vertx.core.Handler)"](__args[0], __args[1], __args[2]._jdel, function(jVal) {
      __args[3](utils.convReturnVertxGen(WebSocket, jVal));
    });
      return that;
    }  else if (__args.length === 4 && (typeof __args[0] === 'object' && __args[0] != null) && typeof __args[1] === 'object' && __args[1]._jdel && typeof __args[2] === 'string' && typeof __args[3] === 'function') {
      j_httpClient["websocket(io.vertx.core.http.RequestOptions,io.vertx.core.MultiMap,io.vertx.core.http.WebsocketVersion,io.vertx.core.Handler)"](__args[0] != null ? new RequestOptions(new JsonObject(Java.asJSONCompatible(__args[0]))) : null, __args[1]._jdel, io.vertx.core.http.WebsocketVersion.valueOf(__args[2]), function(jVal) {
      __args[3](utils.convReturnVertxGen(WebSocket, jVal));
    });
      return that;
    }  else if (__args.length === 4 && typeof __args[0] === 'string' && typeof __args[1] === 'object' && __args[1]._jdel && typeof __args[2] === 'function' && typeof __args[3] === 'function') {
      j_httpClient["websocket(java.lang.String,io.vertx.core.MultiMap,io.vertx.core.Handler,io.vertx.core.Handler)"](__args[0], __args[1]._jdel, function(jVal) {
      __args[2](utils.convReturnVertxGen(WebSocket, jVal));
    }, function(jVal) {
      __args[3](utils.convReturnThrowable(jVal));
    });
      return that;
    }  else if (__args.length === 4 && typeof __args[0] === 'string' && typeof __args[1] === 'object' && __args[1]._jdel && typeof __args[2] === 'string' && typeof __args[3] === 'function') {
      j_httpClient["websocket(java.lang.String,io.vertx.core.MultiMap,io.vertx.core.http.WebsocketVersion,io.vertx.core.Handler)"](__args[0], __args[1]._jdel, io.vertx.core.http.WebsocketVersion.valueOf(__args[2]), function(jVal) {
      __args[3](utils.convReturnVertxGen(WebSocket, jVal));
    });
      return that;
    }  else if (__args.length === 5 && typeof __args[0] ==='number' && typeof __args[1] === 'string' && typeof __args[2] === 'string' && typeof __args[3] === 'function' && typeof __args[4] === 'function') {
      j_httpClient["websocket(int,java.lang.String,java.lang.String,io.vertx.core.Handler,io.vertx.core.Handler)"](__args[0], __args[1], __args[2], function(jVal) {
      __args[3](utils.convReturnVertxGen(WebSocket, jVal));
    }, function(jVal) {
      __args[4](utils.convReturnThrowable(jVal));
    });
      return that;
    }  else if (__args.length === 5 && typeof __args[0] ==='number' && typeof __args[1] === 'string' && typeof __args[2] === 'string' && typeof __args[3] === 'object' && __args[3]._jdel && typeof __args[4] === 'function') {
      j_httpClient["websocket(int,java.lang.String,java.lang.String,io.vertx.core.MultiMap,io.vertx.core.Handler)"](__args[0], __args[1], __args[2], __args[3]._jdel, function(jVal) {
      __args[4](utils.convReturnVertxGen(WebSocket, jVal));
    });
      return that;
    }  else if (__args.length === 5 && typeof __args[0] === 'string' && typeof __args[1] === 'string' && typeof __args[2] === 'object' && __args[2]._jdel && typeof __args[3] === 'function' && typeof __args[4] === 'function') {
      j_httpClient["websocket(java.lang.String,java.lang.String,io.vertx.core.MultiMap,io.vertx.core.Handler,io.vertx.core.Handler)"](__args[0], __args[1], __args[2]._jdel, function(jVal) {
      __args[3](utils.convReturnVertxGen(WebSocket, jVal));
    }, function(jVal) {
      __args[4](utils.convReturnThrowable(jVal));
    });
      return that;
    }  else if (__args.length === 5 && (typeof __args[0] === 'object' && __args[0] != null) && typeof __args[1] === 'object' && __args[1]._jdel && typeof __args[2] === 'string' && typeof __args[3] === 'function' && typeof __args[4] === 'function') {
      j_httpClient["websocket(io.vertx.core.http.RequestOptions,io.vertx.core.MultiMap,io.vertx.core.http.WebsocketVersion,io.vertx.core.Handler,io.vertx.core.Handler)"](__args[0] != null ? new RequestOptions(new JsonObject(Java.asJSONCompatible(__args[0]))) : null, __args[1]._jdel, io.vertx.core.http.WebsocketVersion.valueOf(__args[2]), function(jVal) {
      __args[3](utils.convReturnVertxGen(WebSocket, jVal));
    }, function(jVal) {
      __args[4](utils.convReturnThrowable(jVal));
    });
      return that;
    }  else if (__args.length === 5 && typeof __args[0] === 'string' && typeof __args[1] === 'string' && typeof __args[2] === 'object' && __args[2]._jdel && typeof __args[3] === 'string' && typeof __args[4] === 'function') {
      j_httpClient["websocket(java.lang.String,java.lang.String,io.vertx.core.MultiMap,io.vertx.core.http.WebsocketVersion,io.vertx.core.Handler)"](__args[0], __args[1], __args[2]._jdel, io.vertx.core.http.WebsocketVersion.valueOf(__args[3]), function(jVal) {
      __args[4](utils.convReturnVertxGen(WebSocket, jVal));
    });
      return that;
    }  else if (__args.length === 5 && (typeof __args[0] === 'object' && __args[0] != null) && typeof __args[1] === 'object' && __args[1]._jdel && typeof __args[2] === 'string' && typeof __args[3] === 'string' && typeof __args[4] === 'function') {
      j_httpClient["websocket(io.vertx.core.http.RequestOptions,io.vertx.core.MultiMap,io.vertx.core.http.WebsocketVersion,java.lang.String,io.vertx.core.Handler)"](__args[0] != null ? new RequestOptions(new JsonObject(Java.asJSONCompatible(__args[0]))) : null, __args[1]._jdel, io.vertx.core.http.WebsocketVersion.valueOf(__args[2]), __args[3], function(jVal) {
      __args[4](utils.convReturnVertxGen(WebSocket, jVal));
    });
      return that;
    }  else if (__args.length === 5 && typeof __args[0] === 'string' && typeof __args[1] === 'object' && __args[1]._jdel && typeof __args[2] === 'string' && typeof __args[3] === 'function' && typeof __args[4] === 'function') {
      j_httpClient["websocket(java.lang.String,io.vertx.core.MultiMap,io.vertx.core.http.WebsocketVersion,io.vertx.core.Handler,io.vertx.core.Handler)"](__args[0], __args[1]._jdel, io.vertx.core.http.WebsocketVersion.valueOf(__args[2]), function(jVal) {
      __args[3](utils.convReturnVertxGen(WebSocket, jVal));
    }, function(jVal) {
      __args[4](utils.convReturnThrowable(jVal));
    });
      return that;
    }  else if (__args.length === 5 && typeof __args[0] === 'string' && typeof __args[1] === 'object' && __args[1]._jdel && typeof __args[2] === 'string' && typeof __args[3] === 'string' && typeof __args[4] === 'function') {
      j_httpClient["websocket(java.lang.String,io.vertx.core.MultiMap,io.vertx.core.http.WebsocketVersion,java.lang.String,io.vertx.core.Handler)"](__args[0], __args[1]._jdel, io.vertx.core.http.WebsocketVersion.valueOf(__args[2]), __args[3], function(jVal) {
      __args[4](utils.convReturnVertxGen(WebSocket, jVal));
    });
      return that;
    }  else if (__args.length === 6 && typeof __args[0] ==='number' && typeof __args[1] === 'string' && typeof __args[2] === 'string' && typeof __args[3] === 'object' && __args[3]._jdel && typeof __args[4] === 'function' && typeof __args[5] === 'function') {
      j_httpClient["websocket(int,java.lang.String,java.lang.String,io.vertx.core.MultiMap,io.vertx.core.Handler,io.vertx.core.Handler)"](__args[0], __args[1], __args[2], __args[3]._jdel, function(jVal) {
      __args[4](utils.convReturnVertxGen(WebSocket, jVal));
    }, function(jVal) {
      __args[5](utils.convReturnThrowable(jVal));
    });
      return that;
    }  else if (__args.length === 6 && typeof __args[0] ==='number' && typeof __args[1] === 'string' && typeof __args[2] === 'string' && typeof __args[3] === 'object' && __args[3]._jdel && typeof __args[4] === 'string' && typeof __args[5] === 'function') {
      j_httpClient["websocket(int,java.lang.String,java.lang.String,io.vertx.core.MultiMap,io.vertx.core.http.WebsocketVersion,io.vertx.core.Handler)"](__args[0], __args[1], __args[2], __args[3]._jdel, io.vertx.core.http.WebsocketVersion.valueOf(__args[4]), function(jVal) {
      __args[5](utils.convReturnVertxGen(WebSocket, jVal));
    });
      return that;
    }  else if (__args.length === 6 && typeof __args[0] === 'string' && typeof __args[1] === 'string' && typeof __args[2] === 'object' && __args[2]._jdel && typeof __args[3] === 'string' && typeof __args[4] === 'function' && typeof __args[5] === 'function') {
      j_httpClient["websocket(java.lang.String,java.lang.String,io.vertx.core.MultiMap,io.vertx.core.http.WebsocketVersion,io.vertx.core.Handler,io.vertx.core.Handler)"](__args[0], __args[1], __args[2]._jdel, io.vertx.core.http.WebsocketVersion.valueOf(__args[3]), function(jVal) {
      __args[4](utils.convReturnVertxGen(WebSocket, jVal));
    }, function(jVal) {
      __args[5](utils.convReturnThrowable(jVal));
    });
      return that;
    }  else if (__args.length === 6 && (typeof __args[0] === 'object' && __args[0] != null) && typeof __args[1] === 'object' && __args[1]._jdel && typeof __args[2] === 'string' && typeof __args[3] === 'string' && typeof __args[4] === 'function' && typeof __args[5] === 'function') {
      j_httpClient["websocket(io.vertx.core.http.RequestOptions,io.vertx.core.MultiMap,io.vertx.core.http.WebsocketVersion,java.lang.String,io.vertx.core.Handler,io.vertx.core.Handler)"](__args[0] != null ? new RequestOptions(new JsonObject(Java.asJSONCompatible(__args[0]))) : null, __args[1]._jdel, io.vertx.core.http.WebsocketVersion.valueOf(__args[2]), __args[3], function(jVal) {
      __args[4](utils.convReturnVertxGen(WebSocket, jVal));
    }, function(jVal) {
      __args[5](utils.convReturnThrowable(jVal));
    });
      return that;
    }  else if (__args.length === 6 && typeof __args[0] === 'string' && typeof __args[1] === 'string' && typeof __args[2] === 'object' && __args[2]._jdel && typeof __args[3] === 'string' && typeof __args[4] === 'string' && typeof __args[5] === 'function') {
      j_httpClient["websocket(java.lang.String,java.lang.String,io.vertx.core.MultiMap,io.vertx.core.http.WebsocketVersion,java.lang.String,io.vertx.core.Handler)"](__args[0], __args[1], __args[2]._jdel, io.vertx.core.http.WebsocketVersion.valueOf(__args[3]), __args[4], function(jVal) {
      __args[5](utils.convReturnVertxGen(WebSocket, jVal));
    });
      return that;
    }  else if (__args.length === 6 && typeof __args[0] === 'string' && typeof __args[1] === 'object' && __args[1]._jdel && typeof __args[2] === 'string' && typeof __args[3] === 'string' && typeof __args[4] === 'function' && typeof __args[5] === 'function') {
      j_httpClient["websocket(java.lang.String,io.vertx.core.MultiMap,io.vertx.core.http.WebsocketVersion,java.lang.String,io.vertx.core.Handler,io.vertx.core.Handler)"](__args[0], __args[1]._jdel, io.vertx.core.http.WebsocketVersion.valueOf(__args[2]), __args[3], function(jVal) {
      __args[4](utils.convReturnVertxGen(WebSocket, jVal));
    }, function(jVal) {
      __args[5](utils.convReturnThrowable(jVal));
    });
      return that;
    }  else if (__args.length === 7 && typeof __args[0] ==='number' && typeof __args[1] === 'string' && typeof __args[2] === 'string' && typeof __args[3] === 'object' && __args[3]._jdel && typeof __args[4] === 'string' && typeof __args[5] === 'function' && typeof __args[6] === 'function') {
      j_httpClient["websocket(int,java.lang.String,java.lang.String,io.vertx.core.MultiMap,io.vertx.core.http.WebsocketVersion,io.vertx.core.Handler,io.vertx.core.Handler)"](__args[0], __args[1], __args[2], __args[3]._jdel, io.vertx.core.http.WebsocketVersion.valueOf(__args[4]), function(jVal) {
      __args[5](utils.convReturnVertxGen(WebSocket, jVal));
    }, function(jVal) {
      __args[6](utils.convReturnThrowable(jVal));
    });
      return that;
    }  else if (__args.length === 7 && typeof __args[0] ==='number' && typeof __args[1] === 'string' && typeof __args[2] === 'string' && typeof __args[3] === 'object' && __args[3]._jdel && typeof __args[4] === 'string' && typeof __args[5] === 'string' && typeof __args[6] === 'function') {
      j_httpClient["websocket(int,java.lang.String,java.lang.String,io.vertx.core.MultiMap,io.vertx.core.http.WebsocketVersion,java.lang.String,io.vertx.core.Handler)"](__args[0], __args[1], __args[2], __args[3]._jdel, io.vertx.core.http.WebsocketVersion.valueOf(__args[4]), __args[5], function(jVal) {
      __args[6](utils.convReturnVertxGen(WebSocket, jVal));
    });
      return that;
    }  else if (__args.length === 7 && typeof __args[0] === 'string' && typeof __args[1] === 'string' && typeof __args[2] === 'object' && __args[2]._jdel && typeof __args[3] === 'string' && typeof __args[4] === 'string' && typeof __args[5] === 'function' && typeof __args[6] === 'function') {
      j_httpClient["websocket(java.lang.String,java.lang.String,io.vertx.core.MultiMap,io.vertx.core.http.WebsocketVersion,java.lang.String,io.vertx.core.Handler,io.vertx.core.Handler)"](__args[0], __args[1], __args[2]._jdel, io.vertx.core.http.WebsocketVersion.valueOf(__args[3]), __args[4], function(jVal) {
      __args[5](utils.convReturnVertxGen(WebSocket, jVal));
    }, function(jVal) {
      __args[6](utils.convReturnThrowable(jVal));
    });
      return that;
    }  else if (__args.length === 8 && typeof __args[0] ==='number' && typeof __args[1] === 'string' && typeof __args[2] === 'string' && typeof __args[3] === 'object' && __args[3]._jdel && typeof __args[4] === 'string' && typeof __args[5] === 'string' && typeof __args[6] === 'function' && typeof __args[7] === 'function') {
      j_httpClient["websocket(int,java.lang.String,java.lang.String,io.vertx.core.MultiMap,io.vertx.core.http.WebsocketVersion,java.lang.String,io.vertx.core.Handler,io.vertx.core.Handler)"](__args[0], __args[1], __args[2], __args[3]._jdel, io.vertx.core.http.WebsocketVersion.valueOf(__args[4]), __args[5], function(jVal) {
      __args[6](utils.convReturnVertxGen(WebSocket, jVal));
    }, function(jVal) {
      __args[7](utils.convReturnThrowable(jVal));
    });
      return that;
    } else throw new TypeError('function invoked with invalid arguments');
  };

  /**
   Create a WebSocket stream to the specified port, host and relative request URI, with the specified headers, using
   the specified version of WebSockets, and the specified websocket sub protocols

   @public
   @param port {number} the port 
   @param host {string} the host 
   @param requestURI {string} the relative URI 
   @param headers {MultiMap} the headers 
   @param version {Object} the websocket version 
   @param subProtocols {string} the subprotocols to use 
   @return {ReadStream} a reference to this, so the API can be used fluently
   */
  this.websocketStream = function() {
    var __args = arguments;
    if (__args.length === 1 && (typeof __args[0] === 'object' && __args[0] != null)) {
      return utils.convReturnVertxGen(ReadStream, j_httpClient["websocketStream(io.vertx.core.http.RequestOptions)"](__args[0] != null ? new RequestOptions(new JsonObject(Java.asJSONCompatible(__args[0]))) : null), WebSocket._jtype);
    }  else if (__args.length === 1 && typeof __args[0] === 'string') {
      return utils.convReturnVertxGen(ReadStream, j_httpClient["websocketStream(java.lang.String)"](__args[0]), WebSocket._jtype);
    }  else if (__args.length === 2 && typeof __args[0] === 'string' && typeof __args[1] === 'string') {
      return utils.convReturnVertxGen(ReadStream, j_httpClient["websocketStream(java.lang.String,java.lang.String)"](__args[0], __args[1]), WebSocket._jtype);
    }  else if (__args.length === 2 && (typeof __args[0] === 'object' && __args[0] != null) && typeof __args[1] === 'object' && __args[1]._jdel) {
      return utils.convReturnVertxGen(ReadStream, j_httpClient["websocketStream(io.vertx.core.http.RequestOptions,io.vertx.core.MultiMap)"](__args[0] != null ? new RequestOptions(new JsonObject(Java.asJSONCompatible(__args[0]))) : null, __args[1]._jdel), WebSocket._jtype);
    }  else if (__args.length === 2 && typeof __args[0] === 'string' && typeof __args[1] === 'object' && __args[1]._jdel) {
      return utils.convReturnVertxGen(ReadStream, j_httpClient["websocketStream(java.lang.String,io.vertx.core.MultiMap)"](__args[0], __args[1]._jdel), WebSocket._jtype);
    }  else if (__args.length === 3 && typeof __args[0] ==='number' && typeof __args[1] === 'string' && typeof __args[2] === 'string') {
      return utils.convReturnVertxGen(ReadStream, j_httpClient["websocketStream(int,java.lang.String,java.lang.String)"](__args[0], __args[1], __args[2]), WebSocket._jtype);
    }  else if (__args.length === 3 && typeof __args[0] === 'string' && typeof __args[1] === 'string' && typeof __args[2] === 'object' && __args[2]._jdel) {
      return utils.convReturnVertxGen(ReadStream, j_httpClient["websocketStream(java.lang.String,java.lang.String,io.vertx.core.MultiMap)"](__args[0], __args[1], __args[2]._jdel), WebSocket._jtype);
    }  else if (__args.length === 3 && (typeof __args[0] === 'object' && __args[0] != null) && typeof __args[1] === 'object' && __args[1]._jdel && typeof __args[2] === 'string') {
      return utils.convReturnVertxGen(ReadStream, j_httpClient["websocketStream(io.vertx.core.http.RequestOptions,io.vertx.core.MultiMap,io.vertx.core.http.WebsocketVersion)"](__args[0] != null ? new RequestOptions(new JsonObject(Java.asJSONCompatible(__args[0]))) : null, __args[1]._jdel, io.vertx.core.http.WebsocketVersion.valueOf(__args[2])), WebSocket._jtype);
    }  else if (__args.length === 3 && typeof __args[0] === 'string' && typeof __args[1] === 'object' && __args[1]._jdel && typeof __args[2] === 'string') {
      return utils.convReturnVertxGen(ReadStream, j_httpClient["websocketStream(java.lang.String,io.vertx.core.MultiMap,io.vertx.core.http.WebsocketVersion)"](__args[0], __args[1]._jdel, io.vertx.core.http.WebsocketVersion.valueOf(__args[2])), WebSocket._jtype);
    }  else if (__args.length === 4 && typeof __args[0] ==='number' && typeof __args[1] === 'string' && typeof __args[2] === 'string' && typeof __args[3] === 'object' && __args[3]._jdel) {
      return utils.convReturnVertxGen(ReadStream, j_httpClient["websocketStream(int,java.lang.String,java.lang.String,io.vertx.core.MultiMap)"](__args[0], __args[1], __args[2], __args[3]._jdel), WebSocket._jtype);
    }  else if (__args.length === 4 && typeof __args[0] === 'string' && typeof __args[1] === 'string' && typeof __args[2] === 'object' && __args[2]._jdel && typeof __args[3] === 'string') {
      return utils.convReturnVertxGen(ReadStream, j_httpClient["websocketStream(java.lang.String,java.lang.String,io.vertx.core.MultiMap,io.vertx.core.http.WebsocketVersion)"](__args[0], __args[1], __args[2]._jdel, io.vertx.core.http.WebsocketVersion.valueOf(__args[3])), WebSocket._jtype);
    }  else if (__args.length === 4 && (typeof __args[0] === 'object' && __args[0] != null) && typeof __args[1] === 'object' && __args[1]._jdel && typeof __args[2] === 'string' && typeof __args[3] === 'string') {
      return utils.convReturnVertxGen(ReadStream, j_httpClient["websocketStream(io.vertx.core.http.RequestOptions,io.vertx.core.MultiMap,io.vertx.core.http.WebsocketVersion,java.lang.String)"](__args[0] != null ? new RequestOptions(new JsonObject(Java.asJSONCompatible(__args[0]))) : null, __args[1]._jdel, io.vertx.core.http.WebsocketVersion.valueOf(__args[2]), __args[3]), WebSocket._jtype);
    }  else if (__args.length === 4 && typeof __args[0] === 'string' && typeof __args[1] === 'object' && __args[1]._jdel && typeof __args[2] === 'string' && typeof __args[3] === 'string') {
      return utils.convReturnVertxGen(ReadStream, j_httpClient["websocketStream(java.lang.String,io.vertx.core.MultiMap,io.vertx.core.http.WebsocketVersion,java.lang.String)"](__args[0], __args[1]._jdel, io.vertx.core.http.WebsocketVersion.valueOf(__args[2]), __args[3]), WebSocket._jtype);
    }  else if (__args.length === 5 && typeof __args[0] ==='number' && typeof __args[1] === 'string' && typeof __args[2] === 'string' && typeof __args[3] === 'object' && __args[3]._jdel && typeof __args[4] === 'string') {
      return utils.convReturnVertxGen(ReadStream, j_httpClient["websocketStream(int,java.lang.String,java.lang.String,io.vertx.core.MultiMap,io.vertx.core.http.WebsocketVersion)"](__args[0], __args[1], __args[2], __args[3]._jdel, io.vertx.core.http.WebsocketVersion.valueOf(__args[4])), WebSocket._jtype);
    }  else if (__args.length === 5 && typeof __args[0] === 'string' && typeof __args[1] === 'string' && typeof __args[2] === 'object' && __args[2]._jdel && typeof __args[3] === 'string' && typeof __args[4] === 'string') {
      return utils.convReturnVertxGen(ReadStream, j_httpClient["websocketStream(java.lang.String,java.lang.String,io.vertx.core.MultiMap,io.vertx.core.http.WebsocketVersion,java.lang.String)"](__args[0], __args[1], __args[2]._jdel, io.vertx.core.http.WebsocketVersion.valueOf(__args[3]), __args[4]), WebSocket._jtype);
    }  else if (__args.length === 6 && typeof __args[0] ==='number' && typeof __args[1] === 'string' && typeof __args[2] === 'string' && typeof __args[3] === 'object' && __args[3]._jdel && typeof __args[4] === 'string' && typeof __args[5] === 'string') {
      return utils.convReturnVertxGen(ReadStream, j_httpClient["websocketStream(int,java.lang.String,java.lang.String,io.vertx.core.MultiMap,io.vertx.core.http.WebsocketVersion,java.lang.String)"](__args[0], __args[1], __args[2], __args[3]._jdel, io.vertx.core.http.WebsocketVersion.valueOf(__args[4]), __args[5]), WebSocket._jtype);
    } else throw new TypeError('function invoked with invalid arguments');
  };

  /**
   Set a redirect handler for the http client.
   <p>
   The redirect handler is called when a <code>3xx</code> response is received and the request is configured to
   follow redirects with {@link HttpClientRequest#setFollowRedirects}.
   <p>
   The redirect handler is passed the {@link HttpClientResponse}, it can return an {@link HttpClientRequest} or <code>null</code>.
   <ul>
     <li>when null is returned, the original response is processed by the original request response handler</li>
     <li>when a new <code>Future<HttpClientRequest></code> is returned, the client will send this new request</li>
   </ul>
   The handler must return a <code>Future<HttpClientRequest></code> unsent so the client can further configure it and send it.

   @public
   @param handler {todo} the new redirect handler 
   @return {HttpClient} a reference to this, so the API can be used fluently
   */
  this.redirectHandler = function(handler) {
    var __args = arguments;
    if (__args.length === 1 && typeof __args[0] === 'function') {
      j_httpClient["redirectHandler(java.util.function.Function)"](function(jVal) {
      var jRet = handler(utils.convReturnVertxGen(HttpClientResponse, jVal));
      return jRet._jdel;
    });
      return that;
    } else throw new TypeError('function invoked with invalid arguments');
  };

  /**
   Close the client. Closing will close down any pooled connections.
   Clients should always be closed after use.

   @public

   */
  this.close = function() {
    var __args = arguments;
    if (__args.length === 0) {
      j_httpClient["close()"]();
    } else throw new TypeError('function invoked with invalid arguments');
  };

  // A reference to the underlying Java delegate
  // NOTE! This is an internal API and must not be used in user code.
  // If you rely on this property your code is likely to break if we change it / remove it without warning.
  this._jdel = j_httpClient;
};

HttpClient._jclass = utils.getJavaClass("io.vertx.core.http.HttpClient");
HttpClient._jtype = {
  accept: function(obj) {
    return HttpClient._jclass.isInstance(obj._jdel);
  },
  wrap: function(jdel) {
    var obj = Object.create(HttpClient.prototype, {});
    HttpClient.apply(obj, arguments);
    return obj;
  },
  unwrap: function(obj) {
    return obj._jdel;
  }
};
HttpClient._create = function(jdel) {
  var obj = Object.create(HttpClient.prototype, {});
  HttpClient.apply(obj, arguments);
  return obj;
}
module.exports = HttpClient;