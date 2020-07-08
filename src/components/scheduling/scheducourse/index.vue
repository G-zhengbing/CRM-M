<template>
  <div>
    <div class="contaner">
      <Form :model="form" :label-width="20">
        <Row>
          <Col span="3">
            <FormItem>
              <Input v-model="form.course_name" placeholder="课程名称" @on-change="seekClick"></Input>
            </FormItem>
          </Col>
          <Col span="3">
            <FormItem>
              <Input v-model="form.student_name" @on-change="seekClick" placeholder="请输入学员名称"></Input>
            </FormItem>
          </Col>
          <Col span="3">
            <FormItem>
              <Input v-model="form.mobile" @on-change="seekMobile" placeholder="请输入学员手机号"></Input>
            </FormItem>
          </Col>
          <Col span="3">
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
          <Col span="3">
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
              <Select v-model="form.class_type" @on-change="seekClick" placeholder="课程类型">
                <Option :value="1">标准课</Option>
                <Option :value="2">公开课</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem>
              <div class="dateplc">
                <DatePicker
                  v-model="startAccount"
                  type="date"
                  placeholder="首次课日期"
                  @on-change="getTimes"
                ></DatePicker>
                <DatePicker
                  v-model="endAccount"
                  type="date"
                  placeholder="首次课日期"
                  @on-change="getTimes"
                ></DatePicker>
              </div>
            </FormItem>
          </Col>
          <Col span="2">
            <Button type="primary" @click="clear">清除</Button>
          </Col>
        </Row>
      </Form>
      <Table border :columns="columns" :data="courseList"></Table>
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

    <Loading v-show="isLoading" />
    <Message :type="type" v-if="show" />
  </div>
</template>

<script>
import Loading from "../../../uilt/loading/loading";
import storage from "../../../uilt/storage";
import Message from "./Message";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations, mapActions } = createNamespacedHelpers(
  "scheducourse"
);
export default {
  components: {
    Loading,
    Message
  },
  mounted() {
    this.isLoading = true;
    this.getCourseList({}).then(() => {
      this.isLoading = false;
    });
  },
  computed: {
    ...mapState(["courseList", "currentPage", "pageSize", "total"])
  },
  data() {
    return {
      subjectList: storage.getDaiban().screen_list.subject,
      courseType: storage.getDaiban().screen_list.course_type,
      isUpdate: false,
      endAccount: "",
      startAccount: "",
      showMine: false,
      endTime: "",
      startTime: "",
      channel: "",
      follow_status: "",
      intention: "",
      stage: "",
      transfer: "",
      show: false,
      type: {},
      isLoading: false,
      form: {},
      columns: [
        { type: "selection", width: 60 },
        { title: "授课类型", key: "course_type_str", className: "activeTh" },
        {
          title: "课程名称",
          key: "course_name",
          width: "250",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  on: {
                    props: {
                      type: "text",
                      size: "small"
                    },
                    click: () => {
                      this.visit(params.row);
                    }
                  },
                  style: {
                    color: "#2d8cf0",
                    cursor: "pointer"
                  },
                  class:'clickable'
                },
                params.row.course_name
              )
            ]);
          }
        },
        { title: "课程类型", key: "class_type_str" },
        { title: "学员姓名", key: "student_name" },
        { title: "手机号", key: "mobile", width: "125" },
        { title: "年级", key: "grade_str" },
        { title: "科目", key: "subject_str" },
        { title: "班主任", key: "header_name", width: "180" },
        { title: "首节课日期", key: "start_date", width: "120" },
        { title: "创建时间", key: "created_at", width: "170" },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            if (params.row.course_type == 1) {
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
                        this.addStudent(params.row);
                      }
                    }
                  },
                  "添加学员"
                )
                // h(
                //   "Button",
                //   {
                //     props: {
                //       type: "text",
                //       size: "small"
                //     },
                //     on: {
                //       click: () => {
                //         this.mathdata(params.row);
                //       }
                //     }
                //   },
                //   "教学数据"
                // ),
                // h(
                //   "Button",
                //   {
                //     props: {
                //       type: "text",
                //       size: "small"
                //     },
                //     on: {
                //       click: () => {
                //         this.endcourse(params.row);
                //       }
                //     }
                //   },
                //   "结课"
                // )
              ]);
            }
          }
        }
      ]
    };
  },
  methods: {
    ...mapMutations(["setCurrentpage"]),
    ...mapActions(["getCourseList"]),
    //手机号
    seekMobile(val) {
      if (this.form.mobile.length >= 4) {
        this.seekClick();
      }
    },
    //班课添加学员
    addStudent(item) {
      this.show = true;
      this.type.classify = "addStudents";
      this.type.form = this.form;
      this.type.page = this.currentPage;
      this.type.obj = item;
    },
    //课程
    visit(item) {
      this.type.classify = "createdCourse";
      this.show = true;
      this.type.form = this.form;
      this.type.page = this.currentPage;
      this.type.obj = item;
    },
    //创建课程
    addCourse() {
      this.isUpdate = false;
      this.type.classify = "addcourse";
      this.show = true;
    },
    //编辑
    update(item) {
      this.isUpdate = true;
      this.type.classify = "addcourse";
      this.type.form = this.form;
      this.type.page = this.currentPage;
      this.show = true;
    },
    //清空选线
    clear() {
      this.form = {};
      this.startTime = "";
      this.endTime = "";
      this.startAccount = "";
      this.endAccount = "";
      this.seekClick();
    },
    //查询
    seekClick() {
      let page = 1;
      let currentPage = this.currentPage;
      if (currentPage > 1) {
        this.setCurrentpage(page);
      }
      this.isLoading = true;
      this.getCourseList({ form: this.form, page }).then(res => {
        this.isLoading = false;
        this.setCurrentpage(page);
      });
    },
    //分页
    pageChange(num) {
      this.isLoading = true;
      this.setCurrentpage(num);
      this.getCourseList({ form: this.form }).then(res => {
        this.isLoading = false;
        this.setCurrentpage(num);
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
    //操作日期s
    getTimes() {
      if (this.startAccount && this.endAccount) {
        this.form.start_date_start = this.datePicker(this.startAccount);
        this.form.start_date_end = this.datePicker(this.startAccount);
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