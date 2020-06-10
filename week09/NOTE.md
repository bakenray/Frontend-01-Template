# 第九周 总结

## **CSS动画**

### Animation

  - @keyframes 关键帧
  - animation 属性
    - animation-name —— 时间曲线名
    - animation-duration —— 动画时长
    - animation-timing-function —— 动画的时间曲线
    - animation-delay —— 动画开始前的延迟
    - animation-iteration-count —— 动画播放次数；
    - animation-direction —— 动画方向
```
div{
    animation:mykf 2s ease 1s infinite alternate; 
}

@keyframes mykf {
    0%{background:red;}
    50%{background:green;}
    100%{ background:yellow;}
}
```
### Transition


  - transition-property —— 变换属性
  - transition-duration —— 变换时长
  - transition-timing-function —— 时间曲线
    - ease 
    - linear 
    - ease-in
    - ease-out
    - ease-in-out
  - transition-delay

### cubic-bezier 

贝塞尔曲线( https://cubic-bezier.com )

css中使用的是三次贝塞尔曲线。

一次贝塞尔曲线
![一次贝塞尔曲线](https://github.com/bakenray/Frontend-01-Template/blob/master/week09/images/cubic_bezier_1.png)


二次贝塞尔曲线
![二次贝塞尔曲线](https://github.com/bakenray/Frontend-01-Template/blob/master/week09/images/cubic_bezier_2.png)


三次贝塞尔曲线
![三次贝塞尔曲线](https://github.com/bakenray/Frontend-01-Template/blob/master/week09/images/cubic_bezier_3.png)

### CSS渲染与颜色
  - CMYK 与 RGB
  - HSL 与 HSV

### CSS形状
  - border
  - box-shadow
  - border-radius
  - svg
    - data uri + svg   

## **重学HTML** 
  HTML合法元素
  - Element : \<tagname\>...\<tagname\>
  - Text：text
  - Comment ：<!-- comments -->
  - DocumentType: <!Doctype html>
  - ProcessingInstruction: <?a 1?>
  - CDATA:\<![CDATA[]]\>

  几个常用字符
  - &#161; (`&#161;`)
  - &amp; (`&amp;`)
  - &lt; (`&lt;`)
  - &quot; (`&quot;`)

## **DOM API和事件**

### DOM

#### Node

  - Element  元素型节点
    - HTMLElement
    - SVGElement
      - SVGAElement
      - SVGAltGlyphElement
  - Document  文档根节点
  - CharacterData 字符数据
    - Text 文本节点
    - CDATASection:CDATA节点
    - Comment 注释
    - ProcessingInstruction 处理信息
  - DocumentFragment 文档片段
  - DocumentType  文档类型

#### 导航操作
  - parentNode
  - childNodes
  - firstChild
  - lastChild
  - nextSibling
  - previousSibling

#### 修改操作
  - appendChild
  - insertBefore
  - removeChild 
  - replaceChild 

#### 高级操作
  - compareDocumentPosition —— 比较两个节点中关系的函数。
  - contains ——  检查节点是否包含另一个节点的函数。
  - isEqualNode —— 检查两个节点是否完全相同。
  - isSameNode —— 检查两个节点是否是同一个节点，实际上在JavaScript中可以用 "==="。（基本废弃）。
  - cloneNode —— 复制一个节点，如果传入参数 true，则会连同子元素做深拷贝。

### Browser API 
  - CSSOM
  - DOM
    - DOM Tree
    - Events
    - Range
    - Traversal（垃圾）
  - BOM
  - Web animation
  - Crypto
  - ...


### Event 

捕获、冒泡例子：
```
<div class="box" id="box">
  <div class="item" id="item"></div>
</div>
```

```
box.addEventListener('click',function(e){
  console.log('box')
},true)
item.addEventListener('click',function(e){
  console.log('item')
},true)
```
```
box.addEventListener('click',function(e){
  console.log('box')
},false)
item.addEventListener('click',function(e){
  console.log('item')
},false)
```
addEventListener 都是先捕获，后冒泡。

不过设置**第二参数**，设置为true，会先捕获。设置为false，会先冒泡。

