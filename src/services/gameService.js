const underpopulated = (neighbors, live, sameTeam) => {
    return neighbors < 2 && live && sameTeam ? "underpopulated" : null;
};

const overpopulated = (neighbors, live, sameTeam) => {
    return neighbors > 3 && live && sameTeam ? "underpopulated" : null;
};

const strongSurvive = (neighbors, live, sameTeam) => {
    return neighbors === 3 && live && sameTeam ? "strong-survive" : null;
};

const weakSurvive = (neighbors, live, sameTeam) => {
    return neighbors === 2 && live && sameTeam ? "weak-survive" : null;
};

const reproduction = (neighbors, live, sameTeam) => {
    return neighbors === 3 && !sameTeam ? "reproduction" : null;
};

const _compete = (matrix, x, y, teamPerspective) => {
    const team = matrix[y][x];
    const live = team !== "0";
    const sliceFromY = Math.max(y - 1, 0);
    const sliceFromX = Math.max(x - 1, 0);
    const sliceToY = Math.min(y + 2, matrix.length);
    const sliceToX = Math.min(x + 2, matrix[0].length);

    const focusedMatrix = matrix
        .slice(sliceFromY, sliceToY)
        .map((row) => row.slice(sliceFromX, sliceToX))
        .flat();

    const neighbors =
        focusedMatrix.filter((cell) => cell === teamPerspective).length -
        (team === teamPerspective);
    const action =
        underpopulated(neighbors, live, team === teamPerspective) ||
        overpopulated(neighbors, live, team === teamPerspective) ||
        strongSurvive(neighbors, live, team === teamPerspective) ||
        weakSurvive(neighbors, live, team === teamPerspective) ||
        reproduction(neighbors, live, team === teamPerspective) ||
        "none";

    return {
        team: teamPerspective,
        action,
    };
};

const _dieIfRounded = (matrix, x, y, teamPerspective) => {
    const team = matrix[y][x];

    if (team === "0" || team === teamPerspective) return "nothing";
    const sliceFromY = Math.max(y - 1, 0);
    const sliceFromX = Math.max(x - 1, 0);
    const sliceToY = Math.min(y + 2, matrix.length);
    const sliceToX = Math.min(x + 2, matrix[0].length);

    const focusedMatrix = matrix
        .slice(sliceFromY, sliceToY)
        .map((row) => row.slice(sliceFromX, sliceToX))
        .flat();

    const enemyNeighbors = focusedMatrix.filter(
        (neighbor) => neighbor === teamPerspective
    ).length;

    const myNeighbors = focusedMatrix.filter(
        (neighbor) => neighbor === team
    ).length;

    if (myNeighbors < enemyNeighbors) return "die";
    if (myNeighbors > enemyNeighbors) return "live";
    if (myNeighbors === enemyNeighbors) return "tie";
};

const _getTeamCellsSorted = (matrix, teams) => {
    const teamCells = [];

    teams.map((team) => {
        const amount = matrix.flat().filter((_) => _ === team).length;
        if (!teamCells[amount]) teamCells[amount] = [];
        teamCells[amount].push(team);
    });

    const teamCellsSorted = teamCells.filter((_) => _ !== undefined).reverse();

    return teamCellsSorted;
};

const firstRule = (matrix, teams) => {
    const firstRuleMatrix = [];
    const teamCellsSorted = _getTeamCellsSorted(matrix, teams);
    for (let j = 0; j < matrix.length; j++) {
        firstRuleMatrix[j] = [];
        for (let i = 0; i < matrix[j].length; i++) {
            let cellContent = null;

            const results = teams.map((team) => _compete(matrix, i, j, team));

            const rReproductionStrongSurvival = results.filter((_) =>
                ["strong-survive", "reproduction"].includes(_.action)
            );

            if (rReproductionStrongSurvival.length > 1) {
                for (let amount in teamCellsSorted) {
                    const teams = teamCellsSorted[amount];
                    const winners = rReproductionStrongSurvival
                        .map(({ team }) => {
                            return teams.includes(team) ? team : null;
                        })
                        .filter((_) => _ !== null);
                    cellContent = winners.length > 1 ? "0" : winners[0];
                    if (cellContent === undefined) continue;
                    break;
                }
            }

            if (cellContent) {
                firstRuleMatrix[j][i] = cellContent;
                continue;
            }

            if (rReproductionStrongSurvival.length === 1) {
                firstRuleMatrix[j][i] = rReproductionStrongSurvival[0].team;
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
                    cellContent = winners.length > 1 ? "0" : winners[0];
                    break;
                }
            }

            if (cellContent) {
                firstRuleMatrix[j][i] = cellContent;
                continue;
            }

            if (rStrongSurvival.length === 1) {
                firstRuleMatrix[j][i] = rStrongSurvival[0].team;
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
                    break;
                }
            }

            if (rWeakSurvival.length === 1) {
                firstRuleMatrix[j][i] = rWeakSurvival[0].team;
                continue;
            }

            firstRuleMatrix[j][i] = "0";
        }
    }
    return firstRuleMatrix;
};

const secondRule = (matrix, teams) => {
    const teamCellsSorted = _getTeamCellsSorted(matrix, teams);
    const secondRuleMatrix = JSON.parse(JSON.stringify(matrix));
    for (let j = 0; j < matrix.length; j++) {
        for (let i = 0; i < matrix[j].length; i++) {
            for (let teamPerspective of teams) {
                const result = _dieIfRounded(matrix, i, j, teamPerspective);
                const team = matrix[j][i];

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
                        cellContent =
                            winners.length > 1 || winners[0] === teamPerspective
                                ? "0"
                                : team;
                        if (cellContent === undefined) continue;

                        break;
                    }
                    secondRuleMatrix[j][i] = cellContent;
                    break;
                }
            }
        }
    }
    return secondRuleMatrix;
};

module.exports = {
    _dieIfRounded,
    secondRule,
    firstRule,
};
