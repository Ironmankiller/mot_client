<template>
  <div id="home">
    <my-header/>
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <Test/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import MyHeader from "@/components/Header.vue"
import Test from "@/components/test.vue"

export default {
  name: "Home",
  components: {
    HelloWorld,
    Test,
    "my-header": MyHeader,
  },
};
</script>
