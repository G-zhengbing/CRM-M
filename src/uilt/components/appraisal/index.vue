<template>
  <div class="appraisal">
    <span @click="clickAppraisal" style="cursor: pointer;">查看测评</span>
    <Modal
      v-model="modal5"
      title="查看测评"
      class-name="vertical-center-modal-1"
      width="45"
      @on-ok="confirm"
      @on-cancel="cancel"
    >
      <div class="content">
        <Row>
          <Col span="3" style="text-align: right;padding-right:20px">测评上传</Col>
          <Col span="21">
            <ImageUpload :userId="row.id" :imageURLs="imageURL" />
          </Col>
        </Row>
        <Row>
          <Col span="3" style="text-align: right;padding-right:20px">测评报告</Col>
          <Col span="21">
            <Input
              v-model="value"
              type="textarea"
              :autosize="{minRows: 4,maxRows: 5}"
              placeholder="请先上传测评，再编写测评报告"
            />
          </Col>
        </Row>
      </div>
      <!-- <div slot="footer">
        <Button type="text" size="large" @click="cancel">取消</Button>
        <Button type="primary" size="large" @click="confirm">确定</Button>
      </div>-->
    </Modal>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { APPIONTMODIFY } from "@/uilt/url/url";
import qs from "qs";
import ImageUpload from "./imageUpload";
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
  components: {
    ImageUpload
  },
  data() {
    return {
      modal5: this.showMod,
      value: "",
      imageData: "",
      imageURL: ""
    };
  },
  methods: {
    ...mapMutations(["setRefresh"]),
    async clickAppraisal() {
      this.modal5 = true;
      this.value = this.row.visit_content;
      this.imageURL = this.row.assess_image;
    },
    uploadImg(val) {
      this.imageData = val;
    },
    // 点击确认回调
    async confirm() {
      let res = await this.$request({
        method: "post",
        url: APPIONTMODIFY + "/" + this.row.id,
        data: qs.stringify({
          assess_image: null,
          visit_content: this.value
        })
      });
      if (res.data.error) {
        this.$Message.error("修改错误");
        this.$emit("changeShowMod", false);
      } else {
        this.modal5 = false;
        this.$Message.success("修改成功");
        this.$emit("changeShowMod", false);
        this.setRefresh(true);
      }
    },
    // 点击取消回调
    cancel() {
      this.$emit("changeShowMod", false);
      this.setRefresh(true);
    }
  },
  created() {
    this.value = this.row.visit_content;
    this.imageURL = this.row.assess_image;
  }
};
</script>

<style>
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