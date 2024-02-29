const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/jaysonrk")
    .then(() => {
        console.log("Connected to MongoDB");
    }).catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

// Schema
const rackSchema = new mongoose.Schema({
    name: String,
    ctype: String,
    videos: Number,
    author: String,
    active: Boolean,
    date: {
        type: Date,
        default: Date.now
    }
});

// Modal
const Stack = mongoose.model("Stack", rackSchema);

// To read collection
const getDocument = async () => {
   try {
    // const result = await Stack.find();

    // // filter query
    // const result = await Stack.find({ctype:"frontend"});

    // // filter query using Comparison Operators
    //     const result = await Stack.find({videos:{$gt : 50}});

    // // filter query using Logical Operators
    // const result = await Stack.find({$or: [{ videos: { $lt: 20 } },{ videos: 40 }]});

    // // query to count documents
    // const result = await Stack.find({$or: [{ videos: { $lt: 20 } },{ videos: 40 }]}).countDocuments();

    // query to sort documents
        const result = await Stack.find({videos:{$gt : 10}}).sort("name:1");

       console.log("Documents:", result);
   } catch (error) {
       console.error("Error fetching documents:", error);
   }
};

getDocument();
