const { app, BrowserWindow, ipcMain,screen,Menu  } = require('electron')
const path = require('path')
const fs = require('fs')
const sound = require("sound-play");
const { exec } = require('child_process');

app.commandLine.appendSwitch('no-sandbox')
app.commandLine.appendSwitch('disable-gpu')
app.commandLine.appendSwitch('disable-software-rasterizer')
app.commandLine.appendSwitch('disable-gpu-compositing')
app.commandLine.appendSwitch('disable-gpu-rasterization')
app.commandLine.appendSwitch('disable-gpu-sandbox')
app.commandLine.appendSwitch('--no-sandbox')
app.disableHardwareAcceleration();


function shutdownWindow() {
    let command = exec('shutdown -s -t 00', function(err, stdout, stderr) {
        if(err || stderr) {
            console.log("shutdown failed" + err + stderr);
        }
    });
    command.stdin.end();
    command.on('close', function(code) {
        console.log("shutdown",  code);
    });
}

let tipWin
function createTipWin(musicPath){
    Menu.setApplicationMenu(null)
    //创建新窗口
    const primaryDisplay = screen.getPrimaryDisplay()
    const { width, height } = primaryDisplay.workAreaSize
    tipWin = new BrowserWindow({
        frame:false,
        x:width - 300,
        y:height - 100,
        width: 300,
        height: 100,
        resizable:false,
        webPreferences: {
            preload: path.join(__dirname, './tip/preload.js'),
            nodeIntegration:true,
            contextIsolation: true,
            webSecurity: false
        }
    })
    tipWin.loadFile('./tip/index.html')
    sound.play(musicPath).then((response) => shutdownWindow());
}

let win
function createWindow () {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        resizable:false,
        webPreferences: {
            preload: path.join(__dirname, './preload.js'),
            nodeIntegration:true,
            contextIsolation: false,
            webSecurity: false
        }
    })

   /* if(app.isPackaged){
        win.loadFile('./public/index.html')
    }else{
        win.loadURL('http://127.0.0.1:3000/')
    }*/


    win.loadFile('./index.html')



}



app.whenReady().then(() => {
    createWindow()

    /*setTimeout(() =>{
        console.log('定时任务触发啦----00000000000000')
        win.hide()
        createTipWin()
    },3000)*/
    //定时器触发
    ipcMain.on('scheduleJob', (event, value) => {
        //放歌
        const {musicPath} = JSON.parse(value)
        win.hide()
        createTipWin(musicPath)
        tipWin.webContents.send('scheduleJob-small',JSON.stringify(value))
    })


    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        win = null
        tipWin = null
        app.quit()
    }
})
