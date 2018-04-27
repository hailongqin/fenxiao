<template>
	<view>
		<view wx:if="{{reminderShow}}" class="prompt ft28 w-100 txt-c" style="color: red;">请完善{{tests}}信息！</view>
		<view wx:if="{{modelShow}}" class="noItem">
			<view class="noItem_cont">
				<image class="noItem_img" src="http://image.vdongchina.com/M00/03/B1/ZSUkmVnttbSEahuXAAAAAMxOMQw776.png"></image>
				<view>预约成功</view>
			</view>
			<view class="noItem_btn">
				<view class="noItem_look" @tap="look">查看详情</view>
				<view class="noItem_cal" @tap="cancel">取消预约</view>
			</view>
		</view>
		<view wx:else>
			<form @submit="formSubmit">
				<view class="form-box">
					<view wx:for="{{temps}}" wx:key="temps" class="ui-item">
						<view class="{{item.type=='checkbox'?'input_title static':'input_title'}}">
							{{item.name}}
						</view>
            <!--纯文本-->
            <view class="ui-field" wx:if="{{item.type=='textinfo'}}">
              <textarea maxlength="-1" class="textarea" disabled="true" value="{{item.initValue}}" name="{{'name' +item.id}}" placeholder-class="input_place"/>
						</view>
						<!--input text -->
						<view class="ui-field" wx:if="{{item.type=='text'}}">
							<input class="inputxx" disabled="{{submitSuc}}" value="{{item.initValue}}" name="{{'name' + item.id}}" @input="bindinput(index,item.allowNull,$event)" placeholder-class="input_place" placeholder="{{'请输入'+item.name}}" />
						</view>

						<view class="ui-field" wx:if="{{item.type=='textarea'}}">
							<textarea maxlength="-1" class="textarea" disabled="{{submitSuc}}" value="{{item.initValue}}" name="{{'name' +item.id}}" @input="bindinput(index,item.allowNull,$event)" placeholder-class="input_place" placeholder="{{'请输入'+item.name}}" />
						</view>

						<view class="ui-field" wx:if="{{item.type=='tel'}}">
							<input class="inputxx" disabled="{{submitSuc}}" value="{{item.initValue}}" name="{{'name' + item.id}}" type="number" maxlength="11" @input="phone(index,item.allowNull,$event)" placeholder-class="input_place" placeholder="{{'请输入'+item.name}}" />
						</view>

						<!--select date  -->
						<view wx:if="{{item.type=='date'}}" class="{{dates[index] == '' ? 'ui-field empty':'ui-field'}}">
							<picker class="picke" disabled="{{submitSuc}}" mode="date" value="{{dates[index]}}" @change="bindDateChange(item.allowNull,index,$event)" name="{{'name' + item.id}}">
								<view class="picker">
									{{ dates[index] == "" ? "年/月/日" : dates[index]}}
								</view>
							</picker>
						</view>

						<!--预约日期-->
            <view wx:if="{{item.type=='orderDate'}}" class="{{dates[index] == '' ? 'ui-field empty':'ui-field'}}">
                <picker start="{{startTime}}" end="{{endTime}}" class="picke" disabled="{{submitSuc}}" mode="date" value="{{dates[index]}}" @change="bindDateChange(item.allowNull,index,$event)" name="{{'name' + item.id}}">
                    <view class="picker">
                        {{ dates[index] == "" ? "年/月/日" : dates[index]}}
                    </view>
                </picker>
            </view>

						<!--下拉框  -->
						<view class="ui-field" wx:if="{{item.type=='select'}}">
							<picker class="picke" disabled="{{submitSuc}}" @change="bindPickerChange(index, item.allowNull,$event)" value="{{item.initValues[testtest[index]]}}" range="{{item.initValues}}" name="{{'name' + item.id}}">
								<view class="{{item.initValues[testtest[index]]  ? 'picker':'picker empty'}}">
									{{item.initValues[testtest[index]] ? item.initValues[testtest[index]]:"请选择"}}
								</view>
							</picker>
						</view>

						<!--多选框  -->
						<view class="gender_checkbox ui-field" wx:if="{{item.type == 'checkbox'}}" @tap="index" data-index="{{index}}">
							<checkbox-group class="w-100 checkbox-group" @change="checkboxChange(item.allowNull,index,$event)" name="{{'name' +item.id}}">
								<label class="checkbox" wx:for="{{item.initValues}}" wx:key="index">
									<checkbox color="#1DA5FF" disabled="{{submitSuc}}" value="{{item}}"></checkbox>
									<text>{{item}}</text>
								</label>
							</checkbox-group>
						</view>

						<!--单选框  -->
						<view class="gender_radio ui-field" wx:if="{{item.type=='radio'}}">
							<radio-group class="w-100 radio-group" @change="radioChange($event)" name="{{'name' +item.id}}">
								<label class="radio" wx:for="{{item.initValues}}" wx:key="index">
									<radio id="{{item}}" color="#1DA5FF" disabled="{{submitSuc}}" value="{{item}}"></radio>
									{{item}}
								</label>
							</radio-group>
						</view>
						<!--<view class="reminder" wx:if="{{disqualification[index] == 'false'}}">
							<image class="reminder_image" src="http://image.vdongchina.com/M00/03/3C/ZSUkmVngJymEFke5AAAAAETUHH4818.png"></image>
						</view>
						<view class="reminder" wx:if="{{disqualification[index] == 'true'}}">
							<image class="reminder_image" src="http://image.vdongchina.com/M00/03/30/ZSUkmVnfF-GEYnTwAAAAAEILYkM651.png"></image>
						</view>-->
					</view>

				</view>

				<view wx:if="{{temps.length > 0}}">
					<view wx:if="{{!submitSuc}}" class="btn-group">
						<button form-type="submit" class="btn-submit" style="{{'color:'+txtColor+';background:'+btnColor+';'}}">{{txt}}</button>
					</view>
				</view>

				<view wx:else>
					<view class="look_iamge">
						<image class="look_image_image" src="http://image.vdongchina.com/M00/03/3A/ZSUkmVngGuOEFl4-AAAAABDamwk685.png"></image>
					</view>
					<view class="look_title">未设置表单</view>
				</view>

			</form>
		</view>
	</view>
