/**
 * @swagger
 * tags:
 *   name: volunteer
 *   description: API endpoints for managing volunteers
 */

/**
 * @swagger
 * /api/volunteer/:
 *   get:
 *     summary: edit volunteer
 *     tags: [volunteers]
 *     responses:
 *       200:
 *         description: Returns a message about the volunteers API endpoint
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /api/volunteer/all:
 *   get:
 *     summary: Get all volunteer
 *     tags: [volunteer]
 *     responses:
 *       200:
 *         description: List of all volunteer
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /api/volunteer/get:
 *   get:
 *     summary: Get a volunteer by ID
 *     tags: [volunteer]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Volunteer ID
 *     responses:
 *       200:
 *         description: Volunteer found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Volunteer not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
//passport deals with log in stuff
const express = require("express");
const router = express.Router();

const { getBoothById, changeQueue} = require("../db/booths");

router.get("/", (req, res) => {
    res.json({ message: "Booths API endpoint!"});
});

router.get("/get", (req, res) => {
    const id = req.query.id;
    getBoothById(id).then(booth => {
        if (booth) {
            res.status(200).json(booth);
        }
        else {
            res.status(404).json({ error: "Booth not found" });
        }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

router.patch("/:id", (req, res) => {
    // 1. Get the ID from the URL parameter
    const id = req.params.id;
    // 2. Get the specific property changes from the request body
    const updates = req.body; // e.g., { status: 'occupied' }

    // Call a function to merge the updates into the existing object
    changeQueue(id, updates)
        .then(updatedBooth => {
            if (updatedBooth) {
                res.status(200).json(updatedBooth);
            } else {
                res.status(404).json({ error: "Booth not found" });
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
});
const { createBearerToken, findBearerToken } = require("../db/authTokens");
const passport = require("passport");
const BearerStrategy = require('passport-http-bearer').Strategy;


passport.use(new BearerStrategy(
    async function(token, done) {
        const user = await findBearerToken(token);
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    }
));

router.use(passport.initialize());
router.use(passport.authenticate('bearer', { session: false }));

router.get("/createToken", async (req, res) => {
    if (!req.query.assignedTo) {
        return res.status(400).json({ error: "assignedTo query parameter is required" });
    }
    const token = await createBearerToken(req.query.assignedTo);
    res.status(201).json({ message: "Token created", tokenData: token });
});
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