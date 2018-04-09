<template>
	<view>
		<scroll-view scroll-x="true" class="navs" style="{{'background:'+bgColor}}" wx:if="{{show == '1'}}">
			<view class="item-box" style="{{'padding-top:'+pt*2+'rpx;'}}">
				<view class="nav" wx:for="{{arrTitle}}" wx:key="id" @tap="handler(item.id,index)">
					<view wx:if="{{active==index}}" class="_item">
						<image wx:if="{{tshow.showIcon==1}}" src="{{'http://image.vdongchina.com/'+item.thumbnail}}" class="nav-icon" style="{{'width:'+tshow.iconSize*2+'rpx;height:'+tshow.iconSize*2+'rpx;margin-bottom:'+tshow.spacing*2+'rpx;'}}"></image>
						<text class="text" style="{{'margin-left:'+ marginlr*2+'rpx;margin-right:'+ marginlr*2+'rpx;font-size:' + fontSize*2+'rpx;color:'+activeColor+';padding-bottom:'+pb*2+'rpx;border-bottom-color:'+activeColor}}">{{item.name}}</text>
					</view>
					<view wx:else class="_item">
						<image wx:if="{{tshow.showIcon==1}}" src="{{'http://image.vdongchina.com/'+item.thumbnail}}" class="nav-icon" style="{{'width:'+tshow.iconSize*2+'rpx;height:'+tshow.iconSize*2+'rpx;margin-bottom:'+tshow.spacing*2+'rpx;'}}"></image>
						<text class="text" style="{{'margin-left:'+ marginlr*2+'rpx;margin-right:'+ marginlr*2+'rpx;font-size:' + fontSize*2+'rpx;color:'+color+';padding-bottom:'+pb*2+'rpx'}}">{{item.name}}</text>
					</view>
				</view>
			</view>
		</scroll-view>

		<view class="nonePro" wx:if="{{products.length == 0}}">
			暂无商品
		</view>
		<view class="product-list clear" wx:if="{{products.length>0}}">
			<view class="product-item " wx:for="{{products}}" wx:key="gg">
				<view class="classname rowclass" @tap="productItem(item.uuid)">
					<view class="product-img">
						<image mode="aspectFill" class="product-img-image" src="{{item.cover==''?item.thumbUrl :'http://image.vdongchina.com/'+item.cover}}" style="width:370rpx;height:370rpx;"></image>
					</view>
				</view>
				<view style="width:100%">
					<view class="product-name" style="{{'font-size:'+fontSizeName*2+'rpx;font-weight:'+fontWeightName+';color:'+colorName+';'}}">{{item.name}}</view>
					<view class="clear product-price">
						<view class="left main-color" style="{{'font-size:'+fontSizeMark*2+'rpx;font-weight:'+fontWeightMark+';color:'+colorMark+';'}}">￥<text class="product-price-text" style="{{'font-size:'+fontSizePrice*2+'rpx;font-weight:'+fontWeightPrice+';color:'+colorPrice+';'}}">{{item.salePrice}}</text></view>
						<view class="left oldPrice" wx:if="{{item.isShowMarkerPrice}}">￥{{item.marketPrice}}</view>
						<view class="right shopcart" @tap.stop="addCar(item.uuid)" wx:if="{{shopcartShow.open}}">
							<image class="shopImg" src="http://image.vdongchina.com/M00/01/17/ZSUkmVmnc72EcSKxAAAAAFkCQJQ691.png"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>

