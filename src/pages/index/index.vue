<template>
<view class="page">	
	<view @tap="liveList" style="font-size:50rpx;margin-bottom:50rpx;color:red;">分销商品列表</view>
	<view @tap="personalNew" style="font-size:40rpx;color:orange;margin-bottom:50rpx;">分销个人中心</view>
<!--	<cemList></cemList>-->
<!--	<search :isCenter='1' :isLeft="0"></search>-->
<!--	<web-view src="https://mp.weixin.qq.com/">65165</web-view>-->
<!--      <view @tap="yoo">的姑获鸟发达国家吹风机</view>-->
	<!--<view><prolists  :productTitle="9" :model="2"></prolists></view>-->
<!--<view><prolists2 :productTitle="1" :model="1"></prolists2></view>-->
<!--<slider></slider>-->
<!--<classification></classification>-->
	 <!-- <percenterhead :isdeleted='isdeleted'></percenterhead>
	<percenterlist :arr_hidden='arr'></percenterlist>	 -->
<!--<makecall></makecall>-->
	<!-- <setmap></setmap> -->
     <!--<groupBooking></groupBooking>-->
<!--<webview></webview>-->
<!--	 <vd1></vd1>-->
	<!-- <forms :form="formData"></forms> -->
	<!--<bespeak :tshow="tshow2"></bespeak>-->
	<!-- <fSearch></fSearch> -->
<!-- <newprolists :model="1" :ewidth='110' :eheight='174' :fontSizeName='12' :colorName='red' :fontWeightName="100"></newprolists> -->
      <!-- <prolistsside  :fontSizeName='20' :colorName='red' :fontWeightName="100"></prolistsside> -->
	  <distributionDealer></distributionDealer>
    <!--<storeinfo></storeinfo>
	 <builderinfo></builderinfo>    
	<goodsedit :layout="layout" :fontSizeName="14"></goodsedit>-->
    <!--<posted></posted> -->
	<!-- <community></community> -->
<!--	<specialslider :value="60"></specialslider>-->
<!--<liveList :mode="1"></liveList>-->

<!--<livePromp></livePromp>
	<nav1 :hidden="true"></nav1>-->
    <!-- <nav2 :hidden="true"></nav2> -->
<!--     <picture1 :currentSrc="currentSrc"></picture1>  -->
<!--    <car :hidden="true"></car>-->
<!--<distributionNew></distributionNew>-->
<!--<distributionShop></distributionShop>-->
<distributionList></distributionList>
<!-- <distributionListSide></distributionListSide> -->
<!--<kefu></kefu>-->
<!--<slider></slider>-->
</view>
</template>


<script>
//	import cemList from "../../components/cemList/cemList"		
	//import search from "../../components/search/search"	
//		import slider from "../../components/slider/slider"	
//	import liveList from "../../components/liveList/liveList"	
	// import fSearch from "../../components/fSearch/fSearch"				
//	import slider from "../../components/slider/slider"	
//	import picture from "../../components/picture/picture"	
//	import kefu from "../../components/kefu/kefu"	
//	import livePromp from "../../components/livePromp/livePromp"
//import distributionNew from "../../components/distributionNew/distributionNew"	
import distributionList from "../../components/distributionList/distributionList"
// import distributionListSide from "../../components/distributionListSide/distributionListSide"
//import distributionShop from "../../components/distributionShop/distributionShop"

//import webview from "../../components/webview/webview"		
//import groupBooking from "../../components/groupBooking/groupBooking"		
//import forms from "../../components/forms/forms"	
//	  import specialslider from "../../components/specialSlider/specialSlider"
 //import makecall from "../../components/makeCall/makeCall"
 //import video from "../../components/video/video"
//import nav from "../../components/nav/nav"
//
// import newprolists from "../../components/newProlists/newProlists"
// import posted from "../../components/posted/posted"
// import community from "../../components/community/community"
//   import picture from "../../components/picture/picture"		
//import bespeak from "../../components/bespeak/bespeak"	
//  import prolistsside from "../../components/prolistsSide/prolistsSide"	
 import distributionDealer from "../../components/distributionDealer/distributionDealer"	
// import percenterhead from "../../components/perCenterHead/perCenterHead"
// import percenterlist from "../../components/perCenterList/perCenterList"		
//import classification from "../../components/classification/classification"
//  import goodsedit from "../../components/goodsedit/goodsedit"
//import builderinfo from "../../components/builderinfo/builderinfo"		
// import storeinfo from "../../components/StoreInfo/StoreInfo"	
//import car from "../../components/car/car"
export default {
    config: {
        navigationBarTitleText: '商品列表'
    },
    components:{
//    	cemList:cemList,
    //	search:search,
  //  	slider:slider
    // fSearch:fSearch,
 //    	liveList:liveList,
   // 	slider:slider,
  //	kefu:kefu,
     //	livePromp:livePromp,
//  	//distributionNew:distributionNew,
	distributionList:distributionList,
   	// distributionListSide:distributionListSide,
//	distributionShop:distributionShop,
//    	webview:webview
  // groupBooking:groupBooking,
   //   makecall:makecall,
  //	specialslider:specialslider,
   //        vd1:video,     
    //    nav1:nav,
        //slider:slider,
//      posted:posted,
		//    community:community,
     	// picture1:picture,
// 	   bespeak:bespeak,
////forms:forms,
// newprolists:newprolists,
// prolistsside:prolistsside,
distributionDealer:distributionDealer
//   percenterhead:percenterhead,
 //  percenterlist:percenterlist
 // classification:classification
//  	   goodsedit:goodsedit,
//    	  builderinfo:builderinfo,
//  		  storeinfo:storeinfo
  		//car: car
    },
    data () {
      return {  
      	isCenter:1,
      	inputColor:"#000000",
      	m:"0",
      	n:"1",
        tshow3:{
				cId:"944021938446008320",
				//iconSize:40,
				initial:"945933941238398976",
				show:1,
                tabIds:[
                		{
                		cId:"944021938446008320",
                		name:"女装",
                		kindList:[]
                		},
                		{
                		cId:"945933941238398976",
                		name:"女gfgggg装",
                		kindList:[]
                		},
                  ]
        },      	
		 /*tshow: {
		 	cId: 7,
		 	show:1,
		 	tabIds: [
		 		{
		 			id: 7,
		 			name: "发"
		 		}
		 	]
		 },*/
//         currentSrc: 'https://image.vdongchina.com/M00/00/5F/ZSUkmVmKgJ6EeffoAAAAACgIqHc015.png',
//               model:{
//               type:1,
//               width:200,
//               height: 105
//               },
	 layout:{
          type:4,
          height: 100,
          width: 215

    },
    formData: {
        	sort: 1,
        	id: 6
        }
      }
    },


  onLoad(e){  
    var that = this
		if(e.pid){
			that.$root.globalData.pid = e.pid		
		} 
	this.$root.globalData.color = this.color	
		
  },
      methods: {
      	liveList(){
            wx.navigateTo({
                url: '../f_productlist/f_productlist'
            })      		
      	},
        personalNew() {
            wx.navigateTo({
                url: '../f_personal/f_personal'
            })
        },            
//      my(){
//          wx.navigateTo({
//              url: '../communityIndex/communityIndex'
//          })        	
//      }

      }
}
</script>
<style>
.test{font-size: 80rpx;line-height: 100rpx}
.g{position: relative;border-radius: 50%;}
</style>