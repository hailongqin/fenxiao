<template>
	<view style="{{hiddens}}">
		<view wx:if="{{browseable}}">
			<view wx:if="{{!isBuy}}">
				<view class="pageback"></view>
				<view class="brow_cant">
					<view class="brow_top">
						<view class="brow_title">请购买该课程，就可以查看所有资源</view>
						<view class="brow_cont">
							<view class="brow_image_cant"><image class="brow_image" src="{{productImg}}" mode="aspectFill" ></image></view>
							<view class="brow_name">{{productName}}</view>
						</view>
						<view class="brow_text">{{buyReminder}}</view>
					</view>	
					<view class="brow_bottom">
						<view class="brow_btn" @tap="browCal">取消</view>
						<view class="brow_btn" @tap="browBuy(productUuid)">购买</view>
					</view>
				</view>
			</view>	
		</view>
		<view class="title">{{title}}</view>
		<view class="contant_been">
			<view class="createTime">{{createTime}}</view>	
			<view @tap="tapCollect">
				<view class="contant_cell contant_back" wx:if="{{collect}}">已收藏</view>
				<view class="contant_cell" wx:else>收藏</view>
			</view>	
		</view>
		
		<view class="media">
			<view wx:if="{{mediaType == 1}}"> 
				<view @tap="showVideo" class="mediaImg">
					<image style="width: 690rpx;height: 388rpx;" src="{{'http://image.vdongchina.com/'+mediaCover}}"></image>
					<view class="mediaback"></view>
					<view class="mediaplay"></view>
				</view>
			</view>
			<view  wx:if="{{mediaType == 2}}"> 
				<audio style="max-width:690rpx" src="{{audioUrl}}" controls name="{{mediaName}}" poster="{{'http://image.vdongchina.com/'+mediaCover}}" author=""></audio>
			</view>
		</view>

		<view class="v-dialog" hidden="{{!isplay}}">		 	
			<view class="dialog-f pos-r">
				<video id="{{myVideo}}" wx:if="{{isLook}}" style="width:100%;height: 360rpx;" src="{{videoUrl}}" controls="true"></video>
			</view>
			<view class="dialog-del pos-a" @tap="delVideo">x</view>
		</view> 


		<view class="graphic">
			<rich-text nodes="{{nodes}}"></rich-text>
		</view>
		<view wx:if="{{makeCall}}">
			<view class="makePhoneCall clear" @tap="makeCalle">
				<view class="left clear">
						<image class="phone" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABWRJREFUWAm1l2lMXFUUx5lhZjpSbKYpRaISBa2kpKkLWwshJUBAMSk0FBP9RKJJ20jSkLikaT8Q/VCJxq1NTTR+qX4wwYRWRGtDI5GwgwabYqrVYFvrVibIUphxYPydy9yX+2aepli4yX3n3HP+Z7nnLu89V9K/tOLi4vRIJLItGo3eR78L2CboRpfLtRF+Pd1H99KT6RF0IXQz8FPwU263e3JpaekX6CX6+cHBwd/RJTRXvKSgoKARwxeQb43X3eJ4nARfGRkZ+cD0YyWQl5fnBXCM7PfZAC7XNLKr6K5DJ6FB9Av0MOMQNEr3IV/HeB1UKpQmnfHd0ADdauiPp6amNnd3d0dE6LE0SUnvYtAYG38KPZaSkvJNT0/PnwZmxSwTS0tOTs5bXFxsxriaGE2zs7OyfGqiqgKADiA4Id5Zr9ahoaFDZCozs1pRUVEuTnYGAoGPu7q6/rIUBlNWVhbAeb3H4+kbGBj4zlAltbS0uDs6Ol5HdlDk+H+G5XjfxZpnsuYCXo/wI4RPCiC+5efnd5P9LjDNYN6M18sYX8/h61Uw58BUxmOwl3jt0FowM9AcN49WgLKrr8HvjzcyxrLjpWm6PLI/tU5Tm5agUda/EeEfxLodetTNo5wuJTk0OjrqWFrRr1Zj803h67D4I2a5i/Wvg7l3eHj4LcnQDCQngz1xkGyfom9DJzO7AW7exGkezG3wKfQwmG8Zn8zOzj7R1ta2qDFCZT90dnYeQT9mHUMTILwEh8hpqJLx/20kcjorK6s+PgntzzyGWqYohofJUAWH/xC+j2rYZmIzMAZgJfky6F567cTEhFxsRw2IxTpWQI7TzMzMVVCyOV9jbzxvWayA4eTIxdbEBKa5CzK5jqfjzWUTJrS5ubknEMqxnPb7/S8lAG5SQPAjQGehG7hD9jqZOSbAWa4XMIbtvb298oJRraSkRI7OfzYTEztVn4gBvvY4GSYkwI23AWCZgKlAu1BphYWF5aFQKMhF8vKyJPFJyVsXFhYmwZYa2lPC46uyqqpKltTWEhKgVDUg5K6+4fV6z2o0VdnBLDx007lWayo6L5giLWAJz8CHkPmDweCjWq5pQgIo6mLKs/39/dZ5x8EPIod+H9MnEK3TWAHIEjL7czFwbbyRLYGGhgaZ+WMC4sidNsGsZxuOHuFiaTLlJp+enr4Pu4d5D9hssdPjxzlhtqNvO4asXTVLcAaDRWaRQdDrZgDNo1N24NTNKWPNa4xJ2TcZLOE1ZGJXjt8vtd6WAJvoHZztx9lXzGKXBpm0tLR08/z8vFyz46xvHfskmVfwKcb3+3y+7SybfLAkNHz3gdmJ4m0SUK9kAVlLgNJF3x2zVDs3xtsIu9yPYDO9HP4ywX/GTl7Td/ANKUvo2MDoZbDtAysBylSA5Z1ijTMNTnDGS+sKevmA+ZsewLEcW/k0exrdb1DHho2e1D2EekiDrARwpHf/eRz9pAFOFP17lP4BNtyz6A9At7BkJ52wWob+IklclLERy/ZNqEujM9W2jpRPrgkU6jPOEeAglCoQ/MVYAi0CURWoqKjYBJ8rAtpNJbAMXdmTSmnfD8p/h1irBNhIW2VAhlfYoV8LvxaNqg0SQ+2TcDi8Q2KoBDj7mbGAn69FYO2T4FQ/KleztBx5qAQojbpyUaqyiGKtGkmoGMRSb1mVAB8LP8YC7uaIOF5Aq5EQvisJrK56Yo6JT3UvV1dXX+CnYZxxLlfmF3wPHqcqF+CXViMwvuTzfzvu5NjK7TtWU1MzyA+QGqgYXJU5gOStJX/Ca9kuc2VXcGVfkiC2dwEzT2ONmpFLmTLoaomgt9qWmNyvFOIzftveMN8X/wD2zV2pTnpg7gAAAABJRU5ErkJggg==" alt=""/>
						<view class="zw">一键拨号</view>
				</view> 
				<view class="right clear">		    
						<image class="turn" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAeCAYAAAAl+Z4RAAAAAXNSR0IArs4c6QAAApxJREFUOBGVlc1rU0EUxfOSl1aChUTddFHowixEVBBEFwVJlRApBFpqEAlqvhfixn+iCxfiRsiHycZgjS6s0ERsa2i7sCBuutWFoAtB0KgQS9Ik/m7ISBJfmpeB4c6bOefMeXfe3Kclk8mSxWKZHBsb84VCoa+MR2pW0MfoZ+r1+jpiMh6piYBf07SPrVbrJHEtn8+7RlHQBJzNZqdwsMVwGpF3DofjcjAY/GVGSBxYwuHwZ6vVOgv5C07OVavVUqFQOGxGoO1AAXO5nLtWq23yPInYptPpvBIIBP6odaPYdqAWOIUPOLkE+RtOLlYqlZVisTiu1o1ijwMFSKfTpxEo048wt0qfTyQSdbXeHXscqIVYLLaLCy/PP+lzjJ+Wy2VdrXdHQwcKgJMLuHhNn0BkmZwEyUlDrUs0dKAAONmBOMdzFZFr5CRL7Nn0QAERQmTbZrPJx7YH+Qaukt0iQwVEJBqNbhAWEKlBjiHyQOalmRIQYDweLyEQYLiPyJ1UKnVP5nveRyaGNS7cVYSeIGJrNpszph0oYcgTjNs8SkDT8GwVuD+y+3V2TjOPjrYUiUTemn4FErcIeVmsQ75PTu7KBqYESJgf4nPwdsgPId8WsrShAplMxtdoNF6AHYf8iO8iRmy12cMEsD3Lzqv0Q2Afs/NNyE1FljjwFEjYDMSXHfIzl8t1q58sAoavAPk84DXIcolW3G73osfj2RdCf/vPAeSzkF51yCVuYGAQWcR6BCCfYk6ur5O4YbfbF7i+NQEOav8ESNgJQOv0ozjYJvopcXuDiGq+nQOO6jhHtcWkFNMdrq+Xr+y3Ah0UrVTiachvOuT32PeZJYuwThmXojnFzrtUZC93X+qg6aZD/AT6h67r8/xgvptmdoB/ATo3C+Y5jaOIAAAAAElFTkSuQmCC" alt=""/>
						<view class="hm">{{makeCall}}</view>
				</view>
			</view>			
		</view>
		<view class="product" wx:if="{{status == 1}}" style="width: 100%;margin: 30rpx 0;" @tap="productItem(uuid)">
			<view wx:if="{{img}}" ><image src="{{img}}"  mode="widthFix" style="width: 100%;height:388rpx"></image></view>
		</view>
		<view class="message_contant">
			<view class="message clear">
				<view class="left messageInp"><input class="inputTxt" type="text" value="{{message}}" @input="inputMessage" placeholder="说一下..."></view>
				<view class="right messageBot" @tap="toMessage">完成</view>
			</view>
		</view>
		<view class="comments" wx:if="{{list}}">
			<view class="total">评论：{{total}}</view>
			<view wx:for="{{list}}" wx:key="gg" class="clear list">
				<view class="left head">
					<image class="headImg" src="{{item.headImg}}"></image>
				</view>
				<view class="left infoContant">
					<view class="username">{{item.username}}</view>
					<view class="mess">{{item.message}}</view>
					<view class="createTime">{{item.createTime}}</view>
				</view>
			</view>
			<view class="contantB" wx:if="{{isShow}}">
				<view class="contantN">没有更多评论喽</view>
			</view>
		</view>
	</view>
