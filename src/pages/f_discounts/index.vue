<template>
  <view class="container">
      <view class="tips" wx:if="{{flag}}">
            <view class="tip" animation="{{animationData}}">
                <view class="txt">使用说明：您只要在该店铺下单，即可使用此代金券</view>
            </view>
      </view>
      <view class="discounts">
          <view class="no-yongjin" wx:if="{{discountNum == 0}}">
		        <image class="img" src="http://image.vdongchina.com/M00/06/31/ZSUkmVoamdOEIbetAAAAAFGgV6k210.png"></image>
		        <view class="txt">还没有优惠</view>
          </view>  
          
          <view class="item" wx:if="{{discountNum != 0}}">
              <view class="left">
                  <image class="img" src="{{shopInfo.shopLogo}}"></image>
              </view>
              <view class="right">
                  <view class="name">{{shopInfo.shopName}}</view>
                  <view class="type">{{discountNum}}元代金券</view>
              </view>
          </view>
      </view>
  </view>
</template>

<script>
export default {
    config: {
        "navigationBarTitleText": "我的优惠"
    },
    data () {
        return {
            flag:1,
            discountNum:'',
            shopInfo:'',
            shopLogo:'http://image.vdongchina.com/M00/06/12/ZSUkmVoXvTuEZfkvAAAAAELIZTQ640.png',
            shopName:'MODISCH'
        }
    },
    onShow(){
        var that = this

        wx.request({
	       url:this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/dUserCoupon/listCoupon',
	       data:{
	       		token: that.$root.globalData.token
	       },
	       method:"POST",
	        header: {
	           'content-type': 'application/x-www-form-urlencoded'
	       },
	       success: function(res) {
	       		if(res.data.code =="200"){
	       			if(res.data.object.money){
	       				that.discountNum = res.data.object.money
	       			}
                    
	       		}
	       }
        })    
       
        wx.request({
            url:this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/userShop/getPUserShop',
            data:{
                token: that.$root.globalData.token,
                pid:that.$root.globalData.pid
            },
            method:"POST",
                header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
                if(res.data.code =="200"){
                    if(res.data.object != ''){
                        that.shopInfo = res.data.object
                    }else{
                        that.shopInfo = {
                            shopLogo:that.shopLogo,
                            shopName:that.shopName
                        }
                    }
                }
            }
        })

       
        var animation = wx.createAnimation({
            duration: 10000,
            timingFunction: 'ease',
        })
        that.animation = animation
        animation.translateX(375).step()
        that.setData({
            animationData:animation.export()
        })
        setTimeout(function() {
            animation.translateX(0).step()
            that.setData({
                animationData:animation.export()
            })
        }.bind(that), 100)

        


        setTimeout(function(){
            var animation1 = wx.createAnimation({
                duration: 10000,
                timingFunction: 'ease',
            })
            that.animation = animation1
            animation.opacity(1).step()
            that.setData({
                animationData:animation.export()
            })
            that.setData({
                animationData:animation.export()
            })
            setTimeout(function() {
                animation.opacity(0).step()
                that.setData({
                    animationData:animation.export()
                })
            }.bind(that), 100)
        },11000)

        setTimeout(function(){
            that.flag = 0
        },15000)
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
    background: #f2f2f2;
    overflow:hidden;
}
.tips{
    height: 70rpx;
    background: #ffae22;
}
.container .tip{
    height: 70rpx;
    background: #ffae22;
}
.container .tip .txt{
    height: 70rpx;
    line-height: 70rpx;
    margin-left:30rpx;
    font-size: 30rpx;
    color:#fff;
}
.container .discounts{
    min-height:180rpx;
    margin-top:50rpx;
}
.container .discounts .item{
    height:180rpx;
    border-radius: 8rpx;
    margin:0 auto 20rpx;
    background: #fff;
    width:710rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2rpx 4rpx 0 rgba(0,0,0,0.04);
}
.container .discounts .item .left{
    width:84rpx;
    margin:0 30rpx;
}
.container .discounts .item .left .img{
    height: 84rpx;
    width:84rpx;
    margin-bottom:16rpx;
    border-radius: 50%;
    display: block;
}
.container .discounts .item .right{
    flex:1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}
.container .discounts .item .right .name{
    font-size: 26rpx;
    color:#555;
    margin-bottom:10rpx;
}
.container .discounts .item .right .type{
    font-size: 50rpx;
    color:#111;
}

.container .no-yongjin{
    position: relative;
    z-index: 1;
}
.container .no-yongjin .img{
    position: absolute;
    top:200rpx;
    left:50%;
    margin-left:-100rpx;
    width:200rpx;
    height:200rpx;
    display: block;
}
.container .no-yongjin .txt{
    position: absolute;
    top:440rpx;
    left: 0;
    width:100%;
    text-align: center;
    height: 56rpx;
    line-height: 56rpx;
    font-size:40rpx;
    color:#000;
}
.container .no-yongjin .txt1{
    position: absolute;
    top:526rpx;
    left: 0;
    width:476rpx;
    text-align: center;
    min-height: 42rpx;
    line-height: 42rpx;
    font-size:28rpx;
    color:#888;
    padding:0 137rpx;
}
</style>
