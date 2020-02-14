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
          <span>一书一码</span>
        </li>
      </ul>
    </header>
    <section class="main-section">
      <div class="surplus">
        <div class="main-section-top">
          <div class="main-section-top-top">
            <Form :model="form" :label-width="80">
              <Row>
                <Col span="6">
                  <FormItem label="专题标题">
                    <Input v-model="form.book_name" placeholder="请输入专题标题"></Input>
                  </FormItem>
                </Col>
                <Col span="6">
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
                <Col span="6">
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
                <Col span="6">
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
                <button class="btn" @click="addAd">新建书籍</button>
                <Dropdown style="margin-left: 20px" @on-click="getSelect">
                  <Button type="primary">
                    排序
                    <Icon type="ios-arrow-down"></Icon>
                  </Button>
                </Dropdown>
              </div>
            </div>
            <Table border :columns="columns2" :data="data" @on-selection-change="selectionChange"></Table>
            <Page
              @on-change="pageChange"
              :total="total"
              :current="spCurrentPage"
              :page-size="pageSize"
              show-total
              show-elevator
              class="ive-page"
            />
          </div>
        </div>
      </div>
    </section>
    <BookMessage v-if="isBookMessage" :item="item" />
  </div>
</template>

<script>
import BookMessage from "../Special/BookMessage";
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  components: {
    BookMessage
  },
  mounted() {
    this.loading(true);
    this.getBookList({ page: 1 }).then(() => {
      this.loading(false);
      this.setCurrerntPage(1);
    });
  },
  computed: {
    ...mapState({
      data: state => state.bookcode.bookList,
      spCurrentPage: state => state.bookcode.currentPage,
      pageSize: state => state.bookcode.pageSize,
      total: state => state.bookcode.total
    })
  },
  data() {
    return {
      item: {},
      isUpdata: false,
      checkAll: [],
      isBookMessage: false,
      form: {},
      height: "height",
      columns2: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "书籍名称",
          key: "book_name",
          align: "center"
        },
        {
          title: "头图",
          key: "book_banner",
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
                src: "http://liveapi.canpoint.net/" + params.row.book_banner
              }
            });
          }
        },
        {
          title: "年级",
          key: "grade",
          align: "center"
        },
        {
          title: "科目",
          key: "subject",
          align: "view_num"
        },
        {
          title: "课节数",
          key: "promoter_account",
          align: "view_num"
        },
        {
          title: "推广数",
          key: "lesson_nums",
          align: "view_num"
        },
        {
          title: "创建时间",
          key: "create_time",
          align: "view_num"
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
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    ...mapActions(["getBookList"]),
    ...mapMutations(["setCurrerntPage"]),
    //排序
    getSelect(val) {
      this.loading(true);
      this.getSpecialList({ field: val }).then(() => {
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
    //分页
    pageChange(num) {
      this.loading(true);
      this.setCurrerntPage(num);
      this.getSpecialList({ page: num }).then(() => {
        this.loading(false);
      });
    },
    functionFun(val, params) {
      this.loading(true);
      this.setSpSwitch(params).then(() => {
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
            this.deleSpecialList(this.checkAll).then(res => {
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
      this.isBookMessage = true;
      if (item.status == 1) {
        item.status = 1;
      } else {
        item.status = 2;
      }
      this.item = { ...item };
    },
    //新建书籍
    addAd() {
      this.isUpdata = false;
      this.isBookMessage = true;
    },
    clear() {
      this.form = {};
    },
    seekKuhu() {
      this.loading(true);
      this.getBookList(this.form).then(() => {
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