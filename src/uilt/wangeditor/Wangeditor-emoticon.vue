<template>
  <div id="wangeditor">
    <div ref="editorElem" style="text-align:left;"></div>
  </div>
</template>
<script>
import E from "wangeditor";
import axios from "axios";
import storage from "../../uilt/storage";
import { PRODUCTINFOFILE } from "../../uilt/url/url";
import emojiJSON from "./emoji";
export default {
  data() {
    return {
      editor: null,
      editorContent: "",
      text: "",
      emojiList: emojiJSON
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
      "link", // 插入链接
      "emoticon" // 表情
    ];
    // 表情面板可以有多个 tab ，因此要配置成一个数组。数组每个元素代表一个 tab 的配置
    this.editor.customConfig.emotions = [
      {
        // tab 的标题
        title: "emoji",
        // type -> 'emoji' / 'emoji'
        type: "emoji",
        // content -> 数组
        // content: ['😀', '😃', '😄', '😁', '😆']
        content: this.emojiList
      },
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
        axios.post(PRODUCTINFOFILE, fd, config).then(res => {
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