<template>
    <view style="{{conDisplay}}">
        <view class="pageback" @tap="clickBack"></view>
        <view class="cont-box">
            <view class="contant">
                <view class="cont-back">
                    <view class="good-img" wx:if="{{product.url}}">
                        <image src="{{product.url}}" class="good-img-image"></image>
                    </view>
                    <view wx:else class="empty good-img">暂无图片</view>
                    <view class="good-other">
                        <view class="good-price">￥{{product.price}}</view>
                        <view class="good-store">库存：{{product.stockNum}}件</view>
                        <view class="good-norm">已选择：
                            <text class="main-color">{{product.skuSpec}}</text>
                        </view>
                    </view>
                </view>
            </view>

            <view class="good-norms">
                <view class="auto">
                    <view class="norms-main">
                        <view class="norms-top">规格选择</view>
                        <view class="norms-bottom clear">
                            <view class="{{currentItem == item.id ? 'option f3' : 'option b6'}}" wx:for="{{skus}}" wx:key="id" @tap="itemValue(item.id)">{{item.skuSpec}}</view>
                        </view>
                    </view>
                </view>

                <view class="auto">
                    <view class="norms-main">
                        <view class="norms-top">数量</view>
                        <view class="stepper">
                            <text class="{{minusStatus + ' stepper-text'}}" @tap="bindMinus">-</text>
                            <input class="stepper-input" type="number" @change="bindManual" value="{{num}}" />
                            <text class="normal stepper-text" @tap="bindPlus">+</text>
                        </view>
                    </view>
                </view>
            </view>
            <view class="good-cont"></view>
            <view class="btn main-back" @tap="subm(currentItem)" style="{{'background:'+color}}">确认</view>
        </view>
    </view>
</template>

<script>
export default {
    props: {
        display: {
            type: String,
            default: 'display: none'
        },
        isCar: {
            type: Number,
            default: 0
        },
        productSkus: Array,
        goodsName: String,
        color: String
    },
    data() {
        return {
            num: 1,
            minusStatus: 'disabled',
            currentItem: 0,
            isShowStockNum: false,
            isShowSaleNum: false,
            isRealStockNum: false,
            isRealSaleNum: false,
            virtualStockNum: 0,
            virtualSaleNum: 0,
            stockNumSummary: 0,
            saleNumSummary: 0,
            product: {
                id: '',
                price: 0,
                stockNum: 0,
                skuSpec: '',
                num: 0,
                url: ''
            },
            skus: [],
            conDisplay: this.display,
            rateProportion: 0,
            rateFlag: ""
        }
    },
    watch: {
        display(newVal) {
            this.conDisplay = newVal
        },
        productSkus(newVal) {
            this.skus = newVal
        },
        skus(newVal) {
            if (newVal && newVal.length) {
                this.itemValue(newVal[0].id)
            }
        }
    },
    onLoad(options) {
        var app = this.$root
        if (app.globalData) {
            var that = this
            this.version = app.globalData.appName
            wx.request({
                url: this.$root.apiServer + this.$root.appid + '/basic/api/product/uuid',
                data: {
                    uuid: options.id
                },
                method: 'GET',
                header: {
                    'content-type': 'application/json'
                },
                success(res) {
                    if (res.data.code == '100') {
                        that.isShowStockNum = res.data.data.isShowStockNum
                        that.isShowSaleNum = res.data.data.isShowSaleNum
                        that.isRealStockNum = res.data.data.isRealStockNum
                        that.isRealSaleNum = res.data.data.isRealSaleNum
                        that.virtualStockNum = res.data.data.virtualStockNum
                        that.virtualSaleNum = res.data.data.virtualSaleNum
                        that.stockNumSummary = res.data.data.stockNumSummary
                        that.saleNumSummary = res.data.data.saleNumSummary
                        that.rateFlag = res.data.data.rateFlag
                        that.rateProportion = res.data.data.rateProportion
                        that.skus = res.data.data.productSkus
                    }
                }
            })
        }
    },
    methods: {
        bindMinus() {
            var num = this.num
            // 如果大于1时，才可以减
            if (num > 1) {
                num--
            }
            // 大于一件的时，normal状态，否则disable状态
            var minusStatus = num <= 1 ? 'disabled' : 'normal'
            // 数值与状态写回
            this.num = num
            this.minusStatus = minusStatus
        },
        bindPlus() {
            var num = this.num
            num++
            // 大于一件的时，normal状态，否则disable状态
            var minusStatus = num < 1 ? 'disabled' : 'normal'
            // 数值与状态写回
            this.num = num
            this.minusStatus = minusStatus
        },
        /* 输入框事件 */
        bindManual(e) {
            var num = e.detail.value
            // 数值与状态写回
            this.num = num
        },
        clickBack() {
            this.conDisplay = 'display:none'
            this.$emit('displayChange', this.conDisplay)
        },
        itemValue(id) {
            var index = this.findItemIndexByUserId(id) // 对应产品在数组中的index            
            var productSkus = this.skus[index] // 对应产品
            var old_product = {}
            old_product.name = this.goodsName
            if (productSkus.salePrice) {
                old_product.price = productSkus.salePrice
            }
            if (this.isRealStockNum && this.isRealSaleNum) {

                old_product.stockNum = productSkus.stockNum - productSkus.saleNum
            } else {
                old_product.stockNum = this.virtualStockNum
            }
            old_product.num = this.num
            old_product.id = productSkus.productId
            old_product.skuId = productSkus.id
            old_product.skuSpec = productSkus.skuSpec
           
            if (productSkus.thumbnail !== null) {
                old_product.url = productSkus.thumbnail.url
                if (old_product.url && !old_product.url.startsWith('http://')) {
                  old_product.url = `http://image.vdongchina.com/` + old_product.url
                }
            } else {
                old_product.url = ''
            }
            
            
            
            
            
            this.product = old_product
            this.currentItem = id
        },
        findItemIndexByUserId(id) {
            if (id >= 0) {
                for (var i = 0, len = this.skus.length; i < len; i++) {
                    if (this.skus[i].id == id)
                        return i
                }
            }
        },

        //确认商品
        subm() {
            if (this.product.id) {
                var product = this.product
                product.num = this.num

                product.product = {
                    rateProportion: this.rateProportion,
                    rateFlag: this.rateFlag
                }
                if (this.isCar == 1) {
                    var servsers = getApp().globalData.servsers
                    var that = this
                    wx.request({
                        url: this.$root.apiServer + this.$root.appid + '/basic/api/cart/addProduct',
                        data: {
                            token: getApp().globalData.token,
                            skuId: that.product.skuId,
                            buyNum: that.num
                        },
                        method: 'POST',
                        header: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        success(res) {
                            if (res.data.code == '100') {
                                that.conDisplay = "display:none"
                                wx.showToast({
                                    title: '加入成功',
                                })
                            } else {
                                wx.showModal({
                                    title: '提示',
                                    content: res.data.msg,
                                })
                            }
                        }
                    })
                } else {
					var that = this
                    if (product.stockNum == 0) {
                        wx.showModal({
                            title: '提示',
                            content: '库存不足',
                        })
                    } else {
                        that.conDisplay = "display:none"
                        wx.navigateTo({
                            url: '../order/order' + '?product=' + JSON.stringify(product)
                        })
                    }

                }
            } else {
                wx.showModal({
                    title: '提示',
                    content: '请选择规格'
                })
            }
        }
    }
}
</script>

