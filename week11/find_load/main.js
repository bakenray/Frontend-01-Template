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


document.addEventListener('mousedown',(e) => {
    mouse = true
    clear = (e.which === 3)
});
document.addEventListener('mouseup',() => mouse = false);
document.addEventListener('contextmenu',e => e.preventDefault());