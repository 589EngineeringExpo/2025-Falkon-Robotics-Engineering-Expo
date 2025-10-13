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
 *   post:
 *     summary: Create a new booth
 *     description: Allows a user with the role of "host" to create a new booth.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Booths
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - description
 *               - createdBy
 *               - location
 *               - boothImage
 *               - boothCategory
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: "Robotics Booth"
 *               description:
 *                 type: string
 *                 example: "A booth showcasing robotics."
 *               createdBy:
 *                 type: string
 *                 example: "John Doe"
 *               location:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     x:
 *                       type: number
 *                       example: 35.6895
 *                     y:
 *                       type: number
 *                       example: 139.6917
 *               boothRunners:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     volunteerID:
 *                       type: string
 *                       example: "John Doe"
 *               boothImage:
 *                 type: string
 *                 format: uri
 *                 example: "https://example.com/image.png"
 *               boothCategory:
 *                 type: integer
 *                 enum: [0, 1, 2, 3]
 *                 description: |
 *                   Type of booth:
 *                   - 0: Community
 *                   - 1: Food
 *                   - 2: Activities
 *                   - 3: Popups
 *                 example: 1
 *               organization:
 *                 type: string
 *                 example: "Falkon Robotics"
 *               menu:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Tacos", "BBQ", "Salads"]
 *               activities:
 *                 type: object
 *                 properties:
 *                   intendedAges:
 *                     type: array
 *                     items:
 *                       type: integer
 *                     example: [6, 12]
 *                   queue:
 *                     type: integer
 *                     description: Estimated number of people in line
 *                     example: 20
 *                   waitPerPerson:
 *                     type: integer
 *                     description: Wait time per person in minutes
 *                     example: 5
 *               popups:
 *                 type: object
 *                 properties:
 *                   startTime:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-10-12T10:00:00Z"
 *                   endTime:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-10-12T12:00:00Z"
 *     responses:
 *       201:
 *         description: Booth successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       403:
 *         description: Forbidden - User is not a host
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Forbidden: User is not a HOST"
 *       500:
 *         description: Internal server error
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

/**
 * @swagger
 * /api/booths/updateBooth:
 *   patch:
 *     summary: Update an existing booth
 *     description: Updates booth details by booth ID. Only users with host privileges can update booths.
 *     tags:
 *       - Booths
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: ID of the booth to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
  *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - description
 *               - createdBy
 *               - location
 *               - boothImage
 *               - boothCategory
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: "Robotics Booth"
 *               description:
 *                 type: string
 *                 example: "A booth showcasing robotics."
 *               createdBy:
 *                 type: string
 *                 example: "John Doe"
 *               location:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     x:
 *                       type: number
 *                       example: 35.6895
 *                     y:
 *                       type: number
 *                       example: 139.6917
 *               boothRunners:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     volunteerID:
 *                       type: string
 *                       example: "John Doe"
 *               boothImage:
 *                 type: string
 *                 format: uri
 *                 example: "https://example.com/image.png"
 *               boothCategory:
 *                 type: integer
 *                 enum: [0, 1, 2, 3]
 *                 description: |
 *                   Type of booth:
 *                   - 0: Community
 *                   - 1: Food
 *                   - 2: Activities
 *                   - 3: Popups
 *                 example: 1
 *               organization:
 *                 type: string
 *                 example: "Falkon Robotics"
 *               menu:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Tacos", "BBQ", "Salads"]
 *               activities:
 *                 type: object
 *                 properties:
 *                   intendedAges:
 *                     type: array
 *                     items:
 *                       type: integer
 *                     example: [6, 12]
 *                   queue:
 *                     type: integer
 *                     description: Estimated number of people in line
 *                     example: 20
 *                   waitPerPerson:
 *                     type: integer
 *                     description: Wait time per person in minutes
 *                     example: 5
 *               popups:
 *                 type: object
 *                 properties:
 *                   startTime:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-10-12T10:00:00Z"
 *                   endTime:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-10-12T12:00:00Z"
 *     responses:
 *       200:
 *         description: Booth successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booth'
 *       400:
 *         description: Missing booth ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Booth ID is required
 *       403:
 *         description: User is not authorized (not a host)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Forbidden: User is not a HOST"
 *       404:
 *         description: Booth not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Booth not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error message
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
        if (tokenData.isAdmin) {
            return done(null, { role: 'admin', name: tokenData.assignedTo, isAdmin: tokenData.isAdmin, isHost: tokenData.isHost }); // Accessed through req.user.role
        }
        if (tokenData.isHost) {
            return done(null, { role: 'host', name: tokenData.assignedTo, isAdmin: tokenData.isAdmin, isHost: tokenData.isHost });
        }
        return done(null, { role: 'volunteer', name: tokenData.assignedTo, isAdmin: tokenData.isAdmin, isHost: tokenData.isHost });
    }
));

const { createBooth, getAllBooths, getBoothById, deleteBoothById, validateBoothData } = require("../db/booths"); // Importing booth functions
const { isAdmin } = require("../db/authTokens");

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
    if (req.user.isHost) {
        createBooth(req.body)
            .then(booth => res.status(201).json({ success: true }))
            .catch(err => res.status(500).json({ success: false, error: err.message }));
        return;
    }
    res.status(403).json({ success: false, error: "Forbidden: User is not a HOST" });
});

router.patch("/updateBooth", passport.authenticate('bearer', { session: false }), async (req, res) => {
    if (req.user.isHost) {
        const { id } = req.query;
        if (!id) return res.status(400).json({ error: "Booth ID is required" });

        if (validateBoothData(req.body).valid === false) {
            return res.status(400).json({ error: validateBoothData(req.body).message });
        }
        else {
            try {
                const booth = await deleteBoothById(id).then(() => createBooth(req.body));
                if (!booth) return res.status(404).json({ error: "Booth not found" });
                res.status(200).json(booth);
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
            return;
        }
    }
    return res.status(403).json({ error: "Forbidden: User is not a HOST" });
});

router.delete("/deleteBooth", async (req, res) => {
    if (req.user.role === "host") {
        const { id } = req.query;
        if (!id) return res.status(400).json({ error: "id is required" });

        try {
            await deleteBooth(id);
            res.status(200).json({ message: `Booth ${id} deleted.` });
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }
    return res.status(403).json({ error: "Forbidden: User is not a HOST" });
});

module.exports = router;