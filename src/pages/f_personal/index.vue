<template>
  <view class="container">
  	<distributionPersonal></distributionPersonal>
  	<nav1 :hidden="true"></nav1>
    <!--<view class="bottom-nav">
        <view class="con">
            <view class="nav-list" @tap="index">
                <view class="nav" wx:if="{{indexActive}}">
                    <image class="top" background-size="cover" src="http://image.vdongchina.com/M00/06/11/ZSUkmVoXuBWESguNAAAAAP7XUSo505.png"></image>
                    <view class="bottom">首页</view>
                </view>
                <view class="navActive" wx:else>
                    <image class="top" background-size="cover" src="http://image.vdongchina.com/M00/06/11/ZSUkmVoXuEuEU_FTAAAAADO0m-M987.png"></image>
                    <view class="bottom">首页</view>
                </view>
            </view>
            <view class="nav-list fmessage" @tap="message">
            		<view class="fmessagenum" wx:if="{{messageNum}}">{{messageNum}}</view>
                <view class="nav" wx:if="{{messageActive}}">
                    <image class="top" background-size="cover" src="http://image.vdongchina.com/M00/06/11/ZSUkmVoXuSWEIIRiAAAAAPw4lBE836.png"></image>
                    <view class="bottom">消息</view>
                </view>
                <view class="navActive" wx:else>
                    <image class="top" background-size="cover" src="http://image.vdongchina.com/M00/06/11/ZSUkmVoXuWWEXldSAAAAAMb2Wdo517.png"></image>
                    <view class="bottom">消息</view>
                </view>
            </view>
            <view class="nav-list" @tap="shopcart">
                <view class="nav" wx:if="{{shopcartActive}}">
                    <image class="top" background-size="cover" src="http://image.vdongchina.com/M00/06/12/ZSUkmVoXvHOEZ6-GAAAAADus66A254.png"></image>
                    <view class="bottom">购物车</view>
                </view>
                <view class="navActive" wx:else>
                    <image class="top" background-size="cover" src="http://image.vdongchina.com/M00/06/12/ZSUkmVoXvPqEGOtmAAAAANFe0d0509.png"></image>
                    <view class="bottom">购物车</view>
                </view>
            </view>
            <view class="nav-list" @tap="personal">
                <view class="nav" wx:if="{{personalActive}}">
                    <image class="top" background-size="cover" src="http://image.vdongchina.com/M00/06/12/ZSUkmVoXuzaEPmIpAAAAABG2s_c188.png"></image>
                    <view class="bottom">我的</view>
                </view>
                <view class="navActive" wx:else>
                    <image class="top" background-size="cover" src="http://image.vdongchina.com/M00/06/12/ZSUkmVoXu2KEPW-eAAAAAB9H9zY960.png"></image>
                    <view class="bottom">我的</view>
                </view>
            </view>
        </view>
    </view>
    <view class="content">
      <view class="barleft"></view>
      <view class="barright"></view>
      <view class="top">
        <view class="info">
          <view class="info-left" @tap="toSet">
            <image class="img" src="{{avatarUrl}}"></image>
          </view>
          <view class="info-middle" @tap="toSet">
            <view class="name">{{nickName}}</view>
            <image class="type" src="http://image.vdongchina.com/M00/06/12/ZSUkmVoXvaqEECymAAAAAOadHpc767.png"  wx:if="{{lists.userType == 1}}"></image>
            <image class="txt" src="http://image.vdongchina.com/M00/06/13/ZSUkmVoXvwKEBxvKAAAAAJCMGS4581.png"  wx:else></image>
          </view>
          <view class="info-right" @tap="myPromote">
            <view class="txt">我要推广</view> 
            <image class="img" src="http://image.vdongchina.com/M00/06/12/ZSUkmVoXu5yEAn1kAAAAAK8eg1o260.png"></image>
          </view>
        </view>
        <view class="tab"  wx:if="{{isDealer}}">
          <view class="item" @tap="toTuike">
            <view class="num">{{tweeSum}}</view>
            <view class="name">我的推客</view>
          </view>
          <view class="item"  @tap="toYongjin">
            <view class="num">{{commSum}}</view>
            <view class="name">我的佣金</view>
          </view>
          <view class="item" @tap="toYue(isDealer)">
            <view class="num">{{balaSum}}</view>
            <view class="name">我的余额</view>
          </view>
        </view>
        <view class="set" @tap="toSet">设置</view>
      </view>
      
      <view class="middle">
        <view class="order-top" @tap="toOrder(type1)">
          <view class="left">我的订单</view>
          <view class="right">
            <view class="txt">查看全部</view> 
            <image class="img" src="http://image.vdongchina.com/M00/06/11/ZSUkmVoXuZuEcmklAAAAAIZTr30042.png"></image>
          </view>
        </view>
        <view class="order-bottom">
          <view class="item" @tap="toOrder(type2)">
            <view class="num">
              <view class="number" wx:if="{{orderNum1}}">{{orderNum1}}</view>
              <image class="img" src="http://image.vdongchina.com/M00/06/13/ZSUkmVoXvmeEGAhbAAAAABhCOXc659.png"></image>
            </view>
            <view class="txt">待付款</view> 
          </view>
          <view class="item" @tap="toOrder(type3)">
            <view class="num">
              <view class="number" wx:if="{{orderNum2}}">{{orderNum2}}</view>
              <image class="img" src="http://image.vdongchina.com/M00/06/13/ZSUkmVoXvkeEXNxGAAAAACy0Kqg450.png"></image>
            </view>
            <view class="txt">待发货</view> 
          </view>
          <view class="item" @tap="toOrder(type4)">
            <view class="num">
              <view class="number" wx:if="{{orderNum3}}">{{orderNum3}}</view>
              <image class="img" src="http://image.vdongchina.com/M00/06/13/ZSUkmVoXvp-EURYZAAAAAIZAyJw583.png"></image>
            </view>
            <view class="txt">待收货</view> 
          </view>
          <view class="item" @tap="toOrder(type5)">
            <view class="num">
              <view class="number" wx:if="{{orderNum4}}">{{orderNum4}}</view>
              <image class="img" src="http://image.vdongchina.com/M00/06/12/ZSUkmVoXvA6EWRuEAAAAAOQ-tJ0847.png"></image>
            </view>
            <view class="txt">退款/售后</view> 
          </view>
        </view>
      </view>

      
     <view class="bottom">
        <view class="recommend-top">
          <view class="left">会员卡</view>
        </view>
        <view class="recommend-bottom">
          <view class="item" @tap="shopSet">
            <image class="img" src="http://image.vdongchina.com/M00/06/97/ZSUkmVof9iiEWu4IAAAAAPO3IUU530.png"></image>
            <view class="txt">余额充值</view> 
          </view>
          <view class="item" @tap="goodsManage">
            <image class="img" src="http://image.vdongchina.com/M00/06/97/ZSUkmVof9lmEbm_yAAAAAMy17nA754.png"></image>
            <view class="txt">充值记录</view> 
          </view>
          <view class="item" @tap="toDiscounts">
            <image class="img" src="http://image.vdongchina.com/M00/06/97/ZSUkmVof9nOEJbnWAAAAAE9c5LU392.png"></image>
            <view class="txt">完善资料</view> 
          </view>
          <view class="item" @tap="myPromoteSecond">
            <image class="img" src="http://image.vdongchina.com/M00/06/97/ZSUkmVof9omEDNZrAAAAAOq4iHM689.png"></image>
            <view class="txt">密码管理</view> 
          </view>
        </view>
      </view>


	<view class="bottom">
        <view class="recommend-top">
          <view class="left">推荐项目</view>
        </view>
        <view class="recommend-bottom">
          <view class="item" @tap="shopSet">
            <image class="img" src="http://image.vdongchina.com/M00/06/12/ZSUkmVoXvV6EUEiGAAAAAK7Q8-8971.png"></image>
            <view class="txt">店铺设置</view> 
          </view>
          <view class="item" @tap="goodsManage">
            <image class="img" src="http://image.vdongchina.com/M00/06/11/ZSUkmVoXt7aEAYafAAAAAJ-pSYY710.png"></image>
            <view class="txt">商品管理</view> 
          </view>
          <view class="item" @tap="toDiscounts">
            <image class="img" src="http://image.vdongchina.com/M00/06/11/ZSUkmVoXueWEPO_JAAAAAA4bMd8454.png"></image>
            <view class="txt">我的优惠</view> 
          </view>
          <view class="item" @tap="myPromoteSecond">
            <image class="img" src="http://image.vdongchina.com/M00/06/11/ZSUkmVoXucGEAA4RAAAAANG7GNU009.png"></image>
            <view class="txt">我的二维码</view> 
          </view>
        </view>
        <view class="recommend-bottom">
          <view class="item" @tap="shopSet">
            <image class="img" src="http://image.vdongchina.com/M00/06/97/ZSUkmVof-l-EFaOQAAAAAIiZ7BY399.png"></image>
            <view class="txt">商品订单</view> 
          </view>
          <view class="item" @tap="goodsManage">
            <image class="img" src="http://image.vdongchina.com/M00/06/97/ZSUkmVof-niEECOmAAAAAM9N24A296.png"></image>
            <view class="txt">购物车</view> 
          </view>
          <view class="item" @tap="toDiscounts">
            <image class="img" src="http://image.vdongchina.com/M00/06/97/ZSUkmVof-pCEU1AMAAAAAJgnRMM596.png"></image>
            <view class="txt">我的预约</view> 
          </view>
          <view class="item" @tap="myPromoteSecond">
            <image class="img" src="http://image.vdongchina.com/M00/06/97/ZSUkmVof-qaEBRRjAAAAALl_3JM131.png"></image>
            <view class="txt">服务订单</view> 
          </view>
        </view>  
        <view class="recommend-bottom">
          <view class="item" @tap="shopSet">
            <image class="img" src="http://image.vdongchina.com/M00/06/97/ZSUkmVof-sKEdVURAAAAAILo7wo093.png"></image>
            <view class="txt">我的服务</view> 
          </view>
          <view class="item" @tap="goodsManage">
            <image class="img" src="http://image.vdongchina.com/M00/06/97/ZSUkmVof-t2ENxLCAAAAAKabtds715.png"></image>
            <view class="txt">图文收藏</view> 
          </view>
          <view class="item" @tap="toDiscounts">
            <image class="img" src="http://image.vdongchina.com/M00/06/97/ZSUkmVof-vOEXI1LAAAAAO6lHLI831.png"></image>
            <view class="txt">我的社区</view> 
          </view>
          <view class="item" @tap="myPromoteSecond">
            <image class="img" src="http://image.vdongchina.com/M00/06/97/ZSUkmVof-wuEE0wtAAAAAKKQkXw095.png"></image>
            <view class="txt">我的拼团</view> 
          </view>
        </view>  
        <view class="recommend-bottom">
          <view class="item" @tap="shopSet">
            <image class="img" src="http://image.vdongchina.com/M00/06/97/ZSUkmVof-x-Efl6mAAAAAJo117I302.png"></image>
            <view class="txt">商品积分</view> 
          </view>

        </view>              
      </view>
    </view>
    <view class="dialog" wx:if="{{!isDealer && shopSetFlag}}">
      <view class="dialog-content">
        <view class="top">对不起，您没有权限</view>
        <view class="middle">您成为推客后方可设置您的店铺！</view>
        <view class="bottom" @tap="closeDialog">确定</view>
      </view>
    </view>
    <view class="dialog" wx:if="{{!isDealer && goodsFlag}}">
      <view class="dialog-content">
        <view class="top">对不起，您没有权限</view>
        <view class="middle">您成为推客后方可管理您的商品！</view>
        <view class="bottom" @tap="closeDialog">确定</view>
      </view>
    </view>
    <view class="dialog" wx:if="{{!isDealer && discountFlag}}">
      <view class="dialog-content">
        <view class="top">对不起，您还没有优惠</view>
        <view class="middle">您成为推客后会有优惠哦！</view>
        <view class="bottom" @tap="closeDialog">确定</view>
      </view>
    </view>

    <view class="dialog" wx:if="{{!isDcode && promoteFlag}}">
      <view class="dialog-content">
        <view class="top">对不起，您不能进行推广</view>
        <view class="middle">您成为推客后方可进行推广哦！</view>
        <view class="bottom" @tap="closeDialog">确定</view>
      </view>
    </view>
    <view class="dialog" wx:if="{{!isDcode && dCodeFlag}}">
      <view class="dialog-content dialog-dcode">
        <view class="top">对不起，您还没有二维码</view>
        <view class="middle">您成为推客后方可生成您的二维码！</view>
        <view class="bottom" @tap="closeDialog">确定</view>
      </view>
    </view>-->
  </view>
