<template>
    <view class="page">
        <view class="_integral_title box-s bold bg-wt">当前积分</view>
        <view class="_integral_num display-flex bg-wt">
            <image class="_integral_image" src="http://image.vdongchina.com/M00/05/04/ZSUkmVoEDHSEVBqRAAAAAOPMnH8727.png" />
            <view class="_integral_nums bold">{{totalScore}}</view>
        </view>

        <view class="content box-s">
            <view class="_integral_title box-s bold bg-wt display-flex">
                <view>
                    积分记录</view>
                <view @tap="integral">
                    规则</view>
            </view>
            <view class="_integral_list box-s bg-wt">
                <view wx:if="{{!noData}}">
                    <view class="_integral_item box-s display-flex " wx:for="{{rechargeRecord}}" wx:key="rechargeRecord">
                        <view class="">
                            <view class="_integral_name c3 ft28">
                                {{item.status}}
                            </view>
                            <view class="_integral_time ft24 c9">
                                {{item.create_date}}
                            </view>
                        </view>
                        <view class="_integral_count ft28 c3">
                            {{item.get_way == 1 ? '+':'-' }} {{item.score}}
                        </view>
                    </view>
                </view>
                <view class="c9 ft24 _integral_no txt-c box-s" wx:else>您目前还没有积分变动记录</view>
                <!-- <view class='loadMore_img display-flex txt-c' wx:if="{{loadMore}}">
                                <view>
                                    <image class='loadMore_iocn' src='http://image.vdongchina.com/M00/03/31/ZSUkmVnfH-iEQVrmAAAAAA3Z8b8673.png'></image>
                                </view>
                                <view class='ft28 ml20'>加载中...</view>
                            </view> -->

                <view class="nolong ft28 c9 txt-c" wx:if="{{hidden}}">
                    没有更多了
                </view>
            </view>
        </view>

    </view>
</template>

<script>
var GetList = function(that) { //请求充值记录
    let postUrl = "/basic/score/applet/detailList?pageNum=" + that.page + "&pageSize=20&openid=" + that.$root.globalData.openid
    that.$root.post(postUrl, {}, (data) => {
        if (data.success) {
            that.loadMore = false
            var list = that.rechargeRecord;
            if (data.obj.total == 0) {
                that.noData = true;
                return;
            }
            for (let i = 0; i < data.obj.list.length; i++) {
                list.push(data.obj.list[i])
            }
            if (that.page == data.obj.pages) {
                that.isAll = true
            }
            that.rechargeRecord = list
        } else {
            wx.showToast({
                title: '服务器出错了',
                icon: 'loading',
                duration: 2000
            })
        }

    })

}
export default {
    config: {
        "navigationBarTitleText": "我的积分"
    },
    data() {
        return {
            totalScore: 0,
            hidden: false,//没有更多
            page: 1,//当前页码
            Pullcount: 0,//是否可以下拉
            loadMore: false,//是否显示加载更多    
            isAll: false,
            code: "",
            rechargeRecord: [],
            noData: false
        }
    },
    onLoad() {
        var that = this
        wx.request({
            url: that.$root.apiServer + that.$root.appid + '/basic/score/applet/selectOneByOpenid?openid=' + that.$root.globalData.openid,
            data: {
            },
            method: "POST",
            header: {
                'Content-Type': 'application/json'
            },
            success(rst) {
                if (rst.data.success) {
                    that.totalScore = rst.data.code
                }
            }
        })
        GetList(that)
    },
    methods: {
        integral() {
            wx.navigateTo({
                url: '../integralRole/integralRole'
            })
        }
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
}
</script>

<style scoped>
.page {
    width: 750rpx;
    min-height: 100vh;
    border-top: 1px solid #EEEEEE;
    background: #ffffff;
}

._integral_title {
    height: 110rpx;
    line-height: 110rpx;
    padding: 0 25rpx;
    color: rgba(51, 51, 51, 1);
    border-bottom: 1px solid #EEEEEE;
}

._integral_num {
    justify-content: center;
    align-items: center;
    height: 220rpx;
    margin-bottom: 20rpx;
}

._integral_image {
    width: 30rpx;
    height: 30rpx;
    margin-right: 20rpx;
}

._integral_nums {
    height: 48rpx;
    line-height: 48rpx;
    font-size: 48rpx;
    color: rgba(51, 51, 51, 1);
}

._integral_title.display-flex {
    justify-content: space-between;
}

.content {
    padding-top: 20rpx;
    background: rgba(238, 238, 238, 1);
}

._integral_list {
    padding: 0 25rpx;
}

._integral_item {
    justify-content: space-between;
    padding-top: 34rpx;
    padding-bottom: 25rpx;
    border-top: 1px solid #EEEEEE;
}

._integral_no {
    padding-top: 170rpx;
}
</style>
