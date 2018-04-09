<template>
    <view>
	<view class="result">
	    <view class="result_top">
	        <image class="result_top_left" src="{{goodsImg}}" @tap="shopDetails"></image>
	        <view class="result_top_right">
	            <view class="result_shopName">{{goodsName}}</view>
	            <view class="result_shopMoney">
	                <text class="icon">￥</text>
	                <text class="money">{{groupPrice}}</text>
	                <text class="oldmoney">￥{{marketPrice}}</text>
	            </view>
	            <view class="result_shopTagging">{{number}}人团 ∙ 拼团立省{{marketPrice-groupPrice}}元</view>
	        </view>
	        <image wx:if="{{statue == 1}}" class="posit_img" src="http://image.vdongchina.com/M00/03/E5/ZSUkmVnxTAGEOp--AAAAACYmRZM895.png"></image>
            <image wx:if="{{statue == 2}}" class="posit_img" src="http://image.vdongchina.com/M00/03/E5/ZSUkmVnxS8CEAfB_AAAAAAy1b9w059.png"></image>

	    </view>
	    <view class="result_middle">
	        <view class="result_middle_title" wx:if="{{statue == 0}}">还差<text class="text">{{disparity}}</text>人，快喊小伙伴一起拼团吧</view>
            <view class="result_middle_title" wx:if="{{isexit&&statue == 1}}">已有<text class="text">{{number}}</text>人参加，<text class="green">拼团成功</text></view>
            <view class="result_middle_title" wx:if="{{!isexit&&statue == 1}}">已有<text class="text">{{number}}</text>人参加，您来晚一步</view>
            <view class="result_middle_title" wx:if="{{isexit&&statue == 2}}">拼团失败，款项已经原路返回</view>
            <view class="result_middle_title" wx:if="{{!isexit&&statue == 2}}">拼团未成功</view>
	        <!-- <view class="result_middle_time" wx:if="{{clock == '已经截止'}}">{{clock}}</view> -->
            <view class="result_middle_time" wx:if="{{statue == 0}}">仅剩<text class="text">{{clock}}</text>失效</view>
	        <view class="result_middle_header">
                <view class="header_box" wx:for="{{member}}" wx:key="member">
                    <image class="image" src="{{item.pic}}"></image>
                    <text class="text" wx:if="{{item.leader}}">团长</text>
                </view>
	        </view>
	        <button class="button" wx:if="{{isexit&&statue == 1}}" @tap="details">查看订单详情</button>
            <button class="button" wx:if="{{isexit&&statue == 2}}" @tap="back(shopId)">再次一键开团</button>
            <button class="button" wx:if="{{!isexit&&statue == 2}}" @tap="back(shopId)">我来开这个团</button>
            <button class="button" wx:if="{{!isexit&&statue == 0}}" @tap="join(shopId)">一键参团</button>
            <!-- <button class="button" wx:if="{{!isexit&&statue == 0}}" @tap="">一键参团</button> -->
	        <button class="share" open-type="share" wx:if="{{statue == 0}}"><image class="image" src="http://image.vdongchina.com/M00/03/E5/ZSUkmVnxTCGEO-C2AAAAAL5Qakg407.png"></image>分享给微信好友</button>

	    </view>
	    <view class="rule">
	            <text class="rule_titile">拼团规则</text>
	            <view class="rule_infor" @tap="rule">
	                <text class="rule_details">拼团有效期是自开团时刻起的24小时内</text>
	                <text class="goInfor">详细规则 ></text>
	            </view>
	    </view>
	</view>
    <sku-selector
        :display="display"
        :state="states"
        :join="join"
        :fgroupId="fgroupId"
        :shop-list="shopDetail"></sku-selector>
    </view>
</template>

