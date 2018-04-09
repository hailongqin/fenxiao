<template>
    <!--pages/topics/topics.wxml-->

    <view class="page">
        <view wx:if="{{!postDelete}}">
            <view>
                <view class="header box-s">
                    <view class="user fl-l">
                        <view class="user_avatar fl-l">
                            <image class="user_img" src="{{topics.userAvatarUrl}}"></image>
                        </view>
                        <view class="fl-l ft26 ml20">
                            <view class="user_name ovfl">
                                <text class="fl-l"> {{topics.userNickName}}</text>
                                <text class="user_sign ft18 white txt-c ml20 fl-l">楼主</text>
                            </view>
                            <view class="posted_time">{{topics.createTime}}</view>
                        </view>
                    </view>
                    <view class="collect fl-r pos-r" @tap="collect(topics.isFavorite)" wx:if="{{topics.isFavorite}}">
                        <text class="collect_title ft26 c9 ">取消收藏</text>
                    </view>
                    <view class="collect fl-r pos-r ovfl" @tap="collect(topics.isFavorite)" wx:else>
                        <text class="append_symbol pos-a fl-l">+</text>
                        <text class="collect_title ft26 fl-l">收藏</text>
                    </view>
                </view>
                <view class="content box-s">
                    <view class="content_title c3 ft36 mb20">{{topics.title}}</view>
                    <text class="c3 ft28 article">{{topics.content}}
                    </text>
                    <block wx:for="{{topics.imgList}}" wx:key="gg">
                        <image class="article_imgs mt20" mode="widthFix" src="{{imgUrl+item}}"></image>
                    </block>
                    <view class="recommend_content_count display-flex" style="margin-bottom: 0;">
                        <view class="reply pos-r " @tap="invitationReply">
                            <image class="reply_image pos-a" src="http://image.vdongchina.com/M00/03/39/ZSUkmVngEjWEdHPjAAAAAJubMhE385.png" />
                            <text class="reply_count pos-r">{{topics.commentNum}}</text>
                        </view>
                        <view class="reply pos-r" @tap="invitationLike(topics.isPraise)">
                            <image class="reply_image pos-a" src="{{topics.isPraise ? 'http://image.vdongchina.com/M00/03/3A/ZSUkmVngGD2EBbZXAAAAAB7Na_A083.png':'http://image.vdongchina.com/M00/03/3A/ZSUkmVngGA2EBo5sAAAAAK-oToo931.png'}}" />
                            <text class="reply_count pos-r">{{topics.praiseNum}}</text>
                        </view>
                    </view>

                </view>
                <view class="plr30 box-s">
                    <view class="article_comments">
                        <view class="article_comment box-s" wx:for="{{topics.commentPage.list}}" wx:key="commentPage">
                            <view class="article_comment_content" wx:if="{{item.otherNickName}}">
                                <text class="comment_userName ft26 c007">{{item.userNickName}}</text>
                                <text class="ft26 c15">回复</text>
                                <text class="comment_userName ft26 c007">{{item.otherNickName}}：</text>
                                <text class="ft26 c15">{{item.commentContent}}</text>
                            </view>
                            <view class="article_comment_content" wx:else>
                                <text class="comment_userName ft26 c007">{{item.userNickName}}：</text>
                                <text class="ft26 c15">{{item.commentContent}}</text>
                            </view>
                            <view class="article_comment_time txt-right">
                                <text class="ft26 c9 mr30">{{item.createTime}}</text>
                                <text class="ft26 cd9" wx:if="{{userId == item.userId}}" @tap="removeComment(item.commentId)">删除</text>
                                <text class="ft26 c9" wx:if="{{userId == item.userId}}"> · </text>
                                <text class="ft26 c007" @tap="invitationReply(item.userId,item.userNickName)">回复</text>
                            </view>
                        </view>
                        <view class="look_more ft26 c86 " wx:if="{{commentPage.length>=5}}" @tap='invitationComment'>
                            <text class="look_more_title">查看全部评论</text>
                        </view>
                    </view>
                </view>

                <view class="header box-s" wx:for="{{followList}}" wx:key="followList">
                    <view class="user fl-l">
                        <view class="user_avatar fl-l">
                            <image class="user_img" src="{{item.userAvatarUrl}}"></image>
                        </view>
                        <view class="fl-l ft26 ml20">
                            <view class="user_name ">{{item.userNickName}}</view>
                            <view class="posted_time">{{item.createTime}}</view>
                        </view>
                    </view>
                    <view class="collect fl-r pos-r">
                        <text class="c9 ft26">{{index + 2}}楼</text>
                    </view>
                    <view class="postContent c3 ft28">{{item.followContent}}</view>
                    <block wx:for="{{item.imgList}}" wx:key="gg">
                        <image class="article_imgs mt20" mode="widthFix" src="{{imgUrl+item}}"></image>
                    </block>
                    <view class="recommend_content_count display-flex">
                        <view class="reply pos-r " @tap="followDelete(item.followId)" wx:if="{{userId == item.userId || userId == topics.userId}}">
                            <image class="reply_image pos-a" src="http://image.vdongchina.com/M00/03/3B/ZSUkmVngIpeEEZcVAAAAAGu63p4000.png" />
                            <text class="reply_count pos-r">删除</text>
                        </view>
                        <view class="reply pos-r " @tap="followReply(item.followId)">
                            <image class="reply_image pos-a" src="http://image.vdongchina.com/M00/03/39/ZSUkmVngEjWEdHPjAAAAAJubMhE385.png" />
                            <text class="reply_count pos-r">{{item.commentNum}}</text>
                        </view>
                        <view class="reply pos-r" @tap="followLike(item.isPraise,index,item.followId)">
                            <image class="reply_image pos-a" src="{{item.isPraise ? 'http://image.vdongchina.com/M00/03/3A/ZSUkmVngGD2EBbZXAAAAAB7Na_A083.png':'http://image.vdongchina.com/M00/03/3A/ZSUkmVngGA2EBo5sAAAAAK-oToo931.png'}}" />
                            <text class="reply_count pos-r">{{item.praiseNum}}</text>
                        </view>
                    </view>
                    <view class="article_comments">
                        <view class="article_comment box-s" wx:for="{{item.commentPage.list}}" wx:key="commentPage" wx:for-index="idx" wx:for-item="itemName">
                            <view class="article_comment_content" wx:if="{{itemName.otherNickName}}">
                                <text class="comment_userName ft26 c007">{{itemName.userNickName}}</text>
                                <text class="ft26 c15">回复</text>
                                <text class="comment_userName ft26 c007">{{itemName.otherNickName}}：</text>
                                <text class="ft26 c15">{{itemName.commentContent}}</text>
                            </view>
                            <view class="article_comment_content" wx:else>
                                <text class="comment_userName ft26 c007">{{itemName.userNickName}}：</text>
                                <text class="ft26 c15">{{itemName.commentContent}}</text>
                            </view>
                            <view class="article_comment_time txt-right">
                                <text class="ft26 c9 mr30">{{itemName.createTime}}</text>
                                <text class="ft26 cd9 " wx:if="{{userId == itemName.userId }}" @tap="removeComment(itemName.commentId)">删除</text>
                                <text class="ft26 c9" wx:if="{{userId == itemName.userId }}"> · </text>
                                <text class="ft26 c007" @tap="invitationReply(itemName.userId,itemName.userNickName,itemName.followId)"> 回复</text>
                            </view>
                        </view>
                        <view class="look_more ft26 c86 " wx:if="{{item.commentPage.list.length>=5}}">
                            <text class="look_more_title" @tap='folloewDetail(index,item.followId)'>查看全部评论</text>

                        </view>
                    </view>
                </view>
            </view>

        </view>

        <view class="ft20 c9 txt-c" wx:else style="width:100%;">
            <image class="noDataImg" src="http://image.vdongchina.com/M00/03/39/ZSUkmVngD0iEeQ8BAAAAAF8Zfxw132.png" />
            <view class="ft32 c9 txt-c">该内容已被系统删除</view>
        </view>
        <view class="nolong ft20 c9 txt-c" wx:if="{{hidden}}">
            没有更多了
        </view>
        <view class="loadMore txt-c" wx:if="{{loadMore}}">
            <view class="loadMore_img">
                <image class="loadMore_iocn" src="http://image.vdongchina.com/M00/03/31/ZSUkmVnfH-iEQVrmAAAAAA3Z8b8673.png" /> </view>
            <view>加载更多</view>
        </view>
        <view class="comment_button"  @tap="follow">
            <button class="comment_button_bt ft26 white pos-r">
                <image class="gentie_bt_img" src="http://image.vdongchina.com/M00/03/30/ZSUkmVnfGAyENhOOAAAAAJlYREY472.png"></image> 跟帖</button>
        </view>
        <view class="top_button" @tap="top">
            <button class="comment_button_bt ft26 white pos-r">
                <image class="gentie_bt_img" src="http://image.vdongchina.com/M00/03/3B/ZSUkmVngJMaEDIvwAAAAAO-NoZs733.png"></image>顶部</button>
        </view>
    </view>
