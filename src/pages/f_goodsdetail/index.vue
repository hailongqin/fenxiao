<template>
	<view>
		  <view class="container">
		    <swiper class="banner" indicator-dots="true" autoplay="{{play}}" interval="4000" duration="1000" circular="true" style="width:100%; height:750rpx;">
                <view wx:for="{{imgUrls}}" wx:key="imgUrls">
                    <swiper-item class="swiperItem" wx:if="{{item.video==true}}">
                        <image src="{{item.url}}" class="slide-image"></image>  
                        <image src="http://image.vdongchina.com/M00/16/85/ZSUkmVsWBNOEFFy4AAAAABxyiOE801.png" class="videoBtn" @tap="videoPlay"></image>                  
                    </swiper-item>                    
                    <swiper-item  wx:if="{{item.video==null || item.video==false}}">
                        <image src="{{item.url}}" class="slide-image"></image>
                    </swiper-item>
                </view>                
		    </swiper>
            <view class="video_back" wx:if="{{isVideo}}">
                <video id="{{myVideo}}" class="kcvideo" src="{{videoUrl}}" controls="true"></video>
            </view>
		    <view class="video_btn" wx:if="{{isVideo}}" @tap="delVideo">关闭视频</view>
		    <view style="background: #f2f2f2;">
			    <view class="price">
			        <view class="price-left">￥{{showPrice}}</view>
			        <view class="price-right">
			            <button open-type="share"><image class="img" src="http://image.vdongchina.com/M00/15/5C/ZSUkmVr-ZlCEJnABAAAAAOJhcl4521.png"></image></button>
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



    <view wx:if="{{conDisplay}}">
        <view class="pageback" @tap="clickBack"></view>
        <view class="cont-box">
            <image class="cancel" src="http://image.vdongchina.com/M00/06/11/ZSUkmVoXtyiEeH_8AAAAAJnM000802.png" @tap="cancel"></image>
            <view class="contant">
                <view class="cont-back">
                    <view class="good-img" wx:if="{{img}}">
                        <image src="{{img}}" class="good-img-image"></image>
                    </view>
                    <view wx:else class="good-img">暂无图片</view>
                    <view class="good-other">
                        <view class="good-price">价格：￥{{rulingPrice}}</view>
                        <view class="good-store">库存：{{stock}}件</view>
                        <view class="good-norm" wx:if="{{noSku}}">已选择：<text wx:for="{{salePropertyName}}"  wx:key="gg">{{item+' '}}</text>
                        </view>
                    </view>
                </view>
            </view>

            <view class="good-norms">            
			        <view class="colour" wx:for="{{setting}}"  wx:for-item="set"  wx:key="gg">
			          <view class="titel">{{set.propertyName}}</view>
			          <view class="items">
			            <view wx:for="{{set.salePropertyList}}"  wx:key="gg" wx:for-index="firstIndex" wx:key="index" class="{{ defalut[set.id]==item.salePropertyId? 'color-active item' : 'item'}}"  @tap="colorTap(set.id,item.salePropertyId,item.salePropertyName)">
			                {{item.salePropertyName}}
			            </view>
			          </view>
			        </view>

                <view class="auto">
                    <view class="norms-main">
                        <view class="norms-top">数量</view>
                        <view class="stepper">
                            <text class="{{minusStatus + ' stepper-text'}}" @tap="bindMinus">-</text>
                            <input class="stepper-input" type="number" @change="bindManual" value="{{num}}" />
                            <text class="normal stepper-text" @tap="bindPlus">+</text>
                        </view>
                    </view>
                </view>
            </view>
            
            <view class="btn btnTow"  wx:if="{{ isCar==3 }}">
            	<view class="joinCar tow" @tap="car">加入购物车</view>
            	<view class="nowBuy tow" @tap="buy">立即购买</view>
            </view>            
            <view wx:else class="btn main-back nowBuy" @tap="subm(currentItem)">确认</view>            
        </view>
    </view>

        <!-- <fskuselector
            :display="display"
            :is-car="isCar" 
            :product-skus="productSkus" 
            :goods-name="name"
            :detailId="detailId"
            :color="color"
            @displayChange="displayChangeHandler"></fskuselector> -->
  </view>          
