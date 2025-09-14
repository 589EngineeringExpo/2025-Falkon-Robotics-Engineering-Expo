const { Booth } = require("./database");

async function createBooth(data) { // in JSON format
    const newBooth = new Booth(data);
    return newBooth.save();
}

async function getAllBooths() {
    const booths = await Booth.find().select("id name location boothCategory");
    return booths;
}

async function getBoothById(id) {
    return Booth.find({ id: id });
}

module.exports = {
    createBooth,
    getAllBooths,
    getBoothById,
};