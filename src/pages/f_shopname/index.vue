<template>
  <view class="container">
      <view class="inp">
            <input id="inp" placeholder="请输入店铺名称" focus="{{focusFlag}}" type="text" @input="bindblur" value="{{inputTxt}}" maxlength="10"/>
            <view class="clear">
                <image class="img" @tap="clearInp" src="http://image.vdongchina.com/M00/06/11/ZSUkmVoXt3iEe5V_AAAAAD3II1M419.png" wx:if="{{isInput}}"></image>
            </view>
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
        "navigationBarTitleText": "店铺名称"
    },
    data () {
        return {
            inputTxt:'',
            isInput:0,
            focusFlag:0
        }
    },
    onLoad(e){
        console.log(e)
        if(e.name && e.name != "null" && e.name != "未设置"){
            this.inputTxt = e.name
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
                content: '请输入店铺名称',
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
            // 保存/更新分销商门店名称
            var that = this
            wx.request({
                url:that.$root.apiServer + that.$root.appid + that.$root.variate + "/basic/client/distribution/userShop/setDUserShop",
                data: {
                    token: that.$root.globalData.token,
                    shopName: that.inputTxt,
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
    height:86rpx;
    line-height:86rpx;
    width:630rpx;
    white-space: pre-wrap;
    font-size: 32rpx;
    color:#333;
    padding-left:30rpx;
    border-top:1rpx solid #e5e5e5;
    border-bottom:1rpx solid #e5e5e5;
    border-left:0;
    border-right:0;
}
#inp:placeholder{
    font-size:32rpx;color:#b2b2b2;line-height:86rpx;height:86rpx;
}
.container .inp{
    height: 88rpx;
    margin-top:20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.container .inp .clear{
    background: #fff;
    height: 86rpx;
    flex:1;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999; 
    border-top:1rpx solid #e5e5e5;
    border-bottom:1rpx solid #e5e5e5;
}
.container .inp .clear .img{
    display: block;
    height: 46rpx;
    width:46rpx;
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
