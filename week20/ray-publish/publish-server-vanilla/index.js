const http = require('http')
const https = require('https')
const fs = require('fs')
const unzip = require('unzipper')

const server = http.createServer((req, res) => {

  if (req.url.match(/^\/auth/)) {
    return auth(req, res)
  }

  if (req.url.match(/^\/favicon.ico/)) {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('Not Found')
    return
  }

  const fileSys = () => {
    let matched = req.url.match(/filename=([^&]+)/)
    let filename = (matched && matched[1])
    if (!filename) {
      return
    }


    let writeStream = unzip.Extract({ path: '../server/public' })
    req.pipe(writeStream)

    req.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.end('okay')
    })
  }

  // OAuth 
  console.log(req.headers);

  const options = {
    hostname: 'api.github.com',
    port: 443,
    path: '/user',
    method: 'GET',
    headers: {
      Authorization: `token ${req.headers.token}`,
      'User-Agent': 'ray-publish',
    },
  };

  const request = https.request(options, (response) => {
    let body = '';
    response.on('data', (d) => {
      if (d) {
        body += d.toString();
      }
    });

    response.on('end', () => {
      console.log(body);
      let user = JSON.parse(body);
      const writeStrem = unzip.Extract({ path: '../server/public' });
      req.pipe(writeStrem);
      req.on('end', () => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('okay');
      });
    });
  });
  request.on('error', (e) => {
    console.error(e);
  });
  request.end();
})

server.listen(8081);

function auth(req, res) {
  let code = req.url.match(/code=([^&]+)/)[1];
  console.log(code);

  let state = '123abc';
  let client_id = '';
  let client_secret = '';
  let redirect_uri = encodeURIComponent('http://localhost:8081/auth');

  let params = `code=${code}&state=${state}&client_secret=${client_secret}&client_id=${client_id}&redirect_uri=${redirect_uri}`;

  const url = `https://github.com/login/oauth/access_token?${params}`

  const options = {
    hostname: 'github.com',
    port: 443,
    path: `/login/oauth/access_token?${params}`,
    method: 'POST',
  }

  const request = https.request(options, (response) => {
    response.on('data', (d) => {
      console.log(d.toString());
      let result = d.toString().match(/access_token([^&]+)/);
      if (result) {
        let token = result[1];
        res.writeHead(200, {
          'access_token': token,
          'Content-Type': 'text/html'
        });
        res.end(`<a href="http://localhost:8080/publish?token${token}">publish</a>`);
      } else {
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });
        res.end('error');
      }
    });
  })

  request.on('error', (e) => {
    console.error(e);
  });
  request.end();
}