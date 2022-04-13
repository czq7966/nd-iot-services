服务 docker 镜像 生成命令：
docker build -t registry.101.com/60b603a0d9419c00107e378d/edge-gateway:0.0.1 .

本地运行测试
docker run -t registry.101.com/60b603a0d9419c00107e378d/cmd-gateway:0.0.6
登入docker镜像服务器
docker  login registry.101.com 

推送镜像
docker push registry.101.com/60b603a0d9419c00107e378d/cmd-gateway:0.0.6


