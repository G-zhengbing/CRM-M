<template>
  <div class="OpenImg">
    <Modal v-model="modal1" title="二维码" @on-ok="ok" @on-cancel="cancel">
      <div class="content">
        <!-- <a @click="downloadFile"> -->
          <img :src="row.channel_code_url" alt title="点击下载" />
        <!-- </a> -->
      </div>
      <div slot="footer">
            <Button type="primary" size="large" long @click="downloadFile">下载</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
import { DOWNLOADFILE } from "@/uilt/url/marketing";
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
      this.modal1 = val;
    }
  },
  data() {
    return {
      modal1: this.showMod
    };
  },
  methods: {
    // 点击下载图片
    async downloadFile() {
      let url = DOWNLOADFILE + "?id=" + this.row.id;
      window.location.href = url;
    },
    cancel() {
      this.$emit("changeShowMod", false);
    }
  }
};
</script>

<style scoped>
.content {
  height: 500px;
}
.content img {
  width: 100%;
  height: 100%;
}
</style>