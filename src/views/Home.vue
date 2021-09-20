<template>
  <div id="home">
    <el-container>

      <el-header height="30px" style="padding: 0px;">
        <my-header/>
      </el-header>
      <el-main style="padding: 0px;">
        <el-row>
          <el-col :span="2" class="el-col-light grid-content"></el-col>
          <el-col :span="20" class="el-col-dark grid-content"></el-col>
          <el-col :span="2" class="el-col-light grid-content"></el-col>
        </el-row>
      </el-main>
      <el-footer height="25px">
        Copyright © 2021 hust
      </el-footer>
    </el-container>

  </div>
</template>

<script>
// @ is an alias to /src
import MyHeader from "@/components/MyHeader.vue"


export default {
  name: "Home",
  components: {
    "my-header": MyHeader,
  },
};
</script>

<style lang="scss">
#home {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.el-container {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content:space-between;
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 200px;
    height: 100%;
    overflow: hidden;
    
}

.el-footer{
  line-height: 30px;
  background-color: #e4e7eb;
  color: #333;
  text-align: right;
  width: 100%;
  align-items: center;
  font-size: 12px;
}


.el-row {
  line-height: 60px;
}
.el-col {
  border-radius: 3px;
}
.el-col-light {
  background-color: slategrey;
}
.el-col-dark {
  background-color: steelblue;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>
