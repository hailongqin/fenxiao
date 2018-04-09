<template>
	<view>
    <!--pages/store/store.wxml-->
    <view class="container">
        <!--<view class="store_search_cont">
            <view class="store_search_input">
                <input type="text" placeholder="韩式美甲" />
                <view class="store_search_icon">
                    <image class="store_search_icon_image" src="../../img/picture.png"></image>
                </view>
            </view>
        </view>-->
        <view class="margint">
           <!-- <view class="_navbar_title bmg pos-r">
                <view class="{{currentTab==0 ? 'active _navbar_item ' : '_navbar_item '}}" data-idx="0" @tap="navbarTap">
                    <view class="_navbar_text"> 综合排序</view>
                    <view class="_navbar_icon">
                        <image wx:if="{{currentTab == 0 }}" class="_navbar_icon_image" src="http://image.vdongchina.com/M00/03/3B/ZSUkmVngJCSEe8d9AAAAAN9ZxIU948.png"></image>
                        <image wx:else class="_navbar_icon_image" src="http://image.vdongchina.com/M00/03/3B/ZSUkmVngI9-ESxQnAAAAAHDtsBQ509.png"></image>
                    </view>
                </view>
                <view class="{{currentTab==1 ? 'active _navbar_item ' : '_navbar_item '}}" data-idx="1" @tap="SalesSort">
                    <view class="_navbar_text">销量</view>
                    <view class="_navbar_icon" wx:if="{{currentTab != 1}}">
                        <image wx:if="{{currentTab == 1}}" class="_navbar_icon_image" src="http://image.vdongchina.com/M00/03/3B/ZSUkmVngJCSEe8d9AAAAAN9ZxIU948.png"></image>
                        <image wx:else class="_navbar_icon_image" src="http://image.vdongchina.com/M00/03/3B/ZSUkmVngI9-ESxQnAAAAAHDtsBQ509.png"></image>                        
                    </view>
                    <view class="_navbar_icon" wx:else>
                        <image wx:if="{{currentTabs}}" class="_navbar_icon_image" src="http://image.vdongchina.com/M00/03/3B/ZSUkmVngJCSEe8d9AAAAAN9ZxIU948.png"></image>
                        <image wx:else class="_navbar_icon_image" src="http://image.vdongchina.com/M00/03/2F/ZSUkmVnfDoSEcLyKAAAAAFxk2sY850.png"></image>
                    </view>
                </view>
                <view class="{{currentTab==2 ? 'active _navbar_item ' : '_navbar_item '}}" data-idx="2" @tap="screen">
                    <view class="_navbar_text">筛选</view>
                    <view class="_navbar_icon screen">
                        <image class="screen_image" src="http://image.vdongchina.com/M00/03/3A/ZSUkmVngHiuEaUvdAAAAAIDo2So032.png"></image>
                    </view>
                </view>
                <view class="_navbar_synthesize pos-f w-100" wx:if="{{sortShow}}">
                    <view class="_navbar_synthesize_item display-flex bg-wt plr30 box-s" wx:for="{{sort}}" wx:key="sort" @tap="sort" data-index="{{index}}">
                        <view class="{{sorts == index ? 'cff ft28 ':'c3 ft28 '}}">{{item}}</view>
                        <view class="">
                            <image class="gou" src="{{sorts == index ? 'http://image.vdongchina.com/M00/03/30/ZSUkmVnfF5yEM5S8AAAAACNFQrY092.png':''}}"></image>
                        </view>
                    </view>
    
                </view>
            </view>-->
            <view class="_navbar_matter">
                <view class="_composite clear">
                    <view class="_composite_item left bmg" wx:for="{{composite}}" wx:key="gg" @tap="toGoods(item.id)">
                        <view class="_composite_img">
                            <image class="_composite_img_image" src="{{'http://image.vdongchina.com/'+item.thumbUrl}}"></image>
                        </view>
                        <view class="_composite_cant">
                            <view class="_composite_name">{{item.name}}</view>
                            <view class="_composite_info clear">
                                <view class="_composite_price clear left">

                                    <view class="_composite_now left">￥<text class="_composite_now_text">{{item.guidePrice}}</text></view>
                                    <!--<view class="_composite_former left">￥
                                        <text>{{item.yl}}</text>
                                    </view>-->
                                </view>
                                <view class="_composite_like right">{{item.collectNum}}人喜欢</view>
                            </view>
                        </view>
                        <!--<view class="_composite_item_head clear">
                            <view class="_composite_item_img left">
                                <image class="_composite_item_img_image" src="{{item.head}}"></image>
                            </view>
                            <view class="left">{{item.personName}}</view>
                        </view>-->
                    </view>
                </view>
            </view>
            <!--未搜索到-->
            <!--<view wx:else class="_navbar_matter_no">
                <image src="http://image.vdongchina.com/M00/03/3A/ZSUkmVngHyOEOkxyAAAAAA58snE351.png"></image>
                <view class="classname">没有搜索到相关宝贝</view>
            </view>-->
        </view>
    
    </view>
     
    <!--<view class="filtrate pos-f w-100 box-s" wx:if="{{filtrateShow}}">
        <view class="filtrate_cont bg-wt">
            <view class="filtrate_cont_top w-100 display-flex box-s">
                <view class="close" @tap="close">
                    <image class="close_image" src="http://image.vdongchina.com/M00/03/3C/ZSUkmVngJymEFke5AAAAAETUHH4818.png"></image>
                </view>
                <view class="filtrate_cont_top_title ft30 c9 txt-c">筛选</view>
            </view>
            <view class="filtrate_cont_main display-flex box-s">
                <view class="filtrate_cont_main_left">
                    <block wx:for="{{filtrate}}" wx:key="filtrate">
                        <view class="{{filtrates == index ? 'on filtrate_cont_main_left_list ft28 c3 box-s ':'filtrate_cont_main_left_list ft28 c3 box-s '}}" data-index="{{index}}" @tap="filtrates">{{item}}</view>
                    </block>
                </view>
                <view class="filtrate_cont_main_right">
                    <block wx:for="{{filtrateType}}" wx:key="filtrate">
                        <view class="{{filtrateTypes == index ? 'on filtrate_cont_main_right_list display-flex ft28 c3 box-s ':'filtrate_cont_main_right_list display-flex ft28 c3 box-s '}}" data-index="{{index}}" @tap="filtrateTypes">
                            <view class="">{{item}}</view>
                            <view class="">
                                <image class="filtrate_cont_main_right_list_image" src=" {{filtrateTypes == index ? 'http://image.vdongchina.com/M00/03/30/ZSUkmVnfF5yEM5S8AAAAACNFQrY092.png':''}}"></image>
                            </view>
                        </view>
                    </block>
                </view>
            </view>
            <view class="filtrate_cont_bottom w-100 display-flex box-s">
                <view class="empty ft30 c3 txt-c" @tap="empty">清空</view>
                <view class="submit ft30 white txt-c" @tap="submit">确定</view>
            </view>
        </view>
    </view> -->
    </view>
