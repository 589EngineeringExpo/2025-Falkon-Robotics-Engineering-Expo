const { Volunteer } = require("./database");

async function createVolunteer(data) { // in JSON format
    const newVolunteer = new Volunteer(data);
    return newVolunteer.save();
}

async function getAllvolunteer() {
    const volunteer = await Booth.find().select("id name location volunteerCategory");
    return volunteer;
}

async function getVolunteerById(id) {
    return Volunteer.find({ id: id });
}

module.exports = {
    createVolunteer,
    getAllvolunteer,
    getVolunteerById,
};