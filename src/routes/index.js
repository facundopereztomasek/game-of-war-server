const express = require("express");
const router = express.Router();
const gameService = require("../services/gameService");

router
    .get("/", (req, res) => {
        res.json({
            status: "ok",
        });
    })
    .post("/step", (req, res) => {
        const { body } = req;
        const { width, state } = body.board;

        const matrix = state
            .match(new RegExp(`.{1,${width}}`, "g"))
            .map((_) => _.split("").map((_) => Number(_)));

        const newMatrix = [];

        for (let j = 0; j < width; j++) {
            newMatrix[j] = [];
            for (let i = 0; i < matrix[j].length; i++) {
                newMatrix[j][i] = gameService.willSurvive(matrix, i, j) ? 1 : 0;
            }
        }

        const newState = newMatrix.flat().join("");

        res.json({
            board: {
                width,
                state: newState,
            },
        });
    });

module.exports = router;
