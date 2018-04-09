<template>
	<view>
		<view class="container">
			<view class="_sub_info bmg">
				<view class="_sub_item clear" @tap="clickNameshow">
					<view class="clear left _sub_person">
						<view class="left _sub_lab">预约人:</view>
						<view class="left _sub_name">
							<input type="text" value="{{userName}}" disabled placeholder="预约人" />
						</view>
					</view>
					<view class="_sub_rightimg right">
						<image class="_sub_rightimg_image" src="http://image.vdongchina.com/M00/03/3A/ZSUkmVngHQGECJ57AAAAAKhVnJM099.png"></image>
					</view>
				</view>
				<!--<view class="_sub_item clear" @tap="clickTimeshow">
																	<view class="clear left _sub_person">
																		<view class="left _sub_lab">服务时间:</view>
																		<view class="left _sub_name">
																			<input type="text" value="{{textTime}}" disabled="false" placeholder="服务时间" />
																		</view>
																	</view>
																	<view class="_sub_rightimg right">
																		<image class="_sub_rightimg_image" src="http://image.vdongchina.com/M00/03/3A/ZSUkmVngHQGECJ57AAAAAKhVnJM099.png"></image>
																	</view>
																</view>-->
				<!--<view class="_sub_item clear">
																	<view class="clear left _sub_person">
																		<view class="left _sub_lab">服务地址:</view>
																		<view class="left _sub_name">
																			<input type="text" value="{{textRess}}"  placeholder="服务地址" />
																		</view>
																	</view>
																	<view class="_sub_rightimg right">
																		<image class="_sub_rightimg_image" src="http://image.vdongchina.com/M00/03/3A/ZSUkmVngHQGECJ57AAAAAKhVnJM099.png"></image>
																	</view>
																</view>-->
			</view>
			<view class="_wrap bmg margint">
				<view class="_wrap_cant clear">
					<view class="_name_img left">
						<image class="_name_img_image" src="{{items.thumbUrl}}"></image>
					</view>
					<view class="_person left">
						<view class="_wrap_name">{{items.name}}</view>
						<view class="_wrap_job">手艺人：{{items.manicurName}}</view>
					</view>
					<view class="_wrap_number right">
						<view class="_wrap_price">￥
							<text>{{items.guidePrice}}</text>
						</view>
						<view class="_wrap_num">X{{items.num}}</view>
					</view>
				</view>
				<view class="_wrap_cant clear">
					<view class="_buy_num left">
						购买数量
					</view>
					<view class="_person left">
						<view class="_buy_chase">限购1份</view>
					</view>
					<view class="right _buynum_nums">
						<view class="left _buynum_sub" @tap="bindMinus">-</view>
						<view class="left _buynum_num">{{items.num}}</view>
						<view class="left _buynum_add">+</view>
					</view>
				</view>
				<!-- <view class="_wrap_cant clear" > -->
				<view class="delivery c3c ft28 bg-wt" wx:if="{{scoreOpen == 1}}">
					<checkbox-group @change="checkboxChange">
						<label class="checkbox display-flex">
							<view>积分抵扣</view>
							<view>
								<text class="scoreShow" wx:if="{{scoreShow}}">使用{{scores}}积分 抵扣{{totalScore}}元</text>
								<checkbox color="#ff3e78" />
							</view>

						</label>
					</checkbox-group>
				</view>
				<!-- </view> -->

				<!-- <view class="_wrap_cant clear" wx:if="{{items.scoreOpen == 1}}">
														<view class=" clear">
															<view class="cant-dis display-flex reminders">
																<view class="">
																	使用积分 共233积分，满1000积分可用
																</view>
																<image src="http://image.vdongchina.com/M00/05/C3/ZSUkmVoSUeGEQjU2AAAAAJ1SB04129.png" class="page-image reminder"></image>

															</view>
														</view>
													</view>  -->
				<view class="_wrap_cant clear ">
					<view class="_buy_note left">
						备注：
					</view>
					<view class="left _sub_name">
						<input type="text" @input="markTxt" placeholder="备注" />
					</view>
				</view>
				<view class="orderPrice bg-wt">
					<view class="clear ">
						<view class="left">商品金额</view>
						<view class="right main-color">￥{{items.guidePrice}}</view>
					</view>
					<view class="clear " wx:if="{{scoreShow}}">
						<view class="left">积分抵扣</view>
						<view class="right main-color">-{{totalScore}}</view>
					</view>
				</view>
			</view>
			<view class="_subBtn clear">
				<view class="cant-border" wx:if="{{payFlag}}">

					<view class="cant-dis txt-c">
						订单每满
						<text class="main-color ft24">{{manscore}}</text>元 可获得
						<text class="main-color">1</text> 积分，本次下单可获赠
						<text class="main-color">{{getScore}}</text> 积分
					</view>
				</view>
				<view class="_pay_price left clear">

					<!-- <view class="textc right" wx:if="{{scoreShow}}">￥
											<text>{{items.guidePrice - totalScore}}</text>
										</view> -->
					<view class="textc right">￥
						<text>{{payPrice}}</text>
					</view>
					<view class="right">待支付：</view>
				</view>
				<view class="_pay_now right" @tap="subPay">立即支付</view>
			</view>
		</view>

		<!--名字电话-->
		<view class="_subName_cant" wx:if="{{isName}}">
			<view class="_subName">
				<view class="classname">
					<view class="_public_main _public_title clear">
						<text>给自己/朋友预约</text>
						<view class="_public_titleimg right" @tap="clickNamehide">
							<image class="_public_titleimg_image" src="http://image.vdongchina.com/M00/03/3C/ZSUkmVngJymEFke5AAAAAETUHH4818.png"></image>
						</view>
					</view>
					<view class="_public_main _public_item clear">
						<view class="_subName_img left">
							<image class="_subName_img_image" src="http://image.vdongchina.com/M00/03/3B/ZSUkmVngJPmEOjJqAAAAABfr9zM428.png"></image>
						</view>
						<view class="_subName_text left">
							<input type="text" placeholder="联系人" value="{{name}}" @input="userNameTxt" />
						</view>
					</view>
					<view class="_public_main _public_item clear">
						<view class="_subName_img left">
							<image class="_subName_img_image" src="http://image.vdongchina.com/M00/03/3B/ZSUkmVngIlSEb65QAAAAAImAYAA029.png"></image>
						</view>
						<view class="_subName_text left">
							<input type="number" placeholder="手机号" value="{{phone}}" @input="userPhone" maxlength="11" />
						</view>
					</view>
				</view>
				<button class="_public_btn" @tap="subName">确定</button>
			</view>
		</view>

		<!--时间-->
		<!--<view class="_subTime_cant" wx:if="{{isTime}}">
															<view class="{{isRight ? 'isRight _subTime ' : '_subTime '}}">
																<view class="classname">
																	<view class="_public_main _public_title clear">
																		<text>给自己/朋友预约</text>
																		<view class="_public_titleimg right" @tap="clickTimehide">
																			<image class="_public_titleimg_image" src="http://image.vdongchina.com/M00/03/3C/ZSUkmVngJymEFke5AAAAAETUHH4818.png"></image>
																		</view>
																	</view>
																	<view class="clear _subTime_title">
																		<view class="_subTime_title_data left">
																			<scroll-view class="_subTime_title_items" scroll-x="true" scroll-left="{{scroll_left/2}}">
																				<block wx:for-items="{{times}}" wx:key="index">
																					<view id="{{index}}" class="{{currentTab == index ? 'active _subTime_title_Item ' : '_subTime_title_Item '}}" @tap="navbarTap">
																						<view class="_subTime_title_day">{{item.day}}</view>
																						<view class="_subTime_title_date add" wx:if="{{item.isDate}}">可预约</view>
																						<view class="_subTime_title_date" wx:else>不可预约</view>
																					</view>
																				</block>
																			</scroll-view>
																		</view>
																		<view class="_subTime_title_days right" @tap="clickRight">
																			<view class="_subTime_title_daysimg">
																				<image class="_subTime_title_daysimg_image" src="http://image.vdongchina.com/M00/03/2E/ZSUkmVnfBSqEMp5ZAAAAABt0FiI565.png"></image>
																			</view>
																			<view class="_subTime_title_text">30天</view>
																		</view>
																	</view>
																	<view class="_subTime_main">
																		<view class="_subTime_chooseNo" @tap="clickChoose">
																			<view class="_subTime_choosetext">{{choosetext}}</view>
																			<view class="">{{daytext}}</view>
																			<view class="_active" wx:if="{{currentAdd == -1}}">
																				<image class="_activeimg" src="http://image.vdongchina.com/M00/03/2A/ZSUkmVneyHeEb881AAAAAA7BUOQ244.png"></image>
																			</view>
																		</view>
																		<view class="_subTime_time_items clear">
																			<view wx:for="{{hours}}" wx:key="index" class="{{item.isable ? 'colorb _subTime_time_item left ' : '_subTime_time_item left '}}">
																				<view id="{{index}}" wx:if="{{item.isable}}" class="{{currentAdd == index ? 'act' : ''}}" @tap="clickHours">
																					<view>{{item.hours}}</view>
																					<view class="_active" hidden="{{currentAdd == index ? '':'true'}}">
																						<image class="_activeimg" src="http://image.vdongchina.com/M00/03/2A/ZSUkmVneyHeEb881AAAAAA7BUOQ244.png"></image>
																					</view>
																				</view>
																				<view wx:else>
																					<view>{{item.hours}}</view>
																					<view class="_item_text">暂不可约</view>
																				</view>
																			</view>

																		</view>
																	</view>
																</view>

																<button class="{{isRight ? 'isRight _public_btn ' : '_public_btn '}}" @tap="subTime">确定</button>
															</view>
															<view class=" {{isLeft ? 'isLeft _subYears' : '_subYears'}}">
																<view class="classname">
																	<view class="_public_main _serve_title clear">
																		<text>给自己/朋友预约</text>
																		<view class="_serve_titleimg left" @tap="clickLeft">
																			<image class="_serve_titleimg_image" src="http://image.vdongchina.com/M00/03/31/ZSUkmVnfHkKESBSUAAAAAG399sY825.png"></image>
																		</view>
																	</view>
																</view>
																<view class="_week_cant">
																	<view class="_week">日</view>
																	<view class="_week">一</view>
																	<view class="_week">二</view>
																	<view class="_week">三</view>
																	<view class="_week">四</view>
																	<view class="_week">五</view>
																	<view class="_week">六</view>
																</view>
																<view class="_subYears_items clear">
																	<view wx:for="{{years}}" wx:key="gg">
																		<view class="_subYears_item left year">{{item[0].year}}年{{item[0].month}}月</view>
																		<view class="_subYears_item left" style="{{'margin-left:'+(item[0].week-1)*107+'rpx'}}"></view>
																		<view wx:for-items="{{item}}" wx:key="index" id="{{index}}" class="_subYears_item left" @tap="clickChecked">
																			<view>{{item.str}}</view>
																			<view>{{item.day}}</view>
																		</view>
																	</view>
																</view>
															</view>
														</view>-->
	</view>
