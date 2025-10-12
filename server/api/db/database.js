require("dotenv").config(); // Find the .env file and load it
const mongoURI = process.env.MONGODB_URI; // Read MONGODB_URI from .env
const mongoose = require("mongoose");
//setting stuff ^ + importing\
//everything below is just how to store stuff
//connectDB is just a way to show if connection works or doesnt
//console.log just prints the following quote in console 
async function connectDB(){
    try {
        console.log("** Attempting to connect to MongoDB **")
        await mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 5000 }); // 5 seconds timeout
        if (mongoose.connection.readyState === 1) {
            console.log("MongoDB connected");
        } else {
            console.error("MongoDB connection failed: Not connected after connect()");
            process.exit(1);
        }
    } catch (error) {
        console.error("MongoDB connection error:", error);
        console.error("Ensure that MongoDB is running and that the MONGODB_URI in the .env file is correct.");
        process.exit(1);
    }
};
//all schema is just how the database should store information


/*
=========================================Booth=========================================
Stores a bunch of variables that will be used on the website.


*/
const boothSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true, default: "Unnamed Booth" },
    description: { type: String, required: true, default: "No description provided." },
    theme: { type: String, required: false, default: "No theme provided" },
    location: { type: Array, required: true, default: [{x: 0, y: 0}] },
    boothRunners: { type: Array, required: true, default: [] },
    boothImage: { type: String, required: true, default: "https://pub-8f769214a6e4406c9614b19c1746938b.r2.dev/example.png" },
    boothCategory: { type: Number, required: true, default: "0" }, // 0 - Community, 1 - Food, 2 - Activities, 3 - Popups
    organization: { type: String, required: false, default: "Unspecified" },
    menu: { type: Array, required: false},
    activities: {
        intendedAges: { type: Array, required: false, default: [0, 14] },
        queue: { type: Number, required: false, default: 0 },
        //queue is # of people
        waitPerPerson: { type: Number, required: false, default: 0 }, // In minutes
    },
    popups: {
        startTime: { type: Date, required: false, default: Date.now },
        endTime: { type: Date, required: false, default: Date.now },
    },
});

// Volunteer Schema (this includes admin)

const volunteerSchema = new mongoose.Schema({
    //token is basically a password for that individual so not everyone can change stuff
    token:{ type: String, required: true, unique: true },
    //when its assigned + who its assignedto
    createdAt: { type: Date, default: Date.now},
    //only some are assigned to booths cuz managers arent assigned to deal with other stuff
    assignedTo: { type: String, required: true, default: "Unnamed" },
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true, default: "Unnamed" },
    jobs: {
        isAssignedToBooth: { type: Boolean, required: false, default: false },
        boothID: { type: Number, required: false, default: null },
        jobDescription: { type: String, required: false, default: "Unassigned" },
    },
    
    
});


// Bearer Token Schema

const bearerTokenSchema = new mongoose.Schema({
    //actual creation of a token
    token: { type: String, required: true, unique: true },
    isAdmin: {type: Boolean, required: false, default: false},
    isHost: {type: Boolean, required: false, default: false},
    //when its created
    createdAt: { type: Date, default: Date.now},
    assignedTo: { type: String, required: true, default: "Unnamed" },
});

module.exports = {
    connectDB,
    Booth: mongoose.model("Booth", boothSchema),
    Volunteer: mongoose.model("Volunteer", volunteerSchema),
    BearerToken: mongoose.model("BearerToken", bearerTokenSchema),
};