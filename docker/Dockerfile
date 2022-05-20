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
    &&  cd /services/nd-iot-services \
    &&  npm run nd:install \
    &&  cd /services/nd-iot-services    

COPY ./service/nd-iot-service-dsp.service /lib/systemd/system/nd-iot-service-dsp.service
RUN systemctl enable nd-iot-service-dsp   

COPY ./service/nd-iot-service-edg.service /lib/systemd/system/nd-iot-service-edg.service
RUN systemctl enable nd-iot-service-edg 

WORKDIR /services/nd-iot-services

EXPOSE 1880-1884 8080-8090 18090-18199 11880-11889
CMD ["npm","run", "services:start"]