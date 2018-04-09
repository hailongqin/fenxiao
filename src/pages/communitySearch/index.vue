<template>
    <view class="page">
        <view class="header box-s display-flex bg-wt">
            <view class=" {{cancelStaus ? 'search pos-r ft30' :'searchon pos-r ft30 c4c'}}">
                <image class="search_img pos-a" @tap="search" src="http://image.vdongchina.com/M00/03/3B/ZSUkmVngH8iESCaKAAAAAIOiFMo558.png" />
                <input class="search_input fl-l w-100 box-s" @input="searchInput" @focus="searchfocus" placeholder="搜索" placeholder-class="c4c" value="{{searchHistory}}" />
            </view>
            <view wx:if="{{cancelStaus}}" @tap="cancel" class="cancel ft28 c007">取消</view>
        </view>
        <view class="plr30 box-s bg-wt mt20">
            <block wx:for="{{invitationList}}" wx:key="invitationList">
                <view class="recommend_content display-flex " @tap="commentDetail(item.postId,item.title)">

                    <view class="">
                         <image wx:if="{{item.coverImg == null}}" class="recommend_content_img" src="http://image.vdongchina.com/M00/03/32/ZSUkmVnfJFCEEmSuAAAAANmbzAc779.png" mode="aspectFill"></image>
                        <image wx:else class="recommend_content_img" src="{{imgUrl+item.coverImg}}" mode="aspectFill"></image>                       
                    </view>
                    <view class="recommend_content_intros">
                        <view class="recommend_content_title txt-ov display-flex">
                            <view class="classname display-flex">
                                <text class="refined" wx:if="{{item.addEssence == 1}}">精</text>
                                <text class="dian" wx:if="{{item.addEssence == 1}}">·</text>
                                <text class="peak" wx:if="{{item.top == 1}}">顶</text>
                            </view>
                            <view class="ft28 c3 txt-ov">{{item.title}}</view>
                        </view>
                        <text class="recommend_content_intro c9 ft26 txt-wrap">{{item.content}}
                        </text>
                        <view class="recommend_content_count display-flex">
                            <view class="reply pos-r ">
                                <image class="reply_image pos-a" src="http://image.vdongchina.com/M00/03/30/ZSUkmVnfFgKELyEdAAAAAOKScPE218.png"></image>
                                <text class="reply_count pos-r">{{item.followNum}}</text>
                            </view>
                            <view class="shuxian"></view>
                            <view class="reply pos-r">
                                <image class="reply_image pos-a" src="http://image.vdongchina.com/M00/03/39/ZSUkmVngEjWEdHPjAAAAAJubMhE385.png"></image>
                                <text class="reply_count pos-r">{{item.commentNum}}</text>
                            </view>
                        </view>
                    </view>
                </view>
            </block>
        </view>
        <view class="search_history bg-wt">
            <view class="search_history_title bor-b ft26 c6 ml30">搜索历史</view>
            <view class="search_history_list plr30 box-s" wx:for="{{searchList}}" wx:key="searchList">
                <text class="c3 ft28 search_history_name fl-l c007" @tap="searchLists(item.postId)">{{item.title}}</text>
                <image class="history_remove fl-r" @tap="removeHistory(index)" src="http://image.vdongchina.com/M00/03/3B/ZSUkmVngIFyESmimAAAAACPP8IU812.png"></image>
            </view>
        </view>
        <view class="search_footer txt-c  bg-wt">
            <text class="ft28 search_footer_text" @tap="empty">清空搜索历史</text>
        </view>

        <view class="ft20 c9 txt-c" wx:if="{{noData}}" style="width:750rpx;">
            <image class="noDataImg" src="http://image.vdongchina.com/M00/03/39/ZSUkmVngD0iEeQ8BAAAAAF8Zfxw132.png" />
            <view class="ft32 c9 txt-c">暂无相关内容</view>
        </view>

        <view class="loadMore txt-c" wx:if="{{loadMore}}">

            <view class="loadMore_img">
                <image class="loadMore_iocn" src="http://image.vdongchina.com/M00/03/31/ZSUkmVnfH-iEQVrmAAAAAA3Z8b8673.png" /> </view>
            <view>加载更多</view>
        </view>

        <view class="noLong txt-c c9 ft20" wx:if="{{hidden}}">
            没有更多
        </view>

    </view>
