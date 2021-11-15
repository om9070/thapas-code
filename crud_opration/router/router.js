const express = require("express");
const router = express.Router();
const userdata = require("../model/user");
const multer = require("multer");
const fs = require("fs");
const user = require("../model/user");


//image upload
var storage = multer.diskStorage({
    destination: function(req, file, cd) {
        cd(null, "./uploads")
    },
    filename: function(req, file, cd) {
        cd(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({
    storage: storage,
}).single('image');




router.post("/add", upload, async(req, res) => {
    try {
        const user = new userdata({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            image: req.file.filename,
        });
        const data = await user.save();
        res.redirect("/");
    } catch (e) {
        res.status(400).send(e);
        console.log("this is inviduals");
    }
})


router.get("/", async(req, res) => {
    try {
        const usersnode = await userdata.find();
        res.render("index", { usersnode: usersnode });

    } catch (e) {
        res.status(400).send("somefolt", e);
    }

})

router.get("/add", (req, res) => {
    res.render("add")
})



router.get("/edit/:id", async(req, res) => {
    try {
        const id = req.params.id;
        const usersnode = await userdata.findById(id);
        res.render("edit", { usersnode: usersnode });

    } catch (e) {
        res.send(e);
    }
})





router.post("/update/:id", upload, async(req, res) => {
    try {
        const id = req.params.id;
        let new_image = " ";
        if (req.file) {
            new_image = req.file.filename;
            try {
                fs.unlinkSync('./uploads/' + req.body.old_image);
            } catch (err) {
                console.log(err);
            }
        } else {
            new_image = req.body.old_image;
        }
        const updatestudent = await userdata.findByIdAndUpdate(id, {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            image: new_image,
        });
        res.redirect("/");
    } catch (e) {
        res.status(404).send(e);

    }
})




router.get("/delete/:id", async(req, res) => {
    try {
        const id = req.params.id;
        const deletedata = await userdata.findByIdAndRemove(id);
        if (deletedata.image != ' ') {
            try {
                fs.unlinkSync("./uploads/" + deletedata.image);
            } catch (err) {
                console.log(err);
            }
        }
        res.redirect("/");
    } catch (e) {
        res.status(500).send(e);
    }
})

module.exports = router;