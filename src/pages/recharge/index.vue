<template>
    <!--pages/recharge/recharge.wxml-->
    <view class="page">
        <view class="header pos-r box-s">
            <image class="headerImg pos-a" src="http://image.vdongchina.com/M00/02/C1/ZSUkmVnOBCWEYM24AAAAABf-gW8028.png"></image>
            <view class="cartNumber pos-r display-flex">
                <image class="cartNumberImage" src="http://image.vdongchina.com/M00/03/3B/ZSUkmVngJRWEIMiDAAAAAEh4HrQ383.png"></image>
                <view class="ft34 white ml20">卡号：{{cartInfo.codeNum}}</view>
            </view>
            <view class="balance ft30 white pos-r">余额：¥{{cartInfo.balance ? cartInfo.balance:0}}</view>
        </view>
        <view class=" mb20" wx:if="{{!noActivity}}">
            <view class="display-flex  bg-wt isActivity box-s ">
                <view class="vertical"></view>
                <view class="isActivityTitle ft32 c3">充值活动</view>
            </view>
            <view>
                <view class="activityDetail bg-wt" @tap="isActivity">
                    <view class="ovfl">
                        <image class="activityDetailIocn fl-l" src="http://image.vdongchina.com/M00/03/3C/ZSUkmVngKESELf9_AAAAAPdU0rU025.png"></image>
                        <view class="ft28 c6 fl-l activityDetailTitle">充值活动详情</view>
                        <image class="activityDetailRight fl-r" src="http://image.vdongchina.com/M00/03/3C/ZSUkmVngJoKEWWIZAAAAAMedZrk797.png"></image>
                    </view>
                </view>
                <view class="bg-wt isActivityList" @tap="selectActivity(0,0,0,0)">
                    <view class="ovfl">
                        <image class="activityDetailIocn fl-l" wx:if="{{activityId == 0}}" src="http://image.vdongchina.com/M00/03/3A/ZSUkmVngGM-EWM41AAAAAD5AoDA207.png"></image>
                        <view class="unselected fl-l box-s" wx:else></view>
                        <view class=" {{activityId == 0 ?'ft32 c645 fl-l activityDetailTitle' :'ft32 c6 fl-l activityDetailTitle'}}">不参与充值活动</view>
                    </view>
                </view>
                <view class="" wx:for="{{activity}}" wx:key="activity">
                    <view class="bg-wt isActivityList" @tap="selectActivity(item.id,index,item.rechange,item.sendcoin)" wx:if="{{item.isdeleted == '1'}}">
                        <view class="ovfl">
                            <image class="activityDetailIocn fl-l" wx:if="{{activityId == item.id}}" src="http://image.vdongchina.com/M00/03/3A/ZSUkmVngGM-EWM41AAAAAD5AoDA207.png"></image>
                            <view class="unselected fl-l box-s" wx:else></view>

                            <view class=" {{activityId == item.id ?'ft32 c645 fl-l activityDetailTitle' :'ft32 c6 fl-l activityDetailTitle'}}">{{item.name}}</view>
                            <view class=" {{activityId == item.id?'ft32 c645 fl-r activityDetailTitle' :'ft32 c6 fl-r activityDetailTitle'}}">¥{{item.rechange}}（返¥{{item.sendcoin}}）</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="display-flex  isRecharge box-s bg-wt">
            <view class="vertical"></view>
            <view class="isActivityTitle ft32 c3">充值金额</view>
        </view>
        <view class="bg-wt">

            <view class="recharge  ovfl">
                <text class="moneyIocn c3 fl-l">¥</text>
                <input class="rechargeInput fl-r ft32 box-s" placeholder="请输入充值金额" placeholder-style="c6" @input="moneyNum"></input>
            </view>
            <view class="rechargeMoney ft28 c3 mt20">
                <text class="actuallyPaid">实付金额¥{{money == null ? 0 : money}}</text>
                <text>到账金额¥{{(money >= rechange) ? money+sendcoin : money == null ? 0 : money}}</text>
            </view>
            <button class="pay white ft36 mb20" @tap="pay">立即充值</button>
            <view class="reminder ft26 c2a">
                <text class="cf6">*</text> 只支持微信支付充值</view>
        </view>
    </view>
