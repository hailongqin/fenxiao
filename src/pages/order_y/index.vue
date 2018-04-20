<template>
    <view class="page">
        <view class="display-flex header box-s bg-wt">
            <block wx:for="{{navs}}" wx:key="navs">
                <view class=" {{navsIndex == index ? 'ft34 c9 list on':'ft34 c9 list'}}" @tap="navlist(index)">{{item.name}}</view>
            </block>
        </view>
        <view class="order plr20 box-s display-flex mt30" wx:if="{{rows.length > 0}}">
            <block wx:for="{{rows}}" wx:key="rows">
                <view class="order_list bg-wt mb20 " @tap="orderDetail(item.id)">
                    <view class="order_image mb20">
                        <image class="order_image_image"  mode="aspectFill" src="{{item.fullCover}}"></image>
                    </view>
                    <view class="ft28 order_name txt-ov box-s">{{item.title}}</view>
                    <view class="display-flex order_num box-s mb30 mt20">
                        <view class="ft20 c9">{{item.partQuantity}}人已申请</view>
                        <view class="deleat" @tap="deleat(item.id)">
                            <image class="deleat_image" mode="aspectFill" src="http://image.vdongchina.com/M00/03/3F/ZSUkmVngOASER5sjAAAAANxFDZQ933.png"></image>
                        </view>
                    </view>
                </view>
            </block>
    
        </view>
        <view class="display-flex plr30 box-s nolong w-100" wx:if="{{hidden}}">
            <view class="flagstaff"></view>
            <view class="ft26 c9">没有更多数据喽</view>
            <view class="flagstaff"></view>
        </view>
        <view class="noitem w-100" wx:if="{{rows.length == 0}}">
            <image class="noitem_image" src="http://image.vdongchina.com/M00/03/3F/ZSUkmVngN5CEGfKiAAAAAN-mTyQ708.png"></image>
            <view class="w-100 ft30 c9 txt-c">您还没有{{navs[navsIndex].name}}的预约，快去活动看看吧~</view>
        </view>
    </view>
</template>
<script>
export default {
    config: {
        "navigationBarTitleText": "我的预约",
        "navigationBarTextStyle": "black"
    },
    data() {
        return {
            navs: [{
                name: "已预约"
            },
            {
                name: "已结束"
            },
            {
                name: "已失效"
            }],
            navsIndex: 0,
            status: 0,
            page: 1,
            rows: [],
            hidden: false,
            Pullcount: 0
        }
    },
    onLoad: function (options) {
        var $this = this
        GetList($this)
    },
    methods: {
        deleat(id) {
            var id = id;
            var $this = this
            wx.showModal({
                title: "提示",
                content: "您确认删除吗?",
                success: function (res) {
                    if (res.confirm) {
                        $this.$root.post("/basic/plugin/form/content/cancel", { id: id }, (data) => {
                            if (data.success) {
                                wx.showToast({
                                    title: '删除成功',
                                    icon: 'success',
                                    duration: 2000
                                })
                                $this.rows = [],
                                    $this.page = 1,
                                    $this.hidden = false,
                                    $this.isAll = null,
                                    $this.Pullcount = 0
                                GetList($this)
                            } else {
                                wx.showToast({
                                    title: data.message,
                                    icon: 'loading',
                                    duration: 2000
                                })
                            }
                        }, 1)
                    }
                }
            })
        },
        orderDetail(id) {
            if (this.status == 0) {
                wx.navigateTo({
                    url: '../course_order/course_order?id=' + id,
                })
            }

        },
        navlist(index) {
            var $this = this
            var index = index
            $this.navsIndex = index,
                $this.status = index
            $this.rows = [],
                $this.page = 1,
                $this.hidden = false,
                $this.isAll = null
            if ($this.page == 1 && $this.isAll == null) {
                GetList($this)
            }
        },
        onReachBottom: function () {
            var $this = this
            if ($this.isAll == null && $this.Pullcount == 0) {
                $this.page = $this.page + 1
                GetList($this)
            } else {
                $this.hidden = true
            }
        }
    }
}
// pages/course_myorder/course_myorder.js
var GetList = function ($this) {
    let token = wx.getStorageSync("token")
    $this.hidden = false
    $this.$root.get("/basic/plugin/form/user/list", { size: 10, pageNum: $this.page, queryStatus: $this.status, token: token }, (data) => {
        if (data.success) {
            let list = $this.rows,
                datas = data.pageInfo.list;
            if (datas.length == 0) {
                return
            }
            if (list.length == 0) {
                for (let i = 0; i < datas.length; i++) {
                    list.push(datas[i])
                }
            } else {
                for (let i = 0; i < datas.length; i++) {
                    if (list[i].id !== datas[i].id) {
                        list.push(datas[i])
                    }
                }
            }

            if (data.pageInfo.pageNum == $this.page) {
                $this.isAll = true
            }
            $this.rows = list

        } else {
            wx.showToast({
                title: data.message,
                icon: 'loading',
                duration: 2000
            })
        }

    })
}
</script>
<style scoped>
/* pages/course_myorder/course_myorder.wxss */

.page {
    background: #FAFAF9;
    min-height: 100vh;
}

.header {
    padding: 0 81rpx;
    justify-content: space-between;
}

.list {
    height: 98rpx;
    line-height: 98rpx;
}

.list.on {
    color: #30A7FF;
    border-bottom: 2px solid #30A7FF;
}

.order {
    justify-content: space-between;
    flex-wrap: wrap;
}

.order_list {
    width: 345rpx;
    border-radius: 8px;
}

.order_image_image {
    width: 345rpx;
    height: 345rpx;
}

.order_name {
    padding: 0 17rpx;
}

.deleat_image {
    width: 30rpx;
    height: 30rpx;
}

.ft20 {
    font-size: 20rpx;
}

.order_num {
    padding: 0 17rpx;
    justify-content: space-between;
}

.flagstaff {
    width: 60rpx;
    height: 1px;
    background: #D8D8D8;
}

.nolong {
    justify-content: space-between;
    align-items: center;
    width: 400rpx;
    margin: 0 auto;
    height: 98rpx;
    line-height: 98rpx;
}

.nolong .c9 {
    width: 183rpx;
}

.onitem {
    width: 277rpx;
    height: 332rpx;
}

.noitem_image {
    width: 277rpx;
    height: 332rpx;
    margin-left: 236rpx;
    margin-bottom: 42rpx;
}
</style>

