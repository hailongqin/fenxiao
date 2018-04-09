<template>
  <!-- <view class="c_list">
    <view class="c_navs">
      <scroll-view class="c_navsLeft" scroll-x='true'>
        <view class="{{index==selectIndex?'addBorder':'c_nav'}}" wx:for={{showList}} wx:key='' @tap="showListItems(index)" data-index="{{index}}">
          {{item.classifyName}}
        </view>
      </scroll-view>
      <view class="c_navsRight" @tap="toListPage">
        <view class="c_more">更多</view>
        <image class="c_arrow" src="https://image.vdongchina.com/M00/07/D5/ZSUkmVozb4-EfTJBAAAAADulmE4254.png"></image>
      </view>
    </view>
    <scroll-view scroll-x="true" class="c_cardList">
      <view class="{{userListLength == 1?'makeBgFill':'c_item'}}" @tap="toCard(item.userId,index)" wx:for={{userList}} wx:key="">
        <image class="c_headImg" src="{{'https://image.vdongchina.com/'+item.headUrl}}" />
        <view class="c_info">
          <view class="c_name">{{item.userName}}</view>
          <view class="c_position">{{item.positionName}}</view>
        </view>
      </view>
    </scroll-view>
  </view> -->
  <employerList></employerList>
</template>

<script>
import employerList1 from "../../components/cemList/cemList";
export default {
  config: {
    navigationBarTitleText: "名片列表"
  },
  components: {
    employerList: employerList1
  },
};
</script>

<style scoped>
/**index.wxss**/
</style>
