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

const compete = (matrix, x, y, teamPerspective) => {
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

const dieIfRounded = (matrix, x, y, teamPerspective) => {
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

    // if (enemyNeighbors) console.log(`enemies ${enemyNeighbors}`);

    const myNeighbors =
        focusedMatrix.filter((neighbor) => neighbor === team).length - 1;

    // if (myNeighbors) console.log(`mine ${myNeighbors}`);

    if (myNeighbors < enemyNeighbors) return "die";
    if (myNeighbors > enemyNeighbors) return "live";
    if (myNeighbors === enemyNeighbors) return "tie";
};

module.exports = {
    compete,
    dieIfRounded,
};
