const express = require("express");
const router = new express.Router();
const Student = require("../models/student");


/**----this is second way to router.(get,post,delete,patch)----***/
router.post("/student", async(req, res) => {
    try {
        const user = new Student(req.body);
        const createusr = await user.save();
        res.status(201).send(createusr);
    } catch (e) {
        res.status(400).send(e);
    }
})



//get request create under this line
router.get("/student", async(req, res) => {
    try {
        const studentdata = await Student.find();
        res.status(201).send(studentdata);
    } catch (e) {
        res.status(400).send(e);
    }
})


//get request indivisual student data using by id
router.get("/student/:id", async(req, res) => {
    try {
        const _id = req.params.id;
        const singledata = await Student.findById(_id);
        res.send(singledata);
    } catch (e) {
        res.send(e);
    }
})

//update the student by id patch request
router.patch("/student/:id", async(req, res) => {
    try {
        const _id = req.params.id;
        const updatestudent = await Student.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        res.status(201).send(updatestudent);
    } catch (e) {
        res.status(404).send(e);

    }
})

//detele request 
router.delete("/student/:id", async(req, res) => {
    try {
        const _id = req.params.id;
        const deletedata = await Student.findByIdAndDelete(_id);
        if (!req.params.id) {
            return res.status(400).send();
        }
        res.send(deletedata);
    } catch (e) {
        res.status(500).send(e);
    }
})

module.exports = router;