<template>
  <view class="container">
      <view class="content" wx:if="{{listsLen && flag}}">
        <view class="total">
          <view class="txt">佣金总额</view>
          <view class="price">{{yongjinLists.allCommSum}}元</view>
        </view>
        <view class="title">佣金明细</view>
        <view class="level1" wx:for="{{yongjinLists.CommDetailList}}" wx:key="index" wx:for-item="item">
            <view class="level1-content">
                <image class="left" src="{{item.headImg}}"></image>
                <view class="middle">
                    <view class="name">{{item.nickName}}</view>
                    <view class="price">订单金额： ￥{{item.orderAmount}}</view>
                    <view class="time">{{item.orderTime}}</view>
                </view>
                <view class="right">
                    <view class="num">+{{item.commSum}}</view>
                </view>
            </view>
        </view>
      </view>
      <view class="no-yongjin" wx:if="{{listsLen==0 && flag}}">
          <image class="img" src="http://image.vdongchina.com/M00/06/12/ZSUkmVoXuviERyU0AAAAAKM9qiY117.png"></image>
          <view class="txt">暂无佣金</view>
          <view class="txt1">如果您已是推客，那就赶紧去推广吧！ 马上有钱哦！</view>
      </view>
  </view>
</template>

<script>
export default {
    config: {
        "navigationBarTitleText": "我的佣金"
    },
    data () {
        return {
            yongjinLists:'',
            listsLen:0,
            flag:0
        }
    },
    onLoad(){
        var that = this
        //获取我的佣金详情
        wx.showLoading({
            title: '正在拼命加载中',
        })
        wx.request({
            url: this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/user/requestUserCommDetail',
            data: {
                token: that.$root.globalData.token,
                pid:that.$root.globalData.pid
            },
            method: "POST",
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
                if(res.data.code == 200){
                    wx.hideLoading()
                    that.yongjinLists = res.data.object
                    if(that.yongjinLists.allCommSum > 0){
                        that.listsLen = that.yongjinLists.allCommSum
                    }else{
                        that.listsLen = 0
                    }
                    that.flag = 1
                }else{
                    wx.hideLoading()
                    wx.showLoading({
                        title: '网络出故障啦！',
                    })
                }
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
.container{
    height:100%;
    background:#f2f2f2;
    overflow: scroll;
}
.container .total{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height:150rpx;
    background: #fff;
    box-sizing: border-box;
    border-bottom:1rpx solid #e5e5e5;
}
.container .total .txt{
    font-size: 32rpx;
    height: 32rpx;
    line-height: 32rpx;
    margin-left:30rpx;
    font-weight: 600;
    color:#333;
}
.container .total .price{
    font-size:46rpx;
    height: 46rpx;
    line-height: 46rpx;
    color:#262626;
    margin-right:30rpx;
}
.container .title{
    height: 28rpx;
    font-size:28rpx;
    color:#888;
    padding:36rpx 0 22rpx 30rpx;
}
.container .level1{
    min-height:178rpx;
    margin-bottom:30rpx;
    background: #fff;
}
.container .level1 .level1-content{
    height: 176rpx;
    width:100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top:1rpx solid #e5e5e5;
    border-bottom:1rpx solid #e5e5e5;
}
.container .level1 .level1-content .left{
    height: 90rpx;
    width:90rpx;
    border-radius: 50%;
    margin-left:30rpx;
    margin-right:24rpx;
    margin-bottom:30rpx;
}
.container .level1 .level1-content .middle{
    flex:1;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}
.container .level1 .level1-content .middle .name{
    font-size:28rpx;
    height: 28rpx;
    line-height: 28rpx;
    margin-bottom:16rpx;
    color:#333;
    font-weight: 600;
}
.container .level1 .level1-content .middle .price{
    font-size:28rpx;
    height: 28rpx;
    line-height: 28rpx;
    margin-bottom:14rpx;
    color:#535353;
}
.container .level1 .level1-content .middle .time{
    font-size:28rpx;
    color:#535353;
    height: 28rpx;
    line-height: 28rpx;
}
.container .level1 .level1-content .right{
    width:132rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}
.container .level1 .level1-content .right .num{
    font-size:36rpx;
    height: 36rpx;
    line-height:36rpx;
    color:#333;
    margin-right:30rpx;
}
.container .no-yongjin{
    height:100%;
    position: relative;
}
.container .no-yongjin .img{
    position: absolute;
    top:200rpx;
    left:50%;
    margin-left:-100rpx;
    width:200rpx;
    height:200rpx;
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
</style>
