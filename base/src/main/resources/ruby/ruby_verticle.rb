@logger = Java::IoVertxCoreLogging::LoggerFactory.get_logger('RubyVerticle')

def vertx_start_async start_future
  config = $vertx.get_or_create_context.config
  port = config['ports'].nil? ? nil : config['ports']['ruby']

  $vertx.create_http_server.request_handler { |req|
    req.response
      .put_header('content-type', 'text/plain')
      .end('Hello from Ruby Vert.x!')
  }.listen(port.nil? ? 8082 : port) do |res_error, res|
    if res_error.nil?
      set_timed_hello

      start_future.complete
    else
      start_future.fail(res_error)
    end
  end
end

def set_timed_hello
  millis = (Time.now.to_f * 1000).to_i

  @logger.info('Hello from Ruby!')

  $vertx.set_periodic(30000) { |id|
    @logger.info("Hello from Ruby after #{(Time.now.to_f * 1000).to_i - millis}!")
  }
end