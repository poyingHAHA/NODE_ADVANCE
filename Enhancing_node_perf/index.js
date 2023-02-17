const cluster = require('cluster');
const express = require('express');
const app = express();

// try to use as much CPU processing power as it possibly can for some set duration.
// And this duration will be some number of milliseconds.
function doWork(duration){
  const staet = Date.now();
  // while we are running this while loop our event loop can do absolutely nothing else.
  // That means it cannot handle other requests 
  // it can't do other like database queries or write files...
  while(Date.now() - staet < duration){}
}

app.get('/', (req, res) => {
  // This code right here is going to be executed inside of our event loop
  // This doesn't get thrown out to an event pool.
  doWork(5000);
  res.send('Hi there');
})

app.listen(3000);