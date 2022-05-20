服务 docker 镜像 生成命令：
docker build -t registry.101.com/60b603a0d9419c00107e378d/nd-iot-services:0.0.1 .

本地运行测试
docker run -t registry.101.com/60b603a0d9419c00107e378d/nd-iot-services:0.0.1 
登入docker镜像服务器
docker  login registry.101.com 

推送镜像
docker push registry.101.com/60b603a0d9419c00107e378d/cmd-gateway:0.0.6


环境变量
docker: -e IOT_CONFIG_FILE="E:/data/nd-iot-edge-gateway/docker/config.json" -e IOT_APP_ID=ndiot -e IOT_DOM_ID=nd -e IOT_DSP_ID=nd -e IOT_PLF_ND_ID=nd -e IOT_PLF_XIAOAI_ID=xiaoai -e IOT_ENABLE_DSP=1 -e IOT_ENABLE_EDG=1 -e IOT_ENABLE_PLF=1 -e IOT_ENABLE_PLF_ND=0  -e IOT_ENABLE_PLF_XIAOAI=0
node: cross-env IOT_CONFIG_FILE=\"E:/data/nd-iot-edge-gateway/docker/config.json\" IOT_APP_ID=ndiot IOT_DOM_ID=nd IOT_DSP_ID=nd IOT_PLF_ID=\"nd,xiaomi\" IOT_ENABLE_DSP=1 IOT_ENABLE_EDG=1 IOT_ENABLE_PLF=1
win: set IOT_CONFIG_FILE=E:/data/nd-iot-edge-gateway/docker/config.json&& set IOT_APP_ID=ndiot&& set IOT_DOM_ID=nd&& set IOT_DSP_ID=nd&& set IOT_PLF_ID=nd,xiaomi&& set IOT_ENABLE_DSP=1&& set IOT_ENABLE_EDG=1&& set IOT_ENABLE_PLF=1