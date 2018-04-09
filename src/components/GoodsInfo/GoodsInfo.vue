<template>
	<view>
    <view class="goods-main">
        <view class="auto">
            <view class="goods-top">
                <view class="goods-name" style="{{'color:'+ color}}">{{goodsName}}</view>
                <view class="goods-price main-color" style="{{'color:'+ color}}">￥<text class="price-text" style="{{'color:'+ color}}">{{salePrice}}</text></view>
            </view>
            <view class="goods-other clear">
                <view class="left">
                    运费：免运费
                </view>
                <view class="right">
                    剩余：{{stockNum}}件
                </view>
            </view>
        </view>
    </view>
    </view>
</template>

<script>
export default {
  editorConfig: {
    color: {
      el: ['text', 'color'],
      label: '选择颜色',
      type: 'String',
      value: '#303030',
      director: 'ColorPicker'
    }
  },
  props: {
    color: {
      default: '#ff3e78',
      type: String
    }
  },
  data(){
    return {
      goodsName:'商品',
      salePrice: 500,
      stockNum:1000,
      isShowStockNum:false,
      isShowSaleNum:false
    }
  },
  onLoad (options) {
      var app = this.$root
      if(app.globalData){
        var that = this
        this.version = app.globalData.appName
        wx.request({
          url:this.$root.apiServer+this.$root.appid+'/basic/api/product/uuid',
          data: {
            uuid: options.id
          },
          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          success (res) {
            if (res.data.code == '100') {
              that.goodsName = res.data.data.name
              that.salePrice = res.data.data.salePrice              
              that.isRealSaleNum = res.data.data.isRealSaleNum
             that.isRealStockNum = res.data.data.isRealStockNum
              if(that.isRealStockNum && that.isRealSaleNum){              	             
              	that.stockNum = res.data.data.stockNumSummary-res.data.data.saleNumSummary
              }else{              	
              	that.stockNum = res.data.data.virtualStockNum
              }
              
            }
          }
        })
      }
    }
}
</script>

<style scoped>
.clear::after{display: block;height: 0;clear: both;content: "";overflow: hidden;visibility: hidden}
.left{float: left}
.right{float: right}
.auto{width: 710rpx;margin-left: auto;margin-right: auto}
.goods-main{border-bottom: 1rpx solid #e3e3e3;background: #fff}
.goods-top{height: 160rpx;border-bottom: 1rpx solid #e3e3e3}
.goods-name{font-size: 32rpx;line-height: 60rpx;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width: 700rpx;padding-top: 20rpx;}
.goods-price{font-size: 28rpx;}
.goods-price .price-text{font-size: 36rpx;}
.goods-other{height: 74rpx;line-height: 74rpx;font-size: 24rpx;color: #999999;}
</style>