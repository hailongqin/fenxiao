<template>
	<view class="container">
		<scroll-view class="bmg  _me_title_items" scroll-x="true">
			<view id="{{index}}" wx:for="{{items}}" wx:key="index" class="{{currentTab == index ? 'active _me_title_Item ' : '_me_title_Item '}}" @tap="navbarTap">
				{{item.status}}
			</view>
		</scroll-view>

		<view wx:for="{{list}}" wx:key="gg" wx:if="{{list.length}}">
			<view class="_contant_item bmg margint" @tap="toDetails(item.id)">
				<view class="_contant_item_main clear">
					<!--		            <view class="_contant_item_store left">{{item.userAddress}}</view>-->
					<view wx:if="{{item.status == 0}}" class="_contant_item_status right">待付款</view>
					<view wx:if="{{item.status == 1}}" class="_contant_item_status right">待服务</view>
					<!--		            <view  wx:if="{{item.status == 2}}" class="_contant_item_status right">待评价</view>-->
					<view wx:if="{{item.status == 3}}" class="_contant_item_status right">已完成</view>
					<view wx:if="{{item.status == 4}}" class="_contant_item_status right">已关闭</view>
					<view wx:if="{{item.status == 5}}" class="_contant_item_status right">待退款</view>
				</view>
				<view class="_contant_item_main clear">
					<view class="_contant_item_img left">
						<image class="_contant_item_img_image" src="{{'http://image.vdongchina.com/'+item.thumb}}"></image>
					</view>
					<view class="_contant_item_txt left">
						<view class="_contant_item_name">{{item.serverName}}</view>
						<!--		                <view class="_contant_item_ress">{{item.userAddress}}</view>-->
					</view>
					<view class="_contant_item_bot right">
						<view class="_contant_item_price">￥{{item.totalGuidePrice}}</view>
						<view class="_contant_item_num">x1</view>
						<view class="_contant_item_Tprice">需付款：
							<text>￥{{item.totalPrice}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="_contant_item_btn bmg">
				<view wx:if="{{item.status == 0}}" class="_contant_item_l" @tap="cancel(item.id)">取消订单</view>
				<view wx:if="{{item.status == 0}}" class="_contant_item_r" @tap="pay(item.id,item.totalPrice)">去支付</view>
				<view wx:if="{{item.status == 1}}" class="_contant_item_l" @tap="tolevelGoods">再次购买</view>
				<!--		          <view wx:if="{{item.status == 1}}"  class="_contant_item_r" >核销订单</view>-->
				<view wx:if="{{item.status == 2}}" class="_contant_item_le" @tap="tolevelGoods">再次购买</view>
				<!--		          <view wx:if="{{item.status == 2}}" class="_contant_item_ri colorm">评价</view>  -->
				<view wx:if="{{item.status == 3}}" class="_contant_item_le" @tap="tolevelGoods">再次购买</view>
				<view wx:if="{{item.status == 3}}" class="_contant_item_ri" @tap="del(item.id)">删除订单</view>
				<view wx:if="{{item.status == 4}}" class="_contant_item_le" @tap="tolevelGoods">再次购买</view>
				<view wx:if="{{item.status == 4}}" class="_contant_item_ri" @tap="del(item.id)">删除订单</view>
				<view wx:if="{{item.status == 5}}" class="_contant_item_le" @tap="tolevelGoods">再次购买</view>
				<view wx:if="{{item.status == 5}}" class="_contant_item_ri">退款</view>
			</view>
			<!--<view class="_contant_item bmg margint">
			        <view class="_contant_item_main clear">
			            <view class="_contant_item_store left">鄞州区罗蒙环球城店</view>
			            <view class="_contant_item_status right">等待服务</view>
			        </view>
			        <view class="_contant_item_main">
			          <view class="clear">
			              <view class="_contant_item_img left">
			                <image class="_contant_item_img_image" src="../../img/Bitmap1.png"></image>
			              </view>
			              <view class="_contant_item_txt left">
			                  <view class="_contant_item_name">买衡力瘦脸送光子嫩肤</view>
			                  <view class="_contant_item_ress">宁波鄞州区罗蒙环球城</view>
			              </view>
			              <view class="_contant_item_bot right">
			                  <view class="_contant_item_price">￥88</view>
			                  <view class="_contant_item_num">x1</view>
			                  <view class="_contant_item_Tprice">需付款：<text>￥88</text></view>
			              </view>
			           </view>
			           <view class="_contant_item_serve clear">
			              <view class="_item_status">等待服务</view>
			              <view class="_item_times clear">
			                  <view class="_item_timesimg left"><image class="_item_timesimg_image" src="http://image.vdongchina.com/M00/03/2E/ZSUkmVnfBXaEA8TSAAAAAPrE9Hc502.png"></image></view>
			                  <view class="left">2017-12-04 15:30</view>
			              </view>
			              <view class="_item_ress clear">
			                  <view class="_item_ressimg left"><image class="_item_ressimg_image" src="http://image.vdongchina.com/M00/03/2A/ZSUkmVnewuaEAgYvAAAAADa1yvs029.png"></image></view>
			                  <view class="left">宁波市鄞州区罗蒙环球城</view>
			              </view>
			              <view class="changeTime right">修改时间</view>
			           </view>  
			        </view>
			    </view>  
			    <view class="_contant_item_btn bmg">
			          <view class="_contant_item_l">再次购买</view>
			          <view class="_contant_item_r">核销订单</view>
			    </view> 
			-->

		</view>

		<view wx:if="{{list.length == 0}}" class="_contant_item_no">
			<view class="no_contant">
				<image class="no_contant_image" src="http://image.vdongchina.com/M00/03/33/ZSUkmVnfLimEWGP3AAAAALSINag604.png"></image>
			</view>
			<view class="no_txt">
				<view class="no_text">您还没有相关订单</view>
				<view class="classname">可以去看看有哪些想要买的</view>
			</view>
			<view class="no_contant_btn" @tap="toindex">去逛逛</view>
		</view>

	</view>
</template>

<script>
export default {
	config: {
		"navigationBarTitleText": "订单列表"
	},
	data() {
		return {
			currentTab: 0,
			items: [
				{ status: '全部' },
				{ status: '待付款' },
				{ status: '待服务' },
				//			      { status: '待评价' },
				{ status: '已完成' },
			],
			list: [],
			pages: 0, //总页数
			page: 1, //第几页
			pageSize: 4 //每页条数
		}
	},
	onLoad() {
		this.load()
	},
	onReachBottom: function() {
		if (this.page <= this.pages) //当前将获取的页码不超过总页数		        
		{
			this.page += 1
			this.load()
		}
	},
	methods: {
		load() {

			var currentTab
			var that = this
			if (that.currentTab == 0) {
				currentTab = ''
			} else if (that.currentTab == 3) {
				currentTab = '3'
			}
			else {
				currentTab = that.currentTab - 1
			}
			wx.request({
				url: that.$root.apiServer + that.$root.appid + "/basic/api/bOrd/queryOrd",
				data: {
					token: getApp().globalData.token,
					status: currentTab,
					pageNum: this.page,
					pageSize: this.pageSize
				},
				method: "POST",
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: function(res) {
					if (res.data.success == true) {
						var temItems = res.data.data.list
						that.list = that.list.concat(temItems)
						that.pages = res.data.data.pages
						//	that.list = res.data.data.list	
					}
				}
			})
		},

		navbarTap: function(e) {
			this.page = 1
			this.list = []
			this.currentTab = e.currentTarget.id
			this.load()
		},
		toDetails(id) {
			wx.navigateTo({
				url: '../orderDetails/orderDetails?id=' + id
			})
		},
		//取消
		cancel(id) {

			var that = this
			wx.showModal({
				title: '是否取消订单',
				success: function(res) {
					if (res.confirm) {
						wx.request({
							url: that.$root.apiServer + that.$root.appid + "/basic/api/bOrd/cancelOrd",
							data: {
								token: getApp().globalData.token,
								id: id
							},
							method: "POST",
							header: {
								'content-type': 'application/x-www-form-urlencoded'
							},
							success: function(res) {
								if (res.data.success == true) {
									that.page = 1
									that.list = []
									that.load()
								}
							}
						})
					}
				}
			})
		},
		//删除
		del(id) {

			var that = this
			wx.showModal({
				title: '是否删除订单',
				success: function(res) {
					if (res.confirm) {
						wx.request({
							url: that.$root.apiServer + that.$root.appid + "/basic/api/bOrd/deleteOrd",
							data: {
								token: getApp().globalData.token,
								id: id
							},
							method: "POST",
							header: {
								'content-type': 'application/x-www-form-urlencoded'
							},
							success: function(res) {
								if (res.data.success == true) {
									that.page = 1
									that.list = []
									that.load()
								}
							}
						})
					}
				}
			})
		},
		pay(id, totalPrice) {
			wx.redirectTo({
				url: '../membershipCardPay/membershipCardPay?id=' + id + "&price=" + totalPrice + "&isType=1"
			})
		},
		tolevelGoods() {
			wx.redirectTo({
				url: '../secondPagesStore/secondPagesStore'
			})
		},
		toindex() {
			wx.redirectTo({
				url: '../index/index'
			})
		},

	}
}	
</script>

<style scoped>
page {
	background: #f9f9f9;
}

.container {
	background: #F9F9F9;
}

._me_title_items {
	display: flex;
	width: 100%;
	white-space: nowrap;
	height: 98rpx;
}

._me_title_Item {
	display: inline-block;
	line-height: 92rpx;
	text-align: center;
	color: #999999;
	width: 140rpx;
	font-size: 30rpx;
}

.active {
	border-bottom: solid 4rpx #FF4C90;
	color: #FF4C90
}

._contant_item {
	padding: 0 30rpx
}

._contant_item_main {
	padding: 24rpx 0;
	border-bottom: 2rpx solid #f0f0f0;
	line-height: 42rpx;
	font-size: 30rpx;
}

._contant_item_store {
	color: #111111
}

._contant_item_status {
	color: #FF4C90
}


._contant_item_img {
	width: 140rpx;
	height: 140rpx;
}

._contant_item_img_image {
	width: 140rpx;
	height: 140rpx;
}

._contant_item_txt {
	margin-left: 30rpx
}

._contant_item_name {
	color: #333333;
}

._contant_item_ress {
	color: #666666;
	font-size: 24rpx;
	line-height: 34rpx;
	margin-top: 77rpx
}

._contant_item_bot {
	text-align: right
}

._contant_item_price {
	color: #999999;
	font-size: 26rpx
}

._contant_item_num {
	color: #999999;
	font-size: 26rpx;
	margin-top: 10rpx
}

._contant_item_Tprice {
	font-size: 22rpx;
	margin-top: 20rpx
}

._contant_item_Tprice text {
	font-size: 30rpx;
	color: #FF4C90
}

._contant_item_serve {
	padding: 10rpx 20rpx;
	background: #f7f7f7;
	border-radius: 8rpx;
	margin: 20rpx 0
}

._item_status {
	text-align: right;
	font-size: 26rpx;
	color: #FF4C90
}

._item_times {
	font-size: 24rpx;
	color: #333333;
	line-height: 30rpx;
	padding: 10rpx 0
}

._item_timesimg {
	width: 30rpx;
	height: 30rpx;
	margin-right: 20rpx
}

._item_timesimg_image {
	width: 30rpx;
	height: 30rpx
}

._item_ress {
	line-height: 34rpx;
	padding: 10rpx 0
}

._item_ressimg {
	width: 30rpx;
	height: 34rpx;
	margin-right: 20rpx
}

._item_ressimg_image {
	width: 30rpx;
	height: 34rpx
}

.changeTime {
	font-size: 24rpx;
	color: #333333;
	background: #fff;
	width: 140rpx;
	height: 44rpx;
	line-height: 44rpx;
	text-align: center;
	border-radius: 8rpx;
	margin: 20rpx 0
}

._contant_item_btn {
	display: flex;
	line-height: 88rpx;
	text-align: center;
	font-size: 30rpx;
	color: #333333
}

._contant_item_l {
	flex: 1
}

._contant_item_r {
	flex: 1;
	background: #FF4C90;
	color: #ffffff
}

._contant_item_le {
	flex: 1;
	border-right: 2rpx solid #f7f7f7;
	line-height: 42rpx;
	margin: 22rpx 0
}

._contant_item_ri {
	flex: 1;
	line-height: 42rpx;
	margin: 22rpx 0
}

.colorm {
	color: #FF4C90
}


._contant_item_no {
	padding: 86rpx 30rpx 38rpx;
	text-align: center
}

.no_contant {
	width: 277rpx;
	height: 322rpx;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 70rpx
}

.no_contant_image {
	width: 277rpx;
	height: 322rpx;
}

.no_txt {
	font-size: 28rpx;
	color: #999999;
	line-height: 42rpx;
	margin-bottom: 40rpx
}

.no_text {
	color: #3f3f3f;
	font-size: 30rpx
}

.no_contant_btn {
	background: #FF4C90;
	line-height: 98rpx;
	height: 98rpx;
	border-radius: 100rpx;
	font-size: 32rpx;
	color: #ffffff
}
</style>