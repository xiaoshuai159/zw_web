<template>
  <div class="bg1" >
       <div class="err" >
  
       </div>
  </div>
</template>

<script>
export default {
data(){
    return{

    }
},
created(){
  
}
}
</script>

<style>
.bg1{
    width: 100%;
    height: 100%;
    background-color:rgb(1, 8, 11,.5);
    position: relative;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 999;
}
.err{
    width: 300px;
    height: 100px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background: url(../assets/img/错误提示.png) 100% 100% no-repeat;
    background-size: contain;
}
</style>