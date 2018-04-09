<template>
<view class="container">
   <view class="margint">
      <view class="_navbar_title bmg">
          <view class="{{currentTab==0 ? 'active _navbar_item' : '_navbar_item'}}" data-idx="0" @tap="navbarTap">
          综合排序
              <view class="_navbar_icon four"><image class="four_image" src="http://image.vdongchina.com/M00/03/3B/ZSUkmVngI9-ESxQnAAAAAHDtsBQ509.png"></image></view>
          </view>    
          <view class="{{currentTab==1 ? 'active _navbar_item' : '_navbar_item'}}" data-idx="1" @tap="navbarTap">         
             销量
              <view class="_navbar_icon"><image class="_navbar_icon_image" src="http://image.vdongchina.com/M00/03/3B/ZSUkmVngI9-ESxQnAAAAAHDtsBQ509.png"></image></view>

          </view>   
          <view class="{{currentTab==2 ? 'active _navbar_item' : '_navbar_item'}}" data-idx="2" @tap="navbarTap">
          筛选
              <view class="_navbar_icon screen"><image class="screen_image" src="http://image.vdongchina.com/M00/03/3A/ZSUkmVngHiuEaUvdAAAAAIDo2So032.png"></image></view>
          </view>         
      </view>
      <view class="_navbar_matter" wx:if="{{isNo}}">
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
      <!--未搜索到-->
      <view wx:else class="_navbar_matter_no">
          <image class="_navbar_matter_no_image" src="http://image.vdongchina.com/M00/03/3A/ZSUkmVngHyOEOkxyAAAAAA58snE351.png"></image>
          <view class="classname">没有搜索到相关宝贝</view>
      </view>   
    </view>  
 
</view>	
</template>

<script>
	export default {
		config: {
			"navigationBarTitleText": "门店项目"
		},	
		data() {
			return {
			    currentTab: 0,
			    isNo: true,
			    composite: [
			      { img: "../../img/picture.png", name: "夏日显白清新白色恋人爆钻款", xz: "258", yl: "366", like: "200", head: "../../img/card.png", personName: "安迪" },
			      { img: "../../img/picture.png", name: "夏日显白清新白色恋人爆钻款夏日显白清新白色恋人爆钻款", xz: "258", yl: "366", like: "200", head: "../../img/card.png", personName: "关雎尔" },
			      { img: "../../img/picture.png", name: "夏日清凉！显白人鱼蓝亮片钻甲", xz: "258", yl: "366", like: "200", head: "../../img/card.png", personName: "曲筱绡" }
			    ],			
			}
		},
		methods: {
		  navbarTap(e) {
		    this.currentTab=e.target.dataset.idx
		   
		  }			
		}
	}	
</script>

<style scoped>
._navbar_title{line-height: 98rpx;text-align: center;font-size: 30rpx;display: flex;}
._navbar_item{flex:1;position: relative}
._navbar_icon{position: absolute;right: 60rpx;top:0;z-index: 9}

._navbar_icon_image{width: 18rpx;height: 10rpx}
.four{right: 30rpx;top:0}

.four_image{width: 18rpx;height: 10rpx}
.screen{top:0}
.screen_image{width:24rpx;height: 24rpx;}

._navbar_item_icon_image{width: 18rpx;height: 10rpx;}
._navbar_title .active{color: #FF4C90;position: relative} 

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