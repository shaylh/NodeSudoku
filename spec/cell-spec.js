var cellModule = require('./../src/cell');

var cell;

describe('Cell creation', function () {
    it('should create cell with correct coordinates', function () {
        var expectedCoords = {row: 1, col: 2, block: 3},
            calculatedCoords;

        cell = new cellModule.Cell(1, 2, 3);
        calculatedCoords = cell._coord;

        expect(calculatedCoords).toEqual(expectedCoords);
    });

    it('should create a cell with 9 options and no value if no value is passed to constructor', function () {
        var expectedOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9],
            calculatedOptions,
            calculatedValue;

        cell = new cellModule.Cell(1, 2, 3);
        calculatedOptions = cell.getOptions();
        calculatedValue = cell.getValue();

        expect(calculatedOptions).toEqual(expectedOptions);
        expect(calculatedValue).toBeUndefined();
    });

    it('should create a cell with no options and a value if value is passed to constructor', function () {
        var expectedValue = 4,
            calculatedOptions,
            calculatedValue;

        cell = new cellModule.Cell(1, 2, 3, expectedValue);
        calculatedOptions = cell.getOptions();
        calculatedValue = cell.getValue();

        expect(calculatedOptions).toBeNull();
        expect(calculatedValue).toBe(expectedValue);
    });
});

describe("Cell functions", function () {

    beforeEach(function () {
        cell = new cellModule.Cell(1, 2, 3);
    });

    it('should remove option upon request', function () {
        var optionToRemove = 1,
            expectedOptions = [2, 3, 4, 5, 6, 7, 8, 9],
            calculatedOptions;

        cell.removeOption(optionToRemove);
        calculatedOptions = cell.getOptions();

        expect(calculatedOptions).toEqual(expectedOptions);
    });

    it('should set remaining option as value if only one option remains', function () {
        var optionsToRemove = [2, 3, 4, 5, 6, 7, 8, 9],
            expectedValue = 1,
            calculatedValue;

        optionsToRemove.forEach(function (option) {
            cell.removeOption(option);
        });

        calculatedValue = cell.getValue();

        expect(calculatedValue).toEqual(expectedValue);
    });

    describe("Neighboring cells", function () {
        var cellSameRow = new cellModule.Cell(1, 1, 1),
            cellSameCol = new cellModule.Cell(4, 2, 2),
            cellSameBlock = new cellModule.Cell(2, 7, 3);

        it('isSameRow', function () {
            expect(cell.isSameRow(cellSameRow)).toBeTruthy();
            expect(cell.isSameRow(cellSameCol)).toBeFalsy();
            expect(cell.isSameRow(cellSameBlock)).toBeFalsy();
        });

        it('isSameCol', function () {
            expect(cell.isSameCol(cellSameCol)).toBeTruthy();
            expect(cell.isSameCol(cellSameRow)).toBeFalsy();
            expect(cell.isSameCol(cellSameBlock)).toBeFalsy();
        });

        it('isSameBlock', function () {
            expect(cell.isSameBlock(cellSameBlock)).toBeTruthy();
            expect(cell.isSameBlock(cellSameRow)).toBeFalsy();
            expect(cell.isSameBlock(cellSameCol)).toBeFalsy();
        });

        it('isNeighbor', function () {
            expect(cell.isNeighbor(cellSameBlock)).toBeTruthy();
            expect(cell.isNeighbor(cellSameRow)).toBeTruthy();
            expect(cell.isNeighbor(cellSameCol)).toBeTruthy();
        });

    });
});