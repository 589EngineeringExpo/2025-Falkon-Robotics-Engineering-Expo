/*
=========================================context=========================================

    Engineering Expo is a yearly carinval-style event where we open up 
part of our school to allow anyone regardless of financial situation to 
explore STEAM (Science, Technology,Engineering,Art,Math). Our target audience are 
children and parents that want to give their kid an introduction to STEAM. Our event 
has countless booth with most having activities while others being community booths. 

    At the time of making this our team has hosted this event 2 
times and one of the issues that I saw was how some booths got alot more attention 
compared to others along with some people being lost. So my solution to this problem 
is a website similar to the sixflags app to be used so that uses popups to point people
towards the booths that have less attention. My vision for this project is for it to 
be used yearly without fail and eventually for anyone to be able to use it regardless 
of how much coding expierience they have. In a perfect world this project
would allow anyone to use it without changing the code and just the data stored (booths
+ volunteers).


*/



require("dotenv").config(); // Getting settings from .env file
const mongoose = require("mongoose");
//seting stuff ^ + importing\
//everything below is just how to store stuff
//connectDB is just a way to show if connection works or doesnt
//console.log just prints the following quote in console 
async function connectDB(){
    const mongoURI = process.env.MONGODB_URI;
    try {
        await mongoose.connect(mongoURI);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
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
    //the 4 lines below is just saying is this person an admin then
    isAdmin: {type: Boolean, required: false, default: false},
    isHost: {type: Boolean, required: false, default: false},
    //token is basically a password for that individual so not everyone can do everything an admin can
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
    //when its created
    createdAt: { type: Date, default: Date.now},
    //
    assignedTo: { type: String, required: true, default: "Unnamed" },
})

module.exports = {
    connectDB,
    Booth: mongoose.model("Booth", boothSchema),
    Volunteer: mongoose.model("Volunteer", volunteerSchema),
    BearerToken: mongoose.model("BearerToken", bearerTokenSchema),
};