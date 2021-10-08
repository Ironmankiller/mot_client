<template>
  <div class="control-bar">
    <!-- 模型选择与开始结束 -->
    <div id="model" class="plane">
      <el-select class="model-selector" v-model="modelName" placeholder="请选择模型" :disabled="!connectedFlag || startFlag">
        <el-option
          v-for="item in models"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-row class="mode-select">
        <el-col :span="11">
          <div>
            <el-button 
              type="text" 
              :class="[{'icon-start': connectedFlag},'iconfont', 'icon-kaishi']" 
              @click="start()" 
              v-if="startFlag!=1" 
              :disabled="!connectedFlag || modelName==null">
            </el-button>
            <el-button 
              type="text" 
              :class="[{'icon-pause': connectedFlag},'iconfont', 'icon-zanting']" 
              @click="pause()" 
              v-if="startFlag == 1" 
              :disabled="!connectedFlag">
            </el-button>
            <el-button 
              type="text" 
              :class="[{'icon-stop': connectedFlag},'iconfont', 'icon-jieshu']" 
              @click="stop()" 
              v-if="startFlag" 
              :disabled="!connectedFlag">
            </el-button>
          </div>
          {{ startFlag ? startFlag == 1 ? "暂停 / 结束" : "开始 / 结束" : "开始" }}
        </el-col>
        <el-col :span="2">
          <el-divider direction="vertical"></el-divider>
        </el-col>
        <el-col :span="11">
          <div>
            <el-radio-group v-model="mode" size="small" style="margin-top:12px" :disabled="!connectedFlag || startFlag">
              <el-radio-button label="实时模式"></el-radio-button>
              <el-radio-button label="回放模式"></el-radio-button>
            </el-radio-group>
            <!-- <el-button type="text" class="iconfont icon-jieshu" :disabled="!connectedFlag||!startFlag"></el-button> -->
          </div>

        </el-col>
      </el-row>
    </div>

    <!-- 结果表格 -->
    <div id="result" class="plane">
      <el-table
        :data="tableData"
        style="width: 100%"
        height="400">
        <el-table-column

          prop="id"
          label="ID"
          width="60">
        </el-table-column>
        <el-table-column
          prop="class"
          label="类别"
          width="60">
        </el-table-column>
        <el-table-column
          prop="detectionStatus"
          label="检测状态"
          width="90">
        </el-table-column>
        <el-table-column
          prop="trackingStatus"
          label="跟踪状态"
          width="90">
        </el-table-column>
        <el-table-column
          prop="coordinate"
          label="坐标"
          width="140">
        </el-table-column>
      </el-table>
    </div>

    <!-- 参数选择页面 -->
    <div id="parameter" class="plane">
      其他控制参数的选择（待开发）
    </div>


  </div>
</template>

<script>
import { mapState } from 'vuex';
export default ({
  name: "control-bar",
  data() {
    return {
      mode: "实时模式",
      modelName: null,
      tableData: [{
        id:1,
        class:"car",
        coordinate:"[12,45,61,21]",
        detectionStatus: "丢失",
        trackingStatus: "跟踪中"
      },{
        id:2,
        class:"bus",
        coordinate:"[16,564,612,851]",
        detectionStatus: "检测中",
        trackingStatus: "遮挡"
      },{
        id:3,
        class:"bus",
        coordinate:"[16,564,612,851]",
        detectionStatus: "检测中",
        trackingStatus: "遮挡"
      },{
        id:4,
        class:"bus",
        coordinate:"[16,564,612,851]",
        detectionStatus: "检测中",
        trackingStatus: "遮挡"
      },{
        id:5,
        class:"bus",
        coordinate:"[16,564,612,851]",
        detectionStatus: "检测中",
        trackingStatus: "遮挡"
      },{
        id:6,
        class:"bus",
        coordinate:"[16,564,612,851]",
        detectionStatus: "检测中",
        trackingStatus: "遮挡"
      },{
        id:7,
        class:"bus",
        coordinate:"[16,564,612,851]",
        detectionStatus: "检测中",
        trackingStatus: "遮挡"
      }],
      models: [{
        value: '1',
        label: '单目标跟踪'
      },{
        value: '2',
        label: '小目标检测'
      },{
        value: '3',
        label: '多目标检测跟踪'
      }]
    };
  },
  methods : {
    start() {
      // 加载模型，并开始输出
      this.$store.commit('start');
    },
    pause() {
      // 暂停输出
      this.$store.commit('pause');
    },
    stop() {
      // 保存文件并销毁模型
      this.$store.commit('stop');
    }
  },
  computed: {
    ...mapState({
      connectedFlag: 'connectedFlag',
      startFlag: 'startFlag'
    }),
  },
  mounted() {
  },
  watch: {
    connectedFlag(newState) {
      if (newState == 0) {
        this.$store.commit('stop');
      }
    },
    startFlag(newState) {
      if (newState == 0) {
        this.startText = "开始";
      } else {
        this.startText = "结束";
      }
    }
  }
})
</script>

<style lang="scss">
.plane {
  margin-left: 20px;
  margin-bottom: 20px;
  padding: 15px 20px;
  border: 1px solid rgb(206, 206, 206);
  border-radius: 6px;
  box-shadow: 0px 5px 5px -5px rgba(0,0,0,.5);
}
#model {
  .model-selector {
    width: 100%;
  }
  

  .mode-select {
    margin-top: 12px;
    text-align: center;

    .el-divider {
      font-size: 60px;
    }
    div {
      color: grey;
    }
    .iconfont {
      padding: 0px 0px;
      font-size: 40px;

    }
    
    .icon-stop {
      color: indianred;
    }
    .icon-pause {
      color: orange;
    }

    .icon-start {
      color: green;
    }
  }
}



</style>