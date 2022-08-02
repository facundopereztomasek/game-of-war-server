const gameService = require("../services/gameService");

const getNextStep = (req, res) => {
    const { body } = req;
    const { width, state, teams } = body.board;

    const matrix = state
        .match(new RegExp(`.{1,${width}}`, "g"))
        .map((_) => _.split(""));

    const firstRuleMatrix = gameService.firstRule(matrix, teams);
    const secondRuleMatrix = gameService.secondRule(firstRuleMatrix, teams);
    const newState = secondRuleMatrix.flat().join("");

    res.json({
        board: {
            width,
            state: newState,
            teams,
        },
    });
};

module.exports = {
    getNextStep,
};
