const path = require("path");

let exec = require("child_process").exec;
let execSync = require("child_process").execSync;
let spawn = require("child_process").spawn;
let useSpawn = true;

let isWin32 = () => {
    return process.platform == "win32";
}

//更新代码
let updateCode = (codeDir, sync) => {
    console.log(codeDir);

    let branch = process.env.IOT_CODE_BRANCH || "dev";
    let cmd = "cd " + codeDir +" && git fetch && git reset --hard && git checkout origin/" + branch + " || echo";
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

//ND平台对接服务
let startPLF_ND = () => {    
    if (useSpawn) {
        let cmd = "node"; 
        let args = ["./index.js", "-u", "./data/platform/nd"];
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
        let cmd = "npm run nd:platform:nd:start";
        exec(cmd, function(error, stdout, stderr) {
            if (error || stderr)
                console.error("platform nd service error: %s , %s!", error, stderr);

            if (isWin32()) 
                console.error("platform nd service stopped");
        });
    }
    console.log("platform nd started");
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

if (process.env.IOT_ENABLE_AUTO_UPDATE == "1") {
    updateZ2M(true);
    updateServices(true);
}

if (process.env.IOT_ENABLE_MQTT == "1") {
    startMQTT();
}

if (process.env.IOT_ENABLE_DIO == "1") {
    startDIO();
}

if (process.env.IOT_ENABLE_DSP == "1") {
    startDSP();
}

if (process.env.IOT_ENABLE_EDG == "1") {
    startEDG();
}

if (process.env.IOT_ENABLE_PLF_ND == "1") {
    startPLF_ND();
}  

if (process.env.IOT_ENABLE_PLF_BFY == "1") {
    startPLF_BFY();
} 

// testZ2M("E:/iotdata/zigbee2mqtt/data/ESP8266x00c17ca1");
// process.env.ZIGBEE2MQTT_DATA = "";
// testZ2M("E:/iotdata/zigbee2mqtt/data/ESP8266x0006cf1d");


require("./src/http-server.js");


// console.log(process.env);