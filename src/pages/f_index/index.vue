<template>
<view class="page">	
    <view class="car" @tap="shopcart">个人中心</view>
    <view class="car" @tap="msg">消息</view>
    <view class="car" @tap="toCar">购物车</view>
	<distributionList></distributionList>
    <!-- <distributionDealer></distributionDealer> -->
    <!-- <new-prolists></new-prolists> -->
    <forms></forms>
    <bespeak></bespeak>
</view>
</template>
<script>
// import newProlists from '../../components/newProlists/newProlists'
import distributionList from "../../components/distributionList/distributionList"		
// import distributionDealer from "../../components/distributionDealer/distributionDealer"	
import forms from '../../components/forms/forms'
import bespeak from '../../components/bespeak/bespeak'
export default {
    config: {
        navigationBarTitleText: '首页'
    },
    components:{
        // newProlists:newProlists,
    	distributionList:distributionList,
        // distributionDealer:distributionDealer,
        forms: forms,
        bespeak: bespeak
    },
    data () {
      return {
          
      }
    },
    onLoad(){
        
    },
    
    methods:{
        shopcart(){
            wx.navigateTo({
                url: '../f_personal/f_personal'
            })
        },
        msg(){
            wx.navigateTo({
                url: '../f_message/f_message'
            })
        },
        toCar(){
            wx.navigateTo({
                url: '../order_y/order_y'
            })
        }
    }
}
</script>
<style scoped>
page{
    background: #F2F2F2;
}
.car{
    height:100rpx;
    line-height: 100rpx;
    font-size: 50rpx;
    text-align: center;
    color:red;
    margin-bottom:30rpx;
}
</style>