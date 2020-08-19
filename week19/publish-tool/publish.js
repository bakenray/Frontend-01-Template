const http = require('http')
const qs = require('querystring')

const postData = qs.stringify({
  'content':'Hello Node.js!'
})

const options = { 
  host:'localhost',
  port:8081,
  path:'/?filename=x.html',
  method:'POST',
  headers:{
    'Content-Type':'application/x-www-form-urlencoded',
    'Content-Length':Buffer.byteLength(postData)
  }
}

const req = http.request(options,(res)=>{
  console.log(res)

})
req.on('error',(e)=>{
  console.log('problem width request',e.message)
})

req.write(postData)
req.end()