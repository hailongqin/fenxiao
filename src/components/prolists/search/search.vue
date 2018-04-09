<template>
	<view class="searchBox clear" style="{{'background:'+bgColor}}">
		<view class="{{isLeft ? 'icoLeft' : ''}}">
			<image wx:if="{{currentSrc}}" mode="aspectFit"  src="{{currentSrc}}" class="serachBtn" ></image>
			<image wx:else  src="http://image.vdongchina.com/M00/03/3A/ZSUkmVngHmWEVDylAAAAAK2-1Ts656.png" class="serachBtn" ></image>		
		</view>		
	    <view class="{{ isCenter ? 'textCenter searchInput ': 'searchInput '}}" @tap="headFoucus" style="{{'border:1px solid '+bdColor+';'}}">请输入关键词</view>
	</view>
</template>
<script>
	export default {
		editorConfig: {
			bgColor: {
		      el: ['text', 'color'],
		      label: '搜索框背景色',
		      type: 'String',
		      value: '#f6f6f6',
		      director : 'ColorPicker'
		    },
		    bdColor: {
		      el: ['text', 'color'],
		      label: '输入框边框颜色',
		      type: 'String',
		      value: '#f6f6f6',
		      director : 'ColorPicker'
		    },
		    currentSrc: {
		      el: ['uploader'],
		      label: '更换搜索图标',
		      type: 'String',
		      value: '',
		      director : 'uploader'
		    },
		    isLeft: {
		      label : '搜索图标是否右对齐',
		      type : 'Boolean',
		      value : false ,
		      director : 'switch'
		    },
		    isCenter: {
		      label : '输入框文字是否居中',
		      type : 'Boolean',
		      value : false ,
		      director : 'switch'
		    },
		    currentTo: {
		      label: '选择商品分类',
		      type: 'Number',
      		  value:1,
		      director : 'fenlei'
		    }
		},

		comName:"搜索框",
		props: {
			bgColor: {
		        default: 'red',
		        type: String
	      	},
		    bdColor: {
		        default: '#F7F8F8',
		        type: String
	      	},
		    currentSrc: {
		      default: '',
		      type: String
		    },
		    currentTo: {
		      default: 1,
	          type: Number
		    },
		    isCenter: {
	          type: Boolean,
	          default: false
	      	},
	     	isLeft: {
	          type: Boolean,
	          default: false
	      	}
		},

		data() {
			return {				
				vaule:""
			}
		},
		methods: {
			headFoucus(){
			  let that = this
	          wx.navigateTo({
	              url: '../search/search?type='+that.currentTo
	          })  
			}
		}
	}
</script>
<style scoped>	
.searchBox{padding: 20rpx 40rpx;position: relative;}
.searchInput{height: 60rpx;line-height: 60rpx;width: 87%;padding:4rpx 20rpx 4rpx 60rpx;border-radius: 10rpx;font-size: 30rpx;color: #999;background: #fff;}
.icoLeft .searchInput{padding:4rpx 60rpx 4rpx 20rpx;border-radius: 10rpx;}
.icoLeft .serachBtn{left:87%;right:60rpx!important;}
.serachBtn{width: 40rpx;height:40rpx;left: 60rpx;top:36rpx;position: absolute;}
.clear:after {height: 0;content: ".";clear: both;display: block;visibility: hidden;}
.textCenter{text-align: center;}
</style>