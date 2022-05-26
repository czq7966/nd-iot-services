let exec = require("child_process").exec;
let execSync = require("child_process").execSync;
let spawn = require("child_process").spawn;
let useSpawn = false;

let isWin32 = () => {
    return process.platform == "win32";
}

//更新代码
let updateCode = (sync) => {
    let branch = env.IOT_CODE_BRANCH || "dev";
    let cmd = "git stash && git fetch && git reset --hard && git checkout " + branch;
    if (sync) {
        execSync(cmd, {stdio: 'inherit'})
    } else {
        exec(cmd, function(error, stdout, stderr) {
            if (error || stderr)
                console.error("mqtt service error: %s , %s!", error, stderr);
            if (stdout)
                console.log("%s", stdout );
        });         
    }

}

//本地MQTT服务
let startMQTT = () => {
    let cmd;
    if (isWin32()) 
        cmd = "npm run nd:mqtt:start";       
    else 
        cmd = "npm run nd:mqtt:service:start";
    if (useSpawn) {
        spawn(cmd);
    }else {
        exec(cmd, function(error, stdout, stderr) {
            if (error || stderr)
                console.error("mqtt service error: %s , %s!", error, stderr);

            if (isWin32()) 
                console.error("mqtt service stopped");
        });  
    }
}

//数据服务
let startDIO = () => {    
    let cmd;
    if (isWin32()) 
        cmd = "npm run nd:dataio:start";               
    else 
        cmd = "npm run nd:dataio:service:start";

    if (useSpawn) {
        spawn(cmd);
    }else {
        exec(cmd, function(error, stdout, stderr) {
            if (error || stderr)
                console.error("dataio service error: %s , %s!", error, stderr);

            if (isWin32()) 
                console.error("dataio service stopped");
        });
    }
}

//调度服务
let startDSP = () => {    
    let cmd;
    if (isWin32()) 
        cmd = "npm run nd:dispatcher:start";               
    else 
        cmd = "npm run nd:dispatcher:service:start";

    if (useSpawn) {
        spawn(cmd);
    }else {
        exec(cmd, function(error, stdout, stderr) {
            if (error || stderr)
                console.error("dispatcher service error: %s , %s!", error, stderr);

            if (isWin32()) 
                console.error("dispatcher service stopped");
        });
    }
}

//边缘服务
let startEDG = () => {    
    let cmd;
    if (isWin32()) 
        cmd = "npm run nd:edge:start";               
    else 
        cmd = "npm run nd:edge:service:start";
    if (useSpawn) {
        spawn(cmd);
    }else {
        exec(cmd, function(error, stdout, stderr) {
            if (error || stderr)
                console.error("edge service error: %s , %s!", error, stderr);

            if (isWin32()) 
                console.error("edge service stopped");
        });
    }
}

//ND平台对接服务
let startPLF_ND = () => {    
    // let cmd;
    // if (isWin32()) 
    //     cmd = "npm run nd:edge:start";               
    // else 
    //     cmd = "npm run nd:edge:service:start";

    // exec(cmd, function(error, stdout, stderr) {
    //     if (error || stderr)
    //         console.error("edge service error: %s , %s!", error, stderr);

    //     if (isWin32()) 
    //         console.error("edge service stopped");
    // });
}

if (process.env.IOT_ENABLE_AUTO_UPDATE == "1") {
    updateCode(true);
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




require("./src/http-server.js");


console.log(process.env);