</template>

<script>
	const util = require('../../utils/util.js')
	export default {
		config: {
			navigationBarTitleText: '图文详情'
		},
		data() {
			return {
				nodes: '',
				message: '',
				id: '',
				title:'',
				createTime:'',
				avatarUrl: '',
				nickName: '',
				total: '',
				list: [],
				isShow: false,
				navigateLastPage: 0, //总页数
				page: 1, //第几页
				pageSize: 3, //每页条数
				uuid:'',
				img:'',
				status:0,
				makeCall:null,
				collect:false,
				icId:'',
				browseable:0, //为0免费看
				isBuy:true,
				productId:'',
				productUuid:'',
				buyReminder:'',
				productImg:'',
				productName:'',
				mediaType:0,//状态
				videoUrl:'',
				audioUrl:'',
				mediaCover:'',
				mediaName:'',
		    	isplay:false,
		    	isLook:true,
		    	myVideo:'rm',
		    	hiddens:''
			}
		},

		onLoad(e) {
			this.id = e.id
			var that = this
			wx.getUserInfo({
				success: function(res) {
					that.avatarUrl = res.userInfo.avatarUrl
					that.nickName = res.userInfo.nickName
					
				}
			})
			
			wx.request({
				url: that.$root.apiServer + that.$root.appid + '/basic/api/imagetext/select/id',
				method: 'POST',
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: {
					id:e.id,
					openid:getApp().globalData.openid
				},
				success(res) {
					that.nodes = res.data.imageText.content
					that.title = res.data.imageText.title
					that.createTime = res.data.imageText.createTime
					that.makeCall = res.data.imageText.makeCall || ''
					var img = res.data.imageText.imgtextPro && res.data.imageText.imgtextPro.imgPro || ''
					if (img && !img.startsWith('http://')) {
						img = `http://image.vdongchina.com/${img}`
					}						
					that.img = img
					if(res.data.imageText.imgtextPro !== null|| res.data.imageText.imgtextPro.uuid !== null){
						that.uuid = res.data.imageText.imgtextPro.uuid	
					}	
					if(res.data.imageText.imgtextCollect !== null && res.data.imageText.imgtextCollect.status !== null){
						var status = res.data.imageText.imgtextCollect.status
						that.icId = res.data.imageText.imgtextCollect.icId
					}
				
					if(status == null || status == 0){
						that.collect = false
					}else{
						that.collect = true
					}

					var mediaType= res.data.imageText.imgtextMedia && res.data.imageText.imgtextMedia.mediaType || ''	
					that.mediaType = mediaType
					var mediaUrl = res.data.imageText.imgtextMedia && res.data.imageText.imgtextMedia.mediaUrl || ''	
					that.mediaName = res.data.imageText.imgtextMedia && res.data.imageText.imgtextMedia.mediaName || ''
					that.mediaCover = res.data.imageText.imgtextMedia && res.data.imageText.imgtextMedia.mediaCover || ''
					if(mediaType == 1){						
						that.videoUrl = mediaUrl							
					}
					if(mediaType == 2){
						that.audioUrl = mediaUrl
					}
					var browseable = res.data.imageText && res.data.imageText.browseable || ''
					that.browseable = browseable
					if(that.browseable){
							var productId = res.data.imageText&& res.data.imageText.productId || ''
							var productUuid = res.data.imageText && res.data.imageText.productUuid || ''
							var buyReminder = res.data.imageText && res.data.imageText.buyReminder || ''
							that.productId = productId
							that.productUuid = productUuid
							that.buyReminder = buyReminder
							wx.request({//是否购买
								url: that.$root.apiServer + that.$root.appid + '/basic/api/ord/checkUserBuy',
								method: 'POST',
								header: {
									'content-type': 'application/x-www-form-urlencoded'
								},
								data: {
									productId:that.productId,
									token:getApp().globalData.token
								},
								success(res) {
									that.isBuy = res.data.isBuy
									
									if(!that.isBuy){
										that.hiddens = "position: absolute; width: 100%;height: 100%;display: block;background:rgba(0,0,0,0.1);overflow-y: hidden;z-index:999"
										wx.request({
											url: that.$root.apiServer+that.$root.appid+ '/basic/api/product/uuid',
											data: {
												uuid:that.productUuid
											},
											method: 'GET',
											header: {
												'content-type': 'application/json'
											},
											success (ret) {
												if (ret.data.code == '100') {
													that.productImg = ret.data.data.thumbUrl
													that.productName = ret.data.data.name
												}
											}
										})
									}
								}
							})
					}
					
					if(that.uuid){
						    wx.request({
						      url: that.$root.apiServer+that.$root.appid+ '/basic/api/product/uuid',
						      data: {
						        uuid:that.uuid
						      },
						      method: 'GET',
						      header: {
						        'content-type': 'application/json'
						      },
						      success (res) {
						        if (res.data.code == '100') {

						        	that.status = 1
						        }else{
						        	that.status = 2
						        }
						      }
						    })					
					}
				}
			})

			that.gg()
		},
		onReady(e) {
		  	this.videoCtx = wx.createVideoContext(this.myVideo)
		},
		methods: {
			tapCollect(){

				var that = this
				var e = {
					id:that.id
				}				
				if(that.collect){
					wx.request({
						url: that.$root.apiServer+that.$root.appid+ '/basic/api/imagetext/cancelCollect',
						data: {
							id:that.icId
						},
						method: 'POST',
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						success (res) {
							if(res.data.success){
								wx.showToast({
									title: '取消收藏',
									duration: 1500
								})								
								that.onLoad(e)
							}
						}
					})										
				}else{
					wx.request({
						url: that.$root.apiServer+that.$root.appid+ '/basic/api/imagetext/collect',
						data: {						
							imgtextId:that.id,
							openid:getApp().globalData.openid,
							token:''
						},
						method: 'POST',
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						success (res) {
							if(res.data.success){
								wx.showToast({
									title: '收藏成功',
									duration: 1500
								})								
								that.onLoad(e)
							}
						}
					})											
				}
			},
		      productItem (){
		      	var that = this
		        wx.navigateTo({
		              url: '../goods/goods' + '?id=' +that.uuid 
		        })          
		      },			
			changeTime(timestamp) {
				//时间转换
				var minute = 1000 * 60
				var hour = minute * 60
				var day = hour * 24
				var month = day * 30
				var diffValue = new Date().getTime() - timestamp;
				if(diffValue < minute) //一分钟内							
					return "刚刚"
				else if(diffValue < hour)
					return parseInt(diffValue / minute) + "分钟前"
				else if(diffValue < day)
					return parseInt(diffValue / hour) + "小时前"
				else if(diffValue < month)
					return parseInt(diffValue / day) + "天前"
			},
			setMessage(data, istop) { //data:list数据，istop：是否插入在顶部（默认插入在底部）
				if(data && data.length) {
					for(var i = 0, len = data.length; i < len; i++) {
						//列表传过来的是2017-01-01
						if(/\d{4}[\-|\/]\d+[\-|\/]\d+/.test(data[i].createTime))
							data[i].createTime = this.changeTime(new Date(data[i].createTime.replace(/\-/g, '/')));
						else//新增传过来的是new Date()
							data[i].createTime = this.changeTime(data[i].createTime.getTime());
							}
							if(data.length == 1 && istop) {
								var list = this.list;
								list.unshift(data[0]);
								this.list = list;
							} else
								this.list = this.list.concat(data);
							}
							},
							gg() { //上拉加载
									var that = this
									wx.request({
										url: this.$root.apiServer + this.$root.appid + '/basic/api/imagetext/words/get',
										method: 'POST',
										header: {
											'content-type': 'application/x-www-form-urlencoded'
										},
										data: {
											imageId: this.id,
											page: this.page,
											pageSize: this.pageSize
										},
										success(res) {
											if(typeof(res.data.pagenation.list) == "object" && res.data.pagenation.list.length) {
												that.setMessage(res.data.pagenation.list);
												that.page += 1
											}
											that.navigateLastPage = res.data.pagenation.navigateLastPage
											that.total = res.data.pagenation.total
										}
									})
								},
								inputMessage(e) {
									this.message = e.detail.value
								},
								toMessage() {//新增信息					
				var that = this
				var e = {}
				e = {
					id: this.id
				}
				if(this.message) {
					wx.request({
						url: this.$root.apiServer + this.$root.appid + '/basic/api/imagetext/words/add',
						method: 'POST',
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						data: {
							id: this.id,
							username: this.nickName,
							message: this.message,
							headImg: this.avatarUrl
						},
						success(res) {
							that.setMessage([{
								createTime:new Date(),
								headImg:that.avatarUrl,//登录人的头像
								message:that.message,
								username:that.nickName

							}],true);
							that.message = ""
							that.total+=1
						}
					})
				} else {
					wx.showToast({
						title: '请填写评论',
						duration: 1500
					})
				}
			},
			onReachBottom: function() {
				if(this.page <= this.navigateLastPage) //当前将获取的页码不超过总页数		        
				{
					this.gg()
				} else {
					this.isShow = true
				}
			},
			onShareAppMessage () {
				var e = {}
				e = {
					id: this.id
				}
				return { 
					title: '图文详情',
					path: 'pages/graphic/graphic' + '?id=' + id
					}
			},
			makeCalle() {
				wx.makePhoneCall({
					phoneNumber: this.makeCall
				})
			},
			browCal(){
				wx.navigateBack()
			},
			browBuy(id){
				wx.redirectTo({
					url: '../goods/goods' + '?id=' + id
				})				
			},
			showVideo() {
				this.isplay = true
				this.videoCtx.play()
			},
		 	delVideo() {
			  this.isplay = false
			  this.videoCtx.seek(0)
			  this.videoCtx.pause()
			} 
		}
	}
