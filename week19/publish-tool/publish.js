const http = require('http')
const qs = require('querystring')
const fs = require('fs')
const archiver = require('archiver')

const postData = qs.stringify({
  'content':'Hello Node.js!'
})

let packname = './package'

// fs.stat('./'+filename,(err,stat)=>{
// const req = http.request(options,(res)=>{})
  const options = { 
    host:'localhost',
    port:8081,
    path:'/?filename=' + 'package.zip',
    method:'POST',
    headers:{
      'Content-Type':'application/octet-stream'
    }
  }

  const req = http.request(options,(res)=>{
    
  })
  req.on('error',(e)=>{
    console.log('problem width request',e.message)
  })

  var archive = archiver('zip',{
    zlib:{level:9}
  })

  archive.directory(packname,false)
  archive.pipe(req)
  archive.finalize()
  archive.on('end',()=>{
    req.end()
  })



  // const req = http.request(options,(res)=>{})
  // req.on('error',(e)=>{
  //   console.log('problem width request',e.message)
  // })
  // let readStream = fs.createReadStream('./'+filename)

  // readStream.pipe(req)
  
  // readStream.on('end',()=>{
  //   req.end()
  // })

// })
 





