<template>
<view class="page">	
    <view class="car" @tap="shopcart">个人中心</view>
    <view class="car" @tap="msg">消息</view>
	<distributionList></distributionList>
    <distributionDealer></distributionDealer>
</view>
</template>
<script>
import distributionList from "../../components/distributionList/distributionList"		
import distributionDealer from "../../components/distributionDealer/distributionDealer"	
export default {
    config: {
        navigationBarTitleText: '首页'
    },
    components:{
    	distributionList:distributionList,
        distributionDealer:distributionDealer
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