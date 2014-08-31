NodeSudoku
==========

NodeSudoku is a Sudoku solver in native JS running on NodeJS (though can easly be converted to normal web js library).

## How to use

As you can see in the [index.js](src/index.js) file, getting NodeSudoku to work is plain simple:

* Require sudoku module, and initialize a sudoku object

```javascript
var sudokuModule = require('./sudoku');
var keepLog = false;
var sudoku = new sudokuModule.Sudoku(keepLog);
```
* Now, create a map of known values in **rXcY** format (i.e. row X column Y),
and call **solve()** with that map.
```javascript
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
```

* The resulting object will tell you if a solution was found, and of course, what it is ;)  
Note that NodeSudoku will console.log a table representing the soluttion, something like this:

```
 _______________________________________________________________________
|       |       |       |       |       |       |       |       |       |
|   5   |   7   |   4   |   6   |   8   |   1   |   3   |   2   |   9   |
|_______|_______|_______|_______|_______|_______|_______|_______|_______|
|       |       |       |       |       |       |       |       |       |
|   3   |   1   |   6   |   7   |   2   |   9   |   8   |   4   |   5   |
|_______|_______|_______|_______|_______|_______|_______|_______|_______|
|       |       |       |       |       |       |       |       |       |
|   2   |   8   |   9   |   3   |   4   |   5   |   7   |   6   |   1   |
|_______|_______|_______|_______|_______|_______|_______|_______|_______|
|       |       |       |       |       |       |       |       |       |
|   6   |   4   |   7   |   9   |   5   |   8   |   2   |   1   |   3   |
|_______|_______|_______|_______|_______|_______|_______|_______|_______|
|       |       |       |       |       |       |       |       |       |
|   1   |   3   |   8   |   4   |   7   |   2   |   5   |   9   |   6   |
|_______|_______|_______|_______|_______|_______|_______|_______|_______|
|       |       |       |       |       |       |       |       |       |
|   9   |   5   |   2   |   1   |   3   |   6   |   4   |   7   |   8   |
|_______|_______|_______|_______|_______|_______|_______|_______|_______|
|       |       |       |       |       |       |       |       |       |
|   7   |   2   |   1   |   8   |   6   |   3   |   9   |   5   |   4   |
|_______|_______|_______|_______|_______|_______|_______|_______|_______|
|       |       |       |       |       |       |       |       |       |
|   4   |   9   |   3   |   5   |   1   |   7   |   6   |   8   |   2   |
|_______|_______|_______|_______|_______|_______|_______|_______|_______|
|       |       |       |       |       |       |       |       |       |
|   8   |   6   |   5   |   2   |   9   |   4   |   1   |   3   |   7   |
|_______|_______|_______|_______|_______|_______|_______|_______|_______|

```
That's it!

## Tests

Currently I made thorough tests (using Jasmine) for the cell class, and basic tests to sudoku main class.
Feel free to add more!
