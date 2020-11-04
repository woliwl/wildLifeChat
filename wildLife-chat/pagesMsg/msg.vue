<template>
    <view class="content">
        <!--动物头像-->
        <view class="header" >
                <image :src="animalMsg.headimgurl" class="avater"></image>
        </view>
        <!-- 动物名称、个性签名 -->
        <view class="nameSign">
            <view class="name">{{animalMsg.nickname}}</view>
            <view class="sign">{{animalMsg.sign}}</view>
        </view>
        
        <!-- 详细信息列表 -->
        <view class="dataList">
            <!-- 姓名、学名 -->
            <view class="scName data" v-if="animalMsg.name != null">
                <view class="icon">
                    <image src="../static/img/name.png" mode="aspectFill"></image>
                    <view class="title">学名</view>
                </view>
                <view class="text">
                    {{animalMsg.name}}
                </view>
            </view>
            
            <!-- 别名 -->
            <view class="alName data" v-if="animalMsg.othername != null">
                <view class="icon">
                    <image src="../static/img/othername.png" mode="aspectFill"></image>
                    <view class="title">别名</view>
                </view>
                <view class="text">
                    {{animalMsg.othername}}
                </view>
            </view>
            
            <!-- 英文名 -->
            <view class="egName data" v-if="animalMsg.engname != null">
                <view class="icon">
                    <image src="../static/img/engname.png" mode="aspectFill"></image>
                    <view class="title">英文名</view>
                </view>
                <view class="text">
                    {{animalMsg.engname}}
                </view>
            </view>
            
            <!-- 分类地位 -->
            <view class="status data" v-if="animalMsg.status != null">
                <view class="icon">
                    <image src="../static/img/diwei.png" mode="aspectFill"></image>
                    <view class="title">分类地位</view>
                </view>
                <view class="text">
                    {{animalMsg.status}}
                </view>
            </view>
            
            <!-- 外形特征 -->
            <view class="feat data" v-if="animalMsg.feat != null">
                <view class="icon">
                    <image src="../static/img/tz.png" mode="aspectFill"></image>
                    <view class="title">外形特征</view>
                </view>
                <view class="text">
                    {{animalMsg.feat}}
                </view>
            </view>
            
            <!-- 分布范围 -->
            <view class="spread data" v-if="animalMsg.spread != null">
                <view class="icon">
                    <image src="../static/img/fb.png" mode="aspectFill"></image>
                    <view class="title">分布范围</view>
                </view>
                <view class="text">
                   {{animalMsg.spread}}
                </view>
            </view>
            
            <!-- 生活环境 -->
            <view class="life data" v-if="animalMsg.life != null">
                <view class="icon">
                    <image src="../static/img/hj.png" mode="aspectFill"></image>
                    <view class="title">生活环境</view>
                </view>
                <view class="text">
                 {{animalMsg.life}}
                </view>
            </view>
            
            <!-- 生活习性 -->
            <view class="habit data" v-if="animalMsg.habit != null">
                <view class="icon">
                    <image src="../static/img/xx.png" mode="aspectFill"></image>
                    <view class="title">生活习性</view>
                </view>
                <view class="text">
                {{animalMsg.habit}}
                </view>
            </view>
            
            <!-- 濒危等级-->
            <view class="grade data" v-if="animalMsg.grade != null">
                <view class="icon">
                    <image src="../static/img/bw.png" mode="aspectFill"></image>
                    <view class="title">濒危等级</view>
                </view>
                <view class="text">
                {{animalMsg.grade}}
                </view>
            </view>
            
            <!-- 种群现状 -->
            <view class="now data" v-if="animalMsg.now != null">
                <view class="icon">
                    <image src="../static/img/xz.png" mode="aspectFill"></image>
                    <view class="title">种群现状</view>
                </view>
                <view class="text">
                {{animalMsg.now}}
                </view>
            </view>
            
        </view>
        
    </view>
</template>

<script>
    import {getAnimalMsg} from "../api/animal.js"
export default {
    data() {
        return {
            Heigh:uni.getStorageSync('Heigh'),
            Width:uni.getStorageSync('Width'),
            animalMsg:{}
        };
    },
    methods:{
        getMsg(options){
            getAnimalMsg(options).then(res =>{
                this.animalMsg = res.data
            })
        }
    },
    onLoad(options) {
        this.getMsg(options)
    }
};
</script>

<style lang="scss" scoped>
    .header{
        width: 100%;
        height: 120rpx;
        box-shadow: 0rpx 1rpx 10rpx #bcbcbc;
        // 居中显示
        display: flex;
        justify-content: center;
        background-image: url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603879917455&di=f58610be3336067f51764fbe58e1c10d&imgtype=0&src=http%3A%2F%2Fimg02.tooopen.com%2Fimages%2F20160409%2Ftooopen_sy_158871181735.jpg');
        background-size: 100%;
        .avater{
            width: 150rpx;
            height: 150rpx;
            border-radius: 150rpx;
            margin-top: 20rpx;
            box-shadow: 0rpx 2rpx 20rpx #FFFFFF;
        }
    }
    
    .nameSign{
        width: 100%;
        height: 80rpx;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        margin-top: 50rpx;
        .name{
            text-align: center;
            height: 40rpx;
            font-size: 30rpx;
            color: #242424;
        }
        .sign{
            font-size: 20rpx;
            color: #C0C0C0;
        }
    }
    
    .dataList{
        width: 90%;
        margin-left: 5%;
        display: flex;
        flex-direction: column;
        margin-top: 30rpx;
        .data{
            margin-top: 40rpx;
            border-bottom: 2rpx solid rgba($color: #bcbcbc, $alpha: 0.5);
        }
        .data .icon{
            width: 100%;
            height: 50rpx;
            display: flex;
            > image{
                width: 50rpx;
                height: 50rpx;
                margin-right: 10rpx;
            }
            .title{
                font-size: 34rpx;
                color: #909090;
                font-weight: 400;
                line-height: 50rpx;
            }
        }
        .data .text{
            width: 100%;
            font-size: 26rpx;
            text-align: left;
            color: #666666;
            padding: 10rpx 10rpx;
            text-indent: 2em;
            line-height: 2em;
        }
        
        
    }
    
</style>
