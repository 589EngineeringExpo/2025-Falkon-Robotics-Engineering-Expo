const { BearerToken } = require("./database");

async function createBearerToken(assignedTo) {
    function generateRandomString(length) {
        return Array.from({ length }, () => Math.random().toString(36).charAt(2)).join('');
    }
    const newToken = new BearerToken({
        token: generateRandomString(8),
        assignedTo: assignedTo
    });
    await newToken.save();
    return newToken;
}

async function findBearerToken(token) {
    return await BearerToken.findOne({ token });
}

async function deleteBearerToken(token) {
    return await BearerToken.deleteOne({ token });
}

module.exports = {
    createBearerToken,
    findBearerToken,
    deleteBearerToken,
};