const http = require('http')
const qs = require('querystring')
const fs = require('fs')

const postData = qs.stringify({
  'content':'Hello Node.js!'
})

let filename = 'bg.jpg'

fs.stat('./'+filename,(err,stat)=>{

  const options = { 
    host:'localhost',
    port:8081,
    path:'/?filename=' + filename,
    method:'POST',
    headers:{
      'Content-Type':'application/octet-stream',
      'Content-Length':stat.size
    }
  }

  const req = http.request(options,(res)=>{})

  req.on('error',(e)=>{
    console.log('problem width request',e.message)
  })
  let readStream = fs.createReadStream('./'+filename)
  readStream.pipe(req)

  readStream.on('end',()=>{
    req.end()
  })

})
 





