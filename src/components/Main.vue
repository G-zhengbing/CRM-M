<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" :theme="theme1" active-name="1">
          <div class="layout-logo">全品在线</div>
          <div class="layout-nav">
            <ul class="tabars">
              <li
                v-if="$store.state.cId.is_market != 'N'"
                @click="setActive(1)"
                :class="{active:tabNum == 1}"
              >CMS管理</li>
              <li @click="setActive(2)" :class="{active:tabNum == 2}">CRM管理</li>
              <li
                v-if="$store.state.cId.is_headmaster != 'N'"
                @click="setActive(3)"
                :class="{active:tabNum == 3}"
              >教务</li>
              <!-- <li @click="setActive(4)" :class="{active:tabNum == 4}">排课</li> -->
              <!-- <li
                v-if="$store.state.cId.is_headmaster != 'N'"
                @click="setActive(5)"
                :class="{active:tabNum == 5 }"
              >设置</li>-->
            </ul>
          </div>
          <div class="right">
            <img src="../assets/img/xiaoxitongzhi/png24.png" alt class="lin" v-if="num >0" />
            <img src="../assets/img/xiaoxitongzhi/not/png24.png" alt class="lin" v-if="num== 0" />
            <img src="../assets/img/touxiang/png24.png" alt class="txiang" />
            <span>{{uName}}</span>
            <div>|</div>
            <i @click="back">退出</i>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
          <template v-if="tabNum == 3">
            <ul v-if="$store.state.cId.is_headmaster != 'N'" class="teacheing">
              <router-link to="/main/classstudents" tag="li">班课学员</router-link>
              <router-link to="/main/inclass" tag="li">开课中学员</router-link>
              <router-link to="/main/myreservation" tag="li">我的预约单</router-link>
              <router-link to="/main/oneononestudent" tag="li">一对一学员</router-link>
              <router-link to="/main/onemyreservation" tag="li">一对一我的预约单</router-link>
              <router-link to="/main/statisticanalysis" tag="li">统计分析</router-link>
              <router-link
                to="/main/payingstudents"
                tag="li"
                v-if="$store.state.cId.is_headmaster == 'H'"
              >付费学员</router-link>
            </ul>
          </template>
          <!-- <ul v-if="tabNum == 4" class="schedu">
            <router-link to="/main/scheducourse" tag="li">课程管理</router-link>
            <router-link to="/main/schedulessons" tag="li">课节统计</router-link>
            <router-link to="/main/scheduteachers" tag="li">教师管理</router-link>
            <router-link to="/main/schedustudent" tag="li">学员管理</router-link>
          </ul>-->
          <template v-if="$store.state.cId.is_sales != 'N'">
            <ul v-if="tabNum == 2" class="crm">
              <router-link to="/main/mineclient" tag="li">我的客户</router-link>
              <router-link
                v-if="$store.state.cId.is_sales != 'N'"
                to="/main/reserved"
                tag="li"
              >我的预约单</router-link>
              <router-link
                v-if="$store.state.cId.is_headmaster != 'N'"
                to="/main/allreserved"
                tag="li"
              >全部预约单</router-link>
              <router-link v-if="$store.state.cId.is_sales == 'H'" to="/main/daiban" tag="li">资源池</router-link>
              <router-link v-if="$store.state.cId.is_sales == 'Y'" to="/main/public" tag="li">公共资源池</router-link>
              <router-link v-if="$store.state.cId.is_market != 'N'" to="/main/erweima" tag="li">渠道管理</router-link>
              <router-link
                v-if="$store.state.cId.is_teacher != 'N'"
                to="/main/teacher"
                tag="li"
              >教师管理</router-link>
              <router-link
                v-if="$store.state.cId.is_sales == 'H'"
                to="/main/importdata"
                tag="li"
              >线索导入</router-link>
              <router-link
                v-if="$store.state.cId.is_headmaster == 'H'"
                to="/main/importorder"
                tag="li"
              >订单导入</router-link>
              <router-link
                v-if="$store.state.cId.is_sales != 'N'"
                to="/main/statistics"
                tag="li"
              >统计分析</router-link>
              <router-link v-if="$store.state.cId.is_sales != 'N'" to="/main/money" tag="li">订单中心</router-link>
            </ul>
          </template>
          <template v-if="$store.state.cId.is_sales != 'N'">
            <ul v-if="tabNum == 5" class="crm">
              <router-link to="/main/departments" tag="li">部门和用户</router-link>
              <router-link to="/main/jurisdiction" tag="li">角色和权限</router-link>
            </ul>
          </template>
          <template v-if="$store.state.cId.is_market != 'N'">
            <ul v-if="tabNum == 1" class="cms">
              <router-link to="/main/advertising" tag="li">广告管理</router-link>
              <li class="cms_special">
                <div>
                  <span>专题管理</span>
                </div>
                <router-link to="/main/special" tag="li">首页专题</router-link>
                <router-link to="/main/bookcode" tag="li">一书一码</router-link>
              </li>
              <router-link to="/main/curriculum" tag="li">课程管理</router-link>
              <router-link to="/main/databank" tag="li">资料管理</router-link>
            </ul>
          </template>
        </Sider>
        <Layout :style="{padding: '0 10px 10px'}">
          <Content :style="{ minHeight: '280px', background: '#fff'}">
            <router-view />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import storeage from "../uilt/storage";
