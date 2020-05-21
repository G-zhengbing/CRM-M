<template>
  <div class="record">
    <Modal v-model="modal1" title="记录" @on-ok="ok" @on-cancel="cancel" width="60">
      <div class="content">
        <Form class="select" ref="formValidate" :model="formItem" inline>
          <FormItem>
            <Input v-model="formItem.student_name" placeholder="请输入用户昵称"></Input>
          </FormItem>
          <FormItem>
            <Select v-model="formItem.grade" placeholder="用户类型" style="width:160px;">
              <Option value="1">新用户</Option>
              <Option value="2">老用户</Option>
            </Select>
          </FormItem>
          <FormItem>
            <DatePicker
              v-model="formItem.tradingHour"
              type="datetimerange"
              placement="bottom-end"
              placeholder="关注时间 - 关注时间"
              @on-change="changeDate"
            ></DatePicker>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="formItem = {}">重置</Button>
          </FormItem>
        </Form>
        <Table max-height="400" border ref="selection" :columns="columns" :data="dataList"></Table>
        <div class="page">
          <PagingBox
            :total="total"
            :per_page="per_page"
            :current_page="current_page"
            :last_page="last_page"
            @changePages="changePages"
          />
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  props: {
    row: {
      type: [Object, String],
      required: false
    },
    showMod: {
      type: [Boolean, String],
      required: false
    }
  },
  watch: {
    showMod(val) {
      this.modal1 = val;
    }
  },
  data() {
    return {
      modal1: this.showMod,
      formItem: {},
      columns: [
        {
          title: "用户昵称",
          key: "visit_content",
          align: "center"
        },
        {
          title: "用户ID",
          key: "visit_content",
          align: "center"
        },
        {
          title: "用户类型",
          key: "visit_content",
          align: "center"
        },
        {
          title: "关注时间",
          key: "visit_content",
          align: "center"
        }
      ],
      dataList: [],
      total: 100,
      per_page: 10,
      current_page: 1,
      last_page: 1
    };
  },
  methods: {
    // 改变页码
    changePages(val) {
      this.formItem.page = val;
    },
    // 转换日期格式
    changeDate(time) {
      console.log(time);
      // this.formItem.next_follow_time = time;
    },
    ok() {
      this.$emit("changeShowMod", false);
    },
    cancel() {
      this.$emit("changeShowMod", false);
    }
  }
};
</script>

<style scoped>
.page {
	overflow: hidden;
}
</style>