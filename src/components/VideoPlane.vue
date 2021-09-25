<template>
  <div class="video-plane">
    <canvas id="video-canvas" width="900" height="600"
      @click="draw()"
    ></canvas>
  </div>
</template>

<script>

export default ({
  name: "video-plane",
  data() {
    return {
    };
  },
  methods: {
    draw(){
      console.log(1)
      var canvas = document.getElementById('video-canvas');

      if (!canvas.getContext) return;
      var ctx = canvas.getContext("2d");
      var img = new Image();
      img.onload = function(){
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        
        ctx.strokeStyle = 'rgb(255,255,0)';
        ctx.font = "15px sans-serif"
        ctx.textBaseline = 'bottom'
        ctx.strokeText("id:1 car", 420, 300);

        ctx.setLineDash([20, 5]);  // [实线长度, 间隙长度]
        ctx.lineDashOffset = -0;
        ctx.lineWidth = 2.0
        ctx.strokeRect(420, 300, 125, 85);
      }
      img.src = 'https://api.ferrarinetwork.ferrari.com/v2/network-content/medias//resize/60c221b21e30fe094d95edb5-001_dji_0624_ferrari-f8-spider_1300x730?apikey=9QscUiwr5n0NhOuQb463QEKghPrVlpaF&width=768&height=430'
    }
  }
})
</script>
