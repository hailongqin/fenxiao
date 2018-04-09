<template>
    <view class="con-page">
        <view class="topLine"></view>
        <view class="address" @tap="chooseAddress" style="{{toggleh}}">
            <view class="auto clear">
                <view class="wechatIco left">
                    <image src="http://image.vdongchina.com/M00/03/3C/ZSUkmVngJfOERe9lAAAAABjhsEA768.png" class="page-image wechatIco-image"></image>
                </view>
                <view class="left addtxt">一键获取微信地址</view>
                <view class="rightjt">
                    <image src="http://image.vdongchina.com/M00/03/31/ZSUkmVnfHT6EPdWPAAAAAAp9vZE085.png" class="page-image address-image"></image>
                </view>
            </view>
        </view>
        <view class="addinfo" style="{{toggles}}" @tap="chooseAddress">
            <view class="auto clear">
                <view class="infoIco left">
                    <image src="http://image.vdongchina.com/M00/03/2E/ZSUkmVnfB-uEan1VAAAAALR9kO0125.png" class="page-image infoIco-image"></image>
                </view>
                <view class="left infotext">
                    <view class="clear">
                        <view class="left">{{userName}}</view>
                        <view class="left tel">{{telNumber}}</view>
                    </view>
                    <view class="site">{{address}}</view>
                </view>
                <view class="rightjt">
                    <image src="http://image.vdongchina.com/M00/03/31/ZSUkmVnfHT6EPdWPAAAAAAp9vZE085.png" class="page-image addinfo-image"></image>
                </view>
            </view>
        </view>
        <view class="contant">
            <view class="cant-box">
                <view class="cant-border">
                    <view class="auto clear cont-title">
                        <view class="cantIco left"><image src="http://image.vdongchina.com/M00/03/30/ZSUkmVnfGPWERdl0AAAAALMebac136.png" class="page-image cantIco-image"></image></view>
                        <view class="cant-name left">旗舰店</view>
                    </view>
                </view>   
                <view class="cant-border">    
                    <view class="auto">                   
                        <view class="clear good-cant">
                            <view class="goods-img">
                                <image src="{{product.shopImg}}" class="page-image goods-img-image"></image>
                            </view>
                            <view class="goods-text">
                                <view class="goods-name">{{product.shopName}}</view>
                                <view class="goods-norms">{{product.shopType}}</view>
                                <view class="goods-price main-color">￥<text>{{product.productPrice}}</text></view>
                            </view> 
                            <view class="good-number">
                                <view class="goods-num right">
                                    <text>x{{product.productCount}}</text>
                                </view>
                            </view>                                      
                        </view>             
                    </view>          
                </view>
            </view>
            <view class="cant-border">    
                <view class="auto clear"> 
                    <view class="cant-dis clear">
                        <view class="left">配送方式</view>
                        <view class="right">免运费</view>
                    </view>                           
                </view>          
            </view>
            <view class="cant-bord">    
                <view class="auto clear"> 
                    <view class="cant-remark clear">
                        <view class="remarkTxt left">订单备注</view>
                        <view class="remarkInput left">
                            <input class="remarkInput-input" placeholder="请输入备注" value="{{remarkTxt}}" @change="inputChange"/>
                        </view>
                    </view>                           
                </view>          
            </view>
        </view>

        <view class="orderBtn clear">
            <view class="left order-num"><text class="main-color">{{product.productCount}}</text>件商品</view>
            <view class="left order-price main-color">￥{{product.productCount*product.productPrice}}</view>
            <view class="right order-sub main-back" @tap="{{judge?'subOrder':''}}"  style="{{'background:' + color}}">{{states?'支付订单':'支付订单'}}</view>
        </view>
    </view>
</template>

