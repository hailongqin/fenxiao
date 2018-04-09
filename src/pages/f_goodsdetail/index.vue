<template>
	<view>
		  <view class="container">
		    <swiper class="banner" indicator-dots="true" autoplay="true" interval="4000" duration="1000" circular="true" style="width:100%; height:750rpx;">
		        <swiper-item  wx:for="{{imgUrls}}" wx:key="imgUrls">
		            <image src="{{item.url}}" class="slide-image" style="width:100%;height:750rpx;display:block;"/>
		        </swiper-item>
		    </swiper>
		    <view style="background: #f2f2f2;">
			    <view class="price">
			        <view class="price-left">￥{{showPrice}}</view>
			        <view class="price-right" wx:if="{{isDealer}}">
			            <button open-type="share"><image class="img" src="http://image.vdongchina.com/M00/06/12/ZSUkmVoXvE2EDNDiAAAAAFVlicM305.png"></image></button>
			        </view>
			    </view>
			    <view class="describe">
			        <view class="content">{{name}}</view>
			    </view>
			    <view class="tips">
			        <view class="item postage"></view>
			        <view class="item sold">已售<view class="num">{{salesVolume}}</view></view>
			    </view>
			    <view class="select" @tap="showDialog">
			        <view class="txt">请选择规格</view>
			        <image class="img" src="http://image.vdongchina.com/M00/06/11/ZSUkmVoXuZuEcmklAAAAAIZTr30042.png"></image>
			    </view>
			  
			    <view class="detaill">
			        <view class="txt">商品详情</view>
			    </view>
		    </view> 
		    <view class="detail">
		    	<view class="dat_main"><rich-text nodes="{{detail}}"></rich-text></view>
		    </view>
		    <view class="bottom-nav">
		        <view class="wechat" @tap="makeCall(telNum)">
		            <image class="img" src="http://image.vdongchina.com/M00/06/11/ZSUkmVoXuKuERjE9AAAAANrS-ak413.png"></image>
		            <view class="txt">客服</view>
		        </view>
		        <view class="shopcart" @tap="joinCar">加入购物车</view>
		        <view class="buy" @tap="onceBuy">立即购买</view>
		    </view>
		  </view>
        <fskuselector
            :display="display"
            :is-car="isCar" 
            :product-skus="productSkus" 
            :goods-name="name"
            :color="color"
            @displayChange="displayChangeHandler"></fskuselector>
  </view>          
</template>

<script>
import fskuselector from '../../components/fSkuSelector/fSkuSelector'	
export default {
    config: {
        "navigationBarTitleText": "商品详情",
        "backgroundColor": "#262833"
    },   
     editorConfig: {
        color: {
          el: ['text', 'color'],
          label: '选择颜色',
          type: 'String',
          value: '#303030',
          director : 'ColorPicker'
        }
    },
    components: {
        fskuselector: fskuselector
    },
    props: {
        color: {
            default: '#ff3e78',
            type: String
        },
        goodsName :{
            default :'',
            type:String
        }
    },
   
    data () {
        return {
            imgUrls: [
            ],            
            isCar: 0,
            display: 'display:none',
            name: '',
            status: 1,
            productSkus: [],
            showPrice:'',
            detailId:'',
            detail:'',
            salesVolume:'',
//            fictitiousSalesVolume:'',
            pid:'',
            telNum:'',
            isDealer:false
        }
    },
//  onShow(e){
// 	
//  },
   onLoad(e){   
    var that = this  
	if(e.pid){
		that.pid = e.pid
		that.$root.globalData.pid = e.pid				
	}  
    that.detailId = e.id
    if(e.id){
	   wx.request({
	       url:this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/product/detail/'+e.id,
	       data:{
	       		token: that.$root.globalData.token,
	       		pid:that.$root.globalData.pid
	       },
	       method:"GET",
	        header: {
	           'content-type': 'application/x-www-form-urlencoded'
	       },
	       success: function(res) {
	       		if(res.data.code =="200"){
	       			that.imgUrls= res.data.object.imageList
	       			that.showPrice = res.data.object.showPrice
	       			that.name = res.data.object.name
	       			that.detail = res.data.object.detail
	       			if(res.data.object.openFictitiousSalesVolume){
	       				if(res.data.object.fictitiousSalesVolume){
	       					if(res.data.object.salesVolume){
	       						that.salesVolume = parseInt(res.data.object.fictitiousSalesVolume)+parseInt(res.data.object.salesVolume)
	       					}else{
	       						that.salesVolume = parseInt(res.data.object.fictitiousSalesVolume)
	       					}
	       					
	       				}else{
	       					if(res.data.object.salesVolume){
	       						that.salesVolume = parseInt(res.data.object.salesVolume)
	       					}else{
	       						that.salesVolume = 0
	       					}
	       				}	       				
	       			}else{
	       				if(res.data.object.salesVolume){
	       					that.salesVolume = parseInt(res.data.object.salesVolume)
	       				}else{
	       					that.salesVolume = 0
	       				}
	       			}
                    
                    //客服电话
                    that.telNum = res.data.object.consumServiceMobile
	       		}
	       }
	   })
	}  
    wx.request({
      url: this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/user/isDealer',
      data: {
        token: that.$root.globalData.token,
        pid:that.$root.globalData.pid
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        if(res.data.code == "200"){
          that.isDealer = res.data.object
        }
      }
    })	   
  },   
	onShareAppMessage () {		
		var that = this
		return { 
			title: '商品详情',
			path: 'pages/f_goodsdetail/f_goodsdetail?id=' + this.detailId+"&pid="+that.$root.globalData.openid
			}

	},   
    methods:{
        makeCall(tel) {
            wx.makePhoneCall({
                phoneNumber: tel
            })
        },
    	showDialog(){
    		this.display = 'display:block'
    		this.isCar = 3
    	},
        joinCar () {
            if (this.status == '1') {
                this.num = 1
                this.display = 'display:block'
                this.isCar = 1 // 默认为0，1：加入购物车，2：立即购买
            } else {
                wx.showModal({
                    title: '提示',
                    content: '商品已下架'
                })
            }
        },
        onceBuy () {        	
            if (this.status == '1') {
                this.num = 1
                this.display = 'display:block'
                this.isCar = 2
            } else {
                wx.showModal({
                    title: '提示',
                    content: '商品已下架'
                })
            }
        }        
    }
}
</script>

