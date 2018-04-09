<template>
  <view class="container">
      <radio-group class="radio-group" @change="radioChange">
        <label class="radio">男<radio value="男" checked="{{mChecked}}"/></label>
        <label class="radio">女<radio value="女" checked="{{wChecked}}"/></label>
      </radio-group>
      <view class="save">
        <button class="btn ban" wx:if="{{!isInput}}" @tap="dialogMsg">保存</button>
        <button class="btn pick" wx:else @tap="toSave">保存</button>
      </view>
      <button class="cancel" @tap="toCancel">取消</button>
  </view>
</template>

<script>
export default {
    config: {
        "navigationBarTitleText": "性别"
    },
    data () {
        return {
            isInput:0,
            inputTxt:0,
            mChecked:0,
            wChecked:0
        }
    },
    onLoad(e){
        this.inputTxt = e.sex
        if(this.inputTxt == 0){
            //当e.sex==0时，不选任何一个
        }else{
            this.isInput = 1
            if(this.inputTxt == 1){
                this.mChecked = 1
            }else{
                this.wChecked = 1
            }
        }
    },
    methods:{
        dialogMsg(){
            wx.showModal({
                title: '提示',
                content: '请选择性别',
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
            // 上传/更新分销商个人性别
            wx.request({
                url: that.$root.apiServer + that.$root.appid + that.$root.variate + '/basic/client/distribution/user/updateUserInfo',
                data: {
                    token: that.$root.globalData.token,
                    sex:that.inputTxt,
                    pid:that.$root.globalData.pid
                },
                method: "POST",
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                success: function(res) {
                    if(res.data.code == "200"){
                        //保存成功后返回上一页
                        wx.navigateBack({
                            delta: 1
                        })
                    }else{
                        wx.showToast({
                            title: "性别保存失败",
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
        radioChange(e){
            var that = this 
            if(e.detail.value != ""){
                that.isInput = 1
                if(e.detail.value == "男"){
                    that.inputTxt = 1
                }else{
                    that.inputTxt = 2
                }
            }else{
                that.isInput = 0
            }
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
.container .radio-group{
    background: #fff;
    width:100%;
    margin-top:30rpx;
    border-top:1rpx solid #e5e5e5;
    border-bottom:1rpx solid #e5e5e5;
}
.container .radio-group .radio{
    margin-left:30rpx;
    padding-right:30rpx;
    width:690rpx;
    height:86rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color:#333;
}
.container .radio-group .radio:last-child{
    border-top:1rpx solid #e5e5e5;
}
.container .radio-group radio{
    color:#363841;
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
