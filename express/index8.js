const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const port = 8000;

const template1 = path.join(__dirname, "/template1");
const template2 = path.join(__dirname, "/template2");

app.set("view engine", "hbs");
app.set("views", template1);
hbs.registerPartials(template2);

app.get("/", (req, res) => {
    res.render("index");
})
app.get("/about", (req, res) => {
    res.render("about");
})

app.get("*", (req, res) => {
    res.render("404", {
        errorcoment: "opps this page is note found",
    });
})
app.listen(8000, () => {
    console.log(`the server port on ${port}`);
})