</template>
<script>
	export default {
		config: {
			"navigationBarTitleText": "商品列表"
		},
		data() {
			return {
				products: [],
				arrTitle: [],
				active: 0,
				bgColor: '#fff',
				marginlr: 10,
				activeColor: '#38adff',
				pt: 10,
				pb: 10,
				tshow: {
					iconSize: 40,
					spacing: 0,
					showIcon: 1,
				},
				fontSize:'14',
				color:'#333333',
				fontSizeName: '13',
				fontSizeMark: '11',
				fontSizePrice: '11',
				fontWeightName: '100',
				fontWeightMark: '100',
				fontWeightPrice: '100',
				colorName: '#333',
				colorMark: '#b4282d',
				colorPrice: '#b4282d',
				shopcartShow: {
					open: 1,
				},
				show: 1,
				cId: 1
			}
		},
		methods: {
			handler(cid, index) {
				this.active = index
				var that = this
				wx.request({
					url: this.$root.apiServer + this.$root.appid + '/basic/api/product/productByCatalogId',
					data: {
						catalogId: cid
					},
					method: 'GET',
					header: {
						'content-type': 'application/json'
					},
					success(res) {
						var productList = res.data.data.filter(item => {
							return item.status == 1
						})
						that.products = productList
					}
				})
			},
			productItem(id) {
				wx.navigateTo({
					url: '../goods/goods' + '?id=' + id
				})
			},
			addCar(id) {
				var that = this
				wx.request({
					url: that.$root.apiServer + that.$root.appid + '//basic/api/product/uuid',
					data: {
						uuid: id
					},
					method: 'GET',
					header: {
						'Content-Type': 'application/json'
					},
					success(res) {
						console.log(res,"car")
						that.productSkus = res.data.data.productSkus
						var cid = res.data.data.productSkus[0].id
						if(that.productSkus.length > 1) {
							that.productItem(id)
						} else {
							wx.request({
								url: that.$root.apiServer + that.$root.appid + '/basic/api/cart/addProduct',
								data: {
									token: getApp().globalData.token,
									skuId: cid,
									buyNum: 1
								},
								method: 'POST',
								header: {
									'Content-Type': 'application/x-www-form-urlencoded'
								},
								success(res) {
									if(res.data.code == "100") {
										wx.showToast({
											title: '加入成功',
										})
									} else {
										wx.showToast({
											title: '超出购买限制',
											duration: 1000
										})
									}

								}
							})
						}
					}
				})
			}

		},
		onLoad(e) {
			var that = this
			that.show = e.show
			that.cId = e.xId
			// 获取商品分类
			wx.request({
				url: this.$root.apiServer + this.$root.appid + '/basic/api/product/catalogs',
				method: 'GET',
				header: {
					'content-type': 'application/json'
				},
				success(res) {
					if(res.statusCode == 200 && res.data.data.length) {
						that.arrTitle = res.data.data
						if(that.show == '1') {
							if(res.data.data.length) {
								that.handler(res.data.data[0].id, 0)
							}
						}
						if(that.show == '0') {
							that.handler(that.cId, 0)
						}
					}
				}
			})
		}
	}
</script>
<style scoped>	
.navs{
  margin-bottom: 20rpx;
  border-bottom: 2rpx solid #e5e5e5;
}
.item-box{
    white-space: nowrap;
}
.nav{
  display: inline-block;
}
.text{
  display: block;
  padding: 0 20rpx;
  border-bottom: 8rpx solid transparent;
  margin: 0 18rpx;
  box-sizing: border-box;
}
.item-box{
    white-space: nowrap;
}	
._item{
  text-align: center;
}
.nav-icon{
  vertical-align: top;
  height: 80rpx;
  width: 80rpx;
  margin-bottom: 0;
}
.nonePro{height:300rpx;line-height: 300rpx;text-align: center;}

.product-list{ background: #f9f9f9;padding-top: 8rpx;}
.product-item{width: 49%;height: auto;background:#ffffff;margin-bottom:8rpx;float: left;overflow: hidden;display: flex;display:-webkit-flex;align-items: center;justify-content: center;-webkit-align-items: center;-webkit-justify-content: center;flex-direction: column;-webkit-flex-direction:column}
.product-item:nth-child(even){margin-left:10rpx;}

.product-name{font-size: 28rpx;line-height: 50rpx;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding-left:10rpx;padding-right:10rpx;}
.product-price{font-size: 22rpx;line-height: 40rpx;margin-left: 10rpx;color: #999999}
.product-price .product-price-text{font-size: 30rpx;}
.oldPrice{text-decoration:line-through;margin-left: 10rpx;line-height: 44rpx;}
.upload_title{height: 80rpx;line-height: 80rpx;padding-left: 20rpx;font-size: 26rpx;border-top:solid 1rpx #e3e3e3;}
.uploadWrap{width:100%; white-space:nowrap;}  
.upload_Item{  width:298rpx; height: 406rpx;margin-right: 10rpx;margin-bottom:10rpx;border:solid 2rpx #e3e3e3;display: inline-flex;display: -webkit-inline-flex;-webkit-align-items: center;-webkit-justify-content:center;overflow: hidden;align-items: center;justify-content:center;overflow: hidden;}
.upload_Item_img{ width: 100%; height:100%;display: flex;display: -webkit-flex}


.product-img .product-img-image{width:100%;height:100%}
.product-img{text-align: center;}
.shopcart{margin-right: 10rpx}
.right .shopImg{
  width:50rpx;
  height: 50rpx;
  vertical-align: top;
}
</style>