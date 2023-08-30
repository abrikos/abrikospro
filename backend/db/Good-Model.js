const mongoose = require('mongoose');
const md5 = require("../md5");
const Schema = mongoose.Schema;
const name = 'good';


const schema = new Schema({
        name: {type: String},
        price: {type: Number},
        quantity: {type: Number},
        check: {type: mongoose.Schema.Types.ObjectId, ref: 'check'},
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

schema.pre('save', function (next) {
    // do stuff
    this.price = this.price / 100
    next();
})

module.exports = mongoose.model(name, schema)


