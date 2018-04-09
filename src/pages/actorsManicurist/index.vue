<template>
<view>
	<view class="container">
	<!--<view class="_navbar_title bmg pos-r">
		<view class="{{currentTab==index ? 'active _navbar_item' : '_navbar_item'}}" data-idx="index">
			<view class="{{currentTab==0 ? 'active _navbar_item' : '_navbar_item'}}" data-idx="0" @tap="navbarTap">
				<view class="_navbar_text"> 综合排序</view>
				<view class="_navbar_icon">
					<image wx:if="{{currentTab == 0}}" class="_navbar_icon_image" src="http://image.vdongchina.com/M00/03/3B/ZSUkmVngJCSEe8d9AAAAAN9ZxIU948.png"></image>
					<image wx:else class="_navbar_icon_image" src="http://image.vdongchina.com/M00/03/3B/ZSUkmVngI9-ESxQnAAAAAHDtsBQ509.png"></image>
				</view>
			</view>
			<view class="{{currentTab==1 ? 'active _navbar_item' : '_navbar_item'}}" data-idx="1" @tap="SalesSort">
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
		</view>
		<view class="_navbar_synthesize pos-f w-100" wx:if="{{sortShow}}">
			<view class="_navbar_synthesize_item display-flex bg-wt plr30 box-s" wx:for="{{sort}}" wx:key="sort" @tap="sort" data-index="index">
				<view class="{{sorts == index ? 'cff ft28 ':'c3 ft28 '}}">{{item}}</view>
				<view class="">
					<image class="gou" src="{{sorts == index ? 'http://image.vdongchina.com/M00/03/30/ZSUkmVnfF5yEM5S8AAAAACNFQrY092.png':''}}"></image>
				</view>
			</view>
		</view>
	</view>-->

	<view class="_wrap_item bmg margint clear" wx:for="{{wrap}}" wx:key="gg">
		<view class="left clear" @tap="nameItem(item.id)">
			<view class="_name_img left" @tap="toManicuristIndex">
				<image class="_name_img_image" src="{{'http://image.vdongchina.com/'+item.headUrl}}"></image>
			</view>
			<view class="_person left">
				<view class="_wrap_name">{{item.name}}</view>
				<view class="_wrap_job">{{item.categoryName}}</view>
				<!--<view class="_wrap_star display-flex c6">
					<block wx:for="{{item.count}}" wx:key="image_star">
						<image class="_wrap_star_image" src="http://image.vdongchina.com/M00/03/3B/ZSUkmVngISWEIARkAAAAAPH2r74720.png">
						</image>
					</block>
					<view class="_wrap_grade">({{grade[item.count-1]}})</view>
				</view>-->
			</view>
		</view>
	</view>
</view>
<!--
<view class="filtrate pos-f w-100 box-s" wx:if="{{filtrateShow}}">
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
					<view class=" {{filtrates == index ? 'on filtrate_cont_main_left_list ft28 c3 box-s':'filtrate_cont_main_left_list ft28 c3 box-s'}}" data-index="index" @tap="filtrates">{{item}}</view>
				</block>
			</view>
			<view class="filtrate_cont_main_right">
				<block wx:for="{{filtrateType}}" wx:key="filtrate">
					<view class="{{filtrateTypes == index ? 'on filtrate_cont_main_right_list display-flex ft28 c3 box-s ':'filtrate_cont_main_right_list display-flex ft28 c3 box-s '}}" data-index="index" @tap="filtrateTypes">
						<view class="">{{item}}</view>
						<view class="">
							<image src=" {{filtrateTypes == index ? 'http://image.vdongchina.com/M00/03/30/ZSUkmVnfF5yEM5S8AAAAACNFQrY092.png':''}}"></image>
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
</view>-->
</view>	
</template>

