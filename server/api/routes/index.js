// Index for all api routes

const express = require("express");
const router = express.Router();

// Different types of routes:
const booths = require("./booths.js");
const volunteer = require("./volunteer.js");
const admin = require("./admin.js");

router.use("/booths", booths);
router.use("/volunteer", volunteer);
router.use("/admin", admin);

module.exports = router;