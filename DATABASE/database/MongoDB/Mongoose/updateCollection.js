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

// Update document
const updateDocument = async (_id) => {
    try {
        // const result = await Stack.updateOne({ _id}, { $set: { name: "Javascript" } });
        const result = await Stack.findByIdAndUpdate({ _id}, { $set: { name: "Javascript" } });
        console.log(result);
    } catch (error) {
        console.error("Error updating document:", error);
    }
}

updateDocument("65ddc02da43592708b7bf7ef");
