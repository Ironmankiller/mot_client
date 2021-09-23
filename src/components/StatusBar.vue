<template>
  <el-row class="status-bar">
    <el-col :span="12">
      <div class="status">
        <div :class="[connectedClass, 'iconfont']">
          {{ connectedText }}
        </div>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="server-input">
        <el-autocomplete
          class="inline-input"
          v-model="inputAddr"
          :fetch-suggestions="querySearch"
          placeholder="请输入ipaddress:port"
          @select="handleSelect"
          clearable
        >
          <el-button 
            class="connect-btn" 
            slot="append" 
            icon="el-icon-circle-check"
            @click="connectedStatus = (connectedStatus+1)%4"
            ></el-button>
        </el-autocomplete>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'status-bar',
  data() {
    return {
      connectedStatus: 0,      // 0未连接 1连接中 2连接成功 3连接断开
      connectedClass: 'icon-duankai',
      connectedText: '未连接',
      inputAddr: '',
      recordlist: []
    };
  },
  methods: {
    querySearch(queryString, cb) {
      var recordlist = this.recordlist;
      var result = queryString ? recordlist.filter(this.createFilter(queryString)) : recordlist;
      // 调用callback返回建议列表的数据
      cb(result);
    }, 
    createFilter(queryString) {
      return (recordlist) => {
        console.log(recordlist);
        return (recordlist.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      this.inputAddr = item.value;
    },
    loadAll() {
      return [
        // 进行db操作
        {"value":"192.168.31.219:5000"},
        {"value":"127.0.0.1:8080"},
      ];
    }
  },
  mounted() {
    this.recordlist = this.loadAll();
  },
  watch: {
    connectedStatus(newStatus) {
      if (newStatus == 0) {
        this.connectedClass = 'icon-duankai';
        this.connectedText = '未连接';
      } else if (newStatus == 1) {
        this.connectedClass = 'icon-lianjiezhong';
        this.connectedText = '连接中';
      } else if (newStatus == 2) {
        this.connectedClass = 'icon-lianjie';
        this.connectedText = '已连接';
      } else {
        this.connectedClass = 'icon-duankai';
        this.connectedText = '未连接';
      }
    }, 
  }
}
</script>

<style lang="scss">
.status-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgb(206, 206, 206);
  border-radius: 6px;
  box-shadow: 0px 5px 5px -5px rgba(0,0,0,.5);
  min-height: 60px;
  padding: 0px 20px;
  .status {
    width: 40%;


    .icon-duankai {
      font-size: 28px;
      color: red;
    }

    .icon-lianjie {
      font-size: 28px;
      color: green;
    }

    .icon-lianjiezhong {
      font-size: 28px;
      color: orange;
    }
  }

  .server-input {
    .inline-input {
      width: 100%;
      .connect-btn {
        font-size: 24px;
        &:hover {
          color: green;
        }
      }
    }
  }

  
  
}
</style>
