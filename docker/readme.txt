服务 docker 镜像 生成命令：
docker build -t registry.101.com/60b603a0d9419c00107e378d/nd-iot-services:0.0.1 .

本地运行测试
docker run -d -p 11880:11880 -p 11881:11881 -p 11882:11882 registry.101.com/60b603a0d9419c00107e378d/nd-iot-services:0.0.1 
登入docker镜像服务器
docker  login registry.101.com 

推送镜像
docker push registry.101.com/60b603a0d9419c00107e378d/cmd-gateway:0.0.6


环境变量
docker: -e IOT_CONFIG_FILE="/services/nd-iot-services/docker/config.json" -e IOT_APP_ID=ndiot -e IOT_DOM_ID=nd -e IOT_DSP_ID=nd -e IOT_PLF_ND_ID=nd -e IOT_PLF_XIAOAI_ID=xiaoai -e IOT_ENABLE_DSP=1 -e IOT_ENABLE_EDG=1 -e IOT_ENABLE_PLF=1 -e IOT_ENABLE_PLF_ND=0  -e IOT_ENABLE_PLF_XIAOAI=0
node: cross-env IOT_CONFIG_FILE=\"E:/data/nd-iot-edge-gateway/docker/config.json\" IOT_APP_ID=ndiot IOT_DOM_ID=nd IOT_DSP_ID=nd IOT_PLF_ID=\"nd,xiaomi\" IOT_ENABLE_DSP=1 IOT_ENABLE_EDG=1 IOT_ENABLE_PLF=1
win: set IOT_CONFIG_FILE=E:/data/nd-iot-edge-gateway/docker/config.json&& set IOT_APP_ID=ndiot&& set IOT_DOM_ID=nd&& set IOT_DSP_ID=nd&& set IOT_PLF_ID=nd,xiaomi&& set IOT_ENABLE_DSP=1&& set IOT_ENABLE_EDG=1&& set IOT_ENABLE_PLF=1

win->
DIO:
set IOT_CONFIG_FILE=E:/data/nd-iot-edge-gateway/docker/config.json&& set IOT_APP_ID=ndiot&& set IOT_ENABLE_DIO=1&&  npm run nd:dataio:start
set IOT_APP_ID=ndiot&& set IOT_ENABLE_DIO=1&& npm run nd:dataio:start

DSP:
set IOT_CONFIG_FILE=E:/data/nd-iot-edge-gateway/docker/config.json&& set IOT_ENABLE_DIO=1&& set IOT_ENABLE_DSP=1&& set IOT_ENABLE_EDG=1&& set IOT_ENABLE_PLF=1 && npm run nd:dispatcher:start

EDG:
set IOT_CONFIG_FILE=E:/data/nd-iot-edge-gateway/docker/config.json&& set IOT_ENABLE_DIO=1&& set IOT_ENABLE_DSP=1&& set IOT_ENABLE_EDG=1&& set IOT_ENABLE_PLF=1 && npm run nd:edge:start


set IOT_APP_ID=ndiot&& set IOT_ENABLE_DIO=1&& set IOT_ENABLE_DSP=1&& set IOT_ENABLE_EDG=1&& npm start


set IOT_CONFIG_FILE=E:/data/nd-iot-edge-gateway/docker/config.json&& set IOT_ENABLE_MQTT=1&& set IOT_ENABLE_DIO=1&& set IOT_ENABLE_DSP=1&& set IOT_ENABLE_EDG=1&& npm start



//环境变量
IOT_CONFIG_FILE：配置文件
IOT_CONFIG_FILE_FIRST：配置文件优先(1：优先)，仅DIO有效
IOT_APP_ID：应用ID，例如：ndiot
IOT_DOM_ID：租户ID，由配置文件决定
IOT_DIO_ID：数据服务ID，默认: {HOSTNAME}
IOT_DSP_ID：调度服务ID，默认: {HOSTNAME}
IOT_EDG_ID：边缘服务ID，默认: {HOSTNAME}
IOT_PLF_ND_ID：ND平台ID，默认: {HOSTNAME}
IOT_ENABLE_DIO：启用数据服务，1：启用
IOT_ENABLE_DSP：启用调度服务，1：启用
IOT_ENABLE_EDG：启用边缘服务，1：启用
IOT_ENABLE_PLF_ND：启用边缘服务，1：启用

win:
docker run -d \
-v /e/iotdata:/data  \
-p 11880:11880 \
-p 11881:11881 \
-p 11882:11882 \
-e IOT_CONFIG_FILE="/data/config.json" \
-e IOT_APP_ID=ndiot \
-e IOT_DOM_ID=nd \
-e IOT_DSP_ID=nd \
-e IOT_PLF_ND_ID=nd \
-e IOT_PLF_XIAOAI_ID=xiaoai \
-e IOT_ENABLE_MQTT=1 \
-e IOT_ENABLE_DSP=1 \
-e IOT_ENABLE_EDG=1 \
-e IOT_ENABLE_PLF=1 \
-e IOT_ENABLE_PLF_ND=0  \
-e IOT_ENABLE_PLF_XIAOAI=0 \

registry.101.com/60b603a0d9419c00107e378d/nd-iot-services:0.0.2 \
/bin/bash

docker:
docker run -d \
-e IOT_CONFIG_FILE="/services/nd-iot-services/docker/config.json" \
-p 11880:11880 \
-p 11881:11881 \
-p 11882:11882 \
-p 11883:11883 \
-p 18090:18090 \
-p 18091:18091 \
-p 18092:18092 \
-p 18093:18093 \
-p 18094:18094 \
-p 18095:18095 \
-p 18096:18096 \
-e IOT_APP_ID=ndiot \
-e IOT_ENABLE_MQTT=1 \
-e IOT_ENABLE_DIO=1 \
-e IOT_ENABLE_DSP=1 \
-e IOT_ENABLE_EDG=1 \
registry.101.com/60b603a0d9419c00107e378d/nd-iot-services:0.0.2 \
npm start


docker run -d -e IOT_CONFIG_FILE="/services/nd-iot-services/docker/config.json" -p 11880:11880 -p 11881:11881 -p 11882:11882 -p 11883:11883 -p 18090:18090 -p 18091:18091 -p 18092:18092 -p 18093:18093 -p 18094:18094 -p 18095:18095 -p 18096:18096 -e IOT_APP_ID=ndiot -e IOT_ENABLE_MQTT=1 -e IOT_ENABLE_DIO=1 -e IOT_ENABLE_DSP=1 -e IOT_ENABLE_EDG=1 registry.101.com/60b603a0d9419c00107e378d/nd-iot-services:0.0.2 npm start
