<template>
	<view>
	  <view class="topLine"></view>
	  	<view wx:if="{{status == 2}}">
		  <view class="product-list" wx:if="{{products.length}}">
		     <view class="product-item" wx:for="{{products}}" wx:key="gg" wx:for-index="index" wx:for-item="item">
		         <view class="classname" @tap="productItem(item.uuid)">
		             <view class="product-img"><image mode="aspectFill" class="product-img-image" src="{{item.thumbUrl}}"/></view>
		             <view class="product-title">{{item.name}}</view>
		             <view class="product-name" wx:if="{{item.title}}">{{item.title}}</view>
		             <view class="clear product-price">
		                 <view class="left">￥<text class="product-price-text">{{item.salePrice}}</text></view>
		             </view>
		         </view>
		     </view>
		  </view>
		  <view wx:else  class="nonePro" >
	  		暂无商品
		  </view>
	   </view>
	   <view wx:if="{{status == 1}}">
		    <view class="lists" wx:if="{{lists.length}}">
		      <view wx:for="{{lists}}" key="{{index}}" class="items">
		        <view wx:if="{{item.style&&item.status}}"  class="item " @tap="itemTapHandler(item.id,item.title,item.createTime)">
		          <image class="img" mode="aspectFill" src="{{'http://image.vdongchina.com/'+item.cover}}"/>
		          <text class="title">{{item.title}}</text>
		          <view class="info">
		            <text class="date">{{item.createTime}}</text>
		            <view>
		              <image class="icon" mode="aspectFit" src="http://image.vdongchina.com/M00/00/15/ZSUkmVlfHh2EYwcZAAAAAISvvMw527.png"/>
		              <text class="eyes">{{item.readerNum}}</text>
		            </view>
		          </view>
		        </view>
		        <view wx:elif="{{item.status}}"class="sitem" @tap="itemTapHandler(item.id,item.title,item.createTime)">
		          <view class="item-media">
		            <image class="img" mode="aspectFill" src="{{'http://image.vdongchina.com/'+item.cover}}"/>
		          </view>
		          <view class="item-main">
		            <view class="item-desc" style="width:100%">
		                {{item.title}}
		            </view>
		            <view class="item-title-row">
		              <view class="item-title date">{{item.createTime}}</view>
		              <view class="item-after">
		              	<image class="icon" mode="aspectFit" src="http://image.vdongchina.com/M00/00/15/ZSUkmVlfHh2EYwcZAAAAAISvvMw527.png"/>
		              	<text class="eyes">{{item.readerNum}}</text>
		              </view>
		            </view>
		          </view>
		        </view>
		      </view>
		    </view>	 
			<view wx:else class="lists">
		      <view class="nolists">暂无数据</view>
		    </view>
	   </view>
	</view>  
</template>

<script>
export default {
    config: {
        navigationBarTitleText:"搜索"
    },		
	data(){
		return{
			title:"",
			status:'0',
			lists:[],
			products:[]
		}
	},
	onLoad(e){
		var that = this
		console.log('1111',e)
		if(e.status && e.title){
			this.status = e.status
			this.title = e.title			
		}

		wx.setNavigationBarTitle({
		  title:e.title
		})
		if(this.status == 2){//商品
	        wx.request({
	            url: that.$root.apiServer+that.$root.appid+'/basic/api/product/findProduct',
	            data: {
					token: that.$root.globalData.token,
	                name:e.title,
	                pageNum:1,
	                pageSize:20
	            },
	            method: 'GET',
	            header: {
	                'content-type': 'application/json'
	            },
	            success (res) {
	            	that.products = res.data.data.list
	            }
	        })	
		}
		if(this.status == 1){//图文
	        wx.request({
	            url: that.$root.apiServer+that.$root.appid+'/basic/api/imagetext/search',
	            data: {
					token: that.$root.globalData.token,
	                title:e.title
	            },
	            method: 'POST',
	            header: {
	                'content-type': 'application/x-www-form-urlencoded'
	            },
	            success (res) {
	            	that.lists = res.data.imageTexts
	            	console.log(that.lists)
	            }
	        })	
		}		

	},
	methods:{
	      productItem (id){
	          wx.navigateTo({
	              url: '../goods/goods' + '?id=' + id
	          })          
	      },		
		itemTapHandler(id,title,createTime){				
			var openid = getApp().globalData.openid
			var that = this
	      wx.request({
	          url: that.$root.apiServer+that.$root.appid+'/basic/api/imagetext/select/id',
	          method: 'POST',
	          data: {
	            id: id,
	            openid:openid
	          },
	          header: {
	              'content-type': 'application/x-www-form-urlencoded'
	          },
	          success (res) {
					var e = {
						status:that.status,
						title:that.title
					}
					that.onLoad (e)
	          }
	      })
	      wx.navigateTo({		      	
	          url: '../graphic/graphic' + '?id=' + id+"&title="+title+"&createTime="+createTime
	      })
	    }	
	}
}		
</script>

