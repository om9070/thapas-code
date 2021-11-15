const { ok } = require("assert");
const EventEmitter = require("events");

const event = new EventEmitter();


// event.on('say myname', () => {
//     console.log("your name is om prakash");
// })

// event.on('say myname', () => {
//     console.log("your name is guddu");
// })


// event.on('say myname', () => {
//     console.log("your name is op pro");
// })

// event.emit('say myname');

event.on('cheak page', (sc, msg) => {
    console.log(`your message is ${msg} and ${sc}`);
})

event.emit('cheak page', 200, "ok");