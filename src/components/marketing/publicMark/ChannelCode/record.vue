<template>
  <div class="record">
    <Modal v-model="modal1" title="记录" @on-ok="ok" @on-cancel="cancel" width="60">
      <div class="content">
        <Form class="select" ref="formValidate" :model="formItem" inline>
          <FormItem>
            <Input v-model="formItem.nickname" placeholder="请输入用户昵称"></Input>
          </FormItem>
          <FormItem>
            <Select v-model="formItem.wechat_account_type" placeholder="用户类型" style="width:160px;">
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
import qs from "qs";
import { USERSLOG } from "@/uilt/url/marketing";
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
    },
    formItem: {
      deep: true,
      handler(newName, oldName) {
        window.setTimeout(() => {
          this.getUserData();
        }, 200);
      }
    }
  },
  data() {
    return {
      modal1: this.showMod,
      formItem: {},
      columns: [
        {
          title: "用户昵称",
          key: "nickname",
          align: "center"
        },
        {
          title: "用户ID",
          key: "id",
          align: "center"
        },
        {
          title: "用户类型",
          key: "user_type",
          align: "center"
        },
        {
          title: "关注时间",
          key: "scan_code_attention_time",
          align: "center"
        }
      ],
      dataList: [],
      total: 0,
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
    changeDate(item) {
      this.formItem.attention_start_time = item[0];
      this.formItem.attention_end_time = item[1];
    },
    ok() {
      this.$emit("changeShowMod", false);
    },
    cancel() {
      this.$emit("changeShowMod", false);
    },
    // 获取用户记录数据
    async getUserData() {
      this.formItem.id = this.row.id;
      let res = await this.$request({
        method: "POST",
        url: USERSLOG,
        data: qs.stringify(this.formItem)
      });
      this.dataList = res.data.data.data;
      this.dataList.forEach(item => {
        item.user_type = item.user_type == 1 ? "新用户" : "老用户";
      });
      this.total = res.data.data.link.total;
      this.per_page = res.data.data.link.per_page;
      this.current_page = res.data.data.link.current_page;
      this.last_page = res.data.data.link.last_page;
    }
  }
};
</script>

<style scoped>
.page {
  overflow: hidden;
}
</style>