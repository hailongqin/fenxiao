<template>
	<view>
	  <scroll-view class="bmg  _me_title_items" scroll-x="true">
	    <view  id="{{index}}"  wx:for="{{items}}" wx:key="index" class="{{currentTab == index ? 'active _me_title_Item ' : '_me_title_Item '}}"  @tap="navbarTap">
	        {{item.status}}
	    </view>
	  </scroll-view>	
	    <view wx:if="{{lists.length == 0}}" class="lists">
	      <view class="nolists">暂无数据</view>
	    </view>		  
		<view class="lists" wx:else>
			<view wx:for="{{lists}}" wx:key="index" class="items">
				<view wx:if="{{item.imageText.style&&item.imageText.status}}" class="item " @tap="itemTapHandler(item.imageText.id)">
					<image class="img" mode="aspectFill" src="{{'http://image.vdongchina.com/'+item.imageText.cover}}" />
					<text class="title">{{item.imageText.title}}</text>
					<view class="info">
						<text class="date">{{item.imageText.createTime}}</text>
						<view>
							<image class="icon" mode="aspectFit" src="http://image.vdongchina.com/M00/00/15/ZSUkmVlfHh2EYwcZAAAAAISvvMw527.png" /> {{item.imageText.readerNum}}
						</view>
					</view>
				</view>
				<view wx:elif="{{item.imageText.status}}" class="sitem" @tap="itemTapHandler(item.imageText.id)">
					<view class="item-media">
						<image class="img" mode="aspectFill" src="{{'http://image.vdongchina.com/'+item.imageText.cover}}" />
					</view>
					<view class="item-main">
						<view class="item-desc" style="width:100%">
							{{item.imageText.title}}
						</view>
						<view class="item-title-row">
							<view class="item-title date">{{item.imageText.createTime}}</view>
							<view class="item-after">
								<image class="icon" mode="aspectFit" src="http://image.vdongchina.com/M00/00/15/ZSUkmVlfHh2EYwcZAAAAAISvvMw527.png" />
								<text class="eyes">{{item.imageText.readerNum}}</text>
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
			"navigationBarTitleText": "图文"
		},	
		data() {
			return {
				 currentTab:0,
			    items:[
			      { status: '纯图文' },
			      { status: '视频图文' },
			      { status: '音频图文' }
			    ],	
			    lists:[]
			}
		},
		onLoad(){
			console.log("11")
			var that = this
			that.handler(this.currentTab)
			
		},
		methods: {	
			navbarTap (e) {	
				this.currentTab = e.currentTarget.id	
				this.handler(this.currentTab)
			},
			handler(cid) {
				var that = this
				wx.request({
					url: this.$root.apiServer + this.$root.appid + '/basic/api/imagetext/collectList',
					method: 'POST',
					data: {
						token:'',
						openid: getApp().globalData.openid,
						mediaType:cid
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success(res) {
						that.lists = res.data.imgtextCollectList
					}
				})
			},
			itemTapHandler(id){				
				var openid = getApp().globalData.openid
				var that = this
		      wx.request({
		          url: this.$root.apiServer+ this.$root.appid +'/basic/api/imagetext/select/id',
		          method: 'POST',
		          data: {
		            id: id,
		            openid:openid
		          },
		          header: {
		              'content-type': 'application/x-www-form-urlencoded'
		          },
		          success (res) {
									that.onLoad ()
		          }
		      })
		      wx.navigateTo({		      	
		          url: '../graphic/graphic' + '?id=' + id
		      })
		    }			
		}	
	}	
</script>

<style scoped>	
._me_title_items{display: flex;width:100%;white-space: nowrap;height: 98rpx;}
._me_title_Item{display: inline-block;line-height: 92rpx;text-align: center;color: #999999;padding:0 20rpx;font-size: 30rpx;}
.active{border-bottom: solid 4rpx #FF4C90;color: #FF4C90}

.lists{
	padding: 0 30rpx;
}
.lists .items{
  border-bottom:#efeff4 1px solid ;
}  
.lists .items:last-child{
	border-bottom: none;
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
.icon{
	font-size:24rpx;	
  color:#999;
  width: 30rpx;
  height: 24rpx;
  margin-right: 6rpx;
}
.info{
  display: flex;
  justify-content:space-between;
  font-size: 24rpx;
  color: #999;
   padding:0 6rpx;
}
.date{font-size: 24rpx;color: #999;}	
.icon{
	font-size:24rpx;	
  color:#999;
  width: 30rpx;
  height: 24rpx;
  margin-right: 6rpx;
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
.item-desc{
  position:relative;
  top:12rpx;
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
    max-height: 84rpx;
}
.nolists{
  padding: 60rpx;
  background: #fff;
  font-size: 24rpx;
  text-align: center;
  margin-bottom: 20rpx;
}
</style>