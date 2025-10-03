// --- Global Security Scheme for God Role ---
/**
 * @swagger
 * components:
 * securitySchemes:
 * godAuth:
 * type: http
 * scheme: bearer
 * bearerFormat: JWT
 * description: Bearer token required for God-level administrative access.
 */

// --- God Tag Definition ---
/**
 * @swagger
 * tags:
 * name: God
 * description: Master API endpoints for creating, updating, and deleting all data types (Booths, Volunteers, Admins).
 */

// =================================================================
// 👑 GOD ENDPOINTS: USER MANAGEMENT (ADMINS & VOLUNTEERS)
// =================================================================

/**
 * @swagger
 * /api/god/createUser:
 * post:
 * summary: Create a new Volunteer or Admin user.
 * security:
 * - godAuth: []
 * tags: [God]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - username
 * - isGod
 * - isAdmin
 * properties:
 * username:
 * type: string
 * description: Unique identifier for the user (e.g., email or unique ID).
 * isGod:
 * type: boolean
 * description: Set to true only if creating the top-level God user.
 * isAdmin:
 * type: boolean
 * description: Set to true for an Admin, false for a Volunteer.
 * token:
 * type: string
 * description: The user's initial security token (optional, can be auto-generated).
 * responses:
 * 201:
 * description: User created successfully.
 * 400:
 * description: Invalid input or username already exists.
 * 403:
 * description: Forbidden - God privileges required.
 */

/**
 * @swagger
 * /api/god/deleteUser:
 * delete:
 * summary: Delete a Volunteer or Admin user by username.
 * security:
 * - godAuth: []
 * tags: [God]
 * parameters:
 * - in: query
 * name: username
 * schema:
 * type: string
 * required: true
 * description: The username (unique ID) of the user to delete.
 * responses:
 * 200:
 * description: User deleted successfully.
 * 404:
 * description: User not found.
 * 403:
 * description: Forbidden - God privileges required.
 */

/**
 * @swagger
 * /api/god/updateUserRole:
 * patch:
 * summary: Update the role (Admin/Volunteer) or details of an existing user.
 * security:
 * - godAuth: []
 * tags: [God]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - username
 * properties:
 * username:
 * type: string
 * isAdmin:
 * type: boolean
 * description: New Admin status (true/false).
 * isGod:
 * type: boolean
 * description: New God status (true/false).
 * responses:
 * 200:
 * description: User role updated successfully.
 * 404:
 * description: User not found.
 * 403:
 * description: Forbidden - God privileges required.
 */

// =================================================================
// 👑 GOD ENDPOINTS: BOOTH MANAGEMENT
// =================================================================

/**
 * @swagger
 * /api/god/createBooth:
 * post:
 * summary: Create a new booth (Full access).
 * security:
 * - godAuth: []
 * tags: [God]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * description: Uses the existing Booth object schema.
 * required:
 * - id
 * - name
 * - boothCategory
 * properties:
 * id: { type: integer }
 * name: { type: string }
 * description: { type: string }
 * boothCategory: { type: integer, description: 0 - Community, 1 - Food, etc. }
 * // ... all other booth properties ...
 * responses:
 * 201:
 * description: Booth created successfully.
 * 400:
 * description: Invalid input.
 * 403:
 * description: Forbidden - God privileges required.
 */

/**
 * @swagger
 * /api/god/deleteBooth:
 * delete:
 * summary: Delete a booth by ID.
 * security:
 * - godAuth: []
 * tags: [God]
 * parameters:
 * - in: query
 * name: id
 * schema:
 * type: string
 * required: true
 * description: The ID of the booth to delete.
 * responses:
 * 200:
 * description: Booth deleted successfully.
 * 404:
 * description: Booth not found.
 * 403:
 * description: Forbidden - God privileges required.
 */

/**
 * @swagger
 * /api/god/updateBooth:
 * patch:
 * summary: Update any detail of an existing booth.
 * security:
 * - godAuth: []
 * tags: [God]
 * parameters:
 * - in: query
 * name: id
 * schema:
 * type: string
 * required: true
 * description: The ID of the booth to update.
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * description: Any property of the Booth object can be updated.
 * responses:
 * 200:
 * description: Booth details updated successfully.
 * 404:
 * description: Booth not found.
 * 403:
 * description: Forbidden - God privileges required.
 */

// god.js - can edit, add, or create booths, volunteers, and admin

const express = require("express");
const router = express.Router();
const passport = require("passport");
const BearerStrategy = require('passport-http-bearer').Strategy;

