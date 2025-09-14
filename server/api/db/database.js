require("dotenv").config(); // Getting settings from .env file
const mongoose = require("mongoose");

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

// Booth Schema

const boothSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true, default: "Unnamed Booth" },
    description: { type: String, required: true, default: "No description provided." },
    location: { type: Array, required: true, default: [{x: 0, y: 0}] },
    boothRunners: { type: Array, required: true, default: [] },
    boothImage: { type: String, required: true, default: "https://pub-8f769214a6e4406c9614b19c1746938b.r2.dev/example.png" },
    boothCategory: { type: Number, required: true, default: "0" }, // 0 - Community, 1 - Food, 2 - Activities, 3 - Popups
    organization: { type: String, required: false, default: "Unspecified" },
    menu: { type: Array, required: false, default: [{
        "Example Item": 0.00,
        "Another Example Item": 1.00,
    }] },
    activities: {
        intendedAges: { type: Array, required: false, default: [0, 99] },
        queue: { type: Number, required: false, default: 0 },
        waitPerPerson: { type: Number, required: false, default: 0 }, // In minutes
    },
    popups: {
        startTime: { type: Date, required: false, default: Date.now },
        endTime: { type: Date, required: false, default: Date.now },
    },
});

// Volunteer Schema

const volunteerSchema = new mongoose.Schema({
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
    token: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now},
    assignedTo: { type: String, required: true, default: "Unnamed" },
})

module.exports = {
    connectDB,
    Booth: mongoose.model("Booth", boothSchema),
    Volunteer: mongoose.model("Volunteer", volunteerSchema),
    BearerToken: mongoose.model("BearerToken", bearerTokenSchema),
};