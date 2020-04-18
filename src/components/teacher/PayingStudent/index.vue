<template>
  <div class="classstudents">
    <!-- 面包屑 -->
    <Crumbs>
      <template slot="title">付费学员</template>
    </Crumbs>

    <!-- 卡片包裹 -->
    <Card class="card">
      <div style="text-align:center">
        <Tabs type="card" v-model="value" @on-click="clickTabs">
          <TabPane label="班课" name="name1">
            <!-- 分配状态按钮 -->
            <div class="distribution">
              <div
                class="no-allocation"
                @click="pitchon(1)"
                :class="{'pitchon': pitchonStyle == '1' ? true : false}"
              >待分配</div>
              <div
                class="yes-allocation"
                @click="pitchon(2)"
                :class="{'pitchon': pitchonStyle == '2' ? true : false}"
              >已分配</div>
            </div>
            <!-- <SelectBox
              @formData="formData"
              :payingStudents="true"
              :classname="true"
              :placeholder="pitchonStyle=='2' ? true : false"
              :firstState="pitchonStyle=='2' ? true : false"
              :tradingHour="pitchonStyle=='2' ? true : false"
            />-->
            <div class="title">
              <Form class="select" ref="formValidate" :model="formItem" inline>
                <FormItem>
                  <Input v-model="formItem.order_sn" placeholder="订单编号" style="width: 80px;"></Input>
                </FormItem>
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
                  <Select v-model="formItem.class_type" placeholder="选择班级类型" style="width: 120px;">
                    <Option
                      :value="index"
                      v-for="(item,index) in selectState.class_type"
                      :key="index"
                    >{{item}}</Option>
                  </Select>
                </FormItem>
                <FormItem v-if="pitchonStyle == '2' ? true : false">
                  <Select v-model="formItem.teacher_id" placeholder="班主任" style="width: 80px;">
                    <Option
                      :value="item.teacher_id"
                      v-for="item in selectState.classTeacher"
                      :key="item.teacher_id"
                    >{{item.teacher_name}}</Option>
                  </Select>
                </FormItem>
                <FormItem v-if="pitchonStyle == '2' ? true : false">
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
                    v-model="formItem.start_date"
                    type="date"
                    placeholder="开课时间"
                    style="width: 120px;"
                    @on-change="changeCurriculumTime"
                  ></DatePicker>
                </FormItem>
                <FormItem>
                  <DatePicker
                    v-model="formItem.tradingHour"
                    type="datetimerange"
                    placement="bottom-end"
                    placeholder="交易时间 - 交易时间"
                    style="width: 165px"
                    @on-change="changeDate"
                  ></DatePicker>
                </FormItem>
                <FormItem>
                  <Button @click="deleteFormData" style="margin-left: 8px">清空选项</Button>
                </FormItem>
              </Form>
            </div>
            <TableBox
              @refresh="refresh"
              :empty="num"
              :page_num="mode.page_num"
              @pageNums="pageNums"
              :columns="columns"
              :dataList="dataList"
              :selectData="true"
              :allocationData="'分配'"
            />
            <PagingBox
              :total="total"
              :per_page="per_page"
              :current_page="current_page"
              :last_page="last_page"
              @changePages="changePages"
            />
          </TabPane>
          <TabPane label="一对一" name="name2">
            <!-- 分配状态按钮 -->
            <div class="distribution">
              <div
                class="no-allocation"
                @click="pitchon(3)"
                :class="{'pitchon': pitchonStyle == '3' ? true : false}"
              >待分配</div>
              <div
                class="yes-allocation"
                @click="pitchon(4)"
                :class="{'pitchon': pitchonStyle == '4' ? true : false}"
              >已分配</div>
            </div>
            <!-- <SelectBox
              @formData="formData"
              :payingStudents="true"
              :lecturer="true"
              :classname="true"
              :placeholder="pitchonStyle=='4' ? true : false"
              :firstState="pitchonStyle=='4' ? true : false"
              :tradingHour="pitchonStyle=='2' ? true : false"
            />-->
            <div class="title">
              <Form class="select" ref="formValidate" :model="formItem" inline>
                <FormItem>
                  <Input v-model="formItem.order_sn" placeholder="订单编号" style="width: 80px;"></Input>
                </FormItem>
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
                <FormItem v-if="pitchonStyle == '4' ? true : false">
                  <Select v-model="formItem.teacher_id" placeholder="班主任" style="width: 80px;">
                    <Option
                      :value="item.teacher_id"
                      v-for="item in selectState.classTeacher"
                      :key="item.teacher_id"
                    >{{item.teacher_name}}</Option>
                  </Select>
                </FormItem>
                <FormItem v-if="pitchonStyle == '4' ? true : false">
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
                  <Select v-model="formItem.class_type" placeholder="选择班级类型" style="width: 120px;">
                    <Option
                      :value="index"
                      v-for="(item,index) in selectState.class_type"
                      :key="index"
                    >{{item}}</Option>
                  </Select>
                </FormItem>
                <FormItem>
                  <DatePicker
                    v-model="formItem.start_date"
                    type="date"
                    placeholder="开课时间"
                    style="width: 120px;"
                    @on-change="changeCurriculumTime"
                  ></DatePicker>
                </FormItem>
                <FormItem>
                  <DatePicker
                    v-model="formItem.tradingHour"
                    type="datetimerange"
                    placement="bottom-end"
                    placeholder="交易时间 - 交易时间"
                    style="width: 165px"
                    @on-change="changeDate"
                  ></DatePicker>
                </FormItem>
                <FormItem>
                  <Button @click="deleteFormData" style="margin-left: 8px">清空选项</Button>
                </FormItem>
              </Form>
            </div>
            <TableBox
              @refresh="refresh"
              :empty="num"
              :page_num="mode.page_num"
              :columns="columns"
              :dataList="dataList"
              :selectData="true"
              :allocationData="'分配'"
            />
            <PagingBox
              :total="total"
              :per_page="per_page"
              :current_page="current_page"
              :last_page="last_page"
              @changePages="changePages"
            />
          </TabPane>
          <!-- <SelectBox
            @formData="formData"
            :payingStudents="true"
            :lecturer="true"
            :classname="true"
            :placeholder="pitchonStyle=='2' ? true : false"
            :firstState="pitchonStyle=='2' ? true : false"
          />-->
          <!-- <TableBox
            @refresh="refresh"
            :empty="num"
            :page_num="mode.page_num"
            @pageNums="pageNums"
            :columns="columns"
            :dataList="dataList"
            :selectData="true"
            :allocationData="'分配'"
          />-->
        </Tabs>
      </div>
    </Card>
    <CallOut v-if="type == 'CallOut'" :row="row" :showMod="showMod" @changeShowMod="changeShowMod" />
    <Allocation
      v-else-if="type == 'Allocation'"
      :row="row"
      :showMod="showMod"
      @changeShowMod="changeShowMod"
    />
    <!-- <StudentsFollowUp
      v-else-if="type == 'StudentsFollowUp'"
      :row="row"
      :showMod="showMod"
      @changeShowMod="changeShowMod"
    /> -->
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
import { PAYINGSTUDENT, CLASSTEACH } from "@/uilt/url/url";

