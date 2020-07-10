<template>
  <div class="OneMyReservation">
    <div class="contaner">
      <div style="text-align:center">
        <Tabs type="card" value="name1" @on-click="changeTab" :animated="false">
          <TabPane label="全部预约单" name="name1">
            <div class="title">
              <Form class="select" ref="formValidate" :model="formItem" inline>
                <FormItem>
                  <Input v-model="formItem.student_name" placeholder="学员姓名" style="width: 80px;"></Input>
                </FormItem>
                <FormItem>
                  <Input v-model="formItem.mobile" placeholder="注册手机" style="width: 80px;"></Input>
                </FormItem>
                <FormItem>
                  <Select v-model="formItem.type" placeholder="试听类型" style="width: 100px;">
                    <Option
                      :value="index"
                      v-for="(item,index) in selectState.type"
                      :key="index"
                    >{{item}}</Option>
                  </Select>
                </FormItem>
                <FormItem>
                  <Select v-model="formItem.appoint_status" placeholder="状态" style="width: 80px;">
                    <Option
                      :value="index"
                      v-for="(item,index) in selectState.appoint_status"
                      :key="index"
                    >{{item}}</Option>
                  </Select>
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
                  <DatePicker
                    v-model="formItem.courseDates"
                    type="datetimerange"
                    placement="bottom-end"
                    placeholder="上课日期 - 上课日期"
                    @on-change="changeCourseData"
                    style="width: 165px"
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
            <TableBox :columns="columns1" :dataList="dataList" />
            <PagingBox
              @changePages="changePages"
              :total="total"
              :per_page="per_page"
              :current_page="current_page"
              :last_page="last_page"
            />
          </TabPane>
          <TabPane label="今日上课提醒" name="name2">
            <div class="title">
              <Form class="select" ref="formValidate" :model="formItem" inline>
                <FormItem>
                  <Input v-model="formItem.student_name" placeholder="学员姓名" style="width: 80px;"></Input>
                </FormItem>
                <FormItem>
                  <Input v-model="formItem.mobile" placeholder="注册手机" style="width: 80px;"></Input>
                </FormItem>
                <FormItem>
                  <Select v-model="formItem.type" placeholder="试听类型" style="width: 100px;">
                    <Option
                      :value="index"
                      v-for="(item,index) in selectState.type"
                      :key="index"
                    >{{item}}</Option>
                  </Select>
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
            <TableBox :allocationData="'签到'" :columns="columns1" :dataList="dataList" />
            <PagingBox
              @changePages="changePages"
              :total="total"
              :per_page="per_page"
              :current_page="current_page"
              :last_page="last_page"
            />
          </TabPane>
          <TabPane label="今日上课情况" name="name3">
            <div class="title">
              <Form class="select" ref="formValidate" :model="formItem" inline>
                <FormItem>
                  <Input v-model="formItem.student_name" placeholder="学员姓名" style="width: 80px;"></Input>
                </FormItem>
                <FormItem>
                  <Input v-model="formItem.mobile" placeholder="注册手机" style="width: 80px;"></Input>
                </FormItem>
                <FormItem>
                  <Select v-model="formItem.type" placeholder="试听类型" style="width: 100px;">
                    <Option
                      :value="index"
                      v-for="(item,index) in selectState.type"
                      :key="index"
                    >{{item}}</Option>
                  </Select>
                </FormItem>
                <FormItem>
                  <Select v-model="formItem.appoint_status" placeholder="状态" style="width: 80px;">
                    <Option
                      :value="index"
                      v-for="(item,index) in selectState.appoint_status"
                      :key="index"
                    >{{item}}</Option>
                  </Select>
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
            <TableBox :columns="columns2" :dataList="dataList" />
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
    <CallOut v-if="type == 'CallOut'" :row="row" :showMod="showMod" @changeShowMod="changeShowMod" />
    <Appraisal
      v-else-if="type == 'Appraisal'"
      :row="row"
      :showMod="showMod"
      @changeShowMod="changeShowMod"
    />
    <Signin
      v-else-if="type == 'Signin'"
      :row="row"
      :showMod="showMod"
      @changeShowMod="changeShowMod"
    />
    <Cancelreservation
      v-else-if="type == 'Cancelreservation'"
      :row="row"
      :showMod="showMod"
      @changeShowMod="changeShowMod"
    />
    <Loading v-show="isLoading" />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { APPOINTMENTVIPCLASSLIST } from "@/uilt/url/url";
