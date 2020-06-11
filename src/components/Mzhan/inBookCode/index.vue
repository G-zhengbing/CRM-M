<template>
  <div class="inBookCode">
    <Form class="select" ref="formValidate" :model="formItem" inline>
      <FormItem>
        <Input v-model="formItem.mobile" placeholder="注册手机" style="width: 80px;"></Input>
      </FormItem>
      <FormItem>
        <Select v-model="formItem.grade" placeholder="选择年级" style="width: 100px;">
          <Option :value="index" v-for="(item,index) in 10" :key="index">{{item}}</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Select v-model="formItem.class_type" placeholder="选择班级类型" style="width: 120px;">
          <Option :value="index" v-for="(item,index) in 10" :key="index">{{item}}</Option>
        </Select>
      </FormItem>
      <FormItem>
        <DatePicker
          v-model="formItem.tradingHour"
          type="datetimerange"
          placement="bottom-end"
          placeholder="交易时间 - 交易时间"
          style="width: 165px"
          @on-change="changeDate"
        ></DatePicker>
      </FormItem>
      <FormItem>
        <Button @click="deleteFormData" style="margin-left: 8px">清空选项</Button>
      </FormItem>
    </Form>
    <div class="btn">
      <Button type="primary">批量删除</Button>
      <Button type="primary" @click="showMod = true;type = 'NewBook'">新建书籍</Button>
    </div>
    <Table border :columns="columns" :data="data" height="500px"></Table>
    <PagingBox
      :total="total"
      :per_page="per_page"
      :current_page="current_page"
      :last_page="last_page"
      @changePages="changePages"
    />
    <NewBook
      v-if="type === 'NewBook'"
      :row="row"
      :showMod="showMod"
      @changeShowMod="changeShowMod"
    />
  </div>
</template>

<script>
import NewBook from "./newBook";
export default {
  components: {
    NewBook
  },
  data() {
    return {
      type: "",
      row: "",
      showMod: false,
      formItem: {},
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "书籍名称",
          key: "student_name",
          align: "center"
        },
        {
          title: "年级",
          key: "student_name",
          align: "center"
        },
        {
          title: "科目",
          key: "student_name",
          align: "center"
        },
        {
          title: "扫码用户数",
          key: "student_name",
          align: "center"
        },
        {
          title: "扫码量",
          key: "student_name",
          align: "center"
        },
        {
          title: "关注量",
          key: "student_name",
          align: "center"
        },
        {
          title: "二维码数量",
          key: "student_name",
          align: "center"
        },
        {
          title: "头图点击量",
          key: "student_name",
          align: "center"
        },
        {
          title: "创建时间",
          key: "student_name",
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
                "编辑"
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
                "查看"
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
                "添加"
              )
            ]);
          }
        }
      ],
      data: [
        {
          student_name: "123"
        }
      ],
      total: 0,
      per_page: 10,
      current_page: 1,
      last_page: 1
    };
  },
  methods: {
    // 关闭窗口状态
    changeShowMod(val, index) {
      this.showMod = val;
      this.row = "";
      this.type = "";
    },
    // 转换date
    changeDate(time) {
      // this.formItem.pay_start_time = time[0];
      // this.formItem.pay_end_time = time[1];
    },
    // 点击清除选项
    deleteFormData() {
      this.formItem = {
        page: 1, // 页码
        page_num: "10" // 每页条数
      };
    },
    // 改变页码
    changePages(val) {
      this.formItem.page = val;
    }
  }
};
</script>

<style scoped>
.inBookCode {
  padding: 20px;
}
.btn {
  margin-bottom: 10px;
}
.btn button {
  margin: 10px;
}
</style>