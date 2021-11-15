const jwt = require("jsonwebtoken");
const Register = require("../models/register");


const auth = async(req, res, next) => {
    try {
        const token = req.cookies.jwt;
        const verifyuser = jwt.verify(token, process.env.secret_key);
        console.log(verifyuser);

        const user = await Register.findOne({ _id: verifyuser._id });
        console.log(user);

        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send(e);
    }
}

module.exports = auth;