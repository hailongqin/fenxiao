<template>
	<view class="box">
		<view class="detailsTop" wx:if="{{!choose}}" style="{{'background-color:'+color}}">
			<image wx:if="{{prevue.anchorUrl}}" src="{{prevue.anchorUrl}}" class="head"></image>
			<view wx:if="{{!prevue.anchorUrl}}" class="head">暂无</view>
			<view class="detailsName">
				<view class="name">{{prevue.anchorName}}</view>
				<view class="number">在线{{baseFictit}}</view>
			</view>
			<view class="more" @tap="back" wx:if="{{index != 2}}">更多直播</view>
			<button open-type="contact" class="service">
				<image class="image" src="http://image.vdongchina.com/M00/06/47/ZSUkmVobwK2EXwZ9AAAAAMfH1Dg573.png"></image>
				<text class="text">客服</text>
			</button>
			<view class="index" @tap="backIndex" wx:if="{{index != 2}}">
				<image class="image" src="http://image.vdongchina.com/M00/06/47/ZSUkmVobwI-EHk8RAAAAAPeu1z8823.png"></image>
				<text class="text">首页</text>
			</view>
		</view>
        <view class="flex" style="{{'height:'+scrollHeight+'px;'}}">
        	<!-- <view style="height:100%;width:100%;"> -->
        		<!-- 直播样式一 -->
				<view class="liveBox" wx:if="{{mode == 1}}">
					<!-- 商品列表 -->
					<scroll-view class="scrollView" scroll-top="0" scroll-y style="{{'background-color:'+color+';height:'+scrollHeight+'px;'}}">
						<!-- 团购商品 -->
						<view class="group" wx:if="{{groupList.length}}">
							<view class="groupIndex" wx:if="{{!Open}}" @tap="open">
								<image class="img" src="{{groupList[0].titlePic}}"></image>
								<text class="groupIng">团购中...</text>
								<view class="groupPrompt">
									<image class="image" src="http://image.vdongchina.com/M00/08/5C/ZSUkmVo9_cmEENb7AAAAAJNa1Tw528.png"></image>点击查看
								</view>
							</view>
							<view class="groupOpen" wx:if="{{Open}}">
								<view class="groupTop" @tap="retract">
									<view class="groupTitle">
										<image src="{{groupList[0].titlePic}}" class="image"></image>
										<image src="http://image.vdongchina.com/M00/08/5C/ZSUkmVo9_fOEBXcCAAAAANL92yk699.png" class="groupImg"></image>
										<text class="text">宝贝：共{{groupList.length}}款</text>
										<view class="Mask"></view>
									</view>
									<image src="http://image.vdongchina.com/M00/08/5C/ZSUkmVo9_iqESd7CAAAAAIlYlcM584.png" class="img"></image>
								</view>
								<view class="groupList">
									<view class="groupBox" wx:for="{{groupList}}" wx:key="index" @tap="choosePt(item.id)">
										<image src="{{item.titlePic}}" class="image"></image>
										<view class="groupPrice">团购价<text class="text">¥{{item.groupPrice}}</text></view>
									</view>
									<view class="stop" @tap="retract">收起</view>
								</view>
							</view>
						</view>
							
						<!-- 直播商品 -->
						<view class="{{item.isRecommend == 1 ?'current':'scrollBox'}}" wx:for="{{shopList}}" wx:key='index' @tap="chooseShop(item.uuid,item.number)" wx:if="{{item.isShow == 1}}" style="">
							<view class="imgage">
								<image class="image" src="{{item.cover}}"></image>
								<text class="recommend" wx:if="{{item.isRecommend == 1}}">正在推荐</text>
								<text class="sequence">{{item.number}}</text>
								<text class="price">¥{{item.salePrice}}</text>
							</view>
						</view>
					</scroll-view>
					<view class="myVideo" wx:if="{{prevue.liveState == 2}}">
						<video class="video" src="{{prevue.pullUrl}}" controls="{{controls}}" objectFit="cover" autoplay></video>
					</view>
					<view class="myVideo" wx:if="{{prevue.liveState == 3 && prevue.recordState == 2}}">
						<video class="video" src="{{prevue.videoUrl}}" controls="{{controls}}" objectFit="cover" autoplay></video>
					</view>
					<view class="noLive" wx:if="{{prevue.liveState == 1}}">
						<image class="noLiveimg" src="http://image.vdongchina.com/M00/06/47/ZSUkmVobwjqEfClBAAAAAJK5kCk049.png"></image>
						<text class="text">主播大人正在准备下一场精彩直播敬请期待！</text>
					</view>
					<view class="noLive" wx:if="{{prevue.liveState == 4}}">
						<image class="noLiveimg" src="http://image.vdongchina.com/M00/06/47/ZSUkmVobwjqEfClBAAAAAJK5kCk049.png"></image>
						<text class="text">直播已结束，请移步别的直播间！</text>
					</view>

				</view>
				<!-- 直播样式二 -->
				<view class="liveBox_B" style="" wx:if="{{mode == 2}}">
					<video class="B_video"  wx:if="{{prevue.liveState == 2}}" src="{{prevue.pullUrl}}" controls="{{controls}}" objectFit="cover" autoplay></video>
					<video class="B_video"  wx:if="{{prevue.liveState == 3 && prevue.recordState == 2}}" src="{{prevue.videoUrl}}" controls="{{controls}}" objectFit="cover" autoplay></video>
					<view class="B_noLive" wx:if="{{prevue.liveState == 1}}">
						<image class="B_noLiveimg" src="http://image.vdongchina.com/M00/06/47/ZSUkmVobwjqEfClBAAAAAJK5kCk049.png"></image>
						<text class="B_text">主播大人正在准备下一场精彩直播敬请期待！</text>
					</view>
					<view class="B_noLive" style="background:rgba(0,0,0,1);" wx:if="{{prevue.liveState == 3&&prevue.recordState == 1}}">
						<image class="B_noLiveimg" style="margin-left: -100rpx;top:46rpx" src="http://image.vdongchina.com/M00/06/47/ZSUkmVobwjqEfClBAAAAAJK5kCk049.png"></image>
						<text class="B_text" style="top:280rpx">直播已结束，请移步别的直播间！</text>
					</view>
					<!-- 商品列表 -->
					<scroll-view class="B_scrollView" scroll-x scroll-left="0" style="{{'background-color:'+color + ';width:'+scrollWidth+'px'}}">
						<!-- 团购商品 -->
						<view class="B_group" wx:if="{{groupList.length}}">
							<view class="B_groupIndex" wx:if="{{!Open}}" @tap="open">
								<image class="img" src="{{groupList[0].titlePic}}"></image>
								<text class="groupIng">团购中...</text>
								<view class="groupPrompt">
									<image class="image" src="http://image.vdongchina.com/M00/08/5C/ZSUkmVo9_cmEENb7AAAAAJNa1Tw528.png"></image>点击查看
								</view>
							</view>
							<view class="B_groupOpen" wx:if="{{Open}}">
								<view class="B_groupTop" @tap="retract">
									<view class="B_groupTitle">
										<image src="{{groupList[0].titlePic}}" class="image"></image>
										<image src="http://image.vdongchina.com/M00/08/5C/ZSUkmVo9_fOEBXcCAAAAANL92yk699.png" class="groupImg"></image>
										<text class="text">宝贝：共{{groupList.length}}款</text>
										<view class="Mask"></view>
									</view>
								</view>
								<view class="B_groupList">
									<view class="B_groupBox" wx:for="{{groupList}}" wx:key="index" @tap="choosePt(item.id)">
										<image src="{{item.titlePic}}" class="image"></image>
										<view class="B_groupPrice">团购价<text class="text">¥{{item.groupPrice}}</text></view>
									</view>
									<view class="B_stop" @tap="retract">收起</view>
								</view>
							</view>
						</view>
						<!-- 直播商品 -->
						<view class="{{item.isRecommend == 1 ?'B_current':'B_scrollBox'}}" wx:for="{{shopList}}" wx:key='index' @tap="chooseShop(item.uuid,item.number)" wx:if="{{item.isShow == 1}}" style="">
							<view class="B_imgage">
								<image class="image" src="{{item.cover}}"></image>
								<text class="recommend" wx:if="{{item.isRecommend == 1}}">正在推荐</text>
								<text class="sequence">{{item.number}}</text>
								<text class="price">¥{{item.salePrice}}</text>
							</view>
						</view>
					</scroll-view>
				</view>
        	<!-- </view> -->
        </view>
        <view class="boxo" wx:if="{{!choose}}" style="{{mode == 1?'height:'+chatHeight+'px':'height:'+chatHeight+'px'}}">
        	<!-- 聊天区域 -->
			<scroll-view scroll-y scroll-top="{{Tobottom}}" class="chat" style="{{'height:100%;'+rgbS}}" bindscroll="bindscroll" bindscrolltolower="scrolltolower">
				<text class="chatNotice">系统消息：网络警察24小时巡查，直播如有色情低俗、违法违纪、聚集闹事、涉政及抽烟喝酒等内容，永久封号并报警！</text>
				<!-- 普通聊天 -->
				<block wx:for="{{chatList}}" wx:key="index">
					<view class="chatRecord" wx:if="{{item.type == 'qun'}}">
						<text class="chatName">{{item.userName}}</text><image class="image" wx:if="{{item.purchase}}" src="http://image.vdongchina.com/M00/06/4A/ZSUkmVobylKEHlpyAAAAAIvxoXU603.png"></image>{{item.message}}
					</view>
					<view class="Record" wx:if="{{item.type == 'cart'}}">
						<view class="fans">
							<text class="text">{{item.userName}}</text>  已经偷偷加了购物车了
						</view>
					</view>
					<view class="Record" wx:if="{{item.type == 'buy'}}">
						<view class="fans">
							<text class="text">{{item.userName}}</text>  已剁手
						</view>
					</view>
					<view class="Record" wx:if="{{item.type == 'in'}}">
						<view class="fans">
							<text class="text">{{item.userName}}</text>  进入直播间
						</view>
					</view>
				</block>
			</scroll-view>
			<image wx:if="{{show}}" class="btn" src="http://image.vdongchina.com/M00/06/47/ZSUkmVobwEuEEYFUAAAAACTj6D8462.png" @tap="bindInput"></image>
			<image wx:if="{{!show}}" class="nobtn" src="http://image.vdongchina.com/M00/06/47/ZSUkmVobv8-ETc-CAAAAAIjb9-M020.png" @tap="bindhidden"></image>
			
			<view class="chatInput" wx:if="{{!show}}">
				<input class="input" auto-focus="{{!show}}" confirm-type="send" @confirm="send" @input="input" value="{{inputValue}}" />
				<text class="text" @tap="send" style="{{rgbS}}">发送</text>
			</view>
        </view>

        <view class="choose" wx:if="{{choose}}" style="{{mode == 1?'height:706rpx;':'height:calc(100% - 620rpx)'}}">
        	<!-- 关闭弹出层 -->
			<image class="back" src="http://image.vdongchina.com/M00/06/47/ZSUkmVobwGyEQV9tAAAAAKmDZHo874.png" @tap="close"></image>
			<!-- 选择规格 -->
			<scroll-view scroll-y class="chooseSpec" wx:if="{{chooseSpec}}">
				<view class="shopDetail">
					<image class="shopImg" src="{{shopDetail.cover}}" @tap="goDetails"></image>
					<view class="shopNumber">{{shopNumber}}</view>
					<view class="detailR">
						<view class="shopName">{{shopDetail.name}}</view>
						<view class="shopPrice">¥{{salePrice}}</view>
						<view class="stock">库存{{stock}}件</view>
						<view class="choosed">已选：{{choosesku}}</view>
					</view>
				</view>
				<view class="skus">
						<view class="skusName">规格选择</view>
						<view class="skusDetail" wx:key="index">
							<view wx:for="{{skus}}" wx:key="index" class="{{item.id == chooseskuId ? 'on':'text'}}" @tap="itemValue(item.id)">{{item.skuSpec}}</view>
						</view>
				</view>
				<view class="buyNum">
					<view class="title">购买数量</view>
					<view class="stepper">
	                    <text class="{{minusStatus + ' stepper-text'}}" @tap="GbindMinus">-</text>
	                    <text class="stepper-input">{{num}}</text>
	                    <text class="normal stepper-text" @tap="GbindPlus">+</text>
	                </view>
				</view>
			</scroll-view>
			<view class="bottom" wx:if="{{chooseSpec}}">
					<view class="shopCart" @tap="goshopCart">
						<image class="image" src="http://image.vdongchina.com/M00/06/47/ZSUkmVobwmuEXDD9AAAAAA-Dpwo265.png"></image>
						<text class="text">{{shopCartnum}}</text>
					</view>
					<view class="addCart" @tap="addCart">加入购物车</view>
					<view class="buy" @tap="onBuy">立即购买</view>
			</view>
			<!-- 我的购物车 -->
			<view class="myCartbox" wx:if="{{myCartbox}}">
				<view class="title">我的购物车</view>
				<!-- 购物车结算按钮 -->
				<view class="myCartbuttom" wx:if="{{myCart}}">
					<view class="myCartbuttom_left">
						<view class="btnAll" @tap="chooseAll">
							<view class="{{chooseAll?'iconCurrent':'icon'}}">
								<text class="text"></text>
							</view>
							<view class="btnAllnum">全选 ({{allNum}})</view>
						</view>
						<view class="total">
							<view class="totalPrice">¥{{totalPrice}}</view>
							<view class="totalSave">优惠：¥{{discount}}</view>
						</view>
					</view>
					<view class="myCartbuttom_right" @tap="settlement">结算</view>
				</view>
				<!-- 购物车商品列表 -->
				<scroll-view scroll-y class="myCart" wx:if="{{shopCartnum > 0}}">
					<view class="shopList">
						<view class="listOne" wx:for="{{cartList}}" wx:key="index" @tap="chooseOne(item.id)">
							<view class="{{item.choose ?'iconCurrent':'icon'}}">
								<text class="text"></text>
							</view>
							<image class="image" src="{{item.productSku.product.cover}}"></image>
							<view class="listDetails">
								<view class="details">
									<view class="detailsName">{{item.productName}}</view>
									<view class="detailsPrice">
										<view class="priceNews">¥{{item.productSku.salePrice}}</view>
										<view class="priceOld">¥{{item.productSku.marketPrice}}</view>
									</view>
								</view>
								<view class="shopSku">{{item.productSkuSpec}}</view>
								<view class="operate">
									<view class="operateNum">
										<view class="step">
						                    <text class="{{item.num == 1?'disabled stepper-text':'normal stepper-text'}}" @tap.stop="bindMinus(item.productSkuId)">-</text>
						                    <text class="stepper-input">{{item.num}}</text>
						                    <text class="normal stepper-text" @tap.stop="bindPlus(item.productSkuId)">+</text>
						                </view>
									</view>
									<image class="image" src="http://image.vdongchina.com/M00/06/47/ZSUkmVobwoOEaZOtAAAAAK4eIlA248.png" @tap.stop="deleteOne(item.productSkuId)"></image>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
				<view calss="noCartlist" wx:if="{{shopCartnum == 0}}">
					<image src="http://image.vdongchina.com/M00/06/47/ZSUkmVobwpiEAsV1AAAAAPnoiEc834.png" class="noCart"></image>
					<view class="noCartText">购物车是空哒~快去买买买</view>
				</view>
			</view>
			<!-- 快捷下单 -->
			<view class="payBox" wx:if="{{payBox}}">
				<view class="title">快捷下单</view>
				<view class="buyBtn" @tap="payment">立即支付 ¥{{totalPrice}}</view>
				<scroll-view scroll-y class="payNews">
					<view class="noAddress" wx:if="{{noaddress}}" @tap="getAddress">
						<image src="http://image.vdongchina.com/M00/06/47/ZSUkmVobwraEG_kCAAAAAFM41v4620.png" class="addressImg"></image>您的收货地址为空，点此添加收货地址
						<image src="http://image.vdongchina.com/M00/06/47/ZSUkmVobwtmEXAITAAAAAN23LEM338.png" class="noAddressR"></image>
						<image class="addresssLine" src="http://image.vdongchina.com/M00/06/47/ZSUkmVobwvWEF_gfAAAAAPJuMwM800.png"></image>
					</view>
					<view class="addresss" wx:if="{{!noaddress}}" @tap="getAddress">
						<image src="http://image.vdongchina.com/M00/06/47/ZSUkmVobwraEG_kCAAAAAFM41v4620.png" class="addressImg"></image>
						<view class="infotext">
							<view class="userInfor">收货人：{{userName}} {{telNumber}}</view>
							<view class="addressInfor">收货地址：{{address}}</view>
						</view>
						<image src="http://image.vdongchina.com/M00/06/47/ZSUkmVobwtmEXAITAAAAAN23LEM338.png" class="addressright"></image>
						<image class="addresssLine" src="http://image.vdongchina.com/M00/06/47/ZSUkmVobwvWEF_gfAAAAAPJuMwM800.png"></image>
					</view>
					<!-- 需要支付的商品列表 -->
					<view class="payList">
						<view class="payShop" wx:for="{{products}}" wx:key="index">
							<image class="payL" src="{{item.imgUrl}}"></image>
							<view class="payR">
								<view class="payDetail">
									<view class="payshopName">{{item.productName}}</view>
									<view class="payshopPrice">¥{{item.price}}</view>
								</view>
								<view class="paySku">
									<view class="paySize">{{item.skuName}}</view>
									<view class="payNum">x{{item.num}}</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
        </view>
    </view>
	
