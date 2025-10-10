// This is not meant to be used by the application. This is a one-time script to create a bearer token for admin use. You should not run this file unless you just created a new database / server.

require("./server/api/db/database").connectDB();
const { createBearerToken } = require("./server/api/db/authTokens.js");

async function generateAdminBearerToken() {
    const token = await createBearerToken("ADMIN");
    console.log("Generated admin bearer token:", token.token);
    console.log("From now on, create new tokens via the /api/admin/createToken endpoint with a proper name.");
    console.log("This token has been assigned to 'ADMIN'. I advise creating a new token with your name and deleting this one.");
    console.log(token.token);
    process.exit(0);
}

generateAdminBearerToken();