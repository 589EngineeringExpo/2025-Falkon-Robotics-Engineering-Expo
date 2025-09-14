// /api/admin/ route handler

// IT'S IMPORTANT TO DOCUMENT ANY API ENDPOINTS VIA SWAGGER SO IT SHOWS UP IN /api-docs
/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: API endpoints for privileged actions
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
/**
 * @swagger
 * /api/admin/createBooth:
 *   post:
 *     summary: Create a new booth
 *     security:
 *      - bearerAuth: []
 *     tags: [Admin]
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
 *               - location
 *               - boothRunners
 *               - boothImage
 *               - boothCategory
 *             properties:
 *               id:
 *                 type: integer
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     x:
 *                       type: integer
 *                     y:
 *                       type: integer
 *               boothRunners:
 *                 type: array
 *                 items:
 *                   type: string
 *               boothImage:
 *                 type: string
 *                 format: uri
 *               boothCategory:
 *                 type: integer
 *                 description: 0 - Community, 1 - Food, 2 - Activities, 3 - Popups
 *               organization:
 *                 type: string
 *               menu:
 *                 type: array
 *                 items:
 *                   type: object
 *                   additionalProperties:
 *                     type: number
 *               activities:
 *                 type: object
 *                 properties:
 *                   intendedAges:
 *                     type: array
 *                     items:
 *                       type: integer
 *                     example: [0, 99]
 *                   queue:
 *                     type: integer
 *                   waitPerPerson:
 *                     type: integer
 *               popups:
 *                 type: object
 *                 properties:
 *                   startTime:
 *                     type: string
 *                     format: date-time
 *                   endTime:
 *                     type: string
 *                     format: date-time
 *     responses:
 *       201:
 *         description: Booth created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Invalid input
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
 * /api/admin/createToken:
 *   get:
 *     summary: Create a new bearer token for privileged actions
 *     security:
 *      - bearerAuth: []
 *     tags: [Admin]
 *     parameters:
 *       - in: query
 *         name: assignedTo
 *         required: true
 *         schema:
 *           type: string
 *         description: The user or entity the token is assigned to
 *     responses:
 *       201:
 *         description: Token created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 tokenData:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *       400:
 *         description: Missing assignedTo parameter
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
const passport = require("passport");
const BearerStrategy = require('passport-http-bearer').Strategy;

const { createBearerToken, findBearerToken, deleteBearerToken } = require("../db/authTokens");
const { createBooth } = require("../db/booths");

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

router.post("/createBooth", (req, res) => {
    createBooth(req.body)
        .then(booth => res.status(201).json(booth))
        .catch(err => res.status(400).json({ error: err.message }));
});

module.exports = router;