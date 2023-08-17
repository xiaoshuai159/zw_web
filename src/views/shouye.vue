<template>
  <div class="app dp"
  v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
 <!--
 
    -->
   
  <!--  -->
    <!-- 头部 -->
    <div class="top1">
      <div class="top1_title">
        <!-- 头部_一级标头 -->
        <!-- 中卫市境外网址处置平台 -->
        <div class="title">中卫市境外涉诈网址发现预警平台</div>
        <div class="topguanli">
          <div class="role">
            <img :src="require('../assets/img/shouye/guanliyuan.png')" alt="" />
            <el-dropdown
              class="user-name"
              trigger="click"
              @command="handleCommand"
            >
              <span class="el-dropdown-link">
                {{ username }}
                <i class="el-icon-caret-bottom"></i>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="upload">修改密码</el-dropdown-item>
                  <el-dropdown-item divided command="loginout"
                    >退出登录</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
        <!-- <div>
        <div class="fanhui" @click="ret1">
          <img src="../assets/img/shouye/返回按钮.png" alt="" />
        </div>
      </div> -->
      </div>
      <!-- 头部_光条-->
      <div class="top1_line">
        <div class="top11_line"></div>
        <div class="top12_line">
          <div class="top12_line_son"></div>
        </div>
        <div class="top13_line"></div>
      </div>
    </div>
    <!-- 内容 -->
    <div class="center1">
      <!-- 内容_左侧 -->
      <div class="center1_left">
        <!-- 内容_左侧_信息 -->
        <div class="left_Statistics">
          <!-- 内容_左侧_信息_标题 -->
          <div class="left_Statistics_title">
            <div class="wenzi">信息</div>
          </div>
          <!-- 内容_左侧_信息_内容 -->
          <div class="left_Statistics_center1">
            <div class="left_Statistics_center_first">
              <div class="left_Statistics_center_first_one">
                <div class="left_Statistics_center_first_img">
                  <!-- <img src="../assets/newimg/newhome/总发现量.png" alt="" />
                   -->
                  <div class="left_Statistics_center_first_img_one">
                    <div class="left_Statistics_center_first_img_oneone">
                      <img src="../assets/newimg/newhome/发现量.png" alt="" />
                    </div>
                  </div>
                </div>
                <div class="left_Statistics_center_first_type">
                  <div class="left_Statistics_center_first_type_wenzi">
                    总发现量
                  </div>
                  <div class="left_Statistics_center_first_type_num color">
                    {{ this.numtongji.chuzhinum }}<span class="p">条</span>
                  </div>
                </div>
              </div>
              <div class="left_Statistics_center_first_two">
                <div class="left_Statistics_center_first_img">
                  <div class="left_Statistics_center_first_img_four">
                    <div class="left_Statistics_center_first_img_fourfour">
                      <img src="../assets/newimg/newhome/预警量.png" alt="" />
                    </div>
                  </div>
                </div>
                <div class="left_Statistics_center_first_type">
                  <div class="left_Statistics_center_first_type_wenzi">
                    总预警量
                  </div>
                  <div class="left_Statistics_center_first_type_num color3">
                    {{ this.numtongji.bocenum }}<span class="p">条</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="left_Statistics_center_first1">
              <div class="left_Statistics_center_first_one te">
                <div class="left_Statistics_center_first_img">
                  <div class="left_Statistics_center_first_img_three">
                    <div class="left_Statistics_center_first_img_threethree">
                      <img src="../assets/newimg/newhome/拨测量.png" alt="" />
                    </div>
                  </div>
                </div>
                <div class="left_Statistics_center_first_type">
                  <div class="left_Statistics_center_first_type_wenzi">
                    总预警量
                  </div>
                  <div class="left_Statistics_center_first_type_num color2">
                    {{ this.numtongji.yujinnum }}<span class="p">条</span>
                  </div>
                </div>
              </div>
              <div class="left_Statistics_center_first_two te">
                
              </div>
            </div> -->
            <!-- 底部光条 -->
            <div class="di"></div>
          </div>
        </div>
        <!-- 内容_左侧_发现类型 -->
        <div class="left_type">
          <!-- 内容_左侧_信息_标题 -->
          <div class="left_Statistics_title">
            <div class="wenzi">总发现类型</div>
          </div>
          <!-- 内容_左侧_信息_内容 -->
          <div class="left_Statistics_center2">
            <div
              id="myChart"
              ref="echartsshouyehuanxing"
              style="width: 100%; height: 100%; position: relative"
            >
              <!-- <span class="bingtitle">{{ chooseEquipment.data }}</span> -->
            </div>
            <!-- 底部光条 -->
            <div class="di"></div>
          </div>
        </div>
        <!-- 内容_左侧_预警趋势 -->
        <div class="left_trend">
          <!-- 内容_左侧_预警趋势_标题 -->
          <div class="left_Statistics_title">
            <div class="youwenzi">
              <ul class="qiehuan">
                <li
                  v-on:click="qh1(true)"
                  class="Active jinzhi"
                  
                >
                  <span>预警</span>
                </li>
                <!-- <li
                  v-on:click="qh1(true)"
                  class="fanzhi123"
                  :class="temp1 == true ? 'Active jinzhi' : ''"
                >
                  <span> 4G预警</span>
                </li> -->
              </ul>
            </div>

            <div class="wenzi">总预警趋势</div>
          </div>
          <!-- 内容_左侧_预警趋势_内容 -->
          <div class="left_Statistics_center3">
            <!-- v-loading="loading1" -->
            <!-- element-loading-background="rgba(0, 0, 0, 0.8)" -->
            <div
              id="myChart"
              ref="echartsshouye3zhexian"
              style="width: 100%; height: 100%"
            ></div>
            <!-- 底部光条 -->
            <div class="di"></div>
          </div>
        </div>
      </div>
      <!-- 内容_地图 -->
      <div class="center1_map">
        <!-- 内容——地图——头部导航 -->
        <div class="nav">
          <!-- <div class="menu_xuanzhong" v-if="this.daohang.length != 2">
            <img src="../assets/img/shouye/选中.png" alt="" />
          </div> -->
          <!-- 内容——头部导航 -->
          <!-- <div class="dianl" @click="low">
            <img src="../assets/img/shouye/左.png" alt="" />
          </div> -->
          <!-- <div class="dianr" @click="up">
            <img src="../assets/img/shouye/右.png" alt="" />
          </div> -->
          <div class="nav_li">
            <!-- <div class="menu_xuanzhong" v-if="this.daohang.length != 2">
                    <img src="../assets/img/shouye/选中.png" alt="" />
                  </div> -->
            <!-- //大于三个 -->
            <!-- v-if="this.daohang.length >= 3" -->
            <ul class="daohang3">
              <li
                v-for="(item, index) in daohang"
                :key="index"
                :class="
                  item.name == '验证' || item.name == '处置'
                    ? 'jinzhi1'
                    : index == 0
                    ? 'five'
                    : 'six'
                "
              >
                <span>
                  <router-link
                    :to="{ path: item.path, query: { name: item.name } }"
                    :class="
                      item.name == '验证' || item.name == '处置'
                        ? 'jinzhi1'
                        : index == 0
                        ? 'five'
                        : 'six'
                    "
                    >{{ item.name }}</router-link
                  >
                </span>

                <!-- index == 1
                      ? 'three'
                      : index == 0
                      ? 'four'
                      : index == 2
                      ? 'five'
                      : 'threes'
                  " -->
              </li>
            </ul>
            <!-- //等于三个 -->
            <!-- <ul v-if="this.daohang.length == 2" class="daohang2">
              <li v-for="(item, index) in daohang" :key="index">
                <router-link :to="item.path" class="three">{{
                  item.name
                }}</router-link>
              </li>
            </ul> -->
            <!-- //一个 -->
            <!-- <ul v-if="this.daohang.length == 1" class="daohang1">
              <li v-for="(item, index) in daohang" :key="index">
                <router-link :to="item.path" class="three">{{
                  item.name
                }}</router-link>
              
              </li>
            </ul> -->
          </div>
        </div>
        <!-- 内容——地图——文字标题-->
        <div class="tishititle" >
          <div class="faxian">
            <div class="beij"></div>
            <div class="jin">今日发现量</div>
            <div class="jin_num">
              {{ this.daynum.CAfaxian }} <i class="jin_num1">条</i>
            </div>
          </div>
          <!-- <div class="fanzhi">
            <div class="jin">今日长安发现量</div>
            <div class="jin_num3">
              {{ this.daynum.CAfaxian }} <i class="jin_num1">条</i>
            </div>
          </div>
          <div class="fanzhi">
            <div class="jin">今日4G预警量</div>
            <div class="jin_num4">
              {{ this.daynum.fanzhi1 }} <i class="jin_num1">条</i>
            </div>
          </div> -->
          <div class="lanjie">
            <div class="beij1"></div>
            <div class="jin">今日预警量</div>
            <div class="jin_num2">
              {{ this.daynum.yujing }} <i class="jin_num1">条</i>
            </div>
          </div>
        </div>
        <!-- 内容——地图——成都地图-->
        <div class="map_cd">
          <!-- 中间地图 -->

          <div
            id="myEcharts"
            ref="chartmap"
            style="width: 100%; height: 100%"
          ></div>

          <!-- <div data-v-4437755d="" class="legend-box">
            <div data-v-4437755d="" class="titleent">图例</div>
            <div data-v-4437755d="" class="down">
              <div data-v-4437755d="" class="area-box">
                <div data-v-4437755d="" class="area-lengend">
                  <div data-v-4437755d="" class="left-color">
                    <div data-v-4437755d="" class="inside"></div>
                  </div>
                  <div data-v-4437755d="" class="right-text">
                    <div data-v-4437755d="" class="end-word com">最高值</div>
                    <div data-v-4437755d="" class="top-word com">最低值</div>
                  </div>
                </div>
              </div>
              <div data-v-4437755d="" class="column-box">
                <div data-v-4437755d="" class="col-item">
                  <div
                    data-v-4437755d=""
                    class="item-icon"
                    style="background: #ed3f40"
                  ></div>
                  <div data-v-4437755d="" class="item-name">
                    ≥{{
                      (max / 5) * 4 > 10000
                        ? max > 5
                          ? ((max / 5 / 10000) * 4).toFixed(0) + '万'
                          : 0
                        : ((max / 5) * 4).toFixed(0)
                    }}
                  </div>
                </div>
                <div data-v-4437755d="" class="col-item">
                  <div
                    data-v-4437755d=""
                    class="item-icon"
                    style="background: #ff9119"
                  ></div>
                  <div data-v-4437755d="" class="item-name">
                    {{
                      (max / 5) * 3 > 10000
                        ? max > 5
                          ? ((max / 5 / 10000) * 3).toFixed(0) + '万'
                          : 0
                        : ((max / 5) * 3).toFixed(0)
                    }}-{{
                      (max / 5) * 4 > 10000
                        ? max > 5
                          ? ((max / 5 / 10000) * 4).toFixed(0) + '万'
                          : 0
                        : ((max / 5) * 4).toFixed(0)
                    }}
                  </div>
                </div>
                <div data-v-4437755d="" class="col-item">
                  <div
                    data-v-4437755d=""
                    class="item-icon"
                    style="background: #c2c50f"
                  ></div>
                  <div data-v-4437755d="" class="item-name">
                    {{
                      (max / 5) * 2 > 10000
                        ? max > 5
                          ? ((max / 5 / 10000) * 2).toFixed(0) + '万'
                          : 0
                        : ((max / 5) * 2).toFixed(0)
                    }}-{{
                      (max / 5) * 3 > 10000
                        ? max > 5
                          ? ((max / 5 / 10000) * 3).toFixed(0) + '万'
                          : 0
                        : ((max / 5) * 3).toFixed(0)
                    }}
                  </div>
                </div>
                <div data-v-4437755d="" class="col-item">
                  <div
                    data-v-4437755d=""
                    class="item-icon"
                    style="background: #05e0fd"
                  ></div>
                  <div data-v-4437755d="" class="item-name">
                    {{
                      max / 5 > 10000
                        ? max > 5
                          ? (max / 5 / 10000).toFixed(0) + '万'
                          : 0
                        : (max / 5).toFixed(0)
                    }}-{{
                      (max / 5) * 2 > 10000
                        ? max > 5
                          ? ((max / 5 / 10000) * 2).toFixed(0) + '万'
                          : 0
                        : ((max / 5) * 2).toFixed(0)
                    }}
                  </div>
                </div>
                <div data-v-4437755d="" class="col-item">
                  <div
                    data-v-4437755d=""
                    class="item-icon"
                    style="background: #4080cf"
                  ></div>
                  <div data-v-4437755d="" class="item-name">
                    0-{{
                      max / 5 > 10000
                        ? max > 5
                          ? (max / 5 / 10000).toFixed(0) + '万'
                          : max / 5
                        : (max / 5).toFixed(0)
                    }}
                  </div>
                </div>
              </div>
            </div>
          </div> -->

          <!-- 地图为画，最后画 -->
        </div>
      </div>
      <!-- 内容_右侧 -->
      <div class="center1_right">
        <!-- 内容_左侧_环比-->
        <div class="left_huanbi">
          <!-- 内容_左侧_环比_标题 -->
          <div class="left_Statistics_title">
            <div class="wenzi">环比</div>
          </div>
          <!-- 内容_左侧_环比_内容 -->
          <div class="left_Statistics_center">
            <div class="left_Statistics_center_one">
              <div class="left_Statistics_center_img">
                <img
                  src="../assets/newimg/newhome/蓝色.png"
                  alt=""
                  class="imgone"
                />
                <img
                  src="../assets/newimg/newhome/蓝色线.png"
                  alt=""
                  class="img1"
                />
              </div>
              <div class="left_Statistics_center_title">
                <div class="titleone">本月发现</div>
                <span class="titlenum">{{ this.fanzhicount1 }} </span>条
              </div>
              <div class="left_Statistics_center_line"></div>
              <div class="left_Statistics_center_bilv">
                <div class="titleone1">环比上月</div>
                <span class="titlenum21">{{ this.fanzhipercent }}</span
                >%
                <img
                  v-if="
                    this.fanzhipercent == '-'
                      ? false
                      : this.fanzhipercent >= 0.0
                      ? true
                      : false
                  "
                  src="../assets/img/shouye/上升.png"
                  alt=""
                  class="r_img"
                />
                <img
                  v-if="
                    this.fanzhipercent == '-'
                      ? false
                      : this.fanzhipercent >= 0.0
                      ? false
                      : true
                  "
                  src="../assets/img/shouye/下降.png"
                  alt=""
                  class="r_img"
                />
              </div>
            </div>
            <div class="left_Statistics_center_two">
              <div class="left_Statistics_center_img">
                <img
                  src="../assets/newimg/newhome/红色.png"
                  alt=""
                  class="imgone"
                />
                <img
                  src="../assets/newimg/newhome/红色线.png"
                  alt=""
                  class="img1"
                />
              </div>
              <div class="left_Statistics_center_title">
                <div class="titleone">本月预警</div>
                <span class="titlenum1">{{ this.yujingcount1 }} </span>条
              </div>
              <div class="left_Statistics_center_line"></div>
              <div class="left_Statistics_center_bilv">
                <div class="titleone2">环比上月</div>
                <span class="titlenum22">{{ this.yujingpercent }}</span
                >%
                <img
                  v-if="
                    this.yujingpercent == '-'
                      ? false
                      : this.yujingpercent < 0.0
                      ? true
                      : false
                  "
                  src="../assets/img/shouye/下降.png"
                  alt=""
                  class="r_img"
                />
                <img
                  v-if="
                    this.yujingpercent == '-'
                      ? false
                      : this.yujingpercent < 0.0
                      ? false
                      : true
                  "
                  src="../assets/img/shouye/上升.png"
                  alt=""
                  class="r_img"
                />
              </div>
            </div>
            <!-- 底部光条 -->
            <div class="di"></div>
          </div>
        </div>

        <!-- 内容_左侧_高危发现趋势 -->
        <div class="left_region">
          <!-- 内容_左侧_预警趋势_标题 -->
          <div class="left_Statistics_title">
            <div class="wenzi">高危发现趋势感知</div>
          </div>
          <!-- 内容_左侧_预警趋势_内容 -->
          <div class="left_Statistics_centerg" id="gaowei">
            
            <!-- 修改前 <divg
              class="btm_one"
              v-for="(item, index) in phonelist"
              :key="index"
            >
              <div class="btm_one_top">
                <img
                  :src="
                    require('../assets/newimg/newhome/' +
                      parseInt(index + 1) +
                      '.png')
                  "
                  alt=""
                />
                <span class="name">{{ item.address }}</span>
                <span :class="generateClassName(index)">{{ item.visits }}</span>
              </div>
              <div class="btm_jdt">
                <div class="btm_zhuzhuang">
                  <div
                    :class="generateClassNamezhu(index)"
                    :style="{ width: 75 - index * 10 + '%' }"
                  ></div>
                  <div
                    :class="generateClassNamecir(index)"
                    :style="{ left: 73 - index * 10 + '%' }"
                  >
                    <div class="cir_li"></div>
                  </div>
                </div>
              </div>
            </divg> -->
            <!-- 添加堆叠图 -->
            <div id="myStackChart" ref="myStackChart" style="width: 100%; height: 100%;">
            </div>
            <div class="di"></div>
          </div>
        </div>

        <!-- 内容_左侧_信息详情 -->
        <div class="left_information">
          <!-- 内容_左侧_信息详情_标题 -->
          <div class="left_Statistics_title">
            <div class="youwenzi">
              <ul class="qiehuan">
                <li
                  v-on:click="qh(false)"
                  class="yujing456"
                  :class="temp == false ? 'Active' : ''"
                >
                  <span>预警信息</span>
                </li>
                <li
                  v-on:click="qh(true)"
                  class="fanzhi123"
                  :class="temp == true ? 'Active' : ''"
                >
                  <span>发现信息</span>
                </li>
              </ul>
            </div>
            <div class="wenzi">信息详情</div>
          </div>
          <!-- 内容_左侧_信息详情_内容 -->
          <div class="left_Statistics_center">
            <div v-if="temp">
              <div class="title_top2">
                <!-- <span>反制时间</span> <span>反制类型</span>
                <span>反制协议</span> <span>访问域名</span> -->

                <span>URL</span> <span>诈骗类型</span>
                <!-- <span>数据源</span> -->
                <span>时间</span>
              </div>
              <div>
                <vue-seamless-scroll
                  :data="listData"
                  class="seamless-warp1"
                  :class-option="defaultOption"
                >
                  <ul class="item">
                    <li v-for="(item, index) in listData" :key="index">
                      <span class="date1" :title="item.url" style="text-align: left;">{{
                        item.url != undefined
                          ? item.url.length > 14
                            ? item.url.slice(0, 14) + '...'
                            : item.url
                          : ''
                      }}</span>
                      <span class="date1" :title="item.type">{{
                        item.type
                      }}</span>
                      <!-- <span class="date1" :title="item.dataSource">{{
                        item.dataSource == 'CA' ? '长安发现' : '4G发现'
                      }}</span> -->
                      <span class="title1" :title="item.discoverDate">{{
                        item.discoverDate
                      }}</span>
                      <!-- <span class="title1"
                        ><span
                          id="dianre"
                          v-if="item.status == '0' ? true : false"
                        ></span
                        ><span
                          id="dianre1"
                          v-if="item.status == '1' ? true : false"
                        ></span
                        ><span
                          id="dianre2"
                          v-if="item.status == '2' ? true : false"
                        ></span>
                        {{ state1(item.status) }}</span
                      > -->

                      <!-- <span class="title1"> {{ item.protocol }}</span> -->
                    </li>
                  </ul>
                </vue-seamless-scroll>
              </div>
            </div>
            <div v-if="!temp">
              <div class="title_top1">
                <span >手机号</span>
                <span>预警等级</span>
                <span>IP归属地</span>
                <span>访问域名</span>
              </div>
              <div class="ne">
                <div>
                  <vue-seamless-scroll
                    :data="yulistData"
                    class="seamless-warp"
                    :class-option="defaultOption"
                  >
                    <ul class="item">
                      <li v-for="(item, index) in yulistData" :key="index">
                        <span class="title1" v-text="item.phone"></span
                        ><span class="date1" v-text="item.earlyGrade"></span>
                        <!-- <span class="title1" v-text="item.userIpAscription"></span
                      > -->
                        <span class="date1" :title="item.userIpAscription">{{
                          item.userIpAscription != undefined
                            ? item.userIpAscription.length > 10
                              ? item.userIpAscription.slice(0, 10) + '...'
                              : item.userIpAscription
                            : ''
                        }}</span>
                        <span
                          class="date1"
                          
                          :title="item.domainName"
                        >
                          {{
                            item.domainName != undefined
                              ? item.domainName.length > 9
                                ? item.domainName.slice(0, 9) + '...'
                                : item.domainName
                              : ''
                          }}
                        </span>
                      </li>
                    </ul>
                  </vue-seamless-scroll>
                </div>
              </div>
            </div>
            <!-- 底部光条 -->
            <div class="di"></div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      title="修改密码"
      :visible.sync="dialog"
      width="30%"
      :before-close="handleClose1"
      class="dialogInfo"
      :close-on-click-modal="false"
    >
      <el-form
        :rules="rules"
        ref="newdomainSimpleVo"
        label-width="80px"
        :inline="true"
        :model="newdomainSimpleVo"
        class="demo-form-inline search_select_form"
        size="mini"
      >
        <el-form-item label="原密码" prop="oldpwd">
          <el-input
            v-model="newdomainSimpleVo.oldpwd"
            placeholder="请输入原密码"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="原密码"
          prop="oldpwd"
          style="visibility: hidden"
          v-if="yinc"
        >
          <el-input
            v-model="newdomainSimpleVo.oldpwd"
            placeholder="请输入原密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="xinpwd">
          <el-input
            v-model="newdomainSimpleVo.xinpwd"
            placeholder="请输入新密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="xinpwd2">
          <el-input
            v-model="newdomainSimpleVo.xinpwd2"
            placeholder="请再次输入新密码"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="submitForm('newdomainSimpleVo')"
          type="primary"
          size="mini"
          class="el-button-xitongerr"
          >修 改</el-button
        >
        <el-button
          class="el-button-xitongup"
          type="primary"
          @click="err"
          size="mini"
          >取 消</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import getDiscover from './getDiscover.vue'
