const crypto = require("crypto");
const start = Date.now();
crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log(`1: ${Date.now() - start}`);
});
crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log(`2: ${Date.now() - start}`);
});
// here for the first time if we comment oun the second function we'll get like 641-700 ms.
// but if we run the second function with first function it'll take around (641-700ms)*2 right?
// but in reality it'll run both functions at the same time. and it'll take around 641-700ms.
// from here we can say node isn't single threaded
