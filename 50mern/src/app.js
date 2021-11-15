require('dotenv').config();
const { static } = require("express");
const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const path = require("path");
const hbs = require("hbs");
require("./db/conn");
const auth = require("./middleware/auth");
const Register = require("./models/register");
const cookieparser = require("cookie-parser");
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000;

// console.log(path.join(__dirname, "../public"));
const statix = (path.join(__dirname, "../public"));
const templatepath = (path.join(__dirname, "../templates/views"));
const partialspath = (path.join(__dirname, "../templates/partials"));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(statix));
app.set("view engine", "hbs");
app.set("views", templatepath);
hbs.registerPartials(partialspath);

// console.log(process.env.secret_key);


// app.get("/", (req, res) => {
//     res.render("index");
// })

app.get("/", (req, res) => {
    res.render("restration");
})

app.get("/secure", auth, (req, res) => {
    // console.log(`this is cokie awesome${req.cookies.jwt}`);
    res.render("secure");
})


app.get("/logout", auth, async(req, res) => {
    try {
        // req.user.tokens = req.user.tokens.filter((currenttoken) => {
        //     return currenttoken.token != req.token
        // })

        //remove all data
        req.user.tokens = [];

        res.clearCookie("jwt");
        console.log("log out");
        await req.user.save();
        res.render("login");
    } catch (e) {
        res.status(500).send(e);
    }
})

app.get("/restration", (req, res) => {
    res.render("restration");
})


app.get("/login", (req, res) => {
    res.render("login");
})



/***-its use for registration--**/
app.post("/restration", async(req, res) => {
    try {
        const password = req.body.password;
        const confirmpassword = req.body.confirmpassword;
        if (password === confirmpassword) {
            const employeedata = new Register({
                name: req.body.name,
                Email: req.body.Email,
                phone: req.body.phone,
                password: req.body.password,
                confirmpassword: req.body.confirmpassword,
            })

            /***---genrate token --------***/
            const token = await employeedata.generateAuthToken();
            console.log("the token part" + token);

            //the res.cookie() function is use to set the cookie name tto value
            // the value parameter may be a string or object convert to json
            //res.cookies(name,value,[option])

            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 30000),
                httpOnly: true
            });

            const rest = await employeedata.save();
            console.log("the token part" + rest);

            res.status(201).render("index");
        } else {
            res.send("password is not matcing")
        }
    } catch (e) {
        res.status(400).send(e);
        console.log("this is inviduals");
    }
})





/**-----its create log in form ***/
app.post("/login", async(req, res) => {
    try {
        const Email = req.body.Email;
        const password = req.body.password;
        const useremail = await Register.findOne({ Email: Email });
        /*----------security -**/
        const ismatch = await bcrypt.compare(password, useremail.password);

        const token = await useremail.generateAuthToken();
        console.log("the token part" + token);

        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 50000),
            httpOnly: true
                // secure:true
        });



        // if (useremail.password === password) {//without security
        if (ismatch) {
            res.status(201).render("index");
        } else {
            res.send("invalue details");
        }

    } catch (e) {
        res.status(400).send("invalid login details");
    }
})


/**_-----secutriy***/
// const bcrypt = require("bcryptjs");
// const securePassword = async(password) => {
//     const passwordhars = await bcrypt.hash(password, 10);
//     console.log(passwordhars);

//     const passwordcompare = await bcrypt.compare("oppro@123", passwordhars);
//     console.log(passwordcompare);

// }

// securePassword("oppro@123")




/***--its work jsonwebtoken---**/
// const jwt = require("jsonwebtoken");
// const createtoken = async() => {
//     const token = await jwt.sign({ _id: "6040896163a4ad1e3081e474" }, "itsinputanythinkdlikenumberandcharacterunder32", {
//         expiresIn: "5 seconds"
//     })
//     console.log(token);


//     const userver = await jwt.verify(token, "itsinputanythinkdlikenumberandcharacterunder32");
//     console.log(userver);

// }
// createtoken();



app.listen(port, () => {
    console.log(`succesfully port on ${port}`);
})