</template>

<style scoped>
/* pages/search/search.wxss */

.page {
    background: #FAFAFA;
    min-height: 100vh;
}

.header {
    padding: 20rpx 30rpx;
}



/*搜索开始  */

.search {
    width: 604rpx;
    height: 58rpx;
    line-height: 58rpx;
    background: #EEEEEE;
    border-radius: 71rpx;
    -moz-border-radius: 71rpx;
    -webkit-border-radius: 71rpx;
}

.searchon {
    width: 690rpx;
    height: 58rpx;
    line-height: 58rpx;
    background: #EEEEEE;
    border-radius: 71rpx;
    -moz-border-radius: 71rpx;
    -webkit-border-radius: 71rpx;
}

.search_img {
    width: 32rpx;
    height: 31rpx;
    left: 18rpx;
    top: 14rpx;
}

.search_input {
    padding-left: 70rpx;
    height: 58rpx;
    line-height: 58rpx;
}

.cancel {
    height: 58rpx;
    line-height: 58rpx;
    padding-left: 30rpx;
}


.search_history_title {
    height: 33rpx;
    line-height: 33rpx;
    padding-top: 30rpx;
    padding-bottom: 10rpx;
}

.search_history_list {
    overflow: hidden;
}

.search_history_name {
    display: inline-block;
    padding: 20rpx 0;
    height: 40rpx;
    line-height: 40rpx;
}

.history_remove {
    width: 20rpx;
    height: 20rpx;
    padding: 30rpx 0;
}

.search_footer {
    color: #06488F;
}

.search_footer_text {
    padding-top: 30rpx;
    padding-bottom: 26rpx;
    display: inline-block;
}



/*搜索结束  */


/*帖子列表  */

.recommend {
    margin-top: 40rpx;
}

.recommend_list {
    margin-bottom: 8rpx;
}

.recommend_list_nav {
    display: inline-block;
    height: 40rpx;
    line-height: 40rpx;
    margin-right: 54rpx;
    padding-bottom: 5rpx;
}

.recommend_list_nav.on {
    font-size: 30rpx;
    color: #007AFF;
    border-bottom: 2px solid #007AFF;
}
.recommend_content {
    padding: 20rpx 0;
    border-bottom: 1px solid #D8D8D8;
    justify-content: space-between;
}

.recommend_content_img {
    width: 240rpx;
    height: 170rpx;
}
.recommend_content_intros{
    width: 432rpx;
    flex-grow: 1;
}

.recommend_content_title {
    width: 432rpx;
    height: 40rpx;
    line-height: 40rpx;
    margin-left: 20rpx;
    overflow: hidden;
}

.refined,
.peak {
    display: inline-block;
    width: 25rpx;
    height: 25rpx;
    line-height: 25rpx;
    font-size: 18rpx;
    border-radius: 50%;
    border: 1px solid #007AFF;
    color: #007AFF;
    text-align: center;
    margin-top: 7rpx;
}

.peak {
    border: 1px solid #DC5925;
    color: #DC5925;
    margin-right: 12rpx;
}

.dian {
    height: 25rpx;
    line-height: 25rpx;
    color: #007AFF;
    margin-top: 7rpx;
}

.recommend_content_intro {
    display:inline-block;
    width:100%;
    height: 66rpx;
    line-height: 33rpx;
    margin-top: 10rpx;
    margin-left: 20rpx;
}

.recommend_content_count {
    float: right;
    margin-top: 26rpx;
}

