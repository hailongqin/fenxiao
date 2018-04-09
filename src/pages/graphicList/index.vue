<template>
	<view class="classify">
		<scroll-view scroll-x="true" class="navs" style="{{'background:'+bgColor}}" wx:if="{{show == 1}}">
			<view class="item-box" style="{{'padding-top:'+pt*2+'rpx;'}}">
				<view class="nav" wx:for="{{arrTitle}}" wx:key="cId" @tap="handler(item.cId,index)">
					<view wx:if="{{active==index}}" class="_item">
						<image wx:if="{{tshow.showIcon==1}}" src="{{item.coverImg}}" class="nav-icon" style="{{'width:'+tshow.iconSize*2+'rpx;height:'+tshow.iconSize*2+'rpx;margin-bottom:'+tshow.spacing*2+'rpx;'}}"></image>
						<text class="text" style="{{'margin-left:'+ marginlr*2+'rpx;margin-right:'+ marginlr*2+'rpx;font-size:' + fontSize*2+'rpx;color:'+activeColor+';padding-bottom:'+pb*2+'rpx;border-bottom-color:'+activeColor}}">{{item.name}}</text>
					</view>
					<view wx:else class="_item">
						<image wx:if="{{tshow.showIcon==1}}" src="{{item.coverImg}}" class="nav-icon" style="{{'width:'+tshow.iconSize*2+'rpx;height:'+tshow.iconSize*2+'rpx;margin-bottom:'+tshow.spacing*2+'rpx;'}}"></image>
						<text class="text" style="{{'margin-left:'+ marginlr*2+'rpx;margin-right:'+ marginlr*2+'rpx;font-size:' + fontSize*2+'rpx;color:'+color+';padding-bottom:'+pb*2+'rpx'}}">{{item.name}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="lists" wx:if="{{lists!=null}}">
			<view wx:for="{{lists}}" wx:key="index" class="items">
				<view wx:if="{{item.style&&item.status}}" class="item " @tap="itemTapHandler(item.id)">
					<image class="img" mode="aspectFill" src="{{item.cover}}" />
					<text class="title">{{item.title}}</text>
					<view class="info">
						<text class="date">{{item.createTime}}</text>
						<view>
							<image class="icon" mode="aspectFit" src="http://image.vdongchina.com/M00/00/15/ZSUkmVlfHh2EYwcZAAAAAISvvMw527.png" /> {{item.readerNum}}
						</view>
					</view>
				</view>
				<view wx:elif="{{item.status}}" class="sitem" @tap="itemTapHandler(item.id)">
					<view class="item-media">
						<image class="img" mode="aspectFill" src="{{item.cover}}" />
					</view>
					<view class="item-main">
						<view class="item-desc" style="width:100%">
							{{item.title}}
						</view>
						<view class="item-title-row">
							<view class="item-title date">{{item.createTime}}</view>
							<view class="item-after">
								<image class="icon" mode="aspectFit" src="http://image.vdongchina.com/M00/00/15/ZSUkmVlfHh2EYwcZAAAAAISvvMw527.png" />
								<text class="eyes">{{item.readerNum}}</text>
							</view>
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
			"navigationBarTitleText": "图文列表"
		},
		data() {
			return {
				lists: [],
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
					show: 1,
					showIcon: 1,
					cId: 1
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
				ewidth: '141',
				eheight: '174',
				show: 1,
				cId: 1
			}
		},
		onLoad(e) {
			var that = this
			that.show = e.show
			that.cId = e.xId
			wx.request({
				url: this.$root.apiServer + this.$root.appid + '/basic/api/imagetext/category/get',
				method: 'GET',
				header: {
					'content-type': 'application/json'
				},
				success(res) {
					if(res.statusCode == 200 && res.data.categorys.length) {
						that.arrTitle = res.data.categorys
						if(that.show == '1') {
							if(res.data.categorys.length) {
								that.handler(res.data.categorys[0].cId, 0)
							}
						}
						if(that.show == '0') {
							that.handler(that.cId, 0)
						}

					}
				}
			})
		},
		methods: {
			handler(cid, index) {
				this.active = index
				var that = this
				wx.request({
					url: this.$root.apiServer + this.$root.appid + '/basic/api/imagetext/select/categoryid',
					method: 'POST',
					data: {
						cId: cid
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success(res) {
						that.lists = res.data.imageTextList
					}
				})
			},
			itemTapHandler(id) {
				var openid = getApp().globalData.openid
				var that = this
				wx.request({
					url: this.$root.apiServer + this.$root.appid + '/basic/api/imagetext/select/id',
					method: 'POST',
					data: {
						id: id,
						openid: openid
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success(res) {
						that.onLoad()
					}
				})
				wx.navigateTo({
					url: '../graphic/graphic' + '?id=' + id
				})
			}
		},
	}
</script>
<style scoped>

.classify{
  background: #fff;
  padding-bottom: 2rpx;
}
.navs{
  border-bottom: 2rpx solid #e5e5e5;
}
.nav{
	display: inline-block;
}
._item{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.nav-icon{
  vertical-align: top;
  width: 20rpx;
  height: 20rpx;
  margin-bottom: 0;
}
.text{
	display: inline-block;
	padding: 0 20rpx;
	border-bottom: 8rpx solid transparent;
	margin: 0 18rpx;
	box-sizing: border-box;
}

.item-box{
    white-space: nowrap;
    display: inline-block;
}
.info{
  display: flex;
  justify-content:space-between;
  font-size: 24rpx;
  color: #999;
   padding:0 6rpx;
}
.data{
	font-size:28rpx;
	color:#999;

}
.icon{
	font-size:24rpx;	
  color:#999;
  width: 30rpx;
  height: 24rpx;
  margin-right: 6rpx;
}
.nolists{
  padding: 60rpx;
  background: #fff;
  font-size: 24rpx;
  text-align: center;
  margin-bottom: 20rpx;
}
.sitem,.item-main,.item-title-row .item-title{
	
  font-size:24rpx;
  color:#999;
}
.sitem,.item-main,.item-title-row{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.sitem{
  background-color:#fff;
  position:relative;
  padding:30rpx 0;
}


.item-media+.item-main {
    margin-left:20rpx;
}
.item-media{width: 180rpx;height: 180rpx;}
.item-media .img{
  width:100%;
  height:100%;
}
.item-main{
  height:180rpx;
  flex-direction:column;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}

.item-title-row{
  position:relative;
  bottom:12rpx;
  width:100%;

}

.item-desc {
	  position:relative;
  top:12rpx;
    font-size:32rpx;
    color: #333;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    letter-spacing: 1.24rpx;
    line-height: 42rpx;
    max-height: 84rpx;
}



.eyes{font-size: 24rpx;color: #999999;}
.date{font-size: 24rpx;color: #999;}
.lists .items{
  border-bottom:#efeff4 1px solid ;
}  
.lists .items:last-child{
	border-bottom: none;
}

.uploadWrap{
  width:100%;
  white-space:nowrap;
  padding-left:20rpx;
	box-sizing:border-box;

}
.upload_Item{
   width:400rpx;
   margin-right: 20rpx;
   display: inline-block;
   overflow: hidden;
   vertical-align: top;
   background: #fff;
 }
.uploadWrap .img{
  width: 100%;
  height: 210rpx;
}
.uploadWrap .title{
  font-size: 32rpx;
   padding-left:6rpx;
  color: #333;
  height: 56rpx;
  line-height: 56rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
}
.classify .uploadWrap{
  padding-top: 20rpx;
}
.uploadWrap .upload_Item{
  padding-bottom: 10rpx;
}
.classify .lists{
  padding:0 30rpx;
}

.lists .items .item{
  padding:30rpx 0;
  background: #fff;
}
.lists .items .item .title{
  font-size: 32rpx;
  color: #333;
  height: 40rpx;
  line-height: 40rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  margin: 24rpx 0;
  padding:0 6rpx;
}
.lists .items .item .img{
  width: 100%;
  height: 340rpx;
  border-radius: 10rpx;
  overflow: hidden;
}
</style>