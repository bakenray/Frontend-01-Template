function match(element,selector){
    if(!selector || !element.attributes){
        return false;
    }
    let idSelectors = selector.match(/#\w+/g);
    let classSelectors = selector.match(/(\.\w+)+/g);

    if(idSelectors && idSelectors[0] && idSelectors[0].charAt(0) == '#'){
        let attr = element.attributes.filter(attr => attr.name ==='id')[0];
        if(attr && attr.value === selector.replace('#','')){
            return true;
        }
        else{
            return false;
        }   
    }
    else if(selector.charAt(0) !== '#' && selector.charAt(0) !== '.'){
        if(element.tagName === selector){
            return true
        }
        else {
            return false
        }
    }

    if (classSelectors){
        let classArr = [];
        for(let i =0;i<classSelectors.length;i++){
            let tempArr = classSelectors[i].split('.')
            for(let j=1;j<tempArr.length;j++){
                classArr.push(tempArr[j])
            }
        }

        let classAttr = element.attributes.filter(attr => attr.name ==='class')
        let classResult = []
        if(classAttr && classAttr.length>1){
            classResult = classAttr[0]['value'].split(' ')
        }
        let tempFlag = null
        for(let i =0;i<classArr.length;i++){
            tempFlag = false;
            let k = 0
            for(; k<classResult.length;k++){
                if(classResult[k] === classArr[i]){
                    tempFlag = true
                    break
                }
            }
            if(!tempFlag && k === classResult.length){
                return false;
            }
        }
    }
    return true
}