<script>
export default {
    config: {
        navigationBarTitleText: '确认订单'
    },
    data () {
        return {
        	color:'',
            num: 1,
            // 使用data数据对象设置样式名
            minusStatus: 'disabled',
            toggleh: 'display:block',
            toggles: 'display:none',
            userName: '',
            telNumber: '',
            address: '',
            items: [],//购物车商品数据
            //setBtn: [],//购物车商品数据
            //products: [],//创建订单数据
            totalPrice: 0,//总价格
            productNum: 0,//总数量
            product: {},
            //isItems: 0,
            addressId: '',//收货地址ID
            ordId: '',//支付成功ordId
            remarkTxt: '',//备注
            states:1,//0单独购买 1开团
            join:0,//1参团 0其他
            fgroupId:0,//团id
            userId:0,//用户id
            judge:true//允许点击购买
        }
    },
    onLoad (options) {  
        var product = JSON.parse(options.product);
        this.product = product;
        this.states = options.states;
        this.join = options.join;
        this.fgroupId = options.fgroupId || 0;
    },
    methods: {
        findItemIndexByUserId (userId) {
            if (userId >= 0) {
                for (var i = 0, len = this.items.length; i < len; i++) {
                    if (this.items[i].id == userId)
                    return i
                }
            }
        },
        chooseAddress () {
            var that = this;
            var product = this.product;
            // 获取用户收货地址
            if (wx.chooseAddress) {
                wx.chooseAddress({
                    success (res) {
                        console.log(res)
                        that.userName = res.userName;
                        that.telNumber = res.telNumber;
                        that.address = res.provinceName + res.cityName + res.countyName + res.detailInfo;
                        that.toggleh = 'display:none',
                        that.toggles = 'display:block'
                        product.userAddress = res.provinceName + res.cityName + res.countyName + res.detailInfo;
                        product.userName = res.userName;
                        product.userPhone = res.telNumber;
                        that.product = product;
                        var adress = res.provinceName + res.cityName + res.countyName + res.detailInfo;
                        wx.request({
                            url: that.$root.apiServer+that.$root.appid + '/basic/fgroup/applet/addUser',
                            method: 'POST',
                            data:{
                                adress:res.provinceName + res.cityName + res.countyName + res.detailInfo,
                                name:res.userName,
                                nickname:res.nickname,
                                openid:getApp().globalData.openid,
                                phone:res.telNumber,
                                pic:that.product.picurl
                            },
                            header: {'content-type': 'application/json'},
                            success: function (res) {
                                console.log(res)
                                that.userId = res.data.obj.id
                            }
                        })
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
        
        //获取订单备注的值
        inputChange (e) {
            this.remarkTxt = e.detail.value
        },
        
        subOrder() {
            var that = this;
            console.log(this.fgroupId)
            console.log(this.states)
            var product = this.product;
            console.log('product')
            console.log(product)
            if(!this.userName){
                 wx.showModal({
                    title: '提示',
                    content: '未授权地址',
                })  
                return false
            }
            if (this.product.userAddress !== '') {
                this.judge = false;
                if(this.join == 1){//参团
                    wx.request({
                        url: that.$root.apiServer+that.$root.appid + '/basic/fgroup/applet/judge?type=JOIN&fGroupOrdId=0&fGroupid='+that.fgroupId,
                        method: 'POST',
                        header: {'content-type': 'application/json'},
                        success: function (res) {
                            console.log('judge --- 参团')
                            console.log(that.join)
                            console.log(res)
                            if(res.data.success){///basic/fgroup/applet/joinFGroup
                                that.joinFGroup(that.fgroupId)
                            }else{
                                // that.joinFGroup(that.fgroupId)
                                 wx.showModal({
                                    title: '提示',
                                    content: '参团失败，请选择其他拼团',
                                    showCancel: false
                                })
                            }
                        }
                    })
                    
                }else{
                    if(this.states == 1){//开团
                        wx.request({
                            url: that.$root.apiServer+that.$root.appid + '/basic/fgroup/applet/addFGroup',
                            method: 'POST',
                            header: {'content-type': 'application/json'},
                            data:{
                                shopId:product.id,
                                shopType:product.shopType,
                                productCount:product.productCount,
                                productPrice:product.productPrice,
                                totalPrice:product.totalprice,
                                userId:that.userId,
                                userAddress:that.address,
                                userName:that.userName,
                                userPhone:that.telNumber,
                                mark:that.remarkTxt
                            },
                            success: function (res) {
                                console.log('addFGroup开团')
                                console.log(res)
                                var datas = res.data.obj;
                                that.pay(datas.id,datas.totalPrice,datas.code,datas.fgroupId)
                            }
                        })
                    }else{//普通购买
                        // that.pay(datas.id,datas.totalPrice,datas.code,0)
                        wx.request({
                            url: that.$root.apiServer+that.$root.appid + '/basic/fgroup/applet/addFGroup',
                             method: 'POST',
                            header: {'content-type': 'application/json'},
                            data:{
                                shopId:product.id,
                                shopType:product.shopType,
                                productCount:product.productCount,
                                productPrice:product.productPrice,
                                totalPrice:product.totalprice,
                                userId:that.userId,
                                userAddress:that.address,
                                userName:that.userName,
                                userPhone:that.telNumber,
                                mark:that.remarkTxt,
                                fgroupId:-1
                            },
                            success: function (res) {
                                console.log('addFGroup普通购买')
                                console.log(res)
                                // if(res.data.success){

                                // }
                                var datas = res.data.obj;
                                that.pay(datas.id,datas.totalPrice,datas.code,0)
                            }
                        })
                    }
                }
            } else {
                wx.showModal({
                    title: '提示',
                    content: '请选择微信地址',
                    showCancel: false
                })
            }
        },

        joinFGroup(fgroupId){//参团问题问题
            var that = this;
            var product = this.product;
            console.log('product')
            console.log(product)
            wx.request({
                url: that.$root.apiServer+that.$root.appid + '/basic/fgroup/applet/joinFGroup',
                method: 'POST',
                header: {'content-type': 'application/json'},
                data:{
                    shopId:product.id,
                    shopType:product.shopType,
                    productCount:product.productCount,
                    productPrice:product.productPrice,
                    totalPrice:product.totalprice,
                    userId:that.userId,
                    userAddress:that.address,
                    userName:that.userName,
                    userPhone:that.telNumber,
                    mark:that.remarkTxt,
                    fgroupId:fgroupId
                },
                success: function (res) {
                    console.log('参团提交订单joinFGroup')
                    console.log(res)
                    if(res.data.success){
                        console.log('pay')//返回值为空   没有订单ID   订单号等信息  无法支付
                        // that.pay(fgroupId,product.totalprice,0)
                        var datas = res.data.obj;
                        that.pay(datas.id,datas.totalPrice,datas.code,fgroupId)
                    }else{
                        wx.showModal({
                            title: '提示',
                            content: '参团失败，请选择其他拼团',
                            showCancel: false
                        })
                    }
                }
            })
        },
        defBtn () {
            wx.navigateTo({
                url: '../producList/producList'
            })    
        },
        pay(ordId,totalPrice,ordCode,fgroupId){ //订单ID、总价、订单号、团ID
            console.log(ordId)
            console.log(totalPrice)
            console.log(ordCode)
            console.log(fgroupId)
            console.log(getApp().globalData.openid)
            var that = this;
            wx.request({
                url: that.$root.apiServer+that.$root.appid + '/basic/fgroup/applet/pay?notifyUrl='+that.$root.apiServer+that.$root.appid+'/basic/fgroup/applet/wxPayNotify&id='+ordId+'&totalPrice='+totalPrice+'&ordCode='+ordCode+'&openid='+getApp().globalData.openid,
                method: 'POST',
                header: {'content-type': 'application/json'},
                success: function (res) {
                    console.log('pay')
                    console.log(res)
                    var datas = res.data.obj;
                    console.log(datas)
                    wx.requestPayment({
                        'timeStamp': datas.timeStamp,
                        'nonceStr': datas.nonceStr,
                        'package': datas.package,
                        'signType': 'MD5',
                        'paySign': datas.paySign,
                        'success':function(res){
                            // 判断订单
                            // var url = 
                            if(that.join == 1){//参团
                                console.log('参团')
                                wx.request({
                                    url: that.$root.apiServer+that.$root.appid + '/basic/fgroup/applet/judge?type=JOIN&fGroupOrdId=0&fGroupid='+fgroupId,
                                    method: 'POST',
                                    header: {'content-type': 'application/json'},
                                    success: function (res) {
                                        console.log('支付完判断订单')
                                        console.log(that.join)
                                        console.log(res)
                                        that.updateOrd(ordId,totalPrice,ordCode,fgroupId,datas.package)
                                    }
                                })
                            }else{
                                console.log('开团')
                                if(that.states == 1){//参团开团
                                    wx.request({
                                        url: that.$root.apiServer+that.$root.appid + '/basic/fgroup/applet/judge?type=OPEN&fGroupOrdId=0&fGroupid='+fgroupId,
                                        method: 'POST',
                                        header: {'content-type': 'application/json'},
                                        success: function (res) {
                                            console.log('开团支付完判断订单')
                                            console.log(that.join)
                                            console.log(res)
                                            that.updateOrd(ordId,totalPrice,ordCode,fgroupId,datas.package)
                                        }
                                    })
                                }else{//普通购买
                                    console.log('普通购买')
                                    that.updateOrd(ordId,totalPrice,ordCode,fgroupId,datas.package)
                                }
                            }
                        },
                        'fail':function(res){
                            console.log(res)
                            if(res.errMsg == 'requestPayment:fail cancel'){
                                that.judge = true
                            }else{
                                wx.showModal({
                                    title: '提示',
                                    content: '支付失败',
                                    showCancel: false
                                })
                                that.judge = true
                            }
                            
                        },
                        'complete':function(res){
                            console.log('取消支付')
                            console.log(res)
                            if(res.errMsg == 'requestPayment:cancel'){
                                that.judge = true
                            }
                        }
                    })
                                
                }
            })

        },
        updateOrd(ordId,totalPrice,ordCode,fgroupId,packages){
            var that = this
            wx.request({
                url: that.$root.apiServer+that.$root.appid + '/basic/fgroup/applet/updateOrd?id='+ordId+'&pay_wx_serial_number='+ordCode+'&packages='+packages,
                method: 'POST',
                header: {'content-type': 'application/json'},
                success: function (res) {
                    console.log('updateOrd')
                    console.log(res)
                    if(res.data.success){
                        if(that.join == 1){//参团
                            wx.redirectTo({
                                // url: '../orderShip/orderShip?ordId=' + id +'&type=1',
                                url: '../t_result/t_result?fgroupId=' + fgroupId+'&share=0',
                            })
                        }else{
                            if(that.states == 1){//开团
                                wx.redirectTo({
                                    url: '../t_result/t_result?fgroupId=' + fgroupId+'&share=0',
                                })
                            }else{//普通购买
                                console.log('单独购买预留位置')
                                wx.redirectTo({
                                    url: '../orderShip/orderShip?ordId=' + ordId + '&type=1',
                                })
                            }
                        }
                    }else{
                        wx.showModal({
                            title: '提示',
                            content: '订单生成失败，钱将原路返回',
                            showCancel: false
                        })
                    }                              
                }
            })
        }
    }
}
</script>

<style scoped>
page{background: #f9f9f9;}	
.con-page{background: #f9f9f9;padding-bottom: 140rpx}
.page-image{padding:0;margin:0 }
.address{width: 750rpx;margin-top: 20rpx;background: #fff;height: 100rpx;border-top:1rpx solid #e3e3e3;border-bottom:1rpx solid #e3e3e3;position: relative;line-height: 100rpx;}

.wechatIco{margin-top:10rpx }
.wechatIco .wechatIco-image{width: 44rpx;height: 42rpx;}
.addtxt{font-size: 28rpx;margin-left: 10rpx;}
.address .rightjt{position: absolute;right:20rpx;top:0}
.address .rightjt .address-image{width: 18rpx; height: 30rpx;}

.addinfo{width: 750rpx;height: 136rpx;background: #ffffff;line-height: 136rpx;}
.infoIco .infoIco-image{width: 28rpx;height: 40rpx;}
.infotext{line-height: 40rpx; margin-top: 30rpx;margin-left:20rpx;font-size: 28rpx; }
.tel{margin-left: 20rpx;}
.site{color: #999999;font-size: 24rpx;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width: 570rpx;}
.addinfo .rightjt{position: absolute;right:20rpx;top:0}
.addinfo .rightjt .addinfo-image{width: 18rpx; height: 30rpx;}

.contant{width: 750rpx;margin-top: 20rpx;}
.cant-border{border-bottom: 1rpx solid #e3e3e3;background: #fff}
.cont-title{height: 70rpx;line-height: 70rpx;}
.cantIco .cantIco-image{width: 32rpx;height: 30rpx;}
.cant-name{font-size:28rpx; padding-left: 10rpx;}

.good-cant{padding-top: 20rpx;padding-bottom:20rpx;position: relative}
.goods-num{color: #333333;padding-right: 40rpx;position: relative} 
.numBtn{position: absolute;right: 0;top:0;}
.numBtn .numBtn-image{width:30rpx;height: 30rpx;}
.goods-img,.goods-text{float: left;margin-right: 20rpx}
.goods-img .goods-img-image{width: 140rpx; height: 140rpx;}
.goods-text{font-size: 24rpx;}
.goods-name{margin-top: 14rpx;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width: 470rpx;}
.goods-norms{margin-top: 18rpx; color: #999}
.goods-price{margin-top: 14rpx;font-size: 20rpx;}
.goods-price text{font-size: 28rpx;}

.block{display: block}
.none{display: none}


.good-number{position: absolute;right: 0;bottom:20rpx;}

.stepper {width: 158rpx;height: 36rpx;border: 1px solid #ccc;border-radius: 4rpx;line-height: 36rpx;}
.stepper .stepper-text {width: 50rpx;text-align: center;float: left;font-size: 24rpx;}
/*.stepper input {width: 54rpx;height: 36rpx;min-height: 36rpx;line-height: 36rpx;float: left;text-align: center;font-size: 20rpx;border-left: 1px solid #ccc;border-right: 1px solid #ccc;}*/
.stepper .stepper-view {width: 54rpx;height: 36rpx;float: left;text-align: center;font-size: 30rpx;border-left: 1px solid #ccc;border-right: 1px solid #ccc;}

.stepper .normal{color: black;background: #ffffff}
.stepper .disabled{color: #ccc;background: #f6f6f6}

.cant-dis{position: relative;height: 100rpx;line-height: 100rpx;font-size: 28rpx;}

.cant-bord{border-top:1rpx solid #e3e3e3 ;border-bottom: 1rpx solid #e3e3e3;margin-top: 20rpx;background: #fff}
.cant-remark{height: 100rpx;line-height: 100rpx;font-size: 28rpx;}
.remarkTxt{width: 140rpx;}

.remarkInput .remarkInput-input{line-height:100rpx;height: 100rpx;width: 500rpx;}

.orderBtn{height: 118rpx;width: 100%;background: #ffffff; position: fixed;bottom: 0; line-height: 118rpx;font-size: 28rpx;z-index: 10;}
.order-num,.order-price{margin-left: 20rpx;}
.order-sub{width: 248rpx; text-align: center;color: #ffffff;font-size: 32rpx;}
</style>