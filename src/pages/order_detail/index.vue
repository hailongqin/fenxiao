<template>
    <view>
        <view class="w-100">
            <view wx:if="{{reminderShow}}" class="prompt ft28 white w-100 txt-c">请完善信息！</view>
            <form @submit="formSubmit">
                <block wx:for="{{temps}}" wx:key="temps">
                    <view class="display-flex form_list box-s plr30 bg-wt">
                        <view class="input_title ft28 c3">
                            {{item.name}}:
                        </view>
                        <!--input text -->
                        <view class="c3 ft26" wx:if="{{item.type=='text'}}">
                            <input class="inputxx" disabled="{{submitSuc}}" placeholder-style="line-height:98rpx;" value="{{item.initValue}}" name="{{'name' + item.id}}" @input="bindinput(index,item.allowNull,$event)" placeholder-class="input_place" />
                        </view>
                        <view class="c3 ft26" wx:if="{{item.type=='textarea'}}">
                            <textarea class="textarea" placeholder-style="color:#666;line-height:83rpx;font-size:28rpx;" disabled="{{submitSuc}}" value="{{item.initValue}}" name="{{'name' +item.id}}" @input="bindinput(index,item.allowNull,$event)"/>
                        </view>
                        <view class="c3 ft26" wx:if="{{item.type=='tel'}}">
                            <input class="inputxx" maxlength="11" disabled="{{submitSuc}}" placeholder-style="line-height:98rpx;" type="number" @input="phone(index,item.allowNull,$event)" value="{{item.initValue}}" name="{{'name' + item.id}}" placeholder-class="input_place" />
                        </view>
                        <!--select date  -->
                        <view wx:if="{{item.type=='date'}}" class="{{dates[index] == '' ? 'ft26 c9':'ft26 c3'}}">
                            <picker class="picke" disabled="{{submitSuc}}" mode="date" value="{{dates[index]}}" @change="bindDateChange(item.allowNull,index,$event)" name="{{'name' + item.id}}">
                                <view class="picker">
                                    {{ dates[index] == "" ? "年/月/日" : dates[index]}}
                                </view>
                            </picker>
                        </view>
                        <!--预约日期-->
                        <view wx:if="{{item.type=='orderDate'}}" class="{{dates[index] == '' ? 'ft26 c9':'ft26 c3'}}">
                            <picker start="{{startTime}}" end="{{endTime}}" class="picke" disabled="{{submitSuc}}" mode="date" value="{{dates[index]}}" @change="bindDateChange(item.allowNull,index,$event)" name="{{'name' + item.id}}">
                                <view class="picker">
                                    {{ dates[index] == "" ? "年/月/日" : dates[index]}}
                                </view>
                            </picker>
                        </view>
                        <!--下拉框  -->
                        <view wx:if="{{item.type=='select'}}" class="ft26">
                            <picker class="picke" disabled="{{submitSuc}}" @change="bindPickerChange(index, item.allowNull,$event)" value="{{item.initValues[testtest[index]]}}" range="{{item.initValues}}" name="{{'name' + item.id}}">
                                <view class="{{item.initValues[testtest[index]]  ? 'picker c3':'picker c9'}}">
                                    {{item.initValues[testtest[index]] ? item.initValues[testtest[index]]:"请选择"}}
                                </view>
                            </picker>
                        </view>
                        <!--多选框  -->
                        <view class="ft26 gender_radio" wx:if="{{item.type == 'checkbox'}}" @tap="index" data-index="{{index}}">
                            <checkbox-group class="w-100 display-flex checkbox-group" @change="checkboxChange(item.allowNull,index,$event)" name="{{'name' +item.id}}">
                                <view class="{{item.checked ? 'checkbox c3':'checkbox c9'}}" wx:for="{{item.initValues}}" wx:key="gg">
                                    <checkbox color="#1DA5FF" disabled="{{submitSuc}}" value="{{item}}">
                                    </checkbox>
                                    <label>{{item}}</label>
                                </view>
                            </checkbox-group>
                        </view>
                        <!--单选框  -->
                        <view class="ft26 gender_radio" wx:if="{{item.type=='radio'}}">
                            <radio-group class="w-100 display-flex radio-group" @change="radioChange($event)" name="{{'name' +item.id}}">
                                <view class="{{item.checked ? 'gender c3':'gender c9'}}" wx:for="{{item.initValues}}" wx:key="initValues">
                                    <radio id="{{item}}" color="#1DA5FF" disabled="{{submitSuc}}" value="{{item}}">
                                    </radio>
                                    <label class="radio_label" for="{{item}}">{{item}}</label>
                                </view>
                            </radio-group>
                        </view>
                        <view class="reminder" wx:if="{{disqualification[index] == 'false'}}">
                            <image class="reminder_image" src="http://image.vdongchina.com/M00/03/3C/ZSUkmVngJymEFke5AAAAAETUHH4818.png"></image>
                        </view>
                        <view class="reminder" wx:if="{{disqualification[index] == 'true'}}">
                            <image class="reminder_image" src="http://image.vdongchina.com/M00/03/30/ZSUkmVnfF-GEYnTwAAAAAEILYkM651.png"></image>
                        </view>
                    </view>
                </block>
				<view  wx:if="{{temps.length > 0}}">
					<view class="w-100" wx:if="{{!submitSuc}}">
	                    <button class="ft32 txt-c w-100 white submit" form-type="submit">确认提交</button>
	                </view>
	                <view class="w-100" wx:if="{{!submitSuc}}">
	                    <button class="ft32 txt-c w-100 white cancel" @tap="back">取消</button>
	                </view>
	                <view class="w-100" wx:if="{{submitSuc}}">
	                    <button class="ft32 txt-c w-100 white cancel" @tap="cancel">取消预约</button>
	                </view>					
				</view>
				<view class="w-100" wx:else>
				    <view class="look_iamge"><image class="look_image_image" src="http://image.vdongchina.com/M00/03/3A/ZSUkmVngGuOEFl4-AAAAABDamwk685.png"></image></view>
				    <view class="w-100 txt-c c9 ft28 look_title">未设置表单</view>
				</view>
    
            </form>
        </view>
        <view class="model" wx:if="{{modelShow}}">
            <view class="popup bg-wt">
                <view class="model_title ft30 30 w-100 txt-c">提交成功！查看我的预约</view>
                <view class="display-flex model_footer w-100">
                    <!-- <view class="c9 ft36 w-100 txt-c" @tap="modelCancel">取消</view> -->
                    <view class="c9 ft36 w-100 txt-c confirm" @tap="modelConfirm">确定</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