</template>

<script>
export default {
	config: {
		"navigationBarTitleText": "提交订单"
	},
	data() {
		return {
			isName: false, //显示提交名字电话
			userName: "",
			name: "",
			phone: "",
			isTime: false,
			currentTab: 0,
			currentAdd: -2,
			times: [
			],
			hours: [
				{ hours: "08:00", isable: true },
				{ hours: "09:00", isable: false },
				{ hours: "10:00", isable: false },
				{ hours: "11:00", isable: false },
				{ hours: "12:00", isable: false },
				{ hours: "13:00", isable: true },
				{ hours: "14:00", isable: false },
				{ hours: "15:00", isable: true },
				{ hours: "16:00", isable: false },
			],
			years: [

			],
			choosetext: "暂不选择服务时间",
			daytext: "下单后180天内可选择服务时间",
			text: '',
			textTime: "",//服务时间
			isRight: false,
			isLeft: false,
			week: "",
			items: [],
			mark: '',
			isClick: false,
			totalScore: 0,//抵扣钱数
			scores: 0,//积分兑换比例
			scoreOpen: 0,//当前服务是否可以开启积分
			scoreShow: false,
			getScore: 0,
			payFlag: false,
			manscore: 0,
			payPrice: 0

		}
	},
	methods: {
		//名字电话
		clickNameshow: function() {
			this.isName = true
			this.name = ''
			this.phone = ''
		},
		clickNamehide: function() {
			this.isName = false
		},
		userNameTxt: function(e) {
			this.name = e.detail.value
		},
		userPhone: function(e) {
			this.phone = e.detail.value
		},
		subName: function() {
			if (this.name.length == 0) {
				wx.showToast({
					title: '请输入名字',
					icon: 'success',
					duration: 1500
				})
				return false;
			}
			if (this.phone.length == 0) {
				wx.showToast({
					title: '请输手机号！',
					icon: 'success',
					duration: 1500
				})
				return false;
			}
			var myreg = /^1[34578]\d{9}/;
			if (!myreg.test(this.phone)) {
				wx.showToast({
					title: '手机号有误！',
					icon: 'success',
					duration: 1500
				})
				return false;
			}
			this.userName = this.name
			this.isName = false
		},

		//时间
		clickTimeshow: function() {
			this.isTime = true

		},
		clickTimehide: function() {
			this.isTime = false
		},

		navbarTap: function(e) {
			this.currentTab = e.currentTarget.id
		},
		markTxt: function(e) {
			this.mark = e.detail.value
		},
		//			  getWeek:function(week){
		//			    if (week>=0&&week<7){
		//			      switch(week){
		//			        case 0:{
		//			          return "周日";
		//			        }
		//			        case 1: {
		//			          return "周一";
		//			        }
		//			        case 2: {
		//			          return "周二";
		//			        }
		//			        case 3: {
		//			          return "周三";
		//			        }
		//			        case 4: {
		//			          return "周四";
		//			        }
		//			        case 5: {
		//			          return "周五";
		//			        }
		//			        case 6: {
		//			          return "周六";
		//			        }
		//			      }
		//			    }
		//			  },
		//			  getDateList:function(){
		//			    var time = new Date()
		//			    var year = time.getFullYear()
		//			    var month = time.getMonth() + 1
		//			    var day = time.getDate()
		//			    var week=time.getDay()
		//			    var today = month + "/" + day
		//			    //当月天数
		//			    var count = new Date(year, month, 0).getDate()    
		//			      var list=[]
		//			      var newList=[[]]
		//			      for (var i = 0; i < 30; i++) {
		//			        var _week=(week+i)%7;//星期
		//			        var str= (i==0?"今天":(i==1?"明天":(i==2?"后天":this.getWeek(_week))))        
		//			        var _month = month + parseInt((day+i)/count)//月份
		//			        var _count = new Date(year, (month + 1), 0).getDate()//当月天数
		//			        var _day=0
		//			        if ((day + i >= count + _count) || parseInt((day + i) / count)==2){
		//			          _month = month +1+ parseInt((day + i-count) / _count)
		//			          _day=(day+i-count)%_count
		//			        }else{
		//			          _day = (day + i) % count//日期
		//			          _count=0
		//			        }
		//			        if(_day==0){
		//			          _month-=1
		//			          _day =_count||count
		//			        }
		//			        list.push({ day: str + (_month<10 ? "0" : "") + _month + '/' + (_day<10 ? "0" : "") + _day, isDate: true }) 
		//			        if (_month - month!=newList.length-1){
		//			          newList.push([])
		//			        }
		//			        newList[_month - month].push({ str: str.replace(/周[\s|\S]$/, ''), year: year, month: _month, week: _week, day: (_day < 10 ? "0" : "") + _day, isDate: true });   
		//			      }   
		//			      console.log(list)
		//			      this.week=week
		//			      this.times=list
		//			      this.years=newList
		//			   },
		//点击选择时间
		//			  clickHours:function(e){
		//			    this.text=this.hours[e.currentTarget.id].hours
		//			    this.currentAdd=e.currentTarget.id
		//			  },
		//			  clickChoose:function(){
		//			    this.text=this.choosetext + this.daytext
		//			    this.currentAdd=-1 
		//			  },
		//			  subTime:function(){
		//			    if (this.currentAdd > -2){
		//			      this.textTime=this.text,
		//			      this.isTime=false
		//			    }else{
		//			      wx.showToast({
		//			        title: '请选择服务时间！',
		//			        icon: '',
		//			        duration: 1500
		//			      })
		//			    }   
		//			  }, 
		//			  clickRight:function(){
		//			    this.isRight=true
		//			    this.isLeft=false
		//			  },
		//			  clickLeft:function(){
		//			    this.isLeft=true
		//			    this.isRight=false
		//			  },
		//			  clickChecked:function(e){
		//			
		//			    var id = parseInt(e.currentTarget.id)
		//			    console.log(id)
		//			    this.isLeft=true
		//			    this.isRight=false
		//			    this.currentTab=id + 3
		//			    this.scroll_left=(id + 3) * 160   			    
		//			  }
		subPay() {

			var that = this
			if (this.userName.length == 0) {
				wx.showToast({
					title: '请输入名字！',
					icon: 'success',
					duration: 1500
				})
				return false;
			}
			//		    if (this.mark.length == 0){
			//		      wx.showToast({
			//		        title: '请输入备注！',
			//		        icon:'success',
			//		        duration: 1500
			//		      })
			//		      return false;
			//		    }
			if (that.isClick == false) {
				that.isClick = true
				let payScore = 0;
				if (that.scoreShow) {
					payScore = this.scores
				}
				wx.request({
					url: that.$root.apiServer + that.$root.appid + "/basic/api/bOrd/createOrd",
					data: {
						//staffId:that.items.staffId,//技师id
						serverId: that.items.id,//服务id
						userPhone: that.phone,//客户电话
						userName: that.name,//客户姓名	
						mark: that.mark,//备注
						productCount: 1,
						token: getApp().globalData.token,
						payScore: parseInt(payScore)
					},
					method: "POST",
					header: {
						'content-type': 'application/json'
					},
					success: function(rst) {
						if (rst.data.success == true) {
							wx.redirectTo({
								url: '../membershipCardPay/membershipCardPay?id=' + rst.data.data.id + "&price=" + rst.data.data.totalPrice + "&isType=1"
							})
						}
					}
				})
			}
		},
		checkboxChange(e) {

			this.scoreShow = !this.scoreShow
			if (this.scoreShow) {
				this.payPrice = parseFloat(this.items.guidePrice - this.totalScore).toFixed(2)
				this.getScore = Math.floor(this.payPrice / this.manscore)
			} else {
				this.getScore = Math.floor(this.items.guidePrice / this.manscore)
				this.payPrice = this.items.guidePrice
			}

		}
	},
	onLoad(options) {
		//this.getDateList()
		var items = []
		if (options.product) {
			items = JSON.parse(options.product)
		}
		this.items = items

		var that = this
		wx.request({
			url: that.$root.apiServer + that.$root.appid + '/basic/score/applet/selectOneByOpenid?openid=' + that.$root.globalData.openid,
			data: {
			},
			method: "POST",
			header: {
				'Content-Type': 'application/json'
			},
			success(rst) {
				if (rst.data.success) {
					if (rst.data.code == 0 || rst.data.obj == null) {
						that.scoreOpen = false
					}
					if (rst.data.obj != null) {
						that.scoreOpen = rst.data.obj.rateFlag
						that.manscore = rst.data.obj.payScore
						that.payFlag = rst.data.obj.payFlag
						let scaleMax =  Math.floor(parseFloat(((items.guidePrice * (options.highestRate * 0.01)) / rst.data.obj.rateScore)).toFixed(0))
						if (scaleMax > rst.data.code) {
							that.scores = rst.data.code
						}
						if (scaleMax <= rst.data.code) {
							if (scaleMax < 1) {
								scaleMax = 0
							}
							that.scores = scaleMax
						}
						that.totalScore = parseFloat(that.scores * rst.data.obj.rateScore).toFixed(2)
                       that.getScore = Math.floor(that.items.guidePrice / that.manscore)
					}
					that.payPrice = items.guidePrice;
				}
			}
		})
	}
}	
</script>

