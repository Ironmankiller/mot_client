<template>
  <div class="header">
    <div id="left-icon">
      <div class="iconfont icon-genzong"></div>
    </div>
    <div id="center-text">{{ appName }}</div>
    <div id="right-icon">
      <div class="iconfont icon-zuixiaohua" @click="minimizeWin"></div>
      <div class="iconfont icon-zuidahua" @click="maximizeWin"></div>
      <div class="iconfont icon-guanbi" @click="closeWin"></div>
    </div>
  </div>
</template>
<script>
import { ipcRenderer} from 'electron';
import "element-ui"

export default {
  name: 'header',
  data() {
      return {
          appName: "HMI for Object Detection and Tracking"
      };
  }, 
  methods: {
     minimizeWin(){
       console.log(123)
       ipcRenderer.send('window-min') // 通知主进程我要进行窗口最小化操作
    },
    maximizeWin(){
      ipcRenderer.send('window-max')
    },
    closeWin(){
      ipcRenderer.send('window-close')
    }
  }
}
</script>
<style lang="scss">
.header {
    -webkit-app-region: drag;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 30px;
    padding: 0px 0px 0px 10px;
    box-sizing: border-box;
    font-size: 15px;
    background-color: #F2F2F2;
    box-shadow: 0px 5px 5px -5px rgba(0,0,0,.5);
    #left-icon {
      div {
        font-size: 26px;
        color: #424242;
      }
      
    }
    #center-text {
      color: #424242;
    }
    #right-icon {
      display: flex;
      -webkit-app-region: no-drag;
      background-color: #F2F2F2;
      height: 30px;
      line-height: 30px;
      div {
        flex: 1;
        color: #424242;
        padding: 0 5px;
        transition: background-color 0.4s;
        &:hover {
          cursor: pointer;
          background-color: #d3cfcf;
        }
      }
    }
    
    

  }

</style>