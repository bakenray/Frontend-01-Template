let mod = require('../src/add.js') 
let assert = require('assert')
describe('add',function (){
  it('add(3,4) shoud be 7',function(){
    assert.equal(mod.add(3,4),7)
  })
})

// let mod = require('../dist/add.js') 
// let test  = require('ava')

// test('foo', t => {
//   if(mod.add(3,4) ===7)
//     t.pass()
// })