<script>
import skuSelector from '../../components/SkuSelectored/SkuSelectored' 
const util = require('../../utils/util.js')
export default {
    components: {
        skuSelector: skuSelector
    },
    config: {
        navigationBarTitleText: '拼团详情'
    },
    data() {
        return {
            display: false,
            isCar: 0,
            shopDetail:{},
            goodsName:'',
            goodsImg:'',
            groupPrice:599,
            marketPrice:699,
            number:2,
            statue:0,//开团状态  -1 -等待开团 0-拼团中  1-成功  2-失效
            states:1,//1是开团，0 是普通购买，
            member:[],
            disparity:1,
            totalms: 0,
            clock: 0,
            join:0,
            fgroupId:0,//团id
            shopId:0,//商品ID
            ordId:0,//订单id
            isexit:true//判断时候在该团里true在  false不在
        }
    },
    onLoad (options) {
        
        console.log(options)
        this.fgroupId = options.fgroupId;//拼团ID
        this.ordId = options.ordId;//订单id
        // this.request(options.fgroupId)
        this.share(options.fgroupId)
        // if(options.share == 1){//分享入口
        //     this.share(options.fgroupId)
        // }else{
        //     this.request(options.fgroupId)
        // }
    },
    async onShow() {
        clearInterval(this.intervarID);
        await this.$root.login()
        wx.getUserInfo({
            success: (res) => {
                var userInfo = res.userInfo
                var nickName = userInfo.nickName
                var avatarUrl = userInfo.avatarUrl
                var gender = userInfo.gender //性别 0：未知、1：男、2：女
                var province = userInfo.province
                var city = userInfo.city
                var country = userInfo.country
                this.avatarUrl = userInfo.avatarUrl
            }
        })
    },
    onShareAppMessage: function (res) {
        return {
            title: '[仅剩'+this.disparity+'名]快来'+this.groupPrice+'元拼'+this.goodsName,
            path: '/pages/t_result/t_result?fgroupId='+this.fgroupId+'&share=1&ordId=0',
            
        }
    },
    methods: {
        countDown() {
            var that = this;
            var leftTime = that.totalms;
            var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时 
            var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟 
            var seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数 
                  // days = checkTime(days);
            hours = that.fill_zero_prefix(hours);
            minutes = that.fill_zero_prefix(minutes);
            seconds = that.fill_zero_prefix(seconds);
            that.clock = hours + ":" + minutes + ":" + seconds
            that.totalms = leftTime-1000;
                  
            that.intervarID = setInterval(function () {
                  var leftTime = that.totalms;
                  var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时 
                  var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟 
                  var seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数 
                  // days = checkTime(days);
                  hours = that.fill_zero_prefix(hours);
                  minutes = that.fill_zero_prefix(minutes);
                  seconds = that.fill_zero_prefix(seconds);
                  that.clock = hours + ":" + minutes + ":" + seconds
                  that.totalms = leftTime-1000;
                  
                  if(leftTime<0 && that.status != 1){
                    clearInterval(that.intervarID);
                    that.statue = 2
                  }
            }, 1000)
        },
        // 位数不足补零
        fill_zero_prefix(num) {
            return num < 10 ? "0" + num : num
        },
        join(){//别人一键参团
            this.display = true
            this.join = 1;
            this.states = 1
        },
        shopDetails(){//去商品详情页面
            wx.redirectTo({
                url: '../t_details/t_details?id='+this.shopId
            })
        },
        details(){//去订单详情页
            console.log('ordId')
            console.log(this.ordId)
            if(this.ordId){
                wx.redirectTo({
                    url: '../orderShip/orderShip?type=1&ordId=' + this.ordId,
                })
            }else{
                wx.redirectTo({
                    url: '../t_grouplist/t_grouplist',
                })

            }
        },
        back(id){
            wx.redirectTo({
                url: '../t_details/t_details?id='+id
            })
        },
        request(fgroupId){//开团
            var that = this;
            var add = {pic:'http://image.vdongchina.com/M00/03/E5/ZSUkmVnxS2WED8D6AAAAAJ7qd4s451.png'}
            wx.request({
                url: that.$root.apiServer+that.$root.appid + '/basic/fgroup/applet/shareFGroup?fgroupId='+fgroupId+'&openid='+getApp().globalData.openid,
                method: 'POST',
                header: {'content-type': 'application/json'},
                success: function (res) { 
                    console.log('returnFGroup拼团详情开团')
                    console.log(res)
                    var member = res.data.obj;
                    that.totalms = util.dateFormat(member[0].ptTime)+86400000 - util.dateFormat(member[0].Systemtime)
                    that.countDown()  //开启倒计时 
                    
                    that.statue = member[0].statue;
                    var disparity = member[0].shortNum;//还差多少人
                    for(var i =0;i<disparity; i++){
                        member.push(add)
                    }
                    member[0].leader = true;
                    that.disparity = disparity;
                    that.shopId = member[0].shopId;
                    that.goodsName = member[0].shopName;
                    that.groupPrice = member[0].groupPrice;
                    that.marketPrice = member[0].marketPrice;
                    member[0].titlePic = getApp().globalData.imgUrl + member[0].titlePic;
                    that.member = member;
                    that.goodsImg = member[0].titlePic;
                    that.number = member.length;
                    var shopDetail = member[0];
                    shopDetail.id = shopDetail.shopId;
                    that.shopDetail = shopDetail;
                }
            })
        },
        share(fgroupId){//分享进入
            var that = this;
            var add = {pic:'http://image.vdongchina.com/M00/03/E5/ZSUkmVnxS2WED8D6AAAAAJ7qd4s451.png'}
            wx.request({
                url: that.$root.apiServer+that.$root.appid + '/basic/fgroup/applet/shareFGroup?fgroupId='+fgroupId+'&openid='+getApp().globalData.openid,
                method: 'POST',
                header: {'content-type': 'application/json'},
                success: function (res) {
                    console.log('shareFGroup参团')
                    console.log(res)
                    var member = res.data.obj;
                    that.totalms = util.dateFormat(member[0].ptTime)+86400000 - util.dateFormat(member[0].Systemtime)
                    that.countDown();  //开启倒计时 
                    for(let i in member){
                        if(member[i].ordId != 0){
                            that.ordId = member[i].ordId
                            console.log('shareFGroup参团de ordId')
                            console.log(member[i].ordId)
                        }
                    }
                    that.statue = member[0].statue;
                    var disparity = member[0].shortNum;//还差多少人

                    for(var i =0;i<disparity; i++){

                        member.push(add)
                    }
                    member[0].leader = true;
                    that.disparity = disparity;
                    that.shopId = member[0].shopId;
                    that.goodsName = member[0].shopName;
                    that.groupPrice = member[0].groupPrice;
                    that.marketPrice = member[0].marketPrice;
                    member[0].titlePic = getApp().globalData.imgUrl + member[0].titlePic;
                    that.member = member;
                    that.goodsImg = member[0].titlePic;
                    that.number = member.length;
                    var shopDetail = member[0];
                    shopDetail.id = shopDetail.shopId;
                    that.shopDetail = shopDetail;
                    var judge = false;//判断
                    for(let i in member){
                        if(member[i].isexit == 'true'){
                            judge = true
                        }
                    }
                    if(judge){
                        that.isexit = true
                    }else{
                        that.isexit = false
                    }
                }
            })
        },
        rule(){
            wx.navigateTo({
                url: '../t_rule/t_rule'
            })
        }
    }
}
</script>

