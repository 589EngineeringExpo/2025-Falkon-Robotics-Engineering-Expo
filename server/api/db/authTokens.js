const { BearerToken } = require("./database");
//creates a password using a bunch of random letters and numbers (aka token)
//bearertoken just means a token that someone will "bear" or use/hold
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
    return await BearerToken.findOne({ token });
}
//only checks if that token is there because if someone is a volunteer they should have a token assigned to them
async function isVolunteer(token) {
    const foundToken = await BearerToken.findOne({ token });
    return foundToken !== null;
}

async function isAdmin(token) {
    const tokenDoc = await BearerToken.findOne({ token });
      if (!tokenDoc) return null;

    return tokenDoc.isAdmin
        
}

async function isHost(token) {
    const tokenDoc = await BearerToken.findOne({ token });
      if (!tokenDoc) return null;

    return tokenDoc.isHost
        
}

async function deleteBearerToken(token) {
    //a function to delete an existing token
    return await BearerToken.deleteOne({ token });
}

module.exports = {
    createBearerToken,
    findBearerToken,
    deleteBearerToken,
    isVolunteer,
    isAdmin,
    isHost
};