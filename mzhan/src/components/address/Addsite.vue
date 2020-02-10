<template>
  <div class="box">
    <div class="header">
      <img @click="goAddress" src="../../assets/img/fan.png" alt />
      <span v-if="typeof $route.query.item == 'undefined'">添加收货地址</span>
      <span v-else>编辑收货地址</span>
    </div>
    <p class="header-bottom"></p>
    <ul>
      <li>
        <div>
          <input type="text" placeholder="收货人" v-model="form.consignee" />
        </div>
      </li>
      <li>
        <div>
          <input type="text" placeholder="手机号码" v-model="form.mobile" />
        </div>
      </li>
      <li @click="showArea">
        <div class="site">
          <input type="text" placeholder="所在地区" v-model="form.province_and_city" readonly />
          <div v-show="isArea">
            <van-popup v-model="show" position="bottom" overlay style="margin:0;">
              <van-area
                class="areas"
                ref="area"
                :columns-placeholder="['请选择', '请选择', '请选择']"
                :area-list="areaList"
                @change="onChange"
                @confirm="setCity"
                @cancel="isArea = false"
              />
            </van-popup>
          </div>
          <img src="../../assets/img/fan.png" alt />
        </div>
      </li>
      <li>
        <div>
          <input type="text" placeholder="详细地址：如道路、门牌号、小区、单元室等" v-model="form.detailed_address" />
        </div>
      </li>
    </ul>
    <p>
      <span>
        <van-switch-cell v-model="checked" title="设置为默认地址" />
      </span>
    </p>
    <div class="bottom">
      <p v-if="typeof $route.query.item == 'undefined'">
        <span @click="saveAddsite" class="footer">保存</span>
      </p>
      <p v-else>
        <span @click="deleAddsite" class="del">删除</span>
        <span @click="saveAddsite('update')" class="save">保存</span>
      </p>
    </div>
    <Loading v-if="showLoading" />
    <!-- 是否删除 -->
    <van-overlay :show="isDele">
      <div class="block">
        <div class="block-content">
          <p class="title">删除后，下单需重新设置地址，是否</p>
          <p>确认删除?</p>
        </div>
        <div class="block-bottom">
          <p class="colse" @click="isDele = false">取消</p>
          <p class="confirm" @click="deleteOk">确定</p>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import axios from "axios";
