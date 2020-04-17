<template>
  <div class="OneInClass">
    <!-- 面包屑 -->
    <Crumbs>
      <template slot="title">一对一开课中学员</template>
    </Crumbs>

    <!-- 卡片包裹 -->
    <Card class="card">
      <div style="text-align:center">
        <Tabs type="card" value="name1" @on-click="changeTab">
          <TabPane label="全部开课中学员" name="name1">
            <SelectBox
              @formData="formData"
              :classType="true"
              :lecturer="true"
              :chooseSubject="true"
            />
            <TableBox :columns="columns" :dataList="dataList" />
            <PagingBox
              @changePages="changePages"
              :total="total"
              :per_page="per_page"
              :current_page="current_page"
              :last_page="last_page"
            />
          </TabPane>
          <TabPane label="今日待回访" name="name2">
            <SelectBox @formData="formData" />
            <TableBox :columns="columns" :dataList="dataList" />
            <PagingBox
              @changePages="changePages"
              :total="total"
              :per_page="per_page"
              :current_page="current_page"
              :last_page="last_page"
            />
          </TabPane>
          <TabPane label="约定今日跟进" name="name3">
            <SelectBox @formData="formData" />
            <TableBox :columns="columns" :dataList="dataList" />
            <PagingBox
              @changePages="changePages"
              :total="total"
              :per_page="per_page"
              :current_page="current_page"
              :last_page="last_page"
            />
          </TabPane>
          <TabPane label="逾期今日跟进" name="name4">
            <SelectBox @formData="formData" />
            <TableBox :columns="columns" :dataList="dataList" />
            <PagingBox
              @changePages="changePages"
              :total="total"
              :per_page="per_page"
              :current_page="current_page"
              :last_page="last_page"
            />
          </TabPane>
          <TabPane label="半月待回访" name="name5">
            <SelectBox
              @formData="formData"
              :classType="true"
              :lecturer="true"
              :chooseSubject="true"
            />
            <TableBox :columns="columns" :dataList="dataList" />
            <PagingBox
              @changePages="changePages"
              :total="total"
              :per_page="per_page"
              :current_page="current_page"
              :last_page="last_page"
            />
          </TabPane>
          <TabPane label="上周逾期未回访" name="name6">
            <SelectBox
              @formData="formData"
              :classType="true"
              :lecturer="true"
              :chooseSubject="true"
            />
            <TableBox :columns="columns" :dataList="dataList" />
            <PagingBox
              @changePages="changePages"
              :total="total"
              :per_page="per_page"
              :current_page="current_page"
              :last_page="last_page"
            />
          </TabPane>
          <TabPane label="上半月逾期未回访" name="name7">
            <SelectBox
              @formData="formData"
              :classType="true"
              :lecturer="true"
              :chooseSubject="true"
            />
            <TableBox :columns="columns" :dataList="dataList" />
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
    </Card>
    <Loading v-show="isLoading" />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { INCLASS } from "@/uilt/url/url";
import qs from "qs";

import OneInClass from "@/store/oneinclass";
export default {
  computed: {
    ...mapState({
      selectState: state => state.selectState
    })
  },
  data() {
    return {
      isLoading: false, // loading开关
      columns: OneInClass.state.columns1,
      dataList: OneInClass.state.data,
      value: "name1", // 判断卡片选择状态
      mode: [], // 存放用户数据
      total: 100,
      per_page: 10,
      current_page: 1,
      last_page: 1
    };
  },
  watch: {
    mode: {
      deep: true,
      handler(newName, oldName) {
        this.mode.start_type = this.start_type;
        window.setTimeout(() => {
          this.getUserData();
        }, 200);
      }
    }
  },
  methods: {
    ...mapMutations(["setCurrentPages", "setSelectState"]),
    // 设置当前页码
    changePages(val) {
      this.mode.page = val;
    },
    // 设置搜索葜
    formData(val) {
      this.mode = val;
    },
    // 点击选项卡切换触发
    changeTab(value) {
      this.value = value;
      if (this.value === "name1") {
        this.columns = OneInClass.state.columns1;
        this.start_type = 1;
        this.mode.start_type = this.start_type;
        this.getUserData();
      } else if (this.value === "name2") {
        this.columns = OneInClass.state.columns2;
        this.start_type = 2;
        this.mode.start_type = this.start_type;
        this.getUserData();
      } else if (this.value === "name3") {
        this.columns = OneInClass.state.columns3;
        this.start_type = 3;
        this.mode.start_type = this.start_type;
        this.getUserData();
      } else if (this.value === "name4") {
        this.columns = OneInClass.state.columns4;
        this.start_type = 4;
        this.mode.start_type = this.start_type;
        this.getUserData();
      } else if (this.value === "name5") {
        this.columns = OneInClass.state.columns4;
        this.start_type = 5;
        this.mode.start_type = this.start_type;
        this.getUserData();
      } else if (this.value === "name6") {
        this.columns = OneInClass.state.columns4;
        this.start_type = 6;
        this.mode.start_type = this.start_type;
        this.getUserData();
      } else if (this.value === "name7") {
        this.columns = OneInClass.state.columns4;
        this.start_type = 7;
        this.mode.start_type = this.start_type;
        this.getUserData();
      }
    },
    async getUserData() {
      this.isLoading = true;
      this.mode.product_type = 4 // 设置一对一搜索项
      let res = await this.$request({
        method: "post",
        url: INCLASS,
        data: qs.stringify(this.mode)
      });

      let links = res.data.data.links;
      // 设置搜索选项
      this.setSelectState(links);
      this.dataList = res.data.data.data;
      this.dataList.map(item => {
        if (!item.give_class_hour) {
          item.totalClassTime = item.class_hour;
          item.restOfClass = item.class_hour - item.course_rate_of_progress
        } else {
          item.totalClassTime = item.class_hour + "+" + item.give_class_hour;
          item.restOfClass = item.class_hour + item.give_class_hour - item.course_rate_of_progress
        }
        item.subject = this.selectState.subject[item.subject];
        item.grade = this.selectState.grade[item.grade];
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
    // this.getUserData();
  }
};
</script>

<style scoped>
.card {
  margin: 5px;
  overflow: hidden;
}
</style>