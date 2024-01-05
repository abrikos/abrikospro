import mongoose from 'mongoose';
import {IFiscal} from "~/server/models/fiscal.model";
import {IUser} from "~/server/models/user.model";

const Schema = mongoose.Schema;
const name = 'minesweeper';

export interface ICell {
    row: number
    col: number
    idx: number
    mine: boolean
    open: boolean
}

export interface IMinesweeper {
    id: string,
    rows: number
    cols: number
    cellsCount: number
    percent: number
    mines: number[]
    turns: number[]
    idx: Function
    cell: Function
    counts: Object[]
    finished: number
    createdAt: Date
}

const schema = new Schema({
        rows: {type: Number, required: true},
        cols: {type: Number, required: true},
        percent: {type: Number, required: true},
        mines: [{type: Number, required: true}],
        turns: [{type: Number}],
        counts: [{type: Object}],
        finished: {type: Number, default: 0},

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


export const Minesweeper = mongoose.model<IMinesweeper>(name, schema)