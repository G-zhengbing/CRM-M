<template>
  <!-- 分页 -->
  <div class="paging">
    <!-- <span class="pagingData">共 5 页/ 50条数据</span> -->
    <Page
      :total="total"
      :page-size="per_page"
      :current="current_page"
      @on-change="changePage"
      show-elevator
      show-total
    />
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      required: false
    },
    per_page: {
      type: Number,
      required: false
    },
    current_page: {
      type: Number,
      required: false
    },
    last_page: {
      type: Number,
      required: false
    }
  },
  data() {
    return {};
  },
  methods: {
    // 改变页码
    changePage(index) {
      this.$emit("changePages", index);
    }
  },
  created() {}
};
</script>

<style scoped>
.paging {
  float: right;
  margin: 20px 10px 30px;
  overflow: hidden;
  display: flex;
  align-items: center;
}
.ivu-page {
  float: right;
}
.pagingData {
  padding-right: 30px;
}
</style>