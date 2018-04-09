<template>
  <view style='display:none'>。。。</view>
  <!-- <view>请等待一会。。。</view> -->
</template>

<script>
export default {
  data() {
    return {
      redirect: false
    };
  },
  methods: {
    // 后台控制名片的横竖格式，所以多加个函数
    toCard(userId, index) {
      this.redirect = true;
      console.log(
        "url is",
        `${this.$root.apiServer + this.$root.appid}/basic/card/app/config/get`
      );
      wx.request({
        url: `${this.$root.apiServer +
          this.$root.appid}/basic/card/app/config/get`,
        header: {
          "Content-Type": "application/json"
        },
        success: function(res) {
          console.log("res", res.data.data.cardStyle);
          // 判断名片样式 卡片样式(1竖版 2横版) ,
         ! res.data.data.cardStyle == 1
            ? wx.navigateTo({
                url: `../c_cardcolumn/c_cardcolumn?userId=${userId}&index=${index}`
              })
            : wx.navigateTo({
                url: `../c_cardrow/c_cardrow?userId=${userId}&index=${index}`
              });
        }
      });
    },
    showMsg() {
      wx.showModal({
        title: "提示",
        content: "请求数据失败了"
      });
    }
  },
  onLoad(options) {
    let userId = decodeURIComponent(options.scene);
    console.log("userId", userId);
    let url = `${this.$root.apiServer +
      this.$root.appid}/basic/card/app/user/get?id=${userId}`;
    const that = this;
    wx.request({
      url: url,
      header: {
        "Content-Type": "application/json"
      },
      method: "GET",
      success: function(res) {
        // 返回data
        console.log("res", res);
        let data = res.data;
        data.success
          ? (that.$root.globalData.userList[0] = data.data)
          : that.showMsg();
        // that.$root.globalData.userList[0] = data.data;
        that.toCard(userId, 0);
      },
      fail: function() {
        wx.showModal({
          title: "提示",
          content: "出错了，工程师正在加急修复"
        });
      }
    });
  },
  onShow() {
    console.log("dfadfadcvzcvc");
    if (this.redirect)
      wx.redirectTo({
        url: "/pages/c_employeeList/c_employeeList"
      });
  }
};
</script>

<style>

</style>