<style scoped>
/* pages/levelPages/submitOrder/submitOrder.wxss */

page {
	margin-bottom: 120rpx;
	background: #f9f9f9;
}

body {
	background: #F9F9F9;
}

.container {
	background: #F9F9F9;
}

._sub_item {
	padding: 30rpx;
	border-bottom: #f0f0f0 2rpx solid;
}

._sub_person {
	width: 580rpx;
}

._sub_person {
	line-height: 56rpx;
	font-size: 30rpx;
	color: #111111;
}

._sub_lab {
	width: 170rpx;
}

._sub_name {
	width: 410rpx;
}

._sub_name input {
	width: 410rpx;
}

._sub_rightimg {
	width: 12rpx;
	height: 22rpx;
	margin-top: 8rpx;
}

._sub_rightimg_image {
	width: 12rpx;
	height: 22rpx;
}

._wrap {
	padding: 0rpx 30rpx 0 30rpx;
}

._wrap_cant {
	padding: 30rpx 0 30rpx 0;
	border-bottom: 2rpx solid #f0f0f0;
}

._name_img {
	width: 140rpx;
	height: 140rpx;
}

._name_img_image {
	width: 140rpx;
	height: 140rpx;
}

._person {
	margin-left: 30rpx;
}

._wrap_name {
	line-height: 42rpx;
	font-size: 30rpx;
	color: #333333;
}

