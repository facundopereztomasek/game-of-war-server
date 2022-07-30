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
        const { width, state, teams } = body.board;

        const matrix = state
            .match(new RegExp(`.{1,${width}}`, "g"))
            .map((_) => _.split(""));

        const teamCells = [];

        teams.map((team) => {
            const amount = matrix.flat().filter((_) => _ === team).length;
            if (!teamCells[amount]) teamCells[amount] = [];
            teamCells[amount].push(team);
        });

        const teamCellsSorted = teamCells
            .filter((_) => _ !== undefined)
            .reverse();

        const newMatrix = [];

        for (let j = 0; j < width; j++) {
            newMatrix[j] = [];
            for (let i = 0; i < matrix[j].length; i++) {
                let cellContent = null;

                const results = teams.map((team) =>
                    gameService.compete(matrix, i, j, team)
                );

                // console.log([...results, `(${i},${j})`]);

                const rReproductionStrongSurvival = results.filter((_) =>
                    ["strong-survive", "reproduction"].includes(_.action)
                );

                // console.log([...rReproductionStrongSurvival, `(${i},${j})`]);

                if (rReproductionStrongSurvival.length > 1) {
                    // console.log(teamCells);
                    for (let amount in teamCellsSorted) {
                        const teams = teamCellsSorted[amount];
                        const winners = rReproductionStrongSurvival
                            .map(({ team }) => {
                                return teams.includes(team) ? team : null;
                            })
                            .filter((_) => _ !== null);
                        console.log(`REP STR SUR teams: ${teams}`);
                        console.log(`REP STR SUR winners: ${winners}`);
                        cellContent = winners.length > 1 ? "0" : winners[0];
                        if (cellContent === undefined) continue;
                        console.log(
                            `reproduction - strong survive contested: ${cellContent}`
                        );
                        break;
                    }
                }

                if (cellContent) {
                    newMatrix[j][i] = cellContent;
                    continue;
                }

                if (rReproductionStrongSurvival.length === 1) {
                    newMatrix[j][i] = rReproductionStrongSurvival[0].team;

                    console.log(
                        `reproduction - strong survive: ${newMatrix[j][i]} (${i},${j})`
                    );
                    continue;
                }

                const rStrongSurvival = results.filter((_) =>
                    ["strong-survive"].includes(_.action)
                );

                if (rStrongSurvival.length > 1) {
                    for (let amount in teamCellsSorted) {
                        const teams = teamCellsSorted[amount];
                        const winners = rStrongSurvival
                            .map(({ team }) => {
                                return teams.includes(team) ? team : null;
                            })
                            .filter((_) => _ !== null);
                        console.log(`STR SUR teams: ${teams}`);
                        console.log(`STR SUR winners: ${winners}`);
                        cellContent = winners.length > 1 ? "0" : winners[0];

                        console.log(`strong survive contested: ${cellContent}`);
                        break;
                    }
                }

                if (cellContent) {
                    newMatrix[j][i] = cellContent;
                    continue;
                }

                if (rStrongSurvival.length === 1) {
                    newMatrix[j][i] = rStrongSurvival[0].team;
                    console.log(
                        `strong survive: ${newMatrix[j][i]} (${i},${j})`
                    );
                    continue;
                }

                const rWeakSurvival = results.filter((_) =>
                    ["weak-survive"].includes(_.action)
                );

                if (rWeakSurvival.length > 1) {
                    for (let teams of teamCells) {
                        const winners = rWeakSurvival.map(({ team }) => {
                            return teams.includes(team);
                        });

                        newMatrix[j][i] = winners.length > 1 ? "0" : winners[0];
                        console.log(
                            `weak survive contested: ${newMatrix[j][i]} (${i},${j})`
                        );
                        break;
                    }
                }

                if (rWeakSurvival.length === 1) {
                    newMatrix[j][i] = rWeakSurvival[0].team;
                    console.log(`weak survive: ${newMatrix[j][i]} (${i},${j})`);
                    continue;
                }

                newMatrix[j][i] = "0";
            }
        }

        const newState = newMatrix.flat().join("");

        res.json({
            board: {
                width,
                state: newState,
                teams,
            },
        });
    });

module.exports = router;
