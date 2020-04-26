<template>
  <div class="teacher">
    <!-- 面包屑 -->
    <bread-crumb>
      <template slot="title">教师管理</template>
    </bread-crumb>
    <!-- 卡片包裹 -->
    <Card class="card">
      <NewLecturer style="margin-bottom: 10px;" />
      <div style="text-align:center">
        <Tabs type="card" value="name1" @on-click="changeTab">
          <TabPane label="教师" name="name1">
            <SelectBox
              :studentName="true"
              :mobile="true"
              :selectGrade="true"
              :classType="true"
              :lecturer="true"
              :classname="true"
              :tradingHour="true"
              :teacherName="true"
              :teacherMobile="true"
              :ProfessorSubject="true"
            />
            <TableBox :columns="columns" :dataList="dataList" />
            <PagingBox
              :total="total"
              :per_page="per_page"
              :current_page="current_page"
              :last_page="last_page"
              @changePages="changePages"
            />
          </TabPane>
          <TabPane label="日程表" name="name2"></TabPane>
        </Tabs>
      </div>
    </Card>
    <Loading v-show="isLoading" />
  </div>
</template>

<script>
import Teacher from "@/store/teacher";

export default {
  data() {
    return {
      isLoading: false, // loading开关
      columns: Teacher.state.columns1,
      dataList: Teacher.state.data1,
      value: "name1", // 判断卡片选择状态
      total: 100,
      per_page: 10,
      current_page: 1,
      last_page: 1
    };
  },
  methods: {
    // 点击切换Tab页
    changeTab() {
      this.value = value;
      if (this.value === "name1") {
        this.columns = Teacher.state.columns1;
      } else if (this.value == "name2") {
        this.columns = Teacher.state.columns2;
      }
    },
    // 改变页码
    changePages(val) {
      this.mode.page = val;
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