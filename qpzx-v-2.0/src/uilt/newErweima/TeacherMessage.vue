<template>
  <div class="boxs">
    <template>
      <div>
        <div class="shade-top">
          <button class="btn">分配</button>
        </div>
        <div class="shade-content">
          <ul>
            <li>
              选择人员 :
              <select class="selected info" v-model="form.sale_name" @change="selected()">
                <!-- <option
                  v-for="(list,i) in fenpeiList"
                  :key="i"
                  :value="list.login_name"
                >{{list.login_name}}</option> -->
              </select>
            </li>
          </ul>
          <div class="text">
            <span>分配说明 :&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <div>
              <input readonly="readonly" type="text" />
              <textarea cols="30" rows="8" v-model="form.assign_note"></textarea>
            </div>
          </div>
          <div class="handel">
            <button class="btn confirm" @click="confirm">确定</button>
            <button class="btn cancel" @click="colse">取消</button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: ["type"]
};
</script>

<style scoped>
.boxs {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>