const express = require("express");
const app = express();

/*app.get(route,callback)---hit*/
app.get("/", (req, res) => {
    res.send("hello from the express pro version");
});

app.listen(8000, () => {
        console.log("listing the port at 8000");
    })
    /*API
     get-read
     post-create
    put-update
     delete-delete*/