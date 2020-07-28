<template>
  <div class="sms-record">
    <header>
      <Button type="primary" style="margin-bottom: 20px;" @click="showModel=true">群发短信</Button>
      <Form ref="formItem" :model="formItem" inline>
        <FormItem prop="name">
          <Input v-model="formItem.name" placeholder="模板名称"></Input>
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
import sendSMS from './send-SMS'
export default {
  components: {
    'Send-SMS': sendSMS
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
          key: "student_name",
          width: 100,
          align: "center",
          fixed: "left",
        },
        {
          title: "发送时间",
          key: "student_name",
          width: 100,
          align: "center",
          fixed: "left",
        },
        {
          title: "模板名称",
          key: "student_name",
          width: 120,
          align: "center",
          fixed: "left",
        },
        {
          title: "模板类型",
          key: "student_name",
          width: 100,
          align: "center",
        },
        {
          title: "模板内容",
          key: "student_name",
          width: 220,
          align: "center",
        },
        {
          title: "发送渠道",
          key: "student_name",
          width: 100,
          align: "center",
        },
        {
          title: "渠道范围",
          key: "student_name",
          width: 100,
          align: "center",
        },
        {
          title: "发送条件",
          key: "student_name",
          width: 120,
          align: "center",
        },
        {
          title: "发送数量",
          key: "student_name",
          width: 100,
          align: "center",
        },
        {
          title: "接收数量",
          key: "student_name",
          width: 100,
          align: "center",
        },
        {
          title: "点击链接数",
          key: "student_name",
          width: 100,
          align: "center",
        },
        {
          title: "预约成功数",
          key: "student_name",
          width: 100,
          align: "center",
        },
        {
          title: "购课数",
          key: "student_name",
          width: 100,
          align: "center",
        },
      ],
      data: [
        {
          student_name: 123,
        },
      ],
      total: 1,
      per_page: 10,
      current_page: 1,
      last_page: 1,
    };
  },
  methods: {
    changeCreateDate(e) {
      console.log(e);
    },
    // 改变页码
    changePages(val) {
      this.formItem.page = val;
    },
    clear() {
			this.formItem = {}
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