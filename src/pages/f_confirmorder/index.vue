<template>
    <view class="container">
        <!-- <view class="f_tips">订单每满 2000 元 可获得 5 积分，本次下单可获赠 15 积分</view> -->
        <view class="address">
            <!-- 新加自提代码 -->
            <view class="f_selfPick" wx:if="{{since && stateFlag}}">
                <view class="f_flowBtn" @tap="getAddress(realName)">物流配送</view>
                <view class="f_selfPickBtn" @tap="selfPick">买家自提</view>
            </view>

            <view class="no-address" @tap="getAddress(realName)" wx:if="{{!selfPick && !since && !userName && stateFlag}}">
                <image class="wechat" src="http://image.vdongchina.com/M00/06/13/ZSUkmVoXvsOED_QFAAAAAPC1bZo087.png"></image>
                <view class="txt">一键获取微信地址</view>

                <image class="img" src="http://image.vdongchina.com/M00/06/10/ZSUkmVoXtlyEJpXrAAAAAGJ4S4M326.png"></image>
            </view>

            <view class="has-address" @tap="getAddress(realName)" wx:if="{{!selfPick && !since && userName && stateFlag}}">
                <image class="address-img" src="http://image.vdongchina.com/M00/06/10/ZSUkmVoXtIGEIwJSAAAAAN0vt8A367.png"></image>
                <view class="txt">
                    <view class="txt-top">
                        <view class="left">收货人：<view class="name">{{userName}}</view></view>
                        <view class="right">{{telNumber}}</view>
                    </view>
                    <view class="txt-bottom">收货地址:{{address}}</view>
                </view>
                <image  class="img" src = "{{realName?'':'http://image.vdongchina.com/M00/06/10/ZSUkmVoXtlyEJpXrAAAAAGJ4S4M326.png'}}"></image>
            </view>                
            
            <view class="has-address" wx:if="{{selfPick && stateFlag}}">
                <image class="address-img" src="http://image.vdongchina.com/M00/06/10/ZSUkmVoXtIGEIwJSAAAAAN0vt8A367.png"></image>
                <view class="txt">
                    <view class="txt-top">
                        <view class="left">联系电话：<view class="name">{{sellerPhone}}</view></view>
                        <view class="right"></view>
                    </view>
                    <view class="txt-bottom">自提地址:{{sellerAddress}}</view>
                </view>
                <image class="img" src=""></image>
            </view> 

        </view>
        <image class="line-img" src="http://image.vdongchina.com/M00/06/11/ZSUkmVoXuQKEHbxPAAAAAMjPeio241.png" mode="aspectFill"></image>
        <view class="goods_list">
            <view class="shop-name">
                <view class="name">{{shopName}}</view>
            </view>
            <view class="goodsdetail" wx:for="{{itemList}}" wx:key="gg" @tap="toDetails(item.sku.product.id)">
                <image class="img" src="{{item.sku.product.imageList[0].url}}"></image>
                <view class="txt">
                    <view class="txt-top">
                        <view class="left">{{item.sku.product.name}}</view>
                        <view class="right">
                            <view class="t">￥{{item.presentPrice}}</view>
                        </view>
                    </view>
                    <view class="txt-bottom">
                        <view class="left">
                        	<view class="l_size" wx:for="{{item.sku.salePropertyList}}" wx:for-item="itemBox">
                        		{{itemBox.salePropertyName}} 
                        	</view>      	
                        </view>
                        <view class="right">x{{item.quantity}}</view>
                    </view>
                </view>
            </view>
            <view class="shop-discount" @tap="toDiscount">
                <view class="name">店铺优惠</view>
                <view class="right">
                    <view class="txt">{{inputTxt}}</view>
                    <image class="img" src="http://image.vdongchina.com/M00/06/10/ZSUkmVoXtlyEJpXrAAAAAGJ4S4M326.png"></image>
                </view>
            </view>
            <view class="express">
                <view class="name">快递运费</view>
                <view class="txt">{{flowFees}}元</view>
            </view>
            <!-- <view class="total">
                <view class="name">店铺合计</view>
                <view class="txt">￥{{totalAmount}}</view>
            </view> -->
            <view class="message">
                <view class="name">买家留言：</view>
                <input class="inp" placeholder="选填：对本次交易的说明" type="text" @input="bindblur" maxlength="22" value="{{buyMsg}}"/>
            </view>
            <view class="f_total">
                <view class="f_total_detail">共{{totalNum}}件商品 小计： ￥{{totalAmount}}</view>
            </view>
            <!-- <view class="f_points">
                <view class="f_points_left">可用150积分抵用10元</view>
                <view class="f_points_right">
                    <switch class="f_points_toggle" checked="{{item.type}}" @change="switchChange(item.productId, $event)"/>
                </view>
            </view> -->
        </view>
        
        <view class="bottom-pay">
            <view class="left">合计金额： ￥<view class="num">{{totalAmount}}</view></view>
            <view class="right" @tap="pay">立即支付</view>
        </view>
        <view class="discount-dialog" wx:if="{{flag1}}">
            <view class="content">
                <view class="top">请选择优惠</view>
                <radio-group class="radio-group" @change="radioChange">
                    <label class="radio">{{discountNum}}元代金券<radio value="{{discountNum}}元代金券"/></label>
                    <label class="radio">不使用优惠<radio value="不使用优惠"/></label>
                </radio-group>
                <view class="bottom" @tap="toClose">关闭</view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
  config: {
    navigationBarTitleText: "确认订单"
  },
  data() {
    return {
      stateFlag: 0,//加载完毕通过stateFlag决定显示哪种地址状态
      flag1: 0,//代金券弹窗开关
      inputTxt: "暂无优惠",//是否使用代金券
      userName: "",//姓名字段
      telNumber: "",//电话字段
      address: "",//地址字段
      itemList: [],//订单商品列表
      totalAmount: 0, //总价
      totalNum: "", //总数
      ordno: "",//订单编号
      orderId: "", //详情ID
      buyMsg: "",//买家留言
      shopName: "",//店铺名称
      discountNum: 0,//代金券金额
      couponId: "",//代金券id
      since: 0,//判断商家是否开启自提
      sinceFlag:0,//记录刚加载进订单页时的自提状态
      selfPick: false, //买家是否选择自提
      sellerPhone: "", //商家电话
      sellerAddress: "", //商家地址
      province: "",// 省字段
      city: "",//市字段，通过记录省市查询运费
      flowFees: 0,// 运费金额(字段缺失或为零时显示包邮)
      realName:0,//查询订单中是否有买家信息
    };
  },
  onLoad(e) {
    var that = this;
    wx.request({
      url:that.$root.apiServer + that.$root.appid + that.$root.variate + "/basic/client/distribution/order/detailByOrderNo/" + e.ordno,
      data: {
        token: that.$root.globalData.token,
        id: e.ordno,
        pid: that.$root.globalData.pid
      },
      method: "GET",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        if (res.data.code == "200") {
          if (res.data.object.order) {
            let order = res.data.object.order;
            //商品基本信息
            that.itemList = order.itemList;
            //商品价格合计
            that.totalAmount = order.payAmount;
            that.totalAmount = that.totalAmount.toFixed(2);
            //商品数量
            that.totalNum = order.totalNum;
            //订单ID
            that.ordno = order.ordno;
          }

          //获取自提电话和地址
          if (res.data.object.comm && res.data.object.comm.since) {
            //是否开启自提功能
            that.since = res.data.object.comm.since;
            that.sinceFlag = res.data.object.comm.since;
            if (res.data.object.comm.phone) {
              that.sellerPhone = res.data.object.comm.phone;
            }
            if (res.data.object.comm.province && res.data.object.comm.city && res.data.object.comm.region) {
              that.sellerAddress =res.data.object.comm.province.split(/[_,0-9]/)[0] + res.data.object.comm.city.split(/[_,0-9]/)[0] + res.data.object.comm.region.split(/[_,0-9]/)[0] + res.data.object.comm.address;
            }
          }
          //获取优惠券
          if (res.data.object.coupon) {
            that.discountNum = res.data.object.coupon.money;
            that.couponId = "?couponId=" + res.data.object.coupon.couponId;
            that.inputTxt = "请选择优惠券";
          } else {
            that.discountNum = 0;
            that.couponId = "";
            that.inputTxt = "暂无优惠";
          }
          
          //获取买家提供的地址联系方式
          if (res.data.object.order.realName) {
            that.realName = 1
            that.userName = res.data.object.order.realName;
            that.telNumber = res.data.object.order.mobile;
            that.address = res.data.object.order.address;
            that.since = 0;
          }
          //如果此订单为自提的未支付订单，直接判断订单状态直接填入自提地址联系方式
          if (res.data.object.order.shippingWay == 2) {
            that.selfPick = true;
            that.since = 0;
          }
          //判断商品所属的店铺名称
          if (res.data.object.order.dUserShop && res.data.object.order.dUserShop.shopName) {
            that.shopName = res.data.object.order.dUserShop.shopName;
          }else{
            that.shopName = '总店'
          }
          if (res.data.object.order.shipPrice > 0) {
            if (res.data.object.order.realName) {
              that.flowFees = res.data.object.order.shipPrice;
            } else {
              that.flowFees = 0;
            }
          }
          //加载完毕通过stateFlag决定显示哪种状态
          that.stateFlag = 1;
        } else {
          wx.showLoading({
            title: "数据加载失败",
            icon: "loading",
            duration: 2000
          });
        }
      }
    });

    //获取优惠券
    // wx.request({
    //    url:this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/dUserCoupon/listCoupon',
    //    data:{
    //    		token: that.$root.globalData.token
    //    },
    //    method:"POST",
    //     header: {
    //        'content-type': 'application/x-www-form-urlencoded'
    //    },
    //    success: function(res) {
    //    		if(res.data.code =="200"){
    //             that.discountNum = res.data.object.money
    //             // that.couponId = res.data.object.
    //    		}
    //    }
    // })
  },
  methods: {
    selfPick() {
      var that = this;
      wx.showModal({
        title: "提示",
        content: "买家自提，需买家自己到卖家指定地点取货！",
        success: function(res) {
          if (res.confirm) {
            if (that.sellerPhone && that.sellerAddress) {
              that.since = 0;
              that.selfPick = true;
            } else {
              wx.showLoading({
                title: "卖家地址不完整",
                icon: "loading",
                duration: 2000
              });
            }
          } else if (res.cancel) {
          }
        }
      });
    },
    getAddress(name) {
      var that = this;
      // 获取用户收货地址
      if (wx.chooseAddress) {
        if(!name){
          wx.chooseAddress({
            success: function(res) {
              console.log(res)
              var f_userName = res.userName;
              var f_telNumber = res.telNumber;
              var f_address = res.provinceName + res.cityName + res.countyName + res.detailInfo;
              that.province = res.provinceName;
              that.city = res.cityName;
              if (that.province && that.city) {
                wx.request({
                  url:that.$root.apiServer + that.$root.appid + that.$root.variate + "/basic/client/distribution/order/queryExpressCost",
                  data: {
                    orderId: that.ordno,
                    province: that.province,
                    city: that.city,
                    token: that.$root.globalData.token
                  },
                  method: "POST",
                  header: {
                    "content-type": "application/x-www-form-urlencoded"
                  },
                  success: function(res) {
                    if (res.data.code == 200) {
                      if (res.data.object.shipPrice && res.data.object.shipPrice>0) {
                          console.log(res,"beijing")
                          that.userName = f_userName;
                          that.telNumber = f_telNumber;
                          that.address = f_address;
                          that.totalAmount = that.totalAmount - that.flowFees;
                          that.flowFees = parseFloat(res.data.object.shipPrice);
                          that.totalAmount = parseFloat(that.totalAmount) + that.flowFees;
                          that.totalAmount = that.totalAmount.toFixed(2);
                          that.since = 0;
                      }else{
                          console.log(res,"包邮")
                          that.userName = f_userName;
                          that.telNumber = f_telNumber;
                          that.address = f_address;
                          that.totalAmount = that.totalAmount - that.flowFees;
                          that.flowFees = 0;
                          that.totalAmount = that.totalAmount.toFixed(2);
                          that.since = 0;
                      }
                    } else {
                      that.userName = '';
                      that.since = that.sinceFlag;
                      that.totalAmount = that.totalAmount - that.flowFees;
                      that.flowFees = 0;
                      that.totalAmount = that.totalAmount.toFixed(2);
                      if (res.data.message) {
                        wx.showModal({
                          title: "提示",
                          content: res.data.message,
                          showCancel: false
                        });
                      } else {
                        wx.showModal({
                          title: "提示",
                          content: "运费查询出现异常",
                          showCancel: false
                        });
                      }
                    }
                  }
                });
              }
            }
          });
        }else{
          return
        }
      } else {
        // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
        wx.showModal({
          title: "提示",
          content:
            "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
        });
      }
    },
    //支付
    pay() {
      var that = this;
      if (that.selfPick) {
        if (that.ordno) {
          wx.request({
            url:that.$root.apiServer + that.$root.appid + that.$root.variate + "/basic/client/distribution/order/pay/" + that.ordno + that.couponId,
            data: {
              token: that.$root.globalData.token,
              orderId: that.ordno,
              mobile: that.sellerPhone,
              address: that.sellerAddress,
              realName: that.userName,
              remark: that.buyMsg,
              pid: that.$root.globalData.pid,
              since: that.selfPick
            },
            method: "POST",
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            success: function(res) {
              if (res.data.code == 200) {
                that.orderId = res.data.object.orderId;
                wx.requestPayment({
                  timeStamp: res.data.object.timeStamp,
                  nonceStr: res.data.object.nonceStr,
                  package: res.data.object.package,
                  signType: res.data.object.signType,
                  paySign: res.data.object.paySign,
                  success(rst) {
                    wx.redirectTo({
                      url:
                        "../f_orderdetail/f_orderdetail?orderId=" + that.orderId
                    });
                  },
                  fail(rst) {
                    wx.redirectTo({
                      url:
                        "../f_order/f_order?type=2"
                    });
                  }
                });
                // wx.redirectTo({
                //     url:"../membershipCardPay/membershipCardPay?id=" + that.orderId + "&price=" + that.totalAmount + "&isType=2"
                // });
              } else {
                wx.showToast({
                  title: "支付接口异常",
                  icon: "loading",
                  duration: 2000,
                  mask:true
                });
              }
              // wx.requestPayment({
              // 	'timeStamp': res.data.object.timeStamp,
              // 	'nonceStr': res.data.object.nonceStr,
              // 	'package': res.data.object.package,
              // 	'signType': res.data.object.signType,
              // 	'paySign': res.data.object.paySign,
              // 	success(rst) {
              //
              // 		wx.redirectTo({
              // 			url:'../f_orderdetail/f_orderdetail?orderId='+ that.orderId
              // 		})
              // 	},
              // 	fail(rst) {
              //
              // 	}
              // })
            }
          });
        }
      } else if (that.userName) {
        if (that.ordno) {
          wx.request({
            url:this.$root.apiServer + this.$root.appid + this.$root.variate + "/basic/client/distribution/order/pay/" + that.ordno + that.couponId,
            data: {
              token: that.$root.globalData.token,
              orderId: that.ordno,
              mobile: that.telNumber,
              address: that.address,
              realName: that.userName,
              remark: that.buyMsg,
              pid: that.$root.globalData.pid,
              since: that.selfPick
            },
            method: "POST",
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            success: function(res) {
              if (res.data.code == 200) {
                that.orderId = res.data.object.orderId;
                wx.requestPayment({
                  timeStamp: res.data.object.timeStamp,
                  nonceStr: res.data.object.nonceStr,
                  package: res.data.object.package,
                  signType: res.data.object.signType,
                  paySign: res.data.object.paySign,
                  success(rst) {
                    wx.redirectTo({
                      url:
                        "../f_orderdetail/f_orderdetail?orderId=" + that.orderId
                    });
                  },
                  fail(rst) {
                    wx.redirectTo({
                      url:
                        "../f_order/f_order?type=2"
                    });
                  }
                });
                // wx.redirectTo({
                //     url:"../membershipCardPay/membershipCardPay?id=" + that.orderId + "&price=" + that.totalAmount + "&isType=2"
                // });
              } else {
                wx.showToast({
                  title: "支付接口异常",
                  icon: "loading",
                  duration: 2000
                });
              }
              //   wx.requestPayment({
              //   	'timeStamp': res.data.object.timeStamp,
              //   	'nonceStr': res.data.object.nonceStr,
              //   	'package': res.data.object.package,
              //   	'signType': res.data.object.signType,
              //   	'paySign': res.data.object.paySign,
              //   	success(rst) {

              //   		wx.redirectTo({
              //   			url:'../f_orderdetail/f_orderdetail?orderId='+ that.orderId

              //   		})
              //   	},
              //   	fail(rst) {

              //   	}
              //   })
            }
          });
        }
      } else {
        wx.showModal({
          title: "提示",
          content: "地址别忘了填写哦",
          showCancel: false
        });
      }
    },
    bindblur(e) {
      if (e.detail.value != "") {
        this.buyMsg = e.detail.value;
      }
    },
    toDiscount() {
      if (this.discountNum != 0) {
        this.flag1 = true;
      } else {
        this.flag1 = false;
      }
    },
    radioChange(e) {
      var that = this;
      if (e.detail.value != 0) {
        that.inputTxt = e.detail.value;
        if (that.inputTxt != "不使用优惠") {
          that.couponId = that.couponId;
          //that.totalAmount = that.totalAmount - that.discountNum
          if (that.totalAmount - that.discountNum > 0) {
            that.totalAmount = that.totalAmount - that.discountNum;
          } else {
            that.totalAmount = 0;
          }
        } else {
          that.couponId = "";
        }
      }
    },
    toClose() {
      this.flag1 = false;
    },
    //详情
    toDetails(id) {
      wx.navigateTo({
        url: "../f_goodsdetail/f_goodsdetail?id=" + id
      });
    }
  }
};
</script>

