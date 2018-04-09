<template>
  <!--index.wxml-->
  <view class="container">
    <view class="banner">
      <image class="bg" src="{{shopBg}}" background-size="100%" @tap="changeShopBg"></image>
      <view class="mask"></view>
      <image class="userinfo-img" src="{{shopLogo}}" @tap="changeShopLogo"></image>
      <view class="userinfo-name">{{shopName}}</view>
    </view>
    <view class="decript">{{shopDes}}</view>
    <view class="nickName" @tap="changeShopBg">
        <view class="con">
            <view class="name">店铺背景<view class="suggest">(建议大小1125*576)</view></view>
            <view class="right">
                <view class="set">
                    
                </view>
                <image class="arrow" src="http://image.vdongchina.com/M00/06/10/ZSUkmVoXtlyEJpXrAAAAAGJ4S4M326.png"></image>
            </view>
        </view>
    </view>

    <view class="nickName" @tap="changeShopLogo">
        <view class="con">
            <view class="name">店铺Logo<view class="suggest">(建议大小222*222)</view></view>
            <view class="right">
                <view class="set">
                    
                </view>
                <image class="arrow" src="http://image.vdongchina.com/M00/06/10/ZSUkmVoXtlyEJpXrAAAAAGJ4S4M326.png"></image>
            </view>
        </view>
    </view>

    <view class="f_name">
      <view class="f_name_content">
        <input class="f_name_input" placeholder="请输入店铺名称" type="text" @input="bindblurName" value="{{shopName}}" maxlength="10"/>
        <view class="f_name_clear">
            <image class="f_name_img" @tap="clearName" src="http://image.vdongchina.com/M00/06/11/ZSUkmVoXt3iEe5V_AAAAAD3II1M419.png" wx:if="{{isName}}"></image>
        </view>
      </view>
    </view>

    <view class="f_slogan">
      <view class="f_slogan_content">
        <textarea class="f_slogan_input" placeholder="请输入店铺slogan(不超过22个汉字)" type="text" @input="bindblurDes" maxlength=22 value="{{shopDes}}"/>
        <image class="f_slogan_img" @tap="clearDes" src="http://image.vdongchina.com/M00/06/11/ZSUkmVoXt3iEe5V_AAAAAD3II1M419.png" wx:if="{{isDes}}"></image>
      </view>
    </view>
    
    <view class="f_save">
        <button class="f_pick" wx:if="{{isBg && isLogo && isName && isDes}}"  @tap="toSave">保存</button>
        <button class="f_ban" wx:else @tap="toDialog">保存</button>
    </view>

    
  </view>
</template>

