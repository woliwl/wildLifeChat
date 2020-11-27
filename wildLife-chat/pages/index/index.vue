<template>
	<view class="container">
        <!-- <image src="../../static/img/bg.png" :style="{'height':Heigh*2 + 'rpx','width':Width*2 + 'rpx'}" class="img"></image> -->
		<button open-type="getUserInfo" @getuserinfo = "bdGetUserInfo" class="btn">授权登录</button>
	</view>
</template>

<script>
    import {getSecssionKey,getUserData} from '../../api/user.js'
	export default {
		data() {
			return {
				param:{},
                skey:'',
                Heigh:0,
                Width:0
			}
		},
		methods: {
           bdGetUserInfo(info){
               this.param = {
                   // 加密后的session_key
                   skey:this.skey,
                   // 加密向量iv
                   iv:info.detail.iv,
                   encryptedData:info.detail.encryptedData
               }
               getUserData(this.param).then(res =>{
                   uni.setStorageSync('userData',res.data)
                   uni.showToast({
                       title:"登录成功"
                   })
                   uni.switchTab({
                       url:'../news/news'
                   })
               })
               
           },
           
           loginCor(){
               uni.login({
                   provider:"baidu",
               }).then(res =>{
                   getSecssionKey(res[1]).then(skey =>{
                       this.skey = skey.data.skey
                   })
               })
           },
           
           getHeight(){
            uni.getSystemInfo({
                success: (res) => {
                    this.Heigh = res.windowHeight 
                    this.Width = res.windowWidth 
                    console.log(res)
                    uni.setStorageSync('Width',this.Width)
                    uni.setStorageSync('Heigh',this.Heigh)
                }
            })
           },
		},
        onLoad() {
            this.loginCor()
            this.getHeight()
        },
        onShow() {
            swan.setPageInfo({
                title:'野动聊天器',
                keywords:'聊天机器人，野生动物，聊天，百度，百度贴吧，濒危动物，百科',
                description:'通过与动物聊天的方式来了解动物，了解他们的生活现状。'
            })
        }
	}
</script>

<style lang="scss">
	.container {
        position: absolute;
        width: 100%;
        height: 100%;
        background: url('../../static/img/bg.png');
        background-size: 100% 100%;
		.img{
            position: fixed;
            top: 0;
        }
        
        .btn{
            position: fixed;
            top: 50%;
            background-color: rgba($color: #fff, $alpha: 0.3);
            width: 80%;
            left: 10%;
            color: #fff;
            box-shadow: 0rpx 0rpx 10rpx #e7e7e7;
            
            &::after{
                border: 1px solid rgba($color: #fff, $alpha: 0.3);
            }
        }
	}
    
</style>
