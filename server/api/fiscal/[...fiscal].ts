import mongoose from "mongoose";

const router = createRouter()

router.get('/list', defineEventHandler(async (event) => {
    const user = event.context.user
    if (!user) throw createError({statusCode: 403, message: event.context.$t('Access denied'),})
    return Fiscal.find({user, deleted:{$ne:true}}).sort({dateTime: -1})//.populate(Fiscal.getPopulation())
}))
router.get('/goods', defineEventHandler(async (event) => {
    const user = event.context.user
    if (!user) throw createError({statusCode: 403, message: event.context.$t('Access denied'),})
    return Good.find({user, deleted:{$ne:true}}).sort({name: 1}).populate(Good.getPopulation())
}))

router.get('/:_id', defineEventHandler(async (event) => {
    const user = event.context.user
    if (!user) throw createError({statusCode: 403, message: event.context.$t('Access denied'),})
    const {_id} = event.context.params as Record<string, string>
    return Fiscal.findOne({_id, user}).populate(Fiscal.getPopulation())
}))
router.delete('/:_id', defineEventHandler(async (event) => {
    const user = event.context.user
    if (!user) throw createError({statusCode: 403, message: event.context.$t('Access denied'),})
    const {_id} = event.context.params as Record<string, string>
    return  Fiscal.updateOne({_id, user}, {deleted:true})
}))

router.get('/monthly', defineEventHandler(async (event) => {
    const user = event.context.user
    if (!user) throw createError({statusCode: 403, message: event.context.$t('Access denied'),})
    const {_id} = event.context.params as Record<string, string>
    return Fiscal.aggregate([
        {$match: {user: new mongoose.Types.ObjectId(user.id), deleted:{$ne:true}}},
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
    if (!user) throw createError({statusCode: 403, message: event.context.$t('Access denied'),})
    let formData = await readMultipartFormData(event)
    if (formData) {
        const json = JSON.parse(formData[0].data.toString())
        console.log(json)
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
