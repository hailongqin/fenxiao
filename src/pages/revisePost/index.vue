<template>
    <view class="page">
        <form @submit="postInvitation" class="bg-wt">
            <view class="name plr30 box-s bg-wt">
                <input class="name_input ft32" name='title' placeholder="请输入标题" placeholder-class="c9" value="{{postDetail.title}}" />
            </view>
            <view class="category plr30 box-s display-flex  bg-wt">
                <block>
                    <text class="ft20 c9 category_titles">板块选择</text>
                </block>
                <block wx:for="{{categoryList}}" wx:key="categoryList">
                    <text class=" {{postDetail.plateId == item.plateId ? 'category_title' :'category_titleon'}}" @tap="category(item.plateId)">{{item.plateName}}</text>
                </block>
            </view>
            <view class="plr30 box-s bor-b bg-wt">
                <textarea class="category_content " name="content" maxlength="-1" placeholder="请输入正文内容" placeholder-class="test" value="{{postDetail.content}}" />
            </view>
            <view class="form_button box-s display-flex bor-b bg-wt">
                <!-- <view class="xiaolian"><image class="xiaolian" src="../../img/xiaolian.png"></image></view> -->
                <button @tap="retrunNav" class="cancel ft28 c007 bg-wt">取消</button>
                <button class="issue white ft28" form-type="submit">发布</button>
            </view>
            <view class="upload plr30 box-s display-flex" wx:if="{{ishtml}}">
                <view class="previewImgs pos-r mb30" wx:for="{{files}}" wx:key="files">
                    <image class="previewImg" src="{{imgUrl+item}}"></image>
                    <view class="shanchuimg txt-c pos-a" @tap="remove(index)">
                        <image class="shanchuimg" src="http://image.vdongchina.com/M00/03/3A/ZSUkmVngGjqEclhlAAAAAMqXjrc175.png"></image>
                    </view>
                </view>
                <view class="upload_input c9 pos-r mb30" @tap="uploadImg" wx:if="{{files.length < 10}}">
                    <view class="pos-a line"></view>
                    <view class="pos-a lines"></view>
                </view>
                <!-- <input class="upload_input c9 pos-r mb30" type="file" accept="image/jpg,image/jpeg,image/png,image/gif" id="i1" @change="previewImage(this)" /> -->
                <view class="uploadFt txt-c c9 w-100">
                    <view class="ft26">{{files.length }}/10</view>
                    <view class="ft24">默认第一张图片是封面</view>
                </view>
            </view>
            <view class="upload plr30 box-s display-flex" wx:else>
                <view class="previewImgs pos-r mb30" wx:for="{{files}}" wx:key="files">
                    <image class="previewImg" src="{{imgUrl+item}}"></image>
                    <view class="shanchuimg txt-c pos-a" @tap="remove(index)">
                        <image class="shanchuimg" src="http://image.vdongchina.com/M00/03/3A/ZSUkmVngGjqEclhlAAAAAMqXjrc175.png"></image>
                    </view>
                </view>
                <view class="upload_input c9 pos-r mb30" @tap="uploadImg" wx:if="{{files.length < 10}}">
                    <view class="pos-a line"></view>
                    <view class="pos-a lines"></view>
                </view>
                <!-- <input class="upload_input c9 pos-r mb30" type="file" accept="image/jpg,image/jpeg,image/png,image/gif" id="i1" @change="previewImage(this)" /> -->
                <view class="uploadFt txt-c c9 w-100">
                    <view class="ft26">{{files.length }}/10</view>
                    <view class="ft24">默认第一张图片是封面</view>
                </view>
            </view>
        </form>
    </view>
</template>
<script>

