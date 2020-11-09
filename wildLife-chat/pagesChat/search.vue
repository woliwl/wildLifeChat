<template>
    <view class="content">
        <view class="friends" :style="{'height':Heigh*2-480 + 'rpx'}">
            <scroll-view scroll-y="true" class="scroll-Y" :style="{'height':Heigh*2-400 + 'rpx'}">
                 <view class="friendList" v-for="(item,index) in searchRes" :key="index">
                     <!-- 头像 -->
                     <view class="avater" @click="toMsg(item.openid)" :class="item.isdie==0?'avaterGrey':''">
                         <image :src="item.headimgurl" class="img"></image>
                         <view class="doc"></view>
                     </view>
                     <!-- 名称，个性签名 -->
                     <view class="content" @click="toChat(item)">
                         <view class="name">{{item.nickname}}</view>
                         <view class="sign">{{item.sign}}</view>
                     </view>
                 </view>
            </scroll-view>
        </view>
    </view>
</template>

<script>
    import {createChatRoom} from '../api/chat.js'
export default {
    data() {
        return {
            Heigh:uni.getStorageSync('Heigh'),
            Width:uni.getStorageSync('Width'),
            searchRes:[],
            userData:{},
        };
    },
    methods:{
      toChat(item){
          let param = {
              roomid:this.userData.openid+item.openid,
              animalopenid:item.openid,
              useropenid:this.userData.openid,
              headimgurl:item.headimgurl,
              isdie:item.isdie,
              nickname:item.nickname
          }
          // 创建聊天室
          createChatRoom(param).then(res =>{
              // 创建成功带参数跳转聊天页面
              uni.navigateTo({
                  url:"../pagesChat/chat?roomid="+param.roomid+
                  "&animalopenid="+param.animalopenid
              })
          })
                      
      },  
      toMsg(openid){
          uni.navigateTo({
              url:"../pagesMsg/msg?openid="+openid
          })
      }
    },
    onLoad(res){
        this.searchRes = JSON.parse(res.searchRes)
        this.userData = uni.getStorageSync('userData')
        console.log(this.searchRes)
    }
};
</script>

<style lang="scss" scoped>
    .friends{
        width: 100%;
        position: fixed;
        top: 50rpx;
        .friendList{
            width: 100%;
            height: 140rpx;
            border-bottom:1rpx solid rgba($color: #D0D2D3, $alpha: 0.5);
            display: flex;
            .avater{
                width: 20%;
                height: 140rpx;
                position: relative;
                .img{
                    margin-left: 30rpx;
                    width: 100rpx;
                    height: 100rpx;
                    margin-top: 20rpx;
                    border-radius: 100rpx;
                }
                .doc{
                    width: 20rpx;
                    height: 20rpx;
                    border-radius: 20rpx;
                    background-color: #06A88E;
                    margin-left: 40rpx;
                    margin-top: -30rpx;
                    position: absolute;
                }
            }
            .content{
                width: 60%;
                height: 140rpx;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                padding-left: 30rpx;
                .sign{
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    font-size: 24rpx;
                    color: #C0C0C0;
                    margin-top: -25rpx;
                }
            }
            
            .avaterGrey{
               .doc{
                   background-color: #EAECEC
               }
               // 黑白滤镜
               .img{
                   filter: grayscale(100%); 
                   filter: gray; 
               }
            }
        }
    }
</style>
