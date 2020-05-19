<template>
  <div v-if="pageLoading" class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" :theme="theme1" active-name="1">
          <div class="layout-logo"><img class="logo-img" src="@/assets/img/logo/png8.png"></img>全品在线</div>
          <div class="layout-nav">
            <ul class="tabars">
              <li
                v-if="item.childrens.length"
                @click="setActive(index)"
                :class="{active:tabNum == index}"
                v-for="(item,index) in jurisdictionList"
                :key="index"
              >{{item.display_name}}</li>
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
        <Sider hide-trigger :style="{background: '#fff','padding-top': '20px'}">
          <template
            v-if="jurisdictionList[tabNum].childrens.length"
            v-for="(item,index) in jurisdictionList[tabNum].childrens"
          >
            <ul class="teacheing">
              <li v-if="item.childrens" class="cms_special">
                <div>
                  <span>{{item.display_name}}</span>
                </div>
                <router-link
                  v-for="(i,index) in item.childrens"
                  :key="index"
                  :to="i.web_path"
                  tag="li"
                >{{i.display_name}}</router-link>
              </li>
              <router-link v-else :to="item.web_path" tag="li">{{item.display_name}}</router-link>
            </ul>
          </template>
        </Sider>
        <Layout :style="{padding: '0 10px 10px'}">
          <Content :style="{ minHeight: '280px', background: '#fff'}">
            <router-view style="padding-top: 20px" />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import storeage from "../uilt/storage";
import { MEPERMISSION } from "../uilt/url/url";
import { mapState, mapActions } from "vuex";
export default {
  mounted() {
    this.getReferList();
    this.getUser()
      .then(res => {
        // 这里面要做页面显示限制，否则数据没有更新，页面已经渲染，会报错
        this.pageLoading = true;
        if (res.data.data.permission.length == 0) {
          this.$Modal.error({
            title: "错误",
            content: "请联系上级人员，该帐号未配置权限！"
          });
          this.pageLoading = false;
          this.$router.push("/");
        }
      })
      .catch(err => {
        this.$Modal.error({
          title: "错误",
          content: "数据加载失败,请检查网络或联系管理员!"
        });
        this.pageLoading = false;
        this.$router.push("/");
      });
  },
  data() {
    return {
      tabNum: storeage.getMaintabnum(),
      theme1: "light",
      pageLoading: false
    };
  },
  methods: {
    ...mapActions(["getUser", "loginOut", "getReferList"]),
    //tabar
    setActive(num) {
      this.tabNum = num;
      this.$router.push(this.jurisdictionList[num].childrens[0].web_path);
      storeage.savaMaintabnum(num);
    },
    nameweb_path(s) {
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
      num: state => state.main.num,
      jurisdictionList: state => state.permission
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
/* logo图片 */
.logo-img {
  width: 20px;
  margin-right: 10px;
}
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
  /* width: 80px; */
  padding: 0 18px;
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
  /* margin: 0 76px 0 0; */
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
  width: 280px;
  min-width: 280px;
  max-width: 280px;
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
  /* height: 100%; */
}
.layout {
  background: #f5f7f9;
  position: relative;
  /* overflow: hidden; */
  height: 100%;
}
.layout-logo {
  display: flex;
  justify-content: center;
  margin-top: -5px;
  width: 150px;
  height: 30px;
  /* background: #5b6270; */
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
  font-size: 18px;
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