import qs from "qs";
import storage from "@/uilt/storage";
import OneMyReservation from "@/store/onemyreservation";
export default {
  computed: {
    ...mapState({
      refresh: state => state.currentPage.refresh,
      selectState: state => state.selectState
    })
  },
  data() {
    return {
      dataList: [],
      isLoading: false,
      mode: [], // formData数据
      total: 100,
      per_page: 10,
      current_page: 1,
      last_page: 1,
      formItem: {
        page: 1, // 页码
        page_num: "10" // 每页条数
      },
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
          title: "试听类型",
          key: "type",
          align: "center",
          width: 100
        },
        {
          title: "试听课程",
          key: "course_name",
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
          title: "教师",
          key: "name",
          align: "center",
          width: 100
        },
        {
          title: "上课日期",
          key: "date_time",
          align: "center",
          sortable: true,
          sortType: "asc",
          width: 140
        },
        {
          title: "上课时段",
          key: "time_slot",
          align: "center",
          width: 140
        },
        {
          type: "html",
          title: "状态",
          key: "appoint_status",
          align: "center",
          width: 120
        },
        {
          title: "预约提交时间",
          key: "create_time",
          align: "center",
          width: 180
        },
        {
          title: "备注",
          key: "note",
          align: "center",
          width: 140
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
                      this.switchMod("Signin", params.row);
                    }
                  }
                },
                "签到"
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
                      this.switchMod("Appraisal", params.row);
                    }
                  }
                },
                "查看测评"
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
                      this.switchMod("Cancelreservation", params.row);
                    }
                  }
                },
                "取消预约"
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
          title: "试听类型",
          key: "type",
          align: "center",
          width: 100
        },
        {
          title: "试听课程",
          key: "course_name",
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
          title: "教师",
          key: "name",
          align: "center",
          width: 100
        },
        {
          title: "上课日期",
          key: "date_time",
          align: "center",
          sortable: true,
          sortType: "asc",
          width: 140
        },
        {
          title: "上课时段",
          key: "time_slot",
          align: "center",
          width: 140
        },
        {
          type: "html",
          title: "状态",
          key: "appoint_status",
          align: "center",
          width: 120
        },
        {
          title: "预约提交时间",
          key: "create_time",
          align: "center",
          width: 180
        },
        {
          title: "备注",
          key: "note",
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
                      this.switchMod("Appraisal", params.row);
                    }
                  }
                },
                "查看测评"
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
      row: "",
      type: "",
      showMod: false
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
    // 开关
    switchMod(name, row) {
      this.showMod = true;
      this.row = row;
      this.type = name;
    },
    // 转换date
    changeCourseData(time) {
      this.formItem.date_start_time = time[0];
      this.formItem.date_end_time = time[1];
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
    // 设置当前页码
    changePages(val) {
      this.formItem.page = val;
    },
    // 设置mode搜索词汇
    formData(val) {
      this.mode = val;
    },
    ...mapMutations(["setCurrentPages", "setSelectState", "setRefresh"]),
    // 点击选项卡切换触发
    changeTab(value) {
      this.deleteFormData();
      if (value === "name3") {
        this.formItem.list_type = 3;
      } else if (value === "name2") {
        this.formItem.list_type = 2;
      } else if (value === "name1") {
        this.formItem.list_type = 1;
      }
    },
    // 获取用户信息
    async getUserData() {
      this.isLoading = true;
      this.formItem.type = 4; // 设置为一对一内容
      let res = await this.$request({
        method: "post",
        url: APPOINTMENTVIPCLASSLIST,
        data: qs.stringify(this.formItem)
      });

      let links = res.data.data.links;
      // 设置搜索选项
      this.setSelectState(links);
      this.dataList = res.data.data.data;
      this.dataList.map(item => {
        // 显示用户数据并把对应年级科目班级类型转变形式
        item.subject = this.selectState.subject[item.subject];
        item.grade = this.selectState.grade[item.grade];
        item.type = this.selectState.type[item.type];
        item.stateBtn = item.appoint_status == 1 ? true : false;
        item.appoint_status = this.selectState.appointBtn[item.appoint_status];
      });
      this.setCurrentPages(this.dataList);

      // 设置页码
      this.total = links.total;
      this.per_page = links.per_page;
      this.current_page = links.current_page;
      this.last_page = links.last_page;

      this.isLoading = false;
    }
  },
  created() {
    this.setSelectState(storage.getDaiban().screen_list);
  }
};
</script>

<style scoped>
.card {
  margin: 5px;
  overflow: hidden;
}
</style>