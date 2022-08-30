const path = require("path");

let exec = require("child_process").exec;
let execSync = require("child_process").execSync;
let spawn = require("child_process").spawn;
let useSpawn = true;

let init = () => {
    process.env.IOT_CONFIG_FILE = process.env.IOT_CONFIG_FILE || path.resolve(__dirname, "config.json");
    process.env.IOT_NGINX_CONF = process.env.IOT_NGINX_CONF ||  path.resolve(__dirname, "docker/nginx/conf/nginx.conf");  
}

let isWin32 = () => {
    return process.platform == "win32";
}

//更新代码
let updateCode = (codeDir, sync) => {
    console.log(codeDir);

    let branch = process.env.IOT_CODE_BRANCH || "dev";
    let cmd = "cd " + codeDir +" && git fetch && git reset --hard && git checkout origin/" + branch + " && npm run nd:install || echo";
    if (sync) {
        execSync(cmd, {stdio: 'inherit'})
    } else {
        exec(cmd, function(error, stdout, stderr) {
            if (error || stderr)
                console.error("update code error: %s, %s , %s!", codeDir, error, stderr);
            if (stdout)
                console.log("%s", stdout );
        });         
    }
}

let updateZ2M = (sync) => {
    let codeDir = path.join(__dirname, "../zigbee2mqtt");
    updateCode(codeDir, sync);
}

let updateServices = (sync) => {
    let codeDir = path.join(__dirname);
    updateCode(codeDir, sync);
}

//本地NGINX服务
let startNGINX = () => {
    if (useSpawn) {
        let cmd = "sudo"; 
        let conf = process.env.IOT_NGINX_CONF || "/usr/local/nginx/conf/nginx.conf";
        let args = ["/usr/local/nginx/sbin/nginx", "-c", conf];
        let child = spawn(cmd, args, { stdio: 'inherit'});         
        child.on("close", (code, signal) => {
            if (code != 0)
                console.error("nginx start error: %d", code);
            else 
                console.info("nginx started(close event)");
        });
    }else {
        let cmd = "sudo /usr/local/nginx/sbin/nginx"; 
        exec(cmd, function(error, stdout, stderr) {
            if (error || stderr)
                console.error("nginx start error: %s , %s!", error, stderr);
        });  
    }
    console.log("nginx started");
}


//本地MQTT服务
let startMQTT = () => {
    if (useSpawn) {
        let cmd = "node"; 
        let args = ["./src/index.js"];
        let cwd = path.resolve(__dirname, "../", "nd-iot-mqtt-broker");
        let child = spawn(cmd, args, { stdio: 'inherit', cwd: cwd});         
        child.on("close", (code, signal) => {
                console.error("mqtt closed");
                setTimeout(() => {
                        startMQTT();               
                }, 1000);
        });
    }else {
        let cmd = "npm run nd:mqtt:start"; 
        exec(cmd, function(error, stdout, stderr) {
            if (error || stderr)
                console.error("mqtt service error: %s , %s!", error, stderr);

            if (isWin32()) 
                console.error("mqtt service stopped");
        });  
    }
    console.log("mqtt started");
}

//数据服务
let startDIO = () => {  
    if (useSpawn) {
        let cmd = "node"; 
        let args = ["./index.js", "-u", "./data/dataio/nd"];
        let cwd = path.resolve(__dirname);

        let child = spawn(cmd, args, { stdio: 'inherit', cwd: cwd});    
        child.on("error", (code) => {
            console.error("dataio error: " + code);
        })   
        child.on("close", (code, signal) => {
                console.error("dataio closed");
                setTimeout(() => {
                    startDIO();               
                }, 1000);
        });
    }else {
        let cmd = "npm run nd:dataio:start"; 
        exec(cmd, function(error, stdout, stderr) {
            if (error || stderr)
                console.error("dataio service error: %s , %s!", error, stderr);

            if (isWin32()) 
                console.error("dataio service stopped");
        });
    }
    console.log("dataio started");
}

