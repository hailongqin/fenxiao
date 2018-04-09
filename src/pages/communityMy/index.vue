<template>
    <!--pages/my/my.wxml-->
    <view class="page">
        <view class="navLists box-s">
            <view class="nav display-flex">
                <view class="{{navIndex == index ? 'navList ft26 c3 navChecked pos-r' :'navList ft26 c3 pos-r'}} " wx:for="{{navList}}" wx:key="navList" @tap="navClick(index)">
                    {{item.navName}}({{item.count}})
                    <view class="pos-a dot" wx:if="{{index == 3 && (item.count > 0 || item.count =='...') && (unreadMessage !=0 || unreadComment !=0)}}"></view>
                </view>
            </view>
        </view>

        <!--我的收藏  -->

        <view class="collect box-s bg-wt mb20" wx:if="{{navIndex == 2}}" wx:for="{{dataList}}" wx:key="collectzList">
            <view class="collect_list bg-wt">
                <view class="collect_time ft26 c6"> 发布于{{item.post.createTime}}</view>
                <view class="collect_comment display-flex bor-b" @tap="lookPost(item.postId,1,item.state)">
                    <image class="collect_comment_image" src="{{imgUrl+item.post.coverImg}}"></image>
                    <view class="collect_comment_content">
                        <view class="collect_comment_title ft28 c3 txt-ov">{{item.post.title}}</view>
                        <text class="collect_comment_intro ft26 c9 txt-wrap">{{item.post.content}}
                        </text>
                        <view class="recommend_content_count display-flex">
                            <view class="reply pos-r ">
                                <image class="reply_image pos-a" src="http://image.vdongchina.com/M00/03/39/ZSUkmVngEjWEdHPjAAAAAJubMhE385.png" />
                                <text class="reply_count pos-r">{{item.post.commentNum}}</text>
                            </view>
                            <view class="shuxian" />
                            <view class="reply pos-r">
                                <image class="reply_image pos-a" style="width:26rpx;height:23rpx;" src="http://image.vdongchina.com/M00/03/30/ZSUkmVnfFgKELyEdAAAAAOKScPE218.png" />
                                <text class="reply_count pos-r">{{item.post.followNum}}</text>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="cancel_collect">
                    <button class="cancel_collect_bt txt-c ft28 c9" @tap="cancelCollectz(item.postId)">取消收藏</button>
                </view>
            </view>
        </view>

        <!--我的跟帖  -->
        <view class="" wx:if="{{navIndex == 1}}">
            <view class="thread bg-wt plr30 box-s mb20" wx:for="{{dataList}}" wx:key="followList">
                <view class="thread_list  bor-b" @tap="lookFollow(item.postId,item.followId,item.examineState)">
                    <view class="thread_comment_content word-wrap ft28 c3 mb20">{{item.followContent}}</view>
                    <view class=" thread_comment_title ft26 c9">所在帖子：{{item.postTitle}}</view>
                </view>

                <view class="thread_state display-flex ">
                    <view class="thread_time ft26 c6">{{item.createTime}}
                        <text class=" ml20 ced3" wx:if="{{item.examineState == 4}}">审核不通过</text>
                        <text class=" ml20 c9" wx:if="{{item.examineState == 2}}">审核中</text>
                    </view>
                    <view class="display-flex">
                        <image class="thread_img " src="http://image.vdongchina.com/M00/03/30/ZSUkmVnfFgKELyEdAAAAAOKScPE218.png" wx:if="{{item.examineState == 4||item.examineState == 2}}" @tap="lookFollow(item.postId,item.followId,item.examineState)"></image>
                        <image class="thread_img" src="http://image.vdongchina.com/M00/03/3B/ZSUkmVngIpeEEZcVAAAAAGu63p4000.png" @tap="deleteFollow(item.followId)"></image>
                    </view>

                </view>
            </view>
        </view>

        <!--我的帖子  -->
        <view class="">
            <view class="collect box-s bg-wt mb20" wx:if="{{navIndex == 0}}" wx:for="{{dataList}}" wx:key="postList">
                <view class="collect_list bg-wt">
                    <view class="collect_time ft26 c6"> 发布与{{item.createTime}}</view>
                    <view class="collect_comment display-flex bor-b" @tap="lookPost(item.postId,item.examineState,item.state)">
                        <image class="collect_comment_image" src="{{imgUrl+item.coverImg}}"></image>
                        <view class="collect_comment_content">
                            <view class="collect_comment_title ft28 c3 txt-ov">{{item.title}}</view>
                            <text class="collect_comment_intro ft26 c9 txt-wrap">{{item.content}}
                            </text>
                            <view class="recommend_content_count display-flex">
                                <view class="reply pos-r ">
                                    <image class="reply_image pos-a" src="http://image.vdongchina.com/M00/03/30/ZSUkmVnfFgKELyEdAAAAAOKScPE218.png" />
                                    <text class="reply_count pos-r">{{item.followNum}}</text>
                                </view>
                                <view class="shuxian" />
                                <view class="reply pos-r">
                                    <image class="reply_image pos-a" style="width:26rpx;height:23rpx;" src="http://image.vdongchina.com/M00/03/39/ZSUkmVngEjWEdHPjAAAAAJubMhE385.png" />
                                    <text class="reply_count pos-r">{{item.commentNum}}</text>
                                </view>
                            </view>
                        </view>
                    </view>
                    <view class="cancel_collect display-flex">
                        <view class="display-flex">
                            <button class="cancel_collect_bt on txt-c ft28 c9" wx:if="{{item.examineState == 1||item.examineState == 3}}" @tap="lookFollowList(item.postId)">查看跟帖</button>
                            <button class="cancel_collect_bt txt-c ft28 c9" wx:if="{{item.examineState == 1||item.examineState == 3}}" @tap="lookDeleteFollow(item.postId)">已删除跟帖</button>
                            <button class="cancel_collect_bt on txt-c ft28 c9" wx:if="{{item.examineState == 2 ||item.examineState == 4}}" @tap="lookPost(item.postId,item.examineState,item.state)">查看</button>
                            <text class="ft26 c9 auditStatus" wx:if="{{item.examineState == 2}}">审核中</text>
                            <text class="ft26 ced3 auditStatus" wx:if="{{item.examineState == 4}}">审核不通过</text>
                        </view>
                        <view class="remove_comment">
                            <image class="thread_img" @tap="deletePost(item.postId)" src="http://image.vdongchina.com/M00/03/3B/ZSUkmVngIpeEEZcVAAAAAGu63p4000.png"></image>
                        </view>
                    </view>
                </view>

            </view>
        </view>

        <!--我的消息  -->
        <view class="message" wx:if="{{navIndex == 3}}">
            <view class="message_nav display-flex">
                <view class=" {{messageIndex == 0 ? 'reply_message ft28 c007 on' :'reply_message ft26 c6'}}" @tap="messageNav(0)">
                    <text class="reply_message_title">提及回复</text>
                    <text class="reply_message_border"></text>
                </view>
                <view class=" {{messageIndex == 1 ? 'reply_message ft28 c007 on' :'reply_message ft26 c6'}}" @tap="messageNav(1)">
                    <text class="reply_message_title">系统消息</text>
                    <text class="reply_message_border"></text>
                </view>
            </view>
            <!--回复消息  -->
            <view class="">
                <view class="thread bg-wt plr30 box-s mb20" wx:if="{{messageIndex == 0}}" wx:for="{{dataList}}" wx:key="messageList">
                    <view class="thread_list  bor-b" @tap="commentLookPost(item.postId,item.examineState,item.state,item.commentId,index)">
                        <view class=" {{item.commentRead == 2 ? 'thread_comment_content word-wrap ft28 c3 mb20':'thread_comment_content word-wrap ft28 c9 mb20'}}">
                            <text class="c007">{{item.userNickName}}</text>
                            <text> 回复 </text>
                            <text class="c007">{{nickName}}</text>
                            {{item.commentContent}}</view>
                        <view class=" thread_comment_title ft26 c9">所在帖子：{{item.postTitle}}</view>
                    </view>

                    <view class="thread_state display-flex ">
                        <view class="thread_time ft26 c6">{{item.createTime}}</view>
                        <view class="display-flex" wx:if="{{item.followId}}" @tap="invitationReply(item.userId,item.userNickName,item.followId,0,item.postId,item.commentId,index)">
                            <image class="thread_img" src="http://image.vdongchina.com/M00/03/39/ZSUkmVngEjWEdHPjAAAAAJubMhE385.png"></image>
                        </view>
                        <view class="display-flex" wx:else @tap="invitationReply(item.userId,item.userNickName,item.postId,1,0,item.commentId,index)">
                            <image class="thread_img" src="http://image.vdongchina.com/M00/03/39/ZSUkmVngEjWEdHPjAAAAAJubMhE385.png"></image>
                        </view>
                    </view>
                </view>
            </view>
            <!--系统消息  -->
            <view class="" wx:if="{{messageIndex == 1}}">
                <view wx:for="{{dataList}}" wx:key="sysList">
                    <view>
                        <view wx:if="{{item.}}" wx:if="{{item.postType == 1}}">
                            <view class="ft26 c9 txt-c">{{item.createTime}}</view>
                            <view class="thread bg-wt plr30 box-s mb20">
                                <view class="thread_list  bor-b" @tap="msgLookPost(item.extra.postId,item.examineType,item.extra.state,item.sysMessageId,index)">
                                    <view class="{{item.messageRead == 2 ?'thread_comment_content word-wrap ft28 c3':'thread_comment_content word-wrap ft28 c9'}}">{{item.extra.title}}</view>
                                </view>

                                <view class="thread_state display-flex " wx:if="{{item.messageType == 2}}" >
                                    <view class="{{item.examineType == 1 ? 'thread_time ft26 c1b':'thread_time ft26 ced3'}}">您的帖子{{item.examineType == 1 ? '审核通过':'审核不通过'}}</view>
                                    <view class="display-flex" wx:if="{{item.examineType == 1}}" @tap="msgLookPost(item.extra.postId,item.examineType,item.extra.state,item.sysMessageId,index)">
                                        <image class="look_img ml20" src="http://image.vdongchina.com/M00/03/2F/ZSUkmVnfEvuEK5kZAAAAAEjhK-A783.png"></image>
                                    </view>
                                    <view class="display-flex" wx:else>
                                        <!-- <image class="thread_img " src="http://image.vdongchina.com/M00/03/30/ZSUkmVnfFgKELyEdAAAAAOKScPE218.png" wx:if="{{item.examineState == 4 || item.examineState == 2}}" @tap="revisePost(item.postId)"></image> -->
                                        <image class="thread_img" src="http://image.vdongchina.com/M00/03/3B/ZSUkmVngIpeEEZcVAAAAAGu63p4000.png"  @tap="deteleSycMessage(item.sysMessageId,index)"></image>
                                    </view>
                                </view>
                                <view class="thread_state display-flex " wx:if="{{item.messageType == 1}}">
                                    <view class="thread_time ft26 ced3">您的帖子已被{{item.extra.delPerson == 1?'系统':'自己'}}删除</view>
                                    <view class="display-flex" @tap="deteleSycMessage(item.sysMessageId,index)">
                                        <image class="thread_img" src="http://image.vdongchina.com/M00/03/3B/ZSUkmVngIpeEEZcVAAAAAGu63p4000.png"></image>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                    <view>
                        <view wx:if="{{item.postType == 2}}">
                            <view class="ft26 c9 txt-c">{{item.createTime}}</view>
                            <view class="thread bg-wt plr30 box-s mb20">
                                <view class="thread_list  bor-b" @tap="msgLookFollow(item.extra.postId,item.extra.followId,item.extra.state,item.sysMessageId,index,item.examineType)">
                                    <view class="{{item.messageRead == 2 ?'thread_comment_content word-wrap ft28 c3 mb20':'thread_comment_content word-wrap ft28 c9 mb20'}}">{{item.extra.followContent}}</view>
                                    <view class=" thread_comment_title ft26 c9">所在帖子：{{item.extra.postTitle}}</view>
                                </view>

                                <view class="thread_state display-flex " wx:if="{{item.messageType == 2}}" >
                                    <view class="{{item.examineType == 1 ? 'thread_time ft26 c1b':'thread_time ft26 ced3'}}">您的跟帖{{item.examineType == 1  ? '审核通过':'审核不通过'}}</view>
                                    <view class="display-flex" wx:if="{{item.examineType == 1}}" @tap="msgLookFollow(item.extra.postId,item.extra.followId,item.extra.state,item.sysMessageId,index,item.examineType)">
                                        <image class="look_img ml20" src="http://image.vdongchina.com/M00/03/2F/ZSUkmVnfEvuEK5kZAAAAAEjhK-A783.png"></image>
                                    </view>
                                    <view class="display-flex" wx:else>
                                        <!-- <image class="thread_img " src="http://image.vdongchina.com/M00/03/30/ZSUkmVnfFgKELyEdAAAAAOKScPE218.png" wx:if="{{item.examineState == 4 || item.examineState == 2}}" @tap="reviseFollow(item.extra.followId)"></image> -->
                                        <image class="thread_img" src="http://image.vdongchina.com/M00/03/3B/ZSUkmVngIpeEEZcVAAAAAGu63p4000.png"  @tap="deteleSycMessage(item.sysMessageId,index)"></image>
                                    </view>

                                </view>
                                <view class="thread_state display-flex " wx:if="{{item.messageType == 1}}">
                                    <view class="thread_time ft26 ced3">您的跟帖已被{{item.extra.delPerson == 1?'系统':'自己'}}删除</view>
                                    <view class="display-flex" @tap="deteleSycMessage(item.sysMessageId,index)">
                                        <image class="thread_img" src="http://image.vdongchina.com/M00/03/3B/ZSUkmVngIpeEEZcVAAAAAGu63p4000.png"></image>
                                    </view>

                                </view>
                            </view>
                        </view>
                    </view>
                    <view wx:if="{{item.postType == 3}}">
                        <view class="ft26 c9 txt-c">{{item.createTime}}</view>
                        <view class="thread bg-wt plr30 box-s mb20">
                            <view class="thread_list  bor-b" @tap="msgLookComment(item.extra.postId,item.extra.commentId,item.extra.state,item.sysMessageId,index,item.examineType)">
                                <view class="{{item.messageRead == 2 ?'thread_comment_content word-wrap ft28 c3 mb20':'thread_comment_content word-wrap ft28 c9 mb20'}}">{{item.extra.commentContent}}</view>
                                <view class=" thread_comment_title ft26 c9">所在帖子：{{item.extra.postTitle}}</view>
                            </view>

                            <view class="thread_state display-flex " wx:if="{{item.messageType == 2}}" >
                                <view class="{{item.examineType == 1 ? 'thread_time ft26 c1b':'thread_time ft26 ced3'}}">您的评论{{item.examineType == 1 ? '审核通过':'审核不通过'}}</view>
                                <view class="display-flex" wx:if="{{item.examineType == 1}}" @tap="msgLookComment(item.extra.postId,item.extra.commentId,item.extra.state,item.sysMessageId,index,item.examineType)">
                                    <image class="look_img ml20" src="http://image.vdongchina.com/M00/03/2F/ZSUkmVnfEvuEK5kZAAAAAEjhK-A783.png"></image>
                                </view>
                                 <view class="display-flex" wx:else>
                                        <!-- <image class="thread_img " src="http://image.vdongchina.com/M00/03/30/ZSUkmVnfFgKELyEdAAAAAOKScPE218.png" wx:if="{{item.examineState == 4 || item.examineState == 2}}" @tap="reviseComment(item.extra.commentId)"></image> -->
                                        <image class="thread_img" src="http://image.vdongchina.com/M00/03/3B/ZSUkmVngIpeEEZcVAAAAAGu63p4000.png"  @tap="deteleSycMessage(item.sysMessageId,index)"></image>
                                    </view>
                            </view>
                            <view class="thread_state display-flex " wx:if="{{item.messageType == 1}}">
                                <view class="thread_time ft26 ced3">您的评论已被{{item.extra.delPerson == 1?'系统':'自己'}}删除</view>
                                <view class="display-flex" @tap="deteleSycMessage(item.sysMessageId,index)">
                                    <image class="thread_img" src="http://image.vdongchina.com/M00/03/3B/ZSUkmVngIpeEEZcVAAAAAGu63p4000.png"></image>
                                </view>

                            </view>
                        </view>
                    </view>
                </view>

            </view>
        </view>
        <view class="ft20 c9 txt-c" wx:if="{{noData}}" style="width:750rpx;">
            <image class="noDataImg" src="http://image.vdongchina.com/M00/03/39/ZSUkmVngD0iEeQ8BAAAAAF8Zfxw132.png" />
            <view class="ft32 c9 txt-c">暂无相关内容</view>
        </view>
        <view class="nolong ft20 c9 txt-c" wx:if="{{hidden}}">
            没有更多了
        </view>
        <view class="loadMore txt-c" wx:if="{{loadMore}}">
            <view class="loadMore_img">
                <image class="loadMore_iocn" src="http://image.vdongchina.com/M00/03/31/ZSUkmVnfH-iEQVrmAAAAAA3Z8b8673.png" />
            </view>
            <view>加载更多</view>
        </view>
    </view>
