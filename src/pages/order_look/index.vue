<template>
  <view class="w-100">
    <view class="look_iamge"><image class="look_image_image" src="http://image.vdongchina.com/M00/03/3A/ZSUkmVngGuOEFl4-AAAAABDamwk685.png"></image></view>
    <view class="w-100 txt-c c9 ft28 look_title">{{beginTime ? "预约未开始,请耐心等待~" :"预约已结束"}}</view>
    <view class="order_start ft36 w-100 txt-c strong" wx:if="{{beginTime}}"><text>预约开始时间 \n{{beginTime}}</text></view>
</view>
</template>
<script>
export default {
	config: {
		"navigationBarTitleText": "预约"
	},
	data() {
		return {
			beginTime: ""
		}
	},
	onLoad(options) {
        if(options.beginTime){
            this.beginTime = options.beginTime
        }
		
	},
	methods: {

	}
}
</script>
<style scoped>
.look_iamge{
    width: 210rpx;
    margin: 0 auto;
    display: block;
    margin-top: 100rpx;
}
.look_image_image{
    width: 210rpx;
    height: 210rpx;
     margin: 0 auto;
}
.look_title{
    margin-top: 30rpx;
    height: 40rpx;
    line-height: 40rpx;
}
.order_start{
    margin-top: 58rpx;
    height: 50rpx;
    line-height: 50rpx;
    color: #1DA5FF;
}
</style>

