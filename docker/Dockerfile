FROM node:16.13.0
COPY sources.list /etc/apt/sources.list
RUN apt-get update \
    && apt-get install systemctl \
    && apt-get install sudo \
    && apt-get install vim -y \
    && apt-get install nano

RUN mkdir /data \
    &&  cd /data \
    &&  git clone https://github.com/czq7966/nd-iot-mqtt-broker.git mqtt-broker -b dev \
    &&  cd /data/mqtt-broker \
    &&  npm install   

COPY ./service/mqtt-broker.service /lib/systemd/system/mqtt-broker.service
RUN systemctl enable mqtt-broker

RUN mkdir -p /data \
    &&  cd /data \
    &&  git clone https://github.com/czq7966/nd-iot-edge-gateway.git edge-gateway -b dev \
    &&  cd /data/edge-gateway \
    &&  npm install \
    &&  cd /data/edge-gateway/data \
    &&  npm install \
    &&  cd /data/edge-gateway     

WORKDIR /data/edge-gateway 

EXPOSE 1880-1884 8080 8090-8099
CMD ["npm","start"]    