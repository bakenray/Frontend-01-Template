let handlers = new Map()
let reactivities = new Map()
let usedReactivities = []
let object = {
    a:{x:3},
    b:2
}

function reactive(obj){

    if(reactivities.has(obj)){
        return reactivities.get(obj)
    }

    let proxy =  new Proxy(obj,{
        get(obj,prop){
            usedReactivities.push([obj,prop])
            if(typeof obj[prop] === 'object')
                return reactive(obj[prop])
            return obj[prop]
        },
        set(obj,prop,val){
            obj[prop] = val
            if(handlers.get(obj)){
                if(handlers.get(obj).get(prop)){
                    for(let handler of handlers.get(obj).get(prop))
                        handler()
                }
            }
            return obj[prop]
        }
    })
    reactivities.set(obj,proxy)
    return proxy
}
function effect(handler){
    usedReactivities = []
    handler()
    for(let usedReactivity of usedReactivities ){
        let [obj,prop] = usedReactivity;
        if(!handlers.has(obj)){
            handlers.set(obj,new Map())
        }
        if(!handlers.get(obj).has(prop)){
            handlers.get(obj).set(prop,[])
        }
        handlers.get(obj).get(prop).push(handler)
    }
}

let v;
let p = reactive({r:100,g:100,b:100})
let r = document.getElementById('r')
let g = document.getElementById('g')
let b = document.getElementById('b')
let colorCont = document.getElementById('color')

effect(() => {
    r.value = p.r;
})
effect(() => {
    g.value = p.g;
})
effect(() => {
    b.value = p.b;
})

r.addEventListener('input',event =>{
    p.r = Number(event.target.value)
})
g.addEventListener('input',event =>{
    p.g = Number(event.target.value)
})
b.addEventListener('input',event =>{
    p.b = Number(event.target.value)
})

effect(() => {     
    colorCont.style.backgroundColor = `rgb(${p.r},${p.g},${p.b})`
})

let text = document.getElementById('text')
let range = document.createRange()
range.setStart(text.childNodes[0],6)
range.setEnd(text.childNodes[0],14)

let data = reactive({text:'World'})
effect(() => {     
    range.extractContents();
    range.insertNode(document.createTextNode(data.text))
})