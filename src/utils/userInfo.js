function GetuserInfo(that, openId) {
    if (typeof that.$root.globalData.userInfo.nickName != "undefined" && wx.getStorageSync("userId").length == 0) {
        var userInfo = that.$root.globalData.userInfo
        that.$root.post("/app/user/login", { nickName: userInfo.nickName, gender: userInfo.gender, province: userInfo.province, city: userInfo.city, country: userInfo.country, avatarUrl: userInfo.avatarUrl, openId: openid }, function(data) {
            if (data.success) {
                wx.setStorageSync("userId", data.data.userId);
                wx.setStorageSync("permission", data.data.permission);
                console.log(data)
            } else {
                wx.showToast({
                    title: "网络出错了",
                    icon: 'loading',
                    duration: 2000
                })
            }
        }, 1)
    }
    if (typeof that.$root.globalData.userInfo.nickName == "undefined" && wx.getStorageSync("userId").length == 0) {
        wx.getUserInfo({
            success: function(res) {
                var userInfo = res.userInfo
                var nickName = userInfo.nickName
                var avatarUrl = userInfo.avatarUrl
                var gender = userInfo.gender //性别 0：未知、1：男、2：女
                var province = userInfo.province
                var city = userInfo.city
                var country = userInfo.country
                that.$root.globalData.userInfo = userInfo
                that.$root.post("/app/user/login", { nickName: nickName, gender: gender, province: province, city: city, country: country, avatarUrl: avatarUrl, openId: openId }, function(data) {
                    if (data.success) {
                        wx.setStorageSync("userId", data.data.userId);
                        wx.setStorageSync("permission", data.data.permission);
                    } else {
                        wx.showToast({
                            title: "网络出错了",
                            icon: 'loading',
                            duration: 2000
                        })
                    }

                }, 1)
            }
        })
    }
}
module.exports = {
    GetuserInfo: GetuserInfo
}