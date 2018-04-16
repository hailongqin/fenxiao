<template>
    <view class="useCoupon" wx:if="{{couponShow}}">
        <view class="close" @tap="close"></view>
        <scroll-view class="pos-a coupon box-s" scroll-y="true">
            <view class=" ">
                <view class="coupon-title ft30 txt-c">
                    我的卡券
                </view>
                <view class="couponList">
                    <radio-group class="" @change="radioChange(this)">
                        <view class="label-2" wx:for="{{couPonList}}" wx:key="couPonList">
                            <label class="label-2__text group display-flex" for="{{item.name}}">
                                <radio id="{{item.name}}" hidden value="{{index}}" checked="{{item.checked}}"></radio>
                                <view class="label-2__icon">
                                    <image class="label-2__icon-nochecked" src="http://image.vdongchina.com/M00/09/0B/ZSUkmVpMmLaEJjuaAAAAAIqgyYg969.png" wx:if="{{!item.checked}}"></image>
                                    <image class="label-2__icon-checked" src="http://image.vdongchina.com/M00/09/1D/ZSUkmVpNyzuEXkDcAAAAADD00oQ099.png" wx:else></image>
                                </view>
                                <view class="shop-intro  pos-r">
                                    <view class="coupon-type mb20">
                                         <image class="coupon-type-img" wx:if="{{item.ccard.cardType == 'DISCOUNT'}}" src="http://image.vdongchina.com/M00/0A/2B/ZSUkmVpe53eEGKTMAAAAABHsHZI562.png"></image> 
                                         <image class="coupon-type-img" wx:if="{{item.ccard.cardType == 'CASH'}}" src="http://image.vdongchina.com/M00/0A/59/ZSUkmVphuuSECFVsAAAAAC_BDe0122.png"></image>
                                         <image class="coupon-type-img" wx:if="{{item.cardType == '红包'}}" src="http://image.vdongchina.com/M00/0A/2B/ZSUkmVpe59mECoglAAAAAN6yvfY581.png"></image>
                                    </view>
                                    <view class="display-flex">
                                        <image class="shop-img" wx:if="{{item.ccard}}" src="{{item.ccard.iconUrlList}}"></image>
                                        <image class="shop-img" wx:if="{{item.cardType == '红包'}}" src="http://image.vdongchina.com/M00/0A/68/ZSUkmVpjRqWEQzryAAAAADaP7Rk031.png"></image>
                                        
                                        <view>
                                            <view class="ft28 c3 txt-ov" wx:if="{{item.cardType == '红包'}}">{{item.redPacket.title}}</view>
                                            <view class="ft28 c3 txt-ov" wx:else>{{item.ccard.brandName}}</view>
                                            <view class="ft28 c3 mt11" wx:if="{{item.ccard.cardType == 'CASH'}}">
                                                <text class="price ft32">{{item.ccard.reduceCost}}元</text>
                                                <text class="ft28 c9">满{{item.ccard.leastCost}}元可用</text>
                                            </view>
                                            <view class="ft28 c3 mt11" wx:if="{{item.ccard.cardType == 'DISCOUNT'}}">
                                                <text class="price ft32">{{item.ccard.discount}}折</text>
                                                <text class="ft28 c9">最高抵用{{item.ccard.limitPrice}}元</text>
                                            </view>
                                            <view class="ft28 c3 mt11" wx:if="{{item.cardType == '红包'}}">
                                                <text class="price ft32">{{item.redPacket.money}}元</text>
                                                <text class="ft28 c9">满{{item.redPacket.conditionMoney}}元可用</text>
                                            </view>
                                        </view>

                                    </view>
                                    <view class="{{item.ccard.cardType == 'DISCOUNT' ? 'pos-a couponIsType discount txt-c': (item.ccard.cardType == 'CASH' ? 'pos-a couponIsType present  txt-c':'pos-a couponIsType voucher txt-c')}}">
                                        {{item.cardType == '红包' ? '红包': (item.ccard.cardType == 'CASH' ? '代金券' : '折扣券')}}
                                    </view>
                                </view>
                            </label>
                        </view>
                        <!--红包  -->

                    </radio-group>
                    <!-- <view class="label-2" wx:for="{{radioItems}}" wx:key="radioItems">                                                                    </radio-group> -->
                </view>
            </view>
        </scroll-view>
        <view @tap="close" class="coupon-close ft28 txt-c">
            关闭
        </view>
    </view>
