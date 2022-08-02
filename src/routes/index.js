const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");

router
    .get("/", (req, res) => {
        res.json({
            status: "ok",
        });
    })
    .post("/step", gameController.getNextStep);

module.exports = router;
