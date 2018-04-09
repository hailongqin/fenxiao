<template>
	<!--pages/password/password.wxml-->

	<view class="page">
		<view class=" mb20">
			<view class="display-flex isActivity box-s ">
				<view class="vertical"></view>
				<view class="isActivityTitle ft32 c3">订单信息</view>

			</view>
			<view class="price ovfl">
				<text class="ft32 c3 fl-l">支付金额</text>
				<text class="ft32 c3 fl-r c5f5">支付¥{{shopPrice}}</text>
			</view>
			<view class="display-flex isActivity box-s ">
				<view class="vertical"></view>
				<view class="isActivityTitle ft32 c3">订单信息</view>
			</view>
			<view wx:if="{{cartOpen}}">
				<view class="activityDetail bg-wt pos-r">
					<view class="ovfl " @tap="selectPay(1)">
						<image class="activityDetailIocn fl-l" wx:if="{{selectPayStatus == 1}}" src="http://image.vdongchina.com/M00/03/3A/ZSUkmVngGM-EWM41AAAAAD5AoDA207.png"></image>
						<view class="unselected fl-l box-s" wx:else></view>
						<image class="activityYueeIocn fl-l" src="{{selectPayStatus == 1 ? 'http://image.vdongchina.com/M00/03/3C/ZSUkmVngKBOEeMkCAAAAAHnC8yo098.png' :'http://image.vdongchina.com/M00/03/3C/ZSUkmVngJ9SEXcZVAAAAABDeWaU109.png'}}"></image>
						<view class="{{selectPayStatus == 1 ? 'ft32 c5f5 fl-l activityDetailTitle ' : 'ft32 c6 fl-l activityDetailTitle '}}">余额支付（余额¥{{cartInfo.balance ? cartInfo.balance : 0 }}）</view>
					</view>
					<image @tap="fewer" class="{{fewers ? 'activityDetailRight fl-r tr-rotate pos-a' :'activityDetailRight fl-r pos-a'}}" src="http://image.vdongchina.com/M00/03/3C/ZSUkmVngJoKEWWIZAAAAAMedZrk797.png"></image>
				</view>
				<view class="isActivityList" wx:for="{{activity}}" wx:key="activity" @tap="selectActivity" wx:if="{{!noActivity && fewers}}">
					<view class="ovfl" wx:if="{{item.isdeleted == '1'}}">
						<view class="ft32 c6 fl-l activityTitle">
							<view class="activityName">{{item.name}} </view>
							<view class="activityContent ft26 c6">¥{{item.rechange}}（返¥{{item.sendcoin}}）</view>
						</view>
						<view class="fl-r" @tap="recharge(item.id,item.rechange,item.sendcoin)">
							<button class="PayButton ft32">充值</button>
						</view>
					</view>
				</view>
				<view class="balance ft32 c6" wx:if="{{fewers && activity.length < 1}}">
					<text>请立即前往</text>
					<text class="chongzhi" @tap="rechanges">充值</text>
				</view>
			</view>
			<view class="activityDetail bg-wt" @tap="selectPay(2)">
				<view class="ovfl">
					<image class="activityDetailIocn fl-l" wx:if="{{selectPayStatus == 2}}" src="http://image.vdongchina.com/M00/03/3A/ZSUkmVngGM-EWM41AAAAAD5AoDA207.png"></image>
					<view class="unselected fl-l box-s" wx:else></view>
					<image class="activityYueeIocn fl-l" src="http://image.vdongchina.com/M00/03/3C/ZSUkmVngJl-Eb5YMAAAAAA8Cmsg128.png"></image>
					<view class="{{selectPayStatus == 2 ? 'ft32 c5f5 fl-l activityDetailTitle' : 'ft32 c6 fl-l activityDetailTitle'}}">微信支付</view>
				</view>
			</view>
			<button class="confirm ft32" hover-class="confirmHover" @tap="confirm">确定</button>
		</view>

		<view class="model" wx:if="{{isPay}}">
			<view class=" {{inCode?'container active box-s pos-r':'container box-s pos-r'}}">
				<view class="guanbi pos-a" @tap="closeModel">
					<image class="guanbiImg" src="http://image.vdongchina.com/M00/03/30/ZSUkmVnfGKuEPJhhAAAAAAtkRGg735.png"></image>
				</view>
				<view class="title ft36 c3">请输入支付密码</view>
				<view class="itemName txt-c ft26 c6" wx:if="{{!cartInfo.companyName == null}}">{{cartInfo.companyName}}</view>
				<view class="paying txt-c">
					<view class="money c3">¥{{shopPrice}}</view>
				</view>
				<view class="password" @tap="clickCode">
					<block wx:for="{{[1,2,3,4,5,6]}}" wx:key="index">
						<view class="passwordLenth box-s">
							<text class="{{codes.length>index?'active':''}}"></text>
						</view>
					</block>
					<input maxlength="6" type="number" style="width:0;height:0;" focus="{{inCode}}" value="{{codes}}" @input="setCode" @blur="setting" />
				</view>

				<view class="yuee ft26 c6 txt-c display-flex">
					<image class="payImg z-index" src="http://image.vdongchina.com/M00/03/3C/ZSUkmVngKBOEeMkCAAAAAHnC8yo098.png"></image>
					<view class="yueeTiete">余额支付</view>
				</view>

				<view class="plr20 ft24 cd0 tishi txt-c" wx:if="{{!isExist}}">提示：您现在输入的数字将成为您的默认支付密码，请谨慎！</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	config: {
		navigationBarTitleText: '订单支付'
	},
	data() {
		return {
			selectPayStatus:2, //支付方式
			shopId: "", //商品id
			shopPrice: "", //商品价格
			cartInfo: {}, //卡信息
			activity: {}, //活动信息
			noActivity: false, //没有活动
			isPsd: "", //支付密码
			isPay: false, //弹出输入支付密码
			codes: "", //输入的密码
			inCode: true,
			isExist: false, //没有密码
			istype: 0, //0 为一键购  1为美业
			payUrl: "",
			navUrl: "",
			fewers: false, //展开收起活动
			cartOpen: false,//是否开启会员卡
			payType: true
		}
	},
	onLoad(options) {
		var that = this
		that.shopId = options.id
		that.shopPrice = options.price
		that.istype = options.isType
		that.$root.post("/basic/newMember/applet/pview?openid=" + that.$root.globalData.openid, {}, function(data) { //个人会员卡信息
			if (data.success) {
				that.cartInfo = data.obj
			} else {
				if (data.obj != null) {
					that.cartInfo = data.obj
				}
			}
		})
		that.$root.post("/basic/newMember/applet/view", {}, function(data) { //会员卡信息
			if (data.success) {
				if (data.obj != null) {
					if (data.obj.isdeleted == '0') {
						that.cartOpen = false
						that.selectPayStatus = 2
					} else {
						that.cartOpen = true
					}
				}

			}
		})
		that.$root.post("/basic/newMember/applet/list", {
			page: 1,
			rows: 100,
			sort: '',
			order: ''
		}, function(data) { //活动列表
			if (data.list.length == 0) {
				that.noActivity = true
			}
			if (data.list.length > 0) {
				let activityArr = []
				for (let i = 0; i < data.list.length; i++) {
					if (data.list[i].isdeleted == "1")
						activityArr.push(data.list[i])
				}
				that.activity = activityArr
			}
		})
		that.$root.post("/basic/newMember/applet/viewById?openid=" + that.$root.globalData.openid, {}, function(data) { //请求支付密码
			that.cartUser = data.obj
			if (data.obj == null) {
				that.cartOpen = false
				return
			}
			if (data.obj.paypwd == null || data.obj.paypwd == 'undefined') { //无密码
				that.isPsd = ""
			} else { //有密码
				that.isPsd = data.obj.paypwd
				that.isExist = true
			}
		}, 1)
		if (that.istype == 0) {
			that.payUrl = "/basic/api/fBalancePay/toPay" //支付地址
			that.navUrl = "../orderOk/orderOk" //跳转路径
		} else {
			that.payUrl = "/basic/api/bBalancePay/toPay"
			that.navUrl = "../orderpaySuccess/orderpaySuccess"
		}
	},
	methods: {
		fewer() {
			this.fewers = !this.fewers
		},
		clickCode() { //点击输入
			this.inCode = true
		},
		closeModel() { //关闭输入验证码弹窗
			// payCount = 0
			// clearTimeout(this.data.timer);
			this.isPay = false
			this.codes = ''
			this.payType = true

			// this.codes = ''

		},
		setting() { //失去焦点时恢复弹出框的位置
			let that = this;
			that.inCode = false

		},
		setCode(e) { //余额支付
			let val = e.detail.value,
				flag = val.length == 6 ? true : false,
				that = this,
				isExist = that.isExist;
			that.codes = val;


			if (val.length == 6) {
				if (that.payType) {
					that.payType = false
					if (!isExist) { //余额支付时无密码
						if (val.length != 6) {
							wx.showModal({
								title: '提示',
								showCancel: false,
								content: '密码错误'
							})
							return;
						}
						var dates = {}
						dates["paypwd"] = that.codes
						dates["id"] = that.cartUser.id
						that.$root.post("/basic/newMember/applet/update?city=1&age=1&pic=1&nickName=1&openId=null&type=0", dates, function(data) {
							if (data.success) {
								that.$root.post(that.payUrl, {
									token: that.$root.globalData.token,
									ordId: that.shopId
								}, function(data) {
									if (data.success) {
										
										wx.redirectTo({
											url: that.navUrl + "?ordId=" + that.shopId
										})
									} else {
										wx.showModal({
											title: '提示',
											showCancel: false,
											content: '系统异常，无法支付'
										})
									}
								}, 1)
							}

						})
					} else { //余额支付时有密码
						if (val != that.isPsd) {
							if (val.length != 6) {
								wx.showModal({
									title: '提示',
									showCancel: false,
									content: '密码错误'
								})
								return;
							}
							wx.showModal({
								title: '提示',
								cancelText: "忘记密码",
								cancelColor: "#666666",
								confirmText: "重试",
								confirmColor: "#645FA6",
								content: '支付密码错误，请重试',
								success: function(res) {
									if (res.confirm) {
										that.codes = ''
										that.payType = true
									} else if (res.cancel) {
										wx.navigateTo({
											url: "../passwordManage/passwordManage"
										})
									}
								}
							})
							return;
						}
						that.$root.post(that.payUrl, {
							token: that.$root.globalData.token,
							ordId: that.shopId
						}, function(data) {
							if (data.success) {
								that.payType = false
								wx.redirectTo({
									url: that.navUrl + "?ordId=" + that.shopId
								})
							} else {
								wx.showModal({
									title: '提示',
									showCancel: false,
									content: '系统异常，无法支付'
								})
							}
						}, 1)

					}

				}
			}
		},
		selectPay(pay) {
			var that = this
			that.selectPayStatus = pay
			if (pay == 1) {
				if (!that.fewers) {
					that.fewers = true
				}
			} else {
				that.fewers = false
			}
		},
		confirm() {
			var that = this
			if (that.selectPayStatus == 1) { //选择余额支付
				if (that.cartInfo.balance < that.shopPrice) {
					wx.showModal({
						title: '提示',
						showCancel: false,
						content: "余额不足，请充值"
					})
					return;
				}
				that.isPay = true
			}
			let ispayUrl = that.payUrl
			if (that.istype == 0) {
				ispayUrl = "/basic/api/pay/toPay"
			} else {
				ispayUrl = "/basic/api/bPay/toPay"
			}
			if (that.selectPayStatus == 2) { //微信支付
				wx.request({
					url: this.$root.apiServer + that.$root.appid + ispayUrl,
					data: {
						token: getApp().globalData.token,
						ordId: that.shopId,
					},
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success(res) {
						if (res.data.code == "100" || res.data.success) {
							//微信支付

							wx.requestPayment({
								'timeStamp': res.data.data.timeStamp,
								'nonceStr': res.data.data.nonceStr,
								'package': res.data.data.package,
								'signType': res.data.data.signType,
								'paySign': res.data.data.paySign,
								success(res) {
									wx.redirectTo({
										url: that.navUrl + "?ordId=" + that.shopId
									})
								},
								fail(res) {
								}
							})
						} else {
							wx.showModal({
								title: '提示',
								showCancel: false,
								content: '系统异常，无法支付'
							})
						}
					}
				})
			}
		},
		recharge(id, rechange, sendcoin) { //充值
			wx.navigateTo({
				url: "../recharge/recharge?id=" + id + "&rechange=" + rechange + "&sendcoin=" + sendcoin
			})
		},
		rechanges() {
			wx.navigateTo({
				url: "../recharge/recharge"
			})
		},
	}
}
</script>
<style scoped>
/* pages/password/password.wxss */

