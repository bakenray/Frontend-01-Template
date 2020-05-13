const http = require('http')
const server = http.createServer((req,res)=>{
    console.log('request received: \r\n',req.headers);
    res.setHeader('Content-Type', 'text/html')
    res.setHeader('X-Foo', 'bar');
    res.writeHead(200,{'Context-Type': 'text/plain'});
    res.end('ok');
});
server.listen(8088,()=>{
  console.log('在8088端口监听')
});