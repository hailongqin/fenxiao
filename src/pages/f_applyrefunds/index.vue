<template>
  <view class="container">
      <view class="content">
        <view class="top">最多可退还<view class="num">{{nickPrice}}.00元</view></view>
        <view class="middle">
            <view class="txt">金额</view>
            <input class="inp" placeholder="请输入退款金额" auto-focus @input="bindblur" type="number" />
        </view>
        <view class="comfirm">
            <button class="btn ban" wx:if="{{!isInput}}">申请退款</button>
            <button class="btn pick" wx:else @tap="toCash">申请退款</button>
        </view>
      </view>
  </view>
</template>

<script>
export default {
    config: {
        "navigationBarTitleText": "申请退款"
    },
    data () {
        return {
            nickPrice:123,
            isInput:false
        }
    },
    onLoad(e){
        var that = this
        
    },
    methods:{
        bindblur(e){
            console.log(e.detail.value)
            if(e.detail.value!=""){
                this.inputtxt = e.detail.value
                this.isInput = true
            }else{
                this.isInput = false
            }
        },
        toCash(){
            //提现接口
            wx.showToast({
                title: '成功',
                icon: 'success',
                mask:true,
                duration: 2000
            })
        }
    }
}
</script>

<style scoped>
page{
    height:100%;
}
.container{
    height:100%;
    overflow: hidden;
}
.left{
    float:none;
}
.right{
    float:none;
}
.container .content{
    height:100%;
    background:#f2f2f2;
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
    height: 86rpx;
    background: #fff;
    display: flex;
    justify-content: flex-start;
    align-items: center;
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
    height:86rpx;
    flex: 1;
    border:none;
    margin-left:116rpx;
    font-size:32rpx;
    line-height: 88rpx;
    color:#333;
}
.container .content .middle .inp:placeholder{
    font-size:32rpx;
    color:#b2b2b2;
    line-height:88rpx;
    height:88rpx;
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