import storage from "../../uilt/storage";
import { ADDSITE, DELADDRESS } from "../../uilt/url";
import cityList from "../../uilt/area/city";
import Loading from "../../uilt/loading/Loading";
export default {
  components: {
    Loading
  },
  mounted() {
    if (this.$route.query.item) {
      this.form = JSON.parse(this.$route.query.item);
    }
    if (this.form.is_default == 1) {
      this.checked = true;
    } else {
      this.checked = false;
    }
  },
  data() {
    return {
      isDele: false,
      showLoading: false,
      checked: true,
      form: {
        province_and_city: ""
      },
      isArea: true,
      show: false,
      city: "",
      areaList: cityList,
      myreg: /^[1][3,4,5,7,8,6,9][0-9]{9}$/
    };
  },
  methods: {
    goAddress() {
      if (JSON.stringify(storage.getADDRESS()) != "{}") {
        this.$router.push({
          name: "Address",
          query: { type: storage.getADDRESS() }
        });
        return;
      }
      this.$router.push("/address");
    },
    deleteOk() {
      return new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: DELADDRESS,
          headers: {
            Authorization: "bearer" + storage.getToken()
          },
          data: {
            address_id: this.form.id,
            is_delete: 2
          }
        })
          .then(res => {
            if (res.error) {
              this.$notify({ type: "warning", message: res.error });
              return;
            }
            if (res.data.code == 200 && res.data.ret) {
              this.$notify({ type: "success", message: "删除成功" });
            }
            if (JSON.stringify(storage.getADDRESS()) != "{}") {
              this.$router.push({
                name: "Address",
                query: { type: storage.getADDRESS() }
              });
              return;
            }
            this.$router.push("/address");
            resolve();
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    //删除/修改地址
    deleAddsite() {
      this.isDele = true;
    },
    //新建地址
    saveAddsite(val) {
      if (!this.form.consignee) {
        this.$notify({ type: "warning", message: "收货人不能为空" });
        return;
      }
      if (!this.form.mobile) {
        this.$notify({ type: "warning", message: "手机号不能为空" });
        return;
      }
      if (!this.myreg.test(this.form.mobile)) {
        this.$notify({ type: "warning", message: "手机号有误" });
        return;
      }
      if (this.checked) {
        this.form.is_default = 1;
      } else {
        this.form.is_default = 2;
      }
      this.showLoading = true;
      if (val == "update") {
        return new Promise((resolve, reject) => {
          axios({
            method: "post",
            url: DELADDRESS,
            headers: {
              Authorization: "bearer" + storage.getToken()
            },
            data: {
              ...this.form,
              address_id: this.form.id
            }
          })
            .then(res => {
              this.showLoading = false;
              if (res.data.error) {
                this.$notify({ type: "warning", message: res.data.error });
                return;
              }
              if (res.data.ret && res.data.code == 200) {
                this.$notify({ type: "success", message: "修改成功" });
              }
              if (JSON.stringify(storage.getADDRESS()) != "{}") {
                this.$router.push({
                  name: "Address",
                  query: { type: storage.getADDRESS() }
                });
                return;
              }
              this.$router.push("/address");
              resolve();
            })
            .catch(e => {
              this.showLoading = false;
              reject(e);
            });
        });
      } else {
        return new Promise((resolve, reject) => {
          axios({
            method: "post",
            url: ADDSITE,
            headers: {
              Authorization: "bearer" + storage.getToken()
            },
            data: {
              ...this.form
            }
          })
            .then(res => {
              this.showLoading = false;
              if (res.data.error && res.data.ret == false) {
                this.$notify({ type: "warning", message: res.data.error });
                return;
              }
              if (res.data.ret && res.data.code == 200) {
                this.$notify({ type: "success", message: "新增成功" });
              }
              if (JSON.stringify(storage.getADDRESS()) != "{}") {
                this.$router.push({
                  name: "Address",
                  query: { type: storage.getADDRESS() }
                });
                return;
              }
              this.$router.push("/address");
              this.form = {};
              resolve();
            })
            .catch(e => {
              this.showLoading = false;
              reject(e);
            });
        });
      }
    },
    setCity() {
      this.isArea = false;
      this.form.province_and_city = this.city;
    },
    onChange(picker, value, index) {
      let areaName = "";
      for (var i = 0; i < value.length; i++) {
        if (typeof value[i] != "undefined") {
          areaName = areaName + value[i].name + " ";
        }
      }
      this.city = areaName;
    },
    showArea() {
      this.isArea = true;
      this.show = !this.show;
    }
  }
};
</script>

<style scoped>
.van-picker__cancel,
.van-picker__confirm {
  font-size: 30px !important;
}
.van-switch {
  border: 2px solid rgba(0, 0, 0, 0.1);
}
.van-cell__title > span {
  font-size: 28px;
  color: #333;
}
.header > span {
  font-size: 30px;
  color: #333;
  text-align: center;
  flex: 1;
  margin-left: -40px;
}
.header {
  height: 110px;
  display: flex;
  align-items: center;
}
.box > .header-bottom {
  height: 15px;
  background: #f3f3f3;
  margin: 0;
}
.header img {
  width: 44px;
  height: 24px;
  transform: rotate(180deg);
  margin-left: 40px;
  width: 24px;
  height: 40px;
}
.block-bottom > p.colse {
  border-right: 1px solid #ccc;
}
.block-bottom > p {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: #333;
}
.block-content {
  flex: 1;
  margin: 0 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 24px;
  color: #333;
}
.block-bottom {
  width: 100%;
  height: 70px;
  display: flex;
  border-top: 1px solid #ccc;
}
.van-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
}
.block {
  width: 500px;
  height: 180px;
  background: #fff;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.bottom > p > span.save {
  background: #ee7428;
  border-top-right-radius: 40px;
  border-bottom-right-radius: 40px;
}
.bottom > p > span.del {
  background: #f19a38;
  border-top-left-radius: 40px;
  border-bottom-left-radius: 40px;
}
.bottom > p > span {
  flex: 1;
  line-height: 80px;
  font-size: 30px;
  color: #fff;
  height: 80px;
  line-height: 80px;
  text-align: center;
}
.box > p {
  margin: 0 30px;
}
ul li div {
  margin: 0 40px;
}
.site {
  display: flex;
  align-items: center;
}
ul li div img {
  width: 14px;
  height: 24px;
}
ul li {
  border-bottom: 2px solid #d2d2d2;
  height: 1.5rem;
  line-height: 1.5rem;
}
ul li input {
  border: none;
  outline: none;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  height: 60px;
  line-height: 60px;
  margin-top: 50px;
}
input::-webkit-input-placeholder {
  color: #666;
}
input {
  font-size: 28px;
  width: 100%;
}
.bottom {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 100px;
  background: #fff;
}
.bottom > p {
  margin: 0 20px;
  display: flex;
}
.footer {
  width: 100%;
  display: inline-block;
  height: 80px;
  background: #ee7428;
  border-radius: 40px;
  color: #fff;
  text-align: center;
  line-height: 80px;
  font-size: 30px;
}
</style>