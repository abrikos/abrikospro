const layouts = {
    'test.abrikos.pro': 'receiptLayout',
    'receipt.abrikos.pro': 'receiptLayout',
    'games.abrikos.pro': 'gameLayout',
    'test2.abrikos.pro': 'gameLayout',
}
export default layouts[location.host] || 'default'
