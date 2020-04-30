<template>
  <div class="statisticAnalysis">
    <!-- 面包屑 -->
    <bread-crumb>
      <template slot="title">统计分析</template>
    </bread-crumb>
    <Card class="card">
      <div style="text-align:center">
        <Tabs type="card" value="name1" @on-click="changeTab">
          <TabPane label="今日" name="name1">
            <div class="title">
              <Form
                class="select"
                ref="formValidate"
                :model="formItem"
                inline
                style="display: flex"
              >
                <FormItem>
                  <TimePicker
                    format="HH:mm"
                    type="timerange"
                    placement="bottom-start"
                    placeholder="分配时间"
                    style="width: 168px"
                    @on-change="changeCreateDate"
                  ></TimePicker>
                </FormItem>
              </Form>
            </div>
            <TableBox :columns="columns" :dataList="dataList" />
          </TabPane>
          <TabPane label="本周" name="name2">
            <TableBox :columns="columns" :dataList="dataList" />
          </TabPane>
          <TabPane label="本月" name="name3">
            <TableBox :columns="columns" :dataList="dataList" />
          </TabPane>
        </Tabs>
      </div>
    </Card>
    <Loading v-show="isLoading" />
  </div>
</template>

<script>
import { CALLRECORDSTATISTICS } from "@/uilt/url/url";
export default {
  data() {
    return {
      type: 1,
      formItem: {},
      columns: [],
      dataList: [],
      start_time: "",
      end_time: "",
      isLoading: false,
      columns1: [
        {
          title: "班主任",
          fixed: "left",
          key: "teacher_name",
          align: "center",
          width: 100
        },
        {
          title: "呼出总数",
          key: "total_outgoing_calls",
          align: "center",
          width: 120
        },
        {
          title: "呼出电话总量",
          key: "total_number_of_outgoing_users",
          align: "center",
          width: 140
        },
        {
          title: "有效呼出时长",
          key: "effective_call_duration",
          align: "center",
          width: 140
        },
        {
          title: "接通电话数量",
          key: "total_number_of_connected_users",
          align: "center",
          width: 140
        },
        {
          title: "平均通话时长",
          key: "average_talk_time",
          align: "center",
          width: 140
        },
        {
          title: "接通率",
          key: "connectivity",
          align: "center",
          width: 120
        },
        {
          title: "今日新分总量",
          key: "total_new_points",
          align: "center",
          width: 140
        },
        {
          title: "今日新分呼出电话总量",
          key: "total_number_of_outgoing_calls",
          align: "center",
          width: 140
        },
        {
          title: "今日新分接通电话总量",
          key: "total_number_of_incoming_calls",
          align: "center",
          width: 140
        },
        {
          title: "今日新分接通率",
          key: "new_points_pass_rate",
          align: "center",
          width: 140
        },
        {
          title: "新增一对一预约量",
          key: "one_to_one_appointment",
          align: "center",
          width: 140
        }
      ],
      columns2: [
        {
          title: "班主任",
          fixed: "left",
          key: "teacher_name",
          align: "center",
          width: 100
        },
        {
          title: "呼出总数",
          key: "total_outgoing_calls",
          align: "center",
          width: 120
        },
        {
          title: "呼出电话总量",
          key: "total_number_of_outgoing_users",
          align: "center",
          width: 140
        },
        {
          title: "有效呼出时长",
          key: "effective_call_duration",
          align: "center",
          width: 140
        },
        {
          title: "接通电话数量",
          key: "total_number_of_connected_users",
          align: "center",
          width: 140
        },
        {
          title: "平均通话时长",
          key: "average_talk_time",
          align: "center",
          width: 140
        },
        {
          title: "接通率",
          key: "connectivity",
          align: "center",
          width: 120
        },
        {
          title: "本周新分总量",
          key: "total_new_points",
          align: "center",
          width: 140
        },
        {
          title: "本周新分呼出电话总量",
          key: "total_number_of_outgoing_calls",
          align: "center",
          width: 140
        },
        {
          title: "本周新分接通电话总量",
          key: "total_number_of_incoming_calls",
          align: "center",
          width: 140
        },
        {
          title: "本周新分接通率",
          key: "new_points_pass_rate",
          align: "center",
          width: 140
        },
        {
          title: "新增一对一预约量",
          key: "one_to_one_appointment",
          align: "center",
          width: 140
        },
        {
          title: "本周新增取消一对一预约量",
          key: "one_to_one_cancellation_amount",
          align: "center",
          width: 140
        }
      ],
      columns3: [
        {
          title: "班主任",
          fixed: "left",
          key: "teacher_name",
          align: "center",
          width: 100
        },
        {
          title: "呼出总数",
          key: "total_outgoing_calls",
          align: "center",
          width: 120
        },
        {
          title: "呼出电话总量",
          key: "total_number_of_outgoing_users",
          align: "center",
          width: 140
        },
        {
          title: "有效呼出时长",
          key: "effective_call_duration",
          align: "center",
          width: 140
        },
        {
          title: "接通电话数量",
          key: "total_number_of_connected_users",
          align: "center",
          width: 140
        },
        {
          title: "平均通话时长",
          key: "average_talk_time",
          align: "center",
          width: 140
        },
        {
          title: "接通率",
          key: "connectivity",
          align: "center",
          width: 120
        },
        {
          title: "本月新分总量",
          key: "total_new_points",
          align: "center",
          width: 140
        },
        {
          title: "本月新分呼出电话总量",
          key: "total_number_of_outgoing_calls",
          align: "center",
          width: 140
        },
        {
          title: "本月新分接通电话总量",
          key: "total_number_of_incoming_calls",
          align: "center",
          width: 140
        },
        {
          title: "本月新分接通率",
          key: "new_points_pass_rate",
          align: "center",
          width: 140
        },
        {
          title: "本月累计新增一对一预约量（取消的不计）",
          key: "one_to_one_appointment",
          align: "center",
          width: 140
        },
        {
          title: "累计有效试听数量",
          key: "number_of_effective_auditions",
          align: "center",
          width: 140
        },
        {
          title: "累计取消试听数量",
          key: "one_to_one_cancellation_amount",
          align: "center",
          width: 140
        }
      ]
    };
  },
  methods: {
    // 点击选项卡切换触发
    changeTab(value) {
      if (value === "name1") {
        this.columns = this.columns1;
        this.type = 1;
        this.getUserData();
      } else if (value == "name2") {
        this.columns = this.columns2;
        this.type = 2;
        this.getUserData();
      } else if (value == "name3") {
        this.columns = this.columns3;
        this.type = 3;
        this.getUserData();
      }
    },
    // 转换date
    changeCreateDate(time) {
      this.start_time = time[0];
      this.end_time = time[1];
      this.getUserData();
    },
    // 获取用户信息
    async getUserData() {
      this.isLoading = true;
      let res = await this.$request({
        method: "get",
        url: CALLRECORDSTATISTICS,
        params: {
          type: this.type,
          start_time: this.start_time,
          end_time: this.end_time
        }
      });
      this.dataList = res.data.data.data;
      this.isLoading = false;
    }
  },
  created() {
    this.columns = this.columns1;
    this.getUserData();
  }
};
</script>

<style scoped>
.card {
  margin: 5px;
  overflow: auto;
}
</style>