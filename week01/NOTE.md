# 第一周总结
---
## 预习作业

#### 编写一个 DOM 编辑器：可以自由地操作一个 iframe（空白）中的 DOM 结构，包括增、删、移动。

[预览效果](http://www.bakenray.com/Frontend-01-Template/week01/self-assessment/iframe_demo/index.html)

[源码地址]('https://github.com/bakenray/Frontend-01-Template/tree/master/week01/self-assessment/iframe_demo')

#### 讲讲 position float display 各有哪些取值，它们互相之间会如何影响？

**position**
- static —— 默认值，正常的布局行为；
- relative —— 相对定位， 相对原来位置的布局；
- absolute —— 绝对定位，跳出正常流，指定元素相对最近的非static 定位元素偏移，来确定位置；
- fixed —— 浮动定位，跳出正常流，根据屏幕视口的位置指定元素位置。 会创建新的层叠上下文，transform等属性非node时，容器会改为改元素祖先。
- sticky —— 粘性布局，根据正常文档流定位，相对它最近的滚动祖先和块级祖先 进行便宜。 会创建层叠上下文；


**float**
- none —— 默认值，不进行浮动；
- left —— 左浮动；
- right —— 右浮动；
- inline-start —— 浮动在块容器开始一侧
- inline-end —— 浮动在块容器结束一侧
- ...

**display**
可以控制图形元素或容器元素的渲染。
- none —— 不渲染，隐藏；
- block —— 渲染为块级元素；
- inline  —— 渲染为内联元素；
- linline-block —— 渲染为内联块级元素；
- table ——渲染为块级表格；
- flex —— flex 弹性布局；
- grid ——网格布局；
- ...

**互相影响**
- display值取none时，元素不渲染，position与float 也不生效；
- position值为fixed或absolute时， float效果相当于与none，根据top、left等偏移布局；
- ...

 #### JavaScript 启动后，内存中有多少个对象？如何用代码来获得这些信息？
...

#### HTML 的中，如何写一个值为 “a”=‘b’ 的属性值？
``` element.setAttribute('key', `"a"='b'`) ```

#### 编写一个快速排序代码，并且用动画演示它的过程
...

#### 如果你要写一本关于整个前端开发的书，请你列出你的目录。

1. 核心基础：HTML、CSS、JavaScript；
2. 浏览器：API、BOM、DOM、解析渲染和绘制； 
3. 应用实践：框架使用、计算机网络、webpack等工具链；
4. 前端工程化：性能、组件化、单元测试、持续集成；

## 随堂作业

#### 把面向对象这个概念用追溯法写一篇博文，写在自己的博客中，你也可以写到 GitHub 的 Issues 里。
...

#### 把预习内容的前端目录整理出来，和 winter 老师课件里的脑图或者课程目录做对比，思考一下为什么会有差别？

有不少差别。

首先是整体细节，目前自己知识边界相对老师整理的脑图的边界来说，包裹比例还太小，很多时候是触及不到边界和细节。

其次是知识点归类，有不少知识点是了解的，但是没有形成一个归类分组，大部分时候属于零星的知识点，没到整理达到体系的规模。

最后是权威性，以前学习的知识点，一是知识点零散，二是知识来源性不够权威。相比于老师基于保准文档归类整理学习的内容，自己有些二手学习的知识，显得模模糊糊。

#### 把库里边的 URL 解析代码写一下
```
console.log('lalala')
```

## 课程作业

#### 把课上老师的脑图里的这些实体补全
目录下 "前端技术目录.png" 与 "前端技术目录.xmind" 文件。
[前端技术目录.png](https://github.com/bakenray/Frontend-01-Template/tree/master/week01/前端技术目录.png)
[前端技术目录.xmind](https://github.com/bakenray/Frontend-01-Template/tree/master/week01/前端技术目.xmind)

#### 你能不能在 ECMA 中找到所有的类型（Type）

**语言类型**
- Number
- String
- Boolean
- Null
- Undefined
- Object
- Symbol

**内部类型**
- Reference
- List
- Completion
- Property Descriptor
- Lexical Environment
- Environment Record
- Data Block

## 总结
总结