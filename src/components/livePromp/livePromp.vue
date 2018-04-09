<template>
<!-- <view> -->
    <view class="liveIndex" wx:if="{{show && examine}}">
        <view class="liveIndex_box">
            <view class="living">
                <text class="text"></text>直播中
            </view>
            <view class="living_text">
              <view class="living-gallery" animation="{{animationData}}" style="left:450rpx;">
                <block wx:for="{{title}}" wx:key="index">
                  <text class="create" @tap="goDetails" data-id="{{item.prevueId}}">{{item.title}}</text>
                </block>
              </view>
            </view>
            <view class="living_go" @tap="goLive">点击进入</view>
        </view>
    </view>
<!-- <view> -->
</template>

<script> 
export default {
    data () {
        return {
            animationData:{},
            titleDetail:'',
            titleId:0,
            setInter:null,
            show:false,
            examine:false,
            userId:'',
            title:[]
        }
    },
    async onLoad(){
        var that = this;
        await this.$root.login()
        await this.$root.liveLogin()
        this.$root.get("/basic/live/app/special/getSpecial", {},function(data){//审核判断
            if(data.code == 126000){
                if(data.object.examine == 1){//正在审核
                    that.examine = false
                }else{
                    that.examine = true
                }
                
            }
        })
    },
    onShow(){
        // this.liveLogin(getApp().globalData.openid)
        this.listLiveTitle();

    },
    onHide(){
        clearInterval(this.setInter);
        var animation = wx.createAnimation({
                timingFunction: 'linear',
                transformOrigin : '0 100%'
            })
        animation.left('450rpx').step({duration: 0})
        this.animation = animation;
        this.animationData = animation.export()
    },
    onUnload(){
        clearInterval(this.setInter);
    },
    methods: {
        move(k){
            console.log('m')
            var animation = wx.createAnimation({
                timingFunction: 'linear',
                transformOrigin : '0 100%'
            })
            animation.left((-700*k)+'rpx').step({duration: 10000*k})
            animation.left('450rpx').step({duration: 0})
            this.animation = animation;
            this.animationData = animation.export()
        },
        goLive(){
            wx.navigateTo({
                url: '../liveList/liveList'
            })
        },
        goDetails(e){
          wx.navigateTo({
              url: '../liveDetail/liveDetail?prevueId='+e.currentTarget.dataset.id+'&index=1'
          })
        },
        liveLogin(openid){
            var that = this;
            wx.getUserInfo({
                success: (res) => {
                    console.log('liveLogin',res)
                    var userInfo = res.userInfo
                    getApp().globalData.nickName = userInfo.nickName
                    getApp().globalData.avatarUrl = userInfo.avatarUrl
                    wx.request({
                        url:that.$root.apiServer+that.$root.appid+'/basic/live/app/user/login',
                        data:{
                            nickName:userInfo.nickName,
                            avatarUrl:userInfo.avatarUrl,
                            openId:openid
                        },
                        method: 'POST',
                        header: {'Content-Type': 'application/x-www-form-urlencoded'},
                        success: function (res) {
                            console.log('login')
                            if(res.data.success){
                                getApp().globalData.liveUserid = res.data.data.userId;
                                that.listLiveTitle();
                            }
                        }
                    })
                }
            })
        },
        listLiveTitle(){
            var that = this;
                wx.request({
                    url: that.$root.apiServer+that.$root.appid+'/basic/live/app/prevue/listLiveTitle',
                    method: 'GET',
                    header: {'content-type': 'application/json'},
                    success: function (res) {
                        console.log('listLiveTitle',res)
                        if(res.data.success){
                            that.title = res.data.data;
                            var l = that.title.length;
                            if(l>0){
                                that.show = true;
                                var i = 0;
                                var setInter = that.setInter;
                                setInter = setInterval(() => {
                                    i++
                                    if(i > 1){
                                        that.show = false;
                                        clearInterval(that.setInter);
                                    }
                                    that.move(l)
                                }, 10000*l+500)
                                that.setInter = setInter
                                setTimeout(function(){
                                    that.move(l)
                                },200)
                            }else{
                                that.show = false;
                            }
                        }else{
                            that.show = false;
                        }
                    }
                })
        }
    }
}
</script>

<style>
.liveIndex{width:100%;height:60rpx;padding:5rpx 20rpx;box-sizing:border-box;position:fixed;left:0;top:0;z-index:99999;}
.liveIndex_box{width:100%;height:50rpx;background: #FFFFFF;box-shadow: 0 4px 6px 0 rgba(229,102,156,0.15);border-radius: 32rpx;}
.living{width:114rpx;height:50rpx;background-image: linear-gradient(90deg, #FF4665 0%, #EA48C7 100%);border-radius: 32rpx;font-size:24rpx;color:#fff;line-height:50rpx;padding-left:30rpx;position:relative;box-sizing: border-box;float:left;}
.living .text{width:10rpx;height:10rpx;border-radius:50%;background-color:#fff;display:inline-block;position:absolute;left:10rpx;top:20rpx;}
.living_text{float:left;width:440rpx;height:50rpx;font-size: 28rpx;color: #666666;line-height:50rpx;overflow: hidden;}
.living_go{float:right;font-size: 24rpx;color: #666666;line-height:50rpx;}
.create{line-height: 50rpx;width: 700rpx;display:inline-block;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
.living-gallery{position: relative;top:0;left:440rpx;height: 50rpx;white-space:nowrap;-webkit-animation-iteration-count: infinite;}
.living_go:after{content: ''; display: inline-block; margin-right: 24rpx; border-right: 4rpx solid #999999; border-bottom: 4rpx solid #999999; width:12rpx; height: 12rpx; transform: rotate(-45deg);}
</style>
