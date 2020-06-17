<template>
  <div class="behaviorRecord">
    <Tabs value="name1" type="card" :animated="false" @on-click="changeTab">
      <TabPane label="一对一预约" name="name1">
        <div class="title_top">
          <DatePicker
            v-model="date"
            type="datetimerange"
            placement="bottom-end"
            placeholder="日期 - 日期"
            style="width: 165px;"
            @on-change="changeDate"
          ></DatePicker>
        </div>

        <Table :columns="columns11" :data="data10" border height="500"></Table>
      </TabPane>
    </Tabs>

    <PagingBox
      :total="total"
      :per_page="per_page"
      :current_page="current_page"
      :last_page="last_page"
      @changePages="changePages"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: "",
      total: 100,
      per_page: 10,
      current_page: 1,
      last_page: 1,
      columns11: [
        {
          title: "日期",
          key: "date",
          align: "center"
        },
        {
          title: "页面访问数（pv）",
          key: "name",
          align: "center"
        },
        {
          title: "访问用户数（uv）",
          key: "name",
          align: "center"
        },
        {
          title: "领取按钮",
          align: "center",
          children: [
            {
              title: "点击用户数",
              key: "caddress",
              align: "center"
            },
            {
              title: "成功预约",
              key: "cname",
              align: "center"
            }
          ]
        },
        {
          title: "返回顶部按钮1",
          align: "center",
          children: [
            {
              title: "点击用户数",
              key: "caddress",
              align: "center"
            },
            {
              title: "成功预约",
              key: "cname",
              align: "center"
            }
          ]
        },
        {
          title: "返回顶部按钮2",
          align: "center",
          children: [
            {
              title: "点击用户数",
              key: "caddress",
              align: "center"
            },
            {
              title: "成功预约",
              key: "cname",
              align: "center"
            }
          ]
        }
      ],
      data10: [
        {
          date: "2020.05.01",
          name: 456,
          caddress: 100,
          cname: 20
        }
      ]
    };
  },
  methods: {
    // 点击选项卡切换触发
    changeTab(value) {

    },
    // 转换date
    changeDate(time) {
      
    },
    // 改变页码
    changePages(val) {
      
    }
  }
};
</script>

<style scoped>
.behaviorRecord {
  padding: 20px;
}
.title_top {
  margin-bottom: 20px;
  text-align: right;
}
</style>