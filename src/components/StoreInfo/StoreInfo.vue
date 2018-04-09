<template>
  <view>
    <view class="index_recommend bmg clear" @tap="recommend" style="{{'background:'+bgColor}}">
				<view class=" index_brand">
					<image class="index_brand_image" src="{{'http://image.vdongchina.com/'+imgLogo}}"/>
				</view>
				<view class="index_mend">
					<view class="index_mend_title" style="{{'color:'+titColor}}">{{mendTitle}}</view>
					<view class="index_mend_matter" style="{{'color:'+desColor}}">{{mendMatter}}</view>
				</view>
    </view>

    <!--店铺介绍dialog-->
  	<!-- <view class="mendbackg" wx:if="{{recommendDisplay}}" @tap="recommendClose">
  		<view class="mendDialog">
  			<view class="recommendDialog_title">{{mendTitle}}</view>
  			<scroll-view scroll-y="true" class="recommendDialog_matter">{{mendMatter}}</scroll-view>
  		</view>
  	</view> -->
  </view>
</template>

<script>
export default {
editorConfig: {
	bgColor: {
      el: ['text', 'color'],
      label: '设置组件背景色',
      type: 'String',
      value: '#ffffff',
      director : 'ColorPicker'
    },
    titColor: {
      el: ['text', 'color'],
      label: '设置标题颜色',
      type: 'String',
      value: '#111',
      director : 'ColorPicker'
    },
    desColor: {
      el: ['text', 'color'],
      label: '设置描述颜色',
      type: 'String',
      value: '#666',
      director : 'ColorPicker'
    }
},
comName:"店铺信息",
  props: {
		bgColor: {
      default: '#ffffff',
      type: String
    },
    titColor: {
      default: '#111',
      type: String
    },
    desColor: {
      default: '#666',
      type: String
    }
  },
  data(){
    return {
		imgLogo: 'http://image.vdongchina.com/M00/01/2E/ZSUkmVmrXqWEffFBAAAAAG9swb8031.png',
	    mendTitle: '店铺名',
	    mendMatter: '描述信息',
	    recommendDisplay: false
    }
  },
  onLoad() {
		var that = this
		wx.request({          
		    url: this.$root.apiServer + this.$root.appid + '/basic/api/store/defaultStoreInfo',
		    method: 'POST',
		    header: {
		        'content-type': 'application/json'
		    },
		    success (res) {
		       	if(res.data.success){
			        that.imgLogo= res.data.data.logo
			        that.mendTitle= res.data.data.name
	            that.mendMatter= res.data.data.intro
           		}
		    }
		})
	},
  	methods: {
	    recommend(){
				wx.navigateTo({
						url: '../storesDetails/storesDetails'
				})      
	    },
  	}
}
</script>

<style scoped>
  .clear::after{display: block;clear: both;content: "";height: 0;overflow: hidden;visibility: hidden}
  .left{float: left}
  .index_recommend {
  	padding: 30rpx;
		position: relative
  }
	.index_brand{
		position: absolute;
		left:30rpx;
		top:30rpx;
	}
  .index_brand_image {
  	width: 120rpx;
  	height: 120rpx;
  }

  .index_mend {
  	margin-left: 150rpx;
		position: relative
  }

  .index_mend_title {
  	line-height: 46rpx;
		height: 46rpx;
  	font-size: 32rpx;
  	color: #111111;
  	font-weight: bold;
  	margin-bottom: 20rpx;
  	overflow: hidden;
  	text-overflow: ellipsis;
  	white-space: nowrap;		
  }

  .index_mend_matter {
  	overflow: hidden;
  	text-overflow: ellipsis;
  	white-space: nowrap;
  	color: #666666;
  	font-size: 24rpx;
  }
  .mendbackg {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, .6);
		z-index:1000
	}

	.mendDialog {
		position: fixed;
		width: 560rpx;
		height: 350rpx;
		left: 50%;
		top: 50%;
		margin-left: -280rpx;
    	margin-top: -176rpx;
		background: #fff;
		border-radius: 8rpx;
		z-index: 10;
	}

	.recommendDialog_title {
		line-height: 80rpx;
		border-bottom: 2rpx solid #e5e5e5;
		font-size: 32rpx;
		text-align: center;
		font-weight: bold;
		color: #111111;
		box-sizing: border-box;
	}

	.recommendDialog_matter {
		padding: 24rpx;
		font-size: 24rpx;
		line-height: 40rpx;
		height: 270rpx;
		color: #666666;
		box-sizing: border-box;
	}
</style>
