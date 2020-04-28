function converStringToNumber(string,radix=10){
    let chars = ''
    let number = 0
    let i = 0
    let fraction = 1
    let signReg =/^[+-][0-9a-z]+$/i
    let sign = ''
    let allReg = /[a-vA-V]/
    let hexReg =/^0x[0-9a-f]+$/i
    let octReg = /^0o[0-7]+$/i
    let binReg =/^0b[0-1]+$/i
    // 带符号
    if(signReg.test(string)){
        sign = string[0] ==='-' ?'-':''
        string = string.replace(/^[+-]/i,'')
    }
    // 带0x前缀 16进制
    if(hexReg.test(string)){
        radix = 16
        string = string.replace(/^0x/ig,'')    
    }
     // 带0o前缀 8进制
     if(octReg.test(string)){
        radix = 8
        string = string.replace(/^0o/ig,'')
    }
     // 带0b前缀 2进制
     if(binReg.test(string)){
        radix = 2
        string = string.replace(/^0b/ig,'')
    }
    chars = string.split('')
    // 整数
    while (i<chars.length && chars[i] != '.'){
        number = number * radix
        //2-10进制
        if(radix <= 10){
            //超出进制范围，返回NaN
            if(chars[i] > radix-1 || (/[a-z]/i).test(chars[i])){
                return number = NaN
            } 
            number += chars[i].codePointAt(0) - '0'.codePointAt(0)				  
        }
        //11-16进制
        else if(10 < radix && radix<= 32){	
            		
            let char = chars[i].toLowerCase()
            let pointNum = char.codePointAt(0) - 87 

            if(allReg.test(char) && (pointNum< radix)){
                number += pointNum
            }
            else if(/\d/.test(char)) {
                number += chars[i].codePointAt(0) - '0'.codePointAt(0) 
            }
            else {
                return number = NaN
            }
        }
        i++								
    }
    //小数
    if(chars[i] === '.'){ i++ }
    while(i < chars.length){
        fraction = fraction/radix
        number += (chars[i].codePointAt(0) - '0'.codePointAt(0))*fraction
        i++
    }
    if(sign === '-'){
        number = number - number*2
    }
    return number
}	