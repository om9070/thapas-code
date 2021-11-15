const express = require("express");
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    // res.send("<h1>welcome to my home page</h1>");
    res.write("<h1>welcome to my home page</h1>");
    res.write("<h1>welcome to my another line page</h1>");
    res.send();

});

app.get('/about', (req, res) => {
    res.send("welcome to my about page");
});

// app.get('/contact', (req, res) => {
//     res.send([{
//             id: 1,
//             name: "pro version",
//         },
//         {
//             id: 1,
//             name: "pro version",
//         },
//         {
//             id: 1,
//             name: "pro version",
//         },
//     ]);
// })


app.get('/contact', (req, res) => {
    res.json([{
            id: 1,
            name: "pro version",
        },
        {
            id: 1,
            name: "pro version",
        },
        {
            id: 1,
            name: "pro version",
        },
    ]);
})

// the mathode are  indentical when  an object or array is pused,
// but res.json()will also convert non object
// such as null and undefined which are not valid deta
app.listen(port, () => {
    console.log(`listening to the  port  in ${port}`)
});