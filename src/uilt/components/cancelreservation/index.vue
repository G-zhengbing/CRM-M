<template>
  <div class="cancelreservation">
    <!-- <span class="cup" v-if="dataList[userIndex].stateBtn" @click="modal5 = true">取消预约</span>
    <span v-else style="color: #d9d9d9;">取消预约</span>-->
    <Modal
      v-model="modal5"
      title="取消预约"
      width="25"
      :styles="{top: '150px'}"
      @on-ok="confirm"
      @on-cancel="cancel"
    >
      <div class="content">
        <span>确定 {{this.row.student_name}} 取消预约？</span>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { BATCHSTAGE } from "@/uilt/url/url";
import qs from "qs";
export default {
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
  watch: {
    showMod(val) {
      this.modal5 = val;
    }
  },
  computed: {
    ...mapState({
      dataList: state => state.currentPage.dataList
    })
  },
  data() {
    return {
      forbidden: false,
      modal5: this.showMod,
      mode: []
    };
  },
  methods: {
    ...mapMutations(["setRefresh"]),
    // 点击取消预约，写接口
    async cancelreservation() {
      this.mode.appoint_status = 4;
      this.mode.appoint_id = [this.row.id];
      let res = await this.$request({
        method: "PUT",
        url: BATCHSTAGE,
        data: qs.stringify(this.mode)
      });
      this.setRefresh(true);
    },
    // 点击确认回调
    confirm() {
      this.cancelreservation();
      this.$emit("changeShowMod", false);
    },
    // 点击取消回调
    cancel() {
      this.$emit("changeShowMod", false);
    }
  },
  created() {
    // this.forbidden =
    //   this.dataList[this.userIndex].appoint_status ==
    //   "<div class='state-forClass'>待上课</div>";
  }
};
</script>

<style scoped>
.cup {
  cursor: pointer;
}
.content {
  text-align: center;
}
</style>