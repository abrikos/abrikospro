import {Minesweeper} from "~/server/models/minesweeper.model";
import {SeaBattle} from "~/server/models/sea-battle.model";

export default defineEventHandler(async (event) => {
    await User.syncIndexes()
    await Token.syncIndexes()
    await Fiscal.syncIndexes()
    await Good.syncIndexes()
    await Minesweeper.syncIndexes()
    await SeaBattle.syncIndexes()
})