<template>
  <div class="box" ref="box">
    <section class="main-section">
      <div class="surplus">
        <div class="main-section-bottom">
          <div class="contaner">
            <Form :model="form" :label-width="30">
              <Row>
                <Col span="3">
                  <FormItem>
                    <Input v-model="form.course_name" placeholder="课程名称" @on-change="seekClick"></Input>
                  </FormItem>
                </Col>
                <Col span="4">
                  <FormItem>
                    <Input v-model="form.student_name" @on-change="seekClick" placeholder="请输入学员名称"></Input>
                  </FormItem>
                </Col>
                <Col span="4">
                  <FormItem>
                    <Input v-model="form.mobile" @on-change="seekMobile" placeholder="请输入学员手机号"></Input>
                  </FormItem>
                </Col>
                <Col span="4">
                  <FormItem>
                    <Select @on-change="seekClick" v-model="form.grade" placeholder="请选择年级">
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
                    <Select v-model="form.subject" @on-change="seekClick" placeholder="请选择科目">
                      <Option :value="i" v-for="(list,i) in subjectList" :key="i">{{list}}</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="3">
                  <FormItem>
                    <Select v-model="form.course_type" @on-change="seekClick" placeholder="授课类型">
                      <Option :value="i" v-for="(list,i) in courseType" :key="i">{{list}}</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="3">
                  <FormItem>
                    <Select v-model="form.status" @on-change="seekClick" placeholder="课程状态">
                      <Option :value="1">待上课</Option>
                      <Option :value="2">上课中</Option>
                      <Option :value="3">已结束</Option>
                      <Option :value="4">已取消</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem>
                    <div class="dateplc">
                      <DatePicker
                        v-model="startAccount"
                        type="date"
                        placeholder="上课日期"
                        @on-change="getTimes"
                      ></DatePicker>
                      <DatePicker
                        v-model="endAccount"
                        type="date"
                        placeholder="上课日期"
                        @on-change="getTimes"
                      ></DatePicker>
                    </div>
                  </FormItem>
                </Col>
                <Col span="4" style="text-indent: 60px">
                  <Button type="primary" @click="clear">清除</Button>
                </Col>
              </Row>
            </Form>
            <Table border :columns="columns" :data="lessonsList"></Table>
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
    <Loading v-show="isLoading" />
    <Lessonsmessage :type="type" v-if="show" />
  </div>
</template>

<script>
import Loading from "../../../uilt/loading/loading";
import storage from "../../../uilt/storage";
import Lessonsmessage from "./Lessonsmessage";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  "schedulessons"
);
export default {
  components: {
    Loading,
    Lessonsmessage
  },
  mounted() {
    this.isLoading = true;
    this.getLessonsList({
      form: {
        lesson_time_start: this.datePicker(this.startAccount),
        lesson_time_end: this.datePicker(this.endAccount)
      }
    }).then(() => {
      this.isLoading = false;
    });
  },
  computed: {
    ...mapState(["lessonsList", "currentPage", "pageSize", "total"])
  },
  data() {
    return {
      subjectList: storage.getDaiban().screen_list.subject,
      courseType: storage.getDaiban().screen_list.course_type,
      startAccount: new Date(),
      endAccount: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      show: false,
      type: {},
      isLoading: false,
      form: {},
      columns: [
        { type: "selection", width: 60, fixed: "left" },
        { title: "课节名称", key: "lesson_name", width: "200", fixed: "left" },
        { title: "授课类型", key: "course_type", width: "100" },
        { title: "学员名称", key: "student_name", width: "100" },
        { title: "学员电话", key: "student_mobile", width: "130" },
        { title: "年级", key: "grade", width: "80" },
        { title: "科目", key: "subject", width: "80" },
        { title: "状态", key: "status", width: "80" },
        { title: "开课日期", key: "lesson_date", width: "110" },
        { title: "开课时间", key: "lesson_time", width: "160" },
        { title: "授课教师", key: "coach_name", width: "185" },
        // {
        //   title: "回放地址",
        //   key: "coach_name",
        //   width: "200",
        //   render: (h, params) => {
        //     return h("div", [
        //       h(
        //         "span",
        //         {
        //           on: {
        //             props: {
        //               type: "text",
        //               size: "small"
        //             },
        //             click: () => {
        //               this.goBank(params.row);
        //             }
        //           },
        //           style: {
        //             width: "100%",
        //             display: "inline-block",
        //             cursor: "pointer",
        //             color:'#2d8cf0'
        //           }
        //         },
        //         params.row.coach_name
        //       )
        //     ]);
        //   }
        // },
        { title: "创建时间", key: "create_time", width: "200" }
      ]
    };
  },
  methods: {
    ...mapMutations(["setCurrentPage"]),
    ...mapActions(["getLessonsList"]),
    //回放地址
    goBank(item){
      // console.log(window.open('https://www.baidu.com'))
    },
    //手机号
    seekMobile() {
      if (this.form.mobile.length >= 4) {
        this.seekClick();
      }
    },
    //编辑
    update(item) {
      this.isUpdate = true;
      this.type.classify = "createdCourse";
      this.type.form = this.form;
      this.type.page = this.currentPage;
      this.show = true;
    },
    //清空选线
    clear() {
      this.form = {};
      this.startAccount = "";
      this.endAccount = "";
      this.seekClick();
    },
    //查询
    seekClick() {
      let page = 1;
      let currentPage = this.currentPage;
      if (currentPage > 1) {
        this.setCurrentPage(page);
      }
      this.isLoading = true;
      this.getLessonsList({ form: this.form, page }).then(res => {
        this.isLoading = false;
        this.setCurrentPage(page);
      });
    },
    //分页
    pageChange(num) {
      this.isLoading = true;
      this.setCurrentPage(num);
      this.getLessonsList({ form: this.form }).then(res => {
        this.isLoading = false;
        this.setCurrentPage(num);
      });
    },
    //设置返回的时间
    datePicker(time) {
      var d = new Date(time);
      let shi = d.getHours();
      let fen = d.getMinutes();
      let miao = d.getSeconds();
      if (shi < 10) shi = "0" + shi;
      if (fen < 10) fen = "0" + fen;
      if (miao < 10) miao = "0" + miao;
      d = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      return d;
    },
    //操作日期
    getTimes() {
      if (this.startAccount && this.endAccount) {
        this.form.lesson_time_start = this.datePicker(this.startAccount);
        this.form.lesson_time_end = this.datePicker(this.endAccount);
        this.seekClick();
      }
    }
  }
};
</script>
<style scoped>
.dateplc {
  display: flex;
}
</style>