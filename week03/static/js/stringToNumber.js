function converStringToNumber(string,radix=10){
    var chars = string.split('')
    var number = 0
    var i = 0
    var reg = /[a-vA-V]/
    // 整数
    while (i<chars.length && chars[i] != '.'){
        number = number * radix
        //2-10进制
        if(radix <= 10){
            //超出进制范围，返回NaN
            if(chars[i] > radix-1 || reg.test(chars[i])){
                return number = NaN
            } 
            number += chars[i].codePointAt(0) - '0'.codePointAt(0)				  
        }
        //11-16进制
        else if(10 < radix && radix<= 32){	
            		
            let char = chars[i].toLowerCase()
            let pointNum = char.codePointAt(0) -87 

            if(reg.test(char) && (pointNum< radix)){
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
    var fraction = 1
    while(i < chars.length){
        fraction = fraction/radix
        number += (chars[i].codePointAt(0) - '0'.codePointAt(0))*fraction
        i++
    }
    return number
}	