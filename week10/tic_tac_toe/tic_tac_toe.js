let pattern = [[0,0,0],[0,0,0],[0,0,0]]
let color = 1;

function show(){
  let board = document.getElementById('board')
 
  board.innerHTML = '';
  
  for(let i = 0;i<3;i++){
    for(let j = 0;j<3;j++){
      let cell = document.createElement('div')
      cell.classList.add('cell')
      cell.innerText = pattern[i][j] == 2 ? "X" :
        pattern[i][j] ==1?"O":''
      
      cell.addEventListener('click',() => userMove(j,i));
      
      board.appendChild(cell);
    }
    board.appendChild(document.createElement('br'))
  }
}
  
function userMove(x,y){
  if(pattern[y][x] !==0){
    return
  }
  pattern[y][x] = color;
 
   if(check(pattern,color)){
    alert(color == 2 ? 'X is Winner' : 'O is winner!');
   } 
  
  color = 3 - color;
  show();
  
  computerMove()
  
  // if(willWin(pattern,color)){
  //   console.log('will win')
  //   alert(color ===2 ?'X will win!':'O will win!')
  // }
}
  
function check(pattern,color){
  
  for(let i = 0; i<3;i++){
    let win = true;
    for(let j = 0; j<3; j++){
      if(pattern[i][j] !== color){
        win =  false;
        break;
      }
    }
   if(win)
     return true;
  }
  
  for(let i = 0; i<3;i++){
    let win = true;
    for(let j = 0; j<3; j++){
      if(pattern[j][i] !== color){
        win = false;
        break;
      }
    }
   if(win)
     return true;
  }  
  {
    let win = true
    for(let j =0;j<3;j++){
      if(pattern[j][j] !== color){
        win = false;
        break;
      }
    }
    if(win)
      return true;
  }
  {
    let win = true
    for(let j =0;j<3;j++){
      if(pattern[j][2 - j] !== color){
        win = false;
        break;
      }
    }
    if(win)
      return true;
  }
}
  
function clone(pattern){
  return JSON.parse(JSON.stringify(pattern))
}
  
function willWin(pattern,color){
  for(let i = 0;i<3;i++){
    for(let j = 0;j<3;j++){
      if(pattern[i][j] !== 0)
        continue;

      let tmp = clone(pattern)
      tmp[i][j] = color;
      if(check(tmp,color)){
        return [i,j]
      }
    }
  }  
  return false;
}
   
let openings = new Map();
  
  openings.set(
    [[0,0,0],[0,0,0],[0,0,0]].toString() + '1',
    {point:[1,1],result:0})
    
  openings.set([
    [0,0,0],[0,1,0],[0,0,0]].toString() + '2',
    {point:[0,0],result:0})
  
  function bestChoice(pattern,color){
    if(openings.has(pattern.toString() + color)){
      return openings.get(pattern.toString() + color);
    }
    
    let point = willWin(pattern,color);
    
    if(point){
      return {
        point: point,
        result:1
      }
    }
    
    let result = -1;
    
    for(let i = 0;i<3;i++){
      for(let j = 0;j<3;j++){
        if(pattern[i][j] !== 0)
          continue;
        let tmp = clone(pattern)
        tmp[i][j] = color;
        let opp = bestChoice(tmp,3 - color)
        if( - opp.result >= result){
          point = [j,i];
          result = - opp.result;
        }
      }
    }    
    return {
      point:point,
      result: point ? result: 0
    }
  }
  
  function computerMove(){
    let choice = bestChoice(pattern,color)
    if(choice.point){
        console.log('point',choice)
      pattern[choice.point[1]][choice.point[0]] = color; 
    }
    if(check(pattern,color)){
      alert(color == 2 ? 'X is winner': 'O is winner')
    }
    color = 3 - color
    show()
  }
  
  show()