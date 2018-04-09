<template>
  <!--index.wxml-->
<view class="container">  
<!--	<view wx:if="{{isH5}}" class="f_contant" @tap="fContanth5"></view>-->
  <view class="content">
			<view wx:if="{{!isH5}}">
	      <view class="banner">
	        <image class="bg" background-size="cover" src="{{shopBackImg}}"/>
	        <view class="mask"></view>
	        <image class="userinfo-img" src="{{shopLogoo}}"/>       
	        <view class="userinfo-name" style="{{'color:'+shopNameColor+';'}}" >{{shopName}}</view>
	      </view>		
	      <view class="decript" style="{{'color:'+shopDesColor+';'}}">{{shopDiscribte}}</view>
	    </view>  
		<view wx:if="{{isH5}}">
	      <view class="banner">
	        <image class="bg" background-size="cover" src="{{shopBg}}"/>
	        <view class="mask"></view>
	        <image class="userinfo-img" src="{{shopLogo}}"/>
	        <view class="userinfo-name" style="{{'color:'+shopNameColor+';'}}">{{text}}</view>
	      </view>		
	      <view class="decript" style="{{'color:'+shopDesColor+';'}}">{{textDes}}</view>
			</view>
	</view>		
</view>	
</template>

<script>

	
export default {

     editorConfig: {
        color: {
            el: ['text', 'color'],
            label: '文本初始颜色',
            type: 'String',
            value: '#666666',
            director : 'ColorPicker'
        },
        activeColor: {
            el: ['text', 'color'],
            label: '文本选中颜色',
            type: 'String',
            value: '#262833',
            director : 'ColorPicker'
        },
        nameColor:{
            el: ['text', 'color'],
            label: '商品名称颜色',
            type: 'String',
            value: '#222222',
            director : 'ColorPicker'
        },
        priceColor:{
            el: ['text', 'color'],
            label: '商品价格颜色',
            type: 'String',
            value: '#222222',
            director : 'ColorPicker'
        },
        bgColor:{
            el: ['text', 'color'],
            label: '查看佣金按钮背景颜色',
            type: 'String',
            value: '#262833',
            director : 'ColorPicker'
        },
        lookColor:{
            el: ['text', 'color'],
            label: '查看佣金文字颜色',
            type: 'String',
            value: '#ffc46f',
            director : 'ColorPicker'
        },
        shopBg: {
            el: ['uploader'],
            label: '修改背景图',
            type: 'String',
            value: 'http://image.vdongchina.com/M00/06/01/ZSUkmVoWhDiEQT1zAAAAAHEHZhI208.png',
            director : 'uploader'
        },
        shopLogo: {
            el: ['uploader'],
            label: '修改logo',
            type: 'String',
            value: 'http://image.vdongchina.com/M00/06/01/ZSUkmVoWhEOEBhGCAAAAAELIZTQ854.png',
            director : 'uploader'
        },
        shopNameColor:{
            el: ['text', 'color'],
            label: '店铺名称文字颜色',
            type: 'String',
            value: '#333333',
            director : 'ColorPicker'
        },
        text: {
            el: ['textarea'],
            label: '店铺名称',
            type: 'String',
            value: 'MODISCH',
            director: 'Input'
        },
        shopDesColor:{
            el: ['text', 'color'],
            label: '店铺描述文字颜色',
            type: 'String',
            value: '#999999',
            director : 'ColorPicker'
        },
        textDes: {
            el: ['textarea'],
            label: '店铺描述',
            type: 'String',
            value: '此处为店铺说明或者其他的你想说的',
            director: 'Input'
        },
    },
    comName:"分销首页",
    props:{
        color: {
            default: '#666666',
            type: String
        },
        activeColor: {
            default: '#262833',
            type: String
        },
        nameColor: {
            default: '#222222',
            type: String
        },
        priceColor: {
            default: '#222222',
            type: String
        },
        bgColor: {
            default: '#262833',
            type: String
        },
        shopBg: {
            default: 'http://image.vdongchina.com/M00/06/01/ZSUkmVoWhDiEQT1zAAAAAHEHZhI208.png',
            type: String
        },
        shopLogo: {
            default: 'http://image.vdongchina.com/M00/06/01/ZSUkmVoWhEOEBhGCAAAAAELIZTQ854.png',
            type: String
        },
        shopNameColor:{
            default: '#333333',
            type: String
        },
        text: {
            default: 'MODISCH',
            type: String
        },
        shopDesColor:{
            default: '#999999',
            type: String
        },
        textDes: {
            default: '此处为店铺说明或者其他的你想说的',
            type: String
        }
    },	
		data () {
	    return {
	      currentTab:0,
	      items:[],
	      kindId:'',//分类ID
	      list:[1],
	      edit:{pId:0,setting:[]},//     
	      setting:[],
	      flag:false,      
	      chooseColor:[],
	      defalut: {},
	      pid:'',
	      skuList:[],//规格佣金数据
	      independentCommission:'',
	      fComm:'？',//一级佣金
	      sComm:'？',//二级佣金
	      tComm:'？',//三级佣金
	
	      isDealer:false,
	      enableSku:false,//商品有无规格
	
	      shopBackImg:'',
	      shopLogoo:'',
	      shopName:'',
	      shopDiscribte:'',
	      isShop:true,
	
	      //控制底部导航切换颜色
	      indexActive:0,
	      messageActive:1,
	      shopcartActive:1,
	      personalActive:1,
	      messageNum:0,
	      isH5:false,
	      isShowcom:true
	    }
  },  
  async onLoad(e){  
    var that = this
  that.isH5 = !wx.hasOwnProperty('version')   
		if(e.pid){
			that.pid = e.pid
			that.$root.globalData.pid = e.pid		
		} 
 		await this.$root.login()		       
    wx.request({
       url:this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/userShop/getPUserShop',
       data:{
           token: that.$root.globalData.token,
          pid:that.$root.globalData.pid
       },
       method:"POST",
        header: {
           'content-type': 'application/x-www-form-urlencoded'
       },
       success: function(res) {
       		if(res.data.code =="200"){
   						if(res.data.object){
   							//that.isShop = true
                if(res.data.object.shopBackImg){
		              that.shopBackImg=res.data.object.shopBackImg
                }else{
                	that.shopBackImg = 'http://image.vdongchina.com/M00/06/11/ZSUkmVoXttiESrKMAAAAAHEHZhI130.png'
                }
                if(res.data.object.shopLogo){
                	that.shopLogoo=res.data.object.shopLogo
                }else{
                	that.shopLogoo = 'http://image.vdongchina.com/M00/06/12/ZSUkmVoXvTuEZfkvAAAAAELIZTQ640.png'
                }
                if(res.data.object.shopName){
                	that.shopName=res.data.object.shopName
                }else{
                	that.shopName = 'MODISCH'
                }
                if(res.data.object.shopDes){
                	that.shopDiscribte=res.data.object.shopDes  
                }else{
                	that.shopDiscribte = '此处为店铺说明或者其他的你想说的'
                }
   						}else{
								//that.isShop = false
								that.shopBackImg = that.shopBg
								that.shopLogoo = that.shopLogo
								that.shopName = that.text
								that.shopDiscribte = that.textDes
   						}
           }
       }
    })
    
   
    
    
  },
  methods: {
    fContanth5(){
        wx.showModal({
            title: '提示',
            content:'H5分销暂不可以编辑',
            showCancel:false,               
        })     	
    }  	
  }
}
</script>

