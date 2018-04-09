<template>
  <view class="container">
      <view class="head">
          <view class="con" @tap="pickImg">
            <view class="left">头像</view>
            <view class="right">
                <image class="img" src="{{headImg}}"></image>
                <image class="arrow" src="http://image.vdongchina.com/M00/06/10/ZSUkmVoXtlyEJpXrAAAAAGJ4S4M326.png"></image>
            </view>
          </view>
      </view>
      <view class="nickName" @tap="changeName">
          <view class="con">
            <view class="name">昵称</view>
            <view class="right">
                <view class="set">
                    <view class="txt" wx:if="{{lists.nickName}}">{{lists.nickName}}</view>
                    <view class="txt" wx:else>未设置</view>
                </view>
                <image class="arrow" src="http://image.vdongchina.com/M00/06/10/ZSUkmVoXtlyEJpXrAAAAAGJ4S4M326.png"></image>
            </view>
          </view>
      </view>

      <view class="nickName" @tap="changeSex">
          <view class="con">
            <view class="name">性别</view>
            <view class="right">
                <view class="set">
                    <view class="txt" wx:if="{{lists.sex == '0'}}">未设置</view>
                    <view class="txt" wx:elif="{{lists.sex == '1'}}">男</view>
                    <view class="txt" wx:else>女</view>
                </view>
                <image class="arrow" src="http://image.vdongchina.com/M00/06/10/ZSUkmVoXtlyEJpXrAAAAAGJ4S4M326.png"></image>
            </view>
          </view>
      </view>

      <view class="nickName" @tap="changePhone">
          <view class="con phone">
            <view class="name">手机号</view>
            <view class="right">
                <view class="set">
                    <view class="txt" wx:if="{{lists.phone}}">{{lists.phone}}</view>
                    <view class="txt" wx:else>未设置</view>
                    
                </view>
                <image class="arrow" src="http://image.vdongchina.com/M00/06/10/ZSUkmVoXtlyEJpXrAAAAAGJ4S4M326.png"></image>
            </view>
          </view>
      </view>

      <view class="about" @tap="aboutMe" wx:if="{{isDealer}}">
            <view class="name">关于我</view>
            <image class="arrow" src="http://image.vdongchina.com/M00/06/10/ZSUkmVoXtlyEJpXrAAAAAGJ4S4M326.png"></image>
      </view>
  </view>
</template>

