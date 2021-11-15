require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const hbs = require("hbs");

const PORT = process.env.PORT || 8000;
const app = express();


mongoose.connect(process.env.DB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("connect database");
}).catch((e) => {
    console.log("someting worg", e);
})


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
    secret: "my secret key",
    saveUninitialized: true,
    resave: false,
}))

app.use((req, res, next) => {
    res.locals.message;
    delete req.session.message;
    next();
})


app.set("view engine", "ejs");

app.use("", require("./router/router"));

app.use(express.static('uploads'));

app.listen(PORT, () => {
    console.log(`port is listing ${PORT}`);
})