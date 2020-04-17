<template>
  <div class="referral">
    <span class="btnSpan" @click="changeState">转介绍</span>
    <Modal
      title="转介绍"
      v-model="modal10"
      class-name="vertical-center-modal-1"
      width="40"
      @on-ok="confirm"
      @on-cancel="cancel"
    >
      <div class="content">
        <span>注册手机</span>
        <Input v-model="value" placeholder="请输入" style="width: 200px" />
        <Button type="primary" @click="detection">检测</Button>
        <div class="result" v-if="result">
          <div v-if="result == 1">
            {{message}}
            <MenuItem name="#" to="#" class="link">立即创建？</MenuItem>
          </div>
          <div v-else="result == 2" style="color: #f00">
            {{message}}
          </div>
          <div v-else="result == 3">
            {{message}}
            <MenuItem name="#" to="#" class="link">移入？</MenuItem>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { GETMOBILE } from "@/uilt/url/url";
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
    }
  },
  computed: {
    ...mapState({
      dataList: state => state.currentPage.dataList
    })
  },
  watch: {
    showMod(val) {
      this.modal10 = val;
    }
  },
  data() {
    return {
      modal10: this.showMod,
      value: "",
      result: "",
      message: ""
    };
  },
  methods: {
    async detection() {
      let telStr = /^[1]([3-9])[0-9]{9}$/;
      if (telStr.test(this.value)) {
        let res = await this.$request({
          method: "get",
          url: GETMOBILE,
          params: {
            mobile: this.value
          }
        });
        // 这个控制显示哪个结果，需要请求接口来返回改变
        this.result = res.data.data.status;
        this.message = res.data.data.message;
      } else {
         this.$Message.warning('请输入正确手号码!');
      }
    },
    // 页面显示状态
    changeState() {
      this.modal10 = true;
    },
    // 点击确认回调
    confirm() {
      this.value = "";
      this.result = "";
      this.$emit("changeShowMod", false);
    },
    // 点击取消回调
    cancel() {
      this.value = "";
      this.result = "";
      this.$emit("changeShowMod", false);
    }
  }
};
</script>

<style scoped>
.btnSpan {
  cursor: pointer;
}
.content {
  text-align: center;
}
.link {
  display: inline;
  color: #3399cc;
}
.result {
  margin-top: 15px;
}
</style>
<style>
.vertical-center-modal-1 {
  display: flex;
  align-items: center;
  justify-content: center;
}
.vertical-center-modal-1 .ivu-modal {
  top: 0;
}
</style>