<template>
<view class="container">
    <view class="_contant_pay bmg">
        <view class="_pay_times">
            <view class="_pay_txt">支付剩余时间</view>
            <view>{{clock}}</view>
        </view>
        <view class="_pay_info clear">
            <view class="left">订单编号：{{code}}</view>
            <view class="right _pay_moeny">需付款：<text>￥{{totalPrice}}</text></view>
        </view>
    </view>
    <!-- <view class="_pay_way margint">
        <view class="_pay_title">请选择支付方式</view>
        <view class="_pay_main bmg">
             <radio-group class="group" @change="checkboxChange">
                <view class="clear goods_item"   wx:for="{{items}}" wx:key="gg">
                      <view class="goods_img left">
                        <image class="goods_img_image" src="{{item.img}}"></image>
                      </view>
                      <view class="goods_text left">
                          <view class="goods_title">{{item.title}}</view>
                      </view>
                      <view class="goods_check right" >
                          <radio value="{{item.uuid}}" checked="{{item.checked}}"></radio>   
                          <view class="label-icon">
                              <view class="label_icon_checked" style="opacity:1">
                                <image class="label_icon_checked_image" src="http://image.vdongchina.com/M00/03/30/ZSUkmVnfFxeEBe4CAAAAAIoEfoI864.png"></image>
                              </view>
                          </view>                
                      </view>

                      <view class="goods-del" data-id="{{item.historyid}}" bindtap="del"></view>
                  </view>
              </radio-group>       
        </view>
    </view> -->
    <view class="_contant_item_btn" @tap="pay" wx:if="{{isPay}}">
确认支付
    </view>  
</view>	
</template>

<script>
	const util = require('../../utils/util.js')
	export default {
		config: {
			"navigationBarTitleText": "支付详情"
		},	
		data() {
			return {
				clock:0,
				totalms:0,
				createDate: 0,
				items: [
//			      { uuid: 300, title: "余额支付(当前余额￥49)", img:"../../img/balance.png",checked:true},
			      { uuid: 400, title: "微信支付", img: "http://image.vdongchina.com/M00/03/3C/ZSUkmVngJfOERe9lAAAAABjhsEA768.png",checked:true}
			    ],
			    code:'',
			    totalPrice:'',
			    id:'',
			    isPay:true
			}
		},
		onLoad: function (e) {
			
			var that = this	
			//供应商
			wx.request({
				url: that.$root.apiServer+that.$root.appid + "/basic/api/bOrd/ordDetail",
				data: {
				    id:e.id
				},
				method:"POST",
				header: {
				    'content-type': 'application/x-www-form-urlencoded'
				},
				success: function(res) {
					if(res.data.success == true){
						that.code=res.data.data.code
						that.id=res.data.data.id
						that.totalPrice=res.data.data.totalPrice
						that.createDate = res.data.data.createDate
						var curTime = util.formatTime(new Date())
						if(that.totalms<900000){
							that.totalms =  900000-(util.dateFormat(curTime)-util.dateFormat(that.createDate))
						}else{
							that.totalms = 0
						}						
						that.countDown() //开启倒计时  
					}
					
				}
			})		    		    		    
		},
		methods: {
			countDown() {
//				// 渲染倒计时时钟
				var that = this
				var clock = this.date_format(this.totalms)
				this.clock = clock
				if(this.totalms <= 0) {
					this.clock = "已经截止"
					// timeout则跳出递归
					that.isPay = false
					return;
				}
				setTimeout(() => {
					// 放在最后--
					var curTime = util.formatTime(new Date())
					if(that.totalms<900000){
						that.totalms =  900000-(util.dateFormat(curTime)-util.dateFormat(that.createDate))
					}else{
						that.totalms = 0
					}
					this.countDown()
				}, 1000)
			},
			// 时间格式化输出，如03:25:19 86。每10ms都会调用一次
			date_format(micro) {
				micro = micro || 1
				// 秒数
				var second = Math.floor(micro / 1000);
				// 小时位
				var hr = Math.floor(second / 3600);
				// 分钟位
				var min = this.fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
				// 秒位
				var sec = this.fill_zero_prefix((second - hr * 3600 - min * 60)); // equal to => var sec = second % 60;

				if(hr) {
					return hr + "小时";
				} else {
					return min + ":" + sec
				}
			},
			// 位数不足补零
			fill_zero_prefix(num) {
				return num < 10 ? "0" + num : num
			},		
		  	checkboxChange(e) {
//			    var checked = e.detail.value
//			    var changed = {}
//			    var address = ''
//              var itemsArr  = this.items
//           	for (var i = 0; i < this.items.length; i++) {     
//			      if (checked.indexOf((this.items[i].uuid).toString()) !== -1) {
//			        itemsArr[i].checked = true
//			        address = itemsArr[i].title
//			      } else {
//			        itemsArr[i].checked = false
//			      }
//			    }
//              this.items = itemsArr
			},
		pay() {

			var that = this
			wx.navigateTo({
				url: '../membershipCardPay/membershipCardPay?id=' + that.id + "&price=" + that.totalPrice + "&isType=1"
			})			
		}
		  	
		  	
		}
	}		
</script>

<style scoped>
page{background: #f9f9f9;}
.container{background: #F9F9F9;}		
._contant_pay{padding: 0 20rpx}
._pay_times{padding: 30rpx;text-align: center;font-size: 52rpx;color: #333333;line-height: 74rpx;border-bottom: 1rpx #f5f5f5 solid}
._pay_txt{color: #999999;line-height: 40rpx;font-size:26rpx}

._pay_info{padding: 30rpx 0;color: #111111;font-size: 28rpx;line-height: 40rpx}
._pay_moeny{font-size: 22rpx}
._pay_moeny text{font-size: 28rpx;color: #FF4C90}

._pay_title{padding:10rpx 30rpx;color: #999999;font-size: 26rpx}

.goods_item{border-bottom:1rpx solid #f8f8f8;padding: 30rpx }
.goods_check{position: relative;margin-top:10rpx }
radio{opacity: 0;position: absolute;left: 0;top: 0;width: 50rpx;height: 50rpx;z-index: 99}
.goods_img{width: 60rpx;height: 60rpx;margin-right: 30rpx}
.goods_img_image{width: 60rpx;height: 60rpx}
.goods_title{color: #111111;font-size: 30rpx;line-height: 60rpx}
.goods_address{line-height: 40rpx;color: #999999;font-size: 28rpx;margin-top: 20rpx}


.label-icon {position: relative;margin-right: 10px;display: inline-block;vertical-align: middle;width: 40rpx;height: 40rpx; border:solid 2rpx #c8c8c8;border-radius: 50%;}

.label_icon_checked { position: absolute;top:0;left:-40;width:40rpx; height: 40rpx;}

.label_icon_checked_image{width: 40rpx;height: 40rpx}

._contant_item_btn{line-height: 88rpx;text-align: center;font-size: 32rpx;color: #fff;position: fixed;bottom: 0;width:100%;background: #FF4C90; }	
</style>