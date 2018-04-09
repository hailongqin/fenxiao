<template>
  <view class="search" @tap="toSearch">
		<image class="img" src="{{currentSrc}}"/>
	</view>
</template>
<script>
export default {
		editorConfig: {
		    currentSrc: {
		      el: ['uploader'],
		      label: '更换搜索图标',
		      type: 'String',
		      value: 'http://image.vdongchina.com/M00/06/11/ZSUkmVoXuIeEc38bAAAAAE3qOmA604.png',
		      director : 'uploader'
		    }
		},
		comName:"分销搜索",
		props: {
	    currentSrc: {
	      default: 'http://image.vdongchina.com/M00/06/11/ZSUkmVoXuIeEc38bAAAAAE3qOmA604.png',
	      type: String
	    }
		},
		onLoad() {

		},
		methods: {
      toSearch(){
         wx.navigateTo({
           url: '../f_search/f_search'
         })
       }
		}
}
</script>
<style scoped>
.search{
  height: 100rpx;
  width:100rpx;
  position: fixed;
  bottom:124rpx;
  right: 30rpx;
  border-radius: 50%;
  box-shadow: 0 4rpx 12rpx 0 rgba(0,0,0,0.1);
  z-index: 999;
}
.search .img{
    height:100%;
    width:100%;
    display: block;
}
</style>
