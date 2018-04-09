<template>
 <view class="list-content">
  <scroll-view scroll-x="true" class="navs" style="{{'background:'+bgColor}}" wx:if="{{tshow.show == 1}}">
    <view class="item-box">
      <view class="nav" wx:for="{{arrData}}" wx:key="id" @tap="handler(item.id,index)">
        <text class="text" wx:if="{{active==index}}" style="{{'font-size:' + fontSize*2+'rpx;color:'+activeColor+';background:#fff'+';border-left:12rpx solid'+activeColor+';border-bottom:none;border-right:12rpx solid transparent;'}}">{{item.name}}</text>
        <text class="text" wx:else style="{{'font-size:' + fontSize*2+'rpx;color:'+color+';border-bottom:2rpx solid #e5e5e5;'}}">{{item.name}}</text>
      </view>
    </view>
  </scroll-view>	     
  <view class="product-list clear" wx:if="{{products.length>0}}">
    <view class="product-item left" wx:for="{{products}}" wx:key="gg">
      <view class="classname" @tap="productItem(item.uuid)">
          <view class="product-img"><image mode="aspectFit" class="product-img-image" src="{{item.cover==''?item.thumbUrl:'http://image.vdongchina.com/'+item.cover}}"/></view> 
          <view class="product-name"  style="{{'font-size:'+fontSizeName*2+'rpx;font-weight:'+fontWeightName+';color:'+colorName+';'}}">{{item.name}}</view>
          <view class="clear product-price">
              <view class="left main-color"  style="{{'font-size:'+fontSizeMark*2+'rpx;font-weight:'+fontWeightMark+';color:'+colorMark+';'}}">￥<text class="product-price-text" style="{{'font-size:'+fontSizePrice*2+'rpx;font-weight:'+fontWeightPrice+';color:'+colorPrice+';'}}">{{item.salePrice}}</text></view>
              <view class="left oldPrice" wx:if="{{item.marketPrice}}">￥{{item.marketPrice}}</view>
              <view class="right shopcart" @tap.stop="addCar(item.uuid)" wx:if="{{shopcartShow.open}}"><image class="shopImg" src="{{shopcartShow.pic}}"></image></view>
          </view>
      </view>
    </view> 
  </view>
	<view class="nonePro" wx:if="{{!isNo && products.length == 0}}">
		数据正在加载中...		
	</view>	
	<view class="nonePro" wx:if="{{isNo && products.length == 0}}">
		暂无商品
	</view>

 </view>
</template>