//调度服务
let startDSP = () => {    
    if (useSpawn) {
        let cmd = "node"; 
        let args = ["./index.js", "-u", "./data/dispatcher/nd"];
        let cwd = path.resolve(__dirname);

        let child = spawn(cmd, args, { stdio: 'inherit', cwd: cwd});    
        child.on("error", (code) => {
            console.error("dispatcher error: " + code);
        })     
        child.on("close", (code, signal) => {
                console.error("dispatcher closed");
                setTimeout(() => {
                    startDSP();               
                }, 1000);
        });
    }else {
        let cmd = "npm run nd:dispatcher:start";
        exec(cmd, function(error, stdout, stderr) {
            if (error || stderr)
                console.error("dispatcher service error: %s , %s!", error, stderr);

            if (isWin32()) 
                console.error("dispatcher service stopped");
        });
    }
    console.log("dispatcher started");
}

//边缘服务
let startEDG = () => {    
    if (useSpawn) {
        let cmd = "node"; 
        let args = ["./index.js", "-u", "./data/edge/nd"];
        let cwd = path.resolve(__dirname);

        let child = spawn(cmd, args, { stdio: 'inherit', cwd: cwd});    
        child.on("error", (code) => {
            console.error("edge error: " + code);
        })      
        child.on("close", (code, signal) => {
                console.error("edge closed");
                setTimeout(() => {
                    startEDG();               
                }, 1000);
        });
    }else {
        let cmd = "npm run nd:edge:start"; 
        exec(cmd, function(error, stdout, stderr) {
            if (error || stderr)
                console.error("edge service error: %s , %s!", error, stderr);

            if (isWin32()) 
                console.error("edge service stopped");
        });
    }
    console.log("edge started");
}

//NDV1平台对接服务
let startPLF_NDV1 = () => {    
    if (useSpawn) {
        let cmd = "node"; 
        let args = ["./index.js", "-u", "./data/platform/ndv1"];
        let cwd = path.resolve(__dirname);

        let child = spawn(cmd, args, { stdio: 'inherit', cwd: cwd});    
        child.on("error", (code) => {
            console.error("edge error: " + code);
        })     
        child.on("close", (code, signal) => {
                console.error("platform ndv1 closed");
                setTimeout(() => {
                    startPLF_ND();               
                }, 1000);
        });
    }else {
        let cmd = "npm run nd:platform:ndv1:start";
        exec(cmd, function(error, stdout, stderr) {
            if (error || stderr)
                console.error("platform ndv1 service error: %s , %s!", error, stderr);

            if (isWin32()) 
                console.error("platform ndv1 service stopped");
        });
    }
    console.log("platform ndv1 started");
}

//NDV1平台对接服务
let startPLF_NDV2 = () => {    
    if (useSpawn) {
        let cmd = "node"; 
        let args = ["./index.js", "-u", "./data/platform/ndv2"];
        let cwd = path.resolve(__dirname);

        let child = spawn(cmd, args, { stdio: 'inherit', cwd: cwd});    
        child.on("error", (code) => {
            console.error("edge error: " + code);
        })     
        child.on("close", (code, signal) => {
                console.error("platform nd closed");
                setTimeout(() => {
                    startPLF_ND();               
                }, 1000);
        });
    }else {
        let cmd = "npm run nd:platform:ndv2:start";
        exec(cmd, function(error, stdout, stderr) {
            if (error || stderr)
                console.error("platform ndv2 service error: %s , %s!", error, stderr);

            if (isWin32()) 
                console.error("platform ndv2 service stopped");
        });
    }
    console.log("platform ndv2 started");
}

//巴法云平台对接服务
let startPLF_BFY = () => {    
    if (useSpawn) {
        let cmd = "node"; 
        let args = ["./index.js", "-u", "./data/platform/bfy"];
        let cwd = path.resolve(__dirname);

        let child = spawn(cmd, args, { stdio: 'inherit', cwd: cwd});    
        child.on("error", (code) => {
            console.error("edge error: " + code);
        })       
        child.on("close", (code, signal) => {
                console.error("platform bfy closed");
                setTimeout(() => {
                    startPLF_BFY();               
                }, 1000);
        });
    }else {
        let cmd = "npm run nd:platform:bfy:start";
        exec(cmd, function(error, stdout, stderr) {
            if (error || stderr)
                console.error("platform bfy service error: %s , %s!", error, stderr);

            if (isWin32()) 
                console.error("platform bfy service stopped");
        });
    }
    console.log("platform bfy started");
}

