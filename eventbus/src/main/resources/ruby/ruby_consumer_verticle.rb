@logger = Java::IoVertxCoreLogging::LoggerFactory.get_logger('RubyVerticle')
@example_publish_address = 'com.netcompany.vertx.example.publish'
@example_send_address = 'com.netcompany.vertx.example.send'
@publish_consumer = nil
@send_consumer = nil

def vertx_start_async start_future
  set_consumers

  start_future.complete
end

def set_consumers
  @publish_consumer = $vertx.event_bus.consumer(@example_publish_address) do |msg|
    @logger.info("Received publish message: #{msg.body}")
  end

  @send_consumer = $vertx.event_bus.consumer(@example_send_address) do |msg|
    @logger.info("Received send message from: #{msg.reply_address} with #{msg.body}")

    msg.reply({ replier: 'Ruby' })
  end
end

def vertx_stop_async stop_future
  stop_consumers

  stop_future.complete
end

def stop_consumers
  @publish_consumer.unregister unless @publish_consumer.nil?
  @send_consumer.unregister unless @send_consumer.nil?
end
