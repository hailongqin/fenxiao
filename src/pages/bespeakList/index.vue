<template>
	<view clas="order">
		<scroll-view scroll-x="true" class="navs" style="{{'background:'+bgColor}}" wx:if="{{show == 1}}">
			<view class="item-box" style="{{'padding-top:'+pt*2+'rpx;'}}">
				<view class="nav" wx:for="{{arrTitle}}" wx:key="id" @tap="handler(item.id,index)">
					<view wx:if="{{active==index}}" class="_item">
						<image wx:if="{{tshow.showIcon==1}}" src="{{item.fullImage}}" class="nav-icon" style="{{'width:'+tshow.iconSize*2+'rpx;height:'+tshow.iconSize*2+'rpx;margin-bottom:'+tshow.spacing*2+'rpx;'}}"></image>
						<text class="text" style="{{'margin-left:'+ marginlr*2+'rpx;margin-right:'+ marginlr*2+'rpx;font-size:' + fontSize*2+'rpx;color:'+activeColor+';padding-bottom:'+pb*2+'rpx;border-bottom-color:'+activeColor}}">{{item.name}}</text>
					</view>
					<view wx:else class="_item">
						<image wx:if="{{tshow.showIcon==1}}" src="{{item.fullImage}}" class="nav-icon" style="{{'width:'+tshow.iconSize*2+'rpx;height:'+tshow.iconSize*2+'rpx;margin-bottom:'+tshow.spacing*2+'rpx;'}}"></image>
						<text class="text" style="{{'margin-left:'+ marginlr*2+'rpx;margin-right:'+ marginlr*2+'rpx;font-size:' + fontSize*2+'rpx;color:'+color+';padding-bottom:'+pb*2+'rpx'}}">{{item.name}}</text>
					</view>
				</view>
			</view>
		</scroll-view>

		<view wx:if="{{lists.length>0}}" class="lists-one lists">
			<view wx:for="{{lists}}" wx:key="index">
				<view class="sitem">
					<view class="shop" @tap="toM(item.id)">
						<view class="shop_image">
							<image class="img" src="{{item.fullCover}}" mode="aspectFill"></image>
						</view>
						<view class="shop_intro">
							<view class="shop_name">{{item.title}}</view>
							<view class="shop_time">{{item.beginTime}} 至 {{item.endTime }} </view>
							<view class="number">{{item.partQuantity}} 人已申请</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view wx:else class="lists">
			<view class="nolists">暂无数据</view>
		</view>
	</view>
</template>

<script>
	export default {
		config: {
			"navigationBarTitleText": "预约列表"
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
				url: this.$root.apiServer + this.$root.appid + '/basic/plugin/form/category/list',
				method: 'GET',
				header: {
					'content-type': 'application/json'
				},
				success(res) {
					if(res.data.success && res.data.list.length) {
						that.arrTitle = res.data.list
						if(that.show == '1') {
							if(res.data.list.length) {
								that.handler(res.data.list[0].id, 0)
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
			// 相当于使用过滤器的表达式
			filter(value) {
				return value.substring(0, 16)
			},
			//补0操作  
			getzf(num) {
				if(parseInt(num) < 10) {
					num = '0' + num;
				}
				return num;
			},
			toM(id) {
				wx.navigateTo({
					url: '../course_order/course_order' + '?id=' + id
				})
			},
			handler(id, index) {
				this.active = index
				this.catCid = id
				var that = this
				wx.request({
					url: this.$root.apiServer + this.$root.appid + '/basic/plugin/form/paging',
					method: 'GET',
					data: {
						categoryId: id,
						status: 1,
						pageNum: 1,
						pageSize: 10
					},
					header: {
						'content-type': 'application/json'
					},
					success(res) {
						if(res.data.success && res.data.pagination.list.length) {
							that.lists = res.data.pagination.list.filter(item => {
								return item.isOpen
							})
							that.lists = res.data.pagination.list.filter(item => {
								return item.dateStatus !== 2
							})

							//that.total = that.lists.length              
							//that.lists = that.lists.splice(0, 2)
							console.log(that.lists)
							for(var i = 0; i < that.lists.length; i++) {
								that.lists[i].beginTime = that.filter(that.lists[i].beginTime)
								that.lists[i].endTime = that.filter(that.lists[i].endTime)
							}
							that.lists = that.lists
						} else {
							// that.total = 0
							that.lists = []
						}
					}
				})
			}
		},
	}
</script>

<style scoped>
.lists-one .sitem{display: -ms-flexbox; display: flex; -webkit-box-pack: justify; -ms-flex-pack: justify; justify-content: space-between; -webkit-box-align: center; -ms-flex-align: center; align-items: center;}
.lists-one .sitem { background-color: #fff; position: relative; padding: 34rpx 0;}
.lists-one .sitem:after,
.lists-one .sitem:before { content: " "; position: absolute; left: 0; right: 0; height: 1px; color: #e5e5e5; z-index: 2;}
.lists-one .sitem:after {bottom: 0; border-bottom: 1px solid #e5e5e5; -webkit-transform-origin: 0 100%; transform-origin: 0 100%; -webkit-transform: scaleY(.5); transform: scaleY(.5);}
.lists-one .shop{display: inline-flex;width: 100%;overflow: hidden}
.lists-one .shop_image .img{width: 200rpx;height: 200rpx;overflow: hidden;}
.lists-one .shop_intro{margin-left: 20rpx;width: 70%;height:200rpx; flex-direction: column; -webkit-box-flex: 1; -ms-flex: 1; flex: 1; display: flex; justify-content: space-between; align-items: center;}
.lists-one .shop_name{width:100%;text-align:left; line-height: 52rpx; font-size: 32rpx; color: #333; text-overflow: ellipsis; -webkit-line-clamp: 2; overflow: hidden; letter-spacing: .62px; max-height: 84rpx;white-space: nowrap;}
.lists-one .shop_time{width:100%;font-size: 24rpx; color: #999999; letter-spacing: 0.19px; margin-top: -60rpx;}
.lists-one .number{width:100%;font-size: 24rpx; color: #999999;}
.lists-one .show_more{text-align: center;line-height: 92rpx;position: relative;font-size: 30rpx;}
.show_more .turn{ width: 16rpx; height:28rpx; margin: 0 10rpx;position: absolute;top:32rpx;}
.nolists{ padding: 60rpx; background: #fff; font-size: 30rpx; text-align: center; margin-bottom: 20rpx; }

.order{
  background: #efeff4;
  padding-bottom: 2rpx;
}
.navs{
  margin-bottom: 20rpx;
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
  width: 80rpx;
  height: 80rpx;
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
    border-bottom: 2rpx solid #e5e5e5;
}	
</style>