<script>
export default {
  config: {
    navigationBarTitleText: "店铺设置"
  },
  data() {
    return {
      shopDetail: "",
      shopBg:"http://image.vdongchina.com/M00/06/11/ZSUkmVoXttiESrKMAAAAAHEHZhI130.png",
      shopLogo:"http://image.vdongchina.com/M00/06/12/ZSUkmVoXvTuEZfkvAAAAAELIZTQ640.png",
      tempShopBg:'M00/06/11/ZSUkmVoXttiESrKMAAAAAHEHZhI130.png',
      tempShopLogo:'M00/06/12/ZSUkmVoXvTuEZfkvAAAAAELIZTQ640.png',
      shopName:'',
      shopDes:'此处为店铺说明或者其他你想说的',
      isBg:1,
      isLogo:1,
      isName:0,
      isDes:1
    };
  },
  onLoad() {
    var that = this;
    //获取分销商门店信息
    wx.request({
      url:this.$root.apiServer + this.$root.appid + this.$root.variate + "/basic/client/distribution/userShop/requestInfo",
      data: {
        token: that.$root.globalData.token,
        pid:that.$root.globalData.pid
      },
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        if(res.data.code == 200 && res.data.object){
          that.shopDetail = res.data.object
          if(that.shopDetail.shopBackImg){
            that.shopBg = that.shopDetail.shopBackImg
            that.tempShopBg = that.shopDetail.shopBackImg.replace("http://image.vdongchina.com/","")
          }
          if(that.shopDetail.shopLogo){
            that.shopLogo = that.shopDetail.shopLogo
            that.tempShopLogo = that.shopDetail.shopLogo.replace("http://image.vdongchina.com/","")
          }
          if(that.shopDetail.shopName){
            that.shopName = that.shopDetail.shopName
            that.isName = 1
          }
          if(that.shopDetail.shopDes){
            that.shopDes = that.shopDetail.shopDes
          }
        }
      }
    });

    

  },
  methods: {
    clearName(){ 
        this.shopName = ""
        this.isName = 0
    },
    clearDes(){ 
        this.shopDes = ""
        this.isDes = 0
    },
    bindblurName(e){
      if(e.detail.value!=""){
          this.shopName = e.detail.value
          this.isName = 1
      }else{
          this.isName = 0
      }
    },
    bindblurDes(e){
      if(e.detail.value!=""){
          this.shopDes = e.detail.value
          this.isDes = 1
      }else{
          this.isDes = 0
      }
    },
    changeShopBg() {
      var that = this
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths;
          wx.uploadFile({
            url: that.$root.globalData.upImage,
            filePath: res.tempFilePaths[0],
            name: "file",
            // formData: {
            //     token: that.$root.globalData.token,
            //     headImg: res.tempFilePaths[0]
            // },
            formData: {
              project: "fenxiao",
              status: 0
            },
            success: function(data) {
              data.data = JSON.parse(data.data);
              if(data.data.success){
                that.tempShopBg = data.data.fileid;
                that.shopBg = that.$root.globalData.imgUrl + data.data.fileid;
              }else{
                wx.showToast({
                  title: "图片上传失败",
                  icon: "loading",
                  mask:true,
                  duration: 2000
                })
              }
              // if (data.data.success) {
              //   var headImage = data.data.fileid;
              //   // 保存/更新分销商门店背景图片
              //   wx.request({
              //     url:that.$root.apiServer + that.$root.appid + that.$root.variate + "/basic/client/distribution/userShop/setDUserShop",
              //     data: {
              //       token: that.$root.globalData.token,
              //       shopBackImg: headImage,
              //       pid:that.$root.globalData.pid
              //     },
              //     method: "POST",
              //     header: {
              //       "content-type": "application/x-www-form-urlencoded"
              //     },
              //     success: function(res) {
              //       if (res.data.code == "200") {
              //         that.shopBg = that.$root.globalData.imgUrl + data.data.fileid;
              //         // console.log(res)
              //       }else{
              //         wx.showToast({
              //           title: "图片上传失败",
              //           icon: "loading",
              //           mask:true,
              //           duration: 2000
              //         })
              //       }
              //     }
              //   });
              // } else {
                // wx.showToast({
                //   title: "图片上传失败",
                //   icon: "loading",
                //   mask:true,
                //   duration: 2000
                // })
              // }
            }
          })
        }
      })
    },
    changeShopLogo() {
      var that = this
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths;
          wx.uploadFile({
            url: that.$root.globalData.upImage,
            filePath: res.tempFilePaths[0],
            name: "file",
            // formData: {
            //     token: that.$root.globalData.token,
            //     headImg: res.tempFilePaths[0]
            // },
            formData: {
              project: "fenxiao",
              status: 0
            },
            success: function(data) {
              data.data = JSON.parse(data.data);
              if(data.data.success){
                that.tempShopLogo = data.data.fileid;
                that.shopLogo = that.$root.globalData.imgUrl + data.data.fileid;
              }else{
                wx.showToast({
                  title: "图片上传失败",
                  icon: "loading",
                  mask:true,
                  duration: 2000
                })
              }
              // if (data.data.success) {
              //   var headImage = data.data.fileid;
              //   // 保存/更新分销商门店logo图片
                // wx.request({
                //   url:that.$root.apiServer + that.$root.appid + that.$root.variate + "/basic/client/distribution/userShop/setDUserShop",
                //   data: {
                //     token: that.$root.globalData.token,
                //     shopLogo: headImage,
                //     pid:that.$root.globalData.pid
                //   },
                //   method: "POST",
                //   header: {
                //     "content-type": "application/x-www-form-urlencoded"
                //   },
                //   success: function(res) {
                //     if (res.data.code == "200") {
                //       that.shopLogo = that.$root.globalData.imgUrl + data.data.fileid;
                //       // that.onShow()
                //     }else{
                //       wx.showToast({
                //         title: "图片上传失败",
                //         icon: "loading",
                //         mask:true,
                //         duration: 2000
                //       })
                //     }
                //   }
              //   });
              // } else {
              //   wx.showToast({
              //     title: "图片上传失败",
              //     icon: "loading",
              //     mask:true,
              //     duration: 2000
              //   })
              // }
            }
          })
        }
      })
    },
    toSave(){
      var that = this
      console.log(1111111)
      wx.request({
        url:that.$root.apiServer + that.$root.appid + that.$root.variate + "/basic/client/distribution/userShop/setDUserShop",
        data: {
          token: that.$root.globalData.token,
          shopBackImg:that.tempShopBg,
          shopLogo: that.tempShopLogo,
          shopName: that.shopName,
          shopDes: that.shopDes,
          pid:that.$root.globalData.pid
        },
        method: "POST",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success: function(res) {
          if (res.data.code == "200") {
            if(res.data.object){
              wx.navigateTo({
                url: '../f_recommend/f_recommend'
              })
            }else{
              wx.navigateTo({
                url: '../f_personal/f_personal'
              })
            }
          }else{
            wx.showToast({
              title: "保存失败",
              icon: "loading",
              mask:true,
              duration: 2000
            })
          }
        }
      })
    },
    toDialog(){
      wx.showModal({
        title: '提示',
        content: '请完善店铺名称，再进行保存！',
        showCancel:false,
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }
  }
};
</script>

