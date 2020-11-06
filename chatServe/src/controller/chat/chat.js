const Base = require('../base.js');
const Segment = require('segment');
const segment = new Segment()
segment.useDefault();

module.exports = class extends Base {
    // 点击动物列表进入聊天室--聊天室建立
    async createChatRoomAction(){
        let data = this.post()
        await this.model('chatRoom').thenAdd(data,{roomid:data.roomid})
    }
    
    // 获取聊天室列表
    async getChatRoomListAction(){
        let res = await this.model('chatRoom').select()
        return this.json(res)
    }
    
    // 删除聊天室    
    async deleteRoomAction(){
        let data = this.post()
        await this.model('chatRoom').where(data).delete()
    }
    
    //获取动物回复信息
    async getReplyAction() {
        let data = this.post()
        // 判断动物是否灭绝
        let isdie = await this.model('animalData').where({openid:data.openid}).getField('isdie')
        if(isdie[0]==0){
            // 已灭绝 
            let resdie = await this.model('animalChat').where({openid:data.openid}).find()
            resdie = Object.assign(resdie,{time:Date.now()})
            return this.json(resdie)
        }else{
            let res = await this.model('animalChat').where(
            {
                openid:data.openid,
                keyword:['like', '%'+data.chatMsg+'%']
            }
            ).find()
            console.log()
            return this.json(res)
        }
        
    }
    
    // 获取用户发出的消息
    async getUserChatAction(){
        let res = await this.model('userChat').select()
        return this.json(res)
    }
    
    // 存入对话
    async storeChatAction(){
        let data = this.post()
        await this.model('chatContent').add(data)
    }
    // 拿出
    async getChatContentAction(){
        let data = this.post()
        let res = await this.model('chatContent').where(data).select()
        return this.json(res)
    }

}