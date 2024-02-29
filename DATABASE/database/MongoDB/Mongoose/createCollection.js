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
const Stack = mongoose.model("rack", rackSchema);

// Create/Insert document
const reactRack = new Stack({
    name: "ReaCt",
    ctype: "frontend",
    videos: 80,
    author: "jayson",
    active: true,
});

reactRack.save()
    .then(doc => {
        console.log("Document saved successfully:", doc);
    })
    .catch(error => {
        console.error("Error saving document:", error);
    });
