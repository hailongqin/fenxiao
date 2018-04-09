<template>
<view wx:if="{{examine}}">
    <view class="liveEject" wx:if="{{mode == 0}}">
        <view class="liveEject_title">
        	<text class="title_left">直播</text>
        	<text class="title_right" @tap="goList">全部</text>
        </view>
        <scroll-view class="scrollEject" scroll-x wx:if="{{scrollList.length>0}}">
            <form class="scrollBox" wx:for="{{scrollList}}" wx:key="index" style="{{index == 0 ? 'margin-left:20rpx;':''}}" data-index="{{index}}" @submit="formSubmit" report-submit>
                
                <view class="imageBox" data-index="{{index}}" @tap="judge">
                    <image class="images" src="{{item.coverUrl}}" mode="aspectFill" wx:if="{{item.coverUrl != 'http://image.vdongchina.com/null'}}"></image>
                    <image class="images" src="http://image.vdongchina.com/M00/08/1B/ZSUkmVo4tcmENVq0AAAAAMDI4nA963.png" mode="aspectFill" wx:if="{{item.coverUrl == 'http://image.vdongchina.com/null'}}"></image>
                    <view class="time"><image class="timeBit" src="../../img/time.png"></image>{{item.prevueTime}}</view>
                    <view class="leftTop leftLive" wx:if="{{item.liveState == 2}}">直播中</view>
                    <view class="leftTop leftAppointe" wx:if="{{item.liveState == 1}}">预约</view>
                    <view class="leftTop record" wx:if="{{item.liveState == 3 && item.recordState == 2}}">录播中</view>
                    <view class="liveNum" wx:if="{{item.liveState == 2}}"><image class="image" src="http://image.vdongchina.com/M00/07/DB/ZSUkmVozl5iEBHbHAAAAAGya7Dk703.png"></image>{{item.userNum}}</view>
                </view>
                <view class="textBox">
                    <text class="textBox_title">{{item.title}}</text>
                    <view class="textBox_text">
                        <image class="ht" wx:if="{{item.liveState == 2}}" src="http://image.vdongchina.com/M00/07/DB/ZSUkmVozluyEbebOAAAAAJZDdPw074.png"></image>
                        <image class="ht" wx:if="{{item.liveState == 1}}" src="http://image.vdongchina.com/M00/07/DB/ZSUkmVozl2GEOB6rAAAAAMEWpqo750.png"></image>
                        <image class="ht" wx:if="{{item.liveState == 3 && item.recordState == 2}}" src="http://image.vdongchina.com/M00/08/1C/ZSUkmVo4xt6EUC3EAAAAALrz7Ao868.png"></image>
                        主播：{{item.anchorName}}
                    </view>
                    <button formType="submit" class="btn appointe" wx:if="{{item.liveState == 1}}">{{item.bespokeId?'预约成功':'预约直播'}}</button>
                    <view class="btn goLive" wx:if="{{item.liveState == 2}}">立即观看</view>
                    <view class="btn record" wx:if="{{item.liveState == 3 && item.recordState == 2}}">观看录播</view>
                </view>
            </form>
            <view class="more" @tap="goList">
                <image class="images" src="http://image.vdongchina.com/M00/07/B8/ZSUkmVox8NuEHXf7AAAAAFuQx0w373.png"></image>
                <text class="moreLive">更多直播</text>
                <text class="moreBit"></text>
            </view>
        </scroll-view>
        <scroll-view class="scrollEject" scroll-x wx:else>
            <view class="scrollBox" style="margin-left:20rpx;">
                <view class="imageBox">
                    <image class="images" src="http://image.vdongchina.com/M00/07/DB/ZSUkmVozlr6EIjqLAAAAAMDI4nA420.png"></image>
                    <view class="time"><image class="timeBit" src="http://image.vdongchina.com/M00/07/DB/ZSUkmVozl9yEekAKAAAAAHB55uQ971.png"></image>2017-11-11 11:11:11</view>
                </view>
                
                <view class="textBox">
                    <text class="textBox_title">更多直播敬请期待</text>
                    <view class="textBox_text">
                        <image class="ht" src="http://image.vdongchina.com/M00/07/DB/ZSUkmVozlzqEbzlAAAAAABtKLnQ701.png"></image>主播：暂无
                    </view>
                </view>
            </view>
        </scroll-view>
    </view>
    <view class="list" wx:if="{{mode == 1}}">
            <view class="list_titile"><text class="text">直播</text><text class="box"></text></view>
            <view class="noPrevueList" wx:if="{{scrollList.length==0}}"><text class="text">暂无直播预告</text></view>
            <form class="form" wx:if="{{scrollList.length>0}}" wx:for="{{scrollList}}" wx:key="index" data-index="{{index}}" @submit="formSubmit" report-submit>
                <view class="listOne" data-index="{{index}}" @tap="judge">
                    <view class="liveImg">
                        <image class="listOne_head" wx:if="{{item.coverUrl != 'http://image.vdongchina.com/null'}}" src="{{item.coverUrl}}" mode="aspectFill"></image>
                        <view wx:else class="noImg">暂无图片</view>
                        <view class="leftBit liveBit" wx:if="{{item.liveState == 2}}">直播中</view>
                        <view class="leftBit appointeBit" wx:if="{{item.liveState == 1}}">预告</view>
                        <view class="leftBit recordBit" wx:if="{{item.liveState == 3 && item.recordState == 2}}">录播中</view>
                        <view class="living" wx:if="{{item.liveState == 2}}"><image class="image" src="http://image.vdongchina.com/M00/07/DB/ZSUkmVozl7-EMlENAAAAAFVkpp0565.png"></image></view>
                        <view class="B_liveNum" wx:if="{{item.liveState == 2}}"><image class="image" src="http://image.vdongchina.com/M00/07/DB/ZSUkmVozl5iEBHbHAAAAAGya7Dk703.png"></image>{{item.userNum}}</view>
                        <view class="appointeTime" wx:if="{{item.liveState == 1}}"><image class="timeBit" src="http://image.vdongchina.com/M00/07/DB/ZSUkmVozl9yEekAKAAAAAHB55uQ971.png"></image>{{item.prevueTime}}</view>
                    </view>
                    
                    <view class="listOne_right">
                        <view class="liveTitle">{{item.title}}</view>
                        <view class="anchor">
                            <image class="img" wx:if="{{item.liveState == 2}}" src="http://image.vdongchina.com/M00/07/DB/ZSUkmVozluyEbebOAAAAAJZDdPw074.png"></image>
                            <image class="img" wx:if="{{item.liveState == 1}}" src="http://image.vdongchina.com/M00/07/DB/ZSUkmVozl2GEOB6rAAAAAMEWpqo750.png"></image>
                            <image class="img" wx:if="{{item.liveState == 3 && item.recordState == 2}}" src="http://image.vdongchina.com/M00/08/1C/ZSUkmVo4xt6EUC3EAAAAALrz7Ao868.png"></image>主播：{{item.anchorName}}</view>
                        <button formType="submit" class="B_btn appointe" wx:if="{{item.liveState == 1}}">{{item.bespokeId?'预约成功':'预约直播'}}</button>
                        <view class="B_btn liveBtn" wx:if="{{item.liveState == 2}}">进入直播间</view>
                        <view class="B_btn recordBtn" wx:if="{{item.liveState == 3 && item.recordState == 2}}">观看录播</view>
                        <view class="line"></view>
                    </view>
                </view>
            </form>
            <view class="form" wx:if="{{scrollList.length==0}}">
                <view class="listOne">
                    <view class="liveImg">
                        <image class="listOne_head" src="http://image.vdongchina.com/M00/07/DB/ZSUkmVozlr6EIjqLAAAAAMDI4nA420.png" mode="aspectFill"></image>
                        <view class="leftBit liveNo">无直播</view>
                    </view>
                    
                    <view class="listOne_right">
                        <view class="liveTitle">更多直播敬请期待</view>
                        <view class="anchor"><image src="http://image.vdongchina.com/M00/07/DB/ZSUkmVozlzqEbzlAAAAAABtKLnQ701.png" class="img"></image>主播：暂无</view>
                        <view class="line"></view>
                    </view>
                </view>
            </view>
    </view>