import { mapState, mapActions } from "vuex";
export default {
  mounted() {
    // var s = window.screen.width / 1920;
    // document.body.style.zoom = s;
    this.getReferList();
    this.getUser().then();
  },
  data() {
    return {
      tabNum: storeage.getMaintabnum(),
      theme1: "light"
    };
  },
  methods: {
    ...mapActions(["getUser", "loginOut", "getReferList"]),
    //tabar
    setActive(num) {
      this.tabNum = num;
      storeage.savaMaintabnum(num);
    },
    namePath(s) {
      storeage.setMenuNum(s);
    },
    back() {
      if (!confirm("确定要退出吗?")) return;
      this.loginOut()
        .then(res => {
          if (res.status == 200 && res.statusText == "OK") {
            this.$router.push("/");
            storeage.clear();
          }
        })
        .catch(e => {});
    }
  },
  computed: {
    ...mapState({
      uName: state => state.uName,
      num: state => state.main.num
    })
  },
  watch: {
    uName(e) {
      if (!e) {
        this.$router.push("/");
        storeage.clear();
      }
    }
  }
};
</script>
<style scoped>
.cms_special li {
  margin-left: 40px;
}
.cms_special {
  height: 130px !important;
}
.teacheing li :hover {
  color: #2d8cf0;
}
li.router-link-exact-active.router-link-active {
  background-color: #f0faff;
  color: #2d8cf0;
  border-right: 1.5px solid #2d8cf0;
}
/* .ivu-layout-sider[data-v-54d3a52e]{
  background-color: #ccc!important;
} */
.teacheing li,
.schedu li,
.crm li,
.cms li {
  height: 45px;
  line-height: 45px;
  text-align: center;
  cursor: pointer;
  box-sizing: border-box;
}
.teacheing,
.schedu,
.crm,
.cms {
  display: flex;
  flex-direction: column;
}
.ivu-layout-sider {
  width: 140px !important;
  min-width: 140px !important;
  max-width: 140px !important;
}
.ivu-layout-header {
  height: 50px !important;
  line-height: 50px !important;
  padding: 0 !important;
}
.tabars li.active {
  opacity: 0.8;
  background-color: #909498;
}
.tabars li:hover {
  opacity: 0.8;
}
.tabars li {
  width: 80px;
  color: #fff;
  text-align: center;
  cursor: pointer;
  line-height: 50px;
}
.tabars {
  height: 100%;
  display: flex;
  margin-left: 68px;
}
.ivu-layout-content {
  min-height: 660px !important;
}
.right div {
  margin: 0 10px;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
}

.right .txiang {
  margin: 0 5px 0 29px;
  width: 15px;
  height: 19px;
}
.right i {
  margin: 0 76px 0 0;
  cursor: pointer;
}
.right span,
i {
  font-size: 14px;
  font-weight: 500;
  color: #fff;
}
.right .lin {
  width: 15px;
  height: 19px;
}
.right {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  min-width: 300px;
  max-width: 300px;
}
.layout-logo[data-v-bb0b6c44] {
  color: #fff;
  font-size: 20px;
  text-align: center;
  line-height: 30px;
  font-weight: 700;
  margin-top: -5px;
}
.ivu-menu.ivu-menu-light.ivu-menu-vertical {
  height: 100%;
  width: 140px !important;
}
.layout-nav[data-v-bb0b6c44] ul li {
  color: #fff;
  width: 80px;
  text-align: center;
  cursor: pointer;
  font-size: 13px;
  line-height: 50px;
}
.layout-nav[data-v-bb0b6c44] ul {
  height: 100%;
  display: flex;
  margin-left: 40px;
}
.layout-nav[data-v-bb0b6c44] {
  height: 100%;
  flex: 1;
}
.layout-logo[data-v-bb0b6c44] {
  width: 120px;
}
.ivu-menu.ivu-menu-light.ivu-menu-horizontal {
  width: 100%;
  height: 100%;
  background: #515a6e;
  display: flex;
}
.ivu-layout {
  height: 100%;
}
.layout {
  background: #f5f7f9;
  position: relative;
  overflow: hidden;
  height: 100%;
}
.layout-logo {
  margin-top: -5px;
  width: 150px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  line-height: 30px;
  color: #fff;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
  display: flex;
  width: 100%;
}
.ivu-menu.ivu-menu-light.ivu-menu-vertical {
  width: 140px !important;
  height: 100%;
}
.menuitem ul.menu > li.router-link-exact-active.router-link-active {
  background: #1b73b0;
  color: #fff;
}
.menuitem ul.menu > li:hover {
  background: #c5e7ff;
}
.menuitem ul.menu > li span {
  margin: 10px 0;
  width: 100%;
  display: inline-block;
  height: 100%;
  font-size: 16px;
}
.menuitem ul.menu {
  margin-top: 30px;
}
.menuitem ul.menu > li {
  padding-left: 60px;
  cursor: pointer;
}
</style>