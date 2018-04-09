<template>
  <view class="c_column">
    <view class="c_box">
      <!-- <view class="c_box" style='display:none'> -->
      <image class="c_bg" />
      <!-- <image class="c_code" src="{{'https://image.vdongchina.com/'+userInfo.cardUrl}}" /> -->
      <image class="c_code" src="{{code}}" />
      <!-- <image class="c_logo" src="{{'https://image.vdongchina.com/'+userInfo.data.company.companyLogo}}" mode="aspectFit" /> -->
      <image class="c_logo" src="{{logoUrl}}" mode="aspectFit" />
      <view class="c_company">{{userInfo.data.company.companyName}}</view>
      <view class="c_info">
        <!-- 图片没有前缀的，故加上 -->
        <!-- <image class="c_headImg" src="{{'https://image.vdongchina.com/'+ userInfo.headUrl}}" /> -->
        <image class="c_headImg" src="{{headImgUrl}}" />
        <view class="c_infoCon">
          <view class="c_name">{{userInfo.userName}}</view>
          <view class="c_position">{{userInfo.positionName}}</view>
        </view>
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
        <view class="c_phoneNum">{{userInfo.data.company.companyDomain}}</view>
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
      <image class="c_loadImg" src="https://image.vdongchina.com/M00/07/C7/ZSUkmVoyUd-ELV0wAAAAAGUd1CI511.png"></image>
      <view class="c_loadTxt">下载名片</view>
    </view>
    <canvas class="c_box isShow" style="{{'width:'+width+'px;height:'+height+'px'}}" canvas-id="firstCanvas"></canvas>
  </view>
</template>

