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

// Delete document
const deleteDocument = async (_id) => {
    try {
        // const result = await Stack.deleteOne({ _id});
        const result = await Stack.findByIdAndDelete({ _id});
        console.log(result);
    } catch (error) {
        console.error("Error deleting document:", error);
    }
}

deleteDocument("65ddc02da43592708b7bf7ef");
