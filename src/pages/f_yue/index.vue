<template>
  <view class="container">
      <view class="content" wx:if="{{isDealer && allNum != 0 && flag}}">
        <!-- <view class="f_tips">
            当前提现额度
            <view class="f_tips_num">{{cashMinLimit}}-{{cashLimit}}元</view>
        </view> -->
        <view class="yue">
            <view class="txt">我的余额</view>
            <view class="price">{{allNum}}元</view>
        </view>
        <view class="detail" @tap="detail">
            <view class="txt">明细</view>
            <image class="arrow" src="http://image.vdongchina.com/M00/06/10/ZSUkmVoXtlyEJpXrAAAAAGJ4S4M326.png"></image>
        </view>
        <view class="cash">
            <button class="btn ban" wx:if="{{allNum == 0}}" @tap="dialogMsg">提现</button>
            <button class="btn pick" wx:else @tap="toCash">提现</button>
        </view>
      </view>

      <view class="no-yue" wx:if="{{allNum==0 && flag}}">
          <image class="img" src="http://image.vdongchina.com/M00/06/12/ZSUkmVoXuxiETvo-AAAAADRVYco425.png"></image>
          <view class="txt">还没有钱~</view>
          <view class="f_yue_tips">赶紧去成为推客吧！马上就有钱哦！</view>
      </view>
  </view>
</template>

<script>
export default {
    config: {
        "navigationBarTitleText": "我的余额"
    },
    data () {
        return {
            allNum:0,
            isDealer:true,
            cashLimit:'',
            cashMinLimit:'',
            flag:0
        }
    },
    onLoad(e){
        var that = this
        if(e.isDealer){
            that.isDealer = e.isDealer
            //获取我的余额
            wx.showLoading({
                title: '正在拼命加载中',
            })
            wx.request({
                url: this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/user/requestUserBalaDetail',
                data: {
                    token: that.$root.globalData.token,
                    pid:that.$root.globalData.pid
                },
                method: "POST",
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                success: function(res) {
                    if(res.data.code == 200){
                        if(res.data.object.balaSum > 0){
                            wx.hideLoading()
                            that.allNum = res.data.object.balaSum
                            that.flag = 1
                        }else{
                            wx.hideLoading()
                            that.allNum = 0
                            that.flag = 1
                        }
                    }else{
                        wx.hideLoading()
                        wx.showLoading({
                            title: '网络出故障啦！',
                        })
                    }
                }
            })

            //提现额度
            wx.request({
                url: that.$root.apiServer + that.$root.appid + that.$root.variate + '/basic/client/distribution/cash/queryCashlimit',
                data: {
                    token: that.$root.globalData.token,
                    pid:that.$root.globalData.pid
                },
                method: "GET",
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                success: function(res) {
                    if(res.data.code == 200){
                        that.cashLimit = res.data.object.cashLimit
                        that.cashMinLimit = res.data.object.cashMinLimit
                    }
                }
            })
        }else{
            that.isDealer = false
        }
    },
    methods:{
        dialogMsg(){
            wx.showModal({
                title: '提示',
                content: '余额不足',
                success: function(res) {
                    if (res.confirm) {
                        // console.log('用户点击确定')
                    } else if (res.cancel) {
                        // console.log('用户点击取消')
                    }
                }
            })
        },
        toCash(){
            if(this.allNum<this.cashMinLimit || this.allNum>this.cashLimit){
                wx.showModal({
                    title: '提示',
                    content: '您的余额不在当前提现额度' + this.cashMinLimit + '-' + this.cashLimit + '元范围内',
                    showCancel:false
                })
            }else{
                wx.navigateTo({
                    url: '../f_tocash/f_tocash?allNum=' + this.allNum
                })
            }
        },
        detail(){
            wx.navigateTo({
                url: '../f_tocashdetail/f_tocashdetail'
            })
        }
    }
}
</script>

<style scoped>
.f_yue_tips{
    position: absolute;
    top:526rpx;
    left:151rpx;
    height:42rpx;
    width:448rpx;
    line-height: 42rpx;
    font-size: 28rpx;
    color:#888888;
    text-align: center;
}
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
    overflow: hidden;
}
.container .content{
    height:100%;
    background:#f2f2f2;
    overflow: hidden;
    position: relative;
}
/* .f_tips{
    height:28rpx;
    color:#888888;
    font-size:28rpx;
    line-height: 28rpx;
    margin-top:36rpx;
    padding-left:30rpx;
}
.f_tips_num{
    display: inline-block;
    height:28rpx;
    line-height: 28rpx;
    font-size:28rpx;
    color:#1D1E26;
} */
.container .content .yue{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height:150rpx;
    margin-top:30rpx;
    background: #fff;
    box-sizing: border-box;
    border-top:1rpx solid #e5e5e5;
    border-bottom:1rpx solid #e5e5e5;
}
.container .content .yue .txt{
    font-size: 32rpx;
    height: 32rpx;
    line-height: 32rpx;
    margin-left:30rpx;
    font-weight: 600;
    color:#333;
}
.container .content .yue .price{
    font-size:46rpx;
    height: 46rpx;
    line-height: 46rpx;
    color:#262626;
    margin-right:30rpx;
}
.container .content .detail{
    height: 88rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top:26rpx;
    background: #fff;
    border-top:1rpx solid #e5e5e5;
    box-sizing:border-box;
}
.container .content .detail .txt{
    font-size:32rpx;
    height: 32rpx;
    line-height: 32rpx;
    color:#333;
    margin-left:30rpx;
}
.container .content .detail .arrow{
    height: 48rpx;
    width:36rpx;
    margin-right:30rpx;
}
.container .content .cash{
    margin-top:50rpx;
    height:98rpx;
    width:100%;
    background: #f2f2f2;
    position: relative;
}
.container .content .cash .btn{
    height: 94rpx;
    width:670rpx;
    border-radius: 10rpx;
    border:2rxp solid rgba(5,5,5,0.08);
    font-size:36rpx;
    position: absolute;
    top:0;
    left:50%;
    margin-left:-335rpx;
    text-align: center;
    color:#fff;
}
.container .content .cash .ban{
    background: #a7a8ab;
}
.container .content .cash .pick{
    background: #363841;
}

.container .no-yue{
    height:100%;
    position: relative;
}
.container .no-yue .img{
    position: absolute;
    top:200rpx;
    left:50%;
    margin-left:-100rpx;
    width:200rpx;
    height:200rpx;
}
.container .no-yue .txt{
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
</style>
