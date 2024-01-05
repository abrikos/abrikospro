import {ICell, ISeaBattle, SeaBattle} from "~/server/models/sea-battle.model";

const router = createRouter()

function create(){
    const rows = 5
    const cols = 5
    const field1: ICell[] = []
    const field2: ICell[] = []
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            field1.push({row, col, ship: 0, allow: {v: [], h: []}})
            field2.push({row, col, ship: 0, allow: {v: [], h: []}})
        }
    }
    const vectors = []
    const ships2 = [[4, 2], [3, 3], [2, 4], [1, 5]]
    const ships = [[2, 1]]
    for (const ship of ships) {
        for (let length = 1; length <= ship[0]; length++) {
            const direction = Math.random() > 0 ? 'h' : 'v'
            let maxRow = 0
            let maxCol = 0
            if (direction === 'h') {
                maxRow = rows
                maxCol = cols - ship[0]
            } else {
                maxRow = rows - ship[0]
                maxCol = cols
            }
            const allowedField = field1.filter(c => c.row < maxRow && c.col < maxCol && !c.ship)
            //const {row, col} = allowedField.sort(() => .5 - Math.random())[0]
            const [row, col] = [2, 2]
            for (let i = 0; i < ship[0]; i++) {
                if (direction === 'h') {
                    const cell = field1.find(c => c.row === row && c.col === col + i)
                    if(cell) {
                        cell.ship = length
                    }
                } else {

                }
            }
            for (let bar = -1; bar < length + 1; bar++) {
                for (const ship of [...ships, [0, 0]]) {
                    const cell = field1.find(c => {
                        if (direction === 'h') {
                            return c.col === col + bar && c.row === row - ship[0] - 1
                        } else {
                            return c.row === row + bar && c.col === col - ship[0] - 1
                        }
                    })

                    if (cell) {
                        console.log(cell)
                        cell.allow[direction].push(ship[0])
                    }
                }
            }

        }
    }
    return {rows, cols, field1, field2}
}

const f = create()
for(const c of f.field1){
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
