<template>
    <view class="page bor-t">
        <view class="top plr30 box-s " @tap='commentDetail'>
            <view class="ft28 c007 container">【帖子】{{followDetail.postTitle}}</view>
        </view>
        <view class="content box-s plr30 bor-b">
            <view class="c3 ft28 article">{{followDetail.followContent}}
            </view>
            <block wx:for="{{followDetail.imgList}}" wx:key="gg">
                <image class="article_imgs mt20" mode="widthFix" src="{{imgUrl+item}}"></image>
            </block>
        </view>
        <view class="audit ced3 ft26 plr30 box-s bg-wt" wx:if="{{followDetail.examineState == 2}}">您的跟帖已提交审核，请耐心等待审核结果</view>
        <view class="audits ft26 ced3 ft2 box-s bg-wt" wx:if="{{followDetail.examineState == 4}}">
            <view> 审核不通过原因：</view>{{followDetail.refuseReason}}</view>
        <view class="footer_bt display-flex" wx:if="{{followDetail.examineState == 4}}">
            <button class="revise ft28 white txt-c" @tap="reviseFollow(followDetail.followId)">修改</button>
            <button class="remove ft28 c007 txt-c" @tap="deleteFollow(followDetail.followId)">删除</button>
        </view>
    </view>
</template>

<script>
export default {
    config: {
        navigationBarTitleText: '帖子审核'
    },
    data() {
        return {
            followDetail: {},
            imgUrl: "",
            userId: ""
        }
    },
    onLoad(options) {
        this.imgUrl = this.$root.globalData.imgUrl
        var that = this
        that.userId = that.$root.globalData.userId

        that.$root.get("/basic/community/app/follow/" + options.followId, {}, function(data) {
            if (data.success) {
                that.postId = data.data.postId
                that.followDetail = data.data
            } else {
                wx.showToast({
                    title: "出错啦",
                    icon: 'loading',
                    duration: 2000
                })
            }

        })
    },
    methods: {
        reviseFollow(followId) {
            wx.redirectTo({
                url: '../reviseFollow/reviseFollow?id=' + followId
            })
        },
        commentDetail(id) {//帖子详情
            wx.redirectTo({
                url: '../topics/topics?id=' + this.postId,
            })
        },
        deleteFollow(followId) {
            // 删除跟帖
            var that = this
            wx.showModal({
                title: '提示',
                content: '确认删除跟帖',
                success: function(res) {
                    if (res.confirm) {
                        that.$root.post("/basic/community/app/follow/delete", { followId: followId, userId: that.userId }, function(data) {
                            if (data.success) {
                                wx.navigateBack({
                                    delta: 1
                                })
                            } else {
                                wx.showToast({
                                    title: "删除跟帖失败",
                                    icon: 'loading',
                                    duration: 2000
                                })
                            }
                        }, 1)
                    }
                    else if (res.cancel) {

                    }
                }
            })
        }
    }
}
</script>
<style scoped>
.page {
    background: #fafafa;
    min-height: 100vh;
    padding-bottom: 40rpx;
}

button {
    margin: 0;
}

.content {
    overflow: hidden;
    padding-top: 30rpx;
    padding-bottom: 30rpx;
}

.content_title {
    height: 50rpx;
    line-height: 50rpx;
}

.article {
    line-height: 40rpx;
}

.not_through {
    padding-top: 30rpx;
    padding-bottom: 30rpx;
}

.audit {
    height: 100rpx;
    line-height: 100rpx;
    box-shadow: 0 2rpx 4rpx 0 rgba(211, 211, 211, 0.50);
    -moz-box-shadow: 0 2rpx 4rpx 0 rgba(211, 211, 211, 0.50);
    -webkit-box-shadow: 0 2rpx 4rpx 0 rgba(211, 211, 211, 0.50);
}

.audits {
    padding: 30rpx;
}

article_imgs {
    width: 690rpx;
}

.footer_bt {

    width: 408rpx;
    margin: 0 auto;
    justify-content: space-between;
    margin-top: 22rpx;
}

.revise {
    width: 158rpx;
    height: 72rpx;
    line-height: 72rpx;
    background: #007aff;
    box-shadow: 0 2rpx 4rpx 0 rgba(7, 76, 152, 0.68);
    -moz-box-shadow: 0 2rpx 4rpx 0 rgba(7, 76, 152, 0.68);
    -webkit-box-shadow: 0 2rpx 4rpx 0 rgba(7, 76, 152, 0.68);
    border-radius: 4rpx;
    -moz-border-radius: 4rpx;
    -webkit-border-radius: 4rpx;
}

.remove {
    border: 1px solid #007aff;
    width: 158rpx;
    height: 72rpx;
    line-height: 72rpx;
    background: #fff;
    box-shadow: 0 2px 4px 0 rgba(178, 178, 178, 0.68);
    -moz-box-shadow: 0 2px 4px 0 rgba(178, 178, 178, 0.68);
    -webkit-box-shadow: 0 2px 4px 0 rgba(178, 178, 178, 0.68);
    border-radius: 4rpx;
    -moz-border-radius: 4rpx;
    -webkit-border-radius: 4rpx;
}

.top {
    height: 88rpx;
    line-height: 88rpx;
    background: #FAFAFA;
    box-shadow: 0 2px 4px 0 rgba(211, 211, 211, 0.50);
    -moz-box-shadow: 0 2px 4px 0 rgba(211, 211, 211, 0.50);
    -webkit-box-shadow: 0 2px 4px 0 rgba(211, 211, 211, 0.50);
    overflow: hidden;
}

.container {
    position: relative;
}

.container:before {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    right: 0;
    width: 0;
    height: 0;
    border: 8px solid;
    margin-top: -6px;
    border-color: transparent transparent transparent #007AFF;
}

.container:after {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    right: 1px;
    width: 0;
    height: 0;
    border: 8px solid;
    margin-top: -6px;
    border-color: transparent transparent transparent #FAFAFA;
}
</style>




