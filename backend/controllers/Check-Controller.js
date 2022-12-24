const passport = require("../passport");
const fs = require("fs");
const logger = require('../logger')

module.exports = function (app) {
    const {db} = app.locals;
    app.get('/api/check/list', passport.isLogged, async (req, res) => {
        const {user} = res.locals;
        logger(user)
        const checks = await db.check.find({user})
            .sort({dateTime: -1})
            .populate(db.check.population)
        res.send(checks)
    })

    //63a0ea52552e5ec78a7eaffa
    async function byMonth(user) {
        const res = await db.check.aggregate([
            //{$match: {user:user.id}},
            //{ "$unwind": "$goods" },
            {
                $group: {
                    _id: {
                        year: {$year: "$dateTime"},
                        month: {$month: "$dateTime"},
                    },
                    testSum:{$sum:"$fiscalSign"},
                }
            },
            {
              $project:{
                  totalSum:  "$goods",
                  testSum:"$testSum",
                  goods:"$goods",
                  testSum2:"$testSum2"
              }
            },
            {$sort: {_id: 1}}
        ])
        //logger(res)
    }


    byMonth({id: '63a0ea52552e5ec78a7eaffa'})

    app.get('/api/check/month', passport.isLogged, async (req, res) => {
        const {user} = res.locals;
        const checks = await db.check.find({user})
            .sort({dateTime: -1})
            .populate(db.check.population)
        res.send(checks)
    })
    //db.check.deleteMany().then(console.log)
    //db.check.find().populate(db.check.population).then(console.log)
    app.put('/api/check/add/list', passport.isLogged, async (req, res) => {
        try {
            const {user} = res.locals;

            const data = fs.readFileSync(req.files.file.tempFilePath)
            for (const checkImported of JSON.parse(data)) {
                const checkData = checkImported.ticket.document.receipt;
                checkData.owner = checkData.user;
                checkData.user = user;
                try {
                    const check = await db.check.create(checkData);
                    await check.populate(db.check.population);
                    for (const item of checkData.items) {
                        item.check = check;
                        await db.good.create(item)
                    }
                } catch (e) {
                }
                //await check.populate(db.check.population);
            }
            res.sendStatus(200)
        } catch (e) {
            app.locals.errorLogger(e, res)
        }
    })

}
