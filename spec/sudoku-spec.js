var sudokuModule = require('./../src/sudoku');


describe("Sudoku object initialization", function () {

    beforeEach(function () {
        this.sudoku = new sudokuModule.Sudoku(false);
    })

    it("should be defined", function () {
        expect(this.sudoku).toBeDefined();
    });

    it('should solve game correctly if possible', function () {
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
        var result = this.sudoku.solve(knownValues);
        expect(result.success).toBeTruthy();
        expect(JSON.stringify(result.output)).toEqual( '[{"_coord":{"row":1,"col":1,"block":1},"_options":null,"_value":5},{"_coord":{"row":1,"col":2,"block":1},"_options":null,"_value":7},{"_coord":{"row":1,"col":3,"block":1},"_options":null,"_value":4},{"_coord":{"row":1,"col":4,"block":2},"_options":null,"_value":6},{"_coord":{"row":1,"col":5,"block":2},"_options":null,"_value":8},{"_coord":{"row":1,"col":6,"block":2},"_options":null,"_value":1},{"_coord":{"row":1,"col":7,"block":3},"_options":null,"_value":3},{"_coord":{"row":1,"col":8,"block":3},"_options":null,"_value":2},{"_coord":{"row":1,"col":9,"block":3},"_options":null,"_value":9},{"_coord":{"row":2,"col":1,"block":1},"_options":null,"_value":3},{"_coord":{"row":2,"col":2,"block":1},"_options":null,"_value":1},{"_coord":{"row":2,"col":3,"block":1},"_options":null,"_value":6},{"_coord":{"row":2,"col":4,"block":2},"_options":null,"_value":7},{"_coord":{"row":2,"col":5,"block":2},"_options":null,"_value":2},{"_coord":{"row":2,"col":6,"block":2},"_options":null,"_value":9},{"_coord":{"row":2,"col":7,"block":3},"_options":null,"_value":8},{"_coord":{"row":2,"col":8,"block":3},"_options":null,"_value":4},{"_coord":{"row":2,"col":9,"block":3},"_options":null,"_value":5},{"_coord":{"row":3,"col":1,"block":1},"_options":null,"_value":2},{"_coord":{"row":3,"col":2,"block":1},"_options":null,"_value":8},{"_coord":{"row":3,"col":3,"block":1},"_options":null,"_value":9},{"_coord":{"row":3,"col":4,"block":2},"_options":null,"_value":3},{"_coord":{"row":3,"col":5,"block":2},"_options":null,"_value":4},{"_coord":{"row":3,"col":6,"block":2},"_options":null,"_value":5},{"_coord":{"row":3,"col":7,"block":3},"_options":null,"_value":7},{"_coord":{"row":3,"col":8,"block":3},"_options":null,"_value":6},{"_coord":{"row":3,"col":9,"block":3},"_options":null,"_value":1},{"_coord":{"row":4,"col":1,"block":4},"_options":null,"_value":6},{"_coord":{"row":4,"col":2,"block":4},"_options":null,"_value":4},{"_coord":{"row":4,"col":3,"block":4},"_options":null,"_value":7},{"_coord":{"row":4,"col":4,"block":5},"_options":null,"_value":9},{"_coord":{"row":4,"col":5,"block":5},"_options":null,"_value":5},{"_coord":{"row":4,"col":6,"block":5},"_options":null,"_value":8},{"_coord":{"row":4,"col":7,"block":6},"_options":null,"_value":2},{"_coord":{"row":4,"col":8,"block":6},"_options":null,"_value":1},{"_coord":{"row":4,"col":9,"block":6},"_options":null,"_value":3},{"_coord":{"row":5,"col":1,"block":4},"_options":null,"_value":1},{"_coord":{"row":5,"col":2,"block":4},"_options":null,"_value":3},{"_coord":{"row":5,"col":3,"block":4},"_options":null,"_value":8},{"_coord":{"row":5,"col":4,"block":5},"_options":null,"_value":4},{"_coord":{"row":5,"col":5,"block":5},"_options":null,"_value":7},{"_coord":{"row":5,"col":6,"block":5},"_options":null,"_value":2},{"_coord":{"row":5,"col":7,"block":6},"_options":null,"_value":5},{"_coord":{"row":5,"col":8,"block":6},"_options":null,"_value":9},{"_coord":{"row":5,"col":9,"block":6},"_options":null,"_value":6},{"_coord":{"row":6,"col":1,"block":4},"_options":null,"_value":9},{"_coord":{"row":6,"col":2,"block":4},"_options":null,"_value":5},{"_coord":{"row":6,"col":3,"block":4},"_options":null,"_value":2},{"_coord":{"row":6,"col":4,"block":5},"_options":null,"_value":1},{"_coord":{"row":6,"col":5,"block":5},"_options":null,"_value":3},{"_coord":{"row":6,"col":6,"block":5},"_options":null,"_value":6},{"_coord":{"row":6,"col":7,"block":6},"_options":null,"_value":4},{"_coord":{"row":6,"col":8,"block":6},"_options":null,"_value":7},{"_coord":{"row":6,"col":9,"block":6},"_options":null,"_value":8},{"_coord":{"row":7,"col":1,"block":7},"_options":null,"_value":7},{"_coord":{"row":7,"col":2,"block":7},"_options":null,"_value":2},{"_coord":{"row":7,"col":3,"block":7},"_options":null,"_value":1},{"_coord":{"row":7,"col":4,"block":8},"_options":null,"_value":8},{"_coord":{"row":7,"col":5,"block":8},"_options":null,"_value":6},{"_coord":{"row":7,"col":6,"block":8},"_options":null,"_value":3},{"_coord":{"row":7,"col":7,"block":9},"_options":null,"_value":9},{"_coord":{"row":7,"col":8,"block":9},"_options":null,"_value":5},{"_coord":{"row":7,"col":9,"block":9},"_options":null,"_value":4},{"_coord":{"row":8,"col":1,"block":7},"_options":null,"_value":4},{"_coord":{"row":8,"col":2,"block":7},"_options":null,"_value":9},{"_coord":{"row":8,"col":3,"block":7},"_options":null,"_value":3},{"_coord":{"row":8,"col":4,"block":8},"_options":null,"_value":5},{"_coord":{"row":8,"col":5,"block":8},"_options":null,"_value":1},{"_coord":{"row":8,"col":6,"block":8},"_options":null,"_value":7},{"_coord":{"row":8,"col":7,"block":9},"_options":null,"_value":6},{"_coord":{"row":8,"col":8,"block":9},"_options":null,"_value":8},{"_coord":{"row":8,"col":9,"block":9},"_options":null,"_value":2},{"_coord":{"row":9,"col":1,"block":7},"_options":null,"_value":8},{"_coord":{"row":9,"col":2,"block":7},"_options":null,"_value":6},{"_coord":{"row":9,"col":3,"block":7},"_options":null,"_value":5},{"_coord":{"row":9,"col":4,"block":8},"_options":null,"_value":2},{"_coord":{"row":9,"col":5,"block":8},"_options":null,"_value":9},{"_coord":{"row":9,"col":6,"block":8},"_options":null,"_value":4},{"_coord":{"row":9,"col":7,"block":9},"_options":null,"_value":1},{"_coord":{"row":9,"col":8,"block":9},"_options":null,"_value":3},{"_coord":{"row":9,"col":9,"block":9},"_options":null,"_value":7}]');
    });

    it('should not solve game if it\'s not possible', function () {
        var knownValues = {
            r1c4: 6, r2c1: 3, r2c2: 1,
            r2c3: 6, r2c9: 5, r3c3: 9,
            r3c6: 5, r3c9: 1, r4c2: 4,
            r4c5: 5, r4c8: 1, r5c1: 1,
            r8c8: 8, r8c9: 2, r9c6: 4,
            r9c9: 7
        };
        var result = this.sudoku.solve(knownValues);
        expect(result.success).toBeFalsy();
    });

});