<style scoped>
page{
height: 100%;
}

.container{
height: 100%;
}
.f_contant{position: absolute;left: 0;right: 0;height: 100%;background: rgba(0,0,0,0);z-index: 999;}
.noData{
  height:600rpx;
  line-height: 600rpx;
  text-align: center;
  font-size: 30rpx;
  color:#222;
}
.container .contents{
  background: #f2f2f2;
  position: relative;
}
.container .choose-size{
    position: fixed;
    top: 0;
    left:0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 998;
    background: rgba(0, 0, 0, 0.5)
}
.container .choose-size.container .choose-size{
  height:100%;
  width:100%;
  position: fixed;
  top:0;
  left: 0;
  background: rgba(0,0,0,0.5);
  z-index: 99;
}
.container .choose-size .box{
  min-height:294rpx;
  background: #fff;
  position: absolute;
  bottom:0;
  left: 0;
  width:100%;
}
.container .choose-size .box .head{
  height:48rpx;
  margin:24rpx 0 48rpx;
  position: relative;
}
.container .choose-size .box .colour{
  height:auto;
  margin-bottom: 48rpx;
}
.container .choose-size .box .colour .titel{
  line-height: 28rpx;
  font-size:28rpx;
  color:#999;
  margin-left:30rpx;
}
.container .choose-size .box .colour .items{
  height:auto;
  margin-top:24rpx;
  padding-left:6rpx;
}
.container .choose-size .box .colour .items .item{
	margin:0 0 16rpx 24rpx;
  line-height: 60rpx;
  border-radius: 6rpx;
  min-width:48rpx;
  font-size:24rpx;
  padding:0 32rpx;
  color:#666;
  text-align: center;
  background: #f5f5f5;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.container .choose-size .box .colour .items .color-active{
  background: #4e5059;
  color:#fff;
}
.container .choose-size .box .yongjin-grade{
  height:248rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.container .choose-size .box .yongjin-grade .item{
  height:100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.container .choose-size .box .yongjin-grade .item .t{
  margin-top:32rpx;
  font-size:28rpx;
  color:#262833;
  height: 28rpx;
  line-height: 28rpx;
  font-weight: 600;
}
.container .choose-size .box .yongjin-grade .item .b{
  margin-top:40rpx;
  font-size:32rpx;
  color:#262833;
  height: 32rpx;
  line-height: 32rpx;
  font-weight: 600;
}
.container .choose-size .box .head .txt{
  position: absolute;
  width:180rpx;
  left:50%;
  top:0;
  margin-left:-90rpx;
  height: 48rpx;
  line-height: 48rpx;
  font-size:36rpx;
  color:#222;
}
.container .choose-size .box .head .img{
  height: 48rpx;
  width:48rpx;
  position: absolute;
  top:0;
  right: 24rpx;
  display:block;
}
.container .search{
  display: none;
  height: 100rpx;
  width:100rpx;
  position: fixed;
  bottom:124rpx;
  right: 30rpx;
  border-radius: 50%;
  box-shadow: 0 4rpx 12rpx 0 rgba(0,0,0,0.1);
}
.container .search .img{
    height:100%;
    width:100%;
    display: block;
}
.container .banner{
  height: 384rpx;
  width:100%;
  position: relative;
}
.container .banner .bg{
  height:384rpx;
  width:100%;
  z-index:1;
  display: block;
}
.container .banner .mask{
  height: 110rpx;
  width:100%;
  position: absolute;
  bottom:-1rpx;
  left:0;
  background-image: linear-gradient(to bottom,rgba(255,255,255,0.7) 0%,rgba(255,255,255,1) 100%);
  z-index: 2;
}
.container .banner .userinfo-img{
  width:148rpx;
  height: 148rpx;
  background: #ccc;
  position: absolute;
  bottom:46rpx;
  left:50%;
  margin-left:-74rpx;
  border-radius: 50%;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  z-index:9;
}
.container .banner .userinfo-name{
  font-size: 32rpx;
  height:32rpx;
  line-height:32rpx;
  width:100%;
  text-align: center;
  position: absolute;
  bottom:-10rpx;
  left:0;
  z-index: 9;
  color:#333;
  overflow: visible;
}
.container .decript{
  width:100%;
  padding:34rpx 0 20rpx;
  font-size:24rpx;
  height: 24rpx;
  line-height: 24rpx;
  color:#999;
  text-align: center;
  z-index:-1;
  background: #fff;
}
/*商品列表*/
._me_title_items{
  display:flex;white-space: nowrap;height: 82rpx;
  overflow: scroll;
  border-bottom: 1rpx solid #E5E5E5;
}
._me_title_Item{height:82rpx;display: inline-block;line-height: 82rpx;text-align: center;color: #666;font-size: 28rpx;margin: 0 27rpx;box-sizing: border-box;}
.text{height:82rpx;
box-sizing:border-box;
}
.lists{
  display: flex;
  flex-wrap: wrap;
  width:100%;
  justify-content: space-between;
  margin-bottom:101rpx;
  background: #f2f2f2;
  padding-top: 10rpx;
}
.lists .list{
  width:370rpx;
  padding-bottom:20rpx;
  background: #fff;
  margin-bottom:10rpx;
}
.lists .list .list-img{
  width:100%;
  height:370rpx;
  display: block;
}
.lists .list .list-name{
  margin:16rpx 0 20rpx 20rpx;
  font-size:28rpx;
  line-height: 34rpx;
  height:68rpx;
  width:330rpx;
  overflow:hidden;
  text-overflow: ellipsis;
  display:-webkit-box;
  -webkit-line-clamp:2;
  -webkit-box-orient:vertical;
  color: #222;
}
.lists .list .list-price{
  height:40rpx;
  width:100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.lists .list .list-price .l{
  font-size:32rpx;
  height: 32rpx;
  line-height:32rpx;
  color:#222;
  margin-left:4rpx;
}
.lists .list .list-price .l .price{
  display: inline-block;
}
.lists .list .list-price .r{
  height: 40rpx;
  width:120rpx;
}
.lists .list .list-price .r .check-yongjin{
  height:100%;
  width:100%;
  background: #262833;
  font-size:20rpx;
  line-height: 40rpx;
  text-align: center;
  border-radius: 20rpx 0 0 20rpx;
  color:#ffc46f;
}

/* 底部导航样式 */
.bottom-nav{
    height: 50px;
    width:100%;
    position: fixed;
    bottom:0;
    left:0;
    background: #fff;
    border-top:1rpx solid #ababab;
}
.bottom-nav .content{
    width:100%;
    height:100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.bottom-nav .content .nav-list{
    height: 100%;
    width:25%;
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.bottom-nav .content .nav-list .top{
    height:54rpx;
    width:54rpx;
    margin-top:9rpx;
    margin-bottom:4rpx;
    background-size:cover;
}
.bottom-nav .content .nav-list .bottom{
    line-height: 28rpx;
    height:28rpx;
    font-size:20rpx;
    color:#999;
}
.bottom-nav .content .nav-list:first-child .bottom{
    color:#262833;
}

.bottom-nav{
    height: 100rpx;
    width:100%;
    position: fixed;
    bottom:0;
    left:0;
    background: #fff;
    border-top:1rpx solid #ababab;
}
.bottom-nav .content{
    width:100%;
    height:100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.bottom-nav .content .nav-list{
    height: 100%;
    width:25%;
}
.bottom-nav .content .nav-list .nav{
    height:100%;
    width:100%;
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.bottom-nav .content .nav-list .nav .top{
    height:54rpx;
    width:54rpx;
    margin:9rpx 0 4rpx;
    display: block;
}
.bottom-nav .content .nav-list .nav .bottom{
    font-size:20rpx;
    color:#999;
    height: 28rpx;
    line-height:28rpx;
}
.bottom-nav .content .nav-list .navActive{
    height:100%;
    width:100%;
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.bottom-nav .content .nav-list .navActive .top{
    height:54rpx;
    width:54rpx;
    margin:9rpx 0 4rpx;
    display: block;
}
.bottom-nav .content .nav-list .navActive .bottom{
    font-size:20rpx;
    color:#262833;
    height: 28rpx;
    line-height:28rpx;
}
.fmessage{
	position: relative;
}
.fmessagenum{font-size:18rpx;position: absolute;width: 36rpx;height: 36rpx;background: #ff1111;border-radius: 50%;line-height: 36rpx;text-align: center;color: #fff;top:6rpx;right: 44rpx;}
</style>

