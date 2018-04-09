<template>
    <view>
        <view class="main-btn clear">
            <view class="auto">
                <view class="btn-left left">
                    <view class="phoneBtn btn-left-view" @tap="phone" wx:if="{{type==0}}"><image class="phoneBtn-image" src="http://image.vdongchina.com/M00/03/39/ZSUkmVngESiEbjiCAAAAAFe96EA370.png"></image></view>
                    <button open-type="contact" class="phoneBtn btn-left-view" wx:else>
                      <image class="phoneBtn-image" src="http://image.vdongchina.com/M00/09/5A/ZSUkmVpSx6CEck60AAAAAIaK0Z8025.png"></image>
                    </button>
                    <view class="orderBtn btn-left-view" @tap="orderBtn"><image class="orderBtn-image" src="http://image.vdongchina.com/M00/03/33/ZSUkmVnfLa2Ec56NAAAAAOARW0c919.png"></image></view>
                    <view class="carBtn btn-left-view" @tap="carBtn"><image class="carBtn-image" src="http://image.vdongchina.com/M00/03/2A/ZSUkmVnexjuENcfrAAAAAGgDChc185.png"></image></view>
                </view>
                <view class="btn-right right">
                    <view class="btn-right-view joinBtn" @tap="joinCar" style="{{'border:1px solid ' + color + '; color:' + color}}">加入购物车</view>
                    <view class="btn-right-view buyBtn" @tap="onceBuy" style="{{'background:' + color}}">立即购买</view>
                </view>
            </view>
        </view>
        <sku-selector
            :display="display"
            :is-car="isCar"
            :product-skus="productSkus"
            :goods-name="name"
            :color="color"
            @displayChange="displayChangeHandler"></sku-selector>
    </view>
</template>

<script>
import SkuSelector from '../SkuSelector/SkuSelector'
export default {
     editorConfig: {
        color: {
          el: ['text', 'color'],
          label: '选择颜色',
          type: 'String',
          value: '#303030',
          director : 'ColorPicker'
        },
        type:{
          label:'客服类型',
          type:'String',
          value:'0',
          director:'radio5'
        }
    },
    components: {
        skuSelector: SkuSelector
    },
    props: {
        color: {
            default: '#ff3e78',
            type: String
        },
        goodsName :{
            default :'',
            type:String
        },
        type: {
          default :'0',
          type:String
        }
    },
    data () {
        return {
            isCar: 0,
            display: 'display:none',
            name: '',
            status: 1,
            productSkus: []

        }
    },
    onLoad (options) {
      this.$root.globalData.color = this.color
      var app = this.$root
      var that = this
      this.version = app.globalData.appName
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
            that.name = res.data.data.name
            that.productSkus = res.data.data.productSkus
            that.status = res.data.data.status
          } else {
            that.$root.redirectError('很遗憾，商品不存在')
          }
        },
        fail (e) {
          that.$root.redirectError('很遗憾，商品不存在')
        }
      })
    },
    methods: {
        displayChangeHandler (val) {
            this.display = val
        },
        joinCar () {
            if (this.status == '1') {
                this.num = 1
                this.minusStatus = 'disabled'
                this.display = 'display:block'
                this.isCar = 1 // 默认为0，1：加入购物车，2：立即购买
            } else {
                wx.showModal({
                    title: '提示',
                    content: '商品已下架'
                })
            }
        },
        onceBuy () {
            if (this.status == '1') {
                this.num = 1
                this.minusStatus = 'disabled'
                this.display = 'display:block'
                this.isCar = 2
            } else {
                wx.showModal({
                    title: '提示',
                    content: '商品已下架'
                })
            }
        },
        //购物车跳转
        carBtn () {
            wx.navigateTo({
                url: '../car/car'
            })
        },
        // 订单列表跳转
        orderBtn () {
            wx.navigateTo({
                url: '../orderList/orderList'
            })
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
.clear::after{display: block;height: 0;clear: both;content: "";overflow: hidden;visibility: hidden}
.left{float: left}
.right{float: right}
.main-btn{height: 98rpx;width:100%;background: #ffffff;position:fixed;bottom: 0;border-top: #e3e3e3 solid 1rpx;z-index: 99;}
.btn-left{margin-top: 26rpx;}
.btn-left .btn-left-view{float: left;margin-right: 42rpx}
.phoneBtn{width: 42rpx;height: 42rpx;padding: 0;background: transparent;border-radius: 0;line-height: 1;position: static;}
.phoneBtn .phoneBtn-image{width: 42rpx;height: 42rpx;}
.orderBtn{width: 39rpx;height: 42rpx;}
.orderBtn .orderBtn-image{width: 39rpx;height: 42rpx;}
.carBtn{width: 42rpx;height: 42rpx;}
.carBtn .carBtn-image{width: 42rpx;height: 42rpx;}

.btn-right{margin-top: 10rpx}
.btn-right .btn-right-view{float: left;margin-left: 20rpx;text-align: center;line-height: 74rpx;height: 74rpx;border-radius: 8rpx;font-size: 32rpx;}
.joinBtn{width: 206rpx;}
.buyBtn{width: 180rpx;color: #ffffff}
.auto{width: 710rpx;margin-left: auto;margin-right: auto}
page{padding-bottom: 120rpx;}
</style>
