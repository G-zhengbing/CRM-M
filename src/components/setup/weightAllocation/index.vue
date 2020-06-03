<template>
  <div class="weightAllocation">
    <Row>
      <Col span="4">
        <!-- <div class="left-title">
          <b>模块选择</b>
        </div>-->
        <Menu theme="light" active-name="weight" @on-select="selectUser" style="float: right;">
          <MenuItem name="weight">权重自动分配</MenuItem>
        </Menu>
      </Col>
      <Col span="20" style="padding-left: 15px;">
        <div class="top">
          <div style="height: 50px;line-height: 50px;">
            <span>每日分配上限</span>
            <Input
              @on-blur="editUp"
              v-model="upper_limit"
              placeholder="请输入上限"
              style="width: 210px"
            />
          </div>
          <span class="ps">注：编辑框为0则表示无上限</span>
          <div style="padding-top:20px">
            <span>指定分配渠道</span>
            <Select
              v-model="assign_channel_list"
              @on-change="editAssignChannel"
              multiple
              style="width:600px"
            >
              <Option
                v-for="item in cityList"
                :value="item.id"
                :key="item.id"
              >{{ item.channel_title }}</Option>
            </Select>
          </div>
          <div style="padding-top:20px">
            <span>及时分配渠道</span>
            <Select
              v-model="real_time_channel_list"
              @on-change="editInTimeChannel"
              multiple
              style="width:600px"
            >
              <Option
                v-for="item in cityList"
                :value="item.id"
                :key="item.id"
              >{{ item.channel_title }}</Option>
            </Select>
          </div>
        </div>

        <div class="content">
          <Table border :columns="columns1" :data="data1" height="400"></Table>
          <span class="ps">注；修改分配上限和权重比数值需要次日生效</span>
        </div>
      </Col>
    </Row>

    <PagingBox
      :total="total"
      :per_page="per_page"
      :current_page="current_page"
      :last_page="last_page"
      @changePages="changePages"
      style="margin-top: 50px;"
    />
    <Loading v-show="isLoading" />
  </div>
</template>

<script>
import qs from "qs";
import {
  SALES,
  UPDATESALESWEIGHT,
  UPPERLIMIT,
  SCREENLIST,
  GETUPPERLIMIT
} from "@/uilt/url/url";
export default {
  data() {
    return {
      isLoading: false,
      showUp: false,
      upper_limit: "",
      total: 100,
      per_page: 10,
      current_page: 1,
      last_page: 1,
      cityList: [],
      assign_channel_list: [],
      real_time_channel_list: [],
      columns1: [
        {
          title: "姓名",
          key: "login_name"
        },
        {
          title: "权重比",
          key: "weight",
          render: (h, params) => {
            return h("Input", {
              props: {
                value: params.row.weight
              },
              on: {
                "on-blur": async e => {
                  this.isLoading = true;
                  // 这里失去焦点保存设置
                  let res = await this.$request({
                    method: "POST",
                    url: UPDATESALESWEIGHT,
                    data: qs.stringify({
                      admin_member_id: params.row.id,
                      weight: e.target.value
                    })
                  });
                  this.isLoading = false;
                }
              }
            });
          }
        }
      ],
      data1: [],
      page: 1
    };
  },
  watch: {
    page: {
      handler(newName, oldName) {
        this.getUserData();
      }
    }
  },
  methods: {
    // 修改指定分配渠道
    async editAssignChannel() {
      this.isLoading = true;
      let str = this.assign_channel_list.join();
      let res = await this.$request({
        method: "POST",
        url: UPPERLIMIT,
        data: qs.stringify({
          assign_channel_list: str
        })
      });
      this.isLoading = false;
    },
    // 修改及时分配渠道
    async editInTimeChannel() {
      this.isLoading = true;
      let str = this.real_time_channel_list.join();
      let res = await this.$request({
        method: "POST",
        url: UPPERLIMIT,
        data: qs.stringify({
          real_time_channel_list: str
        })
      });
      this.isLoading = false;
    },
    // 修改每日分配上限
    async editUp() {
      this.isLoading = true;
      let res = await this.$request({
        method: "POST",
        url: UPPERLIMIT,
        data: qs.stringify({
          upper_limit: this.upper_limit
        })
      });
      this.isLoading = false;
    },
    // 获取 select 数据
    async getSelectData() {
      this.isLoading = true;
      let res = await this.$request({
        url: SCREENLIST
      });
      this.cityList = res.data.data.channel;
      this.isLoading = false;
    },
    // 获取列表信息
    async getUserData() {
      this.isLoading = true;
      let res = await this.$request({
        url: SALES,
        params: {
          type: "page",
          page: this.page
        }
      });
      let data = res.data.data;
      this.data1 = data.resources;
      this.total = data.links.total;
      this.per_page = data.links.per_page;
      this.current_page = data.links.current_page;
      this.last_page = data.links.last_page;
      this.isLoading = false;
    },
    // 切换开关判断是否显示input
    async change(status) {
      status ? (this.showUp = true) : (this.showUp = false);
    },
    // 改变页码
    changePages(val) {
      this.page = val;
    },
    // 点击选择触发
    async selectUser(name) {
      // console.log(name);
    },
    async getUserSelect() {
      this.isLoading = true;
      let res = await this.$request({
        url: GETUPPERLIMIT
      });
      this.upper_limit = res.data.data.upper_limit;
      if (res.data.data.assign_channel_list) {
        this.assign_channel_list = res.data.data.assign_channel_list
          .split(",")
          .map(Number);
      }
      if (res.data.data.real_time_channel_list) {
        this.real_time_channel_list = res.data.data.real_time_channel_list
          .split(",")
          .map(Number);
      }
      this.isLoading = false;
    }
  },
  created() {
    this.getUserData();
    this.getSelectData();
    this.getUserSelect();
  }
};
</script>

<style scoped>
.weightAllocation {
  padding: 20px;
  margin-top: 50px;
}
.ps {
  font-size: 13px;
  color: #ccc;
}
.content {
  margin-top: 20px;
}
.content_title {
  /* width: 400px; */
  text-align: right;
  padding-bottom: 10px;
}
</style>