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
 *         name: id
 *         schema:
 *           type: integer
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

/**
 * @swagger
 * /api/booths/deleteBooth:
 *   delete:
 *     summary: Delete a booth by ID
 *     description: Deletes a booth identified by the given ID. Requires bearer authentication and host privileges.
 *     tags:
 *       - Booths
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the booth to delete
 *     responses:
 *       200:
 *         description: Booth successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Booth 123 deleted.
 *       400:
 *         description: Missing booth ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: id is required
 *       401:
 *         description: Unauthorized - Invalid or missing bearer token
 *       403:
 *         description: Forbidden - User is not a host
 *       404:
 *         description: Booth not found or other error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Booth not found
 */

/**
 * @swagger
 * /api/booths/nextBoothID:
 *   get:
 *     summary: Get next available booth ID
 *     description: Returns the next available numeric ID for creating a new booth (highest existing ID + 1, or 1 if no booths exist).
 *     tags:
 *       - Booths
 *     responses:
 *       200:
 *         description: Next booth ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nextBoothID:
 *                   type: integer
 *                   example: 5
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
 * /api/booths/uploadBoothImage:
 *   post:
 *     summary: Upload an image for a booth
 *     description: Uploads a single image file for a booth. Requires bearer authentication and admin privileges.
 *     tags:
 *       - Booths
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - boothID
 *               - file
 *             properties:
 *               boothID:
 *                 type: string
 *                 description: ID of the booth the image belongs to
 *                 example: "3"
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Image file to upload (png, jpg, etc.)
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 imageURL:
 *                   type: string
 *                   format: uri
 *                   example: "https://expo.cvrobots.com/src/uploads/booth_0.png"
 *       400:
 *         description: Missing boothID or file
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Booth ID and image file are required."
 *       401:
 *         description: Unauthorized - invalid or missing bearer token
 *       403:
 *         description: Forbidden - user is not an admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Forbidden: User is not an ADMIN"
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

const multer = require('multer');
const path = require('path');
// Use path.join so separators are correct on all platforms and build an absolute temp directory path
const tempUploadDir = path.join(__dirname, '..', 'db', 'tempUploadedFiles');
const upload = multer({
    dest: tempUploadDir, // Temporary storage location
});

const { createBooth, getAllBooths, getBoothById, deleteBoothById, uploadBoothImage } = require("../db/booths"); // Importing booth functions
const { checkAdmin, checkHost } = require("../middleware/checkAdmin"); // Middleware to check admin/host status
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

router.post("/createBooth", passport.authenticate('bearer', { session: false }), checkHost, (req, res) => {
    createBooth(req.body)
        .then(booth => res.status(201).json({ success: true }))
        .catch(err => res.status(500).json({ success: false, error: err.message }));
    return;
});

router.patch("/updateBooth", passport.authenticate('bearer', { session: false }), checkHost, async (req, res) => {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: "Booth ID is required" });
    try {
        const booth = await deleteBoothById(id).then(() => createBooth(req.body));
        if (!booth) return res.status(404).json({ error: "Booth not found" });
        res.status(200).json(booth);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    return;
});

router.delete("/deleteBooth", passport.authenticate('bearer', { session: false }), checkHost, async (req, res) => {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: "id is required" });

    try {
        await deleteBoothById(id);
        res.status(200).json({ message: `Booth ${id} deleted.` });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

router.get("/nextBoothID", async (req, res) => {
    getAllBooths()
        .then(booths => {
            const nextId = booths.length > 0 ? Math.max(...booths.map(b => b.id)) + 1 : 1; // Grabs the highest booth ID and adds 1, or 1 if no booths exist
            res.status(200).json({ nextBoothID: nextId });
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

router.post("/uploadBoothImage", passport.authenticate('bearer', { session: false }), checkAdmin, upload.single("file"), (req, res) => {
    const image = req.file;
    const boothID = req.body.boothID;

    if (!boothID || !image) {
        return res.status(400).json({ error: "Booth ID and image file are required." });
    }

    uploadBoothImage(boothID, image)
        .then(imageUrl => res.status(200).json({ success: true, imageURL: imageUrl }))
        .catch(err => res.status(500).json({ success: false, error: err.message }));
});

module.exports = router;