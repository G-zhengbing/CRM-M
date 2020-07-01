<template>
  <div class="viewBook">
    <Modal v-model="modal1" title="查看" width="70" @on-ok="ok" @on-cancel="cancel">
      <Form class="select" ref="formValidate" :model="formItem" inline>
        <FormItem>
          <Input
            v-model="formItem.qrcode_title"
            placeholder="请输入二维码名称"
            @on-blur="getInBookSublevel"
          ></Input>
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
      <Table border :columns="columns" :data="data" height="400"></Table>
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
      :isIn="true"
      @changeShowMod="changeShowMod"
    />
    <Loading v-show="isLoading" />
  </div>
</template>

<script>
import qs from "qs";
import {
  GETINBOOKSUBLEVEL,
  DELETEINBOOKQRCODE,
  INBOOKSUBLEVELEXTENSION
} from "@/uilt/url/Murl";
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
      isLoading: false,
      modal1: "",
      modal2: false,
      formItem: {},
      total: 0,
      per_page: 10,
      current_page: 1,
      last_page: 1,
      columns: [
        {
          title: "二维码标题",
          key: "qrcode_title",
          align: "center"
        },
        {
          title: "视频ID",
          key: "videoid",
          align: "center"
        },
        {
          title: "扫码用户数",
          key: "scan_qrcode_user_count",
          align: "center"
        },
        {
          title: "扫码量",
          key: "scan_qrcode_count",
          align: "center"
        },
        {
          title: "关注量",
          key: "attention_count",
          align: "center"
        },
        {
          title: "页面地址",
          key: "web_url",
          align: "center"
        },
        {
          title: "视频简介",
          key: "video_desc",
          align: "center"
        },
        {
          title: "创建时间",
          key: "create_time",
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
                    size: "small",
                    disabled: params.row.is_publish == 2
                  },
                  on: {
                    click: async () => {
                      this.isLoading = true;
                      let res = await this.$request({
                        method: "POST",
                        url: INBOOKSUBLEVELEXTENSION,
                        data: qs.stringify({
                          id: params.row.id
                        })
                      });
                      if (res.data.code == 200) {
                        this.$Message.success("发布成功");
                      }
                      this.getInBookSublevel();
                      this.isLoading = false;
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
                      this.switch("AddBook", params.row);
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
                    size: "small",
                    disabled: params.row.is_publish == 2
                  },
                  on: {
                    click: async () => {
                      this.isLoading = true;
                      let res = await this.$request({
                        method: "POST",
                        url: DELETEINBOOKQRCODE,
                        data: qs.stringify({
                          ids: params.row.id,
                          type: 2 // 1删除书籍 2删除书籍子级书内码
                        })
                      });
                      if (res.data.code == 200) {
                        this.$Message.success("删除成功");
                      }
                      this.getInBookSublevel();
                      this.isLoading = false;
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
  created() {
    this.getInBookSublevel();
  },
  methods: {
    // 获取书籍列表
    async getInBookSublevel() {
      this.formItem.in_book_qrcode_id = this.row.id;
      let res = await this.$request({
        method: "POST",
        url: GETINBOOKSUBLEVEL,
        data: qs.stringify(this.formItem)
      });
      this.data = res.data.data.data;
      this.total = res.data.data.links.total;
      this.per_page = res.data.data.links.per_page;
      this.current_page = res.data.data.links.current_page;
      this.last_page = res.data.data.links.last_page;
    },
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
      this.getInBookSublevel();
    },
    // 改变页码
    changePages(val) {
      this.formItem.page = val;
    },
    // 点击清除选项
    deleteFormData() {
      this.formItem = {};
      this.getInBookSublevel();
    },
    // 转换date
    changeDate(time) {
      this.formItem.create_start_time = time[0];
      this.formItem.create_end_time = time[1];
      this.getInBookSublevel();
    },
    ok() {
      this.$refs["formValidate"]
        .validate(valid => {})
        .then(val => {
          if (val) {
            // 这里发送操作请求

            this.$Message.success("成功！");
            this.$emit("changeShowMod", false);
          }

          this.modal2 = true;
        });
    },
    cancel() {
      this.$emit("changeShowMod", false, 1);
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