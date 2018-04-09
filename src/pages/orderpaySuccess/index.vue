<template>
<view class="container">
    <view class="_details">
        <view class="clear _deta_loud">
            <view class="_deta_wait left">恭喜您支付成功~</view>
        </view>
        <view class="_deta_order">
            订单编号：{{code}}
        </view>
    </view>
    <view class="_deta_info clear bmg">
        <view class="left _deta_txt">支付金额</view>
        <view class="right _deta_num">￥<text class="text">{{totalPrice}}</text></view>
    </view>
    <view class="_contant_item_btn">
        <view class="_contant_item"   @tap="tolevelGoods">订单详情</view>
        <view class="_contant_item"  @tap="toindex">返回首页</view>
    </view> 
</view>        

</template>

<script>
	export default {
		config: {
			"navigationBarTitleText": "订单详情"
		},	
		data() {
			return {
                code:'',
                totalPrice:'',
                ordId:''
			}
		},
		onLoad(e){
			
			var that = this	
			//技师
			wx.request({
			  url: that.$root.apiServer + that.$root.appid + "/basic/api/bPay/wxPaySuccess",
			  data: {
			  	token:getApp().globalData.token,
			  	ordId:e.ordId
			  },
			  method:"GET",
			  header: {
			      'content-type': 'application/json'
			  },
			  success: function(res) {
			  	if(res.data.success == true){
                      that.code= res.data.data.code
                      that.totalPrice= res.data.data.totalPrice
                      that.ordId= res.data.data.id
                  }		    
			  }
			})
		},
		methods: {
			toindex(){
					wx.redirectTo({
						url: '../index/index'
					})					
			},
			tolevelGoods(){
					wx.redirectTo({
						url: '../orderDetails/orderDetails?id='+this.ordId
					})			 				 	
			}
		}
	}	
</script>

<style scoped>
._details{height: 80rpx;padding: 16rpx 30rpx 24rpx;color: #fff;background: -ms-linear-gradient(top, #FF8BB7,  #FF4C90);background:-moz-linear-gradient(top,#FF8BB7,  #FF4C90);background: -webkit-linear-gradient(top, #FF8BB7, #FF4C90);background: -o-linear-gradient(top, #FF8BB7, #FF4C90)}

._deta_loud{line-height: 42rpx;}
._deta_wait{margin-right: 30rpx;font-size: 30rpx;margin-bottom: 10rpx}

._deta_info{padding: 30rpx;font-size: 30rpx;color: #111;line-height:42rpx }
._deta_num{color: #FF4C90;font-size: 22rpx}
._deta_num .text{font-size: 30rpx;}

._contant_item_btn{padding: 180rpx 30rpx;display: flex}
._contant_item{flex: 1;border:solid 1rpx #FF4C90;width: 338rpx;height: 88rpx;margin-left: 20rpx;line-height: 88rpx;text-align: center;border-radius: 8rpx;color: #FF4C90;font-size: 30rpx}
._contant_item:first-child{margin-left: 0}
</style>