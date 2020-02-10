<template>
  <div class="box">
    <header class="main-header">
      <ul>
        <li @click="goHome">
          <i></i>
          <span>首页</span>
        </li>
        <li>
          <i></i>
          <span>今日回访</span>
        </li>
      </ul>
    </header>
    <section class="main-section">
      <div class="surplus">
        <div class="main-section-top">
          <div class="main-section-top-top">
            <form>
              <label>
                渠道:
                <select class="daiban-selected" v-model="form.refer">
                  <option v-for="(list,i) in refer" :key="i" :value="i">{{list}}</option>
                </select>
              </label>
              <label>
                学员姓名:
                <input type="text" v-model="form.name" />
              </label>
              <label>
                学员电话:
                <input type="text" v-model="form.mobile" />
              </label>
              <label>
                科目:
                <select class="daiban-selected" v-model="form.subject">
                  <option value="1">数学</option>
                  <option value="2">英语</option>
                  <option value="3">语文</option>
                  <option value="4">物理</option>
                  <option value="5">化学</option>
                  <option value="6">政治</option>
                  <option value="7">生物</option>
                  <option value="8">地理</option>
                  <option value="9">历史</option>
                </select>
              </label>
              <button type="button" class="daiban-button" @click="seekKuhu">查询</button>
              <button type="button" class="daiban-button" @click="clear">清空</button>
            </form>
          </div>
        </div>
        <div class="main-section-bottom">
          <div class="contaner">
            <div style="height:1px;"></div>
            <Table
              :columns="columns"
              :data="FollowdataArr"
              :currentPage="currentPage"
              :total="total"
              :pageSize="pageSize"
              @selection-change="selectionChange"
              @childer1="getBtnClick1"
              @childer2="getBtnClick2"
              @childer3="getBtnClick3"
              @childer4="getBtnClick4"
              @page-change="pageChange"
            />
          </div>
        </div>
      </div>
    </section>
    <DaibanMessage v-if="show" :type="type" />
    <Loading v-show="isLoading" />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import Table from "../uilt/table/TablePlus";
import DaibanMessage from "../uilt/newErweima/DaibanMessage";
import Loading from "../uilt/loading/loading";
export default {
  components: {
    Table,
    DaibanMessage,
    Loading
  },
  mounted() {
    this.setCurrentPage(1)
    this.isLoading = true;
    this.getFollowUpList().then(res => {
      this.isLoading = false;
    });
  },
  data() {
    return {
      isLoading: false,
      type: {
        page: 1,
        status: "followup"
      },
      show: false,
      form: {},
      columns: [
        { type: "selection" },
        { type: "学员电话", key: "mobile" },
        { type: "在读学校", key: "school" },
        { type: "年级", key: "grade" },
        { type: "科目", key: "subject" },
        { type: "创建时间", key: "create_time" },
        { type: "跟进人", key: "follow_sale_name" },
        { type: "约课状态", key: "is_course" },
        { type: "意向度", key: "intention_option" },
        {
          type: "action",
          title: "操作",
          buttons: [
            // { text: "移出", type: "danger" },
            { text: "跟进", type: "warning" },
            { text: "查看", type: "info" },
            { text: "呼出", type: "link" }
          ]
        }
      ]
    };
  },
  methods: {
    goHome(){
      this.$router.push("/main/home")
    },
    clear() {
      this.form = {};
    },
    seekKuhu() {
      let page = 1;
      let currentPage = this.currentPage;
      if (currentPage > 1) {
        this.setCurrentPage(page);
      }
      this.isLoading = true;
      this.getFollowUpList({...this.form,page}).then(res => {
        this.setCurrentPage(page);
        this.isLoading = false;
      });
    },
    ...mapActions(["getFollowUpList","RingUp"]),
    ...mapMutations(["setCurrentPage", "setGenjintypefoll"]),
    selectionChange() {},
    getBtnClick1(item) {
      this.show = true;
      this.type.classify = "datalis";
      this.type.data = { ...item };
    },
    getBtnClick2(item) {
      this.show = true;
      this.type.classify = "shiftOut";
      this.type.data = { ...item };
    },
    getBtnClick3(item) {
      this.setGenjintypefoll(item);
      this.show = true;
      this.type.classify = "followUp";
      this.type.data = { ...this.Typesntfoll };
    },
    getBtnClick4(item) {
      this.setGenjintypefoll(item);
      this.isLoading = true;
      this.RingUp(item)
        .then(res => {
          if (res.data.code == 200) {
            this.$Message.success('呼出成功');
          }
          if (res.data.code == 1000) {
            this.$Message.error({
                content: res.data.error,
                duration: 4
            });
          }
          this.isLoading = false;
        })
        .catch(e => {
          if (e) {
            this.isLoading = false;
          }
        });
    },
    pageChange(num) {
      this.isLoading = true;
      this.setCurrentPage(num);
      this.getFollowUpList({...this.form}).then(res => {
        this.isLoading = false;
        this.setCurrentPage(num);
      });
    }
  },
  computed: {
    ...mapGetters(["FollowdataArr", "Typesntfoll"]),
    ...mapState({
      data: state => state.followup.followUpList,
      refer: state => state.followup.refer,
      currentPage: state => state.followup.currentPage,
      total: state => state.followup.total,
      pageSize: state => state.followup.pageSize
    })
  }
};
</script>