</view>
</template>

<script>
export default {
        editorConfig: {
        mode:{
            label: '布局',
            type: 'String',
            value: '0',
            director : 'radio4'
        }
    },
    comName:"直播列表",
    props:{
        inputColor: {
            default: '#FC4671',
            type: String
        },
        timeColor:{
            default: '#FC4671',
            type: String
        },
        mode:{
            default: '0',
            type: String
        }
    },
    	data () {
		return {
			scrollList:[],
            userId:'',
            examine:false
        }
	},
	async onShow (options) {
        var that = this;
        this.$root.get("/basic/live/app/special/getSpecial", {},function(data){//审核判断
            if(data.code == 126000){
                if(data.object.examine == 1){//正在审核
                    that.examine = false
                }else{
                    that.examine = true
                }
                
            }
        })
        await this.$root.login()
        var liveUserid = getApp().globalData.liveUserid
        if(liveUserid){
            this.list(liveUserid)
            this.userId = liveUserid
        }else{
            await this.$root.liveLogin()
            this.list(getApp().globalData.liveUserid)
            this.userId = getApp().globalData.liveUserid
        } 	
    },
	methods: {
        list(userId){
            var that = this;
            that.$root.get("/basic/live/app/prevue/list", {userId:userId},function(data){
                if(data.success){
                    var liveList = data.data.liveList;//直播中
                    var recordList = data.data.recordList;//录播
                    if(recordList.length){
                        for(let i in recordList){
                            if(recordList[i].recordState == 1){
                                recordList.splice(i,1)
                            }
                        }
                    }
                    
                    var prevueList = data.data.prevueList;//预告列表
                    var carousel = [...liveList , ...prevueList,...recordList]
                    for(let i in carousel){
                        if(carousel[i].userNum<50){
                            carousel[i].userNum = Math.ceil(carousel[i].userNum*2.3)
                        }else if(carousel[i].userNum<100){
                            carousel[i].userNum = Math.ceil(carousel[i].userNum*2.7)
                        }else if(carousel[i].userNum<500){
                            carousel[i].userNum = Math.ceil(carousel[i].userNum*3.4)
                        }else{
                            carousel[i].userNum = Math.ceil(carousel[i].userNum*4.1)
                        }
                        if(carousel[i].userNum > 9999 ){
                            carousel[i].userNum = (carousel[i].userNum / 10000).toFixed(2) + 'w'
                        }
                    }
                    if(carousel.length){
                        for(let i in carousel){
                            carousel[i].coverUrl =  getApp().globalData.imgUrl + carousel[i].coverUrl
                        }
                        that.scrollList = carousel;
                    }
                    console.log(that.scrollList,'that.scrollList')
                }
            })
        },
        goList(){
            wx.navigateTo({
                url: '../liveList/liveList'
            })
        },
        goDetails(prevueId){
            wx.navigateTo({
                url: '../liveDetail/liveDetail?prevueId='+prevueId+'&index=0'
            })
        },
        getList(userId){
            var that = this;
            that.$root.get("/basic/live/app/prevue/list", {userId:userId},function(data){
                if(data.success){
                    var carousel = data.data.liveList;//直播中
                    var prevueList = data.data.prevueList;//预告列表
                    for(let i in carousel){
                        if(carousel[i].userNum<50){
                            carousel[i].userNum = Math.ceil(carousel[i].userNum*2.3)
                        }else if(carousel[i].userNum<100){
                            carousel[i].userNum = Math.ceil(carousel[i].userNum*2.7)
                        }else if(carousel[i].userNum<500){
                            carousel[i].userNum = Math.ceil(carousel[i].userNum*3.4)
                        }else{
                            carousel[i].userNum = Math.ceil(carousel[i].userNum*4.1)
                        }
                        if(carousel[i].userNum > 9999 ){
                            carousel[i].userNum = (carousel[i].userNum / 10000).toFixed(2) + 'w'
                        }
                        carousel[i].coverUrl =  getApp().globalData.imgUrl + carousel[i].coverUrl
                    }
                    for(let i in prevueList){
                        prevueList[i].coverUrl =  getApp().globalData.imgUrl + prevueList[i].coverUrl
                    }
                    carousel.concat(data.data.closeList)//直播结束列表
                    that.prevueList  = data.data.prevueList;//预告
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
        formSubmit(e){//提交表单
            var that = this;
            var index = e.currentTarget.dataset.index;
            var userId = that.userId
            var scrollList = that.scrollList;
            if(scrollList[index].bespokeId){//取消预约
                wx.request({
                    url: that.$root.apiServer+that.$root.appid+'/basic/live/app/bespoke/delete/'+scrollList[index].bespokeId,
                    method: 'POST',
                    header: {'content-type': 'application/json'},
                    success (res) {
                        wx.showToast({
                            title: '已取消预约',
                            icon: 'success',
                            duration: 2000
                        })
                        that.list(userId)
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
                        prevueId:scrollList[index].prevueId,
                        userId:userId,
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
                            that.list(userId)
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
        judge(e){
            var index = e.currentTarget.dataset.index;
            var scrollList = this.scrollList;
            if(scrollList[index].liveState == 2 || scrollList[index].recordState  == 2 ){//直播
                this.goDetails(scrollList[index].prevueId)
            }
        }
	}
}
</script>

<style scoped>
.liveEject{width:100%;height:504rpx;background: linear-gradient(90deg, rgba(255,70,101,0.8) 0%, rgba(234,72,199,0.8) 100%);}
.liveEject_title{width:100%;height:70rpx;line-height:70rpx;padding-left:20rpx;box-sizing:border-box;font-size: 24rpx;color: #FFFFFF;}
.title_left{float:left;line-height:70rpx;}
.title_right{float:right;line-height:70rpx;text-align:right}
.title_right:after{content: ''; display: inline-block; margin-right: 24rpx; border-right: 2rpx solid #fff; border-bottom: 2rpx solid #fff; width:14rpx; height: 14rpx; transform: rotate(-45deg);}
.more{width:200rpx;height:400rpx;display:inline-block;margin-right:20rpx;position:relative;}
.more .images{width:200rpx;height:400rpx;}
.moreLive{font-size: 26rpx;color: #E964AD;width:100%;text-align:center;position:absolute;left:0;top:160rpx;z-index:2;}
.moreBit{width:30rpx;height:30rpx;background: linear-gradient(90deg, #FF4665 0%, #EA48C7 100%);border-radius:50%;position:absolute;left:50%;top:210rpx;z-index:2;margin-left:-15rpx;}
.moreBit:before{content:'';display:inline-block; border-right:2rpx solid #fff; border-bottom:2rpx solid #fff; width:11rpx; height:11rpx; transform: rotate(-45deg);position:absolute;left:6rpx;top:8rpx;}
.noDatalistImg{width:200rpx;height:200rpx;margin:0 auto;}
.scrollEject{width:100%;height:400rpx;white-space:nowrap;}
.scrollBox{width:300rpx;height:400rpx;display:inline-block;margin-right:10rpx;position:relative;}

.textBox{width:300rpx;height:90rpx;position:absolute;left:0;top:310rpx;background-color:#fff;}
/*.images .img{width:100%;height:100%;}*/
.textBox_title{width:100%;height:36rpx;text-align:left;font-size: 26rpx;color: #333333;display:block;margin-top:14rpx;line-height:36rpx;padding:0 10rpx;box-sizing: border-box;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
.textBox_text{width:190rpx;height:36rpx;font-size: 20rpx;color: #666;display:block;padding:0 10rpx;box-sizing: border-box;line-height:36rpx;font-size: 20rpx;color: #666666;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
.textBox_text .ht{width:24rpx;height:24rpx;display:inline-block;vertical-align:middle;margin-right:10rpx;}
.textBox_text .name{width:140rpx;line-height:36rpx;font-size: 20rpx;color: #666666;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}

.imageBox{width:300rpx;height:310rpx;position:relative; border-top-left-radius:6rpx;border-top-right-radius:6rpx;}
.imageBox .images{width:300rpx;height:310rpx;position:absolute;left:0;top:0;z-index:6;border-top-left-radius:6rpx;border-top-right-radius:6rpx;}
.imageBox .noImg{width:300rpx;height:310rpx;text-align:center;line-height:310rpx;font-size:28rpx;color:#333;position:absolute;left:0;top:0;z-index:6;border-top-left-radius:6rpx;border-top-right-radius:6rpx;box-sizing: border-box;background-color:#999;color:#fff;}
.imageBox .time{height:28rpx;position:absolute;bottom:8rpx;left:8rpx;z-index:9;font-size: 20rpx;color: #FFFFFF;line-height:28rpx;color:#fff;}
.imageBox .time .timeBit{width:20rpx;height:20rpx;vertical-align:middle;margin-right:8rpx;}
.btn{width:100rpx;height:36rpx;border-radius:4rpx;color:#fff;font-size:20rpx;line-height:36rpx;text-align:center;position:absolute;bottom:4rpx;right:10rpx;padding:0;}
.appointe{background: linear-gradient(90deg, #8F56D1 0%, #6749BA 100%);}
.goLive{background: linear-gradient(90deg, #FF4665 0%, #EA48C7 100%);}
.leftTop{height:30rpx;position:absolute;left:0;top:0;z-index:9;padding-left:28rpx;font-size: 18rpx;color: #FFFFFF;line-height:30rpx;box-sizing: border-box;border-top-left-radius: 6rpx;border-bottom-right-radius:6rpx;}
.leftTop:after{content:'';width:10rpx;height:10rpx;border-radius:50%;background-color:#fff;position:absolute;left:10rpx;top:10rpx;z-index:8;}
.leftLive{width:88rpx;background:linear-gradient(90deg, rgba(255,70,101,0.8) 0%, rgba(234,72,199,0.8) 100%);}
.leftAppointe{width:78rpx;background:linear-gradient(90deg, rgba(143,86,209,0.9) 0%, rgba(103,73,186,0.9) 100%);}
.liveNum{height:30rpx;position:absolute;right:0;top:0;z-index:9;line-height:30rpx;color:#fff;font-size:20rpx;padding:6rpx 10rpx;}
.liveNum .image{width:20rpx;height:20rpx;margin-right:8rpx;}


.list{width:100%;padding:0 20rpx;box-sizing:border-box;}
.list_titile{width:100%;height:100rpx;position:relative;border-bottom:1px solid #F0F0F0;}
.list_titile .text{width:100%;height:100rpx;line-height:100rpx;font-size:32rpx;color:#333333;z-index:9;position:absolute;left:0;top:0;}
.list_titile .box{width:80rpx;height:16rpx;background-color:#F95DA5;position:absolute;left:38rpx;top:58rpx;z-index:3;opacity:0.3;}
.listOne{width:100%;padding:26rpx 0 24rpx 0; display:flex;}
.listOne_right{width:calc(100% - 280rpx);padding-left:30rpx; box-sizing:border-box;position:relative;}
.liveTitle{width:100%;height:84rpx;font-size: 30rpx;color: #333333;line-height:42rpx;margin-top:6rpx;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;overflow: hidden;}
.anchor{width:240rpx;font-size: 28rpx;color: #999999;line-height:42rpx;margin-top:18rpx;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
.anchor .img{width:24rpx;height:24rpx;vertical-align: middle; margin-right:8rpx;}
.time{font-size: 28rpx;color: #FC4671;line-height:40rpx;margin-top:22rpx;}
.form{width:100%;display:block;}
.B_btn{border:0;border-radius: 4rpx;width:140rpx;height:50rpx;text-align:center;line-height:50rpx;color:#fff;font-size:24rpx;position:absolute;right:0;bottom:0;background-color:#fff;padding:0;}
.liveBtn{background:linear-gradient(90deg, #FF4665 0%, #EA48C7 100%);}
.recordBtn{background: linear-gradient(90deg, #FD7F44 0%, #FF3A0B 100%);}
.appointe{background:linear-gradient(90deg, #8F56D1 0%, #6749BA 100%);}
.line{width:calc(100% - 30rpx);height:1px;background-color:#F0F0F0;position:absolute;right:0;bottom:-24rpx;}
.liveImg{width:280rpx;height:158rpx;border-radius:6rpx;float:left;position:relative;}
.liveImg .listOne_head{width:280rpx;height:158rpx;border-radius:6rpx;z-index:5;position:absolute;}
.liveImg .noImg{width:280rpx;height:158rpx;float:left;text-align:center;line-height:158rpx;font-size:28rpx;color:#333;border:1px solid #ddd;border-radius:8rpx;box-sizing: border-box;}
.liveNo{background: linear-gradient(90deg, #3292DB 0%, #2977C9 100%);}
.leftBit{height:30rpx;line-height:30rpx;padding:0  14rpx 0 24rpx;font-size:20rpx;color:#FFFFFF;border-radius:30rpx;position:absolute;left:6rpx;top:8rpx;z-index:9}
.leftBit:after{content:'';width:10rpx;height:10rpx;border-radius:50%;background-color:#fff;position:absolute;left:10rpx;top:10rpx;}
.liveBit{background:linear-gradient(90deg, #FF4665 0%, #EA48C7 100%);}
.appointeBit{background:linear-gradient(90deg, #8F56D1 0%, #6749BA 100%);}
.living{width:280rpx;height:158rpx;border-radius:6rpx;background-color:rgba(0,0,0,0.2);position:absolute;left:0;top:0;}
.living .image{width:58rpx;height:58rpx;position:absolute;left:50%;top:55rpx;z-index:9;margin-left:-29rpx;}
.B_liveNum{position:absolute;bottom:6rpx;right:10rpx;z-index:9;font-size:20rpx;color:#FFFFFF;}
.B_liveNum .image{width:20rpx;height:20rpx;margin-right:6rpx;}
.appointeTime{position:absolute;bottom:0;left:10rpx;z-index:9;color:#FFFFFF;font-size:20rpx;}
.appointeTime .timeBit{width:20rpx;height:20rpx;margin-right:6rpx}
.record{width:88rpx;background: linear-gradient(90deg, #FD7F44 0%, #FF3A0B 100%);}
.recordBit{background: linear-gradient(90deg, #FD7F44 0%, #FF3A0B 100%);}
</style>