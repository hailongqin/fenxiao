<template>
    <view class="page">
        <form @submit="formSubmit" class="bg-wt">
            <view class="plr30 box-s bor-b bg-wt bg-wt"  wx:if="{{otherName}}">
                <textarea class="category_content ft32" name="content" value="{{values}}" placeholder="{{'正在回复' +  otherName}}" placeholder-class="ft32 c9" />
            </view>
            <view class="plr30 box-s bor-b bg-wt bg-wt" wx:else>
                <textarea class="category_content ft32" name="content" value="{{values}}" placeholder="{{'正在评论'}}" placeholder-class="ft32 c9" />
            </view>
            <view class="form_button box-s display-flex bor-b bg-wt">
                <!-- <view class="xiaolian"><image class="xiaolian" src="../../img/xiaolian.png"></image></view>  -->
                <button class="cancel ft28 c007 bg-wt" @tap="backtrack">取消</button>
                <button class="issue white ft28" form-type="submit">发布</button>
            </view>
            <view class="upload plr30 box-s display-flex">
            </view>
        </form>

    </view>
</template>

<script>
export default {
    config: {
        navigationBarTitleText: '评论'
    },
    data() {
        return {
            otherName: "",
            otherId: null,
            id: null,
            values: '',
            count:0,
            followId:""
        }
    },
    onLoad(options) {
        console.log(options)
        this.values = ''
        this.id = options.id
        if (options.followId && options.otherName) { //跟帖回复
            this.otherName = options.otherName
            this.otherId = options.otherId
            this.followId = options.followId
            return;
        } else if (options.otherName) { //帖子回复
            this.otherName = options.otherName
            this.otherId = options.otherId
            return;
        } else if (options.followId) {
            this.followId = options.followId
            return;//跟帖评论
        } else {
            return;
        }
    },
    methods: {
        formSubmit(e) {
            
            var permission = wx.getStorageSync("permission");
            var that = this
            let content = e.detail.value.content
            if(that.count == 0){
                 that.count  = 1 
                setTimeout(function() {
                         that.count  = 0 
                        }, 2000)
            if (content.length == 0) {
                wx.showToast({
                    title: '输入为空',
                    icon: 'loading',
                    duration: 2000
                })
                return;
            }
            let data = {}
            data["postId"] = that.id
            data["userId"] = that.$root.globalData.userId
            data["commentContent"] = content
            if (that.followId && that.otherName) {//跟帖回复
                data["followId"] = that.followId
                data["otherId"] = that.otherId
            } 
            if (that.otherName && that.otherId) {//帖子回复
                data["otherId"] = that.otherId  
            } 
            if(that.followId.length != 0){
                data["followId"] = that.followId
            }
            that.$root.post("/basic/community/app/comment/save", data, function(data) {
                if (data.success) {
                     if ((permission & 32) > 0) {
                            wx.redirectTo({
                                url: '../replyAudit/replyAudit?id=' + data.data,
                            })
                        return;

                    } else {
                        wx.navigateBack({
                                delta: 1
                            })

                    }
                    


                } else {
                    wx.showToast({
                        title: '回复失败',
                        icon: 'loading',
                        duration: 2000
                    })

                }
            }, 1)

            }else{
                wx.showToast({
                            title: "点击太快了",
                            icon: 'loading',
                            duration: 2000
                        })
            }
            
        },
        backtrack() {
            wx.navigateBack({
                delta: 1
            })
        },
    }
}
</script>

<style scoped>
.page {
    background: #FAFAFA;
    min-height: 100vh;
    border-top: 1px solid #D8D8D8;
}

.category_content {
    width: 100%;
    height: 727rpx;
    padding-top: 30rpx;
}

.upload {
    padding-top: 50rpx;
    background: #FAFAFA;
    -webkit-box-shadow: inset 0px 1px 1px 0px rgba(0, 0, 0, 0.1);

    -moz-box-shadow: inset 0px 1px 1px 0px rgba(0, 0, 0, 0.1);

    box-shadow: inset 0px 1px 1px 0px rgba(0, 0, 0, 0.1);
}

.upload_input {
    width: 240rpx;
    height: 170rpx;
    border: 2rpx dashed #C9C9C9;
    border-radius: 4px;
}

.form_button {
    justify-content: flex-end;
    padding: 20rpx 30rpx;
    overflow: hidden;
}

.line {
    width: 86rpx;
    height: 4rpx;
    background: #D8D8D8;
    border-radius: 4px;
    -moz-border-radius: 4rpx;
    -webkit-border-radius: 4rpx;
    top: 104rpx;
    left: 32rpx;
}

.lines {
    width: 4rpx;
    height: 86rpx;
    background: #D8D8D8;
    border-radius: 4px;
    -moz-border-radius: 4rpx;
    -webkit-border-radius: 4rpx;
    top: 64rpx;
    left: 72rpx;
}

.xiaolian {
    width: 34rpx;
    height: 34rpx;
}

.cancel,
.issue {
    width: 120rpx;
    height: 50rpx;
    line-height: 50rpx;
    border: 2rpx solid #007AFF;
    border-radius: 4px;
    -moz-border-radius: 4rpx;
    -webkit-border-radius: 4rpx;
    margin: 0;
}

.cancel {
    margin-left: 400rpx;
    margin-right: 20rpx;
}

.issue {
    background: #007AFF;
}
</style>


