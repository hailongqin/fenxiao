<template>
    <view class="page">
        <view class="pagetop"></view>
        <view class="groupList_nav">
            <view class="topLine"></view>
            <view class="{{item.navId == current?'on nav':'nav'}}" wx:for="{{nav}}" wx:key="nav" @tap="changeNav(item.navId)">
                <text class="text">{{item.navName}}</text>
            </view>
        </view>
        <view class="classname" wx:if="{{listNum > 0}}">
            <view class="cont-list" wx:for="{{items}}" wx:key="gg">
                <view class="cont-top">
                    <view class="auto clear cont-top" wx:if="{{current == 0}}">
                        <view class="left">订单编号:{{item.code}}</view>
                        <view class="right main-color" wx:if="{{item.status == 0}}">待支付</view>
                        <view class="right main-color" wx:if="{{item.status == 1}}">待发货</view>
                        <view class="right main-color" wx:if="{{item.status == 2}}">待确认</view>
                        <view class="right main-color" wx:if="{{item.status == 3}}">待评价</view>
                        <view class="right main-color" wx:if="{{item.status == 4}}">已完成</view>
                        <view class="right main-color" wx:if="{{item.status == 5}}">已关闭</view>
                    </view>
                    <view class="auto clear cont-top" wx:if="{{current == 1}}">
                        <view class="left">订单编号:{{item.code}}</view>
                        <view class="right main-color" wx:if="{{item.status == 0}}">待支付</view>
                        <view class="right main-color" wx:if="{{item.status == 1}}">待发货</view>
                        <view class="right main-color" wx:if="{{item.status == 2}}">待确认</view>
                        <!-- <view class="right main-color" wx:if="{{item.status == 3}}">已完成</view> -->
                        <view class="right main-color" wx:if="{{item.status == 4}}">已完成</view>
                        <view class="right main-color" wx:if="{{item.status == 5}}">已关闭</view>
                        <view class="right main-color" wx:if="{{item.status == 6}}">退款</view>
                    </view>
                </view>   
                <view class="good-cant" @tap="orderHerf(item.id)">
                    <view class="auto clear good-item" wx:for="{{item.ordProducts}}" wx:key="gg">
                        <view class="goods-img">
                            <image src="{{item.thumbnailUrl}}" wx:if="{{item.thumbnailUrl}}" class="goods-img-image"></image>
                            <view wx:else class="goods-noImg">暂无图片</view>
                        </view>
                        <view class="goods-text" >
                            <view class="goods-name">{{item.productName}}</view>
                            <view class="goods-norms">{{item.productSkuSpec}}</view>
                            <view class="goods-price">运费：免运费</view>
                        </view>
                    </view>    
                </view>
                <view wx:if="{{current==0}}" class="orderBtn clear">
                    <view class="auto">
                        <view class="left order-num"><text class="main-color">{{item.productCount}}</text>件商品</view>
                        <view class="left order-price main-color">￥{{item.totalPrice}}</view>
                        <view class="right main-color order-sub main-bord" wx:if="{{item.status == 0}}" @tap="pay(item.id,item.totalPrice)">立即支付</view>
                        <view class="right main-color order-sub main-bord" wx:if="{{item.status == 1 ||item.status == 2}}" @tap="confirm(item.id)">确认收货</view>
                        <view class="right main-color order-sub main-bord" wx:if="{{item.status == 3}}">去评价</view>
                        <view class="right main-color order-sub main-bord" wx:if="{{item.status == 4}}" @tap="del(item.id)">删除订单</view>
                        <view class="right main-color order-sub main-bord" wx:if="{{item.status == 5}}" @tap="del(item.id)">删除订单</view>
                        <view class="right main-color order-sub main-bord" wx:if="{{item.status == 6}}">已退款</view>
                    </view>   
                </view>
                <view wx:if="{{current==1}}" class="orderBtn clear">
                    <view class="auto">
                        <view class="left order-num"><text class="main-color">{{item.productCount}}</text>件商品</view>
                        <view class="left order-price main-color">￥{{item.totalPrice}}</view>
                        <view class="right main-color order-sub main-bord" wx:if="{{item.status == 0}}" @tap="pay(item.id,item.totalPrice)">立即支付</view>
                        <view class="right main-color order-sub main-bord" wx:if="{{item.status == 2}}" @tap="confirm(item.id)">确认收货</view>
                        <!-- <view class="right main-color order-sub main-bord" wx:if="{{item.status == 3}}">去评价</view> -->
                        <!-- <view class="right main-color order-sub main-bord" wx:if="{{item.status == 4}}" @tap="del(item.id)">删除订单</view>
                        <view class="right main-color order-sub main-bord" wx:if="{{item.status == 5}}" @tap="del(item.id)">删除订单</view> -->
                        <!-- <view class="right main-color order-sub main-bord" wx:if="{{item.status == 6}}">已退款</view> -->
                    </view>   
                </view>
            </view>
        </view>
        <view class="defaults" wx:else>
            <view class="classname"><image class="defaultsImg" src="http://image.vdongchina.com/M00/03/2A/ZSUkmVnewa2EZvLZAAAAAKXxyBM502.png"></image></view>
            <view class="classname">快去下单,您还没有相关的订单</view>
            <view class="defBtn main-bord main-color clear" @tap="defBtn">
                <view class="left defBtn-img"><image class="defBtn-image" src="http://image.vdongchina.com/M00/03/2A/ZSUkmVnexKCEU6pqAAAAAFtgt7o086.png"></image></view>
                <text class="left defBtn-text">返回</text>
            </view>
        </view>

        <view class="{{loadClasses}}">
            <image src="http://image.vdongchina.com/M00/03/31/ZSUkmVnfH2uEeywSAAAAAIKylIc100.gif" style="width:124rpx;height:124rpx;"></image>
        </view>
    </view>
