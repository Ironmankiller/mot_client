<template>
  <div class="home scrollbar scrollbar-x">
    <el-container>
      <el-header height="30px">
        <my-header/>
      </el-header>
      <el-main>
        <el-container>
          <el-container>
            <el-header>
              <connection-bar/>
            </el-header>
            <el-main>
              <video-plane/>
            </el-main>
          </el-container>
          <el-aside width="450px">
            <control-bar/>
          </el-aside>
        </el-container>
      </el-main>
      <el-footer height="20px">
        Copyright © 2021 Hust AIA
      </el-footer>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import MyHeader from "@/components/MyHeader.vue"
import ConnectionBar from '@/components/ConnectionBar.vue';
import VideoPlane from '@/components/VideoPlane.vue';
import ControlBar from '@/components/ControlBar.vue';


export default {
  name: "Home",
  components: {
    "my-header": MyHeader,
    "connection-bar": ConnectionBar,
    "video-plane": VideoPlane,
    "control-bar": ControlBar,
  },
};
</script>

<style lang="scss">
.home {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  

  .el-container {
    width: 100%;
    min-height: 100%;
    &:hover::-webkit-scrollbar-thumb {
    display: block;
    }
  }
  .el-header {
    padding: 0px; 

  }

  .el-footer{
    line-height: 25px;
    background-color: #e4e7eb;
    color: #333;
    text-align: right;
    font-size: 12px;
  }
}



</style>
