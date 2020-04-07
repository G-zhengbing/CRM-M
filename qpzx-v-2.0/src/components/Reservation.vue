<template>
  <div class="box">
    <header class="main-header">
      <ul>
         <li style="margin-left:30px">
          <!-- <i></i> -->
          <span>我的预约单</span>
        </li>
      </ul>
    </header>
    <section class="main-section">
      <div class="surplus">
        <div class="main-section-bottom">
          <div class="contaner">
            <div style="height:1px;"></div>
            <ul class="tabs">
              <li @click="tab(1)" :class="[num == 1? 'active' : '']">
                <span>未下单待分配</span>
              </li>
              <li @click="tab(2)" :class="[num == 2? 'active' : '']">
                <span>已下单待分配</span>
              </li>
              <li @click="tab(3)" :class="[num == 3? 'active' : '']">
                <span>已分配</span>
              </li>
            </ul>
            <Form :model="form" :label-width="80" style="height:111px;padding: 10px;">
              <Row>
                <Col span="4">
                  <FormItem style="width:230px;">
                    <Input v-model="form.title" placeholder="学员姓名"></Input>
                  </FormItem>
                </Col>
                <Col span="4">
                  <FormItem style="width:230px;">
                    <Input v-model="form.title" placeholder="注册手机"></Input>
                  </FormItem>
                </Col>
                <Col span="4">
                  <FormItem style="width:230px;">
                    <Select v-model="form.demand_type" style="width:150px" placeholder="试听类型">
                      <Option :value="1">班课</Option>
                      <Option :value="2">一对一</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="4" v-if="num != 2">
                  <FormItem style="width:230px;">
                    <Select v-model="form.demand_type" style="width:150px" placeholder="状态">
                      <Option :value="1">待上课</Option>
                      <Option :value="2">已上课</Option>
                      <Option :value="3">缺席</Option>
                      <Option :value="4">已取消</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="4">
                  <FormItem>
                    <Select
                      v-model="form.grade"
                      @on-change="seek"
											style="width:150px"
                      placeholder="年级"
                    >
                      <Option :value="1">一年级</Option>
                      <Option :value="2">二年级</Option>
                      <Option :value="3">三年级</Option>
                      <Option :value="4">四年级</Option>
                      <Option :value="5">五年级</Option>
                      <Option :value="6">六年级</Option>
                      <Option :value="7">七年级</Option>
                      <Option :value="8">八年级</Option>
                      <Option :value="9">九年级</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="4">
                  <FormItem>
                    <Select
                      v-model="form.subject"
                      style="width:150px"
                      @on-change="seek"
                      placeholder="科目"
                    >
                      <Option value="1">数学</Option>
                      <Option value="2">英语</Option>
                      <Option value="3">语文</Option>
                      <Option value="4">物理</Option>
                      <Option value="5">化学</Option>
                      <Option value="6">政治</Option>
                      <Option value="7">生物</Option>
                      <Option value="8">地理</Option>
                      <Option value="9">历史</Option>
                    </Select>
                  </FormItem>
                </Col>
                <template v-if="num != 2">
                  <Col span="6" v-if="num != 3">
                    <FormItem>
                      <DatePicker
                        type="datetime"
                        placeholder="上课日期"
                        style="width: 200px"
                        v-model="nextTime"
                        @on-ok="setNextTime"
                      ></DatePicker>
                      <DatePicker
                        type="datetime"
                        placeholder="上课日期"
                        style="width: 200px"
                        v-model="classTime"
                        @on-ok="setClassTime"
                      ></DatePicker>
                    </FormItem>
                  </Col>
                </template>
                <Col span="6">
                  <FormItem>
                    <DatePicker
                      type="datetime"
                      placeholder="提交时间"
                      style="width: 200px"
                      v-model="nextTime"
                      @on-ok="setNextTime"
                    ></DatePicker>
                    <DatePicker
                      type="datetime"
                      placeholder="提交时间"
                      style="width: 200px"
                      v-model="classTime"
                      @on-ok="setClassTime"
                    ></DatePicker>
                  </FormItem>
                </Col>
                <Col span="4" style="margin-left:30px">
                  <Button type="primary" @click="seek">查询</Button>
                  <Button @click="clear">清空</Button>
                </Col>
              </Row>
            </Form>
						<div class="allot" v-if="num == 2">
              <span>{{'已选择'+ checkall.length + '条'}}</span>
              <Button type="primary" @click="allot">批量签到</Button>
            </div>
						<Table style="width:100%" border :columns="columns2" :data="reservList" @on-selection-change="selectionChange"></Table>
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
  </div>
