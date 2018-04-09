<template>
<view>
	<view class="container">
		<view class="_navbar_title bmg clear">
			<view class="left">请选择您要查看的地区</view>
			<view class="_navbar_item right clear" @tap="cityProvince">
				<view class="left">筛选</view>
				<view class="_navbar_icon screen left">
					<image class="screen_image" src="http://image.vdongchina.com/M00/03/3A/ZSUkmVngHiuEaUvdAAAAAIDo2So032.png"></image>
				</view>
			</view>
		</view>
		<view class="margint">
			<view class="_location clear bmg" wx:for="{{list}}" wx:key="gg">
				<view class="_location_info left">
					<view class="_location_store">{{item.name}}</view>
					<view class="_location_site">{{item.ress}}</view>
					<view class="_location_distance clear">
						<view class="left _location_distance_img">
							<image class="_location_distance_img_image" src="{{item.icon}}"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>

	<view class="pos-f txt-c ft28 c3c w-100" wx:if="{{cityShow}}">
		<view class="w-100 bg-wt">
			<view class="display-flex w-100 picker_header box-s">
				<view class="txt-left" @tap="cityCancel">取消</view>
				<view class="txt-right mainc" @tap="cityConfirm">确定</view>
			</view>
		</view>
		<picker-view class="" indicator-style="height: 50px;" style="width: 100%; height: 524rpx;" value="{{value}}" @change="bindChange" name="city">
			<picker-view-column>
				<view wx:for="{{provinces}}" wx:key="gg" style="line-height: 50px">{{item}}</view>
			</picker-view-column>
			<picker-view-column>
				<view wx:for="{{citys}}" wx:key="gg" style="line-height: 50px">{{item}}</view>
			</picker-view-column>
			<picker-view-column>
				<view wx:for="{{countys}}" wx:key="gg" style="line-height: 50px">{{item}}</view>
			</picker-view-column>
		</picker-view>
	</view>
</view>
</template>

<script>
	export default {
		config: {
			"navigationBarTitleText": "门店列表"
		},
		data() {
			return {
			    cityShow: false,
			    provinces: ["北京", "上海", "浙江"],
			    citys: ["宁波", "杭州"],
			    countys: ["慈溪", "鄞州", "江东", "江北"],
			    cityShow: false,
			    value: [2, 1, 1],
			    list: [
			      { name: "宁波银泰城店", ress: "鄞州区罗蒙环球城77号",icon: "http://image.vdongchina.com/M00/03/3A/ZSUkmVngHQGECJ57AAAAAKhVnJM099.png",},
			      { name: "宁波银泰城店", ress: "鄞州区罗蒙环球城77号",icon: "http://image.vdongchina.com/M00/03/3A/ZSUkmVngHQGECJ57AAAAAKhVnJM099.png",},
			
			    ] 
				}    
		},
		methods: {
//			bindChange(e){
//				const val = e.detail.value
//				const vals = this.value
//				if(vals[0] != val[0]) {
//					console.log("省变化")
//				}
//				if(vals[1] != val[1]) {
//					console.log("城市变化")
//				}
//				if(vals[2] != val[2]) {
//					console.log("县变化")
//				}
//
//				this.province = this.provinces[val[0]]
//				this.city = this.citys[val[1]]
//				this.county = this.countys[val[2]]
//				this.value = val
//			},
//			cityConfirm(e) {
//				const val = this.value
//				this.city = this.provinces[val[0]] + this.citys[val[1]] + this.countys[val[2]]
//				this.cityShow = false
//
//			},
//			cityCancel(e) {
//				this.cityShow = false
//			},
//
//			cityProvince(e) {
//				this.cityShow = true
//			}
		}		
		
}

	
</script>

<style scoped>
	._location {
		margin-bottom: 10rpx;
	}
	
	._location_info {
		width: 702rpx;
		padding: 24rpx 30rpx;
		position: relative;
	}
	
	._location_store {
		font-weight: bold;
		margin-bottom: 20rpx;
	}
	
	._location_site {
		margin-top: 4rpx;
		color: #999
	}
	
	._location_distance {
		position: absolute;
		color: #999999;
		right: 30rpx;
		top: 50%;
		margin-top: -20rpx;
	}
	
	._location_distance_img_image {
		width: 10rpx;
		height: 20rpx;
		margin-right: 20rpx;
	}
	
	._navbar_title {
		line-height: 98rpx;
		text-align: center;
		font-size: 30rpx;
		padding: 0 30rpx
	}
	
	.screen_image {
		width: 24rpx;
		height: 24rpx;
		top: 40rpx;
	}
	
	.picker_header {
		height: 85rpx;
		line-height: 85rpx;
		background: #fff;
		width: 94.1%;
		margin: 0 auto;
		justify-content: space-between;
		border-bottom: 1px dashed #eeeeee;
	}
	
	
	.pos-f {
		z-index: 88;
		background: #dddddd
	}
</style>