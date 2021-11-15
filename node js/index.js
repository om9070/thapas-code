//REPL
//1:js expression 2:use variables 3:use(_) to get the last result 4:multiline code 5:we can use editor mode

const fs = require("fs");
//for create file
// fs.mkdirSync("node js");

//create a new file
// fs.writeFileSync('read.txt', "welcome to my channel");

//overlap previos data
// fs.writeFileSync('read.txt', "op pro,welcome to my channel");

//append data in read.txt
// fs.appendFileSync('read.txt', "how are you,i am fine and you?");


//read data
// const buf_data = fs.readFileSync('read.txt');
// console.log(buf_data);

// org_data = buf_data.toString();
// console.log(org_data);


// to rename the file
// fs.renameSync('read.txt', 'readwrite.txt');

//remove txt file
//fs.unlinkSync("node js/readwite.txt");

//remove file node js
// fs.rmdirSync("node js");



//--async function--

//you can create new folder
// fs.mkdir("node.js",(err)=>{
// console.log("folder created");
// })

//create txt 
// fs.writeFile("asyncread.txt", "today is awosome due to loss job", (err) => {
//     console.log("file is create");
//     console.log(err);

// })

//append text in txt.file
// fs.appendFile("asyncread.txt", "its is async chrones function use in asyncread.txt", (err) => {
//     console.log("it is ok");
// });


//read from asyncread.txt
// fs.readFile("asyncread.txt", "UTF-8", (err, data) => {
//     console.log(data);
// })

//you can overwrite asyncread.txt
// fs.rename("asyncread.txt","myasyncread.txt",(err)=>{
//     console.log("txt is changed");
// })


//you can delete asyncread.txt
// fs.unlink("asyncread.txt",(err)=>{
//     console.log("delete succues")
// })


//you can delete file
// fs.rmdir("node js", (err) => {
//     console.log("file is delete")
// })


//---json format---
const bio = {
    name: "om prakash",
    classes: 15,
    roll: 14,
    village: "samhuta"
}

// const json = JSON.stringify(bio);
// fs.writeFile("json1.json", json, (err) => {
//     console.log("sone")
// })


fs.readFile("json1.json", "utf-8", (err, data) => {

    const org = JSON.parse(data);
    console.log(data);
    console.log(org);

})