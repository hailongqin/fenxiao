<template>
    <view class="container">
        <view class="content">
            <view class="bar"></view>
            <view class="top">
                <view class="to-pay" wx:if="{{(shippingWay != 2 || shippingWay == null) && ordState == 0 && payState == 0 && flag}}">
                    <view class="t" wx:if="{{ordType}}">待支付：{{((totalAmount*100)-(bargainAmount*100)) / 100}}元</view>
                    <view class="t" wx:else >{{totalAmount}}元   </view> 
                    <view class="m">请在{{clock}}内完成支付</view>
                    <view class="b">
                        <view class="cancel" @tap="toCancel(id)">取消订单</view>
                        <view class="pay" @tap="toPay(ordNo)">立即支付</view>
                    </view>
                </view>
                <view class="to-pay" wx:if="{{shippingWay == 2 && ordState == 0 && payState == 0 && flag}}">
                    <view class="t">待支付：{{totalAmount}}元(自提)</view>
                    <view class="m">请在{{clock}}内完成支付</view>
                    <view class="b">
                        <view class="cancel" @tap="toCancel(id)">取消订单</view>
                        <view class="pay" @tap="toPay(ordNo)">立即支付</view>
                    </view>
                </view>
                <view class="to-deliver" wx:if="{{(shippingWay == 1 || shippingWay == null) && ordState == 1 && payState == 1 && flag}}">
                    <view class="status">待发货</view>
                    <view class="b">
                        <!--<view class="item cancel" @tap="toCancel(id)">取消订单</view>-->
                        <view class="item refunds" @tap="toRefunds(ordNo)">退款</view>
                    </view>
                </view>
                <view class="to-deliver" wx:if="{{shippingWay == 2 && ordState == 1 && payState == 1 && flag}}">
                    <view class="status">待发货(自提)</view>
                    <view class="b">
                        <!--<view class="item cancel" @tap="toCancel(id)">取消订单</view>-->
                        <view class="item refunds" @tap="toRefunds(ordNo)">退款</view>
                    </view>
                </view>
                <view class="to-deliver" wx:if="{{shippingWay == 3 && ordState == 1 && payState == 1 && flag}}">
                    <view class="status">待发货(商配)</view>
                    <view class="b">
                        <!--<view class="item cancel" @tap="toCancel(id)">取消订单</view>-->
                        <view class="item refunds" @tap="toRefunds(ordNo)">退款</view>
                    </view>
                </view>
                <view class="send" wx:if="{{(shippingWay == 1 || shippingWay == null) && ordState == 2 && payState == 1 && flag}}">
                    <view class="status">已发货</view>
                    <view class="b">
                        <view class="item logistics" @tap="toFlow(expressId)">查看物流</view>
                        <view class="item refunds" @tap="toRefunds(ordNo)">退款</view>
                        <view class="item1 confirm" @tap="toConfirm(ordNo)">确认收货</view>
                    </view>
                </view>
                <view class="send" wx:if="{{shippingWay == 2 && ordState == 2 && payState == 1 && flag}}">
                    <view class="status">已发货(自提)</view>
                    <view class="b">
                        <view class="item refunds" @tap="toRefunds(ordNo)">退款</view>
                        <view class="item1 confirm" @tap="toConfirm(ordNo)">确认收货</view>
                    </view>
                </view>
                <view class="send" wx:if="{{shippingWay == 3 && ordState == 2 && payState == 1 && flag}}">
                    <view class="status">已发货(商配)</view>
                    <view class="b">
                        <view class="item refunds" @tap="toRefunds(ordNo)">退款</view>
                        <view class="item1 confirm" @tap="toConfirm(ordNo)">确认收货</view>
                    </view>
                </view>
                <view class="complete" wx:if="{{(shippingWay == 1 || shippingWay == null) && ordState == 4 && payState == 1 && flag}}">
                    <view class="status">已完成</view>
                    <view class="b">
                        <view class="item cancel" @tap="toDelete(id)">删除订单</view>
                        <view class="item refunds" @tap="toFlow(expressId)">查看物流</view>
                    </view>
                </view>
                <view class="complete" wx:if="{{shippingWay == 2 && ordState == 4 && payState == 1 && flag}}">
                    <view class="status">已完成(自提)</view>
                    <view class="b">
                        <view class="item cancel" @tap="toDelete(id)">删除订单</view>
                    </view>
                </view>
                <view class="complete" wx:if="{{shippingWay == 3 && ordState == 4 && payState == 1 && flag}}">
                    <view class="status">已完成(商配)</view>
                    <view class="b">
                        <view class="item cancel" @tap="toDelete(id)">删除订单</view>
                    </view>
                </view>

                <view class="after-sales close" wx:if="{{(shippingWay != 2 || shippingWay == null) && ordState == 5 && payState == 0 && flag}}">
                    <view class="status">已关闭</view>
                    <view class="b">
                        <view class="item cancel" @tap="toDelete(id)">删除订单</view>
                    </view>
                </view>
                <view class="after-sales close" wx:if="{{shippingWay == 2 && ordState == 5 && payState == 0 && flag}}">
                    <view class="status">已关闭(自提)</view>
                    <view class="b">
                        <view class="item cancel" @tap="toDelete(id)">删除订单</view>
                    </view>
                </view>
                <view class="after-sales refunds" wx:if="{{(shippingWay != 2 || shippingWay == null) && ordState == 6 && refundState == 5 && payState == 1 && flag}}">
                    <view class="status">退款成功</view>
                    <view class="b">
                        <view class="item cancel" @tap="toDelete(id)">删除订单</view>
                    </view>
                </view>
                <view class="after-sales refunds" wx:if="{{shippingWay == 2 && ordState == 6 && refundState == 5 && payState == 1 && flag}}">
                    <view class="status">退款成功(自提)</view>
                    <view class="b">
                        <view class="item cancel" @tap="toDelete(id)">删除订单</view>
                    </view>
                </view>
                <view class="after-sales refunds" wx:if="{{(shippingWay != 2 || shippingWay == null) && refundState == 1 && ordState == 3 && payState == 1 && flag}}">
                    <view class="status">退款申请中</view>
                    <view class="b">
                        <!-- <view class="item cancel" @tap="toDelete(id)">删除订单</view> -->
                    </view>
                </view>
                <view class="after-sales refunds" wx:if="{{shippingWay == 2 && refundState == 1 && ordState == 3 && payState == 1 && flag}}">
                    <view class="status">退款申请中(自提)</view>
                    <view class="b">
                        <!-- <view class="item cancel" @tap="toDelete(id)">删除订单</view> -->
                    </view>
                </view>
                <view class="after-sales refunds" wx:if="{{(shippingWay != 2 || shippingWay == null) && (refundState == 3 && ordState == 3 && payState == 1 && flag) || (refundState == 6 && ordState == 3 && payState == 1 && flag)}}">
                    <view class="status">退款失败</view>
                    <view class="b">
                        <view class="item cancel" @tap="toDelete(id)">删除订单</view>
                    </view>
                </view>
                <view class="after-sales refunds" wx:if="{{shippingWay == 2 && (refundState == 3 && ordState == 3 && payState == 1 && flag) || (refundState == 6 && ordState == 3 && payState == 1 && flag)}}">
                    <view class="status">退款失败(自提)</view>
                    <view class="b">
                        <view class="item cancel" @tap="toDelete(id)">删除订单</view>
                    </view>
                </view>
            </view>
            <view class="address">
                <view class="has-address" wx:if="{{realName && (shippingWay != 2 || shippingWay == null) && flag}}">
                    <image class="address-img" src="http://image.vdongchina.com/M00/06/10/ZSUkmVoXtIGEIwJSAAAAAN0vt8A367.png"></image>
                    <view class="txt">
                        <view class="txt-top">
                            <view class="left"  style="color: #999;">收货人：<view  style="color: #222;" class="name">{{realName}}</view></view>
                            <view class="right">{{mobile}}</view>
                        </view>
                        <view class="txt-bottom" style="color: #999;">收货地址:{{address}}</view>
                    </view>
                    <!--<image class="img" src="http://image.vdongchina.com/M00/06/10/ZSUkmVoXtlyEJpXrAAAAAGJ4S4M326.png"></image>-->
                </view>       
                <view class="has-address" wx:if="{{shippingWay == 2 && flag}}">
                    <image class="address-img" src="http://image.vdongchina.com/M00/06/10/ZSUkmVoXtIGEIwJSAAAAAN0vt8A367.png"></image>
                    <view class="txt">
                        <view class="txt-top">
                            <view class="left">联系电话：<view class="name">{{mobile}}</view></view>
                            <view class="right"></view>
                        </view>
                        <view class="txt-bottom">自提地址:{{address}}</view>
                    </view>
                    <image class="img" src=""></image>
                </view>          
                <view class="no-address" @tap="getAddress" wx:if="{{!realName && (shippingWay != 2 || shippingWay == null) && flag}}">
                    <image class="wechat" src="http://image.vdongchina.com/M00/06/13/ZSUkmVoXvsOED_QFAAAAAPC1bZo087.png"></image>
                    <view class="txt">一键获取微信地址</view>
                    <image class="img" src="http://image.vdongchina.com/M00/06/10/ZSUkmVoXtlyEJpXrAAAAAGJ4S4M326.png"></image>
                </view>
            </view>
            <view class="shop-name">
                <view class="name">{{shopName}}</view>
            </view>
            <view class="f_goods">
                <view class="goodsdetail" wx:for="{{itemList}}" @tap="toDetails(item.snapshotEntity.product.id)">
                    <image class="img" src="{{item.snapshotEntity.product.imageList[0].url}}"></image>
                    <view class="txt">
                        <view class="txt-top">
                            <view class="left">{{item.snapshotEntity.product.name}}</view>
                            <view class="right">
                                <view class="t">￥{{item.presentPrice}}</view>
                            </view>
                        </view>
                        <view class="txt-bottom">
                            <view class="left">
                                <view class="l_size" wx:for="{{item.snapshotEntity.salePropertyList}}" wx:for-item="itemBox">
                                    {{itemBox.salePropertyName}} 
                                </view>      	
                            </view>
                            <view class="right">x{{item.quantity}}</view>
                        </view>
                    </view>
                </view>
            </view>
            
            <view class="detail">
                <view class="item">
                    <view class="l">订单总价：</view>
                    <view class="r">￥{{prePrice}}</view>
                </view>
                <view class="item">
                    <view class="l">快递运费：</view>
                    <view class="r">￥{{flowFees}}</view>
                </view>
                <view class="item" wx:if="{{discountNum != 0}}">
                    <view class="l">代金券：</view>
                    <view class="r">-￥{{discountNum}}</view>
                </view>
                <view class="item" wx:if="{{discountNum != 0}}">
                    <view class="l">积分抵用：</view>
                    <view class="r">-￥{{discountNum}}</view>
                </view>

                <!-- ordType == 1 砍价订单-->
                <view class="f_need_pay"  wx:if="{{ordType}}"> 
                    <view class="l">实付款{{payMethod}}</view>
                    <view class="r">¥ {{((totalAmount*100)-(bargainAmount*100)) / 100}}</view>
                </view>
                <!-- ordType == 1 分销订单  -->
                <view class="f_need_pay" wx:else>
                    <view class="l">实付款{{payMethod}}</view>
                    <view class="r">¥{{totalAmount}}</view>
                </view>
            </view>
            
            <view class="order-detail">
                <view class="item code">订单编号：{{ordNo}}</view>
                <view class="item order-time">下单时间：{{createTime}}</view>
                <view class="item pay-time" wx:if="{{payTime != ''}}">付款时间：{{payTime}}</view>
                <view class="item send-time"  wx:if="{{(ordState == 4 && shippingWay != 2) || (ordState == 2 && shippingWay != 2)}}">发货时间：{{deliveryTime}}</view>
                <view class="item complete-time" wx:if="{{ordState == 4 && updateTime}}">完成时间：{{updateTime}}</view>
                <view class="item close-time"  wx:if="{{ordState == 5 && updateTime}}">关闭时间：{{updateTime}}</view>
                <view class="item refunds-succeed" wx:if="{{ordState == 6 && refundState == 5 && updateTime}}">退款成功：{{updateTime}}</view>
                <view class="item msg">买家留言：{{buyMsg}}</view>
            </view>
        </view> 
        <view class="kefu" @tap="makeCall(telNum)">
            <image class="img" src="http://image.vdongchina.com/M00/06/11/ZSUkmVoXuOGEYr5MAAAAAMtXkVA208.png"></image>
        </view>
    </view>