._wrap_job {
	margin-top: 70rpx;
}

._wrap_number {
	text-align: right;
}

._wrap_price {
	color: #FF4C90;
	font-size: 22rpx;
}

._wrap_price text {
	font-size: 32rpx;
}

._wrap_num {
	color: #999999;
	line-height: 40rpx;
	font-size: 26rpx;
}

._buy_num {
	color: #111111;
	line-height: 56rpx;
	font-size: 28rpx;
}

._buy_chase {
	color: #2a2a2a;
	line-height: 56rpx;
}

._buynum_sub {
	width: 56rpx;
	height: 56rpx;
	border-radius: 50%;
	border: solid 2rpx #FF4C90;
	color: #FF4C90;
	line-height: 52rpx;
	text-align: center;
	font-size: 40rpx
}

._buynum_add {
	width: 56rpx;
	height: 56rpx;
	border-radius: 50%;
	border: solid 2rpx #FF4C90;
	color: #fff;
	line-height: 52rpx;
	text-align: center;
	background: #FF4C90;
	font-size: 40rpx
}

._buynum_nums ._buynum_num {
	margin: 0 40rpx;
	font-size: 32rpx;
	line-height: 56rpx;
}

._buy_note {
	font-size: 30rpx;
	line-height: 42rpx;
	color: #111111
}

