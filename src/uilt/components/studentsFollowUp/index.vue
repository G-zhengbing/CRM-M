<template>
  <div class="studentsFollowUp">
    <span class="btnSpan" @click="changeState">跟进</span>
    <Modal
      v-model="modal5"
      title="学员跟进"
      class-name="vertical-center-modal-1"
      width="70"
      @on-ok="confirm"
      @on-cancel="cancel"
    >
      <div class="content">
        <!-- 用户信息 -->
        <div class="userMessage">
          <Row class="row">
            <Col span="4">
              <span class="keyword">学员姓名</span>
              <span style="display: inherit;height:20px">{{titleList.student_name}}</span>
            </Col>
            <Col span="4">
              <span class="keyword">性别</span>
              <span>{{titleList.sex == 1 ? '男' : titleList.sex == 2 ? "女" : ""}}</span>
            </Col>
            <Col span="4">
              <span class="keyword">年级</span>
              <span>{{selectState.grade[titleList.grade]}}</span>
            </Col>
            <Col span="4">
              <span class="keyword">住址</span>
              <span>{{titleList.reside_address}}</span>
            </Col>
            <Col span="4">
              <span class="keyword">参加高考省份</span>
              <span>{{titleList.college_address}}</span>
            </Col>
            <Col span="4">
              <span class="keyword">教材版本</span>
              <span>{{titleList.textbook_version}}</span>
            </Col>
          </Row>
          <Row class="row">
            <Col span="4">
              <span class="keyword">注册手机</span>
              <span style="display: inherit;height:20px">{{titleList.mobile}}</span>
            </Col>
            <Col span="4">
              <span class="keyword">家长联系方式</span>
              <span>{{titleList.spare_phone}}</span>
            </Col>
            <Col span="4">
              <span class="keyword">微信号</span>
              <span>{{titleList.wechat_id}}</span>
            </Col>
            <Col span="4">
              <span class="keyword">家长微信号</span>
              <span>{{titleList.parent_wechat_id}}</span>
            </Col>
            <Col span="4">
              <span class="keyword">报名科目</span>
              <span>{{selectState.subject[titleList.subject]}}</span>
            </Col>
            <Col span="4">
              <span class="keyword">报名时间</span>
              <span>{{titleList.pay_time}}</span>
            </Col>
          </Row>
          <Row class="row">
            <Col span="4">
              <span class="keyword">报名班型</span>
              <span
                style="display: inherit;height:20px"
              >{{selectState.class_type[titleList.class_type]}}</span>
            </Col>
            <Col span="4">
              <span class="keyword">是否住校</span>
              <span>{{titleList.is_live == 1 ? "是" : "否"}}</span>
            </Col>
            <Col span="4">
              <span class="keyword">是否开课</span>
              <span>{{titleList.is_class_begins ? "未开课" : '开课'}}</span>
            </Col>
            <Col span="4">
              <span class="keyword">开课时间</span>
              <span>{{titleList.class_begins_time}}</span>
            </Col>
            <!-- <Col span="4">
              <span class="keyword">是否须入学测评</span>
              <span>{{titleList.textbook_version}}</span>
            </Col>-->
            <Col span="4">
              <span class="keyword">主讲老师</span>
              <span>{{titleList.lecturer}}</span>
            </Col>
          </Row>
          <Row class="row">
            <span class="keyword">备注</span>
            <span class="postscript">{{titleList.else_note}}</span>
          </Row>
        </div>
        <!-- 跟进情况 -->
        <div class="followUpSituation">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="呼出情况" prop="phone_status">
              <RadioGroup v-model="formValidate.phone_status">
                <Radio label="1">正常接听</Radio>
                <Radio label="2">无人接听</Radio>
                <Radio label="3">空号</Radio>
                <Radio label="4">挂断</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="回访内容" prop="visit_content">
              <Input
                v-model="formValidate.visit_content"
                type="textarea"
                :autosize="{minRows: 2,maxRows: 5}"
                placeholder="请输入本次回访内容"
              ></Input>
            </FormItem>
            <FormItem label="下次回访" prop="next_follow_time">
              <DatePicker
                v-model="formValidate.visitTime"
                type="datetime"
                :options="options3"
                format="yyyy-MM-dd HH:mm"
                placeholder="请选择日期"
                style="width: 200px"
                @on-change="changeDate"
              ></DatePicker>
            </FormItem>
          </Form>
        </div>
        <!-- 跟进记录 -->
        <div class="followUpRecords">
          <div class="title">
            <span>跟进记录</span>
          </div>
          <div class="FURollowContent">
            <Table :columns="FURColumns" :data="FURDataList"></Table>
          </div>
        </div>
        <!-- 订单记录 -->
        <div class="orderHistory">
          <div class="title">
            <span>订单记录</span>
          </div>
          <div class="OHollowContent">
            <Table :columns="OHColumns" :data="OHDataList"></Table>
          </div>
        </div>
      </div>
    </Modal>
    <Loading v-show="isLoading" />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { USERTRACK, GETACCOUNTSFOLLOW } from "@/uilt/url/url";
import qs from "qs";

