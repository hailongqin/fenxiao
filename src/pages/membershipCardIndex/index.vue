<template>
    <view class="page">
        <view class='header'>
            <view class="cartInfo box-s">
                <image class='cartInfoB' src='{{cartInfo.backpic || cartInfo.backPic}}'></image>
                <view class='display-flex' style="{{'color: '+ cartInfo.fcolor || cartInfo.fontColor}}">
                    <view wx:if="{{cartInfo.logo}}">
                        <image class="logo" src="{{cartInfo.logo}}"></image>
                    </view>
                    <view class='logo' wx:else style="{{'color: '+ cartInfo.fcolor || cartInfo.fontColor}}">logo</view>
                    <view class='companyName ft24 cf pos-r' style="{{'color: '+ cartInfo.fcolor || cartInfo.fontColor}}">{{cartInfo.codeName ? cartInfo.codeName:'会员卡名称'}}</view>
                    <view class='grade pos-r cf'>
                        <text class='gradeVip' style="{{'color: '+ cartInfo.fcolor || cartInfo.fontColor}}">VIP</text>
                        <text style="{{'color: '+ cartInfo.fcolor || cartInfo.fontColor}}">.{{cartInfo.lever?cartInfo.lever:'0'}}</text>
                    </view>
                </view>
                <view class='balance cf pos-r' style="{{'color: '+ cartInfo.fcolor || cartInfo.fontColor}}">{{cartInfo.balance}}</view>
                <button class='recharge box-s cf' style="{{'color: '+ cartInfo.fcolor || cartInfo.fontColor}}" @tap="recharge">充值</button>
                <view class='cardNumber ft32 cf pos-r'>
                    <text class='display-ib h45' style="{{'color: '+ cartInfo.fcolor || cartInfo.fontColor}}">{{cartInfo.leverName ? cartInfo.leverName:"普通会员"}}</text>
                    <text class='ft24 cf display-ib h45' style="{{'color: '+ cartInfo.fcolor || cartInfo.fontColor}}">{{cartInfo.codeNum ? cartInfo.codeNum  :(cartInfo.code || 'xxxxxxxxx')}}(卡号)</text>
                </view>
                <view class='cardNumber ft24 cf pos-r'>
                    <text class='display-ib' style="{{'color: '+ cartInfo.fcolor || cartInfo.fontColor}}">有效期：</text>
                    <text class='ft24 cf display-ib ' style="{{'color: '+ cartInfo.fcolor || cartInfo.fontColor}}">{{cartInfo.deadtime ? cartInfo.deadtime:'xxxx-xx-xx'}}</text>
                </view>
            </view>
        </view>
        
        <view class='navLists'  style="border-bottom:solid 2rpx #f1f1f1">
            <view class='navList box-s' wx:for="{{navList}}" wx:key="navLists" @tap="nav(item.url)">
                <view>
                    <image class="navListImage  fl-l" src="{{item.iocn}}"></image>
                    <view class="navListTitle fl-l">{{item.title}}</view>
                    <image class="navListImageRight  fl-r" src="http://image.vdongchina.com/M00/03/3C/ZSUkmVngJoKEWWIZAAAAAMedZrk797.png"></image>
                </view>
            </view>
        </view>

    </view>
