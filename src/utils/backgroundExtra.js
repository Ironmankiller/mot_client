import {
  app,
  ipcMain,
  Tray,
  Menu,
  shell,
  dialog,
  Notification,
} from "electron";
import path from "path";
import pkg from "../../package.json";





// 处理小图标功能
let tray;
export function createTray(setPosition) {
  tray = new Tray(path.join(__static, "./tray.png"));

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "问题反馈",
      click: () => {
        shell.openExternal(
          "https://github.com/Ironmankiller/mot_client/issues"
        );
      },
    },
    {
      label: "关于",
      role: "abort",
      click() {
        dialog.showMessageBox({
          title: pkg.name,
          message: pkg.description,
          detail: `Version: ${pkg.version}\nAuthor: ${pkg.author}\nGithub: https://github.com/Ironmankiller/mot_client`,
        });
      },
    },
    {
      label: "退出",
      role: "quit",
    },
  ]);
  tray.setContextMenu(contextMenu);

  tray.setToolTip(pkg.name);

  tray.on("click", (event, bounds, position) => {
    setPosition();
  });
}
