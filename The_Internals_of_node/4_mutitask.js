const https = require("https");
const crypto = require("crypto");
const fs = require("fs");

const start = Date.now();
function doRequest() {
  https
    .request("https://google.com", (res) => {
      res.on("data", () => {});
      res.on("end", () => {
        console.log(Date.now() - start);
      });
    })
    .end();
}

function doHash() {
  crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
    console.log("Hash: ", Date.now() - start);
  });
}

doRequest();

fs.readFile(__dirname + "\\4_mutitask.js", "utf8", (err, data) => {
  console.log("FS: ", Date.now() - start);
});

doHash();
doHash();
doHash();
doHash();
doHash();
doHash();
doHash();
doHash();