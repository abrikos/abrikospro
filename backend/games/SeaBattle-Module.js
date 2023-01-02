const logger = require('../logger')
const rows = 10;
const cols = 10;
const vectors = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]]

module.exports = {
    //useTimer: true,
    initialStake: 100,
    order: 1,
    name: 'seabattle',
    label: "Sea battle",
    description: ``,
    shiftFirstTurn: true,
    customTurn: true,
    fieldSize: rows * cols,
    rows,
    cols,
    ships: [4, 3, 3, 2, 2, 2, 1, 1, 1, 1],

    init() {
        return {winner: false, player: this.placeShips(), bot: this.placeShips()}
    },
    doTurn() {

    },
    botTurn() {

    },


    placeShips() {
        const field = Array.from(Array(rows * cols).keys()).map(index => ({index, ...this.cellFromIndex(index)}));
        for (const length of this.ships) {
            const freeCells = field.filter(cell => !cell.ship && !cell.border);
            const direction = Math.floor(Math.random() * 2) ? ['row', 'col'] : ['col', 'row'];
            //const direction = ['row', 'col'];
            const allowedStartCells = []
            for(const cell of freeCells){
                let can = 0;
                for (let l = 0; l < length; l++) {
                    const restOfShip = freeCells.find(c=>(c[direction[0]] === cell[direction[0]] + l) && c[direction[1]] === cell[direction[1]])
                    if(restOfShip) can++
                }
                if(can === length){
                    allowedStartCells.push(cell)
                }
            }

            const cell = allowedStartCells[Math.floor(Math.random() * allowedStartCells.length)];
            for (let l = 0; l < length; l++) {
                const restOfShip = freeCells.find(c=>c[direction[0]] === cell[direction[0]] + l && c[direction[1]] === cell[direction[1]])
                restOfShip.ship = length
            }
            for(const shipCell of freeCells.filter(c=>c.ship)){
                for (const v of vectors) {
                    const testCol = shipCell.col + v[0]
                    const testRow = shipCell.row + v[1]
                    const borderCell = freeCells.find(c=>c.row===testRow && c.col===testCol)
                    if (borderCell && !borderCell.ship) {
                        borderCell.border = true;
                    }
                }
            }
        }
        return field
    },
    cellFromIndex(index) {
        const row = Math.floor(index / this.cols)
        const col = index - row * this.cols
        return {row, col}
    }

}
