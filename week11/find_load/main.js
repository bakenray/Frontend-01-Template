class BinaryHeap {
    constructor(data,compare){
        this.data = data
        this.compare = compare || ((a,b) => a - b)
    }
    take(){
        if(!this.data.length)
            return;
        let min = this.data[0]
        let i = 0;
        while(i<this.data.length){
            if(i * 2 + 1 >= this.data.length)
                break;
            if(i * 2 + 2 >= this.data.length){
                this.data[i] = this.data[i * 2 + 1]
                i = i * 2 + 1
                break;
            }

            if(this.compare(this.data[i * 2 + 1],this.data[i * 2 + 2]) < 0){
                this.data[i] = this.data[i * 2 + 1]
                i = i*2 + 1
            }
            else{
                this.data[i] = this.data[i * 2 + 2]
                i = i*2 + 2
            }
        }
        if(i < this.data.length - 1){
            this.insertAt(i,this.data.pop())
        }
        else{
            this.data.pop()
        }
        return min
    }
    insertAt(i,v){
        this.data[i] = v
        
        while(i > 0 && this.compare(v,this.data[Math.floor((i - 1)/2)])<0){
            this.data[i] = this.data[Math.floor((i - 1)/2)]
            this.data[Math.floor((i - 1)/2)] = v
            i = Math.floor((i - 1)/2)
        }
    }
    insert(v){
        this.insertAt(this.data.length,v)
    }
    get length(){
        return this.data.length
    }
}

class Sorted {
    constructor(data,compare){
        this.data = data
        this.compare = compare || ((a,b) => a - b)
    }
    take(){
        if(!this.data.length)
            return;

        let min = this.data[0]
        let minIndex = 0
        for(let i = 1; i<this.data.length; i++){
            if(this.compare(this.data[i],min) < 0){
                min = this.data[i]
                minIndex = i
            }
        }

        this.data[minIndex] = this.data[this.data.length - 1];
        this.data.pop();  
        console.log('take',min)
        return min
    }
    insert(v){
        this.data.push(v)
    }
    get length(){
        return this.data.length
    }
}

let storageMap = localStorage.map
let map = storageMap ? JSON.parse(storageMap) : new Array(10000).fill(0);
let container = document.getElementById('container');
let mouse = false;
let clear = false;

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

    let table = new Array(10000).fill(Infinity)
    table[start[1]*100 + start[0]] = 0

    function distance([x,y]){
        return (x - end[0]) ** 2 + (y - end[1]) ** 2;
    }

    let collection = new BinaryHeap([start], (a,b) => distance(a) - distance(b))
    
    container.children[start[1] * 100 + start[0]].style.backgroundColor = 'green'
    container.children[end[1] * 100 + end[0]].style.backgroundColor = 'red'

    async function insert([x,y],pre,fromStart){
        if(map[100 * y + x] ===1){
            return
        }
        if(x < 0 || y < 0 || x >= 100 || y >=100){
            return
        }
        if(fromStart >= table[100*y + x]){
            return
         }
        map[100 * y + x] = pre
        table[100 * y + x] = fromStart
        container.children[y * 100 + x].style.backgroundColor = 'lightgreen'
        await sleep(1)
        collection.insert([x,y])
    }

    while(collection.length){
        let [x,y] = collection.take()
        let fromStart = table[100*y +x]
        if(x === end[0] && y === end[1]){
            let path = []
            while(x !== start[0] || y !== start[1]){
                path.push([x,y])
                container.children[y * 100 + x].style.backgroundColor = 'pink';     
                [x,y] = map[y * 100 + x]          
            }
            return path
        }
        await insert([x - 1,y],[x,y],fromStart+1)
        await insert([x + 1,y],[x,y],fromStart+1)
        await insert([x,y - 1],[x,y],fromStart+1)
        await insert([x,y + 1],[x,y],fromStart+1)

        await insert([x - 1,y - 1],[x,y],fromStart+1.4)
        await insert([x + 1,y - 1],[x,y],fromStart+1.4)
        await insert([x - 1,y + 1],[x,y],fromStart+1.4)
        await insert([x + 1,y + 1],[x,y],fromStart+1.4)
    }
    return null
}

function sleep(t){
    return new Promise(function(resolve){
        setTimeout(resolve,t)
    })
}

function findLoad(){
    let inputs = document.getElementById('inputs');
    let arr = inputs.value.split(',').map((item)=>{ return Number(item)})
    findPath(map,[0,0],arr)
}
