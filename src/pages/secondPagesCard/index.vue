<template>
<view class="container">
  <view class="contant clear">
      <image class="card_backg" src="../../img/bg.png"></image>
      <view class="card_top">
          <view class="clear card_top_cant">
              <view class="left">权限：全场折扣</view>
              <view class="right card_top_look">查看会员权限？</view>
          </view>
          <view class="clear card_top_vip">
              <view class="left clear">
                  <view class="left card_vip_head">
                      <image class="card_vip_head_image" src="../../img/head.png"></image>
                  </view>
                   <view class="left card_vip_cant">
                      <view class="card_vip_name">Bullet</view>
                      <view class="card_vip_post">VIP会员</view>
                  </view>                 
              </view>
              <view class="right card_vip_balance">
                  我的余额：200￥
              </view>
          </view>
          <view class="clear card_top_class">
              <view class="left">lv.15</view>
              <view class="right card_alass_plan">
                <view class="card_alass_rate" style="width:60%"></view>
              </view>
          </view>
          <view class="card_alass_rade">再消费￥100升为lv.16</view>
      </view>
  </view>
  <view class="card_info">
      <view class="_navbar_title bmg">
          <view class=" {{currentTab==0 ? 'active _navbar_item' : '_navbar_item'}}" data-idx="0" @tap="navbarTap">
          我的消费记录
          </view>    
          <view class=" {{currentTab==1 ? 'active _navbar_item' : '_navbar_item'}}" data-idx="1" @tap="navbarTap">         
             我的卡券
          </view>           
      </view>
      
      <view wx:if="{{currentTab==0}}" class="_composite">
          <view class="_navbar_matter" wx:if="{{noRecord}}">
            <view class="_composite_item" wx:for="{{composite}}" wx:key="gg">
                <view class="_navbar_matter_title clear">
                    <view class="left">{{item.title}}</view>
                    <view class="right">{{item.time}}</view>
                </view>
                <view class="_navbar_matter_content" wx:for="{{item.record}}" wx:key="gg">
                    <view class="_navbar_matter_name">{{item.name}}</view>
                    <view class="_navbar_matter_number">{{item.num}}</view>
                    <view class="_navbar_matter_price">{{item.price}}</view>
                </view>
            </view> 
          </view>  
          <view class="_navbar_matter_no" wx:else>
               <view class="no_record"><image src="http://image.vdongchina.com/M00/03/31/ZSUkmVnfIkqEJ80sAAAAAOGCmLE031.png"></image></view> 
               <view class="no_txt">暂无消费记录</view>
          </view>           
      </view>
  
     
     <view wx:if="{{currentTab==1}}" class="_composite clear">
         <view class="_navbar_matter" wx:if="{{noCoupons}}">2
         </view>
        <view class="_navbar_matter_no" wx:else>
               <view class="no_record"><image src="http://image.vdongchina.com/M00/03/31/ZSUkmVnfIh2EJf55AAAAAE77dYc607.png"></image></view> 
               <view class="no_txt">暂无优惠券</view>
          </view>         
     </view>  
      
  </view>
</view>  
</template>

<script>
export default {
		config: {
			"navigationBarTitleText": "我的会员卡"
		},
        data(){
            return{
                currentTab: 0,
    noRecord:false,
    noCoupons:false,
    composite:[
      { title: "罗蒙环球城银泰城店", time: "2017-05-03", record:[
        { name:"夏日清凉！美人鱼钻石钻甲",num:"1",price:"100"},
        { name: "夏日清凉！美人鱼钻石钻甲", num: "1", price: "100" },

      ]
      },
      {
        title: "罗蒙环球城银泰城店", time: "2017-05-31", record: [
          { name: "夏日清凉！美人鱼钻石钻甲", num: "1", price: "100" },
        ]
      },
      {
        title: "罗蒙环球城银泰城店", time: "2017-05-03", record: [
          { name: "夏日清凉！美人鱼钻石钻甲", num: "1", price: "100" },
          { name: "夏日清凉！美人鱼钻石钻甲", num: "1", price: "100" },
        ]
      },            
    ]
            }
        },
       methods:{
           navbarTap: function (e) {
           this.currentTab = e.target.dataset.idx
  },
       } 
}
</script>

<style scoped>
.contant{margin: 10rpx;   height: 400rpx;background: #141414;position: relative}
.contant .card_backg{width: 730rpx;height: 400rpx;}
.card_top{position: absolute;width: 690rpx;height: 320rpx;top:40rpx;left: 20rpx;color: #ffffff}
.card_top_cant{line-height: 48rpx;}
.card_top_look{width: 210rpx;height: 48rpx;background: #000000;border:solid 1rpx #ffffff;border-radius: 30rpx;font-size: 26rpx;text-align: center;padding-left:10rpx;}
.card_top_vip{margin-top: 20rpx;}
.card_vip_head_image{width: 120rpx;height: 120rpx;}
.card_vip_cant{margin-left: 20rpx;}
.card_vip_name{line-height: 46rpx;font-size: 32rpx;font-weight: bold;margin-bottom: 16rpx;}
.card_vip_post{line-height: 38rpx;font-size: 26rpx;}
.card_vip_balance{font-size: 32rpx;line-height: 40rpx;margin-top: 30rpx;font-weight:bold }
.card_top_class{margin-top: 40rpx;}
.card_alass_plan{width: 620rpx;height: 10rpx;background: #ffffff;position: relative;top: 10rpx;border-radius: 10rpx;overflow: hidden}
.card_alass_rate{position: absolute;top:0;left:0;height: 10rpx;background:#FF4C90;border-radius: 10rpx}
.card_alass_rade{margin-top: 20rpx;font-size: 26rpx;}

.card_info{margin-top: 40rpx;}
._navbar_title{line-height: 68rpx;text-align: center;font-size: 32rpx;display: flex;border:solid 2rpx #FF4C90;color: #999999}
._navbar_title .active{color: #ffffff;background: #FF4C90} 
._navbar_item{flex:1;}

._composite_item{line-height: 90rpx;padding: 10rpx 30rpx;background: #ffffff;margin-bottom: 10rpx;}
._navbar_matter_content{border-top: 2rpx solid #f0f0f0;display: flex}
._navbar_matter_name{flex:4}
._navbar_matter_number{flex: 1}
._navbar_matter_price{flex: 1;text-align: right}
</style>