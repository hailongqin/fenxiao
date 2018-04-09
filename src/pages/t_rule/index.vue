<template>
	
	<view class="rule">
	    <view class="rule_title">
	        1. 拼团有效期
	    </view>
	    <view class="rule_details">
	        拼团有效期是自开团时刻起的24小时内，如果距离活动结束时间小于24小时，则以活动结束时间为淮。
	    </view>

	    <view class="rule_title">
	        2. 拼团成功
	    </view>
	    <view class="rule_details">
	        拼团有效期是自开团时刻起的24小时内，如果距离活动结束时间小于24小时，则以活动结束时间为淮。
	    </view>
	    <view class="rule_title">
	        3. 拼团失败
	    </view>
	    <view class="rule_details">
			拼团有效期后，未达成相应参团人数的团，则该团失败。
	    </view>
	    <view class="rule_details">
	        高峰期间，同时支付的人过多，团人数有限制，蘑菇街以接收微信支付时间先后为准，超出该团人数限制的部分用户则会拼团失败。
	    </view>
	    <view class="rule_details">
	        拼团失败的订单，系统会在1-7个工作日内处理退款，系统处理后1-10个工作日内原路退回至原支付账户中。( 所使用的现金券/蘑豆会一并退回)
	    </view>
	    <view class="rule_title">
	        4. 拼团完成后如何退款？
	    </view>
	    <view class="rule_details">
	        已经生成订单，联系运营方进行后台退款操作。拼团有效期后，未达成相应参团人数的要求，则该团失败，系统会自动退款。
	    </view>
	    <view class="rule_details">
	        注： 拼团成功后可以自行操作职消订单，退款将在1-10个工作日内原路返回，请您到时注意查收。拼团中状态暂不支持退款申请，有需要的可以等待拼团成功后申请或者拼团失败后会自动退回。
	    </view>
	    <view class="rule_title">
	        5. 商品承诺的发货时间
	    </view>
	    <view class="rule_details">
	        拼团会有拼团有效期，在拼团有效期内成团后商家进入发货阶段，因此参加拼团活动的商品承诺的发货时间，得以拼团成功时间为进开始计算。
	    </view>
	</view>
</template>

<script>
export default {
	config: {
    	"navigationBarTitleText": "拼团规则"
	},
	data () {
		return {

		}
	},
	onLoad () {

	},
	onShow () {

	},
	methods: {

	}
}
</script>

<style scoped>
.rule{
    width:100%;
    background-color:#fff;
    padding:30rpx 30rpx 0 30rpx;
    box-sizing:border-box;
    font-family: PingFangSC-Regular;
}
.rule_title{
    font-size: 34rpx;
    color: #000000;
    margin-bottom:20rpx;
}
.rule_details{
    font-size: 28rpx;
    color: #333333;
    letter-spacing: 0;
    line-height: 36rpx;
    margin-bottom:44rpx;
    display:block;
}
</style>