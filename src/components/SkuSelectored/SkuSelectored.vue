<template>
    <view wx:if="{{conDisplay}}">
        <view class="pageback" @tap="clickBack"></view>
        <view class="cont-box">
            <view class="contant">
                <view class="cont-back">
                    <view class="good-img" wx:if="{{shopDetail.titlePic}}">
                        <image src="{{shopDetail.titlePic}}" class="good-img-image"></image>
                    </view>
                    <view wx:else class="empty good-img">暂无图片</view>
                    <view class="good-other">
                        <view class="good-price">￥{{states == 1?shopDetail.groupPrice:shopDetail.marketPrice}}</view>
                        <view class="good-store">库存：{{shopDetail.stockNum}}件</view>
                        <view class="good-norm">已选择：<text class="main-color">{{selectSku}}</text></view>
                    </view>
                </view>
            </view>

            <view class="good-norms">
                <view class="auto">
                    <view class="norms-main">
                        <view class="norms-top">规格选择</view>
                        <view class="norms-bottom clear">
                            <view class="{{selectSku == item ? 'option f3' : 'option b6'}}" wx:for="{{skuList}}" wx:key="id" @tap="itemValue(item)">{{item}}</view>
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
            <view class="btn main-back" @tap="subm" style="{{'background:'+color}}">确认</view>
        </view>
    </view>
</template>

