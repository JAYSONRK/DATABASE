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
const Stack = mongoose.model("Stack", rackSchema); // Fix: Model name should be "Stack"

// Create/Insert multiple documents
const reactRack = new Stack({
    name: "React",
    ctype: "frontend",
    videos: 80,
    author: "jayson",
    active: true,
});

const nodeRack = new Stack({
    name: "nodejs",
    ctype: "backend",
    videos: 40,
    author: "jayson",
    active: true,
});

const cloudRack = new Stack({
    name: "kubernet",
    ctype: "cloud",
    videos: 10,
    author: "jayson",
    active: true,
});

const devopRack = new Stack({
    name: "docker",
    ctype: "devop",
    videos: 20,
    author: "jayson",
    active: true,
});

Stack.insertMany([reactRack, nodeRack, cloudRack, devopRack])
    .then(docs => {
        console.log("Documents saved successfully:", docs);
    })
    .catch(error => {
        console.error("Error saving documents:", error);
    });
