<template>
  <div class="weightAllocation">
    <Row>
      <Col span="4">
        <Menu theme="light" active-name="weight" @on-select="selectUser" style="float: right;">
          <MenuItem name="weight">权重自动分配</MenuItem>
        </Menu>
      </Col>
      <Col span="20" style="padding-left: 15px;">
        <div class="top">
          <div>
            <span>是否开启自动分配</span>
            <i-Switch v-model="whether_or_not" @on-change="change">
              <span slot="open">开</span>
              <span slot="close">关</span>
            </i-Switch>
          </div>

          <div style="height: 50px;line-height: 50px;">
            <span>每日分配上限</span>
            <Input
              @on-blur="editUp"
              v-model="upper_limit"
              placeholder="请输入上限"
              style="width: 210px"
            />
          </div>
          <span class="ps">注：编辑框为空或0则表示无上限</span>
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
          <div class="content_title">
            <ul>
              <li v-for="item in 5">
                <div>姓名</div>
                <div>权重比</div>
              </li>
            </ul>
          </div>
          <div class="content_main">
            <ul>
              <li v-for="item in data1">
                <div>{{item.login_name}}</div>
                <div>
                  <Input v-model="item.weight" @on-blur="changeNum(item)" placeholder="0" />
                </div>
              </li>
            </ul>
          </div>
        </div>
        <span class="ps">注；修改每日分配上限、指定分配渠道和及时分配渠道后立即生效。修改权重比后下一个周期生效。</span>
      </Col>
    </Row>

    <Loading v-show="isLoading" />
  </div>
</template>

<script>
import qs from "qs";
import {
  SALES,
  UPDATESALESWEIGHT,
  UPPERLIMIT,
  GETUPPERLIMIT
} from "@/uilt/url/url";
import storage from "@/uilt/storage";
export default {
  data() {
    return {
      isLoading: false,
      whether_or_not: false,
      upper_limit: "",
      cityList: storage.getDaiban().channel,
      assign_channel_list: [],
      real_time_channel_list: [],
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
    // 修改权重比
    async changeNum(item) {
      this.isLoading = true;
      // 这里失去焦点保存设置
      let res = await this.$request({
        method: "POST",
        url: UPDATESALESWEIGHT,
        data: qs.stringify({
          admin_member_id: item.id,
          weight: item.weight
        })
      });
      this.isLoading = false;
    },
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
          upper_limit: this.upper_limit,
          whether_or_not: this.whether_or_not ? 1 : 2
        })
      });
      this.isLoading = false;
    },
    // 获取列表信息
    async getUserData() {
      this.isLoading = true;
      let res = await this.$request({
        url: SALES,
        params: {
          type: "limit"
        }
      });
      this.data1 = res.data.data.data;
      this.isLoading = false;
    },
    // 切换开关判断是否显示input
    async change(status) {
      status ? (this.whether_or_not = true) : (this.whether_or_not = false);
      this.editUp();
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
      this.whether_or_not = res.data.data.whether_or_not == 1 ? true : false;
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
  /* background-color: #000; */
  margin-top: 20px;
}
/* 自定义表格 */
.content ul {
  width: 100%;
  display: flex;
}
.content_title ul li {
  flex: 1;
}
.content_title ul li div {
  flex: 1;
}
.content ul li {
  display: flex;
  width: 20%;
}
.content ul li div {
  /* width: 80px; */
  width: 100%;
  height: 30px;
  line-height: 30px;
  border: 1px solid #dcdee2;
  text-align: center;
  background-color: #f8f8f9;
  overflow: hidden;
}

.content_main ul {
  height: 450px;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: flex-start;
  overflow: auto;
}

.content_main input {
  height: 30px;
}
</style>