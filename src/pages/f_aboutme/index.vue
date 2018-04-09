<template>
  <view class="container">
      <view class="name">
          <view class="left">推荐人：</view>
          <view class="right">{{aboutCon.pNickName}}</view>
      </view>
      <view class="time">
          <view class="left">成为推客时间：</view>
          <view class="right">{{aboutCon.dealerDateStr}}</view>
      </view>
      <view class="myYongjin">
          <view class="left">我享受的佣金比：</view>
          <view class="right">
              <view>一级{{aboutCon.dCommLevelDetail.fComm}}%</view>
              <view>二级{{aboutCon.dCommLevelDetail.sComm}}%</view>
              <view>三级{{aboutCon.dCommLevelDetail.tComm}}%</view>
          </view>
      </view>
      <view class="myYongjin">
          <view class="left">分销内购佣金比：</view>
          <view class="right">
              <view>我{{aboutCon.dCommLevelDetail.fComm}}%</view>
              <view>上级{{aboutCon.dCommLevelDetail.sComm}}%</view>
              <view>上上级{{aboutCon.dCommLevelDetail.tComm}}%</view>
          </view>
      </view>
  </view>
</template>

<script>
export default {
    config: {
        "navigationBarTitleText": "关于我"
    },
    data () {
        return {
            aboutCon:''
        }
    },
    onLoad(){
        var that = this
        //获取分销商个人信息
        wx.request({
            url: that.$root.apiServer + that.$root.appid + that.$root.variate + '/basic/client/distribution/user/requestFUserInfo',
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
                    that.aboutCon = res.data.object
                }
            }
        })
    },
    methods:{
        
    }
}
</script>

<style scoped>
page{
    height:100%;
}
.container{
    height:100%;
    background: #f2f2f2;
    overflow: hidden;
}
.left{
    float:none;
}
.right{
    float:none;
}
.container .name{
    min-height:146rpx;
    display: flex;
    justify-content: flex-start;
    box-sizing: border-box;
    padding-left:30rpx;
    align-items: center;
}
.container .name .left{
    font-size:32rpx;
    color:#333;
    line-height: 32rpx;
    height:32rpx;
}
.container .name .right{
    font-size:32rpx;
    color:#333;
    line-height: 32rpx;
    height:32rpx;
}
.container .time{
    height:32rpx;
    display: flex;
    justify-content: flex-start;
    box-sizing: border-box;
    padding-left:30rpx;
    align-items: center;
}
.container .time .left{
    font-size:32rpx;
    color:#262626;
    line-height: 32rpx;
    height:32rpx;
}
.container .time .right{
    font-size:32rpx;
    color:#262626;
    line-height: 32rpx;
    height:32rpx;
}
.container .myYongjin{
    min-height:32rpx;
    display: flex;
    justify-content: flex-start;
    box-sizing: border-box;
    padding-left:30rpx;
    align-items: flex-start;
    margin-top:56rpx;
}
.container .myYongjin .left{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    font-size:32rpx;
    line-height: 40rpx;
    color:#262626;
}
.container .myYongjin .right{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    font-size:32rpx;
    line-height: 40rpx;
    color:#262626;
}
</style>
