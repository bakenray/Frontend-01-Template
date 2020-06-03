# 每周总结可以写在这里

## CSS选择器
### 简单选择器
  - \*
  - element
  - .class
  - #id
  - [attr]
    - [attr=value]
    - [attr~=value]
    - [attr|=value]
  - :hover
  - ::before

### 复合选择器
  - <简单选择器><简单选择器><简单选择器> 
  - \* 或者 div 必须写在最前面

### 复杂选择器
  - <复合选择器> <sp> <复合选择器>
  - <复合选择器> ">"  <复合选择器>
  - <复合选择器> "~"  <复合选择器>
  - <复合选择器> "+"  <复合选择器>
  - <复合选择器> "||"  <复合选择器> 


## 选择器优先级
  1. 内联
  2. id
  3. class
  - [attr] 和 class 选择器级别相同
  4. element
  5. :not、\* 不占优先级

## 伪类

### 链接/行为
- :any-link
- :link :visited
- :hover
- :active
- :focus
- :target 
### 树结构
- :empty
- :nth-child()
- :nth-last-child()
- :first-child  :last-child :only-child 
### 逻辑型
- :not 
- :where
- :has

### 伪元素
- ::before
- ::after
- ::first-letter
- ::first-line 	

## CSS排版

### 盒模型

- 标签 Tag
  - 带有尖括号，封闭的标签，有开始标签、结束标签和自封闭标签
- 元素 Element
  - 一对起止标签或者一个自封闭标签，表示一个元素
- 盒 Box
  - margin 外边距
  - padding 内边距
  - border 边框
  - content 内容

### 正常流
- 收集盒进行
- 计算盒在行中的排布
- 计算行的排布

### float布局
float的基本用法，其实是对绕排的描述。

### margin折叠
- margin 折叠，发生在上下方向；
- 相同BFC下 inline-block 的元素之间不会产生margin折叠
- 相同BFC下 脱离文档流 的元素相互间不会产生margin折叠
- 不同 BFC 下的元素之间不会发生margin折叠

### Flex
- 收集盒进行
- 计算盒在主轴方向排布
- 计算盒在交叉轴方向排布