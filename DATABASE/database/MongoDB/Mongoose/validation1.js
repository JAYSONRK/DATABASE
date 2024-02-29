const mongoose = require("mongoose");

// Schema npm validation
const validator = require('validator');

mongoose.connect("mongodb://127.0.0.1:27017/jaysonrk")
    .then(() => {
        console.log("Connected to MongoDB");
    }).catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

// Schema
const rackSchema = new mongoose.Schema({
 
    // // schema Inbuilt validation
    name: {
        type: String,
        lowercase: true},
    ctype: String,
    
    // // schema Inbuilt validation
    videos: {
        type: Number,
        validate(value) {
            if(value < 0) {
                    throw new Error("video count should not be negative")
            }
        }
    },
    
    author: String,

    // Schema npm validation
    email: {
        type: String,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        }
    },
    active: Boolean,
    date: {
        type: Date,
        default: Date.now
    }
});

// Model
const Stack = mongoose.model("rack", rackSchema);

// Create/Insert document
const reactRack = new Stack({
    name: "ReaCt",
    ctype: "frontend",
    videos: 80,
    author: "jayson",
    email: "jayson@gmail.c",
    active: true,
});

reactRack.save()
    .then(doc => {
        console.log("Document saved successfully:", doc);
    })
    .catch(error => {
        console.error("Error saving document:", error);
    });
