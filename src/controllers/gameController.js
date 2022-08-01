const gameService = require("../services/gameService");

const getNextStep = (width, state, teams) => {
    const matrix = state
        .match(new RegExp(`.{1,${width}}`, "g"))
        .map((_) => _.split(""));

    const firstRuleMatrix = gameService.firstRule(matrix, teams);
    const secondRuleMatrix = gameService.secondRule(firstRuleMatrix, teams);
    const newState = secondRuleMatrix.flat().join("");

    return newState;
};

module.exports = {
    getNextStep,
};
