<template>
  <div class="box">
    <!-- <Modal
      class="aaa"
      width="800"
      v-model="type.classify == 'addcourse'"
      :title="$parent.isUpdate? '编辑课程':'新增课程'"
      scrollable
      @on-ok="createdCourse"
      @on-cancel="$parent.show = false"
    >
      <Form :model="addcourseForm" :rules="ruleValidate" :label-width="80">
        <FormItem label="授课类型" prop="gender">
          <RadioGroup v-model="addcourseForm.gender">
            <Radio :label="1">班课</Radio>
            <Radio :label="2">一对一</Radio>
            <Radio :label="3">试听课</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="课程类型" prop="gender">
          <RadioGroup v-model="addcourseForm.gender">
            <Radio :label="1">标准课</Radio>
            <Radio :label="2">公开课</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="课程名称" prop="name">
          <Input v-model="addcourseForm.name" placeholder="请输入课程名称"></Input>
        </FormItem>
        <FormItem label="年级" prop="city">
          <Select v-model="addcourseForm.city" placeholder="请选择">
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
        <FormItem label="科目" prop="city">
          <Select v-model="addcourseForm.city" placeholder="请选择">
            <Option :value="i" v-for="(list,i) in subject" :key="i">{{list}}</Option>
          </Select>
        </FormItem>
        <FormItem label="课程封面展示" v-if="this.addcourseForm.assess_image">
          <div class="demo-upload-list">
            <img :src="'http://liveapi.canpoint.net/'+ addcourseForm.assess_image" />
            <div class="demo-upload-list-cover">
              <Icon
                type="ios-eye-outline"
                @click.native="handleView('http://liveapi.canpoint.net/'+addcourseForm.assess_image)"
              ></Icon>
            </div>
          </div>
          <Modal title="预览图" v-model="visible">
            <img :src="imgName" style="width: 100%" />
          </Modal>
        </FormItem>
        <FormItem label="课程封面" prop="avatar" class="active_span">
          <template>
            <div class="demo-upload-list" v-for="(item,i) in uploadList" :key="i">
              <img :src="item.url" />
              <div class="demo-upload-list-cover">
                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
              </div>
            </div>
          </template>
          <Upload
            ref="upload"
            :show-upload-list="false"
            :format="['jpg','gif','png']"
            :max-size="2048"
            :before-upload="handleBeforeUpload"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            type="drag"
            action="http://liveapi.canpoint.net/api/create_products"
            style="display: inline-block;width:58px;"
          >
            <div style="width: 58px;height:58px;line-height: 58px;">
              <Icon type="ios-camera" size="20"></Icon>
            </div>
          </Upload>
        </FormItem>
        <FormItem label="课程简介" prop="desc">
          <Input
            v-model="addcourseForm.desc"
            type="textarea"
            :autosize="{minRows: 3,maxRows: 5}"
            placeholder="请输入课程简介"
          ></Input>
        </FormItem>
        <FormItem label="班主任" prop="city">
          <Select v-model="addcourseForm.city" placeholder="请选择">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>
        <FormItem label="课程有效期">
          <FormItem prop="date">
            <DatePicker type="date" placeholder="请选择" v-model="addcourseForm.date"></DatePicker>
          </FormItem>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="$parent.show = false">取消</Button>
        <Button :loading="disableBtn" type="primary" size="large" @click="handleSubmit">确定</Button>
      </div>
    </Modal>--
    <!-- 一对一编辑-->
    <Modal width="900" v-model="updateLessons" @on-cancel="updateLessons = false" title="编辑">
      <Form v-if="updateLessons" :model="updateLessonsForm" :label-width="80">
        <FormItem label="时间">
          <span class="required" style="margin-left:30px;"></span>
          <Select v-model="updateLessonsForm.start_time" style="width:150px">
            <Option :value="list" v-for="(list,i) in timeNum" :key="i">{{list}}</Option>
          </Select>
        </FormItem>
        <FormItem label="日期">
          <span class="required" style="margin-left:30px;"></span>
          <DatePicker
            v-model="updateLessonsForm.lesson_date"
            type="date"
            placeholder="请选择"
            @on-change="setDate"
          ></DatePicker>
        </FormItem>
        <FormItem label="授课教师">
          <span class="required"></span>
          <Select
            v-model="updateLessonsForm.coach_id"
            placeholder="请选择"
            filterable
            style="width:250px"
          >
            <Option :value="list.id" v-for="(list,i) in lessonsTeacherList" :key="i">{{list.name}}</Option>
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="updateLessons = false">取消</Button>
        <Button
          :loading="updateLessonsLoading"
          type="primary"
          size="large"
          @click="updateLessonsList"
        >确定</Button>
      </div>
    </Modal>
    <!-- 班课添加学员 -->
    <Modal
      width="900"
      v-model="type.classify == 'addStudents'|| showStudent"
      @on-cancel="showStudent? showStudent = false: $parent.show = false"
      title="添加学员"
    >
      <Form
        v-if="type.classify == 'addStudents'|| showStudent"
        :model="lessonsStudentForm"
        :label-width="40"
      >
        <Row>
          <Col span="8">
            <FormItem style="width:230px;">
              <Input
                v-model="lessonsStudentForm.student_name"
                placeholder="学员姓名"
                @on-change="seekKuhu"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem style="width:230px;">
              <Input v-model="lessonsStudentForm.mobile" placeholder="手机号" @on-change="seekKuhu"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <Button type="text" size="large" @click="clear">清空</Button>
          </Col>
        </Row>
        <Table
          @on-selection-change="getCheckAll"
          :loading="lessonsStudentLoading"
          border
          :columns="studentColumns"
          :data="lessonsStudent"
        ></Table>
        <Page
          @on-change="studentChangePage"
          :total="studentTotal"
          :current="studentCurrentpage"
          :page-size="studentPagesize"
          show-total
          show-elevator
          class="ive-page"
        />
      </Form>
      <div slot="footer">
        <Button v-if="showStudent" type="text" size="large" @click="showStudent = false">取消</Button>
        <Button v-else type="text" size="large" @click="$parent.show = false">取消</Button>
        <Button
          :loading="studentDisableBtn"
          type="primary"
          size="large"
          @click="addCourseStudent"
        >确定</Button>
      </div>
    </Modal>
    <!-- 一对一添加课节 -->
    <Modal
      fullscreen
      v-model="showLessons"
      title="添加课节"
      @on-cancel="showLessons = false"
      class-name="vertical-center-modal"
    >
      <Form
        v-if="showLessons"
        ref="formValidate"
        :model="addLessonsForm"
        :rules="lessonsRuleValidate"
        :label-width="80"
      >
        <FormItem label="课节名称" prop="lesson_name">
          <Input v-model="addLessonsForm.lesson_name" placeholder="课节名称" style="width:200px"></Input>
        </FormItem>
        <FormItem label="课程卡" prop="card_id" style="width:400px">
          <Select v-model="addLessonsForm.card_id" placeholder="请选择">
            <Option
              :value="list.id"
              v-for="(list,i) in lessonsCourseCard"
              :key="i"
            >{{list.card_name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="周数量" prop="times">
          <Input v-model="addLessonsForm.times" placeholder="请输入课节数" style="width:200px"></Input>
        </FormItem>
        <FormItem label="开课日期" prop="start_date">
          <span class="required"></span>
          <DatePicker type="date" placeholder="请选择" @on-change="getTimes"></DatePicker>
        </FormItem>
        <FormItem label="授课教师" prop="coach_id">
          <Select v-model="addLessonsForm.coach_id" placeholder="请选择" style="width:200px">
            <Option :value="list.id" v-for="(list,i) in lessonsTeacherList" :key="i">{{list.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="每周规律">
          <span class="required"></span>
          <div class="content">
            <div class="content-left">
              <ul>
                <li>-</li>
                <li>07:00 - 07:30</li>
                <li>07:30 - 08:00</li>
                <li>08:00 - 08:30</li>
                <li>08:30 - 09:00</li>
                <li>09:00 - 09:30</li>
                <li>09:30 - 10:00</li>
                <li>10:00 - 10:30</li>
                <li>10:30 - 11:00</li>
                <li>11:00 - 11:30</li>
                <li>11:30 - 12:00</li>
                <li>12:00 - 12:30</li>
                <li>12:30 - 13:00</li>
                <li>13:00 - 13:30</li>
                <li>13:30 - 14:00</li>
                <li>14:00 - 14:30</li>
                <li>14:30 - 15:00</li>
                <li>15:00 - 15:30</li>
                <li>15:30 - 16:00</li>
                <li>16:00 - 16:30</li>
                <li>16:30 - 17:00</li>
                <li>17:00 - 17:30</li>
                <li>17:30 - 18:00</li>
                <li>18:00 - 18:30</li>
                <li>18:30 - 19:00</li>
                <li>19:00 - 19:30</li>
                <li>19:30 - 20:00</li>
                <li>20:00 - 20:30</li>
                <li>20:30 - 21:00</li>
                <li>21:00 - 21:30</li>
                <li>21:30 - 22:00</li>
                <li>22:00 - 22:30</li>
                <li>22:30 - 23:00</li>
                <li>23:00 - 23:30</li>
              </ul>
            </div>
            <div class="content-right">
              <ul class="content-right-header">
                <li>一</li>
                <li>二</li>
                <li>三</li>
                <li>四</li>
                <li>五</li>
                <li>六</li>
                <li>日</li>
              </ul>
              <div class="content-right-footer">
                <ul>
                  <li
                    v-for="(k,i) in num"
                    :key="i"
                    :class="{active:timeBlock(k-1) == 'ok'}"
                    @click="getNum(i,$event)"
                    v-if="k> 14 && k < 48"
                  ></li>
                </ul>
                <ul>
                  <li
                    :class="{active:timeBlock(k-1) == 'ok',hidden:k<63 || k>95}"
                    @click="getNum(i,$event)"
                    v-for="(k,i) in num*2"
                    v-if=" k > num"
                    :key="i"
                  ></li>
                </ul>
                <ul>
                  <li
                    :class="{active:timeBlock(k-1) == 'ok',hidden:k<111 || k>143}"
                    @click="getNum(i,$event)"
                    v-for="(k,i) in num*3"
                    v-if=" k > num*2"
                    :key="i"
                  ></li>
                </ul>
                <ul>
                  <li
                    :class="{active:timeBlock(k-1) == 'ok',hidden:k<159 || k > 191}"
                    @click="getNum(i,$event)"
                    v-for="(k,i) in num*4"
                    v-if=" k > num*3"
                    :key="i"
                  ></li>
                </ul>
                <ul>
                  <li
                    :class="{active:timeBlock(k-1) == 'ok',hidden:k<207 || k > 239}"
                    @click="getNum(i,$event)"
                    v-for="(k,i) in num*5"
                    v-if=" k > num*4"
                    :key="i"
                  ></li>
                </ul>
                <ul>
                  <li
                    :class="{active:timeBlock(k-1) == 'ok',hidden:k<255 || k > 287}"
                    @click="getNum(i,$event)"
                    v-for="(k,i) in num*6"
                    v-if=" k > num*5"
                    :key="i"
                  ></li>
                </ul>
                <ul>
                  <li
                    :class="{active:timeBlock(k-1) == 'ok',hidden:k<303  || k > 335}"
                    @click="getNum(i,$event)"
                    v-for="(k,i) in num*7"
                    v-if=" k > num*6"
                    :key="i"
                  ></li>
                </ul>
              </div>
            </div>
          </div>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="showLessons = false">取消</Button>
        <Button
          :loading="lessonsDisableBtn"
          type="primary"
          size="large"
          @click="addLessons('formValidate')"
        >确定</Button>
      </div>
    </Modal>
    <!-- 课节列表，课程信息 -->
    <Modal
      fullscreen
      v-model="type.classify == 'createdCourse'"
      title="课节信息"
      @on-ok="createdCourse"
      @on-cancel="$parent.show = false"
    >
      <ul class="tabs">
        <li @click="tab(1)" :class="[tabs == 1? 'active' : '']">
          <span>课程信息</span>
        </li>
        <li @click="tab(2)" :class="[tabs == 2? 'active' : '']">
          <span>课节信息</span>
        </li>
      </ul>
      <Form v-if="tabs == 1" :model="type.obj" :label-width="80">
        <FormItem label="授课类型">
          <RadioGroup v-model="type.obj.course_type">
            <Radio :label="1">班课</Radio>
            <Radio :label="4">一对一</Radio>
            <Radio :label="5">试听课</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="课程类型">
          <RadioGroup v-model="type.obj.class_type">
            <Radio :label="1">标准课</Radio>
            <Radio :label="2">公开课</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="课程名称">
          <Input v-model="type.obj.course_name" placeholder="课程名称"></Input>
        </FormItem>
        <FormItem label="年级">
          <Select v-model="type.obj.grade" placeholder="请选择">
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
        <FormItem label="科目">
          <Select v-model="type.obj.subject" placeholder="请选择">
            <Option :value="i*1" v-for="(list,i) in subject" :key="i">{{list}}</Option>
          </Select>
        </FormItem>
        <!-- <FormItem label="课程封面展示" v-if="this.type.obj.course_pic">
          <div class="demo-upload-list">
            <img :src="'http://liveapi.canpoint.net/'+ type.obj.course_pic" />
            <div class="demo-upload-list-cover">
              <Icon
                type="ios-eye-outline"
                @click.native="handleView('http://liveapi.canpoint.net/'+type.obj.course_pic)"
              ></Icon>
            </div>
          </div>
          <Modal title="预览图" v-model="visible">
            <img :src="type.obj.course_pic" style="width: 100%" />
          </Modal>
        </FormItem>
        <FormItem label="课程封面" class="active_span">
          <template>
            <img :src="type.obj.course_pic" />
            <div class="demo-upload-list-cover">
              <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
            </div>
          </template>
        </FormItem>-->
        <FormItem label="课程简介">
          <Input
            v-model="type.obj.course_desc"
            type="textarea"
            :autosize="{minRows: 3,maxRows: 5}"
            placeholder="请输入课程简介"
          ></Input>
        </FormItem>
        <FormItem label="班主任">
          <Select v-model="type.obj.header_id" placeholder="请选择">
            <Option :value="list.id" v-for="(list,i) in header_list" :key="i">{{list.login_name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="课程有效期">
          <FormItem>
            <DatePicker type="date" placeholder="请选择" v-model="type.obj.valid_date"></DatePicker>
          </FormItem>
        </FormItem>
      </Form>
      <Form v-if="tabs == 2 && type.classify == 'createdCourse'">
        <div class="cuorse">
          <Button
            v-if="type.obj.course_type == 4"
            style="width:120px;height:30px"
            type="primary"
            size="large"
            @click="addLessonsList"
          >添加课节</Button>
          <div>
            <Input
              style="width:200px"
              v-model="lessonsForm.lesson_name"
              @on-change="seek"
              placeholder="请输入课程名称"
            ></Input>
            <Button @click="clearLessonsForm" style="width:120px" type="text" size="large">清空选项</Button>
          </div>
          <Table :loading="lessonsLoading" border :columns="columns" :data="lessonsList"></Table>
          <Page
            @on-change="pageChange"
            :total="lessonsTotal"
            :current="lessonsCurrentpage"
            :page-size="lessonsPagesize"
            show-total
            show-elevator
            class="ive-page"
          />
        </div>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="$parent.show = false">取消</Button>
        <Button :loading="disableBtn" type="primary" size="large" @click="$parent.show = false">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import storage from "../../../uilt/storage";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations, mapActions } = createNamespacedHelpers(
  "scheducourse"
);
export default {
  props: ["type"],
  watch: {
    updateLessons(v, k) {
      if (v) {
        this.$store.dispatch(
          "schedustudent/getTeacherList",
          { type: 4 },
          { root: true }
        );
      } else {
        this.updateLessonsForm = {};
      }
    },
    showStudent(v, k) {
      if (!v) {
        this.lessonsStudentForm = {};
      }
    },
    showLessons(v, k) {
      if (v) {
        this.$store.dispatch(
          "schedustudent/getTeacherList",
          { type: 4 },
          {
            root: true
          }
        ),
          this.$store.dispatch(
            "schedustudent/getCoursecard",
            this.type.obj.account_id,
            {
              root: true
            }
          );
      } else {
        this.addLessonsForm = {};
        this.acArr.length = 0;
      }
    }
  },
  mounted() {
    if (this.type.classify == "addStudents") {
      this.getlessonsStudent({});
    }
    if (this.type.classify == "createdCourse") {
      this.lessonsLoading = true;
      this.getLessonsList({
        uid: this.type.obj.id
      }).then(() => {
        this.lessonsLoading = false;
      });
    }
  },
  computed: {
    ...mapState([
      "studentCurrentpage",
      "studentPagesize",
      "studentTotal",
      "lessonsCourseCard",
      "lessonsStudent",
      "lessonsTeacherList",
      "lessonsList",
      "lessonsCurrentpage",
      "lessonsPagesize",
      "lessonsTotal"
    ])
  },
  data() {
    return {
      updateLessonsLoading: false,
      timeNum: [],
      updateLessons: false,
      updateLessonsForm: {},
      lessonsStudentLoading: false,
      lessonsStudentForm: {},
      lessonsStudentUid: "",
      studentDisableBtn: false,
      studentForm: {},
      showStudent: false,
      lessonsRuleValidate: {
        lesson_name: [
          {
            required: true,
            message: "课节名称是必填的",
            trigger: "blur"
          }
        ],
        card_id: [
          {
            required: true,
            message: "课程卡是必选的"
          }
        ],
        times: [
          {
            required: true,
            message: "周数量是必填的",
            trigger: "blur"
          }
        ],
        coach_id: [
          {
            required: true,
            message: "授课教师是必选的"
          }
        ]
      },
      num: 48,
      setActive: [],
      showLessons: false,
      showTimeBlock: false,
      acArr: [],
      addLessonsForm: {},
      lessonsForm: {},
      header_list: storage.getDaiban().header_list,
      lessonsLoading: false,
      addcourseForm: {},
      tabs: 2,
      imgName: "",
      uploadList: [],
      disableBtn: false,
      lessonsDisableBtn: false,
      subject: storage.getDaiban().screen_list.subject,
      createdcourseForm: {},
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        mail: [
          {
            required: true,
            message: "Mailbox cannot be empty",
            trigger: "blur"
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" }
        ],
        city: [
          {
            required: true,
            message: "Please select the city",
            trigger: "change"
          }
        ],
        gender: [
          { required: true, message: "Please select gender", trigger: "change" }
        ],
        interest: [
          {
            required: true,
            type: "array",
            min: 1,
            message: "Choose at least one hobby",
            trigger: "change"
          },
          {
            type: "array",
            max: 2,
            message: "Choose two hobbies at best",
            trigger: "change"
          }
        ],
        date: [
          {
            required: true,
            type: "date",
            message: "Please select the date",
            trigger: "change"
          }
        ],
        time: [
          {
            required: true,
            type: "string",
            message: "Please select time",
            trigger: "change"
          }
        ],
        desc: [
          {
            required: true,
            message: "Please enter a personal introduction",
            trigger: "blur"
          },
          {
            type: "string",
            min: 20,
            message: "Introduce no less than 20 words",
            trigger: "blur"
          }
        ]
      },
      columns: [
        { type: "index", width: 60 ,fixed:'left'},
        { title: "课节名称", key: "lesson_name", width: "170",fixed:'left' },
        { title: "授课类型", key: "course_type", width: "95" },
        {
          title: "学员姓名",
          key: "student_name",
          width: "95"
        },
        { title: "学员手机号", key: "student_mobile", width: "130" },
        { title: "年级", key: "grade", width: "100" },
        { title: "科目", key: "subject", width: "70" },
        { title: "状态", key: "status", width: "80" },
        { title: "上课日期", key: "lesson_date", width: "110" },
        { title: "上课时间", key: "lesson_time", width: "150" },
        {
          title: "学员数量",
          key: "student_num",
          className: "selects",
          width: "95",
          // render: (h, params) => {
          //   if (params.row.student_list.length != 0) {
          //     return h("div", [
          //       h(
          //         "ul",
          //         { props: { trigger: "hover", placement: "right-start" } },
          //         [
          //           params.row.student_list.map(i => {
          //             return h("li", i.student_name + "/" + i.mobile);
          //           })
          //         ]
          //       ),
          //       params.row.student_num
          //     ]);
          //   } else {
          //     return h("div", [
          //       h(
          //         "ul",
          //         { props: { trigger: "hover", placement: "right-start" } }
          //         // [
          //         //   params.row.student_list.map(i => {
          //         //     return h("li", i.student_name + "/" + i.mobile);
          //         //   })
          //         // ]
          //       ),
          //       params.row.student_num
          //     ]);
          //   }
          // }
          render: (h, params) => {
            return h("div", [
              h(
                "Tooltip",
                {
                  props: {
                    placement: "top",
                    transfer: true
                  }
                },
                [
                  params.row.student_num,
                  params.row.student_list.map(i => {
                    return h(
                      "p",
                      {
                        slot: "content",
                        style: {
                          whiteSpace: "normal"
                        }
                      },
                      i.student_name + "/" + i.mobile
                    );
                  })
                ]
              )
            ]);
          }
        },
        {
          title: "回放地址",
          key: "coach_name",
          width: "100",
          render: (h, params) => {
            if (params.row.is_show == 1) {
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
                        this.goBank(params.row);
                      }
                    },
                    style: {
                      width: "100%",
                      display: "inline-block",
                      cursor: "pointer",
                      color: "#2d8cf0"
                    }
                  },
                 '直播/回放'
                )
              ]);
            } else {
              return h("div", [
                h(
                  "span",
                  {
                    on: {
                      props: {
                        type: "text",
                        size: "small"
                      }
                    },
                    style: {
                      width: "100%",
                      display: "inline-block",
                      cursor: "pointer",
                      color: "#ccc"
                    }
                  },
                  '直播/回放'
                )
              ]);
            }
          }
        },
        { title: "授课教师", key: "coach_name", width: "180" },
        { title: "创建时间", key: "create_time", width: "170" },
        {
          title: "操作",
          key: "action",
          align: "center",
          width:'100',
          render: (h, params) => {
            if (this.type.obj.course_type == 1) {
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
              ]);
            } else if (this.type.obj.course_type == 4) {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "text",
                      size: "small",
                      disabled: params.row.status == "已取消" ? true : false
                    },
                    on: {
                      click: () => {
                        this.update(params.row);
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
                      size: "small",
                      disabled: params.row.status == "已取消" ? true : false
                    },
                    on: {
                      click: () => {
                        this.cancel(params.row);
                      }
                    }
                  },
                  "取消课节"
                )
              ]);
            } else if (this.type.obj.course_type == 5) {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "text",
                      size: "small",
                      disabled: params.row.status == "已取消" ? true : false
                    },
                    on: {
                      click: () => {
                        this.cancelAudition(params.row);
                      }
                    }
                  },
                  "取消"
                )
              ]);
            }
          }
        }
      ],
      studentColumns: [
        { type: "selection", width: 60 },
        { title: "学生姓名", key: "student_name" },
        { title: "手机号", key: "mobile" }
      ]
    };
  },
  methods: {
    ...mapMutations([
      "setLessonscurrentpage",
      "getCourseList",
      "setStudentCurrentpage"
    ]),
    ...mapActions([
      "cancelLesson",
      "updateLesson",
      "addLessonsStudent",
      "getLessonsList",
      "setCreatedlessons",
      "getlessonsStudent",
      "addCourseStudents"
    ]),
    //回放地址
    goBank(item) {
      window.open(item.web_cast)
    },
    //预约课取消
    cancelAudition(item) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确定要取消该课节吗？</p>",
        onOk: () => {
          this.lessonsLoading = true;
          this.cancelLesson({ uid: item.id }).then(res => {
            if (res.data.ret) {
              this.$Message.success("取消成功");
            } else {
              this.$Message.error(res.data.error);
            }
            this.getLessonsList({
              uid: this.type.obj.id,
              page: this.lessonsCurrentpage,
              form: this.lessonsForm
            });
            this.lessonsLoading = false;
          });
        }
      });
    },
    //取消一对一课节
    cancel(item) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确定要取消该课节吗？</p>",
        onOk: () => {
          this.lessonsLoading = true;
          this.cancelLesson({ uid: item.id }).then(res => {
            if (res.data.ret) {
              this.$Message.success("取消成功");
            } else {
              this.$Message.error(res.data.error);
            }
            this.getLessonsList({
              uid: this.type.obj.id,
              page: this.lessonsCurrentpage,
              form: this.lessonsForm
            });
            this.lessonsLoading = false;
          });
        }
      });
    },
    //修改一对一课节
    updateLessonsList() {
      if (!this.updateLessonsForm.lesson_date) {
        this.$Message.error("时间是必选的");
        return;
      } else if (!this.updateLessonsForm.start_time) {
        this.$Message.error("日期是必选的");
        return;
      } else if (!this.updateLessonsForm.coach_id) {
        this.$Message.error("授课教师必选的");
        return;
      }
      this.updateLessonsLoading = true;
      this.updateLesson({ form: this.updateLessonsForm }).then(res => {
        if (res.data.ret) {
          this.$Message.success("修改成功");
        } else {
          this.$Message.error(res.data.error);
        }
        this.getLessonsList({
          uid: this.type.obj.id,
          page: this.lessonsCurrentpage,
          form: this.lessonsForm
        });
        this.updateLessons = false;
        this.updateLessonsLoading = false;
      });
    },
    //设置年月日
    setDate(date) {
      this.updateLessonsForm.lesson_date = date;
    },
    //计算时间段
    getTimeBlock() {
      var start = "";
      var end = "";
      var b = 7;
      for (var i = 1; i < 35; i++) {
        if (i % 2 == 0) {
          start = b + ":" + "30";
          b++;
          end = b + ":" + "00";
          this.timeNum.push(start);
        } else {
          start = b + ":" + "00";
          end = b + ":" + "30";
          this.timeNum.push(start);
        }
      }
    },
    //一对一修改课节
    update(item) {
      this.getTimeBlock();
      if (item.start_time.split(":")[0].split("")[0] == "0") {
        this.updateLessonsForm.start_time =
          item.start_time.split(":")[0].split("")[1] +
          ":" +
          item.start_time.split(":")[1];
      } else {
        this.updateLessonsForm.start_time = item.start_time;
      }
      this.updateLessonsForm.uid = item.id;
      this.updateLessonsForm.coach_id = item.coach_id;
      this.updateLessonsForm.lesson_date = item.lesson_date;
      this.updateLessons = true;
    },
    //班课添加学员查询
    seekKuhu() {
      this.lessonsStudentLoading = true;
      this.getlessonsStudent({ form: this.lessonsStudentForm }).then(() => {
        this.lessonsStudentLoading = false;
        this.setLessonscurrentpage(1);
      });
    },
    //班课添加学员清空
    clear() {
      this.lessonsStudentForm = {};
      this.lessonsStudentLoading = true;
      this.getlessonsStudent({}).then(() => {
        this.lessonsStudentLoading = false;
      });
    },
    //班课添加学员多选反选
    getCheckAll(item) {
      let arr = [];
      for (var i = 0; i < item.length; i++) {
        arr.push(item[i].id);
      }
      this.studentForm.account_ids = arr;
    },
    //班课添加学员分页
    studentChangePage(num) {
      this.lessonsStudentLoading = true;
      this.setStudentCurrentpage(num);
      this.getlessonsStudent({
        page: num,
        form: this.lessonsStudentForm
      }).then(res => {
        this.lessonsStudentLoading = false;
        this.setStudentCurrentpage(num);
      });
    },
    //添加班课课节学员
    addStudent(item) {
      this.showStudent = true;
      this.lessonsStudentUid = item.id;
    },
    //添加班课学员
    addCourseStudent() {
      this.studentDisableBtn = true;
      if (this.showStudent) {
        this.addLessonsStudent({
          uid: this.lessonsStudentUid,
          form: this.studentForm,
          cid: this.type.obj.id,
          page: this.lessonsCurrentpage,
          parentForm: this.lessonsForm
        }).then(res => {
          this.studentDisableBtn = false;
          if (!res.data.ret) {
            this.$Message.error("添加失败");
            return;
          } else {
            this.$Message.success("添加学员成功");
          }
          this.showStudent = false;
        });
      } else {
        this.addCourseStudents({
          uid: this.type.obj.id,
          form: this.studentForm,
          page: this.type.page,
          parentForm: this.type.form
        }).then(res => {
          this.studentDisableBtn = false;
          if (!res.data.ret) {
            this.$Message.error(res.data.error);
            return;
          } else {
            this.$Message.success("添加学员成功");
          }
          this.$parent.show = false;
        });
      }
    },
    timeBlock(value) {
      if (this.setActive.indexOf(value) > -1) {
        return "ok";
      } else {
        return "no";
      }
    },
    //一对一添加课程
    addLessonsList() {
      this.showLessons = true;
    },
    //一对一添加课节
    addLessons(name) {
      var arr = [];
      for (var i = 0; i < this.acArr.length; i++) {
        arr.push(this.acArr[i] + "/" + (this.acArr[i] + 1));
      }
      this.$refs[name].validate(valid => {
        if (valid) {
          this.lessonsDisableBtn = true;
          if (arr.length == 0) {
            this.$Message.error("每周规律是必选的");
            return;
          }
          if (!this.addLessonsForm.start_date) {
            this.$Message.error("开课日期不能为空");
            return;
          }
          this.addLessonsForm.schedule_id = this.type.obj.id;
          this.addLessonsForm.times_block = arr.join(",");
          this.setCreatedlessons({ form: this.addLessonsForm }).then(res => {
            this.lessonsDisableBtn = false;
            if (!res.data.ret) {
              this.$Message.error(res.data.error);
              return;
            } else if (res.data.data.lesson.class) {
              this.$Message.error(res.data.data.lesson.class + " 课程时间冲突");
              return;
            } else if (res.data.data.lesson.coach) {
              this.$Message.error(res.data.data.lesson.coach + " 老师时间冲突");
              return;
            } else {
              this.$Message.success("添加课节成功");
              this.showLessons = false;
              this.lessonsLoading = true;
              this.getLessonsList({
                uid: this.type.obj.id,
                page: this.lessonsCurrentpage,
                form: this.lessonsForm
              }).then(() => {
                this.lessonsLoading = false;
              });
            }
          });
        }
      });
    },
    //点击时间块失去光标
    loseFocus() {
      this.showTimeBlock = false;
      this.addLessonsForm.times_block = this.acArr;
    },
    //点击时间块获取焦点
    getFocus() {
      this.showTimeBlock = true;
    },
    //获取当前时间块
    getNum(num, e) {
      var arr = this.acArr;
      e.path[0].className = "active";
      if (e.target.nextSibling == null) {
        this.$Message.error("当前时间块不可选");
        e.path[0].className = " ";
        return;
      } else {
        if (e.target.nextSibling.className == "active") {
          this.$Message.error("当前时间块不可重叠");
          e.path[0].className = " ";
          return;
        }
      }
      if (e.target.nextSibling) {
        e.target.nextSibling.className = "actives";
      } else {
        this.$Message.error("当前时间块不可选");
        e.path[0].className = " ";
        return;
      }
      if (arr.indexOf(num) > -1) {
        arr.splice(arr.indexOf(num), 1);
        e.path[0].className = " ";
        // e.target.previousSibling.className = " ";
        e.target.nextSibling.className = " ";
      } else {
        arr.push(num);
      }
    },
    getTimes(value) {
      this.addLessonsForm.start_date = this.datePicker(value);
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
    //清空筛选
    clearLessonsForm() {
      this.lessonsForm = {};
      this.lessonsLoading = true;
      this.getLessonsList({ uid: this.type.obj.id }).then(() => {
        this.lessonsLoading = false;
      });
    },
    //筛选
    seek() {
      this.lessonsLoading = true;
      this.getLessonsList({
        uid: this.type.obj.id,
        form: this.lessonsForm
      }).then(() => {
        this.lessonsLoading = false;
        this.setLessonscurrentpage(1);
      });
    },
    //分页
    pageChange(num) {
      this.lessonsLoading = true;
      this.setLessonscurrentpage(num);
      this.getLessonsList({
        uid: this.type.obj.id,
        page: num,
        form: this.clearLessonsForm
      }).then(res => {
        this.lessonsLoading = false;
        this.setLessonscurrentpage(num);
      });
    },
    //添加学员
    createStudent() {},
    //tabs
    tab(num) {
      this.tabs = num;
    },
    //预览图片
    handleView(item) {
      if (this.isUpdata) {
        this.imgName = item;
      } else {
        this.imgName = this.uploadList.url;
      }
      this.visible = true;
    },
    //限制图片大小
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "超过档案大小限制",
        desc: "文件 " + file.name + "太大了，不超过2M。"
      });
    },
    //限制图片格式
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc: "文件" + file.name + "格式不正确，请选择jpg或png。"
      });
    },
    //上传图片
    handleBeforeUpload(file) {
      const check = this.uploadList.length;
      if (check >= 1) {
        this.$Message.error("最多只能上传1张图片");
        return;
      }
      let reader = new FileReader();
      reader.readAsDataURL(file);
      const _this = this;
      reader.onloadend = function(e) {
        file.url = reader.result;
        _this.uploadList.push(file);
      };
    },
    //创建课程
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    //创建课程
    createdCourse() {}
  }
};
</script>
<style>
.selects ul li:hover {
  background: #f3f3f3;
}
.selects ul li {
  margin: 0;
  line-height: normal;
  padding: 7px 16px;
  clear: both;
  color: #515a6e;
  font-size: 13px !important;
  white-space: nowrap;
  list-style: none;
  cursor: pointer;
  transition: background 0.2s ease-in-out;
}
.selects ul {
  display: none;
  position: absolute;
  top: 20px;
  left: 0;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  width: 150%;
  border-radius: 4px;
  background-color: #fff;
  z-index: 999999;
  max-height: 150px;
  overflow-y: auto;
}
.selects:hover ul {
  display: block;
}
.selects {
  position: relative;
}
</style>
<style scoped>
.required::after {
  content: "*";
  display: inline-block;
  margin-right: 4px;
  line-height: 1;
  font-family: SimSun;
  font-size: 14px;
  color: #ed4014;
}
.required {
  position: absolute;
  left: -80px;
  top: 0;
}
.hidden {
  display: none;
}
.time_block li {
  flex: 1;
  border: 1px solid;
  display: flex;
  justify-content: center;
  align-items: center;
}
.time_block {
  width: 1007px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 30px;
}
.content-right-footer li.active {
  background-color: #2d8cf0;
}
.content-right-footer li.actives {
  background-color: #2d8cf0;
  cursor: no-drop;
  pointer-events: none;
}
.content-right-footer {
  display: flex;
  flex-wrap: wrap;
}
.content-right-header li,
.content-right-footer li {
  width: 126px;
  box-sizing: content-box;
  border: 1px solid #989898;
  margin-left: -1px;
  margin-top: -1px;
  text-align: center;
  cursor: pointer;
  box-sizing: border-box;
  height: 29px;
}
.content-right-header li {
  background-color: #ccc;
}
.content-right-header {
  height: 27px;
  text-align: center;
  color: #333;
  display: flex;
  margin-bottom: 1px;
}
.content .content-right {
  margin-right: 40px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.content .content-left ul li {
  background-color: #ccc;
  text-align: center;
  color: #333;
  border: 1px solid #989898;
  margin-top: -1px;
  height: 29px;
}
.content .content-left {
  width: 120px;
}
.content {
  display: flex;
  margin-right: 20px;
  position: relative;
}
/* 时间块 */
.ivu-modal {
  top: 50px !important;
}
.cuorse {
  display: flex;
  flex-direction: column;
}
.tabs li.active span {
  color: #2d8cf0;
}
.tabs li.active {
  border: 1px solid #ccc;
  border-bottom: 1px solid #fff;
}
.main-section .main-section-bottom {
  margin-top: 0px !important;
}
.tabs li {
  /* font-size: 12px; */
  height: 100%;
  line-height: 35px;
  margin-right: 30px;
  width: 100px;
  text-align: center;
  margin-top: 1px;
  cursor: pointer;
  box-sizing: border-box;
}
.tabs {
  width: 100%;
  height: 35px;
  display: flex;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
  margin-top: 10px;
}
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>