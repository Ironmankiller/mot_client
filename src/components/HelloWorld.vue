<template>
  <div class="hello">
    <h1 @dblclick.stop="done($event)">{{ msg }}</h1>
  </div>
</template>

<script>
import DB from "@/utils/db";
import CursorSpecialEffects from "@/utils/fireworks"
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  methods: {
    done(event) {
      CursorSpecialEffects.handleMouseDown(event);
    },
  },
  created() {
    const ip = DB.get("serverIp");
    console.log("Render: "+ip);
    // ipcRenderer.invoke("getDataPath").then((storePath) => {
    //   DB.initDB(storePath);
    //   const ip = DB.get("serverIp");
    //   console.log(ip);
    // })
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
