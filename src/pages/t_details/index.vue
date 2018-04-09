<template>
	<scroll-view class="detail" scroll-y="{{isScroll}}">
		<swiper class="detail_swiper" indicator-dots="{{indicatorDots}}" indicator-color="{{indicatorColor}}" autoplay="{{autoplay}}" interval="{{interval}}" duration="{{duration}}" circular="{{circular}}" data-v-gDpGeToz="">
			<swiper-item data-v-gDpGeToz="" wx:for="{{shopList.picarry}}" wx:key="index">
		      	<image src="{{item}}" class="slide-image" width="355" height="150" data-v-gDpGeToz=""/>
		    </swiper-item>
		</swiper>
        <view class="swiper_infor">
            <view class="swiper_infor_one">
                <view class="infor_money">￥<text>{{shopList.groupPrice}}</text></view>
                <view class="infor_old">
                    <view class="oldMoney">¥ {{shopList.marketPrice}}</view>
                    <view class="infor_news">已团{{virtualNum}}件 ∙ {{shopList.groupNum}}人团</view>
                </view>
                <button class="share" open-type="share"><image class="image" src="http://image.vdongchina.com/M00/03/E5/ZSUkmVnxTMKEQfYjAAAAAFJaLhA998.png"></image></button>
                
            </view>
            <view class="swiper_infor_name">
                {{shopList.name}}
            </view>
        </view>

        <view class="rule">
            <text class="rule_titile">拼团规则</text>
            <view class="rule_infor">
                <text class="rule_details">拼团有效期是自开团时刻起的24小时内</text>
                <text class="goInfor" @tap="rule">详细规则 ></text>
            </view>
        </view>

        <view class="ongoing" wx:if="{{shopList.isgroup == '1'}}">
            <view class="ongoing_titile">
                <text class="ongoing_num">{{ptNum}}人正在开团</text>
                <text class="ongoing_more" @tap="show" wx:if="{{ptList.length}}">查看更多 ></text>
            </view>
            <view class="ongoing_box" wx:if="{{ptList.length}}">
                <view class="group" wx:for="{{indexShow}}" wx:key="index" @tap="ptDetail(item.id)">
                    <image src="{{item.ptPic}}"></image>
                    <text class="userName">{{item.pt_name}}</text>
                    <view class="group_time">
                        <view class="surplus">还差{{item.shortNum}}人成团</view>
                        <!-- <view class="countDown">剩余{{item.countDown}}</view> -->
                    </view>
                    <view class="group_right">去参团</view>
                </view>
            </view>
            <view class="noData" wx:else>暂时没有人开团，一键开团</view>
        </view>

        
        <!--商品详情  -->
        <view class="details">
            <view class="details_title">商品详情</view>
            <view class="dat_main"><rich-text nodes="{{shopList.description}}"></rich-text></view>
        </view>
        <!--底部  -->
        <goods-bottom
            :shop-list="shopList"></goods-bottom>
        <view class="bottomseat"></view>
        <!--隐藏  -->
        <view class="hidden" wx:if="{{hidden}}">
            <view class="background" @tap="hidden"></view>
            <view class="hidden_box" style="bottom: -720rpx;" animation="{{animationData}}">
                <view class="grouping">
                    <view class="grouping_title">
                        <text class="grouping_text">正在开团</text>
                        <text class="grouping_hidden" @tap="hidden">收起 ></text>
                    </view>

                    <view class="group" data-v-MKIPDiHR="" wx:for="{{ptList}}" wx:key="index">
                        <image src="{{item.ptPic}}" data-v-MKIPDiHR=""/>
                        <text class="userName" data-v-MKIPDiHR="">{{item.pt_name}}</text>
                        <view class="group_time" data-v-MKIPDiHR="">
                            <view class="surplus" data-v-MKIPDiHR="">还差{{item.shortNum}}人成团</view>
                            <!-- <view wx:if="{{item.countDown =='已经截止'}}" class="countDown" data-v-MKIPDiHR="">{{item.countDown}}</view> -->
                            <!-- <view wx:else class="countDown" data-v-MKIPDiHR="">剩余{{item.countDown}}</view> -->
                        </view>
                        <view class="group_right" data-v-MKIPDiHR="" @tap="ptDetail(item.id)">去参团</view>
                    </view>
                    
                    <view class="group_bottom">
                        <text class="group_bottom_text" wx:if="{{bText}}">{{ptList.length>=5?'最多显示5人':''}}</text>
                    </view>
                </view>
            </view>
        </view>
	</scroll-view>
</template>

