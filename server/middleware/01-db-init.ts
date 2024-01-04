import {Minesweeper} from "~/server/models/minesweeper.model";

export default defineEventHandler(async (event) => {
    await User.syncIndexes()
    await Token.syncIndexes()
    await Fiscal.syncIndexes()
    await Good.syncIndexes()
    await Minesweeper.syncIndexes()
})