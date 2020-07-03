<template>
  <div class="box">
    <Form :model="form">
      <Row>
        <Col span="3">
          <FormItem>
            <Input @on-change="seek" v-model="form.course_name" placeholder="课程名称"></Input>
          </FormItem>
        </Col>
        <Col span="3">
          <FormItem>
            <Select @on-change="seek" v-model="form.type" placeholder="课程类型">
              <Option :value="i" v-for="(list,i) in course" :key="i">{{list}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="3">
          <FormItem>
            <Select @on-change="seek" v-model="form.subject" placeholder="科目">
              <Option v-for="(list,i) in subject" :value="i" :key="i">{{list}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="3">
          <FormItem>
            <Select @on-change="seek" v-model="form.grade" placeholder="年级">
              <Option :value="1">一年级</Option>
              <Option :value="2">二年级</Option>
              <Option :value="3">三年级</Option>
              <Option :value="4">四年级</Option>
              <Option :value="5">五年级</Option>
              <Option :value="6">六年级</Option>
              <Option :value="7">七年级</Option>
              <Option :value="8">八年级</Option>
              <Option :value="9">九年级</Option>
              <Option :value="10">高一</Option>
              <Option :value="11">高二</Option>
              <Option :value="12">高三</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="4">
          <FormItem>
            <Button type="primary" style="margin-left: 8px" @click="clear">清空</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div class="batch">
      <div class="batch-let">
        <button class="btn" @click="isDele">批量删除</button>
      </div>
      <div class="batch-right">
        <button class="btn" @click="addAd">新建课程</button>
        <Dropdown style="margin-left: 20px" @on-click="getSelect">
          <Button type="primary">
            排序
            <Icon type="ios-arrow-down"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="1">售价由高到低</DropdownItem>
            <DropdownItem name="2">售价由低到高</DropdownItem>
            <DropdownItem name="3">活动价由高到底</DropdownItem>
            <DropdownItem name="4">活动价由低到高</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
    <Table
      hiheight-row
      ref="table"
      :height="tableHeight"
      style="minHeight:40px"
      border
      :columns="columns2"
      :data="$store.state.curriculum.currlList"
      @on-selection-change="selectionChange"
    ></Table>
    <Page
      @on-change="pageChange"
      :total="$store.state.curriculum.total"
      :current="$store.state.curriculum.currentPage"
      :page-size="$store.state.curriculum.pageSize"
      show-total
      show-elevator
      class="ive-page"
    />
    <Message v-if="isCurrMessage" :item="item" ref="messages" />
  </div>
</template>

<script>
import Message from "./Message";
import storage from "../../../uilt/storage";
import { IMPORTLIST } from "../../../uilt/url/url";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  "curriculum"
);
export default {
  components: {
    Message
  },
  mounted() {
    this.loading(true);
    this.getCurrList({ page: 1 }).then(() => {
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
      subject: storage.getDaiban().screen_list.subject,
      course: storage.getDaiban().screen_list.course_type,
      disabled: true,
      item: {},
      isUpdata: false,
      cityList: [],
      title: "",
      checkAll: [],
      isCurrMessage: false,
      form: {},
      height: "height",
      columns2: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "课程名称",
          width: 230,
          key: "course_name",
          align: "center"
        },
        {
          title: "类型",
          key: "type_ch",
          align: "center"
        },
        {
          title: "科目",
          key: "subject_ch",
          align: "center"
        },
        {
          title: "年级",
          key: "grade_ch",
          align: "center"
        },
        {
          title: "课节数",
          key: "class_hour",
          align: "center"
        },
        {
          title: "课程状态",
          key: "status",
          align: "center"
        },
        {
          title: "售价",
          key: "sale_price",
          align: "center"
        },
        {
          title: "活动价",
          key: "activity_price",
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
                type: "启用/隐藏",
                //这里可以设置它的属性
                value: params.row.is_hot == 1 ? true : false, //设置它的值比如：true或false
                disabled: params.row.show_type == 2 ? true : false
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
                open: () => h("span", "启用"),
                close: () => h("span", "隐藏")
              }
            });
          }
        },
        {
          title: "操作",
          key: "action",
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
                      this.putaway(params.row);
                    }
                  }
                },
                "上架"
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
                      this.getBtnClick1(params.row);
                    }
                  }
                },
                "下架"
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
                      this.getBtnClick3(params.row);
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
  methods: {
    ...mapActions([
      "putawayData",
      "getCurrList",
      "setCurrSwitch",
      "delCurrList",
      "setCurrDownUp"
    ]),
    ...mapMutations(["setCurrerntPage"]),
    changeFixed() {
      this.tableHeight =
        window.innerHeight - this.$refs.table.$el.offsetTop - 48;
    },
    //上架
    putaway(val) {
      this.$Modal.confirm({
        title: "温馨提示",
        content: "<p>确定要进行上架操作吗?</p>",
        onOk: () => {
          this.loading(true);
          this.putawayData(val.id).then(res => {
            if (res.data.code == 200) {
              this.$Message.success("上架成功！");
            }
            this.loading(false);
            this.getCurrList({ form: this.form, page: this.currentPage });
          });
        }
      });
    },
    //排序
    getSelect(val) {
      this.loading(true);
      this.getCurrList({
        sort: val,
        form: this.form,
        page: this.currentPage
      }).then(() => {
        this.loading(false);
      });
    },
    //分页
    pageChange(num) {
      this.loading(true);
      this.setCurrerntPage(num);
      this.getCurrList({ page: num, form: this.form }).then(() => {
        this.loading(false);
      });
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
    //是否首页展示
    functionFun(val, params) {
      console.log(val, params);
      this.loading(true);
      this.setCurrSwitch({ params: this.form, form: params }).then(() => {
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
            this.delCurrList(this.checkAll).then(res => {
              if (res.data.code == 200) {
                this.$Message.success("删除成功！");
              }
              this.loading(false);
            });
          }
        });
      }
      return;
    },
    //下架
    getBtnClick1(item) {
      this.$Modal.confirm({
        title: "温馨提示",
        content: "<p>确定要进行下架操作吗?</p>",
        onOk: () => {
          this.loading(true);
          this.setCurrDownUp(item.id).then(res => {
            if (res.data.code == 200) {
              this.$Message.success("下架成功！");
            }
            this.loading(false);
            this.getCurrList({ form: this.form, page: this.currentPage });
          });
        }
      });
    },
    //编辑
    getBtnClick2(item) {
      this.isUpdata = true;
      this.isCurrMessage = true;
      this.item = { ...item };
    },
    //删除
    getBtnClick3(item) {
      this.$Modal.confirm({
        title: "温馨提示",
        content: "<p>确定要删除该条记录吗?</p>",
        onOk: () => {
          this.loading(true);
          this.delCurrList(item.id).then(res => {
            if (res.data.code == 200) {
              this.$Message.success("删除成功！");
            }
            this.loading(false);
          });
        }
      });
    },
    //新建广告
    addAd() {
      this.isUpdata = false;
      this.isCurrMessage = true;
    },
    clear() {
      this.form = {};
    },
    seek() {
      this.loading(true);
      this.getCurrList({ form: this.form, page: 1 }).then(res => {
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