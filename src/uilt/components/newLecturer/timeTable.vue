<template>
  <div class="timeTable">
    <!-- <table>
			<tr>
				<th>时间段</th>
				<th>周一</th>
				<th>周二</th>
				<th>周三</th>
				<th>周四</th>
				<th>周五</th>
				<th>周六</th>
				<th>周日</th>
			</tr>
			<tr>
				<tr>8:00-8:30</tr>
			</tr>
    </table>-->
    <ul class="title">
      <li>时间段</li>
      <li>周一</li>
      <li>周二</li>
      <li>周三</li>
      <li>周四</li>
      <li>周五</li>
      <li>周六</li>
      <li>周日</li>
    </ul>
    <ul class="fll">
      <li v-for="item in timeData">{{item}}</li>
    </ul>
    <ul class="week" >
      <li v-for="item in dataList" @click="selectTab(item)" :class="{'select': selectData.find(i => i == item) ? true : false}">{{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeData: [
        "8:00-8:30",
        "8:30-9:00",
        "9:00-9:30",
        "9:30-10:00",
        "10:00-10:30",
        "10:30-11:00",
        "11:00-11:30",
        "11:30-12:00",
        "13:00-13:30",
        "13:30-14:00",
        "14:00-14:30",
        "14:30-15:00",
        "15:00-15:30",
        "15:30-16:00",
        "16:00-16:30",
        "16:30-17:00",
        "17:00-17:30",
        "17:30-18:00",
        "18:00-18:30",
        "18:30-19:00",
        "19:00-19:30",
        "19:30-20:00",
        "20:00-20:30",
        "20:30-21:00"
      ],
			dataList: 168,
			// 选中的
			selectData: []
    };
	},
	watch: {
    selectData: {
      deep: true,
      handler(newName, oldName) {

      }
    }
  },
	methods: {
		selectTab(index) {
			if(this.selectData.find(item => item == index)) {
				this.selectData.splice(this.selectData.indexOf(index),1)
				return
			}
			this.selectData.push(index)
		}
	}
};
</script>

<style scoped>
.timeTable {
  width: 801px;
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
  overflow: hidden;
}
.title {
  overflow: hidden;
}
.fll {
  float: left;
}
.title li {
  float: left;
}
ul > li {
  width: 100px;
  /* background-color: #ccc; */
  border: 1px solid #ccc;
  border-bottom: 0;
  border-right: 0;
  text-align: center;
}
.week {
  height: 521px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: flex-start;
}
/* 选中状态 */
.select {
	background: #007acc;
	color: #ccc;
}
</style>