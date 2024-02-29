const mongoose = require("mongoose");

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
    
    // // schema Custom validation
    videos: {
        type: Number,
        validate(value) {
            if(value < 0) {
                    throw new Error("video count should not be negative")
            }
        }
    },

    author: String,
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
    videos: -80,
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