<style scoped>
.clear::after {
    display: block;
    height: 0;
    clear: both;
    content: "";
    overflow: hidden;
    visibility: hidden
}

.left {
    float: left
}

.right {
    float: right
}

.auto {
    width: 710rpx;
    margin-left: auto;
    margin-right: auto
}

.pageback {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 998;
    background: rgba(0, 0, 0, 0.5)
}

.cont-box {
    position: fixed;
    bottom: 0;
    top: 220rpx;
    z-index: 1000;
    width: 100%
}

.contant {
    height: 200rpx;
    border-bottom: solid #e3e3e3 1rpx;
    background: #fff;
    padding-bottom: 20rpx;
}

.cont-back {
    width: 750rpx;
    height: 200rpx;
}

.good-img {
    width: 210rpx;
    height: 210rpx;
    position: absolute;
    left: 30rpx;
    top: -10rpx;
    border-radius: 8rpx;
    overflow: hidden;
    line-height: 210rpx;
    text-align: center
}

.empty {
    border: solid 2rpx #e3e3e3;
    background: #fff
}

.good-img .good-img-image {
    width: 210rpx;
    height: 210rpx;
    background: red
}

.good-other {
    margin-left: 270rpx;
    padding-top: 24rpx;
    font-size: 24rpx;
}

.good-price {
    font-size: 28rpx;
}

.good-store {
    margin-top: 20rpx;
}

.good-norm {
    margin-top: 20rpx;
}

.good-norms {
    background: #fff;
}

.norms-top {
    font-size: 24rpx;
    color: #999999;
    line-height: 80rpx;
}

.norms-main {
    padding-bottom: 20rpx;
    border-bottom: #e3e3e3 1rpx solid;
}

.norms-bottom {
    max-height: 300rpx;
    overflow-x: scroll;
}

.norms-bottom .option {
    float: left;
    font-size: 28rpx;
    padding: 14rpx 34rpx;
    margin-right: 20rpx;
    border-radius: 6rpx;
    margin-bottom: 20rpx;
}

.b6 {
    border: solid 2rpx #b6b6b6;
}

.f3 {
    border: 2rpx solid #ff3e78;
    color: #ff3e78
}

.norms-bottom .sub,
.norms-bottom .nub,
.norms-bottom .add {
    float: left;
    text-align: center;
}

.norms-bottom .sub,
.norms-bottom .add {
    width: 88rpx;
    height: 60rpx;
    line-height: 60rpx;
    border: solid 2rpx #b6b6b6;
}

.norms-bottom .sub {
    border-top-left-radius: 6rpx;
    border-bottom-left-radius: 6rpx;
    border-right: none
}

.norms-bottom .add {
    border-top-right-radius: 6rpx;
    border-bottom-right-radius: 6rpx;
    border-left: none
}

.norms-bottom .nub {
    width: 98rpx;
    height: 60rpx;
    border: solid 2rpx #b6b6b6;
    line-height: 60rpx
}

.stepper {
    width: 286rpx;
    height: 62rpx;
    border: 1px solid #ccc;
    border-radius: 4rpx;
}

.stepper .stepper-text {
    width: 90rpx;
    line-height: 62rpx;
    text-align: center;
    float: left;
    font-size: 28rpx;
}

.stepper .stepper-input {
    width: 100rpx;
    height: 62rpx;
    float: left;
    text-align: center;
    font-size: 22rpx;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
}

.stepper .normal {
    color: black;
    background: #ffffff
}

.stepper .disabled {
    color: #ccc;
    background: #f6f6f6
}

.btn {
    position: absolute;
    width: 100%;
    height: 100rpx;
    bottom: 0;
    font-size: 32rpx;
    color: #ffffff;
    text-align: center;
    line-height: 100rpx;
}

.good-cont {
    position: absolute;
    width: 100%;
    height: 800rpx;
    background: #fff;
    bottom: 0;
    left: 0;
    z-index: -9
}
</style>