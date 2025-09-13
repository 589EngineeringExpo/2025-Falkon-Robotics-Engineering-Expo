// /api/booths/ route handler

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "Booths API endpoint!"});
});

module.exports = router;