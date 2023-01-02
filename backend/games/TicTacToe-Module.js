const logger = require('../logger')
const winCount = 4
const rows = 10;
const cols = 10;
module.exports = {
    order: 1,
    winCount,
    cols,
    rows,
    fieldSize: cols * rows,
    name: 'tictactoe',
    label: "Tic Tac Toe",
    description: `${winCount} cells in a line wins the game`,
    shiftFirstTurn: true,
    indexes: Array.from(Array(rows * cols).keys()),
    hideOpponentData(game, req) {
        return game;
    },

    init() {
        return this.defaultData()
    },
    defaultData() {
        return {
            winner: false, cells: []
        }
    },

    doTurn(game, body, userId) {
        const data = {...game.data};
        //logger(data)
        const {index} = body;
        const player = userId || 'player'
        const cell = data.cells.find(c=>c.index === index)
        if (cell) throw {error: 406, message: 'Cell already taken'};
        data.cells.push({index, player})
        data.winner = this.checkWinner(data.cells, player)
        return data
    },

    checkWinner(cells,player){
        return this.checkLine(cells, player, this.winCount)?.indexes
    },

    checkLine(cells, player, length) {
        //const vectors = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]]
        for (const cell of cells) {
            const vectors = [[1, 0], [1, 1], [0, 1], [-1, 1]]
            for (const vector of vectors) {
                const indexes = []
                for (let i = 0; i < this.winCount; i++) {
                    const index = cell.index + i * this.cols * vector[0] + vector[1] * i
                    const testCell = cells.find(c=>c.index===index)
                    if (testCell?.player === player) {
                        indexes.push(index)
                    }
                }
                if (cell.index === 66) logger(indexes)
                if (indexes.length === length) {
                    return {indexes, vector}
                }
            }
        }
    },

    botTurn(game) {
        logger('zzzzzz')
        const data = game.data;
        const freeIndexes = this.indexes.filter(i => !data.cells.filter(c => c.player).map(c => c.index).includes(i));
        const opponent = data.cells.find(c=>c.player || c.player !== 'bot')
        const possibleLines = this.checkLine(data.cells, opponent.player, this.winCount - 2)
        let index = freeIndexes[Math.floor(Math.random() * freeIndexes.length)];
        if(possibleLines) {

            const test1 = possibleLines.indexes[0] + this.cols * (possibleLines.vector[0]* -1) + (possibleLines.vector[0]* -1)
            const test2 = possibleLines.indexes[1] + this.cols * (possibleLines.vector[0]* 1) + (possibleLines.vector[0] * 1)
            const cell1 = data.cells.find(c=>c.index===test1)
            const cell2 = data.cells.find(c=>c.index===test2)
            if(!cell1){
                index = test1
            }else if (!cell2){
                index = test2
            }
            logger(possibleLines, test1, test2)
            //const test2 = possibleLines[possibleLines.length]
        }
        return this.doTurn(game, {index}, 'bot')
    },

    cellIndex(row, col) {
        return (row - 1) * this.cols + (col - 1)
    },
    cellBYIndex(index) {
        const row = Math.floor(index / this.cols);
        const col = index - row * this.cols;
        return {row, col}
    },


}