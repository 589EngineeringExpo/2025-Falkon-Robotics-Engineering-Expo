// Index for all api routes

const express = require("express");
const router = express.Router();

// Different types of routes:
const booths = require("./booths.js");

router.use("/booths", booths);

module.exports = router;