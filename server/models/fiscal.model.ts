import mongoose from 'mongoose';
import moment from "moment";
import {IUser} from "~/server/models/user.model";
import {IGood} from "~/server/models/good.model";

const Schema = mongoose.Schema;
const name = 'fiscal';

export interface IFiscal {
    id: string
    owner: string
    retailPlace: string
    retailPlaceAddress: string
    retailPlaceFull: string
    operator: string
    fiscalDocumentNumber: number
    fiscalSign: number
    totalSum: number
    dateTime: number
    date: string
    deleted: boolean
    user: IUser,
    goods: IGood[]

}

interface FiscalModel extends mongoose.Model<IFiscal> {
    getPopulation(): any
}

const schema = new Schema({
        owner: {type: String},
        retailPlace: {type: String},
        retailPlaceAddress: {type: String},
        operator: {type: String},
        fiscalDocumentNumber: {type: Number, unique: true, required: true},
        fiscalSign: {type: Number, unique: true},
        totalSum: {type: Number, required: true},
        dateTime: {type: Date, required: true},
        deleted: {type: Boolean, default: false},
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    },
    {
        toObject: {virtuals: true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        toJSON: {virtuals: true}
    });

schema.statics.getPopulation = () => [
    //{path: 'user', select: {email: 1, nameStored: 1, avatarImage: 1}},
    {path: 'goods'},
]

schema.virtual('date')
    .get(function () {
        return moment(this.dateTime).format('YYYY-MM-DD HH:mm')
    })
schema.virtual('retailPlaceFull')
    .get(function () {
        return this.retailPlace + ', ' + this.retailPlaceAddress
    })
schema.virtual('sumHuman')
    .get(function () {
        return (this.totalSum / 100).toFixed(2)
    })

schema.virtual('goods', {
    ref: 'good',
    localField: '_id',
    foreignField: 'fiscal'
})

export const Fiscal = mongoose.model<IFiscal, FiscalModel>(name, schema)