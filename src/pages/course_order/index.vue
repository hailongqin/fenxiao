<template>
	<view class="page">
		<view class="w-100" style="">
			<view class="header display-flex bg-wt plr30 box-s">
				<view class="hd-l-img pos-r">
					<image class='hd-l-img_image' src="{{order.fullCover}}" mode="aspectFill" />
				</view>
				<view class="hd-r-desc display-flex-1">
					<text class="c3 ft30 hd-r-desc_title ft36">{{order.title}}</text>
					<view class="c6 ft24 applynum block">
						已申请人数 : {{order.partQuantity}}
					</view>
					<view class="c6 ft24 surplusnum bolck ">
						剩余可申请人数 : {{order.maxQuantity == 0 ? "无限制": (order.maxQuantity - order.partQuantity)}}
					</view>
				</view>
			</view>
			<view class="time-desc box-s block bg-wt">
				<view class="order-time bolck">
					<text class="order-time-txt ft28 strong">预约时间</text>
					<text class="ft24 ml20 c9">{{order.beginTime}}至{{order.endTime}}</text>
				</view>
			</view>
			<view class="desc block box-s bg-wt">
				<view class="ft28 bold desc-address box-s block strong">预约介绍
	
				</view>
				<view class="block arrows">
					<view class="desc-bd block on">
						<view class="desc-bd-desc-bd-txt ft24">
							<rich-text nodes="{{order.description}}"></rich-text>
						</view>
	
					</view>
				</view>
			</view>
			<view class="pos-f order_bot txt-c w-100 white ft32 "  @tap="orderCb(order2.dateStatus,order2.id,order2.status,order2.whetherPart,order2.beginTime,order2.endTime)">
				{{order2.whetherPart ? '查看预约':'我要预约'}}
			</view>
		</view>
	</view>	
</template>
<script>
	var app = getApp()
	var formatTime = require('../../utils/util.js')
	var date = formatTime.formatTime
	export default {
		config: {
			"navigationBarTitleText": "预约详情"
		},
		data() {
			return {
				id: "",
				order: {},
				order2: {}
			}
		},
		onLoad(options) {
			this.id = options.id
			var that = this
		},
		onShow() {
					
				this.$root.get("/basic/plugin/form/infoandtemps", {
					formId: this.id
				}, (data) => {
					if(data.success) {
							data.form.beginTime = data.form.beginTime.substring(0, 16)
							data.form.endTime = data.form.endTime.substring(0, 16)
							this.order = data.form
					}					
				})

				this.$root.get("/basic/plugin/form/infoandtemps", {
					formId: this.id,
					token: wx.getStorageSync("token")
				}, (data) => {
					if(data.success) {
							data.form.beginTime = data.form.beginTime.substring(0, 16)
							data.form.endTime = data.form.endTime.substring(0, 16)
							this.order2 = data.form
					}					
				})
			},		
	
		methods: {
			orderCb(dateStatus,id,status,whetherPart,beginTime,endTime) {
				if(whetherPart) {
					wx.navigateTo({
						url: '../order_succ/order_succ?id=' + id,
					})
				} else {
					if(dateStatus == 0) {
						wx.navigateTo({
							url: '../order_look/order_look?beginTime='+beginTime,
						})
                       return;
					} else if(dateStatus == 2){
						wx.navigateTo({
							url: '../order_look/order_look?endTime=' + endTime,
						})
						return;
					}else{
						wx.navigateTo({
							url: '../order_detail/order_detail?id=' + id,
						})
						return;
					}

				}

			},
			onShareAppMessage () {
				return { 
					title: '预约详情',
					path: 'pages/course_order/course_order' + '?id=' + this.id
				}
			},
		}
	}
</script>
<style scoped>
	.page {
		background: #FAFAF9;
	}
	
	.container {
		width: 100%;
		padding: 20rpx 20rpx 30rpx 20rpx;
	}
	
	.header {
		padding-top: 43rpx;
		padding-bottom: 50rpx;
	}
	
	.hd-l-img {
		width: 180rpx;
		height: 180rpx;
		margin-right: 28rpx;
		overflow: hidden;
	}
	
	.hd-l-img_image {
		width: 180rpx;
		height: 180rpx;
	}
	.hd-r-desc{
		width: 467rpx;
	}
	.hd-r-desc_title {
		width: 467rpx;
		font-weight: bold;
		height: 100rpx;
		line-height: 50rpx;
		overflow: hidden;
		text-overflow: -o-ellipsis-lastline;
		text-overflow: ellipsis;
		word-wrap: break-word;
		word-break: break-all;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	
	.applynum {
		margin-top: 23rpx;
		height: 34rpx;
		line-height: 34rpx;
	}
	
	.surplusnum {
		height: 34rpx;
		line-height: 34rpx;
	}
	
	.time-desc {
		width: 100%;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		padding: 0 30rpx;
		height: 88rpx;
		line-height: 88rpx;
		box-sizing: border-box;
	}
	
	.order-time {
		margin-bottom: 20rpx;
	}
	
	.order-time-txt,
	.start-class-txt {
		/*padding: 2rpx 8rpx;*/
		/*background-color: #73a3f1;*/
		color: #1a2336;
		letter-spacing: 0.84px;
		/*border-radius: 4rpx;*/
	}
	
	.desc {
		padding: 0 30rpx;
		/*background-color: #f4f4f4;*/
		padding-bottom: 0rpx;
		margin-bottom: 10rpx;
	}
	
	.desc-address {
		position: relative;
		height: 88rpx;
		line-height: 88rpx;
	}
	
	.arrow {
		height: 28rpx;
		width: 28rpx;
		margin: 0 auto;
		padding: 20rpx 0;
		-webkit-transition: all 1s ease;
		-moz-transition: all 1s ease;
		-ms-transition: all 1s ease;
		-o-transition: all 1s ease;
		transition: all 1s ease;
		-webkit-transition: -webkit-transform 0.3s;
		transition: -webkit-transform 0.3s;
		transition: transform 0.3s;
		transition: transform 0.3s, -webkit-transform 0.3s;
	}
	
	.abstract {
		margin-bottom: 20rpx;
		padding-left: 40rpx;
		background: url(http://ob7jq9813.bkt.clouddn.com/study/abstract.png) no-repeat 0 center;
		background-size: 28rpx 26rpx;
	}
	
	.arrows {
		position: relative
	}
	
	.desc-bd-desc-bd-txt {
		margin-bottom: 20rpx;
		line-height: 40rpx;
		color: #2A2A2A;
		letter-spacing: 1px;
	}
	
	.desc-bd {
		height: 66rpx;
		overflow: hidden;
		position: relative;
	}
	
	.desc-bd.on {
		height: auto;
	}
	
	.form-d,
	.sucessorder {
		display: none;
	}
	/*颜色*/
	
	.bg-c-1 {
		background-color: #508cee;
	}
	
	.temp-color-border-l {
		border-left-color: #508cee;
	}
	
	.order_bot {
		background: #1DA5FF;
		height: 88rpx;
		line-height: 88rpx;
	}
	
	.desc {
		padding-bottom: 110rpx;
	}
</style>