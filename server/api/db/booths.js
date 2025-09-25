const { Booth } = require("./database");

//creates a booth using "data" which is an object
async function createBooth(data) { // in JSON format
    const newBooth = new Booth(data);
    return newBooth.save();
}
//all .save() is just storing it in the database and return just returns it
async function getAllBooths() {
    const booths = await Booth.find().select("id name location boothCategory");
    return booths;
}

async function getBoothById(id) {
    return Booth.find({ id: id });
}
async function numPeople(integer) {
    
    return;
}
module.exports = {
    createBooth,
    getAllBooths,
    getBoothById,
};