
import { enableGesture } from './Gesture'

export function createElement(Cls,attributes,...children){
  let o ;
  if(typeof Cls ==='string'){
    o = new Warper(Cls);
  }else{
    o = new Cls({
      timer:{}
    });
  }
  for(let name in attributes){
    o.setAttribute(name,attributes[name])
  }

  let visit = (children) => {
    for(let child of children){
      if(typeof child === 'object' && child instanceof Array){
          visit(child)
          continue;
      }
      if(typeof child === 'string'){
        child = new Text(child)
      }
      o.appendChild(child)
    }
  }
  visit(children)

  return o
}

export class Text{
  constructor(type){
    this.child = []
    this.root = document.createTextNode(type);
  }
  mountTo(parent){
    parent.appendChild(this.root)
  }
}

export class Warper{
  constructor(type){
    this.children = []
    this.root = document.createElement(type)
  }
  setAttribute(name,value){ 
    this.root.setAttribute(name,value)
    if(name.match(/^on([\s\S]+)$/)){
      let eventName = RegExp.$1.replace(/^[\s\S]/,c => c.toLowerCase())
      this.addEventListener(eventName,value)
    }
    if(name ==='enableGesture'){
      enableGesture(this.root)
    }
  }
  
  appendChild(child){
    this.children.push(child)
  }

  addEventListener(){
    this.root.addEventListener(...arguments)
  }

  get style(){
    return this.root.style
  }

  mountTo(parent){
    parent.appendChild(this.root)
    for(let child of this.children){
      if(typeof child === 'string'){
        child = new Text(child)
      }
      child.mountTo(this.root)
    }
  }
}