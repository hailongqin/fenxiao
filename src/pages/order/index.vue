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
            <view class="cant-box" wx:for="{{items}}" wx:key="id">
                <view class="cant-border">
                    <view class="auto clear cont-title">
                        <view class="cantIco left">
                            <image src="http://image.vdongchina.com/M00/03/30/ZSUkmVnfGPWERdl0AAAAALMebac136.png" class="page-image cantIco-image"></image>
                        </view>
                        <view class="cant-name left">旗舰店</view>
                    </view>
                </view>
                <view class="cant-border">
                    <view class="auto">
                        <view class="clear good-cant">
                            <view class="goods-img">
                                <image src="{{item.imageUrl || item.productSku.thumbnail.url}}" class="page-image goods-img-image"></image>
                            </view>
                            <view class="goods-text">
                                <view class="goods-name">{{item.productName}}</view>
                                <view class="goods-norms">{{item.productSkuSpec}}</view>
                                <view class="goods-price main-color">￥
                                    <text>{{item.productSku.salePrice}}</text>
                                </view>
                            </view>
                            <view class="good-number">
                                <view class="{{item.display ? 'goods-num right none' : 'goods-num right'}}" @tap="goodsNum(item.id)">
                                    <text>x{{item.num}}</text>
                                    <view class="numBtn">
                                        <image src="http://image.vdongchina.com/M00/03/33/ZSUkmVnfK9OEXodVAAAAABLfGnU893.png" class="page-image numBtn-image"></image>
                                    </view>
                                </view>
                                <view class="{{item.display ? 'stepper right block':'stepper right none'}}">
                                    <text class="{{item.num > 1 ? 'normal stepper-text' : 'disabled stepper-text'}}" @tap="bindMinus(item.id)">-</text>
                                    <view class="stepper-view">{{item.num}}</view>
                                    <text class="normal stepper-text" @tap="bindPlus(item.id)">+</text>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="cant-border">
                <view class="delivery ft28 bg-wt plr30" wx:if="{{scoreOpen}}">
                    <checkbox-group @change="checkboxChange">
                        <label class="checkbox">
                            <view class="left">积分抵扣</view>
                            <view class="right">
                                <text class="scoreShow" wx:if="{{scoreShow}}">使用{{useScore}}积分 抵扣{{scoreMoeny}}元</text>
                                <checkbox color="#ff3e78" />
                            </view>

                        </label>
                    </checkbox-group>
                </view>
            </view>
            <view class="cant-border" @tap="coupon">
                <view class="delivery ft28 bg-wt plr30">
                    <view class="checkbox">
                        <view class="left">使用优惠券</view>
                        <view class="right" wx:if="{{discounts == ''&& isCoupon == ''}}">您有
                            <text class="main-color">{{couPonList.length}}</text>个优惠可以使用</view>
                        <view class="right" wx:if="{{isCoupon && discounts != '' && isCoupon != ''}}">{{discounts.ccard.cardType == 'DISCOUNT' ? '已选择折扣劵：' + discounts.ccard.discount +"折券" : '已选择代金券：满' + discounts.ccard.leastCost +'元减'+ discounts.ccard.reduceCost}}</view>
                        <view class="right" wx:if="{{!isCoupon && discounts != '' }}">{{'已选择红包：抵扣' + discounts.couPonPrice + "元"}}</view>
                    </view>
                </view>
            </view>
            <!-- <view class="cant-border">
                                                                                            <view class="auto clear">
                                                                                                <view class="cant-dis display-flex reminders">
                                                                                                    <view class="">
                                                                                                        使用积分 共233积分，满1000积分可用
                                                                                                    </view>
                                                                                                    <image src="http://image.vdongchina.com/M00/05/C3/ZSUkmVoSUeGEQjU2AAAAAJ1SB04129.png" class="page-image reminder"></image>

                                                                                                </view>
                                                                                            </view>
                                                                                        </view> -->
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
                            <input class="remarkInput-input" placeholder="请输入备注" value="{{remarkTxt}}" @change="inputChange" />
                        </view>
                    </view>
                </view>
            </view>

            <view class="orderPrice bg-wt">
                <view class="clear auto">
                    <view class="left">商品金额</view>
                    <view class="right main-color">￥{{totalPrice}}</view>
                </view>
                <view class="clear auto" wx:if="{{scoreShow}}">
                    <view class="left">积分抵扣</view>
                    <view class="right main-color">-￥{{scoreMoeny}}</view>
                </view>
                <view class="clear auto" wx:if="{{isDiscounts}}">
                    <view class="left">{{isCoupon?'优惠券优惠：' :'红包抵扣'}}</view>
                    <view class="right main-color">-￥{{discounts.couPonPrice}}</view>
                </view>

            </view>
        </view>

        <view class="footer bg-wt">
            <view class="cant-border" wx:if="{{payFlag}}">

                <view class="cant-dis txt-c">
                    订单每满
                    <text class="main-color ft24">{{payScore}}</text>元 可获得
                    <text class="main-color">1</text> 积分，本次下单可获赠
                    <text class="main-color">{{getsScore}}</text> 积分
                </view>
            </view>
            <view class="clear orderBtn">
                <view class="left order-num txt-c">
                    <text class="main-color">实付款：￥{{payPrice}}</text>
                </view>
                <view class="right order-sub main-back" @tap="subOrder" style="{{'background:' + color}}">提交订单</view>
            </view>

        </view>
        <useCoupon :coupon-show='couponShow' :cou-ponList='couPonList' :score-before-price="scoreBeforePrice" @getCouponId="getCouponId"></useCoupon>
    </view>
