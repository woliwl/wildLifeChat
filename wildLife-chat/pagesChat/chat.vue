<template>
    <view>
        <view class="content" :style="{'height':chatHeight+'px'}">
            <view class="header">
                <view class="name">{{animalData.nickname}}</view>
                <view class="sign">{{animalData.sign}}</view>
            </view>            
            <scroll-view class="msg-list" scroll-y="true" :scroll-top="scrollTop" id="scrollview" :style="{'height':chatHeight+'px'}">
                <!-- 实现聊天机器人
                 1.左边为机器人，右边为用户
                 2.机器人消息是使用用户消息模糊匹配数据库
                 3.定义一个总的消息数组，包含机器人用户id、消息内容、消息时间，根据不同的id设置消息的排版和样式
                 -->
                <view v-for="(item,index) in chatContent" id="msgbox">
                    <view class="msgbox" :class="item.openid==userData.openid?'userMsg':''" :key="index">
                        <view class="avater">
                            <image class="img" :src="item.headimgurl" mode="aspectFill"></image>
                        </view>

                        <view class="msgtext">
                            <view class="text">{{item.chatMsg}}</view>
                        </view>
                    </view>
                </view>

            </scroll-view>
        </view>

        <!-- 输入框 -->
        <view class="footer" :style="{bottom: inputBottom+'px'}">
            <view class="inputRoom" @click="showChatBox">{{textMsg}}</view>
            <button @click="send" class="send-btn">发送</button>
        </view>
        
        <!-- 聊天语句面板 -->
        <view class="chatbox" v-if="chatBoxShow==true">
            <view class="userChatlist" v-for="(list,listIndex) in userChatlist" :key="listIndex"
            @click="selectChat(list.keyword)">
                <view class="text">{{list.keyword}}</view>
            </view>
        </view>       
       </view>
</template>

<script>
    import {getReply,storeChat,getChatContent,getUserChat} from '../api/chat.js'
    import {getAnimalMsg} from '../api/animal.js'
    import currentDate from '../lib/currentDate.js'
    
    export default {
        data() {
            return {
                userData: {},
                scrollTop: 0,
                mitemHeight: 0, //所有消息的高
                windowHeight: 0, //显示的高度
                inputBottom: 0,
                param: '',
                textMsg: '',
                chatContent: [],
                // histChat:[],
                animalData: {},
                
                isRefresh:false,
                _freshing:false,
                
                chatHeight:uni.getStorageSync('Heigh')-40,
                chatBoxShow:false,
                userChatlist:[]
            };
        },

        methods: {
            selectChat(word){
                this.textMsg = word
            },
            // 获取动物信息
            getAnimal() {
                getAnimalMsg({
                    openid: this.param.animalopenid
                }).then(res => {
                    this.animalData = res.data
                })
            },

            send() {
                if (this.textMsg == '') {
                    uni.showToast({
                        title: "发送内容不能为空",
                        icon: 'none'
                    })
                } else {
                    let userContent = {
                        roomid: this.param.roomid,
                        openid: this.userData.openid,
                        headimgurl: this.userData.headimgurl,
                        chatMsg: this.textMsg,
                        time: currentDate.now()
                    }
                    this.chatContent.push(userContent)
                    storeChat(userContent).then(res => {
                        this.textMsg = ''
                    })
                    this.getReplys(userContent)
                    this.scrollToBottom()
                }
            },

            // 获取回复
            getReplys(msg) {
                let param = {
                    openid: this.param.animalopenid,
                    chatMsg: msg.chatMsg
                }
                getReply(param).then(res => {
                    console.log(res)
                    let {data} = res
                    if(JSON.stringify(data) == "{}"){
                        uni.showToast({
                            title:'太难了o(╥﹏╥)o，换个问题叭！',
                            icon:"none"
                        })
                    }else{
                        let animalContent = {
                            roomid: this.param.roomid,
                            openid: data.openid,
                            headimgurl: data.headimgurl,
                            chatMsg: data.chatMsg,
                            time: currentDate.filters(data.time)
                        }
                        this.chatContent.push(animalContent)
                        storeChat(animalContent)
                    }
                })
                this.scrollToBottom()
            },

            //历史消息
            async getChat() {
                let param = {roomid: this.param.roomid}
                let {data} = await getChatContent(param)
                this.chatContent = data
                this.userChatlist = (await getUserChat()).data
            },

            focusTextarea(e) {
                this.inputBottom = e.detail.height
                this.scrollTop += 1
            },
            blurTextarea(e) {
                this.inputBottom = 0
                this.scrollTop += 1
            },

            // 滚动
            scrollToBottom() {
                let that = this;
                let query = uni.createSelectorQuery();
                query.selectAll('.msgbox').boundingClientRect();
                query.select('#scrollview').boundingClientRect();
                query.exec((res) => {
                    that.mitemHeight = 0;
                    //获取所有内部子元素的高度
                    // 因为vue的虚拟DOM 每次生成的新消息都是之前的，所以采用异步setTimeout
                    res[0].forEach((rect) => that.mitemHeight = that.mitemHeight + rect.height + 40)
                    setTimeout(() => {
                        //判断子元素高度是否大于显示高度
                        if (that.mitemHeight > (that.windowHeight - 100)) {
                            //用子元素的高度减去显示的高度就获益获得序言滚动的高度
                            that.scrollTop = that.mitemHeight - that.windowHeight
                        }
                    }, 0)
                })
            },
       
            showChatBox(){
                if(this.chatBoxShow == false){
                    this.chatHeight = this.chatHeight-202
                    this.chatBoxShow = true
                }else{
                    this.chatHeight = this.chatHeight+202
                    this.chatBoxShow = false
                }
                this.scrollToBottom()
            }
        },
       onLoad(options) {
            this.userData = uni.getStorageSync('userData')
            this.param = options
            this.getAnimal()
            this.getChat()
        },
        updated() {
            if(this.chatContent.length != 0){
                this.scrollToBottom()
            }
        },
        onShow() {
            swan.setPageInfo({
                title:'野动聊天器',
                keywords:'聊天机器人，野生动物，聊天，百度，百度贴吧，濒危动物，百科',
                description:'通过与动物聊天的方式来了解动物，了解他们的生活现状。'
            })
        }
    };
