<template>
  <el-col class="video-plane">
    <canvas id="video-canvas"
      @click="draw"
      @dblclick="toggleFullScreen"
    ></canvas>
    <el-row class="video-control" type="flex" justify="end" align="middle">
      <el-dropdown @command="changeQuality" placement="top-start">
        <span class="el-dropdown-link iconfont icon-huazhi" title="修改画质">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="0">标清</el-dropdown-item>
          <el-dropdown-item command="1">高清</el-dropdown-item>
          <el-dropdown-item command="2">超清</el-dropdown-item>
          <el-dropdown-item command="3">原画</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-dropdown @command="changeProportion" placement="top-start">
        <span class="el-dropdown-link iconfont icon-bili" title="修改画面比例">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="0">16:9</el-dropdown-item>
          <el-dropdown-item command="1">4:3</el-dropdown-item>
          <el-dropdown-item command="2">原比例</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <span class="el-dropdown-link iconfont icon-FullScreen" @click="toggleFullScreen" title="全屏">
      </span>
    </el-row>
  </el-col>
</template>

<script>
import bus from '../assets/eventBus'
import { ipcRenderer } from 'electron'

export default ({
  name: "video-plane",
  data() {
    return {
      img: '',
      proportion: {width: 16, height: 9},
      isFullScreen: false
    };
  },
  methods: {
    draw(frame, labels_str){
      var canvas = document.getElementById('video-canvas');
      if (!canvas.getContext) return;
      var ctx = canvas.getContext("2d");
      let labels = JSON.parse(labels_str);
      this.img.onload = function() {
        ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
        if (labels.length) {
          let perW = parseFloat((canvas.offsetWidth / this.width).toFixed(4));
          let perH = parseFloat((canvas.offsetHeight / this.height).toFixed(4));
          labels.forEach((element) => {
            ctx.strokeStyle = '#ff0000' // 框颜色
            ctx.lineWidth = 2 // 框宽度
            let [x1, y1, x2, y2] = element['coordinate'];
            let x = x1 * perH;
            let y = y1 * perW;
            let height = (x2 - x1) * perH;
            let width = (y2 - y1) * perW;
            ctx.strokeRect(y, x, width, height);
          });
        }
      }
      this.img.src = frame;
    },

    resizeCanvas() {
      var canvas = document.getElementById('video-canvas');
      var proportion = this.proportion.width / this.proportion.height;
      var width, height;
      var isNotFullScreen = !(this.isFullScreen)
      if (isNotFullScreen) {     // 根据当前是否为全屏来判断应该将canvas的大小设置成屏幕大小还是父容器大小
        var father = document.getElementsByClassName('video-plane');
        width = window.getComputedStyle(father[0]).width.split('p')[0];
        height = window.getComputedStyle(father[0]).height.split('p')[0];
      } else {
        width = screen.width;
        height = screen.height;
      }
      if (isNotFullScreen || width/height > proportion) {     // 以长度为主还是宽度为主
        height = width / proportion;
        canvas.setAttribute('width', width+'px');
        canvas.setAttribute('height', parseInt(height)+'px');

      } else {
        width = height * proportion;
        canvas.setAttribute('width', parseInt(width)+'px');
        canvas.setAttribute('height', height+'px');
      }

    },

    toggleFullScreen() {
      if(!this.isFullScreen) {
        var canvas = document.getElementById('video-canvas');
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
        } else if (canvas.webkitRequestFullScreen) {
            canvas.webkitRequestFullScreen();
        } else if (canvas.mozRequestFullScreen) {
            canvas.mozRequestFullScreen();
        } else if (canvas.msRequestFullScreen) {
            canvas.msRequestFullScreen();
        }
        this.isFullScreen = true;

      } else {
        if (document.cancelFullscreen) {
            document.cancelFullscreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msCancelFullScreen) {
            document.msCancelFullScreen();
        }
        this.isFullScreen = false;
      }
      this.sleep(10).then(()=> {              // 一定要延时，因为退出全屏的过程是先回到最大化，然后再回到全屏前的大小，要等待这个变化完成
        this.resizeCanvas();
      });
    },
    sleep(time){
      return new Promise(function(resolve){
        setTimeout(resolve, time);
      });
    },

    changeProportion(selected) {
      switch(selected) {
        case '0':
          this.proportion.width = 16;
          this.proportion.height = 9;
          break;
        case '1':
          this.proportion.width = 4;
          this.proportion.height = 3;
          break;
        case '2':
          this.proportion.width = this.src.width;
          this.proportion.height = this.src.height;
          break;
        default:
          this.proportion.width = 16;
          this.proportion.height = 9;
          break;
      }
      this.resizeCanvas();
    },

    changeQuality(selected) {
      console.log('changeQuality' + selected);
    },

    
  },
  mounted() {
    this.img = new Image()
    bus.$on('getFrame', (message)=>{
      this.draw(message['data'], message['label']);
    });
    ipcRenderer.on('resizeEvent', ()=> {
      this.resizeCanvas();
    });
    this.resizeCanvas();
  },
})
</script>

<style lang="scss">
.video-plane {
  &:hover {
    .video-control {
      visibility: inherit;
    }
  }
}

.video-control {
  visibility: hidden;
  height: 40px;

  .iconfont {
    font-size: 30px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #828282;
    padding: 3px;
    border-radius: 3px;

    margin-right: 5px;
    transition: background-color 0.4s;
    &:hover {
      background-color: #d3cfcf;
    }
  }
}

</style>
