const { secondRule } = require("../services/gameService");

const A = "A";
const B = "B";
const C = "C";
const O = "0";

test("Apply neighbor enemies rule CASE-A-Unsolvable", () => {
    const inputBoard = [
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, A, B, O, O, O],
        [O, O, O, A, B, O, O, O],
        [O, O, O, A, B, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
    ];

    const outputBoard = [
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
    ];

    expect(secondRule(inputBoard, [A, B])).toStrictEqual(outputBoard);
});

test("Apply neighbor enemies rule CASE-A-Can-Solve", () => {
    const inputBoard = [
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, A, B, O, O, O],
        [O, O, O, A, B, O, O, O],
        [O, O, O, A, B, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, A, O],
    ];

    const outputBoard = [
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, A, O, O, O, O],
        [O, O, O, A, O, O, O, O],
        [O, O, O, A, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, A, O],
    ];

    expect(secondRule(inputBoard, [A, B])).toStrictEqual(outputBoard);
});

test("Apply neighbor enemies rule CASE-A-Can-Solve Third team is bigger", () => {
    const inputBoard = [
        [C, C, C, C, C, C, C, C],
        [O, O, O, O, O, O, O, O],
        [O, O, O, A, B, O, O, O],
        [O, O, O, A, B, O, O, O],
        [O, O, O, A, B, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, A, O],
    ];

    const outputBoard = [
        [C, C, C, C, C, C, C, C],
        [O, O, O, O, O, O, O, O],
        [O, O, O, A, O, O, O, O],
        [O, O, O, A, O, O, O, O],
        [O, O, O, A, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, A, O],
    ];

    expect(secondRule(inputBoard, [A, B])).toStrictEqual(outputBoard);
});
