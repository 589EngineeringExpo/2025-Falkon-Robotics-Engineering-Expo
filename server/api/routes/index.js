// Index for all api routes

const express = require("express");
const router = express.Router();

// Different types of routes:
const booths = require("./booths.js");
const admin = require("./admin.js");

router.use("/booths", booths);
router.use("/admin", admin);

module.exports = router;