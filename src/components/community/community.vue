<template>
    <view class="page">
        <view wx:if="{{communityToggle == 2}}">
            <view class="search pos-r ft30 c4c" @tap="search">
                <image class="search_img pos-a" src="http://image.vdongchina.com/M00/03/3B/ZSUkmVngH8iESCaKAAAAAIOiFMo558.png" />
                <view class="search_input fl-l w-100 c4c">
                    搜索
                </view>
            </view>
            <view class="banner mt20" wx:if="{{swiperSlides.length>0}}">
                <swiper style="{{'height:' + height*2 + 'rpx'}}" indicator-dots="{{indicatorDots}}" indicator-color="{{indicatorColor}}" indicator-active-color="{{indicatorActiveColor}}" autoplay="{{autoplay}}" interval="{{interval}}" duration="{{duration}}" current="{{current}}" circular="{{circular}}">
                    <swiper-item wx:for="{{swiperSlides}}" wx:key="url">
                        <image style="{{'height:' + height*2 + 'rpx;width:100%'}}" src="{{item.url}}" @tap="itemTapHandler(item.to)"></image>
                    </swiper-item>
                </swiper>
            </view>
            <view class="plate ml30">
                <view class="plate_title c3 ft28">版块</view>
                <scroll-view scroll-x="true" class="scroll-view_H">
                    <view class="plate_item pos-r" wx:for="{{navlists}}" wx:key="navlists" @tap="navInvitation(item.plateId)" wx:if="{{item.display ==1}}">
                        <image class="plate_item_img pos-a" src="{{imgUrl+item.plateUrl}}" mode="aspectFill"></image>
                        <view class="pos-r ft36 white txt-c bg-rgba">{{item.plateName}}</view>
                    </view>
                </scroll-view>
            </view>
            <view class="recommend plr30 box-s">
                <view class="recommend_list ft28 c6">
                    <text class="{{navList == '0' ? 'recommend_list_nav on' :'recommend_list_nav'}}" @tap="recommendClick('0')">全部</text>
                    <text class="{{navList == '1' ? 'recommend_list_nav on' :'recommend_list_nav'}}" @tap="recommendClick('1')">热门</text>
                    <text class="{{navList == '2' ? 'recommend_list_nav on' :'recommend_list_nav'}}" @tap="recommendClick('2')">精品</text>
                </view>
                <block wx:for="{{invitationList}}" wx:key="invitationList" wx:if="{{invitationList.length}}">
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
                            <text class="recommend_content_intro c9 ft26 txt-wrap">{{item.content}}</text>

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
                <view class=" ft20 c9 txt-c" wx:if="{{noData}}">
                    ...
                </view>
                <view class="ft20 c9 txt-c" wx:if="{{noData}}">
                    暂无相关内容
                </view>
                <view class="noMore ft20 c9 txt-c" wx:if="{{hidden}}">
                    没有更多了
                </view>
                <view class="loadMore txt-c" wx:if="{{loadMore}}">
                    <view class="loadMore_img">
                        <image class="loadMore_iocn" src="http://image.vdongchina.com/M00/03/31/ZSUkmVnfH-iEQVrmAAAAAA3Z8b8673.png" /> </view>
                    <view>加载更多</view>
                </view>

            </view>
        </view>
        <view class="mask" wx:if="{{communityToggle == 3}}">
            <view class="content">
                <image class="header" src="http://image.vdongchina.com/M00/03/3C/ZSUkmVngJZKEJtJvAAAAAGKhHsE856.png"></image>
                <text class="middle">暂无该功能</text>
                <text class="footer">程序员正在努力开发中</text>
            </view>
        </view>
    </view>
</template>

