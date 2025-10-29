const { Booth } = require("./database");
const multer = require('multer');
const fs = require('fs');
const path = require('path');

async function createBooth(data) {
    const newBooth = new Booth(data);
    return newBooth.save();
}
//all .save() is just storing it in the database and return just returns it
async function getAllBooths() {
    const booths = await Booth.find().select("id name location boothCategory activities.queue");
    booths.sort((a, b) => a.id - b.id);
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
    { $set: { "activities.queue": amount } },
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
async function uploadBoothImage(boothID, image) {
    const targetPath = path.join(__dirname, "../../web/public/src/uploads/", `booth_${boothID}${path.extname(image.originalname)}`);
    fs.renameSync(image.path, targetPath);
    const imageUrl = `/src/uploads/booth_${boothID}${path.extname(image.originalname)}`;
    await Booth.findOneAndUpdate({ id: boothID }, { boothImage: imageUrl });
    return imageUrl;
}
module.exports = {
    createBooth,
    getAllBooths,
    getBoothById,
    changeQueue,
    deleteBoothById,
    deleteAllBooths,
    getQueue,
    uploadBoothImage
};