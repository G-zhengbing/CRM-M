<template>
  <div class="app">
    <van-popup v-model="show" position="bottom" overlay>
      <van-area
        ref="area"
        :columns-placeholder="['请选择', '请选择', '请选择']"
        :area-list="areaList"
        @change="onChange"
        @confirm="setCity"
        @cancel="show = false"
      />
    </van-popup>
  </div>
</template>
<script>
import axios from "axios";

export default {
  mounted() {},
  data() {
    return {
      show:true,
      city: "",
      carmodel: "",
      areaList: cityList
    };
  },
  methods: {
    
  }
};
</script>
