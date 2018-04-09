<template>
  <!--index.wxml-->
  <view class="container">
  	<distributionMsg></distributionMsg>
  		<nav1 :hidden="true"></nav1>
    <!--<view class="bottom-nav">
        <view class="content">
            <view class="nav-list" @tap="index">
                <view class="nav" wx:if="{{indexActive}}">
                    <image class="top" background-size="cover" src="http://image.vdongchina.com/M00/06/11/ZSUkmVoXuBWESguNAAAAAP7XUSo505.png"></image>
                    <view class="bottom">首页</view>
                </view>
                <view class="navActive" wx:else>
                    <image class="top" background-size="cover" src="http://image.vdongchina.com/M00/06/11/ZSUkmVoXuEuEU_FTAAAAADO0m-M987.png"></image>
                    <view class="bottom">首页</view>
                </view>
            </view>
            <view class="nav-list fmessage" @tap="message">
            		<view class="fmessagenum" wx:if="{{messageNum}}">{{messageNum}}</view>
                <view class="nav" wx:if="{{messageActive}}">
                    <image class="top" background-size="cover" src="http://image.vdongchina.com/M00/06/11/ZSUkmVoXuSWEIIRiAAAAAPw4lBE836.png"></image>
                    <view class="bottom">消息</view>
                </view>
                <view class="navActive" wx:else>
                    <image class="top" background-size="cover" src="http://image.vdongchina.com/M00/06/11/ZSUkmVoXuWWEXldSAAAAAMb2Wdo517.png"></image>
                    <view class="bottom">消息</view>
                </view>
            </view>
            <view class="nav-list" @tap="shopcart">
                <view class="nav" wx:if="{{shopcartActive}}">
                    <image class="top" background-size="cover" src="http://image.vdongchina.com/M00/06/12/ZSUkmVoXvHOEZ6-GAAAAADus66A254.png"></image>
                    <view class="bottom">购物车</view>
                </view>
                <view class="navActive" wx:else>
                    <image class="top" background-size="cover" src="http://image.vdongchina.com/M00/06/12/ZSUkmVoXvPqEGOtmAAAAANFe0d0509.png"></image>
                    <view class="bottom">购物车</view>
                </view>
            </view>
            <view class="nav-list" @tap="personal">
                <view class="nav" wx:if="{{personalActive}}">
                    <image class="top" background-size="cover" src="http://image.vdongchina.com/M00/06/12/ZSUkmVoXuzaEPmIpAAAAABG2s_c188.png"></image>
                    <view class="bottom">我的</view>
                </view>
                <view class="navActive" wx:else>
                    <image class="top" background-size="cover" src="http://image.vdongchina.com/M00/06/12/ZSUkmVoXu2KEPW-eAAAAAB9H9zY960.png"></image>
                    <view class="bottom">我的</view>
                </view>
            </view>
        </view>
    </view>-->
    <!--<view class="no-yongjin">
        <image class="img" src="http://image.vdongchina.com/M00/06/11/ZSUkmVoXuk6EZfjHAAAAANUKV6w562.png"></image>
        <view class="txt">暂无消息</view>
        <view class="txt1">赶紧去成为推客吧！马上就有钱哦！</view>
    </view>    -->
    
    <!--<view class="content">
        <view class="content-box" @tap="toSystemMsg(lists.SYSTEM.type)">
            <view class="left">
                <image class="img" src="http://image.vdongchina.com/M00/06/12/ZSUkmVoXvYaEXDSNAAAAABNZ7Ko622.png"></image>
                <view class="num" wx:if="{{system !== 0}}">{{system}}</view>
            </view>
            <view class="right">
                <view class="top">
                    <view class="top-left">系统消息</view>
                    <view class="top-right">{{lists.SYSTEM.date}}</view>
                </view>
                <view class="bottom" wx:if="{{systemLists}}">{{systemLists[0].content}}</view>
            </view> 
        </view>
        <view class="content-box" @tap="toTuikeMsg(lists.TWITTER.type)">
            <view class="left">
                <image class="img" src="http://image.vdongchina.com/M00/06/12/ZSUkmVoXvfmESvLFAAAAADUFmWg072.png"></image>
                <view class="num" wx:if="{{twitter !==0}}">{{twitter}}</view>
            </view>
             <view class="right">
                <view class="top">
                    <view class="top-left">推客提示</view>
                    <view class="top-right">{{lists.TWITTER.date}}</view>
                </view>
                <view class="bottom"  wx:if="{{twitterLists}}">{{twitterLists[0].content}}</view>
            </view> 
        </view>
        <view class="content-box" @tap="toYongjinMsg(lists.COMMISSION.type)">
            <view class="left">
                <image class="img" src="http://image.vdongchina.com/M00/06/13/ZSUkmVoXvuWELij7AAAAAPbgVcI577.png"></image>
                <view class="num" wx:if="{{commission !==0}}">{{commission}}</view>
            </view>
             <view class="right">
                <view class="top">
                    <view class="top-left">佣金提示</view>
                    <view class="top-right">{{lists.COMMISSION.date}}</view>
                </view>
                <view class="bottom"  wx:if="{{commissionLists}}">{{commissionLists[0].content}}</view>
            </view> 
        </view>
    </view>-->

  </view>