</template>

<script>

var GetDataList = function(that, url) { //请求列表
    that.$root.get(url, { page: that.page, size: 10, userId: that.userId }, (data) => {
        that.loadMore = false
        let list = that.dataList;
        if (data.data.list.length == 0 && that.page == 1) {
            that.noData = true
            return
        } else {
            for (let i = 0; i < data.data.list.length; i++) {
                list.push(data.data.list[i])
            }
        }
        if (that.page == data.data.pages) {
            that.isAll = true
        }
        // if ( Math.ceil(data.data.length/10)  === that.page) {
        //     that.isAll = true

        // }
        // for (let i = 0; i < list.length; i++) {
        //     list[i].createTime = date(new Date(list[i].createTime))
        // }
        that.dataList = list
    }, 1)
}
var ReadMessage = function(id, that) {
    that.$root.post("/basic/community/app/message/read", { sysMessageId: id }, function(data) {
        if (data.success) {
            GetNavList(that)
        }
    }, 1)//读取系统消息
}
var commentMessage = function(id, that) {
    that.$root.post("/basic/community/app/comment/read", { commentId: id }, function(data) {
        if (data.success) {
            GetNavList(that)
        }
    }, 1)//读取回复消息
}
var GetNavList = function(that) { //请求分类数据列表
    that.$root.get("/basic/community/app/message/countAllType", { userId: that.userId }, function(data) {
        var countLis = that.navList
        countLis[0].count = data.data.post >= 100 ? "..." : data.data.post
        countLis[1].count = data.data.follow >= 100 ? "..." : data.data.follow
        countLis[2].count = data.data.favorites >= 100 ? "..." : data.data.favorites
        countLis[3].count = (data.data.comment + data.data.message) >= 100 ? "..." : (data.data.comment + data.data.message)
        that.unreadComment = data.data.unreadComment
        that.unreadMessage = data.data.unreadMessage
        that.navList = countLis
    })
}
export default {
    config: {
        navigationBarTitleText: '我的帖子'
    },
    data() {
        return {
            navList: [{ navName: "我的帖子" }, { navName: "我的跟帖" }, { navName: "我的收藏" }, { navName: "我的消息" }],
            navIndex: 0,//导航索引
            messageIndex: 0,//默认消息
            page: 1,//收藏当前页码
            dataList: [],//收藏列表
            hidden: false,
            Pullcount: 0,
            loadMore: false,
            isAll: false,
            noData: false,
            imgUrl: '',
            userId: "",
            nickName: "",
            unreadMessage: 0,
            unreadComment: 0
        }
    },
    async onLoad() {
        await this.$root.login()
        var openid = this.$root.globalData.openid
        this.imgUrl = this.$root.globalData.imgUrl
        var that = this

        await this.$root.getUserInfo()

        that.hidden = false
        that.dataList = []
        that.isAll = false
        that.page = 1
        that.noData = false
        that.userId = that.$root.globalData.userId
        that.nickName = that.$root.globalData.nickName
        that.navIndex = 0        
        GetNavList(that)
        GetDataList(that, "/basic/community/app/post/page")

    },
    onShow() {
        var that = this
        GetNavList(that)

    },
    onReachBottom() {
        var that = this
        that.noData = false
        if (that.navIndex == 0) {
            if (!that.isAll && that.Pullcount == 0) {
                that.page = that.page + 1
                that.loadMore = true
                GetDataList(that, "/basic/community/app/post/page")
            } else {
                that.hidden = true
            }
        }
        if (that.navIndex == 1) {
            if (!that.isAll && that.Pullcount == 0) {
                that.page = that.page + 1
                that.loadMore = true
                GetDataList(that, "/basic/community/app/follow/page")
            } else {
                that.hidden = true
            }
        }
        if (that.navIndex == 2) {
            if (!that.isAll && that.Pullcount == 0) {
                that.page = that.page + 1
                that.loadMore = true
                GetDataList(that, "/basic/community/app/favorites/page")
            } else {
                that.hidden = true
            }
        }
        if (that.navIndex == 3 && that.messageIndex == 0) {
            if (!that.isAll && that.Pullcount == 0) {

                that.page = that.page + 1
                that.loadMore = true
                GetDataList(that, "/basic/community/app/comment/page")
            } else {
                that.hidden = true
            }
        }
        if (that.navIndex == 3 && that.messageIndex == 1) {
            if (!that.isAll && that.Pullcount == 0) {
                that.page = that.page + 1
                that.loadMore = true
                GetDataList(that, "/basic/community/app/message/page")
            } else {
                that.hidden = true
            }
        }

    },
    methods: {
        navClick(index) {
            wx.pageScrollTo({
                scrollTop: 0//回到顶部
            })
            wx.setNavigationBarTitle({
                title: this.navList[index].navName
            })

            this.hidden = false
            this.dataList = []
            this.isAll = false
            this.page = 1
            this.noData = false
            var that = this
            GetNavList(that)
            that.navIndex = index
            if (index == 0) {
                GetDataList(that, "/basic/community/app/post/page")
                // 帖子列表
            }
            if (index == 1) {
                GetDataList(that, "/basic/community/app/follow/page")
                // 请求跟帖列表
            }
            if (index == 2) {
                // 请求收藏列表
                GetDataList(that, "/basic/community/app/favorites/page")
            }
            if (index == 3 && that.messageIndex == 0) {
                // 请求回复消息列表
                GetDataList(that, "/basic/community/app/comment/page")
            }
            if (index == 3 && that.messageIndex == 1) {
                // 请求回复消息列表
                GetDataList(that, "/basic/community/app/message/page")
            }

        },
        lookFollowList(postId) {//查看跟帖列表
            wx.navigateTo({
                url: '../lookFollow/lookFollow?id=' + postId,
            })
        },
        lookDeleteFollow(postId) {//查看删除跟帖列表
            wx.navigateTo({
                url: '../lookDeleteFollow/lookDeleteFollow?id=' + postId,
            })
        },
        messageNav(index) {
            wx.pageScrollTo({
                scrollTop: 0//回到顶部
            })

            this.hidden = false
            this.dataList = []
            this.isAll = false
            this.page = 1
            this.noData = false
            var that = this
            GetNavList(that)
            this.messageIndex = index//切换消息类型
            if (index == 1) {
                GetDataList(that, "/basic/community/app/message/page")
            } else {
                GetDataList(that, "/basic/community/app/comment/page")
            }
        },
        cancelCollectz(postId) {
            //   取消收藏 
            var that = this
            wx.showModal({
                title: '提示',
                content: '确认取消收藏',
                success: function(res) {
                    if (res.confirm) {
                        that.$root.post("/basic/community/app/favorites/cancel", { userId: that.userId, postId: postId }, function(data) {
                            if (data.success) {
                                wx.showToast({
                                    title: "取消收藏成功",
                                    icon: 'success',
                                    duration: 2000
                                })
                                that.hidden = false
                                that.dataList = []
                                that.isAll = false
                                that.page = 1
                                that.noData = false
                                GetNavList(that)
                                GetDataList(that, "/basic/community/app/favorites/page")

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
        },
        lookPost(postId, examineState, itemStatus) {//审核中和审核失败查看
            if (itemStatus == 2) {
                wx.navigateTo({
                    url: '../postDelete/postDelete',
                })
                return;
            }
            if (examineState == 2 || examineState == 4) {
                wx.navigateTo({
                    url: '../commentAudit/commentAudit?postId=' + postId,
                })
            } else {
                wx.navigateTo({
                    url: '../topics/topics?id=' + postId,
                })
            }

        },
        msgLookPost(postId, examineState, itemStatus, msgId, index) { //系统帖子消息操作
            var that = this
            let newData = that.dataList
            console.log(index)
            newData[index].messageRead = 1
            that.dataList = newData
            ReadMessage(msgId, that)
            if (itemStatus == 2) {
                wx.navigateTo({
                    url: '../postDelete/postDelete',

                })
                return;
            }
            if (examineState == 2 || examineState == 4) {
                wx.navigateTo({
                    url: '../commentAudit/commentAudit?postId=' + postId,
                })
            } 
            else {
                wx.navigateTo({
                    url: '../topics/topics?id=' + postId,
                })
            }
        },
        msgLookComment(postId,commentId, itemStatus, msgId, index, examineState) { //系统跟帖消息操作
            var that = this
            let newData = that.dataList
            console.log(postId,commentId,itemStatus,msgId,index,examineState)
            newData[index].messageRead = 1
            that.dataList = newData
            ReadMessage(msgId, that)
            if (itemStatus == 2) {
                wx.navigateTo({
                    url: '../postDelete/postDelete',
                })
                return;
            }
            // if (examineState == 2 || examineState == 4) {
            //     wx.navigateTo({
            //         url: '../replyAudit/replyAudit?id=' + commentId,
            //     })
            // } 
            else {
                wx.navigateTo({
                    url: '../topics/topics?id=' + postId,
                })
            }
        },
        msgLookFollow(postId,followId, itemStatus, msgId, index, examineState) { //系统评论消息操作
            console.log(postId,followId, itemStatus, msgId, index, examineState)
            var that = this
            let newData = that.dataList
            newData[index].messageRead = 1
            that.dataList = newData
            ReadMessage(msgId, that)
            if (itemStatus == 2) {
                wx.navigateTo({
                    url: '../postDelete/postDelete',
                })
                return;
            }
            // if (examineState == 2 || examineState == 4) {
            //     wx.navigateTo({
            //         url: '../threadAudit/threadAudit?followId=' + followId,
            //     })
            // } 
            else {
                wx.navigateTo({
                   // url: '../followDetail/followDetail?id=' + postId + "&followId=" + followId,
                    url: '../topics/topics?id=' + postId,
                })
            }
        },
        commentLookPost(postId, examineState, itemStatus, msgId, index) {
            var that = this
            let newData = that.dataList
            newData[index].commentRead = 1
            that.dataList = newData
            commentMessage(msgId, that)
            if (itemStatus == 2) {
                wx.navigateTo({
                    url: '../postDelete/postDelete',
                })
                return;
            }
            if (examineState == 2 || examineState == 4) {
                wx.navigateTo({
                    url: '../commentAudit/commentAudit?postId=' + postId,
                })
            } else {
                wx.navigateTo({
                    url: '../topics/topics?id=' + postId,
                })
            }
        },
        lookFollow(postId, followId, examineState) {//审核中和审核失败查看
            if (examineState == 2 || examineState == 4) {
                wx.navigateTo({
                    url: '../threadAudit/threadAudit?followId=' + followId + "&postId=" + postId,
                })
            } else {
                wx.navigateTo({
                    url: '../followDetail/followDetail?id=' + postId + "&followId=" + followId,
                })
            }

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
                                GetNavList(that)
                                GetDataList(that, "/basic/community/app/post/page")
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
                                wx.showToast({
                                    title: "删除跟帖成功",
                                    icon: 'success',
                                    duration: 2000
                                })
                                that.hidden = false
                                that.dataList = []
                                that.isAll = false
                                that.page = 1
                                that.noData = false
                                GetNavList(that)
                                GetDataList(that, "/basic/community/app/follow/page")
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
        reviseFollow(id){
            // 评论审核拒绝
            wx.navigateTo({
                    url: '../reviseFollow/reviseFollow?id=' + id,
                })

        },
        revisePost(id){
            // 评论审核拒绝
            wx.navigateTo({
                    url: '../revisePost/revisePost?id=' + id,
                })

        },
        reviseComment(id){
            // 评论审核拒绝
            wx.navigateTo({
                    url: '../reviseReply/reviseReply?id=' + id,
                })

        },
        deteleSycMessage(sysMessageId, index) {
            // 删除消息
            var that = this
            let newData = that.dataList
            newData[index].messageRead = 1
            that.dataList = newData
            ReadMessage(sysMessageId, that)
            wx.showModal({
                title: '提示',
                content: '确认删除消息',
                success: function(res) {
                    if (res.confirm) {
                        that.$root.post("/basic/community/app/message/delete", { sysMessageId: sysMessageId }, function(data) {
                            if (data.success) {   
                                that.hidden = false
                                that.dataList = []
                                that.isAll = false
                                that.page = 1
                                that.noData = false
                                GetNavList(that)
                                GetDataList(that, "/basic/community/app/message/page")
                            } else {
                                wx.showToast({
                                    title: "删除消息失败",
                                    icon: 'loading',
                                    duration: 2000
                                })
                            }
                        },1)
                    }
                    else if (res.cancel) {

                    }
                }
            })
        },
        invitationReply(otherId, otherName, id, isPost, isFollow, msgId, index) {
            // 跟帖回复
            var that = this
            let newData = that.dataList
            newData[index].commentRead = 1
            that.dataList = newData
            commentMessage(msgId, that)
            if (isPost) {
                wx.navigateTo({
                    url: '../reply/reply?id=' + id + "&otherId=" + otherId + "&otherName=" + otherName,
                })

                return;
            }
            wx.navigateTo({
                url: '../reply/reply?id=' + isFollow + "&otherId=" + otherId + "&otherName=" + otherName + "&followId=" + id,
            })
            // 帖子回复

        }

    }
}
</script>

<style scoped>
/* pages/my/my.wxss */

.page {
    background: #fafafa;
    min-height: 100vh;
    padding-top: 110rpx;
}

.navLists {
    width: 750rpx;
    background: #fafafa;
    padding: 18rpx 26rpx;
    padding-bottom: 22rpx;
    position: fixed;
    top: 0;
    z-index: 999;
}

.nav {
    box-shadow: 0 2px 4px 0 rgba(208, 208, 208, 0.50);
    -moz-box-shadow: 0 2px 4px 0 rgba(208, 208, 208, 0.50);
    -webkit-box-shadow: 0 2px 4px 0 rgba(208, 208, 208, 0.50);
    border-radius: 4rpx;
    -moz-border-radius: 4rpx;
    -webkit-border-radius: 4rpx;
    background: #ffffff;
}

.navList {
    width: 180rpx;
    height: 76rpx;
    line-height: 76rpx;
    text-align: center;
}

.navChecked {
    background: #007AFF;
    color: #ffffff;
    box-shadow: 0 2px 0px 0 #3C7EC6;
    -moz-box-shadow: 0 2px 0px 0 #3C7EC6;
    -webkit-box-shadow: 0 2px 0px 0 #3C7EC6;
}

.dot {
    width: 10rpx;
    height: 10rpx;
    background: #F34040;
    border-radius: 50%;
    top: 20rpx;
    right: 16rpx;
}

.collect {
    padding: 22rpx 30rpx;
    box-shadow: 0 2rpx 4rpx 0 rgba(211, 211, 211, 0.50);
    -moz-box-shadow: 0 2rpx 4rpx 0 rgba(211, 211, 211, 0.50);
    -webkit-box-shadow: 0 2rpx 4rpx 0 rgba(211, 211, 211, 0.50);
    padding-bottom: 0;
}

.collect_time {
    height: 33rpx;
    line-height: 33rpx;
    padding-top: 22rpx;
    padding-bottom: 18rpx;
}

.collect_comment {
    padding-bottom: 12rpx;
}

.collect_comment_image {
    width: 248rpx;
    height: 178rpx;
    margin-right: 16rpx;
}

.collect_comment_title {
    width: 408rpx;
    height: 40rpx;
    line-height: 40rpx;
    margin-bottom: 10rpx;
}

.collect_comment_intro {
    display: inline-block;
    width: 408rpx;
    line-height: 33rpx;
    height: 66rpx;
}

.recommend_content_count {
    float: right;
    margin-top: 26rpx;
}

.reply {
    padding-left: 46rpx;
    height: 28rpx;
    line-height: 28rpx;
}

.reply_image {
    width: 22rpx;
    height: 22rpx;
    top: 8rpx;
    left: 14rpx;
}

.reply_count {
    font-size: 20rpx;
    color: #979797;
    height: 28rpx;
    line-height: 28rpx;
}

.shuxian {
    width: 1px;
    height: 20rpx;
    background: #979797;
    border-radius: 1px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    margin-top: 10rpx;
    margin-left: 14rpx;
}

.auditStatus {
    display: inline-block;
    height: 58rpx;
    line-height: 58rpx;
    margin-top: 22rpx;
}















/* .cancel_collect{
                padding-bottom: 20rpx;

            } */

.cancel_collect_bt {
    display: inline-block;
    height: 58rpx;
    line-height: 58rpx;
    border: 1px solid #999999;
    border-radius: 2px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    padding: 0 28rpx;
    background: #ffffff;
    margin-left: 0;
    margin-top: 20rpx;
    margin-right: 14rpx;
    margin-bottom: 20rpx;
}

















/*gentie  */

.thread {
    box-shadow: 0 2rpx 4rpx 0 rgba(211, 211, 211, 0.50);
    -moz-box-shadow: 0 2rpx 4rpx 0 rgba(211, 211, 211, 0.50);
    -webkit-box-shadow: 0 2rpx 4rpx 0 rgba(211, 211, 211, 0.50);
}

.thread_state {
    padding: 20rpx 0;
    justify-content: space-between;
}

.thread_time {
    height: 40rpx;
    line-height: 40rpx;
}

.thread_list {
    padding-top: 22rpx;
    padding-bottom: 28rpx;
}

.thread_comment_title {
    height: 40rpx;
    line-height: 40rpx;
}

.look_img {
    width: 40rpx;
    height: 30rpx;
}

.thread_img {
    width: 40rpx;
    height: 40rpx;
    margin-left: 30rpx;
}

.cancel_collect {
    justify-content: space-between;
}

.cancel_collect_bt {
    margin-right: 14rpx;
}

.cancel_collect_bt.on {
    color: #1987FF;
    border: 1px solid #1987FF;
}

.remove_comment {
    height: 40rpx;
    padding-top: 28rpx;
}

.message {
    margin-top: 12rpx;
}

.message_nav {
    width: 290rpx;
    margin: 0 auto;
    padding-bottom: 28rpx;
}

.reply_message {
}

.reply_message.on {
    border-bottom: 2px solid #007AFF;
}

.reply_message_title {
    display: inline-block;
    height: 45rpx;
    line-height: 45rpx;
}

.reply_message:first-child {
    margin-right: 60rpx;
}

.word-wrap{
    word-wrap:break-word
}
</style>


