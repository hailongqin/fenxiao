<template>
<view class="container">
    <view class="classname" style="width:750rpx;height:380rpx;background:#cccccc"></view>
    <view class="_location bmg clear">
      <view class="_location_infot left">
          <view class="_location_store">宁波银泰城店(离你最近)</view>
          <view class="_location_site">鄞州区罗蒙环球城77号</view>
          <view class="_location_time">营业时间：6:00-22-00</view>
          <view class="_location_distance clear">
              <view class="left">58米</view>
          </view>
      </view>          
    </view> 
      <view class="_location bmg clear">
          <view class="_location_infob left">
              <view class="left _location_distance_img"><image class="_location_distance_img_image" src="http://image.vdongchina.com/M00/03/2A/ZSUkmVnewuaEAgYvAAAAADa1yvs029.png"></image></view>
              <view class="left">宁波鄞州区</view>              
          </view>  
          <view class="right _location_phone">
              <image class="_location_phone_image" src="http://image.vdongchina.com/M00/03/39/ZSUkmVngESiEbjiCAAAAAFe96EA370.png"></image>
          </view>     
       </view>    
      <view class="_lookover bmg" bindtap="clickLookover">
      查看更多门店列表
      </view>  

      <view class="index_sts bmg margint">
        <view class="index_sts_title clear">
          <view class="index_star left">匠星</view>
          <view class="right clear index_more">
            <view class="right"><image class="index_more_image" src="http://image.vdongchina.com/M00/03/3A/ZSUkmVngHQGECJ57AAAAAKhVnJM099.png"></image></view>
            <view class="text right">查看更多</view>        
          </view>
        </view>
        <scroll-view scroll-x="true">  
          <view class="index_wrap" scroll-x="true">  
              <view class="index_name" wx:for="{{name}}" wx:key="gg">  
                  <view class="clear index_wrap_item" @tap="nameItem" data-id="">
                    <view class="index_name_img left">
                      <image class="index_name_img_image"  src="{{item.img}}"></image> 
                    </view>
                    <view class="index_person left"> 
                      <view class="index_wrap_name">{{item.name}}</view>
                      <view class="index_wrap_job">{{item.job}}</view> 
                      <view class="index_wrap_star"><image class="index_wrap_star_image" src="{{item.star}}"></image> </view>
                    </view> 
                  </view>   
              </view>     
          </view>  
        </scroll-view>    
      </view>
   <view class="margint">
      <view class="_navbar_title bmg">
          <view class=" {{currentTab==0 ? 'active _navbar_item' : '_navbar_item'}}" data-idx="0" @tap="navbarTap">综合</view>    
          <view class=" {{currentTab==1 ? 'active _navbar_item' : '_navbar_item'}}" data-idx="1" @tap="navbarTap">         
             销量
              <view class="_navbar_icon"><image class="_navbar_icon_image" src="http://image.vdongchina.com/M00/03/3B/ZSUkmVngI9-ESxQnAAAAAHDtsBQ509.png"></image></view>
          </view>   
          <view class="{{currentTab==2 ? 'active _navbar_item' : '_navbar_item '}}" data-idx="2" @tap="navbarTap">评价</view>         
      </view>
      <view class="_navbar_matter">
        <view wx:if="{{currentTab==0}}" class="_composite clear">  
            <view class="_composite_item left bmg" wx:for="{{composite}}" wx:key="gg">
                 <view class="_composite_img"><image class="_composite_img_image" src="{{item.img}}"></image></view>
                 <view class="_composite_cant">
                    <view class="_composite_name">{{item.name}}</view>
                    <view class="_composite_info clear">
                      <view class="_composite_price clear left">
                        <view class="_composite_now left">￥<text>{{item.xz}}</text></view>
                        <view class="_composite_former left">￥<text>{{item.yl}}</text></view>
                      </view>
                      <view class="_composite_like right">{{item.like}}人喜欢</view>
                    </view>
                 </view> 
                 <view class="_composite_item_head clear">
                      <view class="_composite_item_img left"><image class="_composite_item_img_image" src="{{item.head}}"></image></view>
                      <view class="left">{{item.personName}}</view>
                 </view>              
            </view>
        </view>  

        <view wx:if="{{currentTab==1}}" class="_composite clear">  
            <view class="_composite_item left" wx:for="{{composite}}" wx:key="gg">
                 <view class="_composite_img"><image class="_composite_img_image" src="{{item.img}}"></image></view>
            </view>
        </view> 
        <view wx:if="{{currentTab==2}}">  
          评价  
        </view> 
      </view>    
    </view> 
  <view class="_lookover bmg margint" bindtap="clickLookover">
  查看更多改商户项目
  </view>                      
</view>
	
</template>

