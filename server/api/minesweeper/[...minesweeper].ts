import mongoose from "mongoose";
import {IMinesweeper, Minesweeper} from "~/server/models/minesweeper.model";

const router = createRouter()

router.put('/create', defineEventHandler(async (event) => {
    const {rows, cols, percent} = await readBody(event)
    const field = Array(rows * cols).fill(null).map((_, i) => i).sort(() => .5 - Math.random())
    const minesCount = Math.floor(percent / 100 * cols * rows)
    const mines = field.slice(0, minesCount)
    return Minesweeper.create({rows, cols, mines, percent})
}))

router.get('/:_id', defineEventHandler(async (event) => {
    const {_id} = event.context.params as Record<string, string>
    const game = await Minesweeper.findById(_id)
    if (!game) throw createError({statusCode: 406, message: 'Game not found'})
    //game.mines = []
    return game
}))

router.get('/list', defineEventHandler(async (event) => {
    return Minesweeper.find().select('-mines').sort({createdAt: -1})
}))

/*
Minesweeper.findOne().then(m => {
    console.log(m.cell(22))
})
*/

function checkCell(game: IMinesweeper, idx: number) {
    game.turns.push(idx)
    if (game.mines.includes(idx)) {
        game.finished = -1
        return
    }
    if(game.mines.length + game.turns.length === game.cellsCount){
        game.finished = 1
        return;
    }
    const {row, col} = game.cell(idx)
    const nearCells = [game.idx(row - 1, col - 1), game.idx(row - 1, col), game.idx(row - 1, col + 1), game.idx(row, col - 1), game.idx(row, col + 1), game.idx(row + 1, col - 1), game.idx(row + 1, col), game.idx(row + 1, col + 1),]
        .filter(c => c > 0)
    let mines = 0
    for (const i of nearCells) {
        if (game.mines.includes(i)) {
            mines++
        }
    }
    if (mines) {
        game.counts.push([idx, mines])
    } else {
        for (const i of nearCells) {
            if (!game.turns.includes(i)) {
                checkCell(game, i)
            }
        }
    }
}

router.post('/:_id/turn', defineEventHandler(async (event) => {
    const {_id} = event.context.params as Record<string, string>
    const {idx} = await readBody(event)
    const game = await Minesweeper.findById(_id)
    if (!game) throw createError({statusCode: 406, message: 'Game not found'})
    if (game.finished) throw createError({statusCode: 406, message: 'Game is over'})
    checkCell(game, idx)
    game.save()
}))

export default useBase('/api/minesweeper', router.handler)