.page {
	width: 750rpx;
	min-height: 100vh;
	background: #f1f1f1;
}

.isActivity {
	width: 100%;
	padding: 16rpx 20rpx;
}

.vertical {
	margin-top: 12rpx;
	margin-right: 14rpx;
	width: 6rpx;
	height: 18rpx;
	background: #5f57c0;
}

.isActivityTitle {
	height: 45rpx;
	line-height: 45rpx;
}

.activityDetail {
	padding: 32rpx 20rpx;
	margin-bottom: 1px;
}

.activityDetailIocn {
	display: block;
	width: 32rpx;
	height: 32rpx;
	margin-right: 30rpx;
}

.activityYueeIocn {
	display: block;
	width: 32rpx;
	height: 32rpx;
	margin-right: 10rpx;
}

.activityDetailRight {
	width: 14rpx;
	height: 32rpx;
	top: 0;
	right: 0;
	padding: 32rpx 20rpx;
}

.activityDetailTitle {
	line-height: 32rpx;
}

.activityTitle {
	line-height: 45rpx;
}

.activityContent {
	line-height: 37rpx;
}

.PayButton {
	width: 130rpx;
	height: 60rpx;
	line-height: 60rpx;
	background: #4a3eb9;
	border-radius: 4px;
	color: #fff;
	margin-top: 10rpx;
}

