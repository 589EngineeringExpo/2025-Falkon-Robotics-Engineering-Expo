// /api/admin/ route handler

// IT'S IMPORTANT TO DOCUMENT ANY API ENDPOINTS VIA SWAGGER SO IT SHOWS UP IN /api-docs
/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: API endpoints for managing any authentication data (bearer tokens)
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/admin/createToken:
 *   get:
 *     summary: Create a new bearer token
 *     description: >
 *       Generates a new bearer token assigned to a specific user.  
 *       - **Only hosts** can create host tokens.  
 *       - **Admins or hosts** can create admin tokens.  
 *       - Regular users can only create user-level tokens.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: assignedTo
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the person the token is assigned to. (First Last)
 *       - in: query
 *         name: isAdmin
 *         schema:
 *           type: boolean
 *         required: true
 *         description: Whether the token should have admin privileges.
 *       - in: query
 *         name: isHost
 *         schema:
 *           type: boolean
 *         required: true
 *         description: Whether the token should have host privileges.
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
 *                   example: Token created
 *                 tokenData:
 *                   type: object
 *                   description: The generated token data
 *       400:
 *         description: Missing required query parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: assignedTo, isAdmin, and isHost query parameters are required
 *       403:
 *         description: Forbidden - insufficient privileges
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Forbidden: User is not an ADMIN or HOST"
 */

/**
 * @swagger
 * /api/admin/deleteToken:
 *   delete:
 *     summary: Delete a bearer token
 *     description: >
 *       Deletes an existing bearer token.  
 *       - **Only hosts** can delete tokens.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: The bearer token to delete.
 *     responses:
 *       200:
 *         description: Token deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token deleted
 *       400:
 *         description: Missing required query parameter
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: token is required
 *       404:
 *         description: Token not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Token not found
 *       403:
 *         description: Forbidden - insufficient privileges
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Forbidden: User is not a HOST"
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

const { createBearerToken, deleteBearerToken, findBearerToken } = require("../db/authTokens");
const { checkAdmin, checkHost } = require("../middleware/checkAdmin"); // Middleware to check admin/host status

router.get("/createToken", passport.authenticate('bearer', { session: false }), async (req, res) => {
    if (!req.query.assignedTo || !req.query.isAdmin || !req.query.isHost) {
        return res.status(400).json({ error: "assignedTo, isAdmin, and isHost query parameters are required" });
    }
    if (req.user.isAdmin === false && req.user.isHost === false) { // Only ADMIN or HOST can create ADMIN tokens
        return res.status(403).json({ error: "Forbidden: User is not an ADMIN or HOST" });
    }
    if ((req.query.isHost === "true") && (req.user.isHost === false)) { // Only HOST can create HOST tokens
        return res.status(403).json({ error: "Forbidden: User is not a HOST" });
    }
    const token = await createBearerToken(req.query.assignedTo, req.query.isAdmin, req.query.isHost);
    res.status(201).json({ message: "Token created", tokenData: token });
});

router.delete("/deleteToken", passport.authenticate('bearer', { session: false }), checkHost, async (req, res) => {
    const { token } = req.query;
    if (!token) {
        return res.status(400).json({ error: "token is required" });
    }
    if (await findBearerToken(token) === null) {
        return res.status(404).json({ error: "Token not found" });
    }
    await deleteBearerToken(token);
    res.status(200).json({ message: "Token deleted" });
});

module.exports = router;