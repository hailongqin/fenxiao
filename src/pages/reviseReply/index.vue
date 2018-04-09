<template>
    <view class="page">
        <form @submit="formSubmit" class="bg-wt">
            <view class="plr30 box-s bor-b bg-wt">
                <textarea class="category_content ft32" name="content" value="{{values}}" placeholder="{{'正在回复 ' +  otherName}}" placeholder-class="ft32 c9" />
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
        navigationBarTitleText: '修改评论'
    },
    
    data() {
        return {
            otherName: "",
            otherId: null,
            id: null,
            values: '',
            postId:'',
            count:0
        }
    },
    onLoad(options) {
        var that = this
        that.values = ''
        that.$root.get("/basic/community/app/comment/" + options.id, {}, function(data) {
            if (data.success) {
               that.values = data.data.commentContent
               that.postId = data.data.postId
            } else {
                wx.showToast({
                    title: "出错啦",
                    icon: 'loading',
                    duration: 2000
                })
            }

        })
        that.id = options.id
    },
    methods: {
        formSubmit(e) {
            var permission = wx.getStorageSync("permission");
            var that = this
            if(that.count == 0){
                 that.count  = 1 
                setTimeout(function() {
                         that.count  = 0 
                        }, 2000)
            var content = e.detail.value.content
            that.$root.post("/basic/community/app/comment/update",{commentContent:content,commentId:that.id} , function(data) {
                if (data.success) {
                     if ((permission & 32) > 0) {
                            wx.redirectTo({
                                url: '../replyAudit/replyAudit?id=' + that.id,
                            })
                        return;

                    } else {
                        wx.redirectTo({
                                url: '../topics/topics?id=' + that.postId
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
                        title: '点击太快了',
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
        bindinput(e) {
        }
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