</template>
<script>
export default {
    config: {
        navigationBarTitleText: '余额充值'
    },
    data() {
        return {
            activity: {},//活动列表
            activityId: 0,//活动id
            rechange: 0,//充值活动钱数
            sendcoin: 0,//赠送钱数
            noActivity: false,//没有活动
            money: 0,//实付金额
            coin: 0,//到账金额
            codeNum: "",
            cartInfo: {}
        }
    },
    onLoad(options) {
        if (options.id) {
            this.activityId = options.id,
            this.rechange = options.rechange
            this.sendcoin = options.sendcoin
        }
        var that = this
        that.$root.post("/basic/newMember/applet/list", { page: 1, rows: 100, sort: '', order: '' }, function(data) {
            console.log(data)
            if (data.list.length == 0) {
                that.noActivity = true
                return;
            }
            if (data.list.length > 0) {
                console.log("111111111111")
                that.activity = data.list
            }
        })
    },
    onShow() {
        var that = this
        that.$root.post("/basic/newMember/applet/pview?openid=" + that.$root.globalData.openid, {}, function(data) {
            if (data.success) {
                console.log(data)
                that.cartInfo = data.obj
                that.codeNum = data.obj.codeNum
            }
        })
    },
    methods: {
        isActivity() {
            wx.navigateTo({
                url: '../rechargeRule/rechargeRule'
            })
            return;
        },
        selectActivity(id, index, rechange, sendcoin) {
            console.log(id)
            console.log(sendcoin)
            this.activityId = id
            this.sendcoin = sendcoin
            this.rechange = rechange
            this.sendcoin = parseFloat(this.sendcoin)

        },
        moneyNum(e) {
            this.money = parseFloat(e.detail.value)
            if (e.detail.value >= this.rechange) {
                this.sendcoin = parseFloat(this.sendcoin)
            }

        },
        pay() {
            var payData = {}
            if (this.money <= 0) {
                wx.showToast({
                    title: '请充值金额',
                    icon: 'loading',
                    duration: 2000
                })
                return;
            }
            if (this.rechange > this.money && this.activityId != 0) {
                wx.showModal({
                    title: '提示',
                    showCancel: false,
                    content: '充值金额低于活动金额'
                })
                return;
            }
            payData.code = this.codeNum
            if (this.money < this.rechange) {
                payData.sale = 0
            } else {
                payData.sale = parseFloat(this.sendcoin)
            }

            payData.coin = parseFloat(this.money).toFixed(2)
            // payData.coin = 0.01
            payData.type = 0
            payData.payway = 0
            payData.regulations = null
            payData.openid = this.$root.globalData.openid
            payData.actyId = this.activityId
            var that = this
            var payUrl = "http://www.weixin.qq.com/wxpay/pay.php"
            that.$root.post("/basic/newMember/applet/payrechange?code=" + that.cartInfo.codeNum + "&sale=" + that.sendcoin + "&coin=" + parseFloat(this.money).toFixed(2) + "&type=0&actyId=" + that.activityId + "&payway=0&regulations=null&url=" + payUrl, payData, function(data) {
                if (data.success) {
                    wx.requestPayment({
                        'timeStamp': data.obj.timeStamp,
                        'nonceStr': data.obj.nonceStr,
                        'package': data.obj.package,
                        'signType': data.obj.signType,
                        'paySign': data.obj.paySign,
                        success(res) {
                            that.$root.post("/basic/newMember/applet/rechange?code=" + that.cartInfo.codeNum + "&sale=" + that.sendcoin + "&coin=" + parseFloat(this.money).toFixed(2) + "&type=0&actyId=" + that.activityId + "&payway=0&regulations=null&url=" + payUrl, payData, function(data) {
                                if (data.success) {
                                    wx.navigateTo({
                                        url: '../rechargeSuccess/rechargeSuccess'
                                    })
                                    return;
                                } else {
                                    wx.showToast({
                                        title: '充值失败',
                                        icon: 'loading',
                                        duration: 2000
                                    })
                                }

                                // if (data.list.length == 0) { // m没有活动
                                //     that.noActivity = true
                                //     return;
                                // }
                                // if (data.list.length > 0) {
                                //     that.activity = data.list
                                //     // that.activityId = data.list[0].id
                                //     // that.sendcoin = data.list[0].sendcoin
                                //     // that.rechange = data.list[0].rechange
                                // }
                            })
                        },
                        fail(res) {
                            console.log('支付失败')
                        }
                    })
                }

                // if (data.list.length == 0) { // m没有活动
                //     that.noActivity = true
                //     return;
                // }
                // if (data.list.length > 0) {
                //     that.activity = data.list
                //     // that.activityId = data.list[0].id
                //     // that.sendcoin = data.list[0].sendcoin
                //     // that.rechange = data.list[0].rechange
                // }
            })
        }
    }
}
</script>
<style scoped>
/* pages/recharge/recharge.wxss */

