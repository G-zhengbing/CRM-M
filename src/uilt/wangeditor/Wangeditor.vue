<template>
  <div id="wangeditor">
    <div ref="editorElem" style="text-align:left;"></div>
  </div>
</template>
<script>
import E from "wangeditor";
import axios from "axios";
import storage from "../../uilt/storage";
export default {
  data() {
    return {
      editor: null,
      editorContent: "",
      text: ""
    };
  },
  // catchData是一个类似回调函数，来自父组件，当然也可以自己写一个函数，主要是用来获取富文本编辑器中的html内容用来传递给服务端
  props: ["catchData", "wangditor"], // 接收父组件的方法
  mounted() {
    var http = "http://liveapi.canpoint.net";
    this.editor = new E(this.$refs.editorElem);
    this.editor.customConfig.onchange = html => {
      this.editorContent = html;
      this.catchData(this.editorContent); // 把这个html通过catchData的方法传入父组件
      // console.log(this.editorContent);
      // console.log(this.editor.txt.text());
    };
    this.editor.customConfig.menus = [
      // 菜单配置（因为在最新版的wangeditor中不能让功能图标换行，可以视情况而定删除功能）
      "head", // 标题
      "bold", // 粗体
      "fontSize", // 字号
      "fontName", // 字体
      "italic", // 斜体
      "underline", // 下划线
      "strikeThrough", // 删除线
      "foreColor", // 文字颜色
      "link", // 插入链接
      "list", // 列表
      "justify", // 对齐方式
      "image", // 插入图片
      "table", // 表格
      "undo", // 撤销
      "redo" // 重复
    ];
    var that = this.editor;
    this.editor.customConfig.customUploadImg = function(files, insert) {
      // files 是 input 中选中的文件列表
      // insert 是获取图片 url 后，插入到编辑器的方法
      files.forEach(item => {
        let fd = new FormData();
        fd.append("file", item); // 上传的文件： 键名，键值
        let config = {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "bearer " + storage.get()
          }
        };
        axios
          .post("http://liveapi.canpoint.net/api/product_info_file", fd, config)
          .then(res => {
            insert(http + res.data);
          });
      });
    };
    // 创建富文本实例
    this.editor.create();
    setTimeout(() => {
      this.editor.txt.html(this.text);
    }, 1000);
  }
};
</script>