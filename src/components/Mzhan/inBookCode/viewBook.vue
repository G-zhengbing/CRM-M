<template>
  <div class="viewBook">
    <Modal v-model="modal1" title="查看" width="60">
      <Form class="select" ref="formValidate" :model="formItem" inline>
        <FormItem>
          <Input v-model="formItem.mobile" placeholder="注册手机"></Input>
        </FormItem>
        <FormItem>
          <DatePicker
            v-model="formItem.tradingHour"
            type="datetimerange"
            placement="bottom-end"
            placeholder="开始时间 - 结束时间"
            @on-change="changeDate"
          ></DatePicker>
        </FormItem>
        <Button @click="deleteFormData" style="margin-left: 8px">清空选项</Button>
      </Form>
      <Table border :columns="columns" :data="data" height="400px"></Table>
      <div class="page">
        <Page
          :total="total"
          :page-size="per_page"
          :current="current_page"
          @on-change="changePages"
          show-elevator
          show-total
        />
      </div>
      <div slot="footer">
        <Button type="primary" size="large" @click="cancel">关闭</Button>
      </div>
    </Modal>
    <AddBook
      v-if="type1 === 'AddBook'"
      :row="row1"
      :showMod="showMod1"
      @changeShowMod="changeShowMod"
    />
  </div>
</template>

<script>
import AddBook from "./addBook";
export default {
  components: {
    AddBook
  },
  props: {
    row: {
      type: [Object, String],
      required: false
    },
    showMod: {
      type: [Boolean, String],
      required: true
    }
  },
  watch: {
    showMod(val) {
      this.modal1 = val;
    }
  },
  data() {
    return {
      modal1: "",
      modal2: false,
      formItem: {},
      total: 0,
      per_page: 10,
      current_page: 1,
      last_page: 1,
      formValidate: {},
      columns: [
        {
          title: "二维码标题",
          key: "student_name",
          align: "center"
        },
        {
          title: "视频ID",
          key: "student_name",
          align: "center"
        },
        {
          title: "扫码用户数",
          key: "student_name",
          align: "center"
        },
        {
          title: "扫码用户量",
          key: "student_name",
          align: "center"
        },
        {
          title: "关注量",
          key: "student_name",
          align: "center"
        },
        {
          title: "页面地址",
          key: "student_name",
          align: "center"
        },
        {
          title: "视频简介",
          key: "student_name",
          align: "center"
        },
        {
          title: "创建时间",
          key: "student_name",
          align: "center"
        },
        {
          title: "操作",
          key: "operation",
          align: "center",
          width: 200,
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
                      // this.switch("NewBook", params.row);
                    }
                  }
                },
                "发布"
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
                      this.type1 = "AddBook";
                      this.showMod1 = true;
                    }
                  }
                },
                "编辑"
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
                      // this.switch("AddBook", params.row);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data: [
        {
          student_name: "123"
        }
      ],
      type1: "",
      row1: "",
      showMod1: false
    };
  },
  methods: {
    // 开关
    switch(name, row) {
      this.showMod1 = true;
      this.row1 = row;
      this.type1 = name;
    },
    // 关闭窗口状态
    changeShowMod(val, index) {
      this.showMod1 = val;
      this.row1 = "";
      this.type1 = "";
    },
    // 改变页码
    changePages(val) {
      this.formItem.page = val;
    },
    // 点击清除选项
    deleteFormData() {
      this.formItem = {
        page: 1, // 页码
        page_num: "10" // 每页条数
      };
    },
    // 转换date
    changeDate(time) {
      // this.formItem.pay_start_time = time[0];
      // this.formItem.pay_end_time = time[1];
    },
    ok() {
      this.$refs["formValidate"]
        .validate(valid => {})
        .then(val => {
          if (val) {
            // 这里发送操作请求

            this.$Message.success("成功！");
          }
          this.modal2 = true;
        });
    },
    cancel() {
      this.$emit("changeShowMod", false);
    }
  }
};
</script>

<style scoped>
.page {
  text-align: right;
  margin-top: 10px;
}
</style>