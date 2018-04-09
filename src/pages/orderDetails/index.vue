<template>
<view class="container">
    <view class="_details">
        <view class="clear _deta_loud" wx:if="{{status==0}}">
            <view class="_deta_wait left">等待支付</view>
            <view class="left clear">
                <view class="_deta_timeimg left"><image class="_deta_timeimg_image" src="http://image.vdongchina.com/M00/03/3B/ZSUkmVngInSEInPpAAAAAMSgm-g635.png"></image></view>
                <view class="_deta_time left">{{clock}}</view>
            </view>
        </view>

        <view class="clear _deta_loud" wx:if="{{status==1}}">
            <view class="_deta_wait left">订单未使用~快去享受服务吧！</view>
        </view> 

        <view class="clear _deta_loud" wx:if="{{status==2}}">
            <view class="_deta_wait left">订单进行中</view>
        </view> 

        <view class="clear _deta_loud" wx:if="{{status==3}}">
            <view class="_deta_wait left">交易已结束，快去评价吧</view>
        </view> 
        <view class="clear _deta_loud" wx:if="{{status==4}}">
            <view class="_deta_wait left">交易已结束</view>
        </view>

        <view class="_deta_order">
            订单编号：{{code}}
        </view>
    </view>
    <view class="_cont_master bmg">
        <view class="_contant_item_main clear">
            <view class="_contant_item_store left">服务</view>
        </view>    
        <view class="_contant_item_main clear">
            <view class="_contant_item_img left">
              <image class="_contant_item_img_image" src="{{'http://image.vdongchina.com/'+thumb}}"></image>
            </view>
            <view class="_contant_item_txt left">
                <view class="_contant_item_name">{{serverName}}</view>
            </view>
            <view class="_contant_item_bot right">
                <view class="_contant_item_price">￥{{totalGuidePrice}}</view>
                <view class="_contant_item_num">x1</view>
				 <view class="_contant_item_num" wx:if="{{scoreMoney>0}}">积分抵扣{{scoreMoney}}元</view> 
            </view>
        </view>
        <view class="_contant_item_main clear">
             <view class="_contant_item_priceT left">商品总价</view>
             <view class="_contant_item_priceT right">￥{{totalGuidePrice}}</view>
        </view>
        <view class="_contant_item_pay bmg clear">
              <view class="right">已付款：<text>￥{{totalPrice}}</text></view>
        </view>                        
    </view>
    <!--<view class="_serve clear">
        <view class="left _serve_le"></view>
        <view class=" left">
            <view class="_contant_item_serve bmg">            
                <view class="_item__serve clear">
                    <view class=" left">服务编号:94191491911606016060</view>
                    <view class="_item_status right">等待付款</view>
                </view>
                    
                <view class="_item_times clear">
                    <view class="_item_timesimg left"><image class="_item_timesimg_image" src="http://image.vdongchina.com/M00/03/2E/ZSUkmVnfBXaEA8TSAAAAAPrE9Hc502.png"></image></view>
                    <view class="left _item_status">未预约<text>（请在2017-12--04前选择）</text></view>
                </view>
                <view class="_item_ress clear">
                    <view class="_item_ressimg left"><image class="_item_ressimg_image" src="http://image.vdongchina.com/M00/03/2A/ZSUkmVnewuaEAgYvAAAAADa1yvs029.png"></image></view>
                    <view class="left">宁波市鄞州区罗蒙环球城</view>
                </view>
            </view>
            <view class="_contant_item_serve bmg">            
                <view class="_item__serve clear">
                    <view class=" left">服务编号:94191491911606016060</view>
                    <view class="_item_status right">等待付款</view>
                </view>
                    
                <view class="_item_times clear">
                    <view class="_item_timesimg left"><image class="_item_timesimg_image" src="http://image.vdongchina.com/M00/03/2E/ZSUkmVnfBXaEA8TSAAAAAPrE9Hc502.png"></image></view>
                    <view class="left _item_status">未预约<text>（请在2017-12--04前选择）</text></view>
                </view>
                <view class="_item_ress clear">
                    <view class="_item_ressimg left"><image class="_item_timesimg_image" src="http://image.vdongchina.com/M00/03/2A/ZSUkmVnewuaEAgYvAAAAADa1yvs029.png"></image></view>
                    <view class="left">宁波市鄞州区罗蒙环球城</view>
                </view>
            </view>              
        </view>        
    </view>-->
    <view class="_contant_item_btn bmg" wx:if="{{status==0}}">
          <view class="_contant_item_l"  @tap="cancel(id)">取消订单</view>
          <view class="_contant_item_r"  @tap="pay(id)">去支付</view>
    </view>
    <view class="_contant_item_btn bmg" wx:if="{{status==1}}">
          <view class="_contant_item_l" @tap="tolevelGoods">再次购买</view>