<script>
var GetList = function($this) { //请求列表
    $this.$root.get("/basic/community/app/post/page", { page: $this.page, isHot: $this.isHot, isAddEssence: $this.isAddEssence, size: 10 }, (data) => {
        $this.loadMore = false
        $this.onsho = true
        let list = $this.invitationList;
        if (data.data.list.length == 0) {
            $this.noData = true
            return
        } else {
            for (let i = 0; i < data.data.list.length; i++) {
                list.push(data.data.list[i])
            }
        }
        if ($this.page == data.data.lastPage) {
            $this.isAll = true
        }
        $this.invitationList = list
    })
}
export default {
    editorConfig: {
        height: {
            el: ['number'],
            label: '调整轮播图整体高度',
            type: 'Number',
            value: '160',
            director: 'Fsize',
            tip: '提示:建议高度为150'
        },
        indicatorDots: {
            label: '是否显示面板指示点',
            type: 'Boolean',
            value: true,
            director: 'switch'
        },
        indicatorColor: {
            label: '轮播指示点颜色',
            type: 'String',
            value: 'rgba(0, 0, 0, .3)',
            director: 'ColorPicker'
        },
        indicatorActiveColor: {
            label: '轮播选中的指示点颜色',
            type: 'String',
            value: '#000000',
            director: 'ColorPicker'
        },
        swiperSlides: {
            el: ['slider'],
            label: '图片填充',
            type: 'slider',
            value: [
                {
                    url: 'http://image.vdongchina.com/M00/00/2F/ZSUkmVl1ZOKEewc4AAAAACPCWF4187.jpg',
                    to: '',
                    code: ''
                },
                {
                    url: 'http://image.vdongchina.com/M00/00/BF/ZSUkmVmc0GiEB_t9AAAAAOwJ5G8813.jpg',
                    to: '',
                    code: ''
                }
            ],
            director: 'slider'
        }
    },
    comName: "社区",
    props: {
        height: {
            default: '160',
            type: String
        },
        swiperSlides: {
            default: function() {
                return [
                    {
                        url: 'http://image.vdongchina.com/M00/00/2F/ZSUkmVl1ZOKEewc4AAAAACPCWF4187.jpg',
                        to: '',
                        code: ''
                    },
                    {
                        url: 'http://image.vdongchina.com/M00/00/BF/ZSUkmVmc0GiEB_t9AAAAAOwJ5G8813.jpg',
                        to: '',
                        code: ''
                    }
                ]
            },
            type: Array
        },
        indicatorDots: {
            type: Boolean,
            default: true
        },
        indicatorColor: {
            type: String,
            default: 'rgba(225, 8, 37, 1)'
        },
        indicatorActiveColor: {
            type: String,
            default: '#ffffff'
        },
        autoplay: {
            type: Boolean,
            default: true
        },
        current: {
            type: Number,
            default: 0
        },
        interval: {
            type: Number,
            default: 5000
        },
        duration: {
            type: Number,
            default: 500
        },
        circular: {
            type: Boolean,
            circular: false
        }
    },
    data() {
        return {
            navList: 0,//默认全部
            navlists: [],//推荐（热门、精品）
            hidden: false,//没有更多
            page: 1,//当前页码
            Pullcount: 0,
            loadMore: false,//正在加载中
            invitationList: [], // 帖子列表
            isHot: false, // 是否为热门
            isAddEssence: false, //是否为精品
            isAll: false,//当前页面是否等于总页码
            noData: false,//没有数据
            imgUrl: '',//图片路径（默认图片路径不完整，补充路径）
            userInfo: {},
            nickName: '',
            avatarUrl: '',
            gender: '',//性别 0：未知、1：男、2：女
            province: '',
            city: '',
            communityToggle: 1, //判断是否有社区功能
            onsho: false,//首次数据是否加载完成
            // communityFlag:''
            // isH5:false
        }
    },
    async onShow() {
        wx.showLoading({
            title: '正在拼命加载中',
        })
        var openid = this.$root.globalData.openid
        this.imgUrl = this.$root.globalData.imgUrl
        var that = this
        that.page = 1
        that.Pullcount = 0
        that.invitationList = []
        that.onsho = false
        that.isAll = false
        await this.$root.login()
        await this.$root.getUserInfo()
        wx.request({
            url: this.$root.apiServer + this.$root.appid + '/basic/community/app/special/getSpecial',
            method: 'GET',
            data: {
                cloudAppId: this.$root.appid
            },
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                if (res.data.object.examine == 2) {
                    that.communityToggle = 2
                    that.$root.get("/basic/community/app/plate/listAll", {}, function(data) {
                        if (data.success) {
                            wx.hideLoading()
                            that.navlists = data.data
                        } else {
                            wx.hideLoading()
                            wx.showToast({
                                title: "网络出错了",
                                icon: 'loading',
                                duration: 2000
                            })
                        }
                    })
                    GetList(that)
                } else {
                    wx.hideLoading()
                    that.communityToggle = 3
                }
            },
            fail() {
                wx.hideLoading()
                that.communityToggle = 3
            }

        })
    },
    onPullDownRefresh() {
        var that = this
        that.page = 1
        that.invitationList = []
        that.loadMore = false
        that.isAll = false
        that.noData = false
        that.hidden = false
        that.onsho = false
        that.Pullcount = 0
        that.$root.get("/basic/community/app/plate/listAll", {}, function(data) {
            if (data.success) {
                that.navlists = data.data
            } else {
                wx.showToast({
                    title: "网络出错了",
                    icon: 'loading',
                    duration: 2000
                })
            }
        })
        GetList(that)
    },
    onReachBottom() {
        var $this = this
        $this.noData = false
        console.log(!$this.isAll, $this.Pullcount, $this.onsho)
        if (!$this.isAll && $this.Pullcount == 0 && $this.onsho) {
            $this.page = $this.page + 1
            $this.loadMore = true
            GetList($this)
        } else {
            $this.hidden = true
        }
    },
    methods: {
        navInvitation(plateId) {//跳转板块帖子列表
            wx.navigateTo({
                url: '../invitationList/invitationList?plateId=' + plateId,
            })
        },
        recommendClick(index) { //热门和精品切换
            this.page = 1
            this.navList = index
            this.invitationList = []
            this.loadMore = false
            this.isAll = false
            this.noData = false
            this.hidden = false
            if (index == 0) {
                this.isHot = false
                this.isAddEssence = false
            }
            else if (index == 1) {
                this.isHot = true
                this.isAddEssence = false
            } else {
                this.isHot = false
                this.isAddEssence = true
            }
            var that = this
            GetList(that)

        },
        search() {//搜索
            wx.navigateTo({
                url: '../communitySearch/communitySearch',
            })
        },
        commentDetail(id) {//帖子详情
            wx.navigateTo({
                url: '../topics/topics?id=' + id,
            })
        },
        itemTapHandler(to) {
            if (!to || typeof to !== 'string') return
            wx.navigateTo({
                url: to
            })
        }

    }
}
</script>
<style scoped>
.page {
    overflow: hidden;
}

