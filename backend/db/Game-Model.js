const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const name = 'game';
const randomWords = require("random-words");
const games = require('../games')
const logger = require('../logger')

const schema = new Schema({
        name: {type: String},
        type: {type: String},
        dataString: {type: String},
    },
    {
        timestamps: {createdAt: 'createdAt'},
        toObject: {virtuals: true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        toJSON: {virtuals: true}
    });

schema.virtual('sum')
    .get(function () {
        return this.price * this.quantity;
    })

schema.virtual('params')
    .get(function () {
        return games[this.type];
    })
schema.virtual('data')
    .get(function () {
        return  JSON.parse(this.dataString);
    })
    .set(function (obj) {
        return this.dataString = JSON.stringify(obj);
    })



schema.pre('save', function (next) {
    this.name = randomWords({
        exactly: 1,
        wordsPerString: 3,
        formatter: (word, i) => i ? word : word.slice(0, 1).toUpperCase().concat(word.slice(1))
    })[0]
    if(this.isNew) {
        this.dataString = JSON.stringify(games[this.type].defaultData)
        logger(this.dataString)
    }
    next();
})

module.exports = mongoose.model(name, schema)


