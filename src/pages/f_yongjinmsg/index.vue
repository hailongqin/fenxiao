<template>
  <view class="container">
    <view class="content" wx:for="{{commissionLists}}">
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
      "navigationBarTitleText": "佣金提示"
  },
  data () {
    return {
      avatarUrl:'',
      commissionLists:[     
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
    //请求type==4的消息列表
    wx.request({
        url:this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/notice/noticeList',
        data:{
            token:that.$root.globalData.token,
            type:3,
            pid:that.$root.globalData.pid
        },
        method:"GET",
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
            that.commissionLists = res.data.object
        }
    })

    //更新消息状态已读
    wx.request({
        url:this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/notice/readNotice',
        data:{
            token:that.$root.globalData.token,
            type:3,
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
    height:326rpx;
    position: relative;
}
.container .content .time{
    position: absolute;
    width:100%;
    left: 0;
    top:36rpx;
    font-size:24rpx;
    color:#999;
    text-align: center;
}
.container .content .txt{
    width:690rpx;
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
    margin:20rpx 0 18rpx 20rpx;
    width:100%;
    font-size:34rpx;
    color:#333;
    width:670rpx;
}
.container .content .txt .bottom{
    height: 126rpx;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom:20rpx;
}
.container .content .txt .bottom .img{
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
    white-space: pre-wrap;
}
</style>