</template>

<script>
import useCoupon from "../../components/useCoupon/useCoupon"
export default {
    config: {
        navigationBarTitleText: '确认订单'
    },
    components: {
        useCoupon: useCoupon
    },

    data() {
        return {
            color: '',
            num: 1,
            // 使用data数据对象设置样式名
            minusStatus: 'disabled',
            toggleh: 'display:block',
            toggles: 'display:none',
            userName: '',
            telNumber: '',
            address: '',
            items: [],//购物车商品数据
            totalPrice: 0,//总价格
            productNum: 0,//总数量
            addressId: '',//收货地址ID
            ordId: '',//支付成功ordId
            remarkTxt: '',//备注
            totalScore: 0,//积分总数
            rateScore: 0,
            scoreShow: false,
            useScore: 0,
            scoreOpen: false,
            scoreMoeny: 0,
            payScore: 0,
            getsScore: 0,
            payPrice: 0,
            payFlag: false,
            couponShow: false,
            isCoupon: "",  //优惠券true /false 红包
            discounts: 0,//优惠券（红包）信息
            isDiscounts: false, //是否选择优惠
            isType: 1,
            couPonList: [],
            redPacketr: [],
            kajuan: [],
            hongbao: [],
            rateFlag:false,
            scoreBeforePrice:0
        }
    },
    onLoad(options) {
        this.color = this.$root.globalData.color
        var items = []//无论是购物车，还是立即购买，都转成items
        if (options.setBtn) {
        	var arrItem=[]
        	var itemCar=[]        	
            arrItem = JSON.parse(options.setBtn)
            arrItem.forEach(function(item){
            	items.push({
	                id: item.productId,//商品ID
	                productId: item.productId,//商品ID
            		imageUrl:item.productImageUrl,
            		productName:item.productName,
            		productSkuId:item.skuId,
            		productSkuSpec:item.skuName,
            		productSku:{salePrice:item.skuPrice,product:{rateFlag:item.rateFlag,
            		rateProportion:item.rateProportion}},
            		num:item.quantity,
            		
            	})
            })             
        }
        // ,product:{rateFlag:product.rateFlag,rateProportion:product.rateProportion}
        if (options.product) {
            var product = JSON.parse(options.product)
            this.rateFlag = options.rateFlag
            var item = {
                id: product.id,//商品ID
                num: product.num,//购买数量
                productId: product.id,//商品ID
                productName: product.name,//商品名称
                productSku: { salePrice: product.price, product: product.product },
                productSkuId: product.skuId,
                productSkuSpec: product.skuSpec,//规格名称
                userId: 1,
                imageUrl: product.url,
                productSkuSpec: product.rateProportion,
            };
            items.push(item)
        }
        
        this.items = items
        var that = this
        wx.request({
        	//url: that.$root.apiServer + that.$root.appid +that.$root.variate+ '/basic/score/applet/selectOneByOpenid?openid=' + that.$root.globalData.openid,
            url: that.$root.apiServer + that.$root.appid + '/basic/score/applet/selectOneByOpenid?openid=' + that.$root.globalData.openid,
            data: {
            },
            method: "POST",
            header: {
                'Content-Type': 'application/json'
            },
            success(rst) {
                if (rst.data.success) {
                    that.totalScore = rst.data.code
                    if (rst.data.obj == null || rst.data.code == 0) {
                        this.scoreOpen = false
                    }
                    if (rst.data.obj != null) {
                        that.rateScore = rst.data.obj.rateScore
                        that.payScore = rst.data.obj.payScore
                        that.payFlag = rst.data.obj.payFlag
                        if (rst.data.obj.rateFlag && that.rateFlag == "true") {
							that.scoreOpen = rst.data.obj.rateFlag
						}
                    }
                }
                that.getTotalPrice()
                that.score()
                that.$root.get("/basic/coupon/applet/getCard", { openid: that.$root.globalData.openid }, data => {
                    if (data.success) {
                        if (data.obj.kajuan) {
                            that.kajuan = data.obj.kajuan
                        }
                        if (data.obj.hongbao) {
                            that.redPacketr = data.obj.hongbao
                        }
                        that.getDiscounts()
                    }
                })
            }
        })


    },
    getDiscounts() {  //筛选后台可用红包优惠券
        var that = this;
        var price = that.payPrice,
            newRedPacketr = [],
            newCouPonList = [];
        if (that.kajuan.length > 0) {
            for (let i = 0; i < that.kajuan.length; i++) {
                that.kajuan[i].coupon = true
                if (that.kajuan[i].ccard.cardType == 'CASH') { //剔除不满足条件的折扣券
                    if (that.kajuan[i].ccard.leastCost <= price) {
                        newCouPonList.push(this.kajuan[i])
                    }
                } else {
                    newCouPonList.push(this.kajuan[i])
                }
            }
            //   that.couPonList = that.couPonList.concat(newCouPonList)
        }
        if (that.redPacketr.length > 0) {
            for (let i = 0; i < that.redPacketr.length; i++) { // 剔除不满足条件的红包
                if (that.redPacketr[i].redPacket.usableRange == 1 || that.redPacketr[i].redPacket.usableRange == 2) { //红包指定商品范围
                    that.redPacketr[i].coupon = false
                    that.redPacketr[i].cardType = "红包"
                    if (that.redPacketr[i].redPacket.conditionMoney <= Number(price)) { // 剔除不符合当前类型的红包
                        if (that.redPacketr[i].redPacket.usableRange == 2) { //红包指定商品范围
                            var idList = that.redPacketr[i].redPacket.productIds.split(",");    
                            for (let j = 0; j < idList.length; j++) { //当前商品不在指定商品范围内
                                for (let m = 0; m < that.items.length; m++) {
                                    if (idList[j] == that.items[m].id) {
                                        newRedPacketr.push(that.redPacketr[i])
                                    }
                                }
                            }
                        } else {
                            newRedPacketr.push(that.redPacketr[i])
                        }
                    }
                }
            }
            // that.couPonList = that.couPonList.concat(newRedPacketr)
        }
        that.couPonList = newCouPonList.concat(newRedPacketr)
    },
    methods: {
    
        getCouponId(isCoupon, discounts, changed) {
            this.getTotalPrice()  //计算商品总数
            this.score()
            this.isCoupon = isCoupon
            this.discounts = discounts
            this.isDiscounts = true
            this.couPonList = changed
            this.payPrice = parseFloat(this.payPrice - discounts.couPonPrice).toFixed(2)
            this.getsScore = Math.floor(this.payPrice / this.payScore)
        },
        coupon() {
            this.couponShow = true
        },
        findItemIndexByUserId(userId) {
            if (userId >= 0) {
                for (var i = 0, len = this.items.length; i < len; i++) {
                    if (this.items[i].id == userId)
                        return i
                }
            }
        },
        changeNum(userId, isPlus) {
            //获取点击的是哪一个
            var items = this.items//所有items
            var index = this.findItemIndexByUserId(userId)
            var item = items[index]//被点击的item
            if (item) {
                var num = item.num
                if (isPlus)//加
                    num++
                else if (num > 1)//减（大于1）
                    num--
                items[index].num = num
                this.items = items
            }
            this.getTotalPrice()
        },
        bindMinus(index) {
            this.changeNum(index, false)
            this.score()
            this.getDiscounts()
            this.isCoupon = ''
            this.discounts = ''
            this.isDiscounts = false
        },
        bindPlus(index) {

            this.changeNum(index, true)
            this.score()
            this.getDiscounts()
            this.isCoupon = ''
            this.discounts = ''
            this.isDiscounts = false
        },
        goodsNum(id) {
            var items = this.items//所有items
            var index = this.findItemIndexByUserId(id)
            var item = items[index]//被点击的item
            if (item) {
                items[index].display = true
            }
            this.items = items
        },
        //计算总金额(总数量)
        getTotalPrice() {
            var to = 0, num = 0
            for (var i = 0; i < this.items.length; i++) {
                to += this.items[i].productSku.salePrice * this.items[i].num
                num += this.items[i].num
            }
            this.totalPrice = parseFloat(to).toFixed(2)
            this.productNum = num

        },
        chooseAddress() {
            var that = this
            // 获取用户收货地址
            if (wx.chooseAddress) {
                wx.chooseAddress({
                    success(res) {
                    },
                    complete(res) {

                        if (res) {
                            if (res.userName) {

                                var servsers = that.$root.globalData.servsers
                                wx.request({
                                	//url: that.$root.apiServer + that.$root.appid +that.$root.variate+ '/basic/api/user/addAddress',
                                    url: that.$root.apiServer + that.$root.appid + '/basic/api/user/addAddress',
                                    data: {
                                        token: that.$root.globalData.token,
                                        phone: res.telNumber,
                                        name: res.userName,
                                        province: res.provinceName,
                                        city: res.cityName,
                                        district: res.countyName,
                                        street: res.detailInfo,
                                        zipCode: res.postalCode,
                                    },
                                    method: 'POST',
                                    header: {
                                        'Content-Type': 'application/json'
                                    },
                                    success(res) {
                                        if (res.data.code == '100') {
                                            that.toggleh = 'display:none',
                                                that.addressId = res.data.data.id,
                                                that.userName = res.data.data.name,
                                                that.telNumber = res.data.data.phone,
                                                that.address = res.data.data.province + res.data.data.city + res.data.data.district + res.data.data.street,
                                                that.toggles = 'display:block'
                                        } else {
                                            wx.showModal({
                                                title: '提示',
                                                content: '系统错误',
                                            })
                                        }
                                    }
                                })

                            } else {
                                that.toggleh = 'display:block'
                                that.toggles = 'display:none'

                            }

                        }

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
        //生成订单
        createOrder() {
            var products = []//购买的商品
            for (var i = 0; i < this.items.length; i++) {
                var product = {
                    productId: this.items[i].productId,//商品ID
                    productName: this.items[i].productName,//商品名称
                    skuId: this.items[i].productSkuId,
                    buyNum: this.items[i].num,//购买数量
                    skuName: this.items[i].productSkuSpec,//规格名称
                    rateFlag: this.items[i].rateFlag,
                    rateProportion: this.items[i].rateProportion

                }
                products.push(product)
            }
            return products
        },
        //获取订单备注的值
        inputChange(e) {
            this.remarkTxt = e.detail.value
        },
        subOrder() {
            if (!this.userName) {
                wx.showModal({
                    title: '提示',
                    content: '未授权地址',
                })
                return false
            }
            if (this.addressId !== '') {
                var products = this.createOrder()
                if (products && products.length > 0) {
                    var servsers = getApp().globalData.servsers
                    var that = this
                    var datas = {
                        token: getApp().globalData.token,
                        products: products,
                        addressId: that.addressId,
                        mark: that.remarkTxt,
                        score: that.useScore,
                        scorePrice: that.scoreMoeny
                    }
                    if (that.isDiscounts) {

                        if (that.isCoupon) {
                            datas.cardType = "KJ"
                            datas.id = that.discounts.ccard.id
                            datas.lqTime = that.discounts.lqTime
                            datas.cardCode = that.discounts.code
                            datas.cardTitle = that.discounts.ccard.title
                        } else {
                            datas.redpacketId = that.discounts.redpacketId
                            datas.redpacketMoney = that.discounts.redPacket.money
                            datas.redpacketLogId = that.discounts.id
                            datas.cardTitle = that.discounts.redPacket.title
                            datas.cardType = "HB"
                        }
                    }

                    wx.request({
                        //url: this.$root.apiServer + this.$root.appid+this.$root.variate+ '/basic/api/ord/createOrd',
                        url: this.$root.apiServer + this.$root.appid + '/basic/api/ord/createOrd',
                        data: datas,
                        method: "POST",
                        header: {
                            'Content-Type': 'application/json'
                        },
                        success(rst) {
                            if (rst.data.code == "500") {
                                wx.showModal({
                                    title: '提示',
                                    content: rst.data.msg,
                                    showCancel: false
                                })
                                return false
                            }
                            wx.redirectTo({
                                url: '../membershipCardPay/membershipCardPay?id=' + rst.data.data.id + "&price=" + rst.data.data.totalPrice + "&isType=0"
                            })
                        }
                    })
                }
            } else {
                wx.showModal({
                    title: '提示',
                    content: '请选择微信地址',
                    showCancel: false
                })
            }
        },
        defBtn() {
            wx.navigateTo({
                url: '../producList/producList'
            })
        },
        IbindMinus() {
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
        IbindPlus() {
            var num = this.num;
            var islimit = this.shopDetail.islimit;
            var limitNum = this.shopDetail.limitNum;
            if (islimit == '1') {//做购买限制
                if (this.states != 0) {//不是普通购买
                    if (num >= limitNum) {
                        wx.showModal({
                            title: '提示',
                            content: '商品限购' + limitNum + '件'
                        })
                    } else {
                        num++
                    }
                } else {
                    num++
                }
            } else {
                num++
            }
            // 大于一件的时，normal状态，否则disable状态
            var minusStatus = num <= 1 ? 'disabled' : 'normal'
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
        checkboxChange(e) {
            this.scoreShow = !this.scoreShow
            this.getTotalPrice()  //计算商品总数
            this.score() // 计算积分 
            this.isCoupon = ''
            this.discounts = ''
            this.isDiscounts = false
            this.getDiscounts()

        },
        score() {
            var items = this.items,
                stockNumSummary = 0;
            for (let i = 0; i < items.length; i++) {
                if (items[i].productSku.product.rateFlag) {
                    stockNumSummary += Math.floor(parseFloat((((items[i].productSku.salePrice * (items[i].productSku.product.rateProportion * 0.01)) / this.rateScore)) * items[i].num).toFixed(2))
                }
            }
            if (stockNumSummary >= this.totalScore) {  // 可以抵用积分小于可用积分时
                this.useScore = this.totalScore
            }
            if (stockNumSummary <= this.totalScore) {  // 可以抵用积分大于可用积分时

                if (stockNumSummary < 1) {
                    stockNumSummary = 0
                }
                this.useScore = Math.floor(stockNumSummary)  //useScore  可以抵用积分
            }
            this.scoreMoeny = parseFloat(this.useScore * this.rateScore).toFixed(2)
            if (!this.scoreShow) {

            }
            if (!this.scoreShow) {
                this.scoreMoeny = 0
                this.useScore = 0
                this.payPrice = this.totalPrice
                this.getsScore = Math.floor(this.payPrice / this.payScore)
            } else {

                this.getsScore = Math.floor((((this.totalPrice * 100) - (this.scoreMoeny * 100)) / this.payScore) * 0.01)

            }
            this.scoreBeforePrice = parseFloat(this.totalPrice - this.scoreMoeny).toFixed(2) //积分计算后价格（为保证选择优惠前价格统一）
            this.payPrice = parseFloat(this.totalPrice - this.scoreMoeny).toFixed(2)
        }
    }
}
</script>

<style scoped>
page {
    background: #f9f9f9;
}

.con-page {
    background: #f9f9f9;
    padding-bottom: 240rpx
}

.page-image {
    padding: 0;
    margin: 0
}

.address {
    width: 750rpx;
    margin-top: 20rpx;
    background: #fff;
    height: 100rpx;
    border-top: 1rpx solid #e3e3e3;
    border-bottom: 1rpx solid #e3e3e3;
    position: relative;
    line-height: 100rpx;
}

.wechatIco {
    margin-top: 10rpx
}

.wechatIco .wechatIco-image {
    width: 44rpx;
    height: 42rpx;
}

.addtxt {
    font-size: 28rpx;
    margin-left: 10rpx;
}

.address .rightjt {
    position: absolute;
    right: 20rpx;
    top: 0
}

.address .rightjt .address-image {
    width: 18rpx;
    height: 30rpx;
}

.addinfo {
    width: 750rpx;
    height: 136rpx;
    background: #ffffff;
    line-height: 136rpx;
}

.infoIco .infoIco-image {
    width: 28rpx;
    height: 40rpx;
}

.infotext {
    line-height: 40rpx;
    margin-top: 30rpx;
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

.addinfo .rightjt {
    position: absolute;
    right: 20rpx;
    top: 0
}

.addinfo .rightjt .addinfo-image {
    width: 18rpx;
    height: 30rpx;
}

.contant {
    width: 750rpx;
    margin-top: 20rpx;
}

.cant-border {
    border-bottom: 1rpx solid #e3e3e3;
    background: #fff
}

.cont-title {
    height: 70rpx;
    line-height: 70rpx;
}

.cantIco .cantIco-image {
    width: 32rpx;
    height: 30rpx;
}

.cant-name {
    font-size: 28rpx;
    padding-left: 10rpx;
}

.good-cant {
    padding-top: 20rpx;
    padding-bottom: 20rpx;
    position: relative
}

.goods-num {
    color: #333333;
    padding-right: 40rpx;
    position: relative
}

.numBtn {
    position: absolute;
    right: 0;
    top: 0;
}

.numBtn .numBtn-image {
    width: 30rpx;
    height: 30rpx;
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

.block {
    display: block
}

.none {
    display: none
}


.good-number {
    position: absolute;
    right: 0;
    bottom: 20rpx;
}

.stepper {
    width: 158rpx;
    height: 36rpx;
    border: 1px solid #ccc;
    border-radius: 4rpx;
    line-height: 36rpx;
}

.stepper .stepper-text {
    width: 50rpx;
    text-align: center;
    float: left;
    font-size: 24rpx;
}

























/*.stepper input {width: 54rpx;height: 36rpx;min-height: 36rpx;line-height: 36rpx;float: left;text-align: center;font-size: 20rpx;border-left: 1px solid #ccc;border-right: 1px solid #ccc;}*/

.stepper .stepper-view {
    width: 54rpx;
    height: 36rpx;
    float: left;
    text-align: center;
    font-size: 30rpx;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
}

.stepper .disabled {
    color: #ccc;
    background: #f6f6f6
}

.cant-dis {
    position: relative;
    height: 100rpx;
    line-height: 100rpx;
    font-size: 28rpx;
}

.cant-dis.display-flex {
    justify-content: space-between;
    align-items: center;
}

.cant-bord {
    border-top: 1rpx solid #e3e3e3;
    border-bottom: 1rpx solid #e3e3e3;
    margin-top: 20rpx;
    background: #fff
}

.cant-remark {
    height: 100rpx;
    line-height: 100rpx;
    font-size: 28rpx;
}

.remarkTxt {
    width: 140rpx;
}

.remarkInput .remarkInput-input {
    line-height: 100rpx;
    height: 100rpx;
    width: 500rpx;
}

.footer {
    width: 750rpx;
    position: fixed;
    bottom: 0;
    border-top: 1rpx solid #e3e3e3;
    z-index: 9999;
}

.orderBtn {
    height: 118rpx;
    width: 100%;
    background: #ffffff;

    line-height: 118rpx;
    font-size: 28rpx;
    z-index: 10;
}

.order-num {
    width: 502rpx;
}

.order-sub {
    width: 248rpx;
    text-align: center;
    color: #ffffff;
    font-size: 32rpx;
}

#stepper {
    width: 286rpx;
    height: 62rpx;
    border: 1px solid #ccc;
    border-radius: 4rpx;
}

#stepper .stepper-text {
    width: 90rpx;
    line-height: 62rpx;
    text-align: center;
    float: left;
    font-size: 28rpx;
}

#stepper .stepper-input {
    width: 100rpx;
    height: 62rpx;
    float: left;
    text-align: center;
    font-size: 22rpx;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
}

#stepper .normal {
    color: black;
    background: #ffffff
}

#stepper .disabled {
    color: #ccc;
    background: #f6f6f6
}

.reminder {
    width: 30rpx;
    height: 30rpx;
}

.cant-dis.display-flex.reminders {
    justify-content: flex-start;
    align-items: center;
}

.orderPrice {
    height: 180rpx;
}

.orderPrice .clear {
    height: 45rpx;
    line-height: 45rpx;
    font-size: 28rpx;
}

.delivery {
    height: 88rpx;
    line-height: 88rpx;
    margin-bottom: 4rpx;
    font-size: 28rpx;
    color: #c3c3c3;
}

.scoreShow {
    margin-right: 20rpx;
}
</style>