let storageMap = localStorage.map
let map = storageMap ? JSON.parse(storageMap) : new Array(10000).fill(0);
let mouse = false;
let clear = false;
let container = document.getElementById('container');

for(let y = 0; y < 100; y++){
    for(let x = 0; x < 100; x++){
        let cell = document.createElement('div');
        cell.classList.add('cell')
        if(map[y * 100 + x] === 1){
            cell.style.backgroundColor = 'black';
        }
        cell.addEventListener('mousemove',() => {
            if(mouse){
                if(clear){
                    cell.style.backgroundColor = '';
                    map[y * 100 + x] = 0;
                }
                else {
                    cell.style.backgroundColor = 'black';
                    map[y * 100 + x] = 1;
                }                
            }
        })
        container.appendChild(cell);
    }
}
events()
findPath(map,[0,0],[50,50])


function events(){
    document.addEventListener('mousedown',(e) => {
        mouse = true
        clear = (e.which === 3)
    });
    document.addEventListener('mouseup',() => mouse = false);
    document.addEventListener('contextmenu',e => e.preventDefault());
}

async function findPath(map,start,end){
    map = map.slice()

    let queue = [start]

    async function insert([x,y]){
        if(map[100 * y + x] !==0){
            return
        }
        if(x < 0 || y < 0 || x >= 100 || y >=100){
            return
        }
        map[100 * y + x] = 2
        container.children[y * 100 + x].style.backgroundColor = 'lightgreen'
        await sleep(5)
        queue.push([x,y])
    }

    while(queue.length){
        let [x,y] = queue.shift()
        if(x === end[0] && y === end[1])
            return true
        await insert([x - 1,y])
        await insert([x + 1,y])
        await insert([x,y - 1])
        await insert([x,y + 1])
    }
    return false
}

function sleep(t){
    return new Promise(function(resolve){
        setTimeout(resolve,t)
    })
}

