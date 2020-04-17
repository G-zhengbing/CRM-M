<template>
  <div class="classstudents">
    <!-- 面包屑 -->
    <Crumbs>
      <template slot="title">班课学员</template>
    </Crumbs>
    <!-- 卡片包裹 -->
    <Card class="card">
      <div style="text-align:center">
        <Tabs type="card" value="name1" @on-click="changeTab">
          <TabPane label="我的学员" name="name1">
            <!-- <SelectBox @formData="formData" :firstState="false" /> -->
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
                  <Select v-model="formItem.class_type" placeholder="选择班级类型" style="width: 120px;">
                    <Option
                      :value="index"
                      v-for="(item,index) in selectState.class_type"
                      :key="index"
                    >{{item}}</Option>
                  </Select>
                </FormItem>
                <FormItem>
                  <Input v-model="formItem.course_name" placeholder="课程名称" style="width: 80px;"></Input>
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
            <!-- <SelectBox @formData="formData" :firstState="false" /> -->
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
                  <Select v-model="formItem.class_type" placeholder="选择班级类型" style="width: 120px;">
                    <Option
                      :value="index"
                      v-for="(item,index) in selectState.class_type"
                      :key="index"
                    >{{item}}</Option>
                  </Select>
                </FormItem>
                <FormItem>
                  <Input v-model="formItem.course_name" placeholder="课程名称" style="width: 80px;"></Input>
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
            <!-- <SelectBox @formData="formData" :firstState="true" /> -->
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
                  <Select v-model="formItem.class_type" placeholder="选择班级类型" style="width: 120px;">
                    <Option
                      :value="index"
                      v-for="(item,index) in selectState.class_type"
                      :key="index"
                    >{{item}}</Option>
                  </Select>
                </FormItem>
                <FormItem>
                  <Input v-model="formItem.course_name" placeholder="课程名称" style="width: 80px;"></Input>
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
    <CreatedOrder
      v-if="type == 'createdOrder'"
      :row="row"
      :showMod="showMod"
      @changeShowMod="changeShowMod"
    />
    <Audition
      v-else-if="type == 'Audition'"
      :row="row"
      :showMod="showMod"
      @changeShowMod="changeShowMod"
    />
    <Referral
      v-else-if="type == 'Referral'"
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
    <CallOut
      v-else-if="type == 'CallOut'"
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

import classstudents from "@/store/classstudents";
export default {
  computed: {
    ...mapState({
      refresh: state => state.currentPage.refresh,
      selectState: state => state.selectState
    })
  },
  data() {
    return {
      showMod: false,
      isLoading: false, // loading开关
      columns: [],
      dataList: [],
      value: "name1", // 判断卡片选择状态
      total: 100,
      per_page: 10,
      current_page: 1,
      last_page: 1,
      list_type: 1,
      formItem: {},
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
          width: 200
        },
        {
          title: "班级类型",
          key: "class_type",
          align: "center",
          width: 100
        },
        {
          title: "课节进度",
          key: "classSchedule",
          align: "center",
          width: 100
        },
        {
          title: "开课日期",
          key: "start_date",
          align: "center",
          width: 100
        },
        {
          title: "主讲老师",
          key: "lecturer",
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
          type: "html",
          title: "首电呼出情况",
          key: "dial_up_situation",
          align: "center",
          width: 140,
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
          width: 140
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
                      this.createdOrder(params.row);
                    }
                  }
                },
                "订单"
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
                      this.Audition(params.row);
                    }
                  }
                },
                "试听"
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
                      this.Referral(params.row);
                    }
                  }
                },
                "转介绍"
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
                      this.CallOut(params.row);
                    }
                  }
                },
                "呼出"
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
          width: 200
        },
        {
          title: "班级类型",
          key: "class_type",
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
          type: "html",
          title: "首电呼出情况",
          key: "dial_up_situation",
          align: "center",
          width: 140,
          sortable: true,
          sortType: "desc"
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
                      this.StudentsFollowUp(params.row);
                    }
                  }
                },
                "跟进"
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
                      this.CallOut(params.row);
                    }
                  }
                },
                "呼出"
              )
            ]);
          }
        }
      ],
      row: "",
      type: ""
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
      // this.getUserData();
    },
    CallOut(row) {
      this.showMod = true;
      this.row = row;
      this.type = "CallOut";
    },
    StudentsFollowUp(row) {
      this.showMod = true;
      this.row = row;
      this.type = "StudentsFollowUp";
    },
    Audition(row) {
      this.showMod = true;
      this.row = row;
      this.type = "Audition";
    },
    Referral(row) {
      this.showMod = true;
      this.row = row;
      this.type = "Referral";
    },
    // 设置订单页面
    createdOrder(row) {
      this.showMod = true;
      this.row = row;
      this.type = "createdOrder";
    },
    // 点击清除选项
    deleteFormData() {
      this.formItem = {
        page: 1, // 页码
        page_num: "10" // 每页条数
      };
    },
    // 转换date
    changeDate(time) {
      this.formItem.pay_start_time = time[0];
      this.formItem.pay_end_time = time[1];
    },
    ...mapMutations(["setCurrentPages", "setSelectState","setRefresh"]),
    // 改变页码
    changePages(val) {
      // this.mode.page = val;
      this.formItem.page = val;
      this.getUserData();
    },
    // 设置mode搜索词汇
    // formData(val) {
    //   this.mode = val;
    // },
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
      let res = await this.$request({
        method: "post",
        url: CLASSSTUDENTS,
        data: qs.stringify(this.formItem)
      });
      // 设置搜索选项，页码数     // 这个模块要在前面，否则后面无法渲染
      let {
        total,
        per_page,
        current_page,
        last_page,
        subject,
        grade,
        class_type,
        reception_state,
        dial_up_situation
      } = res.data.data.links;
      // 设置搜索选项
      this.setSelectState({
        subject,
        grade,
        class_type,
        reception_state,
        dial_up_situation
      });
      // 设置页码
      this.total = total;
      this.per_page = per_page;
      this.current_page = current_page;
      this.last_page = last_page;

      this.dataList = res.data.data.data;
      // 渲染年级，科目，首电呼出，交接单单元格
      this.dataList.map(item => {
        // 需求：要彩色的
        if (item.dial_up_situation == "2") {
          item.dial_up_situation = "<span style='color: #3b9d3b'>已完成</span>";
        } else if (item.dial_up_situation == "1") {
          item.dial_up_situation = "<span style='color: #3333ff'>进行中</span>";
        } else {
          item.dial_up_situation = "<span style='color: #ff0000'>超时</span>";
        }

        item.classSchedule =
          item.course_rate_of_progress + "/" + item.class_hour;
        item.reception_state = this.selectState.reception_state[
          item.reception_state
        ];
        item.subject = this.selectState.subject[item.subject];
        item.grade = this.selectState.grade[item.grade];
        item.class_type = this.selectState.class_type[item.class_type];
      });

      // 数据放入vuex方便跟进，学情报告调用数据
      this.setCurrentPages(this.dataList);
      // loading 关
      this.isLoading = false;
    }
  },
  created() {
    // this.getUserData();
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