</script>
<style scoped>
.pageback{position: fixed;top: 0;bottom: 0;width: 100%;height: 100%;z-index: 998;background: rgba(0,0,0,0.5);}
.brow_cant{background:#ffffff;position:fixed;z-index: 1000;width:560rpx;height:690rpx;top: 50%;margin-top: -345rpx;left: 50%;margin-left: -280rpx;border-radius: 8rpx;}
.brow_top{padding: 50rpx 36rpx 0 36rpx;}
.brow_title{color: #000000;font-size: 36rpx;line-height: 50rpx}
.brow_cont{display: flex;padding: 30rpx 0}
.brow_image_cant{width: 120rpx;height: 120rpx;flex: 1}
.brow_image{width: 120rpx;height: 120rpx}
.brow_name{flex:0 0 72%;overflow:hidden; text-overflow:ellipsis;display:-webkit-box; -webkit-box-orient:vertical;-webkit-line-clamp:3;font-size: 26rpx;line-height: 40rpx;color:#333333 }
.brow_text{color: #999999;font-size: 30rpx;line-height: 42rpx}
.brow_bottom{position: absolute;bottom: 0;height: 98rpx;border-top:2rpx #e5e5e5 solid;display: flex;line-height: 98rpx;text-align: center;width: 100%}
.brow_btn{flex: 1;border-left: 2rpx solid #e5e5e5}

.media{padding: 55rpx 30rpx}

	.title{padding: 40rpx 30rpx 16rpx 30rpx;font-size: 48rpx;color: #000;line-height: 67rpx;}
	.contant_been{display: flex;justify-content:space-between;padding:0 30rpx;font-size: 30rpx;line-height: 48rpx;color: #999999;margin-top: 12rpx;}
	.contant_cell{border-radius: 40rpx;border:solid 2rpx #888888;padding: 0 20rpx;}
	.contant_back{background:#09bb07;border:solid 2rpx #09bb07;color: #ffffff;}
	.graphic {
		width: 96%;
		margin-left: auto;
		margin-right: auto;
		font-size: 28rpx;
		overflow-x: hidden;
	}
	
	.message_contant {
		line-height: 98rpx;
		width: 100%;
		background: #f0f0f0;
		margin-top: 30rpx;
		line-height: 68rpx;
	}
	
	.message {
		padding: 16rpx 30rpx;
	}
	
	.messageInp {
		width: 528rpx;
		height: 68rpx;
		background: #fff;
		margin-top: 5rpx;
		border-radius: 8rpx;
	}
	
	.messageInp .inputTxt {
		width: 518rpx;
		height: 68rpx;
		font-size: 28rpx;
		padding-left: 10rpx;
	}
	
	.messageBot {
		width: 132rpx;
		height: 78rpx;
		background: #1db8f1;
		color: #ffffff;
		text-align: center;
		border-radius: 8rpx;
		line-height: 78rpx;
		font-size: 30rpx;
	}
	
	.comments {
		padding: 0 30rpx;
	}
	
	.total {
		line-height: 100rpx;
		color: #999;
		border-bottom: 2rpx solid #e9e9e9;
	}
	
	.list {
		padding: 30rpx 0;
		border-bottom: 2rpx solid #e8e8e8;
	}
	
	.infoContant {
		width: 580rpx;
	}
	
	.head {
		width: 80rpx;
		height: 80rpx;
		margin-right: 20rpx;
	}
	
	.headImg {
		width: 80rpx;
		height: 80rpx;
	}
	
	.username {
		font-size: 30rpx;
		color: #333333;
		margin-bottom: 14rpx;
	}
	
	.mess {
		font-size: 26rpx;
		color: #666666;
		margin-bottom: 10rpx;
	}
	
	.createTime {
		font-size: 30rpx;
		color: #999999;
		line-height: 36rpx;
	}
	
	.contantB {
		width: 300rpx;
		height: 2rpx;
		background: #d8d8d8;
		margin: 60rpx auto;
		font-size: 26rpx;
		color: #999999;
		position: relative;
	}
	
	.contantN {
		position: absolute;
		left: 50%;
		margin-left: -110rpx;
		top: 50%;
		margin-top: -14rpx;
		background: #ffffff;
		width: 220rpx;
		text-align: center;
	}

.makePhoneCall{
  height: 60rpx;
  padding: 10rpx;
  line-height: 60rpx;
  font-size: 32rpx;
  color: #666666
}
.clear::after{
  display: block;
  clear: both;
  content: "";
  height: 0;
  overflow: hidden;
  visibility: hidden
}
.phone{
  width: 40rpx;
  height: 40rpx;
  margin: 8rpx;
  float: left;
}
.turn{
  width: 20rpx;
  height: 37rpx;
  margin: 13rpx 6rpx 10rpx 6rpx;
  float: right;
}
.zw{
  display: inline-block;
  margin-left: 20rpx;
  float: left;
}
.hm{
  display: inline-block;
  margin-right: 20rpx;
  float: right;
}


.v-dialog {
position:fixed;
z-index:1000;
width:100%;
height:100%;
top:0;
left:0;
background:#000000;
}
.pos-r {
  position: relative;
}
.pos-a{
	position: absolute;
}
.dialog-f {
width:100%;
height:360rpx;
-webkit-transition:all 1s ease;
-moz-transition:all 1s ease;
-ms-transition:all 1s ease;
-o-transition:all 1s ease;
transition:all 1s ease;
-webkit-transition:-webkit-transform .3s;
transition:-webkit-transform .3s;
transition:transform .3s;
transition:transform .3s,-webkit-transform .3s;
position:relative;
top:50%;
left:0;
webkit-transform:translate(0, -50%);
transform:translate(0, -50%);
}
.play-tip{
	position:absolute;
	bottom:-90rpx;
	left: 50%;
	padding:10rpx 20rpx;
	color: #ffffff;
	border-radius: 28rpx;
	background-color: rgba(0,0,0,0.7);
	webkit-transform: translate(-50%,0);
    transform: translate(-50%,0);
    z-index: 1001;
	transition: opacity 2s;
    -webkit-transition: opacity 2s;
}
.kcvideo{
	width:100%;
	height: 360rpx;

}
.dialog-del{
	width:48rpx;
	height:48rpx;
	border-radius: 50%;
	border: 2rpx #ffffff solid;
	bottom:66rpx;
	left:50%;
	margin-left: -24rpx;
	font-size:38rpx;
	line-height:40rpx;
	color: #ffffff;
	z-index: 1001;
	text-align: center;
}	
.mediaImg{
	position: relative;
	width: 690rpx;
	height: 388rpx;
}
.mediaback{position: absolute;left: 0;top: 0;right: 0;bottom: 0;background: #000;opacity: 0.5;z-index: 9;}

.mediaplay{
	position: absolute;
	width: 0;
    height: 0;
    border-top: 40rpx solid transparent;
    border-left: 80rpx solid #ffffff;
    border-bottom: 40rpx solid transparent;
    left:50%;
    margin-left: -20rpx;
    top:50%;
    margin-top: -20rpx;
    z-index: 10;
}
</style>