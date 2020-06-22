void async function(){
    let light = document.querySelector('.triffic_light');
    await changeColor()

    async function changeColor(){
        await lightTimeOut('red',10000)
        await lightTimeOut('yellow',2000)
        await lightTimeOut('green',5000)
    }
    async function lightTimeOut(color,timeOut){       
        return new Promise((resolve) => {
            light.classList.add(color)
            setTimeout(resolve,timeOut)
        })
    }
}()