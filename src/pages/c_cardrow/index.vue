<template>
  <view class="c_column">
    <view class="c_box">
      <image class="c_bg" src="https://image.vdongchina.com/M00/07/C8/ZSUkmVoyWP2ESiLOAAAAAHQnvWY733.png"></image>
      <!-- <image class="c_code" src="{{'https://image.vdongchina.com/'+userInfo.cardUrl}}" /> -->
      <!-- <image class="c_code" src="{{getUrl(userInfo.cardUrl)}}" /> -->
      <image class="c_code" src="{{code}}" />
      <image class="c_logo" src="{{logoUrl}}" mode="aspectFit" />
      <!-- <image class="c_logo" src="{{'https://image.vdongchina.com/'+userInfo.data.company.companyLogo}}" mode="aspectFit" /> -->
      <!-- <image class="c_logo" src="{{getUrl(userInfo.data.company.companyLogo)}}" mode="aspectFit" /> -->
      <view class="c_company">{{userInfo.data.company.companyName}}</view>
      <view class="c_info">
        <view class="c_name">{{userInfo.userName}}</view>
        <view class="c_position">{{userInfo.positionName}}</view>
      </view>
      <view class="c_phone" @tap="call(userInfo.phone)" hover hover-class="textcolorhover">
        <image class="c_phoneImg" src="https://image.vdongchina.com/M00/07/C5/ZSUkmVoyPkqENq93AAAAAPxdcxc343.png"></image>
        <view class="c_phoneNum">+{{userInfo.phone}}</view>
      </view>
      <view class="c_phoneOther" @tap="call(userInfo.localPhone)" hover-class="textcolorhover">
        <image class="c_phoneImg" src="https://image.vdongchina.com/M00/07/C5/ZSUkmVoyP7OEZnlkAAAAAO-8Gno406.png"></image>
        <view class="c_phoneNum">{{userInfo.localPhone}}</view>
      </view>
      <view class="c_mailBox">
        <image class="c_phoneImg" src="https://image.vdongchina.com/M00/07/C5/ZSUkmVoyQBWEd3MhAAAAABqsbsQ563.png"></image>
        <view class="c_phoneNum">{{userInfo.email}}</view>
      </view>
      <view class="c_link">
        <image class="c_phoneImg" src="https://image.vdongchina.com/M00/07/C7/ZSUkmVoyT3KEckQFAAAAACkrE18449.png"></image>
        <view class="c_phoneNum">www.vdongchina.com</view>
      </view>
      <view class="c_phoneOther" @tap="call(userInfo.data.company.companyPhone)" hover-class="textcolorhover">
        <image class="c_phoneImg" src="https://image.vdongchina.com/M00/07/C5/ZSUkmVoyP7OEZnlkAAAAAO-8Gno406.png"></image>
        <view class="c_phoneNum">{{userInfo.data.company.companyPhone}}</view>
      </view>
      <view class="c_address" @tap="getAddress(userInfo.address)">
        <image class="c_addressImg" src="https://image.vdongchina.com/M00/07/C7/ZSUkmVoyUDeEGpp8AAAAAIlfzDY312.png"></image>
        <view class="c_addressName">{{userInfo.address.companyAddress}}</view>
      </view>
    </view>
    <view class="c_loading" @tap="downLoadCard">
      <!-- <view class="c_loading" @tap="debounce"> -->
      <image class="c_loadImg" src="https://image.vdongchina.com/M00/07/C7/ZSUkmVoyUd-ELV0wAAAAAGUd1CI511.png"></image>
      <view class="c_loadTxt">下载名片</view>
    </view>
    <view class="isShow">
      <canvas class="c_box isShow" style="{{'width:'+width+'px;height:'+height+'px'}}" canvas-id="firstCanvas"></canvas>
    </view>
  </view>
</template>

