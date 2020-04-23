<template>
  <div class="allocation">
    <span class="btnSpan" @click="clickOpen">{{title ? title : '分配'}}</span class="btnSpan">
    <Modal :title="title ? title : '分配'" width="20" v-model="modal10" class-name="vertical-center-modal-1"  @on-ok="confirm" @on-cancel="cancel">
      <div class="content">
				<RadioGroup v-model="mode.teacher_id" vertical>
					<Radio :label="item.teacher_id" v-for="item in teacherList" :key="item.teacher_id">
							<span class="name">{{item.teacher_name}}</span>
							<span class="mobile">12345678910</span>
					</Radio>
				</RadioGroup>
			</div>
    </Modal>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import qs from "qs";
import { MASSDISTRIBUTION,CLASSTEACH } from "@/uilt/url/url";
import PayingStudent from "@/store/payingstudent/index";
// 这里需要用户具体信息，然后通过userIndex传来的选中的哪个数据，配合接口做分配，等.jpg
export default {
	props: {
		title: {
      type: String,
      required: false
		},
		row: {
      type: [Object,String],
      required: false
    },
    showMod: {
      type: [Boolean,String],
      required: false
    },
		Items: {
      type: Array,
      required: false
		}
	},
	computed: {
    ...mapState({
      dataList: state => state.currentPage.dataList
    })
	},
	watch: {
    showMod(val) {
      this.modal5 = val;
    }
  },
  data() {
    return {
			modal10: this.showMod,
			vertical: 'apple',
			mode: {
				order_ids: '',
				teacher_id: ''
			},
			teacherList: []
    }; 
	},
	methods: {
		...mapMutations(["setRefresh"]),
		clickOpen() {
			if(this.Items.length) {
				this.modal10 = true
				this.getClassTeacher()
			}
		},
		// 点击确认
		async confirm() {
			this.mode.order_ids = ""
			if(this.row) {
				this.mode.order_ids = this.row.order_id
			} else {
				this.Items.map(item => {
					this.mode.order_ids += item.order_id + ','
				})
				this.mode.order_ids = this.mode.order_ids.substr(0,this.mode.order_ids.length - 1)
			}
			// 分配接口
			let res = await this.$request({
        method: "post",
        url: MASSDISTRIBUTION,
        data: qs.stringify(this.mode),
			});
			this.setRefresh(true)
			this.$emit("changeShowMod", false);
			this.$emit("refresh")
		},
		// 点击取消
		cancel() {
			// 取消时把选中状态还原
			this.vertical = "apple"
			this.$emit("changeShowMod", false);
		},
		// 获取班主任列表
    async getClassTeacher() {
      let res = await this.$request({
        method: "get",
        url: CLASSTEACH,
      });
			this.teacherList = res.data.data
    }
	},
	created() {
		this.getClassTeacher()
	}
};
</script>

<style scoped>
.btnSpan {
  cursor: pointer;
}
/* 设置高度 */
.content {
	width: 400;
  height: 300px;
  overflow: auto;
	text-align: center;
}
.name {
	display: inline-block;
	width: 80px;
	padding: 10px;
}
</style>

<style>
.vertical-center-modal-1 {
  display: flex;
  align-items: center;
  justify-content: center;
}
.vertical-center-modal-1 .ivu-modal {
  top: 0;
}
</style>