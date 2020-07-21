# canvas

## 创建cantext对象

```
var canvas = this.$refs.canvas
canvasText = canvas.getContext('2d')

```
1.getContext("2d") 对象是内建的 HTML5 对象，拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法

```
canvasText.fillStyle = '#ccc'
canvasText.fillRect(0,0,150,75)

```
> fillRect 方法拥有参数 (0,0,150,75)
在画布上绘制 150x75 的矩形，从左上角开始 (0,0)。