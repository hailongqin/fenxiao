<template>
<view class="container">
    <distributionCar  :hidden="true"></distributionCar>
</view>
</template>

<script>
import distributionCar from "../../components/distributionCar/distributionCar"	
export default {
	config: {
        navigationBarTitleText: '购物车'
    },
    components:{
    	distributionCar:distributionCar
    },
    data () {
        return {
        //控制底部导航切换颜色
            indexActive:1,
            messageActive:1,
            shopcartActive:0,
            personalActive:1,
	      messageNum:0            
        }
    },
    onLoad(){
    	var that =this
     wx.request({
        url:this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/notice/noticeStatistics',
        data:{
            token:that.$root.globalData.token,
            pid:that.$root.globalData.pid
        },
        method:"GET",
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
        	var system,twitter,commission
        	if(res.data.object.SYSTEM){
        		system = parseInt(res.data.object.SYSTEM.count) 
        	}else{
        		system = 0
        	}
        	if(res.data.object.TWITTER){
        		twitter = parseInt(res.data.object.TWITTER.count) 
        	}else{
        		twitter =0
        	}
        	if(res.data.object.COMMISSION){
        		commission = parseInt(res.data.object.COMMISSION.count) 
        	}else{
        		commission =0
        	}   
          var messageNum = system + twitter+commission        
            if(messageNum == 0){
            	that.messageNum = false
            }else{
            	that.messageNum =messageNum 
            }
        }
    })    	
    },
    methods:{
        //底部导航跳转
        personal() {
            wx.redirectTo({
                url: '../f_personal/f_personal'
            })
        },
        index(){
            wx.redirectTo({
                url: '../index/index'
            })
        },
        shopcart(){
            wx.redirectTo({
                url: '../f_car/f_car'
            })
        },
        message(){
            wx.redirectTo({
                url: '../f_message/f_message'
            })
        }
    }
}
</script>

<style scoped>
.container{
    height:100%;
    overflow: scroll;
}
page{
    height:100%;
}
/* 底部导航样式 */
.bottom-nav{
    height: 100rpx;
    width:100%;
    position: fixed;
    bottom:0;
    left:0;
    background: #fff;
    border-top:1rpx solid #ababab;
    z-index: 999;
}
.bottom-nav .content{
    width:100%;
    height:100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.bottom-nav .content .nav-list{
    height: 100%;
    width:25%;
}
.bottom-nav .content .nav-list .nav{
    height:100%;
    width:100%;
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.bottom-nav .content .nav-list .nav .top{
    height:54rpx;
    width:54rpx;
    margin:9rpx 0 4rpx;
    display: block;
}
.bottom-nav .content .nav-list .nav .bottom{
    font-size:20rpx;
    color:#999;
    height: 28rpx;
    line-height:28rpx;
}
.bottom-nav .content .nav-list .navActive{
    height:100%;
    width:100%;
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.bottom-nav .content .nav-list .navActive .top{
    height:54rpx;
    width:54rpx;
    margin:9rpx 0 4rpx;
    display: block;
}
.bottom-nav .content .nav-list .navActive .bottom{
    font-size:20rpx;
    color:#262833;
    height: 28rpx;
    line-height:28rpx;
}
.fmessage{
	position: relative;
}
.fmessagenum{font-size:18rpx;position: absolute;width: 36rpx;height: 36rpx;background: #ff1111;border-radius: 50%;line-height: 36rpx;text-align: center;color: #fff;top:6rpx;right: 44rpx;}

</style>