.isActivityList {
	padding: 14rpx 64rpx;
	border-bottom: 1px solid #E4E4E4;
}

.isActivityList:last-child {
	border: none;
}

.confirm {
	margin-top: 112rpx;
	width: 670rpx;
	height: 94rpx;
	line-height: 94rpx;
	background: #5F57C0;
	border-radius: 10rpx;
	color: #ffffff;
}

.confirmHover {
	background: #5F57C0;
}

.unselected {
	width: 32rpx;
	height: 32rpx;
	margin-right: 30rpx;
	border-radius: 50%;
	border: solid 1px #333;
}

.price {
	line-height: 78rpx;
	background: #fff;
	padding: 0rpx 20rpx;
}








/*活动列表结束  */

.isRecharge {
	width: 100%;
	padding: 16rpx 20rpx;
	margin-bottom: 2rpx;
}

.recharge {
	padding: 0 42rpx;
	padding-top: 100rpx;
}

.moneyIocn {
	display: inline-block;
	height: 85rpx;
	line-height: 85rpx;
	font-size: 60rpx;
	margin-right: 4rpx;
}

.rechargeInput {
	width: 626rpx;
	line-height: 60rpx;
	margin-top: 12rpx;
	padding-left: 22rpx;
	border-bottom: 1px solid rgba(204, 204, 204, 0.60);
}

