<template>
<view>
	<scroll-view scroll-x="true" class="navs" style="{{'background:'+bgColor}}" wx:if="{{tshow.show == 1}}">
		<view class="item-box" style="{{'padding-top:'+pt*2+'rpx;'}}">
			<view class="nav" wx:for="{{arrData}}" wx:key="id" @tap="handler(item.id,index)">
				<view wx:if="{{active==index}}" class="_item">
					<image wx:if="{{tshow.showIcon==1}}" src="{{'http://image.vdongchina.com/'+item.thumbnail}}" class="nav-icon" style="{{'width:'+tshow.iconSize*2+'rpx;height:'+tshow.iconSize*2+'rpx;margin-bottom:'+tshow.spacing*2+'rpx;'}}"></image>
					<text class="text" style="{{'margin-left:'+ marginlr*2+'rpx;margin-right:'+ marginlr*2+'rpx;font-size:' + fontSize*2+'rpx;color:'+activeColor+';padding-bottom:'+pb*2+'rpx;border-bottom-color:'+activeColor}}">{{item.name}}</text>
				</view>
				<view wx:else class="_item">
					<image wx:if="{{tshow.showIcon==1}}" src="{{'http://image.vdongchina.com/'+item.thumbnail}}" class="nav-icon" style="{{'width:'+tshow.iconSize*2+'rpx;height:'+tshow.iconSize*2+'rpx;margin-bottom:'+tshow.spacing*2+'rpx;'}}"></image>
					<text class="text" style="{{'margin-left:'+ marginlr*2+'rpx;margin-right:'+ marginlr*2+'rpx;font-size:' + fontSize*2+'rpx;color:'+color+';padding-bottom:'+pb*2+'rpx'}}">{{item.name}}</text>
				</view>
			</view>
		</view>
	</scroll-view>

	
	<view class="nonePro" wx:if="{{!isNo && products.length == 0}}">
		数据正在加载中...		
	</view>	
	<view class="nonePro" wx:if="{{isNo && products.length == 0}}">
		暂无商品
	</view>

	
	
	<view class="product-list clear" wx:if="{{model == 1&&products.length>0}}">
		<view class="product-item " wx:for="{{products}}" wx:key="gg">
			<view class="classname rowclass" @tap="productItem(item.uuid)">
				<view class="product-img">
					<image mode="aspectFill" class="product-img-image" src="{{item.cover==''?item.thumbUrl :'http://image.vdongchina.com/'+item.cover}}" style="{{'width:'+ewidth*2+'rpx;height:'+eheight*2+'rpx;'}}"></image>
				</view>
			</view>
			<view style="width:100%">
				<view class="product-name" style="{{'font-size:'+fontSizeName*2+'rpx;font-weight:'+fontWeightName+';color:'+colorName+';'}}">{{item.name}}</view>
				<view class="clear product-price">
					<view class="left main-color" style="{{'font-size:'+fontSizeMark*2+'rpx;font-weight:'+fontWeightMark+';color:'+colorMark+';'}}">￥<text class="product-price-text" style="{{'font-size:'+fontSizePrice*2+'rpx;font-weight:'+fontWeightPrice+';color:'+colorPrice+';'}}">{{item.salePrice}}</text></view>
					<view class="left oldPrice" wx:if="{{item.isShowMarkerPrice}}">￥{{item.marketPrice}}</view>
					<view class="right shopcart" @tap.stop="addCar(item.uuid)" wx:if="{{shopcartShow.open}}">
						<image class="shopImg" src="{{shopcartShow.pic}}"></image>
					</view>
				</view>
			</view>				
		</view>
	</view>
	
	
	<scroll-view scroll-x="true" wx:if="{{model == 2&&products.length>0}}" class="uploadWrap">		
		<view class="upload_Item" wx:for="{{products}}" wx:key="gg" wx:for-index="index" @tap="productItem(item.uuid)"  style="{{'width:'+ewidth*2+'rpx;'}}">
			<view class="classname columnclass">
				<image class="upload_Item_img" src="{{item.cover==''?item.thumbUrl:'http://image.vdongchina.com/'+item.cover}}" mode="aspectFill" style="{{'width:'+ewidth*2+'rpx;height:'+eheight*2+'rpx;'}}"></image>
				<view class="itemTxt">
					<view class="product-name upload_name" style="{{'font-size:'+fontSizeName*2+'rpx;font-weight:'+fontWeightName+';color:'+colorName+';'}}">{{item.name}}</view>
					<view class="clear product-price">
						<view class="left main-color" style="{{'font-size:'+fontSizeMark*2+'rpx;font-weight:'+fontWeightMark+';color:'+colorMark+';'}}">￥<text class="product-price-text" style="{{'font-size:'+fontSizePrice*2+'rpx;font-weight:'+fontWeightPrice+';color:'+colorPrice+';'}}">{{item.salePrice}}</text></view>
						<view class="left oldPrice" wx:if="{{item.isShowMarkerPrice}}">￥{{item.marketPrice}}</view>
						<view class="right shopcart" @tap.stop="addCar(item.uuid)" wx:if="{{shopcartShow.open}}">
							<image class="shopImg" src="{{shopcartShow.pic}}"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</scroll-view>

	
	
	<view class="product-list clear" wx:if="{{model == 3&&products.length>0}}">
		<view class="large" wx:for="{{products}}" wx:key="gg">
			<view @tap="productItem(item.uuid)">
				<view class="product-img">
					<image mode="aspectFill" class="product-img-image" src="{{item.cover==''?item.thumbUrl:'http://image.vdongchina.com/'+item.cover}}"></image>
				</view>
				<view class="product-name" style="{{'font-size:'+fontSizeName*2+'rpx;font-weight:'+fontWeightName+';color:'+colorName+';'}}">{{item.name}}</view>
				<view class="clear product-price">
					<view class="left main-color"  style="{{'font-size:'+fontSizeMark*2+'rpx;font-weight:'+fontWeightMark+';color:'+colorMark+';'}}">￥<text class="product-price-text" style="{{'font-size:'+fontSizePrice*2+'rpx;font-weight:'+fontWeightPrice+';color:'+colorPrice+';'}}">{{item.salePrice}}</text></view>
					<view class="left oldPrice" wx:if="{{item.isShowMarkerPrice}}">￥{{item.marketPrice}}</view>
					<view class="right shopcart" @tap.stop="addCar(item.uuid)" wx:if="{{shopcartShow.open}}">
						<image class="shopImg" src="{{shopcartShow.pic}}"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
	

    <view class="product-list clear" wx:if="{{model == 4&&products.length>0}}">
     <view class="small sitem"  wx:for="{{products}}" wx:key="gg"  @tap="productItem(item.uuid)">
       <view class="item-media">
         <image class="img" mode="aspectFill" src="{{item.cover==''?item.thumbUrl :'http://image.vdongchina.com/'+item.cover}}"></image>
       </view>
       <view class="item-main">
         <view class="item-desc" style="{{'font-size:'+fontSizeName*2+'rpx;font-weight:'+fontWeightName+';color:'+colorName+';width:100%;'}}" >
             {{item.name}}
         </view>
         <view class="item-title-row">
           <view class="left main-color" style="{{'font-size:'+fontSizeMark*2+'rpx;font-weight:'+fontWeightMark+';color:'+colorMark+';'}}">￥<text class="product-price-text"  style="{{'font-size:'+fontSizePrice*2+'rpx;font-weight:'+fontWeightPrice+';color:'+colorPrice+';'}}">{{item.salePrice}}</text></view>
           <view class="left oldPrice" wx:if="{{item.isShowMarkerPrice}}">￥{{item.marketPrice}}</view>
           <view class="right shopcart" @tap.stop="addCar(item.uuid)" wx:if="{{shopcartShow.open}}"><image class="shopImg" src="{{shopcartShow.pic}}"/></view>
         </view>
       </view>
     </view>
    </view>	
	
