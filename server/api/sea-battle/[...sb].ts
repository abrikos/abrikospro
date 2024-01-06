import {ICell, ISeaBattle, SeaBattle} from "~/server/models/sea-battle.model";

const router = createRouter()

function create() {
    const rows = 6
    const cols = 6
    const field1: ICell[] = []
    const field2: ICell[] = []
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            field1.push({row, col, ship: 0, allow: {v: null, h: null}, border: false})
            field2.push({row, col, ship: 0, allow: {v: null, h: null}, border: false})
        }
    }
    const vectors = []
    const ships2 = [[4, 2], [3, 3], [2, 4], [1, 5]]
    const ships = [[2, 1]]
    for (const ship of ships) {
        const length = ship[0]
        for (let count = 1; count <= ship[1]; count++) {
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
            const allowedField = field1.filter(c => c.row < maxRow && c.col < maxCol && !c.ship)
            //const {row, col} = allowedField.sort(() => .5 - Math.random())[0]
            const [row, col] = [3, 3]
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
            for (const ship of [[1, 1], [2, 2]]) {
                const distance = ship[0]
                for (let border = -1; border < 2; border++) {
                    const cellH = field1.find(c => direction === 'h' ? c.row === row + border && c.col === col - distance - 1 : c.col === col + border && c.row === row - distance - 1)
                    if (cellH) {
                        cellH.allow.h = (ship[0])
                    }
                }
                for (let stack = -1; stack <= length + 1; stack++) {
                    const cellV = field1.find(c => direction === 'h' ? c.row === row - distance - 1 && c.col === col + stack : c.col === col - distance - 1 && c.row === row + stack)
                    if (cellV) {
                        cellV.allow.v = (ship[0])
                    }

                }
            }
        }
    }
    //console.log(field1)
    return {rows, cols, field1, field2}
}

const f = create()
for (const c of f.field1) {
    //console.log(c)
}

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
    return create()
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
