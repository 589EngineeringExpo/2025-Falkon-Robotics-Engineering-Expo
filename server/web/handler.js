const express = require("express");
const router = express.Router();

router.use(express.static(__dirname + "/public")); // Links all static files in /public to the root path

router.get("/", (req, res) => {
    res.sendFile("index.html", { root: __dirname + "/public" });
});

module.exports = router;