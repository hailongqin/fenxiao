<template>
    <view class="page">
        <view class="pos-f-t">
            <view class="top plr30 box-s" @tap="lookPost(topics.postId)">
                <view class="ft28 c007 container">【帖子】{{topics.title}}</view>
            </view>
        </view>
        <view class="lookDetail_list bg-wt" wx:for="{{followList}}" wx:key="followList">
            <view class="header box-s">
                <view class="user fl-l">
                    <view class="user_avatar fl-l">
                        <image class="user_img" src="{{item.userAvatarUrl}}"></image>
                    </view>
                    <view class="fl-l ft26 ml20">
                        <view class="user_name ">{{item.userNickName}}
                        </view>
                        <view class="posted_time">{{item.createTime}}</view>
                    </view>
                </view>
                <view class="collect fl-r pos-r">
                    <text class="c9 ft24">{{2+index}}楼</text>
                </view>
            </view>
            <view class="content box-s">
                <text class="c3 ft28 article">{{item.followContent}}
                </text>
                <block wx:for="{{item.imgList}}" wx:key="gg">
                    <image class="article_imgs mt20" mode="widthFix" src="{{imgUrl+item}}"></image>
                </block>
                <view class="recommend_content_count display-flex">
                    <view class="reply pos-r ">
                        <image class="reply_images pos-a"  src="http://image.vdongchina.com/M00/03/2F/ZSUkmVnfEvuEK5kZAAAAAEjhK-A783.png" />
                        <text class="reply_count pos-r" @tap="lookFollow(item.followId)">查看</text>
                        <view class="test c9 pos-a">·</view>
                    </view>

                    <view class="reply pos-r">
                        <image class="reply_image pos-a" src="http://image.vdongchina.com/M00/03/3B/ZSUkmVngIpeEEZcVAAAAAGu63p4000.png" />
                        <text class="reply_count pos-r" @tap="deleteFollow(item.followId)">删除</text>
                    </view>
                </view>
            </view>

        </view>
        <view class="top_button">
            <button @tap="top" class="comment_button_bt ft24 white pos-r">
                <image class="gentie_bt_img" src="http://image.vdongchina.com/M00/03/3B/ZSUkmVngJMaEDIvwAAAAAO-NoZs733.png"></image>顶部</button>
        </view>
        <view class="ft20 c9 txt-c" wx:if="{{noData}}">
            <image class="noDataImg" src="http://image.vdongchina.com/M00/03/39/ZSUkmVngD0iEeQ8BAAAAAF8Zfxw132.png" />
            <view class="ft32 c9 txt-c">暂无相关内容</view>
        </view>
        <view class="nolong ft20 c9 txt-c" wx:if="{{hidden}}">
            没有更多了
        </view>
        <view class="loadMore txt-c" wx:if="{{loadMore}}">
            <view class="loadMore_img">
                <image class="loadMore_iocn"src="http://image.vdongchina.com/M00/03/31/ZSUkmVnfH-iEQVrmAAAAAA3Z8b8673.png" /> </view>
            <view>加载更多</view>
        </view>

    </view>
</template>

<script>
var GetList = function(that) { //请求跟帖列表
    that.$root.post("/basic/community/app/post/follow", { page: that.page, postId: that.postId, size: 10, currentUserId: that.userId }, (data) => {
        if (data.success) {
            that.loadMore = false
            var list = that.followList;
            if (that.page == 1) {
                that.topics = data.data
            }
            if (data.data.followPage.list.length == 0 && that.page == 1) {
                that.noData = true
                return
            } else {
                for (let i = 0; i < data.data.followPage.list.length; i++) {
                    list.push(data.data.followPage.list[i])
                }
            }
            if (that.page == data.data.followPage.pages) {
                that.hidden = true
                that.isAll = true
            }
            // if ( Math.ceil(data.data.length/10)  === that.page) {
            //     that.isAll = true

            // }
            // for (let i = 0; i < list.length; i++) {
            //     list[i].createTime = date(new Date(list[i].createTime))
            // }
            that.followList = list
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
        navigationBarTitleText: '查看跟帖'
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
            noData: false
        }
    },
    onLoad(options) {
        this.imgUrl = this.$root.globalData.imgUrl
        var that = this
        that.postId = options.id
        that.userId = that.$root.globalData.userId 

    },
    onShow() {
        var that = this;
        that.followList = [],//跟帖
            that.hidden = false,//
            that.noData = false,
            that.page = 1,//当前页码
            that.Pullcount = 0,//是否可以下拉
            that.loadMore = false,//是否显示加载更多
            that.commentPage = [],
            that.isAll = false
        GetList(that)
    },
    methods: {
        lookPost(postId) {
            wx.navigateTo({
                url: '../topics/topics?id=' + postId,
            })

        },
        lookFollow(followId) {
            var that = this
                wx.navigateTo({
                    url: '../followDetail/followDetail?id=' + that.postId +"&followId=" + followId,
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
                        that.$root.post("/basic/community/app/follow/delete", { followId: followId ,userId:that.postId}, function(data) {
                            if (data.success) {
                                that.hidden = false
                                that.followList = []
                                that.isAll = false
                                that.page = 1
                                that.noData = false
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
        },
        top() {
            wx.pageScrollTo({
                scrollTop: 0//回到顶部
            })
        },
    }
}
</script>

<style scoped>
.page{
    background: #fafafa;
    padding-top: 90rpx;
    min-height: 100vh;
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
    display:inline-block;
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
    border-bottom: 1px solid #D8D8D8;
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
    position: fixed;
    width: 750rpx;
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

.test {
    right: -28rpx;
    top: 6rpx;
}


.lookDetail_list {
    margin-top: 12rpx;
    box-shadow: 0 2rpx 4rpx 0 rgba(211, 211, 211, 0.50);
    -moz-box-shadow: 0 2rpx 4rpx 0 rgba(211, 211, 211, 0.50);
    -webkit-box-shadow: 0 2rpx 4rpx 0 rgba(211, 211, 211, 0.50);
}
</style>