<style scoped>
page{
    padding-bottom: 120rpx;
}
.left{
    float:none;
}
.right{
    float:none;
}
.container{
    height:100%;
    overflow: scroll;
}
.container .price{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    height:115rpx;
    background: #fff;
    border-top:1rpx solid #e5e5e5;
}
.container .price .price-left{
    margin-left:22rpx;
    margin-top:35rpx;
    font-size:50rpx;
    color:#222;
    height: 50rpx;
    line-height: 50rpx;
}
.container .price .price-right{
    height:50rpx;
    width:75rpx;
    margin-top:31rpx;
    margin-right: 11rpx;
}
.container .price .price-right button{
	background: #fff;
}
.container .price .price-right .img{
    height: 50rpx;
    width:50rpx;
    display: block;
    margin-right:25rpx;
}
.container .describe{
    height:80rpx;
    background: #fff;
}
.container .describe .content{
    height:80rpx;
    width:690rpx;
    margin:0 auto;
    font-size: 32rpx;
    line-height: 40rpx;
    overflow:hidden;
    text-overflow: ellipsis;
    display:-webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient:vertical;
    color:#222;
}
.container .tips{
    height: 82rpx;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.container .tips .item{
    font-size:22rpx;
}
.container .tips .postage{
    margin-left:30rpx;
    color:#999;
}
.container .tips .sold{
    margin-right:30rpx;
    color:#878787;
}
.container .tips .sold .num{
    display: inline-block;
}
.container .select{
    margin:16rpx 0;
    height:86rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
}
.container .select .txt{
    margin-left:30rpx;
    font-size:28rpx;
    color:#222;
}
.container .select .img{
    margin-right:11rpx;
    width:36rpx;
    height:48rpx;
    display:block;
}
.container .detaill{
    height: 85rpx;
    border-bottom:1rpx solid #e5e5e5;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: #fff;
}
.container .detaill .txt{
    margin-left:30rpx;
    font-size:28rpx;
    color:#222;
}
.container .detail-content{
    height:100rpx;
    margin-bottom:115rpx;
}
.bottom-nav{
    position: fixed;
    bottom:0;
    left: 0;
    height:98rpx;
    width:100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top:1rpx solid #e5e5e5;
}
.bottom-nav .wechat{
    height:100%;
    width:14.4%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #fff;
}
.bottom-nav .wechat .img{
    height: 48rpx;
    width:48rpx;
    display: block;
    margin-bottom:8rpx;
}
.bottom-nav .wechat .txt{
    font-size:20rpx;
    color:#666;
}
.bottom-nav .shopcart{
    width:42.8%;
    background: #b3b4b7;
    color:#fff;
    font-size:32rpx;
    height: 98rpx;
    line-height: 98rpx;
    text-align: center;
}
.bottom-nav .buy{
    width:42.8%;
    background: #4e5059;
    color:#fff;
    font-size:32rpx;
    height: 98rpx;
    line-height: 98rpx;
    text-align: center;
}
.detail{width: 100%; overflow-x: hidden;word-wrap: break-word;word-break:break-all;background: #fff;}
.dat_main{padding: 10rpx;font-size: 28rpx;}
button{padding-left: 0;}
</style>
