<template>
    <view class="container">
        <view class="bmg  _me_title_items">
            <view wx:for="{{items}}" wx:for-index="index" wx:key="index" class="{{currentTab == index ? 'active _me_title_Item ' : '_me_title_Item '}}"  @tap="navbarTap(item.type)">
                {{item.status}}
            </view>
        </view>


        <view class="goodsLists" wx:if="{{allListsLength && orderFlag}}">
            <view class="goods" wx:for="{{allLists}}" wx:for-item="itemBox" wx:key="index">
                <view class="name-status">
                    <view class="name">{{itemBox.dUserShop.shopName}}</view>
                    <view class="status">
                        <view class="status2" wx:if="{{itemBox.shippingWay == 2}}">买家自提</view>
                        <view class="status2" wx:if="{{itemBox.shippingWay == 3}}">商家配送</view>
                        <view class="status2" wx:if="{{(itemBox.shippingWay==1 || itemBox.shippingWay == null) && itemBox.refundState == 1 && itemBox.ordState == 3 && itemBox.payState == 1}}">退款申请中</view>
                        <view class="status2" wx:if="{{(itemBox.shippingWay==1 || itemBox.shippingWay == null) && itemBox.ordState == 6 && itemBox.refundState == 5 && itemBox.payState == 1}}">退款完成</view>
                        <view class="status1" wx:if="{{(itemBox.shippingWay==1 || itemBox.shippingWay == null) && itemBox.ordState == 5 && itemBox.payState == 0}}">交易关闭</view>
                        <view class="status2" wx:if="{{(itemBox.shippingWay==1 || itemBox.shippingWay == null) && itemBox.ordState == 0 && itemBox.payState == 0}}">等待买家付款</view>
                        <view class="status2" wx:if="{{(itemBox.shippingWay==1 || itemBox.shippingWay == null) && itemBox.ordState == 1 && itemBox.payState == 1}}">待发货</view>
                        <view class="status2" wx:if="{{(itemBox.shippingWay==1 || itemBox.shippingWay == null) && itemBox.ordState == 2 && itemBox.payState == 1}}">已发货</view>
                        <view class="status2" wx:if="{{(itemBox.shippingWay==1 || itemBox.shippingWay == null) && itemBox.ordState == 4 && itemBox.payState == 1}}">已完成</view>
                        <view class="status1" wx:if="{{(itemBox.shippingWay==1 || itemBox.shippingWay == null) && (itemBox.refundState == 3 && itemBox.ordState == 3 && itemBox.payState == 1) || (itemBox.refundState == 6 && itemBox.ordState == 3 && itemBox.payState == 1)}}">退款失败</view>
                    </view>
                </view>
                <view class="goodsdetail" @tap="toOrderDetail(itemBox.id,itemBox.ordType)" wx:for="{{itemBox.itemList}}" wx:for-item="item">
                    <image class="img" src="{{item.snapshotEntity.product.imageList[0].url}}"></image>
                    <view class="txt">
                        <view class="txt-top">
                            <view class="left">{{item.snapshotEntity.product.name}}</view>
                            <view class="right">
                                <view class="t">￥{{item.presentPrice}}</view>
                            </view>
                        </view>
                        <view class="txt-bottom">
                            <view class="left">
	                        	<view class="l_size" wx:for="{{item.snapshotEntity.salePropertyList}}" wx:for-item="itemBox">
	                        		{{itemBox.salePropertyName}} 
	                        	</view>      	
	                        </view>
                            <view class="right">x{{item.quantity}}</view>
                        </view>
                    </view>
                </view>

                <!-- ordType == 1 砍价订单-->
                <view class="bottom-pay" wx:if="{{itemBox.ordType}}">
                    <view class="right">共{{itemBox.totalNum}}件商品 合计： ￥
                    <view class="num">{{((itemBox.totalAmount * 100) - (itemBox.bargainAmount*100))/100}}</view>(包邮)</view>
                </view>
                <!-- ordType == 1 分享订单  -->
                <view class="bottom-pay" wx:else>
                    <view class="right">共{{itemBox.totalNum}}件商品 合计： ￥
                    <view class="num">{{itemBox.totalAmount}}</view>(包邮)</view>
                </view>

                <view class="btn">
                    <view class="type1 cancel" wx:if="{{itemBox.ordState == 0}}" @tap="toCancel(itemBox.id,itemBox.ordType)">取消订单</view>
                    <view class="type1" wx:if="{{itemBox.ordState == 3}}" @tap="toOrderDetail(itemBox.id,itemBox.ordType)">查看详情</view>
                    <view class="type1 refunds" wx:if="{{itemBox.ordState == 1 || itemBox.ordState == 2}}" @tap="toRefunds(itemBox.ordno)">退款</view>
                    <view class="type1 logistics" wx:if="{{(itemBox.ordState == 2 && itemBox.shippingWay != 2 && itemBox.shippingWay != 3) || (itemBox.ordState == 4 && itemBox.shippingWay != 2 && itemBox.shippingWay != 3)}}" @tap="toFlow(itemBox.expressId)">查看物流</view>
                    <view class="type1 delete" wx:if="{{itemBox.ordState == 5 || itemBox.ordState == 4 || itemBox.ordState == 6}}" @tap="toDelete(itemBox.id)">删除订单</view>
                    <view class="type2 pay" wx:if="{{itemBox.ordState == 0}}" @tap="toPay(itemBox.ordno,itemBox.ordType)">立即支付</view>
                    <view class="type2 confirm" wx:if="{{itemBox.ordState == 2}}" @tap="toConfirm(itemBox.ordno)">确认收货</view>
                    <view class="right"></view>
                </view>
            </view>
        </view>

        <view class="no-order" wx:if="{{allListsLength == 0 && orderFlag}}">
            <image class="img" src="http://image.vdongchina.com/M00/06/11/ZSUkmVoXunCENTEZAAAAAN3fCpE609.png"></image>
            <view class="txt">暂无相关订单</view>
            <view class="txt1">如果您已是推客，那就赶紧去推广吧！ 马上有钱哦！</view>
        </view>        
    </view>
