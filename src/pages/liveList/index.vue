<template>
    <view class="liveList">
        <swiper class="swiper" indicator-dots="{{indicatorDots}}" autoplay="{{autoplay}}" interval="{{interval}}" duration="{{duration}}" wx:if="{{carousel.length > 0}}" autoplay interval="4000" circular >
            <block wx:for="{{carousel}}" wx:key="index">
                <swiper-item>
                    <!-- 直播中 -->
                    <view class="banner" @tap="goDetails(item.prevueId)">
                        <image class="images" mode="aspectFill" src="{{item.coverUrl}}" wx:if="{{item.coverUrl != 'http://image.vdongchina.com/null'}}"></image>
                        <image class="images" src="http://image.vdongchina.com/M00/06/48/ZSUkmVobxeGEAYUUAAAAANJDVXU501.png" wx:if="{{item.coverUrl == 'http://image.vdongchina.com/null'}}"></image>
                        <view class="liveing" wx:if="{{item.liveState == 2}}">
                            <view class="living_left"><text class="bit"></text>直播中</view>
                            <view class="living_right">{{item.userNum || 0}}观看</view>
                        </view>
                        <view class="lived" wx:if="{{item.liveState == 3 && item.recordState == 2}}">
                            <text class="bit"></text>录播中
                        </view>
                        <image class="play" wx:if="{{item.liveState == 2}}" src="http://image.vdongchina.com/M00/06/47/ZSUkmVobweSEUG2JAAAAAPU8obM285.png"></image>
                        <view class="input_view">{{item.title}}</view>
                    </view>
                </swiper-item>
            </block>
        </swiper>
        <view class="noLive" wx:else>
            <image src="http://image.vdongchina.com/M00/06/48/ZSUkmVobxeGEAYUUAAAAANJDVXU501.png" class="image"></image>
            <image src="http://image.vdongchina.com/M00/06/47/ZSUkmVobwgOEfSl5AAAAAIQ7YEE493.png" class="move"></image>
        </view>
        <view class="list">
            <view class="list_titile"><text class="text">直播预告</text><text class="box"></text></view>
            <view class="noPrevueList" wx:if="{{prevueList.length==0}}"><text class="text">暂无直播预告</text></view>
            <form class="form" wx:if="{{prevueList.length>0}}" wx:for="{{prevueList}}" wx:key="index" data-index="{{index}}" @submit="formSubmit" report-submit>
                <view class="listOne">
                    <image class="listOne_head" wx:if="{{item.coverUrl != 'http://image.vdongchina.com/null'}}" src="{{item.coverUrl}}" mode="aspectFill"></image>
                    <view wx:else class="noImg">暂无图片</view>
                    <view class="listOne_right">
                        <view class="liveTitle">{{item.title}}</view>
                        <view class="anchor">主播：{{item.anchorName}}</view>
                        <view class="time">时间 {{item.prevueTime}}</view>
                        <button formType="submit" class="appointe">{{item.bespokeId?'预约成功':'预约直播'}}</button>
                        <view class="line"></view>
                    </view>
                </view>
            </form>
        </view>
    </view>
</template>

<script>
export default {
    config: {
        navigationBarTitleText: '直播列表',
        navigationBarTextStyle: 'black',
        navigationBarBackgroundColor: '#ffffff'
    },
    data () {
        return {
            living:true,
            inputValue:'降温小个子大衣来袭',
            indicatorDots:false,//轮播相关属性
            autoplay:false,
            interval:5000,
            duration:500,
            carousel:[],//轮播数据
            prevueList:[],//预告
            userId:''
        }
    },
    onLoad (options) {
        var that = this;
        this.getList(getApp().globalData.liveUserid)
        this.userId = getApp().globalData.liveUserid
    },
    methods: {
        getList(userId){
            var that = this;
            that.$root.get("/basic/live/app/prevue/list", {userId:userId},function(data){
                if(data.success && data.data){
                    var liveList = data.data.liveList;//直播中
                    var prevueList = data.data.prevueList;//预告列表
                    var recordList = data.data.recordList;//录播
                    var carousel = [...liveList,...recordList];
                    for(let i in carousel){
                        if(carousel[i].userNum<50){
                            carousel[i].userNum = Math.ceil(carousel[i].userNum*32.3)
                        }else if(carousel[i].userNum<100){
                            carousel[i].userNum = Math.ceil(carousel[i].userNum*48.2)
                        }else if(carousel[i].userNum<500){
                            carousel[i].userNum = Math.ceil(carousel[i].userNum*55.4)
                        }else{
                            carousel[i].userNum = Math.ceil(carousel[i].userNum*64.1)
                        }
                        if(carousel[i].userNum > 9999 ){
                            carousel[i].userNum = (carousel[i].userNum / 10000).toFixed(2) + 'w'
                        }
                        carousel[i].coverUrl =  getApp().globalData.imgUrl + carousel[i].coverUrl
                    }
                    for(let i in prevueList){
                        prevueList[i].coverUrl =  getApp().globalData.imgUrl + prevueList[i].coverUrl
                    }
                    // carousel.concat(data.data.closeList)
                    that.prevueList  = prevueList;//预告
                    that.carousel = carousel;
                }else{
                    wx.showToast({
                        title: '暂无数据',
                        icon: 'loading',
                        duration: 2000
                    })
                }
            })
        },
        formSubmit(e){
            console.log(e)
            var that = this;
            var index = e.currentTarget.dataset.index;
            var prevueList = that.prevueList;
            if(prevueList[index].bespokeId){//取消预约
                wx.request({
                    url: that.$root.apiServer+that.$root.appid+'/basic/live/app/bespoke/delete/'+prevueList[index].bespokeId,
                    method: 'POST',
                    header: {'content-type': 'application/json'},
                    success (res) {
                        wx.showToast({
                            title: '已取消预约',
                            icon: 'success',
                            duration: 2000
                        })
                        that.getList(that.userId)
                    },
                    fail (res) {
                        wx.showToast({
                            title: '取消失败',
                            icon: 'loading',
                            duration: 2000
                        })
                    }
                })
                
            }else{//预约
                wx.request({
                    url: that.$root.apiServer+that.$root.appid+'/basic/live/app/bespoke/add',
                    data:{
                        prevueId:prevueList[index].prevueId,
                        userId:that.userId,
                        formId:e.detail.formId
                    },
                    method: 'POST',
                    header: {'Content-Type': 'application/x-www-form-urlencoded'},
                    success (res) {
                        if(res.data.success){
                            wx.showToast({
                                title: '预约成功',
                                icon: 'success',
                                duration: 2000
                            })
                            that.getList(that.userId)
                        }else{
                            wx.showToast({
                                title: '数据异常',
                                icon: 'loading',
                                duration: 2000
                            })
                        }
                    }
                })
            }
        },
        goDetails(prevueId){
            if(this.living){
                wx.navigateTo({
                    url: '../liveDetail/liveDetail?prevueId='+prevueId+'&index=0'
                })
            }
        }
    }
}
</script>

