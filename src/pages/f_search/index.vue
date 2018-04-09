<template>
  <view class="container">
  	    <!--<view class="mask">
            <view class="content">
                <image class="header" src="http://image.vdongchina.com/M00/03/3C/ZSUkmVngJZKEJtJvAAAAAGKhHsE856.png"></image>
                <text class="middle">暂无该功能</text>
                <text class="footer">程序员正在努力开发中</text>
            </view>
        </view> -->
  	
  	
  	
      <view class="search">
          <input class="inp" placeholder="请输入你感兴趣的宝贝" auto-focus="true" placeholder-style="font-size:28rpx;color:#999;line-height:64rpx;height:64rpx;" type="text" @input="bindblur" value="{{inputTxt}}" maxlength="20" confirm-type="search" @confirm="search"/>
          <view class="clear" @tap="clearInp">
                <image class="img" src="http://image.vdongchina.com/M00/06/11/ZSUkmVoXt3iEe5V_AAAAAD3II1M419.png" wx:if="{{isInput}}"></image>
          </view>
          <view class="txt" @tap="searchGoods(inputTxt)">搜索</view>
      </view>
      <!-- 未输入搜索内容时的显示样式 -->
        <view wx:if="{{!flag && searchConFlag}}">
            <view class="history">
                <view class="l">历史搜索</view>
                <view class="r" @tap="clearOut">清除</view>
            </view>
            <view class="history-con">
                <view class="item" wx:for="{{searchCon}}" @tap="getValue(item)" wx:key="gg">{{item}}</view>
            </view>
        </view>   
      <!-- <view class="hot">
          <view class="l">热门搜索</view>
          <view class="r">换一换</view>
      </view>
      <view class="hot-con">
          <view class="item">裙子</view>
          <view class="item">裙子裙子</view>
          <view class="item">毛衣马甲</view>
          <view class="item">裙子</view>
          <view class="item">裙子裙子</view>
          <view class="item">裙子</view>
          <view class="item">毛衣马甲</view>
      </view> -->
      <!-- 未搜索到结果的显示样式 -->
      <view class="tip" wx:if="{{list.length == 0 && flag}}">
          <image class="img" src="http://image.vdongchina.com/M00/06/12/ZSUkmVoXvCuEfMObAAAAAHGPCA4513.png"></image>
          <view class="p1">抱歉！没找到相关商品</view>
          <view class="p2">也许您的姿势不够帅，换个姿势再试一次吧！</view>
      </view>
      <!-- 搜索到结果的显示样式 -->
      <!-- <view class="search-res" wx:if="{{flag}}">
          <view class="item">
              <view class="txt">裙子裙子</view>
          </view>
          <view class="item">
              <view class="txt">裙子裙子</view>
          </view>
          <view class="item">
              <view class="txt">裙子裙子</view>
          </view>
          <view class="item">
              <view class="txt">裙子裙子</view>
          </view>
          <view class="item">
              <view class="txt">裙子裙子</view>
          </view>
          <view class="item">
              <view class="txt">裙子裙子</view>
          </view>
          <view class="item">
              <view class="txt">裙子裙子</view>
          </view>
      </view> -->
      <!-- 点击搜索到的文字显示商品 -->
      <view class="lists" wx:if="{{list.length>0 && flag}}">      	
        	<view class="list" wx:for="{{list}}" wx:key="gg" @tap="toDetails(item.id)">
		          <image class="list-img" wx:if="{{item.imageList}}" src="{{item.imageList[0].url}}"/>
		          <view class="list-name">{{item.name}}</view>
		          <view class="list-price">
		            <view class="l">
		              	￥<view class="price">{{item.showPrice}}</view>
		            </view>
		            <view class="r">
		              <view class="check-yongjin" wx:if="{{isDealer && isShowcom}}"  @tap.stop="toChooseSize(index,item.productId)">查看佣金</view>
		            </view>
		          </view>
	        </view>      	
    </view>
		<view class="choose-size" wx:if="{{flag1}}">
		    <view class="box">
		    <view class="head">
		        <view class="txt" wx:if="{{enableSku}}">请选择规格</view>
		        <view class="txt" wx:else="{{enableSku}}">查看佣金</view>
		        <image class="img" src="http://image.vdongchina.com/M00/06/11/ZSUkmVoXtyiEeH_8AAAAAJnM000802.png" @tap="toCancel"/>
		    </view>
		    <view wx:if="{{isDealer}}" class="colour" wx:for="{{setting}}"  wx:key="gg" wx:for-item="set">
		        <view class="titel">{{set.propertyName}}</view>
		        <view class="items clear">
		            <view wx:for="{{set.salePropertyList}}" wx:key="index" class="{{defalut[set.id]==item.salePropertyId? 'color-active item left' : 'item left'}}"  @tap="colorTap(set.id,item.salePropertyId)">
		                {{item.salePropertyName}}
		            </view>
		        </view>
		    </view>
		
		    <view class="yongjin-grade">
		        <view class="item">
		        <view class="t">一级佣金</view>
		        <view class="b">￥{{fComm}}</view>
		        </view>
		        <view class="item">
		        <view class="t">二级佣金</view>
		        <view class="b">￥{{sComm}}</view>
		        </view>
		        <view class="item">
		        <view class="t">三级佣金</view>
		        <view class="b">￥{{tComm}}</view>
		        </view>
		    </view>
		    </view>
		</view>
    
    
    
    
  </view>
