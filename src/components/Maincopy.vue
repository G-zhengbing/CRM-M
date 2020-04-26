<template>
  <div class="layout">
    <Layout>
      <Header>
        <div class="left">
          <img src="../assets/img/logo/png24.png" alt />
          <span style="font-weight: 700;">全品在线</span>
          <i>|</i>
          <span>CRM</span>
        </div>
        <div class="right">
          <img src="../assets/img/xiaoxitongzhi/png24.png" alt class="lin" v-if="num >0" />
          <img src="../assets/img/xiaoxitongzhi/not/png24.png" alt class="lin" v-if="num== 0" />
          <img src="../assets/img/touxiang/png24.png" alt class="txiang" />
          <div>{{uName}}</div>
          <div>|</div>
          <div @click="back">退出</div>
        </div>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu
            theme="light"
            :accordion="true"
            :active-name="$route.path"
            :open-names="active"
            @on-open-change="namePath"
          >
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-paper" />CRM系统
              </template>
              <!-- <MenuItem name="/main/home" to="/main/home" v-if="$store.state.cId != 4">首页</MenuItem> -->
              <Submenu name="1-2" v-if="$store.state.cId.is_sales != 'N'">
                <template slot="title">
                  <Icon type="ios-stats" />我的客户
                </template>
                <MenuItem name="/main/mineclient" to="/main/mineclient">我的客户</MenuItem>
                <MenuItem name="/main/studentpay" to="/main/studentpay">付费学员</MenuItem>
                <MenuItem name="/main/notvisit" to="/main/notvisit">今日新分</MenuItem>
                <MenuItem name="/main/followup" to="/main/followup">今日回访</MenuItem>
                <MenuItem name="/main/notcallback" to="/main/notcallback">逾期未回访</MenuItem>
                <MenuItem name="/main/notification" to="/main/notification">消息提醒</MenuItem>
              </Submenu>
              <MenuItem
                v-if="$store.state.cId.is_sales != 'N'"
                name="/main/reserved"
                to="/main/reserved"
              >我的预约单</MenuItem>
              <MenuItem name="/main/allreserved" to="/main/allreserved">全部预约单</MenuItem>
              <MenuItem
                name="/main/daiban"
                to="/main/daiban"
                v-if="$store.state.cId.is_sales == 'H'"
              >资源池</MenuItem>
              <MenuItem
                name="/main/public"
                to="/main/public"
                v-if="$store.state.cId.is_sales == 'Y'"
              >公共资源池</MenuItem>
              <MenuItem
                name="/main/erweima"
                to="/main/erweima"
                v-if="$store.state.cId.is_market != 'N'"
              >渠道管理</MenuItem>
              <MenuItem
                name="/main/teacher"
                to="/main/teacher"
                v-if="$store.state.cId.is_teacher != 'N'"
              >教师管理</MenuItem>
              <MenuItem
                name="/main/importdata"
                to="/main/importdata"
                v-if="$store.state.cId.is_sales == 'H'"
              >线索导入</MenuItem>
              <MenuItem
                name="/main/statistics"
                to="/main/statistics"
                v-if="$store.state.cId.is_sales != 'N'"
              >统计分析</MenuItem>
              <!-- <MenuItem
                name="/main/paystudent"
                to="/main/paystudent"
                v-if="$store.state.cId != 4"
              >付费学员</MenuItem>-->
              <!-- <MenuItem name="/main/uplist" to="/main/uplist" v-if="$store.state.cId != 4">上课提醒</MenuItem> -->
              <MenuItem
                name="/main/money"
                to="/main/money"
                v-if="$store.state.cId.is_sales != 'N'"
              >订单中心</MenuItem>
              <!--  <MenuItem name="/main/reservation" to="/main/reservation">我的预约单</MenuItem>
              <MenuItem name="/main/thread" to="/main/thread">线索导入</MenuItem>-->
              <!-- <MenuItem name="/main/number" to="/main/number" v-if="$store.state.cId != 3">成单数</MenuItem> -->
              <Submenu name="1-3" v-if="$store.state.cId.is_headmaster != 'N'">
                <template slot="title">
                  <Icon type="ios-stats" />教务
                </template>
                <MenuItem name="/main/classstudents" to="/main/classstudents">班课学员</MenuItem>
                <MenuItem name="/main/inclass" to="/main/inclass">开课中学员</MenuItem>
                <MenuItem name="/main/myreservation" to="/main/myreservation">我的预约单</MenuItem>
                <MenuItem name="/main/oneononestudent" to="/main/oneononestudent">一对一学员</MenuItem>
                <!-- 后台无数据，无法验证完善，待更改 -->
                <!-- <MenuItem name="/main/oneinclass" to="/main/oneinclass">一对一开课中学员</MenuItem> -->
                <MenuItem name="/main/onemyreservation" to="/main/onemyreservation">一对一我的预约单</MenuItem>
                <!-- <MenuItem name="/main/course" to="/main/course">课程</MenuItem>
                <MenuItem name="/main/teacher" to="/main/teacher">教师管理</MenuItem>-->
                <!-- <MenuItem name="/main/minestudent" to="/main/minestudent">我的学员</MenuItem> -->
                <MenuItem
                  name="/main/payingstudents"
                  to="/main/payingstudents"
                  v-if="$store.state.cId.is_headmaster == 'H'"
                >付费学员</MenuItem>
              </Submenu>
            </Submenu>
            <Submenu name="2" v-if="$store.state.cId.is_market != 'N'">
              <template slot="title">
                <Icon type="ios-stats" />M站后台
              </template>
              <MenuItem name="/main/advertising" to="/main/advertising">广告管理</MenuItem>
              <!-- <MenuItem name="/main/special" to="/main/special">专题管理</MenuItem> -->
              <Submenu name="2-1">
                <template slot="title">
                  <Icon type="ios-stats" />专题管理
                </template>
                <MenuItem name="/main/special" to="/main/special">首页专题</MenuItem>
                <MenuItem name="/main/bookcode" to="/main/bookcode">一书一码</MenuItem>
              </Submenu>
              <MenuItem name="/main/curriculum" to="/main/curriculum">课程管理</MenuItem>
              <MenuItem name="/main/databank" to="/main/databank">资料管理</MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <Layout>
          <Content :style="{padding: '24px', background: '#fff'}">
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
    this.active = storeage.getMenuNum();
    this.getReferList();
    this.getUser().then();
  },
  data() {
    return {
      isSection: true,
      isActive: false,
      active: storeage.getMenuNum()
    };
  },
  methods: {
    ...mapActions(["getUser", "loginOut", "getReferList"]),
    namePath(s) {
      storeage.setMenuNum(s);
    },
    doActive() {
      this.isActive = !this.isActive;
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
    },
    goErweima() {
      this.$router.push("/main/erweima");
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
.box {
  margin-bottom: 60px;
}
.ivu-layout-header{
  display: flex;
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
.right{
  display: flex;
  justify-content: center;
  align-items: center;
}
.left i {
  font-size: 16px;
  color: #fff;
  margin: 0 5px;
}
.left span {
  font-size: 20px;
  color: #fff;
}
.left img {
  width: 36px;
  height: 44px;
  margin: 0 3px 0 9px;
}
.left{
  height: 100%;
  display: flex;
  align-items: center;
  flex: 1;
}
.ivu-menu.ivu-menu-light.ivu-menu-vertical {
  height: 100%;
  width: 200px!important;
}
.ivu-layout{
  height: 100%;
}
.layout{
  height: 100%;
}
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
</style>