<!--          <view class="_contant_item_r">核销订单</view>-->
    </view>
    <view class="_contant_item_btn bmg" wx:if="{{status==2}}">
          <view class="_contant_item_le" @tap="tolevelGoods">再次购买</view>
<!--          <view class="_contant_item_ri">联系TA</view>-->
    </view>
   <view class="_contant_item_btn bmg" wx:if="{{status==3}}">
          <view class="_contant_item_le" @tap="tolevelGoods">再次购买</view>
<!--          <view class="_contant_item_ri colorm">评价</view>-->
    </view>
    <view class="_contant_item_btn bmg" wx:if="{{status==4}}">
          <view class="_contant_item_le" @tap="tolevelGoods">再次购买</view>
          <view class="_contant_item_ri" @tap="del(id)">删除订单</view>
    </view>     
</view>	
</template>

<script>
	const util = require('../../utils/util.js')
	export default {
		config: {
			"navigationBarTitleText": "订单详情"
		},	
		data() {
			return {
				clock:0,
				totalms:0,
				id:'',
				code:'',				
				status:'',
				userAddress:'',
				serverName:'',
				totalGuidePrice:'',
				totalPrice:'',
				thumb:'',
				scoreMoney:0,
			}
		},
		onLoad: function (e) {	 
			if(e){
				
				var that = this	
				//供应商
				wx.request({
					url: this.$root.apiServer+this.$root.appid + "/basic/api/bOrd/ordDetail",
					data: {
					    id:e.id
					},
					method:"POST",
					header: {
					    'content-type': 'application/x-www-form-urlencoded'
					},
					success: function(res) {
						if(res.data.success == true){
							that.id = res.data.data.id
							that.code=res.data.data.code
							that.status=res.data.data.status
							that.userAddress=res.data.data.userAddress
							that.serverName=res.data.data.serverName
							that.totalGuidePrice=res.data.data.totalGuidePrice
							that.totalPrice=res.data.data.totalPrice
							that.createDate = res.data.data.createDate
							that.thumb=res.data.data.thumb
							that.scoreMoney =res.data.data.scoreMoney
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
			}
		},
		methods: {
			countDown() {
//				// 渲染倒计时时钟
				var that = this
				var clock = this.date_format(this.totalms)
				this.clock = clock
				if(this.totalms <= 0) {
					this.clock = "已经截止"
					this.status=1
					this.onLoad()
					// timeout则跳出递归
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
		  //取消
		cancel(id){
			
			var that = this	
			wx.showModal({
			  title: '是否取消订单',
			  success: function(res) {
			    if (res.confirm) {
					wx.request({
						url: that.$root.apiServer+that.$root.appid + "/basic/api/bOrd/cancelOrd",
						data: {
				  			token:getApp().globalData.token,
				  			id:id
						},
						method:"POST",
						header: {
						    'content-type': 'application/x-www-form-urlencoded'
						},
						success: function(res) {
							if(res.data.success == true){
								that.status = res.data.data.status
							}
						  }
						})					      	
			    	}
			  	}
			})		  		
		},
		  //删除
		del(id){
			
			var that = this	
			wx.showModal({
			  title: '是否删除订单',
			  success: function(res) {
			    if (res.confirm) {
						wx.request({
						  url: that.$root.apiServer+that.$root.appid + "/basic/api/bOrd/deleteOrd",
						  data: {
				  			token:getApp().globalData.token,
				  			id:id
						  },
						  method:"POST",
						  header: {
						      'content-type': 'application/x-www-form-urlencoded'
						  },
						  success: function(res) {
							if(res.data.success == true){
								that.status = res.data.data.status
							}
						  }
						})					      	
			    	}
			  	}
			})			  	
		  },
		  //支付
		  pay(id){
		  	wx.navigateTo({
		  		url:'../orderPay/orderPay?id='+id
		  	})		  	
		  },
		 tolevelGoods(){
				wx.redirectTo({
					url: '../secondPagesStore/secondPagesStore'
				})			 				 	
		 }			  
		}
	}	
</script>

<style scoped>
/* pages/orderPages/orderDetails/orderDetails.wxss */
page{padding-bottom:120rpx}
page{background: #f9f9f9;}
.container{background: #F9F9F9;}	
._details{height: 80rpx;padding: 16rpx 30rpx 24rpx;color: #fff;background: -ms-linear-gradient(top, #FF8BB7,  #FF4C90);background:-moz-linear-gradient(top,#FF8BB7,  #FF4C90);background: -webkit-linear-gradient(top, #FF8BB7, #FF4C90);background: -o-linear-gradient(top, #FF8BB7, #FF4C90)}

._deta_loud{line-height: 42rpx;}
._deta_wait{margin-right: 30rpx;font-size: 30rpx;margin-bottom: 10rpx}
._deta_timeimg{width: 28rpx;height: 28rpx;margin-top: 8rpx;margin-right: 12rpx}
._deta_timeimg_image{width: 28rpx;height: 28rpx}

._cont_master{padding: 0 30rpx}
._contant_item_main{padding:24rpx 0;border-bottom: 2rpx solid #f0f0f0;line-height:42rpx;font-size: 30rpx;}
._contant_item_store{color:#111111 }


._contant_item_img{width: 140rpx;height: 140rpx;} 
._contant_item_img_image{width: 140rpx;height: 140rpx;}
._contant_item_txt{margin-left: 30rpx}
._contant_item_name{color: #333333;}

._contant_item_bot{text-align: right}
._contant_item_price{color: #999999;font-size: 26rpx}
._contant_item_num{color: #999999;font-size: 26rpx;margin-top: 10rpx}
._contant_item_priceT{color: #666666;font-size: 24rpx}

._contant_item_pay{line-height: 98rpx;font-size: 22rpx;color: #333333;}
._contant_item_pay text{color: #FF4C90;font-size:28rpx}

._serve{margin:10rpx }
._serve_le{width: 8rpx;height: 8rpx;background:#FF4C90;margin-right: 10rpx;border-radius: 10rpx;border:6rpx solid #ffffff;margin-top: 24rpx}
._contant_item_serve{padding: 10rpx 20rpx;width: 650rpx;border-radius: 8rpx;margin-bottom: 10rpx}
._item_status{font-size:26rpx;color: #FF4C90 }
._item_status text{color: #111111}
._item__serve{padding: 10rpx 0;color: #999999}
._item_times{font-size: 24rpx;color: #333333;line-height: 30rpx;padding: 10rpx 0}
._item_timesimg {width:30rpx;height: 30rpx;margin-right: 20rpx}
._item_timesimg_image{width:30rpx;height: 30rpx}

._item_ress{line-height: 34rpx;padding: 10rpx 0}
._item_ressimg {width: 30rpx;height: 34rpx;margin-right: 20rpx }
._item_ressimg_image{width:30rpx;height: 34rpx}

._contant_item_btn{display: flex;line-height: 88rpx;text-align: center;font-size: 30rpx;color: #333333;position: fixed;bottom: 0;width:100%}
._contant_item_l{flex: 1}
._contant_item_r{flex: 1;background: #FF4C90;color: #ffffff}

._contant_item_le{flex: 1;border-right: 2rpx solid #f7f7f7;line-height: 42rpx;margin: 22rpx 0} 
._contant_item_ri{flex: 1;line-height: 42rpx;margin: 22rpx 0}
.colorm{color: #FF4C90}	
</style>