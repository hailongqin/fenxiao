<template>
<view>
	<view class="container">
    <view class="_contant">
        <image class="_contant_image" src="http://image.vdongchina.com/M00/03/39/ZSUkmVngELiEV9y6AAAAABcpDvs489.png"></image> 
        <view class="_wrap_item clear">
            <view class="left clear">
                <view class="_name_img left">
                  <image class="_name_img_image"  src="{{'http://image.vdongchina.com/'+headUrl}}"></image> 
                </view>
                <view class="_person left"> 
                    <view class="_wrap_name">{{name}}</view>
                    <view class="_wrap_job">{{categoryName}}</view> 
				    <!--<view class="_wrap_star">
						<block wx:for="{{3}}" wx:key="gg">
							<image class="_wrap_star_image" src="http://image.vdongchina.com/M00/03/3B/ZSUkmVngISWEIARkAAAAAPH2r74720.png"></image>
						</block>
					</view>                -->
                </view>                 
            </view>
            <view class="right" @tap="collect">
              <view class="_wrap_btn " wx:if="{{userCollect}}">已关注</view>
              <view class="_wrap_btn" style="background: #fff;color:#000000" wx:else>关注</view>
            </view>
        </view>          
    </view>
    <!--<view class="_recommend bmg clear" @tap="clickRecommend">
      <view class="left _brand">
        <image class="_brand_image" src="http://image.vdongchina.com/M00/03/39/ZSUkmVngEHGEA5j0AAAAAMqYEMk768.png"></image>
      </view>
      <view class="left _mend">
        <view class="_mend_matter">席由美承诺，服务的过程中绝不推销，强卖卡项，
认真服务，会用百分之两百的态度为您服务
店铺所有护理不偷工，不减料，工作守时，从不不减料，工作守时，从不不减料，工作守时，从不不减料，工作从不</view>
      </view>
    </view> -->
    <!--<view class="_sts bmg margint">
        <view class="_sts_title clear">
          <view class="_star left">可约时间</view>
          <view class="right clear _more" @tap="showTime">
            <view class="right"><image class="_more_image" src="http://image.vdongchina.com/M00/03/3A/ZSUkmVngHQGECJ57AAAAAKhVnJM099.png"></image></view> 
            <view class="text right">查看30天</view>     
          </view>
        </view>  
     </view>  -->

    <view class="_add_cant clear bmg margint">
        <view class="_cant_door left "  data-idx="0" @tap="navbarTap">
              <view class="{{currentTab==0 ? 'active _cant_item' : '_cant_item'}}">
                <view class="_cant_doorimg" wx:if="{{currentTab==1}}"><image class="_cant_doorimg_image" src="http://image.vdongchina.com/M00/03/3A/ZSUkmVngH3qEMLXLAAAAAFPo90c911.png"></image></view>
                <view class="_cant_doorimg" wx:else><image class="_cant_doorimg_image" src="http://image.vdongchina.com/M00/03/3A/ZSUkmVngH2iENswuAAAAAAgoOo0851.png"></image></view>
                <view class="_cant_txt">可服务项目</view>
              </view>  
        </view>
        <!--<view class="_cant_shop right "  data-idx="1" @tap="navbarTap">
              <view class="{{currentTab==1 ? 'active _cant_item ' : '_cant_item'}}">
                <view class="_cant_shopimg" wx:if="{{currentTab==0}}"><image class="_cant_shopimg_image" src="http://image.vdongchina.com/M00/03/2F/ZSUkmVnfDuaEVacSAAAAAJJwI9Y144.png"></image></view>
                <view class="_cant_shopimg" wx:else><image class="_cant_shopimg_image" src="http://image.vdongchina.com/M00/03/2F/ZSUkmVnfDxuEK6Z_AAAAAC5yLSo959.png"></image></view>
                <view class="_cant_txt">顾客评价</view>    
             </view>       
        </view>-->
    </view>  
    <view class="margint">
        <view class="goods_list clear" wx:if="{{currentTab==0}}">
        	<view class="_composite"  wx:if ="{{composite.length>0}}">
	            <view class="_composite_item left bmg" wx:for="{{composite}}" wx:key="gg" @tap="toGoods(item.id)">
	                 <view class="_composite_img"><image class="_composite_img_image" src="{{'http://image.vdongchina.com/'+item.thumbUrl+'?w=185&h=9999'}}"></image></view>
	                 <view class="_composite_cant">
	                    <view class="_composite_name">{{item.name}}</view>
	                    <view class="_composite_info clear">
	                      <view class="_composite_price clear left">
	                        <view class="_composite_now left">￥<text class="_composite_now_text">{{item.guidePrice}}</text></view>
	<!--                        <view class="_composite_former left">￥<text>{{item.yl}}</text></view>-->
	                      </view>
	                      <view class="_composite_like right">{{item.collectNum}}人喜欢</view>
	                    </view>
	                 </view> 
	                 <!--<view class="_composite_item_head clear">
	                      <view class="_composite_item_img left"><image class="_composite_item_img_image" src="{{item.head}}"></image></view>
	                      <view class="left">{{item.personName}}</view>
	                 </view>              -->
	            </view>  
	        </view> 
			<view wx:else class="nonePro">
				<view class="nolists">暂无数据</view>
			</view>
        </view>       
        <view class="goods_list bmg" wx:if="{{currentTab==1}}">
          <view class="_me_title_items">
            <view class="_me_title_item" wx:for-items="{{items}}" wx:key="index">
              <view id="{{index}}" class="{{addTab == index ? 'active _me_title_Item ' : '_me_title_Item'}}" @tap="navitemTap">
                <view>{{item.status}}</view>
                <view class="nub">{{item.num}}</view>
              </view>
            </view>
          </view>
            <view class="_eval_info">
                <view class="clear">
                    <view class="_eval_head left">
                        <image class="_eval_head_image" src="../../img/head1.png"></image>
                    </view>
                    <view class="left _eval_cant">
                        <view class="_eval_name">关雎尔</view>
                        <view class="_eval_manner">超出期待</view>
                    </view>
                </view>
                <view class="_eval_matter">做的不错</view>
                <view class="clear _eval_time">
                    <view class="left">2017-05-08 15:70</view>
                    <view class="right">购买项目：<text>春季条色素</text></view>
                </view>
            </view>  
            <view class="_eval_info">
                <view class="clear">
                    <view class="_eval_head left">
                        <image class="_eval_head_image" src="../../img/head1.png"></image>
                    </view>
                    <view class="left _eval_cant">
                        <view class="_eval_name">关雎尔</view>
                        <view class="_eval_manner">超出期待</view>
                    </view>
                </view>
                <view class="_eval_matter">做的不错</view>
                <view class="clear _eval_time">
                    <view class="left">2017-05-08 15:70</view>
                    <view class="right">购买项目：<text>春季条色素</text></view>
                </view>
            </view>                                
        </view>           
    </view> 
    <!--<view class="_sts_title _sts_bord clear">
      <view class="_star _look">查看更多评论</view>
    </view>           -->
