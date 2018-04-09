<template>
  <view class="container">
    <view class="code_cont">
        <view class="code_head">
            <image class="code_head_image" src="../../img/picture.png"></image>            
        </view>
        <view class="code_text">美发美业</view>
        <view class="code_number">622222222222222222222222</view>
        <view class="code_code">
            <image class="code_code_image" src="../../img/picture.png"></image>      
        </view>
        <view class="code_hint" style="background:url(../../img/picture.png) no-repeat;padding-left:30rpx;background-size:20rpx 24rpx;background-position-x:110rpx;background-position-y:4rpx;">每2分钟自动更新</view>
    </view>
    <view class="code_btn">
        <view class="code_btn_back">返回</view>    
    </view>
</view>
</template>
<script>
   export default {
    config: {
        "navigationBarTitleText": "我的二维码"
    },
    data(){
        return{
        }
    },
    methods:{
}
}
</script>
<style scoped>
page{background: #ffffff}
.code_cont{padding: 20rpx 165rpx;text-align: center}
.code_head{border-radius: 50%;overflow: hidden;width: 200rpx;height: 200rpx;margin-left: 110rpx;margin-bottom: 20rpx;}
.code_head_image{width: 200rpx;height: 200rpx;}
.code_text{font-size: 40rpx;color: #FF4C90;font-weight: bold;margin-bottom: 40rpx;}
.code_number{font-size: 28rpx;line-height: 40rpx;color: #111111;font-weight: bold;margin-bottom: 40rpx;}
.code_code_image{width: 420rpx;height: 420rpx;}

.code_btn{padding: 30rpx;}
.code_btn_back{border:solid 1rpx #FF4C90;line-height: 98rpx;text-align: center;font-size: 32rpx;color: #FF4C90}
</style>