</template>

<script>
	import distributionMsg from "../../components/distributionMsg/distributionMsg"	
	import nav from "../../components/nav/nav"
export default {
  config: {
      "navigationBarTitleText": "消息"
  },
  components:{
    	distributionMsg:distributionMsg,
    	  	nav1:nav
  },
  data () {
    return {
      lists:[1],
      systemLists:[],
      twitterLists:[],
      commissionLists:[],

      //控制底部导航切换颜色
      indexActive:1,
      messageActive:0,
      shopcartActive:1,
      personalActive:1,
	      messageNum:0,
	      system:0,
	      twitter:0,
	      commission:0,
    }
  },
  watch: {
    
  },
  computed: {
    
  },
  methods: {
      //底部导航跳转
    personal() {
        wx.redirectTo({
            url: '../f_personal/f_personal'
        })
    },
    index(){
        wx.redirectTo({
            url: '../index/index'
        })
    },
    shopcart(){
        wx.redirectTo({
            url: '../f_car/f_car'
        })
    },
    message(){
        wx.redirectTo({
            url: '../f_message/f_message'
        })
    },
    //事件处理函数
    toSystemMsg(type){
        console.log(type)
        wx.navigateTo({
            url: '../f_systemmsg/f_systemmsg?type=' + type
        })
    },
    toTuikeMsg(type){
        wx.navigateTo({
            url: '../f_tuikemsg/f_tuikemsg?type=' + type
        })
    },
    toYongjinMsg(type){
        wx.navigateTo({
            url: '../f_yongjinmsg/f_yongjinmsg?type=' + type
        })
    }
  },
  onShow(){
    var that = this
    //请求消息列表
    wx.request({
        url:this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/notice/noticeStatistics',
        data:{
            token:that.$root.globalData.token,
            pid:that.$root.globalData.pid
        },
        method:"GET",
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
        	console.log(res)
            that.lists = res.data.object
        	if(res.data.object.SYSTEM){
        		that.system = parseInt(res.data.object.SYSTEM.count) 
        	}else{
        		that.system = 0
        	}
        	if(res.data.object.TWITTER){
        		that.twitter = parseInt(res.data.object.TWITTER.count) 
        	}else{
        		that.twitter =0
        	}
        	if(res.data.object.COMMISSION){
        		that.commission = parseInt(res.data.object.COMMISSION.count) 
        	}else{
        		that.commission =0
        	}   
          var messageNum = that.system + that.twitter+that.commission        
            if(messageNum == 0){
            	that.messageNum = false
            }else{
            	that.messageNum =messageNum 
            }                                                      
        }
        
    })
    //请求type==1的消息列表
    wx.request({
        url:this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/notice/noticeList',
        data:{
            token:that.$root.globalData.token,
            type:1,
            pid:that.$root.globalData.pid
        },
        method:"GET",
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
            that.systemLists = res.data.object
        }
    })
    //请求type==4的消息列表
    wx.request({
        url:this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/notice/noticeList',
        data:{
            token:that.$root.globalData.token,
            type:4,
            pid:that.$root.globalData.pid
        },
        method:"GET",
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
            that.twitterLists = res.data.object
        }
    })
    //请求type==3的消息列表
    wx.request({
        url:this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/notice/noticeList',
        data:{
            token:that.$root.globalData.token,
            type:3,
            pid:that.$root.globalData.pid
        },
        method:"GET",
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
            that.commissionLists = res.data.object
        }
    })
    
    
    
  }
}
</script>

