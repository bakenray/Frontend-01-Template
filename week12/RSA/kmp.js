// 经典
function find(source,pattern){
    for(let i =0;i<source.length;i++){
        let matched = true;
        for(let j = 0;j<pattern.length;j++){
            if(source[i+j] !== pattern[j]){
                matched = false;
                break;
            }
        }
        if(matched){
            return true;
        }
    }
    return false
}

// 高效，但是需要处理特殊case
function find(source,pattern){
    let table  =  new Array(pattern.length).fill(0)
    let k= 0;
    for(let j = 0;j<pattern.length;j++){
        if(pattern[j] === pattern[k]){
            k ++;
        }
        else{
            k = 0
        }
        table[j] = k;
    }

    let j = 0;
    for(let i =0;i<source.length;i++){
        if(source[i] === pattern[j]){
            j++
        }
        else{
            while(source[i] !== pattern[j] && j>0){
                j = table[j - 1]
            }
            if(source[i] === pattern[j]){
                j++;
            }else{
                j = 0;
            }
        }
        if(j === pattern.length){
            return true;
        }
    }
    return false;
}
