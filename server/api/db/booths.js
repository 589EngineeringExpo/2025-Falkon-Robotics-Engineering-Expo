const { Booth } = require("./database");

async function validateBoothData(data) {
    const requiredFields = ["id", "name", "description", "createdBy", "location", "volunteers", "image", "type"];
    for (const field of requiredFields) {
        if (!(field in data)) {
            return { valid: false, message: `Missing required field: ${field}` };
        }
    }
    return { valid: true };
}

async function createBooth(data) { // Following the format in validateBoothData()
    const validation = await validateBoothData(data);
    if (!validation.valid) {
        return validation.message;
    }
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
//Booth.findOneAndUpdate is a mongoose method that lets the programmer find then select and change an object
async function changeQueue(boothId, amount) {
  // amount can be positive (increment) or negative (decrement)
  const booth = await Booth.findOneAndUpdate(
    { id: boothId },
    { $inc: { "activities.queue": amount } },
    { new: true }
  );

  // Safety: doesn't allow queue < 0
  if (booth.activities.queue < 0) {
    booth.activities.queue = 0;
    await booth.save();
  }

  return booth;
}
async function getQueue(checkingID) {
    const booth = await Booth.findOne({ id: checkingID }).select("activities.queue");
    console.log(booth.activities.queue);
    return booth;
}
async function deleteBoothById(boothId) {
    return await Booth.findOneAndDelete({ id: boothId });
}
async function deleteAllBooths() {
    return await Booth.deleteMany({});
}
module.exports = {
    createBooth,
    getAllBooths,
    getBoothById,
    changeQueue,
    deleteBoothById,
    deleteAllBooths,
    getQueue
};