export default defineEventHandler(async (event) => {
    await User.syncIndexes()
    await Token.syncIndexes()
    await Fiscal.syncIndexes()
    await Good.syncIndexes()
})