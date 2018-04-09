<template>
    <view class="{{noData ? 'pages':'page'}}">
        <view wx:if="{{!noData}}" class="search pos-r ft30 c4c" @tap="search">
            <image class="search_img pos-a" src="http://image.vdongchina.com/M00/03/3B/ZSUkmVngH8iESCaKAAAAAIOiFMo558.png" />
            <view class="search_input fl-l w-100 c4c">
                搜索
            </view>
        </view>
        <view class="recommend plr30 box-s">
            <block wx:for="{{invitationList}}" wx:key="invitationList" wx:if="{{invitationList.length>0}}">
                <view class="recommend_content display-flex" @tap="commentDetail(item.postId)">

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
                                <image class="reply_image pos-a comment_img" src="http://image.vdongchina.com/M00/03/39/ZSUkmVngEjWEdHPjAAAAAJubMhE385.png"></image>
                                <text class="reply_count pos-r">{{item.commentNum}}</text>
                            </view>
                        </view>
                    </view>
                </view>
            </block>
            <view class="ft20 c9 txt-c" wx:if="{{noData}}">
                <image class="noDataImg" src="http://image.vdongchina.com/M00/03/39/ZSUkmVngD0iEeQ8BAAAAAF8Zfxw132.png" />
                <view class="ft32 c9 txt-c">暂无相关内容</view>
            </view>
            <view class="nolong ft20 c9 txt-c" wx:if="{{hidden}}">
                没有更多了
            </view>
            <view class="loadMore txt-c" wx:if="{{loadMore}}">
            <view class="loadMore_img">
                <image class="loadMore_iocn" src="http://image.vdongchina.com/M00/03/31/ZSUkmVnfH-iEQVrmAAAAAA3Z8b8673.png" /> </view>
            <view>加载更多</view>
        </view>
        </view>
        <view class="posted" @tap="posted">
            <image class="posted_img" src="http://image.vdongchina.com/M00/03/2F/ZSUkmVnfD1yEOjKYAAAAAMx-qbU906.png"></image>
        </view>
    </view>
</template>
<style scoped>
.pages{
    overflow: hidden;
    background: #fafafa;
    min-height: 100vh;
}
.page {
    overflow: hidden;
}

.search {
    width: 690rpx;
    margin: 0 auto;
    height: 58rpx;
    line-height: 58rpx;
    background: #EEEEEE;
    border-radius: 71rpx;
    -moz-border-radius: 71rpx;
    -webkit-border-radius: 71rpx;
    margin-top: 20rpx;
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

.banner_img {
    width: 100%;
    height: 320rpx;
}

swiper {
    height: 320rpx;
}

.plate_title {
    height: 40rpx;
    line-height: 40rpx;
    padding: 20rpx 0;
}

.plate_item {
    width: 280rpx;
    height: 120rpx;
    line-height: 120rpx;
    -moz-border-radius: 20rpx;
    -webkit-border-radius: 20rpx;
    border-radius: 20rpx;
    display: inline-block;
    margin-right: 30rpx;
}

.plate_item_img {
    width: 280rpx;
    height: 120rpx;
    border-radius: 20rpx;
    -moz-border-radius: 20rpx;
    -webkit-border-radius: 20rpx;
}

.plate_item .bg-rgba {
    border-radius: 20rpx;
    -moz-border-radius: 20rpx;
    -webkit-border-radius: 20rpx;
}

.scroll-view_H {
    white-space: nowrap;
    height: 120rpx;
}




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
    width: 100%;
    height: 66rpx;
    line-height: 33rpx;
    margin-top: 10rpx;
    margin-left: 20rpx;
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
    height: 30rpx;
    background: #979797;
    border-radius: 1px;
    -moz-border-radius: 1px;
    -webkit-border-radius: 1px;
     margin-top: 16rpx;  
    margin-left: 14rpx;
}

.comment_img {
    width: 30rpx;
    height: 30rpx;
}




/*帖子列表结束  */

.posted {
    position: fixed;
    bottom: 96rpx;
    right: 26rpx;
}

.posted_img {
    width: 98rpx;
    height: 98rpx;
}
</style>
<script>



var GetList = function($this) { //请求帖子列表
    $this.$root.get("/basic/community/app/post/page", { page: $this.page, size: 10,plateId:$this.plateId }, (data) => {
        $this.loadMore = false
        let list = $this.invitationList;
        if (data.data.list.length == 0&&data.data.pages == 1 ) {
            $this.noData = true
            return
        } else {
            for (let i = 0; i < data.data.list.length; i++) {
                list.push(data.data.list[i])
            }
        }
        if ($this.page == data.data.pages) {
            $this.isAll = true
        }
        // if ( Math.ceil(data.data.length/10)  === $this.page) {
        //     $this.isAll = true

        // }
        // for (let i = 0; i < list.length; i++) {
        //     list[i].createTime = date(new Date(list[i].createTime))
        // }
        $this.invitationList = list
    })
}
export default {
    config: {
        navigationBarTitleText: '帖子列表'
    },
    data() {
        return {
            navList: 1,
            navlists: [],
            hidden: false,
            page: 1,
            Pullcount: 0,
            loadMore: false,
            invitationList: [],
            isAll: false,
            noData:false,
            imgUrl:'',
            plateId:""
        }
    },
    onLoad(options) {
        this.hidden = false
        this.page = 1
        this.invitationList = []
        this.isAll = false
        this.noData = false
        var openid = this.$root.globalData.openid
        this.imgUrl = this.$root.globalData.imgUrl
        var that = this
        that.plateId = options.plateId
        GetList(that)
    },
    onReachBottom() {
        var $this = this
        this.noData = false
        if (!$this.isAll && $this.Pullcount == 0) {
            $this.page = $this.page + 1
            $this.loadMore = true
            GetList($this)
        } else {
            $this.hidden = true
        }
    },
    onShareAppMessage(res) {
  
    return {
      title: '帖子',
      path: '/pages/invitationList/invitationList?plateId='+this.plateId,
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
    methods: {
        search() {//搜索
            wx.navigateTo({
                url: '../communitySearch/communitySearch',
            })
        },
        posted() {
            wx.navigateTo({
                url: '../posted/posted',
            })
        },
        commentDetail(id){
              wx.navigateTo({
                url: '../topics/topics?id='+ id,
            })
        },

    }
}
</script>

