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

const { createBooth, getAllBooths, getBoothById } = require("../db/booths");

router.get("/", (req, res) => {
    res.json({ message: "Booths API endpoint!"});
});

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

module.exports = router;