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
const passport = require("passport");
const BearerStrategy = require('passport-http-bearer').Strategy;
//const { createBearerToken, findBearerToken, deleteBearerToken } = require("../db/authTokens");
//the stuff above will be done by "gods" itll be in the god.js file

const { createVolunteer, getAllvolunteer, getVolunteerById } = require("../db/volunteers");
//im assuming this just connects it?
router.get("/", (req, res) => {
    res.json({ message: "Volunteer API endpoint!"});
});
//get all volunteer func will be god only 
//same with get 1 volunteer

module.exports = router;