.borderb {
	border-bottom: none;
}

._subBtn {
	position: fixed;
	bottom: 0;
	width: 100%;
	background: #ffffff;
	line-height: 98rpx;
}

._pay_price {
	text-align: right;
	width: 434rpx;
	padding-right: 30rpx;
}

._pay_now {
	background: #FF4C90;
	color: #ffffff;
	width: 286rpx;
	height: 102rpx;
	text-align: center;
	font-size: 32rpx;
}

._pay_price .textc {
	color: #FF4C90;
}

._pay_price .textc text {
	font-size: 34rpx;
}

.block {
	display: block;
}

.none {
	display: none;
}













/* 名字 电话 */

._subName_cant {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: rgba(0, 0, 0, .5);
	z-index: 2;
}

._subName {
	position: fixed;
	left: 0;
	right: 0;
	height: 400rpx;
	background: #ffffff;
	bottom: 0;
	padding-bottom: 120rpx;
	overflow-y: auto;
	z-index: 8;
}

._public_main {
	padding: 30rpx;
	line-height: 40rpx;
	font-size: 28rpx;
	color: #111111;
}

._public_title {
	line-height: 42rpx;
	font-size: 30rpx;
	text-align: center;
}

._public_titleimg {
	width: 30rpx;
	height: 30rpx;
}