</view>
</template>

<script>
export default{
  editorConfig: {   //该编辑器所有配置项
    model:{
      label: '布局',
      type: 'Number',
      value: 1,
      director : 'radio'
    },
    ewidth:{
      el: ['number'],
      label: '列表图片宽度',
      labelshow:"",
      type: 'Number',
      value: '141',
      director: 'isShow'
    },
    eheight: {
      el: ['number'],
      label: '列表图片高度',
      labelshow:"",
      type: 'Number',
      value: '174',
      director: 'isShow'
    }, 	 
    tshow: {
      label :'分类导航显示状态',
      type: Object,
      value:{
        show: 1,
        cId: 1,
        showIcon: 0,
        iconSize: 40,
        spacing: 0,
        tabIds:[],
        initial: ''
      },
      director: 'goods'
    },    
    shopcartShow: {
      label : '购物车图标显示状态',
      type : Object,
      value : {
        open: true,
        pic: 'http://image.vdongchina.com/M00/01/17/ZSUkmVmnc72EcSKxAAAAAFkCQJQ691.png'
      },
      tip: '建议尺寸50*50',
    },
    bgColor: {
      el: ['text', 'color'],
      label: '背景色',
      type: 'String',
      value: '#fff',
      director : 'ColorPicker'
    },
    color: {
      el: ['text', 'color'],
      label: '文本初始颜色',
      type: 'String',
      value: '#3a3a3a',
      director : 'ColorPicker'
    },
    activeColor: {
      el: ['text', 'color'],
      label: '文本选中颜色',
      type: 'String',
      value: '#38adff',
      director : 'ColorPicker'
    },
    fontSize: {
      el: ['number'],
      label: '文字大小',
      type: 'Number',
      value: '14',
      director: 'Fsize'
    },
    pt: {
      el: ['number'],
      label: '分类栏顶部间距',
      type: 'Number',
      value: '10',
      director: 'Fsize'
    },
    marginlr:{
      el: ['number'],
      label: '分类栏左右间距',
      type: 'Number',
      value: '10',
      director: 'Fsize'
    },
    pb: {
      el: ['number'],
      label: '分类栏底部间距',
      type: 'Number',
      value: '10',
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
    model: {
      default: 1,
      type: Number
    },
    ewidth: {
    label: '列表图片高度',
      default: 141,
      type:Number
    },
    eheight: {
      label: '列表图片高度',
      default: 174,
      type:Number
    },
    tshow:{
      default:function(){
        return {
          show:1,
          cId:1,
          showIcon: 1,
          iconSize: 40,
          spacing: 0,
          tabIds:[],
          initial: ''
        }
      },
      type:Object
    },
    shopcartShow: {
      type: Object,
      default: function(){
        return {open:true,pic:'http://image.vdongchina.com/M00/01/17/ZSUkmVmnc72EcSKxAAAAAFkCQJQ691.png'} 
      }
    },
    bgColor: {
      default: '#fff',
      type: String
    },
    color: {
      default: '#3a3a3a',
      type: String
    },
    activeColor: {
      default: '#38adff',
      type: String
    },
    fontSize: {
      default: '14',
      type:String
    },
    pt: {
      default: '10',
      type:String
    },
    pb: {
      default: '10',
      type:String
    },
    marginlr: {
      default: '10',
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
      catCid:null,    //切换栏目要用到
      isFirst: true,
      productSkus:[],
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
                	console.log(res)
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
                resArr.push({id:item.id,name:item.name,thumbnail:item.thumbnail})
              })

              that.tshow.tabIds && that.tshow.tabIds.forEach(function(item,idx){
                var index = resIds.indexOf(item.id)
                if(index!=-1){
                  item.name = resArr[index].name
                  item.thumbnail = resArr[index].thumbnail
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
//      this.handler(this.tshow.tabIds[0].id,0)
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
  width: 60rpx;
  height: 32rpx;
}
.nonePro{height:300rpx;line-height: 300rpx;text-align: center;}
.product-cant{height: 100rpx;line-height: 100rpx;position: relative;background:#ffffff}
.product-line{position: absolute;width: 240rpx;height: 4rpx;background: #000;top:46rpx;left: 50%;margin-left: -120rpx;}
.product-title{position: absolute;width: 180rpx;left:50%;margin-left: -90rpx;top: 0;text-align: center;background: #ffffff}
.clear::after{display: block;height: 0;clear: both;content: "";overflow: hidden;visibility: hidden;}
.left{float: left}
.right{float: right}
.product-list{ background: #f9f9f9;padding-top: 8rpx;}
/*.product-item{width: 49%;height: auto;background:#ffffff;margin-bottom:8rpx;float: left;overflow: hidden;display: flex;display:-webkit-flex;align-items: center;justify-content: center;-webkit-align-items: center;-webkit-justify-content: center;}*/
.product-item{width: 49%;height: auto;background:#ffffff;margin-bottom:8rpx;float: left;overflow: hidden;display: flex;display:-webkit-flex;align-items: center;justify-content: center;-webkit-align-items: center;-webkit-justify-content: center;flex-direction: column;-webkit-flex-direction:column}


.product-item:nth-child(even){margin-left:10rpx;}

.product-name{font-size: 28rpx;line-height: 50rpx;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding-left:10rpx;padding-right:10rpx;}
.product-price{font-size: 22rpx;line-height: 40rpx;margin-left: 10rpx;color: #999999}
.product-price .product-price-text{font-size: 30rpx;}
.oldPrice{text-decoration:line-through;margin-left: 10rpx;line-height: 44rpx;}
.upload_title{height: 80rpx;line-height: 80rpx;padding-left: 20rpx;font-size: 26rpx;border-top:solid 1rpx #e3e3e3;}
.uploadWrap{width:100%; white-space:nowrap;}  
.upload_Item{  width:298rpx;margin-right: 10rpx;margin-bottom:10rpx;border:solid 2rpx #e3e3e3;display: inline-flex;display: -webkit-inline-flex;-webkit-align-items: center;-webkit-justify-content:center;overflow: hidden;align-items: center;justify-content:center;overflow: hidden;}
.upload_Item_img{ width: 100%; height:100%;display: flex;display: -webkit-flex}


.product-img .product-img-image{width:100%;height:100%}
.product-img{text-align: center;}



.navs{
  margin-bottom: 20rpx;
  border-bottom: 2rpx solid #e5e5e5;
}
.nav{
  display: inline-block;
}
.text{
  display: block;
  padding: 0 20rpx;
  border-bottom: 8rpx solid transparent;
  margin: 0 18rpx;
  box-sizing: border-box;
}
.item-box{
    white-space: nowrap;
}	
._item{
  text-align: center;
}
.nav-icon{
  vertical-align: top;
  height: 80rpx;
  width: 80rpx;
  margin-bottom: 0;
}


.classname{align-self: center;}
.columnclass{width: 100%;align-self: flex-start;height: 100%;flex:1;flex-direction: column;  -webkit-align-self: flex-start; -webkit-flex:1; -webkit-flex-direction: column;display: -webkit-flex;}
.shopcart{margin-right: 10rpx}


.product-list .large{
  padding: 20rpx;
  margin-bottom: 20rpx;
  background: #fff;
}
.product-list .large .product-img{
  width: 100%;
  height: 340rpx;
  margin: 0 auto
}
.product-list .large .product-name{
  font-size: 30rpx;
  height: 40rpx;
  line-height: 40rpx;
  margin-top: 20rpx;
}
.product-price{
  height: 50rpx;
  line-height: 50rpx;
}
.product-list .large .product-price{
  margin-top: 18rpx;
}
.product-list .large .main-color{
  font-size: 28rpx;
}
.product-list .large .product-price-text{
	font-size: 36rpx;
}
.product-list .oldPrice{
  font-size: 26rpx;
}
.product-price .shopImg{
  height: 50rpx;
  width: 50rpx;
  vertical-align: top;
}
.product-price .oldPrice{
  line-height: 50rpx;
}




.sitem,.item-main{
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
  padding:34rpx;
}
.sitem:before{
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 2rpx;
  border-top: 2rpx solid #e5e5e5;
  color: #e5e5e5;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  z-index: 2;
}
.sitem:after{
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 2rpx solid #e5e5e5;
  color: #e5e5e5;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  z-index: 2;
}
.sitem .img{
  width:180rpx;
  height:180rpx;
  background-color:#f2f5f6;
  border-radius: 10rpx;
  overflow: hidden;
}
.item-media+.item-main {
    margin-left:20rpx;
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
  top:12rpx;
}
.item-title-row{
  position:relative;
  bottom:12rpx;
  width:100%;
}
.item-desc {
    font-size:30rpx;
    color: #111111;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    letter-spacing: 1.24rpx;
    line-height: 1.5;
    max-height: 84rpx;
}
.right .shopImg{
  width:50rpx;
  height: 50rpx;
  vertical-align: top;
}
.sitem .main-color{
  height: 50rpx;
  line-height: 50rpx;
}
.sitem .oldPrice{
  height: 50rpx;
  line-height: 50rpx;
}
</style>