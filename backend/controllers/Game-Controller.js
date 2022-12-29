const games = require('../games')
const logger = require('../logger')

module.exports = function (app) {
    const {db} = app.locals;
    app.get('/api/game/list', (req, res) => {
        try {
            res.send(games)
        } catch (e) {
            app.locals.errorLogger(e, res)
        }
    })

    app.get('/api/game/create/:type', async (req, res) => {
        try {
            const {type} = req.params
            const game = await db.game.create({type})
            const gameModule = games[type]
            game.data = gameModule.init()
            await game.save()
            res.send(game)
        } catch (e) {
            app.locals.errorLogger(e, res)
        }
    })

    app.get('/api/game/view/:id', async (req, res) => {
        try {
            const {id} = req.params
            const game = await db.game.findById(id)
            res.send(game)
        } catch (e) {
            app.locals.errorLogger(e, res)
        }
    })

    /*db.game.findById('63ad18b31a5d476b07c75d62')
        .then(game=>{
            const gameModule = games[game.type]
            const res = gameModule.checkWinner(game, {index:55, player:'player'})
            logger(res)
        })*/

    app.put('/api/game/:id/turn', async (req, res) => {
        try {
            const {id} = req.params
            const game = await db.game.findById(id)
            if (game.data.winner) throw {error: 406, message: 'Game has the winner'}
            const gameModule = games[game.type]
            game.data = gameModule.doTurn(game, req.body)
            if (!game.data.winner) {
                game.data = gameModule.botTurn(game)
            }
            await game.save()
            res.sendStatus(200)
        } catch (e) {
            app.locals.errorLogger(e, res)
        }
    })

    app.get('/api/game/:id/restart', async (req, res) => {
        try {
            const {id} = req.params
            const game = await db.game.findById(id)
            const gameModule = games[game.type]
            game.data = gameModule.init()
            await game.save()
            res.sendStatus(200)
        } catch (e) {
            app.locals.errorLogger(e, res)
        }
    })


}
