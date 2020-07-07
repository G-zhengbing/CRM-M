<template>
  <div class="classstudents">
    <div class="contaner">
      <div style="text-align:center">
        <Tabs type="card" value="name1" @on-click="changeTab" :animated="false">
          <TabPane label="全部开课中学员" name="name1">
            <!-- <SelectBox @formData="formData" :turnOut="true" /> -->
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
                    v-model="formItem.class_attendance"
                    placeholder="本周到课情况"
                    style="width: 120px;"
                  >
                    <Option
                      v-for="(item,index) in selectState.class_attendance"
                      :value="index"
                      :key="index"
                    >{{item}}</Option>
                  </Select>
                </FormItem>
                <FormItem>
                  <Select
                    v-model="formItem.delivery_of_work"
                    placeholder="上周交作业情况"
                    style="width: 120px;"
                  >
                    <Option
                      v-for="(item,index) in selectState.delivery_of_work"
                      :key="index"
                      :value="index"
                    >{{item}}</Option>
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
            <TableBox :columns="columns1" :dataList="dataList" />
            <PagingBox
              @changePages="changePages"
              :total="total"
              :per_page="per_page"
              :current_page="current_page"
              :last_page="last_page"
            />
          </TabPane>
          <TabPane label="今日待回访" name="name2">
            <!-- <SelectBox @formData="formData" /> -->
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
            <TableBox :columns="columns2" :dataList="dataList" />
            <PagingBox
              @changePages="changePages"
              :total="total"
              :per_page="per_page"
              :current_page="current_page"
              :last_page="last_page"
            />
          </TabPane>
          <TabPane label="约定今日跟进" name="name3">
            <!-- <SelectBox @formData="formData" /> -->
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
            <TableBox :columns="columns3" :dataList="dataList" />
            <PagingBox
              @changePages="changePages"
              :total="total"
              :per_page="per_page"
              :current_page="current_page"
              :last_page="last_page"
            />
          </TabPane>
          <TabPane label="逾期今日跟进" name="name4">
            <!-- <SelectBox @formData="formData" /> -->
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
            <TableBox :columns="columns4" :dataList="dataList" />
            <PagingBox
              @changePages="changePages"
              :total="total"
              :per_page="per_page"
              :current_page="current_page"
              :last_page="last_page"
            />
          </TabPane>
          <TabPane label="半月待回访" name="name5">
            <!-- <SelectBox @formData="formData" /> -->
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
            <TableBox :columns="columns4" :dataList="dataList" />
            <PagingBox
              @changePages="changePages"
              :total="total"
              :per_page="per_page"
              :current_page="current_page"
              :last_page="last_page"
            />
          </TabPane>
          <TabPane label="上周逾期未回访" name="name6">
            <!-- <SelectBox @formData="formData" /> -->
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
            <TableBox :columns="columns4" :dataList="dataList" />
            <PagingBox
              @changePages="changePages"
              :total="total"
              :per_page="per_page"
              :current_page="current_page"
              :last_page="last_page"
            />
          </TabPane>
          <TabPane label="上半月逾期未回访" name="name7">
            <!-- <SelectBox @formData="formData" /> -->
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
            <TableBox :columns="columns4" :dataList="dataList" />
            <PagingBox
              @changePages="changePages"
              :total="total"
              :per_page="per_page"
              :current_page="current_page"
              :last_page="last_page"
            />
          </TabPane>
        </Tabs>
      </div>
    </div>
    <StudentsFollowUp
      v-if="type == 'StudentsFollowUp'"
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
import { INCLASS, UPDATELEARNINGSTATE } from "@/uilt/url/url";
import qs from "qs";

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
      dataList: [],
      mode: [], // 存放用户数据
      total: 100,
      per_page: 10,
      current_page: 1,
      last_page: 1,
      // 默认后台接口
      start_type: 1,
      monicker: ["待确认", "已到课", "缺席", "已补上"],
      jobMonicker: ["待确认", "已交", "未交", "已补交"],
      formItem: {},
      row: "",
      type: "",
      showMod: false,
      columns1: [
        {
          type: "selection",
          fixed: "left",
          width: 60,
          align: "center"
        },
        {
          title: "学员姓名",
          fixed: "left",
          key: "student_name",
          align: "center",
          width: 100
        },
        {
          title: "注册手机",
          fixed: "left",
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
          sortable: true,
          sortType: "asc",
          width: 120
        },
        {
          title: "主讲老师",
          key: "lecturer",
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
          title: "本周到课情况",
          key: "class_attendance",
          align: "center",
          width: 140,
          render: (h, params) => {
            return h(
              "Poptip",
              {
                props: {
                  trigger: "hover",
                  placement: "bottom"
                }
              },
              [
                h("span", params.row.class_attendance),
                h(
                  "div",
                  {
                    slot: "content",
                    style: {
                      display: "flex",
                      "flex-direction": "column",
                      "align-content": "center",
                      "text-align": "center"
                    }
                  },
                  this.monicker.map((item, index) => {
                    return h(
                      "Button",
                      {
                        style: {
                          textAlign: "center",
                          padding: "4px",
                          width: "80px",
                          margin: "5px 0"
                        },
                        on: {
                          click: () => {
                            this.ClassState(params.row, index);
                          }
                        }
                      },
                      item
                    );
                  })
                )
              ]
            );
          }
        },
        {
          title: "上周交作业情况",
          key: "delivery_of_work",
          align: "center",
          width: 140,
          render: (h, params) => {
            return h(
              "Poptip",
              {
                props: {
                  trigger: "hover",
                  placement: "bottom"
                }
              },
              [
                h("span", params.row.delivery_of_work),
                h(
                  "div",
                  {
                    slot: "content",
                    style: {
                      display: "flex",
                      "flex-direction": "column",
                      "align-content": "center",
                      "text-align": "center"
                    }
                  },
                  this.jobMonicker.map((item, index) => {
                    return h(
                      "Button",
                      {
                        style: {
                          textAlign: "center",
                          padding: "4px",
                          width: "80px",
                          margin: "5px 0"
                        },
                        on: {
                          click: () => {
                            this.JobMonicker(params.row, index);
                          }
                        }
                      },
                      item
                    );
                  })
                )
              ]
            );
          }
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
                      this.switchMod("LearningReport", params.row);
                    }
                  }
                },
                "学情报告"
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
                      this.switchMod("StudentsFollowUp", params.row);
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
                      this.switchMod("CallOut", params.row);
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
          fixed: "left",
          width: 60,
          align: "center"
        },
        {
          title: "学员姓名",
          fixed: "left",
          key: "student_name",
          align: "center",
          width: 100
        },
        {
          title: "注册手机",
          fixed: "left",
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
          width: 140
        },
        {
          title: "主讲老师",
          key: "lecturer",
          align: "center",
          width: 100
        },
        {
          title: "上次跟进内容",
          key: "content_of_last_return_visit",
          align: "center",
          width: 180
        },
        {
          title: "本周到课情况",
          key: "class_attendance",
          align: "center",
          width: 140,
          render: (h, params) => {
            return h(
              "Poptip",
              {
                props: {
                  trigger: "hover",
                  placement: "bottom"
                }
              },
              [
                h("span", params.row.class_attendance),
                h(
                  "div",
                  {
                    slot: "content",
                    style: {
                      display: "flex",
                      "flex-direction": "column",
                      "align-content": "center",
                      "text-align": "center"
                    }
                  },
                  this.monicker.map((item, index) => {
                    return h(
                      "Button",
                      {
                        style: {
                          textAlign: "center",
                          padding: "4px",
                          width: "80px",
                          margin: "5px 0"
                        },
                        on: {
                          click: () => {
                            this.ClassState(params.row, index);
                          }
                        }
                      },
                      item
                    );
                  })
                )
              ]
            );
          }
        },
        {
          title: "上周交作业情况",
          key: "delivery_of_work",
          align: "center",
          width: 140,
          render: (h, params) => {
            return h(
              "Poptip",
              {
                props: {
                  trigger: "hover",
                  placement: "bottom"
                }
              },
              [
                h("span", params.row.delivery_of_work),
                h(
                  "div",
                  {
                    slot: "content",
                    style: {
                      display: "flex",
                      "flex-direction": "column",
                      "align-content": "center",
                      "text-align": "center"
                    }
                  },
                  this.jobMonicker.map((item, index) => {
                    return h(
                      "Button",
                      {
                        style: {
                          textAlign: "center",
                          padding: "4px",
                          width: "80px",
                          margin: "5px 0"
                        },
                        on: {
                          click: () => {
                            this.JobMonicker(params.row, index);
                          }
                        }
                      },
                      item
                    );
                  })
                )
              ]
            );
          }
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
                      this.switchMod("LearningReport", params.row);
                    }
                  }
                },
                "学情报告"
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
                      this.switchMod("StudentsFollowUp", params.row);
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
                      this.switchMod("CallOut", params.row);
                    }
                  }
                },
                "呼出"
              )
            ]);
          }
        }
      ],
      columns3: [
        {
          type: "selection",
          fixed: "left",
          width: 60,
          align: "center"
        },
        {
          title: "学员姓名",
          fixed: "left",
          key: "student_name",
          align: "center",
          width: 100
        },
        {
          title: "注册手机",
          fixed: "left",
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
          width: 140
        },
        {
          title: "主讲老师",
          key: "lecturer",
          align: "center",
          width: 100
        },
        {
          title: "回访日期",
          key: "date_of_return_visit",
          align: "center",
          width: 140
        },
        {
          title: "上次跟进内容",
          key: "content_of_last_return_visit",
          align: "center",
          width: 180
        },
        {
          title: "本周到课情况",
          key: "class_attendance",
          align: "center",
          width: 140,
          render: (h, params) => {
            return h(
              "Poptip",
              {
                props: {
                  placement: "bottom"
                }
              },
              [
                h("span", params.row.class_attendance),
                h(
                  "div",
                  {
                    slot: "content",
                    style: {
                      display: "flex",
                      "flex-direction": "column",
                      "align-content": "center",
                      "text-align": "center"
                    }
                  },
                  this.monicker.map((item, index) => {
                    return h(
                      "Button",
                      {
                        style: {
                          textAlign: "center",
                          padding: "4px",
                          width: "80px",
                          margin: "5px 0"
                        },
                        on: {
                          click: () => {
                            this.ClassState(params.row, index);
                          }
                        }
                      },
                      item
                    );
                  })
                )
              ]
            );
          }
        },
        {
          title: "上周交作业情况",
          key: "delivery_of_work",
          align: "center",
          width: 140,
          render: (h, params) => {
            return h(
              "Poptip",
              {
                props: {
                  trigger: "hover",
                  placement: "bottom"
                }
              },
              [
                h("span", params.row.delivery_of_work),
                h(
                  "div",
                  {
                    slot: "content",
                    style: {
                      display: "flex",
                      "flex-direction": "column",
                      "align-content": "center",
                      "text-align": "center"
                    }
                  },
                  this.jobMonicker.map((item, index) => {
                    return h(
                      "Button",
                      {
                        style: {
                          textAlign: "center",
                          padding: "4px",
                          width: "80px",
                          margin: "5px 0"
                        },
                        on: {
                          click: () => {
                            this.JobMonicker(params.row, index);
                          }
                        }
                      },
                      item
                    );
                  })
                )
              ]
            );
          }
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
                      this.switchMod("LearningReport", params.row);
                    }
                  }
                },
                "学情报告"
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
                      this.switchMod("StudentsFollowUp", params.row);
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
                      this.switchMod("CallOut", params.row);
                    }
                  }
                },
                "呼出"
              )
            ]);
          }
        }
      ],
      columns4: [
        {
          type: "selection",
          fixed: "left",
          width: 60,
          align: "center"
        },
        {
          title: "学员姓名",
          fixed: "left",
          key: "student_name",
          align: "center",
          width: 100
        },
        {
          title: "注册手机",
          fixed: "left",
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
          width: 140
        },
        {
          title: "主讲老师",
          key: "lecturer",
          align: "center",
          width: 100
        },
        {
          title: "上次跟进时间",
          key: "last_return_visit_time",
          align: "center",
          width: 140
        },
        {
          title: "上次跟进内容",
          key: "content_of_last_return_visit",
          align: "center",
          width: 180
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
                      this.switchMod("LearningReport", params.row);
                    }
                  }
                },
                "学情报告"
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
                      this.switchMod("StudentsFollowUp", params.row);
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
                      this.switchMod("CallOut", params.row);
                    }
                  }
                },
                "呼出"
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
    // 选择本周到课状态
    async ClassState(row, index) {
      let modeArr = new FormData();
      modeArr.account_work_id = row.account_work_id;
      modeArr.class_attendance = index + 1;
      let res = await this.$request({
        method: "post",
        url: UPDATELEARNINGSTATE,
        data: qs.stringify(modeArr)
      });
      if (res.data.code == 200) {
        this.getUserData();
      }
    },
    // 选择上周交作业情况
    async JobMonicker(row, index) {
      let modeArr = new FormData();
      modeArr.account_work_id = row.account_work_id;
      modeArr.delivery_of_work = index + 1;
      let res = await this.$request({
        method: "post",
        url: UPDATELEARNINGSTATE,
        data: qs.stringify(modeArr)
      });
      if (res.data.code == 200) {
        this.getUserData();
      }
    },
    // 关闭窗口状态
    changeShowMod(val) {
      this.showMod = val;
      this.type = "";
    },
    // 开关
    switchMod(name, row) {
      this.showMod = true;
      this.row = row;
      this.type = name;
    },
    // 转换date
    changeAllocateTimeDate(time) {
      this.formItem.create_st_time = time[0];
      this.formItem.create_en_time = time[1];
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
    ...mapMutations(["setCurrentPages", "setSelectState", "setRefresh"]),
    // 设置当前页码
    changePages(val) {
      this.mode.page = val;
      this.getUserData();
    },
    // 设置搜索葜
    formData(val) {
      this.mode = val;
    },
    // 点击选项卡切换触发
    changeTab(value) {
      this.deleteFormData();
      if (value === "name1") {
        this.formItem.start_type = 1;
      } else if (value === "name2") {
        this.formItem.start_type = 2;
      } else if (value === "name3") {
        this.formItem.start_type = 3;
      } else if (value === "name4") {
        this.formItem.start_type = 4;
      } else if (value === "name5") {
        this.formItem.follow_type = 2;
        this.formItem.start_type = 5;
      } else if (value === "name6") {
        this.formItem.start_type = 6;
      } else if (value === "name7") {
        this.formItem.follow_type = 2;
        this.formItem.start_type = 7;
      }
    },
    // 获取用户信息
    async getUserData() {
      this.isLoading = true;
      let res = await this.$request({
        method: "post",
        url: INCLASS,
        data: qs.stringify(this.formItem)
      });

      let links = res.data.data.links;
      // 设置搜索选项
      this.setSelectState(links);
      this.dataList = res.data.data.data;
      this.dataList.map(item => {
        item.classSchedule =
          item.course_rate_of_progress + "/" + item.class_hour;
        // 显示用户数据并把对应年级科目班级类型转变形式
        item.subject = this.selectState.subject[item.subject];
        item.grade = this.selectState.grade[item.grade];
        item.class_type = this.selectState.class_type[item.class_type];
        item.class_attendance = this.monicker[item.class_attendance - 1];
        if (item.delivery_of_work == "-") {
          item.delivery_of_work = "-";
        } else {
          item.delivery_of_work = this.jobMonicker[item.delivery_of_work - 1];
        }
      });
      this.setCurrentPages(this.dataList);

      // 设置页码
      this.total = links.total;
      this.per_page = links.per_page;
      this.current_page = links.current_page;
      this.last_page = links.last_page;

      this.isLoading = false;
    }
  }
};
</script>

<style scoped>
.card {
  margin: 5px;
  overflow: hidden;
}
</style>
<style>
.ivu-poptip-popper {
  min-width: 0 !important;
}
</style>