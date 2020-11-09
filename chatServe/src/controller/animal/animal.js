const Base = require('../base.js');
module.exports = class extends Base {
    // 获取动物信息
    async getAnimalAction(){
        let animalData = await this.model('animalData').select()
        return this.json(animalData)
    }
    
    // 通过动物id获取动物详细信息
    async getAnimalMsgAction() {
        let data = this.post()
        let animalMsg = await this.model('animalData').where(data).find()
        return this.json(animalMsg)
    }
    
    // 搜索动物
    async searchAnimalAction() {
        // 关键字
        let data = this.post()
        if(data.value !== ''){
            let searchRes = await this.model('animalData').where({
                'nickname|othername|status|spread|grade|sign':
                ['like','%'+data.value+'%']
            }).select()
            return this.json(searchRes)
        }        
    }
}