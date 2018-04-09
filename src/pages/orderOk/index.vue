<template>
    <view>
        <view class="topLine"></view>
        <view class="contant main-back">
            <view class="cont-pay">
                <view class="cont-pay-view">买家已付款</view>
                <view class="cont-pay-view">您的包裹已蓄势待发</view>
            </view>    
            <view class="cont-img"><image src="http://image.vdongchina.com/M00/03/2A/ZSUkmVnexbqESWQpAAAAACQuVws962.png" class="cont-img-image"></image></view>
        </view>
        <view class="auto">
            <view class="cont-price">
                实付款：<text class="main-color">￥{{totalPrice}}</text>
            </view>
            <view class="cont-info">
                <view class="classname cont-info-view">收货人：{{name}}</view>
                <view class="classname cont-info-view">手机号：{{phone}}</view>
                <view class="classname cont-info-view">收货地址：{{address}}</view>
                <view class="cont-num cont-info-view">订单编号：{{code}}</view>
            </view>
            <view class="cont-btn clear">
                <view class="left cont-btn-view" bindtap="jumpOrder">查看订单</view>
                <view class="right cont-btn-view" bindtap="jumpIndex">返回首页</view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    config: {
        navigationBarTitleText: '确认订单'
    },
    data () {
        return {
            name: '',
            phone: '',
            address: '',
            code: '',
            totalPrice: ''
        }
    },
    onLoad (e) {
        var servsers = getApp().globalData.servsers
        var that = this
        wx.request({
            url: this.$root.apiServer+this.$root.appid+'/basic/api/pay/wxPaySuccess',
            data: {
                token: getApp().globalData.token,
                ordId: e.ordId
            },
            method: 'GET',
            header: {
                'Content-Type': 'application/json'
            },
            success (res) {
                that.name = res.data.data.userAddress.name
                that.phone = res.data.data.userAddress.phone 
                that.address = res.data.data.userAddress.province + res.data.data.userAddress.city + res.data.data.userAddress.district + res.data.data.userAddress.street
                that.code = res.data.data.code
                that.totalPrice = res.data.data.totalPrice
            }
        })
    },
    jumpOrder () {//跳转订单列表
        wx.redirectTo({
            url: '../orderList/orderList'
        }) 
    },
    jumpIndex () {//跳转首页
        wx.redirectTo({
            url: '../index/index'
        })
    }
}
</script>

<style scoped>
body{background: #f9f9f9;}	
page{background: #f9f9f9;}		
.contant{width: 750rpx;height: 230rpx; color: #ffffff;font-size: 28rpx; position: relative}
.cont-pay{padding-top: 80rpx;margin-left: 80rpx;}
.cont-pay .cont-pay-view{margin-bottom: 10rpx;}
.cont-img{position: absolute;top:70rpx;right: 70rpx;}
.cont-img .cont-img-image{ width: 120rpx;height: 88rpx; }
.cont-price{line-height: 170rpx; text-align: center;border-bottom: #e3e3e3 1rpx solid;font-size: 32rpx;}
.cont-info{margin-top: 40rpx;}
.cont-info .cont-info-view{margin-bottom: 10rpx;font-size:28rpx; }
.cont-num{color: #999999}

.cont-btn{ margin-top: 80rpx; font-size: 32rpx;width: 500rpx;margin-left: auto;margin-right: auto}
.cont-btn .cont-btn-view{width: 220rpx;height: 70rpx;line-height: 70rpx;border:solid 2rpx #e3e3e3;text-align: center;border-radius: 4rpx;}
</style>