<script>
export default {
    config: {
        "navigationBarTitleText": "设置"
    },
    data () {
        return {
            isInput:false,
            flag:0,
            lists:[],
            headImg:'http://image.vdongchina.com/M00/06/11/ZSUkmVoXuiaENKjtAAAAABTOgXw562.png',
            isDealer:0
        }
    },
    onShow(){
        var that = this
        //获取分销商个人信息
        wx.request({
            url: this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/user/requestFUserInfo',
            data: {
                token: that.$root.globalData.token,
                pid:that.$root.globalData.pid
            },
            method: "POST",
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
                if(res.data.code == 200){
                    that.lists = res.data.object
                    if(that.lists.headImg){
                        that.headImg = that.lists.headImg
                    }else{
                        that.headImg = "http://image.vdongchina.com/M00/06/11/ZSUkmVoXuiaENKjtAAAAABTOgXw562.png"
                    }
                }
            }
        })
        //判断用户是否是分销商
        wx.request({
            url: this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/user/isDealer',
            data: {
                token: that.$root.globalData.token,
                pid:that.$root.globalData.pid
            },
            method: "POST",
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
                if(res.data.code == "200"){
                    that.isDealer = res.data.object
                }
            }
        })
    },
    methods:{
        //修改头像
        pickImg(){
            var that = this
            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function(res) {
                    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                    var tempFilePaths = res.tempFilePaths
                    wx.uploadFile({
                        url:  that.$root.globalData.upImage, //仅为示例，并非真实的接口地址
                        filePath: res.tempFilePaths[0],
                        name: 'file',
                        // formData: {
                        //     token: that.$root.globalData.token,
                        //     headImg: res.tempFilePaths[0]
                        // },
                        formData: {
                            project: "fenxiao",
                            status: 0
                        },
                        success: function(data) {
                            data.data = JSON.parse(data.data)
                            if (data.data.success) {
                                var headImage = data.data.fileid
                                // 上传/更新分销商个人头像
                                wx.request({
                                    url: that.$root.apiServer + that.$root.appid + that.$root.variate + '/basic/client/distribution/user/updateUserInfo',
                                    data: {
                                        token: that.$root.globalData.token,
                                        headImg:headImage,
                                        pid:that.$root.globalData.pid
                                    },
                                    method: "POST",
                                    header: {
                                        'content-type': 'application/x-www-form-urlencoded'
                                    },
                                    success: function(res) {
                                        if(res.data.code == "200"){
                                            that.headImg = that.$root.globalData.imgUrl + data.data.fileid
                                            // console.log(res)
                                        }else {
                                            wx.showToast({
                                                title: "图片上传失败",
                                                icon: 'loading',
                                                mask:true,
                                                duration: 2000
                                            })
                                        }
                                    }
                                })
                            } else {
                                wx.showToast({
                                    title: "图片上传失败",
                                    icon: 'loading',
                                    mask:true,
                                    duration: 2000
                                })
                            }
                        }
                    })
                }
            })
        },
        changeName(){
            wx.navigateTo({
                url: '../f_nickname/f_nickname?name=' + this.lists.nickName
            })
        },
        changeSex(){
            wx.navigateTo({
                url: '../f_nicksex/f_nicksex?sex=' + this.lists.sex
            })
        },
        changePhone(){
            wx.navigateTo({
                url: '../f_phone/f_phone?phoneNum=' + this.lists.phone
            })
        },
        aboutMe(){
            wx.navigateTo({
                url: '../f_aboutme/f_aboutme'
            })
        }
    }
}
</script>

<style scoped>
page{
    height:100%;
}
.left{
    float:none;
}
.right{
    float:none;
}
.container{
    height:100%;
    background: #f2f2f2;
    overflow: hidden;
}
.container .head{
    height:136rpx;
    background: #fff;
    margin-top:30rpx;
}
.container .head .con{
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    margin-left:30rpx;
    border-bottom:1rpx solid #e5e5e5;
    height:136rpx;
}
.container .head .left{
    height: 32rpx;
    line-height: 32rpx;
    font-size:32rpx;
    color:#333;
}
.container .head .right{
    height:100%;
    width:142rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right:24rpx;
}
.container .head .right .img{
    height: 98rpx;
    width:98rpx;
    border-radius: 50%;
    border:1rpx solid #b0b0b0;
}
.container .head .right .arrow{
    height: 48rpx;
    width:36rpx;
    display: block;
}
.container .nickName{
    height: 88rpx;
    background: #fff;
}
.container .nickName .con{
    margin-left:30rpx;
    width:720rpx;
    height:88rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    border-bottom:1rpx solid #e5e5e5;
}
.container .nickName .phone{
    border:none;
}
.container .about{
    height: 88rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    margin-top:30rpx;
    border-top:1rpx solid #e5e5e5;
    background: #fff;
}
.container .about .name{
    height: 32rpx;
    line-height:32rpx;
    font-size: 32rpx;
    color:#333;
    margin-left:30rpx;
}
.container .about .arrow{
    height: 48rpx;
    width:36rpx;
    display: block;
    margin-right:24rpx;
}
.container .nickName .name{
    height: 32rpx;
    line-height: 32rpx;
    font-size:32rpx;
    color:#333;
}
.container .nickName .right{
    height:100%;
    width:50%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.container .nickName .right .set{
    height: 24rpx;
    margin-right:6rpx;
}
.container .nickName .right .set .txt{
    font-size:24rpx;
    height: 24rpx;
    line-height: 24rpx;
    color:#888;
    margin-right:6rpx;
}
.container .nickName .right .arrow{
    height: 48rpx;
    width:36rpx;
    margin-right:24rpx;
}
</style>