</script>

<style lang="scss" scoped>
    // 
    .content {
        width: 100vw;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        overflow-y: auto;

        .header {
            width: 100%;
            height: 100rpx;
            flex-shrink: 0;
            color: #242424;
            font-size: 28rpx;
            box-shadow: 0rpx 2rpx 10rpx #bcbcbc;
            background-color: #FFFFFF;
            text-align: center;
            z-index: 5;

            .name {
                height: 50rpx;
                line-height: 80rpx;
            }

            .sign {
                font-size: 18rpx;
                line-height: 60rpx;
                color: #C0C0C0;
            }
        }
        
        .msg-list {
            z-index: 100;
            margin-top: 10rpx;
            height: 90%;
        }

        .msgbox {
            width: 100%;
            display: flex;
            margin-bottom: 40rpx;

            .avater {
                width: 80rpx;
                margin-left: 20rpx;

                .img {
                    width: 80rpx;
                    height: 80rpx;
                    border-radius: 80rpx;
                }
            }

            .msgtext {
                padding: 10rpx 10rpx;
                background: #F2F2F2;
                max-width: 50%;
                min-width: 20rpx;
                margin-left: 20rpx;
                border-radius: 0 20rpx 0 20rpx;
                font-size: 26rpx;
                margin-top: 30rpx;

                .text {
                    display: inline-block;
                    *display: inline;
                    *zoom: 1;
                }
            }
        }

        .userMsg {
            flex-direction: row-reverse;

            .avater {
                margin-right: 20rpx;
            }

            .msgtext {
                background: #00C0A5;
                border-radius: 20rpx 0rpx 20rpx 0rpx;
            }
        }
    }

    // 输入框
    .footer {
        width: 100vw;
        height: 80rpx;
        bottom: 0;
        left: 0px;
        display: flex;
        border-radius: 20rpx 20rpx 0 0;
        border: 2rpx solid #EAEAEA;
        .inputRoom {
            flex: 1;
            width: 85%;
            min-height: 80rpx;
            background: rgba(206, 206, 206, 0.5);
            box-sizing: border-box;
            padding: 20rpx 16rpx;
            
            >input {
                font-size: 30rpx;
                color: rgba(36, 36, 36, 1.0);
                width: auto;
            }
        }

        .send-btn {
            flex-shrink: 0;
            width: 15%;
            min-height: 80rpx;
            padding: 0;
            color: #00C0A5;

            &::after {
                border-radius: none;
                border: none;
            }
        }
    }

    
    // 聊天语句面板
    .chatbox{
        width: 100%;
        height: 400rpx;
        background: #aaecb0;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        .userChatlist{
            background: #F2F2F2;
            padding: 0 10rpx;
            max-width: 100%;
            border-radius: 10rpx;
            height: 50rpx;
            line-height: 50rpx;
            font-size: 24rpx;
            .text {
                display: inline-block;
                *display: inline;
                *zoom: 1;
            }
        }
    }

</style>
