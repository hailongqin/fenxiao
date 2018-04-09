
<template>
    <view id="sign" wx:if="{{modelShow}}">
        <view class="_model">
            <image class="modelImage" src="http://image.vdongchina.com/M00/04/FC/ZSUkmVoD7--EccFNAAAAAK28jjw935.png" />
            <view class="_model_content box-s bg-wt">
                <view class="_model_title txt-c">
                    每日登录+{{integral}}积分</view>
                <view class="_model_intro txt-c">
                    永远相信美好的事情即将发生</view>
            </view>
            <view class="txt-c" @tap="cancel">
                <icon class="modeIcon" type="cancel" size="60" color="#ffffff" />
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
    data() {
        return {
            ref: this.content,
            integral: "",
            modelShow: false
        }
    },
    onReady() {
        var that = this
        that.$root.post("/basic/score/applet/loginScore?token=" + wx.getStorageSync("token"), {}, function(data) {
            if (data.success) {
                that.modelShow = true
                that.integral = data.obj
                setTimeout(function() {
                    that.modelShow = false
                }, 10000)

            }
            // if (data.list.length == 0) {
            //     that.noActivity = true
            //     return;
            // }
            // if (data.list.length > 0) {
            //     console.log("111111111111")
            //     that.activity = data.list
            // }
        })
    },
    methods: {
        cancel() {
            this.modelShow = false
        }
    }

}
</script>
<style scoped>
.test {
    font-size: 80rpx;
    line-height: 100rpx
}

#sign {
    width: 750rpx;
    min-height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
}


._model {
    position: fixed;
    top: 160rpx;
    left: 140rpx;
}

.modelImage {
    display: block;
    width: 460rpx;
    height: 308rpx;
}

._model_content {
    width: 460rpx;
    height: 250rpx;
    padding-top: 70rpx;
    border-bottom-left-radius: 10rpx;
    border-bottom-right-radius: 10rpx;
    margin-top: -20rpx;
}

._model_title {
    width: 460rpx;
    height: 34rpx;
    font-size: 34rpx;
    font-family: PingFang-SC-Regular;
    color: rgba(51, 51, 51, 1);
    line-height: 34px;

    margin-bottom: 30rpx;
}

._model_intro {
    width: 460rpx;
    height: 28rpx;
    font-size: 28rpx;
    font-family: PingFang-SC-Regular;
    color: rgba(153, 153, 153, 1);
    line-height: 28rpx;
}

.modeIcon {
    margin-top: 80rpx;
}
</style>



