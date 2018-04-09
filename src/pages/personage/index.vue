<template>
<view>
<view class="header ">
    <image class="bg_image" src="../../img/bg.png"></image>
    <view class="user_image">
        <view class="circles">
            <view class="circle">
                <image class="user_image_image" src="{{userInfo.avatarUrl}}"></image>
            </view>
        </view>
        <view class="ft36 white w-100 user_name">{{userInfo.nickName}}</view>
    </view>

</view>

<view class="order w-100 bg-wt plr30 box-s mb20">
    <view class="display-flex">
        <view class="w-100">
            <view class="w-100">
                <image class="order_image" src="http://image.vdongchina.com/M00/03/39/ZSUkmVngDveEBgg7AAAAAJBFQME729.png"></image>
            </view>
            <view class="w-100 ft30 txt-c">全部订单</view>
        </view>
        <view class="w-100">
            <view class="w-100">
                <image class="order_image" src="http://image.vdongchina.com/M00/03/39/ZSUkmVngEDaESDlQAAAAABl99Ig852.png"></image>
            </view>
            <view class="w-100  ft30 txt-c">待付款</view>
        </view>
        <view class="w-100">
            <view class="w-100">
                <image class="order_image" src="http://image.vdongchina.com/M00/03/2E/ZSUkmVnfB7WEJg8rAAAAAONKxOg449.png"></image>
            </view>
            <view class="w-100  ft30 txt-c">待发货</view>
        </view>
        <view class="w-100">
            <view class="w-100">
                <image class="order_image" src="http://image.vdongchina.com/M00/03/3A/ZSUkmVngGRCEYtfEAAAAAJfPzJg829.png"></image>
            </view>
            <view class="w-100 ft30 txt-c">待收货</view>
        </view>
        <view class="w-100">
            <view class="w-100">
                <image class="order_image" src="http://image.vdongchina.com/M00/03/3A/ZSUkmVngGheEQt0sAAAAAPB1m8E911.png"></image>
            </view>
            <view class="w-100 ft30 txt-c">全部订单</view>
        </view>
    </view>
</view>

<view class="w-100">
    <view class="w-100 plr30 box-s ovfl nav_list bg-wt">
        <navigator url="../mycollect/mycollect" class="w-100" open-type="navigate">
            <view class="nav ovfl fl-l">
                <view class="collect_image fl-l ">
                    <image class="collect_image_image" src="http://image.vdongchina.com/M00/03/31/ZSUkmVnfIRKERgbaAAAAABZuDlI650.png"></image>
                </view>
                <view class="collect_title fl-l ml20">我的收藏</view>
            </view>
            <view class="fl-r img_right">
                <image class="img_right_image" src="http://image.vdongchina.com/M00/03/30/ZSUkmVnfFYmES3VsAAAAAP3VwUA304.png"></image>
            </view>
        </navigator>
    </view>
    <view class="w-100 plr30 box-s ovfl nav_list bg-wt">
        <navigator url="../watch_history/watch_history" class="w-100" open-type="navigate">
            <view class="nav ovfl fl-l">
                <view class="collect_image fl-l ">
                    <image class="collect_image_image" src="../../img/set.png"></image>
                </view>
                <view class="collect_title fl-l ml20">观看历史</view>
            </view>
            <view class="fl-r img_right">
                <image class="img_right_image" src="http://image.vdongchina.com/M00/03/30/ZSUkmVnfFYmES3VsAAAAAP3VwUA304.png"></image>
            </view>
        </navigator>
    </view>
</view>
</view>
</template>

<script>
    export default {
		config: {
			"navigationBarTitleText": "个人中心"
		},	
		data() {
			return {
                userInfo:{
        nickName:"鱼七",
        avatarUrl:"../../img/bg.png"
    }
			}
		},

		methods: {

		}
	}	
</script>
<style scoped>
    /* pages/personage/personage.wxss */
.page{
    background: #F0F0F0;
}
.bg_image {
  width: 750rpx;
  height: 400rpx;
  position: absolute;
}
.user_image {
  width: 750rpx;
  height: 400rpx;
  position: relative;
  text-align: center;
}
.user_image_image{width: 180rpx;height: 180rpx;border-radius: 50%;margin-top: 12rpx;margin-bottom: 12rpx;}
.circles{
    position: absolute;
    top: 62rpx;
    width: 230rpx;
    height: 230rpx;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 50%;
    left: clac((750rpx / 2) - (230rpx / 2));

    left:  -webkit-calc((750rpx / 2) - (230rpx / 2));
}
.circle{
     position: absolute;
    width: 204rpx;
    height: 204rpx;
    top: 14rpx;
     left: clac((230rpx / 2) - (204rpx / 2));
    left:  -webkit-calc((230rpx / 2) - (204rpx / 2));
    background: rgba(255, 255, 255, 0.4);
    border-radius: 50%;
}
.user_name{
    font-size: 32rpx;
color: #000000;
/* text-shadow: 2px 2px 4px rgba(0,0,0,0.50); */
height: 45rpx;
line-height: 45rpx;
padding-top: 298rpx;
}
.collect_image {
    /*margin-top: 24rpx;*/

    width: 30rpx;
    height: 98rpx;
    line-height: 98rpx;
    box-sizing: border-box;
}
.collect_image_image{
    padding-top: calc(49rpx - 15rpx);
    width: 30rpx;
    height: 30rpx;
}
.collect_title{
    font-size: 30rpx;
    color: #111111;
    height: 98rpx;
    line-height: 98rpx;
}
.nav{
    height: 98rpx;
    line-height: 98rpx;
    justify-content: flex-start;
    align-items:center;
}
.img_right{
    margin-top: 34rpx;
}
.img_right_image{
    width: 16rpx;
    height: 32rpx;
}
.set_image_image{
     padding-top: 30rpx;
    width: 40rpx;
    height: 38rpx;
}
.nav_list{margin-bottom: 1px;}



/*  */
.order{
 padding-top: 20rpx;
 padding-bottom: 20rpx;
}
.order_image{
    width: 56rpx;
    height: 56rpx;
    display: block;
    margin: 0 auto;
   
}


/*commonCSS*/

.block {
  display: block;
}

.txt-c {
  text-align: center;
}

.ft24 {
  font-size: 24rpx;
}

.ft26 {
  font-size: 26rpx;
}

.fl-r {
  float: right;
}
.fl-l {
  float: left;
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

.mr30 {
  margin-right: 30rpx;
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

.tc {
  text-align: center;
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

.c9 {
  color: #999;
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
.display-flex {
  display: flex !important;
  display: -webkit-box !important;
  display: -moz-box !important;
  display: -ms-flexbox !important;
  display: -webkit-flex !important;
}

.display-flex-1 {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
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

.w-100 {
  width: 100%;
}

view, text, image, navigator, checkbox, label {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
}

.pb-120 {
  padding-bottom: 120rpx;
}

.bg-wt {
  background-color: #fff;
}

</style>