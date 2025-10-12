/**
 * @swagger
 * tags:
 *   - name: volunteer
 *     description: Management for all volunteers
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Booth:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "booth123"
 *         name:
 *           type: string
 *           example: "Photo Booth 1"
 *         status:
 *           type: string
 *           example: "available"
 *         queue:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Volunteer1", "Volunteer2"]
 *     Volunteer:
 *       type: object
 *       properties:
 *         Volunteer:
 *           type: string
 *           example: "volunteerA"
 *         isAdmin:
 *           type: boolean
 *           example: false
 *         isGod:
 *           type: boolean
 *           example: false
 *     TokenResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Token created"
 *         tokenData:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *               example: "abcdef123456"
 *             assignedTo:
 *               type: string
 *               example: "volunteerA"
 */

/**
 * @swagger
 * /god:
 *   get:
 *     summary: Verify God API access
 *     tags: [God]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Confirmation message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 message: "God API operational. Welcome, Master Host."
 *                 Volunteer: "adminUser"
 */

/**
 * @swagger
 * /god/createVolunteer:
 *   post:
 *     summary: Create a new Volunteer (Volunteer, Admin, or God)
 *     tags: [God]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Volunteer'
 *     responses:
 *       201:
 *         description: Volunteer created
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /god/updateVolunteerRole:
 *   patch:
 *     summary: Update a Volunteer's role (Admin/God)
 *     tags: [God]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Volunteer:
 *                 type: string
 *               isAdmin:
 *                 type: boolean
 *               isGod:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Volunteer updated
 *       404:
 *         description: Volunteer not found
 */

/**
 * @swagger
 * /god/deleteVolunteer:
 *   delete:
 *     summary: Delete a Volunteer by id
 *     tags: [God]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: Volunteer
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Volunteer deleted
 *       404:
 *         description: Volunteer not found
 */

/**
 * @swagger
 * /god/createBooth:
 *   post:
 *     summary: Create a new booth
 *     tags: [God]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booth'
 *     responses:
 *       201:
 *         description: Booth created
 *       400:
 *         description: Invalid booth data
 */

/**
 * @swagger
 * /god/updateBooth:
 *   patch:
 *     summary: Update any detail of a booth
 *     tags: [God]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Booth updated
 *       404:
 *         description: Booth not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /god/deleteBooth:
 *   delete:
 *     summary: Delete a booth
 *     tags: [God]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booth deleted
 *       404:
 *         description: Booth not found
 */

/**
 * @swagger
 * /god/createToken:
 *   get:
 *     summary: Create a token for any Volunteer (God only)
 *     tags: [God]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: assignedTo
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Token created
 *       400:
 *         description: Missing assignedTo parameter
 */

/**
 * @swagger
 * /god/deleteToken:
 *   delete:
 *     summary: Invalidate a token (God only)
 *     tags: [God]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Token deleted
 *       400:
 *         description: Missing token parameter
 */

//passport deals with log in stuff
const express = require("express");
const router = express.Router();

const {changeQueue} = require("../db/booths");

router.post("/changeQueue", (req, res) => {
    // 1. Get the ID from the URL parameter
    const id = req.params.id;
    // 2. Get the specific property changes from the request body
    const updates = req.body; // e.g., { status: 'occupied' }

    // Call a function to merge the updates into the existing object
    changeQueue(id, updates)
        .then(updatedBooth => {
            if(Number.isInteger(updates)){
              res.status(400).json({ error: "Integers (whole numbers) only" });
            }
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
        const Volunteer = await findBearerToken(token);
        if (!Volunteer) {
            return done(null, false);
        }
        return done(null, Volunteer);
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
const { createBooth, deleteBooth, updateBooth } = require("../db/booths");
const { createVolunteer, deleteVolunteer} = require("../db/volunteer"); // New Volunteer management functions

// ======================================================================
// PASSPORT STRATEGY (Token-only validation, no Volunteer role checks)
// ======================================================================

passport.use(new BearerStrategy(async function(token, done) {
  const tokenData = await findBearerToken(token);
  if (!tokenData) return done(null, false); // Token not found = unauthorized
  return done(null, tokenData); // Attach tokenData to req.Volunteer
}));

router.use(passport.initialize());
router.use(passport.authenticate('bearer', { session: false }));

// ======================================================================
// BASE ENDPOINT
// ======================================================================
router.get("/", (req, res) => {
  res.json({ 
    message: "Authorized access using token", 
    token: req.Volunteer.token, 
    assignedTo: req.Volunteer.assignedTo 
  });
});

// ======================================================================
// TOKEN MANAGEMENT
// ======================================================================
router.get("/createToken", async (req, res) => {
  const { assignedTo } = req.query;
  if (!assignedTo) return res.status(400).json({ error: "assignedTo is required" });

  const token = await createBearerToken(assignedTo);
  res.status(201).json({ message: "Token created", tokenData: token });
});

router.delete("/deleteToken", async (req, res) => {
  const { token } = req.query;
  if (!token) return res.status(400).json({ error: "token is required" });

  await deleteBearerToken(token);
  res.status(200).json({ message: "Token deleted" });
});

// ======================================================================
// Volunteer MANAGEMENT
// ======================================================================
router.post("/createVolunteer", async (req, res) => {
  try {
    const Volunteer = await createVolunteer(req.body);
    res.status(201).json(Volunteer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/deleteVolunteer", async (req, res) => {
  const { Volunteer } = req.query;
  if (!id) return res.status(400).json({ error: "id is required" });

  try {
    await deleteVolunteer(Volunteer);
    res.status(200).json({ message: `Volunteer ${id} deleted.` });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// ======================================================================
// BOOTH MANAGEMENT
// ======================================================================
router.post("/createBooth", async (req, res) => {
  try {
    const booth = await createBooth(req.body);
    res.status(201).json(booth);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.patch("/updateBooth", async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: "id is required" });

  try {
    const booth = await updateBooth(id, req.body);
    if (!booth) return res.status(404).json({ error: "Booth not found" });
    res.status(200).json(booth);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/deleteBooth", async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: "id is required" });

  try {
    await deleteBooth(id);
    res.status(200).json({ message: `Booth ${id} deleted.` });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

module.exports = router;