</template>

<script>
export default {
    config: {
        navigationBarTitleText: '我的订单'
    },
    data () {
        return {
            nav:[{
                navId:0,
                navName:'普通订单'
            }, {
                navId: 1,
                navName: '拼团订单'
            }],
            current:0,//0普通  1拼团
            items: [],
            listNum: 1, 
            load: 'none'//加载动画
        }
    },
    computed: {
        loadClasses () {
            return `loading ${this.load}`
        }
    },
    onShow (options) {
		this.current = 0;
        this.requestP()
    },
    
    methods: {
        requestT(){//拼团订单
            console.log()
            var that = this;
            var items = []
            wx.request({
                url: that.$root.apiServer+that.$root.appid + '/basic/fgroup/applet/OrdList?openid='+getApp().globalData.openid,
                method: 'POST',
                header: {'content-type': 'application/json'},
                success: function (res) {
                    console.log('OrdList')
                    console.log(res)
                    var datas = res.data.obj;
                    
                    var product = {};
                    for(let i in datas){
                        var dome = {};
                        product.thumbnailUrl = getApp().globalData.imgUrl + datas[i].titlePic;
                        product.productName = datas[i].shopname;
                        product.productSkuSpec = datas[i].shop_type || datas[i].shopType;
                        dome.code = datas[i].code;
                        dome.id = datas[i].id;
                        dome.status = datas[i].status;//
                        dome.ordProducts = [{
                            thumbnailUrl:getApp().globalData.imgUrl + datas[i].titlePic,
                            productName:datas[i].shopname,
                            productSkuSpec:datas[i].shop_type || datas[i].shopType
                        }]
                        dome.productCount = datas[i].product_count || datas[i].market_count;
                        dome.totalPrice = datas[i].total_price;  
                        items.push(dome)         
                    }
                    console.log(items)
                    that.items = items;
                    that.listNum = items.length
                }
            })

        },
        requestP(){//普通订单
            var that = this
            wx.request({
                url: that.$root.apiServer+that.$root.appid+'/basic/api/ord/listOrd',
                data: {
                    token: getApp().globalData.token,
                },
                method: 'POST',
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success (res) {
                    that.items = res.data.data
                    that.listNum = res.data.data.length
                }
            })
        },
        changeNav(id){
            console.log(id)
            this.current = id;
            if(id == 1){
                this.requestT()
            }else{
                this.requestP()
            }
        },
        orderHerf (id) {//跳转详情页   
            wx.navigateTo({
                url: '../orderShip/orderShip?ordId=' + id + '&type='+this.current,
            })
        },
        //支付订单
        pay (id,price) {
            if(this.current){//拼团
                // zhifu
                wx.navigateTo({
                    url: '../orderShip/orderShip?ordId=' + id + '&type='+this.current,
                })
            }else{//普通订单
                var that = this   
                wx.navigateTo({
                    url: '../membershipCardPay/membershipCardPay?id='+id+"&price="+price+"&isType=0"
                })
            }
            
        },
        //确认收货
        confirm (id) {
            var that = this
            if(this.current == 0){//普通
                wx.showModal({
                    title: '提示',
                    content: '是否确认订单',
                    success: function (res) {
                        if (res.confirm) {
                            that.load = 'block'
                            wx.request({
                                url: that.$root.apiServer+that.$root.appid+'/basic/api/ord/confirmOrd',
                                data: {
                                    token: getApp().globalData.token,
                                    ordId: id,
                                },
                                method: 'POST',
                                header: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                },
                                success: function (res) {
                                    that.onShow()
                                    that.load = 'none'
                                }
                            })
                        } else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    }
                })
            }else{//拼团
                wx.showModal({
                    title: '提示',
                    content: '是否确认订单',
                    success: function (res) {
                        if (res.confirm) {
                            that.load = 'block'
                            wx.request({
                                url: that.$root.apiServer+that.$root.appid + '/basic/fgroup/applet/updateOrdStatus?ordId='+id+'&status=4',
                                method: 'POST',
                                header: {'content-type': 'application/json'},
                                success: function (res) {
                                    if(res.data.success){
                                        that.requestT()
                                        that.load = 'none'
                                    }else{
                                        wx.showModal({
                                            title: '提示',
                                            content: '确认订单失败',
                                            showCancel:false
                                        })
                                    }
                                    

                                }
                            })
                        } else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    }
                })
            }
             
        },
        //删除订单
        del (id) {
            var that = this
            wx.showModal({
                title: '提示',
                content: '是否删除订单',
                success: function (res) {
                    if (res.confirm) {
                        that.load = 'block'
                        wx.request({
                            url: that.$root.apiServer+that.$root.appid+'/basic/api/ord/deleteOrd',
                            data: {
                            token: getApp().globalData.token,
                            ordId: id,
                            },
                            method: 'POST',
                            header: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            success: function (res) {
                                that.onShow()
                                that.load = 'none'
                            }
                        })
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        },
    	defBtn() {
    		wx.navigateBack()
    	}
    }
}
</script>

<style scoped>
page{background:#f9f9f9;}
.cont-list{margin-top: 20rpx;background: #fff}
.pagetop{width:100%;height:84rpx;}
.block{display: block}
.none{display: none}

.cont-top{height: 68rpx;line-height: 68rpx; font-size: 26rpx;border-bottom:solid 1rpx #e3e3e3;}
.good-cant{margin-top: 20rpx;padding-bottom:20rpx;border-bottom:solid 1rpx #e3e3e3;}
.good-item{margin-bottom:20rpx; }
.goods-img,.goods-text{float: left;margin-right: 20rpx}
.goods-img .goods-img-image{width: 140rpx; height: 140rpx;}
.goods-text{font-size: 24rpx;}
.goods-name{margin-top: 14rpx;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width: 470rpx;}
.goods-norms{margin-top: 18rpx; color: #999}
.goods-price{margin-top: 14rpx;font-size: 20rpx;}

.goods-noImg{width: 138rpx; height: 138rpx;border:solid 2rpx #e3e3e3;font-size: 30rpx;text-align: center; line-height: 138rpx;}

.orderBtn{height: 80rpx;width: 750rpx;background: #ffffff; line-height: 80rpx;font-size: 28rpx;}
.order-num,.order-price{margin-right: 20rpx;}
.order-sub{width: 144rpx;height: 50rpx;line-height: 50rpx;font-size: 22rpx; text-align: center;margin-top: 14rpx;border-radius: 4rpx;margin-left: 20rpx}
.defBtn{width: 280rpx;box-sizing: border-box;border:2rpx solid #ff3e78}
.defBtn-img{margin-left: 80rpx;position: relative;width:40rpx ;height: 90rpx;}
.defBtn .defBtn-image{width: 37rpx;height: 30rpx;margin:0;position: absolute;left: 0;top:50%;margin-top: -15rpx;}
.defBtn-text{margin-left:10rpx; }

.groupList_nav{
    width:100%;
    height:84rpx;
    background-color:#fff;
    position:fixed;
    left: 0;
    top: 0;
    z-index:99;
}
.nav{
    width:25%;
    line-height:84rpx;
    float:left;
    text-align:center;
    font-size: 28rpx;
    color: #666666;
    background-color:#fff;
}
.groupList_nav .on{
    line-height:84rpx;
    color:#DD2727;
}
.on .text{
    line-height:84rpx;
    display:inline-block;
    border-bottom:4rpx solid #DD2727;
}
</style>