<script>
export default {
		config: {
			"navigationBarTitleText": "技师列表"
		},
		data() {
			return {
//		    currentTab:0,
		    wrap: [
			],
			pages:'',
			page:1,
			pageSize:6
//		    grade:["初级","一般","优秀","卓越","顶级"],//评价等级
//		    sort: ["综合排序", "好评由高到低","价格由高到低"],//排序
//		    sorts:0,//默认排序
//		    sortShow:false,//排序列表是否显示
//		    navs: ["综合排序", "销量","筛选"],
//		    filtrate: ["项目类型", "销量", "匠星","性别"],
//		    filtrates:0,
//		    filtrateType: ["不限", "美甲师", "美容师", "美睫师", "造型师", "美发师", "健身教练"],
//		    filtrateTypes:0,
//		    filtrateShow:false,
//		    currentTabs:false,
//		    currentTab:0
			}
		},	
		onLoad(){
			this.wrap = []
			//技师

			this.setDown()
		},

		onReachBottom: function() {
			if(this.page <= this.pages) //当前将获取的页码不超过总页数		        
			{
				this.page += 1
				this.setDown()
			}
		},		
		methods: {
			setDown(){
				var that = this	
				wx.request({
				url: that.$root.apiServer + that.$root.appid + "/basic/api/staff/queryStaff",
				data: {
					pageNum:that.page,
					pageSize:that.pageSize
				},
				method:"POST",
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: function(res) {
					var temItems = res.data.data.list		
					temItems = res.data.data.list.filter(item => {//匠星列表
						return item.status == 1
					})
					that.wrap=	that.wrap.concat(temItems)
					that.pages = res.data.data.pages							
					}
				})
			},			
			nameItem(id){
				wx.navigateTo({
					url: '../actorsManicuristIndex/actorsManicuristIndex?id='+id
				})
			},			
			
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
//			    var inx = e.currentTarget.dataset.index
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
		}
}

</script>

<style scoped>
page{background: #F9F9F9;}	
.container{background: #F9F9F9;}	
._navbar_title{line-height: 98rpx;text-align: center;font-size: 30rpx;display: flex;}
._navbar_item{flex:1;display: flex;justify-content: center;align-items:center;}
._navbar_icon{width: 18rpx;height:104rpx;margin-left: 10rpx}
._navbar_icon_image{width: 18rpx;height: 10rpx}
.screen{width: 24rpx;height: 98rpx;}
.screen_image{width: 24rpx;height: 24rpx;}
._navbar_item_icon_image{width: 18rpx;height: 10rpx;}
._navbar_title .active{color: #FF4C90;position: relative} 
._wrap_item{padding: 30rpx;margin-bottom: 20rpx;}
._name_img{width: 140rpx;height: 140rpx;border-radius: 50%;overflow: hidden}
._name_img_image{width: 140rpx;height: 140rpx;}
._person{width: 330rpx;margin-left: 30rpx;}
._wrap_name{line-height: 46rpx;font-size: 32rpx;font-weight: bold}
._wrap_job{margin-top: 16rpx;}
._wrap_star{margin-top: 20rpx;}
._wrap_star_image{width: 33rpx;height: 32rpx;}
._wrap_grade{height:32rpx;line-height: 32rpx;display: inline-block;font-size: 22rpx;margin-left: 10rpx;}
._wrap_btn{width: 180rpx;height: 68rpx;border:solid #FF4C90 1rpx;text-align: center;line-height:68rpx;border-radius: 100rpx;margin-top: 36rpx;color: #FF4C90}
._navbar_synthesize{
  top: 98rpx;left: 0; border-top: solid 1px #eeeeee;height: calc(100vh - 98rpx);background: rgba(0, 0, 0, 0.4)
}
.gou{
  width: 30rpx;height: 20rpx;
}
._navbar_synthesize_item{
  justify-content: space-between;
  border-bottom: solid 1px #eeeeee;
  height: 115rpx;line-height: 115rpx;
}
.container .pos-f{top: 98rpx;}	
</style>