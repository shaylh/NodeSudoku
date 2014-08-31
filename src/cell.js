module.exports.Cell = function (row, col, block, value) {
    this._coord = {
        row: row,
        col: col,
        block: block
    };
    this._options = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.setValue(value);
};

module.exports.Cell.prototype = {
    getRow: function () {
        return this._coord.row;
    },
    getCol: function () {
        return this._coord.col;
    },
    getBlock: function () {
        return this._coord.block;
    },
    setValue: function (value) {
        if (value) {
            this._value = value;
            this._options = null;
        }
    },
    getValue: function () {
        return this._value;
    },
    removeOption: function (option) {
        if (!this._options || this.getValue()) {
            return;
        }

        for (var i = 0; i < this._options.length; i++) {
            if (this._options[i] === option) {
                this._options.splice(i, 1);
                break;
            }
        }

        if (this._options.length === 1) {
            this.setValue(this._options[0]);
        }
    },
    getOptions: function () {
        return this._options;
    },
    isSameRow: function (cell) {
        return cell.getRow() === this.getRow();
    },
    isSameCol: function (cell) {
        return cell.getCol() === this.getCol();
    },
    isSameBlock: function (cell) {
        return cell.getBlock() === this.getBlock();
    },
    isNeighbor: function (cell) {
        return this.isSameRow(cell) || this.isSameCol(cell) || this.isSameBlock(cell);
    },
    isOptionPresentInAnotherCell: function (option, cell2) {
        var value2 = cell2.getValue(),
            options2 = cell2.getOptions(),
            optionPresent = false;

        if (value2 && option === value2) {
            return true;
        }

        options2 && options2.forEach(function (option2) {
            if (option === option2) {
                optionPresent = true;
            }
        });

        return optionPresent;
    },
    toString: function () {
        return (this.getValue() || this.getOptions()) + '';
    }
};