</template>

<script>
//import fskuselector from '../../components/fSkuSelector/fSkuSelector'	
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
        //fskuselector: fskuselector
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
            play:true,      
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
            isDealer:false,
             num: 1,
            minusStatus: 'disabled',
            currentItem: 0,

            product: {},
      		
            conDisplay: false,
            setting:[],
            skuList:[],//对比数据
            defalut: {},
            names:{},
            rulingPrice:'',//价格
    		salePropertyName:[],//规格
            skuId:'',//商品加入购物车ID
            img:'',//产品图取第一个
            name:'',
            enableSku:"",
            noSku:true,//商品有无规格
            stock:0,
            ordno:'',
            detailId:'',
            isVideo:false,//是否显示视频         
            videoUrl:'',//视频  
            myVideo:'myVideo'
        }
    },
//  onShow(e){
// 	
//  },
  onReady(e) {
  	this.videoContext = wx.createVideoContext(this.myVideo)
  },
   onLoad(e){ 
       console.log(e,"---------分享")  
    var that = this  
	if(e.pid){
		that.pid = e.pid
		that.$root.globalData.pid = e.pid				
	}  
    that.detailId = e.id
    if(e.id){
        if (that.$root.globalData.token == null || that.$root.globalData.token == ""){
          that.$root.watch = that.initData
        }else{
          that.initData()
        } 
      // await this.$root.login()		 

	}  	   
  },   
	onShareAppMessage () {		
		var that = this
        if(that.isDealer){
            return { 
                title: '商品详情',
                path: 'pages/f_goodsdetail/f_goodsdetail?id=' + that.detailId+"&pid="+that.$root.globalData.openid
            }
        }else{
            return { 
                title: '商品详情',
                path: 'pages/f_goodsdetail/f_goodsdetail?id=' + that.detailId
            }            
        }


    },   
    onPageScroll:function(e){ // 获取滚动条当前位置
        if(e[0].scrollTop>375){
            this.videoContext.pause()
        } 
    },
    methods:{
        videoPlay(){//播放视频
            var that=this
            if(that.videoUrl){
                that.isVideo=true   
                that.play=false     
                that.videoContext.play() 
            }
        },
        delVideo() {//关闭视频
            var that=this
            that.isVideo=false  
            that.play=true  
            this.videoContext.seek(0)
            this.videoContext.pause()
        },      
        initData(){
        var that =this
        wx.request({
            url:this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/product/detail/'+that.detailId,
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
                        if(that.imgUrls.length){
                            for(let i=0;i<that.imgUrls.length;i++){
                                if(that.imgUrls[i].video == true){
                                    that.videoUrl=that.imgUrls[i].videoUrl
                                }
                            }
                        }
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


                    var obj = {}
                        that.name = res.data.object.name
                        that.setting =res.data.object.mainPropList
                        that.skuList =res.data.object.skuList
                        that.img=res.data.object.imageList[0].url	       			
                        that.setting.forEach(function(item,idx){
                            obj[item.id]=""
                        })
                        that.defalut = obj	 
                        that.enableSku = res.data.object.enableSku
                        if(that.enableSku){
                            that.rulingPrice = res.data.object.showPrice
                            that.stock= res.data.object.totalStock
                        }else{
                            that.rulingPrice = res.data.object.showPrice
                            that.stock= res.data.object.totalStock
                            that.noSku=false
                            that.skuId = res.data.object.skuList[0].skuId
                        }
                    }
            }
        })
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
        makeCall(tel) {
            wx.makePhoneCall({
                phoneNumber: tel
            })
        },
    	showDialog(){
    		this.conDisplay = true
    		this.isCar = 3
    	},
        joinCar () {
            if (this.status == '1') {
                this.num = 1
                this.conDisplay = true
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
                this.conDisplay = true
                this.isCar = 2
            } else {
                wx.showModal({
                    title: '提示',
                    content: '商品已下架'
                })
            }
        },

        cancel(){
            this.conDisplay = false
            //this.$emit('displayChange', this.conDisplay)
        },
        bindMinus () {
            var num = this.num
            // 如果大于1时，才可以减
            if (num > 1) {
                num--
            }
            // 大于一件的时，normal状态，否则disable状态
            var minusStatus = num <= 1 ? 'disabled' : 'normal'
            // 数值与状态写回
            this.num = num
            this.minusStatus = minusStatus
        },
        bindPlus () {
            var num = this.num
            num++
            // 大于一件的时，normal状态，否则disable状态
            var minusStatus = num < 1 ? 'disabled' : 'normal'
            // 数值与状态写回
            this.num = num
            this.minusStatus = minusStatus
        },
        /* 输入框事件 */
        bindManual (e) {
            var num = e.detail.value
            // 数值与状态写回
            this.num = num
        },
        clickBack () {
            this.conDisplay = false
            //this.$emit('displayChange', this.conDisplay)
        },      
		car(){
			var that = this
			if(that.enableSku){
				if (that.skuId) {
	                    wx.request({
	                        url: this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/shopping/addOrUpdate',
	                        data: {
	                            token: getApp().globalData.token,
	                            skuId: that.skuId,
	                            quantity: that.num,
	                            pid:that.$root.globalData.pid
	                        },
	                        method: 'POST',
	                        header: {
	                            'Content-Type': 'application/x-www-form-urlencoded'
	                        },
	                        success (res) {
	                            if (res.data.code == '200') {
	                            	that.conDisplay=false
			                        wx.showToast({
			                            title: '加入成功',		                            
			                        })
	                            } else {
	                                wx.showModal({
	                                    title: '提示',
	                                    content: res.data.message,
	                                })
	                            }
	                        }
	                    })				
				} else {
	                wx.showModal({
	                    title: '提示',
	                    content: '请选择规格'
	                })
	            }
			}else{
                wx.request({
                    url: this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/shopping/addOrUpdate',
                    data: {
                        token: getApp().globalData.token,
                        skuId: that.skuId,
                        quantity: that.num,
                        pid:that.$root.globalData.pid
                    },
                    method: 'POST',
                    header: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    success (res) {
                        if (res.data.code == '200') {
                        	that.conDisplay=false
	                        wx.showToast({
	                            title: '加入成功',		                            
	                        })
                        } else {
                            wx.showModal({
                                title: '提示',
                                content: res.data.message,
                            })
                        }
                    }
                })				
			}
		},
		buy(){
			var that = this
			if(that.enableSku){
				if (that.skuId) {
	                    wx.request({
	                        url: this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/order/buyImmediately',
	                        data: {
	                            token: getApp().globalData.token,
	                            skuId: that.skuId,
	                            quantity: that.num,
	                            pid:that.$root.globalData.pid
	                        },
	                        method: 'POST',
	                        header: {
	                            'Content-Type': 'application/x-www-form-urlencoded'
	                        },
	                        success (res) {
	                            if (res.data.code == '200') {
										that.ordno=res.data.object.order.ordno
							            wx.redirectTo({
							                url: '../f_confirmorder/f_confirmorder?ordno='+ that.ordno
							            })										
	                            } else {
	                                wx.showModal({
	                                    title: '提示',
	                                    content: res.data.message,
	                                })
	                            }
	                        }
	                    })					      
	            } else {
	                wx.showModal({
	                    title: '提示',
	                    content: '请选择规格'
	                })
	            }
	        }else{
                    wx.request({
                        url: this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/order/buyImmediately',
                        data: {
                            token: getApp().globalData.token,
                            skuId: that.skuId,
                            quantity: that.num,
                            pid:that.$root.globalData.pid
                        },
                        method: 'POST',
                        header: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        success (res) {
                            if (res.data.code == '200') {
									that.ordno=res.data.object.order.ordno
						            wx.redirectTo({
						                url: '../f_confirmorder/f_confirmorder?ordno='+ that.ordno
						            })										
                            } else {
                                wx.showModal({
                                    title: '提示',
                                    content: res.data.message,
                                })
                            }
                        }
                    })		        	
	        }
		},
        //确认商品
        subm () {
        	var that = this     
            if (this.isCar == 1) {
				that.car()
            }else{
                that.buy()
            }
        },
        
    
        colorTap: function(sid,id,name) {//index for mainPropList,_index for salePropertyList
    		var that = this
    		
    		this.defalut[sid] = id
    		this.names[sid] = name
    		this.defalut=this.defalut    		
    		this.names=this.names
    		
    		var newList=[]
    		var salePropertyName=[]
    		
    		for(var v in this.defalut){
    			if(this.defalut[v]==""){
    				return false
    			}
    			newList.push(this.defalut[v])
    		}
     		if(newList.length<that.setting.length){
    			return
    		} 
    		for(var v in this.names){
    			if(this.names[v]==""){
    				return false
    			}
    			salePropertyName.push(this.names[v])
    		}    
     		if(salePropertyName.length<that.setting.length){
    			return
    		} 
    		that.salePropertyName = salePropertyName  
    		
			/*for(var k = 0;k<that.salePropertyName.length;k++){   
					for(var i= 0,len =that.skuList.length;i<len;i++){
						for(var j = 0,_len=that.skuList[i].salePropertyList.length; j < _len; j++) {
							if(that.salePropertyName[k] == that.skuList[i].salePropertyList[j].salePropertyName){
								that.skuId = that.skuList[i].skuId
								that.rulingPrice = that.skuList[i].rulingPrice
							}
						}	
					}
				
			} */
			for(var i=0;i<that.setting.length;i++){
				for(var j=0;j<that.setting[i].salePropertyList.length;j++){
					if(newList[0] == that.setting[i].salePropertyList[j].salePropertyId){	
						
						that.img = that.setting[i].salePropertyList[j].propertyImg
					}
					
				}			
			}
			for(var i=0;i<that.skuList.length;i++){
				var arr = []				
				for(var j=0;j<that.skuList[i].salePropertyList.length;j++){
					arr.push(that.skuList[i].salePropertyList[j].salePropertyName)
				}
				if(arr.sort().equals(that.salePropertyName.sort())){
					that.rulingPrice = that.skuList[i].rulingPrice;
					that.skuId = that.skuList[i].skuId;
					that.stock = that.skuList[i].stock;
					break;
				}
				
				
				
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
    position: relative
}




.swiperItem{ position: relative}
.slide-image{
    width:100%;
    height:750rpx;
    display:block;

}
.video_back{width: 100%;height: 750rpx;background: #000000;position: absolute;top: 0;left: 0;z-index: 999;}
.kcvideo{width: 100%;height: 90%;}
.video_btn{position: absolute;top: 675rpx;left: 0;width: 100%;height: 74rpx;line-height: 74rpx;text-align: center;color:#ffffff;z-index: 1000;font-size: 40rpx;font-weight: bold}
.videoBtn{
    position: absolute;
    left: 50%;
    top: 50%;
    width: 128rpx;
    height: 128rpx;
    margin-left: -64rpx;
    margin-top: -64rpx
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




.cancel{
    height: 48rpx;
    width:48rpx;
    display: block;
    position: absolute;
    right: 24rpx;
    top:24rpx;
}
.clear::after{display: block;height: 0;clear: both;content: "";overflow: hidden;visibility: hidden}
.left{float: left}
.right{float: right}
.auto{width: 690rpx;margin-left: auto;margin-right: auto}
.pageback{position: fixed;top: 0;bottom: 0;width: 100%;height: 100%;z-index: 998;background: rgba(0,0,0,0.5)}
.cont-box{position:fixed;bottom: 0;height:auto;z-index: 1000;width:100%;background: #fff;padding-bottom: 180rpx;}
.contant{height: 176rpx;padding-bottom:48rpx;padding-top: 42rpx; }
.cont-back{width: 750rpx;height:176rpx;}
.good-img{width:176rpx;height:176rpx;position: absolute;left: 30rpx;top:42rpx;border-radius: 6rpx;overflow: hidden;border: solid 1rpx #e5e5e5;}
.empty{border:solid 2rpx #e3e3e3;background: #fff}
.good-img .good-img-image{width:174rpx;height:174rpx;}
.good-other{margin-left: 222rpx;font-size: 28rpx;line-height: 28rpx;}
.good-price{font-size: 50rpx;margin-top: 42rpx;line-height: 50rpx;}
.good-store{margin-top: 12rpx;}
.good-norm{margin-top: 12rpx;}
.norms-top{font-size: 24rpx; color: #999999;line-height: 80rpx;}
.norms-main{padding-bottom:20rpx;}
.norms-bottom{max-height:300rpx;overflow-x:scroll;}
.norms-bottom .option{ float: left;font-size: 28rpx; padding: 14rpx 34rpx; margin-right: 20rpx;border-radius: 6rpx;margin-bottom:20rpx;}
.b6{border:solid 2rpx #b6b6b6;}
.f3{border:2rpx solid #ff3e78;color:#ff3e78}
.norms-bottom .sub,.norms-bottom .nub,.norms-bottom .add{float: left;text-align: center;}
.norms-bottom .sub,.norms-bottom .add{width: 88rpx;height: 60rpx;line-height: 60rpx;border:solid 2rpx #b6b6b6;}
.norms-bottom .sub{border-top-left-radius: 6rpx;border-bottom-left-radius: 6rpx;border-right: none}
.norms-bottom .add{border-top-right-radius: 6rpx;border-bottom-right-radius: 6rpx;border-left: none}
.norms-bottom .nub{width: 98rpx;height: 60rpx;border:solid 2rpx #b6b6b6;line-height: 60rpx}
.stepper {height: 60rpx;border-radius: 4rpx;}
.stepper .normal{color: black;background: #ffffff}
.stepper .stepper-text {width:112rpx;line-height:60rpx;text-align: center;float: left;font-size: 28rpx;background: #f5f5f5;margin-right: 2rpx;font-weight: bold;}
.stepper .stepper-input {width:136rpx;height: 60rpx;float: left;text-align: center;font-size: 24rpx;background: #f5f5f5;margin-right: 2rpx;}

.stepper .disabled{color: #ccc;background: #f6f6f6}

.btn{position:absolute;width: 100%;height: 100rpx;bottom: 0;font-size: 32rpx;color: #ffffff;text-align: center;line-height: 100rpx;}

.btnTow{display: flex;}
.tow{flex:1}
.joinCar{background:#b3b4b7 ;}
.nowBuy{background:#4e5059 ;}
.good-cont{position: absolute;width: 100%;height: 800rpx;background: #fff;bottom:0;left: 0;z-index: -9}





.colour{
  min-height:160rpx;
}
.colour .titel{
  height: 28rpx;
  line-height: 28rpx;
  font-size:28rpx;
  color:#999;
  margin-left:30rpx;
}
.items{
  min-height:76rpx;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top:24rpx;
  padding-left:6rpx;
}
.colour .items .item{
	margin:0 0 16rpx 24rpx;
  height:60rpx;
  line-height: 60rpx;
  border-radius: 6rpx;
  min-width:48rpx;
  max-width:600rpx;
  font-size:24rpx;
  padding:0 32rpx;
  color:#666;
  text-align: center;
  background: #f5f5f5;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.colour .items .color-active{
  background: #4e5059;
  color:#fff;
}
</style>
