<template>
  <div class="box">
    <header class="main-header">
      <ul>
        <li>
          <i></i>
          <span>M站后台</span>
        </li>
        <li class="active">
          <i></i>
          <span>课程管理</span>
        </li>
      </ul>
    </header>
    <section class="main-section">
      <div class="surplus">
        <div class="main-section-top">
          <div class="main-section-top-top">
            <Form :model="form" :label-width="80">
              <Row>
                <Col span="5">
                  <FormItem label="课程名称">
                    <Input v-model="form.course_name"></Input>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="课程类型">
                    <Select v-model="form.type" style="width:200px">
                      <Option :value="i" v-for="(list,i) in course">{{list}}</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="科目">
                    <Select v-model="form.subject" style="width:200px">
                      <Option :value="1">数学</Option>
                      <Option :value="2">英语</Option>
                      <Option :value="3">语文</Option>
                      <Option :value="4">物理</Option>
                      <Option :value="5">化学</Option>
                      <Option :value="6">政治</Option>
                      <Option :value="7">生物</Option>
                      <Option :value="8">地理</Option>
                      <Option :value="9">历史</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="年级">
                    <Select v-model="form.grade" style="width:200px">
                      <Option :value="1">一年级</Option>
                      <Option :value="2">二年级</Option>
                      <Option :value="3">三年级</Option>
                      <Option :value="4">四年级</Option>
                      <Option :value="5">五年级</Option>
                      <Option :value="6">六年级</Option>
                      <Option :value="7">七年级</Option>
                      <Option :value="8">八年级</Option>
                      <Option :value="9">九年级</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="4">
                  <FormItem>
                    <Button type="primary" @click="seekKuhu">查询</Button>
                    <Button style="margin-left: 8px" @click="clear">清空</Button>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
        <div class="main-section-bottom">
          <div class="contaner">
            <div style="height:1px;"></div>
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
            <Table border :columns="columns2" :data="data" @on-selection-change="selectionChange"></Table>
            <Page
              @on-change="pageChange"
              :total="total"
              :current="currentPage"
              :page-size="pageSize"
              show-total
              show-elevator
              class="ive-page"
            />
          </div>
        </div>
      </div>
    </section>
    <CurrMessage v-if="isCurrMessage" :item="item" ref="messages"/>
  </div>
</template>

<script>
import CurrMessage from "../curriculum/CurrMessage";
import { mapActions, mapState, mapMutations } from "vuex";
import storage from '../../uilt/storage'
export default {
  components: {
    CurrMessage
  },
  mounted() {
    this.loading(true);
    this.getCurrList({page:1}).then(()=>{
      this.loading(false);
      this.setCurrerntPage(1)
    })
  },
  data() {
    return {
      course:storage.getDaiban().screen_list.course_type,
      disabled:true,
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
              style:{
                "width":"50px"
              },
              //按钮的话是：button自行替换
              props: {
                type: "启用/隐藏",
                //这里可以设置它的属性
                value: params.row.is_hot == 1 ? true : false, //设置它的值比如：true或false
                disabled:params.row.show_type == 2? true:false
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
  computed: {
    ...mapState({
      data: state => state.curriculum.currlList,
      currentPage: state => state.curriculum.currentPage,
      pageSize: state => state.curriculum.pageSize,
      total: state => state.curriculum.total
    })
  },
  methods: {
    ...mapActions([
      "getCurrList",
      "setCurrSwitch",
      "delCurrList",
      "setCurrDownUp"
    ]),
    ...mapMutations(["setCurrerntPage"]),
    //排序
    getSelect(val){
      this.loading(true);
      this.getCurrList({sort:val}).then(()=>{
        this.loading(false);
      })
    },
    //分页
    pageChange(num) {
      this.loading(true);
      this.setCurrerntPage(num);
      this.getCurrList({ page: num }).then(() => {
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
      this.loading(true);
      this.setCurrSwitch(params).then(() => {
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
      this.loading(true);
      this.setCurrDownUp(item).then(() => {
        this.loading(false);
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
    seekKuhu() {
      this.loading(true);
      this.getCurrList(this.form).then(res => {
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
<style scoped>
.ivu-page-options-elevator input {
  height: 22px;
}
.ive-page {
  float: right;
  margin: 30px 0;
}
form label {
  margin-right: 30px;
}
.ivu-input-wrapper {
  width: 150px !important;
}
.ivu-select.ivu-select-single.ivu-select-default {
  margin-left: 15px;
}
.batch-let {
  flex: 1;
}
.batch {
  display: flex;
  margin: 15px 0;
}
.btn {
  width: 100px;
  height: 30px;
  color: #fff;
  font-size: 14px;
  background: #1b73b0;
  outline: none;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>