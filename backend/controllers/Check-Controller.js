const passport = require("../passport");
const fs = require("fs");
const logger = require('../logger')
const mongoose = require("mongoose");

module.exports = function (app) {
    const {db} = app.locals;
    app.get('/api/check/list', passport.isLogged, async (req, res) => {
        const {user} = res.locals;
        const checks = await db.check.find({user})
            .sort({dateTime: -1})
            .populate(db.check.population)
        res.send(checks)
    })

    app.get('/api/check/goods', passport.isLogged, async (req, res) => {
        const {user} = res.locals;
        const checks = await db.check.find({user})
            .sort({dateTime: -1})
            .populate(db.check.population)
        const goods = []
        for(const check of checks){
            goods.push(...check.goods.map(g=>({date:check.date, retailPlace:check.retailPlace, ...g._doc})))
        }
        res.send(goods)
    })

    //63a0ea52552e5ec78a7eaffa
    async function byMonth(user) {
        return  db.check.aggregate([
            {$match: {user: mongoose.Types.ObjectId(user.id)}},
            //{ "$unwind": "$goods" },
            {
                $group: {
                    _id: {
                        year: {$year: "$dateTime"},
                        month: {$month: "$dateTime"},
                    },
                    testSum:{$sum:"$totalSum"},
                }
            },
            {
              $project:{
                  year: "$_id.year",
                  month: "$_id.month",
                  totalSum: {$divide: ["$testSum", 100]},
              }
            },
            {$sort: {_id: 1}}
        ])
    }
    //byMonth({id: '6398c8fbe657a2dea2195614'}).then(r=>logger(r))
    //db.check.deleteMany().then(console.log)


    app.get('/api/check/month', passport.isLogged, async (req, res) => {
        const {user} = res.locals;
        const checks = await byMonth(user)
        res.send(checks.reverse())
    })

    async function monthData(user, year, month){
        const ids = await db.check.aggregate([
            {$project: {
                    name: 1,
                    month: {$month: '$dateTime'},
                    year: {$year: '$dateTime'}}
            },
            {$match: {month, year}}
        ])
        return db.check.find({_id:{$in:ids.map(i=>i._id)}}).populate(db.check.population)
    }
    //6398c8fbe657a2dea2195614

    //monthData({id: '63a0ea52552e5ec78a7eaffa'}, 2022, 3).then(logger)

    app.post('/api/check/month', passport.isLogged, async (req, res) => {
        const {user} = res.locals;
        const {year, month} = req.body;
        const checks = await monthData(user, year, month);
        res.send(checks)
    })
    //db.check.deleteMany().then(console.log)
    //db.check.find().populate(db.check.population).then(console.log)
    app.put('/api/check/upload/json', passport.isLogged, async (req, res) => {
        try {
            const {user} = res.locals;

            const data = fs.readFileSync(req.files.file.tempFilePath)
            for (const checkImported of JSON.parse(data)) {
                const checkData = checkImported.ticket.document.receipt;
                checkData.owner = checkData.user;
                checkData.user = user;
                try {
                    const check = await db.check.updateOne({fiscalDocumentNumber: checkData.fiscalDocumentNumber, user}, checkData, {upsert:true});
                    if(check.upsertedId) {
                        for (const item of checkData.items) {
                            item.check = check.upsertedId;
                            await db.good.create(item)
                        }
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
