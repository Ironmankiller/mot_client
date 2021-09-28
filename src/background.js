"use strict";

import { app, protocol, BrowserWindow, ipcMain, Menu, MenuItem, globalShortcut } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import { createTray } from "@/utils/backgroundExtra";
// import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
const isDevelopment = process.env.NODE_ENV !== "production";

let win;

// 获取单例锁，当打开的第二个应用运行此函数时，second-instance
// 事件将会在首个应用中触发，从而导致重新定位，而不是打开两个实例。
if (app.requestSingleInstanceLock()) {
  app.on("second-instance", (event, commandLine, workingDirectory) => {
    if (win) {
      setPosition();
    }
  });
} else {
  app.quit();
}

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1080,
    height: 720,
    minWidth: 720,
    minHeight: 540,
    frame: false,
    title: "目标检测与跟踪上位机",
    // transparent: true,
    useContentSize: true,
    flashFrame: true,
    webPreferences: {
      // Required for Spectron testing
      enableRemoteModule: !!process.env.IS_TEST,

      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      enableRemoteModule: true,
    },
  });

  setPosition();

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
    globalShortcut.register('CommandOrControl+D', () => {
      win.webContents.openDevTools();
    })
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }


  // 窗口大小改变
  win.on('resized', (e) => {
    win.webContents.send('resizeEvent')
  })
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  // 阻止Devtools可以加快编译速度
  // if (isDevelopment && !process.env.IS_TEST) {
  //   // Install Vue Devtools
  //   try {
  //     await installExtension(VUEJS_DEVTOOLS);
  //   } catch (e) {
  //     console.error("Vue Devtools failed to install:", e.toString());
  //   }
  // }
  initApplication();
});

function initApplication() {
  createWindow();

  createTray(setPosition);
}

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}

// 设置窗口定位
function setPosition() {
  win.setPosition(60, 60);
}


// 处理主进程和渲染进程之间的通信问题
ipcMain.handle("getDataPath", (event) => {
  return app.getPath("userData");
});

// 1. 窗口 最小化
ipcMain.on('window-min',function(){ // 收到渲染进程的窗口最小化操作的通知，并调用窗口最小化函数，执行该操作
  win.minimize();
})

// 2. 窗口 最大化、恢复
ipcMain.on('window-max',function () {
  if(win.isMaximized()){ // 为true表示窗口已最大化
      win.restore();// 将窗口恢复为之前的状态.
  }else{
      win.maximize();
  }
  win.webContents.send('resizeEvent')
})

// 3. 关闭窗口
ipcMain.on('window-close',function (){
  win.close();
})