<script>
export default{
  editorConfig: {   //该编辑器所有配置项
    tshow: {
      label :'分类导航显示状态',
      type: 'Object',
      value:{
        show: 1,
        cId: 1,
        tabIds:[],
        initial: ''
      },
      director: 'goodSide'
    },    
    shopcartShow: {
      label : '购物车图标显示状态',
      type : Object,
      value : {
        open: true,
        pic: 'http://image.vdongchina.com/M00/01/17/ZSUkmVmnc72EcSKxAAAAAFkCQJQ691.png'
      },
      director : 'shopcartSwitch'
    },
    bgColor: {
      el: ['text', 'color'],
      label: '背景色',
      type: 'String',
      value: '#f6f6f6',
      director : 'ColorPicker'
    },
    color: {
      el: ['text', 'color'],
      label: '文本初始颜色',
      type: 'String',
      value: '#333333',
      director : 'ColorPicker'
    },
    activeColor: {
      el: ['text', 'color'],
      label: '文本选中颜色',
      type: 'String',
      value: '#b4282d',
      director : 'ColorPicker'
    },
    fontSize: {
      el: ['number'],
      label: '文字大小',
      type: 'Number',
      value: '14',
      director: 'Fsize'
    },
    fontSizeName:{
      el: ['number'],
      label: '商品名称文字大小',
      type: 'Number',
      value: '13',
      director: 'Fsize'
    },
    fontSizeMark:{
      el: ['number'],
      label: '商品价格符号大小',
      type: 'Number',
      value: '11',
      director: 'Fsize'
    },
    fontSizePrice:{
      el: ['number'],
      label: '商品价格文字大小',
      type: 'Number',
      value: '11',
      director: 'Fsize'
    },
    fontWeightName:{
      el: ['number'],
      label: '商品名称文字粗细',
      type: 'Number',
      value: '100',
      director: 'fontWeightSelect'
    },
    fontWeightMark:{
      el: ['number'],
      label: '商品价格符号粗细',
      type: 'Number',
      value: '100',
      director: 'fontWeightSelect'
    },
    fontWeightPrice:{
      el: ['number'],
      label: '商品价格文字粗细',
      type: 'Number',
      value: '100',
      director: 'fontWeightSelect'
    },
    colorName:{
      el: ['text', 'color'],
      label: '商品名称文字颜色',
      type: 'String',
      value: '#333333',
      director : 'ColorPicker'
    },
    colorMark:{
      el: ['text', 'color'],
      label: '商品价格符号颜色',
      type: 'String',
      value: '#b4282d',
      director : 'ColorPicker'
    },
    colorPrice:{
      el: ['text', 'color'],
      label: '商品价格文字颜色',
      type: 'String',
      value: '#b4282d',
      director : 'ColorPicker'
    }
  },
  comName:"新商品列表",
  props: {
      tshow:{
        default:function(){
          return {
            show:1,
            cId:1,
            tabIds:[],
            initial: ''
          }
        }
      },
      bgColor: {
        default: '#f6f6f6',
        type: String
      },
      shopcartShow: {
        type: Object,
        default: function(){
          return {open:true,pic:'http://image.vdongchina.com/M00/01/17/ZSUkmVmnc72EcSKxAAAAAFkCQJQ691.png'} 
        }
      },
      color: {
        default: '#333333',
        type: String
      },
      activeColor: {
        default: '#b4282d',
        type: String
      },
      fontSize: {
        default: '14',
        type:String
      },
      fontSizeName:{
        default: '13',
        type:String
      },
      fontSizeMark:{
        default: '11',
        type:String
      },
      fontSizePrice:{
        default: '11',
        type:String
      },
      fontWeightName:{
        default: '100',
        type:String
      },
      fontWeightMark:{
        default: '100',
        type:String
      },
      fontWeightPrice:{
        default: '100',
        type:String
      },
      colorName:{
        default: '#333333',
        type: String
      },
      colorMark:{
        default: '#b4282d',
        type: String
      },
      colorPrice:{
        default: '#b4282d',
        type: String
      }
  },
  data () {
    return {
      products: [],
      items: [],
      active: 0,
      catCid:null,    //切换栏目要用到,
      isFirst: true,
      arrData:this.tshow.tabIds,
      isNo:false	
    }
  },
  methods: {
      handler (cid,index) {
        this.active = index
        var that = this
        wx.request({
            url: this.$root.apiServer+this.$root.appid+'/basic/api/product/productByCatalogId',
            data: {
                catalogId : cid
            },
            method: 'GET',
            header: {
                'content-type': 'application/json'
            },
            success (res) {   
            	if(res.data.code="code"){
            		that.isNo=true
	              	var productList = res.data.data.filter(item => {
			            return item.status == 1
			        })             
	              	that.products = productList              		
            	}else{
            		that.isNo=true
            	}
            },
            fail(){
            	that.isNo=true
            }            
            
            
        })
      },
      productItem (id){
        wx.navigateTo({
            url: '../goods/goods' + '?id=' + id
        })
      },
       addCar(id){
            var that = this 
           wx.request({
                url: that.$root.apiServer+that.$root.appid+'/basic/api/product/uuid',
                data: {
                    uuid: id
                },
                method: 'GET',
                header: {
                    'Content-Type': 'application/json'
                },
                success (res) {
                	that.productSkus = res.data.data.productSkus
                	var cid = res.data.data.productSkus[0].id
                	if(that.productSkus.length > 1){
                		that.productItem (id)
                	}else{
			            wx.request({
			                url: that.$root.apiServer+that.$root.appid+'/basic/api/cart/addProduct',
			                data: {
			                    token: getApp().globalData.token,
			                    skuId:cid,
			                    buyNum:1
			                },
			                method: 'POST',
			                header: {
			                    'Content-Type': 'application/x-www-form-urlencoded'
			                },
			                success (res) {
			                	if(res.data.code == "100"){
			                        wx.showToast({
			                            title: '加入成功',
			                            
			                        })				                		
			                	}else{
			                        wx.showToast({
			                            title:'超出购买限制',
			                            duration: 1000
			                        })			                		
			                	}
		
			                }
			            })                		
                	}
                }
           }) 
      }     
  },
  onLoad () {
    var that = this
    var ids = []
    // 获取商品分类
    wx.request({
        url: this.$root.apiServer+this.$root.appid+'/basic/api/product/catalogs',
        method: 'GET',
        header: {
            'content-type': 'application/json'
        },   
        success (res) {
          if(res.statusCode==200 && res.data.data.length){
              var result = res.data.data
              var resArr = []
              var resIds = []
              result.forEach(function(item,idx){
                resIds.push(item.id);
                resArr.push({id:item.id,name:item.name})
              })

              that.tshow.tabIds && that.tshow.tabIds.forEach(function(item,idx){
                var index = resIds.indexOf(item.id)
                if(index!=-1){
                  item.name = resArr[index].name
                }else{
                  that.tshow.tabIds.splice(idx,1)
                }
              })
              that.items = resArr
              that.catCid = resArr[0].id
            if(that.tshow.show){
            	that.arrData = that.tshow.tabIds
            	if(that.tshow.tabIds.length){
	                  that.tshow.tabIds.forEach(function(item,idx){
	                    ids.push(item.id+'')
	                  })
	                  var index = ids.indexOf(that.tshow.initial)
	                  if(index!==-1){
	                    that.handler(that.tshow.initial,index)
	                  }else{
	                    that.handler(that.tshow.tabIds[0].id,0)
	                  }
            	}else{
            		that.handler(that.catCid,0)
            	}
            }else{
              that.handler(that.tshow.cId,0)
            }            
            /*var cids = []
            that.items.forEach(function(item,idx){
              cids.push(item.id)
            })
            that.handler(typeof that.tshow.cId !='object'&&that.tshow.cId&&cids.indexOf(that.tshow.cId)!==-1?that.tshow.cId:res.data.data[0].id,0)
            that.isFirst = false*/
            if(that.tshow.tabIds && that.tshow.tabIds.length==0){
              that.arrData=that.items
            }
          }
        } 
    })
  },
  watch:{
    tshow(e){
      if(this.isFirst){
        return
      }
      if(e.show !=1){
        this.handler(e.cId,0)
      }else{
        if(this.tshow.tabIds.length==0){
          this.handler(this.catCid,0)
        }else{
          this.handler(this.tshow.tabIds[0].id,0)
        }
      }
    }
  }
}	
</script>

