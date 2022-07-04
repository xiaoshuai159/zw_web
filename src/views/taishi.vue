<template>
  <div
    class="right_main_under"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="Mapcenter">
      <!-- //左侧条形 -->
      <div class="leftmap">
        <div class="leftmapson">
          <!-- 源IP访问排名 -->
          <el-row class="left_zhuzhuangip" v-if="newcity">
            <div class="left_yuanIP">
              <!-- 源IP访问排名——头部 -->
              <div class="left_yuantop" style="width: 100%; height: 13%">
                <div class="wenzi"><span>易感人群区县排行</span></div>
              </div>
              <!-- 源IP访问排名——echarts -->
              <div
                id="bar_qxqu"
                ref="chartqu"
                style="width: 100%; height: 87%; box-sizing: border-box"
              ></div>
            </div>

            <div class="left_cdIP">
              <!-- 源IP访问排名——头部 -->
              <div class="left_yuantop" style="width: 100%; height: 13%">
                <div class="wenzi"><span>易感人群排行</span></div>
              </div>
              <div
                class="leftcd_list yuanIP_num"
                id="bar_newip"
                style="width: 100%; height: 87%"
                
              >
                <div v-for="(item, index) in this.newleftip" :key="index" class="yuanIP_numson">
                  <div class="list_one">
                    <div
                      :class="cssyangshi(index)"
                      :style="{
                        background:
                          'url(' +
                          require('../assets/img/taishiimg/' +
                            (index + 1) +
                            '.png') +
                          ') no-repeat center center',
                        'background-size': '100% 100%',
                      }"
                    >
                      {{ index + 1 }}
                    </div>
                    <div class="list_img"></div>
                    <div
                      class="list_title"
                      @click="zuo_countUrlVsByIp(item.ip)"
                      :title="item.ip"
                    >
                    {{item.ip}}
                      <!-- {{
                        item.ip.length >= 18
                          ? item.ip.slice(0, 20) + '...'
                          : item.ip
                      }} -->
                    </div>
                    <div class="list_num">{{ item.visits }}</div>
                  </div>
                </div>
              </div>
            </div>
          </el-row>
          <!-- //源IP访问次数排名 -->
          <div v-if="!newcity" class="ziyuanIP">
            <div class="left_yuantop" style="width: 100%; height: 6%">
              <div class="wenzi"><span>易感人群排行</span></div>
            </div>
            <div id="bar_qx" ref="chart" class="yuanIP_num" style="width: 100%; height: 94%">
                 <div v-for="(item, index) in this.visits" :key="index" class="yuanIP_numson">
                  <div class="list_one1">
                    <div
                      :class="cssyangshi(index)"
                      :style="{
                        background:
                          'url(' +
                          require('../assets/img/taishiimg/' +
                            (index + 1) +
                            '.png') +
                          ') no-repeat center center',
                        'background-size': '100% 100%',
                      }"
                    >
                      {{ index + 1 }}
                    </div>
                    <div class="list_img"></div>
                    <div
                      class="list_title"
                      :title="item.ip"
                    >
                    {{item.ip}}
                      <!-- {{
                        item.ip.length >= 28
                          ? item.ip.slice(0, 28) + '...'
                          : item.ip
                      }} -->
                    </div>
                    <div class="list_num">{{ item.num }}</div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      <!-- //中间地图 -->
      <div class="centermap">
        <Navlist></Navlist>
        <div class="Maptop" >
          <div>
            <el-form size="mini" label-width="120px">
              <el-form-item label="选择时间段：">
                <el-date-picker
                  v-model="newdomainSimpleVo.dateValue_find1"
                  type="daterange"
                  :change="
                    dataCreate_change1(newdomainSimpleVo.dateValue_find1)
                  "
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  :default-time="['00:00:00', '23:59:59']"
                >
                </el-date-picker>
                <!-- range-separator="——" -->
                <el-button
                  type="primary"
                  size="mini"
                  style="margin-left: 10px"
                  @click="xuanze"
                  class="el-button-chaxun"
                  >查询</el-button
                >
                <el-button
                  type="primary"
                  size="mini"
                  style="margin-left: 10px"
                  class="el-button-chongzhi"
                  @click="chongzhi"
                  >重置</el-button
                >
              </el-form-item>
            </el-form>
          </div>
          <!-- <div class="title">
        <div> 成都历史访问分析</div>
      </div> -->
        </div>
        <div class="Mapcenter1">
          <span v-if="oldmaploading" @click="fanhui" class="btn"
            >返回上一级</span
          >
          <span v-if="oldmaploading" @click="fanhui1" class="btn1"
            >返回首页</span
          >
          <div
            id="myEcharts"
            ref="chartmap"
            style="width: 99%; height: 100%"
          ></div>

          <div data-v-4437755d="" class="legend-box">
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
                    style="background: #d14d5e"
                  ></div>
                  <div data-v-4437755d="" class="item-name">
                    ≥{{
                     ((this.max / 4 ) * 3) > 10000
                        ? this.max > 4
                          ? ((this.max / 4 / 10000) * 3).toFixed(0) +
                            '万'
                          : 0
                        : ((this.max / 4) * 3).toFixed(0)
                    }}
                  
                  </div>
                    <!-- {{ max > 4 ? parseInt(max / 4) * 3 : 0 }} -->
                </div>
                <div data-v-4437755d="" class="col-item">
                  <div
                    data-v-4437755d=""
                    class="item-icon"
                    style="background: #ff9119"
                  ></div>
                  <div data-v-4437755d="" class="item-name">
                    {{
                   ((this.max / 4 ) * 2) > 10000
                        ? this.max > 4
                          ? ((this.max / 4 / 10000) * 2).toFixed(0) +
                            '万'
                          : 0
                        : ((this.max / 4) * 2).toFixed(0)
                    }}-{{
                     ((this.max / 4 ) * 3)> 10000
                        ? this.max > 4
                          ? ((this.max / 4 / 10000) * 3).toFixed(0) +
                            '万'
                          : 0
                        : ((this.max / 4) * 3).toFixed(0)
                    }}
                    <!-- {{ max > 4 ? parseInt(max / 4) * 2 + 1 : 0 }}-{{
                            max > 4 ? parseInt(max / 4) * 3 : 0
                          }} -->
                  </div>
                </div>
                <div data-v-4437755d="" class="col-item">
                  <div
                    data-v-4437755d=""
                    class="item-icon"
                    style="background: #007aff"
                  ></div>
                  <div data-v-4437755d="" class="item-name">
                    {{
                     (this.max / 4 ) > 10000
                        ? this.max > 4
                          ? (this.max / 4 / 10000).toFixed(0) + '万'
                          : 0
                        : (this.max / 4).toFixed(0)
                    }}-{{
                      ((this.max / 4 ) * 2) > 10000
                        ? this.max > 4
                          ? ((this.max / 4 / 10000) * 2).toFixed(0) +
                            '万'
                          : 0
                        : ((this.max / 4) * 2).toFixed(0)
                    }}
                    <!-- {{ max > 4 ? (parseInt(max / 4) + 1 ): 0 }}-{{
                            parseInt(max / 4/10000) * 2
                          }} -->
                  </div>
                </div>
                <div data-v-4437755d="" class="col-item">
                  <div
                    data-v-4437755d=""
                    class="item-icon"
                    style="background: #2d88eb"
                  ></div>
                  <div data-v-4437755d="" class="item-name">
                    0-{{
                    (this.max / 4 )> 10000
                        ? this.max > 4
                          ? (this.max / 4 / 10000).toFixed(0) + '万'
                          : (this.max / 4)
                        : (this.max / 4).toFixed(0)
                    }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- //右侧条形 -->
      <div class="rightmap">
        <div class="leftmapson1">
          <!-- 域名访问排名 -->
          <el-row class="left_zhuzhuangip1" v-if="newcity">
            <div class="left_yuming">
              <!-- 域名访问排名——头部 -->
              <div class="left_yuantop" style="width: 100%; height: 13%">
                <div class="wenzi"><span>高危区域排行</span></div>
              </div>
              <!-- 域名访问排名——echarts -->
              <div
                id="bar_qxqu1"
                ref="chartqu1"
                style="width: 100%; height: 87%; box-sizing: border-box"
              ></div>
            </div>

            <div class="left_cdURl">
              <!-- 成都URL排名——头部 -->
              <div class="left_yuantop" style="width: 100%; height: 13%">
                <div class="wenzi"><span>高危涉诈网址排行</span></div>
              </div>
              <div
                class="leftcd_list  yuanIP_num"
                id="bar_newip1"
                style="width: 100%; height: 87%"
              >
                <div v-for="(item, index) in this.newleftip1" :key="index" class="yuanIP_numson">
                  <div class="list_one">
                    <div
                      :class="cssyangshi(index)"
                      :style="{
                        background:
                          'url(' +
                          require('../assets/img/taishiimg/' +
                            (index + 1) +
                            '.png') +
                          ') no-repeat center center',
                        'background-size': '100% 100%',
                      }"
                    >
                      {{ index + 1 }}
                    </div>
                    <div class="list_img"></div>
                    <div
                      class="list_title"
                      @click="right_countUrlVsByUrl(item.url)"
                      :title="item.url"
                    >
                    {{item.url}}
                      <!-- {{
                        item.url.length >= 22
                          ? item.url.slice(0, 22) + '...'
                          : item.url
                      }} -->
                    </div>
                    <div class="list_num">{{ item.urlvisits }}</div>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div
              id="bar_newip1"
              ref="chartnewip1"
              style="width: 100%; height: 45%; border: 2px solid #1b4254"
            ></div> -->
          </el-row>
          <!-- //域名访问次数排名 -->
          <!-- //源IP访问次数排名 -->
          <div v-if="!newcity" class="ziyumin">
            <div class="left_yuantop" style="width: 100%; height: 6%">
              <div class="wenzi"><span>高危涉诈网址排行</span></div>
            </div>
            <div
              id="bar_qx1"
              ref="chart1"
              style="width: 100%; height: 94%"
              class="yuanIP_num" 
            >
                <div v-for="(item, index) in this.urlvisits" :key="index" class="yuanIP_numson">
                  <div class="list_one1">
                    <div
                      :class="cssyangshi(index)"
                      :style="{
                        background:
                          'url(' +
                          require('../assets/img/taishiimg/' +
                            (index + 1) +
                            '.png') +
                          ') no-repeat center center',
                        'background-size': '100% 100%',
                      }"
                    >
                      {{ index + 1 }}
                    </div>
                    <div class="list_img"></div>
                    <div
                      class="list_title"
                      :title="item.name"
                    >
                    {{item.name}}
                      <!-- {{
                        item.name.length >= 25
                          ? item.name.slice(0, 25) + '...'
                          : item.name
                      }} -->
                    </div>
                    <div class="list_num">{{ item.name_num }}</div>
                  </div>
                </div>
            </div>
                 
          </div>
          <!-- <div
            id="bar_qx1"
            ref="chart1"
            style="width: 100%; height: 100%; border: 2px solid #1b4254"
            v-if="!newcity"
          ></div> -->
        </div>
      </div>
    </div>
    <div class="Mapbtom">
      <div class="bto_bh">
        <!-- 访问量历史变化趋势——头部 -->
        <div class="left_yuantop" style="width: 100%; height: 13%">
          <div class="wenzi1">
            <span>{{
              this.newcity == true ? this.title : this.cityName + this.title1
            }}</span>
          </div>
        </div>
        <!-- 访问量历史变化趋势——echarts -->
        <div class="leftmapson2">
          <div
            id="bar_qx2"
            ref="chart2"
            style="width: 100%; height: 100%"
          ></div>
        </div>
      </div>
      <!--  -->
    </div>

    <el-dialog
      :title="'访问详情——' + this.mapName1"
      :visible.sync="dialogTableVisible"
      class="dialogInfo"
      width="75%"
      style="color: #fff"
      :before-close="handleClose"
      :modal-append-to-body="false"
    >
      <el-table
        :row-class-name="tableRowClassName"
        :data="gridData"
        class="tableStyle"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        v-loading="loading1"
        :row-style="{ height: 0 }"
        :cell-style="{ padding: 0 }"
      >
        <el-table-column prop="discoverTime" label="访问时间"></el-table-column>
        <el-table-column label="源IP">
          <template slot-scope="scope">
            {{ zhuanip(scope.row.sourceIp) }}
          </template>
        </el-table-column>
        <el-table-column prop="sourcePort" label="源端口"></el-table-column>
        <el-table-column prop="sourceAddress" label="归属地"></el-table-column>
        <el-table-column label="目标IP">
          <template slot-scope="scope">
            {{ zhuanip(scope.row.targetIp) }}
          </template>
        </el-table-column>
        <el-table-column prop="targetPort" label="目标端口"></el-table-column>
      </el-table>
      <!-- //分页 -->
      <div class="bottom1">
        <div class="ss1">
          <!-- @size-change="handleSizeChange1" -->
          <el-pagination
            @current-change="handleCurrentChange1"
            :current-page.sync="mypageable1.pageNum1"
            :page-size="mypageable1.pageSize1"
            layout="total, prev, pager, next,jumper"
            :total="total1"
            class="pagePagination"
          >
          </el-pagination>
        </div>
      </div>
    </el-dialog>
    <!-- //左侧ip弹窗 -->
    <el-dialog
      class="dialogInfo"
      title="成都IP查询"
      :visible.sync="dialogVisibleip"
      width="40%"
      style="color: #fff"
      :before-close="handleCloseip"
      :modal-append-to-body="false"
    >
      <el-table
        :row-class-name="tableRowClassName"
        max-height="400"
        height="400"
        :data="urliplistData"
        class="tableStyle"
      >
        <!-- element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        v-loading="loading2"
        :row-style="{ height: 0 }"
        :cell-style="{ padding: 0 }" -->
        <el-table-column prop="url" label="URL"></el-table-column>
        <el-table-column prop="visits" label="数量"></el-table-column>
      </el-table>
    </el-dialog>
    <!-- //右侧url弹窗 -->
    <el-dialog
      class="dialogInfo"
      title="成都URL查询 "
      :visible.sync="dialogVisibleurl"
      width="30%"
      style="color: #fff"
      :before-close="handleCloseurl"
      :modal-append-to-body="false"
    >
      <el-tabs
        type="border-card"
        :tab-position="tabPosition"
        style="height: 400px"
        v-model="activeName"
        @tab-click="tabURl"
      >
        <el-tab-pane label="成都URL" name="first">
          <el-table
            :row-class-name="tableRowClassName"
            max-height="350"
            :data="iplistData"
            class="tableStyle"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            v-loading="loading2"
            :row-style="{ height: 0 }"
            :cell-style="{ padding: 0 }"
          >
            <el-table-column prop="address" label="区县"></el-table-column>
            <el-table-column prop="visits" label="数量"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="区县IP排名" name="second">
          <el-table
            :row-class-name="tableRowClassName"
            max-height="350"
            :data="urlqxlistData"
            class="tableStyle"
          >
            <!-- element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        v-loading="loading2"
        :row-style="{ height: 0 }"
        :cell-style="{ padding: 0 }" -->
            <el-table-column label="IP">
              <template slot-scope="scope">
                {{ zhuanip(scope.row.ip) }}
              </template>
            </el-table-column>
            <el-table-column prop="visits" label="数量"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script >
