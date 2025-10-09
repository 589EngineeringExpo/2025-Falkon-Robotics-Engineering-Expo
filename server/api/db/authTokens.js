const { BearerToken } = require("./database");
//loads database^
//the func below is to create a token
async function createBearerToken(assignedTo) {
    //creates another function in create a token function
    function generateRandomString(length) {
        return Array.from({ length }, () => Math.random().toString(36).charAt(2)).join('');
    }
    //uses the function below
    const newToken = new BearerToken({
        //creates a constant var called newToken then assigns it to the person
        token: generateRandomString(8),
        assignedTo: assignedTo
    });
    //waits for the newToken thing to run fully then stores it in the data base
    await newToken.save();
    //returns the token so its actually useable in other areas
    return newToken;
}

async function findBearerToken(token) {
    //a function to a find a specific token
    return await BearerToken.findOne({ token });
}
async function isTokenValid(token) {
    // a function to check if a token exists and is valid
    const foundToken = await BearerToken.findOne({ token });
    return foundToken !== null;
}

async function deleteBearerToken(token) {
    //a function to delete an existing token
    return await BearerToken.deleteOne({ token });
}

module.exports = {
    createBearerToken,
    findBearerToken,
    deleteBearerToken,
};