<template>
  <div class="statisticAnalysis">
    <!-- 面包屑 -->
    <Crumbs>
      <template slot="title">统计分析</template>
    </Crumbs>
    <Card class="card">
      <div style="text-align:center">
        <Tabs type="card" value="name1" @on-click="changeTab">
          <TabPane label="今日" name="name1">
            <div class="title">
              <!-- <Form class="select" ref="formValidate" :model="formItem" inline>
                <FormItem>
                  <DatePicker
                    v-model="formItem.create_sts_time"
                    type="datetimerange"
                    placement="bottom-end"
                    placeholder="分配时间 - 分配时间"
                    style="width: 165px"
                    @on-change="changeCreateDate"
                  ></DatePicker>
                </FormItem>
              </Form>-->
            </div>
            <TableBox :columns="columns" :dataList="dataList" />
          </TabPane>
          <TabPane label="本周" name="name2">
            <div class="title">
              <!-- <Form class="select" ref="formValidate" :model="formItem" inline>
                <FormItem>
                  <DatePicker
                    v-model="formItem.create_sts_time"
                    type="datetimerange"
                    placement="bottom-end"
                    placeholder="分配时间 - 分配时间"
                    style="width: 165px"
                    @on-change="changeCreateDate"
                  ></DatePicker>
                </FormItem>
              </Form>-->
            </div>
            <TableBox :columns="columns" :dataList="dataList" />
          </TabPane>
          <TabPane label="本月" name="name3">
            <div class="title">
              <!-- <Form class="select" ref="formValidate" :model="formItem" inline>
                <FormItem>
                  <DatePicker
                    v-model="formItem.create_sts_time"
                    type="datetimerange"
                    placement="bottom-end"
                    placeholder="分配时间 - 分配时间"
                    style="width: 165px"
                    @on-change="changeCreateDate"
                  ></DatePicker>
                </FormItem>
              </Form>-->
            </div>
            <TableBox :columns="columns" :dataList="dataList" />
          </TabPane>
        </Tabs>
      </div>
    </Card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formItem: {},
      columns: [],
      dataList: [],
      total: 100,
      per_page: 10,
      current_page: 1,
      last_page: 1,
      columns1: [
        {
          title: "销售",
          key: "student_name",
          align: "center",
          width: 100
        },
        {
          title: "呼出总数",
          key: "student_name",
          align: "center",
          width: 120
        },
        {
          title: "呼出电话总量",
          key: "student_name",
          align: "center",
          width: 140
        },
        {
          title: "有效呼出时长",
          key: "student_name",
          align: "center",
          width: 140
        },
        {
          title: "接通电话数量",
          key: "student_name",
          align: "center",
          width: 140
        },
        {
          title: "平均通话时长",
          key: "student_name",
          align: "center",
          width: 140
        },
        {
          title: "接通率",
          key: "student_name",
          align: "center",
          width: 120
        },
        {
          title: "今日新分总量",
          key: "student_name",
          align: "center",
          width: 140
        },
        {
          title: "今日新分呼出电话总量",
          key: "student_name",
          align: "center",
          width: 140
        },
        {
          title: "今日新分接通电话总量",
          key: "student_name",
          align: "center",
          width: 140
        },
        {
          title: "今日新分接通率",
          key: "student_name",
          align: "center",
          width: 140
        },
        {
          title: "新增一对一预约量",
          key: "student_name",
          align: "center",
          width: 140
        },
			],
			columns2: [
        {
          title: "销售",
          key: "student_name",
          align: "center",
          width: 100
        },
        {
          title: "呼出总数",
          key: "student_name",
          align: "center",
          width: 120
        },
        {
          title: "呼出电话总量",
          key: "student_name",
          align: "center",
          width: 140
        },
        {
          title: "有效呼出时长",
          key: "student_name",
          align: "center",
          width: 140
        },
        {
          title: "接通电话数量",
          key: "student_name",
          align: "center",
          width: 140
        },
        {
          title: "平均通话时长",
          key: "student_name",
          align: "center",
          width: 140
        },
        {
          title: "接通率",
          key: "student_name",
          align: "center",
          width: 120
        },
        {
          title: "本周新分总量",
          key: "student_name",
          align: "center",
          width: 140
        },
        {
          title: "本周新分呼出电话总量",
          key: "student_name",
          align: "center",
          width: 140
        },
        {
          title: "本周新分接通电话总量",
          key: "student_name",
          align: "center",
          width: 140
        },
        {
          title: "本周新分接通率",
          key: "student_name",
          align: "center",
          width: 140
        },
        {
          title: "新增一对一预约量",
          key: "student_name",
          align: "center",
          width: 140
        },
        {
          title: "本周新增取消一对一预约量",
          key: "student_name",
          align: "center",
          width: 140
        },
			],
			columns3: [
        {
          title: "销售",
          key: "student_name",
          align: "center",
          width: 100
        },
        {
          title: "呼出总数",
          key: "student_name",
          align: "center",
          width: 120
        },
        {
          title: "呼出电话总量",
          key: "student_name",
          align: "center",
          width: 140
        },
        {
          title: "有效呼出时长",
          key: "student_name",
          align: "center",
          width: 140
        },
        {
          title: "接通电话数量",
          key: "student_name",
          align: "center",
          width: 140
        },
        {
          title: "平均通话时长",
          key: "student_name",
          align: "center",
          width: 140
        },
        {
          title: "接通率",
          key: "student_name",
          align: "center",
          width: 120
        },
        {
          title: "本月新分总量",
          key: "student_name",
          align: "center",
          width: 140
        },
        {
          title: "本月新分呼出电话总量",
          key: "student_name",
          align: "center",
          width: 140
        },
        {
          title: "本月新分接通电话总量",
          key: "student_name",
          align: "center",
          width: 140
        },
        {
          title: "本月新分接通率",
          key: "student_name",
          align: "center",
          width: 140
        },
        {
          title: "本月累计新增一对一预约量（取消的不计）",
          key: "student_name",
          align: "center",
          width: 140
        },
        {
          title: "累计有效试听数量",
          key: "student_name",
          align: "center",
          width: 140
        },
        {
          title: "累计取消试听数量",
          key: "student_name",
          align: "center",
          width: 140
        },
      ]
    };
  },
  methods: {
    // 点击选项卡切换触发
    changeTab(value) {
			if(value === "name1") {
        this.columns = this.columns1;
			} else if (value == "name2") {
        this.columns = this.columns2;
      } else if (value == "name3") {
        this.columns = this.columns3;
			}
		},
		// 改变页码
    changePages(val) {
    },
  },
  created() {
    this.columns = this.columns1;
  }
};
</script>

<style scoped>
.card {
  margin: 5px;
  overflow: auto;
}
</style>