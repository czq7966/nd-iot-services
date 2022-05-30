FROM node:16.13.0
COPY sources.list /etc/apt/sources.list
RUN apt-get update \
    && apt-get install systemctl \
    && apt-get install sudo \
    && apt-get install vim -y \
    && apt-get install nano

RUN rm -f /etc/localtime \
    && ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && mkdir -p /home/iot \
    && groupadd -r iot \
    && useradd -r -g iot -d /home/iot -u 8080 iot \
    && usermod -a -G sudo iot \
    && usermod -a -G adm iot \
    && usermod -a -G staff iot \
    && chown -R iot:iot /home/iot \
    && mkdir -p /services \
    && mkdir -p /data \
    && chown -R iot:iot /services \
    && chown -R iot:iot /data \
    && echo "iot    ALL=(ALL:ALL) NOPASSWD:ALL" >> /etc/sudoers \
    && echo "%sudo  ALL=(ALL:ALL) NOPASSWD:ALL" >> /etc/sudoers \
    && echo "root:123456" | chpasswd

USER iot     

RUN mkdir -p /services \
    &&  cd /services \
    &&  git clone https://github.com/czq7966/nd-iot-mqtt-broker.git nd-iot-mqtt-broker -b dev \
    &&  cd /services/nd-iot-mqtt-broker \
    &&  npm install   

RUN mkdir -p /services \
    &&  cd /services \
    &&  git clone https://github.com/czq7966/zigbee2mqtt.git zigbee2mqtt -b dev \
    &&  cd /services/zigbee2mqtt \
    &&  npm install  

COPY ./service/. /lib/systemd/system/.

# RUN sudo systemctl enable nd-iot-mqtt-broker
# RUN sudo systemctl enable nd-iot-service-dio
# RUN sudo systemctl enable nd-iot-service-dsp
# RUN sudo systemctl enable nd-iot-service-edg
RUN sudo systemctl daemon-reload

# RUN mkdir -p /services \
#     &&  cd /services \
#     &&  git clone https://github.com/czq7966/nd-iot-services.git nd-iot-services -b dev \
#     &&  cd /services/nd-iot-services \
#     &&  npm run nd:install \
#     &&  cd /services/nd-iot-services    


WORKDIR /services/nd-iot-services

EXPOSE 1880-1884 8080-8090 18090-18199 11880-11889
CMD ["npm","start"]