<script>
import goodsBottom from "../../components/GoodsBottomBarT/GoodsBottomBarT" 
export default {
	config: {
    	"navigationBarTitleText": "商品详情"
	},
	data () {
		return {
			indicatorDots:true,//是否显示面板指示点
			indicatorColor:'rgba(0, 0, 0, .3)',//当前选中的指示点颜色
			autoplay:false,//是否自动切换
			interval:5000,//自动切换时间间隔
			duration:500,
			circular:false,
            nodes:'',//详情
            hidden: false,
            bText:true,
            animationData: {},
            isScroll: true,
            ptList:{},
            shopList:{},
            totalms: 0,
            id:0,
            len:0,
            ptNum:0,
            virtualNum:0,
            indexShow:{}
		}
	},
	onLoad (options) {
        var that = this;
        this.id = options.id
        wx.request({
            url: that.$root.apiServer+that.$root.appid + '/basic/fgroup/applet/detailFGroup?id='+options.id,
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                console.log('detailFGroup')
                console.log(res)
                var systemTime = res.data.obj.systemTime;//系统时间
                var ptList = res.data.obj.ptList;//已开的团
                var shopList = res.data.obj.shopList;
                that.virtualNum = shopList.virtualNum;
                that.ptNum = res.data.obj.ptNum;
                if(ptList.length>0){
                    // that.ptNum = ptList[0].ptNum
                    if(ptList.length >5){//已开的团
                        var ptList = res.data.obj.ptList.slice(0,6);
                    }else{
                        var ptList = res.data.obj.ptList;
                    }
                    for(let i in ptList){
                        var ptListimg = ptList[i].picarry.split(",");
                        ptList[i].picarry = getApp().globalData.imgUrl + ptListimg[0];
                    }
                    var indexShow = [];
                    var len = ptList.length;
                    if(len>=2){
                        indexShow[0] = ptList[len-1];
                        indexShow[1] = ptList[len-2]
                    }else{
                        indexShow = ptList
                    }
                    that.indexShow = indexShow;
                    that.ptList = ptList;//拼团列表
                }else{
                    that.ptList = [];//拼团列表
                }
                
                
                // that.countDowns();  //开启倒计时

                var picarry = shopList.picarry.split(",");
                for(let i in picarry){
                    picarry[i] = getApp().globalData.imgUrl +  picarry[i]
                }

                shopList.picarry = picarry;
                shopList.titlePic = getApp().globalData.imgUrl + shopList.titlePic
                
                that.shopList = shopList;//商品详情
                
            }
        })
        
	},
    onShareAppMessage: function (res) {
        var shopList = this.shopList
        return {
            title: '[' + shopList.groupNum + '人团]快来' + shopList.groupPrice + '元拼--' + this.shopList.name,
            path: '/pages/t_details/t_details?id='+this.id
        }
    },
    methods: {
        show(){
            this.hidden = true;
            var animation = wx.createAnimation({})
            this.animation = animation
            animation.bottom(0).step()
            this.setData({
                animationData: animation.export(),
                isScroll: false
            })
        },
        hidden(){
            this.hidden = false;
            this.isScroll = true;
        },
        rule(){
            wx.navigateTo({
                url: '../t_rule/t_rule'
            })
        },
        ptDetail(id){
            console.log(id)
            wx.navigateTo({
                url: '../t_result/t_result?fgroupId='+id+'&share=1',
            })
            
        }
    },
    components: {
        goodsBottom:goodsBottom
    }
}	
</script>

