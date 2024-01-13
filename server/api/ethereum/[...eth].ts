const router = createRouter()

router.get('/prize', defineEventHandler(async (event) => {
    const price = await utils.ethPrice()
    return 1 / price
}))
router.get('/price', defineEventHandler(async (event) => {
    return utils.ethPrice()
}))

export default useBase('/api/ethereum', router.handler)