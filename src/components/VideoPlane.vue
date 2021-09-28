<template>
  <div class="video-plane">
    <canvas id="video-canvas"
      @click="draw()"
    ></canvas>
  </div>
</template>

<script>
import bus from '../assets/eventBus'
import { ipcRenderer } from 'electron'
export default ({
  name: "video-plane",
  data() {
    return {
      img: ''
    };
  },
  methods: {
    draw(frame){
      var canvas = document.getElementById('video-canvas');
      if (!canvas.getContext) return;
      var ctx = canvas.getContext("2d");

      this.img.onload = function() {
        ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
      }
      this.img.src = frame;
    },
    resizeCanvas() {
      var canvas = document.getElementById('video-canvas');
      var father = document.getElementsByClassName('video-plane');
      canvas.setAttribute('width', window.getComputedStyle(father[0]).width);
      var height = (window.getComputedStyle(father[0]).width.split('p')[0]);    // 行内对象的高度比父容器小4px，手动将4px补偿
      height *= 1;  // 字符串转数字
      height /= 1.5;  // height是width的2/3倍
      height = height.toString() + 'px';
      canvas.setAttribute('height', height);

    },
  },
  mounted() {
    this.img = new Image()
    bus.$on('getFrame', (message)=>{
      this.draw(message);
    });
    ipcRenderer.on('resizeEvent', ()=> {
      this.resizeCanvas();
    });
    this.resizeCanvas();
  },
})
</script>

<style lang="scss">

</style>
