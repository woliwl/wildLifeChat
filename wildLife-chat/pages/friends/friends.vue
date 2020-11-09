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
        <!-- 好友列表切换按钮 -->
        <view class="entry">
            <view class="left btn" @click="onLineFriends">
                <view :class="{'clickStyle':leftStyle==true}">
                    在线好友
                </view>
            </view>
            <view class="right btn" @click="lineFriends" >
               <view :class="{'clickStyle':rightStyle==true}">
                   离线好友
               </view>
            </view>
        </view>
        
        <!-- 搜索好友 -->
        <view class="search">
            <uni-search-bar placeholder="搜索" 
            @confirm="search" cancelButton="none" 
            bgColor="#EAECEC" radius="0"></uni-search-bar>
        </view>
        
        <!-- 在线好友列表 -->
        <view class="onLineFriends" :style="{'height':Heigh*2-480 + 'rpx'}" v-if="leftStyle==true">
            <scroll-view scroll-y="true" class="scroll-Y" :style="{'height':Heigh*2-400 + 'rpx'}">
                 <view class="friendList" v-for="(item1,index1) in onlineData" :key="index1">
                     <!-- 头像 -->
                     <view class="avater" @click="toMsg(item1.openid)">
                         <image :src="item1.headimgurl" class="img"></image>
                         <view class="doc"></view>
                     </view>
                     <!-- 名称，个性签名 -->
                     <view class="content" @click="toChat(item1)">
                         <view class="name">{{item1.nickname}}</view>
                         <view class="sign">{{item1.sign}}</view>
                     </view>
                 </view>
            </scroll-view>
        </view>
        
        <!-- 离线好友列表 -->
        <view class="lineFriends" :style="{'height':Heigh*2-480 + 'rpx'}" v-if="rightStyle==true">
            <scroll-view scroll-y="true" class="scroll-Y" :style="{'height':Heigh*2-400 + 'rpx'}">
                 <view class="friendList" v-for="(item2,index2) in lineData" :key="index2">
                     <!-- 头像 --> 
                     <view class="avater" @click="toMsg(item2.openid)">
                         <image :src="item2.headimgurl" class="img"></image>
                         <view class="doc"></view>
                     </view>
                     <!-- 名称，个性签名 -->
                     <view class="content" @click="toChat(item2)">
                         <view class="name">{{item2.nickname}}</view>
                         <view class="sign">{{item2.sign}}</view>
                     </view>
                 </view>
            </scroll-view>
        </view>
        
	</view>
</template>

<script>
    import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
    import {getAnimal,searchAnimal} from '../../api/animal.js'
    import {createChatRoom} from '../../api/chat.js'
	export default {
        components: {uniSearchBar},
		data() {
			return {
				userData:{},
			    Heigh:uni.getStorageSync('Heigh'),
			    Width:uni.getStorageSync('Width'),
                leftStyle:true,
                rightStyle:false,
                // 在线好友
                onlineData:[],
                // 离线好友
                lineData:[]
			};
		},
        methods:{
          // 搜索好友
          search(value){
              searchAnimal(value).then(res =>{
                  let {data} = res
                  if(data == 'OK'){
                      uni.showToast({
                          title:"请输入搜索内容",
                          icon:"none"
                      })
                  }else if(data.length == 0){
                      uni.showToast({
                          title:"暂无搜索内容",
                          icon:"none"
                      })
                  }else {
                      let jsonData = encodeURIComponent(JSON.stringify(data))
                      uni.navigateTo({
                          url:'../../pagesChat/search?searchRes=' + jsonData
                      })
                  }
              })
          },
          //获取好友
          getAnimalData(){
              getAnimal().then(res =>{
                  let {data} = res
                  data.forEach(el =>{
                      if(el.isdie==1){
                          this.onlineData.push(el)
                      }else{
                          this.lineData.push(el)
                      }
                  })
              })
          },
          // 显示在线好友
          onLineFriends(){
              this.leftStyle = true
              this.rightStyle = false
             
          },
          // 显示离线好友
          lineFriends(){
              this.leftStyle = false
              this.rightStyle = true
             
          },          
          
          // 跳转聊天室界面
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
                      url:"../../pagesChat/chat?roomid="+param.roomid+
                      "&animalopenid="+param.animalopenid
                  })
              })
                          
          },
          // 跳转到动物详细信息界面
          toMsg(openid){
              uni.navigateTo({
                  url:"../../pagesMsg/msg?openid="+openid
              })
          }
        },
        onLoad() {
            this.userData = uni.getStorageSync('userData')
            this.getAnimalData()
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
    // 个人头像处
    .userData{
        width: 100%;
        height: 100rpx;
        position: fixed;
        top: 0;
        display: flex;
        color: #242424;
        font-size: 24rpx;
        // box-shadow: 0rpx 2rpx 10rpx #BCBCBC;
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
    
    // 切换按钮处
    .entry{
        width: 100%;
        height: 80rpx;
        position: fixed;
        top: 100rpx;
        box-shadow: 0rpx 8rpx 10rpx #d8d8d8;
        display: flex;
        justify-content: space-between;
        z-index: 5;
        .btn{
            width: 50%;
            text-align: center;
            line-height: 80rpx;
            height: 80rpx;
            color: #C0C0C0;
            font-size: 26rpx;
        }
        .clickStyle{
            border-bottom: 4rpx solid #06A88E;
            color:#06A88E;
            width: 50%;
            height: 75rpx;
            margin-left: 25%; 
        }
    }
    
    // 搜索框处
    .search{
        position: fixed;
        top: 181rpx;
        width: 100%;
        z-index: 1;
        .sw-1__uni-searchbar__box.sw-1__data-v-64ee3838{
            height: 60rpx;
        }
    }
    
    // 在线好友
    .onLineFriends,.lineFriends{
        width: 100%;
        position: fixed;
        top: 281rpx;
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
        }
    }

    .lineFriends .friendList .avater{
        .doc{
            background-color: #EAECEC
        }
        // 黑白滤镜
        .img{
            filter: grayscale(100%); 
            filter: gray; 
        }
    }
</style>
