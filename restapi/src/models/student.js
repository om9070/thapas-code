const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('invalid email id');
            }
        }
    },
    phone: {
        type: Number,
        min: 10,
        required: true,
        unique: true
    },

});

// we will create a new model collection

const Student = new mongoose.model("Student", studentSchema);

module.exports = Student;