<template>
  <!--index.wxml-->
  <view class="container">
    <view class="content">
        <view class="navs" wx:if="{{tshow.show == 1}}">
            <view class="item-box">
                <view class="nav" wx:for="{{items}}" wx:key="cId" @tap="itemTapHandler(item.cId,index)">
                	<view wx:if="{{active==index}}" style="height:auto;">
                		<view class="_item">
	                    <text class="text" style="{{'color:#333;background:'+activeColor+';border-bottom:none;font-size:28rpx;'}}">{{item.name}}</text>
	                    <view class="sanjiao1">
	                    		<image class="img" src="http://image.vdongchina.com/M00/0A/2B/ZSUkmVpe6SGERBNFAAAAAMiTn4g012.png"></image>
	                    </view>
	                	</view>
	                	<view class="s_nav" style="min-height: 118rpx;" wx:if="{{tshow.show == 1}}">
								      <view style="height:118rpx;border-bottom:1rpx solid #f2f2f2;" wx:for="{{secondItems}}" wx:key="indexs"  class="s_item" wx:for-index="indexs" @tap.stop="secondItemTapHandler(indexs,item.kindId)">
							            <view class="s_text" wx:if="{{currentTab == indexs}}" style="text-align:center;margin-bottom:1rpx;border-left:6rpx solid #262833;font-size:28rpx;height:118rpx;line-height:118rpx;background:#fff;color:#333;box-sizing:border-box;">{{item.name}}</view>
							            <view class="s_text" wx:else style="text-align:center;margin-bottom:1rpx;font-size:28rpx;height:118rpx;line-height:118rpx;background: #fff;color:#333;">{{item.name}}</view>
								      </view>      	        	
					        	</view> 
                	</view>
                	<view class="_item" wx:else>
                    <text class="text" style="{{'color:#333;background:#f2f2f2;font-size:28rpx;'}}">{{item.name}}</text>
                    <view class="sanjiao2">
                    	<image class="img" src="http://image.vdongchina.com/M00/0A/2B/ZSUkmVpe6nyETRVQAAAAAFe0YUI575.png"></image>
                    </view>
	                </view>
	                 	                
                </view>
                
            </view>
           
        </view>

        <view class="lists" wx:if="{{list.length}}">
            <view class="list"  wx:for="{{list}}" wx:key="id" style="position: relative;">
                <view @tap="toDetails(item.id)" >
                    <image class="list-img" src="{{item.imageList[0].url}}" style="{{'height:'+height+'px;'}}"/>
                    <view class="list-name" style="{{'color:'+nameColor+';'}}">{{item.name}}</view>
                    <view class="list-price">
                        <view class="left" style="{{'color:'+priceSignColor+';'}}">
                            ￥<view class="price" style="{{'color:'+priceColor+';'}}">{{item.showPrice}}</view>
                        </view>
                    </view>
                    <view style="position: absolute;right: 0;bottom: 0;width: 80rpx;height: 40rpx;">
                        <view  wx:if="{{isDealer && isShowcom}}" class="check-yongjin" @tap.stop="toChooseSize(index,item.productId)" style="{{'background:'+bgColor+';color:'+lookColor+';'}}">佣金</view>
                    </view>                    
                </view>
            </view>
        <view class="choose-size" wx:if="{{flag}}">
            <view class="box">
            <view class="head">
                <view class="txt" wx:if="{{enableSku}}">请选择规格</view>
		            <view class="txt" wx:else="{{enableSku}}">查看佣金</view>
                <image class="img" src="http://image.vdongchina.com/M00/06/11/ZSUkmVoXtyiEeH_8AAAAAJnM000802.png" @tap="toCancel"/>
            </view>
            <view class="colour" wx:for="{{setting}}" wx:key="id"  wx:for-item="set">
                <view class="titel">{{set.propertyName}}</view>
                <view class="items">
                <view wx:for="{{set.salePropertyList}}"  wx:key="index" class="{{defalut[set.id]==item.salePropertyId? 'color-active item' : 'item'}}"  @tap="colorTap(set.id,item.salePropertyId)">
                    {{item.salePropertyName}}
                </view>
                </view>
            </view>

            <view class="yongjin-grade">
                <view class="item">
                <view class="t">一级佣金</view>
                <view class="b">￥{{fComm}}</view>
                </view>
                <view class="item">
                <view class="t">二级佣金</view>
                <view class="b">￥{{sComm}}</view>
                </view>
                <view class="item">
                <view class="t">三级佣金</view>
                <view class="b">￥{{tComm}}</view>
                </view>
            </view>
            </view>
        </view>
    </view>
    <view class="noData" wx:if="{{isNo && list.length == 0}}">
      暂无商品
    </view>
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
  editorConfig: {
    color: {
      el: ["text", "color"],
      label: "文本初始颜色",
      type: "String",
      value: "#666666",
      director: "ColorPicker"
    },
    activeColor: {
      el: ["text", "color"],
      label: "文本选中颜色",
      type: "String",
      value: "#F9F9F9",
      director: "ColorPicker"
    },
    nameColor: {
      el: ["text", "color"],
      label: "商品名称颜色",
      type: "String",
      value: "#222222",
      director: "ColorPicker"
    },
    priceSignColor:{
        el: ['text', 'color'],
        label: '商品价格符号颜色',
        type: 'String',
        value: '#222222',
        director : 'ColorPicker'
    },
    priceColor: {
      el: ["text", "color"],
      label: "商品价格颜色",
      type: "String",
      value: "#222222",
      director: "ColorPicker"
    },
    bgColor: {
      el: ["text", "color"],
      label: "查看佣金按钮背景颜色",
      type: "String",
      value: "#262833",
      director: "ColorPicker"
    },
    lookColor: {
      el: ["text", "color"],
      label: "查看佣金文字颜色",
      type: "String",
      value: "#ffc46f",
      director: "ColorPicker"
    },
    tshow: {
      label: "分类导航显示状态",
      type: "Object",
      value: {
        show: 1,
        cId: 1,
        showIcon: 0,
        iconSize: 40,
        spacing: 0,
        tabIds: [],
        initial: ''
      },
      director: "fenxiaoSide"
    }
  },
  comName: "分销商品列表",
  props: {
    color: {
      default: "#666666",
      type: String
    },
    activeColor: {
      default: "#F9F9F9",
      type: String
    },
    nameColor: {
      default: "#222222",
      type: String
    },
    priceSignColor:{
        default: "#222222",
        type: String
    },
    priceColor: {
      default: "#222222",
      type: String
    },
    bgColor: {
      default: "#262833",
      type: String
    },
    nameColor: {
      default: "#ffc46f",
      type: String
    },
    lookColor:{
				default: '#FFC46F',
        type: String
    },     
    tshow: {
      default: function() {
        return {
          show: 1,
          cId: 1,
          showIcon: 0,
          iconSize: 40,
          spacing: 0,
          tabIds: [],
          initial: ''
        };
      },
      type: Object
    }
  },
  data() {
    return {
    	height:143,
	      currentTab:0,
	      active:0,
	      items:this.tshow.tabIds,
	      kindId:'',//分类ID
	      list:[],
	      edit:{pId:0,setting:[]},//     
	      setting:[],
	      flag:false,      
	      chooseColor:[],
	      defalut: {},
	      pid:'',
	      skuList:[],//规格佣金数据
	      independentCommission:'',
	      fComm:'？',//一级佣金
	      sComm:'？',//二级佣金
	      tComm:'？',//三级佣金
	      isDealer:false,
	      isShowcom:false,
	      enableSku:false,//商品有无规格
				catCid:'',
	      shopBackImg:'',
	      shopLogoo:'',
	      shopName:'',
	      shopDiscribte:'',
	      secondItems:[],//新增二级分类
	      isNo:false
    };
  },
  async onLoad(e){  
    var that = this
    var ids = []
  that.isH5 = !wx.hasOwnProperty('version')   
		if(e.pid){
			that.pid = e.pid
			that.$root.globalData.pid = e.pid		
		} 
		if(that.isH5){
			 wx.request({
			 		url:this.$root.apiServer + this.$root.appid  + this.$root.variate +  '/basic/mgt/dKind/listPage',
			 		method:"POST",
          header: {
                'content-type': 'application/x-www-form-urlencoded'
          },
          success: function(res) {
	            if(res.data.code =="200"){
	            	var result = res.data.object.list
	                 var resArr = []
	                 var resIds = []
	                 result.forEach(function(item,idx){
	                   resIds.push(item.kindId)
	                   resArr.push({cId:item.kindId,name:item.name,coverImg:item.image,kindList:item.kindList})
	                 })
	                 that.tshow.tabIds && that.tshow.tabIds.forEach(function(item,idx){
	                   var index = resIds.indexOf(item.cId)
	                   if(index!=-1){
	                   	item.cId =resArr[index].cId
	                     item.name = resArr[index].name
	                     item.coverImg = resArr[index].coverImg
	                     item.kindList = resArr[index].kindList
	                   }else{
	                     that.tshow.tabIds.splice(idx,1)
	                   }
	                 })
	                 that.items = resArr
	                 that.catCid = resArr[0].cId
	                 if(that.tshow.show){
	                 	
	                 	
	                   if(that.tshow.tabIds.length==0){
	                       that.itemTapHandler(that.catCid,0)
	                   }else{
	                   	
											that.tshow.tabIds && that.tshow.tabIds.forEach(function(item,idx){
                         ids.push(item.cId+'')
                       })
											that.items = that.tshow.tabIds
                       var index = ids.indexOf(that.tshow.initial)
                       if(index!==-1){
                         that.itemTapHandler(that.tshow.initial,index)
                       }else{
                         that.itemTapHandler(that.tshow.tabIds[0].cId,0)
                       }	                   		                   	
	                      // that.itemTapHandler(that.tshow.tabIds[0].cId,0)
	                   }	
	                 }else{
	                   //that.itemTapHandler(that.tshow.cId,0)
	                   that.itemTapHandler(that.tshow.cId,0)
	                 }	
	                 if(that.tshow.tabIds && that.tshow.tabIds.length==0){
	                   that.items = resArr
	                 } 
	                 that.items = that.items.filter(item => {
			                return item.kindList.length
			             })
	              				
	            }else{
	            	wx.showToast({
		                title: "商品列表读取失败",
		                icon: 'loading',
		                mask:true,
		                duration: 2000
		            })
	            }
	        }
			 })
					
		}else{
	 		await this.$root.login()		    
	    wx.request({
	    		
	        url:this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/kind/listPage',
	        data:{
	        		token:that.$root.globalData.token,
	            pid:that.$root.globalData.pid
	        },
	        method:"POST",
	          header: {
	            'content-type': 'application/x-www-form-urlencoded'
	        },
	        success: function(res) {
	            if(res.data.code =="200"){
	            	var result = res.data.object.list
	                 var resArr = []
	                 var resIds = []
	                 result.forEach(function(item,idx){
	                   resIds.push(item.kindId)
	                   resArr.push({cId:item.kindId,name:item.name,coverImg:item.image,kindList:item.kindList})
	                 })
	                 that.tshow.tabIds && that.tshow.tabIds.forEach(function(item,idx){
	                   var index = resIds.indexOf(item.cId)
	                   if(index!=-1){
	                   	item.cId =resArr[index].cId
	                     item.name = resArr[index].name
	                     item.coverImg = resArr[index].coverImg
	                     item.kindList = resArr[index].kindList
	                   }else{
	                     that.tshow.tabIds.splice(idx,1)
	                   }
	                 })
	                 that.items = resArr
	                 that.catCid = resArr[0].cId
	                 if(that.tshow.show){
	                   if(that.tshow.tabIds.length==0){
	                       that.itemTapHandler(that.catCid,0)
	                   }else{	                   	
											that.tshow.tabIds.forEach(function(item,idx){
                         ids.push(item.cId+'')
                       })
											that.items = that.tshow.tabIds
                       var index = ids.indexOf(that.tshow.initial)
                       if(index!==-1){
                         that.itemTapHandler(that.tshow.initial,index)
                       }else{
                         that.itemTapHandler(that.tshow.tabIds[0].cId,0)
                       }	                   		                   	
	                      // that.itemTapHandler(that.tshow.tabIds[0].cId,0)
	                   }	
	                 }else{
	                   that.itemTapHandler(that.tshow.cId,0)	                
	                 }	
	                 that.items = that.items.filter(item => {
			                return item.kindList.length
			             })			             
			             
	            }else{
	            	wx.showToast({
		                title: "商品列表读取失败",
		                icon: 'loading',
		                mask:true,
		                duration: 2000
		            })
	            }
	        }
	    })
    }
   
    wx.request({
        url:this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/product/queryShowCommission',
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
            	if(res.data.object == false){
            		that.isShowcom = false
            	}else{
            		that.isShowcom = true
            	}
            }
        }
    })    

    
    
    
    
  },
   methods: {
    //事件处理函数   
    itemTapHandler(kindId,index) { //分类请求    	
      var that = this
      that.active = index  
      that.currentTab = 0
      //点击一级分类显示对应的二级分类
      if(that.items){
	      that.items.forEach(function(item,idx){	      	
	        if(item.cId==kindId){
	          that.secondItems = item.kindList
	          that.secondItemTapHandler(0,that.secondItems[0].kindId)
	        }
	      })       	
      }else{
      	that.secondItemTapHandler(0,that.secondItems[0].kindId)
      }
         
    },
    secondItemTapHandler(indexs,kindId){    	
    		var that =this
    		that.currentTab = indexs
      if(that.isH5){
	       wx.request({
	      	url: this.$root.apiServer + this.$root.appid +this.$root.variate + '/basic/mgt/dProduct/listPage',	       
	        data: {
	        	token:that.$root.globalData.token,
	          kindId: kindId,
	          pid:that.$root.globalData.pid
	        },
	        method: "POST",
	        header: {
	          'content-type': 'application/x-www-form-urlencoded'
	        },
	        success: function(res) {
	          if(res.data.code == "200") {
	            var data = res.data.object
	            that.list = data.list
	            that.isDealer = res.data.object.isDealer
	          }
	        }
	      })     	
      }else{
        wx.showLoading({
          title: '正在拼命加载中',
        })
	       wx.request({
	        url: this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/product/listPage',
	        data: {
	        	token:that.$root.globalData.token,
	          kindId: kindId,
	          pid:that.$root.globalData.pid
	        },
	        method: "POST",
	        header: {
	          'content-type': 'application/x-www-form-urlencoded'
	        },
	        success: function(res) {
	          if(res.data.code == "200") {
	            var data = res.data.object.productListByPage
	            that.list = data.list
              that.isDealer = res.data.object.isDealer
              wx.hideLoading()
              that.isNo=true
	          }else{
              wx.hideLoading()
              that.isNo=true
            }
	        },
	        fail(){
            wx.hideLoading()
            that.isNo=true
	        }
	      })     	
      }     
    },
    colorTap: function(sid,id) {//index for mainPropList,_index for salePropertyList
      var that = this
      this.defalut[sid] = id
      this.defalut=this.defalut
      var newList=[]
      for(var v in this.defalut){
        if(this.defalut[v]==""){
          return
        }    			
        newList.push(this.defalut[v])
      }  
      if(newList.length<that.setting.length){
        return
      }
      if(!this.enableSku){//该商品无规格不执行
      		return
      }
      wx.request({
        url: this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/product/getProductComm',
        data: {
          token:that.$root.globalData.token,
          productId:that.pid,
          pid:that.$root.globalData.pid
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          if(res.data.code == "200") {
            that.independentCommission = res.data.object.product.independentCommission   //客户是否设置佣金  ture设置
            that.skuList = res.data.object.product.skuList  
            var rulingPrice//价格
					for(var i=0;i<that.skuList.length;i++){
						var arr = []
						for(var j=0;j<that.skuList[i].salePropertyList.length;j++){
							arr.push(that.skuList[i].salePropertyList[j].salePropertyId)
						}
						if(arr.equals(newList)){
							rulingPrice = that.skuList[i].rulingPrice;
							break;
						}
					}              
              
              
              console.log(that.independentCommission)
            if(that.independentCommission){
                that.fComm = (rulingPrice*res.data.object.product.commissionFirst/100).toFixed(2)
                that.sComm = (rulingPrice*res.data.object.product.commissionSecond/100).toFixed(2)
                that.tComm = (rulingPrice*res.data.object.product.commissionThird/100).toFixed(2)
            }else{
                that.fComm = (rulingPrice*res.data.object.commLevelDetail.fComm/100).toFixed(2)
                that.sComm = (rulingPrice*res.data.object.commLevelDetail.sComm/100).toFixed(2)
                that.tComm = (rulingPrice*res.data.object.commLevelDetail.tComm/100).toFixed(2)    						
            }
              
          }else{
            wx.showModal({
                title: '提示',
                content:'您不是分销商，暂无佣金信息',
                showCancel:false,
              success: function(res) {
                if (res.confirm) {
                  that.flag = false
                }
              }	                
            })    					
          }
        }
      })    		
      
      /*for(var i = 0, len = this.setting.length; i < len; i++) {
        if(this.setting[i].id == this.setting[index].id){
          console.log("211111111")
        }
        
        var m =this.setting[i];
        for(var j = 0,_len=m.salePropertyList.length; j < _len; j++) {
          var n = m.salePropertyList[j];
          if(j == _index) {
            n.checked=true;
          }else{
            n.checked=false;
          }
        }
      }
      this.list[index].mainPropList=this.setting;//将结果储存到list*/
    },
    //详情
    toDetails(id) {
    	if(this.isH5){
        wx.showModal({
            title: '提示',
            content:'H5分销暂不可以编辑',
            showCancel:false,               
        })        		
    	}else{
		    wx.navigateTo({
		      url: '../f_goodsdetail/f_goodsdetail?id='+id
		    });    		
    	}

    },
    toSearch(){
      wx.navigateTo({
        url: '../f_search/f_search'
			});
    },
    toChooseSize(index,pid){  

    	var obj = {}
    	var that = this   
        that.fComm ="？"
        that.sComm ="？"
        that.tComm ="？"  	
    	
    	that.pid = pid
      var m=this.list[index];
			this.enableSku = m.enableSku//该商品有无规格
      if(!m.enableSku){//该商品有规格提取对应规格 否则直接显示佣金
      wx.request({
        url: this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/product/getProductComm',
        data: {
          token:that.$root.globalData.token,
          productId:that.pid,
          pid:that.$root.globalData.pid
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          if(res.data.code == "200") {
            that.independentCommission = res.data.object.product.independentCommission   //客户是否设置佣金  ture设置
            var rulingPrice = res.data.object.product.salePrice               
              console.log(that.independentCommission)
            if(that.independentCommission){
                that.fComm = (rulingPrice*res.data.object.product.commissionFirst/100).toFixed(2)
                that.sComm = (rulingPrice*res.data.object.product.commissionSecond/100).toFixed(2)
                that.tComm = (rulingPrice*res.data.object.product.commissionThird/100).toFixed(2)
            }else{
                that.fComm = (rulingPrice*res.data.object.commLevelDetail.fComm/100).toFixed(2)
                that.sComm = (rulingPrice*res.data.object.commLevelDetail.sComm/100).toFixed(2)
                that.tComm = (rulingPrice*res.data.object.commLevelDetail.tComm/100).toFixed(2)    						
            }
              
          }else{
            wx.showModal({
                title: '提示',
                content:'您不是分销商，暂无佣金信息',
                showCancel:false,
              success: function(res) {
                if (res.confirm) {
                  that.flag = false
                }
              }	                
            })    					
          }
        }
      }) 

//       that.fComm = (m.salePrice*m.commissionFirst/100).toFixed(2)
//      that.sComm = (m.salePrice*m.commissionSecond/100).toFixed(2)
//      that.tComm = (m.salePrice*m.commissionThird/100).toFixed(2)        		      
      }
      this.setting=m.mainPropList;//提取list对应数据
    	this.setting.forEach(function(item,idx){
    		obj[item.id]=""
    	})
    	this.defalut = obj      
			this.flag = true

    },
    toCancel(){
      this.flag = false
    },
    car(){
    		wx.navigateTo({
          url: '../f_recommend/f_recommend'
        })    	
    },
    fContanth5(){
        wx.showModal({
            title: '提示',
            content:'H5分销暂不可以编辑',
            showCancel:false,               
        })     	
    }
  }
};

