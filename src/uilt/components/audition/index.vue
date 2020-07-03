<template>
  <div class="audition">
    <!-- <span @click="audition" style="cursor: pointer;">试听</span> -->
    <Modal
      v-model="modal1"
      title="预约试听"
      @on-ok="ok"
      @on-cancel="cancel"
      width="80"
      class-name="vertical-center-modal-1"
    >
      <div class="content">
        <NewAudition class="btns" :row="row" />
        <div class="title">试听记录</div>
        <Table :columns="columns" :data="dataList"></Table>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { APPOINTLIST } from "@/uilt/url/url";
import qs from "qs";
import NewAudition from "./newAudition";
export default {
  components: {
    NewAudition
  },
  props: {
    row: {
      type: [Object, String],
      required: false
    },
    showMod: {
      type: [Boolean, String],
      required: false
    }
  },
  data() {
    return {
      modal1: this.showMod,
      columns: [
        {
          title: "试听类型",
          key: "type",
          align: "center",
          // width: 100,
          className: "useBgc"
        },
        {
          title: "试听课程",
          key: "course_name",
          align: "center",
          // width: 140,
          className: "useBgc"
        },
        {
          title: "教师",
          key: "coach_id",
          align: "center",
          // width: 80,
          className: "useBgc"
        },
        {
          title: "试听课日期",
          key: "date_time",
          align: "center",
          // width: 120,
          className: "useBgc"
        },
        {
          title: "试听课时段",
          key: "time_block",
          align: "center",
          // width: 120,
          className: "useBgc"
        },
        {
          type: "html",
          title: "状态",
          key: "appoint_status",
          align: "center",
          // width: 100,
          className: "useBgc"
        },
        {
          title: "创建人",
          key: "create_user",
          align: "center",
          // width: 100,
          className: "useBgc"
        },
        {
          title: "创建时间",
          key: "create_time",
          align: "center",
          // width: 180,
          className: "useBgc"
        },
        {
          title: "备注",
          key: "note",
          align: "center",
          // width: 160,
          className: "useBgc"
        }
      ],
      dataList: [],
      userDataLists: []
    };
  },
  computed: {
    ...mapState({
      selectState: state => state.selectState,
      userDataList: state => state.currentPage.dataList,
      refresh: state => state.currentPage.refresh
    })
  },
  watch: {
    refresh: {
      deep: true,
      handler(newName, oldName) {
        this.getUserData();
      }
    },
    showMod(val) {
      this.modal1 = val;
    }
  },
  methods: {
    ...mapMutations(["setCurrentPages", "setSelectState"]),
    // 试听
    audition() {
      // this.modal1 = true;
      // 保存上一页数据
      this.userDataLists = this.userDataList;
      this.getUserData();
    },
    async getUserData() {
      let res = await this.$request({
        method: "GET",
        url: APPOINTLIST + "/" + this.row.account_id
      });
      this.dataList = res.data.data.resources;
      this.dataList.map(item => {
        item.type = item.type == 1 ? "班课" : "一对一";
        if (item.appoint_status == "待上课") {
          item.appoint_status = "<div class='state-forClass'>待上课</div>";
        } else if (item.appoint_status == "已上课") {
          item.appoint_status = "<div class='state-haveClass'>已上课</div>";
        } else if (item.appoint_status == "缺席") {
          item.appoint_status = "<div class='state-absent'>缺席</div>";
        } else if (item.appoint_status == "已取消") {
          item.appoint_status = "<div class='state-canceledCanc'>已取消</div>";
        }
      });
      this.setCurrentPages(this.dataList);
    },
    // 点OK
    ok() {
      this.$emit("changeShowMod", false);
    },
    // 点取消
    cancel() {
      this.$emit("changeShowMod", false);
    }
  },
  created() {
      this.getUserData();
  }
};
</script>

<style scoped>
.content {
  height: 400px;
  overflow: auto;
}
.content .title {
  height: 40px;
  background-color: #f2f2f2;
  line-height: 40px;
  padding-left: 10px;
}
.btns {
  margin: 0 0 20px 10px;
}
</style>

<style>
.useBgc {
  background-color: #fff;
}
.useBgc {
  background-color: #fff !important;
}
.vertical-center-modal-1 {
  display: flex;
  align-items: center;
  justify-content: center;
}
.vertical-center-modal-1 .ivu-modal {
  top: 0;
}
</style>

<style>
/* 状态模式 */
/* 已上课 */
.state-haveClass {
  width: 80px;
  height: 30px;
  line-height: 30px;
  color: #fff;
  border-radius: 15px;
  margin: 0 auto;
  background-color: #f19736;
}
/* 待上课 */
.state-forClass {
  width: 80px;
  height: 30px;
  line-height: 30px;
  color: #fff;
  border-radius: 15px;
  margin: 0 auto;
  background-color: #00cc66;
}
/* 缺席 */
.state-absent {
  width: 80px;
  height: 30px;
  line-height: 30px;
  color: #fff;
  border-radius: 15px;
  margin: 0 auto;
  background-color: #999900;
}
/* 已取消 */
.state-canceledCanc {
  width: 80px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #ff0000;
  color: #ff0000;
  margin: 0 auto;
}
</style>