const http = require('http');
const server = http.createServer((req,res)=>{
    console.log('request received')
    console.log(req.headers)
    res.setHeader('Content-Type','text/html')
    res.setHeader('X-Foo','bar')
    res.writeHead(200,{'Context-Type':'text/plain'})
    res.end(
    `	
    <html maaa=a >
    <head>
        <style>
            .main{
                width:800px;
                height:600px;
                display:flex;
            }
            body{
                background:#ccc;
            }
            .left{
                width:300px;
            }
            .right{
                width:500px;
            }
            .red{   
                height:200px;   
                background:red;
            }
            .green{
                height:500px;  
                background:green
            }
            .white{
                height:300px;   
                background:white
            }
        </style>
    </head>
    <body>
        <div class="main">  
            <div class="left">
                <div class="red"></div>
                <div class="white"></div> 
            </div>
            <div class="right">
                <div class="green"></div>
            </div>    
        </div>
    </body>
    </html>`
)
})
server.listen(8088,()=>{
    console.log('listening at http://localhost:8088')
})