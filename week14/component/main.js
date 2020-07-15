//框架代码
function create(Cls,attributes,...children){
  let o ;

  if(typeof Cls ==='string'){
    o = new Warper(Cls);
  }else{
    o = new Cls({
      timer:{}
    });
  }

  for(let name in attributes){
    // o.setAttribute(name,attributes[name])
    o[name] = attributes[name]
  }
  for(let child of children){
    if(typeof child === 'string'){
      child = new Text(child)
    }
    o.appendChild(child)
  }
  return o
}

class Text{
  constructor(type){
    this.child = []
    this.root = document.createTextNode(type);
  }
  mountTo(parent){
    parent.appendChild(this.root)
  }
}

class Warper{
  constructor(type){
    this.children = []
    this.root = document.createElement(type)
  }
  setAttribute(name,value){ 
    this.root.setAttribute(name,value)
  }
  appendChild(child){
    this.children.push(child)
  }
  mountTo(parent){
    parent.appendChild(this.root)
    for(let child of this.children){
      child.mountTo(this.root)
    }
  }
}

//用户代码
class MyComponent{
  constructor(config){
    this.children = []
    this.attributes = new Map()
    this.properties = new Map()
  }
  setAttribute(name,value){ 
    this.attributes.set(name,value)
  }
  appendChild(child){
    this.children.push(child)
  }
  set title(value){
    this.properties.set('title',value)
  }
  render(){
    return <article >
            {/* <h1>{this.attributes.get('title')}</h1> */}
            <h2>{this.properties.get('title')}</h2>
            <header> header </header>
            {this.slot}
            <footer>footer</footer>
           </article>
  }
  mountTo(parent){
    this.slot = <div></div>
    for(let child of this.children){
      this.slot.appendChild(child)
    }
    this.render().mountTo(parent)
  }
}
let component = <MyComponent title="im title">
                  <div> div </div>
                </MyComponent>
                
// component.title = "im title 2"
component.mountTo(document.body)
