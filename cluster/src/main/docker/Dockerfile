FROM openjdk:8-jre-alpine

ENV VERTICLE_FILE cluster-1.0-SNAPSHOT-fat.jar
ENV VERTICLE_HOME /usr/verticles

EXPOSE 5701 5700 8080

COPY $VERTICLE_FILE $VERTICLE_HOME/
COPY cluster.xml $VERTICLE_HOME/

WORKDIR $VERTICLE_HOME

ENTRYPOINT ["sh", "-c"]
CMD ["exec java -Dhost.ip=$(cat /etc/hosts | grep 10.2 | awk '{print $1}' | cut -d/ -f1) -Ddocker.ip=$(cat /etc/hosts | grep 10.2 | awk '{print $1}' | cut -d/ -f1) -Dvertx.hazelcast.config=cluster.xml -Dvertx.cluster.public.host=$(cat /etc/hosts | grep 10.2 | awk '{print $1}' | cut -d/ -f1) -Dvertx.cluster.public.port=5700 -Dvertx.hazelcast.async-api=true -jar $VERTICLE_FILE -cluster $VERTICLE_HOME/cluster.xml -cluster-host $(cat /etc/hosts | grep 10.2 | awk '{print $1}' | cut -d/ -f1) -cluster-port 5700"]