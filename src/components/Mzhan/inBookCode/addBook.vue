<template>
  <div class="addBook">
    <Modal v-model="modal1" title="添加" @on-ok="ok" @on-cancel="cancel" width="40">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem label="二维码标题" prop="book_name">
          <Input v-model="formValidate.book_name" placeholder="请输入二维码标题"></Input>
        </FormItem>
        <FormItem label="选择渠道码" prop="book_name">
          <Select v-model="formValidate.book_name" placeholder="请选择渠道码">
            <Option :value="item" v-for="(item,index) in 10" :key="index">{{item}}</Option>
          </Select>
          <p style="color: #ccc;padding-top: 10px;">请先去营销公众号管理创建渠道二维码</p>
        </FormItem>
        <FormItem label="视频ID" prop="book_name">
          <Input v-model="formValidate.book_name" placeholder="请输入视频ID"></Input>
        </FormItem>
        <FormItem label="视频简介" prop="desc">
          <Input
            v-model="formValidate.desc"
            type="textarea"
            :autosize="{minRows: 6,maxRows: 5}"
            placeholder="请输入视频简介"
          ></Input>
        </FormItem>
      </Form>
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
      required: true
    }
  },
  watch: {
    showMod(val) {
      this.modal1 = val;
    }
  },
  data() {
    return {
      modal1: "",
      formValidate: {},
      ruleValidate: {
        book_name: [
          {
            required: true,
            message: "请输入",
            trigger: "blur"
          }
        ],
        desc: [
          {
            required: true,
            message: "请输入视频简介",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
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
</style>