import zhongwei from '../static/jsonmap/zhongwei.json'
import echarts from 'echarts'
import dayjs from 'dayjs'
import 'echarts-gl'
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  // components: { getDiscover },
  data() {
    let pwd = JSON.parse(window.sessionStorage.getItem('pwd'))
    var validatePwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入原密码'))
      } else if (value !== pwd) {
        callback(new Error('原密码不正确!'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.newdomainSimpleVo.xinpwd) {
        callback(new Error('两次密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        oldpwd: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'change',
          },
          {
            validator: validatePwd,
            trigger: 'blur',
            required: true,
          },
        ],
        xinpwd: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur',
          },
          { min: 8, max: 12, message: '密码长度为8到12位', trigger: 'blur' },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
            message: '格式不正确，请输入数字与字母组合',
            trigger: 'blur',
          },
        ],

        xinpwd2: [
          {
            required: true,
            message: '确认密码不能为空',
            trigger: 'change',
          },
          {
            validator: validatePass2,
            trigger: 'blur',
            required: true,
          },
        ],
      },

      //模块————高危发现趋势时间
      whiteSearchList1: {
        startCreateTime1:
          dayjs().subtract(1, 'month').format('YYYY/MM/DD') +
          ' ' +
          '00:' +
          '00:' +
          '00',
        endCreateTime1:
          dayjs().format('YYYY/MM/DD') + ' ' + '23:' + '59:' + '59',
      },
      whiteSearchListday: {
        // startCreateTimeday: dayjs(
        //   this.timerstart(dayjs().format('YYYY/MM/DD'), 1)
        // ).format('YYYY/MM/DD'),

        // endCreateTimeday: dayjs(
        //   this.timerstart(dayjs().format('YYYY/MM/DD'), 1)
        // ).format('YYYY/MM/DD'),
        startCreateTimeday: dayjs().format('YYYY/MM/DD'),

        endCreateTimeday: dayjs().format('YYYY/MM/DD'),
      },
      whiteSearchListdayzhe: {
        startCreateTimedayzhe:
          dayjs(this.timerstart(dayjs().format('YYYY/MM/DD'), 7)).format(
            'YYYY/MM/DD'
          ) +
          ' ' +
          '00:' +
          '00:' +
          '00',
        endCreateTimedayzhe:
          dayjs(this.timersend(dayjs().format('YYYY/MM/DD'), 1)).format(
            'YYYY/MM/DD'
          ) +
          ' ' +
          '23:' +
          '59:' +
          '59',
      },
      //信息
      numtongji: {
        chuzhinum: '',
        bocenum: '',
        yujinnum: '',
        qingbaonum: '',
        faxiannum: '',
      },
      //发现类型
      faxianleft: {
        faxiantitle: [],
        faxiantitle1: [],
      },
      faxianleftnum: {
        type: [],
        type1: [],
        percent: [],
      },
      title: [],
      //预警趋势
      yujingqs: {
        datanum: [],
        highTotalnum: [],
        inTotalnum: [],
        lowTotalnum: [],
      },
      chooseEquipment: {
        data: '',
      },
      //居中导航
      daohang: [],
      daohang1: [
        {
          name: '首页',
          path: '/shouye',
        },
           {
          name: '预警',
          // path: '/getWarning',
          path:'/getWarningfourg'
        },
        {
          name: '发现',
          path: '/gitDiscoverca',
        },
     
        // {
        //   name: '统计',
        //   path: '/Statisticsht',
        // },
        {
          name: '系统管理',
          path: '/findUser',
        },
        // {
        //   name: '处置',
        //   path: '',
        // },

        // {
        //   name: '验证',
        //   path: '',
        // },
      ],
      daohang2: [
      {
          name: '首页',
          path: '/shouye',
        },
           {
          name: '预警',
          // path: '/getWarning',
          path:'/getWarningfourg'
        },
        {
          name: '发现',
          path: '/gitDiscoverca',
        },
        // {
        //   name: '处置',
        //   path: '',
        // },

        // {
        //   name: '验证',
        //   path: '',
        // },
      ],
      //居中今日
      daynum: {
        faxian: 0,
        CAfaxian: 0,
        yujing: 0,
        fanzhi: 0,
        fanzhi1: 0,
      },
      //环比zhongwei
      fanzhicount1: 0,
      fanzhipercent: '',
      yujingcount1: 0,
      yujingpercent: '',
      //高危发现趋势
      phonelist: [],
      //信息详情
      temp: true,
      temp1: true,
      listData: [],
      yulistData: [],
      //地图
      mock: [
        {
          name: '兴庆区',
          value: 0,
          coord: [106.278393, 38.46747],
        },
        {
          name: '西夏区',
          value: 0,
          coord: [106.132116, 38.492424],
        },
        {
          name: '金凤区',
          value: 0,
          coord: [106.228486, 38.477353],
        },
        {
          name: '永宁县',
          value: 0,
          coord: [106.253781, 38.28043],
        },
        {
          name: '贺兰县',
          value: 0,
          coord: [106.345904, 38.554563],
        },
        {
          name: '灵武市',
          value: 0,
          coord: [106.334701, 38.094058],
        },
        // 找不大
      ],
      mock1: [],
      mocklist: [],
      max: 0,
      min: 0,
      //头部loading
      loading: true,
      pid: [],
      Newname: [],
      Newname1: [],
      active: '',
      items: [],
      name: 'wu',
      dialog: false,
      newdomainSimpleVo: {
        oldpwd: '',
        xinpwd: '',
        xinpwd2: '',
      },
      yinc: false,
      // loading1: false,
    }
  },
  // mounted() {   
  //   this.$nextTick(()=>{
  //     this.drawStackChart(xdata,ydata)
  //   })
  // },
  created() {
    this.dh()
    this.qx()
    this.houtai()
    this.tongji()
    this.faxianliexing()
    this.faxianqushi()
    this.yujing()
    // this.daohangqx()
    this.daytongji()
    this.huanbitongji()
    // this.victim() // 高危发现趋势
    this.fanzhilunbo()
    this.yujingnum()
    // this.daohangqx()
    
    
  },

  computed: {
    username() {
      let username = JSON.parse(window.sessionStorage.getItem('one'))
      // window.sessionStorage.setItem("userName", this.param.username);
      return username ? username : this.name
    },
    //滚动条
    defaultOption() {
      return {
        step: 0.5, // 数值越大速度滚动越快
        limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      }
    },
    ...mapState(['map']),
  },
  methods: {
    dh() {
      let dntit = JSON.parse(window.sessionStorage.getItem('qx'))

      let cj = 'CD_SUPER_ADMIN'

      if (dntit == cj) {
        this.daohang = this.daohang1
      } else {
        this.daohang = this.daohang2
      }
    },
    //导航

    handleClose1() {
      this.dialog = false
    },
    //右上角用户
    handleCommand(command) {
      if (command == 'loginout') {
        // localStorage.removeItem("ms_username");
        this.tuichusession()
        window.sessionStorage.clear()
        this.$router.push('/home')
      } else if (command == 'upload') {
        this.dialog = true
        // this.newdomainSimpleVo.oldpwd = JSON.parse(
        //   window.sessionStorage.getItem('pwd')
        // )
      }
    },
    async tuichusession() {
      const { data: res } = await this.$http.post('/pagelogout')
    },
    submitForm(formName) {
      let that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.up()
          // this.dialogVisible = false
          this.$nextTick(() => {
            that.$refs['newdomainSimpleVo'].clearValidate()
          })
        } else {
          // console.log('error submit!!');
          return false
        }
      })
    },
    // err() {
    //   this.newdomainSimpleVo.oldpwd = ''
    //   let that = this
    //   this.$nextTick(() => {
    //     that.$refs['newdomainSimpleVo'].clearValidate()
    //   })
    //   this.dialog = false
    // },
    async up() {
      let list = {
        oldPassword: this.newdomainSimpleVo.oldpwd,
        newPassword: this.newdomainSimpleVo.xinpwd,
        newPassword1: this.newdomainSimpleVo.xinpwd2,
      }
      const { data: res } = await this.$http.post('/user/modifyPwd', list)
      if (res.code == 200) {
        this.dialog = false
        this.$message(res.data)
        this.$router.push('/home')
      } else {
        this.$message(res.data)
        this.dialog = false
      }
    },
    err() {
      this.newdomainSimpleVo.oldpwd = ''
      this.newdomainSimpleVo.xinpwd = ''
      this.newdomainSimpleVo.xinpwd2 = ''
      let that = this
      this.$nextTick(() => {
        that.$refs['newdomainSimpleVo'].clearValidate()
      })
      this.dialog = false
    },

    // 预警数据接口
    async yujingnum() {
      const { data: res } = await this.$http.get(
        '/warning_4g/homePageSmallStatistic'
      )
      if (res.code == 200) {
        // console.log(res);
        this.numtongji.yujinnum = res.data.totalNum4g
        this.numtongji.bocenum = res.data.totalNumCa
        this.daynum.fanzhi1 = res.data.todayWarningNum4g
        this.daynum.yujing = res.data.todayWarningNumCa
        this.yujingcount1 = res.data.thisMonthTotal

        if (res.data.chainLastMonth == '上月无数据') {
          this.yujingpercent = '-'
        } else {
          this.yujingpercent = (res.data.chainLastMonth * 100).toFixed(2)
        }
      }
    },

    // 模块————
    async tongji() {
      const { data: res } = await this.$http.get(
        '/discoverStatistic/getTotalByTimeRange',
        {
          params: {
            startTime: null,
            endTime: null,
          },
        }
      )
      if (res.code == 200) {
        if (Object.getOwnPropertyNames(res.data).length != 0) {
          this.numtongji.chuzhinum = res.data.CADISCVOER
          this.numtongji.faxiannum = res.data.OUTNETDISCOVER
        } else {
          this.numtongji.chuzhinum = 0
          this.numtongji.faxiannum = 0
        }
        // console.log(res.data);

        // this.numtongji.bocenum = res.data.dialTestTotal
        // this.numtongji.yujinnum = res.data.earlyWarningTotal
        // this.numtongji.qingbaonum = res.data.perceptionTotal

        // this.numtongji.faxiannum = res.data.discoverTotal
        // this.numtongji.faxiannum = 139428
        // this.numtongji.chuzhinum = 128436
        // this.numtongji.yujinnum = 163424
        // this.numtongji.bocenum = 1026354
      }
    },
    // 模块————高危发现趋势感知
    async faxianqushi(){
      const { data:res } = await this.$http.get('/discoverStatistic/weekStatistics')
      if(res.code == 200){
        // console.log(res.data);
        const xData = [],yData = [] 
        if(res.data.length > 0){
          
          res.data.forEach((item) => {
            // console.log(item.percent);
            // console.log(item);
            xData.push(item.date)
            yData.push(item.cnt)
            
          })
          this.drawStackChart(xData,yData)
        } else {
          var html = `<span style="font-size:16px;color:#fff;margin-left:10px;margin-top:10px"></span><span style="margin-top:10px;margin-left:15px;color:#fff;font-size:12px"></span><br/><span class="echarts-nodate" style="color:#fff;margin-left:10px;">暂无数据</span>`
          document.getElementById('myChart').innerHTML = html
          document
            .getElementById('myChart')
            .removeAttribute('_echarts_instance_')

          return
        }
      }
      
    },
    // 模块————总发现类型
    async faxianliexing() {
      // this.faxianleftnum.type = [];
      // this.faxianleftnum.percent = [];
      // this.faxianleftnum.num = [];

      const { data: res } = await this.$http.get(
        '/discoverStatistic/getLargeTypeStatistic',
        {
          params: {
            startTime: this.whiteSearchList1.startCreateTime1,
            endTime: this.whiteSearchList1.endCreateTime1,
          },
        }
      )
      if (res.code == 200) {
        if (res.data.length > 0) {
          res.data.forEach((item) => {
            // console.log(item);
            if (item.type == 'SZP') {
              item.type = '杀猪盘'
            } else if (item.type == 'KF') {
              item.type = '冒充客服类'
            } else if (item.type == 'DK') {
              item.type = '贷款'
            } else if (item.type == 'SD') {
              item.type = '刷单返利类'
            } else if (item.type == 'GJF') {
              item.type = '冒充公检法类'
            } else if (item.type == 'HC') {
              item.type = '灰产'
            }else if (item.type == 'LC') {
            item.type = '理财'
          }else if (item.type == 'DS') {
            item.type = '电商类诈骗'
          } else if (item.type == 'JJGW') {
              item.type = '冒充军警购物诈骗'
            } else if (item.type == 'JY') {
              item.type = '网络婚恋、交友类'
            } else if (item.type == 'ZX') {
              item.type = '虚假征信类'
            } else if (item.type == 'MC') {
              item.type = '冒充领导、熟人类'
            } else if (item.type == 'YX') {
              item.type = '网络游戏产品虚假交易类'
            } else if (item.type == 'OTHER') {
              item.type = '其他类型诈骗'
            } else if (item.type == 'APP') {
              item.type = '分发平台'
            } else if (item.type == 'XZYM') {
              item.type = '下载页面'
            }

            //   else if (item.type == 'QT') {
            //   item.type = '其他类型诈骗'
            // }
          })
          // console.log(res.data);
          res.data = res.data.map((item) => {
            // console.log(item.percent);
            return {
              name: item.type,
              value: item.count,
              percent: item.percent,
            }
          })
          res.data.forEach((item) => {
            this.title.push(item.name)
          })
          // console.log(res.data);
          this.res = res.data

          if (this.$refs.echartsshouyehuanxing) {
            this.drawLine()
          }
        } else {
          var html = `<span style="font-size:16px;color:#fff;margin-left:10px;margin-top:10px"></span><span style="margin-top:10px;margin-left:15px;color:#fff;font-size:12px"></span><br/><span class="echarts-nodate" style="color:#fff;margin-left:10px;">暂无数据</span>`
          document.getElementById('myChart').innerHTML = html
          document
            .getElementById('myChart')
            .removeAttribute('_echarts_instance_')

          return
        }
        // console.log(res.data);
      }
    },
    drawLine() {
      var that = this
      // eslint-disable-next-line camelcase
      var bar_qx = this.$refs.echartsshouyehuanxing
      // eslint-disable-next-line camelcase

      let myChart = this.$echarts.init(bar_qx)
      window.addEventListener('resize', function () {
        myChart.resize()
      })

      myChart.on('mouseover', function (event) {
        var name = event.data.name
        var value = event.percent

        option1.title[1].text = value.toFixed(0) + '%'
        option1.title[1].textStyle = {
          fontSize: 14,
          align: 'center',
          fontWeight: 'bold',
          color: event.color,
        }
        myChart.setOption(option1)
      })

      // },

      // setOption() {
      var colorList = [
        '#7ed4ac',
        '#fe9c3a',
        '#ebd571',
        '#eb7c6f',
        '#0bb4d7',
        '#8fcde5',
        '#00c973',
      ]
      let option1 = {
        tooltip: {
          trigger: 'item',
          // textStyle: {
          //   fontSize: 9, // 调整字号大小
          //   lineHeight: 24, // 调整行高
          // },
          position: ['50%', '50%'], // 将 tooltip 定位到图表中心
          // padding: 10, // 调整 tooltip 内容与边框的间距
          // extraCssText: 'max-width: 80vw; max-height: 80vh; overflow: auto;', // 调整 tooltip 的最大宽度和高度，并添加滚动条
          formatter: function (val) {
            // console.log(val)
            return (
              '<span>类型:</span><br> <i style="display: inline-block;width: 10px;height: 10px;background: ' +
              val.color +
              ';margin-right: 5px;border-radius: 50%;}"></i><span width:70px; display:inline-block;>' +
              val.name +
              ':' +
              '</span>' +
              '<span>' +
              val.percent.toFixed(0) +
              '%' +
              '</span>'
            )
          },
        },

        color: colorList,
        backgroundColor: 'transparent',

        legend: {
          show: false,
          type: 'scroll',
          orient: 'horizontal',
          icon: 'square',
          top: '80%',
          left: 'center',
          align: 'auto',
          textStyle: {
            color: '#fff',
          },
        },

        title: [
          {
            textStyle: {},
            text: '',
          },
          {
            top: 'center',
            right: 'center',
          },
        ],
        series: [
          {
            hoverAnimation: true,
            // name: 'Access From',
            type: 'pie',
            // radius: '60%',
            radius: ['30%', '50%'],
            center: ['50%', '50%'],
            data: this.res,
            itemStyle: {
              normal: {
                borderColor: colorList,
                borderWidth: 0,
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: '#e6e6e6',
                },
              },
            },
            label: {
              normal: {
                formatter: '{name|{b}}',

                rich: {
                  icon: {
                    fontSize: 12,
                  },
                  name: {
                    fontSize: 10,
                    padding: [0, 0, 0, 0],
                  },
                },
              },
            },
          },
        ],
      }
      myChart.setOption(option1)
    },
    //   return option1
    // },
    // 模块————预警趋势  ______________________________________
    async yujing() {
      this.yujingqs.datanum = []
      this.yujingqs.gaoweinum = []
      this.yujingqs.inTotalnum = []
      this.yujingqs.lowTotalnum = []
      let list = {
        endTime: this.whiteSearchListdayzhe.endCreateTimedayzhe,
        startTime: this.whiteSearchListdayzhe.startCreateTimedayzhe,
      }
      const { data: res } = await this.$http.post(
        '/warning_4g/Statistic4GWarningNumsByEarlyGrade',
        list
      )
      if (res.code == 200) {
        // console.log(res.data);
        for (var i = 0; i < res.data.length; i++) {
          this.yujingqs.datanum.push(
            dayjs(res.data[i].queryDate).format('MM/DD')
          )
          this.yujingqs.gaoweinum.push(res.data[i].gw)
          this.yujingqs.inTotalnum.push(res.data[i].zw)
          this.yujingqs.lowTotalnum.push(res.data[i].dw)
        }
        if (this.$refs.echartsshouye3zhexian) {
          // this.loading1 = false

          this.drawLinezhexian()
        }
      }
    },
    async yujing1() {
      this.yujingqs.datanum = []
      this.yujingqs.gaoweinum = []
      this.yujingqs.inTotalnum = []
      this.yujingqs.lowTotalnum = []
      let list = {
        endTime: this.whiteSearchListdayzhe.endCreateTimedayzhe,
        startTime: this.whiteSearchListdayzhe.startCreateTimedayzhe,
      }
      const { data: res } = await this.$http.post(
        '/warning_ca/StatisticCAWarningNumsByEarlyGrade',
        list
      )
      if (res.code == 200) {
        for (var i = 0; i < res.data.length; i++) {
          this.yujingqs.datanum.push(
            dayjs(res.data[i].queryDate).format('MM/DD')
          )
          this.yujingqs.gaoweinum.push(res.data[i].gw)
          this.yujingqs.inTotalnum.push(res.data[i].zw)
          this.yujingqs.lowTotalnum.push(res.data[i].dw)
        }
        if (this.$refs.echartsshouye3zhexian) {
          // this.loading1 = false

          this.drawLinezhexian()
        }
      }
    },
    // 新增堆叠图
    drawStackChart(xdata,ydata){
      xdata = xdata.map((item)=>{
        const temp = item.split('-')
        item = temp[1]+'/'+temp[2]
        return item
      })
      var stack_qx = this.$refs.myStackChart;
      let myStackChart1 = this.$echarts.init(stack_qx)
      window.addEventListener('resize', function () {
        myStackChart1.resize()
        // console.log(1)
      })
      myStackChart1.clear()

      let option = {
        tooltip: {
          trigger: 'axis',

          axisPointer: {
            lineStyle: {
              color: '#66B3FF',
            },
          },
        },
        // legend: {
        //     data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
        // },
        // toolbox: {
        //     feature: {
        //         saveAsImage: {}
        //     }
        // },

        grid: {
            top:'15%',
            left: '8%',
            right: '8%',
            bottom: '8%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: xdata,
                axisLine:{
                  lineStyle:{
                    color:'#666',
                    width:1
                  }
                },
                axisLabel:{
                  textStyle:{
                    color:'#f7ffff'
                  }
                },
                // splitLine:{
                //   show:false
                // }
                // splitLine: {
                  // lineStyle:{
                  //     color: ['#80a2c0'],
                  //     width: 1,
                  //     type: 'solid'
                  //     }
                //   }                
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLine:{
                  show:false,
                  // lineStyle:{
                  //   color:'#80a2c0'
                  // }
                },
                axisTick:{show:false},
                splitLine: { show: false },
                splitLine: {
                  lineStyle: {
                    color: ['#1e324a'],
                  },
                },
                axisLabel:{
                  textStyle:{
                    color:'#828d9a'
                  }
                }
            }
        ],
        series: [
              {
              data: ydata,
              type: 'line'
          }
        ]
      };
      myStackChart1.setOption(option)
      
    },
    //左侧——趋势
    drawLinezhexian() {
      // this.loading1=true
      // eslint-disable-next-line camelcase
      var bar_qx = this.$refs.echartsshouye3zhexian
      // eslint-disable-next-line camelcase

      let myChart1 = this.$echarts.init(bar_qx)

      window.addEventListener('resize', function () {
        myChart1.resize()
        // console.log(1)
      })
      myChart1.clear()
      myChart1.setOption(this.setOptionzhexian())

      // console.log(this.qutest);
    },
    setOptionzhexian() {
      let option = {
        animation: false,
        //     title: {
        //   x: "center",
        //   text: "上传域名", //xin
        //   textStyle: {
        //     //xin
        //     fontSize: 20,
        //     color: "#fff", //xin
        //   },
        // },
        feature: {
          saveAsImage: {
            show: false,
          },
        },

        tooltip: {
          trigger: 'axis',

          axisPointer: {
            lineStyle: {
              color: '#66B3FF',
            },
          },
        },
        color: ['#fc7278', '#fba64f', '#99f8f7'], //高 中 低
        legend: {
          right: '5%',
          top: '3%',
          icon: 'rect',
          itemHeight: 5,
          itemWidth: 10,
          data: [
            {
              name: '高危',
              textStyle: {
                color: ['#f9fefc'],
              },
            },
            {
              name: '中危',
              textStyle: {
                color: ['#f9fefc'],
              },
            },
            {
              name: '低危',
              textStyle: {
                color: ['#f9fefc'],
              },
            },
          ],
        },

        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.yujingqs.datanum.reverse(),
          axisLabel: {
            // rotate: -20,
            //  让x轴文字方向为竖向
            // interval: 0,
            //修改x轴文字
            textStyle: {
              color: '#f7ffff',
            },
          },

          axisLine: {
            lineStyle: {
              color: '#666',
              width: 1,
            },
          },
        },

        yAxis: [
          {
            type: 'value',
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
            splitLine: {
              lineStyle: {
                color: ['#1e324a'],
              },
            },
            axisLabel: {
              textStyle: {
                color: '#828d9a',
              },
            },
          },
        ],

        series: [
          {
            name: '高危',
            type: 'line',
            data: this.yujingqs.gaoweinum.reverse(),
            // smooth: true,
          },
          {
            name: '中危',
            type: 'line',

            data: this.yujingqs.inTotalnum.reverse(),
            // smooth: true,
          },
          {
            name: '低危',
            type: 'line',

            data: this.yujingqs.lowTotalnum.reverse(),
            // smooth: true,
          },
        ],

        grid: {
          x: 40,
          y: 40,
          x2: 20,
          y2: 20,
          borderWidth: 1,
        },
      }
      // this.loading1=false
      return option
    },

    //导航
    // async daohangqx() {
    //   const that = this
    //   const { data: res } = await this.$http.get('/menu/queryUserNavList')
    //   if (res.code == 200) {
    //     // console.log(res.data)
    //     res.data = res.data.map((item) => {
    //       return {
    //         name: item.menuName,
    //         path: item.menuUrl,
    //       }
    //     })
    // //     //排序
    // //     // res.data.splice(0, 0, res.data[res.data.length - 1])
    // //     // res.data.splice(res.data.length - 1, 1)
    //     this.daohang = res.data
    //      window.localStorage.setItem('nav', JSON.stringify(this.daohang))
    //   }
    // },
    //   // this.items = res.data;
    // },
    // 点击上下方法
    remove(array, index) {
      if (index <= array.length - 1) {
        for (var i = index; i < array.length; i++) {
          array[i] = array[i + 1]
        }
      }
      array.length = array.length - 1

      return array
    },
    // 模块————导航上
    // up() {
    //   if (this.daohang.length == 1) {
    //     this.$message('当前您的权限只有一项')
    //   } else {
    //     var arr = this.daohang.slice(0, 1)
    //     this.daohang = this.remove(this.daohang, 0)
    //     this.daohang = [...this.daohang, ...arr]
    //   }

    //   // console.log(this.daohang);
    // },
    // 模块————导航下
    low() {
      if (this.daohang.length == 1) {
        this.$message('当前您的权限只有一项')
      } else {
        var arr = this.daohang.slice(
          this.daohang.length - 1,
          this.daohang.length
        )
        this.daohang = this.remove(this.daohang, this.daohang.length)
        // console.log( this.daohang);
        this.daohang = [...arr, ...this.daohang]
      }
    },
    // 模块————今日实时
    async daytongji() {
      const { data: res } = await this.$http.get(
        '/discoverStatistic/getTotalByTimeRange',
        {
          params: {
            startTime: this.whiteSearchListday.startCreateTimeday,
            endTime: this.whiteSearchListday.endCreateTimeday,
          },
        }
      )
      if (res.code == 200) {
        // Object.keys(res.data).length!=0

        if (Object.getOwnPropertyNames(res.data).length != 0) {
          // this.daynum.faxian = res.data.OUTNETDISCOVER
          this.daynum.CAfaxian = res.data.CADISCVOER
        } else {
          // this.daynum.faxian = 0
          this.daynum.CAfaxian = 0
        }
      }
    },
    // 模块————环比
    async huanbitongji() {
      const { data: res } = await this.$http.get(
        '/discoverStatistic/getMonthOnMonth'
      )
      if (res.code == 200) {
        this.fanzhicount1 = res.data[0].count1
        this.fanzhipercent = res.data[0].percent
        if (this.fanzhipercent == '上期没有数据') {
          this.fanzhipercent = '-'
        }
        //  if(   this.fanzhipercent=="上期没有数据"){

        //  }
      }
    },
    // 模块————高危发现趋势
    async victim() {
      // const discoverCountVo = {
      //   address: '',
      //   endTime: this.whiteSearchList1.endCreateTime1,
      //   startTime: this.whiteSearchList1.startCreateTime1,
      // }

      const { data: res } = await this.$http.get(
        '/warning_4g/statisticAllVictimAddress'
      )
      if (res.code == 200) {
        // console.log(res.data)
        if (res.data.length > 0) {
          this.phonelist = res.data
            .map((item) => {
              return {
                address: item.statisticKey,
                visits: item.statisticValue,
              }
            })
            .slice(0, 5)
        } else {
          var html = `<span style="font-size:16px;color:#fff;margin-left:10px;margin-top:10px"></span><span style="margin-top:10px;margin-left:15px;color:#fff;font-size:12px"></span><br/><span class="echarts-nodate" style="color:#fff;margin-left:10px;">暂无数据</span>`
          document.getElementById('gaowei').innerHTML = html
          document
            .getElementById('gaowei')
            .removeAttribute('_echarts_instance_')

          return
        }
      }
      // console.log(this.phonelist);
      //  this.phonelist=res.data.slice(0,5)
    },
    //动态渲染class
    generateClassName(index) {
      return 'right_num' + (index + 1)
    },
    generateClassNamezhu(index) {
      return 'btm_color' + (index + 1)
    },
    generateClassNamecir(index) {
      return 'cir' + (index + 1)
    },
    // 模块————预警反制切换
    qh(t) {
      this.temp = t
      if (this.temp == false) {
        this.yujinglunbo()
      } else {
        this.fanzhilunbo()
      }
    },

    // 模块————预警4g长安切换
    qh1(t) {
      // this.loading1 = true
      this.temp1 = t

      if (this.temp1 == false) {
        this.yujingqs.datanum = []
        this.yujingqs.gaoweinum = []
        this.yujingqs.inTotalnum = []
        this.yujingqs.lowTotalnum = []

        this.yujing1()
      } else {
        this.yujingqs.datanum = []
        this.yujingqs.gaoweinum = []
        this.yujingqs.inTotalnum = []
        this.yujingqs.lowTotalnum = []

        this.yujing()
      }
    },
    // 模块————反制信息
    async fanzhilunbo() {
      const { data: res } = await this.$http.post('/discover/getDiscoverFirst')
      if (res.code == 200) {
        // this.listData = res.data;
        // console.log(res.data);
        res.data.forEach((item) => {
          if (item.type == 'SZP') {
            item.type = '杀猪盘'
          } else if (item.type == 'KF') {
            item.type = '冒充客服类'
          } else if (item.type == 'DK') {
            item.type = '贷款代办信用卡类'
          } else if (item.type == 'SD') {
            item.type = '刷单返利类'
          } else if (item.type == 'GJF') {
            item.type = '冒充公检法类'
          } else if (item.type == 'HC') {
            item.type = '灰产'
          } else if (item.type == 'LC') {
            item.type = '理财'
          }else if (item.type == 'DS') {
            item.type = '电商类诈骗'
          }else if (item.type == 'JJGW') {
            item.type = '冒充军警购物诈骗'
          } else if (item.type == 'JY') {
            item.type = '网络婚恋、交友类'
          } else if (item.type == 'ZX') {
            item.type = '虚假征信类'
          } else if (item.type == 'MC') {
            item.type = '冒充领导、熟人类'
          } else if (item.type == 'YX') {
            item.type = '网络游戏产品虚假交易类'
          } else if (item.type == 'OTHER') {
            item.type = '其他类型诈骗'
          } else if (item.type == 'APP') {
            item.type = '分发平台'
          } else if (item.type == 'XZYM') {
            item.type = '下载页面'
          }
        })

        this.listData = res.data
      }
    },
    // 模块————预警轮播
    async yujinglunbo() {
      const { data: res } = await this.$http.get('/warning_4g/selectCATop100')
      if (res.code == 200) {
        console.log(res.data);
        this.yulistData = res.data
      }
    },
    //模块————地图
    houtai() {
      // //有值直接执行
      // if (this.$store.state.map != '') {
      //   this.maplist = this.$store.state.map
      //   this.mapquan1()
      // } else {
      //   //无值请求
      //   this.$http
      //     .get(
      //       'http://10.8.0.120:8088/geoserver/test/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=test%3A%E6%88%90%E9%83%BD%E5%8C%BA%E5%8E%BF&maxFeatures=50&outputFormat=application%2Fjson'
      //     )
      //     .then((res) => {

      //       this.maplist = res.data
      //       this.$store.commit('mapread', this.maplist)
      //       this.mapquan1()
      //     })
      // }
      // this.maplist = yinchuan
      this.maplist = zhongwei
      this.mapquan1()
    },
    //删除key
    /*
     *@param {Array} target 目标数组
     *@param {Array || String} keys 删除的key
     */
    deleteJsonKey(target, keys) {
      if (target.length == 0) {
        return target
      }
      let result = []
      if (Array.isArray(keys)) {
        let mixed = Object.keys(...target).filter((x) => !new Set(keys).has(x))
        result = JSON.parse(JSON.stringify(target, mixed))
      } else {
        result = JSON.parse(
          JSON.stringify(target, (k, v) => {
            if (k !== keys) {
              return v
            }
          })
        )
      }
      return result
    },
    //模块————地图
    async mapquan1() {
      // discoverCountVo
      const { data: res } = await this.$http.get(
        '/warning_4g/statisticAllVictimAddress'
      )

      // console.log(res);
      if (res.code == 200) {
        if (res.data.length > 0) {
          for (var i = 0; i < res.data.length; i++) {
            for (var j = 0; j < this.mock.length; j++) {
              if (this.mock[j].name == res.data[i].statisticKey) {
                this.mock[j].value = res.data[i].statisticValue
              }
            }
          }
          for (var j = 0; j < this.mock.length; j++) {
            this.mock[j].name = this.mock[j].name
          }

          this.mock.map((item) => {
            return {
              name: item.name,
              value: item.value,
              coord: item.coord,
            }
          })

          this.mock1 = this.mock
          this.mocklist = this.mock

          this.mocklist = this.deleteJsonKey(this.mocklist, ['coord'])
          // console.log(  this.mocklist );
          var arr = []
          for (var i = 0; i < this.mock1.length; i++) {
            arr.push(this.mock1[i].value)
          }
          this.max = Math.max(...arr)

          this.min = Math.min(...arr)
          if (this.$refs.chartmap) {
            this.mapcity()
          }
        } else {
          this.mocklist = this.mock
          if (this.$refs.chartmap) {
            this.mapcity()
          }
        }
      }
    },
    //中间地图
    mapcity() {
      var el = this.$refs.chartmap
      var myChart2 = this.$echarts.init(el)

      this.$echarts.registerMap('YC', this.maplist)
      window.addEventListener('resize', function () {
        myChart2.resize()
        // console.log(1)
      })

      myChart2.setOption(this.new())
      var that = this
      // myChart2.on('click', function (params) {
      //   console.log(params)

      //   that.$router.push({
      //     path: '/taishi',
      //     query: { citynames: params.name, name: '情报感知' },
      //   })
      //   //此处写点击事件内容
      // })
    },
    new() {
      let option = {
        geo: [
          {
            map: 'YC',
            show: true,
            geoIndex: 1,
            aspectScale: 0.95, //长宽比
            zoom: 1.2,
            roam: false,
            silent: true,

            label: {
              normal: {
                show: false,
              },
              emphasis: {
                show: false,
              },
            },
            itemStyle: {
              normal: {
                borderColor: 'rgb(47, 79, 123)', // 图形的描边颜色 #0AAEB0
                borderWidth: 1, // 描边线宽。
                borderType: 'solid', // 柱条的描边类型。
                areaColor: 'rgb(35, 63, 83)', // 图形的颜色 #233F53

                label: {
                  show: false, // 显示区域名称
                  textStyle: {
                    color: '#fff',
                    fontSize: 12,
                  },
                },
              },
              color: 'rgba(3,42,76,.9)', //地图颜色
              borderWidth: 1, //分界线wdith
              borderColor: '#ccc', //分界线颜色
              opacity: 1,
            },

            layoutCenter: ['44%', '51%'], //右下
            layoutSize: '80%',
          },
          {
            map: 'YC',
            show: true,
            geoIndex: 1,

            aspectScale: 0.95, //长宽比
            zoom: 1.2,
            roam: false,
            silent: true,

            label: {
              normal: {
                show: false,
              },
              emphasis: {
                show: false,
              },
            },
            itemStyle: {
              normal: {
                borderColor: 'rgb(47, 79, 123)', // 图形的描边颜色 #0AAEB0
                borderWidth: 3, // 描边线宽。
                borderType: 'solid', // 柱条的描边类型。
                areaColor: 'rgb(35, 63, 83)', // 图形的颜色 #233F53

                label: {
                  show: false, // 显示区域名称
                  textStyle: {
                    color: '#fff',
                    fontSize: 12,
                  },
                },
              },
              color: 'rgba(3,42,76,.9)', //地图颜色
              borderWidth: 3, //分界线wdith
              borderColor: 'red', //分界线颜色
              opacity: 2,
            },

            layoutCenter: ['45%', '50%'], //右下
            layoutSize: '80%',
            emphasis: {
              show: false,
            },
          },
        ],
        // tooltip: {
        //   // trigger: "item",
        //   trigger: 'item',
        //   backgroundColor: 'rgba(3,54,92,.5)',
        //   borderWidth: 0,
        //   formatter: function (val) {
        //     // if (val.data.value != 0) {
        //     return val.data.name + '<br>' + '预警量：' + val.data.value
        //     // }
        //   },
        //   // formatter: {b} +':' +{c},
        //   // formatter:function(val){
        //   //   console.log(val);
        //   // },
        //   axisPointer: {
        //     animation: false,
        //   },
        //   show: true,
        // },
        visualMap: {
          type: 'piecewise', // 类型为分段型
          splitNumber: 4,
          show: false, //图注

          pieces: [
            // 自定义每一段的范围，以及每一段的文字
            {
              min: (this.max / 5) * 4,
              max: this.max,
              color:
                (this.max / 5) * 4 != 0
                  ? 'rgb(209, 77, 94)'
                  : 'rgb(64, 128, 207)',
            }, // 不指定 max，表示 max 为无限大（Infinity）。

            {
              min: (this.max / 5) * 3,
              max: (this.max / 5) * 4,
              color:
                (this.max / 5) * 3 != 0
                  ? 'rgb(255, 145, 25)'
                  : 'rgb(64, 128, 207)',
            },
            {
              min: (this.max / 5) * 2,
              max: (this.max / 5) * 3,
              color:
                (this.max / 5) * 2 != 0
                  ? 'rgb(194, 197, 15)'
                  : 'rgb(64, 128, 207)',
            },
            {
              min: this.max / 5,
              max: (this.max / 5) * 2,
              color:
                this.max / 5 != 0 ? 'rgb(5, 224, 253)' : 'rgb(64, 128, 207)',
            },

            { min: 0, max: this.max / 5, color: 'rgb(64, 128, 207)' },

            // 不指定 min，表示 min 为无限大（-Infinity）。
            // padding: [0, 0, 40, 20],
            // textStyle: {
            //   color: 'white',
            // },
            // show: false,

            // calculable: true,
            // align: 'auto',
            // realtime: false,
            //  min: this.min,
            //         max: this.max,
            //         text: ['最高值', '最低值'],

            //         inRange: {
            //              color: ['#2d88eb', '#007aff', '#ff9119', '#d14759'],
            //         },
          ],
        },

        series: [
          {
            map: 'YC',
            type: 'map',
            silent:true,   // 禁用地图hover事件
            aspectScale: 0.95, //长宽比
            zoom: 1.2,
            roam: false,
            componentType: 'geo',
            layoutSize: '80%', //大小
            layoutCenter: ['46%', '49%'],
            label: {
              show: true,
              textStyle: {
                color: '#fff',
                fontSize: 12,
              },
            },

            itemStyle: {
              normal: {
                borderColor: 'rgb(125, 187, 253)', // 图形的描边颜色 #0AAEB0
                borderWidth: 3, // 描边线宽。
                borderType: 'solid', // 柱条的描边类型。
                areaColor: 'rgb(64, 128, 207)', // 图形的颜色 #233F53

                label: {
                  show: true, // 显示区域名称
                  textStyle: {
                    color: '#fff',
                    fontSize: 12,
                  },
                },
              },
              // 鼠标移入时
              emphasis: {
                borderColor: 'rgb(118, 226, 255)', // 图形的描边颜色 #2378f7
                borderWidth: '3',
                areaColor: 'rgb(0,102,156)', // 阴影色 #233F53
                label: {
                  show: false,
                  textStyle: {
                    color: '#fff',
                    fontSize: 14,
                  },
                },
              },

              effect: {
                show: false,
                shadowBlur: 10,
                loop: true,
              },
            },

            data: this.mocklist,
          },
        ],
      }

      this.loading = false

      return option
    },
    // new() {
    //   let option = {
    //     geo3D: {
    //       map: 'CD',
    //       boxheight: 8,
    //       itemStyle: {
    //         areaColor: 'rgb(5,101,123)',
    //         opacity: 1,
    //         borderWidth: 3,
    //         borderColor: '#7abcff',
    //       },
    //       label: {
    //         show: true,
    //         textStyle: {
    //           color: 'red', //地图初始化区域字体颜色
    //           fontSize: 16,
    //           opacity: 1,
    //           backgroundColor: 'rgba(0,0,0,0)',
    //           //backgroundColor: 'rgba(53,171,199,0)'
    //         },
    //       },
    //       emphasis: {
    //         //当鼠标放上去  地区区域是否显示名称
    //         label: {
    //           show: true,
    //           textStyle: {
    //             color: '#fff',
    //             fontSize: 16,
    //             backgroundColor: 'rgba(0,23,11,0)',
    //           },
    //         },
    //       },
    //       light: {
    //         //光照阴影
    //         main: {
    //           color: '#fff', //光照颜色
    //           intensity: 1.2, //光照强度
    //           //shadowQuality: 'high', //阴影亮度
    //           shadow: false, //是否显示阴影
    //           alpha: 55,
    //           beta: 10,
    //         },
    //         ambient: {
    //           intensity: 0.3,
    //         },
    //       },
    //         viewControl: {			// 用于鼠标的旋转，缩放等视角控制。
    // 		        	projection: 'perspective',		// 投影方式，默认为透视投影'perspective'，也支持设置为正交投影'orthographic'。
    // 		        	autoRotate: false,				// 是否开启视角绕物体的自动旋转查看。[ default: false ]
    // 		        	autoRotateDirection: 'cw',		// 物体自传的方向。默认是 'cw' 也就是从上往下看是顺时针方向，也可以取 'ccw'，既从上往下看为逆时针方向。
    // 		        	autoRotateSpeed: 10,			// 物体自传的速度。单位为角度 / 秒，默认为10 ，也就是36秒转一圈。
    // 		        	autoRotateAfterStill: 3,		// 在鼠标静止操作后恢复自动旋转的时间间隔。在开启 autoRotate 后有效。[ default: 3 ]
    // 		        	damping: 0,						// 鼠标进行旋转，缩放等操作时的迟滞因子，在大于等于 1 的时候鼠标在停止操作后，视角仍会因为一定的惯性继续运动（旋转和缩放）。[ default: 0.8 ]
    // 		        	rotateSensitivity: 1,			// 旋转操作的灵敏度，值越大越灵敏。支持使用数组分别设置横向和纵向的旋转灵敏度。默认为1, 设置为0后无法旋转。	rotateSensitivity: [1, 0]——只能横向旋转； rotateSensitivity: [0, 1]——只能纵向旋转。
    // 		        	zoomSensitivity: 1,				// 缩放操作的灵敏度，值越大越灵敏。默认为1,设置为0后无法缩放。
    // 		        	panSensitivity: 1,				// 平移操作的灵敏度，值越大越灵敏。默认为1,设置为0后无法平移。支持使用数组分别设置横向和纵向的平移灵敏度
    // 		        	panMouseButton: 'left',			// 平移操作使用的鼠标按键，支持：'left' 鼠标左键（默认）;'middle' 鼠标中键 ;'right' 鼠标右键(注意：如果设置为鼠标右键则会阻止默认的右键菜单。)
    // 		        	rotateMouseButton: 'left',		// 旋转操作使用的鼠标按键，支持：'left' 鼠标左键;'middle' 鼠标中键（默认）;'right' 鼠标右键(注意：如果设置为鼠标右键则会阻止默认的右键菜单。)

    // 		        	distance: 105,					// [ default: 100 ] 默认视角距离主体的距离，对于 grid3D 和 geo3D 等其它组件来说是距离中心原点的距离,对于 globe 来说是距离地球表面的距离。在 projection 为'perspective'的时候有效。
    // 		        	minDistance: 80,				// [ default: 40 ] 视角通过鼠标控制能拉近到主体的最小距离。在 projection 为'perspective'的时候有效。
    // 		        	maxDistance: 400,				// [ default: 400 ] 视角通过鼠标控制能拉远到主体的最大距离。在 projection 为'perspective'的时候有效。

    // 		        	alpha: 50, 						// 视角绕 x 轴，即上下旋转的角度。配合 beta 可以控制视角的方向。[ default: 40 ]
    // 		        	beta: 1,						// 视角绕 y 轴，即左右旋转的角度。[ default: 0 ]
    // 		        	minAlpha: -360,					// 上下旋转的最小 alpha 值。即视角能旋转到达最上面的角度。[ default: 5 ]
    // 		        	maxAlpha: 360,					// 上下旋转的最大 alpha 值。即视角能旋转到达最下面的角度。[ default: 90 ]
    // 		        	minBeta: -360,					// 左右旋转的最小 beta 值。即视角能旋转到达最左的角度。[ default: -80 ]
    // 		        	maxBeta: 360,					// 左右旋转的最大 beta 值。即视角能旋转到达最右的角度。[ default: 80 ]

    // 		        	center: [0,-15,0],				// 视角中心点，旋转也会围绕这个中心点旋转，默认为[0,0,0]。

    // 		        	animation: true,				// 是否开启动画。[ default: true ]
    // 		        	animationDurationUpdate: 1000,	// 过渡动画的时长。[ default: 1000 ]
    // 		        	animationEasingUpdate: 'cubicInOut'		// 过渡动画的缓动效果。[ default: cubicInOut ]
    // 		        },

    //       top: 10,
    //       left: 10,
    //       right: 10,
    //       bottom: 10,
    //     },
    //   }
    //   this.loading = false
    //   return option
    // },
    // 状态判断
    state1(val) {
      let states = ''
      switch (val) {
        case 0:
          states = '处置中'
          break
        case 1:
          states = '已处置'
          break
        case 2:
          states = '已失效'
          break
      }
      return states
      // if (val == '0') {
      //   return '处置中'
      // } else if (val == '1') {
      //   return '已处置'
      // } else if (val == '2') {
      //   return '已失效'
      // }
    },
    //系统权限
    async qx() {
      const that = this

      const { data: res } = await this.$http.post('/menu/queryUserMenuList')

      if (res.code == 200) {
        // console.log(res.data);
        let chuarr = res.data.filter((item) => item.menuName != '系统管理')
        let chuarr1 = res.data.filter((item) => item.menuName == '系统管理')
        for (var i = 0; i < chuarr1.length; i++) {
          chuarr.push(chuarr1[0])
        }

        this.items = chuarr

        // =========================
        // res.data
        chuarr.forEach((item) => {
          that.menuFir(item)
        })
        this.pid = this.getSetArr(this.pid)
        if (!window.sessionStorage.getItem('btn')) {
          window.sessionStorage.setItem('btn', this.Newname1)
        }
        // console.log(this.pid);
        // res.data
        chuarr.forEach((item) => {
          that.menuSec(item)
        })
        // console.log(res.data);
      }

      // console.log(res.data);
      // this.items = res.data;
    },
    getSetArr(arr) {
      return [...new Set(arr)]
    },
    //
    menuFir(data) {
      if (data.menuType != 1) {
        // data["isShow"] = true;
        if (data.children) {
          data.children.forEach((item) => {
            this.menuFir(item)
          })
        }
      } else {
        // data["isShow"] = false;
        this.pid.push(data.pid)
        this.Newname.push(data.name)
        this.Newname1 = this.Newname
      }
    },

    menuSec(data) {
      var flag = false
      for (var item in this.pid) {
        // console.log(item);
        // console.log(data.id,this.pid[item]);
        if (data.id != this.pid[item]) {
          flag++
          continue
        } else {
          data.menuType = 1
          break
        }
      }
      if (data.children) {
        data.children.forEach((item) => {
          this.menuSec(item)
        })
      } else {
        data.menuType = 1
      }
    },
    async daohangqx() {
      const that = this
      const { data: res } = await this.$http.get('/menu/queryUserNavList')
      if (res.code == 200) {
        // console.log(res.data)
        res.data = res.data.map((item) => {
          return {
            name: item.menuName,
            path: item.menuUrl,
          }
        })
        res.data.forEach((item) => {
          if (item.name == '验证' || item.name == '处置') {
            item.path = ''
          }
        })
        //排序
        // res.data.splice(0, 0, res.data[res.data.length - 1])
        // res.data.splice(res.data.length - 1, 1)
        // console.log(res.data);
        this.daohang = res.data
        window.localStorage.setItem('nav', JSON.stringify(this.daohang))
      }

      // this.items = res.data;
    },
    ret1() {
      this.$router.push('/home')
      window.localStorage.clear()
      window.sessionStorage.clear()
    },
    // 左一时间  开始时间
    timerstart(val, num) {
      let timelist = dayjs(val).subtract(num, 'day')
      return dayjs(timelist.$d).format('YYYY-MM-DD')
      // console.log(timelist);
    },
    timersend(val, num) {
      let timelist = dayjs(val).subtract(num, 'day')
      return dayjs(timelist.$d).format('YYYY-MM-DD')
      // console.log(timelist);
    },
  },
}
</script>

