<template>
      <view class="_lookover margint" bindtap="clickLookover">
      <view class="_lookover_top"><image class="_lookover_image" src="http://image.vdongchina.com/M00/03/31/ZSUkmVnfH-iEQVrmAAAAAA3Z8b8673.png"></image></view>
    <view class="_lookover_botom c9 ft24">{{content}}</view>
  </view>      
</template>
<script>
    export default{
        props:{
            content:{
                type:String
            }
        },
        data(){
            return{
                ref: this.content
            }
        }
    }
</script>
<style scoped>
._lookover {
    text-align: center;
    font-size: 28rpx;
    bottom: 0;
    width: 750rpx;
    padding: 40rpx 0;
}

._lookover_image {
    width: 40rpx;
    height: 40rpx;
}
</style>

