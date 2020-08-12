import {parseHTML} from '../src/parser.js'
let assert = require('assert')

  it('parse a single element',()=>{
    let doc = parseHTML("<div></div>")
    let div = doc.children[0]
    assert.equal(div.tagName,'div')
    assert.equal(div.children.length,0)
    assert.equal(div.type,"element")
    assert.equal(div.attributes.length,2)
  })
  it('parse a single element with text content',()=>{
    let doc = parseHTML("<div>mocha</div>")
    let text = doc.children[0].children[0]
    assert.equal(text.content,'mocha')
    assert.equal(text.type,'text')
  })
  it('tag mismatch',()=>{
    try{
      let doc = parseHTML("<div></idv>")
    }
    catch(e){
      assert.equal(e.message,"Tag start end doesn't match!")
    }                         
  })

  it('text with <',()=>{   
    let doc = parseHTML("<div>a < b</idv>")
    let text = doc.children[0].children[0]
    console.log('----------text--------',text)
    assert.equal(text.content,'a < b')
    assert.equal(text.type,'text')

  })
