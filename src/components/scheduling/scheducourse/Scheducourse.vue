<template>
  <div class="box" ref="box">
    <section class="main-section">
      <div class="surplus">
        <div class="main-section-bottom">
          <div class="contaner">
            <Form :model="form" :label-width="30">
              <Row>
                 <Col span="3">
                  <FormItem
                    <Input v-model="form.course_name" placeholder="课程名称" @on-change="seekClick"></Input>
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
                <Col span="4" style="text-indent: 60px">
                  <Button type="primary" @click="clear">清除</Button>
                </Col>
                <Col span="24">
                  <!-- <Button type="primary" @click="addCourse">创建课程</Button> -->
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
        </div>
      </div>
    </section>
    <Loading v-show="isLoading" />
    <Coursemessage :type="type" v-if="show"/>
  </div>
</template>

<script>
import Loading from "../../../uilt/loading/loading";
import storage from "../../../uilt/storage";
import Coursemessage from "./Cuorsemessage";
import { createNamespacedHelpers } from 'vuex'
const { mapState,mapMutations,mapActions } = createNamespacedHelpers('scheducourse')
export default {
  components: {
    Loading,
    Coursemessage
  },
  mounted() {
    this.isLoading = true;
    this.getCourseList({}).then(()=>{
      this.isLoading = false;
    })
  },
  computed: {
    ...mapState(['courseList','currentPage','pageSize','total'])
  },
  data() {
    return {
      courseType:storage.getDaiban().screen_list.course_type,
      isUpdate: false,
      endAccount: "",
      startAccount: "",
      showMine: false,
      endTime: "",
      startTime: "",
      channel: "",
      follow_status: "",
      subjectList: "",
      intention: "",
      stage: "",
      transfer: "",
      show: false,
      type: {},
      isLoading: false,
      form: {},
      columns: [
        { type: "selection", width: 60 },
        { title: "授课类型", key: "course_type_str",className:'activeTh'},
        { title: "课程名称", key: "course_name",
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
                    color:'#2d8cf0',
                    cursor: "pointer"
                  }
                },
                params.row.course_name
              )
            ]);
          }
         },
        { title: "课程类型", key: "class_type_str" },
        { title: "年级", key: "grade_str" },
        { title: "科目", key: "subject_str" },
        { title: "班主任", key: "header_name" },
        { title: "首节课日期", key: "start_date" },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            if(params.row.course_type ==1){
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
                ),
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
    ...mapActions([
      "getCourseList"
    ]),
    //班课添加学员
    addStudent(item){
      this.show = true
      this.type.classify = 'addStudents'
      this.type.form = this.form;
      this.type.page = this.currentPage;
      this.type.obj = item
    },
    //课程
    visit(item){
      this.type.classify = "createdCourse";
      this.show = true
      this.type.form = this.form;
      this.type.page = this.currentPage;
      this.type.obj = item
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
    // //教学数据
    // mathdata(item) {
    //   // this.getUserReservedList({uid:item.id})
    //   this.setNotifiTypes(item);
    //   this.showMine = true;
    //   this.type.classify = "audition";
    //   this.type.page = this.currentPage;
    //   this.type.form = this.form;
    //   this.type.data = { ...this.notifiTypes };
    // },
    // //结课
    // endcourse(item) {
    //   this.setNotifiTypes(item);
    //   this.show = true;
    //   this.type.classify = "followUp";
    //   this.type.page = this.currentPage;
    //   this.type.form = this.form;
    //   this.type.data = { ...this.notifiTypes };
    // },
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
        this.form.create_time_start = this.datePicker(this.startAccount);
        this.form.create_time_end = this.datePicker(this.startAccount);
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