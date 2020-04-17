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
          <span>广告管理</span>
        </li>
      </ul>
    </header>
    <section class="main-section">
      <div class="surplus">
        <div class="main-section-top">
          <div class="main-section-top-top">
            <form>
              <label>
                广告名称:
                <input type="text" v-model="form.title" />
              </label>
              <button type="button" class="daiban-button" @click="seekKuhu">查询</button>
              <button type="button" class="daiban-button" @click="clear">清空</button>
            </form>
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
                <button class="btn" @click="addAd">新建广告</button>
                <Dropdown style="margin-left: 20px" @on-click="getSelect">
                  <Button type="primary">
                    排序
                    <Icon type="ios-arrow-down"></Icon>
                  </Button>
                  <DropdownMenu slot="list">
                    <DropdownItem name="1">上线优先</DropdownItem>
                    <DropdownItem name="2">排序优先</DropdownItem>
                    <DropdownItem name="3">创建时间由近及远</DropdownItem>
                    <DropdownItem name="4">创建时间由远及近</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
            <Table border :columns="columns2" :data="data" @on-selection-change="selectionChange"></Table>
            <Page
              @on-change="pageChange"
              :total="total"
              :current="adCurrentPage"
              :page-size="pageSize"
              show-total
              show-elevator
              class="ive-page"
            />
          </div>
        </div>
      </div>
    </section>
    <AdMessage v-if="isAdMessage" :item="item" />
  </div>
</template>

<script>
import AdMessage from "../Advertising/AdMessage";
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  components: {
    AdMessage
  },
  mounted() {
    this.loading(true);
    this.getAdverList({ page: 1 }).then(() => {
      this.loading(false);
      this.setCurrerntPage(1);
    });
    setTimeout(() => {
      let arr = this.$store.state.advertising.adverList;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].status == 1) {
          arr[i].status = true;
        } else {
          arr[i].status = false;
        }
      }
    }, 1000);
  },
  data() {
    return {
      columns2: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "广告名称",
          key: "title",
          align: "center"
        },
        {
          title: "缩略图",
          key: "banner_pic",
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
                src: "http://liveapi.canpoint.net/" + params.row.banner_pic
              }
            });
          }
        },
        {
          title: "跳转链接",
          key: "link_url",
          align: "center"
        },
        {
          title: "创建时间",
          key: "create_time",
          align: "center"
        },
        {
          title: "排序",
          key: "sort",
          align: "center"
        },
        {
          title: "启用/隐藏",
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
                value: params.row.status == 1 ? true : false //设置它的值比如：true或false
              },
              on: {
                //操作事件
                input: function(event) {
                  //这里会起到监听的作用
                  if (event) {
                    params.row.status = true;
                  } else {
                    params.row.status = false;
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
      ],
      title: "",
      checkAll: [],
      isAdMessage: false,
      form: {},
      isUpdata: false,
      item: {}
    };
  },
  computed: {
    ...mapState({
      data: state => state.advertising.adverList,
      adCurrentPage: state => state.advertising.adCurrentPage,
      pageSize: state => state.advertising.pageSize,
      total: state => state.advertising.total
    })
  },
  methods: {
    ...mapActions(["getAdverList", "deleAdverList", "setSwitch"]),
    ...mapMutations(["setCurrerntPage"]),
    //排序
    getSelect(val){
      this.loading(true);
      this.getAdverList({field:val}).then(()=>{
        this.loading(false);
      })
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
      this.getAdverList({ page: num }).then(() => {
        this.loading(false);
      });
    },
    //启用/隐藏
    functionFun(val, params) {
      this.loading(true);
      this.setSwitch(params).then(() => {
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
            this.deleAdverList(this.checkAll).then(res => {
              this.loading(false);
              if (res.data.code == 200) {
                this.$Message.success("删除成功！");
              }
            });
          }
        });
      }
      return;
    },
    //表格内编辑
    getBtnClick1(item) {
      this.isUpdata = true;
      this.isAdMessage = true;
      if (item.status == 1) {
        item.status = 1;
      } else {
        item.status = 2;
      }
      this.item = { ...item };
    },
    //表格内删除
    getBtnClick2(item) {
      this.$Modal.confirm({
        title: "温馨提示",
        content: "<p>确定要删除该条记录吗?</p>",
        onOk: () => {
          this.loading(true);
          this.deleAdverList([item.id]).then(res => {
            this.loading(false);
            if (res.data.code == 200) {
              this.$Message.success("删除成功！");
            }
          });
        }
      });
    },
    //新建广告
    addAd() {
      this.isUpdata = false;
      this.isAdMessage = true;
    },
    //查询条件清空
    clear() {
      this.form = {};
    },
    //查询条件
    seekKuhu() {
      this.loading(true);
      this.setCurrerntPage(1);
      this.getAdverList(this.form).then(res => {
        this.loading(false);
      });
    },
    //多选框
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