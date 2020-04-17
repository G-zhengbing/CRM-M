<template>
  <div class="course">
    <!-- 面包屑 -->
    <Crumbs>
      <template slot="title">课程</template>
    </Crumbs>
    <!-- 卡片包裹 -->
    <Card class="card">
      <div style="text-align:center">
        <SelectBox
          :studentName="true"
          :mobile="true"
          :selectGrade="true"
          :classType="true"
          :lecturer="true"
          :tradingHour="true"
          :courseType="true"
          :chargeMode="true"
          :courseState="true"
          :curriculumTime="true"
        />
        <TableBox
          :columns="columns"
          :dataList="dataList"
          :allocationData="'删除'"
          :selectData="true"
          :newCourse="true"
        />
        <PagingBox />
      </div>
    </Card>
  </div>
</template>

<script>
import Course from "@/store/course";

export default {
  data() {
    return {
      columns: Course.state.columns1,
      dataList: Course.state.data1
    };
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
.subjectBGC {
  background-color: #f2f2f2;
  display: inline-block;
  padding: 5px;
}
</style>