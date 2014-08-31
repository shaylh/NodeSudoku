var sudokuModule = require('./sudoku');
var keepLog = false;
var sudoku = new sudokuModule.Sudoku(keepLog);
var knownValues = {
    r1c4: 6, r2c1: 3, r2c2: 1,
    r2c3: 6, r2c9: 5, r3c3: 9,
    r3c6: 5, r3c9: 1, r4c2: 4,
    r4c5: 5, r4c8: 1, r5c1: 1,
    r5c2: 3, r5c3: 8, r5c7: 5,
    r5c8: 9, r6c2: 5, r6c5: 3,
    r6c8: 7, r7c1: 7, r7c4: 8,
    r7c7: 9, r8c1: 4, r8c7: 6,
    r8c8: 8, r8c9: 2, r9c6: 4,
    r9c9: 7
};
var result = sudoku.solve(knownValues);
console.log(result);