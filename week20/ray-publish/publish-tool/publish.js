const http = require('http')
const archiver = require('archiver')
const child_process = require('child_process')

let packageName = './package'

const redirect_uri = encodeURIComponent('http://localhost:8081/auth')
const url = `https://github.com/login/oauth/authorize?client_id=Iv1.ab67a7893d5befda&redirect_uri=${redirect_uri}`

child_process.exec(`open ${url}`)

const server = http.createServer((request, res) => {
  if (request.url.match(/^\/favicon.ico/)) {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('Not Found')
    return
  }

  let token = request.url.match(/token=([^&]+)/)[1]
  console.log('token ' + token)

  const options = {
    host: 'localhost',
    port: 8081,
    path: '/?filename=package.zip',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  }

  const archive = archiver('zip', {
    zlib: { level: 9 },
  })

  archive.directory(packageName, false)
  archive.finalize()

  const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`)
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`)
  })

  archive.pipe(req)

  archive.on('end', () => {
    req.end()
    console.log('publish success!!!')
    req.end('publish success!!!')
    server.close()
  })

  req.on('error', e => {
    console.error(e.message)
  })
})

server.listen(8080)