._public_titleimg_image {
	width: 30rpx;
	height: 30rpx;
}

._public_item {
	border-bottom: 2rpx #c8c8c8 solid;
}

._subName_img {
	width: 40rpx;
	height: 40rpx;
	margin-right: 20rpx;
}

._subName_img_image {
	width: 40rpx;
	height: 40rpx;
}

._subName_text input {
	width: 500rpx;
}













/* 时间 */

._subTime_cant {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: rgba(0, 0, 0, .5);
	z-index: 2;
}

._subTime {
	position: fixed;
	left: 0;
	right: 0;
	width: 750rpx;
	height: 910rpx;
	background: #ffffff;
	bottom: 0;
	padding-bottom: 120rpx;
	overflow-y: auto;
	z-index: 9;
	transition-property: left;
	transition-duration: .5s;
	transition-timing-function: linear;
}













/*._subTime_title_data{width: 610rpx;}*/

._subTime_title_items {
	display: flex;
	width: 610rpx;
	white-space: nowrap;
	height: 100rpx;
}

._subTime_title_Item {
	display: inline-block;
	height: 96rpx;
	text-align: center;
	color: #111111;
	margin: 0 20rpx;
	width: 120rpx;
}

.active {
	color: #FF4C90;
	border-bottom: 4rpx solid #FF4C90;
}

