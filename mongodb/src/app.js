const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://localhost:27017/prakashxp", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log("connection successfully")).catch((e) => console.log(e));

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        // unique: true,//its unique value
        lowercase: true,
        unique: true,
        // uppercase: true,
        trim: true, //its use for space trim
        minlength: 2,
        maxlength: 15,
    },
    ctype: {
        type: String,
        lowercase: true,
        unique: true,
        enum: ["back end", "front end", "mongodb"]
    },
    video: {
        type: Number,
        validate(value) {
            if (value < 0) {
                throw new Error("video count should not be nagative")
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("email is invalid");
            }
        }
    },
    active: Boolean,
})
const Playlist = new mongoose.model("Playlist", playlistSchema);

/***insert data into mongodb **/
const createDocument = async() => {
        try {

            //         const jsPlaylist = new Playlist({
            //             name: "js express",
            //             ctype: "backend end",
            //             active: true,
            //         })

            //         const mongoPlaylist = new Playlist({
            //             name: "mongodb",
            //             ctype: "database",
            //             active: true,
            //         })

            //         const mongoosePlaylist = new Playlist({
            //             name: "mongoose js",
            //             ctype: "detabase",
            //             active: true,
            //         })


            const expressPlaylist = new Playlist({
                name: "mongo js db",
                ctype: "back end",
                email: "opgupta@gmail.g",
                video: 505,
                active: true,
            })


            // const result = reactPlaylist.save();//its use for single database
            // const result = await Playlist.insertMany([jsPlaylist, mongoPlaylist, mongoosePlaylist, expressPlaylist]);

            const result = await Playlist.insertMany([expressPlaylist]);
            console.log(result);
        } catch (er) {
            console.log(er);
        }
    }
    // createDocument();


/**find data way to the  mongodb****/
const getdocument = async() => {
        try {
            // const result = await Playlist.find({ ctype: "back end" })
            // .select({ name: 1 }).limit(2);///***get find data from the mongodb**/


            /**its filter methode***/
            /**$gt=greater than**/
            /***$gte=greater than and equail to***/
            /**$lt=less than**/
            /**$lte=less than and equile **/


            /**$in=filter any value**/
            /**$nin=no filter any value**/

            // const result = await Playlist.find({ video: { $lte: 60 } })
            // const result = await Playlist.find({ ctype: { $nin: ["back end", "detabase"] } })://its use for $in and $nin an $nin


            /**$or**/
            /**$and**/
            // const results = await Playlist.find({ $or: [{ ctype: "back end" }, { name: "express js" }] });


            /***.sort("name: 1")=sort a-z**/
            /***.sort({name: -1})=sort z-a**/

            const results = await Playlist.find({ ctype: "back end" })
                .select({ name: 1 })
                .sort({ name: -1 });
            // .count();
            // .countDocuments();

            console.log(results);
        } catch (error) {
            console.log(error);
        }
    }
    // getdocument();

/**update data fron the mongodb***/
// updateOne=update data//
/**findByIdAndUpdate=show update data**/
const updateDocument = async(_id) => {
    try {
        const result = await Playlist.findByIdAndUpdate({ _id }, {
            $set: {
                name: "Mongodb"
            }
        }, {
            new: true,
            useFindAndModify: false
        });
        console.log(result);
    } catch (erro) {
        console.log(erro);
    }


}

// updateDocument("6039148641a9250fc028549f");


/**delete the document**/
/**deleteOne =delete data**/
/***findByIdAndUpdate=show delete data**/
const deletedocument = async(_id) => {
        try {
            const result = await Playlist.findByIdAndDelete({ _id });
            console.log(result);
        } catch (eroor) {
            console.log(eroor);
        }
    }
    // deletedocument("603a52b65909512d9c67fc96");