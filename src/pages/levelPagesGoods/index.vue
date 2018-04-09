<template>
<view class="container">
    <view class="swiper-container">
        <swiper autoplay="auto" indicator-dots="{{indicatorDots}}" autoplay="{{autoplay}}"  indicatorColor="{{indicatorColor}}"  indicatorActiveColor="{{indicatorActiveColor}}" duration="{{duration}}" interval="5000" duration="500" class="swiper">
              <swiper-item wx:for="{{slider}}" wx:key="gg">
                <image src="{{'http://image.vdongchina.com/'+item.url}}" class="bannerImg" mode="aspectFill"></image>
              </swiper-item>
        </swiper>  
    </view>
    <view class="_wrap_cant bmg">
        <view class="_name_img">
          <image class="_name_img_image" src="{{'http://image.vdongchina.com/'+staffs.headUrl}}"></image> 
        </view>
        <view class="_person"> 
           <view class="clear">
              <view class="_wrap_name left">{{staffs.name}}</view>
              <view class="_wrap_job left" >{{staffs.categoryName}}</view> 
           </view>    
	        <!--<view class="_wrap_star">
	          	<blcok wx:for="{{wrap.count}}" wx:key="count">
					<image class="_wrap_star_image" src="{{wrap.star}}"></image>
				</blcok> 
	        </view>-->
        </view>                 
    </view> 

    <view class="_composite_cant bmg">
      <view class="_composite_name">{{name}}</view>
      <view class="_composite_info clear">
        <view class="_composite_price clear left">
          <view class="_composite_now left">￥<text class="_composite_now_text">{{guidePrice}}</text></view>
          <!-- <view class="_composite_former left">￥<text>498</text></view> -->
        </view>
        <view class="_composite_like right">{{collectNum}}人喜欢</view>
      </view>
    </view>

    <view class="_buynum_cant bmg">
        <view class="clear">
            <view class="left _buynum_text">购买数量</view>
            <view class="right _buynum_nums">
                <view class="left _buynum_sub">-</view>
                <view class="left _buynum_num">1</view>
                <view class="left _buynum_add">+</view>
            </view>
        </view>
    </view> 
    <!--<view class="_sts bmg margint">
        <view class="_sts_title clear">
          <view class="_star left">适用门店(2)</view>
          <view class="right clear _more">
            <view class="right"><image class="_more_image" src="http://image.vdongchina.com/M00/03/3A/ZSUkmVngHQGECJ57AAAAAKhVnJM099.png"></image></view>     
          </view>
        </view> 
        <view class="_location clear">
          <view class="_location_info left">
              <view class="_location_store">宁波银泰城店(离你最近)</view>
              <view class="_location_site">鄞州区罗蒙环球城77号</view>
              <view class="_location_time">营业时间：6:00-22-00</view>
              <view class="_location_distance clear">
                  <view class="left _location_distance_img"><image class="_location_distance_img_image" src="http://image.vdongchina.com/M00/03/2A/ZSUkmVnewuaEAgYvAAAAADa1yvs029.png"></image></view>
                  <view class="left">58米</view>
              </view>
          </view>  
          <view class="right _location_phone">
              <image class="_location_phone_image" src="http://image.vdongchina.com/M00/03/39/ZSUkmVngESiEbjiCAAAAAFe96EA370.png"></image>
          </view>     
        </view>              
     </view>   -->
    <!--<view class="_sts bmg margint">
        <view class="_sts_title clear">
          <view class="_star left">可约时间</view>
          <view class="_nodate left clear">
              <view class="_nodate_img left"><image class="_nodate_img_image" src="http://image.vdongchina.com/M00/03/31/ZSUkmVnfHMGEURvBAAAAAMK913w977.png"></image></view>
              <view class="left">不可约</view>
          </view>
          <view class="_date left">
              <view class="_date_img left"><image class="_date_img_image" src="../../img/about.png"></image></view>
              <view class="left">可约</view>         
          </view>
          <view class="right clear _more">
            <view class="right"><image class="_more_image" src="http://image.vdongchina.com/M00/03/3A/ZSUkmVngHQGECJ57AAAAAKhVnJM099.png"></image></view> 
            <view class="text right">查看30天</view>     
          </view>
        </view> 
        <view class="_location clear">
            <view class="_date_top">
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
     </view>  -->

    <view class="_sts bmg margint">
        <view class="_sts_title clear">
          <view class="_star details left">详情</view>
        </view> 
        <view class="_details_info">
            <view class="clear">
                <view class="_details_name left">{{name}}</view>
                <view class="_details_cant right">
                    <view class="clear">
                        <view class="left">1份</view>
                        <view class="right">{{guidePrice}}元</view>
                    </view>
                    <view class="clear">
                        <view class="left">总价值</view>
                        <view class="right">{{guidePrice}}元</view>
                    </view>
                    <!--<view class="clear">
                        <view class="left">团购价</view>
                        <view class="right">{{guidePrice}}元</view>
                    </view>-->
                </view>
            </view> 