.active .add {
	color: #FF4C90;
}

._subTime_title_day {
	font-size: 28rpx;
	line-height: 40rpx;
	margin-top: 18rpx;
}

._subTime_title_date {
	color: #999999;
	font-size: 22rpx;
	line-height: 28rpx;
}

._subTime_title {
	height: 100rpx;
	background: #f8f8f8
}

._subTime_title_days {
	width: 139rpx;
	border-left: #c8c8c8 solid 1rpx;
	height: 100rpx;
	text-align: center;
}

._subTime_title_daysimg {
	width: 36rpx;
	height: 36rpx;
	margin-left: 51rpx;
	margin-top: 16rpx;
}

._subTime_title_daysimg_image {
	width: 36rpx;
	height: 36rpx;
}

._subTime_title_text {
	margin-top: 10rpx;
}

._subTime_main {
	padding: 0 12rpx;
}

._subTime_chooseNo {
	border: solid 1rpx #c8c8c8;
	height: 88rpx;
	margin: 18rpx;
	text-align: center;
	position: relative;
}

._subTime_chooseNo ._active {
	position: absolute;
	right: 0;
	bottom: 0;
	width: 40rpx;
	height: 40rpx;
}

._subTime_chooseNo ._active ._activeimg {
	position: absolute;
	right: 0;
	bottom: 0;
	width: 40rpx;
	height: 40rpx;
}

