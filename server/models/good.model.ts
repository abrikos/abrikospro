import mongoose from 'mongoose';
import {IFiscal} from "~/server/models/fiscal.model";
import {IUser} from "~/server/models/user.model";

const Schema = mongoose.Schema;
const name = 'good';

export interface IGood {
    id: string,
    name: string,
    price: number
    quantity: number
    sum: number
    deleted: boolean
    fiscal: IFiscal
    user: IUser

}

interface GoodModel extends mongoose.Model<IGood> {
    getPopulation(): any
}


const schema = new Schema({
        name: {type: String, required: true},
        price: {type: Number, required: true},
        quantity: {type: Number, required: true},
        deleted: {type: Boolean, default: false},
        fiscal: {type: mongoose.Schema.Types.ObjectId, ref: 'fiscal'},
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    },
    {
        toObject: {virtuals: true},
        toJSON: {virtuals: true}
    });

schema.statics.getPopulation = () => [
    //{path: 'user', select: {email: 1, nameStored: 1, avatarImage: 1}},
    {path: 'fiscal'},
]

schema.virtual('sum')
    .get(function (this: IGood) {
        return (this.price * this.quantity / 100).toFixed(2)
    })
schema.virtual('priceHuman')
    .get(function (this: IGood) {
        return (this.price / 100).toFixed(2)
    })


export const Good = mongoose.model<IGood, GoodModel>(name, schema)