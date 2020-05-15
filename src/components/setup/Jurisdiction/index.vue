<template>
  <div class="Jurisdiction">
    <div class="contaner">
      <Row>
        <Col span="5">
          <div class="left-title">
            <b>角色</b>
            <Button type="primary" size="small" @click="Switch = true">新建角色</Button>
          </div>
          <Menu theme="light" :active-name="1" @on-select="selectUser" style="float: right;">
            <MenuItem :name="item.id" v-for="item in userDataList" :key="item.id">{{item.name}}</MenuItem>
          </Menu>
        </Col>
        <Col span="19" style="padding-left: 15px;">
          <div class="right-title">
            <span>{{userName}}权限设置</span>
            <Button type="primary" @click="editJurisdiction">保存</Button>
          </div>
          <ul>
            <li v-for="item in JurisdictionList" :key="item.id">
              <div class="li-title">{{item.display_name}}</div>
              <CheckboxGroup v-model="JurisdictionData" @on-change="getSelectData">
                <template v-for="i in item.childrens">
                  <Checkbox :label="i.id" class="item" style="padding-left:20px">{{i.display_name}}</Checkbox>
                  <Checkbox
                    v-if="i.childrens"
                    :disabled="selectSwitch"
                    :label="ite.id"
                    class="item"
                    v-for="ite in i.childrens"
                    :key="ite.id"
                    style="padding-left:20px"
                  >{{ite.display_name}}</Checkbox>
                </template>
              </CheckboxGroup>
            </li>
          </ul>
        </Col>
      </Row>
    </div>
    <!-- 新建角色 -->
    <Modal
      title="新建角色"
      v-model="Switch"
      class-name="vertical-center-modal-1"
      @on-ok="Confirm"
      @on-cancel="Cancel"
    >
      <div class="content">
        <Form :model="formItem" :label-width="80">
          <FormItem label="角色名称" style="width: 400px;margin: 0 auto;">
            <Input v-model="formItem.role_name" placeholder="请输入部门名称"></Input>
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>
<script>
import {
  GETPERMISSIONLIST,
  UPDATEROLEPERMISSION,
  ADMINMERBERROLELIST,
  GETROLEPERMISSION,
  ADDROLE
} from "@/uilt/url/url";
import qs from "qs";
export default {
  name: "Jurisdiction",
  data() {
    return {
      Switch: false, // 新建角色开关
      JurisdictionData: [], // crm 权限选择
      formItem: {},
      JurisdictionList: [],
      selectSwitch: true,
      userDataList: [],
      userId: "",
      userName: ""
    };
  },
  methods: {
    // 获取用户角色列表
    async getUserDataList() {
      let res = await this.$request({
        url: ADMINMERBERROLELIST
      });
      this.userDataList = res.data.data;
    },
    // 修改权限
    async editJurisdiction() {
      let res = await this.$request({
        method: "POST",
        url: UPDATEROLEPERMISSION,
        data: qs.stringify({
          role_id: this.userId,
          permission_ids: this.JurisdictionData.join(",")
        })
      })
      if(res.data.code == 200) {
        this.$Message.success('修改成功')
      } else {
        this.$Message.error('修改失败')
      }
    },
    // 专题管理是否开放，每次点击会判断
    getSelectData(val) {
      // 判断是否三级目录，是的话开放三级
      val.indexOf(6) !== -1
        ? (this.selectSwitch = false)
        : (this.selectSwitch = true);
    },
    // 点击选择触发
    async selectUser(name) {
      this.userId = name;
      let res = await this.$request({
        url: GETROLEPERMISSION,
        params: {
          role_id: name
        }
      });
      if (res.data.data.permission_ids == false) {
        this.JurisdictionData = []
      } else {
        this.JurisdictionData = res.data.data.permission_ids
          .split(",")
          .map(Number);
      }
    },
    // 点击确认回调
    async Confirm() {
      let res = await this.$request({
        method: "POST",
        url: ADDROLE,
        data: qs.stringify(this.formItem)
      });
      if (res.data.code == 100001) {
        this.$Message.error(res.data.error);
      } else {
        this.userDataList.push(res.data.data);
      }
    },
    // 点击取消回调
    Cancel() {
      this.formItem = {};
    },
    // 获取权限列表
    async getJurisdiction() {
      let res = await this.$request({
        url: GETPERMISSIONLIST
      });
      this.JurisdictionList = res.data.data;
    }
  },
  created() {
    this.getJurisdiction();
    this.getUserDataList();
  }
};
</script>

<style scoped>
.left-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.right-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
}
.li-title {
  background-color: #f2f2f2;
  padding: 10px;
  box-sizing: border-box;
  margin: 10px 0;
}
.item {
  margin: 5px;
}
</style>
<style>
.ivu-tree-title {
  width: 100%;
}
.vertical-center-modal-1 {
  display: flex;
  align-items: center;
  justify-content: center;
}
.vertical-center-modal-1 .ivu-modal {
  top: 0;
}
</style>