.page .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    background: #fff;
}

.page .mask .content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.page .mask .content .header {
    width: 93px;
    height: 93px;
    margin-bottom: 25px;
}

.page .mask .content .middle {
    font-size: 20px;
    color: #000;
    height: 28px;
    line-height: 28px;
    margin-bottom: 15px;
}

.page .mask .content .footer {
    font-size: 14px;
    color: #888;
    height: 20px;
    line-height: 20px;
}

.pos-r {
    position: relative;
}

.pos-a {
    position: absolute;
}

.ft24 {
    font-size: 24rpx;
}

.ft28 {
    font-size: 28rpx;
}

.ft30 {
    font-size: 30rpx;
}

.ft36 {
    font-size: 36rpx;
}

.white {
    color: #ffffff;
}

.c3 {
    color: #333333;
}

.c6 {
    color: #666666;
}

.c9 {
    color: #999999;
}

.fl-l {
    float: left;
}

.w-100 {
    width: 100%;
}

.mt20 {
    margin-top: 20rpx;
}

.ml30 {
    margin-left: 30rpx;
}

.txt-c {
    text-align: center;
}

.plr30 {
    padding-left: 30rpx;
    padding-right: 30rpx;
}

.box-s {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}

.display-flex {
    display: flex !important;
    display: -webkit-box !important;
    display: -moz-box !important;
    display: -ms-flexbox !important;
    display: -webkit-flex !important;
}

.txt-ov {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.txt-wrap {
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    /*background-color: burlywood;*/
}

.loadMore {
    font-size: 20rpx;
    color: #0081FF;
}

.noMore {
    height: 98rpx;
    line-height: 98rpx;
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
    vertical-align: top;
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

.on {
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

.recommend_content_intros {
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
    display: inline-block;
    width: 100%;
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
    top: 4rpx;
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
    margin-top: 4rpx;
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
