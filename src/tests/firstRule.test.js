const { firstRule } = require("../services/gameService");

const A = "A";
const B = "B";
const C = "C";
const O = "0";

test("Apply team contest B3/S23 to CASE-A-Unsolvable", () => {
    const inputBoard = [
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, A, O, B, O, O, O],
        [O, O, A, O, B, O, O, O],
        [O, O, A, O, B, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
    ];

    const outputBoard = [
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, A, A, O, B, B, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
    ];
    expect(firstRule(inputBoard, [A, B])).toStrictEqual(outputBoard);
});

test("Apply team contest B3/S23 to CASE-A-Can-Solve", () => {
    const inputBoard = [
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, A, O, B, O, O, O],
        [O, O, A, O, B, O, O, O],
        [O, O, A, O, B, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, A, O, O, O],
    ];

    const outputBoard = [
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, A, A, A, B, B, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
    ];
    expect(firstRule(inputBoard, [A, B])).toStrictEqual(outputBoard);
});

test("Apply team contest B3/S23 to CASE-A-Can-Solve", () => {
    const inputBoard = [
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, A, O, B, O, O, O],
        [O, O, A, O, B, O, O, O],
        [O, O, A, O, B, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, A, O, O, O],
    ];

    const outputBoard = [
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, A, A, A, B, B, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
    ];
    expect(firstRule(inputBoard, [A, B])).toStrictEqual(outputBoard);
});

test("Apply team contest B3/S23 to CASE-B-Unsolvable", () => {
    const inputBoard = [
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, A, O, B, O, O, O],
        [O, O, A, A, B, O, O, O],
        [O, O, A, O, B, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, B, O, O],
    ];

    const outputBoard = [
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, A, A, O, O, O, O],
        [O, A, A, O, B, B, O, O],
        [O, O, A, A, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
    ];
    expect(firstRule(inputBoard, [A, B])).toStrictEqual(outputBoard);
});

test("Apply team contest B3/S23 to CASE-B-Can-Solve", () => {
    const inputBoard = [
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, A, O, B, O, O, O],
        [O, O, A, A, B, O, O, O],
        [O, O, A, O, B, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
    ];

    const outputBoard = [
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, A, A, O, O, O, O],
        [O, A, A, A, B, B, O, O],
        [O, O, A, A, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
    ];
    expect(firstRule(inputBoard, [A, B])).toStrictEqual(outputBoard);
});

test("Apply team contest B3/S23 to CASE-C-Solve", () => {
    const inputBoard = [
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, B, O, O, O],
        [O, O, A, A, B, O, O, O],
        [O, O, A, O, B, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
    ];

    const outputBoard = [
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, A, B, B, B, O, O],
        [O, O, A, A, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
    ];
    expect(firstRule(inputBoard, [A, B])).toStrictEqual(outputBoard);
});

test("Apply team contest B3/S23 to CASE-D-Solve", () => {
    const inputBoard = [
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, A, A, B, O, O, O],
        [O, O, A, B, B, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
    ];

    const outputBoard = [
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, A, B, B, O, O, O],
        [O, O, A, A, B, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
    ];
    expect(firstRule(inputBoard, [A, B])).toStrictEqual(outputBoard);
});

test("Apply team contest B3/S23 to CASE-E-Unsolvable", () => {
    const inputBoard = [
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, A, A, C, O, O, O],
        [O, O, A, C, C, O, O, O],
        [O, O, B, B, B, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
    ];

    const outputBoard = [
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, A, C, C, O, O, O],
        [O, O, A, O, C, O, O, O],
        [O, O, O, B, O, O, O, O],
        [O, O, O, B, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
    ];
    expect(firstRule(inputBoard, [A, B, C])).toStrictEqual(outputBoard);
});

test("Apply team contest B3/S23 to CASE-E-Can-Solve", () => {
    const inputBoard = [
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, A, A, C, O, O, O],
        [O, O, A, C, C, O, O, O],
        [O, O, B, B, B, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, B, O, O],
    ];

    const outputBoard = [
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, A, C, C, O, O, O],
        [O, O, A, B, C, O, O, O],
        [O, O, O, B, O, O, O, O],
        [O, O, O, B, O, O, O, O],
        [O, O, O, O, O, O, O, O],
        [O, O, O, O, O, O, O, O],
    ];
    expect(firstRule(inputBoard, [A, B, C])).toStrictEqual(outputBoard);
});
