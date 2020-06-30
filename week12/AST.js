// var regexp = /([0-9\.]+)|([ ]+)|([\r\n]+)|(\+)|(\-)|(\*)(\/)/g

// var dictionary = ['Number','Whitespace','LineTerminator','+','-','*','/']

// function* tokenize(source){
//     var result = null;
//     var lastIndex = 0;

//     while(true) {
//         lastIndex = regexp.lastIndex
//         result = regexp.exec(source)
//         console.log('result',result)
//         if(!result) break;

//         // if(regexp.lastIndex - lastIndex > result[0].length)
//         //     throw new Error('Unexpected token \'' + source.slice(lastIndex,regexp.lastIndex - result[0].length) + '\'')

//         let token = {
//             type:null,
//             value:null
//         }

//         for(var i = 0; i < dictionary.length; i++){
//             if(result[i]){
//                 token.type = (dictionary[i])
//             }           
//         }
//         token.value = (result[0]) 
//         yield  token;
//     }
// }

// // function Expression(tokens){
    
// // }
// // function AdditiveExpression(source){
    
// // }
// // function MultiplicativeExpression(source){
// //     console.log(source)
// // }
// // let source = []

// for(let token of tokenize("1024 + 10 * 25")){
//     console.log(token)
//     // if(token.type!== 'Whitespace' && token.type !== 'LineTerminator')
//     // source.push(token)
// }
// // MultiplicativeExpression(source)
