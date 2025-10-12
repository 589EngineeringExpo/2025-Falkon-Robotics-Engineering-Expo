// /api/booths/ route handler

// IT'S IMPORTANT TO DOCUMENT ANY API ENDPOINTS VIA SWAGGER SO IT SHOWS UP IN /api-docs
/**
 * @swagger
 * tags:
 *   name: Booths
 *   description: API endpoints for managing booths
 */

/**
 * @swagger
 * /api/booths/createBooth:
 *  post:
 */

/**
 * @swagger
 * /api/booths/all:
 *   get:
 *     summary: Get all booths
 *     tags: [Booths]
 *     responses:
 *       200:
 *         description: List of all booths
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
 * /api/booths/get:
 *   get:
 *     summary: Get a booth by ID
 *     tags: [Booths]
 *     parameters:
 *       - in: query
 *         name: int
 *         Volunteer name: id
 *         schema:
 *           type: int
 *         required: true
 *         description: Booth ID
 *     responses:
 *       200:
 *         description: Booth found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Booth not found
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

const express = require("express");
const router = express.Router();

// Authentication setup. Routes will call this middleware if needed for authentication
const passport = require("passport");
const BearerStrategy = require('passport-http-bearer').Strategy;
passport.use(new BearerStrategy(
    async function(token, done) {
        const tokenData = await findBearerToken(token);
        if (!tokenData) { // If no token is found
            return done(null, false);
        }
        
        // Token found, returning associated roles
        if (tokenData.roles.isAdmin) {
            return done(null, { role: 'admin', name: tokenData.assignedTo });
        }
        if (tokenData.roles.isHost) {
            return done(null, { role: 'host', name: tokenData.assignedTo });
        }
        return done(null, { role: 'volunteer', name: tokenData.assignedTo });
    }
));

const { createBooth, getAllBooths, getBoothById } = require("../db/booths"); // Importing booth functions
const { isVolunteer, isAdmin, isHost } = require("../db/authTokens"); // Authentication functions

router.get("/all", (req, res) => {
    getAllBooths()
        .then(booths => res.status(200).json(booths))
        .catch(err => res.status(500).json({ error: err.message }));
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

router.post("/createBooth", passport.authenticate('bearer', { session: false }), (req, res) => {
    if (req.user.role === "host") {
        createBooth(req.body)
            .then(booth => res.status(201).json(booth))
            .catch(err => res.status(500).json({ error: err.message }));
    }
    return res.status(403).json({ error: "Forbidden: User is not a HOST" });
});

module.exports = router;