<template>
  <div class="control-bar">
    <!-- 模型选择与开始结束 -->
    <div id="model" class="plane">
      <el-select class="model-selector" v-model="value" placeholder="请选择模型">
        <el-option
          v-for="item in models"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-row class="start-stop">
        <el-col :span="11">
          <div>
            <el-button type="text" class="iconfont icon-kaishi"></el-button>
          </div>
          开始
        </el-col>
        <el-col :span="2">
          <el-divider direction="vertical"></el-divider>
        </el-col>
        <el-col :span="11">
          <div>
            <el-button type="text" class="iconfont icon-jieshu"></el-button>
          </div>
          结束
        </el-col>
      </el-row>
    </div>

    <!-- 结果表格 -->
    <div id="result" class="plane">
      <el-table
        :data="tableData"
        style="width: 100%"
        height="350">
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
    </div>


  </div>
</template>

<script>
export default ({
  name: "control-bar",
  data() {
    return {
      value: null,
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

  .start-stop {
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
    .icon-jieshu {
      color: indianred;
    }

    .icon-kaishi {
      color: green;
    }
  }
}

#parameter {

}

</style>