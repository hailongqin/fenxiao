<template>
	<view class="act-cont clear" style="{{'background:'+color}}">
		<view class="act-left left clear">
			<view class="act-price left">￥<text class="act-price-text">{{salePrice}}</text></view>
			<view class="act-other left">
				<view class="oldPrice">￥{{marketPrice}}</view>
				<view class="nub">已抢{{saleNumSummary}}件</view>
			</view>
		</view>
		<!--都为true两个都显示-->
		<!--isBuyNumLimit  true库存进度条显示-->
		<!--isBuyTimeLimit  true倒计时显示-->
		<view class="act-right right" wx:if="{{isBuyNumLimit && isBuyTimeLimit}}">
			<view class="times">
				<text class="times-text">距离结束还有:{{clock}}</text>
			</view>
			<view class="plans">
				<view class="plan" style="{{'width:' + percent}}"></view>
				<text class="plan-text">已抢{{percent}}</text>
			</view>
			<view class="act-back">
				<image src="http://image.vdongchina.com/M00/03/31/ZSUkmVnfIdiEfYNNAAAAAHFaMO8365.png" class="act-back-image"></image>
			</view>
		</view>
		<view class="act-right right" wx:if="{{isBuyNumLimit && !isBuyTimeLimit}}">
			<view class="plans isBuy">
				<view class="plan" style="{{'width:' + percent}}"></view>
				<text class="plan-text">已抢{{percent}}</text>
			</view>
			<view class="act-back">
				<image src="http://image.vdongchina.com/M00/03/31/ZSUkmVnfIdiEfYNNAAAAAHFaMO8365.png" class="act-back-image"></image>
			</view>
		</view>
		<!--这里改为true-->
		<view class="act-right right" wx:if="{{!isBuyNumLimit && isBuyTimeLimit}}">
			<view class="times isBuy">
				<text class="buy-text">距离结束还有:{{clock}}</text>
			</view>
			<view class="act-back">
				<image src="http://image.vdongchina.com/M00/03/31/ZSUkmVnfIdiEfYNNAAAAAHFaMO8365.png" class="act-back-image"></image>
			</view>
		</view>
	</view>
</template>