<script>
  export default {
    config: {
      navigationBarTitleText: "竖版名片",
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTextStyle: "black"
    },
    onShareAppMessage: function() {
      return {
        title: "我的名片",
        path: "/pages/c_cardcolumn/c_cardcolumn",
        success: function(res) {
          wx.showModal({
            title: "提示",
            content: "转发成功"
          });
        },
        fail: function() {
          wx.showModal({
            title: "提示",
            content: "转发失败"
          });
        }
      };
    },
    data() {
      return {
        code: null,
        logoUrl: null,
        headImgUrl: null,
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
        const {
          latitude,
          longitude
        } = userInfo;
        wx.openLocation({
          latitude: Number(latitude),
          longitude: Number(longitude),
          scale: 28
        });
      },
      pxToRpx(x) {
        const {
          windowWidth
        } = wx.getSystemInfoSync();
        return 750 / windowWidth * x;
      },
      isArray(something) {
        return Object.prototype.toString.call(something) === "[object Array]";
      },
      rpxToPx(x) {
        const {
          windowWidth
        } = wx.getSystemInfoSync();
        // console.log('width',windowWidth);
        return !this.isArray(x) ?
          windowWidth / 750 * x :
          x.map(item => windowWidth / 750 * item);
      },
      setPixel() {
        const {
          windowWidth,
          windowHeight
        } = wx.getSystemInfoSync();
        // 设置canvas跟屏幕一样大小
        this.width = this.rpxToPx(700);
        this.height = this.rpxToPx(1040);
        const ctx = arguments[0];
        // hava a problem
        // ctx.setFillStyle("rgba(0, 0, 0, 1)");
        ctx.setFillStyle("white");
        // ctx.fill();
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.draw();
      },
      downAndSetImage(ctx, url, arr) {
        // arr =[x,y,width,height]
        // console.log("downImage", ctx, imgPath, x, y, width, height);
        arr = this.rpxToPx(arr);
        url = new RegExp("^https").test(url) ?
          url :
          `https://image.vdongchina.com/${url}`;
        console.log("dfagfadga", url);
        ctx.draw(true);
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
              // ctx.draw(true);
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
              // console.log("url is what", url);
            }
          });
        });
      },
      downAndSetLogoImage(ctx, url, arr) {
        // arr =[x,y,width,height]
        // console.log("downImage", ctx, imgPath, x, y, width, height);
        // arr = this.rpxToPx(arr);
        // console.log("init arr data is", arr);
        const that = this;
        url = new RegExp("^https").test(url) ?
          url :
          `https://image.vdongchina.com/${url}`;
        ctx.draw(true);
        return new Promise((resolve, rej) => {
          wx.downloadFile({
            url: url,
            success: function(res) {
              let path = res.tempFilePath;
              // get Logo Image infomation
              // let logoImgInfo=
              wx.getImageInfo({
                src: path,
                success: function(res) {
                  // width & height
                  arr[2] = res.width;
                  arr[3] = res.height;
                  // logo's width height
                  res.width > res.height ?
                    ((arr[2] = 120), (arr[3] = 120 / res.width * res.height)) :
                    ((arr[2] = 120), (arr[3] = 120));
                  arr = that.rpxToPx(arr);
                  console.log("image info", arr);
                  ctx.save();
                  ctx.drawImage(
                    path,
                    arr.shift(),
                    arr.shift(),
                    arr.shift(),
                    arr.shift()
                  ); //还是以px为单位的。//换算
                  resolve(1);
                  // ctx.draw(true);
                  ctx.restore();
                },
                fail: function() {
                  ctx.save();
                  ctx.drawImage(
                    path,
                    arr.shift(),
                    arr.shift(),
                    arr.shift(),
                    arr.shift()
                  ); //还是以px为单位的。//换算
                  resolve(1);
                  // ctx.draw(true);
                  ctx.restore();
                }
              });
              // ctx.drawImage(path, arr[0], arr[1], arr[2], arr[3]); //还是以px为单位的。//换算
              // ctx.save();
              // ctx.drawImage(
              //   path,
              //   arr.shift(),
              //   arr.shift(),
              //   arr.shift(),
              //   arr.shift()
              // ); //还是以px为单位的。//换算
              // resolve(1);
              // // ctx.draw(true);
              // ctx.restore();
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
              // console.log("url is what", url);
            }
          });
        });
      },
      avatar(ctx, url, arr) {
        ctx.draw(true);
        arr = this.rpxToPx(arr);
        url = new RegExp("^https").test(url) ?
          url :
          `https://image.vdongchina.com/${url}`;
        console.log("url is", url);
        return new Promise((resolve, rej) => {
          wx.downloadFile({
            url: url,
            success: function(res) {
              let path = res.tempFilePath;
              // const r = 30;
              const r = 24;
              ctx.save();
              ctx.beginPath();
              ctx.arc(arr[0], arr[1], r, 0, 2 * Math.PI);
              ctx.clip();
              // ctx.closePath();
              ctx.drawImage(
                path,
                arr[0] - arr[2] / 2,
                arr[1] - arr[3] / 2,
                arr[2],
                arr[3]
                // bigData,
                // bigData
              ); //还是以px为单位的。//换算
              ctx.closePath();
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
          arr.length == 2 ? ctx.setFontSize(14) : ctx.setFontSize(arr.pop());
          ctx.setFillStyle("black");
          ctx.setTextBaseline("top");
          // fix text is '';
          ctx.fillText(text, arr.shift(), arr.shift());
          resolve(3);
        });
      },
      // output image path
      outputImage() {
        const ctx = arguments[0];
        const that = this;
        const {
          windowWidth,
          windowHeight,
          pixelRatio
        } = wx.getSystemInfoSync();
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
        await this.setPixel.call(null, arg);
        // 显示loading
        wx.showLoading({
          title: "加载中"
        });
        //bg
        // await this.downAndSetImage(
        //   arg,
        //   `/M00/07/C4/ZSUkmVoyNWyESzRqAAAAAIpyDxo156.png`,
        //   [0, 28, 666, 355]
        // );
        //code
        // await this.downAndSetImage(
        //   arg,
        //   `/M00/07/C4/ZSUkmVoyN3WEUwzqAAAAAGyslSc875.png`,
        //   // [566, 141, 114, 120]
        //   // [546, 141, 180, 180]
        //   // [500, 111, 180, 180]
        //   [500, 111, 180, 180]
        // );
        // await this.downAndSetImage(arg, this.imgUrl, [500, 111, 180, 180]);
        // 二维码链接直接发的，故如下
        await this.downAndSetImage(arg, this.userInfo.cardUrl, [
          500,
          111,
          180,
          180
        ]);
        //logo
        // fix image size problem
        await this.downAndSetLogoImage(
          arg,
          this.userInfo.data.company.companyLogo, [
            // 33,
            // 141,
            // 300,
            // 48
            // 24,
            32,
            110
            // 120, 120
          ]
        );
        // await this.downAndSetImage(
        //   arg,
        //   `/M00/07/C4/ZSUkmVoyN3WEUwzqAAAAAGyslSc875.png`,
        //   // [33, 141, 300, 48]
        //   // [58, 141, 300, 48] //手机保存有问题，故加上
        //   [33, 141, 300, 48] //手机保存有问题，故加上
        // );
        //company
        await this.setText(arg, this.userInfo.data.company.companyName, [
          33,
          218
        ]);
        // await this.setText(arg, "HUGHES信息技术股份有限公司", [58, 218]);
        // headurl
        // await this.downAndSetImage(arg, this.userInfo.headUrl, [73, 429, 98, 98]);
        // await this.avatar(arg, this.userInfo.headUrl, [73, 429, 98, 98]);
        await this.avatar(arg, this.userInfo.headUrl, [108, 478, 98, 98]);
        // await this.setText(arg, this.userInfo.userName, [191, 437, 50]);
        await this.setText(arg, this.userInfo.userName, [191, 429, 50]);
        await this.setText(arg, this.userInfo.userName, [192, 429, 50]);
        await this.setText(arg, this.userInfo.positionName, [192, 497]);
        //phone icon
        await this.downAndSetImage(
          arg,
          `M00/07/C5/ZSUkmVoyPkqENq93AAAAAPxdcxc343.png`, [94, 582, 24, 24]
        );
        await this.setText(arg, this.userInfo.phone, [143, 578]);
        // c_phoneOther
        await this.downAndSetImage(
          arg,
          `M00/07/C5/ZSUkmVoyP7OEZnlkAAAAAO-8Gno406.png`, [94, 637, 24, 24]
        );
        await this.setText(arg, this.userInfo.localPhone, [143, 633]);
        // mail
        await this.downAndSetImage(
          arg,
          `M00/07/C5/ZSUkmVoyQBWEd3MhAAAAABqsbsQ563.png`, [94, 692, 24, 24]
        );
        await this.setText(arg, this.userInfo.email, [143, 688]);
        // link
        await this.downAndSetImage(
          arg,
          `M00/07/C7/ZSUkmVoyT3KEckQFAAAAACkrE18449.png`, [94, 792, 24, 24]
        );
        await this.setText(arg, this.userInfo.data.company.companyDomain, [
          143,
          783
        ]);
        // company phone
        await this.downAndSetImage(
          arg,
          `M00/07/C5/ZSUkmVoyP7OEZnlkAAAAAO-8Gno406.png`, [94, 844, 24, 24]
        );
        await this.setText(arg, this.userInfo.data.company.companyPhone, [
          143,
          838
        ]);
        // address
        await this.downAndSetImage(
          arg,
          `M00/07/C7/ZSUkmVoyUDeEGpp8AAAAAIlfzDY312.png`, [94, 893, 24, 24]
        );
        await this.setText(
          arg, !this.userInfo.address.companyAddress ?
          "" :
          this.userInfo.address.companyAddress.substr(0, 9), [143, 887]
        );
        await this.setText(
          arg, !this.userInfo.address.companyAddress ?
          "" :
          this.userInfo.address.companyAddress.substring(9), [143, 929]
        );
        // avatar
        // await this.avatar(arg, this.userInfo.headUrl, [112, 478, 98, 98]);
        // await this.avatar(arg, this.userInfo.headUrl, [73, 429, 98, 98]);
        // output image // return filePath link
        return await this.outputImage.call(null, arg);
      },
      // check user authroize status
      judge() {
        const that = this;
        return new Promise((resolve, rej) => {
          wx.getSetting({
            success: res => {
              if (
                // Object.keys(res.authSetting).length == 0 &&
                !res.authSetting["scope.writePhotosAlbum"]
              ) {
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
                              // that.saveCard();
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
        const that = this;
        const {
          windowWidth,
          windowHeight,
          pixelRatio
        } = wx.getSystemInfoSync();
        wx.canvasToTempFilePath({
          destWidth: pixelRatio * windowWidth, //canvas width*pixelRatio
          destHeight: pixelRatio * windowHeight,
          canvasId: "firstCanvas",
          fileType: "jpg",
          success: function(res) {
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success(res) {
                // console.log("save image in Album success");
                wx.showModal({
                  title: "提示",
                  content: "名片保存到相册成功"
                });
              },
              fail() {
                wx.showModal({
                  title: "提示",
                  content: "名片保存失败，请稍后在尝试！"
                });
              },
              complete() {
                console.log("completed");
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
        this.getCanvas
          .call(this, ctx)
          .then(r => {
            // 拼接好了在绘制
            ctx.draw(true);
            return r;
          })
          .then(r => {
            //绘制结束之后在隐藏loading
            wx.hideLoading();
            // 判断用户授权情况
            this.judge().then(res => {
              !res
                ?
                wx.showModal({
                  title: "授权",
                  content: "没有授权，请进行授权，才能下载"
                }) :
                that.saveCard();
            });
          })
          // .then(r => {
          //   this.saveCard();
          //   return r;
          // })
          .catch(e => console.log(e));
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
        return new RegExp("^https").test(url) ?
          url :
          `https://image.vdongchina.com/${url}`;
      }
    },
    onLoad(option) {
      var that = this;
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
          // fix variable
          that.userInfo = that.deepCopy(that.userInfo);
          console.log("that.userInfo", that.userInfo);
          that.code = that.setUrl(that.userInfo.cardUrl);
          that.logoUrl = that.setUrl(that.userInfo.data.company.companyLogo);
          that.headImgUrl = that.setUrl(that.userInfo.headUrl);
          console.log("that.userInfo.headImgUrl", that.headImgUrl);
        },
        fail: function() {
          // console.log("ggg");
          wx.showModal({
            title: "提示",
            content: "数据请求失败"
          });
        }
      });
      // console.log("dfafas", this.userInfo);
      // this.getImgUrl(this.userInfo.userId); //二维码link直接拿到了，故取消
      // 后退
      // test use
      // this.downLoadCard();
    }
    // onHide() {
    //   wx.navigateTo({
    //     url: "/pages/c_employeeList/c_employeeList"
    //   });
    //   // wx.navigateBack({
    //   //   delta: 0
    //   // });
    // }
  };
</script>

<style scoped>
  /**index.wxss**/
  .hidden {
    display: none;
  }
  .isShow {
    opacity: 1;
  }
  .textcolorhover {
    /* color: #cccccc;
           border:1px solid #111; */
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
    height: 1040rpx;
    width: 700rpx;
    background: #fff;
    margin: 17rpx auto 0;
    border-radius: 10rpx;
    overflow: hidden;
    position: relative;
  }
  .c_bg {
    display: block;
    width: 666rpx;
    height: 355rpx;
    margin-top: 28rpx;
  }
  .c_code {
    display: block;
    height: 180rpx;
    width: 180rpx;
    position: absolute;
    top: 111rpx;
    right: 20rpx;
  }
  .c_logo {
    display: block;
    left: 32rpx;
    position: absolute;
    top: 100rpx;
    max-width: 120rpx;
    max-height: 120rpx;
  }
  .c_company {
    height: 40rpx;
    position: absolute;
    line-height: 40rpx;
    font-size: 28rpx;
    left: 32rpx;
    top: 218rpx;
    color: #000;
  }
  .c_info {
    height: 102rpx;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 46rpx;
  }
  .c_headImg {
    height: 98rpx;
    width: 98rpx;
    display: block;
    border-radius: 50%;
    margin-left: 73rpx;
    margin-right: 20rpx;
  }
  .c_infoCon {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  .c_name {
    height: 56rpx;
    line-height: 56rpx;
    color: #000;
    font-weight: 600;
    font-size: 40rpx;
    margin-bottom: 6rpx;
  }
  .c_position {
    height: 40rpx;
    line-height: 40rpx;
    font-size: 28rpx;
    color: #000;
  }
  .c_phone {
    height: 42rpx;
    margin-top: 41rpx;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .c_phoneImg {
    margin-left: 94rpx;
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
    margin-top: 13rpx;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .c_mailBox {
    height: 42rpx;
    margin-top: 13rpx;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .c_link {
    height: 42rpx;
    margin-top: 53rpx;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .c_address {
    height: 84rpx;
    margin-top: 13rpx;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .c_addressImg {
    margin-left: 94rpx;
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
    height: 88rpx;
    width: 700rpx;
    margin: 33rpx auto 0;
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