<style scoped>
page{background-color: #f2f2f2; font-family: PingFangSC-Regular; width:100%; height:100%; overflow-y:hidden;}
.detail{width: 100%; background-color: #f2f2f2; height:100%; position:relative; z-index:0;}
.detail .detail_swiper{width: 100%; height: 750rpx}
.slide-image{width: 100%; height: 750rpx}
.swiper_infor{width:100%; height:250rpx; background-color:#fff; padding:36rpx 30rpx; box-sizing:border-box; position:relative;}
.swiper_infor_one{width:100%;}
.infor_money{float:left; font-family: SFUIDisplay-Medium; font-size: 48rpx; color: #DD2727; letter-spacing: 0; line-height: 72rpx;}
.infor_money text{font-size: 72rpx;}
.infor_old{float:left; padding-left:20rpx;}
.oldMoney{font-family: SFUIDisplay-Medium; font-size: 24rpx; color: #999999; letter-spacing: 0; line-height: 40rpx; text-decoration:line-through;}
.infor_news{font-size: 24rpx; color: #888888; letter-spacing: 0; line-height: 24rpx;}
.share{float:right; width:64rpx; height:64rpx; background-color:#fff; padding:0; border-radius:0;}
.share .image{width:62rpx; height:62rpx;}
.swiper_infor_name{width:100%; padding:0 30rpx; box-sizing:border-box; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden; position:absolute; bottom:36rpx; left:0; font-size: 32rpx; color: #000000; letter-spacing: 0; line-height: 40rpx;}
.rule{background: #FFFFFF; margin-top:16rpx;}
.rule_titile{width:100%; line-height:86rpx; box-shadow: inset 0 -1px 0 0 #E5E5E5; font-size: 28rpx; color: #333333; letter-spacing: 0; display:block; padding:0 30rpx; box-sizing:border-box;}
.rule_infor{width:100%; height:86rpx; padding:0 30rpx; box-sizing:border-box;}
.rule_details{float:left; font-size: 28rpx; color: #999999; letter-spacing: 0; line-height:86rpx;}
.goInfor{float:right; font-size: 28rpx; color: #999999; letter-spacing: 0; line-height:86rpx;}
.ongoing{width:100%; background-color:#fff; margin-top:16rpx;}
.ongoing_titile{width:100%; height:86rpx;}
.ongoing_num{font-size: 28rpx; color: #151515; letter-spacing: 0; float:left; line-height:86rpx; padding-left:30rpx;}
.ongoing_more{font-size: 28rpx; color: #999999; letter-spacing: 0; float:right; line-height:86rpx; padding-right:30rpx;}
.group{width:100%; height:100rpx; background-color:#F2F2F2; border-radius: 8rpx; position:relative; margin-bottom:10rpx;}
.group_left{float:left;}
.group_right{width:150rpx; height:100rpx; border-bottom-right-radius:8rpx; border-top-right-radius:9rpx; position:absolute; top:0; right:0; background-color:#DD2727; font-size: 26rpx; color: #FFFFFF; text-align:center; line-height:100rpx;}
.group image{width:80rpx; height:80rpx; border-radius:50%; margin-top:10rpx; margin-left:20rpx; float:left;}
.userName{line-height:100rpx; float:left; font-size: 28rpx; color: #333333; padding-left:20rpx;width:200rpx;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
.group_time{height:100rpx; text-align:right; position:absolute; right:180rpx; top: 0;}
.surplus{text-align:right; font-size: 24rpx; color: #DD2727; line-height:100rpx;}
.countDown{text-align:right; font-size: 24rpx; color: #3A3A3A; margin-top:10rpx;}
.details{width:100%; background-color:#fff; margin-top:16rpx;}
.details_title{width:100%; line-height:86rpx; font-size: 28rpx; color: #333333; padding-left:30rpx; box-sizing:border-box; border-bottom:1px solid #E5E5E5;}
.bottom{width:100%; height:86rpx; position:fixed; bottom:0; left:0; background-color:#fff;}
.bottom_service{width:108rpx; height:98rpx; text-align:center; float:left;}
.bottom_service .bottom_service_img{width:48rpx; height:48rpx; margin-top:18rpx;}
.oneself{width: calc(50% - 54rpx); height:98rpx; background-color:#FE939D; text-align:center; float:left;}
.together{width: calc(50% - 54rpx); height:98rpx; background-color:#DD2727; text-align:center; float:left;}
.price{width:100%; display:block; font-size: 32rpx; color: #FFFFFF; text-align:center; line-height:48rpx;}
.price_tit{width:100%; display:block; font-size: 24rpx; color: #FFFFFF; line-height: 24rpx; text-align:center;}
.hidden{width:100%; height:100%; position:fixed; left:0; top:0; z-index:9;}
.background{width:100%; height:100%; background-color:rgba(0, 0, 0, 0.2); position:fixed; left:0; top:0; z-index:90;}
.hidden_box{width: 100%; height:720rpx; position:fixed; left:0; bottom: 0; z-index:99;}
.grouping{width:100%; background-color:#fff; position:absolute; left:0; bottom:0; z-index:999; padding:0 30rpx; box-sizing:border-box;}
.grouping_title{width:100%; height:76rpx;}
.grouping_text{line-height:86rpx; font-size: 28rpx; color: #333333;}
.grouping_hidden{float:right; line-height:86rpx; font-size: 28rpx; color: #666666;}
.group_bottom{width:100%; height:86rpx; background-color:#fff; text-align:center; line-height:86rpx;}
.group_bottom_text{font-size: 28rpx; color: #999999;}
.dat_main{padding: 10rpx;font-size: 28rpx;box-sizing:border-box;}
.bottomseat{width:100%;height:98rpx;}
.noData{width:100%;line-height:244rpx;background-color:#ddd;font-size:28rpx;text-align:center;color:#888;}
.ongoing_box{width:100%;padding:0 30rpx 20rpx;box-sizing:border-box;}
</style>