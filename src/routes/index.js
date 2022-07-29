const express = require("express");
const router = express.Router();

const encodeBoard = (board) => {
    const binaryBytes = board.match(/.{1,8}/g);
    const bytes = binaryBytes.map((_) => parseInt(_, 2));

    const text = bytes.map((_) => String.fromCharCode(_)).join("");

    let buff = Buffer.from(text);
    let encodedBoard = buff.toString("base64");

    return encodedBoard;
};

const decodeBoard = (encodedBoard) => {
    console.log(encodedBoard);
    const decoded = Buffer.from(encodedBoard, "base64").toString();
    const binaryBytes2 = decoded.split("").map((_) => _.charCodeAt());
    const board = binaryBytes2
        .map((_) => _.toString(2).padStart(8, 0))
        .join("");

    console.log(encodedBoard);

    return board;
};

router
    .get("/", (req, res) => {
        res.json({
            status: "ok",
        });
    })
    .post("/step", (req, res) => {
        const { body } = req;
        const { width, state } = body.board;
        console.log(state);
        const matrix = decodeBoard(state)
            .match(new RegExp(`.{1,${width}}`, "g"))
            .map((_) => _.split("").map((_) => Number(_)));

        const newMatrix = [];

        for (let i = 0; i < width; i++) {
            console.log(i);
            newMatrix[i] = [];
            for (let j = 0; j < matrix[i].length; j++) {
                newMatrix[i][j] = matrix[i][j] === 0 ? 1 : 0;
            }
        }

        const newState = newMatrix.flat().join("");

        res.json({
            board: {
                width,
                state: encodeBoard(newState),
            },
        });
    });

module.exports = router;