</template>

<script>
const util = require('../../utils/util.js')
export default {
    config: {
        "navigationBarTitleText": "订单详情",
        "navigationBarBackgroundColor":"#262833",
        "navigationBarTextStyle":"white"
    },
    data () {
        return {
            flag:0,     
            payState:'',
            ordState:'',
            shippingWay:'',
            refundState:'',
            buyMsg:'',
            totalAmount:'',
            realName:'',
            mobile:'',
            address:'',
            itemList:[],
            createTime:'',
            updateTime:'',
            deliveryTime:'',
            id:'',
            ordNo:'',
            clock: 0,
            buyLimitTime: 0,
			totalms: '',
            phoneNum:"1234567",
            shopName:'',
            telNum:'',
            payTime:'',
            createTimeStamp:'',
            discountNum:0,
            expressId:'',
            flowFees:0,//运费
            prePrice:'',//优惠前价格
            ordType:0,
            bargainAmount:0,
            payMethod: ''//获取支付方式，1、余额支付；2、微信支付
        }
    },
    // onLoad(e){
    // 	this.id = e.orderId
    	
    // },
    onLoad(e){
        this.id = e.ordId.toString()
        var that = this
        wx.request({
           url:that.$root.apiServer + that.$root.appid + that.$root.variate + '/basic/client/distribution/order/detail/'+that.id,
	       data:{
	       		token: that.$root.globalData.token,
	       		id:that.id,
	       		pid:that.$root.globalData.pid
	       },           	   
           method:"GET",
           header: {
               'content-type': 'application/x-www-form-urlencoded'
           },
           success: function(res) {
           		if(res.data.code =="200"){
                    console.log(res)
                    that.payState = res.data.object.payState//支付状态
                    that.ordState = res.data.object.ordState//订单状态
                    that.shippingWay = res.data.object.shippingWay//自提或商家配送
                    that.refundState = res.data.object.refundState//退款状态

                    //订单ordno
                    if(res.data.object.ordno){
                        that.ordNo = res.data.object.ordno
                    }

                    //砍价所需字段
                    if(res.data.object.ordType){
                        that.ordType = res.data.object.ordType
                    }
                    if(res.data.object.bargainAmount){
                        that.bargainAmount = res.data.object.bargainAmount
                    }

                    //付款时间
                    if(res.data.object.payTime){
                        that.payTime = res.data.object.payTime
                    }else{
                        that.payTime = ''
                    }

                    //买家留言
                    if(res.data.object.remark){
                        that.buyMsg = res.data.object.remark
                    }else{
                        that.buyMsg = ''
                    }
                    if(res.data.object.totalAmount){
                        that.totalAmount = res.data.object.totalAmount
                        that.prePrice = res.data.object.totalAmount
                        // 判断是否有代金券
                        if(res.data.object.couponAmount){
                            that.discountNum = res.data.object.couponAmount
                            if(that.totalAmount - that.discountNum > 0){
                                that.totalAmount = that.totalAmount - that.discountNum
                            }else{
                                that.totalAmount = 0
                            }
                        }
                    }


                    // 判断是否有收件人信息
                    if(res.data.object.realName || res.data.object.address){
                        that.realName = res.data.object.realName
                        that.mobile = res.data.object.mobile
                        that.address = res.data.object.address
                        // 判断是否有运费
                        if(res.data.object.shipPrice){
                            that.flowFees = parseFloat(res.data.object.shipPrice)
                            // that.totalAmount = that.totalAmount + that.flowFees
                        }else{
                            that.flowFees = parseFloat(0)
                        }
                    }else{
                        that.realName = ''
                    }

                    // 获取订单商品列表
                    if(res.data.object.itemList){
                        that.itemList=res.data.object.itemList
                    }else{
                        wx.showLoading({
                            title: '商品获取失败',
                            icon: 'loading',
                            duration: 2000,
                            mask:true
                        })
                    }

                    // 下单时间
                    if(res.data.object.createTime){
                        that.createTime = res.data.object.createTime 
                    }
                    
                    // 完成时间
                    if(res.data.object.updateTime){
                        that.updateTime = res.data.object.updateTime 
                    }else{
                        that.updateTime = ''
                    }

                    // 倒计时
                    if(res.data.object.createTime && res.data.object.createTimeStamp){
                        that.createTime = res.data.object.createTime//下单时间日期格式
                        that.createTimeStamp = res.data.object.createTimeStamp//下单时间戳
                        var serviceTime = res.data.object.serviceTime//服务器时间
                        var nowTime = serviceTime;//当前时间的时间戳
                        that.buyLimitTime = that.createTimeStamp + 86400000;//下单时间的时间戳
                        that.totalms = that.buyLimitTime - nowTime//24h倒计时的剩余时间
                        if(that.payState == 0){
                            if(that.totalms>0){
                                // console.log(that.createTimeStamp,that.buyLimitTime,that.totalms)
                                that.countDown() 
                            }                    	
                        }
                    }
                    
                    //获取客服电话
                    if(res.data.object.consumServiceMobile){
                        that.telNum = res.data.object.consumServiceMobile
                    }

                    //店铺名称
                    if(res.data.object.dUserShop){
                        that.shopName = res.data.object.dUserShop.shopName
                    }else{
                        that.shopName = "总店"
                    }
                
                    //是否有物流
                    if(res.data.object.express){
                        //查询发货时间
                        if(res.data.object.express.deliveryTime){
                            that.deliveryTime = res.data.object.express.deliveryTime
                        }
                    }	
                    // 获取查询物流的id
                    if(res.data.object.expressId){
                        that.expressId = res.data.object.expressId
                    }
                    //获取支付方式
                    if (res.data.object.payment) {
                        if (res.data.object.payment == 2) {
                            that.payMethod = '(余额支付)'
                        } else {
                            that.payMethod = '(微信支付)'
                        }
                    }
                    that.flag = 1//接口数据调取完全将订单状态栏置为显示状态
           		}else{
                    wx.showLoading({
                        title: '数据加载失败',
                        icon: 'loading',
                        duration: 2000,
                        mask:true
                    })
                }

           }
       })
    },
    methods:{
        makeCall(tel) {
            if(tel){
                wx.makePhoneCall({
                    phoneNumber: tel
                })
            }else{
                wx.showLoading({
                    title: '客服开小差啦',
                    icon: 'loading',
                    duration: 2000,
                    mask:true
                })
            }
        },
		countDown() {
            // 渲染倒计时时钟
			var clock = this.date_format(this.totalms)
            this.clock = clock
            if(this.payState == 0){
            	if(this.totalms > 0) {
                    setTimeout(() => {
                        // 放在最后--
                        this.totalms = this.buyLimitTime - new Date().getTime()
                        this.countDown()
                    }, 1000)
	            }
//          	else{
//	                var that = this
//	                wx.request({
//	                    url: that.$root.apiServer + that.$root.appid + that.$root.variate + '/basic/client/distribution/order/cancel/' + that.id,
//	                    data: {
//	                        token: that.$root.globalData.token,
//	                        pid:that.$root.globalData.pid
//	                    },
//	                    method: "GET",
//	                    header: {
//	                        'content-type': 'application/x-www-form-urlencoded'
//	                    },
//	                    success: function(res) {
//	                        wx.navigateTo({
//	                            url: '../f_orderdetail/f_orderdetail?orderId='+that.id
//	                        });
//	                    }
//	                })
//	            }
            }
            
		},
        // 时间格式化输出，如03:25:19 86。每10ms都会调用一次
        date_format(micro) {
            micro = micro || 1
            // 秒数
            var second = Math.floor(micro / 1000);
            // 小时位
            var hr = Math.floor(second / 3600);
            // 分钟位
            var min = this.fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
            // 秒位
            var sec = this.fill_zero_prefix((second - hr * 3600 - min * 60)); // equal to => var sec = second % 60;

            if(hr) {
                return hr + "小时" + min + "分" + sec + "秒";
            } else {
                return min + "分" + sec + "秒"
            }
        },
        // 位数不足补零
        fill_zero_prefix(num) {
            return num < 10 ? "0" + num : num
        },
        //确认收货
        toConfirm(id){
            var that = this
            wx.showModal({
                title: '提示',
                content: '你确定要确认收货吗？',
                success: function(res) {
                    if (res.confirm) {
                        // console.log('用户点击确定')
                        //确认收货
                        wx.request({
                            url: that.$root.apiServer + that.$root.appid + that.$root.variate + '/basic/client/distribution/order/confirmReceipt/' + id,
                            data: {
                                token: that.$root.globalData.token,
                                pid:that.$root.globalData.pid
                            },
                            method: "GET",
                            header: {
                                'content-type': 'application/x-www-form-urlencoded'
                            },
                            success: function(res) {
                                if(res.data.code == "200"){
                                    wx.showToast({
                                        title: '订单已完成',
                                        icon: 'success',
                                        mask:true,
                                        duration: 2000,
                                        success:function(){
                                            wx.navigateTo({
                                                url: '../f_order/f_order?type=1'
                                            });
                                        }
                                    })
                                }else{
                                    wx.showLoading({
                                        title: '确认收货失败',
                                        icon: 'loading',
                                        duration: 2000
                                    })
                                }
                            }
                        })
                    } else if (res.cancel) {
                        // console.log('用户点击取消')
                    }
                }
            })
        },
        //删除订单
        toDelete(id){
            var that = this
            wx.showModal({
                title: '提示',
                content: '你确定要删除订单吗？',
                success: function(res) {
                    if (res.confirm) {
                        // console.log('用户点击确定')
                        wx.request({
                            url: that.$root.apiServer + that.$root.appid + that.$root.variate + '/basic/client/distribution/order/delete/' + id,
                            data: {
                                token: that.$root.globalData.token,
                                pid:that.$root.globalData.pid
                            },
                            method: "GET",
                            header: {
                                'content-type': 'application/x-www-form-urlencoded'
                            },
                            success: function(res) {
                                if(res.data.code == "200"){
                                    wx.showToast({
                                        title: '删除订单成功',
                                        icon: 'success',
                                        mask:true,
                                        duration: 2000,
                                        success:function(){
                                            wx.navigateTo({
                                                url: '../f_order/f_order?type=1'
                                            });
                                        }
                                    })
                                }else{
                                    wx.showLoading({
                                        title: '删除订单失败',
                                        icon: 'loading',
                                        duration: 2000
                                    })
                                }
                            }
                        })
                    } else if (res.cancel) {
                        // console.log('用户点击取消')
                    }
                }
            })
        },
        // 查看物流
        toFlow(id){
            wx.navigateTo({
                url: '../f_orderflow/f_orderflow?expressId='+id
            });
        },
        // 申请退款
        toRefunds(id){
            var that = this
            wx.showModal({
                title: '提示',
                content: '确定要退款吗？',
                success: function(res) {
                    if (res.confirm) {
                        // console.log('用户点击确定')
                        //申请退款（订单已支付，已发货，未申请退款）
                        wx.request({
                            url: that.$root.apiServer + that.$root.appid + that.$root.variate + '/basic/client/distribution/order/refundApply/' + id,
                            data: {
                                token: that.$root.globalData.token,
                                pid:that.$root.globalData.pid
                            },
                            method: "GET",
                            header: {
                                'content-type': 'application/x-www-form-urlencoded'
                            },
                            success: function(res) {
                                if(res.data.code == "200"){
                                    wx.showToast({
                                        title: '退款申请已提交，等待卖家处理',
                                        icon: 'success',
                                        mask:true,
                                        duration: 2000,
                                        success:function(){
                                            wx.navigateTo({
                                                url: '../f_order/f_order?type=1'
                                            });
                                        }
                                    })
                                }else{
                                    wx.showLoading({
                                        title: '退款申请提交失败',
                                        icon: 'loading',
                                        duration: 2000
                                    })
                                }
                            }
                        })
                    } else if (res.cancel) {
                        // console.log('用户点击取消')
                    }
                }
            })
        },
        // 立即支付
        toPay(id){
        	wx.navigateTo({
                url: '../f_confirmorder/f_confirmorder?ordno='+id
            });
        },
        // 取消订单
        toCancel(id){
            var that = this
            //取消订单
            wx.showModal({
                title: '提示',
                content: '你确定要取消订单吗？',
                success: function(res) {
                    if (res.confirm) {
                        // console.log('用户点击确定')
                        wx.request({
                            url: that.$root.apiServer + that.$root.appid + that.$root.variate + '/basic/client/distribution/order/cancel/' + id,
                            data: {
                                token: that.$root.globalData.token,
                                pid:that.$root.globalData.pid
                            },
                            method: "GET",
                            header: {
                                'content-type': 'application/x-www-form-urlencoded'
                            },
                            success: function(res) {
                                if(res.data.code == "200"){
                                    wx.showToast({
                                        title: '取消订单成功',
                                        icon: 'success',
                                        mask:true,
                                        duration: 2000,
                                        success:function(){
                                            wx.navigateTo({
                                                url: '../f_order/f_order?type=1'
                                            });
                                        }
                                    })
                                }else{
                                    wx.showLoading({
                                        title: '取消订单失败',
                                        icon: 'loading',
                                        duration: 2000
                                    })
                                }
                            }
                        })
                    } else if (res.cancel) {
                        // console.log('用户点击取消')
                    }
                }
            })
        },
        getAddress(){
            var that = this
            // 获取用户收货地址            
            if(wx.chooseAddress) {
                wx.chooseAddress({
				  	success: function (res) {		
                          console.log(res)		  		
				        that.realName = res.userName
				        that.mobile = res.telNumber
				        that.address = res.provinceName + res.cityName + res.countyName + res.detailInfo
				   }                	                	
                })
            } else {
                // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
                wx.showModal({
                    title: '提示',
                    content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
                })
            }
        },
        toDetails(id) {
            wx.navigateTo({
                url: '../f_goodsdetail/f_goodsdetail?id='+id
            });
        }
    }
}
</script>

