<template>
  <div class="SMS-Marketing">
    <Form :model="formItem" :label-width="80">
      <FormItem label="指定渠道">
        <Select
          v-model="formItem.the_specified_channel"
          @on-change="editAssignChannel"
          multiple
          style="width:400px"
        >
          <Option
            v-for="item in channel"
            :value="item.id.toString()"
            :key="item.id"
          >{{ item.channel_title }}</Option>
        </Select>
      </FormItem>
      <FormItem label="发送范围">
        <Select
          v-model="formItem.send_the_scope"
          @on-change="editAssignChannel"
          multiple
          style="width:400px"
        >
          <Option value="3">公众资源池</Option>
          <Option value="1">资源池待分配</Option>
          <Option value="2">已分配</Option>
        </Select>
      </FormItem>
      <FormItem label="每月上限">
        <RadioGroup v-model="formItem.the_monthly_limit_type">
          <div>
            <Radio :label="1">无上限</Radio>
          </div>
          <div>
            <Radio :label="2">
              限制
              <Input
                :disabled="formItem.the_monthly_limit_type == 1 ? true : false"
                v-model="formItem.the_monthly_limit"
                style="width: 100px"
              />条
            </Radio>
          </div>
        </RadioGroup>
      </FormItem>
      <FormItem label="发送限制">
        <Checkbox v-model="formItem.the_monthly_user_limit_type">
          每个用户每自然月可发送
          <Input
            :disabled="formItem.the_monthly_user_limit_type ? false : true"
            v-model="formItem.the_monthly_user_limit"
            style="width: 100px"
          />个不同短信模板
        </Checkbox>
      </FormItem>
    </Form>
    <Button type="primary" @click="setData">确定</Button>
    <Loading v-show="isLoading" />
  </div>
</template>

<script>
import { SMSCONFIGURATIONINFO, UPDATESMSCONFIGURATION } from "@/uilt/url/setup";
import storage from "@/uilt/storage";
import qs from "qs";
export default {
  data() {
    return {
      formItem: {
        the_monthly_limit_type: 1,
        the_monthly_user_limit_type: false,
      },
      channel: storage.getDaiban().channel,
      isLoading: false,
    };
  },
  methods: {
    editAssignChannel() {},
    async getSMSSet() {
      this.isLoading = true;
      let res = await this.$request({
        url: SMSCONFIGURATIONINFO,
      });
      this.formItem = res.data.data;
      this.formItem.the_specified_channel = this.formItem.the_specified_channel.split(
        ","
      );
      this.formItem.send_the_scope = this.formItem.send_the_scope.split(",");
      this.formItem.the_monthly_user_limit_type =
        this.formItem.the_monthly_user_limit_type === 1;

      this.isLoading = false;
    },
    async setData() {
      this.isLoading = true;
      let str = JSON.parse(JSON.stringify(this.formItem));
      str.the_specified_channel = str.the_specified_channel.join(",");
      str.send_the_scope = str.send_the_scope.join(",");
      str.the_monthly_limit =
        str.the_monthly_limit_type == 1 ? "" : str.the_monthly_limit;
      str.the_monthly_user_limit_type = str.the_monthly_user_limit_type ? 1 : 2;
      str.the_monthly_user_limit =
        str.the_monthly_user_limit == 2 ? "" : str.the_monthly_user_limit;
      let res = await this.$request({
        method: "POST",
        url: UPDATESMSCONFIGURATION,
        data: qs.stringify(str),
      });
      res.data.code == 200
        ? this.$Message.success("修改成功")
        : this.$Message.error("修改失败");
      this.isLoading = false;
    },
  },
  created() {
    this.getSMSSet();
  },
};
</script>

<style scoped>
.SMS-Marketing {
  padding: 40px !important;
}
</style>