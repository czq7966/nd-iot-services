服务 docker 镜像 生成命令：
docker build -t registry.101.com/60b603a0d9419c00107e378d/nd-iot-services-amd64:0.1.2 .
docker build -t nd-iot-services-amd64:0.1.2 .

docker build -t registry.101.com/60b603a0d9419c00107e378d/nd-iot-services-armv7:0.0.2 .

删除镜像
docker image rm registry.101.com/60b603a0d9419c00107e378d/nd-iot-services-amd64:0.0.2

docker image rm registry.101.com/60b603a0d9419c00107e378d/nd-iot-services-armv7:0.0.2

推送镜像
docker push registry.101.com/60b603a0d9419c00107e378d/nd-iot-services-amd64:0.0.2
docker push registry.101.com/60b603a0d9419c00107e378d/nd-iot-services-armv7:0.0.2

拉取镜像
docker push registry.101.com/60b603a0d9419c00107e378d/nd-iot-services-amd64:0.0.2
docker push registry.101.com/60b603a0d9419c00107e378d/nd-iot-services-armv7:0.0.2

本地运行测试
docker run -d -p 11880:11880 -p 11881:11881 -p 11882:11882 registry.101.com/60b603a0d9419c00107e378d/nd-iot-services-amd64:0.0.3 
登入docker镜像服务器
docker  login registry.101.com 





//CMD启动巴法云
set IOT_CONFIG_FILE=E:/data/nd-iot-edge-gateway/docker/config.json&& set IOT_APP_ID=ndiot&& set IOT_PLF_BFY_ID=bfy&& set IOT_ENABLE_PLF_BFY=1&& npm run nd:platform:bfy:start

//启动所有平台
set IOT_CONFIG_FILE=E:/data/nd-iot-edge-gateway/docker/config.json&& set IOT_CODE_BRANCH=dev&& set IOT_APP_ID=ndiot&& set IOT_ENABLE_MQTT=1&& set IOT_ENABLE_DIO=1&& set IOT_ENABLE_DSP=1&& set IOT_ENABLE_EDG=1&& set IOT_ENABLE_PLF_BFY=1&& npm start

//启动DIO
set IOT_APP_ID=ndiot&& set IOT_DIO_ID=ndiot-dio-1&& set IOT_ENABLE_DIO=1&& npm start

//启动PLF_BFY+PLF_NDV1+PLF_NDV2平台 + LOG
set IOT_APP_ID=ndiot&& set IOT_PLF_ID={HOSTNAME}&& set IOT_ENABLE_PLF_NDV1=1&& set IOT_ENABLE_PLF_NDV2=1&& set IOT_ENABLE_PLF_BFY=1&& set IOT_ENABLE_LOG=1&& npm start


//启动DSP+EDG+PLF_BFY+PLF_NDV1+PLF_NDV2平台
set IOT_CONFIG_FILE=E:/data/nd-iot-edge-gateway/docker/config.json&& set IOT_CODE_BRANCH=dev&& set IOT_APP_ID=ndiot&& set IOT_ENABLE_MQTT=1&& set IOT_ENABLE_DSP=1&& set IOT_ENABLE_EDG=1&& set IOT_ENABLE_PLF_NDV1=1&& set IOT_ENABLE_PLF_NDV2=1&& set IOT_ENABLE_PLF_BFY=1&& npm start

//启动test租户
set IOT_APP_ID=ndiot&& set IOT_DSP_ID={HOSTNAME}&& set IOT_EDG_ID={HOSTNAME}&& set IOT_ENABLE_MQTT=1&& set IOT_ENABLE_DSP=0&& set IOT_ENABLE_EDG=1&& npm start



//环境变量
IOT_CODE_BRANCH: 代码分支，默认dev
IOT_CONFIG_FILE：配置文件
IOT_CONFIG_FILE_FIRST：配置文件优先(1：优先)，仅DIO有效
IOT_APP_ID：应用ID，例如：ndiot
IOT_DOM_ID：租户ID，由配置文件决定
IOT_DIO_ID：数据服务ID，默认: {HOSTNAME}
IOT_DSP_ID：调度服务ID，默认: {HOSTNAME}
IOT_EDG_ID：边缘服务ID，默认: {HOSTNAME}
IOT_PLF_ND_ID：ND平台ID
IOT_PLF_BFY_ID：巴法云平台ID
IOT_ENABLE_AUTO_UPDATE：启用自动更新，1：启用
IOT_ENABLE_DIO：启用数据服务，1：启用
IOT_ENABLE_DSP：启用调度服务，1：启用
IOT_ENABLE_EDG：启用边缘服务，1：启用
IOT_ENABLE_PLF_ND：启用ND平台服务，1：启用
IOT_ENABLE_PLF_BFY：启用BFY平台服务，1：启用

