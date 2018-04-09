<template>
  <!--pages/rechargeSuccess/rechargeSuccess.wxml-->
  <view class='page bg-wt'>
    <view class='rechargeSuccessImage'>
      <image class='rechargeSuccessIocn' src='http://image.vdongchina.com/M00/03/3A/ZSUkmVngGV6EX2_2AAAAAIE_UDw240.png'></image>
    </view>
    <view class='ft40 txt-c rechargeSuccessTitle'>充值成功</view>
    <view class='ft28 c3 txt-c'>可用余额</view>
    <view class='c504 txt-c balance'>¥{{cartInfo.balance}}</view>
    <button class='pay white ft36 mb20' @tap="home">返回主页</button>
  </view>
</template>
<script>
export default {
  config: {
        navigationBarTitleText: '充值成功'
    },
  data() {
    return {
      cartInfo: {}
    }
  },
  onLoad() {
    var that = this
    that.$root.post("/basic/newMember/applet/pview?openid="+that.$root.globalData.openid,{}, function(data) {
      if (data.success) {
        console.log(data)
        that.cartInfo = data.obj
        that.codeNum = data.obj.codeNum
      }
    })
  },
  methods: {
    home() {
      wx.navigateBack({
        delta: 2
      })
    }
  }
}
</script>
<style scoped>
/* pages/rechargeSuccess/rechargeSuccess.wxss */

.rechargeSuccessImage {
  width: 186rpx;
  height: 186rpx;
  margin: 0 auto;
  padding-top: 100rpx;
  padding-bottom: 50rpx;
}

.rechargeSuccessIocn {
  width: 186rpx;
  height: 186rpx;
}

.rechargeSuccessTitle {
  height: 56rpx;
  line-height: 56rpx;
  margin-bottom: 56rpx;
}

.balance {
  font-size: 50rpx;
  height: 70rpx;
  line-height: 70rpx;
  margin-bottom: 72rpx;
}

.pay {
  width: 670rpx;
  height: 94rpx;
  line-height: 94rpx;
  background: #5F57C0;
  border-radius: 10rpx;
}
</style>