</template>
<script>
export default {
    props: {
        couponShow:{
            type: String,
            default: true ,//优惠券及红包弹窗是否显示
            
        } ,
        couPonList:Array,
        scoreBeforePrice:Number
    },
    data() {
        return {
            couponShow: false
        }
    },
    onLoad() {
    },
    watch: {
    scoreBeforePrice(newVal){
        this.price = newVal
    },
    },
    methods: {
        radioChange: function(e) {
            var checked = e.detail.value
            var changed = this.couPonList
            var couPonPrice = 0; //优惠金额
            var discounts = {}; // 选中提交的信息
            var cartType  // 优惠券的类型
            var isCoupon
            for (var i = 0; i < changed.length; i++) {
                if (checked == i) {
                    changed[i].checked = true
                    isCoupon = changed[i].coupon
                    discounts = changed[i]
                    if (changed[i].coupon) {                            
                        cartType = this.couPonList[i].ccard.cardType
                        if (this.couPonList[i].ccard.cardType == 'DISCOUNT') {  //选中类型为折扣券
                            couPonPrice = parseFloat(this.price - (this.couPonList[i].ccard.discount * 0.1 * this.price)).toFixed(2)  // 折算后的价格
                            if (couPonPrice >= this.couPonList[i].ccard.limitPrice) { // 折算金额大于可以可抵用最大金额
                                couPonPrice = this.couPonList[i].ccard.limitPrice
                            }
                        } else {
                            couPonPrice = this.couPonList[i].ccard.reduceCost
                        }
                    } else { //选中类型为红包
                       couPonPrice = this.couPonList[i].redPacket.money
                    }
                } else {           
                      changed[i].checked = false
                }

            }
            if (isCoupon) { //选中类型为优惠券             
                discounts.couPonPrice = couPonPrice               
            } else {
                discounts.couPonPrice = couPonPrice
            }
            this.$emit("getCouponId", isCoupon, discounts,changed)
        },
        close() {
            this.couponShow = false
        }
    }

}
</script>
<style scoped>

.close{
    width: 750rpx;
    height: 430rpx;
}
.useCoupon {
    width: 750rpx;
    min-height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999;
}

.pos-a {
    bottom: 0;
    background: #ffffff;
}

.coupon {
    padding: 27rpx 0rpx;
    height: 827rpx;
    padding-bottom:100rpx;
}

.coupon-title {
    height: 42rpx;
    font-family: PingFangSC-Regular;
    color: rgba(51, 51, 51, 1);
    line-height: 42rpx;
}



.get {
    width: 38rpx;
    height: 38rpx;
}

.label-1,
.label-2 {
    margin-bottom: 15px;
}

.label-1__text,
.label-2__text {
    display: inline-block;
    vertical-align: middle;
}

.group {
    width: 750rpx;
    height: 190rpx;
    /* padding: 15rpx 30rpx 15rxp 16rpx; */
    justify-content: flex-start;
    /* align-items: center; */
}

.label-1__icon {
    position: relative;
    margin-right: 10px;
    display: inline-block;
    vertical-align: middle;
    width: 18px;
    height: 18px;
    background: #ffffff;
}

.label-1__icon-checked {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 12px;
    height: 12px;
    background: #1aad19;
}


.label-2__icon {
    position: relative;
    display: inline-block;
    /* vertical-align: middle; */
    /* margin-right: 10px; */
    width: 78rpx;
    height: 190rpx;
    /* background: #fcfff4; */
}

.label-2__icon-checked,
.label-2__icon-nochecked {
    position: absolute;
    width: 38rpx;
    height: 38rpx;
    top: 70rpx;
    left: 16rpx;
    border-radius: 50%;
}

.label-4_text {
    text-align: center;
    margin-top: 15px;
}

.shop-intro {
    width: 642rpx;
    height: 160rpx;
    background: rgba(255, 255, 255, 1);
    border-radius: 4rpx;
    -webkit-box-shadow: 0 2px 3px rgba(255, 101, 93, 0.15);
    -moz-box-shadow: 0 2px 3px rgba(255, 101, 93, 0.15);
    box-shadow: 0 2px 3px rgba(255, 101, 93, 0.15);
}

.shop-img {
    width: 120rpx;
    height: 120rpx;
    display: block;
    margin-left: 16rpx;
    margin-right: 16rpx;
}

.label-2 .ft28.c3 {
    height: 40rpx;
    line-height: 40rpx;
}

.mt11 {
    margin-top: 11rpx;
}

.ft28.c3.txt-ov {
    width: 464rpx;
}

.coupon-type,
.coupon-type-img {
    width: 642rpx;
    height: 10rpx;
    display: block;
}

.price {
    color: rgba(238, 0, 0, 1);
    height: 40rpx;
    line-height: 40rpx;
    margin-right: 10rpx;
}

.couponIsType {
    bottom: 0;
    right: 0;
    width: 109rpx;
    height: 39rpx;
    line-height: 39rpx;
    border-radius: 14rpx 0px 14rpx 0px;
    color: #ffffff;
}

.couponIsType.present {
    background: rgba(253, 223, 12, 1);
}

.couponIsType.discount {
    background: rgba(219, 152, 252, 1);
}

.couponIsType.voucher {
    background: rgba(255, 115, 82, 1);
}

.couponIsType.present {
    background: rgba(253, 223, 12, 1);
}
.couponIsType.red{
    background: red;
}

.coupon-close {
    width: 750rpx;
    background: rgba(255, 115, 82, 1);
    height: 87rpx;
    line-height: 87rpx;
    position: fixed;
    bottom: 0;
    color: #ffffff;
}
</style>

