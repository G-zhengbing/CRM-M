<template>
  <div class="createdOrder">
    <!-- <span class="btnSpan" @click="clickOrder">订单</span> -->
    <Modal
      v-model="modal5"
      title="选择课程"
      class-name="vertical-center-modal-1"
      width="80"
      @on-cancel="cancel"
      @on-ok="confirm"
    >
      <div class="content">
        <div class="title">
          <Form ref="formItem" :model="formItem" inline>
            <FormItem>
              <Select v-model="formItem.grade" placeholder="年级" style="width: 120px">
                <Option
                  :value="index"
                  v-for="(item,index) in selectState.grade"
                  :key="index"
                >{{item}}</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Select v-model="formItem.class_hour" placeholder="课时数" style="width: 100px">
                <Option value="1">1</Option>
                <Option value="10">10</Option>
                <Option value="30">30</Option>
                <Option value="50">50</Option>
                <Option value="100">100</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Select v-model="formItem.level" placeholder="课时包等级" style="width: 100px">
                <Option value="1">中级</Option>
                <Option value="2">高级</Option>
                <Option value="3">特级</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="deleteFormData" style="margin-left: 8px">清空</Button>
            </FormItem>
          </Form>
        </div>
        <div class="main">
          <Table
            height="300"
            @on-selection-change="selectItem"
            border
            :columns="columns"
            :data="dataLists"
          />
        </div>
        <div class="footers">
          <PagingBox
            :total="total"
            :per_page="per_page"
            :current_page="current_page"
            :last_page="last_page"
            @changePages="changePages"
          />
        </div>
      </div>
      <div slot="footer">
        <Button type="text" size="large" @click="cancel">取消</Button>
        <Button type="primary" size="large" @click="confirm">确定</Button>
      </div>
      <NewOrder v-if="modal" @closeBtn="closeBtn" :account_id="row.account_id" :Items="Items[0]" />
      <Loading v-show="isLoading" />
    </Modal>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { ORDERPRODUCT } from "@/uilt/url/url";
import qs from "qs";
import NewOrder from "./newOrder";
export default {
  props: {
    row: {
      type: [Object,String],
      required: false
    },
    showMod: {
      type: [Boolean,String],
      required: false
    }
  },
  computed: {
    ...mapState({
      selectState: state => state.selectState,
      dataList: state => state.currentPage.dataList
    })
  },
  components: {
    NewOrder
  },
  watch: {
    showMod(val) {
      this.modal5 = val;
    }
  },
  // TODO: 做条件查询，要接口
  data() {
    return {
      isLoading: false,
      modal5: this.showMod,
      modal: false,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "课程名称",
          key: "course_name",
          align: "left",
          width: 240
        },
        {
          title: "课程类型",
          key: "classType",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  props: {
                    type: "text",
                    size: "small"
                  }
                },
                "一对一"
              )
            ]);
          }
        },
        {
          title: "收费类型",
          key: "chargeType",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  props: {
                    type: "text",
                    size: "small"
                  }
                },
                "按课时"
              )
            ]);
          }
        },
        {
          title: "课时数",
          key: "class_hour",
          align: "center"
        },
        {
          title: "赠送课时",
          key: "give_class_hour",
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
          title: "课时总金额",
          key: "total_price",
          align: "center"
        }
      ],
      dataLists: [],
      mode: [], // 存放用户数据
      total: 100,
      per_page: 10,
      current_page: 1,
      last_page: 1,
      formItem: {
        grade: "",
        class_hour: "",
        level: "",
        page: 1
      },
      Items: [],
      changeShowMod: false
    };
  },
  watch: {
    formItem: {
      deep: true,
      handler(newName, oldName) {
        window.setTimeout(() => {
          this.getUserData();
        }, 200);
      }
    }
  },
  methods: {
    clickOrder() {
      this.modal5 = true;
    },
    // 关闭创建订单页面
    closeBtn(val) {
      this.modal = val;
      this.$emit("changeShowMod", false);
    },
    // 选择整行信息
    selectItem(selection) {
      this.Items = selection;
    },
    async getUserData() {
      this.isLoading = true;
      let res = await this.$request({
        method: "get",
        url: ORDERPRODUCT,
        params: {
          grade: this.formItem.grade,
          class_hour: this.formItem.class_hour,
          level: this.formItem.level,
          page: this.formItem.page
        }
      });
      this.dataLists = res.data.data.resources;
      this.total = res.data.data.links.total;
      this.per_page = res.data.data.links.per_page;
      this.current_page = res.data.data.links.current_page;
      this.last_page = res.data.data.links.last_page;
      this.isLoading = false;
    },
    // 改变页码
    changePages(val) {
      this.formItem.page = val;
    },
    // 点击确认回调
    confirm() {
      if (this.Items.length == 1) {
        this.modal = true;
      } else if (this.Items.length > 1) {
        this.$Message.error("只能选择一条数据");
      } else {
        this.$Message.error("未选择课程");
      }
        // this.$emit("changeShowMod", false);
    },
    // 点击取消回调 
    cancel() {
      // this.modal5 = true;
      this.$emit("changeShowMod", false);
      this.Items = [];
      this.formItem = {};
    },
    // 点击清除选项
    deleteFormData() {
      this.formItem = {};
    }
  },
  created() {
    this.getUserData();
  }
};
</script>

<style scoped>
.btnSpan {
  cursor: pointer;
}
.content {
  height: 450px;
  /* overflow: auto; */
}
.baseInformation {
  height: 400px;
}
.userMessage {
  height: 300px;
  margin-top: 20px;
  background: #f2f2f2;
}
.user-title {
  height: 40px;
  border-bottom: 1px solid #cccccc;
  box-sizing: border-box;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.user-content {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.user-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 20px;
  border-top: 1px solid #cccccc;
  padding: 10px 0;
}
</style>
<style>
.vertical-center-modal-1 {
  display: flex;
  align-items: center;
  justify-content: center;
}
.vertical-center-modal-1 .ivu-modal {
  top: 0;
}
</style>