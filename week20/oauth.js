
{
  let state = '123abc'
  let client_id = ''
  let client_secret = ''
  let redirect_uri = encodeURIComponent('http://localhost:8000')
  
  // 获取code
  let authURI = `https://github.com/login/oauth/authorize?client_id=Iv1.ab67a7893d5befda&redirect_uri=${encodeURIComponent('http://localhost:8000')}`
  
  // 得到code
  let code = ''
  let params = `code=${code}&state=${state}&client_secret=${client_secret}&client_id=${client_id}&redirect_uri=${redirect_uri}`
  
  let xhr = new XMLHttpRequest
  // 获取token
  xhr.open('POST', `https://github.com/login/oauth/access_token?${params}`, true)
  xhr.send(null)
  
  xhr.addEventListener('readystatechange', function(event) {
    if (xhr.readyState === 4) {
      console.log(xhr.responseText)
    }
  })
}
  
//publish-tool/publish-server
{
  let token = '';
  xhr.open('GET', `https://api.github.com/user`, true);
  xhr.setRequestHeader('Authorization', `token ${token}`)
  xhr.send(null);

  xhr.addEventListener('readystatechange', function(event) {
    if (xhr.readyState === 4) {
      console.log(xhr.responseText);
    }
  })
}