</template>

<script>
var formatTime = require("../../utils/util.js");
export default {
  editorConfig: {
    form: {
      el: ["navtor"],
      label: "选择万用表单",
      type: Object,
      value: {
        sort: "",
        id: ""
      },
      director: "formSelect"
    },
    btnColor: {
      el: ["text", "color"],
      label: "按钮背景色",
      type: "String",
      value: "#1ea5ff",
      director: "ColorPicker"
    },
    txtColor: {
      el: ["text", "color"],
      label: "按钮字体颜色",
      type: "String",
      value: "#fff",
      director: "ColorPicker"
    },
    txt: {
      el: ["text"],
      label: "按钮文本",
      type: "String",
      value: "确认提交",
      director: "Input"
    }
  },
  comName: "预约表单",
  props: {
    form: {
      type: Object,
      default: function() {
        return {
          sort: "",
          id: ""
        };
      }
    },
    btnColor: {
      type: String,
      default: "#1ea5ff"
    },
    txtColor: {
      type: String,
      default: "#fff"
    },
    txt: {
      type: String,
      default: "确认提交"
    }
  },
  data() {
    return {
      dates: "年/月/日",
      index: "", //选择器
      reminderShow: false, //是否有不符合提示
      submitSuc: false, //提交是否成功
      SubmitCounts: 0, //是否提交过 0没有 1提交过
      modelShow: false, //模态框是否显示
      disqualification: {}, //图片提醒显示状态  -1不提醒
      temps: [], //表单数据
      testtest: [], //对应下拉框所选择的索引
      id: "", //formId
      formContentId: "",
      tests: "",
      categoryId: "",
      repeatCount: "",//--单个活动可预约次数
      startTime: '',//--用户预约的当前时间
      endTime: ''//--活动截止时间
    };
  },
  onLoad() {
	  var that = this;
    //--获取用户预约的当前时间
	  that.getNowDate()
    var userInf = wx.getStorageSync("userInfo");
    if (userInf && !userInf.nickName) {
      wx.login({
        success: function success(res) {
          wx.getUserInfo({
            success: function success(user) {
              wx.setStorageSync("userInfo", user.userInfo);
              if (res.code) {
                //发起网络请求
                wx.request({
                  url:
                    that.$root.apiServer +
                    that.$root.appid +
                    "/basic/api/user/login",
                  data: {
                    code: res.code,
                    nickName: user.userInfo.nickName
                  },
                  method: "POST",
                  header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  },
                  success: function success(res) {
                    wx.setStorageSync("token", res.data.data.token);
                  }
                });
              } else {
                // console.log('获取用户登录态失败！' + res.errMsg);
              }
            }
          });
        }
      });
    }
    var id = this.form.id;
	  var that = this
    wx.request({
      url:that.$root.apiServer + that.$root.appid + "/basic/plugin/form/infoandtemps",
      method: "GET",
      header: {
        "content-type": "application/json"
      },
      data: {
        formId: id
      },
      success(res) {
        if (res.data.form && res.data.form.endTime) {
          //--获取活动结束时间
		      that.endTime = res.data.form.endTime.substr(0,10)
        }
        if (res.data.form && res.data.form.repeatCount) {
          //--单个活动可预约次数
          that.repeatCount = res.data.form.repeatCount
        }
        that.loadForm(id)
        if (that.repeatCount == 1) {
          var dateArr = [],
          selectIndexs = [],
          disqualifications = {},
          token = wx.getStorageSync("token");
          that.$root.get("/basic/plugin/form/content/obtain",{ formId: id, token: token },data => {
            if (data.success) {
              // for (let i = 0; i < data.temps.length; i++) {
              // 	if (data.formContent.details[data.temps[i].id].type == "checkbox") {
              // 		let details = data.formContent.details[data.temps[i].id].content;
              // 		details = details.replace(/([""[=?$\x22])|([[=?$\x22])|]/g, "")

              // 		data.formContent.details[data.temps[i].id].content = details.split(",")
              // 	}
              // 	if (data.temps[i].id == data.formContent.details[data.temps[i].id].tempId) {
              // 		data.formContent.details[data.temps[i].id].name == data.temps[i].name

              // 	}
              // }
              // that.formContent = data.formContent.list[0]
              that.temps = data.temps;
              if (data.formContent.list.length > 0) {
                that.formContentId = data.formContent.list[0].id;
                that.modelShow = true;
              } else {
                that.modelShow = false;
              }
            } else {
              wx.showToast({
                title: "网络异常！",
                icon: "loading",
                duration: 2000
              });
            }
          })
        } else {
          var dateArr = [],
          selectIndexs = [],
          disqualifications = {},
          token = wx.getStorageSync("token")
          that.$root.get("/basic/plugin/form/content/obtain",{ formId: id, token: token },data => {
            if (data.success) {
              that.temps = data.temps;
            }
          })
        }
      }
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
    bindinput(idx, allowNull, e) {
      //输入框验证
      var value = e.detail.value;
      this.SubmitCount(value, idx, allowNull);
    },
    radioChange(e) {
      //单选框操作
      var checked = e.detail.value;
    },
    checkboxChange(allowNull, index, e) {
      //多选框操作
      var values = e.detail.value; //选中的值
      this.SubmitCount(values, index, allowNull);
    },
    bindDateChange(allowNull, index, e) {
      //时间选择器
      var a = e.detail.value,
        changeDate = [];
        // console.log(this.datas,"datas")
      this.dates.forEach(function(item, idx) {
        changeDate.push(item);
      });
      changeDate[index] = a;
      this.dates = changeDate;
      this.SubmitCount(a, index, allowNull);
    },
    bindPickerChange(index, allowNull, e) {
      //下拉框
      var selectIndexs = this.indexs,
        values = e.detail.value;
      selectIndexs[index] = parseInt(e.detail.value);
      this.testtest = selectIndexs;
      this.SubmitCount(values, index, allowNull);
    },
    phone(index, allowNull, e) {
      //输入手机号
      var phone = e.detail.value,
        temp = this.temps,
        disqualifications = this.disqualification,
        flag = /^1[34578]\d{9}$/.test(phone);
      if (this.SubmitCounts) {
        if (flag) {
          disqualifications[index] = "true";
        } else {
          disqualifications[index] = "false";
        }
        this.disqualification = disqualifications;
      }
    },
    // 判断是否提交过,提交过输入改变状态
    SubmitCount(value, index, allowNull) {
      var disqualifications = this.disqualification;
      if (this.SubmitCounts) {
        //form提交过
        if (value.length > 0) {
          disqualifications[index] = "true";
        }
        if (value.length == 0 && !allowNull) {
          // 当数据为空时并且不允许为空
          disqualifications[index] = "false";
        }
        this.disqualification = disqualifications;
      }
    },
    formSubmit(e) {
      //提交数据
      var formId = this.form.id; //表单id
      var $this = this,
      datas = e.detail.value;
      var formName = $this.temps;
      console.log(datas,formName)
      var data = {};
      var trueCount = 0; // 数据符合的数量
      this.SubmitCounts = 1; //设置提交状态
      var FormDatas = e.detail.value,
      userInfos = wx.getStorageSync("userInfo"),
      disqualifications = this.disqualification;
      //手机号验证
      data["formId"] = formId;
      data["headimgurl"] = userInfos.avatarUrl;
      data["token"] = wx.getStorageSync("token");
      data["contents"] = [];

      for (var i = 0; i < formName.length; i++) {
        disqualifications[i] = "true";
        var objec = {}; //提交的数据的内容
        objec["tempId"] = formName[i].id;
        objec["type"] = formName[i].type;
        if (formName[i].type == "checkbox") {
          //当类型是多选框是把数据转成字符串
          objec["content"] = datas["name" + String(formName[i].id)].join(",");
        }
        objec["content"] = datas["name" + String(formName[i].id)]; //根据formData键名找到对应的数据  并赋值content
        data["contents"].push(objec);
        //					if((datas["name" + String(formName[i].id)] == '' || datas["name" + String(formName[i].id)] == null) && !formName[i].allowNull){
        //
        //					}
        if (formName[i].type != 'textinfo') {
          if ((datas["name" + String(formName[i].id)] == "" || datas["name" + String(formName[i].id)] == null) && !formName[i].allowNull) {
            disqualifications[i] = "false"; //当数据长度为0并不允许为空 设置提示图片的显示的状态
            $this.tests = formName[i].name;
            $this.reminderShow = true;
            return;
          }
        }
        
        // if (formName[i].type == 'textinfo') {
        //   disqualifications[i] = 'true'
        // }
        if (formName[i].type == "tel" && !formName[i].allowNull) {
          let flag = /^1[34578]\d{9}$/.test(
            datas["name" + String(formName[i].id)]
          );
          if (!flag) {
            disqualifications[i] = "false";
            $this.tests = "正确的手机号";
            $this.reminderShow = true;
            return;
          }
        }
        if (disqualifications[i] == "true") {
          trueCount++; //数据通过验证,通过验证数增加
        }
      }
      if (trueCount < formName.length) {
        //验证数少于表单长度
        this.reminderShow = true;
        this.disqualification = disqualifications;
        return;
      }
      if (trueCount == formName.length) {
        //全部通过验证
        this.reminderShow = false;
        wx.request({
          url:
            this.$root.apiServer +
            $this.$root.appid +
            "/basic/plugin/form/content/save",
          method: "POST",
          data: data,
          header: {
            "content-type": "application/json;charset=UTF-8"
          },
          success: function(data) {
            console.log(data,"11111111111111")
            if (data.data.success) {
              $this.onLoad();
              //$this.submitSuc = true //表单所有选项不可点击

              for (var i = 0; i < formName.length; i++) {
                disqualifications[i] = "-1"; //请求成功 设置提示状态不显示
              }
              $this.formContentId = data.data.id;
              $this.disqualification = disqualifications;
              wx.showToast({
                title: '提交成功！可在我的预约中查看',
                icon: "none",
                duration: 2000
              });
            } else {
              if (data.data.message) {
                wx.showToast({
                  title: data.data.message,
                  icon: "none",
                  duration: 2000
                });
              } else {
                wx.showToast({
                  title: data.data.replace("html-bussiness:", ""),
                  icon: "none",
                  duration: 2000
                });
              }
            }
          }
        });
      }
    },
    loadForm(id) {
      var date = [],
      selectIndexs = [],
      disqualifications = {};
      this.submitSuc = false;
      var that = this;
      wx.request({
        url: this.$root.apiServer + this.$root.appid + "/basic/plugin/form/infoandtemps",
        method: "GET",
        header: {
          "content-type": "application/json"
        },
        data: {
          formId: id
        },
        success(res) {
          for (let i = 0; i < res.data.temps.length; i++) {
            disqualifications[i] = "-1";
            date[i] = "";
            selectIndexs[i] = -1;
          }
          that.categoryId = res.data.form.categoryId;
          that.temps = res.data.temps;
          that.dates = date;
          that.indexs = selectIndexs;
          that.disqualification = disqualifications;
          this.id = id;
        }
      })
    },
    look() {
      wx.navigateTo({
        url: "../order_list/order_list?catCid=" + this.categoryId
      });
    },
    cancel(e) {
      var $this = this;
      wx.showModal({
        title: "提示",
        content: "确定取消预约",
        success: function(res) {
          if (res.confirm) {
            $this.$root.post(
              "/basic/plugin/form/content/cancel",
              { id: $this.formContentId, token: wx.getStorageSync("token") },
              function(data) {
                if (data.success) {
                  wx.showToast({
                    title: "取消预约成功",
                    icon: "success",
                    duration: 2000
                  });
                  $this.onLoad();
                } else {
                  if (data.data.message) {
                    wx.showToast({
                      title: data.data.message,
                      icon: "loading",
                      duration: 2000
                    });
                  } else {
                    wx.showToast({
                      title: data.data.replace("html-bussiness:", ""),
                      icon: "loading",
                      duration: 2000
                    });
                  }
                }
              },
              1
            )
          }
        }
      })
    }
  }
}
</script>

<style>
.noItem {
  padding: 80rpx 0;
}

.noItem_cont {
  text-align: center;
}

.noItem_img {
  width: 210rpx;
  height: 164rpx;
  margin-bottom: 40rpx;
}

.noItem_btn {
  display: flex;
  justify-content: space-between;
  padding: 0 100rpx;
  font-size: 30rpx;
  line-height: 80rpx;
  margin-top: 80rpx;
}

.noItem_look {
  padding: 0 60rpx;
  background: #1ea5ff;
  border-radius: 10rpx;
  border: solid 2rpx #1ea5ff;
  color: #fff;
}

.noItem_cal {
  padding: 0 60rpx;
  background: #fff;
  border-radius: 10rpx;
  border: solid 2rpx #999999;
}

.form-box {
  border-bottom: 2rpx solid #ededed;
  padding-left: 30rpx;
}

.form-box .ui-item {
  position: relative;
  line-height: 70rpx;
  padding: 14rpx 0;
  border-bottom: 2rpx solid #ededed;
}

.form-box .ui-item:last-child {
  border-bottom: 0;
}

.form-box .input_title {
  position: absolute;
  height: 70rpx;
  line-height: 70rpx;
  width: 180rpx;
  text-align: left;
  left: 0;
  top: 14rpx;
  font-size: 28rpx;
  color: #333;
}

.form-box .static {
  position: static;
  width: 100%;
}

.form-box .ui-field {
  margin-left: 170rpx;
  color: #333;
  font-size: 28rpx;
}

.form-box .gender_checkbox {
  margin-left: 0;
}

.form-box .wx-radio .wx-radio-input {
  height: 32rpx;
  width: 32rpx;
}

.form-box .empty {
  color: #bbb;
}

.form-box .input_place {
  font-size: 28rpx;
  color: #bbb;
  height: 70rpx;
  line-height: 70rpx;
}

.form-box .inputxx {
  padding: 0;
  height: 70rpx;
  line-height: 70rpx;
}

.form-box .radio-group {
  font-size: 0;
}

.form-box .radio,
.form-box .checkbox {
  margin-right: 70rpx;
  display: inline-block;
  font-size: 28rpx;
}

.form-box .radio_label {
  font-size: 28rpx;
  color: #333;
  vertical-align: top;
}

.form-box .textarea {
  width: 510rpx;
  height: 120rpx;
  line-height: 38rpx;
  margin-top: 18rpx;
}

.form-box .checkbox-group {
  height: auto;
  line-height: 74rpx;
}

.btn-submit {
  width: 700rpx;
  height: 80rpx;
  line-height: 80rpx;
  border-radius: 6rpx;
  margin: 40rpx auto 0;
  padding: 0;
  font-size: 32rpx;
}

.btn-group {
  padding: 30rpx 0;
}

.btn-submit:after {
  border: 0;
}

.look_iamge {
  width: 210rpx;
  margin: 0 auto;
  display: block;
  margin-top: 100rpx;
}

.look_image_image {
  width: 210rpx;
  height: 210rpx;
  margin: 0 auto;
}

.look_title {
  margin-top: 30rpx;
  height: 40rpx;
  line-height: 40rpx;
  text-align: center;
  color: #bbb;
}

.form-box .wx-checkbox-input {
  width: 32rpx;
  height: 32rpx;
}

.reminder_image {
  width: 30rpx;
  height: 30rpx;
  padding-top: 35rpx;
}
</style>