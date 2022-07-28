const express = require("express");
const router = express.Router();

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

        for (let i = 0; i < width; i++) {
            newMatrix[i] = [];
            for (let j = 0; j < matrix[i].length; j++) {
                newMatrix[i][j] = matrix[i][j] === 0 ? 1 : 0;
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
