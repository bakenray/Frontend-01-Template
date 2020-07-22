export class Timeline {
  constructor(){
    this.animations = []
    this.requestID = null
    this.tick = ()=> { 
      let t = Date.now() - this.startTime 
      let animations = this.animations.filter(animation => !animation.finished)
      for(let animation of animations){
        let {object,property,timingFunction,start,end,delay,template,duration} = animation
        let progression = timingFunction((t - delay ) / duration); 
  
        if(t > animation.duration + animation.delay){
          progression = 1
          animation.finished = true
        }
        
        let value = start + progression * (end - start) 
      
        object[property] = template(value)
       
      }
      if(animations.length){
        this.requestID = requestAnimationFrame(this.tick)
      }
    }
  }
  tick(){
    
  }
  pause(){
    cancelAnimationFrame(this.requestID)

  }
  start(){
    this.startTime = Date.now()
    this.tick()
  }
  add(animation){
    this.animations.push(animation)
  }
}
export class Animation {
  constructor(object,property,template,start,end,duration,delay,timingFunction){
    this.object = object
    this.property = property
    this.template = template
    this.start = start
    this.end = end
    this.duration = duration
    this.delay = delay
    this.timingFunction = timingFunction   
  }
}
