<template>
	<view>
		<view class="topLine"></view>
		<view class="inputCont">			
			<view class="inputInp">
					<input type="text" style="padding-left:2em;font-size:30rpx ;" confirm-type="search"  @input="bindKeyInput" placeholder="请输入搜索内容" focus @confirm="searchSubmit"/>
					<view class="search"><image class="searchImg" src="http://image.vdongchina.com/M00/03/3A/ZSUkmVngHmWEVDylAAAAAK2-1Ts656.png"></image></view>		
			</view>		
			<view class="cancel" @tap="searchSubmit">搜索</view>
		</view>	
		<view class="history">
			<view class="clear">
				<view class="left">历史搜索</view>
				<view class="right" @tap="del">清除</view>
			</view>	
			<view class="clear">
				<view class="hisItem left" wx:for="{{searchHistory}}" wx:key="gg">
					<view @tap="cliHistory(item.keyword,item.status)">{{item.keyword}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
    config: {
        navigationBarTitleText: '搜索'
    },		
	data(){
		return{
			status:"",
			searchHistory:[],
			inputValue:''
		}
	},
	onLoad(e){
		var that = this
		that.status = e.type	
		console.log(that.status)
		var state = this.status==1?2:1
		wx.request({
            url: that.$root.apiServer+that.$root.appid+'/basic/api/searchHistory/search/history',
            data: {
				token: that.$root.globalData.token,
                type : state,
                num : 5,
            },
            method: 'post',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success (res) {	            	
            	that.searchHistory = res.data.searchHistory 
            }
       })
	},
	methods:{
    	cancel() {
    		wx.navigateBack()
    	},
    	del(){
    		var that = this
    		var state = this.status==1?2:1
    		wx.request({
	            url: that.$root.apiServer+that.$root.appid+'/basic/api/searchHistory/search/delete',
	            data: {
					token: that.$root.globalData.token,
	                type : state
	            },
	            method: 'post',
	            header: {
	                'content-type': 'application/x-www-form-urlencoded'
	            },
	            success (res) {
	            	that.searchHistory = []
	            }
	       })
    	},
		  bindKeyInput: function(e) {
		    this.inputValue=e.detail.value
		  },    	
    	searchSubmit(e){   	
    		if(this.inputValue){
 	          	wx.navigateTo({
	              	url: '../searchPage/searchPage?title=' + this.inputValue +'&status='+this.status
	          	})
    		}			   		
    	},
 		cliHistory(keyword){
 			wx.navigateTo({
              	url: '../searchPage/searchPage?title=' + keyword+'&status='+this.status
          })
 		}    	
	}
}	
</script>
<style scoped>
	.inputCont{padding: 16rpx 30rpx;position: relative;}
	.inputInp{width: 600rpx;height:60rpx;background:#ffffff;border-radius: 10rpx;overflow: hidden;position: relative;background: #f6f6f6}
	input{width: 100%;height: 100%;}
	.search{position: absolute;left:10rpx;top: 10rpx;width: 40rpx;height:40rpx;}
	.searchImg{width: 40rpx;height: 40rpx;}
	.cancel{position: absolute;right: 30rpx;top: 0;line-height: 92rpx;font-size: 30rpx;}
	.history{padding:0 30rpx;line-height: 60rpx;font-size: 24rpx;color: #666666;}
	.hisItem{background: #f6f6f6;padding: 10rpx 20rpx;margin-right: 20rpx;border-radius: 10rpx;color: #111111;}
</style>