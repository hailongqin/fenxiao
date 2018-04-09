<template>
	<view>
		<view class="classify" style="{{'background:'+bgColor}}" wx:if="{{name.length>0}}">
			<view class="index_sts bmg margint">
				<view class="index_sts_title clear">
					<text class="index_star left" style="{{'font-weight:' + fontWeighta + '; font-size:' + fontSize*2 + 'rpx;'}}">{{text}}</text>
					<view class="right index_more" @tap="toManicurist">
						<view class="right">
							<image class="index_more_image" src="http://image.vdongchina.com/M00/01/84/ZSUkmVm2ArqEBSYwAAAAAKhVnJM311.png"></image>
						</view>
						<view class="text right">查看更多</view>
					</view>
				</view>
				<scroll-view class="scollTrue" scroll-x="true">
					<view class="index_wrap scollTrue">
						<view class="index_name" wx:for="{{name}}" wx:key="index">
							<view class="clear index_wrap_item" @tap="nameItem(item.id)">
								<view class="index_name_img left">
									<image mode="aspectFit" class="index_name_img" src="{{'http://image.vdongchina.com/'+item.headUrl}}"></image>
								</view>
								<view class="index_person left">
									<view class="index_wrap_name">{{item.name}}</view>
									<view class="index_wrap_job">{{item.categoryName}}</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<view wx:else class="lists">
			<view class="nolists">暂无数据</view>
		</view>
	</view>
</template>
<script>
export default{
	editorConfig: {
		bgColor: {
			el: ['text', 'color'],
			label: '设置组件背景色',
			type: 'String',
			value: '#FFFFFF',
			director: 'ColorPicker'
		},
		text: {
			el: ['textarea'],
			label: '请输入文本',
			type: 'String',
			value: '匠星',
			director: 'Input'
		},
		fontSize: {
			el: ['number'],
			label: '调整字号',
			type: 'Number',
			value: '16',
			director: 'Fsize'
		},
		fontWeighta: {
			label: '是否加粗',
			type: 'String',
			value: 'bold',
			director: 'fontWeight'
		}
	},
	comName: '技师信息',
	props: {
		bgColor: {
			default: '#FFFFFF',
			type: String
		},
		text: {
			default: '匠星',
			type: String
		},
		fontSize: {
			default: '16',
			type: String
		},
		fontWeighta: {
			default: 'bold',
			type: String
		}
	},
	data() {
		return {
			name: []
		}
	},
	onLoad() {
		var that = this
		wx.request({
			url: this.$root.apiServer + this.$root.appid + '/basic/api/staff/queryStaff',
			method: 'POST',
			data: {				
				pageNum: 1,
				pageSize: 4
			},
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			success(res) {
				if(res.data.success){
					that.name = res.data.data.list.filter(item => {//匠星列表
						return item.status == 1
					})
				}	
			}
		})
	},
	methods: {
		toManicurist() {
			wx.navigateTo({
				url: '../actorsManicurist/actorsManicurist'
			})
		},
		nameItem(id){
			wx.navigateTo({
				url: '../actorsManicuristIndex/actorsManicuristIndex?id='+id
			})			
		}
	}

}
</script>
<style scoped>
/*.scollTrue {
	overflow: -webkit-paged-x;
}*/

.classify {
	padding-bottom: 2rpx;
	background: #FFFFFF;
}

.index_sts_title {
	padding: 28rpx 30rpx;
	border-bottom: 2rpx solid #f8f8f8;
	margin-bottom: 20rpx;
}

.index_star {
	line-height: 42rpx;
	font-size: 30rpx;
	color: #111111;
	font-weight: bold
}

.index_more .text {
	color: #999999;
	margin-right: 10rpx;
}

.index_more_image {
	width: 10rpx;
	height: 20rpx;
	margin-top: 0px;
}

.index_wrap {
	width: 100%;
	display: flex;
}

.index_wrap_item {
	width: 360rpx;
}

.index_name {
	border-right: solid 2rpx #f8f8f8;
	padding: 30rpx;
}

.index_name:last-child {
	border-right: none
}

.index_name_img {
	width: 160rpx;
	height: 160rpx;
	border-radius: 50%;
	overflow: hidden
}

.index_name_img_image {
	width: 140rpx;
	height: 140rpx;
}

.index_person {
/*	width: 190rpx;*/
	margin-left: 30rpx;
}

.index_wrap_name {
	line-height: 46rpx;
	font-size: 32rpx;
	font-weight: bold;
}

.index_wrap_job {
	margin-top: 16rpx;
}

.index_wrap_star {
	margin-top: 20rpx;
}

.index_wrap_star_image {
	width: 32rpx;
	height: 30rpx;
}

.left {
	float: left;
}

.right {
	float: right;
}

.clear:after {
	height: 0;
	content: ".";
	clear: both;
	display: block;
	visibility: hidden;
}

.nolists {
	padding: 60rpx;
	background: #fff;
	font-size: 30rpx;
	text-align: center;
	margin-bottom: 20rpx;
}

</style>