.page {
    width: 750rpx;
    min-height: 100vh;
    background: #f1f1f1;
}

.header {
    padding: 26rpx 20rpx;
    width: 750rpx;
    height: 148rpx;
}

.cartNumber {
    margin-bottom: 24rpx;
}

.headerImg {
    width: 750rpx;
    height: 148rpx;
    top: 0;
    left: 0;
}

.cartNumberImage {
    width: 46rpx;
    height: 36rpx;
    padding: 6rpx 0;
}

.balance {
    margin-left: 66rpx;
}













/*头部结束  */

.isActivity {
    width: 100%;
    padding: 16rpx 20rpx;
    margin-bottom: 10rpx;
}

.vertical {
    margin-top: 12rpx;
    margin-right: 14rpx;
    width: 6rpx;
    height: 18rpx;
    background: #5F57C0;
}

.isActivityTitle {
    height: 45rpx;
    line-height: 45rpx;
}













/*活动头部结束  */

.activityDetail {
    padding: 14rpx 20rpx;
    margin-bottom: 1px;
}

.activityDetailIocn {
    display: block;
    width: 32rpx;
    height: 32rpx;
    margin-right: 10rpx;
}

.activityDetailRight {
    width: 14rpx;
    height: 32rpx;
}

.activityDetailTitle {
    height: 32rpx;
    line-height: 32rpx;
}

.isActivityList {
    padding: 24rpx 20rpx;
    margin-bottom: 1px;
}

.unselected {
    width: 32rpx;
    height: 32rpx;
    margin-right: 10rpx;
    border-radius: 50%;
    border: solid 1px #333333;
}













/*活动列表结束  */

.isRecharge {
    width: 100%;
    padding: 16rpx 20rpx;
    margin-bottom: 2rpx;
}

.recharge {
    padding: 0 42rpx;
    padding-top: 100rpx;
}

.moneyIocn {
    display: inline-block;
    height: 85rpx;
    line-height: 85rpx;
    font-size: 60rpx;
    margin-right: 4rpx;
}

.rechargeInput {
    width: 626rpx;
    height: 60rpx;
    line-height: 60rpx;
    margin-top: 12rpx;

    line-height: 60rpx;
    margin-top: 12rpx;
    padding-left: 22rpx;
    border-bottom: 1px solid rgba(204, 204, 204, 0.60);
}

.rechargeMoney {
    padding: 0 42rpx;
    line-height: 40rpx;
    padding-bottom: 128rpx;
}

.actuallyPaid {
    padding-right: 100rpx;
}

.pay {
    width: 670rpx;
    height: 94rpx;
    line-height: 94rpx;
    background: #5F57C0;
    border-radius: 10rpx;
}

.reminder {
    padding: 0 42rpx;
    padding-bottom: 57rpx;
}

.c504 {
    color: #50499A;
}

.c645 {
    color: #645FA6;
}
</style>