var app = getApp()
var formatTime = require('../../utils/util.js')
export default {
    config: {
        "navigationBarTitleText": "提交预约"
    },
    data() {
        return {
            dates: "年/月/日",
            index: '',//选择器
            reminderShow: false,//是否有不符合提示
            submitSuc: false,//提交是否成功
            SubmitCounts: 0,//是否提交过 0没有 1提交过
            modelShow: false,//模态框是否显示
            disqualification: {},//图片提醒显示状态  -1不提醒  
            temps: [],//--表单必填项对应的名字
            testtest: [],//对应下拉框所选择的索引
            id: "",//formId
            formContentId: '',
            startTime: '',//--用户预约的当前时间
            endTime: '',//--活动截止时间
            soleList: []//--表单必填项对应的数据
        }
    },
    onLoad(options) {
        //--获取用户预约的当前时间
        this.getNowDate()
        let userInf = wx.getStorageSync("userInfo")
        if (!userInf.nickName) {
            var that = this
            wx.login({
                success(res) {
                    wx.getUserInfo({
                        success: function (user) {
                            wx.setStorageSync("userInfo", user.userInfo);
                            if (res.code) {
                                //发起网络请求
                                wx.request({
                                    url: that.$root.apiServer + that.$root.appid + '/basic/api/user/login',
                                    data: {
                                        code: res.code,
                                        nickName: user.userInfo.nickName,
                                    },
                                    method: 'POST',
                                    header: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    },
                                    success(res) {
                                        wx.setStorageSync("token", res.data.data.token);
                                    }
                                })
                            } else {
                                // console.log('获取用户登录态失败！' + res.errMsg)
                            }
                        }
                    })

                }
            })
        }
        var date = [],
        selectIndexs = [],
        disqualifications = {};
        this.submitSuc = false
        this.modelShow = false
        this.$root.get("/basic/plugin/form/infoandtemps", { formId: options.id }, (data) => {
            this.endTime = data.form.endTime.substr(0,10)
            for (let i = 0; i < data.temps.length; i++) {
                disqualifications[i] = "-1"
                date[i] = ''
                selectIndexs[i] = -1
                // if(data.temps[i].type == "checkbox"){
                //     data.temps[i].initValues[0].checked = true
                // }
            }
            this.temps = data.temps
            this.dates = date
            this.indexs = selectIndexs
            this.disqualification = disqualifications
            this.id = options.id
        })
    },
    methods: {
        //--获取用户操作的当前日期
        getNowDate(){
            var nowDate = new Date()
            var year = nowDate.getFullYear()
            var month = nowDate.getMonth() + 1
            var day = nowDate.getDate()
            if(month < 10){
                month = '0' + month
            }
            if(day < 10){
                day = '0' + day
            }
            this.startTime = year + '-' + month + '-' + day
        },


        /**
         * 生命周期函数--监听页面初次渲染完成
         */
        bindinput(idx, allowNull, e) {  //输入框验证
            var value = e.detail.value;
            this.SubmitCount(value, idx, allowNull)
        },
        radioChange(e) { //单选框操作
            var checked = e.detail.value
        },
        checkboxChange(allowNull, index, e) {//多选框操作        	
            var values = e.detail.value//选中的值
            this.SubmitCount(values, index, allowNull)
        },
        bindDateChange(allowNull, index, e) {//时间选择器
            var a = e.detail.value,
                changeDate = [];
            this.dates.forEach(function(item,idx){
                changeDate.push(item)
            })
            changeDate[index] = a
            this.dates = changeDate
            // console.log(this.dates)
            this.SubmitCount(a, index, allowNull)

        },
        bindPickerChange(index, allowNull, e) {//下拉框
            var selectIndexs = this.indexs,
                values = e.detail.value
            selectIndexs[index] = parseInt(e.detail.value)
            this.testtest = selectIndexs
            this.SubmitCount(values, index, allowNull)
        },
        phone(index, allowNull, e) {//输入手机号
            var phone = e.detail.value,
                temp = this.temps,
                disqualifications = this.disqualification,
                flag = /^1[34578]\d{9}$/.test(phone);
            if (this.SubmitCounts) {
                if (flag) {
                    disqualifications[index] = "true"

                } else {
                    disqualifications[index] = "false"
                }
                this.disqualification = disqualifications
            }
        },
        // 判断是否提交过,提交过输入改变状态
        SubmitCount(value, index, allowNull) {

            var disqualifications = this.disqualification
            if (this.SubmitCounts) {//form提交过
                if (value.length > 0) {
                    disqualifications[index] = "true"
                }
                if (value.length == 0 && !allowNull) { // 当数据为空时并且不允许为空
                    disqualifications[index] = "false"
                }
                this.disqualification = disqualifications
            }

        },
        formSubmit(e) { //提交数据
            var formId = this.id//表单id
            var $this = this,
                datas = e.detail.value;
            var formName = $this.temps
            var data = {};
            var trueCount = 0;// 数据符合的数量
            this.SubmitCounts = 1 //设置提交状态
            var FormDatas = e.detail.value,
                userInfos = wx.getStorageSync("userInfo"),
                disqualifications = this.disqualification;
            //手机号验证
            data["formId"] = formId
            data["headimgurl"] = userInfos.avatarUrl
            data["token"] = wx.getStorageSync("token")
            data["contents"] = []

            for (var i = 0; i < formName.length; i++) {
                disqualifications[i] = "true"
                var objec= {};//提交的数据的内容
                objec["tempId"] = formName[i].id
                objec["type"] = formName[i].type
                if (formName[i].type == 'checkbox') {//当类型是多选框是把数据转成字符串
                    objec["content"] = datas["name" + String(formName[i].id)].join(",")
                }
                objec["content"] = datas["name" + String(formName[i].id)]//根据formData键名找到对应的数据  并赋值content
                data["contents"].push(objec)
                if ((datas["name" + String(formName[i].id)] == '' || datas["name" + String(formName[i].id)] == null) && !formName[i].allowNull) {
                    disqualifications[i] = "false"//当数据为长度为0并不允许为空 设置提示图片的显示的状态
                }
                if (formName[i].type == "tel" && !formName[i].allowNull) {
                    let flag = /^1[34578]\d{9}$/.test((datas["name" + String(formName[i].id)]))
                    if (!flag) {
                        disqualifications[i] = "false"
                    }
                }
                if (disqualifications[i] == 'true') {
                    trueCount++ //数据通过验证,通过验证数增加
                }
            }
            if (trueCount < formName.length) {//验证数少于表单长度
                this.reminderShow = true
                this.disqualification = disqualifications
                return;
            }
            if (trueCount == formName.length) {//全部通过验证
                this.reminderShow = false
                this.soleList = data.contents
                wx.request({
                    url: this.$root.apiServer + $this.$root.appid + "/basic/plugin/form/content/save",
                    method: "POST",
                    data: data,
                    header: { 'content-type': "application/json;charset=UTF-8" },
                    success: function (data) {
                        if (data.data.success) {
                            $this.modelShow = true//弹出模态框
                            $this.submitSuc = true//表单所有选项不可点击

                            for (var i = 0; i < formName.length; i++) {
                                disqualifications[i] = "-1"//请求成功 设置提示状态不显示
                            }
                            $this.formContentId = data.data.id
                            $this.disqualification = disqualifications
                        } else {
                            if (data.data.message) {
                                wx.showToast({
                                    title: data.data.message,
                                    icon: 'none',
                                    duration: 2000
                                })
                            }
                            else {
                                wx.showToast({
                                    title: data.data.replace("html-bussiness:", ""),
                                    icon: 'none',
                                    duration: 2000
                                })
                            }
                        }

                    }
                })
            }
        },
        cancel(e) {
            var id = this.id,
                $this = this
            wx.showModal({
                title: '提示',
                content: '确定取消预约',
                success: function (res) {
                    if (res.confirm) {
                        $this.$root.post("/basic/plugin/form/content/cancel", { id: id }, function (data) {
                            if (data.success) {
                                wx.showToast({
                                    title: "取消预约成功",
                                    icon: 'success',
                                    duration: 2000
                                })
                                wx.navigateBack({
                                    delta: 1
                                })
                            } else {
                                if (data.data.message) {
                                    // wx.showToast({
                                    //     title: data.data.message,
                                    //     icon: 'loading',
                                    //     duration: 2000
                                    // })
                                    wx.showModal({
                                        title: '提示',
                                        content: data.data.message,
                                        showCancel: false,
                                        success: function(res) {
                                            if (res.confirm) {
                                                // console.log('用户点击确定')
                                            }
                                        }
                                    })
                                } 
                                else {
                                    // wx.showToast({
                                    //     title: data.data.replace("html-bussiness:", ""),
                                    //     icon: 'loading',
                                    //     duration: 2000
                                    // })
                                    wx.showModal({
                                        title: '提示',
                                        content: data.data.replace("html-bussiness:", ""),
                                        showCancel: false,
                                        success: function(res) {
                                            if (res.confirm) {
                                                // console.log('用户点击确定')
                                            }
                                        }
                                    })
                                }
                            }
                        }, 1)
                    }
                }
                
            })
        },
        back() {
            wx.navigateBack({ //点击取消返回上一层
                delta: 1
            })
        },
        // 判断是否全部符合
        // modelCancel() { //提交成功，点击取消
        //     this.modelShow = false
        // },

        //--提交成功查看预约，id、temps、soleList都传递给order_succ页
        modelConfirm() {
            var id = this.formContentId
            let temps = JSON.stringify(this.temps)
            let soleList = JSON.stringify(this.soleList)
            wx.redirectTo({
                url: '../order_succ/order_succ?id=' + id + '&temps=' + temps + '&soleList=' + soleList,
            })
        },
    }
}	
</script>

