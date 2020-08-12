import {parseHTML} from '../src/parser.js'
let assert = require('assert')

  it('parse a single element',function(){
    let doc = parseHTML("<div></div>")
    let div = doc.children[0]
    assert.equal(div.tagName,'div')
    assert.equal(div.children.length,0)
    assert.equal(div.type,"element")
    assert.equal(div.attributes.length,2)
  })

  it('parse a single element with text content',function(){
    let doc = parseHTML("<div>mocha</div>")
    let text = doc.children[0].children[0]
    assert.equal(text.content,'mocha')
    assert.equal(text.type,'text')
  
  })
