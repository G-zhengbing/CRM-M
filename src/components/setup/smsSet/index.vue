<template>
  <div class="smsSet">
    <Form class="select" ref="formValidate" :model="formItem" inline>
      <FormItem>
        <Input v-model="formItem.template_name" placeholder="模板名称" style="width: 160px;"></Input>
      </FormItem>
      <FormItem>
        <Select v-model="formItem.template_type" placeholder="模板类型" style="width: 160px;">
          <Option :value="index" v-for="(item,index) in 10" :key="index">{{item}}</Option>
        </Select>
      </FormItem>
      <FormItem>
        <DatePicker
          v-model="formItem.create_sts_time"
          type="datetimerange"
          placement="bottom-end"
          placeholder="时间段"
          style="width: 165px"
          @on-change="changeCreateDate"
        ></DatePicker>
      </FormItem>
      <FormItem>
        <Button @click="formItem = {};" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>

    <Button type="primary" @click="showMod=true,type='NewSMS'">新建短信模板</Button>
    <Table border :columns="columns" :data="data" height="500" style="margin-top: 10px;"></Table>
    <PagingBox
      :total="total"
      :per_page="per_page"
      :current_page="current_page"
      :last_page="last_page"
      @changePages="changePages"
    />
    <NewSMS v-if="type == 'NewSMS'" :showMod="showMod" @changeShowMod="changeShowMod" />
    <Loading v-show="isLoading" />
  </div>
</template>

<script>
import qs from "qs";
import {
  MESSAGELIST,
  DELETEMESSAGE,
  STATUSMESSAGE,
  SENDTEMPLATE
} from "@/uilt/url/set";
import NewSMS from "./newSMS";
export default {
  components: {
    NewSMS
  },
  watch: {
    formItem: {
      deep: true,
      handler(newName, oldName) {
        window.setTimeout(() => {
          this.getSmsLidt();
        }, 200);
      }
    }
  },
  data() {
    return {
      isLoading: false,
      type: "",
      showMod: "",
      total: 100,
      per_page: 10,
      current_page: 1,
      last_page: 1,
      formItem: {},
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "模板名称",
          key: "template_name",
          align: "center"
        },
        {
          title: "模板类型",
          key: "template_type",
          align: "center"
        },
        {
          title: "模板内容",
          key: "template_contents",
          align: "center"
        },
        {
          title: "创建时间",
          key: "create_time",
          align: "center"
        },
        {
          title: "审核状态",
          key: "al_audit_type",
          align: "center"
        },
        {
          title: "备注",
          key: "desc",
          align: "center"
        },
        {
          title: "操作",
          key: "operation",
          align: "center",
          width: 200,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small",
                    disabled:
                      params.row.al_audit_type == "未审核" ? false : true
                  },
                  on: {
                    click: async () => {
                      this.isLoading = true;
                      let res = await this.$request({
                        method: "POST",
                        url: SENDTEMPLATE,
                        data: qs.stringify({
                          id: params.row.id
                        })
                      });
                      if(res.data.code == 200) {
                        this.$Message.success('提交成功！')
                      }
                      this.getSmsLidt();
                      this.isLoading = false;
                    }
                  }
                },
                "提交审核"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: async () => {
                      this.isLoading = true;
                      let res = await this.$request({
                        method: "POST",
                        url: STATUSMESSAGE,
                        data: qs.stringify({
                          id: params.row.id,
                          status: params.row.status == 1 ? 2 : 1
                        })
                      });
                      if(res.data.code == 200) {
                        this.$Message.success('操作成功！')
                      }
                      this.getSmsLidt();
                      this.isLoading = false;
                    }
                  }
                },
                params.row.status == 1 ? "启用" : "停用"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: async () => {
                      this.isLoading = true;
                      let res = await this.$request({
                        method: "POST",
                        url: DELETEMESSAGE,
                        data: qs.stringify({
                          id: params.row.id
                        })
                      });
                      if (res.data.code == 200) {
                        this.$Message.success("删除成功！");
                      } else {
                        this.$Message.error(res.data.error);
                      }
                      this.getSmsLidt();
                      this.isLoading = false;
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data: [],
      auditType: ["未审核", "审核中", "审核通过", "未通过"]
    };
  },
  created() {
    this.getSmsLidt();
  },
  methods: {
    // 获取列表展示
    async getSmsLidt() {
      this.isLoading = true;
      let res = await this.$request({
        method: "POST",
        url: MESSAGELIST,
        data: qs.stringify(this.formItem)
      });
      this.data = res.data.data.data;
      this.data.map(item => {
        item.al_audit_type = this.auditType[item.al_audit_type];
      });
      this.current_page = res.data.data.links.current_page;
      this.last_page = res.data.data.links.last_page;
      this.per_page = res.data.data.links.per_page;
      this.total = res.data.data.links.total;
      this.isLoading = false;
    },
    // 关闭窗口状态
    changeShowMod(val) {
      this.showMod = val;
      this.type = "";
      this.getSmsLidt();
    },
    // 改变页码
    changePages(val) {
      this.formItem.page = val;
    },
    // 转换date
    changeCreateDate(time) {
      this.formItem.create_start_time = time[0];
      this.formItem.create_end_time = time[1];
    }
  }
};
</script>

<style scoped>
.smsSet {
  padding: 20px;
}
</style>