</template>     
<script>
// , { title: "消费记录", iocn: "http://image.vdongchina.com/M00/03/3C/ZSUkmVngJt2EZznQAAAAAMSmJvQ991.png", url: "../recharge/recharge" }
export default {
    data() {
        return {
            userInfo: {},//用户信息
            navList: [{ title: "余额充值", iocn: "http://image.vdongchina.com/M00/03/3C/ZSUkmVngJ_SEVJt_AAAAAGpYGMk395.png", url: "../recharge/recharge" }, { title: "充值记录", iocn: "http://image.vdongchina.com/M00/03/3A/ZSUkmVngGTmEOqmNAAAAAPkWzfQ188.png", url: "../rechargeRecord/rechargeRecord" }, { title: "完善资料", iocn: "http://image.vdongchina.com/M00/03/3C/ZSUkmVngJdSEbVuQAAAAADI89tE516.png", url: "../organizingData/organizingData" }, { title: "支付密码管理", iocn: "http://image.vdongchina.com/M00/03/31/ZSUkmVnfIXmEeOWgAAAAAOI0-DA975.png", url: "../passwordManage/passwordManage" }],
            cartInfo: {
                backpic: '',
                fcolor: "",
                codeName: "",
                logo: ""
            },//卡信息
            fontColor: "",
            cartUser: {}
        }
    },
    onLoad() {
        var that = this
        wx.getUserInfo({
            success: function(res) {
                var userInfo = res.userInfo
                var nickName = userInfo.nickName
                var avatarUrl = userInfo.avatarUrl
                var gender = userInfo.gender //性别 0：未知、1：男、2：女
                var province = userInfo.province
                var city = userInfo.city
                var country = userInfo.country
                that.$root.globalData.userInfo = userInfo
            }
        })

    },
    onShow() {
        var that = this
        that.$root.post("/basic/newMember/applet/pview?openid=" + that.$root.globalData.openid, {}, function(data) {//请求卡信息
            console.log(data)
            if (data.success) {
                // data.obj.deadtime = data.obj.deadtime.substring(0, 10)
                that.cartInfo = data.obj
                if (data.obj.isdeleted == '0') {
                    that.$root.post("/basic/newMember/applet/view", {}, function(data) {//请求卡信息
                        if (data.success) {
                            console.log(data)
                            // data.obj.deadtime = data.obj.deadtime.substring(0, 10)
                            // that.cartInfo.backpic = data.obj.backPic
                            // that.cartInfo.fcolor || cartInfo.fontColor = data.obj.fontColor
                            // that.cartInfo.codeName = data.obj.code
                            that.cartInfo.logo = data.obj.logo
                        }
                    })
                }
            } else {
                if (data.obj) {
                    console.log(data, "222222222222222222222")
 
                    that.cartInfo = data.obj

                    console.log(that.cartInfo.backpic, "3333333333333333")
                }

            }
        })
        that.$root.post("/basic/newMember/applet/viewById?openid=" + that.$root.globalData.openid, {}, function(data) {//请求支付密码
            if (data.success) {
                that.cartUser = data.obj
            }
        }, 1)

    },
    methods: {
        nav(url) {
            if (this.cartInfo.codeNum) {
                wx.navigateTo({  //已注册会员卡
                    url: url + '?code=' + this.cartInfo.codeNum
                })
            } else {
                wx.navigateTo({//未注册会员卡
                    url: "../organizingData/organizingData"
                })
            }
        },
        recharge() {
            if (this.cartInfo.codeNum) {
                wx.navigateTo({//已注册会员卡
                    url: "../recharge/recharge"
                })
            } else {
                wx.navigateTo({//未注册会员卡
                    url: "../organizingData/organizingData"
                })
            }
        }
    }
}
</script>
<style scoped>
/**index.wxss**/

.page {
    background: #f4f4f4;
    min-height: 100vh;
}









/*  */

.box-s {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}

.cf {
    color: #fff;
}

.c3 {
    color: #333;
}

.ft24 {
    font-size: 24rpx;
}

.ft32 {
    font-size: 32rpx;
}

.display-flex {
    display: flex !important;
    display: -webkit-box !important;
    display: -moz-box !important;
    display: -ms-flexbox !important;
    display: -webkit-flex !important;
}

.pos-r {
    position: relative;
}

.pos-a {
    position: absolute;
}

.display-ib {
    display: inline-block
}

.h45 {
    height: 45rpx;
    line-height: 45rpx;
}

.fl-l {
    float: left;
}

.fl-r {
    float: right;
}








/*  */


/*会员卡  */

.header {
    padding: 40rpx 0;
    background: #ffffff;
    margin-bottom: 20rpx;
}

.cartInfo {
    width: 650rpx;
    height: 366rpx;
    margin: 0 auto;
    border-radius: 14px;
    background-repeat: no-repeat;
    background-position-y: 100%;
    background-size: 100%;
    position: relative;
    padding: 19rpx 30rpx;
}

.cartInfoB {
    position: absolute;
    width: 650rpx;
    height: 366rpx;
    top: 0;
    left: 0;
    border-radius: 14rpx;
}

.logo {
    width: 50rpx;
    height: 50rpx;
    background: #fff;
    border-radius: 50%;
    position: relative;
    line-height: 50rpx;
    text-align: center;
    font-size: 22rpx;
    color: #8a37c6;
}

.companyName {
    height: 52rpx;
    line-height: 52rpx;
    margin-left: 32rpx;
    width: 380rpx;
}

.grade {
    font-size: 44rpx;
}

.gradeVip {
    width: 320rpx;
}

.grade {
    font-size: 44rpx;
}

.gradeVip {
    font-style: italic;
    margin-right: 6rpx;
}

.balance {
    text-align: center;
    font-size: 50rpx;
    margin-top: 48rpx;
    height: 70rpx;
    line-height: 70rpx;
    font-weight: bold;
}

.recharge {
    border: 2rpx solid #fff;
    border-radius: 4rpx;
    width: 100rpx;
    height: 44rpx;
    line-height: 40rpx;
    text-align: center;
    font-size: 28rpx;
    padding: 0;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    background: rgba(0, 0, 0, 0);
    margin-top: 12rpx;
    margin-bottom: 20rpx;
}

.cardNumber {
    height: 45rpx;
    line-height: 45rpx;
}

.ft24.cf.display-ib.h45 {
    margin-left: 8rpx;
}









/*卡信息结束  */

.navList {
    width: 100%;
    padding: 26rpx 30rpx 26rpx 16rpx;
    overflow: hidden;
    background: #ffffff;
    margin-bottom: 1px;
    line-height: 32rpx;
    font-size: 32rpx;
    color: #333333;
}

.navListImage {
    width: 34rpx;
    height: 34rpx;
}

.navListImageRight {
    width: 16rpx;
    height: 32rpx;
}

.navListTitle {
    margin-left: 16rpx;
}
</style>