<script>
export default {
  config: {
    navigationBarTitleText: "横版名片"
  },
  onShareAppMessage: function() {
    return {
      title: "我的名片",
      path: "/pages/c_cardrow/c_cardrow",
      success: function(res) {
        wx.showModal({
          title: "提示",
          content: "转发失败"
        });
      },
      fail: function() {
        wx.showModal({
          title: "提示",
          content: "转发成功"
        });
      }
    };
  },
  data() {
    return {
      code: null, // 二维码
      logoUrl: null, // logo url
      userInfo: {}, //用户信息，直接从全局变量中拿 //跟下面再一次请求的数据聚合而成
      width: 0,
      height: 0
    };
  },
  methods: {
    //事件处理函数
    // call
    call(number) {
      wx.makePhoneCall({
        phoneNumber: number
      });
    },
    getAddress(userInfo) {
      const { latitude, longitude } = userInfo;
      wx.openLocation({
        latitude: Number(latitude),
        longitude: Number(longitude),
        scale: 28
      });
    },
    pxToRpx(x) {
      const { windowWidth } = wx.getSystemInfoSync();
      return 750 / windowWidth * x;
    },
    isArray(something) {
      return Object.prototype.toString.call(something) === "[object Array]";
    },
    rpxToPx(x) {
      const { windowWidth } = wx.getSystemInfoSync();
      // console.log('width',windowWidth);
      return !this.isArray(x)
        ? windowWidth / 750 * x
        : x.map(item => windowWidth / 750 * item);
    },
    // 设置canvas跟屏幕一样大小
    setPixel() {
      const { windowWidth, windowHeight } = wx.getSystemInfoSync();
      // 设置canvas跟屏幕一样大小
      this.width = this.rpxToPx(1072);
      this.height = this.rpxToPx(700);
      const ctx = arguments[0];
      // hava a problem //fixed
      ctx.setFillStyle("white");
      ctx.fillRect(0, 0, this.width, this.height);
      ctx.draw();
    },
    downAndSetImage(ctx, url, arr) {
      // arr =[x,y,width,height]
      // console.log("downImage", ctx, imgPath, x, y, width, height);
      // console.log("\n", "ctx", ctx, "33333", "\n");
      arr = this.rpxToPx(arr);
      ctx.draw(true);
      // console.log("row image is", url);
      url = new RegExp("^https").test(url)
        ? url
        : `https://image.vdongchina.com/${url}`;
      return new Promise((resolve, rej) => {
        wx.downloadFile({
          url: url,
          success: function(res) {
            let path = res.tempFilePath;
            // ctx.drawImage(path, arr[0], arr[1], arr[2], arr[3]); //还是以px为单位的。//换算
            ctx.save();
            ctx.drawImage(
              path,
              arr.shift(),
              arr.shift(),
              arr.shift(),
              arr.shift()
            ); //还是以px为单位的。//换算
            resolve(1);
            ctx.restore();
          },
          fail: () => {
            ctx.save();
            wx.showModal({
              title: "提示",
              content: `图片获取失败`
            });
            ctx.restore();
            rej("图片获取失败");
          },
          complete: function() {
            console.log("url is what", url);
          }
        });
      });
    },
    avatar(ctx, url, arr) {
      arr = this.rpxToPx(arr);
      ctx.draw(true);
      // console.log("avatar", arr);
      url = new RegExp("^https").test(url)
        ? url
        : `https://image.vdongchina.com/${url}`;
      console.log("url", url);
      return new Promise((resolve, rej) => {
        wx.downloadFile({
          url: url,
          success: function(res) {
            let path = res.tempFilePath;
            const r = 30;
            ctx.save();
            ctx.beginPath();
            ctx.arc(arr[0], arr[1], r, 0, 2 * Math.PI);
            ctx.clip();
            ctx.drawImage(path, arr[0] - r, arr[1] - r, arr[2] * 2, arr[3] * 2); //还是以px为单位的。//换算
            ctx.restore();
            resolve(1);
          }
        });
      });
    },
    setText(ctx, text, arr) {
      // arr :[x,y,font-size]
      ctx.draw(true);
      arr = this.rpxToPx(arr);
      return new Promise((resolve, rej) => {
        arr.length == 2 ? ctx.setFontSize(15) : ctx.setFontSize(arr.pop());
        ctx.setFillStyle("black");
        ctx.setTextBaseline("top");
        ctx.fillText(text, arr.shift(), arr.shift());
        resolve(3);
      });
    },
    setTextColor(ctx, text, arr, color) {
      // arr :[x,y,font-size]
      arr = this.rpxToPx(arr);
      return new Promise((resolve, rej) => {
        !arr.length == 3 ? ctx.setFontSize(18) : ctx.setFontSize(arr[2]);
        !color ? ctx.setFillStyle("black") : ctx.setFillStyle(color);
        ctx.draw(true);
        ctx.setTextBaseline("top");
        ctx.fillText(text, arr.shift(), arr.shift());
        resolve(3);
      });
    },
    // output image path
    outputImage() {
      let ctx = arguments[0];
      const that = this;
      const { windowWidth, windowHeight, pixelRatio } = wx.getSystemInfoSync();
      return new Promise((resolve, rej) => {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          // width: 50,
          // height: 50,
          destWidth: pixelRatio * windowWidth, //canvas width*pixelRatio
          destHeight: pixelRatio * windowHeight,
          canvasId: "firstCanvas",
          fileType: "jpg",
          success: function(res) {
            resolve(res.tempFilePath);
          },
          fail: function() {
            wx.showModal({
              title: "提示",
              content: "导出图片失败，请稍后在尝试"
            });
            rej("导出图片失败，请稍后在尝试");
          }
        });
      });
    },
    async getCanvas() {
      const arg = arguments[0];
      console.log("this arg", arg, 3333, this);
      await this.setPixel.call(null, arg);
      // loading
      wx.showLoading({
        title: "加载中"
      });
      //bg
      await this.downAndSetImage(
        arg,
        `M00/07/C8/ZSUkmVoyWP2ESiLOAAAAAHQnvWY733.png`,
        [0, 0, 413, 700]
      );
      //code
      await this.downAndSetImage(arg, this.userInfo.cardUrl, [
        846,
        47,
        180,
        180
      ]);
      //logo
      await this.downAndSetImage(arg, this.userInfo.data.company.companyLogo, [
        56,
        198,
        160,
        152
      ]);
      //company
      await this.setTextColor(
        arg,
        this.userInfo.data.company.companyName,
        [56, 364, 28],
        "white"
      );
      // headurl
      await this.downAndSetImage(
        arg,
        `M00/07/C8/ZSUkmVoyXNKEa6QgAAAAAFCVDIk782.png`,
        [438, 213, 24, 24]
      );
      await this.setTextColor(
        arg,
        `${this.userInfo.userName} |`,
        [468, 197, 40],
        "#338BF5"
      );
      await this.setTextColor(
        arg,
        `${this.userInfo.userName} |`,
        [469, 197, 40],
        "#338BF5"
      );
      await this.setText(arg, this.userInfo.positionName, [590, 205, 28]);
      //phone icon
      await this.downAndSetImage(
        arg,
        `M00/07/C5/ZSUkmVoyPkqENq93AAAAAPxdcxc343.png`,
        [471, 325, 24, 24]
      );
      await this.setText(arg, `+${this.userInfo.phone}`, [516, 313]);
      // c_phoneOther
      await this.downAndSetImage(
        arg,
        `M00/07/C5/ZSUkmVoyP7OEZnlkAAAAAO-8Gno406.png`,
        [469, 375, 24, 24]
      );
      await this.setText(arg, this.userInfo.localPhone, [516, 365]);
      // mail
      await this.downAndSetImage(
        arg,
        `M00/07/C5/ZSUkmVoyQBWEd3MhAAAAABqsbsQ563.png`,
        [469, 433, 24, 24]
      );
      await this.setText(arg, this.userInfo.email, [516, 420]);
      // link
      await this.downAndSetImage(
        arg,
        `M00/07/C7/ZSUkmVoyT3KEckQFAAAAACkrE18449.png`,
        [469, 482, 24, 24]
      );
      await this.setText(arg, this.userInfo.data.company.companyDomain, [
        516,
        472
      ]);
      // phone
      await this.downAndSetImage(
        arg,
        `M00/07/C5/ZSUkmVoyP7OEZnlkAAAAAO-8Gno406.png`,
        [469, 535, 24, 24]
      );
      await this.setText(arg, this.userInfo.data.company.companyPhone, [
        516,
        524
      ]);
      // address
      await this.downAndSetImage(
        arg,
        `M00/07/C7/ZSUkmVoyUDeEGpp8AAAAAIlfzDY312.png`,
        [469, 585, 24, 24]
      );
      await this.setText(
        arg,
        !this.userInfo.address.companyAddress
          ? ""
          : this.userInfo.address.companyAddress.substr(0, 9),
        [516, 576]
      );
      await this.setText(
        arg,
        !this.userInfo.address.companyAddress
          ? ""
          : this.userInfo.address.companyAddress.substring(9),
        [516, 618]
      );
      // output image // return filePath link
      return await this.outputImage.call(null, arg);
    },
    // check user authroize status
    judge() {
      const that = this;
      return new Promise((resolve, rej) => {
        wx.getSetting({
          success: res => {
            if (!res.authSetting["scope.writePhotosAlbum"]) {
              // 直接默认用户的授权
              wx.authorize({
                scope: "scope.writePhotosAlbum",
                success() {
                  // resolve("授权成功");
                  resolve(1);
                },
                fail() {
                  wx.showModal({
                    title: "警告",
                    content: "您点击了拒绝授权，将无法将名片保存到相册中。点击取消,可以开启保存功能",
                    success: res => {
                      if (res.confirm) {
                        // rej("确认授权失败");
                        rej(0);
                      } else if (res.cancel) {
                        // 引导用户进行授权
                        wx.openSetting({
                          success: res => {
                            res.authSetting = {
                              "scope.writePhotosAlbum": true
                              // "scope.userLocation": true,
                              // "scope.addres": true
                            };
                            // 直接保存
                            that.saveCard();
                            // resolve("再一次请求授权成功");
                            resolve(0);
                          },
                          fail: () => {
                            // rej("再一次请求授权失败");
                            rej(0);
                          }
                        });
                      }
                    }
                  });
                  // rej("授权失败");
                  rej(0);
                }
              });
            } else {
              // resolve("之前授权过");
              resolve(1);
            }
          },
          fail: res => {
            wx.showModal({
              title: "提示",
              content: "授权失败"
            });
            // console.log("judge fail is", res);
          },
          complete: res => {
            // console.log("judge complete ", res);
          }
        });
      });
    },
    saveCard() {
      const { windowWidth, windowHeight, pixelRatio } = wx.getSystemInfoSync();
      wx.canvasToTempFilePath({
        destWidth: pixelRatio * windowHeight, //canvas width*pixelRatio
        destHeight: pixelRatio * windowWidth,
        canvasId: "firstCanvas",
        fileType: "jpg",
        success: function(res) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(res) {
              // console.log("save image in Album success");
              wx.showModal({
                title: "提示",
                content: "名片保存到相册成功！"
              });
            },
            fail() {
              wx.showModal({
                title: "提示",
                content: "名片保存失败，请稍后在尝试！"
              });
            }
          });
        },
        fail: () =>
          wx.showModal({
            title: "提示",
            content: "名片导出失败，请稍后在尝试"
          })
      });
    },
    downLoadCard() {
      const ctx = wx.createCanvasContext("firstCanvas");
      const that = this;
      // console.log("this: ctx", ctx, this);
      this.getCanvas
        .call(this, ctx)
        // .bind(this)(ctx)
        .then(r => {
          // r:filePath
          // 拼接好了在绘制
          ctx.draw(true);
          return r;
        })
        .then(r => {
          //绘制结束之后在隐藏loading
          wx.hideLoading();
          // 判断用户授权情况
          this.judge().then(res => {
            console.log("判断用户授权情况", res);
            !res ? "fail" : that.saveCard();
          });
        })
        .catch(e => console.log(e));
    },
    initData() {
      let url = `${this.$root.apiServer +
        this.$root.appid}/basic/card/app/classify/listWithUser`;
      wx.request({
        url: url,
        header: {
          "Content-Type": "application/json"
        },
        method: "GET",
        success: function(res) {
          // 返回data
          let data = res.data;
          data.success ? (that.data = data.data) : that.showMsg();
          // 初始化 列表頁
          that.$root.globalData.initdata = data.data;
          that.showListItems(0);
        },
        fail: function() {
          wx.showModal({
            title: "提示",
            content: "出错了，工程师正在加急修复"
          });
        }
      });
    },
    deepCopy(a) {
      var aa = {};
      for (var key in a) {
        if (a.hasOwnProperty(key)) {
          if (
            typeof a[key] === "number" ||
            typeof a[key] === "boolean" ||
            typeof a[key] === "string"
          ) {
            aa[key] = a[key];
          } else if (a[key] === undefined || a[key] === null) {
            aa[key] = "";
          } else {
            aa[key] = this.deepCopy(a[key]);
          }
        }
      }
      return aa;
    },
    setUrl(url) {
      return new RegExp("^https").test(url)
        ? url
        : `https://image.vdongchina.com/${url}`;
    }
  },
  onLoad(option) {
    let that = this;
    // console.log("row", option, "this", this);
    this.userInfo = that.$root.globalData.userList[option.index];
    // 得到地址详细地址 //与后台商量，多返回一些数据,故取消 //接口有变，又要发一次。。。
    wx.request({
      url: `${that.$root.apiServer +
        that.$root.appid}/basic/card/app/user/getAll?id=${option.userId}`,
      header: {
        "Content-Type": "application/json"
      },
      success: function(res) {
        let data = res.data;
        that.userInfo = {
          ...that.userInfo,
          ...data
        };
        // fix variable is null or undefined
        that.userInfo = that.deepCopy(that.userInfo);
        console.log("-----------------------------");
        console.log("that.useInfo", that.userInfo);
        that.code = that.setUrl(that.userInfo.cardUrl); //code
        that.logoUrl = that.setUrl(that.userInfo.data.company.companyLogo); // logo url
      },
      fail: function() {
        wx.showModal({
          title: "提示",
          content: "数据请求失败"
        });
      }
    });
  }
};
</script>

