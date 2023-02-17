const cluster = require('cluster');
const express = require('express');
const app = express();

if(cluster.isMaster) {
  // Cause index.js to be executed again but in child mode
  cluster.fork()
}else{
  // child process
  function doWork(duration){
    const staet = Date.now();
    while(Date.now() - staet < duration){}
  }
  
  app.get('/', (req, res) => {
    doWork(5000);
    res.send('Hi there');
  })

  app.listen(3000);
}
