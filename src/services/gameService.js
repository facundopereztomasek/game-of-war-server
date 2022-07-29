const willSurvive = (matrix, x, y) => {
    const liveCell = matrix[y][x] === 1;
    let neighbors = 0;
    for (let j = -1; j < 2; j++) {
        for (let i = -1; i < 2; i++) {
            if (matrix[j + y] === undefined) continue;
            if (matrix[j + y][i + x] === undefined) continue;
            if (i === 0 && j === 0) continue;
            if (matrix[j + y][i + x] === 1) neighbors++;
        }
    }
    return (neighbors === 2 && liveCell) || neighbors === 3;
};

module.exports = {
    willSurvive,
};
