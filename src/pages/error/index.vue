<template>
    <view class="container">
        <view class="topLine"></view>
        <view class="defaults">
            <view class="classname"><image class="defaultsImg" src="{{image}}"></image></view>
            <view class="classname">{{msg}}</view>
            <view class="defBtn main-bord main-color" @tap="defBtn">返回</view>
        </view>
    </view>
</template>

<script>
export default {
    data () {
        return {
            msg: '额，出错了+_+',
            image: 'http://image.vdongchina.com/M00/03/05/M00/03/05/ZSUkmVnbDSCEe0KXAAAAAFV7JAU341.png'
        }
    },
    onLoad (options) {
        this.msg = options.msg || this.msg
        this.image = options.image || this.image
    },
    methods: {
        defBtn () {
            wx.redirectTo({
                url: '../index/index'
            })
        }
    }
}
</script>