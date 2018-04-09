<template>
<view class="w-100 nav_lists">
    <view class="w-100 box-s ovfl nav_list bg-wt" wx:for="{{arr_hidden}}" wx:key="gg" wx:if="{{item.is_hidden == 1}}">
	        <navigator url="{{item.src}}" class="w-100 clear1" style='border-bottom:solid 2rpx #f1f1f1' open-type="navigate" wx:if="{{!item.list}}">
	            <view class="nav ovfl fl-l">
	                <view class="collect_image fl-l ">
	                    <image class="collect_image_image" src="{{item.img_right}}"></image>
	                </view>
	                <view class="collect_title fl-l ml20">{{item.title}}</view>
	            </view>
	            <view class="fl-r img_right">
	                <image class="img_right_image" src="https://image.vdongchina.com/M00/00/5F/ZSUkmVmKZjqEXGPoAAAAAKhVnJM603.png"></image>
	            </view>
	        </navigator>
        
          <navigator wx:for="{{item.list}}" url="{{list.src}}" style='border-bottom:solid 2rpx #f1f1f1' class="w-100 clear1" open-type="navigate" wx:if="{{item.list}}" wx:key="index" wx:for-item="list">
            <view class="nav ovfl fl-l">
                <view class="collect_image fl-l ">
                    <image class="collect_image_image" src="{{list.img_right}}"></image>
                </view>
                <view class="collect_title fl-l ml20">{{list.title}}</view>
            </view>
            <view class="fl-r img_right">
                <image class="img_right_image" src="https://image.vdongchina.com/M00/00/5F/ZSUkmVmKZjqEXGPoAAAAAKhVnJM603.png"></image>
            </view>
          </navigator>
	    </view>  
</view>
</template>

<script>
export default {
  editorConfig: {
    arr_hidden: {
      el: ['number'],
      label: '列表显示状态',
      type:'Array',
      value: [{
          title : '全部订单',
          is_hidden : 1,
          src:'../orderList/orderList',
          img_right:'https://image.vdongchina.com/M00/00/5F/ZSUkmVmKgJ6EeffoAAAAACgIqHc015.png'
        },
        {
          title : '我的购物车',
          is_hidden :1,
          src:'../car/car',
          img_right:'https://image.vdongchina.com/M00/00/60/ZSUkmVmKxK-EBC9lAAAAAAE4uDc448.png' 
      }],
      director : 'baseTpl'
    }
  },
  comName:"中心导航",
  props: {
    arr_hidden :{
      default:function(){
        return [
          {
            title : '全部订单',
            is_hidden : 1,
            src:'../orderList/orderList',
            img_right:'https://image.vdongchina.com/M00/00/5F/ZSUkmVmKgJ6EeffoAAAAACgIqHc015.png'
          },
          {
            title : '我的购物车',
            is_hidden : 1,
            src:'../car/car',
            img_right:'https://image.vdongchina.com/M00/00/60/ZSUkmVmKxK-EBC9lAAAAAAE4uDc448.png' 
          }
        ]
      }
    }
  },
  methods: {
    // itemTapHandler (to) {
    //   if (!to || typeof to !== 'string') return
    //   wx.navigateTo({
    //     url: to
    //   })
    // }
  },
  onLoad () {
    console.log(this.arr_hidden)
  }
}

</script>
<style scoped>
	.clear1:after{clear: both;visibility: hidden;overflow: hidden; content: "";height: 0;display: block;}
.collect_image {
    /*margin-top: 24rpx;*/
    width: 30rpx;
    height:98rpx;
    line-height: 98rpx;
    box-sizing: border-box;
}
.collect_image_image{
    padding-top: 34rpx;
    width: 30rpx;
    height: 30rpx;
}
.collect_title{
    font-size: 30rpx;
    color: #111111;
    height: 98rpx;
    line-height: 98rpx;
}
.nav{
    height: 98rpx;
    line-height: 98rpx;
    justify-content: flex-start;
    align-items:center;
}
.img_right{
    margin-top: 34rpx;
}
.img_right_image{
    width: 16rpx;
    height: 32rpx;
}
.set_image_image{
     padding-top: 30rpx;
    width: 30rpx;
    height: 38rpx;
}
.nav_lists{
  background-color: #f7f7f7
}
.nav_list{
  background-color: #ffffff;
  padding-left: 30rpx;
  padding-right: 30rpx;
}

/*commonCSS*/
.ml20{
  margin-left: 20rpx;
}
.block {
  display: block;
}

.txt-c {
  text-align: center;
}

.ft24 {
  font-size: 24rpx;
}

.ft26 {
  font-size: 26rpx;
}

.fl-r {
  float: right;
}
.fl-l {
  float: left;
}


.tc {
  text-align: center;
}
.ovfl {
  overflow: hidden;
}

image {
  width: 100%;
}

.c6 {
  color: #666;
}

.c3 {
  color: #333;
}

.c3c {
  color: #3c3c3c;
}

.c9 {
  color: #999;
}
.cl {
  clear: both;
}

.white {
  color: #fff;
}

.box-s {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.display-flex {
  display: flex !important;
  display: -webkit-box !important;
  display: -moz-box !important;
  display: -ms-flexbox !important;
  display: -webkit-flex !important;
}

.display-flex-1 {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
}


</style>
