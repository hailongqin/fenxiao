<template>
<view class="body">
    <!--pages/store/store.wxml-->
    <view class="topLine"></view>
    <view class="container">
        <view class="store_top bmg">
            <view class="store_logo">
                <image class="store_logo_img" src="{{'http://image.vdongchina.com/'+logo}}"></image>
            </view>
            <view class="store_name">{{name}}</view>
        </view>
        <view class="store_info bmg margint">
            <view class="store_info_title">基本信息</view>
            <view class="store_info_items">
                <view class="store_info_item">
                    <view class="store_info_label">门店地址</view>
                    <view class="store_info_txt">{{address}}</view>
                    <view class="store_info_btn" @tap="handler">
                        <view><image  class="store_info_btnImg" src="http://image.vdongchina.com/M00/03/2A/ZSUkmVnewuaEAgYvAAAAADa1yvs029.png"></image></view>
                        <view>位置</view>
                    </view>
                </view>
                <view class="store_info_item">
                    <view class="store_info_label">联系电话</view>
                    <view class="store_info_txt">{{phone}}</view>
                    <view class="store_info_btn" @tap="makeCall">
                        <view><image  class="store_info_btnImg" src="http://image.vdongchina.com/M00/03/39/ZSUkmVngESiEbjiCAAAAAFe96EA370.png"></image></view>
                        <view>拨号</view>                                               
                    </view>
                </view>
                <view class="store_info_item">
                    <view class="store_info_label">联系人</view>
                    <view class="store_info_txt">{{contact}}</view>
                </view>
                <view class="store_info_item">
                    <view class="store_info_label">营业时间</view>
                    <view class="store_info_txt">{{openTime}}-{{closeTime}}</view>
                </view>
            </view>
        </view>
        <view class="recommend margint bmg">
            <view class="recommend_title">商户介绍</view>
            <view>{{intro}}</view>
        </view>
    </view>
</view>
</template>

<script>
export default {
    config: {
        "navigationBarTitleText": "门店详情"
    },
		data() {
			return {
                logo:'',
                name:'',
                address:'',
                phone:'',
                openTime:'',
                closeTime:'',
                intro:'',
                contact:''
			}
		},    
    onLoad(){
		var that = this	    	
		wx.request({
		    url: this.$root.apiServer + this.$root.appid + '/basic/api/store/defaultStoreInfo',
		    data: {  	
		    },
		    method:"POST",
		    header: {
		      'content-type': 'application/x-www-form-urlencoded'
		    },
		    success: function(res) {
                that.logo=res.data.data.logo
                that.name=res.data.data.name
                that.address=res.data.data.address
                that.contact=res.data.data.contact
                that.phone=res.data.data.phone
                that.openTime=res.data.data.openTime
                that.closeTime=res.data.data.closeTime
                that.intro=res.data.data.intro
                that.lattitude = res.data.data.lattitude
                that.longitude=res.data.data.longitude
                that.contact=res.data.data.contact
                console.log(res)
		    }
		})	
    },
    methods: {
        handler () {
            var that = this
            wx.openLocation({
                longitude:that.longitude,
                latitude:that.lattitude,
                address:that.address,
            })
        },        
        makeCall() {
            wx.makePhoneCall({
                phoneNumber: this.phone
            })
        }			
	}
}
</script>

<style scoped>
.body{background: #f9f9f9}
page{background: #f9f9f9}
.store_top{padding: 40rpx}
.store_logo{width: 150rpx;height: 150rpx;border-radius: 50%;overflow: hidden;margin:0 auto;}
.store_logo_img{width: 150rpx;height: 150rpx}
.store_name{text-align: center;font-size: 32rpx;color:#333;margin-top: 30rpx}
.store_info{padding: 24rpx}
.store_info_title{font-size: 28rpx;color: #333}
.store_info_items{padding-top: 20rpx;font-size: 28rpx;line-height: 60rpx}
.store_info_item{padding: 20rpx 0;display: flex;}
.store_info_label{flex: 1;flex: 0 0 20%;color: #999999}
.store_info_txt{flex: 1;color: #333}
.store_info_btn{flex: 1;flex: 0 0 18%;color: #666;border: #eee solid 2rpx;display:flex;justify-content:space-around;align-items:center;border-radius: 4rpx;height: 60rpx}
.store_info_btnImg{width: 26rpx;height: 26rpx;}
.recommend{padding:24rpx}
.recommend_title{line-height: 80rpx;font-size: 28rpx;color: #333}
</style>

