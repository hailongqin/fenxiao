<template>
    <!--pages/secondPages/collect/collect.wxml-->
    <view class="container">
        <view class="_navbar_title bmg">
            <view class="{{currentTab==0 ? 'active _navbar_item ' : '_navbar_item '}}" data-idx="0" @tap="navbarTap">项目</view>
            <view class="{{currentTab==1 ? 'active _navbar_item ' : '_navbar_item '}}" data-idx="1" @tap="navbarTap">匠人</view>
        </view>
        <view class="_navbar_matter">
            <view wx:if="{{currentTab==0}}">
                <view class="_composite_item bmg clear" wx:for="{{composite}}" wx:key="gg"  @tap="toGoods(item.id)">
                    <view class="_composite_img left">
                        <image class="_composite_img_img" src="{{'http://image.vdongchina.com/'+item.thumbUrl}}"  mode="aspectFill"></image>
                    </view>
                    <view class="_navbar_matter_content left">
                        <view class="_navbar_matter_shop">{{item.name}}</view>
                        <view class="_composite_info clear">
                            <view class="_composite_price clear left">
                                <view class="_composite_now left">￥
                                    <text>{{item.guidePrice}}</text>
                                </view>
                                <!--<view class="_composite_former left">￥
                                    <text>{{item.yl}}</text>
                                </view>-->
                            </view>
                            <view class="_composite_like right">{{item.collectNum}}人喜欢</view>
                        </view>
                    </view>
                </view>
            </view>
            <view wx:if="{{currentTab==1}}">
                <view class="_wrap_item bmg clear" wx:for="{{wrap}}" wx:key="gg">
                    <view class="left clear"  @tap="nameItem(item.id)">
                        <view class="_name_img left">
                            <image class="_name_img_image_image" src="{{'http://image.vdongchina.com/'+item.headUrl}}"  mode="aspectFill"></image>
                        </view>
                        <view class="_person left">
                            <view class="_wrap_name">{{item.name}}</view>
                            <view class="_wrap_job">{{item.categoryName}}</view>
                            <!--<view class="_wrap_star display-flex">
                                <blcok wx:for="{{item.count}}" wx:for-item="itemName" wx:key="count">
                                    <image class="_wrap_star_image" src="{{item.star}}"></image>
                                </blcok>
                            </view>-->
                        </view>
                    </view>
                    <!--<view class="right">
                        <view class="_wrap_btn">今日可约</view>
                    </view>-->
                </view>
            </view>
             <!-- <moreover :content="content"></moreover> -->
        </view>
        <!-- <view wx:else class="_navbar_matter_no">
            <image src="http://image.vdongchina.com/M00/03/3A/ZSUkmVngHyOEOkxyAAAAAA58snE351.png"></image>
            <view class="classname">没有搜索到相关宝贝</view>
        </view> -->
    </view>
</template>

  <script>
//    import moreover from '../../components/moreover/moreover'
export default {
    components:{
    //   moreover:moreover
    },
    config: {
        "navigationBarTitleText": "我的收藏"
    },
    data(){
        return{
            content:"查看更多该商户项目",
		    currentTab: 0,
		    composite:[],
		    wrap:[]
        }
    },
    onLoad(){
    	var that = this	 	
    	that.navbarTap()
    },
    methods:{
          navbarTap(e) {
			
			var that = this	  
			if(typeof(e)==='object')
	        that.currentTab = e.target.dataset.idx
	        else
	        that.currentTab =e||0	        
	        if(that.currentTab == 0){
	        	//	查询服务收藏    
				wx.request({
				  url: that.$root.apiServer+that.$root.appid + "/basic/api/serverCollect/queryServer",
				  data: {
						token:getApp().globalData.token,
						pageNum:1,
						pageSize:10
				  },
				  method:"POST",
				  header: {
				      'content-type': 'application/x-www-form-urlencoded'
				  },
				  success: function(res) {
				  	if(res.data.success == true){
				  		that.composite = res.data.data.filter(item => {//匠星列表
						    return item.status == 1
					    })
				  	}		  				    
				  }
				})	           	
	        }else{
				//查询技师收藏
				wx.request({
				  url: that.$root.apiServer+that.$root.appid + "/basic/api/serverCollect/queryStaff",
				  data: {
						token:getApp().globalData.token,
						pageNum:1,
						pageSize:10
				  },
				  method:"POST",
				  header: {
				      'content-type': 'application/x-www-form-urlencoded'
				  },
				  success: function(res) {
				  	if(res.data.success == true){
				  		that.wrap = res.data.data.filter(item => {//匠星列表
						    return item.status == 1
					    })
				  	}		  				    
				  }
				})	        	
	        }
        },
		nameItem(id){
			wx.navigateTo({
				url: '../actorsManicuristIndex/actorsManicuristIndex?id='+id
			})			
		},			
        toGoods(id){
            wx.navigateTo({
                url: '../levelPagesGoods/levelPagesGoods?id='+id
            })
        }        
}
}
</script>
<style scoped>
._navbar_title{line-height: 98rpx;text-align: center;font-size: 30rpx;display: flex;border-bottom: 2rpx solid #FF4C90;margin-bottom: 20rpx;}
._navbar_item{flex:1;position: relative}
._navbar_title .active{color: #FF4C90;position: relative} 
 .active::after{   position: absolute; border-left: 9px solid transparent;border-right: 9px solid transparent;border-bottom: 9px solid #FF4C90;
    content: " ";display: block; width: 0; height: 0; bottom:0;left:170rpx;}
._composite_item{padding: 20rpx 30rpx;margin-bottom: 10rpx;position: relative;}
._composite_img{width: 220rpx;height: 220rpx;overflow: hidden;border-radius: 8rpx; }
._composite_img_img {width: 220rpx;height: 220rpx;}
._navbar_matter_content{margin-left: 24rpx;width:440rpx;}
._navbar_matter_shop{line-height: 42rpx;font-size: 30rpx;color: #111111}
._navbar_matter_head{margin-top: 30rpx;line-height: 40rpx;}
._navbar_matter_headimg{width: 40rpx;height: 40rpx;overflow: hidden;border-radius: 50%;margin-right: 10rpx;}
._navbar_matter_headimg_image{width: 40rpx;height: 40rpx;}
._composite_info{margin-top: 60rpx;color: #999999;}
._composite_now{color: #FF4C90}
._composite_price{font-size: 22rpx;}
._composite_now{color:#FF4C90}
._composite_now text{line-height: 48rpx;font-size: 30rpx;font-weight: bold}
._composite_former{margin-left: 10rpx;text-decoration:line-through}
._composite_former text{line-height: 52rpx;}
._composite_like{line-height: 48rpx;}

._wrap_item{padding: 30rpx;margin-bottom: 20rpx;}

._name_img{width: 140rpx;height: 140rpx;border-radius: 50%;overflow: hidden}
._name_img_image_image{width: 140rpx;height: 140rpx;}
._person{width: 330rpx;margin-left: 30rpx;}
._wrap_name{line-height: 46rpx;font-size: 32rpx;font-weight: bold}
._wrap_job{margin-top: 16rpx;}
._wrap_star{margin-top: 20rpx;}
._wrap_star_image{width: 30rpx;height: 30rpx;}
._wrap_btn{width: 180rpx;height: 68rpx;border:solid #FF4C90 1rpx;text-align: center;line-height:68rpx;border-radius: 100rpx;margin-top: 36rpx;color: #FF4C90;font-size: 30rpx}
</style>

