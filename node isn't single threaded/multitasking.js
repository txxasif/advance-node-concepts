const https = require("https");
const crypto = require("crypto");
const fs = require("fs");
const start = Date.now();

function doRequest() {
  https
    .request("https://google.com", (res) => {
      res.on("data", () => {});
      res.on("end", () => {
        console.log(`Response: ${Date.now() - start}`);
      });
    })
    .end();
}
doHash();
doRequest();
fs.readFile("multitasking.js", "utf8", () => {
  console.log(`FS: ${Date.now() - start}`);
});
function doHash() {
  crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
    console.log(`Hash: ${Date.now() - start}`);
  });
}

doHash();
doHash();
doHash();
doHash();
doHash();

// here is the output i've got
{
  /* 
    FS: 38
Response: 643
Hash: 717
Hash: 718
Hash: 734
Hash: 753
Hash: 1273
Hash: 1288

    */
}
// although i've initialized doHash and the doRequest at first but FS executes first because of the event loop of node.js