</template>

<script>
import Loading from '../uilt/loading/loading'
import { mapState,mapMutations,mapActions,mapGetters } from 'vuex'
export default {
	computed:{
		...mapState({
			currentPage:state=> state.reservation.currentPage,
			total:state=> state.reservation.total,
			pageSize:state=> state.reservation.pageSize,
			reservList:state=> state.reservation.reservList,
		})
	},
  data() {
    return {
			checkall:[],
			columns2:[
				{
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "学员姓名",
          key: "title",
          align: "center"
        },
        {
          title: "注册手机",
          key: "link_url",
          align: "center"
        },
        {
          title: "试听类型",
          key: "create_time",
          align: "center"
				},
				{
          title: "试听课程",
          key: "sort",
          align: "center"
				},
				{
          title: "年级",
          key: "sort",
          align: "center"
				},
				{
          title: "科目",
          key: "sort",
          align: "center"
				},
				{
          title: "教师",
          key: "sort",
          align: "center"
				},
				{
          title: "上课日期",
          key: "sort",
          align: "center"
        },
        {
          title: "上课时段",
          key: "sort",
          align: "center"
				},
				{
          title: "状态",
          key: "sort",
          align: "center"
				},
				{
          title: "预约提交时间",
          key: "sort",
          align: "center"
				},
				{
          title: "备注",
          key: "sort",
          align: "center"
        },
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
                      this.signin(params.row);
                    }
                  }
                },
                "签到"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.appraisal(params.row);
                    }
                  }
                },
                "查看测评"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.offorder(params.row);
                    }
                  }
                },
                "取消预约"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.callout(params.row);
                    }
                  }
                },
                "呼出"
              )
            ]);
          }
        }
			],
      num: 1,
      form: {},
      nextTime: "",
      classTime: ""
    };
  },
  methods: {
		//批量签到
		allot(){},
		//呼出
		callout(){},
		//取消预约
		offorder(){},
		//查看测评
		appraisal(){},
		//签到
		signin(){},
		//分页
		pageChange(){},
		//表格的全选复选
		selectionChange(item){
			var arr = [];
      for (var i = 0; i < item.length; i++) {
        arr.push(item[i].id);
      }
      this.checkAll = arr;
		},
    //tab切换
    tab(num) {
      this.num = num;
    },
    //清空
    clear() {},
    //查询
    seek() {},
    //结束时间
    setClassTime() {},
    //开始时间
    setNextTime() {}
  }
};
</script>

<style scoped>
.allot span{
	width: 100px;
	display: inline-block;
	text-align: center;
}
.allot {
  margin-top: 15px;
  display: flex;
  width: 100%;
  height: 50px;
	background-color: rgb(228, 228, 228);
	align-items: center;
}
.ive-page{
	margin-top: 30px;
	text-align: right;
}
.tabs li.active span {
  color: #1b73b0;
}
.tabs li.active {
  border: 1px solid #ccc;
  border-bottom: 1px solid #fff;
}
.main-section .main-section-bottom {
  margin-top: 0px !important;
}
.tabs li {
  height: 100%;
  line-height: 50px;
  margin-right: 30px;
  width: 100px;
  text-align: center;
  margin-top: 1px;
  cursor: pointer;
  box-sizing: border-box;
}
.tabs {
  width: 100%;
  height: 50px;
  display: flex;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
  margin-top: 20px;
}
</style>