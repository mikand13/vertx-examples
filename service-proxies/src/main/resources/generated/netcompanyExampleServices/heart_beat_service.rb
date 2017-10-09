require 'vertx/vertx'
require 'vertx/util/utils.rb'
# Generated from com.netcompany.vertx.examples.serviceproxies.services.HeartBeatService
module NetcompanyExampleServices
  class HeartBeatService
    # @private
    # @param j_del [::NetcompanyExampleServices::HeartBeatService] the java delegate
    def initialize(j_del)
      @j_del = j_del
    end
    # @private
    # @return [::NetcompanyExampleServices::HeartBeatService] the underlying java delegate
    def j_del
      @j_del
    end
    @@j_api_type = Object.new
    def @@j_api_type.accept?(obj)
      obj.class == HeartBeatService
    end
    def @@j_api_type.wrap(obj)
      HeartBeatService.new(obj)
    end
    def @@j_api_type.unwrap(obj)
      obj.j_del
    end
    def self.j_api_type
      @@j_api_type
    end
    def self.j_class
      Java::ComNetcompanyVertxExamplesServiceproxiesServices::HeartBeatService.java_class
    end
    # @param [::Vertx::Vertx] vertx 
    # @param [String] address 
    # @return [::NetcompanyExampleServices::HeartBeatService]
    def self.create_proxy(vertx=nil,address=nil)
      if vertx.class.method_defined?(:j_del) && address.class == String && !block_given?
        return ::Vertx::Util::Utils.safe_create(Java::ComNetcompanyVertxExamplesServiceproxiesServices::HeartBeatService.java_method(:createProxy, [Java::IoVertxCore::Vertx.java_class,Java::java.lang.String.java_class]).call(vertx.j_del,address),::NetcompanyExampleServices::HeartBeatService)
      end
      raise ArgumentError, "Invalid arguments when calling create_proxy(#{vertx},#{address})"
    end
    # @yield 
    # @return [void]
    def ping
      if block_given?
        return @j_del.java_method(:ping, [Java::IoVertxCore::Handler.java_class]).call((Proc.new { |ar| yield(ar.failed ? ar.cause : nil, ar.succeeded ? ar.result != nil ? JSON.parse(ar.result.toJson.encode) : nil : nil) }))
      end
      raise ArgumentError, "Invalid arguments when calling ping()"
    end
  end
end
