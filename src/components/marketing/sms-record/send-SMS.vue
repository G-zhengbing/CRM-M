<template>
  <div class="send-SMS">
    <Modal
      v-model="$parent.showModel"
      title="营销短信群发"
      @on-ok="ok"
      @on-cancel="cancel"
      width="40"
      :loading="loading"
    >
      <div class="content">
        <Form
          ref="formValidate"
          :model="formValidate"
          :rules="ruleValidate"
          :label-width="100"
          :show-message="false"
        >
          <FormItem label="选择渠道" prop="city">
            <Select v-model="formValidate.city" placeholder="请选择">
              <Option value="beijing">New York</Option>
            </Select>
          </FormItem>
          <FormItem label="短信模板" prop="a">
            <Select v-model="formValidate.a" placeholder="请选择">
              <Option value="beijing">New York</Option>
            </Select>
          </FormItem>
          <FormItem label="发送范围" prop="gender">
            <RadioGroup v-model="formValidate.gender">
              <div>
                <Radio label="male">
                  公共资源池
                  <span>80000/1000</span>
                </Radio>
              </div>
              <div>
                <Radio label="female">
                  资源池待分配
                  <span>80000/1000</span>
                </Radio>
              </div>
              <div>
                <Radio label="female">
                  已分配
                  <span>80000/1000</span>
                </Radio>
              </div>
            </RadioGroup>
          </FormItem>
          <FormItem label="发送条件">
            <RadioGroup
              v-model="formValidate.b"
              type="button"
              style="display: block;margin-bottom: 5px;"
            >
              <Radio label="1">公共资源池</Radio>
              <Radio label="2">资源池待分配</Radio>
              <Radio label="3">已分配</Radio>
            </RadioGroup>
            <RadioGroup v-model="formValidate.c" type="button">
              <Radio label="1">公共资源池</Radio>
              <Radio label="2">资源池待分配</Radio>
              <Radio label="3">已分配</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="本次发送" prop="code_name">
            <Input v-model="formValidate.code_name" placeholder="请输入二维码名称" style="width: 60%;;"></Input>
            <span style="padding-left: 10px;">/1000</span>
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      formValidate: {},
      ruleValidate: {
        a: [
          {
            required: true,
            trigger: "change",
          },
        ],
        city: [
          {
            required: true,
            trigger: "change",
          },
        ],
        gender: [
          {
            required: true,
            trigger: "change",
          },
        ],
        name: [
          {
            required: true,
            trigger: "blur",
          },
        ],
        code_name: [
          {
            required: true,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    ok() {
      this.$refs["formValidate"].validate((val) => {
        if (val) {
          this.$parent.showModel = false;
        } else {
          this.$Message.error("请填写必选项");
          // 不让表单关闭
          this.loading = false;
          this.$nextTick(() => {
            this.loading = true;
          });
        }
      });
    },
    cancel() {
      console.log(this.$parent.showModel);
    },
  },
};
</script>

<style scoped>
</style>