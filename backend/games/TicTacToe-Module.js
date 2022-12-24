const logger = require('../logger')
const winCount = 4
module.exports = {
    order: 1,
    winCount,
    cols: 10,
    rows: 10,
    name: 'tictactoe',
    label: "Tic Tac Toe",
    description: `${winCount} cells in a line wins the game`,
    shiftFirstTurn: true,
    defaultData: {winner: false, cells: []},
    hideOpponentData(game, req) {
        return game;
    },

    initTable(game) {
    },

    doTurn(game, body, userId) {
        const data = game.data;
        logger(data)
        const {row, col} = body;
        const index = this.cellIndex(row, col)
        const cellExists = data.cells.find(c => c.index === index);
        if (cellExists) return;
        const player = userId || 'player'

        data.cells.push({index, player, row, col})
        logger(data.cells)
        const test = ([r, c]) => {
            let check = 0
            for (let i = 0; i < this.winCount; i++) {
                if (data.cells.find(d => d.player === player && d.index === this.cellIndex(row + i * r, col + i * c))) check++
                //console.log(row + i * r, col + i * c,this.cellIndex(row + i * r, col + i * c))
            }
            if (check === this.winCount) return 1
        }
        const vectors = [[0, 1], [1, 0], [1, 1], [0, -1], [-1, 0], [-1, -1]]
        const result = []
        for (const vector of vectors) {
            result.push(test(vector))
        }
        data.winner = result.includes(1) && player
        return data
    },

    cellIndex(row, col) {
        return (row - 1) * this.cols + (col - 1)
    },


}