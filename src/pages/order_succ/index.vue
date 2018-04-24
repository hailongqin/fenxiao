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
                <!--纯文本 -->
                <view class=" ft26 input_content c3" wx:if="{{item.type=='textinfo'}}">
                    {{formContent[index].content}}
                </view>
                <!--input text -->
                <view class=" ft26 input_content c3" wx:if="{{item.type=='text'}}">
                    {{formContent[index].content}}
                </view>
                <view class="ft26 input_content c3" wx:if="{{item.type=='textarea'}}">
                    {{formContent[index].content}}
                </view>
                <view class="ft26 input_content c3" wx:if="{{item.type=='tel'}}">
                    {{formContent[index].content}}
                </view>
                <!--select date  -->
                <view wx:if="{{item.type=='date'}}" class="ft26 input_content c3">
                    {{formContent[index].content}}
                </view>
                <!--预约日期-->
                <view wx:if="{{item.type=='orderDate'}}" class="ft26 input_content c3">
                    {{formContent[index].content}}
                </view>
                <!--下拉框  -->
                <view wx:if="{{item.type=='select'}}" class="ft26 input_content c3">
                    {{formContent[index].content == null ? '': formContent[index].content}}
                </view>
                <!--多选框  -->
                <view class="ft26 gender_radio checkbox" wx:if="{{item.type == 'checkbox' && formContent[index].content}}" @tap="index" data-index="{{index}}" wx:for="{{formContent[index].content}}" wx:key="content" wx:for-item="itemName" wx:for-index="idx">
                     <view class="gender_checkbox" wx:if="{{itemName.length>0}}"> 
                        <icon class="icon radioIcon" type="success_no_circle" size="18" color="#1DA5FF" /> {{itemName}}
                     </view> 
                </view>
                <!--单选框  -->
                <view class="ft26 gender_radio" wx:if="{{item.type=='radio' && formContent[index].content}}">
                    <icon class="icon" type="success" color="#1DA5FF" size="24" /> {{formContent[index].content}}
                </view>
            </view>
        </block>
        <view class="w-100" wx:if="{{cancelFlag}}">
            <button class="ft32 txt-c w-100 white cancel" @tap="cancel(activityId)">取消预约</button>
        </view>
    </view>
</template>

<script>
var app = getApp()
// var formatTime = require('../../utils/util.js')
export default {
    config: {
        "navigationBarTitleText": "预约成功"
    },
    data() {
        return {
            formContent: [],//--单次预约必选项对应的数据
            temps: [],//--表单必填项对应的名字
            activityId: '',//--单次预约对应的id
            cancelFlag: 0//--数据加载完成前先不显示任何内容
        }
    },
    onLoad(e) {
        this.activityId = parseInt(e.id)
        // var date = [], selectIndexs = [], that = this, disqualifications = {}, token = wx.getStorageSync("token");
        // this.$root.get("/basic/plugin/form/content/obtain", { formId: options.id, token: token }, (data) => {
            // if (data.success) {
                // for (let i = 0; i < data.temps.length; i++) {
                //     if (data.formContent.list[0].details[data.temps[i].id].type == "checkbox") {
                //         let details =  data.formContent.list[0].details[data.temps[i].id].content;
                //         details = details.replace(/([""[=?$\x22])|([[=?$\x22])|]/g,"")

                //         data.formContent.list[0].details[data.temps[i].id].content = details.split(",")
                //     }
                //     if (data.temps[i].id == data.formContent.list[0].details[data.temps[i].id].tempId) {
                //         data.formContent.list[0].details[data.temps[i].id].name == data.temps[i].name
                       
                //     }
                // }
            //     that.formContent = data.formContent.list[0]
            //     that.temps = data.temps
            // }

        // })

        //--JSON.parse():将一个 JSON 字符串转换为对象
        var formData = []
        formData = JSON.parse(e.soleList)
        this.temps = JSON.parse(e.temps)
        // if(typeof this.temps == 'string'){
        //     this.temps = JSON.parse(e.temps)
        // }

        var that = this
        for (let i = 0; i < that.temps.length; i++) {
            if (formData[i].type == "checkbox") {
                let details =  formData[i].content;
                details = details.replace(/([""[=?$\x22])|([[=?$\x22])|]/g,"")

                formData[i].content = details.split(",")
            }
            if (that.temps[i].id == formData[i].tempId) {
                formData[i].name == that.temps[i].name
            }
        }
        //--找出必选项每一项对应的数据，否则可能导致数据对应错乱（比如：姓名可能对应的是性别）
        var contentList = []
        for(var i=0; i<that.temps.length; i++){
            for(var j=0; j<formData.length; j++){
                if(that.temps[i].id == formData[j].tempId){
                    contentList.push(formData[j])
                }
            }
        }
        that.formContent = contentList
        that.cancelFlag = 1
    },
    methods: {
        cancel (id) {
            var that = this
            var token = wx.getStorageSync("token");
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
                                    wx.navigateTo({
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