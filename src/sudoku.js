var cellModule = require('./cell.js');

module.exports.Sudoku = function (log, knownValues) {
    this._cells = [];
    this._log = log;
    this._round = 0;
    this._changes = 0;
    this.init(knownValues);
};

module.exports.Sudoku.prototype = {
    init: function (knownValues) {
        var r, c, b;

        if (!knownValues) {
            return''
        }

        this._cells = [];
        for (r = 1; r <= 9; r++) {
            for (c = 1; c <= 9; c++) {
                b = this.getBlockByRowAndColumn(r, c);

                this._cells.push(new cellModule.Cell(r, c, b, knownValues[this.getCellName(r, c)]));
            }
        }
    },
    getCellName: function (r, c) {
        return 'r' + r + 'c' + c;
    },
    getBlockByRowAndColumn: function (r, c) {
        if (r <= 3 && c <= 3) {
            return 1;
        } else if (r <= 3 && c <= 6) {
            return 2;
        } else if (r <= 3 && c <= 9) {
            return 3;
        } else if (r <= 6 && c <= 3) {
            return 4;
        } else if (r <= 6 && c <= 6) {
            return 5;
        } else if (r <= 6 && c <= 9) {
            return 6;
        } else if (r <= 9 && c <= 3) {
            return 7;
        } else if (r <= 9 && c <= 6) {
            return 8;
        } else {
            return 9;
        }
    },
    playOnce: function () {
        var somethingHasChanged = false;
        this._log && console.log('Round', ++this._round);
        this._cells.forEach(function (cell) {
            if (this.checkCell(cell)) {
                somethingHasChanged = true;
            }
        }.bind(this));

        if (!somethingHasChanged/* || round > 10*/) {
            console.warn('Oh-oh, made no progress this round, quitting...');
            this.printGame();
            return false;
        } else if (!this.checkGame()) {
            return this.playOnce();
        } else {
            this.printGame();
            return true;
        }

        return false;
    },
    checkCell: function (cell) {
        var somethingHasChanged = false;

        if (cell.getValue()) {
            return false;
        }

        if (this.checkCellValue(cell)) {
            somethingHasChanged = true;
        }

        if (this.checkCellOptions(cell)) {
            somethingHasChanged = true;
        }

        return somethingHasChanged;
    },
    /**
     * For each of the cell's options, this function will test if this option
     * is already set as value somewhere in this row, column or block.
     * If it is, we know that this option CANNOT be this cell's value, thus removing the option.
     *
     * @param cell
     * @returns {boolean}
     */
    checkCellValue: function (cell) {
        var options = cell.getOptions(),
            somethingHasChanged = false;

        this._cells.forEach(function (cell2) {
            var cell2Value = cell2.getValue();

            if (cell === cell2) {
                return;
            }

            if (!cell2Value) {
                return;
            }

            if (cell.isNeighbor(cell2)) {
                options && options.forEach(function (option) {
                    if (cell.isOptionPresentInAnotherCell(option, cell2)) {
                        cell.removeOption(cell2Value);
                        this._changes++;
                        somethingHasChanged = true;
                    }
                }.bind(this));
            }
        }.bind(this));

        return somethingHasChanged;
    },
    /**
     * For each of the cell's options, this function will test if this option
     * can be somewhere else in this row, column or block.
     * If not, we know that this option MUST be this cell's value
     *
     * @param cell
     * @returns {boolean}
     */
    checkCellOptions: function (cell) {
        var options = cell.getOptions(),
            somethingHasChanged = false;

        options && options.forEach(function (option) {
            var optionPresentInRow = false,
                optionPresentInCol = false,
                optionPresentInBlock = false;

            this._cells.forEach(function (cell2) {

                if (cell === cell2) {
                    return;
                }

                if (cell.isSameRow(cell2)) {
                    if (cell.isOptionPresentInAnotherCell(option, cell2)) {
                        optionPresentInRow = true;
                    }
                }

                if (cell.isSameCol(cell2)) {
                    if (cell.isOptionPresentInAnotherCell(option, cell2)) {
                        optionPresentInCol = true;
                    }
                }

                if (cell.isSameBlock(cell2)) {
                    if (cell.isOptionPresentInAnotherCell(option, cell2)) {
                        optionPresentInBlock = true;
                    }
                }
            }.bind(this));

            if (!optionPresentInRow || !optionPresentInCol || !optionPresentInBlock) {
                cell.setValue(option);
                this._changes++;
                somethingHasChanged = true;
            }

        }.bind(this));

        return somethingHasChanged;
    },
    printGame: function () {
        var table = ' _______________________________________________________________________\n';

        table += '|       |       |       |       |       |       |       |       |       |\n';
        this._cells.forEach(function (cell, i) {
            var value = cell.getValue(),
                options = cell.getOptions();

            if (value) {
                table += '|   ' + value + '   ';
            } else if (options.length === 2) {
                table += '|  ' + options + '  ';
            } else if (options.length === 3) {
                table += '| ' + options + ' ';
            } else {
                table += '|       '
            }

            if ((i + 1) % 9 === 0) {
                table += '|\n';
                table += '|_______|_______|_______|_______|_______|_______|_______|_______|_______|\n';
                if (cell.getRow() < 9) {
                    table += '|       |       |       |       |       |       |       |       |       |\n';
                }


            }

        });

        console.log(table);
    },
    checkGame: function () {
        var rows = [0, 0, 0, 0, 0, 0, 0, 0, 0],
            cols = [0, 0, 0, 0, 0, 0, 0, 0, 0],
            blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0],
            success = true;

        this._cells.forEach(function (cell) {
            var value = cell.getValue();

            if (!value) {
                return;
            }

            rows[cell.getRow() - 1] += value;
            cols[cell.getCol() - 1] += value;
            blocks[cell.getBlock() - 1] += value;

        });

        rows.forEach(function (total, i) {
            if (total !== 45) {
                this._log && console.log('Error in row', i + 1);
                success = false;
            }
        }.bind(this));

        cols.forEach(function (total, i) {
            if (total !== 45) {
                this._log && console.log('Error in column', i + 1);
                success = false;
            }
        }.bind(this));

        blocks.forEach(function (total, i) {
            if (total !== 45) {
                this._log && console.log('Error in block', i + 1);
                success = false;
            }
        }.bind(this));

        if (success) {
            console.log('Congrats! Your Sudoku is complete');
            this._log && console.log('after', this._round, this._round > 1 ? 'rounds' : 'round');
            this._log && console.log('The script made', this._changes, 'changes');
        } else {
            this._log && console.log('Oh-oh, something\'s wrong...');
        }

        return success;
    },
    solve: function (knownValues) {
        var text = 'Total time', success;
        console.time(text);
        this.init(knownValues);
        success = this.playOnce();
        console.timeEnd(text);

        return {
            input: knownValues,
            output: this._cells,
            success: success
        };
    }
};