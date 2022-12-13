const games = require('../games')

module.exports = function (app) {
    const {db} = app.locals;
    app.get('/api/game/list', (req, res) => {
        res.send(games)
    })

}
