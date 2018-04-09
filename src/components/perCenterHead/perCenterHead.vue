<template>
  <view>
    <view class="header"  wx:if="{{isdeleted=='0'}}">
	    <image class="bg_image" src="{{headerBgSrc}}"></image>
	    <view class="user_image">
	        <view class="circle">
	            <image class="user_image_image" src="{{logo}}"/>
	        </view>
	        <view class="ft36 white w-100 user_name" style="{{'color:'+color}}">{{userName}}</view>
	    </view>
	  </view>

    <view class='header2' wx:if="{{isdeleted=='1'}}">
        <view class="cartInfo box-s">
            <image class='cartInfoB' src='{{cartInfo.backpic || cartInfo.backPic}}'></image>
            <view class='display-flex' style="{{'color: '+ cartInfo.fcolor || cartInfo.fontColor}}">
                <view wx:if="{{cartInfo.logo}}">
                    <image class="logo" src="{{cartInfo.logo}}"></image>
                </view>
                <view class='logo' wx:else style="{{'color: '+ cartInfo.fcolor || cartInfo.fontColor}}">logo</view>
                <view class='companyName ft24 cf pos-r' style="{{'color: '+ cartInfo.fcolor || cartInfo.fontColor}}">{{cartInfo.codeName ? cartInfo.codeName:'会员卡名称'}}</view>
                <view class='grade pos-r cf'>
                    <text class='gradeVip' style="{{'color: '+ cartInfo.fcolor || cartInfo.fontColor}}">VIP</text>
                    <text style="{{'color: '+ cartInfo.fcolor || cartInfo.fontColor}}">.{{cartInfo.lever?cartInfo.lever:'0'}}</text>
                </view>
            </view>
            <view class='balance cf pos-r' style="{{'color: '+ cartInfo.fcolor || cartInfo.fontColor}}">{{cartInfo.balance}}</view>
            <button class='recharge box-s cf' style="{{'color: '+ cartInfo.fcolor || cartInfo.fontColor}}" @tap="recharge">充值</button>
            <view class='cardNumber ft32 cf pos-r'>
                <text class='display-ib h45' style="{{'color: '+ cartInfo.fcolor || cartInfo.fontColor}}">{{cartInfo.leverName ? cartInfo.leverName:"普通会员"}}</text>
                <text class='ft24 cf display-ib h45' style="{{'color: '+ cartInfo.fcolor || cartInfo.fontColor}}">{{cartInfo.codeNum ? cartInfo.codeNum  :(cartInfo.code || 'xxxxxxxxx')}}(卡号)</text>
            </view>
            <view class='cardNumber ft24 cf pos-r'>
                <text class='display-ib' style="{{'color: '+ cartInfo.fcolor || cartInfo.fontColor}}">有效期：</text>
                <text class='ft24 cf display-ib ' style="{{'color: '+ cartInfo.fcolor || cartInfo.fontColor}}">{{cartInfo.deadtime ? cartInfo.deadtime:'xxxx-xx-xx'}}</text>
            </view>
        </view>
    </view>
  </view>
</template>

<script>
export default {
  editorConfig:{
     headerBgSrc: {
      el: ['uploader'],
      label: '上传背景图片',
      type: 'String',
      value: 'https://image.vdongchina.com/M00/00/5C/ZSUkmVmJXoaEQF8UAAAAACBxOlQ106.png',
      director : 'uploader'
    },
    color: {
      el: ['text', 'color'],
      label: '微信名颜色',
      type: 'String',
      value: '#FFFFFF',
      director : 'ColorPicker'
    },
    isdeleted: {
      type: 'String',
      value: '0',
      director : 'Blank',
      tip: "tips：启用会员卡时修改图片和字体样式无效"
    }
  },
  comName:'中心头部',
  props: {
    headerBgSrc: {
      default: 'https://image.vdongchina.com/M00/00/5C/ZSUkmVmJXoaEQF8UAAAAACBxOlQ106.png',
      type: String
    },
    color:{
      default:'#FFFFFF',
      type:String
    },
    isdeleted: {
      default:'0',
      type:String
    }
  },
  data(){
    return {
      logo:"https://image.vdongchina.com/M00/00/5C/ZSUkmVmJa2OEYDNzAAAAAFt_g9g974.png",
      userName:"微信名",
      cartInfo: {
            backpic: '',
            fcolor: "",
            codeName: "",
            logo: ""
        },//卡信息
        fontColor: "",
        cartUser: {}
    }
  },
  onLoad(){
    var that=this
    wx.getUserInfo({
      success: function(res) {
        if(res.userInfo){
          that.logo = res.userInfo.avatarUrl
          that.userName = res.userInfo.nickName
        }
      }
    })
  },
    onShow() {
        var that = this
        that.$root.post("/basic/newMember/applet/pview?openid=" + that.$root.globalData.openid, {}, function(data) {//请求卡信息
            console.log(data)
            if (data.success) {
                // data.obj.deadtime = data.obj.deadtime.substring(0, 10)
                that.cartInfo = data.obj
                if (data.obj.isdeleted == '0') {
                    that.$root.post("/basic/newMember/applet/view", {}, function(data) {//请求卡信息
                        if (data.success) {
                            // data.obj.deadtime = data.obj.deadtime.substring(0, 10)
                            // that.cartInfo.backpic = data.obj.backPic
                            // that.cartInfo.fcolor || cartInfo.fontColor = data.obj.fontColor
                            // that.cartInfo.codeName = data.obj.code
                            that.cartInfo.logo = data.obj.logo
                        }
                    })
                }
            } else {
                if (data.obj) { 
                    that.cartInfo = data.obj
                }

            }
        })
        that.$root.post("/basic/newMember/applet/viewById?openid=" + that.$root.globalData.openid, {}, function(data) {//请求支付密码
            if (data.success) {
                that.cartUser = data.obj
            }
        }, 1)

    },  
  methods: {
        recharge() {
            if (this.cartInfo.codeNum) {
                wx.navigateTo({//已注册会员卡
                    url: "../recharge/recharge"
                })
            } else {
                wx.navigateTo({//未注册会员卡
                    url: "../organizingData/organizingData"
                })
            }
        }

  }
}

