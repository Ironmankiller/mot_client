// vue.config.js

module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: "目标检测与跟踪上位机",
        productName: "目标检测与跟踪上位机",
        copyright: "Copyright © 2021 hust",
        // directories: {
        //   output: "./dist", //输出文件路径
        // },
        win: {
          icon: "./public/logo.ico",
          target: "nsis",
        },
        nsis: {
          oneClick: false,
          allowToChangeInstallationDirectory: true,
          shortcutName: "目标检测与跟踪上位机",
        },
        publish: ["github"],
        // releaseInfo: {
        //   releaseName: "",
        //   releaseNotes: "",
        //   releaseDate: "",
        // },
      },
      nodeIntegration: true,
    },
  },
  configureWebpack: {
    externals: {},
  },
};