.rechargeMoney {
	padding: 0 42rpx;
	line-height: 40rpx;
	padding-bottom: 128rpx;
}

.actuallyPaid {
	padding-right: 100rpx;
}

.pay {
	width: 670rpx;
	height: 94rpx;
	line-height: 94rpx;
	background: #5f57c0;
	border-radius: 10rpx;
}

.reminder {
	padding: 0 42rpx;
	padding-bottom: 57rpx;
}

.model {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	background: rgba(0, 0, 0, 0.7);
	z-index: 9999;
	display: flex;
	justify-content: center;
	align-items: center;
}

.model .container,
.model .container1 {
	border-radius: 4px;
	padding: 48rpx;
	padding-bottom: 30rpx;
	background: #fff;
}








/* .model .container { */


/* position:absolute;  */


/* height: 460rpx; */


/* margin: 0 auto;
} */

.model .container {
	width: 560rpx;
	position: absolute;
	left: 96rpx;
	/* margin-left: -140px; */
	top: 50%;
	margin-top: -100px;
}

.model .container.active {
	top: 30%;
}

.model .container .title {
	text-align: center;
	height: 50rpx;
	line-height: 50rpx;
	margin-bottom: 18rpx;
}

.model .container .paying .time {
	border: 1px solid #eaeaea;
	margin-left: 15px;
	width: 55px;
	text-align: center;
	height: 20px;
	line-height: 20px;
}

.model .container .password {
	width: 462rpx;
	height: 78rpx;
	display: flex;
	border: 1px solid #979797;
	border-radius: 4px;
	margin-bottom: 20rpx;
}

.passwordLenth {
	border-left: 1px solid #eaeaea;
	width: 78rpx;
	height: 78rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}

.passwordLenth:first-child {
	border: none;
}

.model .container .password view.active {
	border-color: #1a1a1a;
}

.model .container .password view text {
	border-radius: 100%;
	border: 4.5px solid #fff;
}

.model .container .password view text.active {
	border-color: #1a1a1a;
}

.model .container1 {
	padding: 30px 22.5px 0;
	font-size: 13px;
	color: #222;
	text-align: center;
	position: relative;
}

.model .container1 .goBack {
	border-top: 1px solid #eaeaea;
	padding: 20px 55px;
	margin-top: 22px;
}

.model .container1 .goBack image {
	vertical-align: middle;
	margin-top: -2px;
	margin-left: 10px;
}

.guanbi {
	position: absolute;
	top: 10px;
	right: 10px;
}

.guanbi image {
	vertical-align: top;
}

.itemName {
	height: 37rpx;
	line-height: 37rpx;
	margin-bottom: 18rpx;
}

.money {
	font-size: 52rpx;
	margin-bottom: 46rpx;
}

.payImg {
	width: 32rpx;
	height: 32rpx;
}

.yuee {
	height: 32rpx;
	line-height: 32rpx;
	justify-content: center;
}

.yueeTiete {
	margin-top: 2rpx;
	margin-left: 10rpx;
}

.guanbiImg {
	width: 40rpx;
	height: 128rpx;
}

.guanbi {
	top: -128rpx;
	right: 0px;
}

.c5f5 {
	color: #50499A;
}

.tr-rotate {
	transform: translateX(-5px) rotate(90deg);
}

.balance {
	line-height: 45rpx;
	padding: 18rpx 64rpx;
}

.chongzhi {
	color: #3625B1;
	text-decoration: underline;
}

.cd0 {
	color: #D0021B;
}

.tishi {
	padding-bottom: 30rpx;
}
</style>