._subTime_choosetext {
	font-size: 28rpx;
	line-height: 40rpx;
	padding-top: 10rpx;
}

._subTime_time_item {
	width: 170rpx;
	height: 78rpx;
	margin-right: 10rpx;
	margin-bottom: 10rpx;
	line-height: 40rpx;
	text-align: center;
	border: solid 1rpx #999999;
	font-size: 28rpx;
	background: #f7f7f7;
	position: relative;
}

.colorb {
	border: solid 1rpx #FF4C90;
	line-height: 78rpx;
	background: #fff;
	color: #FF4C90;
}

.act ._active {
	width: 40rpx;
	height: 40rpx;
	position: absolute;
	right: 0;
	bottom: 8rpx;
}

.act ._active ._activeimg {
	width: 40rpx;
	height: 40rpx;
}

._item_text {
	line-height: 30rpx;
	font-size: 22rpx;
}

._subTime_time_item:nth-child(4n+0) {
	margin-right: 0
}



._public_btn {
	width: 100%;
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	height: 98rpx;
	background: #FF4C90;
	color: #ffffff;
	font-size: 32rpx;
	line-height: 98rpx;
	text-align: center;
	letter-spacing: 24rpx;
	z-index: 10;
	border-radius: 0;
}

._subYears {
	position: fixed;
	left: 0;
	right: 0;
	width: 750rpx;
	height: 910rpx;
	background: #ffffff;
	bottom: 0;
	padding-bottom: 120rpx;
	overflow-y: auto;
	transition-property: left;
	transition-duration: .5s;
	z-index: 8;
	transition-timing-function: linear;
}

._serve_title {
	text-align: center;
}

._serve_titleimg {
	width: 22rpx;
	height: 32rpx;
}

._serve_titleimg_image {
	width: 22rpx;
	height: 32rpx;
}

._week_cant {
	display: flex;
	height: 100rpx;
	background: #f8f8f8;
	line-height: 100rpx;
	text-align: center;
}

._week_cant ._week {
	flex: 1;
}

._subYears_item {
	width: 107rpx;
	height: 120rpx;
	text-align: center;
}

.year {
	width: 750rpx;
	height: 100rpx;
	border-bottom: solid 1rpx #c8c8c8;
	border-top: solid 1rpx #c8c8c8;
	line-height: 100rpx;
	font-size: 34rpx;
	color: #111111
}

.isRight {
	left: 750rpx;
}

.isLeft {
	left: -750rpx;
}


#stepper {
	width: 286rpx;
	height: 62rpx;
	border: 1px solid #ccc;
	border-radius: 4rpx;
}

#stepper .stepper-text {
	width: 90rpx;
	line-height: 62rpx;
	text-align: center;
	float: left;
	font-size: 28rpx;
}

#stepper .stepper-input {
	width: 100rpx;
	height: 62rpx;
	float: left;
	text-align: center;
	font-size: 22rpx;
	border-left: 1px solid #ccc;
	border-right: 1px solid #ccc;
}

#stepper .normal {
	color: black;
	background: #ffffff
}

#stepper .disabled {
	color: #ccc;
	background: #f6f6f6
}

.reminder {
	width: 30rpx;
	height: 30rpx;
}

.cant-dis.display-flex {
	justify-content: space-between;
}

.cant-dis.display-flex.reminders {
	justify-content: flex-start;
	align-items: center;
}

.orderPrice {
	height: 180rpx;
}

.orderPrice .clear {
	height: 45rpx;
	line-height: 45rpx;
	font-size: 28rpx;
}

.integral {
	line-height: 62rpx;
}

.delivery {
	height: 88rpx;
	line-height: 88rpx;
	margin-bottom: 4rpx;
	font-size: 28rpx;
	color: #c3c3c3;
	border-bottom: #f0f0f0 2rpx solid;
}

.checkbox {
	justify-content: space-between;
}

.scoreShow {
	margin-right: 20rpx;
}
</style>