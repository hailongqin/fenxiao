<script>
	export default {
		config: {
			"pages": [
				"pages/orderList/orderList",
				"pages/index/index",
				"pages/f_productlist/f_productlist",
				"pages/f_index/f_index",
				"pages/f_message/f_message",
				"pages/f_personal/f_personal",
				"pages/goods/goods",
				"pages/car/car",
				"pages/order/order",
				"pages/orderOk/orderOk",
				"pages/orderShip/orderShip",
				"pages/error/error",
				"pages/orderFlow/orderFlow",
				"pages/graphic/graphic",
				"pages/course_order/course_order",
				"pages/order_detail/order_detail",
				"pages/order_look/order_look",
				"pages/order_list/order_list",
				"pages/order_succ/order_succ",
				"pages/order_y/order_y",
				'pages/order_single_list/order_single_list',
				"pages/search/search",
				"pages/searchPage/searchPage",
				"pages/communityIndex/communityIndex",
				"pages/posted/posted",
				"pages/communitySearch/communitySearch",
				"pages/comment/comment",
				"pages/commentAudit/commentAudit",
				"pages/commentDetail/commentDetail",
				"pages/followDetail/followDetail",
				"pages/lookFollow/lookFollow",
				"pages/communityMy/communityMy",
				"pages/removeAudit/removeAudit",
				"pages/reply/reply",
				"pages/replyAudit/replyAudit",
				"pages/threadAudit/threadAudit",
				"pages/topics/topics",
				"pages/invitationList/invitationList",
				"pages/revisePost/revisePost",
				"pages/reviseFollow/reviseFollow",
				"pages/lookDeleteFollow/lookDeleteFollow",
				"pages/reviseReply/reviseReply",
				"pages/postDelete/postDelete",	
				"pages/actorsAddressList/actorsAddressList",
				"pages/actorsManicurist/actorsManicurist",	
				"pages/actorsManicuristIndex/actorsManicuristIndex",
				"pages/actorsShopList/actorsShopList",
				"pages/actorsStore/actorsStore",
				"pages/levelPagesAddress/levelPagesAddress",
				"pages/levelPagesGoods/levelPagesGoods",
				"pages/levelPagesNewAddress/levelPagesNewAddress",
				"pages/levelPagesStoreList/levelPagesStoreList",
				"pages/levelPagesSubmitOrder/levelPagesSubmitOrder",
				"pages/levelPagesTimGood/levelPagesTimGood",
				"pages/myorder/myorder",
				"pages/orderAppraise/orderAppraise",
				"pages/orderDetails/orderDetails",
				"pages/orderPay/orderPay",
				"pages/orderpaySuccess/orderpaySuccess",
				"pages/secondPagesCard/secondPagesCard",	
				"pages/secondPagesCode/secondPagesCode",	
				"pages/secondPagesCollect/secondPagesCollect",
				"pages/secondPagesStore/secondPagesStore",
				"pages/clubCard/clubCard",
				"pages/personage/personage",
				"pages/centerInfo/centerInfo",
				"pages/storesDetails/storesDetails",
				"pages/membershipCardIndex/membershipCardIndex",
				"pages/recharge/recharge",
				"pages/membershipCardPay/membershipCardPay",
				"pages/organizingData/organizingData",
				"pages/passwordManage/passwordManage",
				"pages/newPassword/newPassword",
				"pages/confirmPassword/confirmPassword",
				"pages/membershipCardRule/membershipCardRule",
				"pages/rechargeRecord/rechargeRecord",
				"pages/rechargeSuccess/rechargeSuccess",
				"pages/rechargeRule/rechargeRule",	
				"pages/productList/productList",
				"pages/graphicList/graphicList",
				"pages/bespeakList/bespeakList",
				"pages/graphicCollection/graphicCollection",
				"pages/t_details/t_details",
				"pages/t_rule/t_rule",
				"pages/t_result/t_result",
				"pages/t_grouplist/t_grouplist",
				"pages/t_order/t_order",
				"pages/integralRole/integralRole",	
				"pages/integral/integral",
				"pages/f_search/f_search",
				"pages/f_confirmorder/f_confirmorder",
				"pages/f_goodsdetail/f_goodsdetail",
				"pages/f_recommend/f_recommend",
				"pages/f_tuike/f_tuike",
				"pages/f_yongjin/f_yongjin",
				"pages/f_yue/f_yue",
				"pages/f_tocash/f_tocash",
				"pages/f_tocashdetail/f_tocashdetail",
				"pages/f_personalset/f_personalset",
				"pages/f_nickname/f_nickname",
				"pages/f_nicksex/f_nicksex",
				"pages/f_phone/f_phone",
				"pages/f_aboutme/f_aboutme",
				"pages/f_shopset/f_shopset",
				"pages/f_shopname/f_shopname",
				"pages/f_shopslogan/f_shopslogan",
				"pages/f_goodsmanage/f_goodsmanage",
				"pages/f_systemmsg/f_systemmsg",
				"pages/f_tuikemsg/f_tuikemsg",
				"pages/f_yongjinmsg/f_yongjinmsg",
				"pages/f_order/f_order",
				"pages/f_orderdetail/f_orderdetail",
				"pages/f_orderflow/f_orderflow",
				"pages/f_applyrefunds/f_applyrefunds",
				"pages/f_discounts/f_discounts",
				"pages/f_settuike/f_settuike",
				"pages/f_car/f_car",	
				"pages/liveList/liveList",
				"pages/liveDetail/liveDetail"
			],
			"window": {
				"backgroundTextStyle": "light",
				"navigationBarBackgroundColor": "#fff",
				"navigationBarTitleText": "WeChat",
				"navigationBarTextStyle": "black"
			}
		},
		data() {
			return {
				//测试
				apiServer:'https://gw-test.vdongchina.com/',
				// appid:"ZzzudEDK0qRxmt7sz5W",
				appid:"Sl41przpIlWpdSjpnTw",
				// appid: 'EvnSLqpaMYZMjmyT52w',
				variate:'',

				//appid:"r3w0nSJqaAIkrBTY6DZ",
				// appid:"6jkbY3creZQwfPT2Qyy",
				//appid:"sample-zhubaosheji",//直播	

				//姚本地
				// apiServer:'https://app.vdongchina.com/',
				// appid:'',
				// variate:'local',	

				//飞欧
				// apiServer: 'http://192.168.31.92:8010/weichen-flashbuy-web',
				// appid: '',
				// variate: '',

				globalData: {
					nickName: "",
					openid: '',
					color:"",
					token:"",
					userInfo: {},
					currentUserId: "userId",
					liveUserid:'',
					wsdomain:'wss://app.vdongchina.com/socket/liveSocket',					
					imgUrl: "http://image.vdongchina.com/",
					upImage: "https://upload.vdongchina.com",					
					//severs:"https://gw.vdongchina.com/",
					avatarUrl: '',	
					pid:'',//分销openid
					modelShow: false,
					integral: ""
				}
			}
		},
		// onLaunch() {			
		// 	var that = this
		// 	wx.setStorageSync("historyArr", [])
		// 	wx.checkSession({
		// 		success() {
		// 			that.login()
		// 		},
		// 		fail() {
		// 			//登录态过期
		// 			that.login()
		// 		}
		// 	})
		// },
		async onLaunch () {			
			var that = this
			wx.setStorageSync("historyArr", [])
			await that.login()
		},		
		methods: {
			getIntegral(o) {
				var that = this
				// return new Promise((resolve, reject) => {
//					that.post("/basic/score/applet/loginScore?token=" + o, {}, function(data) {
//						if (data.success) {
//							that.globalData.modelShow = data.success
//							that.globalData.integral = data.obj
//							// resolve()
//						}
//					})
				// })
			},
			login () {
				var that = this
				var servsers = that.globalData.servsers
				return new Promise((resolve, reject) => {
					wx.login({
						success(res) {
							if(res.code) {
								//发起网络请求
								wx.request({
									url: that.apiServer + that.appid +that.variate +'/basic/api/user/login',//分销
									// url: that.apiServer + that.appid + '/basic/api/user/login',
									data: {
										code: res.code,
										//nickName: '一键购',
									},
									method: 'POST',
									header: {
										'Content-Type': 'application/x-www-form-urlencoded'
									},
									success(res) {
										that.globalData.token = res.data.data.token
										that.globalData.openid = res.data.data.openId
										wx.setStorageSync("token", res.data.data.token);
										wx.setStorageSync("userInfo", {});
										that.getIntegral(res.data.data.token)
										resolve()
									}
								})
							} else {
								// reject('获取用户登录态失败！' + res.errMsg)
								console.log('获取用户登录态失败！' + res.errMsg)
							}
						}
					})
				})
			},
			liveLogin () {
				var that = this;
				return new Promise((resolve, reject) => {
					wx.getUserInfo({
						success: (res) => {
							console.log('liveLogin')
							var userInfo = res.userInfo
							var nickName = userInfo.nickName
							var avatarUrl = userInfo.avatarUrl
							var gender = userInfo.gender //性别 0：未知、1：男、2：女
							var province = userInfo.province
							var city = userInfo.city
							var country = userInfo.country
							this.globalData.userInfo = userInfo
							that.post("/basic/live/app/user/login", {nickName:nickName,avatarUrl:avatarUrl,openId:that.globalData.openid}, (data) => {
								if(data.success){
									console.log('data',data)
									that.globalData.liveUserid = data.data.userId
								}
								resolve()
							},1)
						}
					})
				})
			},			
			getUserInfo () {
				var that = this
				return new Promise((resolve, reject) => {
					wx.getUserInfo({						
						success: (res) => {
							var userInfo = res.userInfo
							var nickName = userInfo.nickName
							var avatarUrl = userInfo.avatarUrl
							var gender = userInfo.gender //性别 0：未知、1：男、2：女
							var province = userInfo.province
							var city = userInfo.city
							var country = userInfo.country
							this.globalData.userInfo = userInfo
							this.post("/basic/community/app/user/login", { nickName: nickName, gender: gender, province: province, city: city, country: country, avatarUrl: avatarUrl, openId: that.globalData.openid }, (data) => {
								if (data.success) {
									this.globalData.userId = data.data.userId
									wx.setStorageSync("permission", data.data.permission);
								} else {
									wx.showToast({
										title: "网络出错了",
										icon: 'loading',
										duration: 2000
									})
								}
								resolve()
							}, 1)
						}
					})
				})
			},
			// login() {
			// 	var that = this
			// 	var servsers = that.globalData.servsers
			// 	wx.login({
			// 		success(res) {
			// 			if(res.code) {
			// 				//发起网络请求
			// 				wx.request({
			// 					url: this.$root.apiServer + that.appid + '/basic/api/user/login',
			// 					data: {
			// 						code: res.code,
			// 						//nickName: '一键购',
			// 					},
			// 					method: 'POST',
			// 					header: {
			// 						'Content-Type': 'application/x-www-form-urlencoded'
			// 					},
			// 					success(res) {
			// 						that.globalData.token = res.data.data.token
			// 						that.globalData.openid = res.data.data.openId
			// 						wx.setStorageSync("token", res.data.data.token);
			// 						wx.setStorageSync("userInfo", {});
			// 					}
			// 				})
			// 			} else {
			// 				console.log('获取用户登录态失败！' + res.errMsg)
			// 			}
			// 		}
			// 	})
			// },
			redirectError(msg, image) {
				wx.redirectTo({
					url: `../error/error?msg=${msg}` + (image ? `&image=${image}` : '')
				})
			},
			post: function(url, data, successFn, header_t) {
				var $this = this;
				// data["currentUserId"] = this.globalData.currentUserId;
				// data["token"] = $this.globalData.token;
				if (header_t) {
					header_t = 'application/x-www-form-urlencoded'
				} else {
					header_t = "application/json;charset=UTF-8"
				}
				wx.request({
					url: $this.apiServer + $this.appid+ url,
					data: data,
					// data:{},
					header: {
						'content-type': header_t
					},
					method: "POST",
					success: function(res) {
						if (successFn) successFn(res.data);
					}
				});
			},
			get: function(url, data, successFn, failFn, completeFn) {
				var $this = this;
				//      data["token"] = $this.globalData.token;
				wx.request({
					url: $this.apiServer + $this.appid  + url,
					data: data,
					// data:{},

					method: "GET",
					header: {
						'content-type': "application/json;charset=UTF-8"
					},
					success: function(res) {
						if (successFn) successFn(res.data);
					},
					fail: function(res) {
						if (failFn) failFn(res);
					},
					complete: function(res) {
						if (completeFn) {
							setTimeout(function() {
								$this.showT(0);
								completeFn(res.data);
							}, 2000)
						}
					}
				});
			}
		}
	}
