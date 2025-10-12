const { BearerToken } = require("./database");

// Functions to manage bearer tokens
async function createBearerToken(assignedTo, isAdmin = false, isHost = false) { // Assigned to: string (name); isAdmin, isHost: booleans
    //creates another function in create a token function
    function generateRandomString(length) {
        return Array.from({ length }, () => Math.random().toString(36).charAt(2)).join('');
    }
    //uses the function below
    const newToken = new BearerToken({
        //creates a constant var called newToken then assigns it to the person
        token: generateRandomString(8),
        assignedTo: assignedTo,
        roles: {
            isAdmin: isAdmin,
            isHost: isHost
        }
    });
    //waits for the newToken thing to run fully then stores it in the data base
    await newToken.save();
    //returns the token so its actually useable in other areas
    return newToken;
}
async function findBearerToken(token) {
    return await BearerToken.findOne({ token });
}
async function deleteBearerToken(token) {
    //a function to delete an existing token
    return await BearerToken.deleteOne({ token });
}

// Functions to check roles based on token
/*
    Roles:
        - Volunteer: EVERY token holder has this role
        - Admin: Privileged access to admin endpoints
        - Host: Privileged access to both admin and host endpoints
*/
async function isVolunteer(token) {
    const foundToken = await BearerToken.findOne({ token });
    return foundToken !== null;
}
async function isAdmin(token) {
    const tokenDoc = await BearerToken.findOne({ token });
    if (!tokenDoc) {
        return false;
    }
    return tokenDoc.roles.isAdmin;
}
async function isHost(token) {
    const tokenDoc = await BearerToken.findOne({ token });
    if (!tokenDoc) {
        return false;
    }
    return tokenDoc.roles.isHost;
}

module.exports = {
    createBearerToken,
    findBearerToken,
    deleteBearerToken,
    isVolunteer,
    isAdmin,
    isHost
};