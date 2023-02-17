const cluster = require('cluster');
const express = require('express');
const app = express();

// Round robin process scheduling is disabled in windows
// enable it by writing " cluster.schedulingPolicy = cluster.SCHED_RR "
cluster.schedulingPolicy = cluster.SCHED_RR
if(cluster.isMaster) {
  // Cause index.js to be executed again but in child mode
  cluster.fork()
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

  app.get('/fast', (req, res) => {
    res.send("This is fast");
  })

  app.listen(3000);
}
