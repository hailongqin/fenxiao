<template>
    <!--pages/organizingData/organizingData.wxml-->

    <view class='page'>
        <view class='header pos-r box-s' wx:if="{{isExist}}">
            <image class='headerImg pos-a' src="http://image.vdongchina.com/M00/02/C1/ZSUkmVnOBCWEYM24AAAAABf-gW8028.png"></image>
            <view class='cartNumber pos-r display-flex'>
                <image class='cartNumberImageOn' src='http://image.vdongchina.com/M00/03/3B/ZSUkmVngJRWEIMiDAAAAAEh4HrQ383.png'></image>
                <view class='ft34 white ml20 grade'>VIP会员当前等级为{{cartInfo.leverName}}</view>
            </view>
        </view>
        <view class='header pos-r box-s' wx:else>
            <image class='headerImg pos-a' src='http://image.vdongchina.com/M00/02/C1/ZSUkmVnOBCWEYM24AAAAABf-gW8028.png'></image>
            <view class='cartNumber pos-r display-flex'>
                <image class='cartNumberImage' src='http://image.vdongchina.com/M00/03/3B/ZSUkmVngJRWEIMiDAAAAAEh4HrQ383.png'></image>
                <view class='ft34 white ml20'>VIP会员卡免费发放中</view>
            </view>
            <view class='balance ft30 white pos-r'>确认授权>完成注册>享受会员支付折扣</view>
        </view>

        <view class='activityDetail bg-wt'>
            <view class='ovfl' @tap="ruleInfo">
                <image class='activityDetailIocn fl-l' src='http://image.vdongchina.com/M00/03/3C/ZSUkmVngKESELf9_AAAAAPdU0rU025.png'></image>
                <view class='ft28 c6 fl-l activityDetailTitle'>会员卡使用规则</view>
                <image class='activityDetailRight fl-r' src='http://image.vdongchina.com/M00/03/3C/ZSUkmVngJoKEWWIZAAAAAMedZrk797.png'></image>
            </view>
        </view>
        <form class='userInfo box-s'>
            <view class='userName display-flex bg-wt'>
                <text class='ft32 c6'>姓名：</text>
                <input class='userInfoInput ft32' name="userName" placeholder='（必填）' value="{{userName}}" @input='userName' placeholder-class='ft32 c6'></input>
            </view>
            <view class='userName display-flex bg-wt'>
                <picker mode="date" name="birthday" value="{{dates}}" @change="bindDateChange" end="{{endDate}}">
                    <view class="ft32 c6">
                        <text>生日：{{dates == '' ? '（必填）':dates}}</text>
                    </view>
                </picker>
            </view>
            <view class='userName bg-wt' wx:if="{{isExist}}">
                <text class='ft32 c6'>手机号：{{mobile}}</text>
            </view>
            <view class='submitBt bg-wt' wx:if="{{!isExist}}">
                <button class='pay white ft36' open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">确认授权</button>
            </view>
            <view class='submitBt bg-wt' wx:else>
                <button class='pay white ft36' @tap="revamp">确认修改</button>
            </view>

        </form>
    </view>
</template>

