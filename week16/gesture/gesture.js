let element = document.body
let contexts = Object.create(null)
let MOUSE_SYMBOL = Symbol('mouse')

// 鼠标事件
if(document.ontouchstart !== null){ 
  element.addEventListener('mousedown',(event)=>{
    contexts[MOUSE_SYMBOL] = Object.create(null)
    start(event,contexts[MOUSE_SYMBOL])
    let mousemove = event => {
      move(event,contexts[MOUSE_SYMBOL])
    }
    let mouseend = event => {
      end(event,contexts[MOUSE_SYMBOL])
      document.removeEventListener('mousemove',mousemove)
      document.removeEventListener('mouseup',mouseend)
    }
    document.addEventListener('mousemove',mousemove)
    document.addEventListener('mouseup',mouseend)
  })
}

// 手势事件
element.addEventListener('touchstart',event => {
  // 可能有多指
  for(let touch of event.changedTouches){
    contexts[touch.identifier] = Object.create(null)
    start(touch,contexts[touch.identifier])
  }
})

element.addEventListener('touchmove',event => {
  for(let touch of event.changedTouches){
    move(touch,contexts[touch.identifier])
  }
})

element.addEventListener('touchend',event => {
  for(let touch of event.changedTouches){
    end(touch,contexts[touch.identifier])
    delete contexts[touch.identifier]
  }
})

element.addEventListener('touchcancel',event => {
  for(let touch of event.changedTouches){
    cancel(touch,contexts[touch.identifier])
    delete contexts[touch.identifier]
  }
})

let start = (point,context)=>{
  context.startX = point.clientX
  context.startY = point.clientY
  context.isTap = true
  context.isPan = false
  context.isPress = false

  context.timeHandler = setTimeout(()=>{
    if(context.isPan){ //pan优先级比press高
      return
    }
    context.isTap = false
    context.isPan = false
    context.isPress = true
    console.log('pressStart')
  },500)
}

let move = (point,context)=>{
  let dx = point.clientX - context.startX
  let dy = point.clientY - context.startY

  if(dx**2 + dy**2 > 100 && !context.isPan){
    context.isTap = false
    context.isPan = true
    context.isPress = false
    console.log('panStart')
  }
  if(context.isPan){
    console.log('panning')
  }
}

let end = (point,context)=> {
  if(context.isTap){
    console.log('tapEnd')
  }
  if(context.isPan){
    console.log('panEnd')
  }
  if(context.isPress){
    console.log('pressEnd')
  }
  clearTimeout(context.timeHandler)
}

let cancel = (point,context)=>{
  console.log(cancelEnd)
  clearTimeout(context.timeHandler)
}
