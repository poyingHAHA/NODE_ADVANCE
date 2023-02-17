const https = require('https');
const start = Date.now();

// make use of code that is built into the underlying operating system through libuv.
// So it's actually our operating system that does the real HTTP request. 
// Libuv is used to issue the request and then it just waits on the 
// operating system to emit a signal that some response has come back to the request.
function doRequest(){
  https.request('https://google.com', res => {
    res.on('data', () => {});
    res.on('end', () => {
      console.log(Date.now() - start);
    })
  }).end();
}

doRequest()
doRequest()
doRequest()
doRequest()
doRequest()