<template>
  <div class="box">
    <Form :model="form">
      <Row  class-name="exclusive">
        <Col span="3">
          <FormItem>
            <Input @on-change="seekKuhu" v-model="form.book_name" placeholder="请输入书籍名称"></Input>
          </FormItem>
        </Col>
        <Col span="3">
          <FormItem>
            <Select @on-change="seekKuhu" v-model="form.subject" placeholder="请选择科目">
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
        <Col span="3">
          <FormItem>
            <Select @on-change="seekKuhu" v-model="form.grade" placeholder="请选择年级">
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
        <Col span="3">
          <DatePicker
            @on-change="getTime"
            v-model="time"
            type="daterange"
            placement="bottom-end"
            format="yyyy-MM-dd"
            placeholder="开始时间-结束时间"
            style="width: 200px"
          ></DatePicker>
          <br />
        </Col>
        <Col span="2">
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
        <button class="btn" @click="addAd">新建书籍</button>
      </div>
    </div>
    <Table
      hiheight-row
      ref="table"
      :height="tableHeight"
      border
      :columns="columns2"
      :data="data"
      @on-selection-change="selectionChange"
    ></Table>
    <Page
      @on-change="pageChange"
      :total="total"
      :current="spCurrentPage"
      :page-size="pageSize"
      show-total
      show-elevator
      class="ive-page"
    />
    <Message v-if="isBookMessage" :item="item" />
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
    this.getBookList({ page: 1 }).then(() => {
      this.loading(false);
      this.setCurrerntPage(1);
    });
    window.addEventListener("resize", this.changeFixed);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.changeFixed);
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
      tableHeight: 550,
      time: "",
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
              }
            });
          }
        },
        {
          title: "年级",
          key: "grade",
          width: "80px",
          align: "center"
        },
        {
          title: "科目",
          width: "80px",
          key: "subject",
          align: "center"
        },
        {
          title: "课节数",
          width: "80px",
          key: "course_count",
          align: "center"
        },
        {
          title: "扫码用户数",
          width: "80px",
          key: "scan_qrcode_user_count",
          align: "center"
        },
        {
          title: "扫码量",
          width: "80px",
          key: "scan_qrcode_count",
          align: "center"
        },
        {
          title: "详情页到达量",
          key: "join_details_count",
          width: "80px"
        },
        {
          title: "注册量",
          key: "register_user_count",
          width: "80px"
        },
        {
          title: "页面地址",
          key: "landing_page_url",
          width: "200px",
          align: "center"
        },
        {
          title: "创建时间",
          key: "create_time",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            if (params.row.is_publish == 1) {
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
                        this.isuue(params.row);
                      }
                    }
                  },
                  "发布"
                )
              ]);
            } else {
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
                  "span",
                  {
                    props: {
                      type: "text",
                      size: "small"
                    },
                    style: {
                      color: "#ccc"
                    }
                  },
                  "已发布"
                )
              ]);
            }
          }
        }
      ]
    };
  },
  methods: {
    ...mapActions(["getBookList", "deleBookList", "UpExtension"]),
    ...mapMutations(["setCurrerntPage"]),
    changeFixed() {
      this.tableHeight =
        window.innerHeight - this.$refs.table.$el.offsetTop - 15;
    },
    getTime() {
      this.form.create_start_time = this.time[0];
      this.form.create_end_time = this.time[1];
      this.seekKuhu();
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
    //发布
    isuue(item) {
      this.$Modal.confirm({
        title: "温馨提示",
        content: "<p>确定要进行发布操作吗?</p>",
        onOk: () => {
          this.loading(true);
          this.UpExtension(item.id).then(res => {
            if (res.data.ret) {
              this.$Message.success("发布成功");
            } else {
              this.$Message.error(res.data.error);
            }
            this.loading(false);
          });
        }
      });
    },
    //分页
    pageChange(num) {
      this.loading(true);
      this.setCurrerntPage(num);
      this.getBookList(this.form, { page: num }).then(() => {
        this.loading(false);
      });
    },
    //批量删除
    isDele() {
      if (this.checkAll.length >= 1) {
        this.$Modal.confirm({
          title: "温馨提示",
          content: "<p>确定要进行批量删除操作吗?</p>",
          onOk: () => {
            this.loading(true);
            this.deleBookList(this.checkAll).then(res => {
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
      this.time = "";
      this.loading(true);
      this.getBookList(this.form).then(() => {
        this.loading(false);
      });
    },
    seekKuhu() {
      let page = 1;
      this.loading(true);
      this.getBookList(this.form, page).then(() => {
        this.setCurrerntPage(page);
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