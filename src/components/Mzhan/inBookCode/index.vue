<template>
  <div class="inBookCode">
    <Form class="select" ref="formValidate" :model="formItem" inline>
      <FormItem>
        <Input
          @on-blur="changeData"
          v-model="formItem.book_name"
          placeholder="书籍名称"
          style="width: 80px;"
        ></Input>
      </FormItem>
      <FormItem>
        <Select
          v-model="formItem.subject"
          placeholder="选择科目"
          style="width: 100px;"
          @on-change="changeData"
        >
          <Option :value="index" v-for="(item,index) in subjectList" :key="index">{{item}}</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Select
          v-model="formItem.grade"
          placeholder="选择年级"
          style="width: 120px;"
          @on-change="changeData"
        >
          <Option :value="index" v-for="(item,index) in grade_strList" :key="index">{{item}}</Option>
        </Select>
      </FormItem>
      <FormItem>
        <DatePicker
          v-model="formItem.tradingHour"
          type="datetimerange"
          placement="bottom-end"
          placeholder="开始时间 - 结束时间"
          style="width: 165px"
          @on-change="changeDate"
        ></DatePicker>
      </FormItem>
      <FormItem>
        <Button @click="deleteFormData" style="margin-left: 8px">清空选项</Button>
      </FormItem>
    </Form>
    <div class="btns">
      <Button type="primary" @click="batchDelete">批量删除</Button>
      <Button type="primary" @click="showMod = true;type = 'NewBook'">新建书籍</Button>
    </div>
    <Table @on-selection-change="selectUser" border :columns="columns" :data="data" height="500"></Table>
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
    <ViewBook
      v-if="type === 'ViewBook'"
      :row="row"
      :showMod="showMod"
      @changeShowMod="changeShowMod"
    />
    <AddBook
      v-if="type === 'AddBook'"
      :row="row"
      :showMod="showMod"
      @changeShowMod="changeShowMod"
    />
    <Loading v-show="isLoading" />
  </div>
</template>

<script>
import qs from "qs";
import NewBook from "./newBook";
import ViewBook from "./viewBook";
import AddBook from "./addBook";
import storage from "@/uilt/storage";
import { mapState, mapActions } from "vuex";
import {
  GETINBOOKLIST,
  CREATEINBOOK,
  DELETEINBOOKQRCODE
} from "@/uilt/url/Murl";
export default {
  components: {
    NewBook,
    ViewBook,
    AddBook
  },
  computed: {
    ...mapState({
      subjectList: state => storage.getDaiban().screen_list.subject,
      grade_strList: state => storage.getDaiban().screen_list.grade_str
    })
  },
  data() {
    return {
      isLoading: false,
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
          key: "book_name",
          align: "center"
        },
        {
          title: "年级",
          key: "grade",
          align: "center"
        },
        {
          title: "科目",
          key: "subject",
          align: "center"
        },
        {
          title: "扫码用户数",
          key: "scan_qrcode_user_count",
          align: "center"
        },
        {
          title: "扫码量",
          key: "scan_qrcode_count",
          align: "center"
        },
        {
          title: "关注量",
          key: "attention_count",
          align: "center"
        },
        {
          title: "二维码数量",
          key: "qrcode_count",
          align: "center"
        },
        {
          title: "头图点击量",
          key: "title_image_click_count",
          align: "center"
        },
        {
          title: "创建时间",
          key: "create_time",
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
                      this.switch("NewBook", params.row);
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
                      this.switch("ViewBook", params.row);
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
                      this.switch("AddBook", params.row);
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
      last_page: 1,
      ids: []
    };
  },
  created() {
    this.getInBookList();
    delete this.subjectList[-1];
  },
  methods: {
    selectUser(name) {
      if (name.length) {
        let ids = []
        name.map(item => {
          ids.push(item.id);
        });
        this.ids = ids.join(",");
      }
    },
    // 批量删除
    async batchDelete() {
      this.isLoading = true;
      let res = await this.$request({
        method: "POST",
        url: DELETEINBOOKQRCODE,
        data: qs.stringify({
          ids: this.ids,
          type: 1 // 1删除书籍 2删除书籍子级书内码
        })
      });
      if(res.data.code == 200) {
        this.$Message.success('删除成功')
      } else if (res.data.code == 100001) {
        this.$Message.error(res.data.error)
      }
      this.getInBookList();
      this.isLoading = false;
    },
    changeData(val) {
      this.getInBookList();
    },
    // 获取书籍列表
    async getInBookList() {
      this.isLoading = true;
      let res = await this.$request({
        method: "POST",
        url: GETINBOOKLIST,
        data: qs.stringify(this.formItem)
      });
      this.data = res.data.data.data;

      this.current_page = res.data.data.links.current_page;
      this.last_page = res.data.data.links.last_page;
      this.per_page = res.data.data.links.per_page;
      this.total = res.data.data.links.total;

      this.isLoading = false;
    },
    // 开关
    switch(name, row) {
      this.showMod = true;
      this.row = row;
      this.type = name;
    },
    // 关闭窗口状态
    changeShowMod(val, index) {
      this.showMod = val;
      this.row = "";
      this.type = "";
      this.getInBookList();
    },
    // 转换date
    changeDate(time) {
      this.formItem.create_start_time = time[0];
      this.formItem.create_end_time = time[1];
      this.getInBookList();
    },
    // 点击清除选项
    deleteFormData() {
      this.formItem = {};
      this.getInBookList();
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
.btns {
  margin-bottom: 10px;
}
.btns button {
  margin: 10px;
}
</style>