<style>
page{width: 100%; height:100%; background-color:#f2f2f2;}
.result{width: 100%; height:100%;}
.result_top{width:100%; padding:20rpx 30rpx; box-sizing:border-box; background-color:#fff; margin-bottom:16rpx; position:relative; display:inline-flex;}
.result_top_left{width:246rpx; height:246rpx; float:left;}
.posit_img{width:160rpx; height:160rpx; position:absolute; right:80rpx; bottom:30rpx; z-index:1;}
.result_top_right{width: calc(100% - 246rpx); height:246rpx; padding-left:20rpx; box-sizing:border-box; float:left; position:relative;}
.result_shopName{width:100%; font-size: 28rpx; color: #222222; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;}
.result_shopMoney{position:absolute; left:20rpx; bottom:40rpx;}
.icon{font-size: 30rpx; color: #DD2727;}
.money{font-size: 40rpx; color: #DD2727;}
.oldmoney{font-size: 24rpx; color: #3F3F3F; text-decoration:line-through; padding-left:20rpx;}
.result_shopTagging{font-size: 24rpx; color: #DD2727; position:absolute; left:20rpx; bottom:0;}
.result_middle{width:100%; background-color:#fff; padding:44rpx 30rpx; box-sizing:border-box; margin-bottom:16rpx;}
.result_middle_title{width:100%; text-align:center; font-size: 30rpx; color: #333333; font-family: SFUIText-Medium;}
.result_middle_title .text{font-size: 40rpx; color: #dd2727;}
.result_middle_title .success{font-size: 30rpx; color: #09BB07;}
.result_middle_time{width:100%; text-align:center; font-size: 22rpx; color: #999999; line-height:50rpx;}
.result_middle_time .text{color: #dd2727;}
.result_middle_header{width:100%; text-align:center;padding-top:18rpx;}
.result_middle_header .header_box{position:relative; display:inline-block; padding-bottom:10rpx;padding-top:10rpx;}
.result_middle_header .header_box .noimg{width:98rpx; height:98rpx; border-radius:50%; margin:0 12rpx; font-size:26rpx;color:#ccc;text-align:center;}
.result_middle_header .image{width:98rpx; height:98rpx; border-radius:50%; margin:0 12rpx;}
.result_middle_header .text{width:56rpx; height:26rpx; border-radius:14rpx; text-align:center; line-height:26rpx; font-size: 20rpx; color: #FFFFFF; letter-spacing: 0; background-color:#FFAB33; position:absolute; left:50%; bottom:10rpx; z-index:9; margin-left:-28rpx;}
.result_middle .button{width:100%; background: #DD2727; border-radius: 8rpx; line-height:94rpx; text-align:center; color:#fff; margin-top:20rpx; font-size:36rpx;}
.result_middle .share{width:100%; background: #1AAD19; border-radius: 8rpx; line-height:94rpx; text-align:center; color:#fff; margin-top:20rpx;}
.share .image{width:48rpx; height:48rpx; vertical-align:middle; margin-right:10rpx;}
.rule{background: #FFFFFF; margin-bottom: 16rpx}
.rule_titile{width: 100%; line-height: 86rpx; box-shadow: inset 0 -1px 0 0 #E5E5E5; font-size: 28rpx; color: #333333; letter-spacing: 0; display: block; padding: 0 30rpx; box-sizing: border-box}
.rule_infor{width: 100%; height: 86rpx; padding: 0 30rpx; box-sizing: border-box}
.rule_details{float: left; font-size: 28rpx; color: #999999; letter-spacing: 0; line-height: 86rpx}
.goInfor{float: right; font-size: 28rpx; color: #999999; letter-spacing: 0; line-height: 86rpx}
.green{color:#09bb07;}
</style>