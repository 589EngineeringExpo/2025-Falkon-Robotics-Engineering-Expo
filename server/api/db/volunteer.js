const { Volunteer } = require("./database");

async function createVolunteer(data) { // in JSON format
    const newVolunteer = new Volunteer(data);
    return newVolunteer.save();
}
//for createVolunteer its made so that it includes managers and all you need to do is change
//a single boolean variable
async function getAllvolunteer() {
    const volunteer = await Booth.find().select("id name location volunteerCategory");
    return volunteer;
}
//returns all volunteers
async function getVolunteerById(id) {
    return Volunteer.find({ id: id });
}

async function deleteVolunteerById(volunteerId) {
  return await Volunteer.findOneAndDelete({ id: volunteerId });
}

async function updateBoothQueue(boothId, changeAmount) {
    if (isNaN(changeAmount)) {
        throw new Error("Change amount must be a number.");
    }

    const updatedBooth = await Booth.findOneAndUpdate(
        { id: boothId },
        { $inc: { 'activities.queue': changeAmount } },
        { new: true } // returns the updated document
    );

    if (!updatedBooth) {
        throw new Error(`Booth with ID ${boothId} not found.`);
    }

    // Ensure the queue doesn't go below zero
    if (updatedBooth.activities.queue < 0) {
        updatedBooth.activities.queue = 0;
        await updatedBooth.save();
    }
    
    return updatedBooth;
}

// async function deleteAllVolunteers() {
//   return await Volunteer.deleteMany({});
// }
//uncomment this after the event^ then add "deleteAllVolunteers" in module.exports after deleteVolunteerById
module.exports = {
    createVolunteer,
    getAllvolunteer,
    getVolunteerById,
    deleteVolunteerById,
    updateBoothQueue
};