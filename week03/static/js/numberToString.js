function convernumberToString(num, radix = 10) {
    if(Number.isNaN(num) || radix > 32 ) {
        return 'NaN'
    }   
    let absNum = Math.abs(num)
    let sign = ''
    let integer = Math.floor(absNum);
    let fraction = String(absNum).match(/\.\d+$/);
    let string = '';
    let result = ''
    
    if(fraction) {  
       fraction = Number(fraction[0]).toString(radix).replace(/^0/,'');
    }
    if(num < 0) {
        sign = '-'
    }
    if(absNum === Infinity) {
        return `${sign}Infinity`
    }
    while (integer > 0) {
        let value = ''
        if(radix <= 32 && radix >=10 && (integer % radix>=10)){
            value = String.fromCodePoint((integer % radix) + ('a'.codePointAt() -  10) )
        }else{
            value =  integer % radix
        }
        string = String(value) + string;
        integer = Math.floor(integer / radix);
    }
    result = fraction ? `${string}${fraction}` : string
    result = `${sign}${result}`  
    return result;
}