<script>
var util = require('../../utils/util.js')
export default {
    config: {
        navigationBarTitleText: '完善资料'
    },
    data() {
        return {
            dates: "",
            endDate: "",
            userName: '',
            isExist: false,//会员卡是否存在
            cartInfo: {},
            cartUser: {},
            mobile: "",
            id: "",
            phone: ""
        }
    },
    onLoad() {
        var that = this
        that.$root.post("/basic/newMember/applet/pview?openid=" + that.$root.globalData.openid, {}, function(data) {

            if (data.success) {
                that.cartInfo = data.obj
            }
        })
        that.$root.post("/basic/newMember/applet/viewById?openid=" + that.$root.globalData.openid, {}, function(data) {
            if (data.obj != null) {
                that.isExist = true
                that.userName = data.obj.name
                that.dates = data.obj.borth.substring(0, 10)
                that.phone = data.obj.mobile
                var mtel = data.obj.mobile.substring(0, 3) + '****' + data.obj.mobile.substring(7);
                that.mobile = mtel
                that.id = data.obj.id
            }

        }, 1)

    },
    methods: {

        revamp() {
            var that = this
            that.$root.post("/basic/newMember/applet/update", { id: that.id, name: that.userName, code: that.cartInfo.codeNum, borth: that.dates + " 00:00:00" }, function(data) {
                if (data.success) {
                    wx.showToast({
                        title: '修改成功',
                        icon: 'success',
                        duration: 2000,
                        mask:true
                    })
                    setTimeout(function() {
                        wx.navigateBack({
                            delta: 1
                        })
                    }, 2000)
                } else {
                    wx.showToast({
                        title: '修改失败',
                        icon: 'loading',
                        duration: 2000,
                        mask:true
                    })
                }
            })

        },
        userName(e) {
            this.userName = e.detail.value
        },
        /**
         * 生命周期函数--监听页面初次渲染完成
         */
        bindDateChange(e) {
            this.dates = e.detail.value
        },
        getPhoneNumber(e) {
            var that = this
            that.$root.globalData.userInfo
            if (that.userName == '') {
                wx.showToast({
                    title: '请填写姓名',
                    icon: 'loading',
                    duration: 2000
                })
                return;
            }
            if (that.dates == '') {
                wx.showToast({
                    title: '请填写生日',
                    icon: 'loading',
                    duration: 2000
                })
                return;
            }
            // console.log(that.$root.globalData.userInfo, "修改之前")
            // // if (that.$root.globalData.userInfo.gender == 1) { //微尘端 男为0女为1 和 微信端相反
            // //     that.$root.globalData.userInfo.gender = 0
            // // } else {
            // //     that.$root.globalData.userInfo.gender = 1
            // // }
            // console.log(that.$root.globalData.userInfo, "修改之后")
            wx.login({
                success(res) {
                    if (res.code) {
                        that.$root.post("/basic/newMember/applet/getWxPkCS7", { iv: e.detail.iv, encryptedData: e.detail.encryptedData, code: res.code }, function(resData) {
                            var userInfo = that.$root.globalData.userInfo
                            if (resData.success) {
                                let datas = JSON.parse(resData.obj.data);
                                that.$root.post("/basic/newMember/applet/save", { name: that.userName, code: null, mobile: datas.phoneNumber, borth: that.dates + " 00:00:00", sex: userInfo.gender, openId: that.$root.globalData.openid, nickname: that.$root.globalData.userInfo.nickName, }, function(data) {
                                    if (data.success) {
                                        wx.showToast({
                                            title: '注册成功',
                                            icon: 'success',
                                            duration: 2000
                                        })
                                        // setTimeout(function() {
                                        //     wx.navigateBack({
                                        //         delta: 1
                                        //     })
                                        // }, 2000)
                                        wx.navigateTo({
                                          url: '../recharge/recharge'
                                        })
                                    } else {
                                        wx.showToast({
                                            title: '注册失败',
                                            icon: 'loading',
                                            duration: 2000
                                        })
                                    }
                                })
                            }
                        }, 1)

                    }
                }
            })

        },
        ruleInfo() {
            wx.navigateTo({
                url: '../membershipCardRule/membershipCardRule'
            })
        }
    }
}
</script>


<style scoped>
.page {
    background: #f1f1f1
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

.cartNumberImageOn {
    width: 46rpx;
    height: 36rpx;
    padding: 30rpx 0;
}

.grade {}

.balance {
    margin-left: 66rpx;
}

.grade {
    height: 36rpx;
    padding: 30rpx 0;
}














/*头部结束  */

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















/*  */

.userInfo {
    display: block;
    width: 750rpx;
}

.userName {
    height: 78rpx;
    line-height: 78rpx;
    padding: 0 20rpx;
    margin-bottom: 1px;
}

.userInfoInput {
    height: 78rpx;
    line-height: 78rpx;
}

.pay {
    width: 670rpx;
    height: 94rpx;
    line-height: 94rpx;
    background: #5F57C0;
    border-radius: 10rpx;
}

.submitBt {
    padding-top: 90rpx;
    padding-bottom: 40rpx;
}
</style>

