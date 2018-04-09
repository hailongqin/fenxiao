<template>
  <view class="container">
      <scroll-view scroll-y class="content" wx:if="{{tuikeLists.lowerNum > 0 && flag}}">
        <view class="total">
            <view class="txt">我的推客</view>
            <view class="price">{{tuikeLists.lowerNum}}人</view>
        </view>
        <view class="title">推客列表</view>
        <view class="level1" wx:for="{{tuikeLists.lowerUserList}}" wx:for-index="index" wx:for-item="itemName" wx:key = "index">
            <view class="level1-content" >
                <image class="left" src="{{itemName.headImg}}"></image>
                <view class="middle">
                    <view class="name">{{itemName.nickName}}</view>
                    <view class="time">成为推客时间：{{itemName.dealerDateStr}}</view>
                </view>
                <view class="right" @tap="toggle(index)" wx:if="{{itemName.lowerNum > 0}}">
                    <view class="num">{{itemName.lowerNum}}</view>
                    <view class="arrow">
                        <image class="t" src="http://image.vdongchina.com/M00/06/13/ZSUkmVoXviGEA3lDAAAAABQat40847.png" wx:if="{{itemName.choosed}}"></image>
                        <image class="b" src="http://image.vdongchina.com/M00/06/12/ZSUkmVoXvdKEJOjCAAAAAHU5mfI162.png" wx:else></image>
                    </view>
                </view>
            </view>

            <view class="level2" wx:if="{{itemName.choosed}}"  wx:for="{{itemName.lowerUserList}}" wx:for-index = "idx" wx:for-item="child"  wx:key = "index">
                <view class="level2-content" >
                    <image class="left" src="{{child.headImg}}"></image>
                    <view class="middle">
                        <view class="name">{{child.nickName}}</view>
                        <view class="time">成为推客时间：{{child.dealerDateStr}}</view>
                    </view>
                    <view class="right" @tap="toggle1(idx,index)" wx:if="{{child.lowerNum > 0}}">
                        <view class="num">{{child.lowerNum}}</view>
                        <view class="arrow">
                            <image class="t" src="http://image.vdongchina.com/M00/06/13/ZSUkmVoXviGEA3lDAAAAABQat40847.png" wx:if="{{child.choosed}}"></image>
                            <image class="b" src="http://image.vdongchina.com/M00/06/12/ZSUkmVoXvdKEJOjCAAAAAHU5mfI162.png" wx:else></image>
                        </view>
                    </view>
                </view>

                <view class="level3" wx:if="{{child.choosed}}" wx:for="{{child.lowerUserList}}" wx:for-item="item"  wx:key = "index">
                    <view class="level3-content">
                        <image class="left" src="{{item.headImg}}"></image>
                        <view class="middle">
                            <view class="name">{{item.nickName}}</view>
                            <view class="time">成为推客时间：{{item.dealerDateStr}}</view>
                        </view>
                        <view class="right">
                            
                        </view>
                    </view>
                </view>
            </view>
        </view>
      </scroll-view>
      <view class="no-tuike" wx:if="{{tuikeLists.lowerNum < 1 && flag}}">
          <image class="img" src="http://image.vdongchina.com/M00/06/12/ZSUkmVoXutiEBZT0AAAAACHpJYE041.png"></image>
          <view class="txt">暂无推客</view>
          <view class="txt1">如果您已是推客，那就赶紧去推广吧！ 马上有钱哦！</view>
      </view>
  </view>
</template>

<script>
export default {
  config: {
    navigationBarTitleText: "我的推客"
  },
  data() {
    return {
      flag: 0,
      tuikeLists: [],
      indexs: 0,
      idxs: 0
    };
  },
  onLoad() {
    var that = this;
    wx.showLoading({
      title: '正在拼命加载中',
    })
    //获取分销商个人信息--推客人数信息
    wx.request({
      url:this.$root.apiServer + this.$root.appid + this.$root.variate + "/basic/client/distribution/user/requestLowerLevelUser",
      data: {
        token: that.$root.globalData.token,
        pid:that.$root.globalData.pid
      },
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        if (res.data.code == 200) {
          wx.hideLoading()
          that.tuikeLists = res.data.object;
          that.flag = 1
        }else{
          wx.hideLoading()
          wx.showLoading({
            title: '网络出故障啦！',
          })
        }
      }
    });
  },
  methods: {
    toggle(index) {
      let tuikeLists = this.tuikeLists;
      if (tuikeLists.lowerUserList[index].choosed) {
        tuikeLists.lowerUserList[index].choosed = false;
      } else {
        tuikeLists.lowerUserList[index].choosed = true;
        for(var i=0; i<tuikeLists.lowerUserList.length; i++){
            if(i != index){
                tuikeLists.lowerUserList[i].choosed = false;
            }
        }
      }
      this.tuikeLists = tuikeLists;
    },
    toggle1(idx, index) {
      let tuikeLists = this.tuikeLists;
      if (tuikeLists.lowerUserList[index].lowerUserList[idx].choosed) {
        tuikeLists.lowerUserList[index].lowerUserList[idx].choosed = false;
      } else {
        tuikeLists.lowerUserList[index].lowerUserList[idx].choosed = true;
        for(var i=0; i<tuikeLists.lowerUserList[index].lowerUserList.length; i++){
            if(i != idx){
                tuikeLists.lowerUserList[index].lowerUserList[i].choosed = false;
            }
        }
      }
      this.tuikeLists = tuikeLists;
    }
  }
};
</script>