import qs from "qs";

import PayingStudent from "@/store/payingstudent/index";
export default {
  data() {
    return {
      isLoading: false, // loading开关
      columns: "",
      dataList: [],
      value: "name1", // 判断卡片选择状态
      pitchonStyle: 1, // 选中分配状态
      mode: [], // formData数据
      total: 100,
      per_page: 10,
      current_page: 1,
      last_page: 1,
      product_type: 1,
      is_distribution: 0,
      num: 0,
      formItem: {},
      type: "",
      row: "",
      showMod: false,
      // 班课待分配
      columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "学员姓名",
          key: "accounts_student_name",
          align: "center",
          width: 100
        },
        {
          title: "注册手机",
          key: "accounts_mobile",
          align: "center",
          width: 140
        },
        {
          title: "年级",
          key: "grade",
          align: "center",
          width: 80
        },
        {
          title: "科目",
          key: "subject",
          align: "center",
          width: 80
        },
        {
          title: "购买课程",
          key: "course_name",
          align: "center",
          width: 180
        },
        {
          title: "班级类型",
          key: "class_type",
          align: "center",
          width: 100
        },
        {
          title: "课节数",
          key: "class_hour",
          align: "center",
          width: 100
        },
        {
          title: "开课日期",
          key: "start_date",
          align: "center",
          width: 120
        },
        {
          title: "主讲老师",
          key: "lecturer",
          align: "center",
          width: 100
        },
        {
          title: "签约人",
          key: "sale_login_name",
          align: "center",
          width: 100
        },
        {
          title: "实收",
          key: "pay_amount",
          align: "center",
          width: 100
        },
        {
          title: "订单编号",
          key: "order_sn",
          align: "center",
          width: 200
        },
        {
          title: "交易时间",
          key: "pay_time",
          align: "center",
          width: 120
        },
        {
          title: "操作",
          key: "operation",
          align: "center",
          fixed: "right",
          width: 180,
          render: (h, params) => {
            let _this = this;
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
                      this.Allocation(params.row);
                    }
                  }
                },
                "分配"
              )
            ]);
          }
        }
      ],
      // 班课已分配
      columns2: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "学员姓名",
          key: "accounts_student_name",
          align: "center",
          width: 100
        },
        {
          title: "注册手机",
          key: "accounts_mobile",
          align: "center",
          width: 140
        },
        {
          title: "年级",
          key: "grade",
          align: "center",
          width: 80
        },
        {
          title: "科目",
          key: "subject",
          align: "center",
          width: 80
        },
        {
          title: "购买课程",
          key: "course_name",
          align: "center",
          width: 180
        },
        {
          title: "班级类型",
          key: "class_type",
          align: "center",
          width: 100
        },
        {
          title: "课节数",
          key: "class_hour",
          align: "center",
          width: 100
        },
        {
          title: "开课日期",
          key: "start_date",
          align: "center",
          width: 120
        },
        {
          title: "主讲老师",
          key: "lecturer",
          align: "center",
          width: 100
        },
        {
          title: "签约人",
          key: "sale_login_name",
          align: "center",
          width: 100
        },
        {
          title: "实收",
          key: "pay_amount",
          align: "center",
          width: 100
        },
        {
          title: "班主任",
          key: "teacher_login_name",
          align: "center",
          width: 100
        },
        {
          type: "html",
          title: "首电呼出情况",
          key: "dial_up_situation",
          align: "center",
          width: 100
        },
        {
          title: "订单编号",
          key: "order_sn",
          align: "center",
          width: 200
        },
        {
          title: "交易时间",
          key: "pay_time",
          align: "center",
          width: 180
        },
        {
          title: "分配时间",
          key: "create_time",
          align: "center",
          width: 180
        },
        {
          title: "操作",
          key: "operation",
          align: "center",
          fixed: "right",
          width: 220,
          render: (h, params) => {
            let _this = this;
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
                      this.Allocation(params.row);
                    }
                  }
                },
                "分配"
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
                      this.LearningReport(params.row);
                    }
                  }
                },
                "学情报告"
              )
            ]);
          }
        }
      ],
      // 一对一待分配
      columns3: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "学员姓名",
          key: "accounts_student_name",
          align: "center",
          width: 100
        },
        {
          title: "注册手机",
          key: "accounts_mobile",
          align: "center",
          width: 140
        },
        {
          title: "年级",
          key: "grade",
          align: "center",
          width: 80
        },
        {
          title: "科目",
          key: "subject",
          align: "center",
          width: 80
        },
        {
          title: "购买课程",
          key: "course_name",
          align: "center",
          width: 180
        },
        {
          title: "总课时",
          key: "TotalClassTime",
          align: "center",
          width: 100
        },
        {
          title: "开课日期",
          key: "start_date",
          align: "center",
          width: 120
        },
        {
          title: "签约人",
          key: "sale_login_name",
          align: "center",
          width: 100
        },
        {
          title: "实收",
          key: "pay_amount",
          align: "center",
          width: 100
        },
        {
          title: "订单编号",
          key: "order_sn",
          align: "center",
          width: 200
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
          width: 180,
          render: (h, params) => {
            let _this = this;
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
                      this.Allocation(params.row);
                    }
                  }
                },
                "分配"
              )
            ]);
          }
        }
      ],
      // 一对一已分配
      columns4: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "学员姓名",
          key: "accounts_student_name",
          align: "center",
          width: 100
        },
        {
          title: "注册手机",
          key: "accounts_mobile",
          align: "center",
          width: 140
        },
        {
          title: "年级",
          key: "grade",
          align: "center",
          width: 80
        },
        {
          title: "科目",
          key: "subject",
          align: "center",
          width: 80
        },
        {
          title: "购买课程",
          key: "course_name",
          align: "center",
          width: 140
        },
        {
          title: "总课时",
          key: "TotalClassTime",
          align: "center",
          width: 100
        },
        {
          title: "开课日期",
          key: "start_date",
          align: "center",
          width: 120
        },
        {
          title: "签约人",
          key: "sale_login_name",
          align: "center",
          width: 100
        },
        {
          title: "实收",
          key: "pay_amount",
          align: "center",
          width: 100
        },
        {
          title: "班主任",
          key: "teacher_login_name",
          align: "center",
          width: 100
        },
        {
          type: "html",
          title: "首电呼出情况",
          key: "dial_up_situation",
          align: "center",
          width: 100
        },
        {
          title: "订单编号",
          key: "order_sn",
          align: "center",
          width: 200
        },
        {
          title: "交易时间",
          key: "pay_time",
          align: "center",
          width: 180
        },
        {
          title: "分配时间",
          key: "create_time",
          align: "center",
          width: 180
        },
        {
          title: "操作",
          key: "operation",
          align: "center",
          fixed: "right",
          width: 220,
          render: (h, params) => {
            let _this = this;
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
                      this.Allocation(params.row);
                    }
                  }
                },
                "分配"
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
                      this.LearningReport(params.row);
                    }
                  }
                },
                "学情报告"
              )
            ]);
          }
        }
      ]
    };
  },
  computed: {
    ...mapState({
      refresh: state => state.currentPage.refresh,
      selectState: state => state.selectState
    })
  },
  watch: {
    formItem: {
      deep: true,
      handler(newName, oldName) {
        // 防止数据清空导致调用接口数据错误
        this.formItem.product_type = this.product_type;
        this.formItem.is_distribution = this.is_distribution;
        // 防抖，并解决时间选择发送再次请求问题
        window.setTimeout(() => {
          this.getPayingData();
        }, 200);
      }
    },
     refresh: {
      deep: true,
      handler(newName, oldName) {
        // 防止数据清空导致调用接口数据错误
        this.formItem.product_type = this.product_type;
        this.formItem.is_distribution = this.is_distribution;
        this.getPayingData();
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
    Allocation(row) {
      this.showMod = true;
      this.row = row;
      this.type = "Allocation";
    },
    // 跟进
    // StudentsFollowUp(row) {
    //   this.showMod = true;
    //   this.row = row;
    //   this.type = "StudentsFollowUp";
    // },
    // 学情报告
    LearningReport(row) {
      this.showMod = true;
      this.row = row;
      this.type = "LearningReport";
    },
    // 转换date
    changeDate(time) {
      this.formItem.pay_start_time = time[0];
      this.formItem.pay_end_time = time[1];
    },
    // 点击清除选项
    deleteFormData() {
      this.formItem = {
        page: 1, // 页码
        page_num: "10" // 每页条数
      };
    },
    changeCurriculumTime(time) {
      this.formItem.start_date = time;
    },
    ...mapMutations(["setCurrentPages", "setSelectState", "setRefresh"]),
    // 设置当前页码
    changePages(val) {
      this.formItem.page = val;
    },
    // 设置每页显示数量
    pageNums(val) {
      this.formItem.page_num = val;
    },
    // 设置mode搜索词汇
    formData(val) {
      this.mode = val;
    },
    clickTabs(value) {
      this.pitchonStyle = 1;
      if (value == "name1") {
        this.product_type = 1;
        // this.formItem.product_type = this.product_type;
        this.pitchon(1);
      } else if (value == "name2") {
        this.product_type = 4;
        // this.formItem.product_type = this.product_type;
        this.pitchon(3);
      }
    },
    // 选中分配状态
    pitchon(index) {
      this.pitchonStyle = index;

      if (this.pitchonStyle == 1) {
        this.deleteFormData();
        this.columns = this.columns1;
        this.is_distribution = 0;
        this.formItem.is_distribution = this.is_distribution;
        this.formItem.product_type = this.product_type;
        this.getPayingData();
      } else if (this.pitchonStyle == 2) {
        this.deleteFormData();
        this.columns = this.columns2;
        this.is_distribution = 1;
        this.formItem.is_distribution = this.is_distribution;
        this.formItem.product_type = this.product_type;
        this.getPayingData();
      } else if (this.pitchonStyle == 3) {
        this.deleteFormData();
        this.columns = this.columns3;
        this.is_distribution = 0;
        this.formItem.is_distribution = this.is_distribution;
        this.formItem.product_type = this.product_type;
        this.getPayingData();
      } else if (this.pitchonStyle == 4) {
        this.deleteFormData();
        this.columns = this.columns4;
        this.is_distribution = 1;
        this.formItem.is_distribution = this.is_distribution;
        this.formItem.product_type = this.product_type;
        this.getPayingData();
      }
    },
    // 获取信息
    async getPayingData() {
      // 打开弹层
      this.isLoading = true;
      this.num++;
      let res = await this.$request({
        method: "post",
        url: PAYINGSTUDENT,
        data: qs.stringify(this.formItem)
      });
      // 设置搜索选项，页码数
      let {
        total,
        per_page,
        current_page,
        last_page,
        subject,
        grade,
        class_type
        // TODO: 等待接口补充放开
        // dial_up_situation
      } = res.data.data.links;

      // 设置user信息
      this.dataList = res.data.data.data;
      this.dataList.map(item => {
        if (item.give_class_hour) {
          item.TotalClassTime = item.class_hour + "/" + item.give_class_hour;
        } else {
          item.TotalClassTime = item.class_hour;
        }

        // 显示用户数据并把对应年级科目班级类型转变形式
        item.class_type = this.selectState.class_type[item.class_type];
        item.subject = this.selectState.subject[item.subject];
        item.grade = this.selectState.grade[item.grade];
        item.dial_up_situation = this.selectState.dial_up_situation[
          item.dial_up_situation
        ];
        this.selectState.classTeacher.map(i => {
          if (i.teacher_id == item.teacher_login_name) {
            item.teacher_login_name = i.teacher_name;
          }
        });
      });
      this.setCurrentPages(this.dataList);
      // 设置搜索选项
      this.setSelectState({
        subject,
        grade,
        class_type
        // dial_up_situation
      });
      // 设置页码
      this.total = total;
      this.per_page = per_page;
      this.current_page = current_page;
      this.last_page = last_page;
      // 关闭弹层
      this.isLoading = false;
    },
    // 获取班主任列表
    async getClassTeacher() {
      let res = await this.$request({
        method: "get",
        url: CLASSTEACH
      });
      this.setSelectState({
        classTeacher: res.data.data
      });
    }
  },
  created() {
    this.getClassTeacher();
    this.pitchon(1);
    this.columns = this.columns1;
  }
};
</script>

<style scoped>
.card {
  margin: 5px;
  overflow: auto;
}
/* 分配情况 */
.distribution {
  height: 50px;
  background-color: #f2f2f2;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #aeaeae;
  margin-bottom: 10px;
}
.no-allocation {
  width: 130px;
  height: 24px;
  line-height: 24px;
  background-color: #fff;
  border-radius: 20px;
  border: 1px solid #aeaeae;
  box-sizing: border-box;
  cursor: pointer;
}
.yes-allocation {
  width: 130px;
  height: 24px;
  line-height: 24px;
  background-color: #fff;
  border-radius: 20px;
  border: 1px solid #aeaeae;
  box-sizing: border-box;
  margin-left: 15px;
  cursor: pointer;
}
.pitchon {
  background-color: #aeaeae;
  color: #fff;
}
</style>