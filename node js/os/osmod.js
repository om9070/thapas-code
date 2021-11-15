const os = require("os");

//cheak your os bit
// console.log(os.arch());


// const freeMemory = os.freemem();
// console.log(freeMenory / 1024 / 1024 / 1024);


// const totalmemory = os.totalmem();
// console.log(`${totalmemory / 1024 / 1024 / 1024}`);

console.log(os.hostname());
console.log(os.platform());
console.log(os.type());