// --- Database/Authentication Imports ---
// Assuming these functions handle the God-level operations
const { createBearerToken, findBearerToken, deleteBearerToken } = require("../db/authTokens");
const { createBooth, deleteBooth, updateBooth } = require("../db/booths");
const { createUser, deleteUser, updateUserRole } = require("../db/users"); // New User management functions

// --- PASSPORT AUTHENTICATION SETUP ---

// Define the Bearer Strategy to validate the token
passport.use('god-bearer', new BearerStrategy(
    async function(token, done) {
        // This function must look up the token AND check for isGod: true
        const user = await findBearerToken(token);

        // Check if user exists AND if the user has the 'God' role
        if (!user || user.isGod !== true) {
            return done(null, false); // Authentication failed
        }
        return done(null, user); // Authentication successful, user object attached to req.user
    }
));

// Middleware to protect all /api/god routes
router.use(passport.initialize());
router.use(passport.authenticate('god-bearer', { session: false }));

// --- BASE ENDPOINT ---
router.get("/", (req, res) => {
    // A simple test endpoint to confirm token works and God access is granted
    res.json({ message: "God API operational. Welcome, Master Host.", user: req.user.username });
});

// =================================================================
// USER MANAGEMENT ENDPOINTS
// =================================================================

// POST: /api/god/createUser - Create a new Volunteer, Admin, or God user
router.post("/createUser", (req, res) => {
    // req.body should contain { username, isAdmin: boolean, isGod: boolean }
    createUser(req.body)
        .then(user => res.status(201).json(user))
        .catch(err => res.status(400).json({ error: err.message }));
});

// PATCH: /api/god/updateUserRole - Update a user's role (Admin/God status)
router.patch("/updateUserRole", (req, res) => {
    // req.body should contain { username, isAdmin?: boolean, isGod?: boolean }
    updateUserRole(req.body)
        .then(user => res.status(200).json(user))
        .catch(err => res.status(404).json({ error: err.message }));
});

// DELETE: /api/god/deleteUser?username=... - Delete a user
router.delete("/deleteUser", (req, res) => {
    const username = req.query.username;
    if (!username) {
        return res.status(400).json({ error: "username query parameter is required" });
    }
    deleteUser(username)
        .then(() => res.status(200).json({ message: `User ${username} deleted.` }))
        .catch(err => res.status(404).json({ error: err.message }));
});

// =================================================================
// BOOTH MANAGEMENT ENDPOINTS (Full CRUD)
// =================================================================

// POST: /api/god/createBooth - Full creation of a new booth
router.post("/createBooth", (req, res) => {
    // Full booth body in req.body
    createBooth(req.body)
        .then(booth => res.status(201).json(booth))
        .catch(err => res.status(400).json({ error: err.message }));
});

// PATCH: /api/god/updateBooth?id=... - Update any detail of an existing booth
router.patch("/updateBooth", (req, res) => {
    const id = req.query.id;
    if (!id) {
        return res.status(400).json({ error: "id query parameter is required" });
    }
    // Assumes updateBooth handles merging req.body changes with the existing record
    updateBooth(id, req.body)
        .then(booth => {
            if (booth) {
                res.status(200).json(booth);
            } else {
                res.status(404).json({ error: "Booth not found" });
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

// DELETE: /api/god/deleteBooth?id=... - Delete a booth
router.delete("/deleteBooth", (req, res) => {
    const id = req.query.id;
    if (!id) {
        return res.status(400).json({ error: "id query parameter is required" });
    }
    deleteBooth(id)
        .then(() => res.status(200).json({ message: `Booth ${id} deleted.` }))
        .catch(err => res.status(404).json({ error: err.message }));
});

// =================================================================
// TOKEN MANAGEMENT (Only God can explicitly manage tokens)
// =================================================================

// GET: /api/god/createToken?assignedTo=... - Create a new token for any user
router.get("/createToken", async (req, res) => {
    if (!req.query.assignedTo) {
        return res.status(400).json({ error: "assignedTo query parameter is required" });
    }
    // NOTE: The database function must ensure this token has the correct role (Admin/God)
    const token = await createBearerToken(req.query.assignedTo);
    res.status(201).json({ message: "Token created", tokenData: token });
});

// DELETE: /api/god/deleteToken?token=... - Invalidate a specific token
router.delete("/deleteToken", async (req, res) => {
    const tokenString = req.query.token;
    if (!tokenString) {
        return res.status(400).json({ error: "token query parameter is required" });
    }
    await deleteBearerToken(tokenString); // This should invalidate it in the DB
    res.status(200).json({ message: "Token deleted/invalidated." });
});

module.exports = router;