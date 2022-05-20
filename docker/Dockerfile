FROM node:16.13.0
COPY sources.list /etc/apt/sources.list
RUN apt-get update \
    && apt-get install systemctl \
    && apt-get install sudo \
    && apt-get install vim -y \
    && apt-get install nano

RUN mkdir -p /services \
    &&  cd /services \
    &&  git clone https://github.com/czq7966/nd-iot-mqtt-broker.git nd-iot-mqtt-broker -b dev \
    &&  cd /services/nd-iot-mqtt-broker \
    &&  npm install   

COPY ./service/nd-iot-mqtt-broker.service /lib/systemd/system/nd-iot-mqtt-broker.service
RUN systemctl enable nd-iot-mqtt-broker

RUN mkdir -p /services \
    &&  cd /services \
    &&  git clone https://github.com/czq7966/nd-iot-services.git nd-iot-services -b dev \
    &&  cd /data/edge-gateway \
    &&  npm install \
    &&  cd /data/edge-gateway/data \
    &&  npm install \
    &&  cd /data/edge-gateway     

WORKDIR /data/edge-gateway 

EXPOSE 1880-1884 8080 18090-18199 11880-11889
CMD ["npm","start"]    