</template>

<script>
		import distributionPersonal from "../../components/distributionPersonal/distributionPersonal"	
			import nav from "../../components/nav/nav"
export default {
  config: {
    	"navigationBarTitleText": "我的",
      "navigationBarBackgroundColor":"#262833",
      "navigationBarTextStyle":"white"
	},
  components:{
    	distributionPersonal:distributionPersonal,
    	nav1:nav
  },	
  data () {
    return {
         
    }
  },
  onShow(){},
  methods:{}
}
</script>

<style scoped>
page{
  padding-bottom:120rpx ;
  background: #F2F2F2;	
}
.left{
    float:none;
}
.right{
    float:none;
}
.container{
	
}
/* 底部导航样式 */
.bottom-nav{
    height: 100rpx;
    width:100%;
    position: fixed;
    bottom:0;
    left:0;
    background: #fff;
    border-top:1rpx solid #ababab;
    z-index: 99;
}
.bottom-nav .con{
    width:100%;
    height:100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.bottom-nav .con .nav-list{
    height: 100%;
    width:25%;
}
.bottom-nav .con .nav-list .nav{
    height:100%;
    width:100%;
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.bottom-nav .con .nav-list .nav .top{
    height:54rpx;
    width:54rpx;
    margin:9rpx 0 4rpx;
    display: block;
}
.bottom-nav .con .nav-list .nav .bottom{
    font-size:20rpx;
    color:#999;
    height: 28rpx;
    line-height:28rpx;
}
.bottom-nav .con .nav-list .navActive{
    height:100%;
    width:100%;
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.bottom-nav .con .nav-list .navActive .top{
    height:54rpx;
    width:54rpx;
    margin:9rpx 0 4rpx;
    display: block;
}
.bottom-nav .con .nav-list .navActive .bottom{
    font-size:20rpx;
    color:#262833;
    height: 28rpx;
    line-height:28rpx;
}
.container .dialog{
  height:100%;
  width:100%;
  background: rgba(0,0,0,0.5);
  z-index: 9;
  position: fixed;
  top:0;
  right: 0;
  bottom:0;
  left: 0;
  margin:auto;
}
.container .dialog .dialog-content{
  height: 291rpx;
  width:560rpx;
  border-radius: 8rpx;
  position: absolute;
  top:0;
  right: 0;
  left: 0;
  bottom:0;
  margin:auto;
  opacity: 1;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.container .dialog .dialog-discount{
  height: 333rpx;
}
.container .dialog .dialog-content .top{
  height: 50rpx;
  color:#000;
  line-height: 50rpx;
  margin:50rpx 0 18rpx;
  font-size:36rpx;
}
.container .dialog .dialog-content .middle{
  min-height: 42rpx;
  width:450rpx;
  line-height: 42rpx;
  text-align: center;
  color:#888;
  margin-bottom:30rpx;
  font-size: 30rpx;
}
.container .dialog .dialog-dcode .middle{
  width:480rpx;
}
.container .dialog .dialog-content .bottom{
  width:100%;
  height: 99rpx;
  line-height: 99rpx;
  border-top:1rpx solid #e5e5e5;
  font-size:36rpx;
  color:#02bb00;
  text-align: center;
}
.container .content{

  position: relative;
  background: #f2f2f2;
}
.container .content .barleft{
  height: 48rpx;
  width: 30rpx;
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(to bottom,#262833,#363841);
}
.container .content .barright{
  height: 48rpx;
  width:30rpx;
 position: absolute; 
  top: 0;
  right:0;
  background: linear-gradient(to bottom,#262833,#363841);
}
.container .content .top{
	margin: 0 auto;
  height: auto;
  width:690rpx;
  background: #fff;
  box-shadow: 0 4rpx 12rpx 0 rgba(0,0,0,0.1);
    padding-top:32rpx;

}
.container .content .top .info{
  height:126rpx;
  padding-left:32rpx;
  position: relative;
   padding-bottom: 32rpx;

}
.container .content .top .info .info-left{
  position: absolute;
  left:32rpx;
  top:0;
  height: 126rpx;
  width:126rpx;
}
.container .content .top .info .info-left .img{
  height: 118rpx;
  width:118rpx;
  border-radius: 50%;
  border:3rpx solid #fff;
  box-shadow: 0 2rpx 12rpx 0 rgba(0,0,0,0.18);
}
.container .content .top .info .info-middle{
  display: flex;
  position: absolute;
  left: 180rpx;
  top:0;
  height:126rpx;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.container .content .top .info .info-middle .name{
  font-size:32rpx;
  margin-top:22rpx;
  height: 32rpx;
  line-height: 32rpx;
}
.container .content .top .info .info-middle .txt{
  display: block;
  height: 36rpx;
  width:80rpx;
  margin-top:13rpx;
}
.container .content .top .info .info-middle .type{
  display: block;
  height: 36rpx;
  width:106rpx;
  margin-top:13rpx;
}
.container .content .top .info .info-right{
  position: absolute;
  top:32rpx;
  right: 0;
  width:182rpx;
  height: 60rpx;
  border-radius: 30rpx 0 0 30rpx;
  background: #363841;
}
.container .content .top .info .info-right .txt{
  position: absolute;
  left: 30rpx;
  top:0;
  height:60rpx;
  line-height: 60rpx;
  font-size:24rpx;
  color:#fff;
  font-weight: 600;
}
.container .content .top .info .info-right .img{
  width:36rpx;
  height: 44rpx;
  position: absolute;
  top:50%;
  margin-top:-24rpx;
  right:10rpx;
}
.container .content .top .tab{
  height: 150rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.container .content .top .tab .item{
  height:100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

}
.container .content .top .tab .item .num{
  font-size:32rpx;
  color:#666;
  font-weight: 600;
  height: 32rpx;
  line-height: 32rpx;
  margin:35rpx 0 22rpx;
}
.container .content .top .tab .item .name{
  height: 24rpx;
  line-height: 24rpx;
  font-size: 24rpx;
  color:#666;
}
.container .content .top .set{
  height: 79rpx;
  border-top:1rpx solid #e5e5e5;
  line-height: 80rpx;
  text-align: center;
  font-size:28rpx;
  color:#999;
}
.container .content .middle{
  height: auto;
  width:690rpx;
  margin: 0 auto;
  margin-top:26rpx;
  background: #fff;
  border:1rpx solid #e5e5e5;
  box-sizing: border-box;
}
.container .content .middle .order-top{
  height: 85rpx;
  border-bottom:1rpx solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:0 11rpx 0 30rpx; 
}
.container .content .middle .order-top .left{
  height: 28rpx;
  line-height: 28rpx;
  font-size:28rpx;
  color:#333;
}
.container .content .middle .order-top .right{
  display: flex;
  justify-content: center;
  align-items: center;
}
.container .content .middle .order-top .right .txt{
  font-size:28rpx;
  color:#999;
  height: 28rpx;
  line-height:28rpx;
}
.container .content .middle .order-top .right .img{
  width:36rpx;
  height: 48rpx;
}
.container .content .middle .order-bottom{
  display: flex;
  height: 198rpx;
  justify-content: space-around;
  align-items: flex-start;
}
.container .content .middle .order-bottom .item{
  width:120rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top:32rpx;
}
.container .content .middle .order-bottom .item .num{
  height: 88rpx;
  width:88rpx;
  position: relative;
}
.container .content .middle .order-bottom .item .num .img{
  position: absolute;
  top:0;
  bottom:0;
  right: 0;
  left: 0;
  margin: auto;
  height: 48rpx;
  width:48rpx;
  display: block;
}
.container .content .middle .order-bottom .item .num .number{
  position: absolute;
  right: -2rpx;
  top:6rpx;
  font-size:24rpx;
  color:#ff1111;
  height: 36rpx;
  width:36rpx;
  line-height:38rpx;
  text-align: center;
  border: 2rpx solid #ff1111;
  border-radius: 50%;
  z-index: 9;
  background: #fff;
}
.container .content .middle .order-bottom .item .txt{
  font-size:24rpx;
  height: 24rpx;
  line-height: 24rpx;
  color:#666;
}
.container .content .bottom{
  height: auto;
  width:690rpx;
  margin: 0 auto;
  margin-top:26rpx;
  background: #fff;
  border:1rpx solid #e5e5e5;
  box-sizing: border-box;
}
.container .content .bottom .recommend-top{
  height: 85rpx;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left:30rpx; 
}
.container .content .bottom .recommend-top .left{
  font-size:28rpx;
  height: 28rpx;
  line-height: 28rpx;
  color:#333;
}
.container .content .bottom .recommend-bottom{
	border-top:1rpx solid #eee;
  display: flex;
  height: 198rpx;
  /*justify-content: space-around;
  align-items: center;*/
}
.container .content .bottom .recommend-bottom .item{
  height:198rpx;
  width:25%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.container .content .bottom .recommend-bottom .item .img{
  height: 48rpx;
  width:48rpx;
  display: block;
  margin:52rpx 0 20rpx;
}
.container .content .bottom .recommend-bottom .item .txt{
  font-size:24rpx;
  height: 24rpx;
  line-height: 24rpx;
  color:#666;
}
.fmessage{
	position: relative;
}
.fmessagenum{font-size:18rpx;position: absolute;width: 36rpx;height: 36rpx;background: #ff1111;border-radius: 50%;line-height: 36rpx;text-align: center;color: #fff;top:6rpx;right: 44rpx;}

</style>