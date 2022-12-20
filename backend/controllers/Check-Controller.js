const passport = require("../passport");

module.exports = function (app) {
    const {db} = app.locals;
    app.get('/api/check/list', passport.isLogged, async (req, res) => {
        const {user} = res.locals;
        const checks = await db.check.find({user}).populate(db.check.population)
        res.send(checks)
    })

}
