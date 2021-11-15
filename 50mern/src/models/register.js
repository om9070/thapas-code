const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    Email: {
        type: String,
        required: true,
        unique: true
    },

    phone: {
        type: Number,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    confirmpassword: {
        type: String,
        required: true
    },

    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

/***call to token in app.js***/
employeeSchema.methods.generateAuthToken = async function() {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, process.env.secret_key);
        this.tokens = this.tokens.concat({ token, token })
        console.log("this is regst");
        await this.save();
        return token;
    } catch (e) {
        console.log("this is erroro part ", e);
        res.send("the error part" + e);
    }
}


/***--its provided hashing use by bcrypt--***/
employeeSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        // console.log(`the current passwoud ${this.password}`);
        this.password = await bcrypt.hash(this.password, 10);
        // console.log(`the current passwoud ${this.password}`);

        this.confirmpassword = await bcrypt.hash(this.password, 10);
    }
    next();
});




const Register = new mongoose.model("Register", employeeSchema);

module.exports = Register;