win:
docker run -d \
-v /e/iotdata:/data  \
-p 11880:11880 \
-p 11881:11881 \
-p 11882:11882 \
-e IOT_CONFIG_FILE="/data/config.json" \
-e IOT_CODE_BRANCH=dev \
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
-e IOT_CONFIG_FILE_FIRST=0
-e IOT_NGINX_CONF="/services/nd-iot-services/docker/nginx/conf/nginx.conf"
-e IOT_CODE_BRANCH=dev \
-e IOT_ENABLE_AUTO_UPDATE=1 \
-e IOT_APP_ID=ndiot \
-e IOT_DOM_ID=ndiot-dom \
-e IOT_DIO_ID=ndiot-dio \
-e IOT_DSP_ID=ndiot-dsp-nd \
-e IOT_EDG_ID=ndiot-edg-nd \
-e IOT_PLF_ID=ndiot-plf \
-e IOT_ENABLE_NGINX=1 \
-e IOT_ENABLE_MQTT=1 \
-e IOT_ENABLE_DIO=1 \
-e IOT_ENABLE_DSP=1 \
-e IOT_ENABLE_EDG=1 \
-e IOT_ENABLE_PLF_NDV1=1 \
-e IOT_ENABLE_PLF_NDV2=1 \
-e IOT_ENABLE_PLF_BFY=1 

registry.101.com/60b603a0d9419c00107e378d/nd-iot-services:0.0.2 \
npm start


docker run -d -e IOT_CONFIG_FILE="/services/nd-iot-services/docker/config.json" -e IOT_CODE_BRANCH=dev -e IOT_ENABLE_AUTO_UPDATE=1 -p 8080:8080 -p 11881:11881 -p 11882:11882 -p 11883:11883 -p 18090:18090 -p 18091:18091 -p 18092:18092 -p 18093:18093 -p 18094:18094 -p 18095:18095 -p 18096:18096 -e IOT_APP_ID=ndiot -e IOT_ENABLE_MQTT=1 -e IOT_ENABLE_DIO=1 -e IOT_ENABLE_DSP=1 -e IOT_ENABLE_EDG=1 registry.101.com/60b603a0d9419c00107e378d/nd-iot-services-amd64:0.0.3 

docker run -d -e IOT_CONFIG_FILE="/services/nd-iot-services/docker/config.json" -e IOT_CODE_BRANCH=dev -e IOT_ENABLE_AUTO_UPDATE=1 -p 8080:8080 -p 11881:11881 -p 11882:11882 -p 11883:11883 -p 18090:18090 -p 18091:18091 -p 18092:18092 -p 18093:18093 -p 18094:18094 -p 18095:18095 -p 18096:18096 -e IOT_APP_ID=ndiot -e IOT_ENABLE_MQTT=1 -e IOT_ENABLE_DSP=1 -e IOT_ENABLE_EDG=1 registry.101.com/60b603a0d9419c00107e378d/nd-iot-services-amd64:0.0.3 

//ND租户
docker run -it -p 80:8080  -e IOT_CODE_BRANCH=dev -e IOT_ENABLE_AUTO_UPDATE=0  -e IOT_ENABLE_NGINX=1  -e IOT_ENABLE_MQTT=1 -e IOT_ENABLE_DSP=1 -e IOT_ENABLE_EDG=1 -e IOT_APP_ID=ndiot -e IOT_DSP_ID=ndiot-dsp-xxx -e IOT_EDG_ID=ndiot-edg-xxx nd-iot-services-amd64:0.1.0


//test租户
docker run -it -p 80:8080  -e IOT_CODE_BRANCH=dev -e IOT_ENABLE_AUTO_UPDATE=0  -e IOT_ENABLE_NGINX=1  -e IOT_ENABLE_MQTT=1  -e IOT_ENABLE_EDG=1 -e IOT_APP_ID=ndiot -e IOT_EDG_ID=ndiot-edg-test nd-iot-services-amd64:0.1.2


//ArmBian 安装Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh --mirror Aliyun