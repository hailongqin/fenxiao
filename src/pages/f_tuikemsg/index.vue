<template>
  <view class="container">
    <view class="content" wx:for="{{twitterLists}}">
        <view class="time">{{item.createTime}}</view>
        <view class="txt">
            <view class="top">{{item.title}}</view>
            <view class="bottom">
                <image class="img" src="{{item.otherHeadImg}}"></image>
                <view class="tip">{{item.content}}</view>
            </view>
        </view>
    </view>
  </view>
</template>

<script>
export default {
  config: {
      "navigationBarTitleText": "推客信息"
  },
  data () {
    return {
      avatarUrl:'',
      twitterLists:[     
      ]
    }
  },
  watch: {
    
  },
  computed: {
    
  },
  methods: {
    //事件处理函数
    
  },
onLoad(e){
    var type = e.type 
    var that = this
    //请求type==3的消息列表
    wx.request({
        url:this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/notice/noticeList',
        data:{
            token:that.$root.globalData.token,
            type:4,
            pid:that.$root.globalData.pid
        },
        method:"GET",
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
            that.twitterLists = res.data.object
        }
    })


    //更新消息状态已读
    wx.request({
        url:this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/notice/readNotice',
        data:{
            token:that.$root.globalData.token,
            type:4,
            pid:that.$root.globalData.pid
        },
        method:"POST",
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
            if(res.data.code == 200){
                console.log("消息更新成功")
            }
        }
    })
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
  width:100%;
  height:100%;
  background: #f2f2f2;
  overflow: auto;
  padding-bottom:20rpx;
}
.container .content{
    height:284rpx;
    position: relative;
}
.container .content .time{
    position: absolute;
    width:100%;
    left: 0;
    top:36rpx;
    font-size:24rpx;
    height: 24rpx;
    line-height: 24rpx;
    color:#999;
    text-align: center;
}
.container .content .txt{
    width:690rpx;
    height:200rpx;
    position: absolute;
    top:84rpx;
    left:50%;
    margin-left:-345rpx;
    background: #fff;
    border-radius: 8rpx;
}
.container .content .txt .top{
    height: 42rpx;
    line-height: 42rpx;
    width:670rpx;
    font-size:34rpx;
    color:#333;
    margin:20rpx 0 18rpx 20rpx;
}
.container .content .txt .bottom{
    height: 100rpx;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom:20rpx;
}
.container .content .txt .bottom .img{
    display: block;
    height: 100rpx;
    width:100rpx;
    border-radius: 50%;
    margin:0 20rpx;
}
.container .content .txt .bottom .tip{
    flex:1;
    font-size:34rpx;
    color:#535353;
    line-height: 42rpx;
    height:84rpx;
    white-space: pre-wrap;
}
</style>
