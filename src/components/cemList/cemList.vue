<template>
  <view class="c_list" wx:if="{{showList.length>0}}">
    <view class="c_navs" style="{{'background-color:'+ bgColor}}">
      <view class="c_navsLeft" scroll-x='true'>
        <view class="{{index==selectIndex?'addBorder':'c_nav'}}" style="{{'color:'+ (selectIndex == index ? activeColor : color) +';font-size:' + fontSize+'px;'+(selectIndex == index ? 'border-bottom:1px solid '+activeColor : '')}}" wx:for="{{showList}}" wx:key='index'
          data-index="{{index}}" bindtap="{{showListItems(index)}}">
          <!-- data-index="{{index}}"  @tap="showListItems(index)" > 测试有问题，下次还是按照正常的写法。。-->
          {{item.classifyName}}
        </view>
      </view>
      <view class="c_navsRight" @tap="toListPage">
        <view class="c_more">更多</view>
        <image class="c_arrow" src="https://image.vdongchina.com/M00/07/D5/ZSUkmVozb4-EfTJBAAAAADulmE4254.png"></image>
      </view>
    </view>
    <scroll-view scroll-x="true" class="c_cardList">
      <view class="{{userList.length == 1?'makeBgFill':'c_item'}}" @tap="toCard(item.userId,index)" wx:for="{{userList}}" wx:key="index">
        <image class="c_headImg" src="{{'https://image.vdongchina.com/'+item.headUrl}}" />
        <view class="c_info">
          <view class="c_name">{{item.userName}}</view>
          <view class="c_position">{{item.positionName}}</view>
        </view>
      </view>
    </scroll-view>
  </view>
  <view wx:else class="c_list_1">
    暂无名片数据
  </view>
</template>

<script>
  export default {
    editorConfig: {
      color: {
        el: ["text", "color"],
        label: "分类标题文本初始颜色",
        type: "String",
        value: "#333",
        director: "ColorPicker"
      },
      activeColor: {
        el: ["text", "color"],
        label: "分类文本选中颜色",
        type: "String",
        value: "#38adff",
        director: "ColorPicker"
      },
      bgColor: {
        el: ["text", "color"],
        label: "分类文本选中颜色",
        type: "String",
        value: "#38adff",
        director: "ColorPicker"
      },
      fontSize: {
        el: ["number"],
        label: "分类文字大小",
        type: "Number",
        value: "14",
        director: "Fsize"
      }
    },
    comName: "名片列表",
    props: {
      color: {
        default: "#333",
        type: String
      },
      bgColor: {
        default: "#fff",
        type: String
      },
      activeColor: {
        default: "#008bf1",
        type: String
      },
      fontSize: {
        default: 14,
        type: Number
      }
    },
    data() {
      return {
        initData: [],
        userList: [],
        selectIndex: 0,
        cardStyle: 1
      };
    },
    computed: {
      showList() {
        // fix 则需要显示四个？
        return this.initData.filter(item => item.showClassify != 2);
        // let arr = this.initData.filter(item => item.showClassify != 0);
        // return arr.slice(0, 4);
      },
      userListLength() {
        return this.userList.length;
      }
    },
    methods: {
      //事件处理函数
      toListPage(e) {
        wx.navigateTo({
          // url: "/pages/c_cardlist/c_cardlist?link=/basic/card/app/classify/listWithUser"
          url: "../c_cardlist/c_cardlist"
        });
      },
      showListItems(index) {
        this.selectIndex = index;
        //   console.log(this.userList, "dfadfad", this);
        // this.userList = this.showList[index].userList;
        // fixed 请求到的数据为null或undefined
        this.userList = !this.showList[index].userList ? [] :
          this.showList[index].userList;
        this.$root.globalData.userList = this.userList; //少发一次请求，直接将请求的结果缓存起来。拉取了全局变量的数据
      },
      // 后台控制名片的横竖格式，所以多加个函数
      toCard(userId, index) {
        wx.request({
          url: `${this.$root.apiServer +
              this.$root.appid}/basic/card/app/config/get`,
          header: {
            "Content-Type": "application/json"
          },
          success: function(res) {
            // 判断名片样式 卡片样式(1竖版 2横版) ,
            res.data.data.cardStyle == 1 ?
              wx.navigateTo({
                url: `../c_cardcolumn/c_cardcolumn?userId=${userId}&index=${index}`
              }) :
              wx.navigateTo({
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
    // onLoad() {
    onShow() {
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
  };
</script>

<style>
  /**index.wxss**/
  .makeBgFill {
    width: 750rpx;
    background: #fff;
    height: 160rpx;
    display: inline-block;
    position: relative;
    /* margin-right: 2rpx; */
  }
  page {
    height: 100%;
  }
  .c_list {
    /* overflow: scroll; */
    overflow: hidden;
    height: 100%;
    background: #f9f9f9;
  }
  .c_navs {
    height: 98rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
  }
  .c_navsRight {
    /* width: 70rpx; */
    width: 185rpx;
    margin-right: 30rpx;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .c_more {
    height: 98rpx;
    line-height: 98rpx;
    font-size: 24rpx;
    margin-right: 7rpx;
    color: #999;
  }
  .c_arrow {
    height: 20rpx;
    width: 10rpx;
  }
  .c_navsLeft {
    height: 100%;
    /* flex: 1; */
    height: 98rpx;
    /* display: flex; */
    white-space: nowrap;
    overflow: hidden;
    /* overflow: scroll; */
    /* justify-content: space-around; */
    align-items: center;
    background: #fff;
    /* overflow: hidden; */
  }
  .c_nav {
    display: inline-block;
    height: 98rpx;
    box-sizing: border-box;
    line-height: 98rpx;
    font-size: 32rpx;
    /* margin: 0 120rpx; */
    /* margin: 0 30rpx 0 30rpx; */
    padding-left: 30rpx;
    padding-right: 30rpx;
    /* padding: 0 30rpx; */
  }
  .addBorder {
    display: inline-block;
    height: 98rpx;
    box-sizing: border-box;
    font-size: 32rpx;
    line-height: 98rpx;
    text-align: center;
    margin: 0 30rpx;
    /* padding: 0 30rpx; */
    color: #333;
    border-bottom: 2rpx solid #008bf1;
    color: #008bf1;
  }
  .c_cardList {
    min-height: 164rpx;
    margin-top: 2rpx;
    display: flex;
    white-space: nowrap;
    justify-content: space-between;
    align-items: flex-start;
    overflow: scroll;
  }
  .c_item {
    background: #fff;
    width: 374rpx;
    height: 160rpx;
    display: inline-block;
    position: relative;
    margin-right: 2rpx;
  }
  .c_headImg {
    position: absolute;
    height: 100rpx;
    width: 100rpx;
    display: block;
    top: 30rpx;
    left: 30rpx;
    border-radius: 50%;
  }
  .c_info {
    height: 160rpx;
    position: absolute;
    top: 0;
    /* right: 0; */
    left: 180rpx;
    width: 184rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  .c_name {
    height: 45rpx;
    line-height: 45rpx;
    font-size: 32rpx;
    color: #333;
    margin-bottom: 10rpx;
  }
  .c_position {
    height: 40rpx;
    line-height: 40rpx;
    font-size: 28rpx;
    color: #666;
  }
  .c_list_1 {
    font-size: 48rpx;
    text-align: center;
  }
</style>