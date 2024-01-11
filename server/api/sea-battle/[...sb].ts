import {ICell, ISeaBattle, SeaBattle} from "~/server/models/sea-battle.model";

const router = createRouter()

function create() {
    const rows = 10
    const cols = 10
    const field1: ICell[] = []
    const field2: ICell[] = []
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            field1.push({row, col, ship: 0, allow: {v: 0, h: 0}, border: false})
            field2.push({row, col, ship: 0, allow: {v: 0, h: 0}, border: false})
        }
    }
    const vectors = []
    const ships3 = [[4, 2], [3, 3], [2, 4], [1, 4]]
    const ships = [[4, 2], [3, 3]]
    const ships2 = [[4, 1]]
    const places = [[5,5], [4,4]]
    for (const ship of ships) {
        const length = ship[0]
        for (let count = 0; count < ship[1]; count++) {
            const direction = Math.random() < 0 ? 'h' : 'v'
            let maxRow = 0
            let maxCol = 0
            if (direction === 'h') {
                maxRow = rows
                maxCol = cols - length
            } else {
                maxRow = rows - length
                maxCol = cols
            }
            const allowedField = field1.filter(c => c.row < maxRow && c.col < maxCol && !c.ship && c.allow[direction] <= length && !c.border)
            console.log('zzzzzzzzz', allowedField.length)
            const {row, col} = allowedField.sort(() => .5 - Math.random())[0]
            //const [row, col] = places[count]
            //Place ship
            for (let i = 0; i < length; i++) {
                const cell = field1.find(c => direction === 'h' ? c.row === row && c.col === col + i : c.row === row + i && c.col === col)
                if (cell) {
                    cell.ship = length
                }
            }
            //Set near border to deny
            for (let r = -1; r < 2; r++) {
                for (let c = -1; c < length + 1; c++) {
                    const zero = field1.find(f => direction === 'h' ? f.row === r + row && f.col === c + col : f.row === c + row && f.col === r + col)
                    if (zero) {
                        zero.border = true
                    }
                }
            }
            //Calc allowed ships placement
            for (const ship of ships) {
                const distance = ship[0]
                //alongside
                for (let along = -1; along < 2; along++) {
                    const cellH = field1.find(c => direction === 'h' ?
                        c.row === row + along && c.col === col - distance - 1
                        :
                        c.col === col + along && c.row === row - distance - 1)
                    //console.log(cellH)
                    if (cellH && (cellH.allow.h===0 || cellH.allow.h > (ship[0]))) {
                        cellH.allow.h = (ship[0])
                    }
                }
                //cross
                for (let cross = -1; cross <= length + 1; cross++) {
                    const cellV = field1.find(c => direction === 'h' ? c.row === row - distance - 1 && c.col === col + cross : c.col === col - distance - 1 && c.row === row + cross)
                    if (cellV && (cellV.allow.h===0 || cellV.allow.v > (ship[0]))) {
                        cellV.allow.v = (ship[0])
                    }

                }
            }
        }
    }
    //console.log(field1)
    return {rows, cols, field1, field2}
}

//const f = create()

router.put('/create', defineEventHandler(async (event) => {
    return SeaBattle.create(create())
}))

router.get('/:_id', defineEventHandler(async (event) => {
    const {_id} = event.context.params as Record<string, string>
    const game = await SeaBattle.findById(_id)
    if (!game) throw createError({statusCode: 406, message: 'Game not found'})
    if (!game.winner) {
        //game.mines = []
    }
    //return game
    try {
        return create()
    }catch (e) {
        throw createError({statusCode: 406, message: 'game error'})
    }
}))

router.get('/list', defineEventHandler(async (event) => {
    return SeaBattle.find().select('-mines').sort({createdAt: -1})
}))

/*
Minesweeper.findOne().then(m => {
    console.log(m.cell(22))
})
*/

function checkCell(game: ISeaBattle, idx: number) {
    game.turns1.push(idx)
}

router.post('/:_id/turn', defineEventHandler(async (event) => {
    const {_id} = event.context.params as Record<string, string>
    const {idx} = await readBody(event)
    const game = await SeaBattle.findById(_id)
    if (!game) throw createError({statusCode: 406, message: 'Game not found'})
    if (game.finished) throw createError({statusCode: 406, message: 'Game is over'})
    checkCell(game, idx)
    game.save()
}))

export default useBase('/api/sea-battle', router.handler)
