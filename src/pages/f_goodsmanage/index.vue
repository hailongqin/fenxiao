<template>
  <view class="container">
      <scroll-view scroll-y class="con">
          <view class="goodslist" wx:for="{{goodsLists}}" wx:key="index">
            <view class="left">
                <image class="img" src="{{item.imageList[0].url}}"></image>
                <view class="txt">{{item.name}}</view>
            </view>
            <view class="right">
                <switch checked="{{item.type}}" @change="switchChange(item.productId, $event)"/>
            </view>
          </view>
		  <view class="f_bottom_tips" wx:if="{{displayFlag && listFlag}}">我是有底线的</view>
      </scroll-view>
  </view>
</template>

<script>
export default {
    config: {
        "navigationBarTitleText": "商品管理"
    },
    data () {
        return {
            goodsLists:[],
            len: 0,
            pageSize:10,
            currentPage:1,
			pages:0,
			displayFlag:0,
			listFlag:0
        }
    },
    onLoad(){
        var that = this
        that.gg()
//      wx.request({
//          url:that.$root.apiServer + that.$root.appid + that.$root.variate + '/basic/client/distribution/product/listPage',
//          data:{
//              token: that.$root.globalData.token,
//              pageSize:10,
//              currentPage:1,
//              pid:that.$root.globalData.pid
//          },
//          method:"POST",
//              header: {
//              'content-type': 'application/x-www-form-urlencoded'
//          },
//          success: function(res) {
//	            if(res.data.code =="200"){
//	                var goodsLists = res.data.object.productListByPage.list
//	                that.loadShow(goodsLists);
//	            }
//          }
//      })
   },
    methods:{
	    gg(){
	    	var that = this
	        wx.request({
	            url:that.$root.apiServer + that.$root.appid + that.$root.variate + '/basic/client/distribution/dUserProduct/listProductPage',
	            data:{
	                token: that.$root.globalData.token,
	                pageSize:that.pageSize,
	                currentPage:that.currentPage,
	                pid:that.$root.globalData.pid
	            },
	            method:"POST",
	                header: {
	                'content-type': 'application/x-www-form-urlencoded'
	            },
	            success: function(res) {
		            if(res.data.code =="200"){
		                var list = res.data.object.list;
		                
//                      list.forEach(function(item,index,array){
//                          array[index] = {
//                              firstImage:item.imageList[0].url,
//                              name:item.name,
//                              productId:item.productId
//                          }
//                      });
//                  return    
						that.pages = res.data.object.pages;
		                that.goodsLists = that.goodsLists.concat(list);
		                that.loadShow(that.goodsLists);	 
		                that.currentPage += 1;
					}
					that.listFlag = 1
	            }
	        })    	
	    },			
				
		onReachBottom() {
			console.log(this.currentPage,this.pages)
			if(this.currentPage <= this.pages) //当前将获取的页码不超过总页数		        
			{
				this.gg()
			}else{
				this.displayFlag = 1
				console.log(this.displayFlag,"1111")
			}
		},			
		loadShow (goodsLists){
			var that = this
			wx.request({
	            url:that.$root.apiServer + that.$root.appid + that.$root.variate + '/basic/client/distribution/dUserProduct/isShow',
	            data:{
	                token: that.$root.globalData.token,
	                productId:goodsLists[that.len].productId
	            },
	            method:"POST",
	            header: {
	                'content-type': 'application/x-www-form-urlencoded'
	            },
	            success: function(res) {
	                goodsLists[that.len].type = res.data.object
	                that.len++
	                if(that.len<goodsLists.length){
	                	that.loadShow(goodsLists)
	                }else{
	                	that.goodsLists = goodsLists
                        console.log(that.goodsLists,"end")
	                }
	            }
	        })
		},
	    switchChange(productId, e){
	    	var that =this,type = e.detail.value
	        var goodType
	        if(type){
	            goodType = 0
	        }else{
	            goodType = 1
	        }
	        wx.request({
	            url:this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/dUserProduct/setShow',
	            data:{
	                token: this.$root.globalData.token,
	                productId:productId,
	                type:goodType
	            },
	            method:"POST",
	                header: {
	                'content-type': 'application/x-www-form-urlencoded'
	            },
	            success: function(res) {
	                if(res.data.code =="200"){
	                }
	             }
	        })
	    }
    }
}
</script>

<style scoped>
.f_bottom_tips{
	height:42rpx;
	line-height: 42rpx;
	font-size:28rpx;
	text-align: center;
	color:#888888;
	margin:20rpx 0;
}
page{
    height:100%;
}
.left{
    float:none;
}
.right{
    float:none;
}
.container{
    background: #f2f2f2;

}
.container .con{
}
.container .goodslist{
    display: flex;
    height:160rpx;
    background: #fff;
    justify-content: space-between;
    align-items: center;
    margin-top:30rpx;
    box-sizing:border-box;
    border-top:1rpx solid #e5e5e5;
    border-bottom:1rpx solid #e5e5e5;
}
.container .goodslist .left{
    height:100rpx;
    width:540rpx;
    margin-left:30rpx;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.container .goodslist .left .img{
    height: 100rpx;
    width:100rpx;
    border-radius: 5rpx;
}
.container .goodslist .left .txt{
    margin-left:20rpx;
    flex:1;
    font-size:28rpx;
    line-height: 34rpx;
    height:68rpx;
    overflow:hidden;
    text-overflow: ellipsis;
    display:-webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient:vertical;
    color:#535353;
    margin-bottom:32rpx;
}
.container .goodslist .right{
    flex:1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right:20rpx;
}
</style>