<style scoped>
page{
    height:100%;
}
.left{
    float:none;
}
.right{
    float:none;
}
/* 底部导航样式 */
.bottom-nav{
    height: 100rpx;
    width:100%;
    position: fixed;
    bottom:0;
    left:0;
    background: #fff;
    border-top:1rpx solid #ababab;
}
.bottom-nav .content{
    width:100%;
    height:100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.bottom-nav .content .nav-list{
    height: 100%;
    width:25%;
}
.bottom-nav .content .nav-list .nav{
    height:100%;
    width:100%;
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.bottom-nav .content .nav-list .nav .top{
    height:54rpx;
    width:54rpx;
    margin:9rpx 0 4rpx;
    display: block;
}
.bottom-nav .content .nav-list .nav .bottom{
    font-size:20rpx;
    color:#999;
    height: 28rpx;
    line-height:28rpx;
}
.bottom-nav .content .nav-list .navActive{
    height:100%;
    width:100%;
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.bottom-nav .content .nav-list .navActive .top{
    height:54rpx;
    width:54rpx;
    margin:9rpx 0 4rpx;
    display: block;
}
.bottom-nav .content .nav-list .navActive .bottom{
    font-size:20rpx;
    color:#262833;
    height: 28rpx;
    line-height:28rpx;
}
.container{
  width:100%;
  height:100%;
  background: #fff;
}
.container .no-yongjin{
    position: relative;
    z-index: 1;
}
.container .no-yongjin .img{
    position: absolute;
    top:200rpx;
    left:50%;
    margin-left:-100rpx;
    width:200rpx;
    height:200rpx;
    display: block;
}
.container .no-yongjin .txt{
    position: absolute;
    top:440rpx;
    left: 0;
    width:100%;
    text-align: center;
    height: 56rpx;
    line-height: 56rpx;
    font-size:40rpx;
    color:#000;
}
.container .no-yongjin .txt1{
    position: absolute;
    top:526rpx;
    left: 0;
    width:476rpx;
    text-align: center;
    min-height: 42rpx;
    line-height: 42rpx;
    font-size:28rpx;
    color:#888;
    padding:0 137rpx;
}
.container .content{
    height:100%;
}
.container .content .content-box{
    height: 148rpx;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin-left:30rpx;
    border-bottom:2rpx solid #F2F2F2;
}
.container .content .content-box .left{
    width:108rpx;
    height:148rpx;
    position: relative;
}
.container .content .content-box .left .img{
    height: 90rpx;
    width:90rpx;
    position: absolute;
    top:30rpx;
    left:0;
}
.container .content .content-box .left .num{
    height:36rpx;
    width:36rpx;
    border-radius: 50%;
    text-align: center;
    font-size:18rpx;
    color:#fff;
    line-height: 36rpx;
    position: absolute;
    top:12rpx;
    right:0;
    background: #ff1111;
}
.container .content .content-box .right{
    width:576rpx;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-left:6rpx;
}
.container .content .content-box .right .top{
    width:100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-top:32rpx;
}
.container .content .content-box .right .top .top-left{
    height: 28rpx;
    line-height: 28rpx;
    font-size:28rpx;
    color:#333;
}
.container .content .content-box .right .top .top-right{
    height: 24rpx;
    line-height: 24rpx;
    font-size:24rpx;
    color:#999;
}
.container .content .content-box .right .bottom{
    height: 28rpx;
    line-height: 28rpx;
    font-size: 28rpx;
    width:100%;
    color:#666;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-top:16rpx;
}
.fmessage{
	position: relative;
}
.fmessagenum{font-size:18rpx;position: absolute;width: 36rpx;height: 36rpx;background: #ff1111;border-radius: 50%;line-height: 36rpx;text-align: center;color: #fff;top:6rpx;right: 44rpx;}

</style>