//数据采集服务LOG
let startLOG = () => {    
    if (useSpawn) {
        let cmd = "node"; 
        let args = ["./index.js", "-u", "./data/log/nd"];
        let cwd = path.resolve(__dirname);

        let child = spawn(cmd, args, { stdio: 'inherit', cwd: cwd});    
        child.on("error", (code) => {
            console.error("log error: " + code);
        })       
        child.on("close", (code, signal) => {
                console.error("log closed");
                setTimeout(() => {
                    startLOG();               
                }, 1000);
        });
    }else {
        let cmd = "npm run nd:log:start";
        exec(cmd, function(error, stdout, stderr) {
            if (error || stderr)
                console.error("log service error: %s , %s!", error, stderr);

            if (isWin32()) 
                console.error("log service stopped");
        });
    }
    console.log("log started");
}

//Mongo数据库服务L
let startMDB = () => {    
    if (useSpawn) {
        let cmd = "mongod"; 
        let args = [];
        let cwd = path.resolve("/usr/bin");

        let child = spawn(cmd, args, { stdio: 'inherit', cwd: cwd});    
        child.on("error", (code) => {
            console.error("mongo error: " + code);
        })       
        child.on("close", (code, signal) => {
                console.error("mongo closed");
                setTimeout(() => {
                    startMDB();               
                }, 1000);
        });
    }else {
        let cmd = "/usr/bin/mongod";
        exec(cmd, function(error, stdout, stderr) {
            if (error || stderr)
                console.error("mongo service error: %s , %s!", error, stderr);

            if (isWin32()) 
                console.error("mongo service stopped");
        });
    }
    console.log("mongo started");
}

let testZ2M = (datadir) => {
    process.env.ZIGBEE2MQTT_DATA = datadir;
    let cmd = "node"; 
    let args = ["../zigbee2mqtt/index.js"];
    // let cwd = path.resolve(__dirname, "../", "zigbee2mqtt");
    let child = spawn(cmd, args, { stdio: 'inherit'});         
    child.on("close", (code, signal) => {
            console.error("zigbee2mqtt closed");

    });    
};

//初始化
init();
console.log(process.env);

//更新代码
if (process.env.IOT_ENABLE_AUTO_UPDATE == "1") {
    updateZ2M(true);
    updateServices(true);
}

//启动NGINX
if (process.env.IOT_ENABLE_NGINX == "1") {
    startNGINX();
}

//启动MQTT
if (process.env.IOT_ENABLE_MQTT == "1") {
    startMQTT();
}

//启动DIO
if (process.env.IOT_ENABLE_DIO == "1") {
    startDIO();
}

//启动DSP
if (process.env.IOT_ENABLE_DSP == "1") {
    startDSP();
}

//启动EDG
if (process.env.IOT_ENABLE_EDG == "1") {
    startEDG();
}

//启动PLF-NDV1
if (process.env.IOT_ENABLE_PLF_NDV1 == "1") {
    startPLF_NDV1();
}  

//启动PLF-NDV2
if (process.env.IOT_ENABLE_PLF_NDV2 == "1") {
    startPLF_NDV2();
}  

//启动PLF-BFY
if (process.env.IOT_ENABLE_PLF_BFY == "1") {
    startPLF_BFY();
} 

//启动LOG
if (process.env.IOT_ENABLE_LOG == "1") {
    startLOG();
}

//启动MongoDB
if (process.env.IOT_ENABLE_MDB == "1") {
    startMDB();
}

// testZ2M("E:/iotdata/zigbee2mqtt/data/ESP8266x00c17ca1");
// process.env.ZIGBEE2MQTT_DATA = "";
// testZ2M("E:/iotdata/zigbee2mqtt/data/ESP8266x0006cf1d");


// require("./src/http-server.js");