</template>

<script>
export default {
  config: {
    navigationBarTitleText: "订单"
  },
  data() {
    return {
      currentTab: 0,
      status: "",
      items: [
        { status: "全部", type: 1 },
        { status: "待付款", type: 2 },
        { status: "待发货", type: 3 },
        { status: "待收货", type: 4 },
        { status: "退款售后", type: 5 }
      ],
      allListsLength: 0,
      allLists: [],
      orderId: "",
      orderFlag: 0
    };
  },
  onLoad(e) {
    var that = this;
    if (e.ordno) {
      that.shopcartOrd(e.ordno);
    } else {
      if (e.type == 1) {
        that.currentTab = 0;
        that.status = "";
      } else if (e.type == 2) {
        that.currentTab = 1;
        that.status = "?ordState=0";
      } else if (e.type == 3) {
        that.currentTab = 2;
        that.status = "?ordState=1";
      } else if (e.type == 4) {
        that.currentTab = 3;
        that.status = "?ordState=2";
      } else if (e.type == 5) {
        that.currentTab = 4;
        that.status = "?refundState=6";
      }
      wx.showLoading({
        title: "正在拼命加载中"
      });
      wx.request({
        url:
          that.$root.apiServer +
          that.$root.appid +
          that.$root.variate +
          "/basic/client/distribution/order/listPage" +
          that.status,
        data: {
          token: that.$root.globalData.token,
          pageSize: 100,
          currentPage: 1,
          pid: that.$root.globalData.pid
        },
        method: "POST",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success: function(res) {
          if (res.data.code == "200") {
            wx.hideLoading();
            that.allLists = res.data.object.list;
            console.log(that.allLists, "gggggggggggggggg");
            that.allListsLength = that.allLists.length;
            that.orderFlag = 1;
          } else {
            wx.hideLoading();
            wx.showLoading({
              title: "数据加载失败!",
              icon: "loading"
            });
          }
        }
      });
    }
  },
  methods: {
    //购物车提交订单
    shopcartOrd(arr) {
      var that = this;
      wx.request({
        url:
          that.$root.apiServer +
          that.$root.appid +
          that.$root.variate +
          "/basic/client/distribution/order/queryOrderList",
        data: {
          token: that.$root.globalData.token,
          idsList: arr,
          pid: that.$root.globalData.pid
        },
        method: "POST",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success: function(res) {
          if (res.data.code == "200") {
            that.allLists = res.data.object;
            that.allListsLength = that.allLists.length;
            that.orderFlag = 1;
          } else {
            wx.showLoading({
              title: "数据加载失败!",
              icon: "loading"
            });
          }
        }
      });
    },
    // 查看不同类型订单
    navbarTap(type) {
      var that = this;
      wx.showLoading({
        title: "正在拼命加载中"
      });
      if (type == 1) {
        that.currentTab = 0;
        that.status = "";
      } else if (type == 2) {
        that.currentTab = 1;
        that.status = "?ordState=0";
      } else if (type == 3) {
        that.currentTab = 2;
        that.status = "?ordState=1";
      } else if (type == 4) {
        that.currentTab = 3;
        that.status = "?ordState=2";
      } else if (type == 5) {
        that.currentTab = 4;
        that.status = "?refundState=6";
      }
      wx.request({
        url:
          that.$root.apiServer +
          that.$root.appid +
          that.$root.variate +
          "/basic/client/distribution/order/listPage" +
          that.status,
        data: {
          token: that.$root.globalData.token,
          pageSize: 100,
          currentPage: 1,
          pid: that.$root.globalData.pid
        },
        method: "POST",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success: function(res) {
          if (res.data.code == "200") {
            that.allLists = res.data.object.list;
            that.allListsLength = that.allLists.length;
            wx.hideLoading();
          }
        }
      });
    },
    // 进入订单详情
    toOrderDetail(id, ordType) {
      if (ordType) {
        wx.showModal({
          title: "提示",
          content: "请到我的砍价列表取消"
        });
        return;
      }
      wx.navigateTo({
        url: "../f_orderdetail/f_orderdetail?orderId=" + id
      });
    },
    // 查看物流
    toFlow(id) {
      wx.navigateTo({
        url: "../f_orderflow/f_orderflow?expressId=" + id
      });
    },
    // 申请退款
    toRefunds(id) {
      var that = this;
      wx.showModal({
        title: "提示",
        content: "确定要退款吗？",
        success: function(res) {
          if (res.confirm) {
            // console.log('用户点击确定')
            //申请退款（订单已支付，已发货，未申请退款）
            wx.request({
              url:
                that.$root.apiServer +
                that.$root.appid +
                that.$root.variate +
                "/basic/client/distribution/order/refundApply/" +
                id,
              data: {
                token: that.$root.globalData.token,
                pid: that.$root.globalData.pid
              },
              method: "GET",
              header: {
                "content-type": "application/x-www-form-urlencoded"
              },
              success: function(res) {
                if (res.data.code == "200") {
                  wx.showToast({
                    title: "退款申请已提交，等待卖家处理",
                    icon: "success",
                    duration: 2000,
                    mask: true,
                    success: function() {
                      wx.request({
                        url:
                          that.$root.apiServer +
                          that.$root.appid +
                          that.$root.variate +
                          "/basic/client/distribution/order/listPage" +
                          that.status,
                        data: {
                          token: that.$root.globalData.token,
                          pageSize: 100,
                          currentPage: 1,
                          pid: that.$root.globalData.pid
                        },
                        method: "POST",
                        header: {
                          "content-type": "application/x-www-form-urlencoded"
                        },
                        success: function(res) {
                          if (res.data.code == "200") {
                            that.allLists = res.data.object.list;
                            that.allListsLength = that.allLists.length;
                          }
                        }
                      });
                    }
                  });
                } else {
                  wx.showLoading({
                    title: "退款申请提交失败",
                    icon: "loading",
                    duration: 2000
                  });
                }
              }
            });
          } else if (res.cancel) {
            // console.log('用户点击取消')
          }
        }
      });
    },
    // 取消订单
    toCancel(id, ordType) {
      if (ordType) {
        wx.showModal({
          title: "提示",
          content: "请到我的砍价列表查看"
        });
        return;
      }
      var that = this;
      //取消订单
      wx.showModal({
        title: "提示",
        content: "你确定要取消订单吗？",
        success: function(res) {
          if (res.confirm) {
            // console.log('用户点击确定')
            wx.request({
              url:
                that.$root.apiServer +
                that.$root.appid +
                that.$root.variate +
                "/basic/client/distribution/order/cancel/" +
                id,
              data: {
                token: that.$root.globalData.token,
                pid: that.$root.globalData.pid
              },
              method: "GET",
              header: {
                "content-type": "application/x-www-form-urlencoded"
              },
              success: function(res) {
                if (res.data.code == "200") {
                  wx.request({
                    url:
                      that.$root.apiServer +
                      that.$root.appid +
                      that.$root.variate +
                      "/basic/client/distribution/order/listPage" +
                      that.status,
                    data: {
                      token: that.$root.globalData.token,
                      pageSize: 100,
                      currentPage: 1,
                      pid: that.$root.globalData.pid
                    },
                    method: "POST",
                    header: {
                      "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(res) {
                      if (res.data.code == "200") {
                        that.allLists = res.data.object.list;
                        that.allListsLength = that.allLists.length;
                        wx.showToast({
                          title: "取消订单成功",
                          icon: "success",
                          mask: true,
                          duration: 2000
                        });
                      } else {
                        wx.showLoading({
                          title: "取消订单失败",
                          icon: "loading",
                          duration: 2000
                        });
                      }
                    }
                  });
                } else {
                  wx.showLoading({
                    title: "取消订单失败",
                    icon: "loading",
                    duration: 2000
                  });
                }
              }
            });
          } else if (res.cancel) {
            // console.log('用户点击取消')
          }
        }
      });
    },
    //删除订单
    toDelete(id) {
      var that = this;
      wx.showModal({
        title: "提示",
        content: "你确定要删除订单吗？",
        success: function(res) {
          if (res.confirm) {
            // console.log('用户点击确定')
            wx.request({
              url:
                that.$root.apiServer +
                that.$root.appid +
                that.$root.variate +
                "/basic/client/distribution/order/delete/" +
                id,
              data: {
                token: that.$root.globalData.token
              },
              method: "GET",
              header: {
                "content-type": "application/x-www-form-urlencoded"
              },
              success: function(res) {
                if (res.data.code == "200") {
                  wx.request({
                    url:
                      that.$root.apiServer +
                      that.$root.appid +
                      that.$root.variate +
                      "/basic/client/distribution/order/listPage" +
                      that.status,
                    data: {
                      token: that.$root.globalData.token,
                      pageSize: 100,
                      currentPage: 1,
                      pid: that.$root.globalData.pid
                    },
                    method: "POST",
                    header: {
                      "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(res) {
                      if (res.data.code == "200") {
                        that.allLists = res.data.object.list;
                        that.allListsLength = that.allLists.length;
                        wx.showToast({
                          title: "删除订单成功",
                          icon: "success",
                          mask: true,
                          duration: 2000
                        });
                      } else {
                        wx.showLoading({
                          title: "删除订单失败",
                          icon: "loading",
                          duration: 2000
                        });
                      }
                    }
                  });
                }
              }
            });
          } else if (res.cancel) {
            // console.log('用户点击取消')
          }
        }
      });
    },
    // 立即支付
    toPay(id, ordType) {
      if (ordType) {
        wx.showModal({
          title: "提示",
          content: "请到我的砍价列表支付"
        });
        return;
      }
      wx.navigateTo({
        url: "../f_confirmorder/f_confirmorder?ordno=" + id
      });
    },
    //确认收货
    toConfirm(id) {
      var that = this;
      wx.showModal({
        title: "提示",
        content: "你确定要确认收货吗？",
        success: function(res) {
          if (res.confirm) {
            // console.log('用户点击确定')
            //确认收货
            wx.request({
              url:
                that.$root.apiServer +
                that.$root.appid +
                that.$root.variate +
                "/basic/client/distribution/order/confirmReceipt/" +
                id,
              data: {
                token: that.$root.globalData.token
              },
              method: "GET",
              header: {
                "content-type": "application/x-www-form-urlencoded"
              },
              success: function(res) {
                if (res.data.code == "200") {
                  wx.request({
                    url:
                      that.$root.apiServer +
                      that.$root.appid +
                      that.$root.variate +
                      "/basic/client/distribution/order/listPage" +
                      that.status,
                    data: {
                      token: that.$root.globalData.token,
                      pageSize: 100,
                      currentPage: 1,
                      pid: that.$root.globalData.pid
                    },
                    method: "POST",
                    header: {
                      "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(res) {
                      if (res.data.code == "200") {
                        that.allLists = res.data.object.list;
                        that.allListsLength = that.allLists.length;
                        wx.showToast({
                          title: "订单已完成",
                          icon: "success",
                          mask: true,
                          duration: 2000
                        });
                      } else {
                        wx.showLoading({
                          title: "确认收货失败",
                          icon: "loading",
                          duration: 2000
                        });
                      }
                    }
                  });
                } else {
                  wx.showLoading({
                    title: "确认收货失败",
                    icon: "loading",
                    duration: 2000
                  });
                }
              }
            });
          } else if (res.cancel) {
            // console.log('用户点击取消')
          }
        }
      });
    }
  }
};
</script>