</template>
<script>
var GetList = function(that) { //请求跟帖列表
    that.$root.post("/basic/community/app/post/follow", { page: that.page, postId: that.postId, size: 10, currentUserId: that.userId }, (data) => {
        if (data.success) {
            that.loadMore = false
            if (data.data.state == 2) {
                that.postDelete = true
                return;
            }
            var list = that.followList;
            
            if ( that.page == 1) {
                that.onsho = true
                that.topics = data.data
                that.commentPage = data.data.commentPage.list
            }
            for (let i = 0; i < data.data.followPage.list.length; i++) {
                list.push(data.data.followPage.list[i])
            }

            if (that.page == data.data.followPage.pages + 1) {
                that.isAll = true
            }
            that.followList = list
        } else {
            if (data == "html-default:java.lang.IllegalArgumentException: 主贴[" + that.postId + "]不存在") {
                that.postDelete = true
                return;
            }
            if (data.message == "主贴[" + that.postId + "]不存在") {
                that.postDelete = true
                return;
            } else {
                wx.showToast({
                    title: '服务器出错了',
                    icon: 'loading',
                    duration: 2000
                })
            }

        }

    }, 1)
}
export default {
    config: {
        navigationBarTitleText: '帖子'
    },
    data() {
        return {
            topics: {},//帖子详情
            postId: '',//帖子id
            followList: [],//跟帖
            hidden: false,//没有更多
            page: 1,//当前页码
            Pullcount: 0,//是否可以下拉
            loadMore: false,//是否显示加载更多
            commentPage: [], //回复
            userId: '',
            isAll: false,
            imgUrl: "",
            postDelete: false,
            onsho:false//首次数据是否加载完成
        }
    },
    onLoad(options) {
        var openid = this.$root.globalData.openid
        this.imgUrl = this.$root.globalData.imgUrl
        var that = this
        that.postId = options.id
        that.userId = that.$root.globalData.userId

    },
    onShow() {
        var that = this;
        that.followList = [],//跟帖
            that.hidden = false,//
            that.page = 1,//当前页码
            that.Pullcount = 0,//是否可以下拉
            that.loadMore = false,//是否显示加载更多
            that.commentPage = [],
            that.isAll = false
            that.onsho = false
            GetList(that)
            
    },
    onReachBottom() {
        var that = this
        if (!that.isAll && that.Pullcount == 0 && that.onsho) {
            that.page = that.page + 1
            that.loadMore = true
            GetList(that)
        } else {
            that.hidden = true
        }
    },
    onShareAppMessage(res) {

        return {
            title: '帖子详情',
            path: '/pages/topics/topics?id=' + this.postId,
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
        invitationComment() {
            // 查看帖子全部评论
            wx.navigateTo({
                url: '../commentDetail/commentDetail?id=' + this.postId
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
        followLike(isPraise, index, followId) {
            var that = this,
                followLis = that.followList;
            if (isPraise) { // 跟帖取消点赞
                wx.showModal({
                    title: '提示',
                    content: '确认取消点赞',
                    success: function(res) {
                        if (res.confirm) {
                            that.$root.post("/basic/community/app/perfect/follow/cancel", { userId: that.userId, followId: followId }, function(data) {
                                if (data.success) {
                                    wx.showToast({
                                        title: "取消点赞成功",
                                        icon: 'success',
                                        duration: 2000
                                    })
                                    followLis[index].isPraise = !isPraise
                                    followLis[index].praiseNum = followLis[index].praiseNum - 1
                                    that.followList = followLis
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
            } else { //跟帖点赞
                that.$root.post("/basic/community/app/perfect/follow/add", { userId: that.userId, followId: followId }, function(data) {
                    if (data.success) {
                        wx.showToast({
                            title: "点赞成功",
                            icon: 'success',
                            duration: 2000
                        })
                        followLis[index].isPraise = !isPraise
                        followLis[index].praiseNum = followLis[index].praiseNum + 1
                        that.followList = followLis
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
        invitationReply(otherId, otherName, types) {
            // 跟帖回复
            if (types && otherId && otherName) {
                wx.navigateTo({
                    url: '../reply/reply?id=' + this.postId + "&otherId=" + otherId + "&otherName=" + otherName + "&followId=" + types,
                })
                return;
            }
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
        followReply(followId) {  //跟帖评论
            wx.navigateTo({
                url: '../reply/reply?followId=' + followId + "&id=" + this.postId
            })
        },
        follow() { //跟帖
            wx.navigateTo({
                url: '../comment/comment?id=' + this.postId
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
                                    that.followList = [],//跟帖
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
                that.$root.post("/basic/community/app/favorites/add", { userId: that.userId, postId: that.postId }, function(data) {
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
        folloewDetail(index, followId) {
            // 跟帖全部评论
            wx.navigateTo({
                url: '../followDetail/followDetail?id=' + this.postId + "&followId=" + followId + "&index=" + index
            })

        },
        followDelete(followId) {
            var that = this //删除跟帖
            wx.showModal({
                title: '提示',
                content: '确认删除跟帖',
                success: function(res) {
                    if (res.confirm) {
                        that.$root.post("/basic/community/app/follow/delete", { followId: followId, userId: that.userId }, function(data) {
                            if (data.success) {
                                wx.showToast({
                                    title: "删除跟帖成功",
                                    icon: 'success',
                                    duration: 2000
                                })
                                that.followList = [],//跟帖
                                    that.hidden = false,//
                                    that.page = 1,//当前页码
                                    that.Pullcount = 0,//是否可以下拉
                                    that.loadMore = false,//是否显示加载更多
                                    that.commentPage = []
                                GetList(that)
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


.posted_time {
    height: 37rpx;
    line-height: 37rpx;
}

.user_name {
    padding: 4rpx 0;
}

.user_name .fl-l {
    height: 28rpx;
    line-height: 28rpx;
    /* margin:5rpx 0; */
}

.posted_time {
    color: #6D6D6D;
}

.user_sign {
    display: inline-block;
    width: 60rpx;
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




/* .append_symbol {
    top: 4rpx;
} */

.collect_title {
    padding-left: 30rpx;
}













/*文章  */

.content {
    overflow: hidden;
}

.content_title {
    line-height: 50rpx;
}

.article {
    line-height: 40rpx;
    display: inline-block;
    width: 100%;
}

.article_imgs {
    width: 100%;
}

.recommend_content_count {
    float: right;
    margin-top: 26rpx;
    margin-bottom: 22rpx;
}

.recommend_content_count:first-child {
    margin-bottom: 0;
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
    top: 8rpx;
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

.mr30 {
    margin-right: 30rpx;
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
    border-bottom: 1px solid #D8D8D8;
    clear: both;
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
    left: 0;
    padding:10rpx;
    padding-left: 0px;
}

.comment_button_bt {
	width:100%;
    height: 55rpx;
    line-height: 55rpx;
    background: rgba(51, 149, 255, 0.8);
    padding-left: 30rpx;
    border-radius: 0 134rpx 134rpx 0;
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
    left: 0;
}
</style>

