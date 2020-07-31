<template>
  <div class="box">
    <Row class-name="exclusive" style="margin:15px 0">
      <Col span="4">
        <Select v-model="form.grade" placeholder="阶段">
          <Option :value="1">一年级</Option>
          <Option :value="2">二年级</Option>
          <Option :value="3">三年级</Option>
          <Option :value="4">四年级</Option>
          <Option :value="5">五年级</Option>
          <Option :value="6">六年级</Option>
          <Option :value="7">七年级</Option>
          <Option :value="8">八年级</Option>
          <Option :value="9">九年级</Option>
          <Option :value="10">高一</Option>
          <Option :value="11">高二</Option>
          <Option :value="12">高三</Option>
        </Select>
      </Col>
      <Col span="4">
        <Select v-model="form.subject" placeholder="科目">
          <Option :value="i*1" v-for="(list,i) in subject" :key="i">{{list}}</Option>
        </Select>
      </Col>
      <Col span="2">
        <Button type="primary" @click="clear">清除</Button>
      </Col>
    </Row>
    <Table border :columns="columns" :data="data" height="550"></Table>
    <Loading v-show="isLoading" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import storage from "../../../uilt/storage";
import Loading from "../../../uilt/loading/loading";
export default {
  components: {
    Loading
  },
  computed: {
    ...mapState({
      data: state => state.ranking.rankingList
    })
  },
  mounted() {
    this.isLoading = true;
    this.getTeacherRanking({ form: this.form }).then(() => {
      this.isLoading = false;
    });
  },
  data() {
    return {
      columns: [
        { title: "排序", key: "sort" },
        { title: "教师", key: "coach_name" },
        { title: "阶段", key: "sort" },
        { title: "科目", key: "sort" },
        { title: "有效试听", key: "appoint_num" },
        { title: "签单量", key: "order_num" },
        { title: "转化率", key: "order_rate" }
      ],
      isLoading: false,
      form: {},
      subject: storage.getDaiban().screen_list.subject
    };
  },
  methods: {
    ...mapActions(["getTeacherRanking"]),
    //清除筛选条件
    clear() {
      this.form = {};
      this.isLoading = true;
      this.getTeacherRanking({ form: this.form }).then(() => {
        this.isLoading = false;
      });
    }
  }
};
</script>

<style>
</style>