</template>

<script>
export default {
    config: {
        "navigationBarTitleText": "搜索"
    },
    data () {
        return {
            list:[1],
            searchCon:[],
            searchConFlag:0,
            flag:false,
            flag1:false,
			      isDealer:false,
			      isShowcom:false,
			      enableSku:false,//商品有无规格            
            setting:[],
            defalut: {},
            pid:'',
	      skuList:[],//规格佣金数据
	      independentCommission:'',
	      fComm:'？',//一级佣金
	      sComm:'？',//二级佣金
	      tComm:'？',//三级佣金	                        
            inputTxt:'',
            isInput:false,
            colorItems:[
                { status: '黑色黑色黑色黑色黑色黑色黑色黑色黑色黑色黑色黑色黑色黑色' },
                { status: '黄色' },
                { status: '红黑色黑色色' },
                { status: '紫黑色黑色黑色黑色色' },
                { status: '绿色' },
                { status: '青色' }
            ],
            chooseColor:'111',
            sizeItems:[
                { status: 's' },
                { status: 'm' },
                { status: 'l' },
                { status: 'xl' },
                { status: 'xxl' },
                { status: 'xxxl' }
            ],
            chooseSize:'111'
        }
    },
    onLoad(){
        var that = this
        wx.getUserInfo({
            success: function(res) {
                console.log(res.userInfo)
                that.avatarUrl = res.userInfo.avatarUrl
                that.nickName = res.userInfo.nickName
            }
        })
        wx.request({
            url:that.$root.apiServer + that.$root.appid + that.$root.variate + '/basic/client/distribution/user/aboutMe',
            data:{
                token:that.$root.globalData.token,
                pid:that.$root.globalData.pid
            },
            method:"POST",
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
                if(res.data.code == 200){
                    var searchRes = res.data.object.searchContent
                    if(searchRes){
	                    var arr = []
	                    arr = searchRes.split('|');
	                    arr.reverse();
                        that.searchCon = arr      
                        that.searchConFlag = 1           	
                    }
                }
            }
        })
        
		    wx.request({
		      url: this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/user/isDealer',
		      data: {
		        token: that.$root.globalData.token,
		        pid:that.$root.globalData.pid
		      },
		      method: "POST",
		      header: {
		        'content-type': 'application/x-www-form-urlencoded'
		      },
		      success: function(res) {
		        if(res.data.code == "200"){
		          that.isDealer = res.data.object
		        }
		      }
		    })
		    
		    wx.request({
		        url:this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/product/queryShowCommission',
		        data:{
		            token: that.$root.globalData.token,
		            pid:that.$root.globalData.pid
		        },
		        method:"GET",
		          header: {
		            'content-type': 'application/x-www-form-urlencoded'
		        },
		        success: function(res) {
		            if(res.data.code =="200"){
		            	if(res.data.object == false){
		            	
		            		that.isShowcom = false
		            	}else{
		            		that.isShowcom = true
		            	}
		            }
		        }
		    })		    
        
    },
    methods:{
    	clearOut(){//清除历史搜索
    		var that = this
		    wx.request({
		        url:this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/user/updateUserInfo',
		        data:{
		            searchContent:'',
		            token: that.$root.globalData.token,
		            pid:that.$root.globalData.pid
		        },
		        method:"POST",
		          header: {
		            'content-type': 'application/x-www-form-urlencoded'
		        },
		        success: function(res) {
		            if(res.data.code =="200"){
		            	that.searchCon = []
										wx.showToast({
										  title: '清除历史成功',
										  icon: 'success',
										  duration: 1500
										})
		            }
		        }
		    })	    		
    		
    	},
    colorTap: function(sid,id) {//index for mainPropList,_index for salePropertyList
      var that = this
      this.defalut[sid] = id
      this.defalut=this.defalut
      var newList=[]
      for(var v in this.defalut){
        if(this.defalut[v]==""){
          return
        }    			
        newList.push(this.defalut[v])
      }  
      if(newList.length<that.setting.length){
        return
      }
      if(!this.enableSku){//该商品无规格不执行
      		return
      }
      wx.request({
        url: this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/product/getProductComm',
        data: {
          token:that.$root.globalData.token,
          productId:that.pid,
          pid:that.$root.globalData.pid
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          if(res.data.code == "200") {
            that.independentCommission = res.data.object.product.independentCommission   //客户是否设置佣金  ture设置
            that.skuList = res.data.object.product.skuList  
            var rulingPrice//价格
					for(var i=0;i<that.skuList.length;i++){
						var arr = []
						for(var j=0;j<that.skuList[i].salePropertyList.length;j++){
							arr.push(that.skuList[i].salePropertyList[j].salePropertyId)
						}
						if(arr.equals(newList)){
							rulingPrice = that.skuList[i].rulingPrice;
							break;
						}
					}                                                        
            if(that.independentCommission){
                that.fComm = (rulingPrice*res.data.object.product.commissionFirst/100).toFixed(2)
                that.sComm = (rulingPrice*res.data.object.product.commissionSecond/100).toFixed(2)
                that.tComm = (rulingPrice*res.data.object.product.commissionThird/100).toFixed(2)
            }else{
                that.fComm = (rulingPrice*res.data.object.commLevelDetail.fComm/100).toFixed(2)
                that.sComm = (rulingPrice*res.data.object.commLevelDetail.sComm/100).toFixed(2)
                that.tComm = (rulingPrice*res.data.object.commLevelDetail.tComm/100).toFixed(2)    						
            }
              
          }else{
            wx.showModal({
                title: '提示',
                content:'您不是分销商，暂无佣金信息',
                showCancel:false,
              success: function(res) {
                if (res.confirm) {
                  that.flag = false
                }
              }	                
            })    					
          }
        }
      })    		
    },    	
        getValue(val){
            var that = this
            that.inputTxt = val
            if(that.inputTxt!=''){
                wx.request({
                    url:that.$root.apiServer + that.$root.appid + that.$root.variate + '/basic/client/distribution/product/searchProduct',
                    data:{
                        token:that.$root.globalData.token,
                        name:that.inputTxt
                    },
                    method:"POST",
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    success: function(res) {
                        if(res.data.code == 200){
                            console.log(res)
                            that.list = res.data.object.list
                            that.flag = true
                        }
                    }
                })  
            }else{
                wx.showModal({
                    title: '提示',
                    content: '请输入搜索内容',
                    showCancel:false,
                    success: function(res) {
                        if (res.confirm) {
                            //console.log('用户点击确定')
                        }
                    }
                })
            }
        },
        toDetails(id){
            wx.navigateTo({
                url: '../f_goodsdetail/f_goodsdetail?id='+id
            });
        },
        bindblur(e){
            console.log(e.detail.value)
            if(e.detail.value!=""){
                this.inputTxt = e.detail.value
                this.isInput = true
            }else{
                this.isInput = false
            }
        },
        search(e){
            var value = e.detail.value
            var that = this
            if(value!=''){
                wx.request({
                    url:that.$root.apiServer + that.$root.appid + that.$root.variate + '/basic/client/distribution/product/searchProduct',
                    data:{
                        token:that.$root.globalData.token,
                        name:value
                    },
                    method:"POST",
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    success: function(res) {
                        if(res.data.code == 200){
                            console.log(res)
                            that.list = res.data.object.list
                            that.flag = true
                        }
                    }
                })  
            }else{
                wx.showModal({
                    title: '提示',
                    content: '请输入搜索内容',
                    showCancel:false,
                    success: function(res) {
                        if (res.confirm) {
                            //console.log('用户点击确定')
                        }
                    }
                })
            }
        },
        searchGoods(val){
            var that = this
            if(val!=''){
                wx.request({
                    url:that.$root.apiServer + that.$root.appid + that.$root.variate + '/basic/client/distribution/product/searchProduct',
                    data:{
                        token:that.$root.globalData.token,
                        name:val
                    },
                    method:"POST",
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    success: function(res) {
                        if(res.data.code == 200){
                            console.log(res)
                            that.list = res.data.object.list
                            that.flag = true
                        }
                    }
                })  
            }else{
                wx.showModal({
                    title: '提示',
                    content: '请输入搜索内容',
                    showCancel:false,
                    success: function(res) {
                        if (res.confirm) {
                            //console.log('用户点击确定')
                        }
                    }
                })
            }
        },
        clearInp(){ 
            this.inputTxt = ""
            this.isInput = false
        },
    toChooseSize(index,pid){  
    	var obj = {}
    	var that = this   
        that.fComm ="？"
        that.sComm ="？"
        that.tComm ="？"  	    	
    	that.pid = pid
      var m=this.list[index];
			this.enableSku = m.enableSku//该商品有无规格
      if(!m.enableSku){//该商品有规格提取对应规格 否则直接显示佣金
         that.fComm = (m.salePrice*m.commissionFirst/100).toFixed(2)
        that.sComm = (m.salePrice*m.commissionSecond/100).toFixed(2)
        that.tComm = (m.salePrice*m.commissionThird/100).toFixed(2)        		      
      }
      this.setting=m.mainPropList;//提取list对应数据
    	this.setting.forEach(function(item,idx){
    		obj[item.id]=""
    	})
    	this.defalut = obj      
			this.flag1 = true

    },
        toCancel(){
            this.flag1 = false
        },
    }
}
</script>

