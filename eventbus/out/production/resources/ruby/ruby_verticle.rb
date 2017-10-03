@logger = Java::IoVertxCoreLogging::LoggerFactory.get_logger('RubyVerticle')

def vertx_start_async start_future
  config = $vertx.get_or_create_context.config
  port = config['ports']['ruby']

  $vertx.create_http_server.request_handler { |req|
    req.response
      .put_header('content-type', 'text/plain')
      .end('Hello from Ruby Vert.x!')
  }.listen(port) do |res_error, res|
    if res_error.nil?
      start_future.complete

      set_timed_hello
    else
      start_future.fail(res_error)
    end
  end
end

def set_timed_hello
  $vertx.set_periodic(1000) { |id|
    @logger.info('Hello from Ruby!')
  }
end