</script>

<style scoped>
page {
  height: 100%;
}
.noData {
  width:100%;
  height: 600rpx;
  line-height: 600rpx;
  text-align: center;
  font-size: 30rpx;
  color: #222;
}
.container .content {
  background: #f2f2f2;
  display:flex;
  width:100%;
  float:none;
}
.container {
  position: relative;
}
.container .choose-size {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}
.container .choose-size .box {
  min-height: 294rpx;
  background: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}
.container .choose-size .box .head {
  height: 48rpx;
  margin: 24rpx 0 42rpx;
  position: relative;
}
.container .choose-size .box .colour {
  min-height: 160rpx;
}
.container .choose-size .box .colour .titel {
  height: 28rpx;
  line-height: 28rpx;
  font-size: 28rpx;
  color: #999;
  margin-left: 30rpx;
}
.container .choose-size .box .colour .items {
  min-height: 76rpx;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 24rpx;
  padding-left: 6rpx;
}
.container .choose-size .box .colour .items .item {
  margin: 0 0 16rpx 24rpx;
  height: 60rpx;
  line-height: 60rpx;
  border-radius: 6rpx;
  min-width: 48rpx;
  max-width: 600rpx;
  font-size: 24rpx;
  padding: 0 32rpx;
  color: #666;
  text-align: center;
  background: #f5f5f5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.container .choose-size .box .colour .items .color-active {
  background: #4e5059;
  color: #fff;
}
.container .choose-size .box .yongjin-grade {
  height: 248rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.container .choose-size .box .yongjin-grade .item {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.container .choose-size .box .yongjin-grade .item .t {
  margin-top: 32rpx;
  font-size: 28rpx;
  color: #262833;
  height: 28rpx;
  line-height: 28rpx;
  font-weight: 600;
}
.container .choose-size .box .yongjin-grade .item .b {
  margin-top: 40rpx;
  font-size: 32rpx;
  color: #262833;
  height: 32rpx;
  line-height: 32rpx;
  font-weight: 600;
}
.container .choose-size .box .head .txt {
  position: absolute;
  width: 180rpx;
  left: 50%;
  top: 0;
  margin-left: -90rpx;
  height: 48rpx;
  line-height: 48rpx;
  font-size: 36rpx;
  color: #222;
}
.container .choose-size .box .head .img {
  height: 48rpx;
  width: 48rpx;
  position: absolute;
  top: 0;
  right:24rpx;
  display: block;
}

/*商品列表*/
.lists {
  flex: 1;
  width: 100%;
  background: #f2f2f2;
  margin-left: 10rpx;
  margin-top: 10rpx;
}
.lists .list {
  float: left;
  width: 48%;
  padding-bottom: 20rpx;
  background: #fff;
  margin-bottom: 10rpx;
  margin-right: 1%;
}
.lists .list .list-img {
  width: 100%;
  display: block;
  background-size: cover;
}
.lists .list .list-name {
  margin: 16rpx 2% 20rpx 2%;
  font-size: 28rpx;
  line-height:34rpx;
  height: 68rpx;
  width: 96%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.lists .list .list-price {
  height: 40rpx;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.lists .list .list-price .left {
  font-size: 32rpx;
  height: 32rpx;
  line-height: 32rpx;
  margin-left: 2%;
}
.lists .list .list-price .left .price {
  display: inline-block;
}

.lists .list .check-yongjin {
  font-size:20rpx;
  line-height: 40rpx;
  text-align: center;
  border-radius:20rpx 0 0 0rpx;
  width: 80rpx;height: 40rpx;
}

.navs {
  width: 198rpx;
  display: flex;
  flex-direction: column;
  background: #f6f6f6;
}
.nav {
  width:198rpx;
  min-height: 118rpx;
}
._item {
	width:198rpx;
		height:118rpx;
		position: relative;
}
._item .sanjiao1{
		position: absolute;
	  width:24rpx;
    height:24rpx;
    right: 8rpx;  
    top: 50%;
    margin-top: -12rpx;	  
}
._item .sanjiao1 .img{
	  width:24rpx;
    height:24rpx;	
}
._item .sanjiao2{
		position: absolute;
	  width:24rpx;
    height:24rpx;
    right: 8rpx;  
    top: 50%;
    margin-top: -12rpx;	 
}
._item .sanjiao2 .img{
	  width:24rpx;
    height:24rpx;	
}
.nav-icon {
  vertical-align: top;
  width: 80rpx;
  height: 80rpx;
  margin-bottom: 0;
}
.text {
  width: 198rpx;
  height:118rpx;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
	display:block;
	line-height: 118rpx;
	text-align:center;

}
.info {
  display: flex;
  justify-content: space-between;
  font-size: 24rpx;
  color: #999;
  padding: 0 6rpx;
}
.icon {
  font-size: 24rpx;
  color: #999;
  width:30rpx;
  height:24rpx;
  margin-right: 6rpx;
}
.s_text{
  width:100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
