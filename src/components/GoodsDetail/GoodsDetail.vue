<template>
	<view wx:if="{{detail}}" class="detail">
		<view class="dat_titie">产品描述</view>
		<view class="dat_main"><rich-text nodes="{{detail}}"></rich-text></view>
	</view>
</template>
<script>
export default {
  editorConfig: {

  },
  props: {

  },
  data () {
    return {
      detail:''
    }
  },
  onLoad (options) {
	  var that = this
	  wx.request({
	    url: this.$root.apiServer+this.$root.appid+'/basic/api/product/uuid',
	    data: {
	      uuid: options.id
	    },
	    method: 'GET',
	    header: {
	      'content-type': 'application/json'
	    },
	    success (res) {
	      if (res.data.code == '100') {
	        that.detail = res.data.data.detail
	      }
	    }
	  })
  }
}

</script>
<style scoped>
.detail{width: 100%; overflow-x: hidden;word-wrap: break-word;word-break:break-all;}
.dat_titie{line-height: 88rpx;font-size: 32rpx;padding: 0 10rpx;border-bottom: 1rpx solid #e3e3e3;}
.dat_main{padding: 10rpx;font-size: 28rpx;}
</style>