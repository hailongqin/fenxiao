<template>
    <view class="model box-s">
         <view class=" {{inCode?'container active box-s pos-r':'container box-s pos-r'}}" wx:if="{{isPay}}">
            <view class='ft32 c3 passwordTitle'>请输入新支付密码</view>
            <view class="password" @tap="clickCode">
                <block wx:for="{{[1,2,3,4,5,6]}}" wx:key="index">
                    <view class="passwordLenth box-s">
                         <text class="{{codes.length>index?'active':''}}"></text> 
                    </view>
                </block>
                <input class="inputs" maxlength="6" type="number" focus="{{inCode}}" value="{{codes}}" @input="setCode" @blur="setting" />
            </view>
            <button class='confirm ft32' hover-class="confirmHover" @tap="confirm">确定</button>
            <!-- <view class='forget txt-right'>
                <text class='ft26 c3'>忘记密码？</text>
            </view> -->
        </view>
    </view>
</template>
<script>
export default {
    config: {
        navigationBarTitleText: '支付密码管理'
    },
    data() {
        return {
            password: '',
            inCode: true,
            isPay: true,
            codes: ""
        }
    },
    methods: {
        clickCode() { //点击输入
            this.inCode = true
        },
        closeModel() { //关闭输入验证码弹窗
            payCount = 0
            clearTimeout(this.data.timer);
            this.modelShow = false
            this.codes = ''

        },
        setting() { //失去焦点时恢复弹出框的位置
            let _this = this;
            _this.inCode = false

        },
        setCode(e) { //获取验证码
            let val = e.detail.value,
                flag = val.length == 6 ? true : false,
                _this = this;
            _this.codes = val
        },
        confirm() {
            var that = this
            if (that.codes.length == 6) {

                wx.redirectTo({
                    url: '../confirmPassword/confirmPassword?password=' + that.codes,
                })
                return;
            } else {
                wx.showToast({
                    title: '密码格式错误',
                    icon: 'loading',
                    duration: 2000
                })
            }
        }
    }
}
</script>
<style scoped>
.inputs{
    width: 0px;
    height: 0px;
}
/* pages/password/password.wxss */
.model {
    width: 750rpx;
    min-height: 100vh;
    background: #F1F1F1;
    padding: 36rpx 40rpx;
}

.model .container .paying .time {
    border: 1px solid #eaeaea;
    margin-left: 15px;
    width: 55px;
    text-align: center;
    height: 20px;
    line-height: 20px;
}

.model .container .password {
    width: 670rpx;
    height: 110rpx;
    display: flex;
    margin: 0 auto;
    margin-bottom: 100rpx;
}

.passwordLenth {
    width: 110rpx;
    height: 110rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffffff;
    margin-left: 1px;
    border-radius: 4rpx;
}

.passwordLenth:first-child {
    margin: 0;
}

.model .container .password view.active {
    border-color: #1a1a1a;
}

.model .container .password view text {
    border-radius: 100%;
    border: 4.5px solid #ffffff;
}

.model .container .password view text.active {
    border-color: #1a1a1a;
}





/* .model .container1{
  padding:30px 22.5px 0;
  font-size:13px;
  color:#222222;
  text-align: center;
  position:relative;
}
.model .container1 .goBack{
  border-top:1px solid #eaeaea;
  padding:20px 55px;
  margin-top:22px;
} */

.model .container1 .goBack image {
    vertical-align: middle;
    margin-top: -2px;
    margin-left: 10px;
}

.guanbi {
    position: absolute;
    top: 10px;
    right: 10px;
}

.guanbi image {
    vertical-align: top;
}

.itemName {
    height: 37rpx;
    line-height: 37rpx;
    margin-bottom: 18rpx;
}

.money {
    font-size: 52rpx;
    margin-bottom: 46rpx;
}

.payImg {
    width: 32rpx;
    height: 32rpx;
}

.yuee {
    height: 32rpx;
    line-height: 32rpx;
    justify-content: center;
}

.yueeTiete {
    margin-top: 2rpx;
    margin-left: 10rpx;
}

.guanbiImg {
    width: 40rpx;
    height: 128rpx;
}

.guanbi {
    top: -128rpx;
    right: 0px;
}

.passwordTitle {
    height: 45rpx;
    line-height: 45rpx;
    margin-bottom: 20rpx;
}

.confirm {
    width: 670rpx;
    height: 94rpx;
    line-height: 94rpx;
    background: #5F57C0;
    border-radius: 10px;
    color: #ffffff;
}

.confirmHover {
    background: #5F57C0;
}
</style>

