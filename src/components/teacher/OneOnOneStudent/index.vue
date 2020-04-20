<template>
  <div class="oneononestudent">
    <!-- 面包屑 -->
    <Crumbs>
      <template slot="title">一对一学员</template>
    </Crumbs>

    <!-- 卡片包裹 -->
    <Card class="card">
      <div style="text-align:center">
        <Tabs type="card" value="name1" @on-click="changeTab">
          <TabPane label="我的学员" name="name1">
            <!-- <SelectBox
              @formData="formData"
              :firstState="true"
              :lecturer="true"
              :classType="true"
              :chooseSubject="true"
            />-->
            <div class="title">
              <Form class="select" ref="formValidate" :model="formItem" inline>
                <FormItem>
                  <Input v-model="formItem.student_name" placeholder="学员姓名" style="width: 80px;"></Input>
                </FormItem>
                <FormItem>
                  <Input v-model="formItem.mobile" placeholder="注册手机" style="width: 80px;"></Input>
                </FormItem>
                <FormItem>
                  <Select v-model="formItem.grade" placeholder="选择年级" style="width: 100px;">
                    <Option
                      :value="index"
                      v-for="(item,index) in selectState.grade"
                      :key="index"
                    >{{item}}</Option>
                  </Select>
                </FormItem>
                <FormItem>
                  <Select v-model="formItem.subject" placeholder="选择科目" style="width: 100px;">
                    <Option
                      :value="index"
                      v-for="(item,index) in selectState.subject"
                      :key="index"
                    >{{item}}</Option>
                  </Select>
                </FormItem>
                <FormItem>
                  <Input v-model="formItem.course_name" placeholder="课程名称" style="width: 80px;"></Input>
                </FormItem>
                <FormItem>
                  <DatePicker
                    v-model="formItem.allocateTime"
                    type="datetimerange"
                    placement="bottom-end"
                    placeholder="分配时间 - 分配时间"
                    style="width: 165px"
                    @on-change="changeAllocateTimeDate"
                  ></DatePicker>
                </FormItem>
                <FormItem>
                  <Select
                    v-model="formItem.dial_up_situation"
                    placeholder="首电呼出情况"
                    style="width: 120px;"
                  >
                    <Option value="1">已完成</Option>
                    <Option value="2">进行中</Option>
                    <Option value="3">超时</Option>
                  </Select>
                </FormItem>
                <FormItem>
                  <DatePicker
                    v-model="formItem.submissionTime"
                    type="datetimerange"
                    placement="bottom-end"
                    placeholder="提交时间 - 提交时间"
                    @on-change="changeSubmissionTime"
                    style="width: 165px"
                  ></DatePicker>
                </FormItem>
                <FormItem>
                  <Button @click="deleteFormData" style="margin-left: 8px">清空选项</Button>
                </FormItem>
              </Form>
            </div>
            <TableBox :columns="columns" :dataList="dataList" />
            <PagingBox
              :total="total"
              :per_page="per_page"
              :current_page="current_page"
              :last_page="last_page"
              @changePages="changePages"
            />
          </TabPane>
          <TabPane label="今日新分" name="name2">
            <!-- <SelectBox
              @formData="formData"
              :firstState="true"
              :lecturer="true"
              :classType="true"
              :chooseSubject="true"
            />-->
            <div class="title">
              <Form class="select" ref="formValidate" :model="formItem" inline>
                <FormItem>
                  <Input v-model="formItem.student_name" placeholder="学员姓名" style="width: 80px;"></Input>
                </FormItem>
                <FormItem>
                  <Input v-model="formItem.mobile" placeholder="注册手机" style="width: 80px;"></Input>
                </FormItem>
                <FormItem>
                  <Select v-model="formItem.grade" placeholder="选择年级" style="width: 100px;">
                    <Option
                      :value="index"
                      v-for="(item,index) in selectState.grade"
                      :key="index"
                    >{{item}}</Option>
                  </Select>
                </FormItem>
                <FormItem>
                  <Select v-model="formItem.subject" placeholder="选择科目" style="width: 100px;">
                    <Option
                      :value="index"
                      v-for="(item,index) in selectState.subject"
                      :key="index"
                    >{{item}}</Option>
                  </Select>
                </FormItem>
                <FormItem>
                  <Input v-model="formItem.course_name" placeholder="课程名称" style="width: 80px;"></Input>
                </FormItem>
                <FormItem>
                  <DatePicker
                    v-model="formItem.allocateTime"
                    type="datetimerange"
                    placement="bottom-end"
                    placeholder="分配时间 - 分配时间"
                    style="width: 165px"
                    @on-change="changeAllocateTimeDate"
                  ></DatePicker>
                </FormItem>
                <FormItem>
                  <Select
                    v-model="formItem.dial_up_situation"
                    placeholder="首电呼出情况"
                    style="width: 120px;"
                  >
                    <Option value="1">已完成</Option>
                    <Option value="2">进行中</Option>
                    <Option value="3">超时</Option>
                  </Select>
                </FormItem>
                <FormItem>
                  <DatePicker
                    v-model="formItem.submissionTime"
                    type="datetimerange"
                    placement="bottom-end"
                    placeholder="提交时间 - 提交时间"
                    @on-change="changeSubmissionTime"
                    style="width: 165px"
                  ></DatePicker>
                </FormItem>
                <FormItem>
                  <Button @click="deleteFormData" style="margin-left: 8px">清空选项</Button>
                </FormItem>
              </Form>
            </div>
            <TableBox :columns="columns" :dataList="dataList" />
            <PagingBox
              :total="total"
              :per_page="per_page"
              :current_page="current_page"
              :last_page="last_page"
              @changePages="changePages"
            />
          </TabPane>
          <TabPane label="首电待完成" name="name3">
            <!-- <SelectBox
              @formData="formData"
              :lecturer="true"
              :classType="true"
              :chooseSubject="true"
            />-->
            <div class="title">
              <Form class="select" ref="formValidate" :model="formItem" inline>
                <FormItem>
                  <Input v-model="formItem.student_name" placeholder="学员姓名" style="width: 80px;"></Input>
                </FormItem>
                <FormItem>
                  <Input v-model="formItem.mobile" placeholder="注册手机" style="width: 80px;"></Input>
                </FormItem>
                <FormItem>
                  <Select v-model="formItem.grade" placeholder="选择年级" style="width: 100px;">
                    <Option
                      :value="index"
                      v-for="(item,index) in selectState.grade"
                      :key="index"
                    >{{item}}</Option>
                  </Select>
                </FormItem>
                <FormItem>
                  <Select v-model="formItem.subject" placeholder="选择科目" style="width: 100px;">
                    <Option
                      :value="index"
                      v-for="(item,index) in selectState.subject"
                      :key="index"
                    >{{item}}</Option>
                  </Select>
                </FormItem>
                <FormItem>
                  <Input v-model="formItem.course_name" placeholder="课程名称" style="width: 80px;"></Input>
                </FormItem>
                <FormItem>
                  <DatePicker
                    v-model="formItem.allocateTime"
                    type="datetimerange"
                    placement="bottom-end"
                    placeholder="分配时间 - 分配时间"
                    style="width: 165px"
                    @on-change="changeAllocateTimeDate"
                  ></DatePicker>
                </FormItem>
                <FormItem>
                  <DatePicker
                    v-model="formItem.submissionTime"
                    type="datetimerange"
                    placement="bottom-end"
                    placeholder="提交时间 - 提交时间"
                    @on-change="changeSubmissionTime"
                    style="width: 165px"
                  ></DatePicker>
                </FormItem>
                <FormItem>
                  <Button @click="deleteFormData" style="margin-left: 8px">清空选项</Button>
                </FormItem>
              </Form>
            </div>
            <TableBox :columns="columns" :dataList="dataList" />
            <PagingBox
              :total="total"
              :per_page="per_page"
              :current_page="current_page"
              :last_page="last_page"
              @changePages="changePages"
            />
          </TabPane>
        </Tabs>
      </div>
    </Card>
    <CallOut v-if="type == 'CallOut'" :row="row" :showMod="showMod" @changeShowMod="changeShowMod" />
    <Appraisal
      v-else-if="type == 'Appraisal'"
      :row="row"
      :showMod="showMod"
      @changeShowMod="changeShowMod"
    />
    <StudentsFollowUp
      v-else-if="type == 'StudentsFollowUp'"
      :row="row"
      :showMod="showMod"
      @changeShowMod="changeShowMod"
    />
    <LearningReport
      v-else-if="type == 'LearningReport'"
      :row="row"
      :showMod="showMod"
      @changeShowMod="changeShowMod"
    />
    <Loading v-show="isLoading" />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { CLASSSTUDENTS } from "@/uilt/url/url";
