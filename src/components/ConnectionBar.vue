<template>
  <el-row class="connection-bar">
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
          :disabled= "connectedStatus!=0"
        >
          <el-button 
            v-if="connectedStatus == 0"
            class="connect-btn" 
            slot="append" 
            icon="el-icon-circle-check"
            @click="connect()"
            ></el-button>

          <el-button 
            v-else
            class="disconnect-btn" 
            slot="append" 
            icon="el-icon-circle-close"
            @click="disconnect()"
            ></el-button>
        </el-autocomplete>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'
import bus from '../assets/eventBus'
import DB from '@/utils/db'
export default {
  name: 'connection-bar',
  data() {
    return {
      connectedClass: '',
      connectedText: '',
      connectedStatus: '',     // 0未连接，1已连接，2连接中
      inputAddr: '',
      recordlist: [],
      ws: '',
    };
  },
  methods: {
    querySearch(queryString, cb) {              // 获取连接历史记录列表
      var recordlist = this.recordlist;
      var result = queryString ? recordlist.filter(this.createFilter(queryString)) : recordlist;
      // 调用callback返回建议列表的数据，取出前3个显示
      cb(result.slice(0, 3));
    }, 
    createFilter(queryString) {                // 根据输入对历史记录列表过滤
      return (recordlist) => {
        return (recordlist.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {                        // 选择后将所选的内容填入文本框
      this.inputAddr = item.value;
    },
    loadAll() {                                  // 在此进行获取历史记录的异步操作
      // 进行db操作
      const ip_list = DB.get("serverIp");
      return ip_list;
    },

    connect() {
      var pattIp=/^(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|[1-9])\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|[0-9])\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|[0-9])\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|[0-9]):(6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5]|[1-5]\d{4}|[1-9]\d{3}|[1-9]\d{2}|[1-9]\d|[0-9])$/;
      if (pattIp.test(this.inputAddr) == 0) {
        this.$message.error('输入格式错误');
        this.inputAddr = '';
        return;
      }
      this.connectedStatus = 2;
      var wsPath = 'ws://'+this.inputAddr;
      this.ws = new WebSocket(wsPath);
      this.ws.onopen = this.open;
      this.ws.onmessage = this.getMessage;
      this.ws.onerror = this.error;
      this.ws.onclose = this.close;
    },
    getMessage(msg) {
      bus.$emit('getFrame', msg.data);
    },
    open() {
      this.$store.commit('connected');
      this.connectedStatus = 1;
      DB.insertUnique("serverIp", {"value" : this.inputAddr});
      this.recordlist = this.loadAll();
      console.log('webSocket opened');
    },
    error() {
      this.$store.commit('disConnected');
      this.connectedStatus = 0
      console.log("error");
    },
    close() {
      this.$store.commit('disConnected');
      this.connectedStatus = 0
      console.log("disConnected");
    },
    disconnect() {
      this.ws.close();
    },
  },
  
  computed: {
    ...mapState({
      connectedFlag: 'connectedFlag'
    }),
  },
  mounted() {
    this.recordlist = this.loadAll();
    this.connectedStatus = this.connectedFlag;   // 用全局连接状态初始化局部状态
  },
  watch: {
    connectedStatus(newStatus) {
      if (newStatus == 0) {
        this.connectedClass = 'icon-duankai';
        this.connectedText = '未连接';
      } else if (newStatus == 1) {
        this.connectedClass = 'icon-lianjie';
        this.connectedText = '已连接';
      } else if (newStatus == 2) {
        this.connectedClass = 'icon-lianjiezhong';
        this.connectedText = '连接中';
      } else {
        this.connectedClass = 'icon-duankai';
        this.connectedText = '未连接';
      }
    }, 
  }
}
</script>

<style lang="scss">
.connection-bar {
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
    .iconfont {
      font-size: 24px;
    }
    .icon-duankai {
      color: red;
    }
    .icon-lianjie {
      color: green;
    }
    .icon-lianjiezhong {
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
      .disconnect-btn {
        font-size: 24px;
        &:hover {
          color: red;
        }
      }
    }
  }

  
  
}
</style>
