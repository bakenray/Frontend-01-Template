# 每周总结可以写在这里

---

## 浏览器API

### Range API
- 主要API
    - var range = new Range()
    - range.setStart(element,9)
    - range.setEnd(element,4)
    - var range = document.getSelection().- getRangeAt(0);
- 辅助API
    - range.setStartBefore 
    - range.setEndBefore 
    - range.setStartAfter
    - range.setEndAfter
    - range.selectNode
    - range.selectNodeContents
    - range.extractContents
    - insertNode

### CSSOM

- document.styleSheets
    - document.styleSheets[0].cssRules 
    - document.styleSheets[0].insertRule("p {color:pink;}",0)
    - document.styleSheets[0].removeRule(0)
    CSSStyleRules
        - selectorText String
    - CSSCharsetRule
    - CSSImportRule
    - CSSMeidaRule
    - CSSFontFaceRule
    - CSSPageRule
    - CSSNamespaceRule
    - CSSKeyframesRule
    - CSSKeyframeRule
    - CSSSupportsRule

- getComputedStyle
    - window.getComputedStyle(elt,pseudoElt)

- 滚动 
    - scrollBy
    - scrollTo
    - scrollTop
    - scrollLeft
    - scrollHeight   


- 元素空间
    - $0.getClientRects()[0]  获取真实位置
    - $0.getBoundingClientRect() 

- 其他api
    - window.innerHeight
    - window.innerWidth
    - window.outerWidth
    - window.outerHeight
    - window.devicePixelRatio
    - document.documentElement.getBoundingClientRect();

## 编程训练
主要以实操为主。

通过构建一个 TicTacToe 井字棋来达到训练编程思维的目的。
