<template>
<view class="container">
    <view class="_location clear bmg" wx:for="{{list}}"  wx:key="gg">
      <view class="_location_info left">
          <view class="_location_store">{{item.name}}</view>
          <view class="_location_site">{{item.ress}}</view>
          <view class="_location_distance clear">
              <view class="left _location_distance_img"><image class="_location_distance_img_image" src="{{item.icon}}"></image></view>
              <view class="left">58米</view>
          </view>
      </view>  
      <view class="right _location_phone">
          <image class="_location_phone_image" src="{{item.img}}"></image>
      </view>     
    </view> 
</view>       
	
</template>

<script>
	export default {
		config: {
			"navigationBarTitleText": "商家列表"
		},	
		data() {
			return {
			      list:[
			        { name: "宁波银泰城店", ress: "鄞州区罗蒙环球城77号", time: "营业时间：6:00-22-00", icon: "http://image.vdongchina.com/M00/03/2A/ZSUkmVnewuaEAgYvAAAAADa1yvs029.png", img:"http://image.vdongchina.com/M00/03/39/ZSUkmVngESiEbjiCAAAAAFe96EA370.png"},
			        { name: "宁波银泰城店", ress: "鄞州区罗蒙环球城77号", time: "营业时间：6:00-22-00", icon: "http://image.vdongchina.com/M00/03/2A/ZSUkmVnewuaEAgYvAAAAADa1yvs029.png", img: "http://image.vdongchina.com/M00/03/39/ZSUkmVngESiEbjiCAAAAAFe96EA370.png" },
			
			      ]
			}
		},
	}	
</script>

<style scoped>
._location{border-bottom: 1rpx solid #f8f8f8;}
._location_info{width: 568rpx;padding: 24rpx 30rpx;position: relative;}
._location_store{font-weight: bold;margin-bottom: 20rpx;}
._location_time{margin-top: 4rpx;}
._location_distance{position: absolute;color: #999999;right: 30rpx;top:50%;margin-top: -20rpx;}
._location_distance_img_image{width: 30rpx;height: 34rpx;margin-right: 20rpx;}
._location_phone{border-left: 1rpx solid #f8f8f8;padding: 69rpx 36rpx;}
._location_phone_image{width:40rpx;height: 40rpx; }	
</style>