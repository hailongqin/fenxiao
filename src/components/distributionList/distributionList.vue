<template>
  <!--index.wxml-->
  			<view class="container">
    		    <view class="content">
			    <scroll-view scroll-x="true" class="navs" wx:if="{{tshow.show == 1}}">
			      <view class="item-box">
			        <view class="nav" wx:for="{{items}}" wx:key="index" wx:for-index="index" @tap="itemTapHandler(item.cId,index)" style="{{'margin-left:'+marginlr+'px;margin-right:'+marginlr+'px;'}}">
			          <view wx:if="{{active==index}}" class="_item">
			            <image wx:if="{{tshow.showIcon==1}}" src="{{item.coverImg}}" class="nav-icon" style="{{'width:'+tshow.iconSize*2+'rpx;height:'+tshow.iconSize*2+'rpx;margin-bottom:'+tshow.spacing*2+'rpx;'}}"/>
			            <text class="text" style="{{'color:'+activeColor+';border-bottom-color:'+activeColor}}">{{item.name}}</text>
			          </view>
			          <view wx:else class="_item">
			            <image wx:if="{{tshow.showIcon==1}}" src="{{item.coverImg}}" class="nav-icon" style="{{'width:'+tshow.iconSize*2+'rpx;height:'+tshow.iconSize*2+'rpx;margin-bottom:'+tshow.spacing*2+'rpx;'}}"/>
			            <text class="text" style="{{'color:'+color+';'}}">{{item.name}}</text>
			          </view>			          
			        </view>
			      </view>
			    </scroll-view>	
			    
        <!-- 商品列表二级分类 -->
        <scroll-view class="s_nav" scroll-x="true" wx:if="{{tshow.show == 1}}">
			      <view wx:for="{{secondItems}}" wx:key="indexs"  class="s_item" wx:for-index="indexs" @tap="secondItemTapHandler(indexs,item.kindId)">
		            <view class="s_text" wx:if="{{currentTab == indexs}}" style="background:#ababab;color:#fff;">{{item.name}}</view>
		            <view class="s_text" wx:else style="border:1rpx solid #ababab;height:36rpx;line-height:36rpx;">{{item.name}}</view>
			      </view>
			  </scroll-view>
			    
    
		      <view class="lists" wx:if="{{list.length}}">
		        <view class="list"  wx:for="{{list}}" wx:key="id" wx:for-index = "index">
		        	<view @tap="toDetails(item.id)">
				          <image class="list-img" wx:if="{{item.imageList}}" src="{{item.imageList[0].url?item.imageList[0].url:'http://image.vdongchina.com/M00/0A/53/ZSUkmVphiIiEBt94AAAAAK5BmWI844.gif'}}"/>
				          <view class="list-name" style="{{'color:'+nameColor+';'}}">{{item.name}}</view>
				          <view class="list-price">
				            <view class="l" style="{{'color:'+priceSignColor+';'}}">
				              	￥<view class="price" style="{{'color:'+priceColor+';'}}">{{item.showPrice}}</view>
				            </view>
				            <view class="r">
				              <view class="check-yongjin" wx:if="{{isDealer && isShowcom}}"  @tap.stop="toChooseSize(index,item.productId)" style="{{'background:'+bgColor+';color:'+lookColor+';'}}">查看佣金</view>
				            </view>
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
		            <view wx:if="{{isDealer}}" class="colour" wx:for="{{setting}}"  wx:key="gg" wx:for-item="set">
		                <view class="titel">{{set.propertyName}}</view>
		                <view class="items clear">
			                <view wx:for="{{set.salePropertyList}}" wx:key="index" class="{{defalut[set.id]==item.salePropertyId? 'color-active item left' : 'item left'}}"  @tap="colorTap(set.id,item.salePropertyId)">
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
		      
				<!--<view class="noData" wx:if="{{!isNo && lists==null}}">
					数据正在加载中...
				</view>	-->
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
            el: ['text', 'color'],
            label: '文本初始颜色',
            type: 'String',
            value: '#666666',
            director : 'ColorPicker'
        },
        activeColor: {
            el: ['text', 'color'],
            label: '文本选中颜色',
            type: 'String',
            value: '#262833',
            director : 'ColorPicker'
        },
        nameColor:{
            el: ['text', 'color'],
            label: '商品名称颜色',
            type: 'String',
            value: '#222222',
            director : 'ColorPicker'
        },
        priceSignColor:{
            el: ['text', 'color'],
            label: '商品价格符号颜色',
            type: 'String',
            value: '#222222',
            director : 'ColorPicker'
        },        
        priceColor:{
            el: ['text', 'color'],
            label: '商品价格颜色',
            type: 'String',
            value: '#222222',
            director : 'ColorPicker'
        },
        bgColor:{
            el: ['text', 'color'],
            label: '查看佣金按钮背景颜色',
            type: 'String',
            value: '#262833',
            director : 'ColorPicker'
        },
        lookColor:{
            el: ['text', 'color'],
            label: '查看佣金文字颜色',
            type: 'String',
            value: '#ffc46f',
            director : 'ColorPicker'
        },
        marginlr:{
          el: ['number'],
          label: '分类栏左右间距',
          type: 'Number',
          value: '5',
          director: 'Fsize'
        },
        tshow: {
          label :'分类导航显示状态',
          type: 'Object',
          value:{
            show: 1,
            cId: 1,
            showIcon: 0,
            iconSize: 40,
            spacing: 0,
            tabIds:[],
            initial: ''
          },
          director: 'fenxiao'
        }        
    },
    comName:"分销首页",
    props:{
        color: {
            default: '#666666',
            type: String
        },
        activeColor: {
            default: '#262833',
            type: String
        },
        nameColor: {
            default: '#222222',
            type: String
        },
        priceSignColor:{
            default: '#222222',
            type: String
        },        
        priceColor: {
            default: '#222222',
            type: String
        },
        bgColor: {
            default: '#262833',
            type: String
        },
        lookColor:{
						default: '#fff',
            type: String
        },        
        marginlr: {
          default: '5',
          type:String
        },        
        tshow:{
          default:function(){
            return {
              show:1,
              cId:1,
              showIcon: 0,
              iconSize: 40,
              spacing: 0,
              tabIds:[],
              initial: ''
            }
          },
          type:Object
        }        
    },	
		data () {
	    return {
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
	      curr:0,	      
        isNo:false
	    }
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
		                title: "网络开小差啦",
		                icon: 'loading',
		                mask:true,
		                duration: 2000
		            })
	            }
	        }
			 })
					
		}else{
	 		await this.$root.login()		    
      console.log(that.$root.globalData.pid,"kind/listpage")
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
				            that.items = that.items.filter(item => {
			                return item.kindList.length
			             })	   
	            }else{
	            	wx.showToast({
		                title: "网络开小差啦",
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
      that.items.forEach(function(item,idx){
        if(item.cId==kindId){        
          that.secondItems = item.kindList
          that.secondItemTapHandler(0,that.secondItems[0].kindId)
          console.log("that.secondItems[0].kindId:"+that.secondItems[0].kindId);
        }
      }) 
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
	      	//url: this.$root.apiServer + this.$root.appid +this.$root.variate + '/basic/mgt/dProduct/listPage',
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
}
</script>

<style scoped>
.f_contant{position: absolute;left: 0;right: 0;top: 0;bottom: 0;background: rgba(0,0,0,0);z-index: 999;}
page{
height: 100%;
}

.container{
height: 100%;
}
.noData{
  height:600rpx;
  line-height: 600rpx;
  text-align: center;
  font-size: 30rpx;
  color:#222;
}
.container .contents{
  background: #f2f2f2;
  position: relative;
}
.container .choose-size{
    position: fixed;
    top: 0;
    left:0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.5)
}
.container .choose-size.container .choose-size{
  height:100%;
  width:100%;
  position: fixed;
  top:0;
  left: 0;
  background: rgba(0,0,0,0.5);
  z-index: 99;
}
.container .choose-size .box{
  min-height:294rpx;
  background: #fff;
  position: absolute;
  bottom:0;
  left: 0;
  width:100%;
}
.container .choose-size .box .head{
  height:48rpx;
  margin:24rpx 0 48rpx;
  position: relative;
}
.container .choose-size .box .colour{
  height:auto;
  margin-bottom: 48rpx;
}
.container .choose-size .box .colour .titel{
  line-height: 28rpx;
  font-size:28rpx;
  color:#999;
  margin-left:30rpx;
}
.container .choose-size .box .colour .items{
  height:auto;
  margin-top:24rpx;
  padding-left:6rpx;
}
.container .choose-size .box .colour .items .item{
	margin:0 0 16rpx 24rpx;
  line-height: 60rpx;
  border-radius: 6rpx;
  min-width:48rpx;
  font-size:24rpx;
  padding:0 32rpx;
  color:#666;
  text-align: center;
  background: #f5f5f5;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.container .choose-size .box .colour .items .color-active{
  background: #4e5059;
  color:#fff;
}
.container .choose-size .box .yongjin-grade{
  height:248rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.container .choose-size .box .yongjin-grade .item{
  height:100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.container .choose-size .box .yongjin-grade .item .t{
  margin-top:32rpx;
  font-size:28rpx;
  color:#262833;
  height: 28rpx;
  line-height: 28rpx;
  font-weight: 600;
}
.container .choose-size .box .yongjin-grade .item .b{
  margin-top:40rpx;
  font-size:32rpx;
  color:#262833;
  height: 32rpx;
  line-height: 32rpx;
  font-weight: 600;
}
.container .choose-size .box .head .txt{
  position: absolute;
  width:180rpx;
  left:50%;
  top:0;
  margin-left:-90rpx;
  height: 48rpx;
  line-height: 48rpx;
  font-size:36rpx;
  color:#222;
}
.container .choose-size .box .head .img{
  height: 48rpx;
  width:48rpx;
  position: absolute;
  top:0;
  right: 24rpx;
  display:block;
}
.container .search{
  display: none;
  height: 100rpx;
  width:100rpx;
  position: fixed;
  bottom:124rpx;
  right: 30rpx;
  border-radius: 50%;
  box-shadow: 0 4rpx 12rpx 0 rgba(0,0,0,0.1);
}
.container .search .img{
    height:100%;
    width:100%;
    display: block;
}
.container .banner{
  height: 384rpx;
  width:100%;
  position: relative;
}
.container .banner .bg{
  height:384rpx;
  width:100%;
  z-index:1;
  display: block;
}
.container .banner .mask{
  height: 110rpx;
  width:100%;
  position: absolute;
  bottom:-1rpx;
  left:0;
  background-image: linear-gradient(to bottom,rgba(255,255,255,0.7) 0%,rgba(255,255,255,1) 100%);
  z-index: 2;
}
.container .banner .userinfo-img{
  width:148rpx;
  height: 148rpx;
  background: #ccc;
  position: absolute;
  bottom:46rpx;
  left:50%;
  margin-left:-74rpx;
  border-radius: 50%;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  z-index:9;
}
.container .banner .userinfo-name{
  font-size: 32rpx;
  height:32rpx;
  line-height:32rpx;
  width:100%;
  text-align: center;
  position: absolute;
  bottom:-10rpx;
  left:0;
  z-index: 9;
  color:#333;
  overflow: visible;
}
.container .decript{
  width:100%;
  padding:34rpx 0 20rpx;
  font-size:24rpx;
  height: 24rpx;
  line-height: 24rpx;
  color:#999;
  text-align: center;
  z-index:-1;
  background: #fff;
}
/*商品列表*/
._me_title_items{
  display:flex;white-space: nowrap;height: 82rpx;
  overflow: scroll;
  border-bottom: 1rpx solid #E5E5E5;
}
._me_title_Item{height:82rpx;display: inline-block;line-height: 82rpx;text-align: center;color: #666;font-size: 28rpx;margin: 0 27rpx;box-sizing: border-box;}

.lists{
  display: flex;
  flex-wrap: wrap;
  width:750rpx;
  margin: 0 auto;
  justify-content: space-between;
  background: #f2f2f2;
  padding-top: 10rpx;
}
.lists .list{
  width:370rpx;
  padding-bottom:20rpx;
  background: #fff;
  margin-bottom:10rpx;
}
.lists .list .list-img{
  width:100%;
  height:370rpx;
  display: block;
}
.lists .list .list-name{
  margin:16rpx 0 20rpx 20rpx;
  font-size:28rpx;
  line-height: 34rpx;
  height:68rpx;
  width:330rpx;
  overflow:hidden;
  text-overflow: ellipsis;
  display:-webkit-box;
  -webkit-line-clamp:2;
  -webkit-box-orient:vertical;
  color: #222;
}
.lists .list .list-price{
  height:40rpx;
  width:100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.lists .list .list-price .l{
  font-size:32rpx;
  height: 32rpx;
  line-height:32rpx;
  color:#222;
  margin-left:4rpx;
}
.lists .list .list-price .l .price{
  display: inline-block;
}
.lists .list .list-price .r{
  height: 40rpx;
  width:120rpx;
}
.lists .list .list-price .r .check-yongjin{
  height:100%;
  width:100%;
  background: #262833;
  font-size:20rpx;
  line-height: 40rpx;
  text-align: center;
  border-radius: 20rpx 0 0 20rpx;
  color:#ffc46f;
}

/* 底部导航样式 */
.bottom-nav{
    height: 50px;
    width:100%;
    position: fixed;
    bottom:0;
    left:0;
    background: #fff;
    border-top:1rpx solid #ababab;
}
.bottom-nav .content{
    width:100%;
    height:100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.bottom-nav .content .nav-list{
    height: 100%;
    width:25%;
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.bottom-nav .content .nav-list .top{
    height:54rpx;
    width:54rpx;
    margin-top:9rpx;
    margin-bottom:4rpx;
    background-size:cover;
}
.bottom-nav .content .nav-list .bottom{
    line-height: 28rpx;
    height:28rpx;
    font-size:20rpx;
    color:#999;
}
.bottom-nav .content .nav-list:first-child .bottom{
    color:#262833;
}

.bottom-nav{
    height: 100rpx;
    width:100%;
    position: fixed;
    bottom:0;
    left:0;
    background: #fff;
    border-top:1rpx solid #ababab;
}
.bottom-nav .content{
    width:100%;
    height:100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.bottom-nav .content .nav-list{
    height: 100%;
    width:25%;
}
.bottom-nav .content .nav-list .nav{
    height:100%;
    width:100%;
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.bottom-nav .content .nav-list .nav .top{
    height:54rpx;
    width:54rpx;
    margin:9rpx 0 4rpx;
    display: block;
}
.bottom-nav .content .nav-list .nav .bottom{
    font-size:20rpx;
    color:#999;
    height: 28rpx;
    line-height:28rpx;
}
.bottom-nav .content .nav-list .navActive{
    height:100%;
    width:100%;
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.bottom-nav .content .nav-list .navActive .top{
    height:54rpx;
    width:54rpx;
    margin:9rpx 0 4rpx;
    display: block;
}
.bottom-nav .content .nav-list .navActive .bottom{
    font-size:20rpx;
    color:#262833;
    height: 28rpx;
    line-height:28rpx;
}
.fmessage{
	position: relative;
}
.fmessagenum{font-size:18rpx;position: absolute;width: 36rpx;height: 36rpx;background: #ff1111;border-radius: 50%;line-height: 36rpx;text-align: center;color: #fff;top:6rpx;right: 44rpx;}

.navs{
  background: #fff;
}
.nav{
  display: inline-block;
}
._item{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.nav-icon{
  vertical-align: top;
  width: 80rpx;
  height: 80rpx;
  margin-bottom: 0;
}
.text{
  display: inline-block;
  padding: 22rpx 0;
  border-bottom: 4rpx solid transparent;
  margin: 0 18rpx;
  box-sizing: border-box;
  height: 83rpx;
	font-size: 28rpx;
}
.item-box{
    white-space: nowrap;
    border-bottom: 1rpx solid #e5e5e5;
}
.info{
  display: flex;
  justify-content:space-between;
  font-size: 24rpx;
  color: #999;
  padding:0 6rpx;
}
.icon{
  font-size:24rpx;
  color:#999;
  width: 30rpx;
  height: 24rpx;
  margin-right: 6rpx;
}
/*二级分类样式*/
.s_nav{
  height: 78rpx;
  background: #f2f2f2;
  border: none;
  display:flex;
  white-space: nowrap;
  overflow: scroll;
}
.s_text{
	margin-top:22rpx;
  width:150rpx;
  height: 38rpx;
  line-height: 38rpx;
  font-size: 26rpx;
  color:#666;
  text-align: center;
  border-radius: 19rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.s_item{
  margin-right:20rpx;
  height:78rpx;
  display: inline-block;
  box-sizing: border-box;
}
.s_item:first-child{
  margin-left:24rpx;
}
.s_item:last-child{
  margin-right: 24rpx;
}
.f_contant{position: absolute;left: 0;right: 0;top: 0;bottom: 0;background: rgba(0,0,0,0);z-index: 999;}
page{
  height: 100%;
}
</style>