<style>
.swiper{width:100%;height:760rpx;}
.noLive{width:100%;height:760rpx;position:relative;}
.noLive .image{width:100%;height:100%;}
.noLive .move{width:200rpx;height:200rpx;position:absolute;left:50%;top:226rpx;margin-left:-100rpx;}
.banner{width:100%;height:760rpx;position:relative;}
.banner .images{width:100%;height:100%;}
.liveing{width:274rpx;height:46rpx;position:absolute;left:20rpx;top:20rpx;z-index:3;}
.living_left{width:124rpx;height:46rpx;float:left;background-image: linear-gradient(90deg, #FF4665 0%, #EA48C7 100%);border-radius: 32px 0 0 32px;font-size: 24rpx;color: #FFFFFF;line-height:46rpx;padding-left:38rpx;box-sizing: border-box;}
.bit{width:10rpx;height:10rpx;background-color:#fff;border-radius:50%;display:inline-block;position:absolute;left:16rpx;top:18rpx;}
.living_right{height:46rpx;float:left;background:rgba(0,0,0,0.3);border-radius:0 32px 32px 0;color: #FFFFFF;line-height:46rpx;padding-left:10rpx;padding-right:10rpx;box-sizing:border-box;text-align:center;}
.lived{height:46rpx;position:absolute;left:20rpx;top:20rpx;z-index:3;background-image:linear-gradient(90deg, #FF4665 0%, #EA48C7 100%);border-radius:32px;color:#fff;font-size:24rpx;padding-left:36rpx;padding-right:20rpx;box-sizing:border-box;line-height:46rpx;}
.banner .play{width:104rpx;height:104rpx;position:absolute;left:50%;top:328rpx;margin-left:-52rpx;}
.input_view{width:calc(100% - 40rpx);height:88rpx;background-color:#fff;position:absolute;left:20rpx;bottom:20rpx;padding:0 40rpx;box-sizing:border-box;font-size:32rpx;color:#333;line-height:88rpx;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
.list{width:100%;padding:0 20rpx;box-sizing:border-box;}
.list_titile{width:100%;height:100rpx;position:relative;border-bottom:1px solid #F0F0F0;}
.list_titile .text{width:100%;height:100rpx;line-height:100rpx;font-size:32rpx;color:#333333;z-index:9;position:absolute;left:0;top:0;}
.list_titile .box{width:148rpx;height:16rpx;background-color:#F95DA5;position:absolute;left:54rpx;top:58rpx;z-index:3;opacity:0.3;}
.listOne{width:100%;padding:26rpx 0 24rpx 0; display:flex;}
.listOne .noImg{width:160rpx;height:160rpx;float:left;text-align:center;line-height:160rpx;font-size:28rpx;color:#333;border:1px solid #ddd;border-radius:8rpx;}
.listOne_head{width:160rpx;height:160rpx;float:left;}
.listOne_right{width:calc(100% - 160rpx);padding-left:30rpx; box-sizing:border-box;position:relative;}
.liveTitle{width:100%;font-size: 30rpx;color: #333333;line-height:42rpx;margin-top:6rpx;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
.anchor{font-size: 28rpx;color: #999999;line-height:42rpx;margin-top:6rpx;}
.time{font-size: 28rpx;color: #FC4671;line-height:40rpx;margin-top:22rpx;}
.form{width:100%;display:block;}
.appointe{border: 2rpx solid #FC4671;border-radius: 4rpx;width:140rpx;height:50rpx;text-align:center;line-height:50rpx;color:#FC4671;font-size:24rpx;position:absolute;right:0;bottom:0;background-color:#fff;padding:0;}
.line{width:calc(100% - 30rpx);height:1px;background-color:#F0F0F0;position:absolute;right:0;bottom:-24rpx;}
.noPrevueList{width:100%;height:100rpx;text-align:center;}
.noPrevueList .text{height:100rpx;line-height:100rpx;font-size:24rpx;text-align:center;color:#ccc;position:relative;margin:0 auto;}
.noPrevueList:after{content: '';width:100rpx;height:1px;background-color:#ccc;position:absolute;left:0;top:0;}
</style>