import qs from "qs";

import oneononestudent from "@/store/oneononestudent";
export default {
  computed: {
    ...mapState({
      refresh: state => state.currentPage.refresh,
      selectState: state => state.selectState
    })
  },
  data() {
    return {
      isLoading: false, // loading开关
      columns: "",
      dataList: [],
      value: "name1", // 判断卡片选择状态
      mode: [], // 存放用户数据
      total: 100,
      per_page: 10,
      current_page: 1,
      last_page: 1,
      formItem: {},
      row: "",
      type: "",
      showMod: false,
      columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "学员姓名",
          key: "student_name",
          align: "center",
          width: 100
        },
        {
          title: "注册手机",
          key: "mobile",
          align: "center",
          width: 140
        },
        {
          title: "年级",
          key: "grade",
          align: "center",
          width: 100
        },
        {
          title: "科目",
          key: "subject",
          align: "center",
          width: 100
        },
        {
          title: "购买课程",
          key: "course_name",
          align: "center",
          width: 180
        },
        {
          title: "总课时",
          key: "totalClassTime",
          align: "center",
          width: 100
        },
        {
          title: "已消耗课时",
          key: "course_rate_of_progress",
          align: "center",
          width: 120
        },
        {
          title: "剩余课时",
          key: "restOfClass",
          align: "center",
          width: 100
        },
        {
          title: "开课日期",
          key: "start_date",
          align: "center",
          width: 140
        },
        {
          title: "实收",
          key: "pay_amount",
          align: "center",
          width: 100
        },
        {
          type: "html",
          title: "首电呼出情况",
          key: "dial_up_situation",
          align: "center",
          width: 160,
          sortable: true,
          sortType: "desc" // 排序，反排
        },
        {
          title: "交接单",
          key: "reception_state",
          align: "center",
          width: 100
        },
        {
          title: "交易时间",
          key: "pay_time",
          align: "center",
          width: 180
        },
        {
          title: "操作",
          key: "operation",
          align: "center",
          fixed: "right",
          width: 240,
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
                      this.CallOut(params.row);
                    }
                  }
                },
                "呼出"
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
                      this.StudentsFollowUp(params.row);
                    }
                  }
                },
                "跟进"
              )
            ]);
          }
        }
      ],
      columns2: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "学员姓名",
          key: "student_name",
          align: "center",
          width: 100
        },
        {
          title: "注册手机",
          key: "mobile",
          align: "center",
          width: 140
        },
        {
          title: "年级",
          key: "grade",
          align: "center",
          width: 100
        },
        {
          title: "科目",
          key: "subject",
          align: "center",
          width: 100
        },
        {
          title: "购买课程",
          key: "course_name",
          align: "center",
          width: 180
        },
        {
          title: "总课时",
          key: "totalClassTime",
          align: "center",
          width: 100
        },
        {
          title: "开课日期",
          key: "start_date",
          align: "center",
          width: 140
        },
        {
          title: "实收",
          key: "pay_amount",
          align: "center",
          width: 100
        },
        {
          type: "html",
          title: "首电呼出情况",
          key: "dial_up_situation",
          align: "center",
          width: 140
        },
        {
          title: "交接单",
          key: "reception_state",
          align: "center",
          width: 100
        },
        {
          title: "交易时间",
          key: "pay_time",
          align: "center",
          width: 180
        },
        {
          title: "操作",
          key: "operation",
          align: "center",
          fixed: "right",
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
                      this.CallOut(params.row);
                    }
                  }
                },
                "呼出"
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
                      this.StudentsFollowUp(params.row);
                    }
                  }
                },
                "跟进"
              )
            ]);
          }
        }
      ]
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
    },
    refresh: {
      deep: true,
      handler(newName, oldName) {
        this.getUserData();
        this.setRefresh(false);
      }
    }
  },
  methods: {
    // 关闭窗口状态
    changeShowMod(val) {
      this.showMod = val;
      this.type = "";
    },
    // 呼出
    CallOut(row) {
      this.showMod = true;
      this.row = row;
      this.type = "CallOut";
    },
    // 跟进
    StudentsFollowUp(row) {
      this.showMod = true;
      this.row = row;
      this.type = "StudentsFollowUp";
    },
    // 查看测评
    Appraisal(row) {
      this.showMod = true;
      this.row = row;
      this.type = "Appraisal";
    },
    // 学情报告
    LearningReport(row) {
      this.showMod = true;
      this.row = row;
      this.type = "LearningReport";
    },
    // 转换date
    changeSubmissionTime(time) {
      this.formItem.create_start_time = time[0];
      this.formItem.create_end_time = time[1];
    },
    // 点击清除选项
    deleteFormData() {
      this.formItem = {
        page: 1, // 页码
        page_num: "10" // 每页条数
      };
    },
    // 转换date
    changeAllocateTimeDate(time) {
      this.formItem.create_st_time = time[0];
      this.formItem.create_en_time = time[1];
    },
    ...mapMutations(["setCurrentPages", "setSelectState", "setRefresh"]),
    // 改变页码
    changePages(val) {
      this.formItem.page = val;
    },
    // 设置mode搜索词汇
    formData(val) {
      this.mode = val;
    },
    // 点击选项卡切换触发
    changeTab(value) {
      this.value = value;
      if (this.value === "name1") {
        this.deleteFormData();
        this.columns = this.columns1;
        this.list_type = 1;
        this.formItem.list_type = this.list_type;
        this.getUserData();
      } else if (this.value == "name2") {
        this.deleteFormData();
        this.columns = this.columns2;
        this.list_type = 2;
        this.formItem.list_type = this.list_type;
        this.getUserData();
      } else if (this.value == "name3") {
        this.deleteFormData();
        this.columns = this.columns2;
        this.list_type = 3;
        this.formItem.list_type = this.list_type;
        this.getUserData();
      }
    },
    // 获取信息
    async getUserData() {
      // loading 开
      this.isLoading = true;
      this.formItem.product_type = 4; // 设置一对一接口
      let res = await this.$request({
        method: "post",
        url: CLASSSTUDENTS,
        data: qs.stringify(this.formItem)
      });
      // 设置搜索选项，页码数     // 这个模块要在前面，否则后面无法渲染
      let links = res.data.data.links;
      // 设置搜索选项
      this.setSelectState(links);
      // 设置页码
      this.total = links.total;
      this.per_page = links.per_page;
      this.current_page = links.current_page;
      this.last_page = links.last_page;

      this.dataList = res.data.data.data;
      // 渲染年级，科目，首电呼出，交接单单元格
      this.dataList.map(item => {
        item.class_type = 1;
        // 需求：要彩色的
        if (item.dial_up_situation == "2") {
          item.dial_up_situation = "<span style='color: #3b9d3b'>已完成</span>";
        } else if (item.dial_up_situation == "1") {
          item.dial_up_situation = "<span style='color: #3333ff'>进行中</span>";
        } else {
          item.dial_up_situation = "<span style='color: #ff0000'>超时</span>";
        }

        if (item.give_class_hour) {
          item.totalClassTime = item.class_hour + "+" + item.give_class_hour;
          item.restOfClass =
            item.class_hour +
            item.give_class_hour -
            item.course_rate_of_progress;
        } else {
          item.totalClassTime = item.class_hour;
          item.restOfClass = item.class_hour - item.course_rate_of_progress;
        }
        item.reception_state = this.selectState.reception_state[
          item.reception_state
        ];
        item.subject = this.selectState.subject[item.subject];
        item.grade = this.selectState.grade[item.grade];
      });
      this.setCurrentPages(this.dataList);
      // loading 关
      this.isLoading = false;
    }
  },
  created() {
    this.getUserData();
    this.columns = this.columns1;
  }
};
</script>

<style scoped>
.card {
  margin: 5px;
  overflow: hidden;
}
</style>