<template>
    <view>
    	<view class="order">
	        <view class="order_list">
	            <view class="order_member" wx:for="{{order}}" @tap="orderbc" data-id="{{item.id}}" data-status="{{item.whetherPart}}" wx:if="{{item.isOpen && item.dateStatus !== 2}}" wx:key="order">
	                <view class="order_image">
	                    <view class="{{item.whetherPart ? 'order_title on white': 'order_title white'  }}">{{item.whetherPart ? '已预约': '预约' }}</view>
	                    <!--<view class="order_title .on white" wx:if="{{item.userStatus}}">未预约</view>-->
	                    <image class="order_image_image" src="{{item.fullCover}}" mode="aspectFill"></image>
	                </view>
	                <view class="order_name ft28 txt-ov mt20">{{item.title}}</view>
	                <view class="order_number c9 txt-c mt20">{{item.partQuantity}}人已申请</view>
	            </view>
	        </view>
	    </view>
	    <view class="w-100 container ft28 c9 nolong" wx:if="{{hidden}}">
	            没有更多了
	    </view>
    </view>
</template>
<script>

var app = getApp()
var GetList = function ($this) { 
var token = wx.getStorageSync("token")
    $this.$root.get("/basic/plugin/form/paging", {
            categoryId: $this.catCid,
            status: 1,
            pageNum: 1,
            pageSize: 100
          }, (data) => {
        let list = $this.order;
        if (data.pagination.list == 0) {
            return
        } else {
            for (let i = 0; i < data.pagination.list.length; i++) {
                list.push(data.pagination.list[i])
            }
        }

        if (data.pagination.pages === $this.page) {
            $this.isAll = true

        }
        $this.order = list
    })
}
export default {
    config: {
        "navigationBarTitleText": "预约列表"
    },
    data() {
        return {
            order: [
            ],
            hidden: false,
            page: 1,
            Pullcount: 0,
            catCid:''
        }
    },
    onLoad: function (e) {        
        var $this = this
        $this.catCid = e.catCid
        $this.order=[]
           GetList($this)
    },
    methods: {
        onShow(){
            
        },
        onReachBottom() {
            var $this = this
            if ($this.isAll == null && $this.Pullcount == 0) {
                $this.page = $this.page + 1
                GetList($this)
            } else {
                $this.hidden = true
            }
        },
        orderbc(e) {
            var id = e.currentTarget.dataset.id
            wx.navigateTo({
                url: '../course_order/course_order?id=' + id,
            })
        }
    }
}	
</script>
<style scoped>
page {
    background: #FAFAF9;
}

.order_list {
    width: 750rpx;
    padding: 0 20rpx;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 30rpx
}

.order_image {
    position: relative;
}

.order_image_image {
    width: 345rpx;
    height: 345rpx;
}

.order_title {
    position: absolute;
    background: red;
    text-align: center;
    width: 80rpx;
    height: 40rpx;
    line-height: 40rpx;
    font-size: 22rpx;
    border-top-left-radius: 20rpx;
    border-bottom-right-radius: 20rpx;
    top: 20rpx;
    left: 0;
}

.order_name {
    margin-left: 17rpx;
    box-sizing: border-box;
    width: 311rpx;
    height: 40rpx;
    line-height: 40rpx;
}

.order_number {
    font-size: 20rpx;
    width: 345rpx;
    height: 28rpx;
    line-height: 28rpx;
    margin-bottom: 30rpx;
}

.order_member {
    margin-bottom: 20rpx;
    background: #fff;
}

.order_title.on {
    background: #999999;
}

.container {
    background: #FAFAF9;
}
.nolong {
	text-align: center;
	height: 98rpx;
	line-height: 98rpx;
	width: 750rpx;
}
</style>

