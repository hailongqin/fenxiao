<template>
  <view class="container">
      <view class="level1" wx:if="{{list && listFlag}}">
        <view class="level1-content" wx:for="{{list}}">
            <image class="left" src="{{item.headImg}}"></image>
            <view class="middle">
                <view class="name">{{item.nickName}}</view>
                <view class="type">
                    <view class="price" wx:if="{{item.type == 1}}">订单金额： ￥{{item.orderAmount}}</view>
                    <view class="price" wx:else>提现</view>
                </view>
                <view class="time">{{item.createDate}}</view>
            </view>
            <view class="right">
                <view class="in-out">
                    <view class="num" wx:if="{{item.type == 1}}">+{{item.amount}}</view>
                    <view class="num" wx:else>-{{item.amount}}</view>
                </view>
            </view>
        </view>
      </view>
  </view>
</template>

<script>
export default {
    config: {
        "navigationBarTitleText": "余额明细"
    },
    data () {
        return {
            list:[],
            listFlag:0
        }
    },
    onLoad(){
        var that = this
        //获取我的余额明细
        wx.showLoading({
			title: '正在拼命加载中',
		})
        wx.request({
            url: this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/user/requestUserBalaDetail',
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
                    that.list = res.data.object.balaDetailList
                    console.log(that.list)
                    that.listFlag = 1
                }else{
                    wx.hideLoading()
                    wx.showToast({
                        title: '数据加载失败啦',
                        icon:'none'
                    })
                }
            }
        })
    },
    methods:{
        
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
.container .level1{
    min-height:178rpx;
    margin-top:30rpx;
    background: #fff;
}
.container .level1 .level1-content{
    height: 178rpx;
    width:100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
.container .level1 .level1-content .middle .type{
    height: 28rpx;
    margin-bottom:14rpx;
}
.container .level1 .level1-content .middle .type .price{
    font-size:28rpx;
    height: 28rpx;
    line-height: 28rpx;
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
.container .level1 .level1-content .right .in-out{
    height: 36rpx;
}
.container .level1 .level1-content .right .in-out .num{
    font-size:36rpx;
    height: 36rpx;
    line-height:36rpx;
    color:#333;
    margin-right:30rpx;
}
</style>