<style  scoped lang='less'>
@import '../common/font.css';
.dp {
  width: 100%;
  height: 100%;

  /* width: 100%;
  height: 58.5625rem /* 937/16 */
  /* // z-index: -1; */
  background-image: url('../assets/newimg/newhome/背景.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.top1 {
  width: 100%;
  height: 8.7%;
  /* background-color: blue; */
  /* border: 1px solid blue; */
  position: relative;
}
.title {
  position: absolute;
  left: 38%;
  top: 15%;
  font-family: 'heiti';
  
  font-size: 31px;
  // font-size: 38px;
  // letter-spacing: 5px /* 12/16 */;
  background-image: linear-gradient(0deg, #f8f8fb 0%, #8ec4fd 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  // text-shadow: 0px 1px 2px #fff
  text-shadow: 0 0 20px rgba(0, 121, 255, 0.5);
}
.top1_title {
  height: 65px;
  width: 100%;

  background: url('../assets/newimg/newhome/顶部.png') no-repeat 100% 100%;
  // background-position: 0;
  background-size: cover;
}
.top1_line {
  height: 10px;
  width: 100%;
  // background: url('../assets/newimg/newhome/光.png') no-repeat;
  // background-size: 100% 100%;
}
.top11_line,
.top12_line,
.top13_line {
  float: left;
}
.top11_line,
.top13_line {
  width: 10%;
  height: 10px;
}
.top12_line {
  width: 80%;
  height: 10px;
  position: relative;
  overflow: hidden;
}
.top12_line_son {
  position: absolute;
  left: -100%;
  top: 0;
  width: 80%;
  height: 10px;
  background: url('../assets/newimg/newhome/光.png') no-repeat;
  background-size: 100% 100%;
  animation: myfirst 5s linear normal;
  animation-iteration-count: infinite;
}
@keyframes myfirst {
  0% {
    left: -80%;
    top: 0px;
  }
  10% {
    left: -60%;
    top: 0px;
  }
  20% {
    left: -40%;
    top: 0px;
  }
  30% {
    left: -20%;
    top: 0px;
  }
  40% {
    left: 0%;
    top: 0px;
  }
  50% {
    left: 20%;
    top: 0px;
  }
  60% {
    left: 40%;
    top: 0px;
  }
  70% {
    left: 60%;
    top: 0px;
  }
  80% {
    left: 80%;
    top: 0px;
  }
  90% {
    left: 90%;
    top: 0px;
  }
  100% {
    left: 100%;
    top: 0px;
  }
}
@keyframes mysecond {
  0% {
    -webkit-transform: rotate(0deg);
  }
  25% {
    -webkit-transform: rotate(90deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
  }
  75% {
    -webkit-transform: rotate(270deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes mythree {
  0% {
    -webkit-transform: rotate(360deg);
  }
  25% {
    -webkit-transform: rotate(270deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
  }
  75% {
    -webkit-transform: rotate(90deg);
  }
  100% {
    -webkit-transform: rotate(0deg);
  }
}
@keyframes myfour {
  0% {
    opacity: 0.6;
  }
  25% {
    opacity: 0.8;
  }
  50% {
    opacity: 1;
  }
  75% {
    opacity: 0.8;
  }
  100% {
    opacity: 0.6;
  }
}
// @keyframes myfive {
//     0%{bottom: 24%;}
//       25%{bottom: 25%;}
//       50%{bottom: 26%;}
//      75%{bottom: 25%;}
//         100%{bottom: 24%;}
// }
@keyframes myfive {
  0% {
    left: -2%;
  }
  25% {
    left: -1%;
  }
  50% {
    left: 0%;
  }
  75% {
    left: -1%;
  }
  100% {
    left: -2%;
  }
}
.center1 {
  width: 100%;
  height: 91.3%;
  /* background-color: red; */
  /* border: 5px solid #000; */
}
.center1_left,
.center1_map,
.center1_right {
  float: left;
  display: flex;
  flex-flow: column;
}
.center1_left {
  width: 448px;
  height: 100%;
  padding-left: 28px;
  padding-top: 38px;
  box-sizing: border-box;
  // border: 1px solid red;
}

.left_Statistics {
  width: 100%;
  // height: 0;
  flex: 1;
  // margin-bottom: 26px;
}
.left_Statistics_title {
  width: 100%;
  // height: 15%;
  height: 30px;
  background: url('../assets/newimg/newhome/标题装饰.png') no-repeat;
  background-size: 100% 100%;
  padding: 0 0 0 50px;
  box-sizing: border-box;
  position: relative;
}
.wenzi {
  position: absolute;
  width: 40%;
  height: 30px;
  top: 50%;
  transform: translateY(-50%);
  // letter-spacing: 2px;
  font-weight: 400;
  font-size: 14px;
  color: #fff;
  display: inline-block;
  line-height: 30px;
  //
}

.left_Statistics_center {
  width: 100%;
  // height: 85%;
  // height: 200px;
  background: url('../assets/newimg/newhome/框.png') no-repeat;
  background-size: 100% 100%;
  padding: 10px;
  box-sizing: border-box;
  position: relative;
}

.left_Statistics_center1 {
  width: 100%;
  height: 200px;
  // height: 200px;
  background: url('../assets/newimg/newhome/框.png') no-repeat;
  background-size: 100% 100%;
  padding: 10px;
  box-sizing: border-box;
  position: relative;
}

.left_Statistics_center2 {
  width: 100%;
  height: 240px;
  // height: 200px;
  background: url('../assets/newimg/newhome/框.png') no-repeat;
  background-size: 100% 100%;
  padding: 10px;
  box-sizing: border-box;
  position: relative;
}
.left_Statistics_center2 {
  width: 100%;
  height: 240px;
  // height: 200px;
  background: url('../assets/newimg/newhome/框.png') no-repeat;
  background-size: 100% 100%;
  padding: 10px;
  box-sizing: border-box;
  position: relative;
}
.left_Statistics_center3 {
  width: 100%;
  height: 200px;
  // height: 200px;
  background: url('../assets/newimg/newhome/框.png') no-repeat;
  background-size: 100% 100%;
  padding: 10px;
  box-sizing: border-box;
  position: relative;
}
.left_Statistics_centerg {
  width: 100%;
  height: 85%;
  // height: 240px;
  background: url('../assets/newimg/newhome/框.png') no-repeat;
  background-size: 100% 100%;
  padding: 10px;
  box-sizing: border-box;
  position: relative;
}
.left_Statistics_center_first,
.left_Statistics_center_first1 {
  width: 100%;
  height: 50%;
}
.left_Statistics_center_first_one,
.left_Statistics_center_first_two {
  float: left;
  width: 50%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  // border: 1px solid red;
}

// .te {
//   padding-top: 10px;
// }
.left_Statistics_center_first_img,
.left_Statistics_center_first_type {
  float: left;
}
.left_Statistics_center_first_img {
  // width: 50px;
  // height: 50px;
  margin-top: 80px;
  width: 75px;
  height: 75px;
}

.left_Statistics_center_first_img_one {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid rgb(17, 62, 110);
  background-color: rgba(17, 62, 110, 0.5);
  position: relative;
  animation: myfour 3s linear infinite;
  animation-iteration-count: infinite;
}
.left_Statistics_center_first_img_oneone {
  // 改之前
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  border-radius: 50%;
  border: 2px solid #0887b7;
  background-color: #112c48;
  // 改之后
  // width: 90%;
  // height: 90%;
  // margin-top: 20px;
}
.left_Statistics_center_first_img_one img {
  width: 50%;
  height: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.left_Statistics_center_first_img_two {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid #03326b;
  background-color: rgba(24, 47, 82, 0.5);
  position: relative;
  animation: myfour 3s linear infinite;
  animation-iteration-count: infinite;
}
.left_Statistics_center_first_img_twotwo {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  border-radius: 50%;
  border: 2px solid #0c458a;
  background-color: #112c48;
}
.left_Statistics_center_first_img_two img {
  width: 50%;
  height: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.left_Statistics_center_first_img_three {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid rgb(62, 59, 71);
  background-color: rgba(62, 59, 71, 0.5);
  position: relative;
  animation: myfour 3s linear infinite;
  animation-iteration-count: infinite;
}
.left_Statistics_center_first_img_threethree {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  border-radius: 50%;
  border: 2px solid #e1727c;
  background-color: #112c48;
}
.left_Statistics_center_first_img_three img {
  width: 50%;
  height: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.left_Statistics_center_first_img_four {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid rgb(63, 71, 69);
  background-color: rgba(63, 71, 69, 0.5);
  position: relative;
  animation: myfour 3s linear infinite;
  animation-iteration-count: infinite;
}
.left_Statistics_center_first_img_fourfour {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  border-radius: 50%;
  border: 2px solid #bc8947;
  background-color: #112c48;
}
.left_Statistics_center_first_img_four img {
  width: 50%;
  height: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

// .left_Statistics_center_first_img_zhong{
//   position: absolute;
//   width: 20px;
//   height: 20px;
//   top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%)
// }
// .left_Statistics_center_first_img_zhong img{
//    width: 100%;
//   height: 100%;
// }
.left_Statistics_center_first_type {
  margin-left: 10px;
  margin-top: 10px;
  width: 120px;
  height: 50px;
}
.left_Statistics_center_first_type_wenzi {
  // 改之前
  // font-size: 14px;
  color: #fcfffe;
  // letter-spacing: 1px;
  // margin-bottom: 10px;
  font-size: 20px;
  letter-spacing: 2px;
  margin:27px 0 22px 5px
}
.left_Statistics_center_first_type_num {
  margin-left: 5px;
  font-size: 20px;
}
.color {
  color: #00baff;
  font-weight: 500;
}
.color1 {
  color: #1c79f1;
  font-weight: 500;
}
.color2 {
  color: #ff817f;
  font-weight: 500;
}
.color3 {
  color: #faad50;
  font-weight: 500;
}
.p {
  font-size: 12px;
  color: #788c9f;
}
.di {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3px;
  background: url('../assets/newimg/newhome/框底的点.png') no-repeat;
  background-size: 100% 100%;
}
.center1_map {
  width: 1027px;
  height: 100%;
  box-sizing: border-box;
}
.nav {
  width: 1027px;
  height: 6%;
  margin: 0 auto;
  // border: 1px solid red;
  // background: url('../assets/newimg/newhome/形状 6.png') no-repeat;
  // background-size: 100% 100%;
  position: relative;
  margin-top: -5px;
  // border: 1px solid #ccc;
}
.nav_li {
  // width: 900px;
  height: 100%;
  // border: 1px solid blue;
  // margin: 0 120px;
  // margin-left: 60px;
  // padding-top: 10px;
  box-sizing: border-box;
  float: left;
  position: relative;
  left: 50%;
  // overflow: hidden;
}
.dianl {
  position: absolute;
  width: 50px /* 50/16 */;
  height: 32px;
  cursor: pointer;
  left: 30px;
  top: 0;
}
.dianl img {
  width: 100% /* 50/16 */;
  height: 100%;
}
.dianr {
  position: absolute;
  width: 50px /* 50/16 */;
  height: 32px;
  cursor: pointer;
  right: 30px;
  top: 0;
}
.dianr img {
  width: 100% /* 50/16 */;
  height: 100%;
}
.menu_xuanzhong {
  position: absolute;
  width: 22px /* 50/16 */;
  height: 20px;
  bottom: 0;
  left: 46.5%;
}
.menu_xuanzhong img {
  width: 100%;
  height: 100%;
}
.daohang3 {
  // margin: 0 auto;
  // display: table;
  position: relative;
  left: -50%;
}
.nav_li .daohang3 li {
  // display: inline-block;
  font-family: '黑体';
  float: left;
  list-style-type: none;
  text-align: center;
  height: 40px;
  line-height: 40px;
  width: 100px;
  border: 3px solid #0d6fd8;
  margin-right: 8px;
  box-shadow: 0 0 10px #1768be inset, 0 0 0px #b5c5d4;
  //  background-color: ;
  // border: 1px soild red;
  // font-weight: 400;
  // font-family: 'heiti';
  // font-family: '黑体';

  // background-image: linear-gradient(0deg, #0ae5f5 0%, #0ef0a1 100%);
  // -webkit-background-clip: text;
  // -webkit-text-fill-color: transparent;
  // letter-spacing: 2px;
  // text-shadow: 5px 0px 10px rgba(119, 168, 224, 0.5);

  // margin-right: 2px;
  // padding: 0 10px;
}

.nav_li .daohang3 li {
  transform: skewX(45deg);
  // border-bottom-color:#0d6fd8;
}
.nav_li .daohang3 li span {
  display: inline-block;
  transform: skewX(-45deg);
}
.nav_li .daohang3 li:hover {
  // background-image: linear-gradient(0deg, #0a35f5 0%, #07f8e4 100%);
  // -webkit-background-clip: text;
  // -webkit-text-fill-color: transparent;
  color: #fff;
  border-bottom-color: #07e7e6;
  //  text-shadow: 0 0 20px rgba(189, 207, 228, 0.5);
}

.nav_li .daohang2 li {
  float: left;
  list-style-type: none;
  text-align: center;
  // font-size: 1.25rem /* 20/16 */;
  // color: #fff;
  font-weight: 400;
  // padding: 0  ;
  // padding-top: 5px;
  // padding-right: 1.1rem;
  // padding-left: 1.4rem;
  // box-sizing: border-box;
  // width: 5.6rem /* 71/16 */ /* 44.5/16 */;
  width: 212px;
  height: 45px;
  // padding-left: 0.7rem;
  // box-sizing: border-box;
}
.nav_li .daohang1 li {
  float: left;
  list-style-type: none;
  text-align: center;
  // font-size: 1.25rem /* 20/16 */;
  // color: #fff;
  font-weight: 400;
  // padding: 0  ;
  // padding-top: 5px;
  // padding-right: 1.1rem;
  // padding-left: 1.4rem;
  // box-sizing: border-box;
  // width: 5.6rem /* 71/16 */ /* 44.5/16 */;
  width: 100%;
  height: 45px;
  // padding-left: 0.7rem;
  // box-sizing: border-box;
}
.three {
  font-size: 22px /* 20/16 */ /* 18/16 */;
  color: #dfe0f7;
  font-weight: 500;
}
.three:hover {
  color: #fff;
  text-shadow: 1px 1px 20px #0068c4;
}

.threes {
  font-size: 20px /* 16/16 */;
  color: #fff;
  font-weight: 500;
}
.four {
  font-size: 20px /* 16/16 */;
  font-weight: 500;
  background-image: linear-gradient(to left, #d6e1e5 0%, #51626d 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  // pointer-events: none;
}
.five {
  font-size: 20px /* 16/16 */;
  font-weight: 500;
  color: #fff;
  border-bottom-color: #07e7e6 !important;
  //  background-image: linear-gradient(0deg, #0a35f5 0%, #07f8e4 100%);
  // -webkit-background-clip: text;
  // -webkit-text-fill-color: transparent;
  // pointer-events: none;
}
.six {
  font-size: 20px /* 16/16 */;
  font-weight: 500;
  color: #b5b5d4;
  // text-shadow: 0 0 20px #0079ff;
  // background-image: linear-gradient(to right, #d6e1e5 0%, #51626d 100%);
  // -webkit-background-clip: text;
  // -webkit-text-fill-color: transparent;
  // pointer-events: none;
}
.six:hover {
  color: #fff;
  border-bottom-color: #07e7e6 !important;
}
.center1_right {
  width: 445px;
  padding-right: 30px;
  padding-top: 38px;
  height: 100%;
  box-sizing: border-box;
  // border: 1px solid red;
}
.left_type {
  width: 100%;
  // height: 29%;
  flex: 1;
  margin-bottom: 26px;
}
.left_trend {
  width: 100%;
  // height: 37%;
  flex: 1;
  // margin-bottom: 26px;
}
.tishititle {
  display: flex;
  justify-content: center;
  // align-items: center;
  width: 100%;
  height: 13%;
  margin-top: 22px;
}
.faxian,
.fanzhi,
.lanjie {
  float: left;
  width: 200px;
  height: 90px;
  //  border: 1px solid blue;
  margin-left: 24px;
  // background: ;
}
.faxian {
  // margin-left: 88px !important;
  background: url('../assets/newimg/newhome/框 实时.png') no-repeat;
  background-size: 100% 100%;
  text-align: center;
  position: relative;
}
.beij {
  position: absolute;
  width: 40px;
  height: 40px;
  top: -14px;
  left: -20px;
  background: url('../assets/newimg/newhome/圆 装饰.png') no-repeat;
  background-size: 100% 100%;
  animation: mysecond 5s linear infinite;
  animation-iteration-count: infinite;
}
.fanzhi {
  background: url('../assets/newimg/newhome/框实时2.png') no-repeat;
  background-size: 100% 100%;
  text-align: center;
}
.lanjie {
  background: url('../assets/newimg/newhome/框实时3.png') no-repeat;
  background-size: 100% 100%;
  position: relative;
  text-align: center;
}
.beij1 {
  position: absolute;
  width: 40px;
  height: 40px;
  top: -14px;
  right: -20px;
  background: url('../assets/newimg/newhome/圆 装饰.png') no-repeat;
  background-size: 100% 100%;
  animation: mythree 5s linear infinite;
  animation-iteration-count: infinite;
}
.jin {
  width: 100%;
  height: 40px;
  font-size: 20px;
  padding-top: 10px;
  box-sizing: border-box;
  color: #fff;
}
.jin_num {
  width: 100%;
  height: 40px;
  font-size: 34px !important;
  line-height: 40px;
  color: #63b4ff;
  text-shadow: 0px 2px 2px black;
  font-family: 'Arial';
}
.jin_num3 {
  width: 100%;
  height: 40px;
  font-size: 34px !important;
  line-height: 40px;
  color: #eaa14d;
  text-shadow: 0px 2px 2px black;
}
.jin_num4 {
  width: 100%;
  height: 40px;
  font-size: 34px !important;
  line-height: 40px;
  color: #4dea67;
  text-shadow: 0px 2px 2px black;
}
.jin_num2 {
  width: 100%;
  height: 40px;
  font-size: 34px !important;
  line-height: 40px;
  color: #fd818a;
  text-shadow: 0px 2px 2px black;
}
.jin_num1 {
  font-style: normal;
  font-size: 18px;
  color: #5b749d;
  text-shadow: none;
}
.map_cd {
  height: 75%;
  width: 100%;
  // border: 1px solid #ccc;
  padding: 0 20px;
  box-sizing: border-box;
  position: relative;
}
// 地图
// 地图
// 地图
.left_huanbi {
  width: 100%;
  // height: 28%;
  flex: 1;
  margin-bottom: 1%;
}
.left_Statistics_center_one {
  width: 390px;
  height: 45%;
  // margin:0  16px;
  background-image: linear-gradient(120deg, #123359, #041f39);
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
.left_Statistics_center_two {
  width: 390px;
  height: 45%;
  margin-top: 16px;
  background-image: linear-gradient(120deg, #23324c, #061e39);
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
.left_Statistics_center_img,
.left_Statistics_center_title,
.left_Statistics_center_line,
.left_Statistics_center_bilv {
  float: left;
}
.left_Statistics_center_img {
  position: relative;
}
.img1 {
  position: absolute;
  bottom: 24%;
  left: -3%;
  width: 100%;
  animation: myfive 0.5s linear infinite;
  animation-iteration-count: infinite;
}
.left_Statistics_center_img .imgone {
  width: 68px;
  height: 58px;
  margin-top: 4px;
}
.left_Statistics_center_title {
  width: 145px;
  height: 68px;
  padding: 5px 0 0 15px;
  box-sizing: border-box;
}
.titleone {
  height: 14px;
  width: 100%;
  font-size: 16px;
  color: #fff;
  margin-bottom: 10px;
}
.titlenum {
  height: 30px;
  width: 100%;
  font-size: 26px;
  font-weight: bold;
  background-image: linear-gradient(180deg, #98c6ff 0%, #027dff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.titlenum1 {
  height: 30px;
  width: 100%;
  font-size: 26px;
  font-weight: bold;
  background-image: linear-gradient(180deg, #d1d5d9 0%, #ff8281 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.left_Statistics_center_line {
  width: 3px;
  height: 71px;
  background: url('../assets/newimg/newhome/分割线.png') no-repeat;
  background-size: 100% 100%;
}
.left_Statistics_center_bilv {
  width: 150px;
  height: 68px;
  padding: 5px 0 0 20px;
  box-sizing: border-box;
}
.titleone1 {
  height: 14px;
  width: 100%;
  font-size: 16px;
  color: #fff;
  margin-bottom: 14px;
}

.titlenum21 {
  height: 30px;
  width: 100%;
  font-size: 22px;
  font-weight: bold;
  background-image: linear-gradient(180deg, #027dff 0%, #98c6ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.titleone2 {
  height: 14px;
  width: 100%;
  font-size: 16px;
  color: #fff;
  margin-bottom: 12px;
}

.titlenum22 {
  height: 30px;
  width: 100%;
  font-size: 22px;
  font-weight: bold;
  background-image: linear-gradient(180deg, #d1d5d9 0%, #ff8281 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.left_region {
  width: 100%;
  height: 39%;
}

.btm_one {
  height: 14% /* 76/16 */ /* 70/16 */ /* 76/16 */ /* 58/16 */;
  width: 100%;
  // border: 1px solid #ccc;
  // padding-top: 10px /* 10/16 */;
  box-sizing: border-box;
  margin-top: 13px;
}
.btm_one_top {
  // width: 2.25rem /* 36/16 */;
  width: 100%;
  height: 20px /* 24/16 */ /* 20/16 */;
  // border: 1px solid red;
  margin-bottom: 8px;
  box-sizing: border-box;
}
.btm_one_top img {
  float: left;
  width: 36px /* 36/16 */;
  height: 18px /* 20/16 */;
}
.btm_one_top .name {
  float: left;
  color: #fff;
  font-size: 16px /* 18/16 */;
  margin: 0 0 0 /* 5/16 */ /* 10/16 */ 10px /* 20/16 */;
  box-sizing: border-box;
  // margin: 0 0 .25rem /* 4/16 */ /* 2/16 */ 1.25rem /* 20/16 */;
  display: block;
  letter-spacing: 1px;
}
.right_num1 {
  float: right;
  font-size: 22px /* 22/16 */;
  color: #e97c75;
}
.right_num2 {
  float: right;
  font-size: 22px /* 22/16 */;
  color: #ebd50e;
}
.right_num3 {
  float: right;
  font-size: 22px /* 22/16 */;
  color: #9ce70f;
}
.right_num4 {
  float: right;
  font-size: 22px /* 22/16 */;
  color: #0fddfd;
}
.right_num5 {
  float: right;
  font-size: 22px /* 22/16 */;
  color: #0e7ced;
}
.btm_jdt {
  width: 100%;
  height: 22px /* 34/16 */;
}
.btm_zhuzhuang {
  width: 100%;
  height: 6px /* 6/16 */;
  background-color: #00294a;
  margin-top: 2px /* 10/16 */;
  position: relative;
}
.btm_color1 {
  position: absolute;
  top: 0;
  left: 0;
  // width: 80% /* 6/16 */;
  height: 100%;
  background: linear-gradient(to right, #ed3f40, #ff7e7e);
}
.btm_color2 {
  position: absolute;
  top: 0;
  left: 0;
  // width: 80% /* 6/16 */;
  height: 100%;
  background: linear-gradient(to right, #ff9119, #fbec74);
}
.btm_color3 {
  position: absolute;
  top: 0;
  left: 0;
  // width: 80% /* 6/16 */;
  height: 100%;
  background: linear-gradient(to right, #fbff00, #8dc4fd);
}

.btm_color4 {
  position: absolute;
  top: 0;
  left: 0;
  // width: 80% /* 6/16 */;
  height: 100%;
  background: linear-gradient(to right, #47bdbd, #05e0fd);
}

.btm_color5 {
  position: absolute;
  top: 0;
  left: 0;
  // width: 80% /* 6/16 */;
  height: 100%;
  background: linear-gradient(to right, #0db7dd, #4080cf);
}

.cir1 {
  position: absolute;
  top: -9px;
  // left: -20px;
  width: 20px /* 20/16 */;
  height: 20px;
  border: 2px solid rgb(233, 124, 117);
  border-radius: 50%;
  background: rgba(233, 124, 117, 0.4);
}
.cir2 {
  position: absolute;
  top: -9px;
  // left: -20px;
  width: 20px /* 20/16 */;
  height: 20px;
  border: 2px solid rgb(246, 243, 121);
  border-radius: 50%;
  background: rgba(246, 243, 121, 0.3);
}
.cir3 {
  position: absolute;
  top: -9px;
  // left: -20px;
  width: 20px /* 20/16 */;
  height: 20px;
  border: 2px solid rgb(88, 159, 234);
  border-radius: 50%;
  background: rgba(88, 159, 234, 0.3);
}
.cir4 {
  position: absolute;
  top: -9px;
  // left: -20px;
  width: 20px /* 20/16 */;
  height: 20px;
  border: 2px solid rgb(0, 156, 186);
  border-radius: 50%;
  background: rgba(0, 156, 186, 0.3);
}
.cir5 {
  position: absolute;
  top: -9px;
  // left: -20px;
  width: 20px /* 20/16 */;
  height: 20px;
  border: 2px solid rgb(15, 221, 253);
  border-radius: 50%;
  background: rgba(15, 221, 253, 0.3);
}

.cir_li {
  position: absolute;
  top: 5px /* 5/16 */ /* 4/16 */;
  left: 5px /* 5/16 */ /* 4/16 */;
  width: 10px /* 10/16 */;
  height: 10px /* 10/16 */;
  background-color: #fff;
  border-radius: 50%;
}
.left_information {
  // height: 26%;
  flex: 1;
  width: 100%;
}
.youwenzi {
  position: absolute;
  width: 60%;
  height: 30px;
  top: 80%;
  right: 5%;
  transform: translateY(-50%);
}
.qiehuan li {
  float: right;
  list-style: none;
  padding-right: 10px;
  font-size: 12px;
  color: #fff;
  cursor: pointer;
  letter-spacing: 1px;
  padding-top: 2px;
}

.Active {
  background-image: linear-gradient(180deg, #02dafc 0%, #0099f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
}
.xinix {
  overflow: hidden;
}
.title_top2 {
  width: 100%;
  // height: 30px;
  height: 17%;
  background-color: transparent;
  border: 1px solid #1f436c;
  padding: 1% 0;
}
.title_top2 span:nth-child(1) {
  display: inline-block;
  width: 27%;
  line-height: 17%;
  color: #80a2c0;
  text-align: center;
  font-size: 14px;
}
.title_top2 span:nth-child(2) {
  display: inline-block;
  width: 38%;
  line-height: 17%;
  color: #80a2c0;
  text-align: center;
  font-size: 14px;
  margin-left: 1%;
}
.title_top2 span:nth-child(3) {
  display: inline-block;
  width: 29%;
  line-height: 17%;
  color: #80a2c0;
  text-align: center;
  font-size: 14px;
  margin-left: 2%;
}

.title_top {
  width: 100%;
  // height: 30px;
  height: 17%;
  background-color: transparent;
  border: 1px solid #1f436c;
  padding: 1% 0;
}
.title_top span:nth-child(1) {
  display: inline-block;
  width: 35%;
  line-height: 17%;
  color: #80a2c0;
  text-align: center;
  font-size: 14px;
}
.title_top span:nth-child(2) {
  display: inline-block;
  width: 17%;
  line-height: 17%;
  color: #80a2c0;
  text-align: center;
  font-size: 14px;
  margin-left: 1%;
}
.title_top span:nth-child(3) {
  display: inline-block;
  width: 19%;
  line-height: 17%;
  color: #80a2c0;
  text-align: center;
  font-size: 14px;
  margin-left: 2%;
}
.title_top span:nth-child(4) {
  display: inline-block;
  width: 30%;
  line-height: 17%;
  color: #80a2c0;
  text-align: center;
  font-size: 14px;
  margin-left: 2%;
}
.seamless-warp1 {
  height: 170px /* 240/16 */;
  overflow: hidden;
}
.seamless-warp1 li {
  height: 28px /* 30/16 */;
  line-height: 28px /* 30/16 */;
  width: 100%;
  border: 1px /* 1/16 */ solid #1f436c;
  margin-top: 10px /* 10/16 */ /* 5/16 */ /* 3/16 */;
  box-sizing: border-box;
  // background-color: rgba(255, 255, 255, .1);
}
.seamless-warp1 span:nth-child(1) {
  display: inline-block;
  width: 28%;
  height: 100%;
  text-align: center;
  font-size: 10px;
  -webkit-transform: scal(0.83);
  overflow: hidden;
}
.seamless-warp1 span:nth-child(2) {
  display: inline-block;
  width: 39%;
  margin-left: 1%;
  height: 100%;
  text-align: center;
  font-size: 10px;
  -webkit-transform: scal(0.83);
  overflow: hidden;
}
.seamless-warp1 span:nth-child(3) {
  display: inline-block;
  width: 29%;
  margin-left: 3%;
  height: 100%;
  text-align: center;
  font-size: 10px;
  -webkit-transform: scal(0.83);
  overflow: hidden;
}
// .seamless-warp1 span:nth-child(4) {
//   display: inline-block;
//   width: 30%;
//   margin-left: 2%;
//   height: 100%;
//   text-align: center;
//   font-size: 10px;
//   -webkit-transform: scal(0.83);
//   overflow: hidden;
// }
#dianre {
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 2.5px;
  background-color: #34de8e;
  margin-right: 5px;
  margin-bottom: 2px;
}
#dianre1 {
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 2.5px;
  background-color: red;
  margin-right: 5px;
  margin-bottom: 2px;
}
#dianre2 {
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 2.5px;
  background-color: yellow;
  margin-right: 5px;
  margin-bottom: 2px;
}

.title_top1 {
  width: 100%;
  height: 17%;
  background-color: transparent;
  border: 1px solid #1f436c;
  padding: 1% 0;
}
.title_top1 span:nth-child(1) {
  display: inline-block;
  width: 25%;
  line-height: 17%;
  color: #80a2c0;
  text-align: center;
  font-size: 14px;
}
.title_top1 span:nth-child(2) {
  display: inline-block;
  width: 16%;
  line-height: 17%;
  color: #80a2c0;
  text-align: center;
  font-size: 14px;
  margin-left: 1%;
}
.title_top1 span:nth-child(3) {
  display: inline-block;
  width: 25%;
  line-height: 17%;
  color: #80a2c0;
  text-align: center;
  font-size: 14px;
  margin-left: 3%;
}
.title_top1 span:nth-child(4) {
  display: inline-block;
  width: 20%;
  line-height: 17%;
  color: #80a2c0;
  text-align: center;
  font-size: 14px;
  margin-left: 2%;
}
.seamless-warp {
  height: 170px /* 240/16 */;
  overflow: hidden;
}

.seamless-warp li {
  height: 28px /* 30/16 */;
  line-height: 28px /* 30/16 */;
  width: 100%;
  border: 1px /* 1/16 */ solid #1f436c;
  margin-top: 10px /* 10/16 */ /* 5/16 */ /* 3/16 */;
  box-sizing: border-box;
  // background-color: rgba(255, 255, 255, .1);
}
.seamless-warp span:nth-child(1) {
  display: inline-block;
  width: 25%;
  height: 100%;
  text-align: center;
  font-size: 10px;
  -webkit-transform: scal(0.83);
  overflow: hidden;
}
.seamless-warp span:nth-child(2) {
  display: inline-block;
  width: 12%;
  margin-left: 1%;
  height: 100%;
  text-align: center;
  font-size: 10px;
  -webkit-transform: scal(0.83);
  overflow: hidden;
}
.seamless-warp span:nth-child(3) {
  display: inline-block;
  width: 30%;
  margin-left: 3%;
  height: 100%;
  text-align: center;
  font-size: 10px;
  -webkit-transform: scal(0.83);
  overflow: hidden;
}
.seamless-warp span:nth-child(4) {
  display: inline-block;
  width: 20%;
  margin-left: 2%;
  height: 100%;
  text-align: center;
  font-size: 10px;
  -webkit-transform: scal(0.83);
  overflow: hidden;
}

.legend-box {
  height: 115px /* 115/16 */;
  position: absolute;
  bottom: 5px /* 20/16 */;
  right: 10px /* 10/16 */;
  padding: 10px;
  border: 3px solid #0d375a;
}

.legend-box .titleent {
  color: #fff;
  font-size: 12px /* 12/16 */;
  font-weight: 500;
  text-align: center;
  width: 100%;
  height: 20px /* 20/16 */;
  line-height: 20px;
}

.legend-box .down {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: distribute;
  justify-content: space-around;
}

.legend-box .down .area-box {
  width: 60px /* 60/16 */;
  height: 85px /* 85/16 */;
}

.legend-box .down .area-box .area-lengend {
  width: 100%;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: distribute;
  justify-content: space-around;
}

.legend-box .down .area-box .area-lengend .left-color {
  width: 20px /* 20/16 */;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  border-top: 1px solid #fff;
  border-bottom: 1px solid #fff;
}

.legend-box .down .area-box .area-lengend .left-color .inside {
  width: 10px /* 10/16 */;
  height: 100%;
  // background: -webkit-gradient(
  //   linear,
  //   left top,
  //   left bottom,
  //   from(#da1222),
  //   color-stop(20%, #f4652a),
  //   to(#00c1e0)
  // );
  background: linear-gradient(
    180deg,
    #f12f49,
    #ed3f40 15%,
    #ff9119 25%,
    #c2c50f 50%,
    #47bdbd 65%,
    #4080cf 85%,
    #287fe9
  );
}

.legend-box .down .area-box .area-lengend .right-text {
  width: 60px /* 60/16 */;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.legend-box .down .area-box .area-lengend .right-text .com {
  font-size: 10px /* 10/16 */ /* 12/16 */ /* 10/16 */ /* 12/16 */;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #fff;
  // -webkit-transform: scale(0.8);
}
.com {
  //  font-size:.625rem /* 10/16 */;
  -webkit-transform: scale(0.9);
}
.legend-box .down .column-box {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
}

.legend-box .down .column-box .col-item {
  width: 100%;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.legend-box .down .column-box .col-item .item-icon {
  width: 10px /* 10/16 */;
  height: 10px;
  border-radius: 50%;
  margin-right: 5px /* 5/16 */;
}

.legend-box .down .column-box .col-item .item-name {
  font-size: 10px /* 10/16 */;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #feffff;
}
.ne {
  height: 80%;
}

.fanhui {
  position: absolute;
  left: 0.5%;
  top: 15%;
  cursor: pointer;
}
.jinzhi1 {
  font-size: 20px /* 16/16 */;
  font-weight: 500;
  color: #b5b5d4;
  cursor: not-allowed !important;
}
.fanhui img {
  width: 75px;
  height: 40px;
  // background-color: rgb(209, 77, 94);
}
.topguanli {
  width: 8.1% /* 150/16 */ /* 277/16 */;
  height: 50% /* 30/16 */ /* 35/16 */;
  position: absolute;
  right: 0%;
  top: 20%;
}
.role {
  height: 30px /* 30/16 */;
}
.role img {
  height: 30px;
  vertical-align: middle;
  /* margin-top:10px */
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.user-name {
  margin-left: 10px;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.dialogInfo /deep/ .el-dialog {
  background: #021c2d url(../assets/img/shouye/背景框.png) no-repeat;
  background-size: 100% 100%;
  padding: 10px;
  opacity: 0.85;
  box-sizing: border-box;
  .el-dialog__headerbtn {
    top: 0px !important;
    right: 6px !important;
    .el-dialog__close {
      color: #fff;
      font-size: 14px;
    }
  }
  .el-dialog__header {
    margin: 20px 50px 0px 40px;
    background: url(../assets/img/shouye/标题矩形.png) no-repeat;
    background-size: 100% 100%;
  }
  .el-dialog__title,
  .gailan h3,
  .gailan1 h3 {
    color: #2fbcfc;
  }
  .gailan h3,
  .gailan1 h3 {
    padding-left: 10px;
  }
}
.dialog-footer /deep/ .el-button-xitongerr:focus,
.dialog-footer /deep/ .el-button-xitongerr:hover {
  background: url(../assets/img/shouye/确定按钮.png) no-repeat;
  background-size: cover;
  border: none;
  color: #25c0fd;
}
.dialog-footer /deep/ .el-button-xitongup {
  background: url(../assets/img/shouye/取消按钮.png) no-repeat;
  background-size: cover;
  border: none;
}
.dialog-footer /deep/ .el-button-xitongerr {
  background: url(../assets/img/shouye/确定按钮.png) no-repeat;
  background-size: cover;
  border: none;
  color: #25c0fd;
}
.bg {
  color: rgb(118, 226, 255);
}
</style>