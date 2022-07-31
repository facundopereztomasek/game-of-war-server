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

        const firstRuleMatrix = [];

        for (let j = 0; j < width; j++) {
            firstRuleMatrix[j] = [];
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
                    firstRuleMatrix[j][i] = cellContent;
                    continue;
                }

                if (rReproductionStrongSurvival.length === 1) {
                    firstRuleMatrix[j][i] = rReproductionStrongSurvival[0].team;

                    console.log(
                        `reproduction - strong survive: ${firstRuleMatrix[j][i]} (${i},${j})`
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
                    firstRuleMatrix[j][i] = cellContent;
                    continue;
                }

                if (rStrongSurvival.length === 1) {
                    firstRuleMatrix[j][i] = rStrongSurvival[0].team;
                    console.log(
                        `strong survive: ${firstRuleMatrix[j][i]} (${i},${j})`
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

                        firstRuleMatrix[j][i] =
                            winners.length > 1 ? "0" : winners[0];
                        console.log(
                            `weak survive contested: ${firstRuleMatrix[j][i]} (${i},${j})`
                        );
                        break;
                    }
                }

                if (rWeakSurvival.length === 1) {
                    firstRuleMatrix[j][i] = rWeakSurvival[0].team;
                    console.log(
                        `weak survive: ${firstRuleMatrix[j][i]} (${i},${j})`
                    );
                    continue;
                }

                firstRuleMatrix[j][i] = "0";
            }
        }

        const secondRuleMatrix = JSON.parse(JSON.stringify(firstRuleMatrix));

        for (let j = 0; j < width; j++) {
            for (let i = 0; i < matrix[j].length; i++) {
                for (let teamPerspective of teams) {
                    const result = gameService.dieIfRounded(
                        firstRuleMatrix,
                        i,
                        j,
                        teamPerspective
                    );
                    const team = firstRuleMatrix[j][i];

                    if (result === "live") break;

                    if (result === "die") {
                        secondRuleMatrix[j][i] = "0";
                        break;
                    }
                    if (result === "tie") {
                        for (let amount in teamCellsSorted) {
                            const teams = teamCellsSorted[amount];
                            const winners = [team, teamPerspective]
                                .map((team) => {
                                    return teams.includes(team) ? team : null;
                                })
                                .filter((_) => _ !== null);
                            cellContent = winners.length > 1 ? "0" : winners[0];
                            if (cellContent === undefined) continue;

                            break;
                        }
                        secondRuleMatrix[j][i] = cellContent;
                        break;
                    }
                }
            }
        }

        const newState = secondRuleMatrix.flat().join("");

        res.json({
            board: {
                width,
                state: newState,
                teams,
            },
        });
    });

module.exports = router;