</template>

<script>
export default {
    config: {
        "navigationBarTitleText": "门店项目"
    },
		data() {
			return {
//              currentTab: 0,
//              isNo: true,
                composite: [
                ],
//              wrap: [
//                  { head: "../../img/head1.png", name: "席友梅", job: "美甲师", star: "http://image.vdongchina.com/M00/03/3B/ZSUkmVngISWEIARkAAAAAPH2r74720.png", count: 3, },
//                  { head: "../../img/head2.png", name: "席友梅", job: "美甲师", star: "http://image.vdongchina.com/M00/03/3B/ZSUkmVngISWEIARkAAAAAPH2r74720.png", count: 5, },
//                  { head: "../../img/head3.png", name: "席友梅", job: "美甲师", star: "http://image.vdongchina.com/M00/03/3B/ZSUkmVngISWEIARkAAAAAPH2r74720.png", count: 4, },
//              ],
//              grade: ["初级", "一般", "优秀", "卓越", "顶级"],//评价等级
//              sort: ["综合排序", "好评由高到低", "价格由高到低"],//排序
//              sorts: 0,//默认排序
//              sortShow: false,//排序列表是否显示
//              navs: ["综合排序", "销量", "筛选"],
//              filtrate: ["项目类型", "销量", "匠星", "性别"],
//              filtrates: 0,
//              filtrateType: ["不限", "美甲师", "美容师", "美睫师", "造型师", "美发师", "健身教练"],
//              filtrateTypes: 0,
//              filtrateShow: false,
//              currentTabs: false,
//              currentTab: 0
			}
		},    
    onLoad(){
		
		var that = this	    	
		wx.request({
		  url: that.$root.apiServer+that.$root.appid + "/basic/api/server/queryServer",
		  data: {
		  	pageNum:1,
		  	pageSize:50		  	
		  },
		  method:"POST",
		  header: {
		      'content-type': 'application/x-www-form-urlencoded'
		  },
		  success: function(res) {
		  	console.log(res)				    
				that.composite = res.data.data.list.filter(item => {//项目列表
	              return item.status == 1
	           })
		  }
		})	
    },
    		methods: {
//			  navbarTap (e) { //点击头部类别
//			    this.currentTab=e.currentTarget.dataset.idx
//			    this.sortShow=!this.sortShow
//			  },
//			  SalesSort(e){
//			  	 this.currentTab=e.currentTarget.dataset.idx
//			     this.currentTabs=!this.currentTabs
//			  },
//			  screen(e){
//			  	 this.filtrateShow=!this.filtrateShow
//			  },
//			  sort(e){ //排序
//			    const navs = this.navs
//			    this.sort = this.sort
//			    var inx = e.currentTarget.dataset.index;
//			    console.log(navs)
//			    navs[0] = this.sort[inx]
//			    this.sorts=inx
//			    this.sortShow=false
//			    this.navs=navs
//
//			  },
//			  filtrates(e){  //点击筛选类别
//			    var inx = e.currentTarget.dataset.index
//			    this.filtrates=inx
//			  },
//			  filtrateTypes(e){
//			    var inx = e.currentTarget.dataset.index
//			    this.filtrateTypes=inx
//
//			  },
//			  empty(e){
//			    this.filtrateShow=false //筛选清空
//			  },
//			  submit(e){
//			    this.currentTab=2
//			    this.filtrateShow=false //筛选点击确定
//
//			  },
//			  close(e){
//			    this.filtrateShow=false//筛选清空
//			  },
			  //个人详情
			//项目详情
			toGoods(id){
				wx.navigateTo({
					url: '../levelPagesGoods/levelPagesGoods?id='+id
				})
			},			
		}
}
</script>

