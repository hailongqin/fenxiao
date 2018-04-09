<template>
    <view class="page">
        <form @submit="formSubmit" class="bg-wt">
            <view class="plr30 box-s bor-b bg-wt">
                <textarea class="category_content ft32" name="content" maxlength="-1" placeholder="请输入跟帖内容" placeholder-class="ft32 c9" value="{{followDetail.followContent}}" />
            </view>
            <view class="form_button box-s display-flex bor-b bg-wt">
                <!-- <view class="xiaolian"><image class="xiaolian" src="../../img/xiaolian.png"></image></view> -->
                <button @tap="retrunNav" class="cancel ft28 c007 bg-wt">取消</button>
                <button class="issue white ft28" form-type="submit">发布</button>
            </view>
            <view class="upload plr30 box-s display-flex" wx:if="{{ishtml}}">

                <view class="previewImgs pos-r mb30" wx:for="{{previewImg}}" wx:key="files">
                    <image class="previewImg" src="{{imgUrl+item}}"></image>
                    <view class="shanchuimg txt-c pos-a" @tap="remove(index)">
                        <image class="shanchuimg" src="http://image.vdongchina.com/M00/03/3A/ZSUkmVngGjqEclhlAAAAAMqXjrc175.png"></image>
                    </view>
                </view>
                <view class="upload_input c9 pos-r mb30" @tap="uploadImg" wx:if="{{previewImg.length < 9}}">
                    <view class="pos-a line" />
                    <view class="pos-a lines" /></view>
                <view class="uploadFt txt-c c9 w-100">
                    <view class="ft24">最多可上传9张图片</view>
                </view>
            </view>
            <view class="upload plr30 box-s display-flex" wx:else>

                <view class="previewImgs pos-r mb30" wx:for="{{files}}" wx:key="files">
                    <image class="previewImg" src="{{imgUrl+item}}"></image>
                    <view class="shanchuimg txt-c pos-a" @tap="remove(index)">
                        <image class="shanchuimg" src="http://image.vdongchina.com/M00/03/3A/ZSUkmVngGjqEclhlAAAAAMqXjrc175.png"></image>
                    </view>
                </view>
                <view class="upload_input c9 pos-r mb30" @tap="uploadImg" wx:if="{{files.length < 9}}">
                    <view class="pos-a line" />
                    <view class="pos-a lines" /></view>
                <view class="uploadFt txt-c c9 w-100">
                    <view class="ft24">最多可上传9张图片</view>
                </view>
            </view>
        </form>
    </view>
</template>

