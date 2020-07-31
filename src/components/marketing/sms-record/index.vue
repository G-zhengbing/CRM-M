<template>
  <div class="sms-record">
    <header>
      <Button type="primary" style="margin-bottom: 20px;" @click="showModel=true">群发短信</Button>
      <Form ref="formItem" :model="formItem" inline>
        <FormItem>
          <Input v-model="formItem.sms_template_name" placeholder="模板名称" @on-change="getSMSList"></Input>
        </FormItem>
        <FormItem>
          <DatePicker
            v-model="formItem.create_sts_time"
            type="datetimerange"
            placement="bottom-start"
            placeholder="发送时间 - 发送时间"
            style="width: 165px"
            @on-change="changeCreateDate"
          ></DatePicker>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="clear">清空选项</Button>
        </FormItem>
      </Form>
    </header>
    <main>
      <Table border :columns="columns" :data="data" height="550"></Table>
      <PagingBox
        :total="total"
        :per_page="per_page"
        :current_page="current_page"
        :last_page="last_page"
        @changePages="changePages"
      />
    </main>
    <Send-SMS v-if="showModel"></Send-SMS>
    <Loading v-show="isLoading" />
  </div>
</template>

<script>
import { MARKETINGSMSBATCHLIST } from "@/uilt/url/setup";
import qs from "qs";
import sendSMS from "./send-SMS";
export default {
  components: {
    "Send-SMS": sendSMS,
  },
  data() {
    return {
      isLoading: false,
      showModel: false,
      formItem: {},
      columns: [
        {
          type: "selection",
          width: 60,
          fixed: "left",
          align: "center",
        },
        {
          title: "发送者",
          key: "send_user",
          width: 120,
          align: "center",
          fixed: "left",
        },
        {
          title: "发送时间",
          key: "send_time",
          width: 120,
          align: "center",
          fixed: "left",
        },
        {
          title: "模板名称",
          key: "template_name",
          width: 120,
          align: "center",
          fixed: "left",
        },
        {
          title: "模板类型",
          key: "template_type",
          width: 100,
          align: "center",
        },
        {
          title: "模板内容",
          key: "template_contents",
          tooltip: true,
          width: 220,
          align: "center",
        },
        {
          title: "发送渠道",
          key: "channel_name",
          width: 100,
          align: "center",
        },
        {
          title: "渠道范围",
          key: "send_scope",
          width: 100,
          align: "center",
        },
        {
          title: "发送条件",
          key: "send_where",
          width: 120,
          align: "center",
        },
        {
          title: "发送数量",
          key: "send_count",
          width: 100,
          align: "center",
        },
        {
          title: "接收数量",
          key: "receive_count",
          width: 100,
          align: "center",
        },
        {
          title: "点击链接数",
          key: "click_link_count",
          width: 100,
          align: "center",
        },
        {
          title: "预约成功数",
          key: "about_course_count",
          width: 100,
          align: "center",
        },
        {
          title: "购课数",
          key: "buy_course_count",
          width: 100,
          align: "center",
        },
      ],
      data: [],
      total: 1,
      per_page: 10,
      current_page: 1,
      last_page: 1,
      tamType: {
        1: "通知短信",
        2: "营销短信",
      },
      channel: {
        1: "待分配",
        2: "已分配",
        3: "公共",
      },
    };
  },
  created() {
    this.getSMSList();
  },
  methods: {
    changeCreateDate(e) {
      this.formItem.send_srart_time = e[0];
      this.formItem.send_end_time = e[1];
      // this.$set(this.formItem.send_srart_time, e[0]);
      // this.$set(this.formItem.send_end_time, e[1]);
      this.getSMSList();
    },
    async getSMSList() {
      this.isLoading = true;
      let res = await this.$request({
        url: MARKETINGSMSBATCHLIST,
        params: {
          sms_template_name: this.formItem.sms_template_name,
          send_srart_time: this.formItem.send_srart_time,
          send_end_time: this.formItem.send_end_time,
        },
      });
      this.data = res.data.data.data;
      this.data.map((item) => {
        item.template_type = this.tamType[item.template_type];
        item.send_scope = this.channel[item.send_scope];
        item.send_where = item.send_where.slice(0, item.send_where.length - 1);
      });
      this.isLoading = false;
    },
    // 改变页码
    changePages(val) {
      this.formItem.page = val;
    },
    clear() {
      this.formItem = {};
      this.getSMSList();
    },
  },
};
</script>

<style scoped>
.sms-record {
  padding: 20px;
  box-sizing: border-box;
}
header {
  margin-top: 10px;
  margin-bottom: 20px;
}
</style>