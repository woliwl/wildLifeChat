const Base = require('../base.js');
const axios = require('axios');

// 引入解密工具
const RdWXBizDataCrypt = require('../../config/RdWXBizDataCrypt.js')

module.exports = class extends Base {
  // 获取登录凭证
  async getSecssionKeyAction() {
      // 用户登录临时凭据
      let code = this.post()
      // 小程序AppKey、AppSecret
      let client_id = {client_id:"MLeAyMOeUKRKommN34z2aXE1l1o0GNc1"}
      let sk = {sk:"g4N1HX48T2FeaaDVoMAmPvCQ6cBEW0Li"}
      // 生成请求参数
      let param = Object.assign(code,client_id,sk)
      // 获取用户唯一标识
      let {data} = await axios({
          url:"https://spapi.baidu.com/oauth/jscode2sessionkey",
          method:"POST",
          params:param,
          header:{"Content-Type":"Application/x-www-form-urlencoded"}
      }).catch(err =>{
          console.log(err)
      })      
      let skey = {skey: think.md5(think.md5(data.session_key)+think.md5(data.openid)+think.md5('Arterli'))}
      // 将用户唯一标识存入数据库存入的有 openid、session_key、skey
      let userIdData = Object.assign(data,skey)
      // console.log(userIdData)
      // thenAdd(数据,条件) 条件里的内容存在就不会存储
      await this.model('userId').thenAdd(userIdData,userIdData)
      return this.json(skey)
  }
  
  // 对用户信息进行解密
  async getUserDataAction(){
      let data = this.post()
      let userId = await this.model('userId').where({skey:data.skey}).find()
      const pc = new RdWXBizDataCrypt(userId.openid,userId.session_key)
      const userData = pc.decryptData(data.encryptedData,data.iv)
      await this.model('userData').thenAdd(userData,userData)
      return this.json(userData)
  }
        
};