<script>
export default {
    config: {
        navigationBarTitleText: '修改跟帖'
    },
    data() {
        return {
            files: [],
            imgUrl: "",
            previewImg: [],
            followDetail: {},
            count: 0
        }
    },
    onLoad(options) {
        var that = this
        that.$root.get("/basic/community/app/follow/" + options.id, {}, function(data) {
            if (data.success) {
                that.files = data.data.imgList
                that.plateId = data.data.plateId
                that.followDetail = data.data
            } else {
                wx.showToast({
                    title: "出错啦",
                    icon: 'loading',
                    duration: 2000
                })
            }

        })
        this.id = options.id
        this.imgUrl = this.$root.globalData.imgUrl
        if (typeof window != 'undefined') {
            this.ishtml = true
            var input = document.createElement("input");//创建input
            input.setAttribute("type", "file");//设置type属性
            input.setAttribute("name", "file");//设置name属性
            input.setAttribute("accept", "image/jpg,image/jpeg,image/png,image/gif");
            input.setAttribute("id", 'fil');
            input.setAttribute("style", 'display: inline-block;opacity: 0;width: 3.94737rem;height: 5.65789rem;border: 2px dashed #C9C9C9;border-radius: 4px;');
            document.getElementsByClassName("upload_input")[0].appendChild(input);
        }
    },
    methods: {
        uploadImg(e) {
            var that = this;
            if (typeof window != 'undefined') {
                var input = document.getElementById("fil");
                let filearr = that.files;
                let previewImgs = that.previewImg
                input.onchange = function(e) {
                    var MAXWIDTH = 100;
                    var MAXHEIGHT = 200;
                    var file = e.target.files[0] || e.dataTransfer.files[0];
                    if (file) {
                        var reader = new FileReader();
                        var form = new FormData();
                        form.append("project", "community"); // 可以增加表单数据
                        form.append("status", 0);
                        form.append("file", file);
                        var xhr = null; //得到xhr对象
                        if (XMLHttpRequest) {
                            xhr = new XMLHttpRequest();
                        } else {
                            xhr = new ActiveXObject("Microsoft.XMLHTTP");
                        }

                        xhr.open("post", "https://upload.vdongchina.com", true);//设置提交方式，url，异步提交
                        xhr.onload = function() {
                            var data = xhr.responseText;    //得到返回值
                            var errorMsg = JSON.parse(data);
                            if (errorMsg.success) {
                                filearr.push(errorMsg.fileid)
                            }
                        }
                        xhr.send(form);
                        that.files = filearr
                        that.previewImg = filearr
                    }
                    // }
                }
            } else {
                if (that.files.length < 9) {
                     var maxCount = 9-that.files.length
                wx.chooseImage({
                    count: maxCount, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function(res) {
                        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                        var tempFilePaths = res.tempFilePaths
                        for (let i = 0; i < res.tempFilePaths.length; i++) {
                            wx.uploadFile({
                                url: that.$root.globalData.upImage, //仅为示例，并非真实的接口地址
                                filePath: tempFilePaths[i],
                                name: 'file',
                                formData: {
                                    project: "community",
                                    status: 0
                                },
                                success: function(data) {
                                    data.data = JSON.parse(data.data)
                                    if (data.data.success) {
                                        var fileArr = that.files
                                        let testImg = data.data.fileid
                                        fileArr.push(testImg)
                                        that.files = fileArr
                                    } else {
                                        wx.showToast({
                                            title: "图片上传失败",
                                            icon: 'loading',
                                            duration: 2000
                                        })
                                    }
                                }
                            })
                        }
                    }
                })

            }
                else {
                    wx.showToast({
                        title: "图片太多了~",
                        icon: 'loading',
                        duration: 2000
                    })
                }
            }
        },
        formSubmit(e) {

            let that = this
            if (that.count == 0) {
                that.count = 1
                setTimeout(function() {
                    that.count = 0
                }, 2000)
                let content = e.detail.value.content
                let data = {}
                var permission = wx.getStorageSync("permission");
                data["followId"] = that.id
                data["followContent"] = content
                data["imgList"] = that.files
                that.$root.post("/basic/community/app/follow/update", data, function(data) {
                    if (data.success) {
                        if ((permission & 16) > 0) {
                            wx.redirectTo({
                                url: '../threadAudit/threadAudit?followId=' + that.id,
                            })
                            return;

                        } else {
                            wx.redirectTo({
                                url: '../topics/topics?id=' + that.id,
                            })

                        }
                    } else {
                        wx.showToast({
                            title: data.msg,
                            icon: 'loading',
                            duration: 2000
                        })

                    }
                }, 1)
            } else {
                wx.showToast({
                    title: "点击太快了",
                    icon: 'loading',
                    duration: 2000
                })
            }
        },
        retrunNav() {
            wx.navigateBack({
                delta: 1
            })
        },
        remove(index) {
            var files = this.files;
            var newImgs = [];
            for (var i = 0; i < files.length; i++) {
                if (i != index) {
                    newImgs.push(files[i])
                }
                this.files = newImgs
            }
        },
    }
}
</script>

<style scoped>
/* pages/comment/comment.wxss */


/* .name{
        padding-top: 30rpx;
        padding-bottom: 20rpx;
        border-bottom: 1px dashed #D8D8D8;
    }
    .category{
        flex-wrap: wrap;
        padding-top: 10rpx;
        border-bottom: 1px solid #D8D8D8;
    }
    .category_title,.category_titleon{
        height: 38rpx;
        line-height: 38rpx;
        padding: 0 16rpx;
        border: 2rpx solid #007AFF;
        border-radius: 100rpx;
        margin-left: 28rpx;
        margin-bottom: 10rpx;
        color: #007AFF;
        font-size: 20rpx;
    }
    .category_titleon{
        border: 2rpx solid #999999;
        color: #999999;
    } */

input {
    display: inline-block;
    opacity: 0;
    width: 150rpx;
    height: 215rpx;
    border: 2rpx dashed #C9C9C9;
    border-radius: 4px;
}

#fil {
    display: inline-block;
    opacity: 0;
    width: 150rpx;
    height: 215rpx;
    border: 2rpx dashed #C9C9C9;
    border-radius: 4px;
}

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
    top: 85rpx;
    left: 77rpx;
    background: #D8D8D8;
    border-radius: 4px;
    -moz-border-radius: 4rpx;
    -webkit-border-radius: 4rpx;
     width: 86rpx;
    height: 4rpx;
    
}

.lines {
    top: 42rpx;
    left: 118rpx;
    background: #D8D8D8;
    border-radius: 4px;
    -moz-border-radius: 4rpx;
    -webkit-border-radius: 4rpx;
   width: 4rpx;
    height: 86rpx;
}
.wx-button {
    padding: 0;
}

.wx-button:after {
    border: none;
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

.upload {
    flex-wrap: wrap;
}

.previewImgs {
    margin-right: 20rpx;
}

.previewImgs,
.previewImg {
    width: 240rpx;
    height: 170rpx;
}

.shanchuimg {
    width: 40rpx;
    height: 40rpx;
    line-height: 14rpx;
    background: #7A8189;
    border-radius: 50%;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    top: -15rpx;
    right: -10rpx;
}

.shanchu {
    width: 14rpx;
    height: 14rpx;
}

.uploadFt {
    padding-bottom: 18rpx;
}
</style>
