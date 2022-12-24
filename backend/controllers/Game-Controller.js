const games = require('../games')
const logger = require('../logger')

module.exports = function (app) {
    const {db} = app.locals;
    app.get('/api/game/list', (req, res) => {
        res.send(games)
    })

    app.get('/api/game/create/:type', async (req, res) => {
        const {type} = req.params
        const game = await db.game.create({type})
        res.send(game)
    })

    app.get('/api/game/view/:id', async (req, res) => {
        const {id} = req.params
        const game = await db.game.findById(id)
        res.send(game)
    })

    app.put('/api/game/:id/turn', async (req, res) => {
        const {id} = req.params
        const game = await db.game.findById(id)
        const gameModule = games[game.type]
        game.data = gameModule.doTurn(game, req.body)
        await game.save()
        res.sendStatus(200)
    })


}