<!--            <view class="_location">{{intro}}</view> -->
        </view>     
        <view class="_sts_title _sts_bord clear" @tap="clickTimgood">
          <view class="_star _look left">查看图文详情</view>
          <view class="right clear _more">
            <view class="right"><image class="_more_image" src="http://image.vdongchina.com/M00/03/3A/ZSUkmVngHQGECJ57AAAAAKhVnJM099.png"></image></view>     
          </view>
        </view>          
     </view>  
    <!--<view class="_sts bmg margint">
        <view class="_sts_title clear">
          <view class="_star details left">评价(20)</view>
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
        <view class="_sts_title _sts_bord clear">
          <view class="_star _look left">查看更多评论</view>
          <view class="right clear _more">
            <view class="right"><image class="_more_image" src="http://image.vdongchina.com/M00/03/3A/ZSUkmVngHQGECJ57AAAAAKhVnJM099.png"></image></view>     
          </view>
        </view>          
    </view>   -->
    <view class="_goods_btn clear">
        <view class="left _goods_coll" @tap="collect">
            <view class="_goods_collimg" wx:if="{{!userCollect}}"><image class="_goods_collimg_image" src="http://image.vdongchina.com/M00/03/3B/ZSUkmVngIauEKiTJAAAAAGTr1wI800.png"></image></view>
            <view class="_goods_collimg" wx:else><image class="_goods_collimg_image" src="http://image.vdongchina.com/M00/03/3C/ZSUkmVngKpiESKFwAAAAAPaRnNs611.png"></image></view>
            <view>收藏</view>
        </view>
        <view class="right _goods_buy" @tap="toOrder">立即购买</view>
    </view>               
</view>  	
</template>

