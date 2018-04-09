<template>
  <view class="container">
    <image class="bg"  src="http://image.vdongchina.com/M00/06/12/ZSUkmVoXu8CEdDYHAAAAAIuvcJY585.png" mode="aspectFill"></image>
    <view class="content">
        <image class="bg2" src="http://image.vdongchina.com/M00/06/12/ZSUkmVoXu_CEfNFfAAAAADDTbYM831.png"></image> 
        <image class="userinfo-img" src="{{avatarUrl}}"></image> 
        <view class="userinfo-name">{{nickName}}</view>
        <view>
            <textarea class="inp" placeholder="点击编辑营销文案" placeholder-style="color:#999;font-size:36rpx;" @blur="bindblur" maxlength="45" value="{{inputtxt}}"/>
            <!-- <view class="inpVal" wx:else>{{inputtxt}}</view> -->
         </view>   
        <image class="code" src="{{imgUrl}}" @tap="enLarge"></image>
        <view>
            <button wx:if="{{!isInput}}" class="submit">请编辑上方营销文案</button> 
            <button wx:else class="submit" open-type="share">马上分享</button> 
        </view>

        
    </view>
  </view>
</template>

<script>
export default {
    config: {
        "navigationBarTitleText": "我的二维码",
        "navigationBarBackgroundColor":"#262833",
        "navigationBarTextStyle":"white"
    },
    data () {
        return {
            avatarUrl: 'http://image.vdongchina.com/M00/06/11/ZSUkmVoXt-iEIQmfAAAAACX2w8I302.png',
            nickName: '未设置',
            isInput:false,
            inputtxt:"",
            imgUrl:"",
            isPaign:''
        }
    },
    onLoad(){
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
                    if(res.data.object.headImg){
                        that.avatarUrl = res.data.object.headImg
                    }else{
                        wx.getUserInfo({
                            success: function(res) {
                                that.avatarUrl = res.userInfo.avatarUrl
                            }
                        })
                    }
                    if(res.data.object.nickName){
                        that.nickName = res.data.object.nickName
                    }else{
                        wx.getUserInfo({
                            success: function(res) {
                                that.nickName = res.userInfo.nickName
                            }
                        })
                    }
                }
            }
        })
        
        wx.request({
            url:this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/user/confirmCompaign',
            data:{
	            token: that.$root.globalData.token,
	            pid:that.$root.globalData.pid
            },
            method:"POST",
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
            	if(res.data.code == 200){
                that.isPaign = res.data.object // 是否可以生成二维码
             }
            }
        })
        wx.request({
            url:this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/user/generatorMyQr',
            data:{
                    token: that.$root.globalData.token,
                    path:'pages/f_index/f_index',
                    pid:that.$root.globalData.pid
            },
            method:"POST",
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
            	if(res.data.code == 200){
                    that.imgUrl = res.data.object
                }    
                    
              if(res.data.code == 803){            		
                wx.showModal({
                    title: '提示',
                    content: res.data.message,
                    showCancel:false,
                    success: function(res) {
                        if (res.confirm) {
                            wx.redirectTo({
                                url: '../f_shopset/f_shopset'
                            })
                        }
                    }	                    
                })	
              }
            }
        })
    },
    onShareAppMessage(res) {
        var that = this;
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: that.inputtxt,
            path: 'pages/f_index/f_index?pid=' +that.$root.globalData.openid,
            success: function(res) {
                // 转发成功
                wx.request({
                    url:that.$root.apiServer + that.$root.appid + that.$root.variate + '/basic/client/distribution/DUser2Distributor/shareQr',
                    data:{
                        token: that.$root.globalData.token,
                        pid:that.$root.globalData.pid
                    },
                    method:"POST",
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    success: function(res) {
                        //
                    }
                })
            },
            fail: function(res) {
                // 转发失败
                
            }
        }
    },
    methods:{
        bindblur(e){
            console.log(e.detail.value)
            if(e.detail.value!=""){
                this.inputtxt = e.detail.value
                this.isInput = true
            }else{
                this.isInput = false
            }
        },
        enLarge(){
            console.log(111)
            var that = this
            wx.previewImage({
                current: '', // 当前显示图片的http链接
                urls: [that.imgUrl] // 需要预览的图片http链接列表
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
    width:100%;
    position: relative;
}
.container .bg{
    width:100%;
    height:100%;
    display: block;
}
.container .content{
    /* display: none; */
    position: absolute;
    top:76rpx;
    left: 50%;
    margin-left:-331rpx;
    height: 1086rpx;
    width:662rpx;
}
.container .content .bg2{
    height:100%;
    width:100%;
    box-shadow: 0 4px 12px 0 rgba(0,0,0,0.18);
}
.container .content .userinfo-img{
  width:148rpx;
  height: 148rpx;
  background: #ccc;
  position: absolute;
  top:-74rpx;
  left:50%;
  margin-left:-74rpx;
  border-radius: 50%;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.18);
  z-index:9;
  border:2rpx solid #fff;
}
.container .content .userinfo-name{
  font-size: 32rpx;
  height:32rpx;
  line-height:32rpx;
  width:100%;
  text-align: center;
  position: absolute;
  top:103rpx;
  left:0;
  color:#333;
}
.container .content .inp{
    width:574rpx;
    height: 168rpx;
    position: absolute;
    left:50%;
    margin-left:-287rpx;
    top:167rpx;
    font-size:36rpx;
    color:#333;
    line-height: 44rpx;
    white-space: pre-wrap;
}
.container .content .inpVal{
    width:574rpx;
    height: 132rpx;
    position: absolute;
    left:50%;
    margin-left:-287rpx;
    top:167rpx;
    font-size:36rpx;
    color:#333;
    line-height: 44rpx;
}
.container .content .code{
    height: 392rpx;
    width:392rpx;
    position: absolute;
    top:343rpx;
    left:50%;
    margin-left:-196rpx;
}
.container .content .submit{
    border: none;
    height: 94rpx;
    width:574rpx;
    line-height: 94rpx;
    font-size:36rpx;
    color:#fff;
    text-align: center;
    border-radius: 10rpx;
    position:absolute;
    bottom:54rpx;
    left:50%;
    margin-left: -287rpx;
    background-image: linear-gradient(to right,rgba(255,174,34,1) 0%,rgba(255,196,111,1) 100%);
    box-shadow: 0 8px 25px 0 rgba(255,203,112,0.37);
}
</style>
