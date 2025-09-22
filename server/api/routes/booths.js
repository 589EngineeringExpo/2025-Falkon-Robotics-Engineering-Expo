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
 * /api/booths/:
 *   get:
 *     summary: Booths API endpoint info
 *     tags: [Booths]
 *     responses:
 *       200:
 *         description: Returns a message about the Booths API endpoint
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
 *         Volunteer name: id
 *         schema:
 *           type: string
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