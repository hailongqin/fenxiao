<template>
    <view style="{{conDisplay}}">
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
</template>

<script>
// Warn if overriding existing method
if(Array.prototype.equals)
  console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
  // if the other array is a falsy value, return
  if (!array)
    return false;
  // compare lengths - can save a lot of time 
  if (this.length != array.length)
    return false;
  for (var i = 0, l = this.length; i < l; i++) {
    // Check if we have nested arrays
    if (this[i] instanceof Array && array[i] instanceof Array) {
      // recurse into the nested arrays
      if (!this[i].equals(array[i]))
        return false;    
    }      
    else if (this[i] != array[i]) { 
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false;  
    }      
  }    
  return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});


export default {
    props: {
        display: {
            type: String,
            default: 'display: none'
        },
        isCar: {
            type: Number,
            default: 0
        },
        productSkus: Array,
        goodsName: String,
        color:String
    },
    data () {
        return {
            num: 1,
            minusStatus: 'disabled',
            currentItem: 0,

            product: {
//              id: '',
//              price: 0,
//              stockNum: 0,
//              skuSpec: '',
//              num: 0,
//              url: ''
            },
      		
            conDisplay: this.display,
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
            ordno:''
        }
    },
    watch: {
        display (newVal) {
            this.conDisplay = newVal
        },
        productSkus (newVal) {
            this.skus = newVal
        },

    },
   onLoad(e){
    var that = this  
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
			    	console.log(res,"res555555")
			    	if(that.enableSku){
			    		that.rulingPrice = res.data.object.showPrice
			    		that.stock= res.data.object.totalStock
			    		var salePropertyName = []
			    		for(var i = 0;i<res.data.object.mainPropList.length;i++){
			    			salePropertyName.push(res.data.object.mainPropList[i].propertyName)
			    		}
			    		that.salePropertyName=salePropertyName
			    	}else{
			    		that.rulingPrice = res.data.object.showPrice
			    		that.stock= res.data.object.totalStock
			    		that.noSku=false
			    		that.skuId = res.data.object.skuList[0].skuId
			    	}
	       		}
	       }
	   })
       
       
  },       
    methods: {
        cancel(){
            this.conDisplay = 'display:none'
            this.$emit('displayChange', this.conDisplay)
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
            this.conDisplay = 'display:none'
            this.$emit('displayChange', this.conDisplay)
        },      
		car(){
			var that = this
			if(that.enableSku){
				console.log(that.skuId,"that.skuId====>>>car222")
				if (that.skuId) {
					console.log(that.skuId,"that.skuId====>>>car")
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
	                            	that.conDisplay="display:none"
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
                        	that.conDisplay="display:none"
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
			console.log(that.img,"516316103016516511")
			for(var i=0;i<that.skuList.length;i++){
				var arr = []
				for(var j=0;j<that.skuList[i].salePropertyList.length;j++){
					arr.push(that.skuList[i].salePropertyList[j].salePropertyName)
				}
				console.log(arr)
				if(arr.equals(that.salePropertyName)){
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