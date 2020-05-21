<template>
  <div class="OpenImg">
    <Modal v-model="modal1" title="二维码" @on-ok="ok" @on-cancel="cancel">
      <div class="content">
        <a @click="downloadFile">
          <img :src="'http://liveapi.canpoint.net/upload_banner/-20200110191952.png'" alt />
        </a>
      </div>
    </Modal>
  </div>
</template>

<script>
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
      modal1: this.showMod,
      url: "http://liveapi.canpoint.net/upload_banner/-20200110191952.png"
    };
  },
  methods: {
    // 点击下载图片
    downloadFile() {

    },
    ok() {
      this.$emit("changeShowMod", false);
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