<template>
    <!-- <view class="w-100 ft28 c9" wx:for="{{indexs}}">
                              item
                          </view> -->
    <!--pages/order_detail/order_detail.wxml-->
    <view class="w-100">
        <block wx:for="{{temps}}" wx:key="index">
            <view class="display-flex form_list box-s plr30 bg-wt">
                <view class="input_title ft28 c3">
                    {{item.name}}：
                </view>
                <!--input text -->
                <view class=" ft26 input_content c3" wx:if="{{item.type=='text'}}">
                    {{formContent.details[item.id].content}}
                </view>
                <view class="ft26 input_content c3" wx:if="{{item.type=='textarea'}}">
                    {{formContent.details[item.id].content}}
                </view>
                <view class="ft26 input_content c3" wx:if="{{item.type=='tel'}}">
                    {{formContent.details[item.id].content}}
                </view>
                <!--select date  -->
                <view wx:if="{{item.type=='date'}}" class="ft26 input_content c3">
                    {{formContent.details[item.id].content}}
                </view>
                <!--下拉框  -->
                <view wx:if="{{item.type=='select'}}" class="ft26 input_content c3">
                    {{formContent.details[item.id].content == null ? '': formContent.details[item.id].content}}
                </view>
                <!--多选框  -->
                <view class="ft26 gender_radio checkbox" wx:if="{{item.type == 'checkbox' && formContent.details[item.id].content.length > 0}}" @tap="index" data-index="{{index}}" wx:for="{{formContent.details[item.id].content}}" wx:key="content" wx:for-item="itemName" wx:for-index="idx">
                     <view class="gender_checkbox" wx:if="{{itemName.length>0}}"> 
                        <icon class="icon radioIcon" type="success_no_circle" size="18" color="#1DA5FF" /> {{itemName}}
                     </view> 
                </view>
                <!--单选框  -->
                <view class="ft26 gender_radio" wx:if="{{item.type=='radio' && formContent.details[item.id].content.length > 0}}">
                    <icon class="icon" type="success" color="#1DA5FF" size="24" /> {{formContent.details[item.id].content}}
                </view>
            </view>
        </block>
        <view class="w-100">
            <button class="ft32 txt-c w-100 white cancel" data-id="{{formContent.id}}" @tap="cancel">取消预约</button>
        </view>
    </view>
</template>

