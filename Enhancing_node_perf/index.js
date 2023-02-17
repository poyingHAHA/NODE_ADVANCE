const cluster = require('cluster');
const crypto = require('crypto');
const express = require('express');
const app = express();

// Round robin process scheduling is disabled in windows
// enable it by writing " cluster.schedulingPolicy = cluster.SCHED_RR "
cluster.schedulingPolicy = cluster.SCHED_RR
if(cluster.isMaster) {
  // Cause index.js to be executed again but in child mode
  cluster.fork()
  cluster.fork()
  cluster.fork()
  cluster.fork()
}else{ // child process
  
  app.get('/', (req, res) => {
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', ()=> {
      res.send('Hi there');
    })
  })

  app.get('/fast', (req, res) => {
    res.send("This is fast");
  })

  app.listen(3000);
}