</view>

<!--可约时间-->
<!--<view class="_time_cant" wx:if="{{isTime}}">
      <view class="_time">
          <view class="_time_title">
            <view class="_public_main _public_title clear">
                  <text>近30天可预约时间</text>
                  <view class="_public_titleimg right" @tap="hideTime">
                    <image class="_public_titleimg_image" src="http://image.vdongchina.com/M00/03/3C/ZSUkmVngJymEFke5AAAAAETUHH4818.png"></image>
                  </view>
            </view>
          </view> 
        <view class="_location clear">
            <view class="_date_top">
                <view class=""></view>
                <view class="_data_text clear">
                    <view class="left _data_txt">时段</view>
                    <view class="left _data_time _data_time_f">08</view>
                    <view class="left _data_time">10</view>
                    <view class="left _data_time">12</view>
                    <view class="left _data_time">14</view>
                    <view class="left _data_time">16</view>
                    <view class="left _data_time">18</view>
                    <view class="left _data_time">20</view>
                    <view class="left _data_time">22</view>
                    <view class="left _data_time">24</view>
                </view>
                <view class="_date_topimg"><image class="_date_topimg_image" src="http://image.vdongchina.com/M00/03/31/ZSUkmVnfHrmEPaXlAAAAAMyxmKE664.png"></image></view>
            </view>
            <view class="_data_bottom" wx:for="{{time}}" wx:key="gg">
                <view class="clear">
                    <view class="left _date_txt">{{item.date}}</view>
                    <view class="left clear _date_img">
                        <view class="left _data_bottomimg" wx:for="{{item.times}}" wx:key="gg">
                            <image class="_data_bottomimg_image" wx:if="{{item.isable}}" src="../../img/about.png"></image>
                            <image class="_data_bottomimg_image" wx:else src="http://image.vdongchina.com/M00/03/31/ZSUkmVnfHMGEURvBAAAAAMK913w977.png"></image>
                        </view>
                    </view>
                </view>
            </view>
        </view>            
      </view>
