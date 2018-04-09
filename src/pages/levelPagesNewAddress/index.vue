<template>
<view class="container">
    <view class="_city bmg margint clear">
        <view class="_cityimg left"><image class="_cityimg_image" src="http://image.vdongchina.com/M00/03/2A/ZSUkmVnexDGERZL0AAAAANQy8m8690.png"></image></view>
        <view class="left">宁波市</view>
    </view>
    <view class="_detail bmg margint clear">
        <view class="_detailtxt left">地址</view>
        <view class="_detailinput left">
           <view class="_detailinput_f"><input  placeholder="您所在的城市的小区/大厦或街道名"/></view>
           <view class="classname"><input  placeholder="详细地址，如：1号楼6单元408"  /></view>
        </view>
    </view>
    <checkbox-group class="group" @change="checkChange">
    <view class="clear goods_item">
          <view class="goods_check left" >
              <checkbox checked="{{ischecked}}"></checkbox>   
              <view class="label-icon">
                  <view class="{{item.checked ? 'opac1 label_icon_checked' :'label_icon_checked'}}">
                    <image class="label_icon_checked_image" src="http://image.vdongchina.com/M00/03/30/ZSUkmVnfFxeEBe4CAAAAAIoEfoI864.png"></image>
                  </view>
              </view>                
          </view>                
          <view class="goods_text left">
              <view class="goods_title">默认地址<text>(选中后在提交订单页将自动填入)</text></view>
          </view>


      </view>
  </checkbox-group>
  <view class="_add_btn">保存</view>
</view>
</template>

<script>
	export default {
		config: {
			"navigationBarTitleText": "选择服务地址"
		},	
		data() {
			return {
				ischecked:false,
			}
		},
		methods: {
		  checkChange: function () {
		    if(this.ischecked)
		      this.ischecked=false
		      else
		      this.ischecked=true
		  }
		}
	}	
</script>

<style scoped>
.opac1{opacity: 1;}	
._city{padding: 30rpx; color: #FF4C90;font-size: 32rpx}
._cityimg{width: 30rpx;height: 34rpx;margin-right: 20rpx}
._cityimg_image{width: 30rpx;height: 34rpx}

._detail{line-height: 108rpx}
._detailtxt{width: 120rpx;text-align: center;color: #111111;font-size: 30rpx}
._detailinput input{line-height: 108rpx;height: 108rpx;width: 600rpx;font-size: 28rpx}
._detailinput_f input{border-bottom:solid 1rpx #f0f0f0;}



.goods_item{border-bottom:1rpx solid #f8f8f8;padding: 30rpx }
.goods_check{position: relative;}
checkbox{opacity: 0;position: absolute;left: 0;top: 0;width: 50rpx;height: 50rpx;z-index: 99}
.goods_title{color: #FF4C90;font-size: 30rpx;line-height: 42rpx}
.goods_title text{color:#999999; font-size: 24rpx}
.goods_address{line-height: 40rpx;color: #999999;font-size: 28rpx;margin-top: 20rpx}



.label-icon {position: relative;margin-right: 10px;display: inline-block;vertical-align: middle;width: 40rpx;height: 40rpx; border:solid 2rpx #c8c8c8;border-radius: 50%;}

.label_icon_checked { position: absolute;top:0;left:0;width:40rpx; height: 40rpx;}

.label_icon_checked_image{width: 40rpx;height: 40rpx}

._add_btn{position: fixed;width: 750rpx;bottom: 0;left: 0;background: #FF4C90;height: 100rpx;line-height: 100rpx;text-align: center;color: #fff;font-size: 32rpx}

	
</style>