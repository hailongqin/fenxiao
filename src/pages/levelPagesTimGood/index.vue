<template>
<view class="container">
    <view class="cant_title">产品介绍</view>
    <view class="cant_matter bmg">
        <!--<view class="cant_matter_t">
   - 提供专属的造型设计，打造私属形象定制一站式服务 -        
        </view>
        <view class="cant_matter_m">
　　苑苑形象设计，始创于1999，隶属于Y.YUAN苑苑集团。
14年专注健康、时尚美学。已由起初的造型机构全面发展成为
集形象设计、美容SPA、美容、国际教育、投资贸易、电子商
务等产业链为一体的集团型企业。 苑苑形象设计为每位会员
提供专属的造型设计、妆容定制、艺术美甲、服装搭配等私属
形象定制，打造私属形象定制一站式服务。              
        </view>   -->
        
		<rich-text nodes="{{detail}}"></rich-text>
	</view>
		
		    <!--<view class="cant_img bmg">
		        <view class="cant_img_show">
		          <image class="cant_img_show_image" src="../../img/Bitmap1.png"></image>
		        </view>  
		        <view class="cant_img_show">
		          <image class="cant_img_show_image" src="../../img/Bitmap2.png"></image>
		        </view> 
		        <view class="cant_img_show">
		          <image class="cant_img_show_image" src="../../img/Bitmap3.png"></image>
		        </view> 
		    </view> -->
		    <view class="_goods_btn clear">
				<view class="left _goods_coll">
							<view class="_goods_collimg" wx:if="{{userCollect}}">
								<image class="_goods_collimg_image" src="http://image.vdongchina.com/M00/03/3C/ZSUkmVngKpiESKFwAAAAAPaRnNs611.png"></image>
							</view>
							<view class="_goods_collimg" wx:else>
								 <image class="_goods_collimg_image" src="http://image.vdongchina.com/M00/03/3B/ZSUkmVngIauEKiTJAAAAAGTr1wI800.png"></image>
							</view>
					<view>收藏</view>
				</view>
		       <view class="right _goods_buy" @tap="toOrder">立即购买</view>
		    </view>     
</view>   
</template>

<script>
	export default {
		config: {
			"navigationBarTitleText": "图文详情"
		},	
		data() {
			return {
				detail:'',
				userCollect:false,
				serverId:'',
				product: {
                    id: '',
                    staffId:'',
	                guidePrice: 0,
	                num: 1,
	                thumbUrl: '',
	                name:'',
	                manicurName:''
	            },				
			}
		},
		methods: {
		    // collect(){				
				// var that = this	
		    // 	if(!that.userCollect){
				// 	wx.request({
				// 	  url: that.$root.apiServer+that.$root.appid + "/basic/api/serverCollect/collect",
				// 	  data: {
				// 			staffId:that.staffsId,
				// 			serverId:that.serverId,
				// 			type:'1',
				// 			token:getApp().globalData.token			  		  	
				// 	  },
				// 	  method:"POST",
				// 	  header: {
				// 	      'content-type': 'application/json'
				// 	  },
				// 	  success: function(res) {
				// 	  	if(res.data.success == true){
				// 			wx.showToast({
				// 			  title: '收藏成功',
				// 			  duration: 1000
				// 			})						  		
				// 	  		that.userCollect=true		
				// 			wx.request({
				// 			  url: that.$root.apiServer+that.$root.appid + "/basic/api/server/serverDetail",
				// 			  data: {
				// 			  	id:that.cId  	
				// 			  },
				// 			  method:"POST",
				// 			  header: {
				// 			      'content-type': 'application/x-www-form-urlencoded'
				// 			  },
				// 			  success: function(res) {
				// 			  	if(res.data.success == true){
				// 			  		that.collectNum=res.data.data.collectNum
				// 			  	}
							  				    
				// 			  }
				// 			})
				// 	  	}	else{


				// 			}

				// 	  }
				// 	})		    		
		    // 	}
		    // 	if(that.userCollect){
				// 	wx.request({
				// 	  url: that.$root.apiServer+that.$root.appid + "/basic/api/serverCollect/unCollect",
				// 	  data: {
				// 			staffId:that.staffsId,
				// 			serverId:that.serverId,
				// 			type:'1',
				// 			token:getApp().globalData.token			  		  	
				// 	  },
				// 	  method:"POST",
				// 	  header: {
				// 	      'content-type': 'application/json'
				// 	  },
				// 	  success: function(res) {
				// 	  	if(res.data.success == true){
				// 			wx.showToast({
				// 			  title: '取消收藏',
				// 			  duration: 1000
				// 			})					  		
				// 	  		that.userCollect=false	

				// 			wx.request({
				// 			  url: that.$root.apiServer+that.$root.appid + "/basic/api/server/serverDetail",
				// 			  data: {
				// 			  	id:that.cId	  	
				// 			  },
				// 			  method:"POST",
				// 			  header: {
				// 			      'content-type': 'application/x-www-form-urlencoded'
				// 			  },
				// 			  success: function(res) {
				// 			  	if(res.data.success == true){
				// 			  		that.collectNum=res.data.data.collectNum
				// 			  	}
							  				    
				// 			  }
				// 			})					  		
				// 	  	}
					  				    
				// 	  }
				// 	})		    		
		    // 	}	    		

		    	
		    // },			
			//订单
			toOrder(){
				var that=this
			    wx.navigateTo({
			        url: '../levelPagesSubmitOrder/levelPagesSubmitOrder'+'?product=' + that.product
			    })							  	
			},			
		},
		onLoad(e){
			var that = this	
			that.cId = e.id
			that.serverId=e.serverId
			var userCollect = e.userCollect=='false'?false:true
			that.userCollect=userCollect
			that.product=e.product
		//	that.userCollect = false
		//	that.userCollect = true
			wx.request({
			  url: that.$root.apiServer+that.$root.appid + "/basic/api/server/serverImgDetail",
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
			  	that.detail	= res.data.data
			  	}
			  				    
			  }
			})			
			
		},
		
	}		
</script>

<style scoped>
.container{padding-bottom: 120rpx;}
.cant_title{padding: 24rpx 30rpx;line-height: 44rpx;font-size: 30rpx;color: #333333}

.cant_matter{padding: 30rpx;font-size: 26rpx;line-height: 40rpx;}
.cant_img{padding:0 30rpx 30rpx 30rpx;}
.cant_img_show{width: 690rpx;height: 420rpx;margin-bottom: 30rpx;}
.cant_img_show_image{width: 690rpx;height: 420rpx;}	
._goods_btn{height: 98rpx;background:#ffffff;position: fixed;bottom: 0;left: 0;right: 0}
._goods_coll{width: 140rpx;text-align: center}
._goods_collimg{width: 50rpx;height: 46rpx;margin:10rpx 45rpx 6rpx 45rpx;}
._goods_collimg_image{width: 50rpx;height: 46rpx;}

._goods_buy{background: #FF4C90;width: 610rpx;line-height: 98rpx;color: #fff;font-size: 32rpx;text-align: center}
</style>