import chengdou from '../static/jsonmap/chengdou'
import chenghua from '../static/jsonmap/chenghua'
import chongzhou from '../static/jsonmap/chongzhou'
import dayi from '../static/jsonmap/dayi'
import doujiangyan from '../static/jsonmap/doujiangyan'
import jianyang from '../static/jsonmap/jianyang'
import jinjiang from '../static/jsonmap/jinjiang'
import jinniu from '../static/jsonmap/jinniu'
import jintang from '../static/jsonmap/jintang'
import longquanyi from '../static/jsonmap/longquanyi'
import pengzhou from '../static/jsonmap/pengzhou'
import pidou from '../static/jsonmap/pidou'
import pujiang from '../static/jsonmap/pujiang'
import qingbaijiang from '../static/jsonmap/qingbaijiang'
import qingyang from '../static/jsonmap/qingyang'
import qionglai from '../static/jsonmap/qionglai'
import shuangliu from '../static/jsonmap/shuangliu'
import wenjiang from '../static/jsonmap/wenjiang'
import wuhou from '../static/jsonmap/wuhou'
import xindou from '../static/jsonmap/xindou'
import xinjin from '../static/jsonmap/xinjin'
import dongbuxinqu from '../static/jsonmap/dongbuxinqu'
import tianfu from '../static/jsonmap/tianfu'
import gaoxinnan from '../static/jsonmap/gaoxinnan'
import gaxi from '../static/jsonmap/gaxi'
// import cutstr from "@/utils/jiequ.js";
import dayjs from 'dayjs'
import Navlist from '@/components/hearderdongtainav.vue'
// import func from 'vue-editor-bridge'
export default {
  data() {
    return {
      activeName: 'first',
      newURl: '',
      newIpone: '',
      urliplistData: [],
      urlqxlistData: [],
      tabPosition: 'top',
      urllistData: [],
      iplistData: [],
      loading2: false,
      dialogVisibleurl: false,
      dialogVisibleip: false,
      mapName1: '',
      totalPages1: '',
      gridData: [],
      mypageable1: {
        pageNum1: 1,
        pageSize1: 10,
      },
      total1: 1,
      dialogTableVisible: false,
      loading: false,
      loading1: false,
      oldmaploading: false,
      cityName: '成都市',
      jxmap: {
        成都市: chengdou,
        锦江区: jinjiang,
        青羊区: qingyang,
        金牛区: jinniu,
        武侯区: wuhou,
        成华区: chenghua,
        龙泉驿区: longquanyi,
        青白江区: qingbaijiang,
        新都区: xindou,
        温江区: wenjiang,
        双流区: shuangliu,
        郫都区: pidou,
        金堂县: jintang,
        大邑县: dayi,
        蒲江县: pujiang,
        新津县: xinjin,
        都江堰市: doujiangyan,
        彭州市: pengzhou,
        邛崃市: qionglai,
        崇州市: chongzhou,
        简阳市: jianyang,
        东部新区: dongbuxinqu,
        天府新区: tianfu,
        高新南区: gaoxinnan,
        高新西区: gaxi,
      },
      newdomainSimpleVo: {
        dateValue_find1: '',
      },
      whiteSearchList1: {
        startCreateTime1:
          dayjs().subtract(1, 'month').format('YYYY-MM-DD') +
          ' ' +
          '00:' +
          '00:' +
          '00',
        endCreateTime1:
          dayjs().format('YYYY-MM-DD') + ' ' + '23:' + '59:' + '59',
      },
          whiteSearchList2: {
        startCreateTime2:
          dayjs().subtract(1, 'month').format('YYYY-MM-DD') +
          ' ' +
          '00:' +
          '00:' +
          '00',
        endCreateTime2:
          dayjs().format('YYYY-MM-DD') + ' ' + '23:' + '59:' + '59',
      },
      // whiteSearchList2: {
      //   startCreateTime2:
      //     dayjs().subtract(14, 'day').format('YYYY-MM-DD') +
      //     ' ' +
      //     '00:' +
      //     '00:' +
      //     '00',
      //   endCreateTime2:
      //     dayjs().format('YYYY-MM-DD') + ' ' + '23:' + '59:' + '59',
      // },
      leftarrX: [],
      leftarrY: [],
      //左侧柱状
      visits: [],
      sourceip: [],
      //左侧柱状区
      visits1: [],
      sourceip1: [],
      //右侧柱状区
      visits2: [],
      sourceip2: [],
      //右侧柱状
      url: [],
      urlvisits: [],
      //下折线
      disDate: [],
      disvisits: [],
      mapName: '',
      dataDi: [
        { name: '锦江区', value: 0 },
        { name: '青羊区', value: 0 },
        { name: '金牛区', value: 0 },
        { name: '武侯区', value: 0 },
        { name: '成华区', value: 0 },
        { name: '龙泉驿区', value: 0 },
        { name: '青白江区', value: 0 },
        { name: '新都区', value: 0 },
        { name: '温江区', value: 0 },
        { name: '双流区', value: 0 },
        { name: '郫都区', value: 0 },
        { name: '金堂县', value: 0 },
        { name: '大邑县', value: 0 },
        { name: '蒲江县', value: 0 },
        { name: '新津县', value: 0 },
        { name: '都江堰市', value: 0 },
        { name: '彭州市', value: 0 },
        { name: '邛崃市', value: 0 },
        { name: '崇州市', value: 0 },
        { name: '简阳市', value: 0 },
        { name: '东部新区', value: 0 },
        { name: '天府新区', value: 0 },
        { name: '高新西区', value: 0 },
        { name: '高新南区', value: 0 },
      ],
      
      max: 0,
      min: 0,
      xinarr: [],
      newcity: true,
      title: '成都市访问量历史变化趋势',
      title1: '访问量历史变化趋势',
      res: '',
      newleftip: [],
      routlist: '',
      newleftip1: [],
      newleftnum1: [],
    }
  },
  components: {
    Navlist: Navlist, //将别名demo 变成 组件 Demo
  },
  mounted() {
    // this.leftip()   //源IP访问次数排名
    this.righturlqu() //域名访问排名
    this.leftipqu() //源IP访问排名
    this.newleft_ip() //成都IP排名
    this.newright_ip() //成都URL排名

    this.mapquan()
    if (this.$route.query.citynames) {
      let cityName = this.$route.query.citynames
      // console.log(this.cityName);
      this.handlerChange(cityName)
    }else{
          this.bottomline() //历史变化
    }

    // console.log(this.$route.query.navval)
  },
  created() {
    // console.log(this.$route);
    this.routlist = this.$route
    // console.log(  this.routlist);
  },
  // watch:{
  //   "max":function(oldvalue,newvalue){
  //     if(oldvalue==newvalue){
  //           this.max=oldvalue
  //     }else{
  // this.max=newvalue
  //     }
  
  //   }
  // },
  methods: {
    cssyangshi(index) {
      if (index == 0) {
        return 'list_bg'
      } else if (index == 1) {
        return 'list_bg1'
      } else if (index == 2) {
        return 'list_bg2'
      } else if (index >= 3) {
        return 'list_bg3'
      }
    },
    // 列表斑马
    tableRowClassName({ rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'warning-row'
      } else if (rowIndex % 2 === 1) {
        return 'success-row'
      }
      return ''
    },
    // 时间
    // time() {
    //   this.res = new Date().getTime() / 1000 - 7 * 24 * 3600;

    // },
    // 初始化柱状图区---左侧  源IP访问排名
    async leftipqu() {
      this.newcity = true
      this.loading = true
      // this.righturlqu()
      const discoverCountVo = {
        address: '',
        endTime: this.whiteSearchList1.endCreateTime1,
        startTime: this.whiteSearchList1.startCreateTime1,
      }
      const { data: res } = await this.$http.post(
        '/discover/countAddressIpByTime',
        discoverCountVo
      )

      if (res.code == 200) {
        if (res.data.length > 0) {
          let visitsleftqu = []
          let addressleftqu = []
          res.data.forEach((item) => {
            visitsleftqu.push(item.visits)
            addressleftqu.push(item.address)
            // console.log(sourceipleft);
          })
          // this.visits1 = visitsleftqu.reverse();
          // this.sourceip1 = addressleftqu.reverse();
          this.visits1 = visitsleftqu
          this.sourceip1 = addressleftqu
          
          // console.log(this.visits1, this.sourceip1)
          if (this.$refs.chartqu) {
            this.drawLinequ()
          }
        } else {
          // <span style="font-size:16px;color:#fff;margin-left:10px;margin-top:10px">源IP访问排名</span><span style="margin-top:10px;margin-left:15px;color:#fff;font-size:12px">SOURCE IP</span>
          var html = `<span class="echarts-nodate " style="color:#fff;margin-left:10px;display:inline-block;margin-top:20%">暂无数据</span>`
          document.getElementById('bar_qxqu').innerHTML = html
          document
            .getElementById('bar_qxqu')
            .removeAttribute('_echarts_instance_')

          return
        }
      }
    },
    // 右侧柱状--区  域名访问量排名
    async righturlqu() {
      // this.bottomline()
      let discoverCountVo = {
        address: '',
        endTime: this.whiteSearchList1.endCreateTime1,
        startTime: this.whiteSearchList1.startCreateTime1,
      }
      const { data: res } = await this.$http.post(
        '/discover/countAddressUrlByTime',
        discoverCountVo
      )
      //  console.log(res,'右侧');
      if (res.code == 200) {
        if (res.data.length > 0) {
          let visitsleftqu = []
          let addressleftqu = []
          res.data.forEach((item) => {
            visitsleftqu.push(item.visits)
            addressleftqu.push(item.address)
          })
          // this.visits2 = visitsleftqu.reverse();
          // this.sourceip2 = addressleftqu.reverse();
          this.visits2 = visitsleftqu
          this.sourceip2 = addressleftqu

          if (this.$refs.chartqu1) {
            this.drawLinequ1()
          }
        } else {
          // <span style="font-size:16px;color:#fff;margin-left:10px;margin-top:10px">域名访问排名</span><span style="margin-top:10px;margin-left:15px;color:#fff;font-size:12px">DOMAIN NAME ACCESS RANKING</span>
          var html = `<span class="echarts-nodate" style="color:#fff;margin-left:10px;display:inline-block;margin-top:20%">暂无数据</span>`
          document.getElementById('bar_qxqu1').innerHTML = html
          document
            .getElementById('bar_qxqu1')
            .removeAttribute('_echarts_instance_')

          return
        }
      }
    },
    //初始化数据 源IP访问次数排名
    // 左侧柱状
    async leftip() {
      this.loading = true
      // this.righturl()
      const discoverCountVo = {
        address: '',
        endTime: this.whiteSearchList1.endCreateTime1,
        startTime: this.whiteSearchList1.startCreateTime1,
      }
      const { data: res } = await this.$http.post(
        '/discover/countIpByDate',
        discoverCountVo
      )
      // console.log(res,'左侧');
      if (res.code == 200) {
        if (res.data.length > 0) {
          let visitsleft = []
          let sourceipleft = []
          res.data.forEach((item) => {
            visitsleft.push(item.visits)
            sourceipleft.push(this.zhuanip(item.source_ip))
            // console.log(sourceipleft);
          })
          this.visits = visitsleft.reverse()
          this.sourceip = sourceipleft.reverse()

          if (this.$refs.chart) {
            this.drawLine()
          }
        }
        //   else{
        //     var html = `<span class="echarts-nodate">暂无数据</span>`
        //  document.getElementById('bar_qx').innerHTML = html
        //  document.getElementById('bar_qx').removeAttribute('_echarts_instance_')

        //   return;
        //   }
      }
    },
    // 右侧柱状
    async righturl() {
      // this.bottomline()
      let discoverCountVo = {
        address: '',
        endTime: this.whiteSearchList1.endCreateTime1,
        startTime: this.whiteSearchList1.startCreateTime1,
      }
      const { data: res } = await this.$http.post(
        '/discover/countUrlByDate',
        discoverCountVo
      )
      //  console.log(res,'右侧');
      if (res.code == 200) {
        if (res.data.length > 0) {
          let urlright = []
          let urlvisitsright = []
          res.data.forEach((item) => {
            urlvisitsright.push(item.urlvisits)
            urlright.push(item.url)
          })
          // this.urlvisits = urlvisitsright.reverse();
          // this.url = urlright.reverse();
          this.urlvisits = urlvisitsright.reverse()
          this.url = urlright.reverse()

          if (this.$refs.chart1) {
            this.drawLine1()
          }
        }
        //   else{
        //     var html = `<span class="echarts-nodate"><i class="fontFamily yybzzanwushuju1"></i>暂无数据</span>`
        //  document.getElementById('bar_qx1').innerHTML = html
        //  document.getElementById('bar_qx1').removeAttribute('_echarts_instance_')

        //   return;
        //   }
      }
    },
    // 下折线
    async bottomline() {
      // this.mapquan()
      let discoverCountVo = {
        address: this.cityName=='成都市'?'':this.cityName,
        endTime: this.whiteSearchList2.endCreateTime2,
        startTime: this.whiteSearchList2.startCreateTime2,
      }
      const { data: res } = await this.$http.post(
        '/discover/sumVisitsByDate',
        discoverCountVo
      )
      //  console.log(res,'下侧');
      if (res.code == 200) {
        if (res.data.length > 0) {
          let disDatebottom = []
          let disvisitsbottom = []
          res.data.forEach((item) => {
            disDatebottom.push(item.disDate)
            disvisitsbottom.push(item.disvisits)
          })
          this.disDate = disDatebottom
          this.disvisits = disvisitsbottom

          if (this.$refs.chart2) {
            this.drawLine2()
          }
        } else {
          // <span style="font-size:16px;color:#fff;margin-left:10px;margin-top:10px">访问量历史变化趋势</span><span style="margin-top:10px;margin-left:15px;color:#fff;font-size:12px">   HISTORICAL CHANGE TREND OF VISITORS</span><br/>
          var html = `<br /><span class="echarts-nodate" style="color:#fff;margin-left:10px;display:inline-block;margin-top:3%">暂无数据</span>`
          document.getElementById('bar_qx2').innerHTML = html
          document
            .getElementById('bar_qx2')
            .removeAttribute('_echarts_instance_')

          return
        }
      }
    },
    // ?////////////////////////////////////////////
    // 左侧柱状
    async leftip1() {
      this.loading = true
      // this.righturl1()
      const discoverCountVo = {
        address: '',
        endTime: this.whiteSearchList1.endCreateTime1,
        startTime: this.whiteSearchList1.startCreateTime1,
      }
      const { data: res } = await this.$http.post(
        '/discover/countIpByDate',
        discoverCountVo
      )

      if (res.code == 200) {
        console.log(res.data)
        if (res.data.length > 0) {
          let visitsleft = []
          let sourceipleft = []
          res.data.forEach((item) => {
            visitsleft.push(item.visits)
            sourceipleft.push(this.zhuanip(item.source_ip))
            // console.log(sourceipleft);
          })
          this.visits = visitsleft.reverse()
          this.sourceip = sourceipleft.reverse()

          if (this.$refs.chart) {
            this.drawLine()
          }
        } else {
          //  var html = `<span class="echarts-nodate"><i class="fontFamily yybzzanwushuju1"></i>暂无数据</span>`
          //  document.getElementById('bar_qx').innerHTML = html
          //  document.getElementById('bar_qx').removeAttribute('_echarts_instance_')
          //   return;
        }
      }
    },
    // 右侧柱状
    async righturl1() {
      // this.bottomline1()
      let discoverCountVo = {
        address: '',
        endTime: this.whiteSearchList1.endCreateTime1,
        startTime: this.whiteSearchList1.startCreateTime1,
      }
      const { data: res } = await this.$http.post(
        '/discover/countUrlByDate',
        discoverCountVo
      )

      if (res.code == 200) {
        if (res.data.length > 0) {
          let urlright = []
          let urlvisitsright = []
          res.data.forEach((item) => {
            urlvisitsright.push(item.urlvisits)
            urlright.push(item.url)
          })
          // this.urlvisits = urlvisitsright.reverse();
          // this.url = urlright.reverse();
          this.urlvisits = urlvisitsright
          this.url = urlright

          if (this.$refs.chart1) {
            this.drawLine1()
          }
        } else {
          //  var html = `<span class="echarts-nodate"><i class="fontFamily yybzzanwushuju1"></i>暂无数据</span>`
          //  document.getElementById('bar_qx1').innerHTML = html
          //  document.getElementById('bar_qx1').removeAttribute('_echarts_instance_')
          //   return;
        }
      }
    },

    //新柱状左   成都IP排名
    async newleft_ip() {
      this.newleftip = []

      const list = {
        address: '',
        endTime: this.whiteSearchList1.endCreateTime1,
        startTime: this.whiteSearchList1.startCreateTime1,
      }
      const { data: res } = await this.$http.post(
        '/discover/countIpByDate',
        list
      )
      if (res.code == 200) {
        // console.log(res.data);
        if (res.data.length > 0) {
          this.newleftip = res.data.map((item) => {
            return {
              ip: this.zhuanip(item.source_ip),
              visits: item.visits,
            }
          })

          // for (var i = 0; i < res.data.length; i++) {
          //   this.newleftip.push(this.zhuanip(res.data[i].source_ip))
          //   this.newleftnum.push(res.data[i].visits)
          // }
          // if (this.$refs.chartnewip) {
          //   this.newdrawLine()
          // }
          var html = `<span class="echarts-nodate" style="color:#fff;margin-left:10px;display:none">暂无数据</span>`
          document.getElementById('bar_newip').innerHTML = html
          document
            .getElementById('bar_newip')
            .removeAttribute('_echarts_instance_')
        } else {
          // <span style="font-size:16px;color:#fff;margin-left:10px;margin-top:10px">成都IP数排名</span><span style="margin-top:10px;margin-left:15px;color:#fff;font-size:12px"> IP RANKING</span>
          var html = `<span class="echarts-nodate" style="color:#fff;margin-left:10px;">暂无数据</span>`
          document.getElementById('bar_newip').innerHTML = html
          document
            .getElementById('bar_newip')
            .removeAttribute('_echarts_instance_')

          return
        }
        // console.log(res.data);
      }
    },
    //新柱状右   成都URL排名
    async newright_ip() {
      this.newleftip1 = []
      this.newleftnum1 = []
      const list = {
        address: '',
        endTime: this.whiteSearchList1.endCreateTime1,
        startTime: this.whiteSearchList1.startCreateTime1,
      }
      const { data: res } = await this.$http.post(
        '/discover/countUrlByDate',
        list
      )
      if (res.code == 200) {
        if (res.data.length > 0) {
          this.newleftip1 = res.data
          // for (var i = 0; i < res.data.length; i++) {
          //   this.newleftip1.push(res.data[i].url)
          //   this.newleftnum1.push(res.data[i].urlvisits)
          // }
          // if (this.$refs.chartnewip1) {
          //   this.newdrawLine1()
          // }
          var html = `<span class="echarts-nodate" style="color:#fff;margin-left:10px;display:none">暂无数据</span>`
          document.getElementById('bar_newip1').innerHTML = html
          document
            .getElementById('bar_newip1')
            .removeAttribute('_echarts_instance_')
        } else {
          // <span style="font-size:16px;color:#fff;margin-left:10px;margin-top:10px;">成都URL排名</span><span style="margin-left:15px;margin-top:10px;color:#fff;font-size:12px">  DOMAIN NAME URL</span>
          var html = `<span class="echarts-nodate" style="color:#fff;margin-left:10px;">暂无数据</span>`
          document.getElementById('bar_newip1').innerHTML = html
          document
            .getElementById('bar_newip1')
            .removeAttribute('_echarts_instance_')

          return
        }
      }
    },
    // 下折线
    // async bottomline1() {
    //   this.mapquan1()

    //   let discoverCountVo = {
    //     address: '',
    //     endTime: this.whiteSearchList2.endCreateTime2,
    //     startTime: this.whiteSearchList2.startCreateTime2,
    //   }
    //   const { data: res } = await this.$http.post(
    //     '/discover/sumVisitsByDate',
    //     discoverCountVo
    //   )

    //   if (res.code == 200) {
    //     if (res.data.length > 0) {
    //       let disDatebottom = []
    //       let disvisitsbottom = []
    //       res.data.forEach((item) => {
    //         disDatebottom.push(item.disDate)
    //         disvisitsbottom.push(item.disvisits)
    //       })
    //       this.disDate = disDatebottom
    //       this.disvisits = disvisitsbottom

    //       if (this.$refs.chart2) {
    //         this.drawLine2()
    //       }
    //     } else {
    //       var html = `<span style="font-size:16px;color:#fff;margin-left:10px;margin-top:10px">访问量历史变化趋势</span><span style="margin-top:10px;margin-left:15px;color:#fff;font-size:12px">   HISTORICAL CHANGE TREND OF VISITORS</span><br/><span class="echarts-nodate" style="color:#fff;margin-left:10px;">暂无数据</span>`
    //       document.getElementById('bar_qx2').innerHTML = html
    //       document
    //         .getElementById('bar_qx2')
    //         .removeAttribute('_echarts_instance_')

    //       return
    //     }
    //   }
    // },
    //统计全部地区地图显示
    //   async mapquan1() {
    //     let discoverCountVo = {
    //       address: '',
    //       endTime: this.whiteSearchList1.endCreateTime1,
    //       startTime: this.whiteSearchList1.startCreateTime1,
    //     }
    //     const { data: res } = await this.$http.post(
    //       '/discover/countAddressByDate',
    //       discoverCountVo
    //     )

    //     if (res.code == 200) {

    //       // console.log(res.data)
    //       if (res.data.length > 0) {
    //         // var newarr = res.data.map((item) => {
    //         //   return {
    //         //     name: item.address,
    //         //     value: item.visits,
    //         //   };
    //         // });
    //         var newarr = res.data
    //         newarr.forEach((element) => {
    //           element.name = (element.name || '').split('成都市')[1]
    //         })
    //         this.xinarr = newarr

    //  for(var i=0;i<this.dataDi.length;i++){
    //           for(var j=0;j<newarr.length;j++){

    //             if(this.dataDi[i].name==newarr[j].name){
    //               this.dataDi[i].value=newarr[j].value

    //             }
    //           }
    //         }
    //             let max = this.dataDi.sort((a, b) => {
    //           return b.value - a.value
    //         })

    //         this.max = max[0] ? max[0]['value'] : 0

    //         setTimeout(() => {
    //           if (this.$refs.chartmap) {
    //             this.mineMap()
    //           }
    //         }, 500)
    //       } else {
    //         this.dataDi = []
    //         // this.$message("地图访问量无数据");
    //         this.max = 0

    //         setTimeout(() => {
    //           if (this.$refs.chartmap) {
    //             this.mineMap()
    //           }
    //         }, 500)
    //         this.loading = false
    //       }

    //       // console.log(res.data);
    //       // this.loading=false
    //     }
    //   },
    // 1111111111111111111111111111111
    //转ip
    zhuanip(num) {
      var str
      var tt = new Array()
      tt[0] = (num >>> 24) >>> 0
      tt[1] = ((num << 8) >>> 24) >>> 0
      tt[2] = (num << 16) >>> 24
      tt[3] = (num << 24) >>> 24
      str =
        String(tt[0]) +
        '.' +
        String(tt[1]) +
        '.' +
        String(tt[2]) +
        '.' +
        String(tt[3])
      return str
    },
    //选中地区  源IP访问次数排名
    //左柱状——————————————————
    async ipxuan() {
      this.loading = true
      // this.urlxuan()

      this.visits = []
      // this.sourceip = []
      let discoverCountVo = {
        address: '中国四川省成都市' + this.mapName,
        endTime: this.whiteSearchList1.endCreateTime1,
        startTime: this.whiteSearchList1.startCreateTime1,
      }
      const { data: res } = await this.$http.post(
        '/discover/countIpByAddress',
        discoverCountVo
      )
      //  console.log(res,'左侧1');
      if (res.code == 200) {
        // console.log(res.data)
        if (res.data.length > 0) {
          // let visitsleft1 = []
          // let sourceipleft1 = []
          // res.data.forEach((item) => {
          //   visitsleft1.push(item.visits)
          //   sourceipleft1.push(this.zhuanip(item.source_ip))

          // })
          // this.visits = visitsleft1
          // this.sourceip = sourceipleft1
          this.visits = res.data.map((item) => {
            return {
              ip: this.zhuanip(item.source_ip),
              num: item.visits,
            }
          })
          // console.log(this.visits)
          // if (this.$refs.chart) {
          //   this.drawLine()
          // }

          // this.loading = false;
          // <span style="font-size:16px;color:#fff;margin-left:10px;margin-top:10px">源IP访问次数排名</span><span  style="margin-left:15px;margin-top:10px;font-size:12px;color:#fff">SOURCE IP ACCESS</span>
         var html = `<span class="echarts-nodate" style="color:#fff;margin-left:10px;display:none">暂无数据</span>`
          document.getElementById('bar_qx').innerHTML = html
          document
            .getElementById('bar_qx')
            .removeAttribute('_echarts_instance_')
      } else {
          var html = `<span class="echarts-nodate" style="color:#fff;margin-left:10px">暂无数据</span>`
          document.getElementById('bar_qx').innerHTML = html
          document
            .getElementById('bar_qx')
            .removeAttribute('_echarts_instance_')

          return
        }
      }
    },
    // 域名访问次数排名
    async urlxuan() {
      this.urlvisits = []
      // this.url = []
      // this.zhexuan()

      let discoverCountVo = {
        address: '中国四川省成都市' + this.mapName,
        endTime: this.whiteSearchList1.endCreateTime1,
        startTime: this.whiteSearchList1.startCreateTime1,
      }
      const { data: res } = await this.$http.post(
        '/discover/countUrlByAddress',
        discoverCountVo
      )
      //  console.log(res,'右侧1');
      if (res.code == 200) {
        // console.log(res.data);
        if (res.data.length > 0) {
          // let urlright1 = []
          // let urlvisitsright1 = []
          // res.data.forEach((item) => {
          //   urlvisitsright1.push(item.urlvisits)

          //   urlright1.push(item.url)
          // })
         
          // this.urlvisits = urlvisitsright1
              // this.url = urlright1
          this.urlvisits=res.data.map((item)=>{
            return {
              name:item.url,
              name_num:item.urlvisits,
            }
          })
      
      

          // if (this.$refs.chart1) {
          //   this.drawLine1()
          // }
          // <span style="font-size:16px;color:#fff;margin-left:10px;margin-top:10px;">域名访问次数排名</span><span style="margin-top:10px;margin-left:15px;font-size:12px;color:#fff">DOMAIN NAME FREQUENCY</span>
           var html = `<span class="echarts-nodate" style="color:#fff;margin-left:10px;display:none">暂无数据</span>`
          document.getElementById('bar_qx1').innerHTML = html
          document
            .getElementById('bar_qx1')
            .removeAttribute('_echarts_instance_')
      } else {
          var html = `<span class="echarts-nodate" style="color:#fff;margin-left:10px;">暂无数据</span>`
          document.getElementById('bar_qx1').innerHTML = html
          document
            .getElementById('bar_qx1')
            .removeAttribute('_echarts_instance_')

          return
        }
      }
    },
    async zhexuan() {
      this.disDate = []
      this.disvisits = []
      this.mapquan()
      let discoverCountVo = {
        address: '中国四川省成都市' + this.mapName,
        endTime: this.whiteSearchList2.endCreateTime2,
        startTime: this.whiteSearchList2.startCreateTime2,
      }
      const { data: res } = await this.$http.post(
        '/discover/sumVisitsByAddress',
        discoverCountVo
      )
      //  console.log(res,'夏侧1');
      if (res.code == 200) {
        if (res.data.length > 0) {
          let disDatebottom1 = []
          let disvisitsbottom1 = []
          res.data.forEach((item) => {
            disDatebottom1.push(item.disDate)
            disvisitsbottom1.push(item.disvisits)
          })
          this.disDate = disDatebottom1
          this.disvisits = disvisitsbottom1
          this.loading = false

          if (this.$refs.chart2) {
            this.drawLine2()
          }
        } else {
          // <span style="font-size:16px;color:#fff;margin-left:10px;margin-top:10px">访问量历史变化趋势</span><span style="margin-top:10px;margin-left:15px;color:#fff;font-size:12px">   HISTORICAL CHANGE TREND OF VISITORS</span>
          var html = `<br/><span class="echarts-nodate" style="margin-left:10px;color:#fff">暂无数据</span>`
          document.getElementById('bar_qx2').innerHTML = html
          document
            .getElementById('bar_qx2')
            .removeAttribute('_echarts_instance_')
          return
        }
      }
    },
    //统计全部地区地图显示
    async mapquan() {
      this.dataDi = [
        { name: '锦江区', value: 0 },
        { name: '青羊区', value: 0 },
        { name: '金牛区', value: 0 },
        { name: '武侯区', value: 0 },
        { name: '成华区', value: 0 },
        { name: '龙泉驿区', value: 0 },
        { name: '青白江区', value: 0 },
        { name: '新都区', value: 0 },
        { name: '温江区', value: 0 },
        { name: '双流区', value: 0 },
        { name: '郫都区', value: 0 },
        { name: '金堂县', value: 0 },
        { name: '大邑县', value: 0 },
        { name: '蒲江县', value: 0 },
        { name: '新津县', value: 0 },
        { name: '都江堰市', value: 0 },
        { name: '彭州市', value: 0 },
        { name: '邛崃市', value: 0 },
        { name: '崇州市', value: 0 },
        { name: '简阳市', value: 0 },
        { name: '东部新区', value: 0 },
        { name: '天府新区', value: 0 },
        { name: '高新西区', value: 0 },
        { name: '高新南区', value: 0 },
      ]
      let discoverCountVo = {
        address: '',
        endTime: this.whiteSearchList1.endCreateTime1,
        startTime: this.whiteSearchList1.startCreateTime1,
      }
      const { data: res } = await this.$http.post(
        '/discover/countAddressByDate',
        discoverCountVo
      )
      // console.log(res,'地图');
      if (res.code == 200) {
        // console.log(res.data);
        if (res.data.length > 0) {
          var newarr = res.data
          // = res.data.map((item) => {
          //   return {
          //     name: item.address,
          //     value: item.visits,
          //   };
          // });

          newarr.forEach((element) => {
            element.name = (element.name || '').split('成都市')[1]
          })
          this.xinarr = newarr

          for (var i = 0; i < this.dataDi.length; i++) {
            for (var j = 0; j < newarr.length; j++) {
              if (this.dataDi[i].name == newarr[j].name) {
                this.dataDi[i].value = newarr[j].value
              }
            }
          }
          // console.log(this.dataDi)
          let max = this.dataDi.sort((a, b) => {
            return b.value - a.value
          })
          // console.log(max)
      //  this.max=300
           this.max=max[0]['value']
      
           console.log(this.max);

          // this.max = max[0] ? max[0]['value'] : 0

          setTimeout(() => {
            if (this.$refs.chartmap) {
              this.mineMap()
            }
          }, 500)
        } else {
          // this.$message("地图访问量无数据");
          this.max = 0
          if (this.$refs.chartmap) {
            this.mineMap()
          }
          this.loading = false
        }
        // console.log(res.data);
        // this.loading=false
      }
    },
    // 里面地图
    //  async limap(){
    //      let discoverCountVo = {
    //         address: "中国四川省成都市" + this.mapName,
    //         endTime: this.whiteSearchList1.endCreateTime1,
    //         startTime: this.whiteSearchList1.startCreateTime1,
    //       };
    //     const{data:res}=await this.$http.post('/discover/countAddressByAddress',discoverCountVo)
    //     if(res.code==200){
    //       console.log(res.data);
    //     }
    //   },

    // ++++++++++++++++++++++++++++++++++新
    async zuo_countUrlVsByIp(val) {
      const list = {
        address: '',
        endTime: this.whiteSearchList1.endCreateTime1,
        startTime: this.whiteSearchList1.startCreateTime1,
        ip: val,
        url: '',
      }
      const { data: res } = await this.$http.post(
        '/discover/countUrlVsByIp',
        list
      )
      if (res.code == 200) {
        this.dialogVisibleip = true
        this.urliplistData = res.data

        this.loading2 = false
      }
    },
    //区县IP
    async right_ipcountUrlVsByUrl(val) {
      const list = {
        address: '',
        endTime: this.whiteSearchList1.endCreateTime1,
        startTime: this.whiteSearchList1.startCreateTime1,
        ip: '',
        url: val,
      }
      const { data: res } = await this.$http.post(
        '/discover/countIpVsByUrl',
        list
      )
      if (res.code == 200) {
        this.urlqxlistData = res.data

        //  this.loading2=false
      }
    },

    //成都IP数排名
    // newdrawLine() {
    //   // eslint-disable-next-line camelcase
    //   var bar_qx = this.$refs.chartnewip
    //   let myChart1 = this.$echarts.init(bar_qx)

    //   myChart1.setOption(this.newsetOption1())
    //   window.addEventListener('resize', function () {
    //     myChart1.resize()
    //   })
    //   myChart1.off('click')
    //   myChart1.getZr().on('click', (params) => {
    //     let pointInPixel = [params.offsetX, params.offsetY]
    //     if (myChart1.containPixel('grid', pointInPixel)) {
    //       let pointInGrid = myChart1.convertFromPixel(
    //         {
    //           seriesIndex: 0,
    //         },
    //         pointInPixel
    //       )

    //       let xIndex = pointInGrid[1] //索引

    //       let handleIndex = Number(xIndex)
    //       // let seriesObj = myChart.getOption(); //图表object对象
    //       var op = myChart1.getOption()
    //       //获得图表中点击的列
    //       // var month = op.yAxis[0].data[handleIndex];  //获取点击的列名
    //       this.newURl = op.yAxis[0].data[handleIndex]
    //       this.loading2 = true

    //       this.zuo_countUrlVsByIp(this.newURl)
    //     }
    //   })
    // },
    // newsetOption1() {
    //   var bg = `image://${require('../assets/img/taishiimg/线.png')}`
    //   var bar = `image://${require('../assets/img/taishiimg/左.png')}`
    //   var data = this.newleftnum
    //   var name = this.newleftip
    //   var barWidth = 10
    //   var maxNum = 1000
    //   for (var i = 0; i < data.length; i++) {
    //     if (data[i] > maxNum) {
    //       maxNum = data[i]
    //     }
    //   }

    //   let option = {
    //     backgroundColor: 'transparent',
    //     title: [
    //       {
    //         text: '成都IP数排名',
    //         //
    //         textStyle: {
    //           align: 'left',
    //           color: '#fff',
    //           fontSize: 16,
    //           fontWeight: 'lighter',
    //         },
    //         top: '1%',
    //         left: '3%',
    //       },
    //       {
    //         text: ' IP RANKING',
    //         //
    //         textStyle: {
    //           align: 'left',
    //           color: '#fff',
    //           fontSize: 12,
    //           fontWeight: 'lighter',
    //         },
    //         top: '1.5%',
    //         left: '32%',
    //       },
    //     ],
    //     grid: {
    //       top: '8%',
    //       left: '15%',
    //       right: '15%',
    //       bottom: '0%',
    //     },
    //     tooltip: {
    //       trigger: 'axis',
    //       axisPointer: {
    //         type: 'shadow',
    //       },
    //       formatter: function (params) {
    //         // console.log(val)
    //         return params[0].name
    //       },
    //     },
    //     xAxis: {
    //       show: false,
    //     },
    //     yAxis: {
    //       inverse: true,
    //       data: name,
    //       splitLine: {
    //         show: false,
    //       },
    //       axisLabel: {
    //         textStyle: { fontSize: '12', color: '#fff' },
    //         formatter: function (value, index) {
    //           // 10 6 这些你自定义就行
    //           // console.log(value);
    //           var v = value.substring(0, 5) + '...'
    //           // console.log(v);
    //           return value.length > 6 ? v : value
    //         },
    //       },
    //       axisLine: {
    //         show: false,
    //       },
    //       axisTick: false,
    //     },
    //     series: [
    //       {
    //         type: 'pictorialBar',
    //         barWidth: barWidth,
    //         zlevel: 2,
    //         data: data.map(function (item) {
    //           return {
    //             value: item,
    //             symbol: bar,
    //           }
    //         }),
    //       },
    //       {
    //         type: 'pictorialBar',
    //         barWidth: barWidth,
    //         data: data.map(function (item) {
    //           return {
    //             realValue: item,
    //             value: maxNum,
    //             symbol: bg,
    //           }
    //         }),
    //         label: {
    //           show: true,
    //           position: 'right',
    //           distance: 50,
    //           align: 'right',
    //           formatter: function (params) {
    //             return params.data.realValue
    //           },
    //           color: '#fff',
    //           fontSize: 12,
    //         },
    //       },
    //     ],
    //   }
    //   return option
    // },
    //成都URL
    async right_countUrlVsByUrl(val) {
      this.newIpone = val
      this.iplistData = []
      this.urlqxlistData = []
      const list = {
        address: '',
        endTime: this.whiteSearchList1.endCreateTime1,
        startTime: this.whiteSearchList1.startCreateTime1,
        ip: '',
        url: val,
      }
      const { data: res } = await this.$http.post(
        '/discover/countAddressVsByUrl',
        list
      )
      if (res.code == 200) {
        this.dialogVisibleurl = true
        this.activeName = 'first'

        this.iplistData = res.data

        //  this.loading2=false
      }
    },

    // newdrawLine1() {
    //   // eslint-disable-next-line camelcase
    //   var bar_qx = this.$refs.chartnewip1
    //   let myChart3 = this.$echarts.init(bar_qx)
    //   myChart3.setOption(this.newsetOption2())
    //   window.addEventListener('resize', function () {
    //     myChart3.resize()
    //   })
    //   myChart3.off('click')
    //   myChart3.getZr().on('click', (params) => {
    //     let pointInPixel = [params.offsetX, params.offsetY]
    //     if (myChart3.containPixel('grid', pointInPixel)) {
    //       let pointInGrid = myChart3.convertFromPixel(
    //         {
    //           seriesIndex: 0,
    //         },
    //         pointInPixel
    //       )

    //       let xIndex = pointInGrid[1] //索引

    //       let handleIndex = Number(xIndex)
    //       //图表object对象
    //       var op = myChart3.getOption()
    //       //获得图表中点击的列
    //       //获取点击的列名
    //       this.newIpone = op.yAxis[0].data[handleIndex]

    //     }
    //   })
    // },
    // newsetOption2() {
    //   var bg = `image://${require('../assets/img/taishiimg/线.png')}`

    //   var bar = `image://${require('../assets/img/taishiimg/右.png')}`
    //   var data = this.newleftnum1
    //   var name = this.newleftip1
    //   var barWidth = 10
    //   var maxNum = 1000
    //   for (var i = 0; i < data.length; i++) {
    //     if (data[i] > maxNum) {
    //       maxNum = data[i]
    //     }
    //   }

    //   let option = {
    //     backgroundColor: 'transparent',
    //     title: [
    //       {
    //         text: '成都URL排名',
    //         //
    //         textStyle: {
    //           align: 'left',
    //           color: '#fff',
    //           fontSize: 16,
    //           fontWeight: 'lighter',
    //         },
    //         top: '1%',
    //         left: '3%',
    //       },
    //       {
    //         text: '  DOMAIN NAME URL',
    //         //
    //         textStyle: {
    //           align: 'left',
    //           color: '#fff',
    //           fontSize: 12,
    //           fontWeight: 'lighter',
    //         },
    //         top: '1.5%',
    //         left: '32%',
    //       },
    //     ],
    //     grid: {
    //       top: '8%',
    //       left: '15%',
    //       right: '15%',
    //       bottom: '0%',
    //     },
    //     tooltip: {
    //       trigger: 'axis',
    //       axisPointer: {
    //         type: 'shadow',
    //       },
    //       formatter: function (params) {
    //         //   console.log(val)
    //         return params[0].name
    //         // console.log(params);
    //       },
    //     },
    //     xAxis: {
    //       show: false,
    //     },
    //     yAxis: {
    //       inverse: true,
    //       data: name,
    //       splitLine: {
    //         show: false,
    //       },
    //       axisLabel: {
    //         textStyle: { fontSize: '12', color: '#fff' },
    //         formatter: function (value, index) {
    //           // 10 6 这些你自定义就行
    //           // console.log(value);
    //           var v = value.substring(0, 5) + '...'
    //           // console.log(v);
    //           return value.length > 6 ? v : value
    //         },
    //       },
    //       axisLine: {
    //         show: false,
    //       },
    //       axisTick: false,
    //     },
    //     series: [
    //       {
    //         type: 'pictorialBar',
    //         barWidth: barWidth,
    //         zlevel: 2,
    //         data: data.map(function (item) {
    //           return {
    //             value: item,
    //             symbol: bar,
    //           }
    //         }),
    //       },
    //       {
    //         type: 'pictorialBar',
    //         barWidth: barWidth,
    //         data: data.map(function (item) {
    //           return {
    //             realValue: item,
    //             value: maxNum,
    //             symbol: bg,
    //           }
    //         }),
    //         label: {
    //           show: true,
    //           position: 'right',
    //           distance: 50,
    //           align: 'right',
    //           formatter: function (params) {
    //             return params.data.realValue
    //           },
    //           color: '#fff',
    //           fontSize: 12,
    //         },
    //       },
    //     ],
    //   }
    //   return option
    // },
    // ++++++++++++++++++++++++++++++++++++
    //左侧柱状
    // 源IP访问次数排名
    drawLine() {
      // eslint-disable-next-line camelcase
      var bar_qx = this.$refs.chart
      let myChart7 = this.$echarts.init(bar_qx)
      myChart7.setOption(this.setOption())

      window.addEventListener('resize', () => {
        myChart7.resize()
      })
    },
    setOption() {
      // var bg = this.bg;
      // var bar = this.bar;
      // var data = this.data;
      // var barWidth = this.barWidth;
      // var maxNum = this.maxNum;
      var bg = `image://${require('../assets/img/taishiimg/线.png')}`

      var bar = `image://${require('../assets/img/taishiimg/左.png')}`
      var data = this.visits
      var name = this.sourceip
      var barWidth = 10
      var maxNum = 0
      for (var i = 0; i < data.length; i++) {
        if (data[i] > maxNum) {
          maxNum = data[i]
        }
      }

      let option = {
        backgroundColor: 'transparent',

        grid: {
          top: '0%',
          left: '25%',
          right: '15%',
          bottom: '0%',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          formatter: function (params) {
            //   console.log(val)
            return params[0].name
          },
        },
        xAxis: {
          show: false,
        },
        yAxis: {
          inverse: true,
          data: name,
          splitLine: {
            show: false,
          },
          axisLabel: {
            textStyle: { fontSize: '12', color: '#fff' },
            formatter: function (value, index) {
              // 10 6 这些你自定义就行
              // console.log(value);
              var c = value.substring(0, 10) + '...'
              // // console.log(v);
              return value.length > 10 ? c : value
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: false,
        },
        series: [
          {
            type: 'pictorialBar',
            barWidth: barWidth,
            zlevel: 2,
            data: data.map(function (item) {
              return {
                value: item,
                symbol: bar,
              }
            }),
          },
          {
            type: 'pictorialBar',
            barWidth: barWidth,
            data: data.map(function (item) {
              return {
                realValue: item,
                value: maxNum,
                symbol: bg,
              }
            }),
            label: {
              show: true,
              position: 'right',
              distance: 50,
              align: 'right',
              formatter: function (params) {
                return params.data.realValue
              },
              color: '#59d0f4',
              fontWeight: '700',
              fontSize: 12,
            },
          },
        ],
      }
      return option
    },
    //左侧柱状
    // setOption() {
    //   let option = {
    //     title: {
    //       text: "源IP访问次数排名",
    //       padding: [20, 20, 100, 100],
    //       textStyle: {
    //         //xin
    //         fontSize: 18,
    //         color: "#fff", //xin
    //       },
    //     },
    //     tooltip: {
    //       trigger: "axis",
    //       axisPointer: {
    //         type: "shadow",
    //       },
    //     },
    //     legend: {
    //       show: false,
    //     },
    //     grid: {
    //       left: "21%",
    //       right: "7%",
    //       bottom: "5%",
    //       containLabel: false,
    //     },
    //     xAxis: {
    //       type: "value",
    //       boundaryGap: [0, 0.01],
    //       axisLine: {
    //         lineStyle: {
    //           color: "#fff",
    //           width: 1,
    //         },
    //       },
    //       //不显示网格线
    //       splitLine: {
    //         show: false,
    //       },
    //       //         min: 0, // 刻度最小值
    //       // max: 999, // 刻度最大值（需要动态获取最大值,并且能被3整除（向下取整再乘回来））
    //       splitNumber: 3, // 横线数
    //       // interval: 200, // 刻度间隔
    //     },
    //     yAxis: {
    //       type: "category",
    //       data: this.sourceip,
    //       axisLine: {
    //         lineStyle: {
    //           color: "#fff",
    //           width: 1,
    //         },
    //       },
    //       splitLine: {
    //         show: false,
    //       },
    //       axisLabel: {
    //         formatter: function (value, index) {
    //           // 10 6 这些你自定义就行
    //           // console.log(value);
    //           var c = value.substring(0, 10) + "...";
    //           // // console.log(v);
    //           return value.length > 10 ? c : value;
    //         },
    //       },
    //     },
    //     series: [
    //       {
    //         name: "源IP",
    //         type: "bar",
    //         barWidth: 10,
    //         color: "#03A9F4",
    //         data: this.visits,
    //       },
    //     ],
    //   };
    //   return option;
    // },

    //左侧柱状----成都左侧（源IP访问排名）
    drawLinequ() {
      // eslint-disable-next-line camelcase
      var bar_qx = this.$refs.chartqu
      let myChart = this.$echarts.init(bar_qx)
      myChart.clear()
      myChart.setOption(this.setOptionqu())
      window.addEventListener('resize', function () {
        myChart.resize()
      })
      
    },

    setOptionqu() {
      var bg = `image://${require('../assets/img/taishiimg/线.png')}`
      var bar1 = `image://${require('../assets/img/taishiimg/红-数据条.png')}`
      var bar2 = `image://${require('../assets/img/taishiimg/黄-数据条.png')}`
      var bar3 = `image://${require('../assets/img/taishiimg/紫-数据条.png')}`
      var bar = `image://${require('../assets/img/taishiimg/左.png')}`
      var data = this.visits1
      var name = this.sourceip1
  
      var barWidth = 10
      var maxNum = 950
      for (var i = 0; i < data.length; i++) {
        if (data[i] > maxNum) {
          maxNum = data[i]
        }
      }

      let option = {
        backgroundColor: 'transparent',

        grid: {
          top: '1%',
          left: '20%',
          right: '15%',
          bottom: '2%',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          formatter: function (params) {
            //   console.log(val)
            return params.name
          },
        },
        xAxis: {
          show: false,
        },
        yAxis: {
          inverse: true,
          data: name,
          splitLine: {
            show: false,
          },
          axisLabel: {
            textStyle: { fontSize: '10', color: '#fff' },
            formatter: function (value, index) {
              //         // 10 6 这些你自定义就行
              //         // console.log(value);
              var c = value.substring(8)
              //         // // console.log(v);
              return value.length > 8 ? c : value
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: false,
        },
        series: [
          {
            type: 'pictorialBar',
            barWidth: barWidth,

            zlevel: 2,
            data: data.map(function (item, index) {
              return {
                value: item,
                symbol:
                  index == 0
                    ? bar1
                    : index == 1
                    ? bar2
                    : index == 2
                    ? bar3
                    : bar,
              }
            }),
          },
          {
            type: 'pictorialBar',
            barWidth: barWidth,
            data: data.map(function (item) {
              return {
                realValue: item,
                value: maxNum,
                symbol: bg,
              }
            }),
            label: {
              show: true,
              position: 'right',
              distance: 50,
              align: 'right',
              // formatter: function (params) {
              //   return params.data.realValue
              // },
              //title数字
              // color: '#fff',
              fontSize: 10,
              formatter: function (params) {
                if (params.dataIndex == 0) {
                  return '{one|' + params.data.realValue + '}'
                } else if (params.dataIndex == 1) {
                  return '{two|' + params.data.realValue + '}'
                } else if (params.dataIndex == 2) {
                  return '{three|' + params.data.realValue + '}'
                } else {
                  return '{four|' + params.data.realValue + '}'
                }
              },
              rich: {
                one: {
                  // align: 'center',
                  color: '#fe7b72',
                  fontWeight: '700',
                },
                two: {
                  // align: 'center',
                  color: '#d6b45a',
                  fontWeight: '700',
                },
                three: {
                  // align: 'center',
                  color: '#2e81ca',
                  fontWeight: '700',
                },
                four: {
                  // align: 'center',
                  color: '#59d0f4',
                  fontWeight: '700',
                },
              },
            },
          },
        ],
      }
      return option
    },
    // ++++++++++++++++++++++++++++++++++++++++++++++++
    //右侧柱状
    // 域名访问次数排名
    drawLine1() {
      // eslint-disable-next-line camelcase
      var bar_qx = this.$refs.chart1
      let myChart8 = this.$echarts.init(bar_qx)
      myChart8.setOption(this.setOption1())
      window.addEventListener('resize', () => {
        myChart8.resize()
      })
    },
    setOption1() {
      // var bg = this.bg;
      // var bar = this.bar;
      // var data = this.data;
      // var barWidth = this.barWidth;
      // var maxNum = this.maxNum;
      var bg = `image://${require('../assets/img/taishiimg/线.png')}`

      var bar = `image://${require('../assets/img/taishiimg/右.png')}`
      var data = this.urlvisits
      var name = this.url
      var barWidth = 10
      var maxNum = 0
      for (var i = 0; i < data.length; i++) {
        if (data[i] > maxNum) {
          maxNum = data[i]
        }
      }

      let option = {
        backgroundColor: 'transparent',
        // title: [
        //   {
        //     text: '域名访问次数排名',
        //     //
        //     textStyle: {
        //       align: 'left',
        //       color: '#fff',
        //       fontSize: 16,
        //       fontWeight: 'lighter',
        //     },
        //     top: '3%',
        //     left: '3%',
        //   },
        //   {
        //     text: '  DOMAIN NAME FREQUENCY',
        //     //
        //     textStyle: {
        //       align: 'left',
        //       color: '#fff',
        //       fontSize: 12,
        //       fontWeight: 'lighter',
        //     },
        //     top: '3.5%',
        //     left: '37%',
        //   },
        // ],
        grid: {
          top: '0%',
          left: '30%',
          right: '15%',
          bottom: '0%',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          formatter: function (params) {
            //   console.log(val)
            return params[0].name
          },
        },
        xAxis: {
          show: false,
        },
        yAxis: {
          inverse: true,
          data: name,
          splitLine: {
            show: false,
          },
          axisLabel: {
            textStyle: { fontSize: '12', color: '#fff' },
            formatter: function (value, index) {
              // 10 6 这些你自定义就行
              // console.log(value);
              var v = value.substring(0, 14) + '...'
              // console.log(v);
              return value.length > 14 ? v : value
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: false,
        },
        series: [
          {
            type: 'pictorialBar',
            barWidth: barWidth,
            zlevel: 2,
            data: data.map(function (item) {
              return {
                value: item,
                symbol: bar,
              }
            }),
          },
          {
            type: 'pictorialBar',
            barWidth: barWidth,
            data: data.map(function (item) {
              return {
                realValue: item,
                value: maxNum,
                symbol: bg,
              }
            }),
            label: {
              show: true,
              position: 'right',
              distance: 50,
              align: 'right',
              formatter: function (params) {
                return params.data.realValue
              },
              color: '#59d0f4',
              fontWeight: '700',
              fontSize: 12,
            },
          },
        ],
      }
      return option
    },
    // setOption1() {
    //   let option = {
    //     title: {
    //       text: "域名访问次数排名",
    //       padding: [20, 20, 100, 100],
    //       textStyle: {
    //         //xin
    //         fontSize: 18,
    //         color: "#fff", //xin
    //       },
    //     },
    //     tooltip: {
    //       trigger: "axis",
    //       axisPointer: {
    //         type: "shadow",
    //       },
    //     },
    //     legend: {
    //       show: false,
    //     },
    //     grid: {
    //       left: "26%",
    //       right: "10%",
    //       bottom: "5%",
    //       // containLabel: true,
    //     },
    //     xAxis: {
    //       type: "value",
    //       boundaryGap: [0, 0.01],
    //       axisLine: {
    //         lineStyle: {
    //           color: "#fff",
    //           width: 1,
    //         },
    //       },
    //       splitNumber: 3, // 横线数
    //       //不显示网格线
    //       splitLine: {
    //         show: false,
    //       },
    //       axisTick: {
    //         alignWithLabel: true,
    //       },
    //     },

    //     yAxis: {
    //       type: "category",
    //       data: this.url,
    //       axisLine: {
    //         lineStyle: {
    //           color: "#fff",
    //           width: 1,
    //         },
    //       },
    //       splitLine: {
    //         show: false,
    //       },
    //       axisLabel: {
    //         formatter: function (value, index) {
    //           // 10 6 这些你自定义就行
    //           // console.log(value);
    //           var v = value.substring(0, 14) + "...";
    //           // console.log(v);
    //           return value.length > 14 ? v : value;
    //         },
    //       },
    //     },
    //     series: [
    //       {
    //         name: "次数",
    //         type: "bar",
    //         barWidth: 10,
    //         color: "#03A9F4",
    //         data: this.urlvisits,
    //       },
    //     ],
    //   };
    //   return option;
    // },
    //右侧成都----区柱状图
    //  <!-- 域名访问排名——echarts -->
    drawLinequ1() {
      // eslint-disable-next-line camelcase
      var bar_qx = this.$refs.chartqu1
      let myChart2 = this.$echarts.init(bar_qx)
           myChart2.clear()
      myChart2.setOption(this.setOptionqu1())
    
      window.addEventListener('resize', function () {
        myChart2.resize()
      })
    },
    setOptionqu1() {
      // var bg = this.bg;
      // var bar = this.bar;
      // var data = this.data;
      // var barWidth = this.barWidth;
      // var maxNum = this.maxNum;
      var bg = `image://${require('../assets/img/taishiimg/线.png')}`
      var bar1 = `image://${require('../assets/img/taishiimg/红-数据条.png')}`
      var bar2 = `image://${require('../assets/img/taishiimg/黄-数据条.png')}`
      var bar3 = `image://${require('../assets/img/taishiimg/紫-数据条.png')}`
      var bar = `image://${require('../assets/img/taishiimg/右.png')}`
      var data = this.visits2
      var name = this.sourceip2
      var barWidth = 10
      var maxNum = 900
      for (var i = 0; i < data.length; i++) {
        if (data[i] > maxNum) {
          maxNum = data[i]
        }
      }

      let option = {
        backgroundColor: 'transparent',

        grid: {
          top: '1%',
          left: '20%',
          right: '15%',
          bottom: '2%',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          formatter: function (params) {
            //   console.log(val)
            return params.name
          },
        },
        xAxis: {
          show: false,
        },
        yAxis: {
          inverse: true,
          data: name,
          splitLine: {
            show: false,
          },
          axisLabel: {
            textStyle: { fontSize: '10', color: '#fff' },
            formatter: function (value, index) {
              //         // 10 6 这些你自定义就行
              //         // console.log(value);
              var c = value.substring(8)
              //         // // console.log(v);
              return value.length > 8 ? c : value
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: false,
        },
        series: [
          {
            type: 'pictorialBar',
            barWidth: barWidth,
            zlevel: 2,
            data: data.map(function (item, index) {
              return {
                value: item,
                symbol:
                  index == 0
                    ? bar1
                    : index == 1
                    ? bar2
                    : index == 2
                    ? bar3
                    : bar,
              }
            }),
          },
          {
            type: 'pictorialBar',
            barWidth: barWidth,
            data: data.map(function (item) {
              return {
                realValue: item,
                value: maxNum,
                symbol: bg,
              }
            }),
            label: {
              show: true,
              position: 'right',
              distance: 50,
              align: 'right',
              fontSize: 10,
              formatter: function (params) {
                if (params.dataIndex == 0) {
                  return '{one|' + params.data.realValue + '}'
                } else if (params.dataIndex == 1) {
                  return '{two|' + params.data.realValue + '}'
                } else if (params.dataIndex == 2) {
                  return '{three|' + params.data.realValue + '}'
                } else {
                  return '{four|' + params.data.realValue + '}'
                }
              },
              rich: {
                one: {
                  // align: 'center',
                  color: '#fe7b72',
                  fontWeight: '700',
                },
                two: {
                  // align: 'center',
                  color: '#d6b45a',
                  fontWeight: '700',
                },
                three: {
                  // align: 'center',
                  color: '#2e81ca',
                  fontWeight: '700',
                },
                four: {
                  // align: 'center',
                  color: '#59d0f4',
                  fontWeight: '700',
                },
              },
            },
          },
        ],
      }
      return option
    },
    // setOptionqu1() {
    //   let option = {
    //     title: {
    //       text: "域名访问排名",
    //       padding: [20, 20, 100, 100],
    //       textStyle: {
    //         //xin
    //         fontSize: 18,
    //         color: "#fff", //xin
    //       },
    //     },
    //     tooltip: {
    //       trigger: "axis",
    //       axisPointer: {
    //         type: "shadow",
    //       },
    //     },
    //     legend: {
    //       show: false,
    //     },
    //     grid: {
    //       left: "20%",
    //       right: "10%",
    //       bottom: "6%",
    //       // containLabel: true,
    //     },
    //     xAxis: {
    //       type: "value",
    //       boundaryGap: [0, 0.01],
    //       axisLine: {
    //         lineStyle: {
    //           color: "#fff",
    //           width: 1,
    //         },
    //       },
    //       splitNumber: 4, // 横线数
    //       //不显示网格线
    //       splitLine: {
    //         show: false,
    //       },
    //       axisTick: {
    //         alignWithLabel: true,
    //       },
    //     },

    //     yAxis: {
    //       type: "category",
    //       data: this.sourceip2,
    //       axisLine: {
    //         lineStyle: {
    //           color: "#fff",
    //           width: 1,
    //         },
    //       },
    //       splitLine: {
    //         show: false,
    //       },
    //       axisLabel: {
    //         formatter: function (value, index) {
    //           // 10 6 这些你自定义就行
    //           // console.log(value);
    //           var c = value.substring(8);
    //           // // console.log(v);
    //           return value.length > 8 ? c : value;
    //         },
    //       },
    //       // axisLabel: {
    //       //   formatter: function (value, index) {
    //       //     // 10 6 这些你自定义就行
    //       //     // console.log(value);
    //       //     var v = value.substring(0, 14) + "...";
    //       //     // console.log(v);
    //       //     return value.length > 14 ? v : value;
    //       //   },
    //       // },
    //     },
    //     series: [
    //       {
    //         name: "次数",
    //         type: "bar",
    //         barWidth: 10,
    //         color: "#03A9F4",
    //         data: this.visits2,
    //       },
    //     ],
    //   };
    //   return option;
    // },
    // ？？？？？？？？？？？？？？？？？？？？？？？？
    //下折线

    drawLine2() {
      // eslint-disable-next-line camelcase
      var bar_qx = this.$refs.chart2
      let myChart5 = this.$echarts.init(bar_qx)
      myChart5.setOption(this.setOption2())
      window.addEventListener('resize', function () {
        myChart5.resize()
      })
    },
    setOption2() {
      let option = {
        tooltip: {
          trigger: 'axis',
        },

        xAxis: {
          boundaryGap:false,
          type: 'category',
          axisTick: {
            show: false,
          },
          data: this.disDate,
          axisLine: {
            lineStyle: {
              color: '#818d9a',
              width: 1,
            },
          },
          axisLabel: {
            textStyle: {
              color: '#fff',
            },
          },
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          type: 'value',
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: '#818d9a',
              width: 1,
            },
          },

          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: ['rgb(112, 107, 107)'],
            },
          },
        },
        grid: {
          top: '15%',
          left: '5%',
          right: '3%',
          bottom: '30%',
        },
        series: [
          {
            smooth: true,
            name: '次数',
            data: this.disvisits,
            type: 'line',
            symbol: 'circle',
            symbolSize: 5,
            itemStyle: {
              normal: {
                color: '#0092f6',
                lineStyle: {
                  color: '#0092f6',
                  width: 1,
                },
                areaStyle: {
                  //color: '#94C9EC'
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: '#0092f6',
                    },
                    {
                      offset: 1,
                      color: '#071c2a',
                    },
                  ]),
                },
              },
            },
          },
        ],
      }
      return option
    },
    // ————————————————————————————————————————————————————————
    //中间地图
    mineMap() {
      var self = this
      var mapChart = this.$echarts.init(document.getElementById('myEcharts'))
      window.addEventListener('resize', function () {
        mapChart.resize()
      })

      let mapName = this.jxmap[this.cityName] + ''

      this.$echarts.registerMap(mapName, this.jxmap[this.cityName])

      var mapOption = {
        geo: [
          {
            show: true,
            zoom: 1,
            map: mapName,
            // center: [104.08, 30.71] ,
            silent: true,
            aspectScale: 0.75, //长宽比,默认0.75
            label: {
              normal: {
                show: false,
              },
              emphasis: {
                show: false,
              },
            },
            roam: false,
            itemStyle: {
              normal: {
                borderColor: '#2f4f7b', // 图形的描边颜色 #0AAEB0
                borderWidth: 3, // 描边线宽。
                borderType: 'solid', // 柱条的描边类型。
                areaColor: '#233F53', // 图形的颜色 #233F53

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

            layoutCenter: ['53%', '52%'], //右下

            layoutSize: '85%',
          },
        ],

        tooltip: {
          trigger: 'item',
          backgroundColor: '#fff',
          borderWidth: 1,
          // borderColor:",
          formatter: (params) =>
            // {
            // console.log(params);
            // }
            {
              return `
            <section style='width:130px;height:45px;color:#333333';>
              <div style='color:#333333;font-size: 12px;'>
                ${params.name}
              </div>
                 <div>
               <span style="font-size: 12px;color:#808080">${
                 params.seriesName
               }:</span>
                <span style="font-size: 16px;color: #4298F3;">${
                  isNaN(params.value) == true ? '0' : params.value
                }</span>
             </div>

            </section>`
            },
          axisPointer: {
            animation: false,
          },
        },
        //距离左右，上下距离的百分比

        // visualMap: {
        //   padding: [0, 0, 40, 20],
        //   textStyle: {
        //     color: 'white',
        //   },
        //   show: false,
        //   min: this.min,
        //   max: this.max,
        //   text: ['最高值', '最低值'],
        //   // realtime: true,
        //   calculable: true,
        //   align: 'auto',
        //   realtime: false,

        //   inRange: {
        //    color: ['#2d88eb', '#007aff', '#ff9119', '#d14759'],
        //   },
        // },
   visualMap: {
          type: 'piecewise', // 类型为分段型
          splitNumber: 4,
          show: false, //图注

          pieces: [
            // 自定义每一段的范围，以及每一段的文字
            { min: (this.max / 4) * 3, max: this.max, color: '#d14759' }, // 不指定 max，表示 max 为无限大（Infinity）。
            {
              min: (this.max / 4) * 2,
              max: (this.max / 4) * 3,
              color: '#ff9119',
            },
            {
              min: this.max / 4,
              max: (this.max / 4) * 2,
              color: '#007aff',
            },
            { min: 0, max: this.max / 4, color: '#2d88eb' },

            // 不指定 min，表示 min 为无限大（-Infinity）。
         
          ],
        },

        series: [
          {
            name: '访问量',
            type: 'map',
            data: this.dataDi,
            // map: this.mapData1,
            map: mapName,
            // center: [104.080989, 30.657689],
            // center: [104.103077,30.660275],
            componentType: 'geo',
            // symbolOffset: [0, "-50%"],
            roam: false,
            layoutSize: '85%', //大小

            layoutCenter: ['52%', '50%'],
            // data: this.dataDi,
            aspectScale: 0.75,
            zoom: 1,
            itemStyle: {
              normal: {
                borderColor: '#7dbbfd', // 图形的描边颜色 #0AAEB0
                borderWidth: 3, // 描边线宽。
                borderType: 'solid', // 柱条的描边类型。
                areaColor: '#233F53', // 图形的颜色 #233F53

                label: {
                  show: true,
                  color: '#fff',
                  formatter: function (data) {
                    var a = data.name
                    // var b = data.value;
                    // return a + "\n" + b;
                    return a
                  },
                },
              },
              emphasis: {
                borderColor: '#76e2ff', // 图形的描边颜色 #2378f7
                borderWidth: '3',
                areaColor: 'rgb(0,102,156)', // 阴影色 #233F53
                label: {
                  show: true,
                  color: '#fff',
                  formatter: function (data) {
                    var a = data.name
                    // var b = data.value;
                    // return a + "\n" + b;
                    return a
                  },
                },
              },
            },

            // data: this.dataDi,
          },
        ],
      }
      this.loading = false
      // console.log(mapOption);
      mapChart.setOption(mapOption)

      window.addEventListener('resize', function () {
        mapChart.resize()
      })
      mapChart.off('click')
      mapChart.on('click', function (params) {
        // console.log(params.name);
        let name = params.name
        self.handlerChange(name)
      })

      //去除默认的鼠标事件
      document.oncontextmenu = function () {
        return false
      }
      //新加上鼠标右击事件

      mapChart.on('contextmenu', function (params) {
        // console.log("我是右键");
        let name = params.name
        self.one(name)
      })
    },
    handlerChange(name) {
      this.newcity = false
      this.cityName = name
      // console.log( this.cityName);
      if (this.$refs.chartmap) {
        this.mineMap()
      }

      this.oldmaploading = true
      this.mapName = name
      // myChart.setOption(option);

      this.ipxuan()
      this.urlxuan()
      this.zhexuan()
    },
    one(name) {
      this.mapName1 = name

      this.fangwenl().unbind()
    },
    //-=-==--=-=-=--=-=--=-=--=-=-==---=-=-=-=--=-=-=-=-=-=-=-=-=-=
    handleClose(done) {
      this.mypageable1.pageNum1 = 1

      this.dialogTableVisible = false
    },
    // 时间
    dataCreate_change1(val) {
      if (val && val != '') {
        this.whiteSearchList1.startCreateTime1 = val[0]
        this.whiteSearchList1.endCreateTime1 = val[1]
      } else {
        this.whiteSearchList1.startCreateTime1 =
          dayjs().subtract(1, 'month').format('YYYY-MM-DD') +
          ' ' +
          '00:' +
          '00:' +
          '00'
        this.whiteSearchList1.endCreateTime1 =
          dayjs().format('YYYY-MM-DD') + ' ' + '23:' + '59:' + '59'
      }
    },
    //返回
    fanhui() {
      // if (this.routlist.query.citynames == undefined) {
      this.loading = true
      this.cityName = '成都市'
      if (this.$refs.chartmap) {
        this.mapquan()
      }

      this.newcity = true
      // this.leftip()
      this.righturlqu()
      this.leftipqu()
      this.newleft_ip()
      this.newright_ip()
      this.bottomline() //历史变化
      this.oldmaploading = false
      // } else {

      // }
    },
    fanhui1() {
      this.$router.push('/shouye')
    },
    xuanze() {
      if (this.newdomainSimpleVo.dateValue_find1 == '') {
        // this.$message('请输入选择日期')
      } else {
        this.whiteSearchList2.endCreateTime2 =
          this.whiteSearchList1.endCreateTime1
        this.whiteSearchList2.startCreateTime2 =
          this.whiteSearchList1.startCreateTime1

        if (this.cityName != '成都市') {
          this.ipxuan()
          this.urlxuan()
          this.zhexuan()
          this.mapquan()

          // this.mapquan1()
        } else {
        
          this.righturlqu() //域名访问排名
          this.leftipqu() //源IP访问排名
          this.newleft_ip() //成都IP排名
          this.newright_ip() //成都URL排名
          this.bottomline() //历史变化
          this.mapquan()

          // this.mapquan1()
        }
      }
    },
    chongzhi() {
      this.newdomainSimpleVo.dateValue_find1 = null
      this.whiteSearchList1.startCreateTime1 =
        dayjs().subtract(1, 'month').format('YYYY-MM-DD') +
        ' ' +
        '00:' +
        '00:' +
        '00'
      this.whiteSearchList1.endCreateTime1 =
        dayjs().format('YYYY-MM-DD') + ' ' + '23:' + '59:' + '59'
            this.whiteSearchList2.startCreateTime2 =
        dayjs().subtract(1, 'month').format('YYYY-MM-DD') +
        ' ' +
        '00:' +
        '00:' +
        '00'
      this.whiteSearchList2.endCreateTime2 =
        dayjs().format('YYYY-MM-DD') + ' ' + '23:' + '59:' + '59'
      // this.whiteSearchList2.startCreateTime2 =
      //   dayjs().subtract(14, 'day').format('YYYY-MM-DD') +
      //   ' ' +
      //   '00:' +
      //   '00:' +
      //   '00'
      // this.whiteSearchList2.endCreateTime2 =
      //   dayjs().format('YYYY-MM-DD') + ' ' + '23:' + '59:' + '59'

      // this.leftip();
      // this.leftipqu();
      // this.newleft_ip();
      // this.newright_ip();

      if (this.cityName == '成都市') {
        this.newcity = true
      
          this.mapquan()
     
        this.righturlqu()
        this.leftip()
        this.leftipqu()
        this.newleft_ip()
        this.newright_ip()
        this.bottomline()
      } else {
        this.urlxuan()
        this.ipxuan()
        this.zhexuan()
      }
      // this.mapquan()
      // this.mapquan1()
    },
    //访问量
    async fangwenl(val) {
      this.gridData = []
      this.loading1 = true
      this.dialogTableVisible = true
      let list = {
        mypageable: {
          pageNum: this.mypageable1.pageNum1,
          pageSize: this.mypageable1.pageSize1,
        },
        address: '中国四川省成都市' + this.mapName1,
        endDiscoverTime: this.whiteSearchList1.endCreateTime1,
        startDiscoverTime: this.whiteSearchList1.startCreateTime1,
      }
      const { data: res } = await this.$http.post('/discover/getRawData', list)
      if (res.code == 200) {
        this.loading1 = false
        this.gridData = res.data.content
        this.total1 = res.data.totalElements
        this.totalPages1 = res.data.totalPages
      }
    },
    async handleCurrentChange1(val) {
      this.gridData = []
      this.loading1 = true
      this.mypageable1.pageNum1 = val

      // console.log( this.mypageable.pageNum);
      // this.fangwenl();
      let list = {
        mypageable: {
          pageNum: this.mypageable1.pageNum1,
          pageSize: this.mypageable1.pageSize1,
        },
        address: '中国四川省成都市' + this.mapName1,
        endDiscoverTime: this.whiteSearchList1.endCreateTime1,
        startDiscoverTime: this.whiteSearchList1.startCreateTime1,
      }
      const { data: res } = await this.$http.post('/discover/getRawData', list)
      if (res.code == 200) {
        this.loading1 = false
        this.gridData = res.data.content
        this.total1 = res.data.totalElements
        this.totalPages1 = res.data.totalPages
      }
    },
    handleCloseip() {
      this.dialogVisibleip = false
    },
    handleCloseurl() {
      this.dialogVisibleurl = false
    },
    tabURl(val) {
      if (val.label == '区县IP排名') {
        // console.log(1);
        this.right_ipcountUrlVsByUrl(this.newIpone)
      } else if (val.label == '成都URL') {
        // console.log(2);
        this.right_countUrlVsByUrl(this.newIpone)
        // this.zuo_countUrlVsByIp(this.newURl);
      }
    },
  },
}
</script>

<style  scoped lang='less'>
@import '../common/font.css';
// 按钮hover
.right_main_under /deep/ .el-button-chaxun:focus,
.right_main_under /deep/ .el-button-chaxun:hover {
  background: url(../assets/img/shouye/查询按钮.png) no-repeat;
  background-size: 100% 100%;
}
.right_main_under /deep/ .el-button-chongzhi:focus,
.right_main_under /deep/ .el-button-chongzhi:hover {
  background: url(../assets/img/shouye/重置按钮.png) no-repeat;
  background-size: 100% 100%;
}
.right_main_under /deep/ .el-button-daochu:focus,
.right_main_under /deep/ .el-button-daochu:hover {
  background: url(../assets/img/shouye/下载按钮.png) no-repeat;
  background-size: 100% 100%;
}

.right_main_under {
  width: 100%;
  height: 100%;
  padding: 10px /* 10/16 */;
  // height: 100%;
  z-index: 999;
  box-sizing: border-box;
}
//弹窗列表
/deep/ .el-dialog__body {
  padding: 20px 20px 50px 20px;
}
.bottom1 {
  margin-top: 10px;
}
.Maptop {
  width: 100%;
  height: 5%;
  // background-color: #fff;
  // border: 1px solid red;
  // 导航挤下来
  margin-top: 10px;
  padding-left: 10%;
  box-sizing: border-box;
}
.Mapcenter {
  width: 100%;
  height: 80%;
  // background-color: #fff;
  // padding: 10px;
  padding: 10px 0;
  overflow: hidden;
  box-sizing: border-box;
  // margin-bottom: 10px;
}
.Mapbtom {
  // margin-top: 1%;
  width: 100%;
  height: 24%;
  // border: 2px solid #1b4254;
  box-sizing: border-box;
  // padding: 10px;
  // border: 1px solid red;
}
.leftmap {
  width: 26%;
  height: 100%;
  // height: 50%;   //源ip一半
  float: left;
  // border: 2px solid #1b4254;
  box-sizing: border-box;
  // border: 1px solid red;
}
.centermap {
  width: 48%;
  height: 100%;
  float: left;
  // border: 1px solid rgb(136, 132, 132);
}
.rightmap {
  width: 26%;
  height: 100%;
  // height: 50%;   //源ip一半
  // border: 2px solid #1b4254;
  box-sizing: border-box;
  float: left;
  // border: 1px solid red;
}
/deep/ .el-form-item__label {
  color: #a6c5d5;
}
/deep/ .right_main_under .el-input__inner {
  background-color: rgba(3, 38, 65, 0.1);
  // opacity: 0.9;
  border: 1px solid #a6c5d5;
}
/deep/ .el-range-editor--mini .el-range-input {
  background-color: rgba(3, 38, 65, 0.1);
}
/deep/ .el-date-editor .el-range-separator {
  color: #bbcde4;
}
/deep/ .el-date-editor .el-range-input {
  color: #bbcde4;
}
// .el-picker-panel__body {
//   background-color: rgba(3, 38, 65, 0.1);
// }
//  .right_main_under /deep/ .el-button--primary{
//   background-color: #265c89;
// }
//  .right_main_under /deep/ .el-button--primary:hover{
//    border: 1px solid #34779d;
//  }
.leftmapson {
  // width: 21.875rem /* 350/16 */;
  // height: 34.375rem /* 550/16 */;
  width: 100%;
  height: 100%;
}
.left_zhuzhuangip {
  width: 100%;
  height: 100%;
}
.left_zhuzhuangip1 {
  width: 100%;
  height: 100%;
}
.leftmapson1 {
  // width: 21.875rem /* 350/16 */;
  // height: 34.375rem /* 176/16 */ /* 550/16 */;
  width: 100%;
  height: 100%;
}
.leftmapson2 {
  // width: 100rem /* 1600/16 */ /* 350/16 */;

  // height: 10.9375rem /* 175/16 */;
  width: 100%;
  height: 100%;
}
.Mapcenter1 {
  position: relative;
  // width: 51.25rem /* 820/16 */;
  // height: 35.625rem /* 570/16 */ /* 570/16 */;
  width: 100%;
  height: 95%;
}
// .title{
//   margin: 0 auto;
//   width: 12.5rem /* 200/16 */;
//   height: 100%;
//   color: #fff;
//   font-size: 20px;
// }
.btn {
  position: absolute;
  right: 120px;
  bottom: 11%;
  z-index: 2;
  color: #3d9fe0;
  font-size: 18px;
  cursor: pointer;
  font-weight: 600;
}
.btn:hover {
  // position: absolute;
  // right: 110px;
  // bottom: 11%;
  z-index: 2;
  text-decoration: underline;
}
.btn1 {
  position: absolute;
  right: 30px;
  bottom: 11%;
  z-index: 2;
  color: #3d9fe0;
  font-size: 18px;
  cursor: pointer;
  font-weight: 600;
}
.btn1:hover {
  z-index: 3;
  text-decoration: underline;
}
.dialogInfo /deep/ .el-table__row {
  height: 40px !important;
  z-index: 666;
}
.right_main_under .pagePagination {
  margin-top: 0;
}
/deep/.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: transparent;
}
.el-table::before {
  height: 0px;
}
.el-table,
.el-table__expanded-cell {
  background-color: transparent;
}
/deep/ .el-tabs__item {
  color: white !important;
  text-align: center;
  // font-size: 1.125rem /* 18/16 */ !important;
}

/deep/ .is-active {
  color: #409eff !important;
}
.dialogInfo /deep/ .el-dialog {
  background: #021c2d url(../assets/img/shouye/背景框.png) no-repeat;
  background-size: 100% 100%;
  padding: 10px 10px 45px 10px;
  opacity: 0.85;
  box-sizing: border-box;
  .el-dialog__headerbtn {
    top: 7px !important;
    right: 8px !important;
    .el-dialog__close {
      color: #fff;
      font-size: 16px;
    }
  }
  .el-dialog__header {
    margin: 20px 20px 0px 20px;
    background: url(../assets/img/shouye/标题矩形.png) no-repeat;
    background-size: 100% 100%;
  }
  .el-dialog__title {
    color: #37b8f5;
  }
}
.left_yuantop {
  // background: url('../assets/newimg/newhome/标题装饰.png') no-repeat;
  background-size: 100% 100%;
  padding: 0 0 0 40px;
  box-sizing: border-box;
  position: relative;
}
.wenzi {
  position: absolute;
  width: 60%;
  height: 30px;
  top: 50%;
  transform: translateY(-55%);
  // letter-spacing: 2px;
  font-weight: 400;

  color: #fff;
  display: inline-block;
  line-height: 30px;
  //
}
.wenzi span {
  display: block;
  font-size: 14px;
  // -webkit-transform: scale(95%);
}
.wenzi1 {
  position: absolute;
  width: 60%;
  height: 30px;
  top: 50%;
  left: 3%;
  transform: translateY(-49%);
  // letter-spacing: 2px;
  font-weight: 400;

  color: #fff;
  display: inline-block;
  line-height: 30px;
  //
}
.wenzi1 span {
  display: block;
  font-size: 14px;
  // -webkit-transform: scale(90%);
}
.left_yuanIP {
  // background: url('../assets/newimg/newhome/框.png') no-repeat;
  background: url('../assets/img/taishi/数据边框.png') no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 47%;
  margin-bottom: 2px;
  // border: 2px solid #1b4254;
  position: relative;
}
.left_yuming {
  background: url('../assets/img/taishi/数据边框.png') no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 47%;
  margin-bottom: 2px;
  // border: 2px solid #1b4254;
  position: relative;
}
.left_cdIP {
  background: url('../assets/img/taishi/数据边框.png') no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 53%;
  margin-bottom: 2px;
  // border: 2px solid #1b4254;
  position: relative;
}

.left_cdURl {
  background: url('../assets/img/taishi/数据边框.png') no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 53%;
  margin-bottom: 2px;
  // border: 2px solid #1b4254;
  position: relative;
}
.bto_bh {
  background: url('../assets/img/taishiimg/成都趋势.png') no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  margin-bottom: 2px;
  // margin-bottom: 4%;
  // border: 2px solid #1b4254;
  position: relative;
}
.ziyuanIP {
  background: url('../assets/img/taishiimg/源IP访问次数名.png') no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  margin-bottom: 2px;
  // margin-bottom: 4%;
  // border: 2px solid #1b4254;
  position: relative;
}
.ziyumin {
  background: url('../assets/img/taishiimg/域名访问次数排名.png') no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  margin-bottom: 2px;
  // margin-bottom: 4%;
  // border: 2px solid #1b4254;
  position: relative;
}
.list_one {
  width: 100%;
  height: 20px;
  padding: 0% 2% 0 9%;
  box-sizing: border-box;
  // margin-top: 5px;
  line-height: 20px;
    position: absolute;
  top: 40%;
  transform: translateY(-50%);
}
.list_one1{
  width: 100%;
  height: 20px;
  padding: 0% 2% 0 9%;
  box-sizing: border-box;
  // margin-top: 1%;
  line-height: 20px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.list_bg {
  float: left;
  width: 8%;
  height: 100%;
  text-align: center;
  color: #fb7589;
  font-weight: 700;
}
.list_bg1 {
  float: left;
  width: 8%;
  height: 100%;
  text-align: center;
  color: #dbbb69;
  font-weight: 700;
}

.list_bg2 {
  float: left;
  width: 8%;
  height: 100%;
  text-align: center;
  color: #639cd7;
  font-weight: 700;
}
.list_bg3 {
  float: left;
  width: 8%;
  height: 100%;
  text-align: center;
  color: #00a0d3;
  font-weight: 700;
}

.list_img {
  float: left;
  width: 5%;
  height: 100%;
  background: url(../assets/img/taishiimg/装饰.png) 100% 100% no-repeat;
  background-size: cover;
  // background-position: 0 0;
  margin-left: 2%;
  // margin-top: -3px;
}
.list_title {
  margin-left: 1%;
  float: left;
  display: inline-block;
  width: 69%;
  height: 100%;
  color: #fff;
  letter-spacing: 2px;
  font-family: 'siyuanheitinormal1';
  font-size: 12px;
  cursor: pointer;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
}
.list_num {
  float: left;
  display: inline-block;
  width: 12%;
  height: 100%;
  text-align: right;
  color: #59d0f4;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 1px;
}
// /deep/ .el-picker-panel{
//   background:transparent !important;
// }
.right_main_under /deep/ .el-tabs--border-card {
  background-color: transparent;
  border: none !important;
}
.right_main_under /deep/ .el-tabs--border-card > .el-tabs__header {
  background-color: transparent;
  border: none;
}
//tab 切换
/deep/ .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  background-color: transparent;
  background: url(../assets/img/taishiimg/关联框1.png) 100% 100% no-repeat;
  background-size: contain;
  border: 1px solid transparent;

  color: #fff !important;
  box-sizing: border-box;
}
/deep/ .el-tabs__item {
  width: 114px;
  padding-top: 3px;
}
// 图列
.legend-box {
  height: 115px /* 115/16 */;
  position: absolute;
  bottom: 40px /* 20/16 */;
  left: 10px /* 10/16 */;
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
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(#da1222),
    color-stop(20%, #f4652a),
    to(#00c1e0)
  );
  background: linear-gradient(
    180deg,
    #d14d5e,
    #f43b22 35%,
    #1266bb 40%,
    #1682f7 50%,
    #2d88eb 75% #00c1e0
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
.yuanIP_num{
  display: flex;
   flex-flow: column;
   flex-wrap: nowrap;
   justify-content:space-around;

}
.yuanIP_numson{
  flex: 1;
  position: relative;
}
</style>