<style scoped>
.f_name{
  height:88rpx;
  background: #fff;
  padding-left:30rpx;
  box-sizing: border-box;
}
.f_name_content{
  width:720rpx;
  height:86rpx;
  border-bottom:1rpx solid #e5e5e5;
  display:flex;
  justify-content: space-between;
  align-items: center;
}
.f_name_input{
  width:630rpx;
  height:87rpx;
  line-height: 87rpx;
  font-size: 32rpx;
  color:#333;
}
.f_name_input:placeholder{
    font-size:32rpx;
    color:#b2b2b2;
    line-height:87rpx;
    height:87rpx;
}
.f_name_clear{
  width:90rpx;
  height:100%;
  display: flex;
  justify-content: flex-end;
  margin-right:22rpx;
  align-items: center;
}
.f_name_img{
    display: block;
    height: 46rpx;
    width:46rpx;
}
.f_slogan{
    height: 150rpx;
    background: #fff;
    padding-left:30rpx;
    border-bottom:1rpx solid #e5e5e5;
    margin-bottom:50rpx;
}
.f_slogan_content{
  width:720rpx;
  height:150rpx;
  position: relative;
}
.f_slogan_img{
    position: absolute;
    right: 22rpx;
    top:21rpx;
    height: 46rpx;
    width:46rpx;
    display: block;
    z-index: 999;
}
.f_slogan_input{
    background:#fff;
    width:85%;
    white-space: pre-wrap;
    border:none;
    font-size: 32rpx;
    color:#333;
    height: 122rpx;
    line-height: 40rpx;
    padding:28rpx 15% 0 0
}
.f_slogan_input:placeholder{
    font-size:32rpx;
    color:#b2b2b2;
    line-height:40rpx;
    height:148rpx;
}
.f_save{
    height: 94rpx;
    width:670rpx;
    margin:0 auto;
    border-radius: 10rpx;
    background: #fff;
}
.f_ban{
  height:94rpx;
  width:100%;
  line-height: 94rpx;
  text-align: center;
  background:rgba(54,56,65,0.4);
  color:#fff;
  font-size:36rpx;
}
.f_pick{
  height:94rpx;
  width:100%;
  line-height: 94rpx;
  text-align: center;
  background:rgba(54,56,65,1);
  color:#fff;
  font-size:36rpx;
}



page {
  height: 100%;
}
.left{
    float:none;
}
.right{
    float:none;
}
.container {
  width: 100%;
  height: 100%;
  position: relative;
  background: #f2f2f2;
}
.container .banner {
  display: block;
  height: 384rpx;
  width: 100%;
  position: relative;
}
.container .banner .bg {
  height: 100%;
  width: 100%;
  z-index: 1;
  display: block;
}
.container .banner .mask {
  height: 100rpx;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.7) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  z-index: 2;
}
.container .banner .userinfo-img {
  display:block;
  width: 148rpx;
  height: 148rpx;
  background: #ccc;
  position: absolute;
  bottom: 46rpx;
  left: 50%;
  margin-left: -74rpx;
  border-radius: 50%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.18);
  z-index: 9;
}
.container .banner .userinfo-name {
  font-size: 32rpx;
  height: 32rpx;
  line-height: 32rpx;
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: -10rpx;
  left: 0;
  z-index: 9;
  color: #333;
  overflow: visible;
}
.container .decript {
  width: 100%;
  padding: 34rpx 0 20rpx;
  margin-bottom: 26rpx;
  font-size: 24rpx;
  height: 24rpx;
  line-height: 24rpx;
  color: #999;
  text-align: center;
  z-index: -1;
  background: #fff;
}
.container .nickName {
  height: 88rpx;
  background: #fff;
  box-sizing: border-box;
}
.container .nickName .con {
  border-bottom: 1rpx solid #e5e5e5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 30rpx;
  width: 720rpx;
  height: 87rpx;
  box-sizing: border-box;
}
.container .nickName .name {
  height: 32rpx;
  line-height: 32rpx;
  font-size: 32rpx;
  color: #333;
}
.container .nickName .name .suggest {
  display: inline-block;
  font-size: 32rpx;
  color: #757575;
  height: 32rpx;
  line-height: 32rpx;
}
.container .nickName .right {
  height: 100%;
  min-width: 130rpx;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.container .nickName .right .set {
  height: 24rpx;
  margin-right: 6rpx;
}
.container .nickName .right .set .txt {
  font-size: 24rpx;
  height: 24rpx;
  line-height: 24rpx;
  color: #888;
  margin-right: 6rpx;
}
.container .nickName .right .arrow {
  height: 48rpx;
  width: 36rpx;
  margin-right: 24rpx;
}
</style>
