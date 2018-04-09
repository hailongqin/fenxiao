<template>
	<scroll-view scroll-x="true" class="uploadWrap" style="{{'background:'+bgColor}}">
		<view class="upload_Items" wx:for="{{swiperSlides}}" wx:key="gg">
			<view class="classname" @tap="itemTapHandler(item.to)" style="{{'padding-top:' + paddingt * 2 + 'rpx;padding-bottom:' + paddingb * 2 + 'rpx;padding-left:' + paddinglr * 2 + 'rpx;padding-right:'+ paddingr * 2 +'rpx;'}}">
				<image class="upload_Item_img" src="{{item.url}}" style="{{'height:' + height * 2 + 'rpx;width:' + width * 2 + 'rpx;'}}" />
				<view hidden="{{!openTitle.open}}" style="{{'color:'+openTitle.color+';font-size:'+openTitle.fontSize*2+'rpx;width:'+width*2+'rpx;text-align:'+openTitle.align}}" class="sw-title">{{item.desc}}</view>
			</view>
		</view>
	</scroll-view>	
</template>

<script>
	export default {		
		editorConfig: {
		    openTitle: {
		      label: '开启标题',
		      type: Object,
		      value: {
		        open: true,
		        color: "#000",
		        fontSize: 14,
		        align: "center"
		      },
		      director: 'swiperpicTitle'
		    },
		    bgColor: {
		      el: ['text', 'color'],
		      label: '背景色',
		      type: 'String',
		      value: '#fff',
		      director : 'ColorPicker'
		    },
			swiperSlides: {
				label: '图片填充',
				type: 'slider',
			      value: [
			        {
			          url: 'http://image.vdongchina.com/M00/00/B7/ZSUkmVmbqe2Ef5EJAAAAAHrp8co145.png',
			          to: '',
			          desc: '请输入标题',
			          code: ''
			        },
			        {
			          url: 'http://image.vdongchina.com/M00/00/B7/ZSUkmVmbqe2Ef5EJAAAAAHrp8co145.png',
			          to: '',
			          desc: '请输入标题',
			          code: ''
			        }
			      ],
				director: 'swiperpic'
			},
			height: {
				el: ['number'],
				label: '调整图片高度',
				type: 'Number',
				value: '115',
				director: 'Fsize'
			},
			width: {
				el: ['number'],
				label: '调整图片宽度',
				type: 'Number',
				value: '115',
				director: 'Fsize'
			},
			paddingt: {
				el: ['number'],
				label: '调整图片上间距',
				type: 'Number',
				value: '15',
				director: 'Fsize'
			},
			paddingb: {
				el: ['number'],
				label: '调整图片下间距',
				type: 'Number',
				value: '15',
				director: 'Fsize'
			},
			paddinglr: {
				el: ['number'],
				label: '图片的左间距',
				type: 'Number',
				value: '15',
				director: 'Fsize'
			},
			paddingr: {
				el: ['number'],
				label: '图片的右间距',
				type: 'Number',
				value: '0',
				director: 'Fsize'
			}
		},
		comName:"滑动导航",
		props: {
		    openTitle: {
		      type: Object,
		      default: function(){
		        return {open:true,color:"#f00",fontSize:14,align: 'center'}
		      }
		    },
		    bgColor: {
		      default: '#fff',
		      type: String
		    },
			swiperSlides: {
				default: function () {
					return [  
						{
				            url: 'http://image-dev.vdongchina.com/group2/M00/00/01/wKgfyFkK1GaENjB5AAAAAHrp8co482.png',
				            to: '',
				            desc: '请输入标题',
				            code: ''
				        },
				        {
				            url: 'http://image-dev.vdongchina.com/group2/M00/00/01/wKgfyFkK1GaENjB5AAAAAHrp8co482.png',
				            to: '',
				            desc: '请输入标题',
				            code: ''
				        }
					]
				},
				type: Array
			},
			height: {
				default: '115',
				type: String
			},
			width: {
				default: '115',
				type: String
			},
			paddingt: {
				default: '30',
				type: String
			},
			paddingb: {
				default: '30',
				type: String
			},
			paddinglr: {
				default: '30',
				type: String
			},
			paddingr: {
				default: '0',
				type: String
			}
		},
		methods: {
			itemTapHandler(to) {
				if (!to || typeof to !== 'string') return
		        if(to.indexOf('appid=')!==-1){
		          var path = to.split('appid=')[0]
		          var appid = to.split('appid=')[1]
		          wx.navigateToMiniProgram({
		            appId: appid,
		            path: path
		          })
		        }else{
		          wx.navigateTo({
		            url: to
		          })
		        }
			}
		}
	}
</script>

<style scoped>
	.uploadWrap {
		width: 100%;
		white-space: nowrap;
	}
	
	.upload_Items {
		display: inline-block;
	}
	.sw-title{
	  height: 50rpx;
	  line-height: 50rpx;
	  overflow: hidden;
	  text-overflow: ellipsis;
	  white-space: nowrap;
	}	
</style>