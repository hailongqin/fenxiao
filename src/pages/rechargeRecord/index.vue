<template>
    <!--pages/rechargeRecord/rechargeRecord.wxml-->
    <view class='page'>
        <view wx:if="{{!noData}}" >

            <view class='header display-flex bg-wt'>
                <view class='ft32 c3'>操作</view>
                <view class='ft32 c3'>金额</view>
                <view class='ft32 c3'>时间</view>
            </view>
            <view class='rechargeRecord bg-wt' wx:for="{{rechargeRecord}}" wx:key="rechargeRecord">
                <view class='rechargeRecordList display-flex'>
                    <view class='operation'>
                        <view class='operationTitle ft32 c3'>会员卡充值</view>
                        <view class='cartNumber ft24 c9'>{{item.code}}</view>
                    </view>
                    <view class='money txt-c'>
                        <view class='moneyNumber ft28 c3'>+{{item.coin}}<text wx:if="{{item.sendcoin}}">返{{item.sendcoin}}元</text> </view>
                        <view class='ft24 c9 payment'>微信支付</view>
                    </view>
                    <view class='time ft24 c9 txt-right'>{{item.creattime}}</view>
                </view>
            </view>
        </view>

        <view class="ft20 c9 txt-c" wx:else style="width:100%;">
            <image class="noDataImg" src="http://image.vdongchina.com/M00/03/39/ZSUkmVngD0iEeQ8BAAAAAF8Zfxw132.png" />
            <view class="ft32 c9 txt-c">暂无充值信息</view>
        </view>
        <view class='loadMore_img display-flex txt-c' wx:if="{{loadMore}}">
            <view>
                <image class='loadMore_iocn' src='http://image.vdongchina.com/M00/03/31/ZSUkmVnfH-iEQVrmAAAAAA3Z8b8673.png'></image>
            </view>
            <view class='ft28 ml20'>加载中...</view>
        </view>

        <view class="nolong ft28 c9 txt-c" wx:if="{{hidden}}">
            没有更多了
        </view>
    </view>
</template>
<script>
var GetList = function(that) { //请求充值记录
    let postUrl = "/basic/newMember/applet/viewList?starttime=null&endtime=null&pageNum="+that.page+"&pageSize=20&code=" + that.code
    that.$root.post(postUrl, {}, (data) => {
        if (data.success) {
            that.loadMore = false
            var list = that.rechargeRecord;
            console.log(list)
            if (that.page == 1 && data.obj.pages == 0) {
                that.noData = true;
                return;
            }
            for (let i = 0; i < data.obj.list.length; i++) {
                data.obj.list[i].creattime = data.obj.list[i].creattime.substring(0, 10)
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
        navigationBarTitleText: '充值记录'
    },
    data() {
        return {
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
    onReachBottom() {
        var that = this
        if (!that.isAll && that.Pullcount == 0) {
            console.log(!that.isAll)
            that.page = that.page + 1
            that.loadMore = true
            GetList(that)
        } else {
            that.hidden = true
        }
    },
    onLoad(options) {
        var that = this
        that.$root.post("/basic/newMember/applet/pview?openid=" + that.$root.globalData.openid, {}, function(data) {//请求卡信息
            console.log(data)
            if (data.success) {
                that.code = data.obj.codeNum
                 GetList(that)
            }
        })
     
    },
    methods: {}
}
</script>
<style scoped>
/* pages/rechargeRecord/rechargeRecord.wxss */
.page{
    background: #f1f1f1;
    min-height: 100vh;
}
.header {
    justify-content: space-between;
    padding: 20rpx 50rpx;
    margin-bottom: 10rpx;
}

.rechargeRecord {
    padding: 0 28rpx;
    margin-bottom: 1px;
}

.rechargeRecordList {
    justify-content: space-between;
    padding: 26rpx 0;
}

.operation,
.money,
.time {
    width: 231rpx;
}

.operationTitle,
.moneyNumber {
    height: 45rpx;
    line-height: 45rpx;
}

.cartNumber,
.payment {
    height: 33rpx;
    line-height: 33rpx;
}

.payment {
    padding-left: 28rpx;
}

.loadMore_img {
    padding: 80rpx 0;
}

.loadMore_img {
    height: 40rpx;
    line-height: 40rpx;
    width: 168rpx;
    margin: 0 auto;
}

.noDataImg {
	width: 240rpx;
	height: 205rpx;
	margin: 0 auto;
	margin-top: 180rpx;
	margin-bottom: 60rpx;
}
</style>

