<template>
    <view>
		<view class="bottom">
            <view class="bottom_service" @tap="phone">
                <image class="bottom_service_img" src="http://image.vdongchina.com/M00/03/E5/ZSUkmVnxTKSEd27bAAAAAONaCk4043.png"></image>
                <text class="text">客服</text>
            </view>
            <view class="bottom_bnt">
                <view class="oneself" @tap="onceBuy">
                    <text class="price">¥ {{shopDetail.marketPrice}}</text>
                    <text class="price_tit">单独购买</text>
                </view>
                <view class="together" @tap="Group">
                    <text class="price">¥ {{shopDetail.groupPrice}}</text>
                    <text class="price_tit">一键开团</text>
                </view>
            </view>
            
        </view>
        <sku-selector
            :display="display"
            :is-car="isCar" 
            :goods-name="name"
            :color="color"
            :state="states"
            :join="join"
            :shop-list="shopDetail"></sku-selector>
    </view>
</template>

<script>
import skuSelector from '../SkuSelectored/SkuSelectored'

export default {
    editorConfig: {
        color: {
            el: ['text', 'color'],
            label: '选择颜色',
            type: 'String',
            value: '#303030',
            director : 'ColorPicker'
        }
    },
	components: {
        skuSelector: skuSelector
    },
    props: {
        color: {
            default: '#ff3e78',
            type: String
        },
        state:{
            type: Number,
            default: 1
        },
        shopList: Array,
    },
	data () {
		return {
			isCar: 0,
            display:false,
            name: '',
            status: 1,
            states:1,//1是团购，0 是普通购买
            join:0,//1为参团
            productSkus: [],
            shopDetail:{}
        }
	},
	onLoad (options) {
        this.display=false
	},
    watch: {
        shopList(newVal){
            // console.log('shopList')
            // console.log(newVal)
            this.shopDetail = newVal
        },
        state(newVal){
            this.states = newVal
        }
    },
	methods: {
		Group(){//开团
            this.display = true
            this.states = 1
        },
        onceBuy(){//普通购买
            this.display = true
            this.states = 0
        },
        phone () {
	      var app = this.$root
	      var that = this
	      this.version = app.globalData.appName
	      wx.request({
	        url: this.$root.apiServer+this.$root.appid+'/basic/api/dic/findDicByCode',
	        data: {
	          code:'kf'
	        },
	        method: 'GET',
	        header: {
	          'content-type': 'application/x-www-form-urlencoded'
	        },
	        success (res) {
	        	if(res.data.success == true){
	        		if(res.data.data.v){
		        		wx.makePhoneCall({
							  phoneNumber: res.data.data.v
						})
	        		}else{
		                wx.showModal({
		                    title: '提示',
		                    content: '请输入客服电话'
		                })
	        		}

	        	}

	        },
	      })
        }
	}
}
</script>

<style scoped>
.bottom{
    width:100%;
    height:98rpx;
    position:fixed;
    bottom:0;
    left:0;
    z-index:9;
    background-color:#fff;
}

.bottom_service{
    width:108rpx;
    height:98rpx;
    text-align:center;
    float:left;
}
.bottom_bnt{
    width:calc( 100% - 108rpx);
    float:left;
}
.bottom_service .bottom_service_img{
    width:48rpx;
    height:48rpx;
    margin:12rpx auto 0;
    display:block;
}
.bottom_service .text{
    font-size: 20rpx;
    color: #666666;
    display:block;
}
.oneself{
    width: 50%;
    height:98rpx;
    background-color:#FE939D;
    text-align:center;
    float:left;
}
.together{
    width:50%;
    height:98rpx;
    background-color:#DD2727;
    text-align:center;
    float:left;
}
.price{
    width:100%;
    display:block;
    font-size: 32rpx;
    color: #FFFFFF;
    text-align:center;
    padding-top:20rpx;
}
.price_tit{
    width:100%;
    display:block;
    font-size: 24rpx;
    color: #FFFFFF;
    padding-top:4rpx;
    text-align:center;
}


</style>