<style scoped>
.right .shopImg{
  width:50rpx;
  height: 50rpx;
}

.navs{width: auto;}
.list-content{
  display:flex;
  width:100%;
}
.text{
  width: 100%;
  height:100%;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis
}
.navs.scroll-view{
  width:180rpx;
  height:100%;
  display:flex;
  flex-direction:column;
  background:#f6f6f6; 
}

.nav{
  width:180rpx;
  height:90rpx;
  line-height:90rpx;
}
.clear::after{display: block;height: 0;clear: both;content: "";overflow: hidden;visibility: hidden}  
.product-list{ background: #ffffff;height:100%;flex:1;margin-bottom:38rpx;}
.product-item{width:42.1%;height:344rpx;background:#ffffff;margin-top: 29rpx;float:left;padding-left:5.26%;}
.product-img{
  width:100%;
}
.classname{
  width:100%;
}
.product-img .product-img-image{width:100%;height:240rpx;}
 .classname .product-name{font-size:26rpx;line-height:68rpx;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding-left:4.58%;width:210rpx;color:#333333;} 
.product-price{font-size:22rpx;color:#b4282d;line-height:50rpx;height:50rpx;margin-left:10rpx;}
.oldPrice{color:#aaaaaa;text-decoration:line-through;margin-left:10rpx;line-height:50rpx;font-size:20rpx;}
.left{float: left}
.right{float: right}
.nonePro{width: 100%;height:400rpx;line-height:400rpx;text-align:center;position:relative;}
</style>
