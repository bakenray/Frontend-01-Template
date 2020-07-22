export class Timeline {
  constructor(){
    this.animations = []
    this.requestID = null
    this.state = "inited"
    this.tick = ()=> { 
      let t = Date.now() - this.startTime 
      let animations = this.animations.filter(animation => !animation.finished)
      for(let animation of animations){
        let {object,property,timingFunction,start,end,delay,duration,addTime,template} = animation
        let progression = timingFunction((t - delay - addTime ) / duration); 
  
        if(t > duration + delay + addTime){
          progression = 1 
          animation.finished = true
        }
        
        let value = animation.valueFromProgression(progression)
      
        object[property] = template(value)
       
      }
      if(animations.length){
        this.requestID = requestAnimationFrame(this.tick)
      }
    }
  }
  start(){
    if(this.state != "inited")
    return
    this.state = "playing"
    this.startTime = Date.now()
    this.tick()
  }
  add(animation,addTime){
    this.animations.push(animation)
    animation.finished = false
    if(this.state ==='playing')
      animation.addTime = addTime !== void 0 ? addTime : Date.now() - this.startTime
    else
      animation.addTime = addTime !== void 0 ? addTime : 0
  }
  pause(){
    if(this.state !== "playing")
      return
    this.state = "pause"
    this.pauseTime = Date.now()
    if(this.requestID !== null)
      cancelAnimationFrame(this.requestID)
  }
  resume(){
    if(this.state !== "pause")
      return
    this.state = "playing"
    this.startTime  += Date.now() - this.pauseTime //扣掉暂停时间
    this.tick()
  }
  restart(){
    if(this.state === 'playing'){
      this.pause
    }
    this.animations = []
    this.requestID = null
    this.state = "playing"
    this.startTime = Date.now()
    this.pauseTime = null
    this.tick()
  }
}
export class Animation {
  constructor(object,property,start,end,duration,delay,timingFunction,template){
    this.object = object
    this.property = property
    this.template = template
    this.start = start
    this.end = end
    this.duration = duration
    this.delay = delay
    this.timingFunction = timingFunction   
  }
  valueFromProgression(progression){
    return this.start + progression * (this.end - this.start)
  }
}
export class ColorAnimation {
  constructor(object,property,start,end,duration,delay,timingFunction,template){
    this.object = object
    this.property = property
    this.template = template || (v => `rgba(${v.r},${v.g},${v.b},${v.a})`)
    this.start = start
    this.end = end
    this.duration = duration
    this.delay = delay
    this.timingFunction = timingFunction   
  }
  valueFromProgression(progression){
    console.log('xxx',progression)
    return {
      r:this.start.r + progression * (this.end.r - this.start.r),
      g:this.start.g + progression * (this.end.g - this.start.g),
      b:this.start.b + progression * (this.end.b - this.start.b),
      a:this.start.a + progression * (this.end.a - this.start.a),
    }
  }
}
