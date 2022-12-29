const logger = require('../logger')
const winCount = 4
const rows = 10;
const cols = 10;
module.exports = {
    order: 1,
    winCount,
    cols,
    rows,
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
            winner: false, cells: this.indexes.map(function (index) {
                return {index}
            })
        }
    },

    doTurn(game, body, userId) {
        const data = {...game.data};
        //logger(data)
        const {index} = body;
        const player = userId || 'player'
        if (data.cells[index].player) throw {error: 406, message: 'Cell already taken'};
        data.cells[index].player = player;
        data.winner = this.checkWinner(data.cells, player)
        return data
    },

    checkWinner(cells, player) {
        //const vectors = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]]
        for (const cell of cells) {
            const vectors = [[1, 0], [1, 1], [0, 1], [-1, 1]]
            for (const vector of vectors) {
                const indexes = []
                for (let i = 0; i < this.winCount; i++) {
                    const index = cell.index + i * this.cols * vector[0] + vector[1] * i
                    if (cells[index]?.player === player) {
                        indexes.push(index)
                    }
                }
                if (cell.index === 66) logger(indexes)
                if (indexes.length === this.winCount) {

                    return indexes
                }
            }
        }
    },

    botTurn(game) {
        const data = game.data;
        const freeIndexes = this.indexes.filter(i => !data.cells.filter(c => c.player).map(c => c.index).includes(i));
        const index = freeIndexes[Math.floor(Math.random() * freeIndexes.length)];
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