@logger = Java::IoVertxCoreLogging::LoggerFactory.get_logger('RubyVerticle')

def vertx_start_async start_future
  start_future.complete
end