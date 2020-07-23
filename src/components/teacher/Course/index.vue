<template>
  <div class="course">
    <div class="contaner">
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [],
      dataList: []
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