<template>
  <div class="edit">
    <Modal
      title="编辑"
      width="30"
      v-model="$parent.edit.switch"
      @on-ok="editConfirm"
      @on-cancel="editCancel"
    >
      <div class="content">
        <Form
          ref="formValidate"
          :model="formValidate"
          :rules="ruleValidate"
          :label-width="180"
          :show-message="false"
        >
          <FormItem label="学生第一次进教室时间">123</FormItem>
          <FormItem label="学生最后一次出教室时间">123</FormItem>
          <FormItem label="实际上课时长">123</FormItem>
          <FormItem label="课程状态">123</FormItem>
          <FormItem label="备注" prop="desc">
            <Input
              v-model="formValidate.desc"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
							:disabled="$parent.edit.isEdit"
              placeholder="请填写备注"
            ></Input>
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  created() {
    console.log(this.$parent.edit);
  },
  data() {
    return {
      formValidate: {},
      ruleValidate: {
        desc: [],
      },
    };
  },
  methods: {
    editConfirm() {
      this.$refs["formValidate"].validate((valid) => {
        this.formValidate = {};
      });
    },
    editCancel() {
      this.formValidate = {};
    },
  },
};
</script>

<style>
</style>