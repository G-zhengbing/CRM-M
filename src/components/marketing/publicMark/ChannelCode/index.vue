<template>
  <div class="channelCode">
    <div class="page-content">
      <div class="content-title">
        <Form class="select" ref="formValidate" :model="formItem" inline>
          <FormItem>
            <Input v-model="formItem.student_name" placeholder="请输入二维码名称"></Input>
          </FormItem>
          <FormItem>
            <Select v-model="formItem.grade" placeholder="推送类型" style="width:160px;">
              <Option value="1">图文推送</Option>
              <Option value="2">文字推送</Option>
              <Option value="3">小程序推送</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Select v-model="formItem.grade" placeholder="请选择二维码类型">
              <Option value="1">临时二维码</Option>
              <Option value="2">永久二维码</Option>
            </Select>
          </FormItem>
          <FormItem>
            <DatePicker
              v-model="formItem.tradingHour"
              type="datetimerange"
              placement="bottom-end"
              placeholder="创建时间 - 创建时间"
              @on-change="changeDate"
            ></DatePicker>
          </FormItem>
        </Form>
      </div>
      <div class="main">
        <Button
          type="primary"
          style="margin-bottom: 10px;"
          @click="showMod = true;type = 'NewCode'"
        >新建渠道</Button>
        <TableBox :columns="columns" :dataList="dataList" />
      </div>
      <PagingBox
        :total="total"
        :per_page="per_page"
        :current_page="current_page"
        :last_page="last_page"
        @changePages="changePages"
      />
    </div>
    <NewCode
      v-if="type === 'NewCode'"
      :row="row"
      :showMod="showMod"
      @changeShowMod="changeShowMod"
    />
    <Record
      v-else-if="type === 'Record'"
      :row="row"
      :showMod="showMod"
      @changeShowMod="changeShowMod"
    />
    <OpenImg
      v-else-if="type === 'OpenImg'"
      :row="row"
      :showMod="showMod"
      @changeShowMod="changeShowMod"
    />
  </div>
</template>

<script>
import NewCode from "./newCode";
import Record from "./record";
import OpenImg from "./openImg";
export default {
  components: {
		NewCode,
		Record,
    OpenImg
  },
  data() {
    return {
      type: "",
      showMod: false,
      row: "",
      formItem: {},
      columns: [
        {
          title: "二维码名称",
          key: "visit_content",
          align: "center"
        },
        {
          title: "推送类型",
          key: "visit_content",
          align: "center"
        },
        {
          title: "标签",
          key: "visit_content",
          align: "center"
        },
        {
          title: "二维码类型",
          key: "visit_content",
          align: "center"
        },
        {
          title: "扫码量",
          key: "visit_content",
          align: "center"
        },
        {
          title: "扫码用户数",
          key: "visit_content",
          align: "center"
        },
        {
          title: "关注数",
          key: "visit_content",
          align: "center"
        },
        {
          title: "创建时间",
          key: "visit_content",
          align: "center"
        },
        {
          title: "二维码",
          key: "Introduction_diagram",
          align: "center",
          render: (h, params) => {
            return h("img", {
              style: {
                //设置样式
                width: "30px",
                height: "30px",
                "margin-top": "5px",
                "border-radius": "5%"
              },
              attrs: {
                //设置属性
                src: params.row.Introduction_diagram
              },
              on: {
                click: () => {
                  this.OpenImg(params.row);
                }
              }
            });
          }
        },
        {
          title: "操作",
          key: "operation",
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
                      this.newCode(params.row);
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
                      this.Record(params.row);
                    }
                  }
                },
                "记录"
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
                      // this.createdOrder(params.row);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      dataList: [{ visit_content: 123 }],
      total: 100,
      per_page: 10,
      current_page: 1,
      last_page: 1
    };
  },
  methods: {
    OpenImg(row) {
      this.type = "OpenImg";
      this.row = row;
      this.showMod = true;
    },
    newCode(row) {
      this.type = "NewCode";
      this.row = row;
      this.showMod = true;
    },
    Record(row) {
      this.type = "Record";
      this.row = row;
      this.showMod = true;
    },
    // 改变页码
    changePages(val) {
      this.formItem.page = val;
    },
    // 关闭窗口状态
    changeShowMod(val) {
      this.showMod = val;
      this.row = "";
      this.type = "";
    },
    // 转换日期格式
    changeDate(time) {
      console.log(time);
      // this.formItem.next_follow_time = time;
    }
  }
};
</script>

<style scoped>
.channelCode {
  padding: 0 10px;
  box-sizing: border-box;
}
</style>