<style scoped>
page {
  height: 100%;
}
.left {
  float: none;
}
.right {
  float: none;
}
.container {
  height: 100%;
  background: #f2f2f2;
}
/*订单类型*/
._me_title_items {
  display: flex;
  width: 100%;
  height: 84rpx;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1rpx solid #e5e5e5;
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
}
._me_title_Item {
  height: 84rpx;
  line-height: 84rpx;
  color: #666;
  font-size: 28rpx;
  box-sizing: border-box;
}
.active {
  border-bottom: solid 4rpx #262833;
  color: #262833;
}
.container .goodsLists {
  padding-top: 84rpx;
  min-height: 600rpx;
  background: #f2f2f2;
}
.container .goods {
  min-height: 420rpx;
  background: #fff;
}
.container .name-status {
  height: 80rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
}
.container .name-status .name {
  margin-left: 30rpx;
  font-size: 28rpx;
  height: 28rpx;
  line-height: 28rpx;
  color: #333;
}
.container .name-status .status {
  margin-right: 30rpx;
  height: 28rpx;
  width: 200rpx;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.container .name-status .status .status1 {
  font-size: 28rpx;
  height: 28rpx;
  line-height: 28rpx;
  color: #999;
}
.container .name-status .status .status2 {
  font-size: 28rpx;
  height: 28rpx;
  line-height: 28rpx;
  color: #11bd50;
}
.container .goodsdetail {
  min-height: 180rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fafafa;
  margin-bottom: 6rpx;
}
.container .goodsdetail:last-child {
  margin-bottom: none;
}
.container .goodsdetail .img {
  height: 120rpx;
  width: 120rpx;
  margin: 0 20rpx 0 30rpx;
}
.container .goodsdetail .txt {
  height: 120rpx;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-right: 30rpx;
}
.container .goodsdetail .txt .txt-top {
  height: 64rpx;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.container .goodsdetail .txt .txt-top .left {
  width: 370rpx;
  height: 64rpx;
  line-height: 32rpx;
  font-size: 26rpx;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.container .goodsdetail .txt .txt-top .right {
  flex: 1;
  display: flex;
  height: 64rpx;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
}
.container .goodsdetail .txt .txt-top .right .t {
  height: 28rpx;
  line-height: 28rpx;
  font-size: 28rpx;
  color: #333;
  margin-bottom: 4rpx;
}
.container .goodsdetail .txt .txt-bottom {
  width: 100%;
  height: 24rpx;
  margin-bottom: 2rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.container .goodsdetail .txt .txt-bottom .left {
  height: 24rpx;
}
.l_size {
  display: inline-block;
  font-size: 24rpx;
  color: #999;
  height: 24rpx;
  line-height: 24rpx;
  margin-right: 10rpx;
}
.container .goodsdetail .txt .txt-bottom .right {
  font-size: 24rpx;
  color: #999;
  height: 24rpx;
  line-height: 24rpx;
}
.container .bottom-pay {
  height: 80rpx;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: #fff;
  border-bottom: 1rpx solid #e5e5e5;
  box-sizing: border-box;
}
.container .bottom-pay .right {
  height: 79rpx;
  line-height: 80rpx;
  font-size: 24rpx;
  color: #333;
  margin-right: 30rpx;
}
.container .bottom-pay .right .num {
  height: 80rpx;
  line-height: 80rpx;
  display: inline-block;
  font-size: 32rpx;
  color: #333;
}
.container .btn {
  height: 80rpx;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: #fff;
  margin-bottom: 20rpx;
}
.container .btn .type1 {
  height: 54rpx;
  width: 150rpx;
  line-height: 54rpx;
  text-align: center;
  font-size: 26rpx;
  color: #333;
  margin-right: 20rpx;
  border-radius: 6rpx;
  border: 1rpx solid #999;
}
.container .btn .type2 {
  height: 54rpx;
  width: 150rpx;
  line-height: 54rpx;
  text-align: center;
  font-size: 26rpx;
  color: #fff;
  margin-right: 20rpx;
  border-radius: 6rpx;
  background: #4e5059;
}
.container .btn .right {
  width: 10rpx;
  height: 100%;
}
.container .no-order {
  min-height: 600rpx;
  position: relative;
}
.container .no-order .img {
  position: absolute;
  top: 200rpx;
  left: 50%;
  margin-left: -100rpx;
  width: 200rpx;
  height: 200rpx;
  display: block;
}
.container .no-order .txt {
  position: absolute;
  top: 444rpx;
  left: 0;
  width: 100%;
  text-align: center;
  height: 56rpx;
  line-height: 56rpx;
  font-size: 40rpx;
  color: #000;
}
.container .no-order .txt1 {
  position: absolute;
  top: 530rpx;
  left: 0;
  width: 476rpx;
  text-align: center;
  min-height: 42rpx;
  line-height: 42rpx;
  font-size: 28rpx;
  color: #888;
  padding: 0 137rpx;
}
</style>