<script>
var app = getApp()
var formatTime = require('../../utils/util.js')
export default {
    config: {
        "navigationBarTitleText": "预约成功"
    },
    data() {
        return {
            formContent: {},
            temps: []
        }
    },
    onLoad(options) {
        var date = [],
            selectIndexs = [],
            that = this,
            disqualifications = {},
            token = wx.getStorageSync("token");
        console.log(token)
        this.$root.get("/basic/plugin/form/content/obtain", { formId: options.id, token: token }, (data) => {
            if (data.success) {
                for (let i = 0; i < data.temps.length; i++) {
                    console.log(i)
                    console.log(data.temps[i].id == data.formContent.details[data.temps[i].id].tempId)
                    if (data.formContent.details[data.temps[i].id].type == "checkbox") {
                        let details =  data.formContent.details[data.temps[i].id].content;
                        details = details.replace(/([""[=?$\x22])|([[=?$\x22])|]/g,"")

                        data.formContent.details[data.temps[i].id].content = details.split(",")
                    }
                    if (data.temps[i].id == data.formContent.details[data.temps[i].id].tempId) {
                        data.formContent.details[data.temps[i].id].name == data.temps[i].name
                       
                    }
                }
                that.formContent = data.formContent
                that.temps = data.temps
            }

        })
    },
    methods: {
        cancel(e) {
            var id = e.currentTarget.dataset.id
            var that = this
            var token = wx.getStorageSync("token");
            console.log(id)
            console.log(e)
            wx.showModal({
                title: '提示',
                content: '确定取消预约',
                success: function (res) {
                    if (res.confirm) {
                       that.$root.post("/basic/plugin/form/content/cancel", { id: id,token:token }, function (data) {
                            if (data.success) {
                                wx.showToast({
                                    title: "取消预约成功",
                                    icon: 'success',
                                    duration: 2000
                                })
                                setTimeout(function () {
                                    wx.redirectTo({
                                        url: '../order_y/order_y'
                                    })
                                }, 2000)

                            } else {
                                wx.showToast({
                                    title: data.replace("html-bussiness:", ""),
                                    icon: 'loading',
                                    duration: 2000
                                })
                            }
                        }, 1)
                    }
                }
            })
        },
    }
}	
</script>

<style scoped>
/* pages/order_detail/order_detail.wxss */

.form_list {
    border-bottom: 1px solid #f4f4f4;
    flex-wrap: wrap;

}

.input_title {
    width: 230rpx;
    height: 98rpx;
    line-height: 98rpx;
}
.input_content {
   min-height: 98rpx;
    line-height: 98rpx;
}
.form_list input,
.gender_radio,
picker {
    position: relative;
    line-height: 98rpx;
    padding-left: 60rpx;

}
.gender_radio{
 margin-left:10rpx;
}
   
picker input {
    height: 98rpx;
    line-height: 98rpx;
}

.radio-group,
.checkbox-group {
    flex-wrap: wrap;
}

.checkbox icon {
    display: inline-block;
    border: 1px solid #999999;
}

.reminder_image {
    width: 30rpx;
    height: 30rpx;
    padding-top: 35rpx;
}

.icon {
    position: absolute;
    top: 24rpx;
    left: 0;
}
.radioIcon{
    width: 40rpx;
    height: 40rpx;
    border: 1px solid #999999;
    line-height: 40rpx;
    text-align: center;
}




/*单选框  */

.gender {
    position: relative;
    height: 98rpx;
}

.radio_sta {
    top: 5rpx;
    left: 0;
    position: absolute;
}

.radio_off {
    width: 30rpx;
    height: 30rpx;
    border-radius: 50%;
    background: #d8d8d8;
    border: 1px solid #999;
    margin-top: 28rpx;
}

.radio_on_image {
    width: 30rpx;
    height: 30rpx;
}

.radio_label {
    width: 89rpx;
    display: inline-block;
}





/*多选  */

.checkbox {
    position: relative;
    height: 98rpx;
}

.label-3__text {
    position: relative;
}

.checkbox_off {
    width: 30rpx;
    height: 30rpx;
    background: #d8d8d8;
    border: 1px solid #999;
    border-radius: 2px;
    margin-top: 28rpx;
}

.checkbox label {
    height: 98rpx;
    line-height: 98rpx;
}

.submit {
    border: none;
    border-radius: 0;
    width: 690rpx;
    height: 98rpx;
    line-height: 98rpx;
    background: #1DA5FF;

    margin: 0 auto;
    margin-top: 100rpx;
}

.cancel {
    border: none;
    border-radius: 0;
    width: 690rpx;
    height: 98rpx;
    line-height: 98rpx;
    background: #C8C8C8;
    margin: 0 auto;
    margin-top: 100rpx;
    margin-bottom: 50rpx;
}


















/*prompt  */

.prompt {
    background: #FF0000;
    height: 68rpx;
    line-height: 68rpx;
}


















/*弹窗  */

.model {
    display: block;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    z-index: 9999;
}

.popup {
    width: 560rpx;
    height: 265rpx;
    margin: 0 auto;
    display: block;
    margin-top: calc(50vh - 180rpx);
}

.model_title {
    height: 40rpx;
    line-height: 40rpx;
    padding-top: 50rpx;
    margin-bottom: 72rpx;
}

.model_footer {
    height: 100rpx;
    line-height: 100rpx;
    border-top: 1px solid #C8C8C8;
}

.confirm {
    color: #1DA5FF;
}
</style>