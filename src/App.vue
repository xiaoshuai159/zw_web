<template>
<!-- @mousemove="handleTime" -->
  <div   style="height:100vh;">
    <router-view id="app" class="analysis" />
  </div>
</template>

<script>
export default {

  name: "App",


  data() {
    return {
     
      // lastTime: null, //最后一次点击的时间
      // currentTime: null, //当前点击的时间
     
    };
  },

  components: {},


  methods: {
 
    // handleTime() {
   
    //   if (this.$route.path != "/") {
    //     this.currentTime = new Date().getTime(); //记录这次点击的时间
    //     if (this.currentTime - this.lastTime > 15 * 60 * 1000) {
    //       //判断上次最后一次点击的时间和这次点击的时间间隔是否大于15分钟
    //       //大于15分钟,跳转路由到login页
         
    //       this.$message("连接超时，重新登录");
    //       this.$router.push({ name: "login" });
    //       sessionStorage.clear();
    //       this.lastTime = new Date().getTime();
    //     } else {
    //       this.lastTime = new Date().getTime(); //如果在15分钟内点击，则把这次点击的时间记录覆盖掉之前存的最后一次点击的时间
      
    //     }
    //   } else {
  
    //     this.lastTime = new Date().getTime();
    //   }
    // },

 
  },
  created() {
 
    // this.lastTime = new Date().getTime(); //网页第一次打开时，记录当前时间
  },
};
</script>

<style>
  html,body,#app{
  height: 100%;


  /* background:rgba(38, 24, 49,.6); */
}

@import "./assets/css/main.css";
@import "./assets/css/color-dark.css";
@import "./assets/css/public.css";

 
</style>
