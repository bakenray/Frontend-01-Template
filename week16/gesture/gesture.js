function enableGesture(element){
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
    element.dispatchEvent(new CustomEvent('start',{
      startX:point.clientX,
      startY:point.clientY,
      clientX:point.clientX,
      clientY:point.clientY
    }))
    context.startX = point.clientX
    context.startY = point.clientY
    context.moves = []
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
      element.dispatchEvent(new CustomEvent('pressstart',{}))
    },500)
  }

  let move = (point,context)=>{
    let dx = point.clientX - context.startX
    let dy = point.clientY - context.startY

    if(dx**2 + dy**2 > 100 && !context.isPan){
      if(context.isPress){
        element.dispatchEvent(new CustomEvent('presscancel',{}))
      }
      context.isTap = false
      context.isPan = true
      context.isPress = false

      element.dispatchEvent(new CustomEvent('penstart',{
        startX:context.startX,
        startY:context.startY,
        clientX:point.clientX,
        clientY:point.clientY
      }))
    }
    if(context.isPan){
      context.moves.push({
        dx,
        dy,
        t:Date.now()
      })
      context.moves = context.moves.filter(record => Date.now() - record.t < 300)
      let e = new CustomEvent('pan')
      Object.assign(e,{
        startX:context.startX,
        startY:context.startY,
        clientX:point.clientX,
        clientY:point.clientY
      })

      element.dispatchEvent(e)
    }
  }

  let end = (point,context)=> {
    if(context.isTap){
      element.dispatchEvent(new CustomEvent('tap',{}))
    }
    if(context.isPan){
      let dx = point.clientX - context.startX
      let dy = point.clientY - context.startY
      let record = context.moves[0]
      let speed = Math.sqrt((record.dx - dx) ** 2 + (record.dy - dy) ** 2) / (Date.now() - record.t)
      let isFlick = speed > 2.5
      if(isFlick){
        element.dispatchEvent(new CustomEvent('flick',{
          startX:context.startX,
          startY:context.startY,
          clientX:point.clientX,
          clientY:point.clientY,
          speed:speed
        }))
      }

      element.dispatchEvent(new CustomEvent('panend',{
        startX:context.startX,
        startY:context.startY,
        clientX:point.clientX,
        clientY:point.clientY,
        speed:speed,
        isFlick:isFlick
      }))
      Object.assign(e,{
        startX:context.startX,
        startY:context.startY,
        clientX:point.clientX,
        clientY:point.clientY
      })
    }
    if(context.isPress){
      element.dispatchEvent(new CustomEvent('pressend',{}))
    }
    clearTimeout(context.timeHandler)
  }

  let cancel = (point,context)=>{
    element.dispatchEvent(new CustomEvent('canceled',{}))
    clearTimeout(context.timeHandler)
  }
}