.reply {
    padding-left: 50rpx;
    height: 30rpx;
    line-height: 30rpx;
}

.reply_image {
    width: 30rpx;
    height: 30rpx;
    /* top: 8rpx; */
    left: 16rpx;
}

.reply_count {
    font-size: 26rpx;
    color: #979797;
    height: 30rpx;
    line-height: 30rpx;
}

.shuxian {
    width: 1px;
    height: 30rpx;
    background: #979797;
    border-radius: 1px;
    -moz-border-radius: 1px;
    -webkit-border-radius: 1px;
    /* margin-top: 10rpx; */
    margin-left: 14rpx;
}

.comment_img {
    width: 30rpx;
    height: 30rpx;
}



/*帖子列表结束  */
</style>
<script>

var GetList = function($this, isHistory) { //请求商品列表

    $this.$root.post("/basic/community/app/post/search", { page: $this.page, size: 10, keywords: $this.searchHistory }, (data) => {
        if (data.success) {
            $this.loadMore = false
            let list = $this.invitationList;
            if(data.data){
                    if (data.data == []) {
                $this.noData = true
                return
            } else {
                for (let i = 0; i < data.data.length; i++) {
                    list.push(data.data[i])
                }
            }
            // if ($this.page == data.data.pages) {
            //     $this.isAll = true
            // }
            // if ( Math.ceil(data.data.length/10)  === $this.page) {
            //     $this.isAll = true

            // }
            // for (let i = 0; i < list.length; i++) {
            //     list[i].createTime = date(new Date(list[i].createTime))
            // }
            $this.invitationList = list
            }
            

        } else {

        }

    },1)
}
export default {
    config: {
        navigationBarTitleText: '搜索'
    },
    data() {
        return {
            cancelStaus: false,
            searchHistory: "",
            searchList: [],
            invitationList: [],
            hidden: false,
            page: 1,
            Pullcount: 0,
            loadMore: false,
            noData: false,
            imgUrl:""
        }
    },
    onLoad(options) {
        this.imgUrl = this.$root.globalData.imgUrl
        var historyArr = wx.getStorageSync("historyArr")
        this.searchList = historyArr
        this.invitationList = []
        this.loadMore = false,
            this.page = 1,
            this.hidden = false,
            this.noData = false
    },
    // onReachBottom() {
    //     var $this = this
    //     if ($this.isAll == null && $this.Pullcount == 0) {
    //         $this.page = $this.page + 1
    //         $this.loadMore = true
    //         GetList($this)
    //     } else {
    //         $this.hidden = true
    //     }
    // },
    methods: {
        searchLists(id) {
             wx.redirectTo({
                url: '../topics/topics?id=' + id,
            })
        },
        searchInput(e) {
            var that = this
            that.page = 1
            that.invitationList = []
            this.searchHistory = e.detail.value
            GetList(that, 0)
        },
        searchfocus() {
            this.cancelStaus = true
        },
        cancel() {
            this.cancelStaus = false
            this.searchHistory = ''
            this.invitationList = []
        },
        removeHistory(index) {
            var historyArr = this.searchList;
            var arrays = [];
            for (var i = 0; i < historyArr.length; i++) {
                if (i != index) {
                    arrays.push(historyArr[i])
                }
                wx.setStorageSync("historyArr", arrays)
                this.searchList = arrays
            }
        },
        empty() {
            wx.setStorageSync("historyArr", [])
            this.searchList = wx.getStorageSync("historyArr")
        },

        commentDetail(id, title) {
            var historyArr = wx.getStorageSync("historyArr")
                if (title) {
                    var historyPost ={}
                    historyPost["postId"] = id
                    historyPost["title"] = title
                    historyArr.push(historyPost)
                    this.searchList = historyArr
                    wx.setStorageSync("historyArr", historyArr)
                    this.searchList = historyArr
                }

            wx.redirectTo({
                url: '../topics/topics?id=' + id,
            })
        },
    }
}
</script>

