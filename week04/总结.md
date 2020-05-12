# 第四周总结

## 事件循环
事件循环其实不属于JavaScript引擎的范围，是属于浏览器或者node范围。

## JS执行粒度
- 宏任务
- 微任务
- 函数调用
- 语句/声明
- 表达式
- 直接量/变量/this

在js引擎中执行的，都是微任务，在js引擎外执行的，就是宏任务。

例如，setTimeout这些是由浏览器提供的api，就是属于宏任务，而promise是js引擎提供的，所以属于微任务。

## Realm
- JS Context => Realm
- 宏任务
- 微任务
- 函数调用
- 语句/声明
- 表达式
- 直接量/变量/this

### 找出Realm中所有对象：

```
let set = new Set();

let globalProperties = [
    "eval",
    "isFinite",
    "isNaN",
    "parseFloat",
    "parseInt",
    "decodeURI",
    "decodeURIComponent",
    "encodeURI",
    "encodeURIComponent",
    "Array",
    "Date",
    "RegExp",
    "Promise",
    "Proxy",
    "Map",
    "WeakMap",
    "Set",
    "WeakSet",
    "Function",
    "Boolean",
    "String",
    "Number",
    "Symbol",
    "Object",
    "Error",
    "EvalError",
    "RangeError",
    "ReferenceError",
    "SyntaxError",
    "TypeError",
    "URIError",
    "ArrayBuffer",
    "SharedArrayBuffer",
    "DataView",
    "Float32Array",
    "Float64Array",
    "Int8Array",
    "Int16Array",
    "Int32Array",
    "Uint8Array",
    "Uint16Array",
    "Uint32Array",
    "Uint8ClampedArray",
    "Atomics",
    "JSON",
    "Math",
    "Reflect"
]

let queue = [];

for(let p of globalProperties){
    queue.push({
        path:[p],
        object:this[p]
    });
}

let current;

while(queue.length){
  current = queue.shift();
  console.log(current.path.join('.'))
  if(set.has(current.object))
  continue;
  set.add(current.object); 
  
  let proto = Object.getPrototypeOf(current.object);
  if(proto){
      queue.push({
          path:current.path.concat(["__proto__"]),
          object:proto
      })
  }

  for(let p of Object.getOwnPropertyNames(current.object)){
    let property = Object.getOwnPropertyDescriptor(current.object,p);

    if(property.hasOwnProperty("value") &&
     ((property.value != null) && (typeof property.value == 'object') ||(typeof property.value =='object'))
     && property.value instanceof Object){
        queue.push({
            path:current.path.concat([p]),
            object:property.value
        });
    }
    if(property.hasOwnProperty("get") && (typeof property.get==='function')){

        queue.push({
            path:current.path.concat([p]),
            object:property.get
        })
    }
    if(property.hasOwnProperty("set")  && (typeof property.set==='function')){

        queue.push({
            path:current.path.concat([p]),
            object:property.set
        })
    }
  }  
}
```
