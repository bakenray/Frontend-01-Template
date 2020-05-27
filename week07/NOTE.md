# CSS 语法研究 

## CSS2.1语法

- [https://www.w3.org/TR/CSS21/grammar.html#q25.0](https://www.w3.org/TR/CSS21/grammar.html#q25.0)

- [https://www.w3.org/TR/css-syntax-3](https://www.w3.org/TR/css-syntax-3)

## CSS 总体结构
- @charset
- @import
    - @media
    - @page
    - rule

## @规则研究
- @charset
- @import
- @media
- @page
- @namespace
- @supports
- @document
- @font-face
- @keyframes
- @viewport
- @counter-style

## CSS规则结构
- Selector
    - https://www.w3.org/TR/selectors-3/ 
    -https://www.w3.org/TR/selectors-4/
- Key
- Properties
    - Variables: https://www.w3.org/TR/css-variables/

- Value
    - https://www.w3.org/TR/css-values-4/

## 收集CSS标准
```
var lists = document.getElementById('container').children;
var result = [];
for(let li of lists){
    if(li.getAttribute('data-tag').match(/css/)){
        result.push({
                name:li.children[1].innerText,
                url:li.children[1].children[0].href
        })
    }
}
console.log(result);
```
[收集结果](https://github.com/bakenray/Frontend-01-Template/blob/master/week07/css/css-standards.json)
           
## 收集CSS属性相关标准
```
let iframe = document.createElement('ifranme');
document.body.innerHTML = '';
document.body.appendChild(iframe);
iframe.src = 'https://www.w3.org/TR/2020/WD-elreq-20200526/';

function happen(element,event){
    return new Promise(function(resove){
        let hander = () => {
            element.removeEventListener(event,handler);
        }
        element.addEventListener(event.hander);
    })
}

void async function(){
    for(let standard of standards){
        iframe.src = standard.url;
        console.log(standard.name)
        await happen(iframe,'load');
    }
}();
```