<script>
	export default {
		config: {
			"navigationBarTitleText": "项目详情"
		},	
		data() {
			return {
			    slider: [
			    ],
			    indicatorDots: true,
			    autoplay: true,
			    indicatorColor: 'rgba(255,76,144,1)',
			    indicatorActiveColor: '#ffffff',
			    interval: 5000,
			    duration: 1000,
			    name:'',
			    guidePrice:'',
			    thumbUrl:'',
			    staffs:'',
			    staffsId:'',
			    serverId:'',
			    userCollect:false,
			    collectNum:0,
			    manicurName:'',
				product: {
                    id: '',
                    staffId:'',
	                guidePrice: 0,
	                num: 1,
	                thumbUrl: '',
	                name:'',
	                manicurName:''
	            },
                cId:'',
                scoreOpen:0,
                highestRate:0
//			    time: [
//			      {
//			        date:"今天",times:[
//			          { shij: 8, isable: false }, { shij: 9, isable: false }, { shij: 10, isable: true }, { shij: 11, isable: true }, { shij: 12, isable: true }, 
//			          { shij: 13, isable: true }, { shij: 14, isable: true }, { shij: 15, isable: false }, { shij: 16, isable: false }, { shij: 17, isable: true },
//			          { shij: 18, isable: true }, { shij: 19, isable: false }, { shij: 20, isable: true }, { shij: 21, isable: true }, { shij: 22, isable: false },           { shij: 23, isable: false }, { shij: 24, isable: true }
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
//			    ]			
			}
		},
		onLoad(e){
			
			var that = this	
			that.cId = e.id
			wx.request({
			  url: that.$root.apiServer+that.$root.appid + "/basic/api/server/serverDetail",
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
			  		if(res.data.data.staffs !== null ){
				  		that.staffs=res.data.data.staffs[0]
				  		that.staffsId=res.data.data.staffs[0].id  //技师id
				  		that.manicurName=res.data.data.staffs[0].name  //技师名字
                      }
                    that.slider=res.data.data.posterImgs
			  		that.serverId=res.data.data.id 	   // 服务id
			  		that.userCollect=res.data.data.userCollect
				  	that.name=res.data.data.name
				    that.guidePrice=res.data.data.guidePrice
				    that.thumbUrl=res.data.data.thumbUrl
                      that.collectNum=res.data.data.collectNum
                      that.scoreOpen= res.data.data.scoreOpen
                      that.highestRate= res.data.data.highestRate
			  	}
			  				    
			  }
			})			
			
		},
        onShareAppMessage(res) {
            return {
                title: '项目详情',
                path: '/pages/levelPagesGoods/levelPagesGoods?id=' + this.cId,
                success: function(res) {
                    // 转发成功
                },
                fail: function(res) {
                    // 转发失败
                }
            }
        },       
		methods: {
			//收藏
		    collect(){
				
				var that = this	
		    	if(!that.userCollect){
					wx.request({
					  url: that.$root.apiServer+that.$root.appid + "/basic/api/serverCollect/collect",
					  data: {
							serverId:that.serverId,
							type:'1',
							token:getApp().globalData.token			  		  	
					  },
					  method:"POST",
					  header: {
					      'content-type': 'application/json'
					  },
					  success: function(res) {
					  	if(res.data.success == true){
							wx.showToast({
							  title: '收藏成功',
							  duration: 1000
							})						  		
					  		that.userCollect=true		
							wx.request({
							  url: that.$root.apiServer+that.$root.appid + "/basic/api/server/serverDetail",
							  data: {
							  	id:that.cId  	
							  },
							  method:"POST",
							  header: {
							      'content-type': 'application/x-www-form-urlencoded'
							  },
							  success: function(res) {
							  	if(res.data.success == true){
							  		that.collectNum=res.data.data.collectNum
							  	}
							  				    
							  }
							})
					  	}					  				    
					  }
					})		    		
		    	}
		    	if(that.userCollect){
					wx.request({
					  url: that.$root.apiServer+that.$root.appid + "/basic/api/serverCollect/unCollect",
					  data: {
							serverId:that.serverId,
							type:'1',
							token:getApp().globalData.token			  		  	
					  },
					  method:"POST",
					  header: {
					      'content-type': 'application/json'
					  },
					  success: function(res) {
					  	if(res.data.success == true){
							wx.showToast({
							  title: '取消收藏',
							  duration: 1000
							})					  		
					  		that.userCollect=false	
							wx.request({
							  url: that.$root.apiServer+that.$root.appid + "/basic/api/server/serverDetail",
							  data: {
							  	id:that.cId	  	
							  },
							  method:"POST",
							  header: {
							      'content-type': 'application/x-www-form-urlencoded'
							  },
							  success: function(res) {
							  	if(res.data.success == true){
							  		that.collectNum=res.data.data.collectNum
							  	}
							  				    
							  }
							})					  		
					  	}
					  				    
					  }
					})		    		
		    	}	    		

		    	
		    },
		    //图文详情
			clickTimgood:function(){
 				var that=this
                var product={}
                product.staffId=this.staffsId
				product.id=this.serverId
                product.guidePrice=this.guidePrice
                product.num=1
                product.thumbUrl ='http://image.vdongchina.com/'+this.thumbUrl		
                product.manicurName =this.manicurName
                product.name =this.name
                that.product = product               
			    wx.navigateTo({
			        url: '../levelPagesTimGood/levelPagesTimGood?id='+this.cId+'&serverId='+this.serverId+'&userCollect='+this.userCollect+'&product='+ JSON.stringify(that.product)
			    })
			},
			//订单
			toOrder(){
				var that=this
                var product={}
                product.staffId=this.staffsId
				product.id=this.serverId
                product.guidePrice=this.guidePrice
                product.num=1
                product.thumbUrl ='http://image.vdongchina.com/'+this.thumbUrl		
                product.manicurName =this.manicurName
                product.name =this.name
                that.product = product
			    wx.navigateTo({
			        url: '../levelPagesSubmitOrder/levelPagesSubmitOrder'+'?product=' + JSON.stringify(that.product) +"&scoreOpen="+that.scoreOpen+"&highestRate="+that.highestRate
			    })							  	
			},

		}
	}	
</script>