</view>
</template>

<script>
var wslib = require('../../utils/websocket-xcx.js');
export default {
	config: {
	    navigationBarTitleText: '直播间',
	    navigationBarTextStyle: 'white',
	    navigationBarBackgroundColor: '#E068A4',
	    backgroundColor: "#ffffff",
	},
	data () {
        return {
        	mode:1,//直播页面样式
        	num:1,//购物车购买数量
        	shopNumber:0,//商品编号
        	index:0,//0从列表直播列表页面进入;
        	prevueId:0,//直播房间号
        	fictit:0,
        	base:0,
        	baseFictit:0,//虚拟人数
        	purchase:false,//是够在这个直播间购买过商品
        	minusStatus: 'disabled',
        	liveUserid:'',//直播用户登陆ID
            windowHeight:100,
            Tobottom:0,
            chatHeight:0,
            scrollHeight:0,
            scrollWidth:375,
            scrollTop:1000,
            controls:false,
            Live:true,
            show:true,
            choose:false,//下方弹出层是否显示
            chooseSpec:true,//商品详情弹出层
            myCartbox:false,//我的购物车弹出层
            payBox:false,//快捷下单弹出层
            chooseAll:false,//购物车全选
            myCart:true,//购物车
            noaddress:true,//是否有地址
            onButtom:true,//聊天区域是够在底部
            Open:false,//团购列表展开
            blackUser:false,//是否禁言
            userName:'',//姓名
            telNumber:'',//电话
            address:'',//地址
            current:1,
            allNum:0,//选中商品数量
            chooseShopId:0,//选中商品ID
            prevue:{},
            inputValue:'',
            chatList:[],//聊天信息
            shopList:[],//直播间商品列表
            shopDetail:{},//商品详情
            salePrice:0,//商品售价
            stock:0,//库存
            skus: [],
            choosesku:'',//选中sku
            chooseskuId:0,//选中skuid
            shopCartnum:0,//购物车商品数量
            addressId:0,//用户地址ID
            totalPrice:'0.00',//订单总价
            discount:'0.00',//订单优惠
            products:[],//购物车选中商品数组
            sourceInfo:'',//来源消息
            ifBuy:false,
            rgbS:'background-color:rgb(188,56,123)',
            videoUrl:'',//默认视频链接
            color:'',
            product: {
            	productName: '',
                productId: '',
                status:1,
                price: 0,
                stockNum: 0,
                skuName: '',
                skuId:0,
                num: 0,
                imgUrl: ''
            },
            payList:[],//支付商品列表
            cartList:[],//购物车列表
            groupList:[]//拼团商品列表
        }
    },
    async onLoad (options) {
    	var that = this;
    	var liveUserid = getApp().globalData.liveUserid;
    	if(!liveUserid){
	    	await that.$root.login()
	    	await that.$root.liveLogin()
	    	liveUserid = getApp().globalData.liveUserid;
	    }
    	var prevueId;
    	var index = options.index;
    	if(options.scene){
    		prevueId = options.scene;
    		index = 2;
    	}else{
    		prevueId = options.prevueId;
    	}
    	var nickName = getApp().globalData.userInfo.nickName;
    	that.nickName =  nickName;
    	that.index = index;
    	if(prevueId && liveUserid){
    		wslib.websocket({
	    		url:'wss://socket.vdongchina.com/socket/liveSocket?prevueId='+prevueId+'&userId='+liveUserid
	    	})
    	}
    	if(nickName && liveUserid && prevueId){
    		setTimeout(function(){
	    		var sendNews = {};
	    		// var f = nickName.substring(0,1)
	    		// var e = nickName.substring(nickName.length - 1)
	    		// sendNews.userName = f + '***'+e;
		        sendNews.userName = nickName;
		        sendNews.userId = liveUserid;
		        sendNews.message = '进场了';
		        sendNews.prevueId = prevueId;
		        sendNews.type = 'in';
		        // sendNews.isSay = ''
		        wslib.sendMessage(sendNews);
	    	},1000)
    	}
    	this.prevueId = prevueId;
    	this.liveUserid = liveUserid;
    	wx.request({
    		url:that.$root.apiServer+that.$root.appid+'/basic/live/app/index/getConfig',
    		method: 'GET',
            header: {'content-type': 'application/json'},
            success: function (res) {
            	if(res.data.success){
            		that.mode = res.data.data.liveStyle;
            		if(res.data.data.liveStyle == 1){
			    		wx.getSystemInfo({
				        	success: function(res) {
				        		that.windowHeight = res.windowHeight;
				        		var chatHeight = (res.windowHeight * (750 / res.screenWidth) - 840) / (750 / res.screenWidth);
				        		that.chatHeight = chatHeight;
				        		var scrollHeight = res.windowHeight - chatHeight - (80 * ( res.screenWidth / 750 ));
				        		that.scrollHeight = scrollHeight;
				        	}
				        })
			    	}else{
			    		wx.getSystemInfo({
				        	success: function(res) {
				        		that.chatHeight = (res.windowHeight * (750 / res.screenWidth) - 700) / (750 / res.screenWidth);
				        		that.scrollWidth = res.windowWidth
				        	}
				        })
			    	}
			    	that.videoUrl = res.data.data.videoUrl;
            		var sColor = res.data.data.liveColor;
            		var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/; 
            		if(reg.test(sColor)){
            			that.color = sColor;
	            		wx.setNavigationBarColor({
	            			frontColor: '#ffffff',
	            			backgroundColor:sColor
	            		})
	            		that.sHex(sColor)
            		}
            	}
            }
    	})
    	wx.request({
    		url:that.$root.apiServer+that.$root.appid+'/basic/live/app/prevue/detailWithProduct',
    		data: {prevueId: prevueId},
    		method: 'GET',
            header: {'content-type': 'application/json'},
            success: function (res) {
            	if(res.data.success){
	            	var prevue = res.data.data.prevue;//主播信息
	            	var productList = res.data.data.productList;//直播商品列表
	            	if(prevue.anchorUrl){
	            		prevue.anchorUrl = getApp().globalData.imgUrl + prevue.anchorUrl;
	            	}
	            	if(prevue.userNum > 9999){
	            		prevue.userNum = (prevue.userNum / 10000).toFixed(2) +'W'
	            	}
	            	if(!prevue.anchorName){
	            		prevue.anchorName = '无名氏'
	            	}
	            	that.prevue = prevue;
	            	if(productList.length > 0){
	            		that.productList = productList;
		            	var uuid = [];
		            	for(let i in productList){
		            		if(productList[i].projectProductId){
		            			uuid.push(productList[i].projectProductId)
		            		}
		            	}
		            	var uuids = uuid.join(",");
		            	that.getshopList(uuids)
	            	}else{
	            		wx.showToast({
						  	title: '暂无商品',
						  	icon: 'loading',
						  	duration: 2000
						})
	            	}
            	}else{
            		wx.showToast({
						title: '数据异常',
						icon: 'loading',
						duration: 2000
					})
            	}
            }
    	})
    	that.ptList(prevueId)//拼团数据接口
    	that.liveblack(prevueId,liveUserid)//登陆判断用户是否是黑名单
    	var liveStorage = wx.getStorageSync('live')//缓存购买的直播间id
    	if(liveStorage.length){
    		for(let i in liveStorage){
	    		if(liveStorage[i].prevueId == that.prevueId){
		    		that.purchase = true;
		    	}
	    	}
    	}else{
    		var liveStorage =[]
    		wx.setStorageSync('live', liveStorage)
    	}
    },
    onShow:function(){
    	var that = this;
    	var nickName = this.nickName;
    	var liveUserid = this.liveUserid;
    	var prevueId = this.prevueId;
    	var baseFictit = 0 ;//虚拟人数
    	if(wx.getStorageSync(prevueId)){
    		baseFictit = wx.getStorageSync(prevueId)
    	}
    	wslib.onMessage(function (res) {
    		var json = JSON.parse(res.data);
    		console.log('收到',json)
    		var chatList = that.chatList;
    		var onButtom = that.onButtom;
    		if(json.type == 'qun' || json.type == 'cart' || json.type == 'in'){//聊天信息或者加入购物车信息
    			if(!baseFictit){
    				if(json.onLine<50){
		    			baseFictit = Math.ceil(json.onLine*39.3)
		    		}else if(json.onLine<100){
		    			baseFictit = Math.ceil(json.onLine*66.7)
		    		}else if(json.onLine<500){
		    			baseFictit = Math.ceil(json.onLine*93.4)
		    		}else{
		    			baseFictit = Math.ceil(json.onLine*121.9)
		    		}
    			}
    			if(json.type == 'in'){
    				baseFictit ++
    			}
    			if(baseFictit > 9999){
	    			baseFictit = (baseFictit / 10000).toFixed(2) +'W'
	    		}
    			that.baseFictit = baseFictit
    			if(chatList.length > 30){
    				chatList.shift();
    				chatList.push(json)
    			}else{
    				chatList.push(json)
    			}
	    		that.chatList = chatList;
	    		if(onButtom){
	    			setTimeout(function () {
	                  	that.setData({
	                    	Tobottom: 100000
	                  	})
	                }, 200)
	    		}
	    	}else if(json.type == 'add' || json.type == 'show' || json.type == 'hidden' || json.type == 'recommend'){//商品有更新
	    			that.updataShop(json.prevueId)
	    	}else if(json.type == 'buy'){//购买
	    		chatList.push(json)
	    		var purchase = that.purchase;
	    		if(json.userId == liveUserid){//是自己购买
	    			if(!purchase){
	    				var liveStorage = wx.getStorageSync('live')
	    				if(liveStorage.length){
	    					var judge = null
	    					for(let i in liveStorage){
	    						if(liveStorage[i].prevueId == json.prevueId){
	    							judge = true
	    						}
	    						if(!judge){
	    							var storage = {};
						    		storage.prevueId = json.prevueId;
						    		liveStorage.push(storage);
						    		wx.setStorageSync('live', liveStorage)
	    						}
	    					}
	    				}else{
	    					var storage = {};
				    		storage.prevueId = json.prevueId;
				    		liveStorage.push(storage);
				    		wx.setStorageSync('live', liveStorage)
	    				}
	    				that.purchase = true;
	    			}
	    		}
	    		var live = wx.getStorageSync('live')
	    		that.chatList = chatList;
	    		if(onButtom){
	    			setTimeout(function () {
	                  	that.setData({
	                    	Tobottom: 100000
	                  	})
	                }, 200)
	    		}
	    	}else if(json.type == 'black'){
	    		var blackUser = true;
	    		that.blackUser = blackUser;
	    		wx.showModal({
					title: '提示',
					content: '你已经被主播拉入黑名单',
					showCancel:false
				})
	    	}else if(json.type == 'white'){
	    		var blackUser = false;
	    		that.blackUser = blackUser;
	    	}else if(json.type == 'phidden' || json.type == 'pshow' || json.type == 'ping'){//拼团商品数据有异动
	    		that.ptList(prevueId)//拼团数据接口
	    	}
    	})
    },
    onUnload(){
    	var baseFictit = this.baseFictit;
    	var nickName = this.nickName;
    	var userId = this.liveUserid;
    	var prevueId = this.prevueId;
    	wx.setStorageSync(prevueId, baseFictit)
    	// if(nickName && userId && prevueId){
    		var sendNews = {};
	        sendNews.userName = nickName;
	        sendNews.userId = userId;
	        sendNews.message = '退场了';
	        sendNews.prevueId = prevueId;
	        sendNews.type = 'out';
	        wslib.sendMessage(sendNews);
    	// }
    	wslib.closeSocket();
    },
    onShareAppMessage: function () {
        var that = this;
        return {
            title:  that.prevue.anchorName + '的直播间',
            path: '/pages/liveDetail/liveDetail?prevueId='+that.prevueId+'&index=2'
        }
    },
    methods: {
    	liveblack(prevueId,userId){
    		var that = this;
    		wx.request({
    			url:that.$root.apiServer+that.$root.appid+'/basic/live/admin/prevueUser/login?prevueId='+prevueId+'&userId='+userId,
	    		data: {},
	    		method: 'POST',
	            header: {'content-type': 'application/json'},
	            success: function (res) {
	            	if(res.data.success){
	            		var blackUser = res.data.data.blackUser; 
	            		if(res.data.data.blackUser == 1){
	            			that.blackUser = true;
	            			wx.showModal({
								title: '提示',
								content: '你已经被主播拉入黑名单',
								showCancel:false
							})
	            		}else{
	            			that.blackUser = false
	            		}
	            	}
	            }
    		})
    	},
    	sHex(sColor){
    		var that = this;
    		var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/; 
		    if(sColor && reg.test(sColor)){  
		        if(sColor.length === 4){  
		            var sColorNew = "#";  
		            for(var i=1; i<4; i+=1){  
		                sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));     
		            }  
		            sColor = sColorNew;  
		        }  
		        //处理六位的颜色值  
		        var sColorChange = [];  
		        for(var i=1; i<7; i+=2){  
		            sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));    
		        }  
		        for(let k in sColorChange){
		        	sColorChange[k] += 30
		        }
		        var rgbS = "background-color:rgb(" + sColorChange.join(",") + ")";
		        that.rgbS = rgbS;
		    }
    	},
    	ptList(prevueId){//获取拼团id
    		var that = this;
    		wx.request({
    			url:that.$root.apiServer+that.$root.appid+'/basic/live/app/activety/list?prevueId='+prevueId,
	    		data: {},
	    		method: 'POST',
	            header: {'content-type': 'application/json'},
	            success: function (res) {
	            	if(res.data.code == 126000){
	            		var projectProductIds = res.data.object.projectProductIds;
	            		var ids = [...new Set(projectProductIds)]
	            		if(ids.length){
	            			that.viewByIds(ids.toString())
	            		}else{
	            			that.groupList = [];
	            		}
	            	}
	            }
    		})
    	},
    	viewByIds(ids){
    		var that = this;
    		wx.request({
    			url:that.$root.apiServer+that.$root.appid+'/basic/fgroup/applet/viewByIds',
	    		data: {shopIds: ids},
	    		method: 'GET',
	            header: {'content-type': 'application/json'},
	            success: function (res) {
	            	if(res.data.success){
	            		var groupList = res.data.obj;//titlePic
	            		for(let i in groupList){
	            			groupList[i].titlePic = getApp().globalData.imgUrl + groupList[i].titlePic;
	            		}
	            		that.groupList = groupList;
	            	}
	            }
    		})
    	},
    	choosePt(id){//点击拼团商品
    		wx.navigateTo({
                url: '../t_details/t_details?id=' + id
            })
    	},
    	updataShop(prevueId){//更新商品列表
    		var that = this;
    		wx.request({
	    		url:that.$root.apiServer+that.$root.appid+'/basic/live/app/prevue/detailWithProduct',
	    		data: {prevueId: prevueId},
	    		method: 'GET',
	            header: {'content-type': 'application/json'},
	            success: function (res) {
	            	var productList = res.data.data.productList;//直播商品列表
	            	if(res.data.success){
		            	if(productList.length > 0){
		            		that.productList = productList;
			            	var uuid = [];
			            	for(let i in productList){
			            		if(productList[i].projectProductId){
			            			uuid.push(productList[i].projectProductId)
			            		}
			            	}
			            	that.uuid = uuid;
			            	var uuids = uuid.join(",");
			            	that.getshopList(uuids)
		            	}else{
		            		wx.showToast({
							  	title: '暂无商品',
							  	icon: 'loading',
							  	duration: 2000
							})
		            	}
	            	}else{
	            		wx.showToast({
							title: '数据异常',
							icon: 'loading',
							duration: 2000
						})
	            	}
	            }
	    	})
    	},
    	chooseShop(uuid,num){//点击商品列表事件,
        	var that = this;
        	that.choosesku = '';//选中sku
        	that.chooseskuId = 0;//选中skuid
        	that.num = 1;
        	that.minusStatus= 'disabled',
        	that.chooseSpec = true;
    		that.myCartbox = false;
    		that.payBox = false;
    		that.show = true;
        	var chooseShopId = that.chooseShopId;
        	if(chooseShopId == uuid){//点击同一个商品，商品详情弹出层隐藏
        		if(that.choose){
        			that.choose = false;
        			that.chooseShopId = 0;
        			if(that.mode == 1){
			    		wx.getSystemInfo({
				        	success: function(res) {
				        		that.windowHeight = res.windowHeight;
				        		var chatHeight = (res.windowHeight * (750 / res.screenWidth) - 840) / (750 / res.screenWidth);
				        		that.chatHeight = chatHeight;
				        		var scrollHeight = res.windowHeight - chatHeight - (80 * ( res.screenWidth / 750 ))
				        		that.scrollHeight = scrollHeight
				        	}
				        })
			    	}else{
			    		wx.getSystemInfo({
				        	success: function(res) {
				        		that.chatHeight = (res.windowHeight * (750 / res.screenWidth) - 700) / (750 / res.screenWidth);
				        	}
				        })
			    	}
        		}else{
        			that.choose = true;
        			that.chooseShopId = uuid;
        			if(that.mode == 1){
			    		wx.getSystemInfo({
				        	success: function(res) {
				        		var scrollHeight = res.windowHeight - (706 * ( res.screenWidth / 750 ))
				        		that.scrollHeight = scrollHeight
				        	}
				        })
			    	}else{
			    		wx.getSystemInfo({
				        	success: function(res) {
				        		that.chatHeight = (res.windowHeight * (750 / res.screenWidth) - 700) / (750 / res.screenWidth);
				        	}
				        })
			    	}
        		}
        	}else{
        		var product = that.product;
        		wx.request({
        			url:that.$root.apiServer+that.$root.appid+'/basic/api/product/uuid',
        			data: {uuid: uuid},
	    			method: 'GET',
		            header: {'content-type': 'application/json'},
		            success: function (res) {
		            	if (res.data.code == '100') {
			            	var shopDetail = res.data.data;
			            	shopDetail.cover = getApp().globalData.imgUrl + shopDetail.cover
			            	var skus = res.data.data.productSkus;
			            	product.productId = shopDetail.id;
			            	product.productName = shopDetail.name;
			            	product.status = shopDetail.status;
			            	product.imgUrl = shopDetail.cover;
			            	that.skus = skus;
			            	that.salePrice = shopDetail.salePrice;
			            	that.stock = shopDetail.stockNumSummary;
			            	that.shopDetail = shopDetail;
			            	that.product = product;
			            	that.choose = true;
			            	that.shopNumber = num;
		            	}else if(res.data.code == '500'){
		            		that.choose = false;
		            		wx.showModal({
								title: '提示',
								content: res.data.msg,
								showCancel:false
							})
		            	}else{
		            		that.choose = false;
		            		wx.showToast({
							  	title: '数据异常',
							  	icon: 'loading',
							  	duration: 2000
							})
		            	}
		            }
        		})
        		that.chooseShopId = uuid;
        		if(that.mode == 1){
			    		wx.getSystemInfo({
				        	success: function(res) {
				        		var scrollHeight = res.windowHeight - (706 * ( res.screenWidth / 750 ))
				        		that.scrollHeight = scrollHeight
				        	}
				        })
			    }else{
			    		wx.getSystemInfo({
				        	success: function(res) {
				        		that.chatHeight = (res.windowHeight * (750 / res.screenWidth) - 700) / (750 / res.screenWidth);
				        	}
				        })
			    }
        	}
        	that.shopCart();
        },
    	addCart() {//加入购物车
    		var that = this;
    		var shopDetail = that.shopDetail;
    		var skus = shopDetail.productSkus;//商品规格
    		var chooseskuId = that.chooseskuId;//选中规格
    		var num = that.num;//购买数量
    		var cartList = that.cartList;//购物车列表
    		var nickName = this.nickName;
	    	var userId = this.liveUserid;
	    	var prevueId = this.prevueId;
    		if(chooseskuId != 0){
    			if(shopDetail.status == '1'){
    				for(var k in skus){
    					if(skus[k].id == chooseskuId){
    						if(skus[k].stockNum < num){//库存判断
	    						wx.showModal({
				                    title: '提示',
				                    content: '库存不足'
				                })
	    					}else{//库存判断
	    						for(var i in cartList){
	    							var judge = false;
	    							if(cartList[i].productSkuId == chooseskuId){
	    								wx.showToast({
										  	title: '商品已在购物车',
										  	icon: 'success',
										  	duration: 2000
										})
										judge = true
										break;
	    							}else{
	    								judge = false
	    							}
	    						}
	    						if(!judge){
	    							var sourceInfo = '';
						    		var source = {};
						    		source.userId = userId;
						    		source.prevueId = prevueId;
						    		source.userName = nickName;
						    		source.type = 'buy';
						    		sourceInfo = JSON.stringify(source)
		    						wx.request({
				                        url: that.$root.apiServer+that.$root.appid+'/basic/api/cart/addProduct',
				                        data: {
				                            token: getApp().globalData.token,
				                            skuId: chooseskuId,
				                            buyNum: num,
				                            source: 100,
				                            sourceInfo:sourceInfo
				                        },
				                        method: 'POST',
				                        header: {
				                            'Content-Type': 'application/x-www-form-urlencoded'
				                        },
				                        success (res) {
				                            if (res.data.code == '100') {
						                        wx.showToast({
						                            title: '加入成功',		                            
						                        })
						                        if(nickName && userId && prevueId){
						                        	var sendNews = {};
										        	sendNews.userName = nickName;
										        	sendNews.userId = userId;
										        	sendNews.message = '已经偷偷加了购物车了';
										        	sendNews.prevueId = prevueId;
										        	sendNews.type = 'cart';
										        	wslib.sendMessage(sendNews);
						                        }
						                        that.shopCart()
				                            } else {
				                                wx.showModal({
				                                    title: '提示',
				                                    content: res.data.msg,
				                                })
				                            }
				                            that.choosesku = '';//选中sku
        									that.chooseskuId = 0;//选中skuid
				                        }
				                    })
	    						}
	    					}
    					}
    				}
	    		}else{
	    			wx.showModal({
	                    title: '提示',
	                    content: '商品已下架'
	                })
	    		}
	    	}else{
	    		wx.showModal({
	                title: '提示',
	                content: '请选择规格'
	            })
	    	}
    	},
    	onBuy() {//立即购买
    		var that = this;
    		var product = {};
    		var products = []
    		var shopDetail = that.shopDetail;
    		var chooseskuId = that.chooseskuId;
    		var skus = shopDetail.productSkus;//商品规格
    		var totalPrice = 0;
    		if(chooseskuId != 0){
    			if(shopDetail.status == '1'){
    				for(let i in skus){
    					if(skus[i].id == chooseskuId){
    						if(skus[i].stockNum < that.num){//库存判断
	    						wx.showModal({
				                    title: '提示',
				                    content: '库存不足'
				                })
	    					}else{//库存判断
	    						product.productName = shopDetail.name;
	    						product.productId = shopDetail.id;
				            	product.status = shopDetail.status;
				            	product.price = skus[i].salePrice;
				            	// product.stockNum = skus[i].stockNum;
				            	product.skuName = that.choosesku;//选中商品规格
				            	product.skuId = chooseskuId;//选中商品规格id
				            	product.imgUrl = shopDetail.cover;
	    						product.num = that.num;
	    						products.push(product);
	    						totalPrice = products[0].price * products[0].num;
					    		that.chooseSpec = false;
					    		that.myCartbox = false;
					    		that.payBox = true;//显示结算窗口
					    		that.products = products;
	    					}
    					}
    				}
    			}else{
    				wx.showModal({
	                    title: '提示',
	                    content: '商品已下架'
	                })
    			}
    		}else{
    			wx.showModal({
	                title: '提示',
	                content: '请选择规格'
	            })
    		}
    		that.totalPrice = totalPrice.toFixed(2).toString();
    	},
    	goshopCart(){//去购物车
    		var that = this;
    		this.chooseSpec = false;
    		this.myCartbox = true;
    		this.payBox = false;
    		this.shopCart();
    	},
    	shopCart(){//获取购物车信息
        	var that = this;
        	that.totalPrice='0.00',//订单总价
            that.discount='0.00',//订单优惠
            that.chooseAll=false,//购物车全选
	        wx.request({
	            url: that.$root.apiServer+that.$root.appid+'/basic/api/cart/listProduct',
	            data: {token: getApp().globalData.token,source:100},
	            method: 'POST',
	            header: {'Content-Type': 'application/x-www-form-urlencoded'},
	            success (res) {
	                if(res.data.code == '100'){
	                	var cartList = res.data.data;
	                	that.shopCartnum = cartList.length;
	                	for(let i in cartList){
	                		cartList[i].choose = false;
	                		cartList[i].productSku.product.cover = getApp().globalData.imgUrl+cartList[i].productSku.product.cover
	                	}
	                	that.cartList = cartList;
	                }else{
	                	wx.showModal({
				            title: '提示',
				            content: '购物车' + res.data.msg,
				            showCancel: false
				       	}) 
	                }
	            }
	        })
        },
    	payment(){//立即支付
    		var that = this;
    		var products = that.products;
    		var sourceInfo = '';
    		var addressId = that.addressId;
			var source = {};
			source.userId = that.liveUserid;
			source.prevueId = that.prevueId;
			source.userName = that.nickName;
			source.message = '已剁手';
			source.type = 'buy';
			for(let i in products){
				products[i].source = 100;
				products[i].sourceInfo = JSON.stringify(source);
			}
    		if(addressId != 0){
    			if(products && products.length > 0){
    				wx.request({
    					url: this.$root.apiServer + this.$root.appid + '/basic/api/ord/createOrd',
    					data: {
    						token: getApp().globalData.token,
                            products: products,
                            addressId: addressId
    					},
    					method: "POST",
                        header: {'Content-Type': 'application/json'},
                        success(res) {
                        	if(res.data.code == "500"){
				                wx.showModal({
				                    title: '提示',
				                    content: res.data.msg,
				                    showCancel: false
				                }) 
				                return false
                            }else if(res.data.code == "100"){
                            	wx.navigateTo({
	                                url: '../membershipCardPay/membershipCardPay?id=' + res.data.data.id + "&price=" + that.totalPrice+"&isType=0"
	                            })
                            }else{
                            	wx.showToast({
								  	title: '数据异常',
								  	icon: 'loading',
								  	duration: 2000
								})
                            }
                        }
    				})
    			}
    		}else{
    			wx.showModal({
				  	title: '提示',
				  	content: '地址不能为空'
				})
    		}
    	},
    	getshopList(uuids){//查询直播间商品列表
    		var that = this;
    		wx.request({
    			url:that.$root.apiServer+that.$root.appid+'/basic/api/product/uuids?uuids=' + uuids,
    			method: 'POST',
	            header: {'content-type': 'application/json'},
	            success: function (res) {
	            	var datas = res.data.data.reverse();
					var productList = that.productList;
					var shopList = [];
	            	for(let i in datas){
	            		for(let l in productList){
	            			if(datas[i].uuid == productList[l].projectProductId){
	            				var shop = {};
	            				shop.thumbUrl = datas[i].thumbUrl;
	            				shop.cover = getApp().globalData.imgUrl + datas[i].cover;
			            		shop.salePrice = datas[i].salePrice;
			            		shop.name = datas[i].name;
			            		shop.uuid = datas[i].uuid;
			            		shop.isRecommend  = productList[l].isRecommend;//推荐商品(1是 2否) ,
	            				shop.isShow = productList[l].isShow;//显示(1是 2否) ,
	            				shop.number = productList[l].number;//商品编号,
	            				shopList.push(shop)
	            			}
	            		}
	            	}
	            	shopList.sort(function(x, y){
					    return x.number > y.number ? 1:-1;
					});					
					for(let i in shopList){//把推荐放到第一个
						if(shopList[i].isRecommend == 1){
							var str = shopList.splice(i,1);
							shopList.unshift(str[0]);
						}
					}
	            	that.shopList = shopList
	            }
    		})
    	},
    	bindMinus (id) {
    		var cartList = this.cartList;
    		this.chooseskuId = id;
    		for(let i in cartList){
    			if(cartList[i].productSkuId == id){
    				if(cartList[i].num > 1){
    					// cartList[i].num --
    					this.upCart(id,cartList[i].num,false)
    				}
    			}
    		}
    		this.cartList = cartList;
        },
        GbindMinus(){
        	var num = this.num
            // 如果大于1时，才可以减
            if (num > 1) {
                num--
            }
            // 大于一件的时，normal状态，否则disable状态
            var minusStatus = num <= 1 ? 'disabled' : 'normal'
            // 数值与状态写回
            this.num = num
            this.minusStatus = minusStatus
        },
        bindPlus (id) {
        	var cartList = this.cartList;
        	this.chooseskuId = id;
    		for(let i in cartList){
    			if(cartList[i].productSkuId == id){
    				// cartList[i].num ++
    				this.num = cartList[i].num;
    				this.upCart(id,cartList[i].num,true)
    			}
    		}
    		this.cartList = cartList;
        },
        GbindPlus () {
            var num = this.num
            num++
            // 大于一件的时，normal状态，否则disable状态
            var minusStatus = num < 1 ? 'disabled' : 'normal'
            // 数值与状态写回
            this.num = num
            this.minusStatus = minusStatus
        },
        upCart(id,num,judge){
        	var that = this;
        	var cartList = this.cartList;
        	var sourceInfo = '';
			var source = {};
			source.liveUserid = this.liveUserid;
			source.prevueId = that.prevueId;
			source.userName = this.nickName;
			sourceInfo = JSON.stringify(source)
			judge ? num++ : num--
        	wx.request({
        		url: that.$root.apiServer+that.$root.appid+'/basic/api/cart/addProduct',
        		data: {
				    token: getApp().globalData.token,
				    skuId: id,
				    buyNum: num,
				    source: 100,
				    sourceInfo:sourceInfo
				},
				method: 'POST',
				header: {'Content-Type': 'application/x-www-form-urlencoded'},
				success (res) {
					if (res.data.code == '100') {
						if(judge){
							for(let i in cartList){
								if(cartList[i].id == id){
									cartList[i].num ++
								}
							}
						}else{
							for(let i in cartList){
								if(cartList[i].id == id){
									cartList[i].num --
								}
							}
						}
						that.shopCart()
				    } else {
				        wx.showModal({
				            title: '提示',
				            content: res.data.msg,
				        })
				    }
				    that.choosesku = '';//选中sku
        			that.chooseskuId = 0;//选中skuid
				}
        	})
        },
        bindInput(){
        	this.show = false
        },
        bindhidden(){
        	this.show = true
        },
        send(){//发送聊天信息
        	var that = this;
        	if(!that.blackUser){
        		var inputValue = that.inputValue.replace(/(^\s+)|(\s+$)/g, "");
	        	var nickName = that.nickName;
	        	var userId = that.liveUserid;
	        	var prevueId = that.prevueId;
	        	if(nickName && inputValue && userId && prevueId){
	        		var sendNews = {};
			        sendNews.userName = nickName;
			        sendNews.userId = userId;
			        sendNews.message = inputValue;
			        sendNews.prevueId = prevueId;
			        sendNews.purchase = that.purchase;//是否在本直播间购买过商品
			        sendNews.type = 'qun';
			        wslib.sendMessage(sendNews);
			        that.inputValue = '';
			        that.show = true;
			        that.onButtom = true;
	        	}
        	}else{
        		wx.showModal({
				  	title: '提示',
				  	content: '你已经被主播禁言',
				  	showCancel:false,
				  	success: function(res) {
				  		if (res.confirm) {
				  			that.inputValue = ''
				  			that.show = true
				  		}
				  	}
				})
        	}
        },
        input(e){
        	this.inputValue = e.detail.value;
        },
        close(){
        	var that = this
        	this.choose = false;
        	if(that.mode == 1){
			    wx.getSystemInfo({
				    success: function(res) {
				        console.log('getSystemInfo',res)
				        that.windowHeight = res.windowHeight;
				        var chatHeight = (res.windowHeight * (750 / res.screenWidth) - 840) / (750 / res.screenWidth);
				        that.chatHeight = chatHeight;
				        var scrollHeight = res.windowHeight - chatHeight - (80 * ( res.screenWidth / 750 ))
				        that.scrollHeight = scrollHeight
				        console.log('scrollHeight',scrollHeight)
				    }
				})
			}else{
			    wx.getSystemInfo({
				    success: function(res) {
				       	that.chatHeight = (res.windowHeight * (750 / res.screenWidth) - 700) / (750 / res.screenWidth);
				    }
				})
			}
        },
        itemValue(id){//选中规格
        	var shopDetail = this.shopDetail;
    		var skus = shopDetail.productSkus;//商品规格
        	var product = this.product;
        	this.chooseskuId = id;
        	for(let i in skus){
        		if(skus[i].id == id){
        			this.choosesku = skus[i].skuSpec;
        		}
        	}
        },
        closeVideo(){
        	if(this.choose){
        		this.choose = false
        	}
        },
        chooseAll(){//全选
        	var cartList = this.cartList;
        	var product = this.product;
        	if(this.chooseAll){
        		this.chooseAll = false;
        		for(let i in cartList){
        			cartList[i].choose = false
	        	}
	        	this.allNum = 0;
	        	this.totalPrice = '0.00';//订单总价
            	this.discount = '0.00';//订单优惠
        	}else{
        		this.chooseAll = true;
        		var discount = 0;
        		var totalPrice = 0;
        		for(let i in cartList){
        			cartList[i].choose = true;
        			totalPrice += cartList[i].productSku.salePrice * cartList[i].num;
        			if(cartList[i].productSku.marketPrice>cartList[i].productSku.salePrice){
        				discount += (cartList[i].productSku.marketPrice - cartList[i].productSku.salePrice)*cartList[i].num;
        			}
	        	}
        		this.allNum = cartList.length;
        		if(discount<0){
        			this.discount = '0.00'
        		}else{
        			this.discount = discount.toFixed(2).toString();
        		}
        		this.totalPrice = totalPrice.toFixed(2).toString();
        	}
        	this.cartList = cartList;
        },
        chooseOne(id){
        	var cartList = this.cartList;
        	var allNum = 0;
        	var discount = 0;
        	var totalPrice = 0;
        	for(let i in cartList){
        		if(cartList[i].id == id){
        			cartList[i].choose = !cartList[i].choose;
        		}
        		if(cartList[i].choose){
        			allNum++;
        			totalPrice += cartList[i].productSku.salePrice * cartList[i].num;
        			if(cartList[i].productSku.marketPrice>cartList[i].productSku.salePrice){
        				discount += (cartList[i].productSku.marketPrice - cartList[i].productSku.salePrice)*cartList[i].num;
        			}
        		}
        	}
        	if(allNum != cartList.length){
        		this.chooseAll = false;
        	}else{
        		this.chooseAll = true
        	}
        	this.allNum = allNum;
        	this.cartList = cartList;
        	if(discount<0){
        		this.discount = '0.00'
        	}else{
        		this.discount = discount.toFixed(2).toString();
        	}
        	this.totalPrice = totalPrice.toFixed(2).toString();
        },
        deleteOne(skuId){//删除购物车商品
        	var that = this;
        	wx.showModal({
			  	title: '提示',
			  	content: '确定删除该商品',
			  	success: function(res) {
			    	if (res.confirm) {
			    		wx.request({
			    			url: that.$root.apiServer+that.$root.appid+'/basic/api/cart/deleteProduct',
			    			data: {
					    		skuId : skuId,
					    		token : getApp().globalData.token
					    	},
					    	method: 'POST',
					    	header: {'Content-Type': 'application/x-www-form-urlencoded'},
					    	success (res) {
					    		if(res.data.code == 100){
					    			wx.showToast({
									  	title: '删除成功',
									  	icon: 'success',
									  	duration: 2000
									})
									that.shopCart()
									// that.chooseOne()
					    		}else{
					    			wx.showToast({
									  	title: '删除失败',
									  	icon: 'loading',
									  	duration: 2000
									})
					    		}
		                    }
			    		})
			    	}
			  	}
			})
        },
        settlement(){//购物车结算
        	var products = [];
        	var cartList = this.cartList;
        	for(let i in cartList){
        		var product = {};
        		if(cartList[i].choose){
        			product.productName = cartList[i].productName;
	        		product.productId = cartList[i].productId;
	        		product.status = cartList[i].productSku.product.status;
	        		product.price = cartList[i].productSku.salePrice;
	        		product.skuName = cartList[i].productSkuSpec;
	        		product.skuId = cartList[i].productSkuId;
	        		product.num = cartList[i].num;
	        		product.imgUrl = getApp().globalData.imgUrl+cartList[i].productSku.product.cover;
	        		products.push(product)
        		}
        	}
        	if(products.length == 0){
        		wx.showModal({
				  	title: '提示',
				  	content: '您没有选中需要结算的商品'
				})
        	}else{
        		this.products = products;
        		this.chooseSpec=false;//商品详情弹出层
	            this.myCartbox=false;//我的购物车弹出层
	            this.payBox=true//快捷下单弹出层
        	}
        },
        getAddress(){//获取地址
        	var that = this;
        	if (wx.chooseAddress) {
        		wx.chooseAddress({
					success: function (res) {
						that.userName = res.userName;
						that.telNumber = res.telNumber;
						that.address = res.provinceName + res.cityName + res.countyName + res.detailInfo;
						that.noaddress = false;
						wx.request({
							url: that.$root.apiServer+that.$root.appid+'/basic/api/user/addAddress',
							data: {
                                    token: getApp().globalData.token,
                                    phone: res.telNumber,
                                    name: res.userName,
                                    province: res.provinceName,
                                    city: res.cityName,
                                    district: res.countyName,
                                    street: res.detailInfo,
                                    zipCode: res.postalCode,
                            },
                            method: 'POST',
                            header: {'Content-Type': 'application/json'},
                            success (res) {
                            	if (res.data.code == '100') {
                            		that.addressId = res.data.data.id
                            	}else{
                            		wx.showToast({
			                            title: '系统错误',
			                            icon: 'loading',
			                            duration: 2000
			                        })
                            	}
                            }
						})
					}
				})
        	}else{
                wx.showModal({
                    title: '提示',
                    content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
                })
        	}
        },
        back(){
        	if(this.index == 0){
        		wx.navigateBack({delta:1})
        	}else{
        		wx.redirectTo({
				  	url: '../liveList/liveList'
				})
        	}
    	},
    	backIndex(){
    		wx.navigateBack({delta:5})
    	},
    	bindscroll(e){
    		var scrollTop = e.detail.scrollTop;
    		var scrollHeight = e.detail.scrollHeight;
    		var chatHeight = this.chatHeight;//聊天区域高度px
    		if(chatHeight == scrollHeight - scrollTop){//到聊天底部
    			this.onButtom = true;
    		}else{//不在底部
    			this.onButtom = false;
    		}
    	},
    	scrolltolower(e){
    		this.onButtom = true;
    	},
    	goDetails(){
    		var chooseShopId = this.chooseShopId;
    		if(chooseShopId){
    			wx.navigateTo({
			        url: '../goods/goods' + '?id=' + chooseShopId
			    })
    		}
    	},
    	open(){
    		this.Open = true
    	},
    	retract(){
    		this.Open = false
    	}
    }
}
</script>

