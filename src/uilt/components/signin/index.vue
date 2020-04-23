<template>
  <div class="signin">
    <Button v-if="btnSignin" type="primary" @click="batchSignin">批量签到</Button>
    <!-- <template v-else>
      <span class="cup" v-if="dataList[userIndex].stateBtn" @click="modal5 = true;">签到</span>
      <span v-else style="color: #d9d9d9;">签到</span>
    </template> -->
    <Modal
      v-model="modal5"
      title="学员跟进"
      width="25"
      :styles="{top: '150px'}"
      @on-ok="confirm"
      @on-cancel="cancel"
    >
      <div class="content">
        <div>
          <!-- <span>学员 {{dataList[userIndex].student_name}} 是否完成上课？</span> -->
          <span>学员是否完成上课？</span>
        </div>
        <div>
          <RadioGroup v-model="phone">
            <Radio label="2">
              <span>已上课</span>
            </Radio>
            <Radio label="3">
              <span>缺席</span>
            </Radio>
          </RadioGroup>
        </div>
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
      type: [Object,String],
      required: false
    },
    showMod: {
      type: [Boolean,String],
      required: false
    },
    btnSignin: {
      type: Boolean,
      required: false
    },
    Items: {
      type: Array,
      required: false
    }
  },
  computed: {
    ...mapState({
      dataList: state => state.currentPage.dataList
    })
  },
  watch: {
    showMod(val) {
      this.modal5 = val;
    }
  },
  data() {
    return {
      forbidden: false,
      modal5: this.showMod,
      phone: "2",
      mode: []
    };
  },
  methods: {
    ...mapMutations(["setRefresh"]),
    // 点击按钮状态，批量签到
    batchSignin() {
      if(this.Items.length) {
        this.modal5 = true;
      }
    },
    // 点击签到，写接口
    async signin() {
      this.mode.appoint_status = this.phone;
      if(this.Items) {
        if(this.Items == 0) {
          return
        }
        this.mode.appoint_id = []
        this.Items.map(item => {
          this.mode.appoint_id.push(item.id)
        })
      } else {
        this.mode.appoint_id = [this.row.id];
      }
      let res = await this.$request({
        method: "PUT",
        url: BATCHSTAGE,
        data: qs.stringify(this.mode)
      });
      this.setRefresh(true);
    },

    // 点击确认回调
    confirm() {
      this.signin();
      this.phone = "2";
      this.$emit("changeShowMod", false);
    },
    // 点击取消回调
    cancel() {
      this.phone = "2";
      this.$emit("changeShowMod", false);
    },
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