</script>

<style>
/**app.wxss**/
/**app.wxss**/

page{font-size: 24rpx;line-height: 34rpx;color: #666666;}
.clear::after{display: block;clear: both;content: "";height: 0;overflow: hidden;visibility: hidden}
.left{float: left}
.right{float: right}

.bmg{background: #fff}
.margint{margin-top: 20rpx;}

/* 缺省 */
._navbar_matter_no{padding: 70rpx 238rpx; text-align: center;font-size: 28rpx;color: #999999}
/*._navbar_matter_no image{width: 267rpx; height: 322rpx;margin-bottom: 30rpx;}*/





	/**app.wxss**/
	
	body {
		margin: 0;
		font-size: 24rpx;
		line-height: 34rpx;
		color: #666666;
	}
	
	.topLine {
		width: 750rpx;
		height: 1rpx;
		background: #e3e3e3;
	}
	
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
	
	.main-back {
		background: #ff3e78
	}
	
	.main-bord {
		border: 2rpx solid #ff3e78
	}
	
	.main-color {
		color: #ff3e78
	}
	
	.auto {
		width: 710rpx;
		margin-left: auto;
		margin-right: auto
	}
	/**缺省页**/
	
	.defaults {
		margin-top: 300rpx;
		text-align: center;
		font-size: 28rpx;
		color: #999
	}
	
	.defaultsImg {
		width: 102rpx;
		height: 101rpx;
		margin-bottom: 36rpx;
	}
	
	.defBtn {
		width: 320rpx;
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 10rpx;
		margin-left: auto;
		margin-right: auto;
		margin-top: 70rpx;
	}
	/**加载动画**/
	
	.loading {
		position: fixed;
		width: 750rpx;
		background: rgba(0, 0, 0, 0.5);
		top: 0;
		bottom: 0;
		z-index: 9999999999999
	}
	
	.loading image {
		width: 124rpx;
		height: 124rpx;
		position: fixed;
		left: 50%;
		margin-left: -62rpx;
		top: 50%;
		margin-top: -62rpx;
		z-index: 99999999999999
	}
	/*commonCSS*/
	
button::after {
	content: none;
}

.bg-wt {
	background: #fff;
}

.block {
	display: block;
}

.txt-c {
	text-align: center;
}

.ft18 {
	font-size: 18rpx;
}

.ft20 {
	font-size: 20rpx;
}

.ft24 {
	font-size: 24rpx;
}


.ft26 {
	font-size: 26rpx;
}

.ft28 {
	font-size: 28rpx;
}

.ft30 {
	font-size: 30rpx;
}

.ft32 {
	font-size: 32rpx;
}

.ft34 {
	font-size: 34rpx;
}

.ft36 {
	font-size: 36rpx;
}

.plr20 {
	padding-left: 20rpx;
	padding-right: 20rpx;
}

.plr30 {
	padding-left: 30rpx;
	padding-right: 30rpx;
}

.mr20 {
	margin-right: 20rpx;
}

.ml20 {
	margin-left: 20rpx;
}

.ml30 {
	margin-left: 30rpx;
}

.ml60 {
	margin-left: 60rpx;
}

.mt20 {
	margin-top: 20rpx;
}

.mb20 {
	margin-bottom: 20rpx;
}

.mb30 {
	margin-bottom: 30rpx;
}

.mt30 {
	margin-top: 30rpx;
}

.pt20 {
	padding-top: 20rpx;
}

.pb20 {
	padding-bottom: 20rpx;
}

.ptb30 {
	padding-top: 30rpx;
	padding-bottom: 30rpx;
}

.pd15 {
	padding: 15rpx;
}

.strong {
	font-weight: bold;
}

.tc {
	text-align: center;
}

.bd-r6 {
	border-radius: 6rpx;
	overflow: hidden;
}

.ovfl {
	overflow: hidden;
}

image {
	width: 100%;
}

.c6 {
	color: #666;
}

.c3 {
	color: #333;
}

.c3c {
	color: #3c3c3c;
}

.c15 {
	color: #151515;
}

.c9 {
	color: #999;
}

.cd9 {
	color: #D94C42;
}

.c4c {
	color: #c4cdc4;
}

.c007 {
	color: #007aff;
}

.c86 {
	color: #868686;
}

.cff {
	color: #ff4c90
}

.ced3 {
	color: #ED3B3B;
}

.c1b {
	color: #1BB412;
}

.cl {
	clear: both;
}

.white {
	color: #fff;
}

.box-s {
	box-sizing: border-box;
	-moz-box-sizing: border-box;
	-webkit-box-sizing: border-box;
}

.bold {
	font-weight: bold;
}

.pos-r {
	position: relative;
}

.pos-a {
	position: absolute;
}

.pos-f {
	position: fixed;
	bottom: 0;
}

.pos-f-t {
	position: fixed;
	top: 0;
	z-index: 99;
}

.txt-center {
	text-align: center;
}

.txt-left {
	text-align: left;
}

.txt-right {
	text-align: right;
}

.ft38 {
	font-size: 38rpx;
}

.fl-r {
	float: right;
}

.fl-l {
	float: left;
}

.w-100 {
	width: 100%;
}

.w-50 {
	width: 50%
}

.display-flex {
	display: flex !important;
	display: -webkit-box !important;
	display: -moz-box !important;
	display: -ms-flexbox !important;
	display: -webkit-flex !important;
}

.flagstaff {
	width: 60rpx;
	height: 1px;
	background: #D8D8D8;
}

.nolong {
	text-align: center;
	height: 98rpx;
	line-height: 98rpx;
	width: 750rpx;
}

.txt-ov {
	display: block;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.txt-wrap {
	display: block;
	word-break: break-all;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	/*background-color: burlywood;*/
}

.bg-rgba {
	background: rgba(0, 0, 0, 0.4)
}

.bor-b {
	border-bottom: 1px solid #D8D8D8;
}

.bor-t {
	border-top: 1px solid #D8D8D8;
}



/* 加载更多 */

.loadMore {
	font-size: 20rpx;
	color: #0081FF;
}
@keyframes gogogo {
    0%{   
        -webkit-transform: rotate(0deg);
    }
    50%{
        -webkit-transform: rotate(180deg);
    }
    100%{
        -webkit-transform: rotate(360deg);
    }

}
@-webkit-keyframes gogogo {
    0%{   
        -webkit-transform: rotate(0deg);
    }
    50%{
        -webkit-transform: rotate(180deg);
    }
    100%{
        -webkit-transform: rotate(360deg);
    }

}
.loadMore_img,
.loadMore_iocn {
	width: 50rpx;
	height: 50rpx;
	margin: 0 auto;
	animation: gogogo 4s infinite linear ;
	-webkit-animation:gogogo 4s infinite linear ;
}

.noDataImg {
	width: 240rpx;
	height: 205rpx;
	margin: 0 auto;
	margin-top: 180rpx;
	margin-bottom: 60rpx;
}
</style>