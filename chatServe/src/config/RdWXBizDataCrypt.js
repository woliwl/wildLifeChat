var crypto = require('crypto')

function RdWXBizDataCrypt(openid, sessionKey) {
  this.openid = openid
  this.sessionKey = sessionKey
}

RdWXBizDataCrypt.prototype.decryptData = function (encryptedData, iv) {
  // base64 decode
  var sessionKey = Buffer.from(this.sessionKey, 'base64')
  encryptedData = Buffer.from(encryptedData, 'base64')
  iv = Buffer.from(iv, 'base64')

  try {
     // 解密
    var decipher = crypto.createDecipheriv('aes192', sessionKey, iv)
    // 设置自动 padding 为 true，删除填充补位
    decipher.setAutoPadding(true)
    var decoded = decipher.update(encryptedData, 'binary', 'utf8')
    decoded += decipher.final('utf8')
    decoded = decoded.substring(decoded.indexOf('{'),decoded.indexOf('}')+1)
    decoded = JSON.parse(decoded)
  } catch (err) {
    console.log(err)
  }

  if (decoded.openid !== this.openid) {
    throw new Error('Illegal Buffer')
  }

  return decoded
}

module.exports = RdWXBizDataCrypt
