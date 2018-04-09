<template>
  <view class="container">
      <view class="head">{{headTitel}}</view>
      <view class="time">{{firstTime}}</view>
      <view class="content">{{tuikeCon}}</view>
      <radio-group class="radio-group" @change="radioChange">
        <label class="radio" wx:for="{{tuikeLists}}">
            <view class="left">
                <image class="img" src="{{item.headImg}}"></image>{{item.nickName}}
            </view>
            <radio class="right" value="{{item.nickName}}"/>
        </label>
      </radio-group>
      <view class="comfirm">
        <button class="btn ban" wx:if="{{!isInput}}">成为推客</button>
        <button class="btn pick" wx:else @tap="toTuike(pId)">成为推客</button>
      </view>
  </view>
</template>

<script>
export default {
    config: {
        "navigationBarTitleText": "系统消息"
    },
    data () {
        return {
            isInput:0,
            inputTxt:'',
            tuikeLists:[],

            headTitel:'',
            firstTime:'',
            tuikeCon:'',
            noticeId:'',

            pId:''
        }
    },
    onLoad(e){
        var that = this
        that.headTitel = e.headTitel
        that.firstTime = e.firstTime
        that.tuikeCon = e.tuikeCon
        that.noticeId = e.noticeId
        wx.request({
            url: this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/DUser2Distributor/listDistribution',
            data: {
                token:that.$root.globalData.token,
                pid:that.$root.globalData.pid
            },
            method: "POST",
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
                if(res.data.code == "200") {
                    that.tuikeLists = res.data.object
                }
            }
        })
    },
    methods:{
        radioChange(e){
            console.log(e)
            var that = this 
            if(e.detail.value != ""){
                that.isInput = 1
                that.inputTxt = e.detail.value
                for(var i=0; i<that.tuikeLists.length; i++){
                    if(that.inputTxt == that.tuikeLists[i].nickName){
                        that.pId = that.tuikeLists[i].openId
                    }
                }
            }else{
                that.isInput = 0
            }
        },
        toTuike(id){
            var that = this
            wx.showModal({
                title: '提示',
                content: '确定后不能再次更改推荐人',
                success: function(res) {
                    if (res.confirm) {
                        // console.log('用户点击确定')
                        wx.request({
                            url: that.$root.apiServer + that.$root.appid + that.$root.variate + '/basic/client/distribution/DUser2Distributor/toDistributor',
                            data: {
                                token:that.$root.globalData.token,
                                pid:id,
                                noticeId:that.noticeId,
                                pid:that.$root.globalData.pid
                            },
                            method: "POST",
                            header: {
                                'content-type': 'application/x-www-form-urlencoded'
                            },
                            success: function(res) {
                                if(res.data.code == "200"){
                                    //保存成功后返回上一页
                                    wx.navigateBack({
                                        delta: 1
                                    })
                                }else{
                                    wx.showToast({
                                        title: "推客保存失败",
                                        icon: 'loading',
                                        mask:true,
                                        duration: 2000
                                    })
                                }
                            }
                        })
                    } else if (res.cancel) {
                        // console.log('用户点击取消')
                    }
                }
            })
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
}
.container .head{
    margin-top:40rpx;
    height:67rpx;
    line-height: 67rpx;
    font-size:48rpx;
    color:#000;
    margin-left:30rpx;
}
.container .time{
    height:36rpx;
    line-height: 36rpx;
    font-size:30rpx;
    color:#999;
    margin:16rpx 0 43rpx 30rpx;
}
.container .content{
    min-height:50rpx;
    line-height: 50rpx;
    font-size:34rpx;
    color:#222;
    margin:0 30rpx 40rpx 30rpx;
}
.container .radio-group{
    min-height:150rpx;
    box-sizing: border-box;
    padding:0 30rpx;
    margin-bottom:50rpx;
}
.container .radio-group .radio{
    height:150rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size:28rpx;
    font-weight: 600;
    color:#333;
    box-sizing: border-box;
    border-bottom:1rpx solid #e5e5e5;
}
.container .radio-group .radio .left{
    flex:1;
    margin-left:40rpx;
    height:100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size:28rpx;
    color:#333;
    font-weight: 600;
}
.container .radio-group .radio .left .img{
    width:90rpx;
    height: 90rpx;
    display: block;
    border-radius: 50%;
    margin-right:24rpx;
}
.container .radio-group .radio .right{
    width:50rpx;
    height:50rpx;
    margin-right:28rpx;
}
.container .comfirm{
    margin-top:50rpx;
    height:98rpx;
    width:100%;
    background: #fff;
    position: relative;
    
}
.container .comfirm .btn{
    height: 94rpx;
    width:670rpx;
    border-radius: 10rpx;
    border:1rxp solid rgba(5,5,5,0.08);
    font-size:36rpx;
    position: absolute;
    top:0;
    left:50%;
    margin-left:-335rpx;
    text-align: center;
    color:#fff;
}
.container .comfirm .ban{
    background: #a7a8ab;
}
.container .comfirm .pick{
    background: #363841;
}
</style>
