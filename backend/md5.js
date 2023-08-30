const crypto = require("crypto");

module.exports = function (str){
    return crypto.createHash('sha1').update('zz').digest('hex')
}