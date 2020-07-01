<template>
  <div class="oneononestudent">
    <div class="contaner">
      <div style="text-align:center">
        <Tabs type="card" value="name1" @on-click="changeTab" :animated="false">
          <TabPane label="我的学员" name="name1">
            <SelectBox
              @formData="formData"
              :classType="true"
              :tradingHour="true"
              :chooseSubject="true"
              :placeholder="true"
              :firstState="true"
            />
            <TableBox
              :columns="columns"
              :dataList="dataList"
              :selectData="true"
              :page_num="formItem.page_num"
              @pageNums="pageNums"
            />
            <PagingBox
              :total="total"
              :per_page="per_page"
              :current_page="current_page"
              :last_page="last_page"
              @changePages="changePages"
            />
          </TabPane>
          <TabPane label="今日新分" name="name2">
            <SelectBox
              @formData="formData"
              :tradingHour="true"
              :chooseSubject="true"
              :placeholder="true"
              :firstState="true"
            />
            <TableBox
              :columns="columns"
              :dataList="dataList"
              :selectData="true"
              :page_num="formItem.page_num"
              @pageNums="pageNums"
            />
            <PagingBox
              :total="total"
              :per_page="per_page"
              :current_page="current_page"
              :last_page="last_page"
              @changePages="changePages"
            />
          </TabPane>
          <TabPane label="首电待完成" name="name3">
            <SelectBox
              @formData="formData"
              :tradingHour="true"
              :chooseSubject="true"
              :placeholder="true"
              :allocateTime="true"
            />
            <TableBox
              :columns="columns"
              :dataList="dataList"
              :selectData="true"
              :page_num="formItem.page_num"
              @pageNums="pageNums"
            />
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
    </div>
    <CallOut v-if="type == 'CallOut'" :row="row" :showMod="showMod" @changeShowMod="changeShowMod" />
    <StudentsFollowUp
      v-else-if="type == 'StudentsFollowUp'"
      :row="row"
      :showMod="showMod"
      @changeShowMod="changeShowMod"
    />
    <CreatedOrder
      v-else-if="type == 'createdOrder'"
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
    <Loading v-show="isLoading" />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { VIPUSERLIST } from "@/uilt/url/url";
import storage from "@/uilt/storage";
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
          title: "班主任",
          key: "follow_user",
          align: "center",
          width: 140
        },
        {
          title: "上次跟进时间",
          key: "operation_time",
          align: "center",
          width: 170
        },
        {
          title: "上次跟进内容",
          key: "visit_content",
          align: "center",
          width: 200
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
          width: 220
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
          width: 110
        },
        {
          title: "剩余课时",
          key: "restOfClass",
          align: "center",
          width: 95
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
          width: 160,
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
                      this.switch("createdOrder", params.row);
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
                      this.switch("Audition", params.row);
                    }
                  }
                },
                "试听"
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
              //         this.switch("Referral", params.row);
              //       }
              //     }
              //   },
              //   "转介绍"
              // ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.switch("CallOut", params.row);
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
                      this.switch("StudentsFollowUp", params.row);
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
          width: 160,
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
                      this.switch("createdOrder", params.row);
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
                      this.switch("Audition", params.row);
                    }
                  }
                },
                "试听"
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
              //         this.switch("Referral", params.row);
              //       }
              //     }
              //   },
              //   "转介绍"
              // ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.switch("CallOut", params.row);
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
                      this.switch("StudentsFollowUp", params.row);
                    }
                  }
                },
                "跟进"
              )
            ]);
          }
        }
      ],
      teacherList: storage.getDaiban().header_list
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
    // 每页条数
    pageNums(val) {
      this.formItem.page_num = val;
      this.getUserData();
    },
    // 关闭窗口状态
    changeShowMod(val) {
      this.showMod = val;
      this.type = "";
    },
    // 开关
    switch(name, row) {
      this.showMod = true;
      this.row = row;
      this.type = name;
    },
    // 点击清除选项
    deleteFormData() {
      this.formItem = {
        page: 1, // 页码
        page_num: "10" // 每页条数
      };
    },
    ...mapMutations(["setCurrentPages", "setSelectState", "setRefresh"]),
    // 改变页码
    changePages(val) {
      this.formItem.page = val;
      this.getUserData();
    },
    // 设置mode搜索词汇
    formData(val) {
      let list_type = this.formItem.list_type;
      this.formItem = val;
      this.formItem.list_type = list_type;
    },
    // 点击选项卡切换触发
    changeTab(value) {
      this.value = value;
      this.deleteFormData();
      if (this.value === "name1") {
        this.columns = this.columns1;
        this.formItem.list_type = 1;
      } else if (this.value == "name2") {
        this.columns = this.columns2;
        this.formItem.list_type = 2;
      } else if (this.value == "name3") {
        this.columns = this.columns2;
        this.formItem.list_type = 3;
      }
      this.getUserData();
    },
    // 获取信息
    async getUserData() {
      // loading 开
      this.isLoading = true;
      this.formItem.product_type = 4; // 设置一对一接口
      let res = await this.$request({
        method: "post",
        url: VIPUSERLIST,
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