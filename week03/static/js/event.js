let string = ''
let radix = ''
let inputElement = document.querySelector('#input')
let outputElement = document.querySelector('#output')
let radixElement = document.querySelector('#radix')
let btn = document.querySelector('#btn')
inputElement.addEventListener('input',(e)=>{
    string = e.target.value
})
radixElement.addEventListener('input',(e)=>{
    radix = e.target.value
})
btn.addEventListener('click',(e)=>{
    let name = e.target.dataset.name
    if(name==='stringToNumber'){
        outputElement.value = converStringToNumber(string,Number(radix)?Number(radix):void 0)
    }
    else if(name==='numberToString'){
       
    }
})