<script>
export default {
    props: {
        display: {
            type: Boolean,
            default: false
        },
        isCar: {
            type: Number,
            default: 0
        },
        join:{
            type: Number,
            default: 0
        },
        goodsName: String,
        color:String,
        fgroupId:{
            type: Number,
            default: 0
        },
        state:{
            type: Number,
            default: 1
        },
        shopList: Array
    },
    data () {
        return {
            num: 1,
            minusStatus: 'disabled',
            currentItem: 0,
            isShowStockNum:false,
            isShowSaleNum:false,
            isRealStockNum:false,
            isRealSaleNum:false,
            virtualStockNum:0,
            virtualSaleNum:0,
            stockNumSummary:0,
            saleNumSummary:0,
            product: {
                id: '',//id
                productPrice: 0,//单价
                totalprice:0,//总价
                productCount: 0,//数量
                shopType:'',//规格
                picurl: '',//开团人微信头像地址
                userPhone:13700000000,//收货人联系方式
                userName:'',//收货人名
                userAddress:'',//收货地址
                shopImg:'',//商品图片
                shopName:'',//商品名称
                isfree:0//是否包邮，0包邮1不包邮
            },
            skus: [],
            conDisplay:false,
            joining:0,//1一键参团
            fgid:this.fgroupId,
            shopDetail:{},
            // sku:'',//l
            skuList:[],
            selectSku:'',
            states:0,//0普通购买 1开团
            avatarUrl:''
        }
    },
    watch: {
        display (newVal) {
            console.log(newVal)
            this.conDisplay = newVal
        },
        skus (newVal) {
            if (newVal && newVal.length) {   
                this.itemValue(newVal[0].id)
            }
        },
        state(newVal){
            this.states = newVal;
            this.num = 1;
            this.minusStatus = 'disabled'
        },
        fgroupId(newVal){
            this.fgid = newVal
        },
        join(newVal){
            this.joining = newVal;
            this.num = 1;
            this.minusStatus = 'disabled'
        },
        shopList(newVal){
            console.log('newVal')
            console.log(newVal)
            this.shopDetail = newVal;
            if(newVal.spec){
                this.skuList = newVal.spec.split(",");
            }else{
                this.skuList = ['常规'];
            }
            var product = this.product;
            product.id = newVal.id;//商品id
            product.isfree = newVal.isfree;
            product.shopName = newVal.name;
            product.shopImg = newVal.titlePic;
            product.stockNum = newVal.stockNum;
            product.groupNum = product.groupNum;
            this.sku = newVal.spec;
            this.product = product;
        }
    },
    onLoad (options) {
        this.conDisplay = false
    },
    async onShow() {
        await this.$root.login()
        wx.getUserInfo({
            success: (res) => {
                var userInfo = res.userInfo
                var nickName = userInfo.nickName
                var avatarUrl = userInfo.avatarUrl
                var gender = userInfo.gender //性别 0：未知、1：男、2：女
                var province = userInfo.province
                var city = userInfo.city
                var country = userInfo.country
                this.avatarUrl = userInfo.avatarUrl
            }
        })
    },      
    methods: {
        bindMinus () {
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
        bindPlus () {
            var num = this.num;
            var islimit = this.shopDetail.islimit;
            var limitNum = this.shopDetail.limitNum;
            if(islimit == '1'){//做购买限制
                if(this.states != 0){//不是普通购买
                    if(num >= limitNum){
                        wx.showModal({
                            title: '提示',
                            content: '商品限购'+limitNum+'件'
                        })
                    }else{
                        num++
                    }
                }else{
                    num++
                }
            }else{
                num++
            }
            // 大于一件的时，normal状态，否则disable状态
            var minusStatus = num <= 1 ? 'disabled' : 'normal'
            // 数值与状态写回
            this.num = num
            this.minusStatus = minusStatus
        },
        /* 输入框事件 */
        bindManual (e) {
            var num = e.detail.value
            // 数值与状态写回
            this.num = num
        },
        clickBack () {
            this.conDisplay = false
            this.$emit('displayChange', this.conDisplay)
        },      
        itemValue (id) {
            this.selectSku = id
        },
        findItemIndexByUserId (id) {
            if (id >= 0) {
                for (var i = 0, len = this.skus.length; i < len; i++) {
                    if (this.skus[i].id == id)
                    return i
                }
            }
        },

        //确认商品
        subm () {
            console.log(this.states)
            console.log('product')
            console.log(this.product)
            if (this.selectSku) {//是否选择规格
                if(this.num<=this.shopDetail.stockNum){
                    var product = this.product
                    product.productCount = this.num
                    product.shopType = this.selectSku
                    if(this.states == 1){
                        product.productPrice = this.shopDetail.groupPrice;
                        product.totalprice = product.productCount * product.productPrice
                    }else{
                        product.productPrice = this.shopDetail.marketPrice
                        product.totalprice = product.productCount * product.productPrice
                    }
                    
                    product.picurl = this.avatarUrl
                    if(this.fgid == 0){//开团或者单独购买
                        console.log('product')
                        console.log(product)
                        wx.navigateTo({
                            url: '../t_order/t_order?product=' + JSON.stringify(product) + '&states=' + this.states + '&join=' + this.joining
                        })
                    }else{//参团
                        wx.navigateTo({
                            url: '../t_order/t_order?product=' + JSON.stringify(product) + '&states=' + this.states + '&join=' + this.joining+'&fgroupId='+this.fgid
                        })
                    }
                    
                }else{
                    wx.showModal({
                        title: '提示',
                        content: '库存不足'
                    })
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

.clear::after{display: block;height: 0;clear: both;content: "";overflow: hidden;visibility: hidden}
.left{float: left}
.right{float: right}
.auto{width: 710rpx;margin-left: auto;margin-right: auto}
.pageback{position: fixed;top: 0;bottom: 0;width: 100%;height: 100%;z-index: 998;background: rgba(0,0,0,0.5)}
.cont-box{position:fixed;bottom: 0;top:220rpx;z-index: 1000;width:100%}
.contant{height: 200rpx;border-bottom:solid #e3e3e3 1rpx;background: #fff;padding-bottom: 20rpx;}
.cont-back{width: 750rpx;height: 200rpx;}
.good-img{width: 210rpx;height: 210rpx;position: absolute;left: 30rpx;top:-10rpx;border-radius: 8rpx;overflow: hidden;line-height: 210rpx;text-align: center}
.empty{border:solid 2rpx #e3e3e3;background: #fff}
.good-img .good-img-image{width: 210rpx;height: 210rpx;background:#fff;}
.good-other{margin-left: 270rpx;padding-top: 24rpx;font-size: 24rpx;}
.good-price{font-size: 28rpx;}
.good-store{margin-top: 20rpx;}
.good-norm{margin-top: 20rpx;}
.good-norms{background: #fff;}
.norms-top{font-size: 24rpx; color: #999999;line-height: 80rpx;}
.norms-main{padding-bottom:20rpx;border-bottom: #e3e3e3 1rpx solid;}
.norms-bottom{max-height:300rpx;overflow-x:scroll;}
.norms-bottom .option{ float: left;font-size: 28rpx; padding: 14rpx 34rpx; margin-right: 20rpx;border-radius: 6rpx;margin-bottom:20rpx;}
.b6{border:solid 2rpx #b6b6b6;}
.f3{border:2rpx solid #ff3e78;color:#ff3e78}
.norms-bottom .sub,.norms-bottom .nub,.norms-bottom .add{float: left;text-align: center;}
.norms-bottom .sub,.norms-bottom .add{width: 88rpx;height: 60rpx;line-height: 60rpx;border:solid 2rpx #b6b6b6;}
.norms-bottom .sub{border-top-left-radius: 6rpx;border-bottom-left-radius: 6rpx;border-right: none}
.norms-bottom .add{border-top-right-radius: 6rpx;border-bottom-right-radius: 6rpx;border-left: none}
.norms-bottom .nub{width: 98rpx;height: 60rpx;border:solid 2rpx #b6b6b6;line-height: 60rpx}
.stepper {width: 286rpx;height: 62rpx;border: 1px solid #ccc;border-radius: 4rpx;}
.stepper .stepper-text {width: 90rpx;line-height: 62rpx;text-align: center;float: left;font-size: 28rpx;}
.stepper .stepper-input {width: 100rpx;height: 62rpx;float: left;text-align: center;font-size: 22rpx;border-left: 1px solid #ccc;border-right: 1px solid #ccc;}
.stepper .normal{color: black;background: #ffffff}
.stepper .disabled{color: #ccc;background: #f6f6f6}

.btn{position:absolute;width: 100%;height: 100rpx;bottom: 0;font-size: 32rpx;color: #ffffff;text-align: center;line-height: 100rpx;}
.good-cont{position: absolute;width: 100%;height: 800rpx;background: #fff;bottom:0;left: 0;z-index: -9}

</style>