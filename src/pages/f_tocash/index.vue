<template>
  <view class="container">
      <view class="content">
        <view class="top">您的余额为<view class="num">{{allNum}}</view>元（提现金额只能为整数）</view>
        <view class="middle">
            <view class="txt">金额</view>
            <input class="inp" placeholder="当前提现额度为{{cashMinLimit}}-{{cashLimit}}元" auto-focus placeholder-style="font-size:32rpx;color:#b2b2b2;line-height:88rpx;height:88rpx;" type="number" @input="bindblur" value="{{inputTxt}}"/>
        </view>
        <view class="comfirm">
            <button class="btn ban" wx:if="{{!isInput}}">确认提现</button>
            <button class="btn pick" wx:else @tap="toCash">确认提现</button>
        </view>
      </view>
  </view>
</template>

<script>
export default {
    config: {
        "navigationBarTitleText": "余额提现"
    },
    data () {
        return {
            isInput:false,
            allNum:0,
            inputTxt:'',
            cashMinLimit:'',
            cashLimit:''
        }
    },
    onLoad(){
        //获取我的余额
        var that = this
        wx.request({
            url: that.$root.apiServer + that.$root.appid + that.$root.variate + '/basic/client/distribution/user/requestUserBalaDetail',
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
                    that.allNum = res.data.object.balaSum
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
    },
    methods:{
        bindblur(e){
            if(e.detail.value!=""){
                this.inputTxt = e.detail.value
                this.isInput = true
            }else{
                this.isInput = false
            }
        },
        toCash(){
            //提现接口
            var that =this
            if(that.inputTxt<that.allNum){
                if(that.inputTxt<that.cashMinLimit){
                    wx.showModal({
                        title: '提示',
                        content: '提现金额不能少于'+that.cashMinLimit,
                        showCancel:false
                    })
                }else if(that.inputTxt>that.cashLimit){
                    wx.showModal({
                        title: '提示',
                        content: '提现金额不能大于'+that.cashLimit,
                        showCancel:false
                    })
                }else{
                    wx.request({
                        url:that.$root.apiServer + that.$root.appid + that.$root.variate + '/basic/client/distribution/cash/cash',
                        data:{
                            token: that.$root.globalData.token,
                            cashAmount:that.inputTxt
                        },
                        method:"POST",
                            header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        success: function(res) {
                            if(res.data.code =="200"){
                                wx.showToast({
                                    title: '提现成功',
                                    icon: 'success',
                                    duration: 2000,
                                    mask:true,
                                    success:function(){
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
                                                    that.allNum = res.data.object.balaSum
                                                }
                                            }
                                        })
                                    }
                                })
                            }else{
                                wx.showToast({
                                    title: '提现失败',
                                    icon: 'success',
                                    duration: 2000,
                                    mask:true
                                })
                            }
                        }
                    })
                }
            }else{
                if(that.inputTxt<that.cashMinLimit || that.inputTxt>that.cashLimit){
                    wx.showModal({
                        title: '提示',
                        content: '您输入的金额不在当前提现额度' + that.cashMinLimit + '-' + that.cashLimit + '元范围内',
                        showCancel:false
                    })
                }else{
                    wx.showModal({
                        title: '提示',
                        content: '对不起，您的余额不足' + that.inputTxt + '元',
                        showCancel:false
                    })
                }
            }
        }
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
    overflow: hidden;
}
.container .content{
    height:100%;
    background:#f2f2f2;
    overflow: hidden;
    position: relative;
}
.container .content .top{
    height: 86rpx;
    line-height:86rpx;
    margin-left:30rpx;
    color:#888;
    font-size:28rpx;
}
.container .content .top .num{
    display: inline-block;
    color:#1D1E26 ;
}
.container .content .middle{
    height: 88rpx;
    background: #fff;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    border-top:1rpx solid #e5e5e5;
    border-bottom:1rpx solid #e5e5e5;
}
.container .content .middle .txt{
    font-size:32rpx;
    height: 32rpx;
    line-height: 32rpx;
    color:#333;
    margin-left:30rpx;
}
.container .content .middle .inp{
    height:88rpx;
    flex: 1;
    border:none;
    margin-left:116rpx;
    font-size:32rpx;
    line-height: 88rpx;
    color:#333;
}
.container .content .comfirm{
    margin-top:50rpx;
    height:98rpx;
    width:100%;
    background: #f2f2f2;
    position: relative;
}
.container .content .comfirm .btn{
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
.container .content .comfirm .ban{
    background: #a7a8ab;
}
.container .content .comfirm .pick{
    background: #363841;
}
</style>
