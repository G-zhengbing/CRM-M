<template>
  <div class="box">
    <header class="main-header">
      <ul>
        <li style="margin-left:30px">
          <span>订单导入</span>
        </li>
      </ul>
    </header>
    <section class="main-section">
      <div class="surplus">
        <div class="main-section-bottom">
          <div class="contaner">
            <div style="height:10px;"></div>
            <Button style="margin-bottom:30px" type="primary" @click="batch">导入订单</Button>
            <Table border :columns="columns" :data="importorderList" height="500"></Table>
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
    <Modal
      width="600"
      v-model="showMessage"
      title="导入订单"
      @on-cancel="showMessage =false"
      :styles="{'margin-top' : '-70px'}"
    >
      <div class="steps">
        <ul>
          <li>
            <p>
              <i>1</i>
              步骤 1:
              <span>
                <a href="http://liveapi.canpoint.net/api/upload_product">点击下载课程目录</a>
              </span>
            </p>
            <div>导入前，请先下载课程目录，并按目录格式要求填写数据</div>
          </li>
          <li>
            <p>
              <i>2</i>
              步骤 2:
              <span>
                <a href="http://liveapi.canpoint.net/api/upload_order">点击下载订单模板</a>
              </span>
            </p>
            <div>格式错误将出现异常报错，请仔细检查后上传</div>
          </li>
          <li>
            <p>
              <i>3</i>
              步骤 3:
              <span>点击上传excel文件</span>
              <input type="file" @change="getFile($event)" />
            </p>
          </li>
        </ul>
      </div>
      <div slot="footer">
        <Button type="text" size="large" @click="showMessage = false">取消</Button>
        <Button type="primary" size="large" @click="importOk">确定</Button>
      </div>
    </Modal>
    <Modal
      width="600"
      v-model="showLook"
      title="批量导入线索"
      @on-cancel="showLook =false"
      :styles="{'margin-top' : '-70px'}"
    >
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
import { UPLOADCSVORDER } from "../../uilt/url/url";
import Loading from "../../uilt/loading/loading";
export default {
  components: {
    Loading
  },
  mounted() {
    this.getImportOrderList(1);
  },
  computed: {
    ...mapState({
      importorderList: state => state.importorder.importorderList,
      currentPage: state => state.importorder.currentPage,
      total: state => state.importorder.total,
      pageSize: state => state.importorder.pageSize
    })
  },
  data() {
    return {
      item: [],
      showLook: false,
      isLoading: false,
      uploadList: [],
      channel: storage.getDaiban().channel,
      sale_list: storage.getDaiban().sale_list,
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
    ...mapActions(["getImportOrderList"]),
    //上传文件
    getFile(e) {
      this.uploadList[0] = e.target.files[0];
    },
    //导入
    importOk() {
      if (this.uploadList.length == 0) {
        this.$Message.error("请选择正确文件上传");
        return;
      }
      this.isLoading = true;
      var formData = new FormData();
      formData.append("file", this.uploadList[0]);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "bearer " + storage.get()
        }
      };
      axios.post(UPLOADCSVORDER, formData, config).then(response => {
        if (response.data.ret == false && response.data.error) {
          this.$Message.error(response.data.error);
        }
        if (response.data.code == 200 && response.data.ret == true) {
          this.$Message.success("导入成功");
          this.getImportOrderList(1).then(res => {});
          this.showMessage = false;
          this.uploadList.length = 0;
        }
        this.isLoading = false;
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
      this.getImportOrderList(num).then(() => {
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