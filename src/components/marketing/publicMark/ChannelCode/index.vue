<template>
  <div class="channelCode">
    <div class="page-content">
      <div class="content-title">
        <Form class="select" ref="formValidate" :model="formItem" inline>
          <FormItem>
            <Input v-model="formItem.code_name" placeholder="请输入二维码名称"></Input>
          </FormItem>
          <FormItem>
            <Select v-model="formItem.code_type" placeholder="推送类型" style="width:160px;">
              <Option value="1">图文推送</Option>
              <Option value="2">文字推送</Option>
              <Option value="3">小程序推送</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Select v-model="formItem.code_time_type" placeholder="请选择二维码类型">
              <Option value="1">临时二维码</Option>
              <Option value="2">永久二维码</Option>
            </Select>
          </FormItem>
          <FormItem>
            <DatePicker
              v-model="formItem.time"
              type="datetimerange"
              placement="bottom-end"
              placeholder="创建时间 - 创建时间"
              @on-change="changeDate"
            ></DatePicker>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="clear">清除</Button>
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
      :labelList="labelList"
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
    <Loading v-show="isLoading" />
  </div>
</template>

<script>
import NewCode from "./newCode";
import Record from "./record";
import OpenImg from "./openImg";
import qs from "qs";
import { GETLABELLIST, GETCODELIST, UPDATECODE } from "@/uilt/url/marketing";
export default {
  components: {
    NewCode,
    Record,
    OpenImg
  },
  watch: {
    formItem: {
      deep: true,
      handler(newName, oldName) {
        window.setTimeout(() => {
          this.getCodeList();
        }, 200);
      }
    }
  },
  data() {
    return {
      isLoading: false,
      type: "",
      showMod: false,
      row: "",
      formItem: {},
      columns: [
        {
          title: "二维码名称",
          key: "code_name",
          align: "center"
        },
        {
          title: "推送类型",
          key: "code_type",
          align: "center"
        },
        {
          title: "标签",
          key: "fan_label_name",
          align: "center"
        },
        {
          title: "二维码类型",
          key: "code_time_type",
          align: "center"
        },
        {
          title: "扫码量",
          key: "scan_code_count",
          align: "center"
        },
        {
          title: "扫码用户数",
          key: "scan_code_user_count",
          align: "center"
        },
        {
          title: "关注数",
          key: "focus_on_the_user_count",
          align: "center"
        },
        {
          title: "创建时间",
          key: "create_time",
          align: "center"
        },
        {
          title: "二维码",
          key: "channel_code_url",
          align: "center",
          render: (h, params) => {
            return h("img", {
              style: {
                //设置样式
                width: "30px",
                height: "30px",
                "margin-top": "5px",
                "border-radius": "5%",
                cursor: "pointer"
              },
              attrs: {
                //设置属性
                src: params.row.channel_code_url
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
                    click: async () => {
                      let res = await this.$request({
                        method: "POST",
                        url: UPDATECODE,
                        data: qs.stringify({
                          id: params.row.id,
                          is_delete: 2
                        })
                      });
                      if (res.data.code == 200) {
                        this.$Message.success("删除成功");
                        this.getCodeList();
                      }
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      dataList: [],
      total: 100,
      per_page: 10,
      current_page: 1,
      last_page: 1,
      labelList: [],
      code_time_type: ["临时二维码", "持久二维码"],
      code_type: ["图文推送", "文字推送", "小程序卡片"]
    };
  },
  methods: {
    // 清除按钮
    clear() {
      this.formItem = {};
    },
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
    changeShowMod(val, index) {
      this.showMod = val;
      this.row = "";
      this.type = "";
      if (index) {
        this.getCodeList();
      }
    },
    // 转换日期格式
    changeDate(time) {
      this.formItem.create_start_time = time[0];
      this.formItem.create_end_time = time[1];
    },
    // 获取粉丝标签,新建页面用到
    async getLabelList() {
      this.isLoading = true;
      let res = await this.$request({
        url: GETLABELLIST
      });
      this.labelList = res.data.data.tags;
      this.isLoading = false;
    },
    // 获取二维码列表
    async getCodeList() {
      this.isLoading = true;
      let res = await this.$request({
        method: "POST",
        url: GETCODELIST,
        data: qs.stringify(this.formItem)
      });
      this.dataList = res.data.data.data;
      this.dataList.forEach(item => {
        item.code_time_type = this.code_time_type[item.code_time_type - 1];
        item.code_type = this.code_type[item.code_type - 1];
      });
      // 设置页码
      this.total = res.data.data.link.total;
      this.per_page = res.data.data.link.per_page;
      this.current_page = res.data.data.link.current_page;
      this.last_page = res.data.data.link.last_page;

      this.isLoading = false;
    }
  },
  created() {
    this.getLabelList();
    this.getCodeList();
  }
};
</script>

<style scoped>
.channelCode {
  padding: 0 10px;
  box-sizing: border-box;
}
</style>