<style scoped>
/**index.wxss**/
.isShow {
  opacity: 0;
  overflow: hidden;
  position: absolute;
  left: -300px;
  top: -200px;
  /* display: none; */
}
.textcolorhover {
  background: #f9f9f9;
}
page {
  height: 100%;
}
.c_column {
  overflow: hidden;
  height: 100%;
  background: #f9f9f9;
}
.c_box {
  width: 1072rpx;
  height: 700rpx;
  background: #fff;
  margin: 17rpx auto 0;
  border-radius: 10rpx;
  overflow: hidden;
  position: relative;
  transform: translate(-161rpx, 195rpx) rotate(90deg);
}
.c_bg {
  display: block;
  width: 413rpx;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.c_code {
  display: block;
  height: 120rpx;
  width: 120rpx;
  position: absolute;
  top: 60rpx;
  right: 60rpx;
}
.c_logo {
  display: block;
  height: 120rpx;
  width: 120rpx;
  position: absolute;
  top: 198rpx;
  left: 56rpx;
}
.c_company {
  height: 40rpx;
  position: absolute;
  line-height: 40rpx;
  font-size: 28rpx;
  left: 56rpx;
  top: 364rpx;
  color: #fff;
}
.c_info {
  height: 56rpx;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 438rpx;
  margin-top: 197rpx;
}
.c_headImg {
  height: 24rpx;
  width: 24rpx;
  display: block;
  margin-right: 6rpx;
}
.c_name {
  height: 56rpx;
  line-height: 56rpx;
  color: #008bf1;
  font-weight: 600;
  font-size: 40rpx;
  margin-right: 10rpx;
}
.c_position {
  height: 40rpx;
  line-height: 40rpx;
  font-size: 28rpx;
  color: #333;
  padding-left: 10rpx;
  border-left: 2rpx solid #008bf1;
}
.c_phone {
  height: 42rpx;
  margin-top: 60rpx;
  margin-left: 469rpx;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.c_phoneImg {
  margin-right: 25rpx;
  display: block;
  height: 24rpx;
  width: 24rpx;
}
.c_phoneNum {
  height: 42rpx;
  line-height: 42rpx;
  font-size: 30rpx;
  color: #333;
}
.c_phoneOther {
  height: 42rpx;
  margin-top: 10rpx;
  margin-left: 469rpx;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.c_mailBox {
  height: 42rpx;
  margin-top: 13rpx;
  margin-left: 469rpx;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.c_link {
  height: 42rpx;
  margin-top: 10rpx;
  margin-left: 469rpx;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.c_address {
  height: 84rpx;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 10rpx;
  margin-left: 469rpx;
}
.c_addressImg {
  margin-right: 25rpx;
  display: block;
  height: 24rpx;
  width: 24rpx;
  margin-top: 9rpx;
}
.c_addressName {
  height: 84rpx;
  line-height: 42rpx;
  color: #000;
  font-size: 30rpx;
}
.c_loading {
  position: fixed;
  left: 25rpx;
  bottom: 18rpx;
  height: 88rpx;
  width: 700rpx;
  border-radius: 10rpx;
  background: #008bf1;
  box-shadow: 0 4rpx 10rpx 0 rgba(2, 50, 86, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}
.c_loadImg {
  height: 45rpx;
  width: 45rpx;
  display: block;
  margin-right: 7rpx;
}
.c_loadTxt {
  height: 88rpx;
  line-height: 88rpx;
  font-size: 36rpx;
  color: #fff;
}
</style>
