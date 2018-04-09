<template>
<view>
		<view><goodsslider></goodsslider></view>
		<view><goodspricebar></goodspricebar></view>
		<view><goodsinfo></goodsinfo></view>
		<view><goodsbottombar></goodsbottombar></view>
		<view><goodsdetail></goodsdetail></view>
</view>		
</template>


<script>
import goodsdetail from "../../components/GoodsDetail/GoodsDetail"	
import goodsslider from "../../components/GoodsSlider/GoodsSlider"
import goodspricebar from "../../components/GoodsPriceBar/GoodsPriceBar"
import goodsinfo from "../../components/GoodsInfo/GoodsInfo"
import goodsbottombar from "../../components/GoodsBottomBar/GoodsBottomBar"
export default {
  config: {
    navigationBarTitleText: '商品详情页'
  },
  components: {
  	goodsdetail:goodsdetail,
  	goodsslider: goodsslider,
  	goodspricebar:goodspricebar,
  	goodsinfo:goodsinfo,
  	goodsbottombar:goodsbottombar
  }
}
</script>

<style>
</style>
