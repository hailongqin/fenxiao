<template>
  <view class="container">
    <view class="content" wx:for="{{systemLists}}">
        <view class="time">{{item.createTime}}</view>
        <view class="txt">
            <view class="top">{{item.title}}</view>
            <view class="bottom">{{item.content}}<view wx:if="{{item.showButton}}" class="check" @tap="setTuike(item.title, item.createTime, item.content,item.noticeId)">立即选择>></view></view>
        </view>
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
      systemLists:[]
    }
  },
  watch: {
    
  },
  computed: {
    
  },
  methods: {
    //事件处理函数
    setTuike(headTitel,firstTime,tuikeCon,noticeId){
        wx.navigateTo({
            url: '../f_settuike/f_settuike?headTitel=' + headTitel + '&firstTime=' + firstTime + '&tuikeCon=' + tuikeCon + '&noticeId=' + noticeId
		});
    }
  },
  onLoad(e){
    var type = e.type
    var that = this
    //请求type==1的消息列表
    
    wx.request({
        url:this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/notice/noticeList',
        data:{
            token:that.$root.globalData.token,
            type:1,
            pid:that.$root.globalData.pid
        },
        method:"GET",
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
            that.systemLists = res.data.object
        }
    })

    //更新消息状态已读
    wx.request({
        url:this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/notice/readNotice',
        data:{
            token:that.$root.globalData.token,
            type:1,
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
    overflow: scroll;
    padding-bottom:30rpx;
}
.container .content{
    min-height:100rpx;
}
.container .content .time{
    height: 24rpx;
    line-height: 24rpx;
    width:100%;
    margin-top:36rpx;
    font-size:24rpx;
    color:#999;
    text-align: center;
}
.container .content .txt{
    width:92%;
    background: #fff;
    border-radius: 8rpx;
    margin:30rpx auto 0;
}
.container .content .txt .top{
    height: 80rpx;
    line-height: 80rpx;
    margin-left:20rpx;
    width:100%;
    font-size:34rpx;
    color:#333;
}
.container .content .txt .bottom{
    min-height:42rpx;
    font-size: 34rpx;
    color:#666;
    line-height: 42rpx;
    white-space: pre-wrap;
    margin-left:20rpx;
    padding-bottom:20rpx;
}
.container .content .txt .bottom .check{
    display: inline-block;
    font-size:34rpx;
    color:#1cb43f;
}
</style>
