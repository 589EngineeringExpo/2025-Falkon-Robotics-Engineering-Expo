// Index for all api routes

const express = require("express");
const router = express.Router();

// Different types of routes:
const booths = require("./booths.js");
const volunteer = require("./volunteer.js");

router.use("/booths", booths);
router.use("/volunteer", volunteer);

module.exports = router;