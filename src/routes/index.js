const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");

router
    .get("/", (req, res) => {
        res.json({
            status: "ok",
        });
    })
    .post("/step", (req, res) => {
        const { body } = req;
        const { width, state, teams } = body.board;

        const newState = gameController.getNextStep(width, state, teams);

        res.json({
            board: {
                width,
                state: newState,
                teams,
            },
        });
    });

module.exports = router;
