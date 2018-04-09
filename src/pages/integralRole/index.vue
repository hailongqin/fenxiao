
<template>
    <view class="page">
        <view class="plr30 box-s ft28 c6">
            <view class="mt30">·积分作用：积分可用于抵用部分商品和服务的金额 
            </view>
            <view class="title">·积分获得方式只要包括：
            </view>
            <view>1.日常登陆（每日登录可获得 {{loginScore}} 积分）
            </view>
            <view>2.支付返还（订单每满 {{payScore}} 元可获得 1 积分）
            </view>
        </view>
    </view>
</template>
<script>
export default {
    props: {
        content: {
            type: String
        }
    },
    config: {
        "navigationBarTitleText": "积分规则"
    },
    data() {
        return {
            ref: this.content,
            integral: "",
            modelShow: false,
            loginScore:0,
            payScore:0
        }
    },
    onLoad() {
        var that = this
        wx.request({
            url: that.$root.apiServer + that.$root.appid + '/basic/score/applet/selectOneByOpenid?openid=' + that.$root.globalData.openid,
            data: {
            },
            method: "POST",
            header: {
                'Content-Type': 'application/json'
            },
            success(rst) {
                if (rst.data.success) {
                    that.totalScore = rst.data.code
                    if (rst.data.obj == null || rst.data.code == 0) {
                        this.scoreOpen = false
                    }
                    if (rst.data.obj != null) {
                        that.rateScore = rst.data.obj.rateScore
                        that.payScore = rst.data.obj.payScore
                        that.payFlag = rst.data.obj.payFlag,
                        that.scoreOpen = rst.data.obj.rateFlag,
                        that.loginScore = rst.data.obj.loginScore
                        
                    }

                }
            }
        })
    }
}
</script>
<style scoped>
.titles{

}
.title{
    margin-bottom: 48rpx;
}
.box-s view{
    /* height: 48rpx; */
    line-height: 48rpx;
}
</style>



