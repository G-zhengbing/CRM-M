<template>
  <div class="SClassHour">
    <Tabs type="card" :value="tabs" @on-click="changeTab" :animated="false">
      <TabPane label="今日待确认" name="1"></TabPane>
      <TabPane label="逾期待确认" name="2"></TabPane>
      <TabPane label="已确认" name="3"></TabPane>
    </Tabs>
    <Form class="select" ref="formValidate" :model="formItem" inline>
      <FormItem>
        <Input v-model="formItem.student_name" placeholder="学员编号/姓名" style="width: 160px;"></Input>
      </FormItem>
      <FormItem>
        <Select v-model="formItem.grade" placeholder="选择年级" style="width: 100px;">
          <Option :value="item.id" v-for="item in contant.GRADE" :key="item.id">{{item.title}}</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Select v-model="formItem.grade" placeholder="选择科目" style="width: 100px;">
          <Option :value="index" v-for="(item,index) in contant.SUBJECT" :key="index">{{item}}</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Select v-model="formItem.grade" placeholder="课程类型" style="width: 100px;">
          <Option value="0">一对一</Option>
          <Option value="1">试听课</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Select v-model="formItem.grade" placeholder="课程状态" style="width: 100px;">
          <Option value="0">正常</Option>
          <Option value="1">异常</Option>
        </Select>
      </FormItem>
      <FormItem v-if="tabs !== '1'">
        <DatePicker
          v-model="formItem.create_sts_time"
          type="datetimerange"
          placement="bottom-end"
          placeholder="上课日期 - 上课日期"
          style="width: 165px"
          @on-change="changeCreateDate"
        ></DatePicker>
      </FormItem>
      <FormItem>
        <Button @click="deleteFormData" style="margin-left: 8px">清空选项</Button>
      </FormItem>
    </Form>
    <TableBox :columns="tabs === '3' ? columns2 : columns1" :dataList="dataList">
      <Button
        v-if="tabs !== '3'"
        @click="confirm(1)"
        type="primary"
        style="margin-left: 8px"
        slot="affirm"
      >批量确认</Button>
    </TableBox>
    <PagingBox
      :total="total"
      :per_page="per_page"
      :current_page="current_page"
      :last_page="last_page"
      @changePages="changePages"
    />
    <!-- edit  v-if 控制组件销毁，方便组件内请求 -->
    <edit v-if="edit.switch" />
  </div>
</template>