<style scoped>
page {
  height: 100%;
}
.left{
    float:none;
}
.right{
    float:none;
}
.container {
  height: 100%;
  background: #f2f2f2;
  overflow: hidden;
}
.container .content {
  height: 100%;
}
.container .total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 150rpx;
  background: #fff;
  box-sizing: border-box;
  border-bottom:1rpx solid #e5e5e5;
}
.container .total .txt {
  font-size: 32rpx;
  height: 32rpx;
  line-height: 32rpx;
  margin-left: 30rpx;
  font-weight: 600;
  color: #333;
}
.container .total .price {
  font-size: 46rpx;
  height: 46rpx;
  line-height: 46rpx;
  color: #262626;
  margin-right: 30rpx;
}
.container .title {
  height: 28rpx;
  font-size: 28rpx;
  color: #888;
  padding: 36rpx 0 22rpx 30rpx;
}
.container .level1 {
  min-height: 150rpx;
  margin-bottom: 30rpx;
  background: #fff;
  border:1rpx solid #e5e5e5;
}
.container .level1 .level1-content {
  height: 150rpx;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.container .level1 .level1-content .left {
  height: 90rpx;
  width: 90rpx;
  border-radius: 50%;
  margin-left: 30rpx;
  margin-right: 24rpx;
}
.container .level1 .level1-content .middle {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.container .level1 .level1-content .middle .name {
  font-size: 28rpx;
  height: 28rpx;
  line-height: 28rpx;
  margin-bottom: 16rpx;
  color: #262626;
}
.container .level1 .level1-content .middle .time {
  font-size: 28rpx;
  color: #535353;
  height: 28rpx;
  line-height: 28rpx;
}
.container .level1 .level1-content .right {
  width: 132rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container .level1 .level1-content .right .num {
  font-size: 36rpx;
  height: 36rpx;
  line-height: 36rpx;
  color: #999;
  margin-right: 2rpx;
}
.container .level1 .level1-content .right .arrow {
  height: 48rpx;
  width: 48rpx;
}
.container .level1 .level1-content .right .arrow .t {
  height: 100%;
  width: 100%;
}
.container .level1 .level1-content .right .arrow .b {
  height: 100%;
  width: 100%;
}
.container .level1 .level2 {
  min-height: 150rpx;
}
.container .level1 .level2 .level2-content {
  height: 150rpx;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(248, 248, 248, 0.9);
  border-top: 1rpx solid #e5e5e5;
}
.container .level1 .level2 .level2-content .left {
  height: 90rpx;
  width: 90rpx;
  border-radius: 50%;
  margin-left: 60rpx;
  margin-right: 24rpx;
  opacity: 1;
}
.container .level1 .level2 .level2-content .middle {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  opacity: 1;
}
.container .level1 .level2 .level2-content .middle .name {
  font-size: 28rpx;
  height: 28rpx;
  line-height: 28rpx;
  margin-bottom: 16rpx;
  color: #262626;
}
.container .level1 .level2 .level2-content .middle .time {
  font-size: 28rpx;
  color: #535353;
  height: 28rpx;
  line-height: 28rpx;
}
.container .level1 .level2 .level2-content .right {
  width: 132rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
}
.container .level1 .level2 .level2-content .right .num {
  font-size: 36rpx;
  height: 36rpx;
  line-height: 36rpx;
  color: #999;
  margin-right: 2rpx;
}
.container .level1 .level2 .level2-content .right .arrow {
  height: 48rpx;
  width: 48rpx;
}
.container .level1 .level2 .level2-content .right .arrow .t {
  height: 100%;
  width: 100%;
}
.container .level1 .level2 .level2-content .right .arrow .b {
  height: 100%;
  width: 100%;
}
.container .level1 .level2 .level3 {
  min-height: 150rpx;
  background: #fff;
}
.container .level1 .level2 .level3 .level3-content {
  height: 150rpx;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(248, 248, 248, 0.9);
  border-top: 1rpx solid #e5e5e5;
}
.container .level1 .level2 .level3 .level3-content .left {
  height: 90rpx;
  width: 90rpx;
  border-radius: 50%;
  margin-left: 90rpx;
  margin-right: 24rpx;
}
.container .level1 .level2 .level3 .level3-content .middle {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.container .level1 .level2 .level3 .level3-content .middle .name {
  font-size: 28rpx;
  height: 28rpx;
  line-height: 28rpx;
  margin-bottom: 16rpx;
  color: #262626;
}
.container .level1 .level2 .level3 .level3-content .middle .time {
  font-size: 28rpx;
  color: #535353;
  height: 28rpx;
  line-height: 28rpx;
}
.container .level1 .level2 .level3 .level3-content .right {
  width: 2rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container .no-tuike {
  height: 100%;
  position: relative;
}
.container .no-tuike .img {
  position: absolute;
  top: 200rpx;
  left: 50%;
  margin-left: -100rpx;
  width: 200rpx;
  height: 200rpx;
}
.container .no-tuike .txt {
  position: absolute;
  top: 440rpx;
  left: 0;
  width: 100%;
  text-align: center;
  height: 56rpx;
  line-height: 56rpx;
  font-size: 40rpx;
  color: #000;
}
.container .no-tuike .txt1 {
  position: absolute;
  top: 526rpx;
  left: 0;
  width: 476rpx;
  text-align: center;
  min-height: 42rpx;
  line-height: 42rpx;
  font-size: 28rpx;
  color: #888;
  padding: 0 137rpx;
}
</style>
