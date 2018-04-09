<template>
    <!--pages/topics/topics.wxml-->

    <view class="page">
        <view class="pos-f-t" @tap='commentDetail'>
            <view class="top plr30 box-s ">
                <view class="ft28 c007 container txt-ov">【帖子】{{topics.title}}</view>
            </view>
        </view>
        <view class="header box-s">
            <view class="user fl-l">
                <view class="user_avatar fl-l">
                    <image class="user_img" src="{{topics.userAvatarUrl}}"></image>
                </view>
                <view class="fl-l ft26 ml20">
                    <view class="user_name ">{{topics.userNickName}}
                        <text class="user_sign ft18 white txt-c ml20">楼主</text>
                    </view>
                    <view class="posted_time">{{topics.createTime}}</view>
                </view>
            </view>
            <view class="collect fl-r pos-r" @tap="collect(topics.isFavorite)" wx:if="{{topics.isFavorite}}">
                <text class="collect_title ft24 c9">取消收藏</text>
            </view>
            <view class="collect fl-r pos-r" @tap="collect(topics.isFavorite)" wx:else>
                <text class="append_symbol pos-a">+</text>
                <text class="collect_title ft24">收藏</text>
            </view>
        </view>
        <view class="content box-s">
            <view class="content_title c3 ft36 mb20">{{topics.title}}</view>
            <text class="c3 ft28 article">{{topics.content}}
            </text>
            <block wx:for="{{topics.imgList}}" wx:key="gg">
                <image class="article_imgs mt20" mode="widthFix" src="{{imgUrl+item}}"></image>
            </block>
            <view class="recommend_content_count display-flex">
                <view class="reply pos-r " @tap="invitationReply">
                    <image class="reply_image pos-a" style="width:24rpx;height24rpx;" src="http://image.vdongchina.com/M00/03/39/ZSUkmVngEjWEdHPjAAAAAJubMhE385.png" />
                    <text class="reply_count pos-r">{{topics.commentNum}}</text>
                </view>
                <view class="reply pos-r" @tap="invitationLike(topics.isPraise)">
                    <image class="reply_image pos-a" style="width:24rpx;height24rpx;" src="{{topics.isPraise ? 'http://image.vdongchina.com/M00/03/39/ZSUkmVngEjWEdHPjAAAAAJubMhE385.png':'http://image.vdongchina.com/M00/03/30/ZSUkmVnfFgKELyEdAAAAAOKScPE218.png'}}" />
                    <text class="reply_count pos-r">{{topics.praiseNum}}</text>
                </view>
            </view>

        </view>
        <view class="plr30 box-s">
            <view class="article_comments">
                <view class="article_comment box-s" wx:for="{{commentPage}}" wx:key="commentPage">
                    <view class="article_comment_content" wx:if="{{item.otherNickName}}">
                        <text class="comment_userName ft24 c007">{{item.userNickName}}</text>
                        <text class="ft24 c15">回复</text>
                        <text class="comment_userName ft24 c007">{{item.otherNickName}}：</text>
                        <text class="ft24 c15">{{item.commentContent}}</text>
                    </view>
                    <view class="article_comment_content" wx:else>
                        <text class="comment_userName ft24 c007">{{item.userNickName}}：</text>
                        <text class="ft24 c15">{{item.commentContent}}</text>
                    </view>
                    <view class="article_comment_time txt-right">
                        <text class="ft24 c9">{{item.createTime}}</text>
                        <text class="ft24 cd9 ml30" wx:if="{{userId == item.userId}}" @tap="removeComment(item.commentId)">删除</text>
                        <text class="ft24 c9"  wx:if="{{userId == item.userId}}"> · </text>
                        <text class="ft24 c007" @tap="invitationReply(item.userId,item.userNickName)">回复</text>
                    </view>
                </view>
            </view>
        </view>
        <view class="nolong ft20 c9 txt-c" wx:if="hidden">
            没有更多了
        </view>
        <view class="loadMore txt-c" wx:if="{{loadMore}}">
            <view class="loadMore_img">
                <image class="loadMore_iocn" src="http://image.vdongchina.com/M00/03/31/ZSUkmVnfH-iEQVrmAAAAAA3Z8b8673.png" /> </view>
            <view>加载更多</view>
        </view>
        <view class="top_button">
            <button @tap="top" class="comment_button_bt ft24 white pos-r">
                <image class="gentie_bt_img" src="http://image.vdongchina.com/M00/03/30/ZSUkmVnfFgKELyEdAAAAAOKScPE218.png"></image>顶部</button>
        </view>
    </view>
</template>

