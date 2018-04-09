<template>
<view class="groupList">
    <view class="groupList_nav">
        <view class="{{item.navId == current?'on nav':'nav'}}" wx:for="{{nav}}" wx:key="nav" @tap="changeNav(item.navId)">
            <text class="text">{{item.navName}}</text>
        </view>
    </view>
    <view class="groupList_list" wx:if="{{!noList}}">
        <view class="list_one" wx:for="{{listData}}" wx:key="listData">
            <view class="list_top">
                <image class="image" src="{{item.titlePic}}"></image>
                <view class="list_top_right">
                    <view class="groupList_infor">
                        <view class="groupList_name">{{item.shopname}}</view>
                        <view class="groupList_price">
                            <text class="newP">¥ {{item.productPrice}}</text>
                            <text class="oldP">¥ {{item.marketPrice}}</text>
                        </view>
                    </view>
                    <view class="groupList_specifice">
                        <text class="groupList_sign">{{item.spec}}</text>
                        <text class="groupList_num">×{{item.productCount}}</text>
                    </view>
                </view>
            </view>
            <view class="list_midden">
                共1件商品 合计：¥ <text class="text">{{item.productCount*item.productPrice}}</text> (免运费）
            </view>
            <view class="list_bottom">
                <view class="details" @tap="go(item.fgid,item.ordid)">拼团详情</view>
                <view class="gogroup" wx:if="{{item.fstatue == 0}}" @tap="go(item.fgid)">去成团</view>
                <view class="gogroup" wx:if="{{item.fstatue == 1}}" @tap="godetails(item.ordid)">查看订单</view>
                <view class="gogroup" wx:if="{{item.fstatue == 2}}" @tap="again(item.ordid)">再次拼团</view>
            </view>
        </view>

    </view>

    <view class="noList" wx:if="{{noList}}">
            <image class="image" src="http://image.vdongchina.com/M00/03/E5/ZSUkmVnxTFKEa0SuAAAAALhkqJY010.png"></image>
            <view class="noList_title">您还没有相关订单</view>
    </view>
</view>


</template>
<script>
export default {
    config: {
        navigationBarTitleText: '我的拼团'
    },
    data() {
        return {                                                 
        	nav:[{
                navId:0,
                navName:'全部'
            }, {
                navId: 1,
                navName: '待成团'
            },{
                navId:2,
                navName:'已成团'
            }, {
                navId: 3,
                navName: '交易关闭'
            }],
            current:0,
            noList:false,
            listData:[]
        }
    },
    onLoad (options) {
        var that = this;
        this.request()
    },
    methods:{
        changeNav(navId){
            this.current = navId;
            this.request(navId-1)
        },
        request(type){
            var that = this;
            if(type>0){
                wx.request({
                    url: that.$root.apiServer+that.$root.appid + '/basic/fgroup/applet/fGroupList?openid='+getApp().globalData.openid+'&type='+type,
                    method: 'GET',
                    header: {'content-type': 'application/json'},
                    success (res) {
                        console.log('fGroupList')
                        console.log(res)
                        var list = res.data.obj;
                        if(list.length){
                            for(let i in list){
                                list[i].titlePic = getApp().globalData.imgUrl + list[i].titlePic
                            }
                            that.listData = list;
                            that.noList = false
                        }else{
                            that.noList = true;
                            that.listData = [];
                        }
                        
                    }
                })
            }else{
                wx.request({
                    url: that.$root.apiServer+that.$root.appid + '/basic/fgroup/applet/fGroupList?openid='+getApp().globalData.openid,
                    method: 'GET',
                    header: {'content-type': 'application/json'},
                    success (res) {
                        console.log('fGroupList')
                        console.log(res)
                        var list = res.data.obj;
                        if(list.length){
                            for(let i in list){
                                list[i].titlePic = getApp().globalData.imgUrl + list[i].titlePic
                            }
                            that.listData = list;
                            that.noList = false
                        }else{
                            that.noList = true;
                            that.listData = [];
                        }
                    }
                })
            }
            
        },
        go(fgroupId,ordId){
            wx.navigateTo({
                url: '../t_result/t_result?share=1&fgroupId='+fgroupId+'&ordId='+ordId
            })
        },
        godetails(ordId){
            wx.navigateTo({
                url: '../orderShip/orderShip?type=1&ordId='+ordId
            })
        },
        again(id){

        }
    }
}
</script>
<style>
page{
    width:100%;
    height:100%;
    background-color:#f2f2f2;
}
.groupList{
    width:100%;
    background-color:#f2f2f2;
}
.groupList_nav{
    width:100%;
    height:84rpx;
    background-color:#fff;
    position:fixed;
    left: 0;
    top: 0;
    z-index:99;
}
.nav{
    width:25%;
    line-height:84rpx;
    float:left;
    text-align:center;
    font-size: 28rpx;
    color: #666666;
    background-color:#fff;
}
.groupList_nav .on{
    line-height:84rpx;
    color:#DD2727;
}
.on .text{
    line-height:84rpx;
    display:inline-block;
    border-bottom:4rpx solid #DD2727;
}
.groupList_list{
    width:100%;
    padding-top:84rpx;
    background-color:#f2f2f2;
}
.list_one{
    margin-bottom:20rpx;
}
.list_top{
    width:100%;
    height:180rpx;
    padding:30rpx;
    box-sizing:border-box;
    background-color:#FAFAFA;
}
.list_top .image{
    width:120rpx;
    height:120rpx;
    float:left;
}
.list_top_right{
    width:calc(100% - 120rpx);
    height:120rpx;
    float:left;
    padding-left:20rpx;
    box-sizing:border-box;
    position:relative;
}
.groupList_name{
    width:410rpx;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-size: 26rpx;
    color: #333333;
    float:left;
}
.groupList_price{
    float:right;

}
.newP{
    font-size: 28rpx;
    color: #333333;
    display:block;
}
.oldP{
    font-size: 28rpx;
    color: #999;
    text-decoration:line-through;
    display:block;
}
.groupList_specifice{
    width:100%;
    position:absolute;
    bottom:0;
    left:0;
    padding-left:20rpx;
    box-sizing:border-box;
}
.groupList_sign{
    font-size: 24rpx;
    color: #999999;
    float:left;
}
.groupList_num{
    font-size: 24rpx;
    color: #999999;
    float:right;
}
.list_midden{
    width:100%;
    height:80rpx;
    padding:0 30rpx;
    box-sizing:border-box;
    text-align:right;
    font-size: 24rpx;
    color: #333333;
    line-height:80rpx;
    box-shadow: inset 0 -1px 0 0 #E5E5E5;
    background-color:#fff;
}
.list_midden .text{
    font-size: 32rpx;
}
.list_bottom{
    width:100%;
    height:80rpx;
    padding:13rpx 30rpx;
    box-sizing: border-box;
    display:flex;
    justify-content:flex-end;
    background-color:#fff;
}
.details{
    width:150rpx;
    height:54rpx;
    border: 1px solid #999999;
    border-radius: 8rpx;
    line-height:54rpx;
    text-align:center;
    font-size: 26rpx;
    color: #333333;
    float:left;
}
.gogroup{
    width:150rpx;
    height:54rpx;
    border: 1px solid #DD2727;
    border-radius: 8rpx;
    line-height:54rpx;
    text-align:center;
    font-size: 26rpx;
    color: #DD2727;
    float:left;
    margin-left:20rpx;
}
.noList{
    width:100%;
    height:100%;
    padding-top:200rpx;
    box-sizing:border-box;
    text-align:center;
}
.noList .image{
    width:320rpx;
    height:258rpx;
}
.noList_title{
    width:100%;
    text-align:center;
    font-size: 40rpx;
    color: #000000;
    padding-top:50rpx;
    padding-bottom:30rpx;
}
.noList_infor{
    width:100%;
    padding:0 80rpx;
    box-sizing:border-box;
}
</style>