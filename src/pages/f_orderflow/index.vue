<template>
	<view class="page">
		<view class="topLine"></view>
		<view class="contant">
			<view class="cont-title" wx:if="{{flowFlag}}">
				<view class="cont-top">
					<view class="txt">快递公司:{{shipCompanyName}}</view>
					<view>快递单号:{{shipDeliveryCode}}</view>
					<view class="btn" @tap="contBtn">复制</view>
				</view>
			</view>
			<view class="cont-back">
				<view class="clear" wx:if="{{traces.length && flowFlag}}">
					<view wx:for="{{traces}}" wx:key="gg" class="right cont-items">		
						<view class="cont-news"></view>
						<view class="cont-item">
							<view>								
								<view class="cont-info">
									<view class="name">{{item.acceptStation}}</view>
									<view class="time">{{item.acceptTime}}</view>										
								</view>	
							</view>
						</view>					
					</view>
				</view>	
				<view wx:if="{{flowFlag}}" style="min-height: 80rpx;line-height: 80rpx;text-align: center;">{{info}}</view>
			</view>
		</view>
	</view>	
</template>

<script>
export default {
	config: {
        navigationBarTitleText: '查看物流'
    },
    data () {
        return {   
        	logistics:[],
        	traces:[],
        	shipCompanyName:'',//物流名称
        	shipDeliveryCode:'',//单号
        	status:0,
			info:'',
			flowFlag:0
        }
    },
	onLoad (options) {
		var that = this
		console.log("111111111111111")
		wx.showLoading({
			title: '正在拼命加载中',
		})
		console.log("2222222222222222222")
		wx.request({
			url: this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/order/queryExpress',				
			data: {
				token: getApp().globalData.token,
                expressId: options.expressId,
                pid:that.$root.globalData.pid
			},
			method: 'GET',
			header: {
                'Content-Type': 'application/json'
			},
			success (res) {
				let data = res.data.object
				if(res.data.code == "200"){
					wx.hideLoading()
                	if(data.express.expressCompanyName  !== null){
                		that.shipCompanyName = data.express.expressCompanyName 
                	}else{
                		that.shipCompanyName = "暂无"
                	}
					if(data.express.expressCode !== null){
                		that.shipDeliveryCode = data.express.expressCode
                	}else{
                		that.shipDeliveryCode = "暂无"
                	}

					that.logistics = JSON.parse(data.result)
					
	               // that.logistics = JSON.parse(data.shipDeliveryInfo)
	                if(that.logistics && that.logistics.traces && that.logistics.traces.length){
	                that.traces = that.logistics.traces.reverse()  	
	                }else{
	                	that.info = "暂无物流信息"
					}
					that.flowFlag = 1
				}else{
					wx.hideLoading()
					that.shipCompanyName ="由于外部技术问题，暂无物流信息"
					that.shipDeliveryCode ="暂无"
					that.info = "暂无物流信息"
					that.flowFlag = 1
				}
              
			}
		})   
    }, 
  	methods: {
  		contBtn(){
  			if(this.shipDeliveryCode !=='暂无'){
	 			 wx.setClipboardData({
				  data:this.shipDeliveryCode ,
				  success: function(res) {
				    wx.getClipboardData({
				      success: function(res) {
                        wx.showToast({
                            title:'复制成功',
                            mask:true,
                            duration: 1000
                        })	
				      }
				    })
				  }
				})  				
  			}else{
	            wx.showModal({
	                title: '提示',
	                content:'暂无单号',
	                showCancel:false,                
	            })  				
  			}
			
  		}
  	}
}

</script>

<style scoped>
page{background: #fff;}	
.contant{font-size: 30rpx;background: #f2f2f2; color: #262626;}
.cont-title{padding: 30rpx;background: #fff;position: relative;}
.cont-title .btn{position: absolute;right: 30rpx;bottom:16rpx;width: 146rpx;height: 50rpx;border-radius: 6rpx;border:solid 2rpx #999999;text-align: center;line-height: 50rpx;font-size: 26rpx;}
.cont-top{font-size: 28rpx;line-height: 28rpx;}
.cont-top .txt{margin-bottom: 20rpx;}

.cont-back{padding: 30rpx;background: #fff;margin-top: 20rpx;color: #999;}
.cont-items{border-left:1rpx #cfcfcf solid;position:relative;}
.cont-items:first-child{border-left: none;color: #333; }
.cont-items:first-child:before{content:""; position:absolute; left:-1rpx; bottom:0; height:50%; width:1rpx; background-color:#cfcfcf}
.cont-items:last-child{border-left: none; }

.cont-items:last-child:before{content:""; position:absolute; left:-1rpx; top:0; height:50%; width:1rpx; background-color:#cfcfcf}

.cont-news{width: 20rpx;height: 20rpx;position: absolute;left:-10rpx;top:50%;margin-top: -10rpx;background: #cfcfcf;border-radius: 50%;}
.cont-items:first-child .cont-news{width: 24rpx;height: 24rpx;background: #4ECC80;border:4rpx solid #cfcfcf;left:-16rpx;top:50%;margin-top: -16rpx;}


.cont-item{padding: 30rpx 30rpx 30rpx 0;border-bottom: #E7E7E7 2rpx solid;margin-left: 40rpx;}
.cont-items:last-child .cont-item{border-bottom: none;}
.cont-info{width: 600rpx;}
.cont-info .name{line-height: 36rpx;font-size: 28rpx;}
.cont-info .time{font-size: 24rpx;line-height: 24rpx;margin-top: 16rpx;}

</style>