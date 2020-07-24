<template>
  <div class="sms-record">
    <header>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      formItem: {},
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "发送者",
          key: "student_name",
          align: "center",
        },
        {
          title: "发送时间",
          key: "student_name",
          align: "center",
        },
        {
          title: "模板名称",
          key: "student_name",
          align: "center",
        },
        {
          title: "发送数量",
          key: "student_name",
          align: "center",
        },
        {
          title: "接收数量",
          key: "student_name",
          align: "center",
        },
        {
          title: "点击链接数",
          key: "student_name",
          align: "center",
        },
        {
          title: "预约成功数",
          key: "student_name",
          align: "center",
        },
        {
          title: "购课数",
          key: "student_name",
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