<script>
var GetList = function(that) { //请求跟帖列表

    that.$root.post("/basic/community/app/post/comment", { page: that.page, postId: that.postId, size: 10, currentUserId: that.userId }, (data) => {
        if (data.success) {
            that.loadMore = false
            var list = that.commentPage;
            if (that.page == 1) {
                that.topics = data.data
            }
            if (data.data.commentPage.list.length == 0) {
                return;
            } else {
                for (let i = 0; i < data.data.commentPage.list.length; i++) {
                    list.push(data.data.commentPage.list[i])    
                }
            }
            if (that.page == data.data.commentPage.pages) {
                that.isAll = true
            }
            that.commentPage = list
        } else {
            wx.showToast({
                title: '服务器出错了',
                icon: 'loading',
                duration: 2000
            })
        }

    }, 1)
}
export default {
     config: {
        navigationBarTitleText: '全部评论'
    },
    data() {
        return {
            topics: {},//帖子详情
            postId: '',//帖子id
            hidden: false,//没有更多
            page: 1,//当前页码
            Pullcount: 0,//是否可以下拉
            loadMore: false,//是否显示加载更多
            commentPage: [], //回复
            userId: '',
            isAll: false,
            imgUrl: ""
        }
    },
    onLoad(options) {
        this.imgUrl = this.$root.globalData.imgUrl
        var that = this
        that.postId = options.id
    },
    onShow(){
        this.hidden = false
        this.page = 1
        this.invitationList = []
        this.isAll = false
        this.noData = false
        var that = this
        that.commentPage = []
        that.userId = that.$root.globalData.userId
        GetList(that)
    },
    onReachBottom() {
        var that = this
        if (!that.isAll && that.Pullcount == 0) {
            that.page = that.page + 1
            that.loadMore = true
            GetList(that)
        } else {
            that.hidden = true
        }
    },
    onShareAppMessage(res) {
  
    return {
      title: '查看评论',
      path: '/page/commentDetail/commentDetail?id='+this.postId,
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
    methods: {
        top() {
            wx.pageScrollTo({
                scrollTop: 0//回到顶部
            })
        },
        invitationLike(isPraise) {
            var that = this,
                topic = that.topics;
            if (isPraise) { // 取消帖子点赞
                wx.showModal({
                    title: '提示',
                    content: '确认取消点赞',
                    success: function(res) {
                        if (res.confirm) {
                            that.$root.post("/basic/community/app/perfect/post/cancel", { userId: that.userId, postId: that.postId }, function(data) {
                                if (data.success) {
                                    wx.showToast({
                                        title: "取消点赞成功",
                                        icon: 'success',
                                        duration: 2000
                                    })
                                    topic.isPraise = !isPraise
                                    topic.praiseNum = topic.praiseNum - 1
                                    that.topics = topic
                                } else {
                                    wx.showToast({
                                        title: "取消点赞失败",
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
            } else { //帖子点赞
                that.$root.post("/basic/community/app/perfect/post/add", { userId: that.userId, postId: that.postId }, function(data) {
                    if (data.success) {
                        wx.showToast({
                            title: "点赞成功",
                            icon: 'success',
                            duration: 2000
                        })
                        topic.isPraise = !isPraise
                        topic.praiseNum = topic.praiseNum + 1
                        that.topics = topic
                    } else {
                        wx.showToast({
                            title: "点赞失败",
                            icon: 'loading',
                            duration: 2000
                        })
                    }
                }, 1)
            }

        },
        invitationReply(otherId, otherName) {
            if (otherId && otherName) {
                // 帖子回复
                wx.navigateTo({
                    url: '../reply/reply?id=' + this.postId + "&otherId=" + otherId + "&otherName=" + otherName,
                })
                return;
            }
            wx.navigateTo({ // 帖子评论
                url: '../reply/reply?id=' + this.postId
            })


        },
        removeComment(id) {
            // 删除回复

            var that = this
            wx.showModal({
                title: '提示',
                content: '确认删除回复',
                success: function(res) {
                    if (res.confirm) {
                        that.$root.post("/basic/community/app/comment/delete", { commentId: id }, function(data) {
                            if (data.success) {
                                wx.showToast({
                                    title: '删除成功',
                                    icon: 'success',
                                    duration: 2000
                                })
                                setTimeout(function() {
                                    that.hidden = false,//
                                        that.page = 1,//当前页码
                                        that.Pullcount = 0,//是否可以下拉
                                        that.loadMore = false,//是否显示加载更多
                                        that.commentPage = [],
                                        GetList(that)
                                }, 2000)

                            } else {
                                wx.showToast({
                                    title: '删除失败',
                                    icon: 'loading',
                                    duration: 2000
                                })
                            }
                        }, 1)
                    } else if (res.cancel) {

                    }
                }
            })

        },
        collect(isFavorite) {
            var that = this,
                topic = that.topics;
            if (isFavorite) { // 取消收藏
                wx.showModal({
                    title: '提示',
                    content: '确认取消收藏',
                    success: function(res) {
                        if (res.confirm) {
                            that.$root.post("/basic/community/app/favorites/cancel", { userId: that.userId, postId: that.postId }, function(data) {
                                if (data.success) {
                                    wx.showToast({
                                        title: "取消收藏成功",
                                        icon: 'success',
                                        duration: 2000
                                    })
                                    topic.isFavorite = !isFavorite
                                    that.topics = topic
                                } else {
                                    wx.showToast({
                                        title: "取消收藏失败",
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
            } else { //收藏
                that.$root.post("app/favorites/add", { userId: that.userId, postId: that.postId,currentUserId: that.userId }, function(data) {
                    if (data.success) {
                        wx.showToast({
                            title: "收藏成功",
                            icon: 'success',
                            duration: 2000
                        })
                        topic.isFavorite = !isFavorite
                        that.topics = topic
                    } else {
                        wx.showToast({
                            title: "收藏失败",
                            icon: 'loading',
                            duration: 2000
                        })
                    }
                }, 1)
            }


        },
         commentDetail(id) {//帖子详情
            wx.navigateTo({
                url: '../topics/topics?id=' + this.postId,
            })
        },
    }

}
</script>

<style scoped>
.page {
    padding-top: 90rpx;
}

.header,
.content {
    padding: 30rpx 20rpx;
}

.header {
    overflow: hidden;
}

.user {
    overflow: hidden;
}

.user_img {
    width: 76rpx;
    height: 76rpx;
    border-radius: 50%;
}

.user_name,
.posted_time {
    height: 37rpx;
    line-height: 37rpx;
}

.posted_time {
    color: #6D6D6D;
}

.user_sign {
    display: inline-block;
    width: 49rpx;
    height: 28rpx;
    line-height: 28rpx;
    background: #C7E2FB;
    border-radius: 4px;
    -moz-border-radius: 4rpx;
    -webkit-border-radius: 4rpx;
}

.collect {
    color: #3786EF;
    height: 33rpx;
    line-height: 33rpx;
    padding-bottom: 20rpx;
}

.append_symbol,
.collect_title {
    display: inline-block;
    height: 33rpx;
    line-height: 33rpx;
}

.append_symbol {
    top: 4rpx;
}

.collect_title {
    padding-left: 30rpx;
}



/*文章  */

.content {
    overflow: hidden;
}

.content_title {
    height: 50rpx;
    line-height: 50rpx;
}

.article {
    display: inline-block;
    width: 100%;
    line-height: 40rpx;
}


.recommend_content_count {
    float: right;
    margin-top: 26rpx;
    /* margin-bottom: 22rpx; */
}

.reply {
    padding: 10rpx 0;
    padding-left: 50rpx;
    height: 30rpx;
    line-height: 30rpx;
}

.reply_image {
    width: 30rpx;
    height: 30rpx;
    top: 16rpx;
    left: 16rpx;
}

.reply_count {
    display: inline-block;
    font-size: 26rpx;
    color: #979797;
    height: 30rpx;
    line-height: 30rpx;
}

.shuxian {
    width: 1px;
    height: 20rpx;
    background: #979797;
    border-radius: 1px;
    -moz-border-radius: 1px;
    -webkit-border-radius: 1px;
    /* margin-top: 10rpx;  */
    margin-left: 14rpx;
}


/*文章的评论  */

.article_comment {
    width: 100%;
    background: #FAFAFA;
    border-radius: 2px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    padding: 20rpx 30rpx;
    clear: both;
    line-height: 33rpx;
}

.look_more {
    height: 73rpx;
    line-height: 73rpx;
    background: #FAFAFA;
    padding: 0 30rpx;
}

.look_more_title {
    display: inline-block;
}

.article_comments {
    padding-bottom: 30rpx;
}



/*跟帖  */

.postContent {
    clear: both;
    padding-top: 20rpx;
}



/*跟帖按钮  */

.comment_button {
    position: fixed;
    width: 130rpx;
    height: 55rpx;
    line-height: 55rpx;
    bottom: 113rpx;
    right: 0;
}

.comment_button_bt {
    height: 55rpx;
    line-height: 55rpx;
    background: rgba(51, 149, 255, 0.8);
    padding-left: 30rpx;
    border-radius:0 134rpx 134rpx 0;
    padding-right: 0rpx;
}

.gentie_bt_img {
    position: absolute;
    top: 12rpx;
    left: 15rpx;
    width: 30rpx;
    height: 30rpx;
}

.top_button {
    position: fixed;
    width: 130rpx;
    height: 55rpx;
    line-height: 55rpx;
    bottom: 40rpx;
    right: 0;
}

.top {
    width: 100vw;
    z-index: 99;
    height: 88rpx;
    line-height: 88rpx;
    background: #FAFAFA;
    box-shadow: 0 2px 4px 0 rgba(211, 211, 211, 0.50);
    -moz-box-shadow: 0 2px 4px 0 rgba(211, 211, 211, 0.50);
    -webkit-box-shadow: 0 2px 4px 0 rgba(211, 211, 211, 0.50);
    overflow: hidden;
}

.top {
    /* width: 690rpx; */
    position: relative;
    background: #FAFAFA;
}

.top:before {
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

.top:after {
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

.container {
    width: 670rpx;
}
.article_imgs {
    width: 100%;
}
</style>

