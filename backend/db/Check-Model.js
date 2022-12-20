const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const name = 'check';


const schema = new Schema({
        shop: {type: String},
        retailPlaceAddress: {type: String},
        operator: {type: String},
        fiscalDocumentNumber: {type: Number, unique: true},
        fiscalSign: {type: Number, unique: true},
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    },
    {
        timestamps: {createdAt: 'createdAt'},
        toObject: {virtuals: true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        toJSON: {virtuals: true}
    });

schema.statics.population = ['goods']

schema.virtual('sum')
    .get(function () {
        return this.goods.reduce((a, b) => a + b.sum, 0)
    })


schema.virtual('goods', {
    ref: 'good',
    localField: '_id',
    foreignField: 'check'
})

module.exports = mongoose.model(name, schema)