export default {
    config: {
        navigationBarTitleText: '修改帖子'
    },
    data() {
        return {
            categoryList: [],
            files: [],
            ishtml: false,
            imgUrl: "",
            previewImg: [],
            plateId: "",
            postId: "",
            postDetail: {},
            count: 0
        }
    },
    onLoad(options) {
        this.imgUrl = this.$root.globalData.imgUrl
        var that = this
        that.postId = options.id
        that.userId = that.$root.globalData.userId
        that.$root.get("/basic/community/app/plate/listAll", {}, function(data) {
            if (data.success) {
                that.categoryList = data.data
            } else {
                wx.showToast({
                    title: "出错啦",
                    icon: 'loading',
                    duration: 2000
                })
            }

        })
        that.$root.get("/basic/community/app/post/" + options.id, {}, function(data) {
            if (data.success) {
                that.files = data.data.imgList
                that.plateId = data.data.plateId
                that.postDetail = data.data
            } else {
                wx.showToast({
                    title: "出错啦",
                    icon: 'loading',
                    duration: 2000
                })
            }

        })

        if (typeof window != 'undefined') {
            that.ishtml = true
            var input = document.createElement("input");//创建input
            input.setAttribute("type", "file");//设置type属性
            input.setAttribute("name", "file");//设置name属性
            input.setAttribute("accept", "image/jpg,image/jpeg,image/png,image/gif");
            input.setAttribute("id", 'file');
            input.setAttribute("style", 'display: inline-block;opacity: 0;width: 3.94737rem;height: 5.65789rem;border: 2px dashed #C9C9C9;border-radius: 4px;');
            document.getElementsByClassName("upload_input")[0].appendChild(input);
        }
    },
    methods: {
        uploadImg(e) {
            var that = this;
            if (typeof window != 'undefined') {
                var input = document.getElementById("file");
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
                                previewImgs.push(errorMsg.fileid)
                            }
                        }
                        xhr.send(form);
                        that.files = filearr
                        that.previewImg = previewImgs
                    }
                    // }
                }
            } else {
                 if (that.files.length < 10) {
                     var maxCount = 10-that.files.length
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
        postInvitation(e) {
            let that = this,
                content = e.detail.value.content,
                data = {},
                title = e.detail.value.title;
                var permission = wx.getStorageSync("permission");
            if (that.count == 0) {
                that.count = 1
                setTimeout(function() {
                    that.count = 0
                }, 2000)
                data["postId"] = that.postId
                data["plateId"] = that.plateId
                data["userId"] = that.$root.globalData.userId
                data["title"] = title
                data["content"] = content
                data["imgList"] = that.files
                if (that.files.length <= 0) {
                    wx.showToast({
                        title: "最少上传一张图片",
                        icon: 'loading',
                        duration: 2000
                    })
                    return;
                }
                that.$root.post("/basic/community/app/post/update", data, function(data) {
                    if (data.success) {
                        if ((permission & 8) > 0) {

                            wx.redirectTo({
                                url: '../commentAudit/commentAudit?postId=' + that.postId,
                            })
                            return;

                        } else {
                            wx.redirectTo({
                                url: '../topics/topics?id=' + that.postId,
                            })
                        }
                    } else {
                        wx.showToast({
                            title: "修改帖子失败",
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
        category(plateId) {
            this.plateId = plateId;
        },

    }
}



</script>


<style scoped>
.page {
    background: #FAFAFA;
    border-top: 1px solid #D8D8D8;
}

.name {
    padding-top: 30rpx;
    padding-bottom: 20rpx;
    border-bottom: 1px dashed #D8D8D8;
}

.category {
    flex-wrap: wrap;
    padding-top: 10rpx;
    padding-bottom: 10rpx;
    border-bottom: 1px solid #D8D8D8;
}

.category_titles {
    height: 38rpx;
    line-height: 38rpx;
}

.category_title,
.category_titleon {
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

.category_titleon {
    border: 2rpx solid #999999;
    color: #999999;
}

.category_content {
    width: 100%;
    height: 563rpx;
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

#file {
    display: inline-block;
    opacity: 0;
    width: 150rpx;
    height: 215rpx;
    border: 2rpx dashed #C9C9C9;
    border-radius: 4px;
}
</style>
