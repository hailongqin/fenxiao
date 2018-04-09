<template>

  <!--index.wxml-->
  <view class="container">
  		<view wx:if="{{isH5}}" class="f_contant" @tap="fContanth5">
  			
  		</view>
		    <view class="content"> 
		     		<view wx:if="{{isShop}}">
				      <view class="banner">
				        <image class="bg" background-size="cover" src="{{shopBackImg}}"/>
				        <!--image class="bg" background-size="cover" wx:else  src="{{shopBg}}"/>-->
				        <view class="mask"></view>
				        <image class="userinfo-img" src="{{shopLogoo}}"/>
				        <!--<image class="userinfo-img"  wx:else src="{{shopLogo}}"/>		-->        
				        <view class="userinfo-name" style="{{'color:'+shopNameColor+';'}}" >{{shopName}}</view>
				        <!--<view class="userinfo-name" style="{{'color:'+shopNameColor+';'}}" wx:else >暂无店铺名</view>-->
				      </view>		
				      <view class="decript" style="{{'color:'+shopDesColor+';'}}">{{shopDiscribte}}</view>
				      <!-- <view class="decript" style="{{'color:'+shopDesColor+';'}}" wx:else>此处为店铺说明或者其他的你想说的</view>-->
						</view>
		    		<view wx:else>
				      <view class="banner">
				        <image class="bg" background-size="cover" src="{{shopBg}}"/>
				        <view class="mask"></view>
				        <image class="userinfo-img" src="{{shopLogo}}"/>
				        <view class="userinfo-name" style="{{'color:'+shopNameColor+';'}}">{{text}}</view>
				      </view>		
				      <view class="decript" style="{{'color:'+shopDesColor+';'}}">{{textDes}}</view>
						</view>
						
			  <scroll-view class="_me_title_items bmg" scroll-x="true">
			      <view wx:for="{{items}}" wx:key="id" id="{{item.kindId}}"  class="_me_title_Item" @tap="itemTapHandler(item.kindId)">
		            <view class="text" wx:if="{{currentTab == item.kindId }}" style="{{'color:'+activeColor+';border-bottom: solid 2px #262833;'}}">{{item.name}}</view>
		            <view class="text" wx:else style="{{'color:'+color+';'}}">{{item.name}}</view>
			      </view>
			  </scroll-view>
		
		      <view class="lists" wx:if="{{list.length}}">
		        <view class="list"  wx:for="{{list}}" wx:key="id" >
		        	<view @tap="toDetails(item.id)">
				          <image class="list-img" wx:if="{{item.imageList}}" src="{{item.imageList[0].url}}"/>
				          <view class="list-name" style="{{'color:'+nameColor+';'}}">{{item.name}}</view>
				          <view class="list-price">
				            <view class="l">
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
		                <view class="txt">请选择规格</view>
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
		      <view class="noData" wx:if="{{list.length == 0}}">
		      	暂无数据
		      </view>
		    </view>
		    <view class="bottom-nav">
		        <view class="content">
		            <view class="nav-list" @tap="index">
		                <view class="nav" wx:if="{{indexActive}}">
		                    <image class="top" background-size="cover" src="http://image.vdongchina.com/M00/06/11/ZSUkmVoXuBWESguNAAAAAP7XUSo505.png"></image>
		                    <view class="bottom">首页</view>
		                </view>
		                <view class="navActive" wx:else>
		                    <image class="top" background-size="cover" src="http://image.vdongchina.com/M00/06/11/ZSUkmVoXuEuEU_FTAAAAADO0m-M987.png"></image>
		                    <view class="bottom">首页</view>
		                </view>
		            </view>
		            <view class="nav-list fmessage" @tap="message">
		            		<view class="fmessagenum" wx:if="{{messageNum}}">{{messageNum}}</view>
		                <view class="nav" wx:if="{{messageActive}}">
		                    <image class="top" background-size="cover" src="http://image.vdongchina.com/M00/06/11/ZSUkmVoXuSWEIIRiAAAAAPw4lBE836.png"></image>
		                    <view class="bottom">消息</view>
		                </view>
		                <view class="navActive" wx:else>
		                    <image class="top" background-size="cover" src="http://image.vdongchina.com/M00/06/11/ZSUkmVoXuWWEXldSAAAAAMb2Wdo517.png"></image>
		                    <view class="bottom">消息</view>
		                </view>
		            </view>
		            <view class="nav-list" @tap="shopcart">
		                <view class="nav" wx:if="{{shopcartActive}}">
		                    <image class="top" background-size="cover" src="http://image.vdongchina.com/M00/06/12/ZSUkmVoXvHOEZ6-GAAAAADus66A254.png"></image>
		                    <view class="bottom">购物车</view>
		                </view>
		                <view class="navActive" wx:else>
		                    <image class="top" background-size="cover" src="http://image.vdongchina.com/M00/06/12/ZSUkmVoXvPqEGOtmAAAAANFe0d0509.png"></image>
		                    <view class="bottom">购物车</view>
		                </view>
		            </view>
		            <view class="nav-list" @tap="personal">
		                <view class="nav" wx:if="{{personalActive}}">
		                    <image class="top" background-size="cover" src="http://image.vdongchina.com/M00/06/12/ZSUkmVoXuzaEPmIpAAAAABG2s_c188.png"></image>
		                    <view class="bottom">我的</view>
		                </view>
		                <view class="navActive" wx:else>
		                    <image class="top" background-size="cover" src="http://image.vdongchina.com/M00/06/12/ZSUkmVoXu2KEPW-eAAAAAB9H9zY960.png"></image>
		                    <view class="bottom">我的</view>
		                </view>
		            </view>
		        </view>
		    </view>
		    <view class="search" @tap="toSearch">
        <image class="img" src="http://image.vdongchina.com/M00/06/11/ZSUkmVoXuIeEc38bAAAAAE3qOmA604.png"/>
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
        shopBg: {
            el: ['uploader'],
            label: '修改背景图',
            type: 'String',
            value: 'http://image.vdongchina.com/M00/06/01/ZSUkmVoWhDiEQT1zAAAAAHEHZhI208.png',
            director : 'uploader'
        },
        shopLogo: {
            el: ['uploader'],
            label: '修改logo',
            type: 'String',
            value: 'http://image.vdongchina.com/M00/06/01/ZSUkmVoWhEOEBhGCAAAAAELIZTQ854.png',
            director : 'uploader'
        },
        shopNameColor:{
            el: ['text', 'color'],
            label: '店铺名称文字颜色',
            type: 'String',
            value: '#333333',
            director : 'ColorPicker'
        },
        text: {
            el: ['textarea'],
            label: '店铺名称',
            type: 'String',
            value: 'MODISCH',
            director: 'Input'
        },
        shopDesColor:{
            el: ['text', 'color'],
            label: '店铺描述文字颜色',
            type: 'String',
            value: '#999999',
            director : 'ColorPicker'
        },
        textDes: {
            el: ['textarea'],
            label: '店铺描述',
            type: 'String',
            value: '此处为店铺说明或者其他的你想说的',
            director: 'Input'
        },
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
        priceColor: {
            default: '#222222',
            type: String
        },
        bgColor: {
            default: '#262833',
            type: String
        },
        shopBg: {
            default: 'http://image.vdongchina.com/M00/06/01/ZSUkmVoWhDiEQT1zAAAAAHEHZhI208.png',
            type: String
        },
        shopLogo: {
            default: 'http://image.vdongchina.com/M00/06/01/ZSUkmVoWhEOEBhGCAAAAAELIZTQ854.png',
            type: String
        },
        shopNameColor:{
            default: '#333333',
            type: String
        },
        text: {
            default: 'MODISCH',
            type: String
        },
        shopDesColor:{
            default: '#999999',
            type: String
        },
        textDes: {
            default: '此处为店铺说明或者其他的你想说的',
            type: String
        }
    },	
		data () {
	    return {
	      currentTab:0,
	      items:[],
	      kindId:'',//分类ID
	      list:[1],
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
	      enableSku:false,//商品有无规格
	
	      shopBackImg:'',
	      shopLogoo:'',
	      shopName:'',
	      shopDiscribte:'',
	      isShop:true,
	
	      //控制底部导航切换颜色
	      indexActive:0,
	      messageActive:1,
	      shopcartActive:1,
	      personalActive:1,
	      messageNum:0,
	      isH5:false,
	      isShowcom:true
	    }
  },  
  async onLoad(e){  
    var that = this
  that.isH5 = !wx.hasOwnProperty('version')   
		if(e.pid){
			that.pid = e.pid
			that.$root.globalData.pid = e.pid		
		} 
 		await this.$root.login()		    
    wx.request({
    		//url:this.$root.apiServer + this.$root.appid  + this.$root.variate +  '/basic/mgt/dKind/listPage',
        url:this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/kind/listPage',
        data:{
        		token:that.$root.globalData.token,
            pageSize:10,
            currentPage:1,
            pid:that.$root.globalData.pid
        },
        method:"POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
            if(res.data.code =="200"){
                that.items = res.data.object.list
                that.kindId = res.data.object.list[0].kindId
                that.currentTab = res.data.object.list[0].kindId       				
                that.itemTapHandler(that.kindId)
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
            	console.log(that.isShowcom)
            }
        }
    })    
       
    wx.request({
       url:this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/userShop/getPUserShop',
       data:{
           token: that.$root.globalData.token,
          pid:that.$root.globalData.pid
       },
       method:"POST",
        header: {
           'content-type': 'application/x-www-form-urlencoded'
       },
       success: function(res) {
       		if(res.data.code =="200"){
   						if(res.data.object){
   							that.isShop = true
                if(res.data.object.shopBackImg){
		              that.shopBackImg=res.data.object.shopBackImg
                }else{
                	that.shopBackImg = 'http://image.vdongchina.com/M00/06/11/ZSUkmVoXttiESrKMAAAAAHEHZhI130.png'
                }
                if(res.data.object.shopLogo){
                	that.shopLogoo=res.data.object.shopLogo
                }else{
                	that.shopLogoo = 'http://image.vdongchina.com/M00/06/12/ZSUkmVoXvTuEZfkvAAAAAELIZTQ640.png'
                }
                if(res.data.object.shopName){
                	that.shopName=res.data.object.shopName
                }else{
                	that.shopName = 'MODISCH'
                }
                if(res.data.object.shopDes){
                	that.shopDiscribte=res.data.object.shopDes  
                }else{
                	that.shopDiscribte = '此处为店铺说明或者其他的你想说的'
                }
   						}else{
								that.isShop = false
   						}
           }
       }
    })
    
    //获取消息接口
    wx.request({
        url:this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/notice/noticeStatistics',
        data:{
            token:that.$root.globalData.token,
          	pid:that.$root.globalData.pid
        },
        method:"GET",
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          if(res.data.code == 200){
            var system,twitter,commission
            if(res.data.object.SYSTEM){
              system = parseInt(res.data.object.SYSTEM.count) 
            }else{
              system = 0
            }
            if(res.data.object.TWITTER){
              twitter = parseInt(res.data.object.TWITTER.count) 
            }else{
              twitter =0
            }
            if(res.data.object.COMMISSION){
              commission = parseInt(res.data.object.COMMISSION.count) 
            }else{
              commission =0
            }   
            var messageNum = system + twitter+commission        
            if(messageNum == 0){
              that.messageNum = false
            }else{
              that.messageNum =messageNum 
            }
          }else{
//          wx.showLoading({
//              title: '服务器报错',
//              icon: 'loading',
//              duration: 2000
//          })
          }
        }
    })
    
    
    
    
    
  },
  methods: {
    //底部导航跳转
    personal() {
        wx.redirectTo({
            url: '../f_personal/f_personal'
        })
    },
    index(){
        wx.redirectTo({
            url: '../f_index/f_index'
        })
    },
    shopcart(){
        wx.redirectTo({
            url: '../f_car/f_car'
        })
    },
    message(){
        wx.redirectTo({
            url: '../f_message/f_message'
        })
    },
    //事件处理函数
    itemTapHandler(kindId) { //分类请求
      var that = this
      that.currentTab = kindId
      wx.request({
      	//url: this.$root.apiServer + this.$root.appid +this.$root.variate + '/basic/mgt/dProduct/listPage',
        url: this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/product/listPage',
        data: {
        	token:that.$root.globalData.token,
          pageSize: 10,
          currentPage: 1,
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
          }
        }
      })
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
      wx.navigateTo({
      url: '../f_goodsdetail/f_goodsdetail?id='+id
    });
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
         that.fComm = (m.salePrice*m.commissionFirst/100).toFixed(2)
        that.sComm = (m.salePrice*m.commissionSecond/100).toFixed(2)
        that.tComm = (m.salePrice*m.commissionThird/100).toFixed(2)        		      
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
    z-index: 998;
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
.text{height:82rpx;
box-sizing:border-box;
}
.lists{
  display: flex;
  flex-wrap: wrap;
  width:100%;
  justify-content: space-between;
  margin-bottom:101rpx;
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
</style>
