<template>
  <div>
    <template class="shade" v-if="type.classify == 'shade'">
      <Modal v-model="showShade" title="分配" @on-cancel="colse">
        <template v-if="type.status == 'payingstudent'">
          <Select
            v-model="form.sale_name"
            style="width:150px;margin-bottom:20px"
            @on-change="selected"
            placeholder="选择人员"
          >
            <Option
              v-for="(list,i) in payList"
              :key="i"
              :value="list.login_name"
            >{{list.login_name}}</Option>
          </Select>
        </template>
        <template v-else>
          <Select
            v-model="form.sale_name"
            style="width:150px;margin-bottom:20px"
            @on-change="selected"
            placeholder="选择人员"
          >
            <Option
              v-for="(list,i) in fenpeiList"
              :key="i"
              :value="list.login_name"
            >{{list.login_name}}</Option>
          </Select>
        </template>
        <Input
          v-if="type.status != 'payingstudent'"
          v-model="form.assign_note"
          type="textarea"
          :rows="4"
          placeholder="分配说明"
        />
        <div slot="footer">
          <Button type="text" size="large" @click="colse">取消</Button>
          <Button type="primary" size="large" @click="confirm">确定</Button>
        </div>
      </Modal>
    </template>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import Loading from "../../../uilt/loading/loading";
import storage from "../../../uilt/storage";
export default {
  porps: ["type"],
  components: {},
  mounted() {},
  computed: {},
  data() {
    return {};
  },
  methods: {}
};
</script>

<style>
</style>