<style scoped>
page{background: #F9F9F9;}	
.container{background: #F9F9F9;}	
.container{padding-bottom: 120rpx;}
.swiper-container{position: relative;}
.swiper-container .swiper{height: 750rpx;width:750rpx}
.bannerImg{height: 750rpx;width:750rpx}

._wrap_cant{padding: 12rpx 30rpx 24rpx 30rpx;position: relative;border-bottom: 1rpx solid #f8f8f8;}
._name_img{width: 120rpx;height: 120rpx;overflow: hidden;z-index: 10;border-radius: 50%;position: absolute;left: 30rpx;top:-30rpx;border:solid 6rpx #ffffff;background: #ffffff;}
._name_img_image{width: 120rpx;height: 120rpx;}
._person{margin-left: 160rpx;}
._wrap_name{line-height: 46rpx;font-size: 32rpx;font-weight: bold;color: #111111}
._wrap_job{margin-top: 10rpx;margin-left: 20rpx;}
._wrap_star{margin-top: 20rpx;}
._wrap_star_image{width: 33rpx;height: 30rpx;}
._wrap_btn{width: 180rpx;height: 68rpx;border:solid #FF4C90 1rpx;text-align: center;line-height:68rpx;border-radius: 100rpx;margin-top: 36rpx;}

._composite_cant{padding: 30rpx;border-bottom: 1rpx solid #f8f8f8;padding-bottom: 0;margin-bottom: 20rpx;}
._composite_name{line-height: 42rpx;font-size: 30rpx;color: #111111}
._composite_info{color: #999999;padding: 20rpx 0}
._composite_now{color: #FF4C90}
._composite_price{font-size: 22rpx;}
._composite_now{color:#FF4C90}
._composite_now ._composite_now_text{line-height: 48rpx;font-size: 30rpx;font-weight: bold}
._composite_former{margin-left: 10rpx;text-decoration:line-through}
._composite_former text{line-height: 52rpx;}
._buynum_cant{padding: 30rpx;font-size: 24rpx;line-height: 56rpx;}
._buynum_text{font-size: 28rpx;color: #111111}
._buynum_sub{width: 56rpx;height: 56rpx;border-radius: 50%;border:solid 2rpx #FF4C90;color: #FF4C90;line-height: 52rpx;text-align: center;font-size: 40rpx}
._buynum_add{width: 56rpx;height: 56rpx;border-radius: 50%;border:solid 2rpx #FF4C90;color: #fff;line-height: 52rpx;text-align: center;background: #FF4C90;font-size: 40rpx}
._buynum_nums ._buynum_num{margin:0 40rpx;font-size:32rpx;line-height: 56rpx;}
._sts_title{padding: 28rpx 30rpx;border-bottom: 1rpx solid #f8f8f8;}
._star{line-height: 42rpx;font-size: 28rpx;color: #666666;}
._more .text{color: #999999;margin-right: 10rpx;}
._more_image{width: 10rpx;height: 20rpx;margin-top:7rpx; }
._location_info{width: 568rpx;padding: 24rpx 30rpx;position: relative}
._location_store{font-weight: bold;margin-bottom: 20rpx;}
._location_time{margin-top: 4rpx;}
._location_distance{position: absolute;color: #999999;right: 30rpx;top:50%;margin-top: -20rpx;}
._location_distance_img_image{width: 30rpx;height: 34rpx;margin-right: 20rpx;}
._location_phone{border-left: 1rpx solid #f8f8f8;padding: 69rpx 36rpx;}
._location_phone_image{width:40rpx;height: 40rpx; }
._nodate{margin-left: 30rpx;line-height: 42rpx}
._nodate_img{margin-top: 6rpx;}
._nodate_img_image{width: 24rpx;height: 24rpx;margin-right: 10rpx;}
._date{margin-left: 30rpx;line-height: 42rpx}
._date_img{margin-top: 6rpx;}
._date_img_image{width: 24rpx;height: 24rpx;margin-right:10rpx;}

._data_text{color: #999999}
._data_txt{margin-left:30rpx;margin-right: 22rpx }
._data_text ._data_time{margin-left:52rpx; }
._data_text ._data_time_f{margin-left:0;}
._date_top{position: relative;height: 60rpx;padding-top: 30rpx;}
._date_topimg{position: absolute;bottom: 0;left: 0;right: 0}
._date_topimg_image{width: 750rpx;height: 10rpx;}

._data_bottom{padding: 30rpx 0}
._date_txt{margin-left: 30rpx;}
._data_bottomimg{width: 24rpx;height: 24rpx;}
._data_bottomimg_image{width: 24rpx;height: 24rpx;}
._date_img{margin-left: 26rpx;}



.details{color:#999999}
._details_info{padding: 24rpx 30rpx 20rpx; line-height: 40rpx; font-size: 28rpx;color: #111111}
._details_cant{width: 240rpx;}
._details_cant >view{margin-bottom: 20rpx;}
._sts_bord{border-top: 2rpx solid #f8f8f8}
._look{ color: #FF4C90}

._eval_info{padding: 24rpx 30rpx 20rpx;line-height: 40rpx;}
._eval_head{width: 80rpx;height: 80rpx;margin-bottom:20rpx; }
._eval_head_image{width: 80rpx;height: 80rpx;}
._eval_cant{margin-left: 30rpx;line-height: 40rpx;}
._eval_name{font-size:28rpx;color: #999999}
._eval_manner{color: #FF4C90}
._eval_matter{margin-top: 20rpx;margin-bottom: 20rpx;font-size: 28rpx;color: #111111}
._eval_time{color: #999999}
._eval_time text{color: #FF4C90}

._goods_btn{height: 98rpx;background:#ffffff;position: fixed;bottom: 0;left: 0;right: 0}
._goods_coll{width:18%;text-align: center}
._goods_collimg{width: 50rpx;height: 46rpx;margin:10rpx 45rpx 6rpx 45rpx;}
._goods_collimg_image{width: 50rpx;height: 46rpx;}

._goods_buy{background: #FF4C90;width:82%;line-height: 98rpx;color: #fff;font-size: 32rpx;text-align: center}
	
</style>