<script>
	export default {
		config: {
			"navigationBarTitleText": "门店列表"
		},	
		data() {
			return {
			    name: [
			      { uuid: "1", img: "../../img/head1.png", name: "席友梅", job: "美甲师", star: "../../img/picture.png" },
			      { uuid: "1", img: "../../img/head2.png", name: "席友梅", job: "美甲师", star: "../../img/picture.png" },
			      { uuid: "1", img: "../../img/head3.png", name: "席友梅", job: "美甲师", star: "../../img/picture.png" },
			    ], 
			    currentTab: 0,
			    composite: [
			      { img: "../../img/picture.png", name: "夏日显白清新白色恋人爆钻款", xz: "258", yl: "366", like: "200", head: "../../img/card.png", personName: "安迪" },
			      { img: "../../img/picture.png", name: "夏日显白清新白色恋人爆钻款夏日显白清新白色恋人爆钻款", xz: "258", yl: "366", like: "200", head: "../../img/card.png", personName: "关雎尔" },
			      { img: "../../img/picture.png", name: "夏日清凉！显白人鱼蓝亮片钻甲", xz: "258", yl: "366", like: "200", head: "../../img/card.png", personName: "曲筱绡" }
			    ],				
			}
		}
	}	
</script>

<style scoped>
._location{border-bottom: 2rpx solid #f8f8f8 }
._location_infot{width: 702rpx;padding: 24rpx 30rpx;position: relative;}
._location_infob{width: 568rpx;padding: 24rpx 30rpx;position: relative;line-height: 40rpx}
._location_store{font-weight: bold;margin-bottom: 20rpx;}
._location_time{margin-top: 4rpx;}
._location_distance{position: absolute;color: #999999;right: 30rpx;top:50%;margin-top: -20rpx;}
._location_distance_img_image{width: 30rpx;height: 34rpx;margin-right: 20rpx;}
._location_phone{border-left: 1rpx solid #f8f8f8;padding:30rpx;}
._location_phone_image{width:40rpx;height: 40rpx; }
._lookover{line-height: 88rpx;text-align: center;color: #FF4C90;font-size: 28rpx;}


.index_sts_title{padding: 28rpx 30rpx;border-bottom: 1rpx solid #f8f8f8;}
.index_star{line-height: 42rpx;font-size: 30rpx;color: #111111;font-weight: bold}
.index_more .text{color: #999999;margin-right: 10rpx;}
.index_more_image{width: 10rpx;height: 20rpx;margin-top:7rpx; }
.index_wrap{width:100%; display: flex;}  
.index_wrap_item{width: 360rpx;}
.index_name{flex: 1;border-right:solid 1rpx #f8f8f8;padding: 30rpx;}
.index_name:last-child{border-right: none}
.index_name_img{width: 140rpx;height: 140rpx;border-radius: 50%;overflow: hidden}
.index_name_img_image{width: 140rpx;height: 140rpx;}
.index_person{width: 190rpx;margin-left: 30rpx;}
.index_wrap_name{line-height: 46rpx;font-size: 32rpx;font-weight: bold}
.index_wrap_job{margin-top: 16rpx;}
.index_wrap_star{margin-top: 20rpx;}
.index_wrap_star_image{width: 180rpx;height: 30rpx;}
.index_location{padding: 24rpx 30rpx;position: relative}
.index_location_store{font-weight: bold;margin-bottom: 20rpx;}

._navbar_title{line-height: 98rpx;text-align: center;font-size: 30rpx;display: flex;border-bottom: 2rpx solid #FF4C90;}
._navbar_item{flex:1;position: relative}
._navbar_icon_image{width: 18rpx;height: 10rpx;position: absolute;right: 60rpx;top:40rpx;}
._navbar_item_icon_image{width: 18rpx;height: 10rpx;}
._navbar_title .active{color: #FF4C90;position: relative} 
 .active::after{   position: absolute; border-left: 9px solid transparent;border-right: 9px solid transparent;border-bottom: 9px solid #FF4C90;
    content: " ";display: block; width: 0; height: 0; bottom:0;left:100rpx;}
._navbar_matter{margin-top:10rpx; }
._composite_item{width: 370rpx;height: 550rpx;position: relative;margin-right:10rpx;margin-bottom: 10rpx;}
._composite_item_head{position: absolute;left: 30rpx;top:330rpx;line-height: 50rpx;color: #fff}
._composite_item_img{width: 50rpx;height: 50rpx;overflow: hidden;border-radius: 50%;margin-right: 20rpx;}
._composite_item_img_image{width: 50rpx;height: 50rpx;}
._composite_item:nth-child(2){margin-right:0}
._composite_img_image{width: 370rpx;height: 370rpx;}
._composite_cant{padding: 10rpx 20rpx 20rpx 24rpx;}
._composite_name{display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;font-size: 28rpx;color: #333333}
._composite_info{margin-top: 22rpx;color: #999999;}
._composite_price{font-size: 22rpx;}
._composite_now{color:#FF4C90}
._composite_now text{line-height: 48rpx;font-size: 30rpx;font-weight: bold}
._composite_former{margin-left: 10rpx;text-decoration:line-through}
._composite_former text{line-height: 48rpx;}
._composite_like{line-height: 48rpx;}
	
</style>