<script>
import edit from "./edit";
export default {
  components: {
    edit,
  },
  data() {
    return {
      tabs: 0,
      columns1: [
        {
          type: "selection",
          fixed: "left",
          width: 60,
          align: "center",
        },
        {
          title: "学员编号",
          align: "center",
          key: "name",
          width: 120,
          fixed: "left",
        },
        {
          title: "学员姓名",
          align: "center",
          key: "name",
          width: 120,
          fixed: "left",
        },
        {
          title: "注册手机",
          align: "center",
          key: "name",
          width: 120,
          fixed: "left",
        },
        {
          title: "课程类型",
          align: "center",
          key: "name",
          width: 120,
        },
        {
          title: "课节名称",
          align: "center",
          key: "name",
          width: 120,
        },
        {
          title: "年级",
          align: "center",
          key: "name",
          width: 120,
        },
        {
          title: "科目",
          align: "center",
          key: "name",
          width: 120,
        },
        {
          title: "课程状态",
          align: "center",
          key: "name",
          width: 120,
        },
        {
          title: "上课日期",
          align: "center",
          key: "name",
          width: 160,
        },
        {
          title: "周几",
          align: "center",
          key: "name",
          width: 120,
        },
        {
          title: "时间段",
          align: "center",
          key: "name",
          width: 180,
        },
        {
          title: "时长",
          align: "center",
          key: "name",
          width: 160,
        },
        {
          title: "实际上课时长",
          align: "center",
          key: "name",
          width: 160,
        },
        {
          title: "课时消耗",
          align: "center",
          key: "name",
          width: 120,
        },
        {
          title: "审核状态",
          align: "center",
          key: "name",
          width: 120,
        },
        {
          title: "回放地址",
          align: "center",
          width: 120,
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  attrs: {
                    href: params.row.name_url,
                    target: '_blank'
                  },
                },
                params.row.name_url
              ),
            ]);
          },
        },
        {
          title: "操作",
          key: "operation",
          align: "center",
          fixed: "right",
          width: 200,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small",
                  },
                  on: {
                    click: () => {
                      this.confirm();
                    },
                  },
                },
                "确认"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small",
                  },
                  on: {
                    click: () => {
                      // this.switchMod("createdOrder", params.row);
                      this.edit.switch = true;
                    },
                  },
                },
                "编辑"
              ),
            ]);
          },
        },
      ],
      columns2: [
        {
          type: "selection",
          fixed: "left",
          width: 60,
          align: "center",
        },
        {
          title: "学员编号",
          align: "center",
          key: "name",
          width: 120,
          fixed: "left",
        },
        {
          title: "学员姓名",
          align: "center",
          key: "name",
          width: 120,
          fixed: "left",
        },
        {
          title: "注册手机",
          align: "center",
          key: "name",
          width: 120,
          fixed: "left",
        },
        {
          title: "课程类型",
          align: "center",
          key: "name",
          width: 120,
        },
        {
          title: "课节名称",
          align: "center",
          key: "name",
          width: 120,
        },
        {
          title: "年级",
          align: "center",
          key: "name",
          width: 120,
        },
        {
          title: "科目",
          align: "center",
          key: "name",
          width: 120,
        },
        {
          title: "课程状态",
          align: "center",
          key: "name",
          width: 120,
        },
        {
          title: "上课日期",
          align: "center",
          key: "name",
          width: 160,
        },
        {
          title: "周几",
          align: "center",
          key: "name",
          width: 120,
        },
        {
          title: "时间段",
          align: "center",
          key: "name",
          width: 180,
        },
        {
          title: "时长",
          align: "center",
          key: "name",
          width: 160,
        },
        {
          title: "实际上课时长",
          align: "center",
          key: "name",
          width: 160,
        },
        {
          title: "课时消耗",
          align: "center",
          key: "name",
          width: 120,
        },
        {
          title: "确认课时消耗",
          align: "center",
          key: "name",
          width: 120,
        },
        {
          title: "审核状态",
          align: "center",
          key: "name",
          width: 120,
        },
        {
          title: "审核人",
          align: "center",
          key: "name",
          width: 120,
        },
        {
          title: "审核时间",
          align: "center",
          key: "name",
          width: 120,
        },
        {
          title: "回放地址",
          align: "center",
          width: 120,
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  attrs: {
                    href: params.row.name_url,
                    target: '_blank'
                  },
                },
                params.row.name_url
              ),
            ]);
          },
        },
        {
          title: "操作",
          key: "operation",
          align: "center",
          fixed: "right",
          width: 200,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small",
                  },
                  on: {
                    click: () => {
                      this.edit.switch = true;
                      this.edit.isEdit = true;
                    },
                  },
                },
                "查看"
              ),
            ]);
          },
        },
      ],
      dataList: [
        {
          name: "123",
          name_url: "http://www.baidu.com",
        },
      ],
      total: 100,
      per_page: 10,
      current_page: 1,
      last_page: 1,
      formItem: {},
      edit: {
        switch: false,
        id: 0,
      },
    };
  },
  methods: {
    // 确认按钮
    confirm(i) {
      this.$Modal.confirm({
        title: "确认",
        content: "<p>确认学员课时数，是否确认</p>",
        onOk: () => {
          // 1 表示批量 0 不进入
          if (i) {
            console.log(this.$children[2].Items);
          }
          this.$Message.success("确认成功");
        },
        onCancel: () => {
          this.$Message.success("取消");
        },
      });
    },
    changeTab(e) {
      this.tabs = e;
      this.deleteFormData();
    },
    // 改变页码
    changePages(val) {
      this.formItem.page = val;
    },
    // 转换date
    changeCreateDate(time) {
      this.formItem.create_st_time = time[0];
      this.formItem.create_en_time = time[1];
    },
    // 点击清除选项
    deleteFormData() {
      this.formItem = {
        page: 1, // 页码
        page_num: "10", // 每页条数
      };
    },
  },
};
</script>

<style scoped>
.SClassHour {
  padding: 20px;
}
</style>