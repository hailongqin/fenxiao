<template>
  <view class="c_list">
    <scroll-view scroll-x="true" class="c_navs">
      <view class="{{index==selectIndex?'addBorder':'c_nav'}}" wx:for={{showList}} wx:key='' @tap="showListItems(index)" data-index="{{index}}">
        {{item.classifyName}}
      </view>
    </scroll-view>
    <view class="c_cardList">
      <view class="c_item" @tap="toCard(item.userId,index)" wx:for={{userList}} wx:key="">
        <image class="c_headImg" src="{{'https://image.vdongchina.com/'+item.headUrl}}" />
        <view class="c_info">
          <view class="c_name">{{item.userName}}</view>
          <view class="c_position">{{item.positionName}}</view>
        </view>
        <image class="c_arrow" src="https://image.vdongchina.com/M00/07/C9/ZSUkmVozJWaEeCn-AAAAALMuc1U691.png" />
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    config: {
      navigationBarTitleText: "员工列表"
    },
    data() {
      return {
        initData: [], // fixed .变量名冲突
        userList: [],
        selectIndex: 0,
        url: ""
      };
    },
    computed: {
      showList() {
        // return this.$root.globalData.initdata.filter(
        //   item => item.showClassify != 0
        // );
        return this.initData.filter(item => item.showClassify != 2);
      }
    },
    methods: {
      showListItems(index) {
        this.selectIndex = index;
        // fixed 请求到的数据为null或undefined
        this.userList = !this.showList[index].userList ? [] :
          this.showList[index].userList;
        this.$root.globalData.userList = this.userList; //少发一次请求，直接将请求的结果缓存起来。拉取了全局变量的数据
        // this.userList = this.showList[index].userList;
      },
      toCard(userId, index) {
        wx.request({
          url: `${this.$root.apiServer +
            this.$root.appid}/basic/card/app/config/get`,
          header: {
            "Content-Type": "application/json"
          },
          success: function(res) {
            console.log("res", res.data.data.cardStyle);
            res.data.data.cardStyle == 1 ?
              wx.navigateTo({
                url: `/pages/c_cardcolumn/c_cardcolumn?userId=${userId}&index=${index}`
              }) :
              wx.navigateTo({
                url: `/pages/c_cardrow/c_cardrow?userId=${userId}&index=${index}`
              });
          }
        });
      },
      showMsg() {
        wx.showModal({
          title: "提示",
          content: "请求数据失败了"
        });
      },
      getInitData() {
        const that = this;
        let url = `${this.$root.apiServer +
          this.$root.appid}/basic/card/app/classify/listWithUser`;
        wx.request({
          url: url,
          header: {
            "Content-Type": "application/json"
          },
          method: "GET",
          success: function(res) {
            // 返回data
            let data = res.data;
            data.success ? (that.initData = data.data) : that.showMsg();
            // 初始化 列表頁
            // that.$root.globalData.initdata = data.data;
            that.showListItems(0);
          },
          fail: function() {
            wx.showModal({
              title: "提示",
              content: "出错了，工程师正在加急修复"
            });
          }
        });
      }
    },
    onLoad(option) {
      const that = this;
      // this.data=that.$root.globalData.data; //直接拉取初始化的data字段数据// 还是发请求吧。。。
      that.getInitData();
      // that.showListItems(0);
    }
  };
</script>

<style scoped>
  /**index.wxss**/
  page {
    height: 100%;
  }
  .c_list {
    overflow: scroll;
    height: 100%;
    background: #f9f9f9;
  }
  /* 职位类型 */
  /* ._me_title_items{
          display:flex;white-space: nowrap;height: 82rpx;
          overflow: scroll;
          border-bottom: 1rpx solid #E5E5E5;
        }
        ._me_title_Item{height:82rpx;display: inline-block;line-height: 82rpx;text-align: center;color: #666;font-size: 28rpx;margin: 0 27rpx;box-sizing: border-box;}
        .text{height:82rpx;
        box-sizing:border-box;
        } */
  .c_navs {
    width: 100%;
    height: 84rpx;
    display: flex;
    white-space: nowrap;
    overflow: scroll;
    justify-content: space-around;
    align-items: center;
    background: #fff;
  }
  .c_nav {
    display: inline-block;
    height: 84rpx;
    box-sizing: border-box;
    font-size: 32rpx;
    line-height: 84rpx;
    text-align: center;
    margin: 0 30rpx;
    color: #333;
  }
  .addBorder {
    display: inline-block;
    height: 84rpx;
    box-sizing: border-box;
    font-size: 32rpx;
    line-height: 84rpx;
    text-align: center;
    margin: 0 30rpx;
    color: #333;
    border-bottom: 2rpx solid #008bf1;
    color: #008bf1;
  }
  .c_cardList {
    background: #fff;
    margin-top: 10rpx;
    height: auto;
  }
  .c_item {
    height: 160rpx;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1rpx solid #eaeaea;
  }
  .c_item:last-child {
    border: none;
  }
  .c_headImg {
    height: 100rpx;
    width: 100rpx;
    display: block;
    margin: 0 40rpx 0 30rpx;
    border-radius: 50%;
  }
  .c_arrow {
    height: 32rpx;
    width: 18rpx;
    margin-right: 49rpx;
  }
  .c_info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  .c_name {
    font-size: 32rpx;
    height: 45rpx;
    line-height: 45rpx;
    margin-bottom: 20rpx;
    color: #333;
  }
  .c_position {
    font-size: 28rpx;
    height: 40rpx;
    line-height: 40rpx;
    color: #666;
  }
</style>
