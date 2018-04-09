<template>
  <view class="container">
    
  </view>
</template>

<script>
export default {
    editorConfig: {
            
        },
        comName:"是否建议完善店铺资料",
        props:{
            
        },
        data(){
            return {
                isDealer:false,
                pid:''
            }
        },
        async onLoad(e){
            await this.$root.login()
            var that = this
            if(e.pid){
                that.$root.globalData.pid = e.pid	
                console.log(that.$root.globalData.pid,"弹窗")	
            }
            //根据设置的经销商门槛以及用户类型是否为游客判断 是否建议完善店铺资料
            wx.request({
                url:this.$root.apiServer + this.$root.appid + this.$root.variate + "/basic/client/distribution/user/suggestFillUserInfo",
                data: {
                    token: that.$root.globalData.token,
                    pid:that.$root.globalData.pid
                },
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(res) {
                    console.log(res,"suggest")
                    if(res.data.code == 200){
                        if(res.data.object){
                            //提示用户设置店铺
                            wx.showModal({
                                title: '提示',
                                content: '您好，您暂时还不是推客，请点击确定后完善店铺信息，系统将自动生成属于你的二维码。',
                                success: function(res) {
                                    if (res.confirm) {
                                        wx.navigateTo({
                                            url: '../f_shopset/f_shopset'
                                        })
                                    } else if (res.cancel) {
                                        
                                    }
                                }
                            })
                        }else{
                            
                        }
                    }else{
                        //
                    }
                }
            });
        }
}
        
</script>

<style scoped>

</style>