<script>
	const util = require('../../utils/util.js')
	export default {
		editorConfig: {
			color: {
				el: ['text', 'color'],
				label: '选择颜色',
				type: 'String',
				value: '#303030',
				director: 'ColorPicker'
			}
		},
		props: {
			color: {
				default: '#ff3e78',
				type: String
			}
		},
		data() {
			return {
				clock: 0,
				percent: 0,
				salePrice: 100,
				marketPrice: 200,
				saleNumSummary: 0,
				isBuyTimeLimit: false,
				isBuyNumLimit: false,
				buyLimitTime: 0,
				totalms: 0
			}
		},
		methods: {
			countDown() {
//				// 渲染倒计时时钟
				var clock = this.date_format(this.totalms)
				this.clock = clock
				if(this.totalms <= 0) {
					this.clock = "已经截止"
					// timeout则跳出递归
					return;
				}
				setTimeout(() => {
					// 放在最后--
					this.totalms = util.dateFormat(this.buyLimitTime) - new Date().getTime()
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
			}
		},
		onLoad(options) {
			var app = this.$root
			if(app.globalData) {
				var servsers = app.globalData.servsers
				var that = this
				this.version = app.globalData.appName
				wx.request({
					url: this.$root.apiServer + this.$root.appid + '/basic/api/product/uuid',
					data: {
						uuid: options.id
					},
					method: 'GET',
					header: {
						'content-type': 'application/json'
					},
					success: function (res) {
						console.log(res,"1111111111111111111111")
						if(res.data.code == '100') {
							that.salePrice = res.data.data.salePrice
							that.marketPrice = res.data.data.marketPrice
							that.isBuyNumLimit = res.data.data.isBuyNumLimit
							that.isBuyTimeLimit = res.data.data.isBuyTimeLimit
							that.buyLimitTime = res.data.data.buyLimitTime
							that.totalms = util.dateFormat(that.buyLimitTime) - new Date().getTime()
							that.countDown() //开启倒计时             
							//            if(res.data.data.isShowStockNum && !res.data.data.isShowSaleNum){//虚拟库存开启   
							//            	that.percent =  Math.floor(res.data.data.saleNumSummary / res.data.data.stockNumSummary * 100) + '%';              	
							//            }else{
							//            	that.percent = 0
							//            }

							if(res.data.data.isRealSaleNum && res.data.data.isRealStockNum) {
								var num = ''
								num = Math.floor(res.data.data.saleNumSummary / res.data.data.stockNumSummary * 100) + '%';
								if(num) {
									that.percent = num
								} else {
									that.percent = 0
								}

							} else {
								var num = ''
								num = Math.floor(res.data.data.virtualSaleNum / res.data.data.virtualStockNum * 100) + '%';
								if(num) {
									that.percent = num
								} else {
									that.percent = 0
								}
							}
							if(res.data.data.isRealSaleNum) { //实际销量tuue开启              	
								that.saleNumSummary = res.data.data.saleNumSummary //实际销量              	
							} else {
								that.saleNumSummary = res.data.data.virtualSaleNum //虚拟销量

							}
						} else {
							that.$root.redirectError('很遗憾，商品不存在')
						}
					},
					fail(e) {
						that.$root.redirectError('很遗憾，商品不存在')
					}
				})
			}
		}
	}
</script>

<style scoped>
	.clear::after {
		display: block;
		height: 0;
		clear: both;
		content: "";
		overflow: hidden;
		visibility: hidden
	}
	
	.left {
		float: left
	}
	
	.right {
		float: right
	}
	
	.auto {
		width: 98%;
		margin-left: auto;
		margin-right: auto
	}
	
	.act-cont {
		height: 102rpx;
		width: 100%;
		background: #ff3e78;
		overflow: hidden
	}
	
	.act-left {
		margin-left: 10rpx;
		color: #ffffff
	}
	
	.act-price {
		font-size: 50rpx;
		line-height: 120rpx
	}
	
	.act-price .act-price-text {
		font-size: 80rpx;
		line-height: 100rpx
	}
	
	.act-other {
		font-size: 24rpx;
		height: 70rpx;
		margin-top: 15rpx;
		position: relative;
		width: 160rpx;
		margin-left: 10rpx;
	}
	
	.act-other .oldPrice {		
		color: #FFFFFF;
		text-decoration: line-through;
		opacity: 0.6;
	}
	
	.act-other .nub {
		color: #ffffff;
		position: absolute;
		bottom: 0
	}
	
	.act-right {
		padding-right: 40rpx;
		position: relative
	}
	
	.act-right .act-back {
		position: absolute;
		right: 0;
		top: 24rpx;
	}
	
	.act-back .act-back-image {
		width: 30rpx;
		height: 50rpx;
	}
	
	.times {
		font-size: 24rpx;
		color: #ffef5e;
		margin-top: 20rpx
	}
	
	.times .times-text {
		font-size: 28rpx
	}
	
	.plans {
		width: 270rpx;
		height: 22rpx;
		background: #ffae00;
		margin-top: 10rpx;
		position: relative;
		border-radius: 14rpx;
		overflow: hidden;
		z-index: 10
	}
	
	.plan {
		position: absolute;
		top: 0;
		left: 0;
		height: 22rpx;
		background: #ffef5e;
		z-index: 11
	}
	
	.plans .plan-text {
		position: absolute;
		top: 0;
		left: 0;
		width: 270rpx;
		font-size: 20rpx;
		line-height: 24rpx;
		color: #fa215f;
		text-align: center;
		z-index: 12
	}
	
	.isBuy .plan-text {
		line-height: 40rpx;
		font-size: 28rpx;
	}
	
	.isBuy {
		height: 40rpx;
		margin-top: 30rpx;
		border-radius: 24rpx;
	}
	
	.isBuy .plan {
		height: 40rpx;
		border-bottom-left-radius: 24rpx;
		border-top-left-radius: 24rpx;
	}
	
	.isBuy .buy-text {
		font-size: 30rpx;
		line-height: 40rpx;
	}
	
	.buyBtn {
		width: 180rpx;
		color: #ffffff
	}
</style>