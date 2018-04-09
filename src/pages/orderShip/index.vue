<template>
    <view class="page">
        <view class="topLine"></view>
        <view class="contant main-back" wx:if="{{status == 0}}">
            <view class="cont-pay">
                <view class="cont-pay-view">等待买家付款</view>
                <view class="cont-pay-view">{{time}}</view>
            </view>
            <view class="cont-img">
                <image src="http://image.vdongchina.com/M00/03/3C/ZSUkmVngJbKEcx2LAAAAAO0thoI576.png" class="cont-img-image"></image>
            </view>
        </view>
        <view class="contant main-back" wx:if="{{status == 1}}">
            <view class="cont-pay">
                <view class="cont-pay-view">等待卖家发货</view>
                <view class="cont-pay-view">您的包裹已蓄势待发</view>
            </view>
            <view class="cont-img">
                <image src="http://image.vdongchina.com/M00/03/31/ZSUkmVnfHbOELashAAAAAIIq1oc198.png" class="cont-img-image"></image>
            </view>
        </view>
        <view class="contant main-back" wx:if="{{status == 2}}">
            <view class="cont-pay">
                <view class="cont-pay-view">卖家已发货</view>
                <view class="cont-pay-view">您的包裹已经在路上啦</view>
            </view>
            <view class="cont-img">
                <image src="http://image.vdongchina.com/M00/03/31/ZSUkmVnfHbOELashAAAAAIIq1oc198.png" class="cont-img-image"></image>
            </view>
        </view>
        <view class="contant main-back" wx:if="{{status == 4}}">
            <view class="cont-pay">
                <view class="cont-pay-view">交易成功</view>
                <view class="cont-pay-view">欢迎下次光临</view>
            </view>
            <view class="cont-img">
                <image src="http://image.vdongchina.com/M00/03/3B/ZSUkmVngH6eEGpWlAAAAAEQCs-Q129.png" class="cont-img-image"></image>
            </view>
        </view>
        <view class="cont-back">
            <view class="auto">
                <view class="cant-log clear" @tap="log(id)">
                    <view class="cant-addr left">
                        <image src="http://image.vdongchina.com/M00/03/2A/ZSUkmVnexfyENc_rAAAAAPOB1-A972.png" class="cant-addr-image"></image>
                    </view>
                    <view class="left cant-msg">
                        <view>{{acceptStation}}</view>
                        <view class="acceptTime">{{acceptTime}}</view>
                    </view>
                </view>
                <view class="cant-names">
                    <view class="infoIco left">
                        <image src="http://image.vdongchina.com/M00/03/2E/ZSUkmVnfB-uEan1VAAAAALR9kO0125.png" class="infoIco-image"></image>
                    </view>
                    <view class="left infotext">
                        <view class="clear">
                            <view class="left">{{userName}}</view>
                            <view class="left tel">{{telNumber}}</view>
                        </view>
                        <view class="site">{{address}}</view>
                    </view>
                </view>
            </view>
        </view>
        <view class="cont-back">
            <view class="cant-border" wx:for="{{ordProducts}}" wx:key="gg">
                <view class="auto">
                    <view class="cant-name clear" wx:if="{{type == 0}}">
                        <image src="http://image.vdongchina.com/M00/03/30/ZSUkmVnfGPWERdl0AAAAALMebac136.png" class="cant-name-image"></image>
                        <text class="cant-name-text">旗舰店</text>
                    </view>
                    <view class="clear good-cant">
                        <view class="goods-img" wx:if="{{item.thumbnailUrl}}">
                            <image src="{{item.thumbnailUrl}}" class="goods-img-image"></image>
                        </view>
                        <view wx:else class="goods-no">暂无图片</view>
                        <view class="goods-text">
                            <view class="goods-name">{{item.productName}}</view>
                            <view class="goods-norms">{{item.productSkuSpec}}</view>
                            <view class="goods-price main-color clear">￥
                                <text class="left">{{item.salePrice}}</text>   <text class="right">x {{item.buyNum}}</text>     
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="auto cont-prod">
                <view class="cant-nub cant-border">订单编号:{{code}}</view>
                <view class="clear">
                    <view class="left">商品总价</view>
                    <view class="right">{{totalSalePrice}}</view>
                </view>
                <view class="clear" wx:if="{{payScorePrice != null}}">
                    <view class="left">抵用金额</view>
                    <view class="right">{{payScorePrice}}</view>
                </view>
                <view class="clear">
                    <view class="left color6">订单总价</view>
                    <view class="right main-color">{{totalPrice}}</view>
                </view>
            </view>
        </view>
        <view wx:if="{{type == 0}}">
            <view wx:if="{{status == 0}}" class="orderBtn clear">
                <view class="main-color main-bord btn" @tap="pay(id,totalPrice)">付款</view>
                <picker @change="bindChange" value="{{index}}" range="{{array}}">
                    <view class="main-color main-bord btn">取消订单</view>
                </picker>
            </view>
            <view wx:if="{{status == 1}}" class="orderBtn clear">
                <view class="main-color main-bord btn" @tap="phone">联系商家</view>
                <view class="main-color main-bord btn" @tap="confirm(id)">确认收货</view>
            </view>
            <view wx:if="{{status == 2}}" class="orderBtn clear">
                <view class="main-color main-bord btn" @tap="phone">联系商家</view>
                <view class="main-color main-bord btn" @tap="confirm(id)">确认收货</view>
            </view>
            <view wx:if="{{status == 3}}" class="orderBtn clear">
                <view class="main-color main-bord btn">去评价</view>
            </view>
            <view wx:if="{{status == 4}}" class="orderBtn clear">
                <view class="main-color main-bord btn" @tap="del(id)">删除订单</view>
            </view>
            <view wx:if="{{status == 5}}" class="orderBtn clear">
                <view class="main-color main-bord btn" @tap="del(id)">删除订单</view>
            </view>
            <view wx:if="{{status == 6}}" class="orderBtn clear">
                <view class="main-color main-bord btn">已退款
                    <text>{{ordRefunds}}</text>元</view>
            </view>
        </view>
        <view wx:if="{{type == 1}}">
            <view wx:if="{{status == 0}}" class="orderBtn clear">
                <view class="main-color main-bord btn" @tap="pay(id,totalPrice)">付款</view>
            </view>
            <view wx:if="{{status == 1}}" class="orderBtn clear">
                <view class="main-color main-bord btn">待发货</view>
            </view>
            <view wx:if="{{status == 2}}" class="orderBtn clear">
                <view class="main-color main-bord btn" @tap="confirm(id)">确认收货</view>
            </view>
            <view wx:if="{{status == 6}}" class="orderBtn clear">
                <view class="main-color main-bord btn">{{RefundStatue}}</view>
            </view>
        </view>
    </view>