<style scoped>
/* pages/order_detail/order_detail.wxss */

.form_list {
    border-bottom: 1px solid #f4f4f4;
}

.input_title {
    width: 230rpx;
    height: 98rpx;
    line-height: 98rpx;
}

.input_place {
    height: 98rpx;
    line-height: 98rpx;
}

.textarea {
    width: 430rpx;
    border: 1px solid #f4f4f4;
}

.form_list .inputxx,
.gender_radio,
.picker {
    width: 430rpx;
    line-height: 98rpx;
}

.inputxx,
.picker {
    line-height: 98rpx;
    height: 98rpx;
}

.gender_radio,
.picke {
    padding-left: 10rpx;
}

.radio-group,
.checkbox-group {
    flex-wrap: wrap;
}

.reminder_image {
    width: 30rpx;
    height: 30rpx;
    padding-top: 35rpx;
}











/*单选框  */

.gender {
    position: relative;
    height: 98rpx;
    margin-left: 10rpx;
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
    display: inline-block;
}











/*多选  */

.checkbox {
    position: relative;
    height: 98rpx;
    margin-left: 20rpx;
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
    margin-top: 20rpx;
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
.look_iamge{
    width: 210rpx;
    margin: 0 auto;
    display: block;
    margin-top: 100rpx;
}
.look_image_image{
    width: 210rpx;
    height: 210rpx;
     margin: 0 auto;
}
.look_title{
    margin-top: 30rpx;
    height: 40rpx;
    line-height: 40rpx;
}
.order_start{
    margin-top: 58rpx;
    height: 50rpx;
    line-height: 50rpx;
    color: #1DA5FF;
}
</style>