</view>-->
</view>	
</template>

<script>
	export default {
		config: {
			"navigationBarTitleText": "详情"
		},		
		data() {
			return {
			    currentTab: 0,
			    addTab: 0,
			    isTime:false,
			    composite: [
//			      { img: "../../img/picture.png", name: "夏日显白清新白色恋人爆钻款", xz: "258", yl: "366", like: "200", head: "../../img/card.png", personName: "安迪" },
//			      { img: "../../img/picture.png", name: "夏日显白清新白色恋人爆钻款夏日显白清新白色恋人爆钻款", xz: "258", yl: "366", like: "200", head: "../../img/card.png", personName: "关雎尔" },
//			      { img: "../../img/picture.png", name: "夏日清凉！显白人鱼蓝亮片钻甲", xz: "258", yl: "366", like: "200", head: "../../img/card.png", personName: "曲筱绡" }
			    ],
			    items: [
			      { status: '全部', num: "100" },
			      { status: '待付款', num: "110"  },
			      { status: '待服务', num: "150"  },
			      { status: '进行中', num: "160"  },
			      { status: '待评价', num: "190"  },
			    ],
			    cId:'',
//			    time: [
//			      {
//			        date: "今天", times: [
//			          { shij: 8, isable: false }, { shij: 9, isable: false }, { shij: 10, isable: true }, { shij: 11, isable: true }, { shij: 12, isable: true },
//			          { shij: 13, isable: true }, { shij: 14, isable: true }, { shij: 15, isable: false }, { shij: 16, isable: false }, { shij: 17, isable: true },
//			          { shij: 18, isable: true }, { shij: 19, isable: false }, { shij: 20, isable: true }, { shij: 21, isable: true }, { shij: 22, isable: false }, { shij: 23, isable: false }, { shij: 24, isable: true }
//			        ]
//			      },
//			      {
//			        date: "明天", times: [
//			          { shij: 8, isable: true }, { shij: 9, isable: true }, { shij: 10, isable: true }, { shij: 11, isable: false }, { shij: 12, isable: true },
//			          { shij: 13, isable: true }, { shij: 14, isable: true }, { shij: 15, isable: true }, { shij: 16, isable: false }, { shij: 17, isable: true },
//			          { shij: 18, isable: false }, { shij: 19, isable: false }, { shij: 20, isable: true }, { shij: 21, isable: true }, { shij: 22, isable: true },
//			          { shij: 23, isable: true }, { shij: 24, isable: true }
//			        ]
//			      },
//			      {
//			        date: "后天", times: [
//			          { shij: 8, isable: true }, { shij: 9, isable: true }, { shij: 10, isable: false }, { shij: 11, isable: true }, { shij: 12, isable: true },
//			          { shij: 13, isable: false }, { shij: 14, isable: true }, { shij: 15, isable: true }, { shij: 16, isable: false }, { shij: 17, isable: false },
//			          { shij: 18, isable: true }, { shij: 19, isable: true }, { shij: 20, isable: true }, { shij: 21, isable: true }, { shij: 22, isable: true },
//			          { shij: 23, isable: true }, { shij: 24, isable: false }
//			        ]
//			      },
//			    ] ,
				headUrl:'',
				name:'',
				categoryName:'',
				userCollect:false,
			}
		},	
		onLoad(e){
			
			var that = this	
			that.cId = e.id
			//技师
			
			wx.request({
			  url: that.$root.apiServer+that.$root.appid + "/basic/api/staff/staffDetail",
			  data: {
			  	token: getApp().globalData.token,
			  	id:e.id
			  },
			  method:"POST",
			  header: {
			      'content-type': 'application/x-www-form-urlencoded'
			  },
			  success: function(res) {
			  	if(res.data.success == true){
				  	that.headUrl=res.data.data.headUrl
				  	that.name=res.data.data.name
				  	that.categoryName=res.data.data.categoryName
				  	that.userCollect=res.data.data.userCollect
				  	
				  	that.staffsId=res.data.data.id
			  	}
			  }
			})
			wx.request({
			  url: that.$root.apiServer + that.$root.appid + "/basic/api/staff/staffServers",
			  data: {
			  	id:e.id,
			  	pageNum:1,
			  	pageSize:10
			  },
			  method:"POST",
			  header: {
			      'content-type': 'application/x-www-form-urlencoded'
			  },
			  success: function(res) {
			  	if(res.data.success == true){
			  		that.composite=res.data.data.list			  		
			  	}
			  }
			})			
			
		},
		methods: {
			//收藏
		    collect(){
				
				var that = this	
		    	if(that.userCollect == false){
					wx.request({
					  url: that.$root.apiServer+that.$root.appid + "/basic/api/serverCollect/collect",
					  data: {
							staffId:that.staffsId,
							type:'2',
							token:getApp().globalData.token			  		  	
					  },
					  method:"POST",
					  header: {
					      'content-type': 'application/json'
					  },
					  success: function(res) {
					  	if(res.data.success == true){
							wx.showToast({
							  title: '关注成功',
							  duration: 1000
							})		
							that.userCollect=true				  		
					  	}					  				    
					  }
					})		    		
		    	}
		    	if(that.userCollect == true){
					wx.request({
					  url: that.$root.apiServer+that.$root.appid + "/basic/api/serverCollect/unCollect",
					  data: {
							staffId:that.staffsId,
							type:'2',
							token:getApp().globalData.token			  		  	
					  },
					  method:"POST",
					  header: {
					      'content-type': 'application/json'
					  },
					  success: function(res) {
					  	if(res.data.success == true){
							wx.showToast({
							  title: '取消关注',
							  duration: 1000
							})
							that.userCollect=false				  		
					  	}					  				    
					  }
					  
					})		    		
		    	}	    				    	
		    },		
			
			
			  navbarTap(e) {
			    this.currentTab=e.currentTarget.dataset.idx
			  },
			  navitemTap(e) {
			    this.addTab=e.currentTarget.id
			  },
			  showTime(){
			    this.isTime=true
			  },
			  hideTime(){
			    this.isTime=false
			  },
			//项目详情
			toGoods(id){
				wx.navigateTo({
					url: '../levelPagesGoods/levelPagesGoods?id='+id
				})
			},			  
		} 
	}	