<style scoped>
page{
    height:100%;
}
.left{
    float:none;
}
.right{
    float:none;
}
.container{
    height:100%;
    width:100%;
}
.container .content{
    padding-bottom:20rpx;
    width:100%;
    position: relative;
    background: #f2f2f2;
}
.container .content .bar{
    height: 48rpx;
    width:100%;
    background: linear-gradient(to bottom,#262833,#363841);
}
.container .content .top{
    height: 192rpx;
    width:690rpx;
    position: absolute;
    top:0;
    left:30rpx;
    background: #fff;
    box-shadow: 0 4rpx 12rpx 0 rgba(0,0,0,0.1);
}
.container .content .top>.to-pay{
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.container .content .top .to-pay .t{
    height: 32rpx;
    line-height: 32rpx;
    text-align: center;
    font-size:32rpx;
    color:#333;
    margin:22rpx 0 12rpx;
    width:100%;
}
.container .content .top .to-pay .m{
    height: 24rpx;
    line-height: 24rpx;
    text-align: center;
    font-size:24rpx;
    color:#f88921;
    margin-bottom:28rpx;
}
.container .content .top .to-pay .b{
    height: 54rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}
.container .content .top .to-pay .b .cancel{
    height: 52rpx;
    width:150rpx;
    line-height: 54rpx;
    text-align: center;
    font-size:26rpx;
    color:#333;
    margin-right:60rpx;
    border-radius: 6rpx;
    border:1rpx solid #999;
}
.container .content .top .to-pay .b .pay{
    height: 54rpx;
    width:150rpx;
    line-height: 54rpx;
    text-align: center;
    font-size:26rpx;
    color:#fff;
    margin-right:20rpx;
    border-radius: 6rpx;
    background: #4e5059; 
}
.container .content .top .to-deliver{
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.container .content .top .to-deliver .status{
    font-size:48rpx;
    color:#333;
    margin:32rpx 0 38rpx;
    height: 48rpx;
    line-height: 48rpx;
    text-align: center;
}
.container .content .top .to-deliver .b{
    height: 54rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}
.container .content .top .to-deliver .b .item{
    height: 52rpx;
    width:150rpx;
    line-height: 54rpx;
    text-align: center;
    font-size:26rpx;
    color:#333;
    border-radius: 6rpx;
    border:1rpx solid #999;
}
.container .content .top .to-deliver .b .cancel{
    margin-right:60rpx;
}
.container .content .top .send{
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.container .content .top .send .status{
    font-size:48rpx;
    color:#11bd50;
    margin:32rpx 0 38rpx;
    height: 48rpx;
    line-height: 48rpx;
    text-align: center;
}
.container .content .top .send .b{
    height: 54rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}
.container .content .top .send .b .item{
    height: 52rpx;
    width:150rpx;
    line-height: 54rpx;
    text-align: center;
    font-size:26rpx;
    color:#333;
    border-radius: 6rpx;
    border:1rpx solid #999;
}
.container .content .top .send .b .item1{
    height: 54rpx;
    width:150rpx;
    line-height: 54rpx;
    text-align: center;
    font-size:26rpx;
    color:#fff;
    margin-right:20rpx;
    border-radius: 6rpx;
    background: #4e5059;
}
.container .content .top .send .b .logistics{
    margin-right:60rpx;
}
.container .content .top .send .b .refunds{
    margin-right:60rpx;
}
.container .content .top .complete{
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.container .content .top .complete .status{
    font-size:48rpx;
    color:#333;
    margin:32rpx 0 38rpx;
    height: 48rpx;
    line-height: 48rpx;
    text-align: center;
}
.container .content .top .complete .b{
    height: 54rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}
.container .content .top .complete .b .item{
    height: 52rpx;
    width:150rpx;
    line-height: 54rpx;
    text-align: center;
    font-size:26rpx;
    color:#333;
    border-radius: 6rpx;
    border:1rpx solid #999;
}
.container .content .top .complete .b .cancel{
    margin-right:60rpx;
}
.container .content .top .after-sales{
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.container .content .top .after-sales .status{
    font-size:48rpx;
    color:#333;
    margin:32rpx 0 38rpx;
    height: 48rpx;
    line-height: 48rpx;
    text-align: center;
}
.container .content .top .after-sales .b{
    height: 54rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}
.container .content .top .after-sales .b .item{
    height: 52rpx;
    width:150rpx;
    line-height: 54rpx;
    text-align: center;
    font-size:26rpx;
    color:#333;
    border-radius: 6rpx;
    border:1rpx solid #999;
}
.address{
    height:180rpx;
    margin-top:170rpx;
    margin-bottom:20rpx;
}
.address .no-address{
    height:180rpx;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.address .no-address .wechat{
    height: 48rpx;
    width:48rpx;
    margin:0 20rpx 0 30rpx;
    display: block;
}
.address .no-address .img{
    height: 48rpx;
    width:36rpx;
    margin-right:24rpx;
    display: block;
}
.address .no-address .txt{
    flex:1;
    font-size: 32rpx;
    height: 32rpx;
    line-height: 32rpx;
    color:#222;
}
.address .has-address{
    height:180rpx;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.address .has-address .address-img{
    height: 48rpx;
    width:30rpx;
    margin:0 21rpx 0 24rpx;
    display: block;
}
.address .has-address .txt{
    height:180rpx;
    flex:1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding-right: 30rpx;
}
.address .has-address .txt .txt-top{
    height: 32rpx;
    width:100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom:16rpx;
}
.address .has-address .txt .txt-top .left{
    height: 32rpx;
    line-height: 32rpx;
    font-size:32rpx;
    color:#222;
}
.address .has-address .txt .txt-top .left .name{
    display: inline-block;
}
.address .has-address .txt .txt-top .right{
    font-size:32rpx;
    color:#222;
    height: 32rpx;
    line-height: 32rpx;
}
.address .has-address .txt .txt-bottom{
    height: 64rpx;
    line-height: 32rpx;
    font-size:26rpx;
    color:#222;
    overflow:hidden;
    text-overflow: ellipsis;
    display:-webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient:vertical;
}
.address .has-address .img{
    height: 48rpx;
    width:36rpx;
    padding:0 24rpx 0 15rpx;
}

.container .content .shop-name{
    height: 88rpx;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: #fff;
}
.container .content .shop-name .name{
    height: 28rpx;
    line-height: 28rpx;
    font-size:28rpx;
    color:#333;
    margin-left:30rpx;
}
.f_goods{
    min-height:196rpx;
    background: #ffffff;
}
.container .content .goodsdetail{
    height: 190rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fafafa;
    margin-bottom:6rpx;
}
.container .content .goodsdetail:last-child{
    margin-bottom:0;
}
.container .content .goodsdetail .img{
    height: 150rpx;
    width:150rpx;
    margin:0 20rpx 0 30rpx;
}
.container .content .goodsdetail .txt{
    height:150rpx;
    flex:1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-right:30rpx;
}
.container .content .goodsdetail .txt .txt-top{
    height:64rpx;
    width:100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.container .content .goodsdetail .txt .txt-top .left{
    width:370rpx;
    height: 64rpx;
    line-height:32rpx;
    font-size:26rpx;
    color:#333;
    overflow:hidden;
    text-overflow: ellipsis;
    display:-webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient:vertical;
}
.container .content .goodsdetail .txt .txt-top .right{
    flex:1;
    display: flex;
    height:64rpx;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
}
.container .content .goodsdetail .txt .txt-top .right .t{
    height: 28rpx;
    line-height:28rpx;
    font-size: 28rpx;
    color:#333;
}
.container .content .goodsdetail .txt .txt-bottom{
    width:100%;
    height:24rpx;
    margin-bottom:10rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.container .goodsdetail .txt .txt-bottom .left{
    height: 24rpx;
}
.l_size{
	display: inline-block;
	font-size:24rpx;
    color:#999;
    height: 24rpx;
    line-height: 24rpx;
    margin-right:10rpx;
}
.container .content .goodsdetail .txt .txt-bottom .right{
    height: 24rpx;
    line-height: 24rpx;
    font-size:24rpx;
    color:#999;
}
.container .content .detail{
    min-height:106rpx;
    background: #fff;
    padding-top:30rpx;
}
.container .content .detail .item{
    height:28rpx;
    width:100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom:20rpx;
}
.container .content .detail .item:last-child{
    margin-bottom:30rpx;
}
.container .content .detail .item .l{
    font-size:28rpx;
    color:#999;
    height: 28rpx;
    line-height: 28rpx;
    margin-left:30rpx;
}
.container .content .detail .item .r{
    font-size:28rpx;
    color:#999;
    height: 28rpx;
    line-height: 28rpx;
    margin-right:30rpx;
}
.f_need_pay{
    height: 88rpx;
    background: #fff;
    border-top:1rpx solid #e5e5e5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom:20rpx;
    box-sizing: border-box;
}
.f_need_pay .l{
    height: 28rpx;
    line-height: 28rpx;
    font-size:28rpx;
    color:#333;
    margin-left:30rpx;
}
.f_need_pay .r{
    height: 28rpx;
    line-height: 28rpx;
    font-size:28rpx;
    color:#333;
    margin-right:30rpx;
}
.container .content .order-detail{
    min-height:58rpx;
    background: #fff;
    border-top:1rpx solid #e5e5e5;
    border-bottom:1rpx solid #e5e5e5;
    padding-top:30rpx;
}
.container .content .order-detail .item{
    margin-left:30rpx;
    margin-bottom:20rpx;
    height:28rpx;
    line-height: 28rpx;
    font-size:28rpx;
    color:#878787;
}
.container .content .order-detail .item:last-child{
    margin-bottom:30rpx;
}
.container .kefu{
    position: fixed;
    bottom:124rpx;
    right: 30rpx;
    height: 100rpx;
    width:100rpx;
    border-radius: 50%;
    box-shadow: 0 4rpx 12rpx 0 rgba(0,0,0,0.1);
}
.container .kefu .img{
    height:100%;
    width:100%;
    display: block;
}
</style>