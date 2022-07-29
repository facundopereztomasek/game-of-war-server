const willSurvive = (matrix, x, y) => {
    const liveCell = matrix[y][x] === 1 ? 1 : 0;
    const sliceFromY = Math.max(y - 1, 0);
    const sliceFromX = Math.max(x - 1, 0);
    const sliceToY = Math.min(y + 2, matrix.length);
    const sliceToX = Math.min(x + 2, matrix[0].length);

    const focusedMatrix = matrix
        .slice(sliceFromY, sliceToY)
        .map((row) => row.slice(sliceFromX, sliceToX))
        .flat()
        .filter((_) => _ === 1);

    const neighbors = focusedMatrix.length - (liveCell ? 1 : 0);

    return (neighbors === 2 && liveCell) || neighbors === 3;
};

module.exports = {
    willSurvive,
};
