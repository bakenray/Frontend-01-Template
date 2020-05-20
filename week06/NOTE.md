# 第六周总结

## 浏览器实现原理

### 解析HTML

1. 创建状态机

[创建状态机地址](https://github.com/bakenray/Frontend-01-Template/blob/master/week06/tb_parser_hml/step/parser_1.js)

2. 解析标签
    - 主要的标签有：开始标签，结束标签和自封闭标签

[解析标签地址](https://github.com/bakenray/Frontend-01-Template/blob/master/week06/tb_parser_hml/step/parser_2.js)


3. 创建元素
    - 在状态机中，除了状态迁移，还要加入业务逻辑
    - 在标签结束状态提交标签token

[创建元素地址](https://github.com/bakenray/Frontend-01-Template/blob/master/week06/tb_parser_hml/step/parser_3.js)


4. 处理属性
- 属性值分为单引号、双引号、无引号三种写法，因此需要较多状态处理。
- 处理属性的方式和标签类似
- 属性结束时，把属性加到标签的Token上

[处理属性地址](https://github.com/bakenray/Frontend-01-Template/blob/master/week06/tb_parser_hml/step/parser_4.js)


5. 构建DOM树
- 从标签构建DOM的基本技巧是使用栈
- 遇到开始标签时创建元素并入栈，遇到结束标签时出栈
- 自封闭节点可视为入栈后立刻出栈
- 任何元素的父元素就是他入栈的栈顶

[构建DOM树地址](https://github.com/bakenray/Frontend-01-Template/blob/master/week06/tb_parser_hml/step/parser_5.js)


6. 处理文本
    - 文本节点 与自封闭标签处理类似
    - 多文本节点需要合并

[处理文本地址](https://github.com/bakenray/Frontend-01-Template/blob/master/week06/tb_parser_hml/step/parser_6.js)


### 解析CSS
1. 收集CSS规则
    - 遇到style标签时，把css规则保存起来
    - 调用css parser 分析css 规则
    - 必须要仔细研究css库分析css规则的格式

```
//...
const css = require('css');
let rules = [];

function addCSSRules(text){
    let ast = css.parse(text);
    console.log(JSON.stringify(ast,null,' '));
    rules .push(...ast.stylesheet.rules);
}

function emit(token){
//...
if(top.tagName === 'style'){
    addCSSRules(top.children[0].content);
}
stack.pop();
//...
}
```

2. 添加调用
- 创建一个元素后，立即计算CSS
- 分析一个元素时，所有CSS规则已经收集完毕
- 在浏览器中，可能遇到卸载body的style标签，这里忽略需要重新CSS计算情况。
```
function computeCSS(element){
    console.log(rules);
    console.log('compute CSS for Element',element)
}

function emit(token){
    //for(let p in token){...}

    //在合适的位置计算CSS
    computeCSS(element);  

    //top.children.push(element);    
}
```

3. 获取父元素序列
    - 在computeCSS函数中，必须知道元素的 所有父元素才能判断元素与规则是否匹配
    - 从上一步骤的stack，可以获取本元素所有的父元素
    - 因为首先获取的是“当前元素”，所以我们获得和计算父元素的顺序是从内向外。
```
function computeCSS(element){
    var elements = stack.slice().reverse();
}
```

4. 拆分选择器
    - 选择器也要从当前元素向外排列
    - 复杂选择器拆成针对单个元素的选择器，用循环匹配父元素队列
```
function computeCSS(element){
    let  elements = stack.slice().reverse();
    if(!element.computedStyle){
        element.computedStyle = {}
    }        
    for(let rule of rules){
        let selectorParts = rule.selectors[0].split(' ').reverse();
        if(!match(element,selectorParts[0])){
            continue;
        }
        let j = 1;
        let matched = false;
        for(var i = 0; i<elements.length; i++){
            if(match(elements[i],selectorParts[j])){
                j++;
            }
        }
        if(j>= selectorParts.length){
            matched = true;
        }
        if(matched){
            console.log('Element',element,'matched rule',rule);
        }  
    }    
}
```

5. 计算选择器与元素匹配
    - 根据选择器的类型和元素属性，计算是否与当前元素匹配
    - 这里只实现三种基本选择器，实际的浏览器中要处理复合选择器
```
function match(element,selector){
    if(!seletor || !element.attributes){
        return false;
    }
    if(selector.charAt(0) == '#'){
        let attr = element.attributes.filter(attr => attr.name ==='id')[0]
        if(attr && attr.value === selector.replace('#',''))
            return true;
        else if (selector.charAt(0) == '.'){
            let attr = element.attributes.filter(attr => attr.name ==='class')[0]
            if(attr && attr.value === selector.replace('.',''))
                return true;
        }
        else {
            if(element.tagName === selector){
                return true
            }
        }    
        return false
    }
}
```


6. 生成computed属性
    - 一旦选择匹配，就应用选择器到元素上，形成computedStyle
```
function computeCSS(){
    //...
    if(matched){
        let computedStyle = element.computedStyle;
        for(let declaration of rule.declarations) {
            if(!computedStyle[declaration.property]) = {}
            computedStyle[declaration.property].value = doclaration.value
        }
        console.log(element.computedStyle);
    }  
}
```  
7. 确定覆盖关系

```
function specificity(selector){
    let p = [0, 0, 0, 0];
    let selectorParts = selector.split(' ');
    for(let part of selectorParts){
        if(part.charAt(0) == '#'){
            p[1] +=1;
        }
        else if(part.charAt(0) == '.'){
            p[2] +=1;
        }     
        else {
            p[3] +=1;
        }             
    }
    return p;
}
```


```
function computeCSS(){
    //...
    if(matched){
        let sp = specificity(rule.selectors[0]);
        let computedStyle = element.computedStyle;
        
        for(let declaration of rule.declarations) {
            if(!computedStyle[declaration.property])  
               computedStyle[declaration.property] = {}
            
            if(!computedStyle[declaration.property].specificity){
                computedStyle[declaration.property].value = declaration.value
                computedStyle[declaration.property].specificity= sp
            }
            else if(compare(computedStyle[declaration.proerty].specificity,sp) <0){
                computedStyle[declaration.property].value = declaration.value
                computedStyle[declaration.property].specificity= sp
            } 
        }
        console.log(element.computedStyle);
    } 
}
```

```
function compare(sp1,sp2){
    if(sp1[0] - sp2[0]){
        return sp1[0] - sp2[0];
    }
    if(sp1[1] - sp2[1]){
        return sp1[10] - sp2[1];
    } 
    if(sp1[2] - sp2[2]){
        return sp1[2] - sp2[2];
    }  
    return sp1[3] - sp2[3]     
}
```
