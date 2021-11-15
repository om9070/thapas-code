const express = require("express");
const app = express();
require("./db/conn");
const Student = require("./models/student");
const studentrouter = require("./router/stud");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(studentrouter);

//its use for only cheak this that site
// app.get("", (req, res) => {
//     res.send("this is rest fully website00 this right way ");
// })


//create new student promise function for post request

// app.post("/student", (req, res) => {
//     const user = new Student(req.body);
//     user.save().then(() => {
//         res.status(201).send(user);
//     }).catch((e) => {
//         res.status(400).send(e);
//     })
//     console.log(req.body);
//     // res.send("hello from the other sides");
// })



/***---this is app.(post,get,delete,patch) frist way-----***/




// create async function for post request


app.post("/student", async(req, res) => {
    try {
        const user = new Student(req.body);
        const createusr = await user.save();
        res.status(201).send(createusr);
    } catch (e) {
        res.status(400).send(e);
    }
})



// //get request create under this line
// app.get("/student", async(req, res) => {
//     try {
//         const studentdata = await Student.find();
//         res.status(201).send(studentdata);
//     } catch (e) {
//         res.status(400).send(e);
//     }
// })


// //get request indivisual student data using by id
// app.get("/student/:id", async(req, res) => {
//     try {
//         const _id = req.params.id;
//         const singledata = await Student.findById(_id);
//         res.send(singledata);
//     } catch (e) {
//         res.send(e);
//     }
// })

// //update the student by id patch request
// app.patch("/student/:id", async(req, res) => {
//     try {
//         const _id = req.params.id;
//         const updatestudent = await Student.findByIdAndUpdate(_id, req.body, {
//             new: true
//         });
//         res.status(201).send(updatestudent);
//     } catch (e) {
//         res.status(404).send(e);

//     }
// })

// //detele request 
// app.delete("/student/:id", async(req, res) => {
//     try {
//         const _id = req.params.id;
//         const deletedata = await Student.findByIdAndDelete(_id);
//         if (!req.params.id) {
//             return res.status(400).send();
//         }
//         res.send(deletedata);
//     } catch (e) {
//         res.status(500).send(e);
//     }
// })
app.listen(port, () => {
    console.log(`connection is setup ${port}`)
})