</script>

<style scoped>
  .header{
  	position: relative;
    width: 100%;
    height: 400rpx;
  }
  .bg_image {
    width: 100%;
    height: 100%;
  }
  .user_image{
    position: absolute;
    width: 100%;
    top: 100rpx;
    z-index: 99;
  }
  .circle{
    position: relative;
    width: 160rpx;
    height: 160rpx;
    
    top: 0px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    background: rgba(255, 255, 255, 0.4);
    border-radius: 50%;
    overflow: hidden;
  }
  .user_image_image{
    width: 160rpx;
    height: 160rpx;
  }
  .user_name{
    font-size: 32rpx;
    margin-top: 40rpx;
    text-align: center;
    color: #ffffff
  }

  .box-s {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}

.cf {
    color: #fff;
}

.c3 {
    color: #333;
}

.ft24 {
    font-size: 24rpx;
}

.ft32 {
    font-size: 32rpx;
}

.display-flex {
    display: flex !important;
    display: -webkit-box !important;
    display: -moz-box !important;
    display: -ms-flexbox !important;
    display: -webkit-flex !important;
}

.pos-r {
    position: relative;
}

.pos-a {
    position: absolute;
}

.display-ib {
    display: inline-block
}

.h45 {
    height: 45rpx;
    line-height: 45rpx;
}

.fl-l {
    float: left;
}

.fl-r {
    float: right;
}








/*  */


/*会员卡  */

.header2 {
    padding: 40rpx 0;
    background: #ffffff;
    margin-bottom: 20rpx;
}

.cartInfo {
    width: 650rpx;
    height: 366rpx;
    margin: 0 auto;
    border-radius: 14px;
    background-repeat: no-repeat;
    background-position-y: 100%;
    background-size: 100%;
    position: relative;
    padding: 19rpx 30rpx;
}

.cartInfoB {
    position: absolute;
    width: 650rpx;
    height: 366rpx;
    top: 0;
    left: 0;
    border-radius: 14rpx;
}

.logo {
    width: 50rpx;
    height: 50rpx;
    background: #fff;
    border-radius: 50%;
    position: relative;
    line-height: 50rpx;
    text-align: center;
    font-size: 22rpx;
    color: #8a37c6;
}

.companyName {
    height: 52rpx;
    line-height: 52rpx;
    margin-left: 32rpx;
    width: 380rpx;
}

.grade {
    font-size: 44rpx;
}

.gradeVip {
    width: 320rpx;
}

.grade {
    font-size: 44rpx;
}

.gradeVip {
    font-style: italic;
    margin-right: 6rpx;
}

.balance {
    text-align: center;
    font-size: 50rpx;
    margin-top: 48rpx;
    height: 70rpx;
    line-height: 70rpx;
    font-weight: bold;
}

.recharge {
    border: 2rpx solid #fff;
    border-radius: 4rpx;
    width: 100rpx;
    height: 44rpx;
    line-height: 40rpx;
    text-align: center;
    font-size: 28rpx;
    padding: 0;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    background: rgba(0, 0, 0, 0);
    margin-top: 12rpx;
    margin-bottom: 20rpx;
}

.cardNumber {
    height: 45rpx;
    line-height: 45rpx;
}

.ft24.cf.display-ib.h45 {
    margin-left: 8rpx;
}
</style>
