const md5 = require('./md5')
const moment = require('moment')
const crypto = require("crypto");
const accessTokenName = 'auth._token.local'
const refreshTokenName = 'auth._refresh_token.local'

const methods = {
    accessTokenName,
    refreshTokenName,

    adaptUser(user) {
        return user
    },

    authenticate: async(req, res)=> {
        try {
            const user = req.body.strategy ? await strategies[req.body.strategy](req,res) : await strategies.password(req, res)
            const token = await res.locals.db.token.create({user});
            /*console.log(token)
            false && res.cookie(cookieName, token.name, {
                secure: true,
                //secure: process.env.NODE_ENV !== "development",
                httpOnly: true,
                expires: new Date(moment().add(30, 'days').toISOString()),
            });*/
            res.send(token.access_token)
        } catch (e) {
            res.locals.errorLogger(e, res)
        }
    },

    async logout(req, res) {
        const token = await res.locals.db.token.findOne({name: req.cookies[refreshTokenName]});
        if (!token) return;
        token.delete();
        //res.clearCookie(cookieName);
        res.end();
    },

    async getUser(req, res) {
        if (!req.cookies[accessTokenName]) return;
        const access_token = req.cookies[accessTokenName].replace('Bearer ', '');
        const token = await res.locals.db.token.findOne({access_token})
            .populate('user')
        if (!token) return
        return token.user;
    },

}

async function isLogged(req, res, next) {
    try {
        const found = await methods.getUser(req, res);
        if (!found) throw({error: 401, message: 'Must be logged user'})
        if (found.blocked) throw({error: 406, message: 'Пользователь заблокирован'})
        res.locals.user = found;
        return next()
    } catch (e) {
        res.status(e.error).send(e)
    }
}

async function isAdmin(req, res, next) {
    try {
        const found = await methods.getUser(req, res);
        if (!found) throw ({error: 401, message: 'Must be logged user'})
        if (!found.isAdmin) throw ({error: 401, message: 'Access denied'})
        res.locals.user = found;
        return next()
    } catch (e) {
        res.status(e.error).send(e)
    }
}

const strategies = {
    async telegram(req, res) {

        function checkSignature({hash, ...data}) {
            const TOKEN = process.env.BOT_TOKEN;
            const secret = crypto.createHash('sha256')
                .update(TOKEN)
                .digest();
            const {returnUrl, strategy, ...rest} = data;
            const checkString = Object.keys(rest)
                .sort()
                .map(k => (`${k}=${data[k]}`))
                .join('\n');
            const hmac = crypto.createHmac('sha256', secret)
                .update(checkString)
                .digest('hex');
            return hmac === hash
        }
        const data = req.body
        if (checkSignature(data)) {
            let user = await res.locals.db.user.findOne({externalId: data.id, strategy: 'telegram'})
            if (!user) {
                user = await res.locals.db.user.create({
                    externalId: data.id,
                    strategy: 'telegram',
                    fullName: data.first_name + ' ' + data.last_name,
                    photo: data.photo_url,
                    email: data.username,
                    data
                })
            }
            return user
        } else {
            throw ({error: 403, message: 'Wrong auth data'});
        }

    },

    password: async(req,res)=>{
        const {email, password} = req.body
        const user = await res.locals.db.user.findOne({email})
        if (!user) throw {error: 404, message: 'No user found'}
        if (!user.checkPasswd(password)) {
            throw ({error: 403, message: 'Wrong password'});
        }
        return user
    },
}

module.exports = {...methods, isLogged, isAdmin}