<style>
page{width:100%;height:100%;}
.view{width:100%;height:100%;overflow-x: auto;}
.detailsTop{width:100%;height:80rpx;background-color:#E068A4;padding:0 20rpx;box-sizing:border-box;}
.detailsTop .head{width:64rpx;height:64rpx;border-radius:50%;border:1px solid #fff;float:left;margin-top:4rpx;margin-right:20rpx;font-size:24rpx;color:#fff;line-height:64rpx;text-align:center;}
.detailsName{float:left;}
.detailsName .name{font-size:28rpx;color:#FFFFFF;line-height:40rpx;font-weight:bold;}
.detailsName .number{font-size:24rpx;color:#FFFFFF;line-height:32rpx;}
.more{width:150rpx;line-height:50rpx;margin-top:14rpx; border:2rpx solid #FFFFFF;border-radius:4rpx;font-size:28rpx;color:#FFFFFF;float:right;text-align:center;}
.service{float:right;height:80rpx;margin-right:10rpx;background: rgba(0,0,0,0);}
.service .image{width:36rpx;height:40rpx;margin-top:20rpx;float:left;margin-right:6rpx;}
.service .text{font-size:28rpx;color:#fff;line-height:80rpx;float:left;}
.index{float:right;width:100rpx;height:80rpx;margin-right:8rpx;}
.index .image{width:36rpx;height:36rpx;margin-top:20rpx;float:left;margin-right:6rpx;}
.index .text{font-size:28rpx;color:#fff;line-height:80rpx;float:left;}
.liveBox{width:100%;height:100%;display: flex;align-items:center;}
.scrollView{width:200rpx;height:100%;background-color:#E068A4;}
.myVideo{height:100%;flex:1;position:relative;}
.myVideo .video{width:100%;height:100%;position:absolute;left:0;top:0;z-index:9;}
.noLive{width:calc(100% - 200rpx);height:100%;float:left;background-color:#000;position:relative;}
.noLiveimg{width:200rpx;height:200rpx;position:absolute;top:250rpx;left:50%;margin-left:-100rpx;}
.noLive .text{width:480rpx;margin:0 auto;font-size:32rpx;color:#FFFFFF;position:absolute;top:496rpx;left:50%;margin-left:-240rpx;text-align:center;line-height:46rpx;}
.scrollBox{width:100%;height:180rpx;padding:20rpx 20rpx 0;box-sizing:border-box;position:relative;}
.imgage{width:160rpx;height:160rpx;position:absolute;left:20rpx;top:20rpx;z-index:9;}
.imgage .image{width:100%;height:100%;}
.imgage .wx-text{height:30rpx;line-height:30rpx;font-size:20rpx;color:#fff;position:absolute;z-index:9;text-align:center;}
.imgage text{height:30rpx;line-height:30rpx;font-size:20rpx;color:#fff;position:absolute;z-index:9;text-align:center;}
.recommend{width:90rpx;background:rgba(249,66,66,0.8);left:0;top:0;}
.sequence{width:30rpx;background:rgba(0,0,0,0.4);right:0;top:0;}
.price{background:rgba(0,0,0,0.4);right:0;bottom:0;padding:0 6rpx;}
.current{width:200rpx;height:200rpx;padding:20rpx;box-sizing:border-box;position:relative;}
.current:after{content:'';width:100%;height:100%;position:absolute;left:0;top:0;z-index:1;background-color:rgba(255,255,255,0.6);}
.nocurrent{background-color:#E068A4;}

.chat{width:100%;background-color:#BC387B;position:relative;}
.chatNotice{width:100%;font-size:24rpx;color:#FFFFFF;line-height:34rpx;padding:20rpx 20rpx 0;display:block;box-sizing: border-box;}
.chatRecord{width:100%;font-size:28rpx;margin-top:20rpx;overflow:hidden;color:#fff;padding:0 20rpx;box-sizing: border-box;}
.chatRecord .image{width:76rpx;height:28rpx;float:left;margin-right:18rpx;vertical-align: bottom;}
.chatName{color:#F1FF36;margin-right:14rpx;white-space:nowrap;float:left;}
.chatDetail{color:#fff;display:inline-block;}
.btn{width:80rpx;height:80rpx;position:fixed;bottom:30rpx;right:20rpx;}
.nobtn{width:80rpx;height:80rpx;position:fixed;bottom:102rpx;right:20rpx;}
.chatInput{width:100%;height:88rpx;position:fixed;left:0;bottom:0;z-index:9;background-color:#fff;padding:0 20rpx;box-sizing: border-box;}
.chatInput .input{width:550rpx;height:60rpx;line-height:60rpx;background:#EBEBEB;border-radius:4rpx;float:left;padding-left:10rpx;margin:14rpx 0;}
.chatInput .text{width:128rpx;height:60rpx;background: #D4237C;border-radius: 4rpx;float:right;text-align:center;line-height:60rpx;color:#fff;font-size: 28rpx;margin-top:14rpx;}
.choose{width:100%;height:706rpx;position:relative;}
.chooseMask{width:100%;height:calc(100% - 706rpx); position:absolute;left:0;top:0;z-index:9;}
.chooseSpec{width:100%;height:100%;background-color:#fff;position:absolute;left:0;bottom:0;z-index:9;padding:0 0 88rpx;box-sizing: border-box;}
.bottom{width:100%;height:88rpx;position:fixed;left:0;bottom:0;z-index:9999;border-top:2rpx solid #D8D8D8;background-color:#FFF;}
.shopCart{width:33.33%;line-height:88rpx;text-align:center;float:left;position:relative;}
.shopCart .image{width:44rpx;height:45rpx;margin-top:20rpx;}
.shopCart .text{width:26rpx;height:26rpx;border-radius:50%;background-color:#FF3B6C;text-align:center;line-height:26rpx;font-size:20rpx;color:#fff;display:block;position:absolute;left:134rpx;top:14rpx;}
.addCart{width:33.33%;line-height:88rpx;text-align:center;background:linear-gradient(90deg, #FFF0F6 0%, #FFD0E1 100%);font-size:28rpx;color:#D4237C;float:left;}
.buy{width:33.33%;line-height:88rpx;text-align:center;background:linear-gradient(90deg, #EF479C 0%, #E05783 100%);font-size:28rpx;color:#FFFFFF;float:left;}
.back{width:44rpx;height:44rpx;position:absolute;right:20rpx;top:20rpx;z-index:999;}
.Record{width:100%;}
.fans{width:auto;background:rgba(255,255,255,0.30);border-radius:100rpx;padding:0 20rpx;line-height:50rpx;color:#fff;font-size:24rpx;display:inline-block;margin-top:20rpx;margin-left:20rpx;}
.fans .text{font-size:24rpx;color:#F1FF36;}
.shopDetail{width:100%;height:248rpx;padding:20rpx 20rpx 30rpx;border-bottom:2rpx solid #F0F0F0;box-sizing: border-box;position:relative;}
.shopDetail .shopImg{width:198rpx;height:198rpx;float:left;}
.shopDetail .detailR{float:left;padding-left:20rpx; width:calc(100% - 198rpx);box-sizing:border-box; height:198rpx;}
.shopName{width:83%;height:80rpx;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden;font-size:28rpx;color:#333333;line-height:40rpx;}
.shopPrice{font-size:28rpx;color:#D4237C;line-height:40rpx;margin:5rpx 0;}
.stock{font-size:24rpx;color:#333;line-height:33rpx;}
.choosed{font-size:24rpx;color:#333;line-height:33rpx;margin-top:2rpx;}
.shopNumber{min-width:54rpx;text-align:center;line-height:40rpx;padding:0 4rpx;font-size:28rpx;color:#fff;line-height:40rpx;position:absolute;left:20rpx;top:20rpx;z-index:9;background-color:rgba(0,0,0,0.40);}
.skus{width:100%;padding:20rpx;border-bottom:1px solid #F0F0F0;box-sizing: border-box;}
.skusName{font-size:26rpx;color:#333333;}
.skusDetail{width:100%;display:table;}
.skusDetail .text{min-width:116rpx;max-width:90%;padding:0 22rpx;line-height:50rpx;background:#F5F5F5;border-radius:50rpx;font-size: 24rpx;color: #333333;margin-top:20rpx;margin-right:24rpx;float:left;text-align:center;box-sizing: border-box;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
.skusDetail .on{min-width:116rpx;padding:0 22rpx;line-height:50rpx;background-image: linear-gradient(-90deg, #EF479C 0%, #E05783 100%);border-radius:50rpx;font-size: 24rpx;color: #fff;margin-top:20rpx;margin-right:24rpx;float:left;text-align:center;box-sizing: border-box;}
.buyNum{width:100%;padding:20rpx;display:table;box-sizing: border-box;}
.buyNum .title{font-size:24rpx;color:#333333;float:left;line-height:54rpx;}
.stepper {width:196rpx;height:54rpx;float:right;}
.stepper-text {width:60rpx;line-height:54rpx;text-align:center;float:left;font-size:28rpx;border-radius:2px;}
.stepper-input {width:70rpx;height:54rpx;float:left;text-align: center;font-size:28rpx;border-left:1px solid #fff;border-right:1px solid #fff;color:#333;background-color:#F5F5F5;border-radius:2px;line-height:54rpx;}
.normal{background: #F5F5F5;color:#929292;}
.disabled{background:#FBFBFB;color:#CBCBCB;}
.myCartbox{width:100%;height:100%;background-color:#fff;position:absolute;left:0;bottom:0;z-index:9;padding:0 0 88rpx;box-sizing: border-box;}
.myCart{width:100%;height:100%;background-color:#fff;position:absolute;left:0;bottom:0;z-index:9;padding:88rpx 0;box-sizing: border-box;}
.myCartbox .title{width:100%;height:85rpx;line-height:85rpx;font-size:32rpx;color:#333333;border-bottom:1px solid #F0F0F0;text-align:center;position:absolute;left:0;top:0;z-index:99;background-color:#fff;}
.shopList{width:100%;padding:0 20rpx;box-sizing: border-box;}
.listOne{width:100%;padding:33rpx 0 20rpx 0;border-bottom:1px solid #F0F0F0;height:240rpx;box-sizing: border-box;}
.listOne .icon{margin-top:62rpx;}
.listOne .iconCurrent{margin-top:62rpx;}
.icon{width:40rpx;height:40rpx;border:1px solid #999999;border-radius:50%;background-color:#fff;text-align:center;float:left;}
.icon .text{width:16rpx;height:16rpx;background-color:#fff;border-radius:50%;margin:0 auto;display:block;}
.iconCurrent{width:40rpx;height:40rpx;border:1px solid #FF4289;border-radius:50%;background-color:#fff;text-align:center;float:left;}
.iconCurrent .text{width:16rpx;height:16rpx;background-color:#FF4289;border-radius:50%;margin:0 auto;display:block;margin-top:12rpx;}
.listOne .image{width:180rpx;height:180rpx;float:left;margin:0 20rpx;}
.listOne .listDetails{width:calc(100% - 264rpx);float:left;}
.details{width:100%;height:80rpx;}
.details .detailsName{width:314rpx;height:80rpx;font-size: 28rpx;color: #333333;line-height:40rpx;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden;float:left;}
.details .detailsPrice{width:calc(100% - 314rpx);height:80rpx;float:right;}
.myCartprice{font-size: 28rpx;color: #D4237C;text-align:right;line-height:40rpx;}
.priceNews{width:100%;text-align:right;font-size: 28rpx;color: #D4237C;line-height:40rpx;}
.priceOld{width:100%;text-align:right;font-size: 26rpx;color: #999;text-decoration:line-through;line-height:40rpx;}
.shopSku{width:100%;line-height:40rpx;font-size: 26rpx;color: #999999;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
.operate{width:100%;height:54rpx;margin-top:10rpx;}
.operateNum .step{width:196rpx;height:54rpx;float:left;}
.operate .image{width:38rpx;height:40rpx;float:right;margin-top:10rpx;}
.myCartbuttom{width:100%;height:88rpx;border-top:1px solid #D8D8D8;position:absolute;left:0;bottom:0;z-index:99;}
.myCartbuttom_left{width:calc(100% - 250rpx);height:88rpx;background-color:#fff;padding:0 30rpx 0 20rpx;box-sizing: border-box;float:left;}
.myCartbuttom_right{width:250rpx;height:88rpx;background:linear-gradient(90deg, #EF479C 0%, #E05783 100%);color:#fff;font-size:28rpx;text-align:center;line-height:88rpx;float:left;}
.btnAll{float:left;}
.btnAll .icon{margin-top:20rpx;}
.btnAll .iconCurrent{margin-top:20rpx;}
.btnAllnum{line-height:88rpx;float:left;font-size:28rpx;color:#999999;padding-left:20rpx;}
.total{float:right;text-align:right;}
.totalPrice{font-size: 28rpx;color: #F40E88;line-height:40rpx;margin-top:8rpx;}
.totalSave{font-size: 24rpx;color: #999999;line-height:34rpx;}
.payBox{width:100%;height:100%;padding:0 0 88rpx;box-sizing:border-box;background-color:#F0F0F0;position:relative;}
.payBox .title{width:100%;height:85rpx;line-height:85rpx;font-size:32rpx;color:#333333;border-bottom:1px solid #F0F0F0;text-align:center;position:absolute;left:0;top:0;z-index:99;background-color:#fff;}
.buyBtn{position:fixed;left:0;bottom:0;width:100%;height:88rpx;background-image:linear-gradient(90deg, #EF479C 0%, #E05783 100%);font-size:28rpx;color:#FFFFFF;border-top:1px solid #D8D8D8;text-align:center;line-height:88rpx;}
.payNews{width:100%;height:100%;padding-top:88rpx;box-sizing: border-box;}
.noAddress{width:100%;height:126rpx;text-align:center;position:relative;line-height:126rpx;font-size:28rpx;color:#333;background-color:#fff;}
.noAddress .addressImg{width:32rpx;height:40rpx;vertical-align:middle;margin-right:20rpx;}
.noAddressR{width:12rpx;height:24rpx;position:absolute;right:20rpx;top:46rpx;z-index:9;}
.addresss{width:100%;height:186rpx;background-color:#fff;padding:30rpx 20rpx;box-sizing: border-box;margin-top:20rpx;position:relative;}
.addresssLine{width:100%;height:6rpx;position:absolute;left:0;bottom:0;z-index:9;}
.addresss .addressImg{width:32rpx;height:40rpx;float:left;margin-top:40rpx;}
.infotext{width:500rpx;height:100%;float:left;}
.userInfor{width:100%;line-height:40rpx;font-size: 28rpx;color: #333333;padding-left:20rpx;}
.addressInfor{width:100%;line-height:34rpx;font-size: 24rpx;color: #6A6A6A;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden;padding-left:20rpx;margin-top:20rpx;box-sizing: border-box;}
.addressright{width:12rpx;height:24rpx;float:right;margin-top:50rpx;}
.payList{width:100%;padding:0 20rpx;box-sizing: border-box;margin-top:20rpx;background-color:#fff;}
.payShop{width:100%;height:220rpx;border-bottom:1px solid #F0F0F0;padding:30rpx 0;box-sizing: border-box;}
.payL{float:left;width:160rpx;height:160rpx;}
.payR{width:calc(100% - 160rpx);height:100%;float:left;padding-left:20rpx;box-sizing: border-box;}
.payshopName{width:320rpx;height:80rpx;float:left;line-height:40rpx;font-size:28rpx;color:#333;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden;}
.payshopPrice{width:calc(100% - 350rpx);height:80rpx;text-align:right;font-size:28rpx;color:#D4237C;float:right;}
.paySku{width:100%;margin-top:8rpx;}
.paySize{width:450rpx;height:80rpx;float:left;line-height:40rpx;font-size:26rpx;color:#999;padding-top:10rpx;}
.payNum{width:calc(100% - 450rpx);height:80rpx;float:right;line-height:40rpx;font-size:26rpx;color:#999;text-align:right;}
.noCartlist{width:100%;height:100%;background-color:#fff;text-align:center;position:relative;}
.noCart{width:272rpx;height:218rpx;position:absolute;left:50%;top:180rpx;z-index:9;margin-left:-136rpx;}
.noCartText{width:100%;font-size:24rpx;color:#999999;position:absolute;left:0;top:446rpx;z-index:9;text-align:center;}
.liveBox_B{width:100%;background-color:#fff;}
.B_video{width:100%;height:420rpx;display:block;}
.B_noLive{width:100%;height:420rpx;text-align:center;position:relative;}
.B_noLiveimg{width:200rpx;height:200rpx;position:absolute;left:50%;top:110rpx;z-index:9;}
.B_text{width:100%;font-size:32rpx;color:#FFFFFF;position:absolute;left:0;top:350rpx;text-align:center;}
.B_scrollView{width:100%;height:200rpx;white-space:nowrap;box-sizing: border-box;background-color:#E068A4;display:flex;flex-wrap:nowrap;align-items:center;}
/*.B_scrollBox{width:180rpx;height:180rpx;margin-right:10rpx;position:relative;}*/
.B_scrollView .B_image{width:160rpx;height:160rpx;}
.B_recommend{width:90rpx;height:30rpx;background-color:rgba(249,93,165,0.80);color:#fff;font-size:20rpx;text-align:center;line-height:30rpx;position:absolute;left:0;top:0;}
.B_sequence{width:30rpx;height:30rpx;text-align:center;line-height:30rpx;background-color:rgba(0,0,0,0.4);color:#fff;font-size:24rpx;position:absolute;right:0;top:0;}
.B_price{width:auto;height:30rpx;line-height:30rpx;padding:0 6rpx;text-align:center;font-size:24rpx;color:#fff;position:absolute;right:0;bottom:0;z-index:9}
.B_imgage{width:160rpx;height:160rpx;position:absolute;left:20rpx;top:20rpx;z-index:9;}
.B_imgage .image{width:100%;height:100%;}
.B_imgage .wx-text{height:30rpx;line-height:30rpx;font-size:20rpx;color:#fff;position:absolute;z-index:9;text-align:center;}
.B_imgage text{height:30rpx;line-height:30rpx;font-size:20rpx;color:#fff;position:absolute;z-index:9;text-align:center;}
.B_current{width:200rpx;height:200rpx;box-sizing:border-box;display:inline-flex;position:relative;}
.B_current:after{content:'';width:200rpx;height:200rpx;background-color:rgba(255,255,255,0.6);position:absolute;left:0;top:0;z-index:1;}
.B_nocurrent{background-color:#E068A4;}
.B_scrollBox{width:200rpx;height:200rpx;box-sizing:border-box;display:inline-flex;position:relative;}
.gobottom{background-color:rgba(255,159,201,0.3);position:fixed;left:10rpx;bottom:160rpx;font-size:24rpx;color:#fff;padding:6rpx;}
.gobottom:after{content: ''; display: inline-block; margin-right: 10rpx; border-right: 4rpx solid #fff; border-bottom: 4rpx solid #fff; width:12rpx; height: 12rpx; transform: rotate(45deg);margin-left:10rpx;}
.box{min-width:100%;height:100%;display: -webkit-flex;display:flex;flex-wrap:wrap;flex-direction: column;}
.boxx{width:100%;height:100%;}
.boxo{width:100%; background-color:#888;}
.flex{flex:1; background-color:#ddd;display:flex;}
.groupIndex{width:100%;height:200rpx;position:relative;padding:20rpx;box-sizing: border-box;}
.groupIndex .img{width:100%;height:100%;border-radius:10rpx;box-shadow: 0 2rpx 6rpx #ff6262;}
.groupIndex .groupIng{background: rgba(249,66,66,0.80);line-height:30rpx;padding:0 10rpx;font-size:20rpx;color: #FFFFFF;border-top-left-radius:10rpx;border-bottom-right-radius:10rpx;position:absolute;left:20rpx;top:20rpx;z-index:1;}
.groupIndex .groupPrompt{width:100%;height:30rpx;position:absolute;left:0;bottom:20rpx;z-index:1;line-height:30rpx;font-size:22rpx;color:#fff;text-align:center;}
.groupPrompt .image{width:20rpx;height:25rpx;vertical-align:middle;margin-right:16rpx;}
.group{width:100%;position:relative;}
.groupTop{width:100%;height:214rpx;padding:20rpx 20rpx 30rpx 20rpx;box-sizing: border-box;position:relative;}
.groupTitle{width:100%;height:100%;position:relative;}
.groupTitle .image{width:100%;height:100%;display:block;position:absolute;left:0;top:0;z-index:3}
.groupTitle .Mask{width:100%;height:100%;position:absolute;left:0;top:0;z-index:6;background-color:rgba(255,255,255,0.7)}
.groupTop .img{width:200rpx;height:34rpx;position:absolute;left:0;bottom:0;z-index:1;}
.groupTitle .groupImg{width:98rpx;height:88rpx;position:absolute;left:50%;margin-left:-49rpx;top:40rpx;z-index:10;}
.groupTitle .text{font-size: 22rpx;color: #EA48C7;width:100%;text-align:center;position:absolute;display:block;left:50%;margin-left:-50%;top:130rpx;z-index:9;}
.groupList{width:100%;padding:48rpx 20rpx;box-sizing:border-box;background-color:rgba(255,255,255,0.33);}
.groupBox{width:100%;height:160rpx;position:relative;margin-bottom:22rpx;}
.groupBox .image{width:100%;height:100%;}
.groupPrice{width:100%;background: rgba(0,0,0,0.40);position:absolute;left:0;bottom:0;z-index:9;font-size: 22rpx;
color: #FFFFFF;text-align:center;}
.groupPrice .text{display:inline-block;padding:0 6rpx;}

.stop{width:116rpx;height:50rpx;line-height:50rpx;font-size: 28rpx;color: #FFFFFF;text-align:center;border:1px solid #fff;margin:0 auto;border-radius:50rpx;margin-top:40rpx;}
.B_group{display:inline-flex;height:200rpx;width:auto;}
.B_groupIndex{width:200rpx;height:200rpx;box-sizing: border-box;position:relative;display:inline-block;}
.B_groupIndex .img{width:160rpx;height:160rpx;border-radius:10rpx;box-shadow: 0 2rpx 6rpx #ff6262;position:absolute;left:20rpx;top:20rpx;z-index:1}
.B_groupIndex .groupIng{background: rgba(249,66,66,0.80);line-height:30rpx;padding:0 10rpx;font-size:20rpx;color: #FFFFFF;border-top-left-radius:10rpx;border-bottom-right-radius:10rpx;position:absolute;left:20rpx;top:20rpx;z-index:1;}
.B_groupIndex .groupPrompt{width:100%;height:30rpx;position:absolute;left:0;bottom:20rpx;z-index:1;line-height:30rpx;font-size:22rpx;color:#fff;text-align:center;}
.B_groupOpen{display:inline-flex;height:200rpx;width:auto;flex-wrap:nowrap;}
.B_groupTop{width:200rpx;height:200rpx;position:relative;display:inline-flex;box-sizing: border-box;}
.B_groupTop .img{width:200rpx;height:34rpx;position:absolute;left:0;bottom:0;z-index:1;transform:rotate(90deg);-webkit-transform:rotate(90deg);}
.B_groupTitle{width:200rpx;height:200rpx;position:relative;}
.B_groupTitle .image{width:160rpx;height:160rpx;display:block;position:absolute;left:20rpx;top:20rpx;z-index:3;}
.B_groupTitle .Mask{width:160rpx;height:160rpx;position:absolute;left:20rpx;top:20rpx;z-index:6;background-color:rgba(255,255,255,0.7)}
.B_groupTitle .groupImg{width:98rpx;height:88rpx;position:absolute;left:50%;margin-left:-49rpx;top:40rpx;z-index:10;}
.B_groupTitle .text{font-size: 22rpx;color: #EA48C7;width:100%;text-align:center;position:absolute;display:block;left:50%;margin-left:-50%;top:130rpx;z-index:9;}
.B_groupList{width:auto;height:200rpx;background-color:rgba(255,255,255,0.1);display:inline-flex;position:relative;padding-right:140rpx;}
.B_groupBox{width:200rpx;height:200rpx;position:relative;}
.B_groupBox .image{width:160rpx;height:160rpx;position:absolute;left:20rpx;top:20rpx;z-index:2;}
.B_groupPrice{width:160rpx;background: rgba(0,0,0,0.40);position:absolute;left:20rpx;bottom:20rpx;z-index:9;font-size: 22rpx;
color: #FFFFFF;text-align:center;}
.B_stop{width:116rpx;height:50rpx;line-height:50rpx;font-size: 28rpx;color: #FFFFFF;text-align:center;border:1px solid #fff;margin:0 auto;border-radius:50rpx;position:absolute;right:20rpx;top:50%;margin-top:-25rpx;}
</style>