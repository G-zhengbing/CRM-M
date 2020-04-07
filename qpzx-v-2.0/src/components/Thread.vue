<template>
  <div class="box">
    <header class="main-header">
      <ul>
        <li style="margin-left:30px">
          <!-- <i></i> -->
          <span>线索导入</span>
        </li>
      </ul>
    </header>
    <section class="main-section">
      <div class="surplus">
        <div class="main-section-bottom">
          <div class="contaner">
            <Button type="primary" @click="allot">批量导入线索</Button>
            <Table
              style="width:100%"
              border
              :columns="columns2"
              :data="reservList"
              @on-selection-change="selectionChange"
            ></Table>
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
export default {
  data() {
    return {
      checkall: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      reservList: [],
      columns2: [
				{
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "导入时间",
          key: "title",
          align: "center"
        },
        {
          title: "总数量",
          key: "link_url",
          align: "center"
				},
				{
          title: "导入成功数量",
          key: "link_url",
          align: "center"
				},
				{
          title: "导入失败数量",
          key: "link_url",
          align: "center"
				},
				{
          title: "导入者",
          key: "link_url",
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
                      this.look(params.row);
                    }
                  }
                },
                "查看失败数据"
              )
            ]);
          }
        }
			],
      num: 1
    };
  },
  methods: {
		//查看失败数据
		look(val){
			console.log(val)
		},
    //分页
    pageChange() {},
    //表格反选复选框
    selectionChange() {},
    //批量导入线索
    allot() {}
  }
};
</script>

<style scoped>
.ive-page{
	text-align: right;
	margin-top: 30px;
}
.ivu-btn.ivu-btn-primary{
	margin: 30px 0 10px 20px;
}
.main-section-bottom {
  margin-top: 0;
}
</style>