</template>

<script>
const util = require('../../utils/util.js')
export default {
    config: {
        navigationBarTitleText: '我的订单'
    },
    data() {
        return {
            code: '',
            array: ['我不想买了', '信息填写错误，重新拍', '卖家缺货', '同城见面交易', '其他原因'],
            index: 0,
            arrayItem: '我不想买了',//理由
            display: 'none',
            totalSalePrice: 0,
            totalPrice: 0,
            ordProducts: [],
            ordRefunds: '',
            userName: '',
            telNumber: '',
            address: '',
            status: '',
            id: '',
            acceptStation: '',
            acceptTime: '',
            createDate: '',
            time: '',
            RefundStatue: '',
            type: 0,
            payScorePrice: 0
        }
    },
    onLoad(options) {
        if (options.type) {
            this.type = options.type
        } else {
            this.type = '0';
        }
        var that = this;
        var ordProducts = [];
        //if(this.type != 0){//拼团订单
        if (options.type == "1") {//拼团订单
            var logistics = []
            wx.request({
                url: that.$root.apiServer + that.$root.appid + '/basic/fgroup/applet/OrdDetail?ordId=' + options.ordId,
                method: 'POST',
                header: { 'Content-Type': 'application/json' },
                success(res) {
                    if (res.data.success == true) {
                        var data = res.data.obj.ord.obj;
                        var shop = res.data.obj.shop;
                        that.status = data.status;//状态
                        that.id = data.id;
                        that.code = data.code;//订单编号
                        that.totalPrice = data.totalPrice;
                        that.totalSalePrice = data.totalPrice;

                        that.userName = data.userName;
                        that.telNumber = data.userPhone;
                        // 物流
                        
			            wx.request({
			                url: that.$root.apiServer + that.$root.appid + '/basic/api/ord/ordTrack',
			                method: 'POST',
			                data:{
			                	token: getApp().globalData.token,
			                	ordId:options.ordId
			                },
			                header: {
			                	'Content-Type': 'application/x-www-form-urlencoded' 
			                },
			                success(res) {
			                	logistics = res.data.data.Traces
			                	if (logistics && logistics.length) {
			                      that.acceptStation = logistics[0].AcceptStation
			                      that.acceptTime = logistics[0].AcceptTime  
			                    }else {
			                      that.acceptStation = "暂无物流信息"
				                 }
			
			                }
			            }) 
                        that.address = data.userAddress;
                        if (data.refundStatue == 1) {
                            that.RefundStatue = '等待退款'
                        } else if (data.refundStatue == 2) {
                            that.RefundStatue = '退款失败'
                        } else if (data.refundStatue == 3) {
                            that.RefundStatue = '退款成功'
                        } else {
                            that.RefundStatue = ''
                        }
                        var product = {};
                        product.thumbnailUrl = getApp().globalData.imgUrl + shop.titlePic;
                        product.productSkuSpec = data.shopType;
                        product.productName = shop.name;
                        product.salePrice = data.totalPrice;
                        product.buyNum = data.productCount;
                        ordProducts.push(product);
                        that.ordProducts = ordProducts;
                    }
                }
            })
    
        } else {//原来接口
            var score = 0
            var logistics = []
            wx.request({
                url: that.$root.apiServer + that.$root.appid + '/basic/api/ord/ordDetail',
                data: {
                    token: getApp().globalData.token,
                    ordId: options.ordId
                },
                method: 'POST',
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success(res) {
                    let data = res.data.data
                    that.createDate = res.data.data.createDate
                    that.time = that.changeTime(util.dateFormat(that.createDate) + 3 * 24 * 60 * 60 * 1000 - new Date().getTime())
                    that.code = data.code
                    that.totalSalePrice = data.totalSalePrice
                    that.totalPrice = data.totalPrice
                    that.ordProducts = data.ordProducts
                    that.payScorePrice = data.payScorePrice
                    if (data.userAddress) {
                        that.userName = data.userAddress.name
                        that.telNumber = data.userAddress.phone
                        that.address = data.userAddress.province + data.userAddress.city + data.userAddress.district + data.userAddress.street
                    }
                    that.status = data.status//状态
                    that.id = data.id
                    for (var i = 0; i < data.ordRefunds.length; i++) {
                        score += data.ordRefunds[i].amount
                    }
                    that.ordRefunds = score
//                  logistics = JSON.parse(data.shipDeliveryInfo)
//                  if (logistics && logistics.Traces && logistics.Traces.length) {
//                      that.acceptStation = logistics.Traces[logistics.Traces.length - 1].AcceptStation
//                      that.acceptTime = logistics.Traces[logistics.Traces.length - 1].AcceptTime
//                  } else {
//                      that.acceptStation = "暂无物流信息"
//                  }
                }
            })
            
            wx.request({
                url: that.$root.apiServer + that.$root.appid + '/basic/api/ord/ordTrack',
                method: 'POST',
                data:{
                	token: getApp().globalData.token,
			        ordId:options.ordId
			     },
                header: {
                	'Content-Type': 'application/x-www-form-urlencoded' 
                },
                success(res) {
                	if (res.data.code !== "500") {
                	logistics = res.data.data.Traces
                	if (logistics && logistics.length) {
                      that.acceptStation = logistics[0].AcceptStation
                      that.acceptTime = logistics[0].AcceptTime  
                    }else {
                      that.acceptStation = "暂无物流信息"
	                 }
                   }else{
                   	that.acceptStation = "暂无物流信息"
                   }

                }
            })            
            
            
        }


    },
    methods: {
        changeTime(times) {
            //时间转换
            var timestamp = 1000 * 60
            var hour = timestamp * 60
            var day = hour * 24
            var month = day * 30
            if (times < timestamp) //一分钟内							
                return "剩1分钟自动关闭"
            else if (times < hour)
                return '剩' + parseInt(times / timestamp) + "分钟自动关闭"
            else if (times < day)
                return '剩' + parseInt(times / hour) + "小时自动关闭"
            else if (times < month)
                return '剩' + parseInt(times / day) + "天自动关闭"
        },
        log(id) {//跳转物流页  
            if (this.type == '0') {//原来普通
                wx.navigateTo({
                    url: '../orderFlow/orderFlow?id=' + id + '&type=' + this.type,
                })
            } else {//拼团
                wx.navigateTo({
                    url: '../orderFlow/orderFlow?id=' + id + '&type=' + this.type,
                })
            }
        },
        //支付订单
        pay(id, totalPrice) {
            var that = this;
            if (this.type == "1") {//拼团
                //支付接口
                wx.request({
                    url: that.$root.apiServer + that.$root.appid + '/basic/fgroup/applet/pay?notifyUrl=' + that.$root.apiServer + that.$root.appid + '/basic/fgroup/applet/wxPayNotify&id=' + id + '&totalPrice=' + totalPrice + '&ordCode=' + that.code + '&openid=' + getApp().globalData.openid,
                    method: 'POST',
                    header: { 'content-type': 'application/json' },
                    success: function(res) {
                        var datas = res.data.obj
                        wx.requestPayment({
                            'timeStamp': datas.timeStamp,
                            'nonceStr': datas.nonceStr,
                            'package': datas.package,
                            'signType': 'MD5',
                            'paySign': datas.paySign,
                            'success': function(res) {
                                wx.request({
                                    url: that.$root.apiServer + that.$root.appid + '/basic/fgroup/applet/updateOrd?id=' + id + '&pay_wx_serial_number=' + that.code + "&packages=" + datas.package,
                                    method: 'POST',
                                    header: { 'content-type': 'application/json' },
                                    success: function(res) {
                                        var options = {
                                            type: 1,
                                            ordId: that.id
                                        }
                                        that.onLoad(options)
                                    }
                                })
                            }
                        })
                    }
                })
            } else {//原来
                var servsers = getApp().globalData.servsers
                var that = this
                wx.navigateTo({
                    url: '../membershipCardPay/membershipCardPay?id=' + id + "&price=" + totalPrice + "&isType=0"
                })
            }
        },
        bindChange(e) {
            var val = e.detail.value
            this.arrayItem = this.array[val]
            this.comp(this.id)
        },
        comp(id) {
            var servsers = getApp().globalData.servsers
            var that = this
            wx.request({
                url: that.$root.apiServer + that.$root.appid + '/basic/api/ord/cancelOrd',
                data: {
                    token: getApp().globalData.token,
                    ordId: id,
                    msg: that.arrayItem
                },
                method: 'POST',
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success(res) {
                    if (res.data.code == "100") {
                        wx.navigateBack({
                            delta: 1
                        })
                    }
                }
            })
        },
        //确认收货
        confirm(id) {
            var that = this
            if (this.type == "1") {//拼团
                wx.showModal({
                    title: '提示',
                    content: '是否确认收货',
                    success(res) {
                        if (res.confirm) {
                            wx.request({
                                url: that.$root.apiServer + that.$root.appid + '/basic/fgroup/applet/updateOrdStatus?ordId=' + id + '&status=4',
                                method: 'POST',
                                header: { 'content-type': 'application/json' },
                                success: function(res) {
                                    if (res.data.success) {
                                        var options = {
                                            ordId: id,
                                            type: 1
                                        }
                                        that.onLoad(options)
                                    } else {
                                        wx.showModal({
                                            title: '提示',
                                            content: '确认订单失败',
                                            showCancel: false
                                        })
                                    }
                                }
                            })
                        } else if (res.cancel) {
                        }
                    }
                })
            } else {//原来
                wx.showModal({
                    title: '提示',
                    content: '是否确认订单',
                    success(res) {
                        if (res.confirm) {
                            wx.request({
                                url: that.$root.apiServer + that.$root.appid + '/basic/api/ord/confirmOrd',
                                data: {
                                    token: getApp().globalData.token,
                                    ordId: id
                                },
                                method: 'POST',
                                header: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                },
                                success(res) {
                                    if (res.data.code == "100") {
                                        wx.navigateBack({
                                            delta: 1
                                        })
                                    }

                                }
                            })
                        } else if (res.cancel) {
                        }
                    }
                })
            }
        },
        //删除订单
        del(id) {
            var that = this
            wx.showModal({
                title: '提示',
                content: '是否删除订单',
                success(res) {
                    if (res.confirm) {
                        wx.request({
                            url: that.$root.apiServer + that.$root.appid + '/basic/api/ord/deleteOrd',
                            data: {
                                token: getApp().globalData.token,
                                ordId: id
                            },
                            method: 'POST',
                            header: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            success(res) {
                                if (res.data.code == "100") {
                                    wx.navigateBack({
                                        delta: 1
                                    })
                                }
                            }
                        })
                    } else if (res.cancel) {
                    }
                }
            })
        },
        phone() {
            var app = this.$root
            var that = this
            this.version = app.globalData.appName
            wx.request({
                url: that.$root.apiServer + that.$root.appid + '/basic/api/dic/findDicByCode',
                data: {
                    code: 'kf'
                },
                method: 'GET',
                header: {
                    'content-type': 'application/json'
                },
                success(res) {
                    if (res.data.code == '100') {
                        if (res.data.data.v) {
                            wx.makePhoneCall({
                                phoneNumber: res.data.data.v
                            })
                        } else {
                            wx.showModal({
                                title: '提示',
                                content: '请输入商家电话'
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
page {
    background: #f9f9f9;
}

.page {
    background: #f9f9f9;
    padding-bottom: 140rpx
}

.contant {
    width: 100%;
    height: 230rpx;
    color: #ffffff;
    font-size: 28rpx;
    position: relative
}

.cont-pay {
    padding-top: 80rpx;
    margin-left: 80rpx;
}

.cont-pay .cont-pay-view {
    margin-bottom: 10rpx;
}

.cont-img {
    position: absolute;
    top: 70rpx;
    right: 70rpx;
}

.cont-img .cont-img-image {
    width: 120rpx;
    height: 88rpx;
}


.cont-back {
    background: #fff
}

.cant-log {
    border-bottom: #e3e3e3 1rpx solid;
}

.cant-msg {
    font-size: 24rpx;
    margin-left: 20rpx;
    padding: 20rpx 0;
    width: 600rpx;
    color: #ff3e78;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
}

.acceptTime {
    margin-top: 20rpx;
    color: #666;
}

.cant-addr {
    height: 160rpx;
}

.cant-addr .cant-addr-image {
    width: 42rpx;
    height: 31rpx;
    margin-top: 60rpx
}

.cant-names {
    height: 100rpx;
}

.infoIco .infoIco-image {
    width: 26rpx;
    height: 36rpx;
    margin-top: 36rpx;
}

.infotext {
    line-height: 40rpx;
    margin-top: 10rpx;
    margin-left: 20rpx;
    font-size: 28rpx;
}

.tel {
    margin-left: 20rpx;
}

.site {
    color: #999999;
    font-size: 24rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 570rpx;
}

.cant-border {
    border-bottom: 1rpx solid #e3e3e3;
    margin-top: 20rpx;
}

.cant-name {
    font-size: 28rpx;
    line-height: 70rpx;
}

.cant-name .cant-name-image,
.cant-name .cant-name-text {
    float: left
}

.cant-name .cant-name-image {
    width: 32rpx;
    height: 30rpx;
    margin-top: 20rpx;
    margin-right: 10rpx;
}

.good-cant {
    margin-top: 20rpx;
    padding-bottom: 20rpx;
}

.goods-img,
.goods-text {
    float: left;
    margin-right: 20rpx
}

.goods-img .goods-img-image {
    width: 140rpx;
    height: 140rpx;
}

.goods-no {
    float: left;
    width: 138rpx;
    height: 138rpx;
    border: solid 2rpx #e3e3e3;
    margin-right: 20rpx
}

.goods-text {
    font-size: 24rpx;
}

.goods-name {
    margin-top: 14rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 470rpx;
}

.goods-norms {
    margin-top: 18rpx;
    color: #999
}

.goods-price {
    margin-top: 14rpx;
    font-size: 20rpx;
}

.goods-price text {
    font-size: 28rpx;
}


.cont-prod {
    font-size: 24rpx;
    line-height: 50rpx;
    color: #999999
}

.cant-nub {
    height: 60rpx;
    line-height: 60rpx;
}

.orderBtn {
    height: 100rpx;
    width: 750rpx;
    background: #ffffff;
    position: fixed;
    bottom: 0
}

.orderBtn .btn {
    float: right;
    margin-right: 20rpx;
    width: 168rpx;
    height: 56rpx;
    border-radius: 4rpx;
    font-size: 26rpx;
    margin-top: 20rpx;
    text-align: center;
    line-height: 60rpx;
}

.block {
    display: block
}

.none {
    display: none
}

.picker-box {
    position: fixed;
    width: 750rpx;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5)
}

.picker-top {
    position: fixed;
    width: 720rpx;
    bottom: 500rpx;
    background: #f5f5f5;
    height: 100rpx;
    padding-left: 15rpx;
    padding-right: 15rpx;
    line-height: 100rpx;
}

.picker {
    width: 100%;
    height: 500rpx;
    position: fixed;
    bottom: 0;
    background: white;
    text-align: center
}
</style>