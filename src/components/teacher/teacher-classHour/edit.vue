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
          <FormItem label="老师第一次进教室时间">123</FormItem>
          <FormItem label="老师最后一次出教室时间">123</FormItem>
          <FormItem label="老师实际上课时长">123</FormItem>
          <FormItem label="老师第一次进教室时间">123</FormItem>
          <FormItem label="学生实际上课时长">123</FormItem>
          <FormItem label="备注" prop="desc">
            <Input
              v-model="formValidate.desc"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
							:disabled="$parent.edit.isEdit"
              placeholder="请填写备注"
            ></Input>
          </FormItem>
          <FormItem label="其他扣款">
            <Select v-model="formValidate.a" style="width:200px" :disabled="$parent.edit.isEdit">
              <Option v-for="item in 10" value="item" :key="item">{{ item }}</Option>
            </Select>
            <Select v-model="formValidate.a" style="width:200px" :disabled="$parent.edit.isEdit">
              <Option v-for="item in 10" value="item" :key="item">{{ item }}</Option>
            </Select>
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