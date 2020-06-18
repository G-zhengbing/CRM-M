<template>
  <div class="smsSet">
    <Form class="select" ref="formValidate" :model="formItem" inline>
      <FormItem>
        <Input v-model="formItem.student_name" placeholder="模板名称" style="width: 160px;"></Input>
      </FormItem>
      <FormItem>
        <Select v-model="formItem.grade" placeholder="模板类型" style="width: 160px;">
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
import NewSMS from "./newSMS";
export default {
  components: {
    NewSMS
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
          key: "follow_user",
          align: "center"
        },
        {
          title: "模板类型",
          key: "follow_user",
          align: "center"
        },
        {
          title: "模板内容",
          key: "follow_user",
          align: "center"
        },
        {
          title: "创建时间",
          key: "follow_user",
          align: "center"
        },
        {
          title: "审核状态",
          key: "follow_user",
          align: "center"
        },
        {
          title: "备注",
          key: "follow_user",
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
                    size: "small"
                  },
                  on: {
                    click: () => {
                      // this.createdOrder(params.row);
                    }
                  }
                },
                "停用"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      // this.Audition(params.row);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data: [{ follow_user: 123 }]
    };
  },
  methods: {
    // 关闭窗口状态
    changeShowMod(val) {
      this.showMod = val;
      this.type = "";
    },
    // 改变页码
    changePages(val) {
      this.formItem.page = val;
    },
    // 转换date
    changeCreateDate(time) {
      this.formItem.create_st_time = time[0];
      this.formItem.create_en_time = time[1];
    }
  }
};
</script>

<style scoped>
.smsSet {
  padding: 20px;
}
</style>