const express = require("express");
const app = express();
const path = require("path");
const port = 8000;

const templete = path.join(__dirname, "/templet");

app.set("view engine", "hbs");
app.set("views", templete);

app.use(express.static(templete));

app.get("", (req, res) => {
    res.render("index");
})

app.listen(8000, () => {
    console.log(`this is going on port ${port}`);
})