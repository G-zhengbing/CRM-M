<template>
  <div class="box">
    <Form :model="form">
      <Row  class-name="exclusive">
        <Col span="3">
          <FormItem prop="materials_name">
            <Input @on-change="seekKuhu" v-model="form.materials_name" placeholder="请输入资料名称" />
          </FormItem>
        </Col>
        <Col span="2">
          <FormItem>
            <Button type="primary" @click="clear">清空</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>

    <div class="batch">
      <div class="batch-let">
        <button class="btn" @click="isDele">批量删除</button>
      </div>
      <div class="batch-right">
        <Select style="width:100px" placeholder="排序方式">
          <Option value="1">{{ 1 }}</Option>
        </Select>
        <button class="btn" @click="addAd">新建资料</button>
      </div>
    </div>
    <Table
      ref="table"
      hiheight-row
      :height="tableHeight"
      style="minHeight:40px"
      border
      :columns="columns2"
      :data="data"
      @on-selection-change="selectionChange"
    ></Table>
    <Page
      @on-change="pageChange"
      :total="total"
      :current="currentPage"
      :page-size="pageSize"
      show-total
      show-elevator
      class="ive-page"
    />
    <Message v-if="isDataMessage" ref="datamessage" :item="item" />
  </div>
</template>

<script>
import Message from "./Message";
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  components: {
    Message
  },
  mounted() {
    this.loading(true);
    this.getDatabankList({ page: 1 }).then(res => {
      this.loading(false);
      this.setCurrerntPage(1);
    });
    window.addEventListener("resize", this.changeFixed);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.changeFixed);
  },
  data() {
    return {
      tableHeight: 0,
      item: {},
      isUpdata: false,
      cityList: [],
      title: "",
      checkAll: [],
      isDataMessage: false,
      form: {},
      height: "height",
      columns2: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "资料合集编号",
          key: "id",
          align: "center"
        },
        {
          title: "资料合集名称",
          key: "materials_name",
          align: "center"
        },
        {
          title: "资料数",
          key: "num",
          align: "center"
        },
        {
          title: "是否首页展示",
          align: "center",
          render: (h, params) => {
            // 重点
            let _this = this;
            return h("i-switch", {
              style: {
                width: "50px"
              },
              //按钮的话是：button自行替换
              props: {
                type: "是否首页展示",
                //这里可以设置它的属性
                value: params.row.is_hot == 1 ? true : false //设置它的值比如：true或false
              },
              on: {
                //操作事件
                input: function(event) {
                  //这里会起到监听的作用
                  if (event) {
                    params.row.is_hot = true;
                  } else {
                    params.row.is_hot = false;
                  }
                },
                "on-change": function(val) {
                  //值发生了改变调用方法
                  _this.functionFun(val, params.row); // 方法自定义
                }
              },
              scopedSlots: {
                open: () => h("span", "ON"),
                close: () => h("span", "OFF")
              }
            });
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
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
                      this.getBtnClick1(params.row);
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
                      this.getBtnClick2(params.row);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ]
    };
  },
  computed: {
    ...mapState({
      data: state => state.databank.databanklList,
      currentPage: state => state.databank.currentPage,
      pageSize: state => state.databank.pageSize,
      total: state => state.databank.total
    })
  },
  methods: {
    ...mapActions(["getDatabankList", "deleDataList", "setDaSwitch"]),
    ...mapMutations(["setCurrerntPage"]),
    changeFixed() {
      this.tableHeight =
        window.innerHeight - this.$refs.table.$el.offsetTop - 105;
    },
    //loading
    loading(status) {
      if (status) {
        this.$Spin.show({
          render: h => {
            return h("div", [
              h("Icon", {
                class: "demo-spin-icon-load",
                props: {
                  type: "ios-loading",
                  size: 18
                }
              }),
              h("div", "Loading")
            ]);
          }
        });
      } else {
        this.$Spin.hide();
      }
    },
    //分页
    pageChange(num) {
      this.loading(true);
      this.setCurrerntPage(num);
      this.getDatabankList({ page: num }).then(() => {
        this.loading(false);
      });
    },
    //是否首页展示
    functionFun(val, params) {
      this.loading(true);
      this.setDaSwitch(params).then(() => {
        this.loading(false);
      });
    },
    //批量删除
    isDele() {
      if (this.checkAll.length > 0) {
        this.$Modal.confirm({
          title: "温馨提示",
          content: "<p>确定要进行批量删除操作吗?</p>",
          onOk: () => {
            this.loading(true);
            this.deleDataList(this.checkAll).then(res => {
              if (res.data.code == 200) {
                this.$Message.success("删除成功！");
                this.loading(false);
              }
            });
          }
        });
      }
      return;
    },
    //编辑
    getBtnClick1(item) {
      this.isUpdata = true;
      this.isDataMessage = true;
      this.item = { ...item };
    },
    //删除
    getBtnClick2(item) {
      this.$Modal.confirm({
        title: "温馨提示",
        content: "<p>确定要删除该条记录吗?</p>",
        onOk: () => {
          this.loading(true);
          this.deleDataList([item.id]).then(res => {
            if (res.data.code == 200) {
              this.$Message.success("删除成功！");
              this.loading(false);
            }
          });
        }
      });
    },
    //新建广告
    addAd() {
      this.item = { is_hot: "1" };
      this.isUpdata = false;
      this.isDataMessage = true;
    },
    clear() {
      this.loading(true);
      this.form = {};
      this.getDatabankList(this.form).then(() => {
        this.loading(false);
      });
    },
    seekKuhu() {
      this.loading(true);
      this.getDatabankList(this.form).then(res => {
        this.setCurrerntPage(1);
        this.loading(false);
      });
    },
    selectionChange(item) {
      var arr = [];
      for (var i = 0; i < item.length; i++) {
        arr.push(item[i].id);
      }
      this.checkAll = arr;
    }
  }
};
</script>
<style>
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
</style>