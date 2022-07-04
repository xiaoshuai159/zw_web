<template>
  <div class="right_main_under">
    <el-row :gutter="10" style="height: 72%">
      <!-- 左侧柱状区 -->
      <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6"
        ><div class="grid-content bg-purple">
          <taishileft style="width:100%"></taishileft>
        </div>
      </el-col>
      <!-- 左侧柱状区 -->
      <!-- 中间地图 -->
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12"
        ><div class="grid-content bg-purple-light"></div
      ></el-col>
      <!-- 中间地图 -->
      <!-- 右侧柱状 -->
      <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6"
        ><div class="grid-content bg-purple"></div
      ></el-col>
      <!-- 右侧柱状 -->
    </el-row>
    <!-- 底部折线 -->
    <el-row :gutter="10" style="height: 30%">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24"
        ><div class="grid-content1 bg-purple"></div
      ></el-col>
    </el-row>
    <!-- 底部折线 -->
  </div>
</template>

<script>
import taishileft from "@/views/taishi_zhuzhuangtu.vue";
export default {
  data() {
    return {};
  },
  components: {
    taishileft,
  },
};
</script>

<style  scoped lang='less'>
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  // background: #99a9bf;
}
.bg-purple {
  // background: #d3dce6;
}
.bg-purple-light {
  // background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 40.625rem /* 650/16 */ /* 400/16 */;
}
.grid-content1 {
  border-radius: 4px;
  min-height: 18.75rem; /* 300/16 */ /* 200/16 */
}
</style>