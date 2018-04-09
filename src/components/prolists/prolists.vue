<template>
 <view>
  <view class="nonePro" wx:if="{{products.length == 0}}">
      暂无商品
  </view>
  <view class="product-list" wx:if="{{model == 1}}">
     <view class="product-item left" wx:for="{{products}}" wx:key="gg" wx:for-index="index" wx:for-item="item">
         <view class="classname" @tap="productItem(item.uuid)">
             <view class="product-img"><image mode="aspectFill" class="product-img-image" src="{{item.thumbUrl}}"/></view>
             <view class="product-name">{{item.name}}</view>
             <view class="clear product-price">
                 <view class="left main-color">￥<text class="product-price-text">{{item.salePrice}}</text></view>
                 <view class="left oldPrice" wx:if="{{item.marketPrice}}">￥{{item.marketPrice}}</view>
             </view>
         </view>
     </view>
   </view>
   <scroll-view scroll-x="true" wx:if="{{model == 2}}" class="uploadWrap">
     <view class="upload_Item" wx:for="{{products}}" wx:key="gg" wx:for-index="index" wx:for-item="item">
       <view class="classname" @tap="productItem(item.uuid)">
         <image class="upload_Item_img" src="{{item.thumbUrl}}"/>
         <view class="product-name upload_name">{{item.name}}</view>
         <view class="clear product-price">
             <view class="left main-color">￥<text class="product-price-text">{{item.salePrice}}</text></view>
             <view class="left oldPrice" wx:if="{{item.marketPrice}}">￥{{item.marketPrice}}</view>
         </view>
       </view>
     </view>
   </scroll-view>
 </view>
</template>

<script>
export default{
  editorConfig: {
    productTitle: {
      el: ['text'],
      label: '商品分类',
      type: 'String',
      director: 'selector',
      value:'',
      data (url, setting, cb) {
        let items = []
        setting.$http.get(`${url}/product/catalogs`).then((res) => {
          var fdata = JSON.parse(res.bodyText)
          this.value = fdata.data[0].id
          fdata.data.forEach((v) => {
            items.push({
              text: v.name,
              value: v.id
            })
          })
          cb(items)
        })
      }
    },
    model:{
      label: '布局',
      type: 'Number',
      value:1,
      director : 'radio'
    }
  },
  props: {
      model: {
        default: 1,
        type: Number
      },
      productTitle: {
        type: Number
      }
  },
  data () {
    return {
      products: []
    }
  },
  methods: {
      productItem (id){
          wx.navigateTo({
              url: '../goods/goods' + '?id=' + id
          })          
      },
      req () {
        var that = this
        wx.request({
            url: this.$root.apiServer+this.$root.appid+'/basic/api/product/productByCatalogId',
            data: {
                catalogId : this.productTitle,
                status : 1
            },
            method: 'GET',
            header: {
              'content-type': 'application/json'
            },
            success (res) {
              var productList = res.data.data.filter(item => {
		              return item.status == 1
		           })
              that.products = productList
            }
        })
      }
  },
  watch: {
    productTitle (val){
      this.req(val)
    }
  },
  onLoad () { 	
    if(this.productTitle){
      this.req(this.productTitle)
    }
  }
}

</script>

<style scoped>
.nonePro{height:300rpx;line-height: 300rpx;text-align: center;}
.product-cant{height: 100rpx;line-height: 100rpx;position: relative;background:#ffffff}
.product-line{position: absolute;width: 240rpx;height: 4rpx;background: #000;top:46rpx;left: 50%;margin-left: -120rpx;}
.product-title{position: absolute;width: 180rpx;left:50%;margin-left: -90rpx;top: 0;text-align: center;background: #ffffff}
.clear::after{display: block;height: 0;clear: both;content: "";overflow: hidden;visibility: hidden}
.left{float: left}
.right{float: right}
.product-list{ background: #f9f9f9;padding-bottom:20rpx;padding-top: 8rpx;display: flex; flex-wrap:wrap;justify-content:space-between }
.product-item{width: 370rpx;height: 480rpx;background:#ffffff;margin-bottom: 10rpx;}
.product-img .product-img-image{width: 370rpx;height: 370rpx;}
.product-name{font-size: 28rpx;line-height: 50rpx;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width: 350rpx;margin-left: 10rpx;}
.upload_name{width: 280rpx;}
.product-price{font-size: 22rpx;line-height: 40rpx;margin-left: 10rpx;color: #999999}
.product-price .product-price-text{font-size: 30rpx;}
.oldPrice{text-decoration:line-through;margin-left: 10rpx;line-height: 44rpx;}

.upload_title{height: 80rpx;line-height: 80rpx;padding-left: 20rpx;font-size: 26rpx;border-top:solid 1rpx #e3e3e3;}

.uploadWrap{width:100%; white-space:nowrap;}  
.upload_Item{ width:298rpx; height: 406rpx;  flex: 1;margin-right: 10rpx;border:solid 2rpx #e3e3e3;display: inline-block;}  
.upload_Item_img{ width: 298rpx; height: 300rpx;}
</style>