</script>

<style scoped>
page{background: #F9F9F9;}	
.container{background: #F9F9F9;}
._contant{width:100%;height: 200rpx;position: relative}
._contant_image{width:100%;height: 200rpx}

._wrap_item{padding: 30rpx;position: absolute;left: 0;top:0;color:#ffffff}

._name_img{width: 140rpx;height: 140rpx;border-radius: 50%}
._name_img_image{width: 140rpx;height: 140rpx;border-radius: 50%;overflow: hidden}
._person{width: 320rpx;margin-left: 30rpx;}
._wrap_name{line-height: 46rpx;font-size: 32rpx;font-weight: bold}
._wrap_job{margin-top: 16rpx;}
._wrap_star{margin-top: 20rpx;}
._wrap_star_image{width: 33rpx;height: 30rpx;}
._wrap_btn{width: 140rpx;height: 60rpx;border:solid #FF4C90 2rpx;text-align: center;line-height:60rpx;border-radius: 100rpx;margin-top: 36rpx;background: #FF4C90;font-size: 30rpx;}

._recommend{padding: 30rpx}
._brand_image{width: 50rpx;height: 38rpx;}
._mend{margin-left: 30rpx;}
._mend_title{line-height:46rpx;font-size: 32rpx;color: #111111;font-weight: bold;margin-bottom: 20rpx; }
._mend_matter{overflow: hidden;width:600rpx;color: #666666;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;}
._sts_title{padding: 28rpx 30rpx;border-bottom: 1rpx solid #f8f8f8;text-align: center}
._more .text{margin-right: 10rpx;color: #111}
._more_image{width: 10rpx;height: 20rpx;margin-top:7rpx;}

._add_cant{padding-top: 16rpx;text-align: center}
._cant_door,._cant_shop{width:374rpx;}
._cant_item{margin-left: 126rpx;width: 140rpx}
._cant_txt{padding-bottom: 10rpx;border-bottom: 4rpx dashed #fff}
.active ._cant_txt{border-bottom: 4rpx solid #FF4C90;color: #FF4C90}
._cant_doorimg{width: 50rpx;height: 48rpx;margin-bottom: 6rpx;margin-left: 40rpx}
._cant_doorimg_image{width: 50rpx;height: 48rpx}
._cant_shopimg{width: 50rpx;height: 48rpx;margin-bottom: 6rpx;margin-left: 35rpx}
._cant_shopimg_image{width: 50rpx;height: 48rpx}

._composite{display: flex; justify-content:space-between ;flex-wrap:wrap;}
._composite_item{width: 370rpx;position: relative;margin-bottom: 10rpx;}
._composite_item_head{position: absolute;left: 30rpx;top:330rpx;line-height: 50rpx;color: #fff}
._composite_item_img{width: 50rpx;height: 50rpx;overflow: hidden;border-radius: 50%;margin-right: 20rpx;}
._composite_item_img_image{width: 50rpx;height: 50rpx;}
._composite_item:nth-child(2){margin-right:0}
._composite_img_image{width: 370rpx;height: 370rpx;}
._composite_cant{padding: 10rpx 20rpx 20rpx 24rpx;}
._composite_name{display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;font-size: 28rpx;color: #333333;line-height: 42rpx;min-height: 84rpx;}
._composite_info{margin-top: 22rpx;color: #999999;}
._composite_price{font-size: 22rpx;}
._composite_now{color:#FF4C90}
._composite_now ._composite_now_text{line-height: 48rpx;font-size: 34rpx;font-weight: bold}
._composite_former{margin-left: 10rpx;text-decoration:line-through}
._composite_former text{line-height: 48rpx;}
._composite_like{line-height: 48rpx;}
._lookover{line-height: 88rpx;text-align: center;color: #FF4C90;font-weight: bold;font-size: 28rpx;}

._me_title_items{display: flex;width:100%;height: 120rpx}
._me_title_item{flex: 1;padding-top: 20rpx;border-bottom:1rpx solid #f8f8f8 }
._me_title_Item{line-height: 40rpx;text-align: center;color: #111111;font-size: 30rpx;padding-bottom: 16rpx }
._me_title_Item .nub{font-size: 26rpx}
._me_title_items .active{border-bottom: solid 4rpx #FF4C90;color: #FF4C90}

._eval_info{padding: 24rpx 30rpx 20rpx;line-height: 40rpx;border-bottom: 2rpx solid #f8f8f8}
._eval_head{width: 80rpx;height: 80rpx;margin-bottom:20rpx; }
._eval_head_image{width: 80rpx;height: 80rpx;}
._eval_cant{margin-left: 30rpx;line-height: 40rpx;}
._eval_name{font-size:28rpx;color: #999999}
._eval_manner{color: #FF4C90}
._eval_matter{margin-top: 20rpx;margin-bottom: 20rpx;font-size: 28rpx;color: #111111}
._eval_time{color: #999999}
._eval_time text{color: #FF4C90}


._time_cant{position: fixed;top: 0;bottom: 0;left: 0;right: 0;background: rgba(0, 0, 0, .5);z-index: 2}
._time{position: fixed;left:0;right:0;height:760rpx;background: #ffffff;bottom: 0;padding-bottom: 120rpx;overflow-y: auto;z-index: 8 }
._time_title{border-bottom:2rpx solid #c8c8c8}
._public_main{padding: 30rpx;line-height: 40rpx;font-size: 28rpx;color: #111111}
._public_title{line-height: 42rpx;font-size: 30rpx;text-align: center;}
._public_titleimg{width: 30rpx;height: 30rpx}
._public_titleimg_image{width: 30rpx;height: 30rpx}

._date_top{position: relative;height: 60rpx;padding-top: 30rpx;}
._date_topimg{position: absolute;bottom: 0;left: 0;right: 0}
._date_topimg_image{width: 750rpx;height: 10rpx;}
._data_text{color: #999999}
._data_txt{margin-left:30rpx;margin-right: 22rpx }
._data_text ._data_time{margin-left:52rpx; }
._data_text ._data_time_f{margin-left:0;}
._data_bottom{padding: 30rpx 0}
._date_txt{margin-left: 30rpx;}
._data_bottomimg{width: 24rpx;height: 24rpx;}
._data_bottomimg_image{width: 24rpx;height: 24rpx;}
._date_img{margin-left: 26rpx;}	
	.nonePro{height:400rpx;line-height: 400rpx;text-align: center;position:relative;}
</style>