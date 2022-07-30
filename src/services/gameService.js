const getWinnersForCell = (matrix, x, y) => {
    const team = matrix[y][x];
    const liveCell = team !== "0";
    const sliceFromY = Math.max(y - 1, 0);
    const sliceFromX = Math.max(x - 1, 0);
    const sliceToY = Math.min(y + 2, matrix.length);
    const sliceToX = Math.min(x + 2, matrix[0].length);

    const focusedMatrix = matrix
        .slice(sliceFromY, sliceToY)
        .map((row) => row.slice(sliceFromX, sliceToX))
        .flat();

    const neighbors = focusedMatrix.reduce((n, t) => {
        if (t === "0") return n;
        n[t] = (n[t] || 0) + 1;
        return n;
    }, {});

    console.log(`(${x},${y}): ${team === "0" ? "empty" : team}`);
    if (liveCell) neighbors[team]--;
    console.log(neighbors);

    const podium = {};

    Object.keys(neighbors).forEach((t) => {
        const amount = neighbors[t];
        if (!podium[amount]) podium[amount] = [];
        podium[amount].push(t);
    });

    const positions = Object.keys(podium).sort((a, b) => b - a);

    const first = positions[0];

    console.log(positions);
    // let winnerTeam;
    // if (podium[first] && podium[first].length === 1) {
    //     winnerTeam = podium[first][0];
    //     console.log("winner team: " + winnerTeam);
    // } else if (podium[first] && podium[first].length > 1) {
    //     winnerTeam = "?";
    // } else {
    //     winnerTeam = null;
    //     console.log("no winnerTeam");
    // }

    // if (liveCell && winnerTeam) {
    //     const result =
    //         neighbors[winnerTeam] === 2 || neighbors[winnerTeam] === 3
    //             ? winnerTeam
    //             : "0";
    //     console.log(
    //         `Cell is live and the winner is ${winnerTeam}, maintaining or converting to ${result}! `
    //     );
    //     return result;
    // }

    // if (winnerTeam) {
    //     const result = neighbors[winnerTeam] === 3 ? winnerTeam : "0";
    //     console.log(
    //         `Cell is dead and the winner is ${winnerTeam}, creating ${result}! `
    //     );
    //     return result;
    // }

    // console.log("Cell is dead and it will keep the same");

    // return "0";
};

module.exports = {
    getWinnersForCell,
};
