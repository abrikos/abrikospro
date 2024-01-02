import mongoose from "mongoose";

const router = createRouter()

router.get('/list', defineEventHandler(async (event) => {
    const user = event.context.user
    if (!user) throw createError({statusCode: 403, message: 'Доступ запрещён',})
    return Fiscal.find({user}).sort({dateTime: -1})//.populate(Fiscal.getPopulation())
}))
router.get('/goods', defineEventHandler(async (event) => {
    const user = event.context.user
    if (!user) throw createError({statusCode: 403, message: 'Доступ запрещён',})
    return Good.find({user}).sort({name: 1}).populate(Good.getPopulation())
}))

router.get('/:_id', defineEventHandler(async (event) => {
    const user = event.context.user
    if (!user) throw createError({statusCode: 403, message: 'Доступ запрещён',})
    const {_id} = event.context.params as Record<string, string>
    return Fiscal.findOne({_id, user}).populate(Fiscal.getPopulation())
}))

router.get('/monthly', defineEventHandler(async (event) => {
    const user = event.context.user
    if (!user) throw createError({statusCode: 403, message: 'Доступ запрещён',})
    const {_id} = event.context.params as Record<string, string>
    return Fiscal.aggregate([
        {$match: {user: new mongoose.Types.ObjectId(user.id)}},
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
        {$sort: {_id: -1}}
    ])
}))

//Fiscal.syncIndexes().then(console.log)
//Good.deleteMany().then(console.log)
//Fiscal.deleteMany().then(console.log)
//Good.findOne().then(console.log)

router.post('/upload', defineEventHandler(async (event) => {
    const user = event.context.user
    if (!user) throw createError({statusCode: 403, message: 'Доступ запрещён',})
    let formData = await readMultipartFormData(event)
    if (formData) {
        const json = JSON.parse(formData[0].data.toString())
        for (const checkImported of json) {
            const checkData = checkImported.ticket.document.receipt;
            checkData.owner = checkData.user;
            checkData.user = user;
            try {
                const check = await Fiscal.updateOne({fiscalDocumentNumber: checkData.fiscalDocumentNumber, user}, checkData, {upsert: true});
                if (check.upsertedId) {
                    for (const item of checkData.items) {
                        item.fiscal = check.upsertedId;
                        item.user = user
                        await Good.create(item)
                    }
                }
            } catch (e) {
                console.log(e)
            }
        }
    }

}))

export default useBase('/api/fiscal', router.handler)