<style scoped>
.f_points {
  border-top: 1rpx solid #e5e5e5;
  border-bottom: 1rpx solid #e5e5e5;
  box-sizing: border-box;
  height: 88rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  margin-bottom: 30rpx;
}
.f_points_left {
  height: 28rpx;
  line-height: 28rpx;
  color: #333333;
  font-size: 28rpx;
  margin-left: 30rpx;
}
.f_points_right {
  margin-right: 20rpx;
  width: 180rpx;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.f_total {
  border-top: 1rpx solid #e5e5e5;
  border-bottom: 1rpx solid #e5e5e5;
  box-sizing: border-box;
  height: 88rpx;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: #ffffff;
  margin-bottom: 20rpx;
}
.f_total_detail {
  height: 28rpx;
  line-height: 28rpx;
  color: #333333;
  font-size: 28rpx;
  margin-right: 30rpx;
}
.f_tips {
  height: 70rpx;
  line-height: 70rpx;
  text-align: center;
  font-size: 26rpx;
  color: #8b572a;
  background: #ffc46f;
}
.f_selfPick {
  /* display: none; */
  height: 180rpx;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.f_flowBtn {
  width: 150rpx;
  height: 54rpx;
  box-sizing: border-box;
  border-radius: 6rpx;
  border: 1rpx solid #999;
  margin-right: 60rpx;
  font-size: 26rpx;
  line-height: 54rpx;
  color: #333;
  text-align: center;
}
.f_selfPickBtn {
  width: 150rpx;
  height: 54rpx;
  box-sizing: border-box;
  border-radius: 6rpx;
  border: 1rpx solid #999;
  font-size: 26rpx;
  line-height: 54rpx;
  color: #333;
  text-align: center;
}
.goods_list {
  min-height: 700rpx;
  overflow: scroll;
  background: #f2f2f2;
  padding-bottom: 98rpx;
}
page {
  height: 100%;
}
.container {
  height: 100%;
  background: #f2f2f2;
  /* overflow: scroll; */
}
.left {
  float: none;
}
.right {
  float: none;
}
.container .address {
  height: 180rpx;
}
.container .address .no-address {
  height: 180rpx;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.container .address .no-address .wechat {
  height: 48rpx;
  width: 48rpx;
  margin: 0 20rpx 0 30rpx;
  display: block;
}
.container .address .no-address .img {
  height: 48rpx;
  width: 36rpx;
  margin-right: 24rpx;
  display: block;
}
.container .address .no-address .txt {
  flex: 1;
  font-size: 32rpx;
  height: 32rpx;
  line-height: 32rpx;
  color: #222;
}
.container .address .has-address {
  height: 180rpx;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.container .address .has-address .address-img {
  height: 48rpx;
  width: 30rpx;
  margin: 0 21rpx 0 24rpx;
  display: block;
}
.container .address .has-address .txt {
  height: 180rpx;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.container .address .has-address .txt .txt-top {
  height: 32rpx;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
}
.container .address .has-address .txt .txt-top .left {
  height: 32rpx;
  line-height: 32rpx;
  font-size: 32rpx;
  color: #222;
}
.container .address .has-address .txt .txt-top .left .name {
  display: inline-block;
}
.container .address .has-address .txt .txt-top .right {
  font-size: 32rpx;
  color: #222;
  height: 32rpx;
  line-height: 32rpx;
}
.container .address .has-address .txt .txt-bottom {
  height: 64rpx;
  line-height: 32rpx;
  font-size: 26rpx;
  color: #222;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.container .address .has-address .img {
  height: 48rpx;
  width: 36rpx;
  padding: 0 24rpx 0 15rpx;
}
.container .line-img {
  height: 10rpx;
  display: block;
  width: 100%;
  margin-bottom: 30rpx;
}
.container .shop-name {
  height: 88rpx;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: #fff;
}
.container .shop-name .name {
  height: 28rpx;
  line-height: 28rpx;
  font-size: 28rpx;
  color: #333;
  margin-left: 30rpx;
}
.container .goodsdetail {
  height: 190rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fafafa;
}
.container .goodsdetail .img {
  height: 150rpx;
  width: 150rpx;
  margin: 0 20rpx 0 30rpx;
}
.container .goodsdetail .txt {
  height: 150rpx;
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
  justify-content: flex-end;
  align-items: flex-start;
}
.container .goodsdetail .txt .txt-top .right .t {
  height: 28rpx;
  line-height: 28rpx;
  font-size: 28rpx;
  color: #333;
}
.container .goodsdetail .txt .txt-bottom {
  width: 100%;
  height: 24rpx;
  margin-bottom: 10rpx;
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
}
.container .shop-discount {
  height: 88rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-bottom: 1rpx solid #e5e5e5;
  box-sizing: border-box;
}
.container .shop-discount .name {
  margin-left: 30rpx;
  font-size: 28rpx;
  color: #333;
  height: 28rpx;
  line-height: 28rpx;
}
.container .shop-discount .right {
  margin-right: 24rpx;
  width: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.container .shop-discount .right .txt {
  font-size: 28rpx;
  color: #999;
  height: 28rpx;
  line-height: 28rpx;
}
.container .shop-discount .right .img {
  height: 48rpx;
  width: 36rpx;
  display: block;
}
.container .express {
  height: 88rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1rpx solid #e5e5e5;
  background: #fff;
  box-sizing: border-box;
}
.container .express .name {
  font-size: 28rpx;
  color: #333;
  margin-left: 30rpx;
  height: 28rpx;
  line-height: 28rpx;
}
.container .express .txt {
  font-size: 28rpx;
  color: #333;
  margin-right: 30rpx;
  height: 28rpx;
  line-height: 28rpx;
}
.container .total {
  height: 88rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1rpx solid #e5e5e5;
  background: #fff;
  box-sizing: border-box;
}
.container .total .name {
  font-size: 28rpx;
  color: #333;
  margin-left: 30rpx;
  height: 28rpx;
  line-height: 28rpx;
}
.container .total .txt {
  font-size: 28rpx;
  color: #333;
  margin-right: 30rpx;
  height: 28rpx;
  line-height: 28rpx;
}
.container .message {
  height: 88rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
}
.container .message .name {
  width: 20%;
  font-size: 28rpx;
  color: #333;
  margin-left: 30rpx;
  height: 28rpx;
  line-height: 28rpx;
}
.container .message .inp {
  flex: 1;
  height: 88rpx;
  font-size: 28rpx;
  color: #333;
  line-height: 88rpx;
  z-index: 0;
}
.container .message .inp:placeholder {
  font-size: 28rpx;
  color: #878787;
  line-height: 88rpx;
  height: 88rpx;
}
.container .bottom-pay {
  border-top: 1rpx solid #e5e5e5;
  box-sizing: border-box;
  height: 98rpx;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: #fff;
}
.container .bottom-pay .left {
  height: 98rpx;
  line-height: 98rpx;
  font-size: 28rpx;
  color: #333333;
  margin-right: 39rpx;
}
.container .bottom-pay .left .num {
  height: 98rpx;
  line-height: 98rpx;
  display: inline-block;
  font-size: 36rpx;
  color: #333333;
  font-weight: 600;
}
.container .bottom-pay .right {
  height: 98rpx;
  width: 220rpx;
  background: #262833;
  color: #fff;
  font-size: 30rpx;
  line-height: 98rpx;
  text-align: center;
}
.container .discount-dialog {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
}
.container .discount-dialog .content {
  height: 452rpx;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  opacity: 1;
  background: #fff;
}
.container .discount-dialog .content .top {
  height: 88rpx;
  line-height: 88rpx;
  font-size: 32rpx;
  color: #333;
  border-bottom: 1rpx solid #e5e5e5;
  text-align: center;
}
.container .discount-dialog .content .radio-group {
  height: 178rpx;
  background: #fff;
  width: 100%;
}
.container .discount-dialog .content .radio-group .radio {
  box-sizing: border-box;
  padding-right: 50rpx;
  margin-left: 30rpx;
  width: 100%;
  height: 88rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333;
  border-bottom: 1rpx solid #e5e5e5;
  color: #333;
}
.container .discount-dialog .content .bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 98rpx;
  background: #4e5059;
  color: #fff;
  font-size: 32rpx;
  text-align: center;
  line-height: 98rpx;
}
</style>
