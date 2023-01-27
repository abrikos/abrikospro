const TelegramBot = require('node-telegram-bot-api');
//const axios = require('axios');
//const bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true});
const logger = require('../logger')

module.exports = function (app) {
    const {db} = app.locals;
    //db.check.deleteMany().then(console.log)
    //db.check.findOne().populate(db.check.population).then(console.log)

  /*  bot.on('message', async (msg) => {
        try {
            const user = await db.user.findOne({externalId: msg.from.id})
            if (!user) {
                return bot.sendMessage(msg.chat.id, 'Только для зарегистрированных пользователей')
            }
            if (msg.document) {
                const fileInfo = await bot.getFile(msg.document.file_id);
                const response = await axios(`https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${fileInfo.file_path}`)
                const checkData = response.data
                checkData.owner = checkData.user;
                checkData.user = user;
                const check = await db.check.create(checkData);
                await check.populate(db.check.population);
                for (const item of checkData.items) {
                    item.check = check;
                    await db.good.create(item)
                }
                await check.populate(db.check.population);
                await bot.sendMessage(msg.chat.id, `${check.owner} - ${check.retailPlace}. Чек на сумму ${check.sum.toFixed(2)} принят`)
            }
            else{
                logger(msg)
            }
        } catch (e) {
            await bot.sendMessage(msg.chat.id, `Ошибка ввода чека: ${e.message}`)
        }
    })

    app.get('/api/telegram/bot-info', (req, res) => {
        bot.getMe().then(state => res.send(state))
    })
*/
}
