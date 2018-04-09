<template>
	<view class="container">
		<form @submit="formSubmit">
			<view class="clubCard_list">
				<view class="clubCard_list_title">姓名：</view>
				<view class="clubCard_list_contont">
					<input name="realName" placeholder="请输入您的姓名" />
				</view>
			</view>
			<view class="clubCard_list">
				<view class="clubCard_list_title">手机号码：</view>
				<view class="clubCard_list_contont">
					<input name="phone" placeholder="请输入您的手机号码" bindfocus="phone" />
				</view>
			</view>
			<view class="clubCard_list">
				<view class="clubCard_list_title">性别：</view>
				<view class="clubCard_list_contont">
					<radio-group name="sex">
						<radio value="男" checked="{{man}}" />
						<radio value="女" checked="{{!man}}" />
						<view class="gender display-flex box-s mt20 txt-c">
							<view class="{{man ? 'on man' :'man' }}" @tap="gender">男</view>
							<view class="{{!man ? 'on man' :'man' }}" @tap="gender">女</view>
						</view>
					</radio-group>
				</view>
			</view>
			<view class="clubCard_list">
				<view class="clubCard_list_title">所在城市：</view>
				<view class="clubCard_list_contont">
					<picker mode="region" @change="bindRegionChange" value="{{region}}">
						<view class="picker">
							<input name="region" placeholder="请选择城市" value="{{region[0] + ',' + region[1] + ',' + region[2]}}" />
						</view>
					</picker>
				</view>
			</view>
			<view class="clubCard_list">
				<view class="clubCard_list_title">生日：</view>
				<view class="clubCard_list_contont">
					<picker mode="date" value="{{time}}" start="1999-01-01" end="2999-12-12" @change="datePickerBindchange">
						<input name="time" placeholder="请选择日期" value="{{time}}" />
					</picker>
				</view>
			</view>
			<button formType="submit" class="draw txt-c ft32">领取到卡包</button>
		</form>
	</view>
</template>

<script>
	export default {
		config: {
			"navigationBarTitleText": "领取会员卡"
		},	
		data() {
			return {
					 realName:'',
					 phone:'',
					 province:'',
					 city:'',
					 district:'',
			     man:true,
			     time:'当前日期选择',
			     region: ['浙江省', '宁波市','鄞州区']			     			     
			}
		},
		onLoad: function() {	
			
		},
	
		methods: {			
			  gender(e) {
			     this.man = !this.man
			  },
			 datePickerBindchange: function (e) { 
			  this.time=e.detail.value 

			 },			  
			  bindRegionChange: function (e) {
			    this.region=e.detail.value
			  },	
			  formSubmit(e){
			  			
			  	var that = this
			  	that.realName = e.detail.value.realName
			  	that.phone = e.detail.value.phone
			  	var sex = e.detail.value.sex
			  	if(sex == "男"){
			  		that.sex = '1'
			  	}else{
			  		that.sex = '2'
			  	}
			  	that.province = this.region[0]
			  	that.city = this.region[1]
			  	that.district = this.region[2]
			  	that.time = e.detail.value.time		
					wx.request({
					  url: that.$root.apiServer + that.$root.appid + "/basic/api/user/userDetail",
					  data: {
					  	token:that.$root.globalData.token,
					  },
					  method:"POST",
					  header: {
					      'content-type': 'application/x-www-form-urlencoded'
					  },
					  success: function(res) {						  	
					  	var memCardStatus = res.data.data.memCardStatus
					  	if(memCardStatus == 2){
								wx.showToast({
								  title: '您已领取会员卡',
								  duration: 1000
								})						  		
					  	}else{	
						  	if(that.realName == ''){
									wx.showToast({
									  title: '请输入名字',
									  duration: 1000
									})	
									return
						  	}						  		
						  	if(that.phone == ''){
									wx.showToast({
									  title: '请输入手机号',
									  duration: 1000
									})
									return
						  	}	
						  	if(!/^1[3|4|5|7|8][0-9]{9}$/.test(that.phone)){								  		
									wx.showToast({
									  title: '请输入正确的手机号',
									  duration: 1000
									})	
									return
						  	}			  	
						  	if(that.time == '当前日期选择'){
									wx.showToast({
									  title: '请选择日期',
									  duration: 1000
									})	
									return
						  	}		
								wx.request({
								  url: that.$root.apiServer + that.$root.appid + "/basic/api/member/getMemberCard",
								  data: {
								  	token:that.$root.globalData.token,
										realName:that.realName,
										phone:that.phone,
										sex:that.sex,
										province:that.province,
										city:that.city,
										district:that.district,
										birthday:that.time
								  },
								  method:"POST",
								  header: {
								      'content-type': 'application/json'
								  },
								  success: function(res) {
								  	if(res.data.success == "true")
											wx.redirectTo({
												url: '../index/index'
											})								  				    
								  }
								})						  		
					  	}
					  }
					})								  	
		  	
			  }
		}
	}	
</script>

<style scoped>

/* pages/clubCard/clubCard.wxss */
.clubCard_list{width: 100%;height: 98rpx;line-height: 98rpx;padding: 0 24rpx;box-sizing: border-box;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;border-bottom: 1px solid #f8f8f8;background: #fff;display: flex;}
.clubCard_list_title{font-size: 28rpx;color: #333333;width: 140rpx;margin-right: 12rpx;}
.clubCard_list_contont input,.clubCard_inpit,.clubCard_list_contont{font-size: 26rpx;color: #999999;height: 98rpx;line-height: 98rpx;}
radio{width: 110rpx;height: 60rpx;}
radio-group{position: relative}
.gender{position: absolute;top: 0;left: 0;}
.man{width: 110rpx;height: 60rpx;line-height: 60rpx;border:1px solid #999999;background: #fff}
.man.on{ background: #FF4C90;border:1px solid #FF4C90;color: #fff}
.picker_header{height: 85rpx;line-height: 85rpx;background: #fff;width: 94.1%;margin: 0 auto ;justify-content: space-between;border-bottom: 1px dashed #eeeeee;}
.confirm{color: #FF4C90;}

.draw{background: #FF4C90;border-radius: 100rpx;width: 690rpx;height: 88rpx;margin: 0 auto;margin-top: 160rpx;
line-height: 88rpx;color: #fff;}
.pos-f{z-index: 88;background: #dddddd}
</style>