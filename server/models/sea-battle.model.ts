import mongoose from 'mongoose';
import {IFiscal} from "~/server/models/fiscal.model";
import {IUser} from "~/server/models/user.model";

const Schema = mongoose.Schema;
const name = 'seabattle';

export interface ICell {
    row: number
    col: number
    ship: number
    allow: { v: Array<number>, h: Array<number> }
}

export interface ISeaBattle {
    id: string,
    rows: number
    cols: number
    cellsCount: number
    field1: object[]
    field2: object[]
    idx: Function
    cell: Function
    winner: number
    createdAt: Date
}

const schema = new Schema({
        rows: {type: Number, required: true},
        cols: {type: Number, required: true},
        field1: [{type: Object}],
        field2: [{type: Object}],
        winner: {type: Number, default: 0},
    },
    {
        timestamps: {createdAt: 'createdAt'},
        toObject: {virtuals: true},
        toJSON: {virtuals: true}
    });

schema.virtual('cellsCount')
    .get(function () {
        return this.rows * this.cols
    })

schema.methods.idx = function (row: number, col: number) {
    if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) return -1
    return row * this.rows + col
}

schema.methods.cell = function <ICell>(idx: number) {
    const row = Math.floor(idx / this.cols)
    const col = idx - row * this.cols
    return {row, col}
}


export const SeaBattle = mongoose.model<ISeaBattle>(name, schema)