<template>
    <view class="page bor-t">
        <view class="content box-s plr30 bor-b bg-wt">
            <view class="content_title c3 ft36 mb20">{{postDetail.title}}</view>
            <view class="c3 ft28 article">{{postDetail.content}}
            </view>
            <block wx:for="{{postDetail.imgList}}" wx:key="gg">
                <image class="article_imgs mt20" mode="widthFix" src="{{imgUrl+item}}"></image>
            </block>

        </view>

        <view class="audit ced3 ft26 plr30 box-s bg-wt" wx:if="{{postDetail.examineState == 2}}">您的帖子已提交审核，请耐心等待审核结果</view>
        <view class="audits ft26 ced3 ft2 box-s bg-wt" wx:if="{{postDetail.examineState == 4}}"><view> 审核不通过原因：</view>{{postDetail.refuseReason}}</view>
        <view class="footer_bt display-flex" wx:if="{{postDetail.examineState == 4}}">
            <button class="revise ft28 white txt-c" @tap="revisePost(postDetail.postId)">修改</button>
            <button class="remove ft28 c007 txt-c" @tap="deletePost(postDetail.postId)">删除</button>
        </view>
    </view>
</template>

<script>
export default {
    config: {
        navigationBarTitleText: '主贴审核'
    },
    data() {
        return {
            postDetail: {},
            imgUrl: "",
            userId: ""
        }
    },
    onLoad(options) {
        this.imgUrl = this.$root.globalData.imgUrl
        var that = this
        that.userId = that.$root.globalData.userId
        that.$root.get("/basic/community/app/post/" + options.postId, {}, function(data) {
            if (data.success) {
                that.postDetail = data.data
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
        revisePost(postId) {
            wx.redirectTo({
                url: '../revisePost/revisePost?id='+postId
            })
        },
        deletePost(postId) {
            // 删除帖子
            var that = this
            wx.showModal({
                title: '提示',
                content: '确认删除帖子',
                success: function(res) {
                    if (res.confirm) {
                        that.$root.post("/basic/community/app/post/delete", { postId: postId }, function(data) {
                            if (data.success) {
                                wx.showToast({
                                    title: "删除帖子成功",
                                    icon: 'success',
                                    duration: 2000
                                })
                                that.hidden = false
                                that.dataList = []
                                that.isAll = false
                                that.page = 1
                                that.noData = false
                                GetDataList(that, "app/post/page")
                            } else {
                                wx.showToast({
                                    title: "删除帖子失败",
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
/* pages/commentAudit/commentAudit.wxss */

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
.audits{
    padding: 30rpx;
    line-height: 40rpx;
    box-shadow: 0 2rpx 4rpx 0 rgba(211, 211, 211, 0.50);
    -moz-box-shadow: 0 2rpx 4rpx 0 rgba(211, 211, 211, 0.50);
    -webkit-box-shadow: 0 2rpx 4rpx 0 rgba(211, 211, 211, 0.50);
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

.article_imgs {
    width: 100%;
}
</style>

