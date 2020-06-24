void async function(){
    let lights = document.querySelectorAll('.triffic_light');
    await changeColor()

    async function changeColor(){
        while(true){
            await lightTimeOut(lights[0],'red',10000)
            await lightTimeOut(lights[1],'yellow',2000)
            await lightTimeOut(lights[2],'green',5000)
        }
    }
    async function lightTimeOut(ele,color,timeOut){

        return new Promise((resolve) => {
            for(let i = 0; i<lights.length;i++){
                lights[i].classList.remove('red','green','yellow')               
            }
            ele.classList.add(color)
            ele.innerText = timeOut/1000 
            setTimeout(resolve,timeOut)
        })
    }
}()