<style scoped>
page{
    /*height:100%;*/
    background: #f2f2f2;
  }
.left{
    float:none;
}
.right{
    float:none;
}
.container{
    height:100%;
    /*background: #f2f2f2;*/
    /*overflow: hidden;*/
    position: relative;
}
.container .choose-size{
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
  margin:24rpx 0 42rpx;
  position: relative;
}
.container .choose-size .box .colour{
  min-height:160rpx;
}
.container .choose-size .box .colour .titel{
  height: 28rpx;
  line-height: 28rpx;
  font-size:28rpx;
  color:#999;
  margin-left:30rpx;
}
.container .choose-size .box .colour .items{
  min-height:76rpx;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top:24rpx;
  padding-left:6rpx;
}
.container .choose-size .box .colour .items .item{
  margin:0 0 16rpx 24rpx;
  height:60rpx;
  line-height: 60rpx;
  border-radius: 6rpx;
  min-width:48rpx;
  max-width:626rpx;
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
.container .choose-size .box .size{
  min-height:160rpx;
}
.container .choose-size .box .size .titel{
  height: 28rpx;
  line-height: 28rpx;
  font-size:28rpx;
  color:#999;
  margin-left:30rpx;
}
.container .choose-size .box .size .items{
  min-height:100rpx;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin:24rpx 0 32rpx 0;
  padding-left:6rpx;
  box-sizing: border-box;
}
.container .choose-size .box .size .items .item{
  margin:0 0 16rpx 24rpx;
  height:60rpx;
  line-height: 60rpx;
  border-radius: 6rpx;
  width:112rpx;
  font-size:24rpx;
  color:#666;
  text-align: center;
  background: #f5f5f5;
}
.container .choose-size .box .size .items .size-active{
  background: #4e5059;
  color:#fff;
}
.container .choose-size .box .yongjin-grade{
  height:228rpx;
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
  margin-top:48rpx;
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
    height:64rpx;
    margin-top:20rpx;
    position: relative;
    width:100%;
}
.container .search .inp{
    position: absolute;
    left:30rpx;
    top:0;
    width:544rpx;
    background:#fff;
    height:64rpx;
    line-height:64rpx;
    white-space: nowrap;
    border:none;
    font-size: 28rpx;
    color:#333;
    padding-left:20rpx;
    border-radius: 6rpx 0 0 6rpx;
}
.container .search .clear{
    position: absolute;
    right:116rpx;
    top:0;
    height: 64rpx;
    width:60rpx;
    display: flex;
    z-index: 9; 
    border-radius:0 6rpx 6rpx 0;
    background: #fff;
    justify-content: center;
    align-items: center;
}
.container .search .clear .img{
    height: 48rpx;
    width:48rpx;
    display: block;
}
.container .search .txt{
    position: absolute;
    right:0;
    top:0;
    height: 64rpx;
    width:116rpx;
    line-height: 64rpx;
    font-size:28rpx;
    color:#333;
    text-align: center;
    padding-left:28rpx;
}
.container .history{
    margin-top:56rpx;
    height:28rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.container .history .l{
    font-size:28rpx;
    color:#999;
    margin-left:30rpx;
}
.container .history .r{
    font-size:28rpx;
    color:#999;
    margin-right:30rpx;
}
.container .history-con{
    min-height:108rpx;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin:24rpx 0 32rpx;
    padding-left:6rpx;
    box-sizing: border-box;
}
.container .history-con .item{
    padding:18rpx 22rpx;
    font-size:24rpx;
    height:24rpx;
    line-height: 24rpx;
    color:#666;
    margin-left:24rpx;
    margin-bottom:16rpx;
    background: #fff;
    border-radius: 6rpx;
    white-space: nowrap;
}
.container .hot{
    margin:24rpx 0;
    height:28rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.container .hot .l{
    font-size:28rpx;
    color:#999;
    margin-left:30rpx;
}
.container .hot .r{
    font-size:28rpx;
    color:#999;
    margin-right:30rpx;
}
.container .hot-con{
    min-height:108rpx;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin:24rpx 0 32rpx;
    padding-left:6rpx;
    box-sizing: border-box;
}
.container .hot-con .item{
    padding:18rpx 32rpx;
    font-size:24rpx;
    height:24rpx;
    color:#666;
    margin-left:24rpx;
    margin-bottom:16rpx;
    background: #fff;
    border-radius: 6rpx;
    white-space: nowrap;
}
.container .tip{
    position: absolute;
    top:104rpx;
    left: 0;
    min-height:600rpx;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    z-index: 99;
    width:100%;
    background: #f2f2f2;
}
.container .tip .p2{
    font-size:28rpx;
    color:#888;
    min-height: 42rpx;
    line-height:42rpx;
    padding:0 95rpx;
    text-align: center;
    width:560rpx;
}
.container .tip .p1{
    font-size:40rpx;
    height: 56rpx;
    line-height:56rpx;
    color:#000;
    margin:40rpx 0 30rpx;
}
.container .tip .img{
    height: 200rpx;
    width:200rpx;
    display: block;
    margin-top:96rpx;
}
.container .search-res{
    position: absolute;
    top:104rpx;
    left: 0;
    width:100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    min-height:89rpx;
    background: #fff;
    z-index: 99;
}
.container .search-res .item{
    width:100%;
    height: 89rpx;
}
.container .search-res .item .txt{
    width:700rpx;
    margin-left:30rpx;
    padding-left:20rpx;
    border-bottom:1rpx solid #eee;
    height: 88rpx;
    line-height:88rpx;
    font-size:28rpx;
    color:#666;
}
.lists{
  display: flex;
  flex-wrap: wrap;
  width:750rpx;
  margin: 0 auto;
  justify-content: space-between;
  background: #f2f2f2;
  padding-top: 20rpx;
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





.mask{
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index: 99;
    background: #fff;
}
.mask .content{
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.mask .content .header{
    width:93px;
    height:93px;
    margin-bottom:25px;
}
.mask .content .middle{
    font-size:20px;
    color:#000;
    height:28px;
    line-height: 28px;
    margin-bottom:15px;
}
.mask .content .footer{
    font-size: 14px;
    color:#888;
    height: 20px;
    line-height: 20px;
}
</style>
