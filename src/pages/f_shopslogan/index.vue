<template>
  <view class="container">
      <view class="inp">
            <textarea id="inp" placeholder="请输入店铺slogan(不超过22个汉字)" focus="{{focusFlag}}" type="text" @input="bindblur" maxlength=22 value="{{inputTxt}}"/>
            <image class="clear" @tap="clearInp" src="http://image.vdongchina.com/M00/06/11/ZSUkmVoXt3iEe5V_AAAAAD3II1M419.png" wx:if="{{isInput}}"></image>
      </view>
      
      <view class="save">
        <button class="btn ban" wx:if="{{!isInput}}">保存</button>
        <button class="btn pick" wx:else @tap="toSave">保存</button>
      </view>
      <button class="cancel" @tap="toCancel">取消</button>
  </view>
</template>

<script>
export default {
    config: {
        "navigationBarTitleText": "店铺slogan"
    },
    data () {
        return {
            inputTxt:'',
            isInput:0,
            focusFlag:0
        }
    },
    onLoad(e){
        if(e.slogan && e.slogan != "null" && e.slogan != "未设置"){
            this.inputTxt = e.slogan
            this.focusFlag = 1
            this.isInput = 1
        }else{
            this.focusFlag = 1
        }
    },
    methods:{
        bindblur(e){
            if(e.detail.value!=""){
                this.inputTxt = e.detail.value
                this.isInput = 1
            }else{
                this.isInput = 0
            }
        },
        dialogMsg(){
            wx.showModal({
                title: '提示',
                content: '请输入店铺slogan',
                success: function(res) {
                    if (res.confirm) {
                        // console.log('用户点击确定')
                    } else if (res.cancel) {
                        // console.log('用户点击取消')
                    }
                }
            })
        },
        toSave(){
            var that = this
            // 保存/更新分销商店铺slogan
            wx.request({
                url:that.$root.apiServer + that.$root.appid + that.$root.variate + "/basic/client/distribution/userShop/setDUserShop",
                data: {
                    token: that.$root.globalData.token,
                    shopDes: that.inputTxt,
                    pid:that.$root.globalData.pid
                },
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(res) {
                    if(res.data.code == "200"){
                        //保存成功后返回上一页
                        wx.navigateBack({
                            delta: 1
                        })
                    }else{
                        wx.showToast({
                            title: "昵称保存失败",
                            icon: 'loading',
                            mask:true,
                            duration: 2000
                        })
                    }
                }
            })
        },
        toCancel(){
            wx.navigateBack({
                delta: 1
            })
        },
        clearInp(){ 
            this.inputTxt = ""
            this.isInput = 0
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
#inp{
    background:#fff;
    width:85%;
    white-space: pre-wrap;
    border:none;
    font-size: 32rpx;
    color:#333;
    white-space: pre-wrap;
    height: 125rpx;
    line-height: 40rpx;
    padding:23rpx 12% 0 3%;
    border-top:1rpx solid #e5e5e5;
    border-bottom:1rpx solid #e5e5e5;
}
#inp:placeholder{
    font-size:32rpx;
    color:#b2b2b2;
    line-height:40rpx;
    height:148rpx;
}
.container .inp{
    margin-top:30rpx;
    height: 150rpx;
    position: relative;
}
.container .inp .clear{
    position: absolute;
    right: 32rpx;
    top:32rpx;
    height: 46rpx;
    width:46rpx;
    display: block;
    z-index: 999; 
}
.container .save{
    height: 94rpx;
    color:#f2f2f2;
    position: relative;
    margin-top:50rpx;
}
.container .save .btn{
    height: 94rpx;
    line-height: 94rpx;
    width:670rpx;
    border-radius: 10rpx;
    border:2rxp solid rgba(5,5,5,0.08);
    font-size:36rpx;
    position: absolute;
    top:0;
    left:50%;
    margin-left:-335rpx;
    text-align: center;
    color:#fff;
}
.container .save .ban{
    background: #a7a8ab;
}
.container .save .pick{
    background: #363841;
}
.container .cancel{
    height: 94rpx;
    line-height: 94rpx;
    width:670rpx;
    border-radius: 10rpx;
    border:2rxp solid rgba(5,5,5,0.1);
    font-size:36rpx;
    text-align: center;
    color:#000;
    margin:30rpx auto;
    background: #f8f8f8;
}
</style>
