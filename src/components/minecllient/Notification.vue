<template>
  <div>
    <Form :model="form">
      <Row class-name="exclusive">
        <Col span="3">
          <FormItem>
            <Input v-model="form.name" placeholder="学员姓名" @on-change="seekClick"></Input>
          </FormItem>
        </Col>
        <Col span="3">
          <FormItem>
            <Input v-model="form.mobile" placeholder="注册手机" @on-change="seekMobile"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem>
            <div class="dateplc">
              <DatePicker
                v-model="startAccount"
                type="date"
                placeholder="预约时间"
                @on-change="getTimes2"
              ></DatePicker>
              <DatePicker
                v-model="endAccount"
                type="date"
                placeholder="预约时间"
                @on-change="getTimes2"
              ></DatePicker>
            </div>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem>
            <div class="dateplc">
              <DatePicker v-model="startTime" type="date" placeholder="注册时间" @on-change="getTimes"></DatePicker>
              <DatePicker v-model="endTime" type="date" placeholder="注册时间" @on-change="getTimes"></DatePicker>
            </div>
          </FormItem>
        </Col>
        <Col span="3">
          <Button type="primary" @click="clear">清除</Button>
        </Col>
      </Row>
    </Form>
    <Table
      border
      :columns="columns"
      :data="notifiData"
      @on-selection-change="selectionChange"
    ></Table>
    <Page
      @on-change="pageChange"
      :total="total"
      :current="currentPage"
      :page-size="pageSize"
      show-total
      show-elevator
      class="ive-page"
    />

    <Loading v-show="isLoading" />
    <DaibanMessage :type="type" v-if="show" />
    <MineclientMessage :type="type" v-if="showMine" />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import Loading from "../../uilt/loading/loading";
import storage from "../../uilt/storage";
import DaibanMessage from "../client-manage/resource-pool/Message";
import MineclientMessage from "./MineclientMessage";
export default {
  components: {
    Loading,
    DaibanMessage,
    MineclientMessage
  },
  mounted() {
    this.setCurrentPage(1);
    this.isLoading = true;
    this.getNotificationList({ form: {}, page: 1 }).then(res => {
      this.isLoading = false;
    });
  },
  computed: {
    ...mapGetters(["notifiData", "notifiTypes"]),
    ...mapState({
      data: state => state.notification.notifiList,
      currentPage: state => state.notification.currentPage,
      total: state => state.notification.total,
      pageSize: state => state.notification.pageSize
    })
  },
  data() {
    return {
      sale_list: storage.getDaiban().sale_list,
      endAccount: "",
      startAccount: "",
      showMine: false,
      endTime: "",
      startTime: "",
      channel: "",
      follow_status: "",
      subjectList: "",
      intention: "",
      stage: "",
      transfer: "",
      show: false,
      type: {
        status: "notification"
      },
      isLoading: false,
      form: {},
      columns: [
        { type: "selection", width: 60 },
        { title: "学员姓名", key: "student_name", width: 120 },
        { title: "注册手机", key: "mobile", width: 130 },
        { title: "年级", key: "action_grade", width: 100 },
        { title: "科目", key: "action_subject", width: 100 },
        { title: "活动", key: "action_refer" },
        { title: "跟进人", key: "follow_sale_name", width: 100 },
        { title: "预约时间", key: "action_create_time" },
        { title: "注册时间", key: "create_time" },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 220,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.audition(params.row);
                    }
                  }
                },
                "试听"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.order(params.row);
                    }
                  }
                },
                "订单"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.getBtnClick3(params.row);
                    }
                  }
                },
                "跟进"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.getBtnClick4(params.row);
                    }
                  }
                },
                "呼出"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    ...mapMutations(["setNotifiTypes", "setCurrentPage", "setRefer"]),
    ...mapActions([
      "getNotificationList",
      "RingUp",
      "getUserReservedList"
    ]),
    //手机号
    seekMobile() {
      if (this.form.mobile.length >= 4) {
        this.seekClick();
      }
    },
    //订单
    order(item) {
      this.setNotifiTypes(item);
      this.showMine = true;
      this.type.classify = "order";
      this.type.form = this.form;
      this.type.page = this.currentPage;
      this.type.data = { ...this.notifiTypes };
    },
    //试听
    audition(item) {
      // this.getUserReservedList({uid:item.id})
      this.setNotifiTypes(item);
      this.showMine = true;
      this.type.classify = "audition";
      this.type.page = this.currentPage;
      this.type.form = this.form;
      this.type.data = { ...this.notifiTypes };
    },
    //设置返回的时间
    datePicker(time) {
      var d = new Date(time);
      let shi = d.getHours();
      let fen = d.getMinutes();
      let miao = d.getSeconds();
      if (shi < 10) shi = "0" + shi;
      if (fen < 10) fen = "0" + fen;
      if (miao < 10) miao = "0" + miao;
      d = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      return d;
    },
    //操作日期
    getTimes2() {
      if (this.startAccount && this.endAccount) {
        this.form.create_time_start = this.datePicker(this.startAccount);
        this.form.create_time_end = this.datePicker(this.startAccount);
        this.seekClick();
      }
    },
    //创建日期
    getTimes() {
      if (this.startTime && this.endTime) {
        this.form.account_time_start = this.datePicker(this.startTime);
        this.form.account_time_end = this.datePicker(this.endTime);
        this.seekClick();
      }
    },
    clear() {
      this.form = {};
      this.startTime = "";
      this.endTime = "";
      this.startAccount = "";
      this.endAccount = "";
      this.seekClick();
    },
    //查询
    seekClick() {
      let page = 1;
      let currentPage = this.currentPage;
      if (currentPage > 1) {
        this.setCurrentPage(page);
      }
      this.isLoading = true;
      this.getNotificationList({ form: this.form, page }).then(res => {
        this.isLoading = false;
        this.setCurrentPage(page);
      });
    },
    selectionChange() {},
    //跟进
    getBtnClick3(item) {
      this.setNotifiTypes(item);
      this.show = true;
      this.type.classify = "followUp";
      this.type.page = this.currentPage;
      this.type.form = this.form;
      this.type.data = { ...this.notifiTypes };
    },
    //呼出
    getBtnClick4(item) {
      this.setNotifiTypes(item);
      this.show = true;
      this.type.classify = "followUp";
      this.type.page = this.currentPage;
      this.type.form = this.form;
      this.type.data = { ...this.notifiTypes };
      if (
        typeof item.spare_phone == "undefined" ||
        item.spare_phone == "" ||
        item.spare_phone == null
      ) {
        this.isLoading = true;
        this.RingUp({ form: item })
          .then(res => {
            if (res.data.code == 200) {
              this.$Message.success("呼出成功");
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
      } else {
        this.type.classify = "ringupFollowUp";
      }
    },
    //分页
    pageChange(num) {
      this.isLoading = true;
      this.setCurrentPage(num);
      this.getNotificationList({ form: this.form }).then(res => {
        this.isLoading = false;
        this.setCurrentPage(num);
      });
    }
  }
};
</script>
<style scoped>
.dateplc {
  display: flex;
}
</style>