<style scoped>
/* pages/store/store.wxss */

._navbar_title {
    line-height: 98rpx;
    text-align: center;
    font-size: 30rpx;
    display: flex;
}

.store_search_cont {
    background: #FF4C90;
    padding: 10rpx 30rpx;
}

.store_search_input {
    height: 68rpx;
    background: rgba(255, 255, 255, .5);
    border-radius: 36rpx;
    position: relative
}

.store_search_input input {
    height: 68rpx;
    padding-left: 80rpx;
    color: #ffffff;
    font-size: 30rpx;
}

.store_search_input input::-webkit-input-placeholder {
    color: #fff
}

.store_search_icon {
    position: absolute;
    top: 19rpx;
    left: 30rpx;
    z-index: 99
}

.store_search_icon_image {
    width: 30rpx;
    height: 30rpx;
}


.four_image {
    right: 30rpx;
    top: 42rpx;
}

._navbar_matter {
    margin-top: 10rpx;
}

._composite{
	display: flex; 
	justify-content:space-between ;
	flex-wrap:wrap;		
}
._composite_item {
    width: 370rpx;
    position: relative;
    margin-bottom: 10rpx;
}

._composite_item_head {
    position: absolute;
    left: 30rpx;
    top: 330rpx;
    line-height: 50rpx;
    color: #fff
}

._composite_item_img {
    width: 50rpx;
    height: 50rpx;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 20rpx;
}

._composite_item_img_image {
    width: 50rpx;
    height: 50rpx;
}

._composite_item:nth-child(2) {
    margin-right: 0
}

._composite_img_image {
    width: 370rpx;
    height: 370rpx;
}

._composite_cant {
    padding: 10rpx 20rpx 20rpx 24rpx;
}

._composite_name {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-size: 28rpx;
    color: #333333
}

._composite_info {
    margin-top: 22rpx;
    color: #999999;
}

._composite_price {
    font-size: 22rpx;
}

._composite_now {
    color: #FF4C90
}

._composite_now ._composite_now_text {
    line-height: 48rpx;
    font-size: 34rpx;
    font-weight: bold
}

._composite_former {
    margin-left: 10rpx;
    text-decoration: line-through
}

._composite_former text {
    line-height: 48rpx;
}

._composite_like {
    line-height: 48rpx;
}



/*导航及筛选  */

._navbar_title {
    line-height: 98rpx;
    text-align: center;
    font-size: 30rpx;
    display: flex;
}

._navbar_item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

._navbar_icon {
    width: 18rpx;
    height: 104rpx;
    margin-left: 10rpx
}

._navbar_icon_image {
    width: 18rpx;
    height: 10rpx
}

.screen {
    width: 24rpx;
    height: 98rpx;
}

.screen_image {
    width: 24rpx;
    height: 24rpx;
}

._navbar_item_icon_image {
    width: 18rpx;
    height: 10rpx;
}

._navbar_title .active {
    color: #FF4C90;
    position: relative
}

._wrap_item {
    padding: 30rpx;
    margin-bottom: 20rpx;
}

._name_img {
    width: 140rpx;
    height: 140rpx;
    border-radius: 50%
}

._name_img_image {
    width: 140rpx;
    height: 140rpx;
}

._person {
    width: 330rpx;
    margin-left: 30rpx;
}

._wrap_name {
    line-height: 46rpx;
    font-size: 32rpx;
    font-weight: bold
}

._wrap_job {
    margin-top: 16rpx;
}

._wrap_star {
    margin-top: 20rpx;
}

._wrap_star_image {
    width: 33rpx;
    height: 32rpx;
}

._wrap_grade {
    height: 32rpx;
    line-height: 32rpx;
    display: inline-block;
    font-size: 22rpx;
    margin-left: 10rpx;
}

._wrap_btn {
    width: 180rpx;
    height: 68rpx;
    border: solid #FF4C90 1rpx;
    text-align: center;
    line-height: 68rpx;
    border-radius: 100rpx;
    margin-top: 36rpx;
    color: #FF4C90
}

._navbar_synthesize {
    top: 98rpx;
    left: 0;
    border-top: solid 1px #eeeeee;
    height: calc(100vh - 98rpx);
    background: rgba(0, 0, 0, 0.4)
}

.gou {
    width: 30rpx;
    height: 20rpx;
}

._navbar_synthesize_item {
    justify-content: space-between;
    border-bottom: solid 1px #eeeeee;
    height: 115rpx;
    line-height: 115rpx;
}
</style>