export default {
  props: {
    row: {
      type: [Object, String],
      required: false
    },
    showMod: {
      type: [Boolean, String],
      required: false
    }
  },
  computed: {
    ...mapState({
      selectState: state => state.selectState,
      dataList: state => state.currentPage.dataList
    })
  },
  watch: {
    showMod(val) {
      this.modal5 = val;
    }
  },
  data() {
    return {
      // 不能点击今日以前的时间
      options3: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      isLoading: false,
      modal5: this.showMod,
      titleList: [],
      FURColumns: [
        {
          title: "回访内容",
          key: "visit_content",
          width: 500,
          className: "useBgc"
        },
        {
          title: "跟进人",
          key: "teacher_name",
          align: "center",
          className: "useBgc"
        },
        {
          title: "回访时间",
          key: "operation_time",
          width: 200,
          align: "center",
          className: "useBgc"
        }
      ],
      FURDataList: [],
      OHColumns: [
        {
          title: "课程类型",
          key: "type",
          align: "center",
          width: 150,
          className: "useBgc"
        },
        {
          title: " ",
          key: "",
          align: "center",
          width: 20,
          className: "useBgc"
        },
        {
          title: "购买课程",
          key: "course_name",
          align: "left",
          width: 400,
          className: "useBgc"
        },
        {
          title: "年级",
          key: "grade",
          align: "center",
          className: "useBgc"
        },
        {
          title: "科目",
          key: "subject",
          align: "center",
          className: "useBgc"
        },
        {
          title: "购买时间",
          key: "pay_time",
          align: "center",
          width: 200,
          className: "useBgc"
        }
      ],
      OHDataList: [
        {
          ClassType: "一对一",
          BuyClass: "初一数学一对一",
          grade: "七年级",
          subject: "数学",
          BuyTime: "2019-12-28 14:38:15"
        },
        {
          ClassType: "班课",
          BuyClass: "初一数学一对一",
          grade: "七年级",
          subject: "数学",
          BuyTime: "2019-12-28 14:38:15"
        }
      ],
      // 表单信息
      formValidate: {
        phone_status: "",
        visit_content: "",
        visitTime: ""
      },
      // 表单验证
      ruleValidate: {
        phone_status: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        visit_content: [
          {
            required: true,
            message: "请输入内容",
            trigger: "blur"
          }
        ],
        visitTime: [
          {
            required: true,
            type: "date",
            message: "请选择日期",
            trigger: "change"
          }
        ]
      },
      mode: []
    };
  },
  methods: {
    ...mapMutations(["setRefresh"]),
    // 转换日期格式
    changeDate(time) {
      this.formValidate.next_follow_time = time;
    },
    // 点击按钮切换显示状态
    changeState() {
      // 切换是否显示页面
      this.modal5 = true;
      this.getUserData();
      // 获取当前点击用户数据
    },
    // 点击确认回调，验证表单,不填写不让关
    confirm() {
      this.$refs["formValidate"]
        .validate(valid => {
          if (valid) {
            this.setUserData();
            this.$refs["formValidate"].resetFields();
            this.formValidate = {};
            this.$Message.success("成功!");
            this.setRefresh(true)
            this.$emit("changeShowMod", false);
          } else {
            this.$Message.error("请填写必选项!");
          }
        })
        .then(val => {
          if (!val) {
            return (this.modal5 = true);
          }
        });
    },
    // 点击取消回调，重置表单
    cancel() {
      this.$refs["formValidate"].resetFields();
      this.$emit("changeShowMod", false);
    },
    // 获取用户数据
    async setUserData() {
      // loading 开
      this.isLoading = true;
      //点击提交 拿到自己对应的用户 id
      this.formValidate.account_id = this.row.account_id;
      let res = await this.$request({
        method: "post",
        url: USERTRACK,
        data: qs.stringify(this.formValidate)
      });
      // 设置搜索选项，页码数     // 这个模块要在前面，否则后面无法渲染
      this.isLoading = false;
    },
    async getUserData() {
      this.mode.account_id = this.row.account_id;
      this.mode.order_id = this.row.order_id;
      let res = await this.$request({
        method: "post",
        url: GETACCOUNTSFOLLOW,
        data: qs.stringify(this.mode)
      });
      this.titleList = res.data.data.title_data;
      this.FURDataList = res.data.data.follow_data;
      this.OHDataList = res.data.data.order_data;
      this.OHDataList.map(item => {
        item.type = item.type == 4 ? "一对一" : "班课";
        item.grade = this.selectState.grade[item.grade];
        item.subject = this.selectState.subject[item.subject];
      });
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
/* 设置高度 */
.content {
  height: 600px;
  overflow: auto;
}
/* 设置用户信息关键字 */
.userMessage {
  margin-bottom: 30px;
}
.row {
  margin-bottom: 8px;
}
.keyword {
  color: #b4b4b4;
  display: block;
}
.postscript {
  display: block;
  background-color: #f2f2f2;
  padding: 10px;
  margin-top: 5px;
}
/* 设置title背景色 */
.content .title {
  height: 40px;
  line-height: 40px;
  background-color: #f2f2f2;
  padding-left: 20px;
}
/* 跟进记录 */
.followUpRecords {
  margin-bottom: 30px;
}
</style>

<style>
.useBgc {
  background-color: #fff !important;
}
.vertical-center-modal-1 {
  display: flex;
  align-items: center;
  justify-content: center;
}
.vertical-center-modal-1 .ivu-modal {
  top: 0;
}
</style>