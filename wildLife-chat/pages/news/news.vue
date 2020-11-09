<template>
	<view class="container" :style="{'width':Width*2 + 'rpx'}">
       <!-- 用户个人信息 -->
       <view class="userData">
           <view class="avater">
               <image :src="userData.headimgurl" mode="aspectFill" class="img"></image>
           </view>
           <view class="nickname">
               {{userData.nickname}}
           </view>
       </view>
       <!-- 搜索聊天记录 -->
      
       <!-- 消息列表 -->
       <view class="newsBox" :style="{'height':Heigh*2-400 + 'rpx'}">
           <scroll-view scroll-y="true" class="scroll-Y" :style="{'height':Heigh*2-400 + 'rpx'}">
                <view class="newsList" v-for="(item,index) in chatRoomList" :key="index">
                    <!-- 头像 -->
                    <view class="avater" :class="{'lineFriends':item.isdie==0}" @click="toMsg(item.animalopenid)" >
                        <image :src="item.headimgurl" mode="aspectFill" class="img"></image>
                        <view class="doc"></view>
                    </view>
                    <!-- 名称，最新消息 -->
                    <view class="content" @click="toChat(item)">
                        <view class="name">{{item.nickname}}</view>
                        <view class="news">{{item.newMsg}}</view>
                    </view>
                    <!-- 最新消息时间 -->
                    <view class="dele" @click="deleteRoom(item.roomid)">
                        <icon type="close" size="20"></icon>
                    </view>
                </view>
           </scroll-view>
       </view>
	</view>
</template>

<script>
    import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
    import {getChatRoomList,deleteRoom} from '../../api/chat.js'
    import {getAnimal} from '../../api/animal.js'
	export default {
        components: {uniSearchBar},
		data() {
			return {
				userData:{},
                Heigh:uni.getStorageSync('Heigh'),
                Width:uni.getStorageSync('Width'),
                chatRoomList:[]
			};
		},
        methods:{          
          // 获取聊天室列表
          getChatRoom(){
              getChatRoomList().then(res =>{
                  this.chatRoomList = res.data
              })
          },
          
          // 跳转聊天界面
          toChat(item){
              uni.navigateTo({
                  url:"../../pagesChat/chat?roomid="+item.roomid+"&animalopenid="+item.animalopenid
              })
          },
          // 跳转到动物详细信息界面
          toMsg(openid){
              uni.navigateTo({
                  url:"../../pagesMsg/msg?openid="+openid
              })
          },
          
          // 删除聊天室
          deleteRoom(roomid){
              deleteRoom({roomid:roomid}).then(res =>{
                  console.log(res)
                  this.getChatRoom()
              })
          }
        },
        onShow() {
            this.getChatRoom()
            swan.setPageInfo({
                title:'野动聊天器',
                keywords:'聊天机器人，野生动物，聊天，百度，百度贴吧，濒危动物，百科',
                description:'通过与动物聊天的方式来了解动物，了解他们的生活现状。'
            })
        },
        onLoad() {
            this.userData = uni.getStorageSync('userData')
        }
	}
</script>

<style lang="scss">
    .userData{
        width: 100%;
        height: 100rpx;
        position: fixed;
        top: 0;
        display: flex;
        color: #242424;
        font-size: 24rpx;
        box-shadow: 0rpx 2rpx 10rpx #BCBCBC;
        background-color: #FFFFFF;
        .avater{
            width: 100rpx;
            height: 100rpx;
            // padding-left: 10rpx;
            .img{
                width: 60rpx;
                height: 60rpx;
                border-radius: 60rpx;
                margin: 20rpx;
            }
        }
        .nickname{
            height: 100rpx;
            line-height: 100rpx;
        }
        
    }
    
    .search{
        position: fixed;
        top: 101rpx;
        width: 100%;
        .sw-1__uni-searchbar__box.sw-1__data-v-64ee3838{
            height: 60rpx;
        }
    }
    
    .newsBox{
        width: 100%;
        position: fixed;
        top: 201rpx;
        .newsList{
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
            .lineFriends{
                .doc{
                    background-color: #EAECEC
                }
                // 黑白滤镜
                .img{
                    filter: grayscale(100%); 
                    filter: gray; 
                }
            }
            .content{
                width: 60%;
                height: 140rpx;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                padding-left: 30rpx;
                .news{
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    font-size: 24rpx;
                    color: #C0C0C0;
                    margin-top: -25rpx;
                }
            }
            .dele{
                width: 20%;
                color: #C0C0C0;                
                height: 140rpx;
                line-height: 130rpx;
                text-align: center;
            }
        }
        
    }
</style>
