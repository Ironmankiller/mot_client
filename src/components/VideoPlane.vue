<template>
  <div class="video-plane">
    <canvas id="video-canvas" width="1080" height="720"
      @click="draw()"
    ></canvas>
  </div>
</template>

<script>
import bus from '../assets/eventBus'
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
  },
  mounted() {
    this.img = new Image()
    bus.$on('getFrame', (message)=>{
      this.draw(message)
    });

  },
})
</script>
