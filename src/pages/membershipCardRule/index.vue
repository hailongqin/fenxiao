<template>
    <view class='page box-s'>
        <!-- <view class='banner'>
                    <image class='bannerImg' mode='widthFix' src='../../img/img@2x.png'></image>
                </view> -->
        <view class='mt20 ft34 c3 rule' wx:if="{{!noData}}">
            <view class='ruleTitle' >{{ruleInfo.regulations}} </view>
            <!-- <view class='ruleContent' style="{{'color: '+ ruleInfo.fcolor}}"> -->
                <!-- <rich-text nodes="{{ruleInfo.content}}"></rich-text> -->
            <!-- </view> -->
        </view>
        <view class="ft20 c9 txt-c" wx:else>
            <image class="noDataImg" src="http://image.vdongchina.com/M00/03/39/ZSUkmVngD0iEeQ8BAAAAAF8Zfxw132.png" />
            <view class="ft32 c9 txt-c">暂无相关内容</view>
        </view>
    </view>
</template>
<script>
export default {
    config: {
        navigationBarTitleText: '会员卡规则'
    },
    data() {
        return {
            ruleInfo: {},
            noData: false
        }
    },
    onLoad() {
        var that = this

        that.$root.post("/basic/newMember/applet/view", {}, function(data) { //会员卡规则
            if (data.success) {
                if (data.obj == null) {
                    that.noData = true
                    return;
                }
                that.ruleInfo = data.obj
            }
        })
    },
    methods: {}
}
</script>
<style scoped>
/* pages/membershipCardRule/membershipCardRule.wxss */
.page{
    min-height: 100vh;
}
.bannerImg {
    width: 750rpx;
}

.rule {
    padding: 0 28rpx;
    line-height: 45rpx;
}

.ruleContent {

}

.noDataImg {
    width: 240rpx;
    height: 205rpx;
    margin: 0 auto;
    margin-top: 180rpx;
    margin-bottom: 60rpx;
}
</style>

