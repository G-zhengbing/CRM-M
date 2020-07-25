<template>
  <div class="SMS-Marketing">
    <Form :model="formItem" :label-width="80">
      <FormItem label="指定渠道">
        <Select
          v-model="formItem.assign_channel_list"
          @on-change="editAssignChannel"
          multiple
          style="width:400px"
        >
          <Option v-for="item in 10" :value="item" :key="item">{{ item }}</Option>
        </Select>
      </FormItem>
      <FormItem label="发送范围">
        <Select
          v-model="formItem.assign_channel_list"
          @on-change="editAssignChannel"
          multiple
          style="width:400px"
        >
          <Option v-for="item in 10" :value="item" :key="item">{{ item }}</Option>
        </Select>
      </FormItem>
      <FormItem label="发送范围">
        <RadioGroup v-model="formItem.animal">
          <div>
            <Radio label="1">无上限</Radio>
          </div>
          <div>
            <Radio label="2">
              限制
              <Input v-model="formItem.limitNum" style="width: 100px" />条
            </Radio>
          </div>
        </RadioGroup>
      </FormItem>
      <FormItem label="发送限制">
        <Radio v-model="single">
          每个用户每自然月可发送
          <Input v-model="formItem.limitNum" style="width: 100px" />个不同短信模板
        </Radio>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formItem: {},
    };
  },
  methods: {
    editAssignChannel() {},
  },
};
</script>

<style scoped>
.SMS-Marketing {
	padding: 40px !important;
}
</style>