<style scoped>
.nolists{
  padding: 30px;
  background: #fff;
  font-size: 15px;
  text-align: center;
  margin-bottom: 10px;
}	
.nonePro{height:300rpx;line-height: 300rpx;text-align: center;}	
.product-list{background:#ffffff;padding:20rpx;display: flex; flex-wrap:wrap;justify-content:space-between }
.product-item{width: 340rpx;height:auto;margin-bottom: 20rpx;}
.product-img{margin-bottom: 10rpx;}
.product-img .product-img-image{width: 340rpx;height: 350rpx;background: red;}
.product-title{color: #999999;font-size: 26rpx;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width: 350rpx;margin-bottom: 20rpx;}
.product-name{font-size: 28rpx;line-height: 40rpx;overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;word-break: break-all;width: 350rpx;margin-bottom: 20rpx;}
.product-price{font-size: 30rpx;line-height: 40rpx;color:#111111;}
.product-price .product-price-text{font-size: 30rpx;}


.classify{
  background: #efeff4;
  padding-bottom: 1px;
}
.navs{
  margin-bottom: 10px;
}
  .nav{
    display: inline-block;
  }
  .text{
    display: inline-block;
    padding: 0 10px;
    border-bottom: 4px solid transparent;
    margin: 0 9px;
    box-sizing: border-box;
  }
 	.lists{
padding:0 15px 0 15px;
background:#fff; 		
 	} 
.item-box{
    white-space: nowrap;
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
    display: inline-block;
}
.item{
  padding: 15px 0;
  background: #fff;
}
.img{
  width:100%;
  border-radius: 5px;
  overflow: hidden;
}
.title{
  font-size: 18px;
  color: #3a3a3a;
  height: 20px;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  margin: 12px 0;
}
.info{
  display: flex;
  justify-content:space-between;
  font-size: 14px;
  color: #999;
}
.data{
	font-size:14px;
	color:#999;

}
.icon{
  width: 15px;
  height: 12px;
  margin-right: 3px;
}
.nolists{
  padding: 30px;
  background: #fff;
  font-size: 15px;
  text-align: center;
  margin-bottom: 10px;
}
.sitem,.item-main,.item-title-row{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.sitem{
  background-color:#fff;
  position:relative;
  padding:17px 0;

}


.item-media+.item-main {
    margin-left:10px;
}
.item-media{width: 90px;height: 90px;}
.item-media .img{
  width:100%;
  height:100%;
}
.item-main{
  height:90px;
  flex-direction:column
}
.item-main{
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
}
.item-desc{
  position:relative;
  top:6px;
}
.item-title-row{
  position:relative;
  bottom:6px;
  width:100%;

}
.item-title{

}
.item-desc {
    font-size:15px;
    color: #111111;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    letter-spacing: 0.62px;
    line-height: 1;
    max-height: 42px;
}
.eyes{font-size: 14px;color: #999999;}
.date{font-size: 14px;color: #999;}
.lists .items{
  border-bottom:#efeff4 1px solid ;
}  
.lists .items:last-child{
	border-bottom: none;
}
</style>