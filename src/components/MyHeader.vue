<template>
  <div :class="['header', focused?'window-focused':'window-blured']">
    <div id="left-icon" class="iconfont icon-genzong" @click="iconBoom"></div>
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
import CursorSpecialEffects from "@/utils/fireworks"

export default {
  name: 'my-header',
  data() {
      return {
          appName: "HMI for Object Detection and Tracking",
          focused: true
      };
  }, 
  methods: {
     minimizeWin(){
       ipcRenderer.send('window-min') // 通知主进程我要进行窗口最小化操作
    },
    maximizeWin(){
      ipcRenderer.send('window-max')
    },
    closeWin(){
      ipcRenderer.send('window-close')
    },
    iconBoom(event) {
      CursorSpecialEffects.handleMouseDown(event);
    },
  },
  mounted() {
    ipcRenderer.on('windowFocusEvent', ()=> {
      this.focused = true;
    });
    ipcRenderer.on('windowBlurEvent', ()=> {
      this.focused = false;
    });
  }
}
</script>
<style lang="scss">
.window-focused {
  background-color: #F2F2F2;
  color: #424242;
}

.window-blured {
  background-color: #F8F8F8;
  color: #828282;
}

.header {
    -webkit-app-region: drag;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0;
    z-index: 99;
    height: 30px;
    width: 100%;
    padding: 0px 0px 0px 10px;
    box-sizing: border-box;
    box-shadow: 0px 5px 5px -5px rgba(0,0,0,.5);

    
    #left-icon {
      font-size: 26px;
      -webkit-app-region: no-drag;
    }
    #center-text {
      font-size: 15px;
    }
    #right-icon {
      display: flex;
      -webkit-app-region: no-drag;
      height: 30px;
      line-height: 30px;
      div {
        padding: 0 10px;
        transition: background-color 0.4s;
        &:hover {
          cursor: pointer;
          background-color: #d3cfcf;
        }
      }
    }
  }

</style>