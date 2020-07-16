<template>
  <div class="box">
    <section class="main-section">
      <div class="surplus">
        <div class="main-section-bottom">
          <div class="contaner">
            <Button style="margin-bottom:30px" type="primary" @click="batch">批量导入线索</Button>
            <Table border :columns="columns" :data="importList" height="550"></Table>
            <Page
              @on-change="pageChange"
              :total="total"
              :current="currentPage"
              :page-size="pageSize"
              show-total
              show-elevator
              class="ive-page"
            />
          </div>
        </div>
      </div>
    </section>
    <Modal width="600" v-model="showMessage" title="批量导入线索" @on-cancel="showMessage =false">
      <div class="steps">
        <ul>
          <li>
            <p>
              <i>1</i>
              步骤 1:
              <span>
                <a href="http://liveapi.canpoint.net/api/upload_file">点击下载excel模板</a>
              </span>
            </p>
            <div>导入前，请先下载文件模板，并按模板格式要求填写数据</div>
          </li>
          <li>
            <p>
              <i>2</i>
              步骤 2:
              <span>点击上传excel文件</span>
              <input type="file" @change="getFile($event)" />
            </p>
            <div>格式错误将出现异常报错，请仔细检查后上传</div>
          </li>
          <li>
            <p>
              <i>3</i>
              步骤 3:
              <span style="color:#333">线索处理</span>
            </p>
          </li>
        </ul>
      </div>
      <Form :model="form" label-position="left" style="margin-left:30px">
        <FormItem label="选择处理方式">
          <RadioGroup v-model="form.option" vertical @on-change="getOption">
            <Radio :label="1">
              <span>放入公共资源池 （质量很差）</span>
            </Radio>
            <Radio :label="2">
              <span>入资源池待分配</span>
            </Radio>
            <Radio :label="3">
              <span>分配给cc</span>
            </Radio>
          </RadioGroup>
        </FormItem>
        <Select v-model="form.sale_id" style="width:100px" class="refer" v-if="form.option == 3">
          <Option :value="list.id" v-for="(list,i) in sale_list" :key="i">{{list.login_name}}</Option>
        </Select>
        <FormItem label="线索渠道来源">
          <Select v-model="form.channel_id" style="width:200px">
            <Option :value="list.id" v-for="(list,i) in channel" :key="i">{{list.channel_title}}</Option>
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="showMessage = false">取消</Button>
        <Button :loading="loadingBtn" type="primary" size="large" @click="importOk">确定</Button>
      </div>
    </Modal>
    <Modal width="600" v-model="showLook" title="批量导入线索" @on-cancel="showLook =false">
      <List header="Header" footer="Footer" border>
        <ListItem v-for="(list,i) in item" :key="i">{{list?list:'暂无'}}</ListItem>
      </List>
    </Modal>
    <Loading v-if="isLoading" />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import storage from "../../uilt/storage";
import axios from "axios";
import { IMPORTLIST } from "../../uilt/url/url";
import Loading from "../../uilt/loading/loading";
export default {
  components: {
    Loading
  },
  mounted() {
    this.getImportList(1);
  },
  computed: {
    ...mapState({
      importList: state => state.importdata.importList,
      currentPage: state => state.importdata.currentPage,
      total: state => state.importdata.total,
      pageSize: state => state.importdata.pageSize
    })
  },
  data() {
    return {
      loadingBtn: false,
      item: [],
      showLook: false,
      isLoading: false,
      uploadList: [],
      channel: storage.getDaiban().channel,
      sale_list: storage.getDaiban().sale_list,
      form: {},
      showMessage: false,
      columns: [
        { title: "导入时间", key: "create_time" },
        { title: "总数量", key: "clue_num" },
        { title: "导入成功数量", key: "success_num" },
        { title: "导入失败数量", key: "fail_num" },
        { title: "导入者", key: "operator" },
        {
          title: "操作",
          key: "action",
          align: "center",
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
                      this.look(params.row);
                    }
                  }
                },
                "查看失败数据"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    ...mapMutations(["setCurrentPage"]),
    ...mapActions(["getImportList"]),
    getOption(val) {
      if (val != 3) {
        this.form.sale_id = "";
      }
    },
    //上传文件
    getFile(e) {
      this.uploadList[0] = e.target.files[0];
    },
    //导入
    importOk() {
      if (this.uploadList.length == 0) {
        this.$Message.error("请选择正确文件上传");
        return;
      } else if (!this.form.option) {
        this.$Message.error("请选择一种处理方式");
        return;
      } else if (!this.form.channel_id) {
        this.$Message.error("请选择一种线索渠道来源");
        return;
      }
      this.isLoading = true;
      this.loadingBtn = true;
      var formData = new FormData();
      formData.append("file", this.uploadList[0]);
      formData.append("option", this.form.option);
      if (this.form.option == 3) {
        formData.append("sale_id", this.form.sale_id);
      }
      formData.append("channel_id", this.form.channel_id);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "bearer " + storage.get()
        }
      };
      axios.post(IMPORTLIST, formData, config).then(response => {
        if (response.data.code == 100001 && response.data.error) {
          this.$Message.error(response.data.error);
        }
        if (response.data.code == 200 && response.data.ret == true) {
          this.$Message.success("导入成功");
          this.getImportList(1).then(res => {});
          this.showMessage = false;
          this.form = {};
        }
        this.isLoading = false;
        this.loadingBtn = false;
      });
    },
    //查看失败数据
    look(val) {
      this.item = val.fail_list;
      this.showLook = true;
    },
    //分页
    pageChange(num) {
      this.isLoading = true;
      this.setCurrentPage(num);
      this.getImportList(num).then(() => {
        this.isLoading = false;
      });
    },
    //批量导入线索
    batch() {
      this.showMessage = true;
    }
  }
};
</script>

<style scoped>
.refer {
  position: absolute;
  right: 260px;
  margin-top: -54px;
}
.steps ul li p input[type="file"] {
  opacity: 0;
  margin-left: -120px;
  width: 117px;
  cursor: pointer;
}
.steps ul li p span {
  color: #3399ff;
  cursor: pointer;
}
.steps ul li p i {
  display: inline-block;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  text-align: center;
  line-height: 25px;
  color: #3399ff;
  border: 1px solid #3399ff;
}
.steps ul li div {
  margin-left: 30px;
  color: #ccc;
}
.steps ul li p {
  color: #333;
  margin-bottom: 15px;
}
.steps ul li {
  margin: 15px 0;
}
.steps {
  display: flex;
}
</style>