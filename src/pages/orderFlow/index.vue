<template>
	<view class="page">
		<view class="topLine"></view>
		<view class="contant">
			<view class="cont-title">
				<view class="cont-top clear">
					<view class="left">快递公司:{{shipCompanyName}}</view>
					<view class="right">快递单号:{{shipDeliveryCode}}</view>
				</view>
			</view>
			<view class="cont-back">
				<view class="cont-top">物流信息</view>
				<view class="clear" wx:if="{{traces.length}}">
					<view wx:for="{{traces}}" wx:key="gg" class="right cont-items">		
						<view class="cont-news"></view>
						<view class="cont-item">
							<view style="margin-left: 40rpx;">								
								<view class="cont-info">
									<view>{{item.AcceptStation}}</view>
									<view>{{item.AcceptTime}}</view>										
								</view>	
							</view>
						</view>					
					</view>
				</view>	
				<view wx:else style="min-height: 80rpx;line-height: 80rpx;text-align: center;">{{info}}</view>
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
        	info:''
        }
    },
	onLoad (options) {
		var that = this
		if(options.type =='1' ){//拼团物流
			wx.request({
				url: that.$root.apiServer+that.$root.appid + '/basic/fgroup/applet/OrdDetail?ordId='+options.id,
				method: 'POST',
                header: {'Content-Type': 'application/json'},
                success (res) {
                	console.log(res)
                	let data = res.data.obj.ord.obj;
                	if(data.shipCompanyName&&data.shipDeliveryCode){
	                	if(data.shipCompanyName !== null){
	                		that.shipCompanyName = data.shipCompanyName 
	                	}else{
	                		that.shipCompanyName = "暂无"
	                	}
						if(data.shipDeliveryCode !== null){
	                		that.shipDeliveryCode = data.shipDeliveryCode
	                	}else{
	                		that.shipDeliveryCode = "暂无"
	                	}
		                that.logistics = JSON.parse(data.shipDeliveryInfo)
		                if(that.logistics && that.logistics.Traces && that.logistics.Traces.length){
		                that.traces = that.logistics.Traces.reverse()
		                }else{
		                	that.info = "暂无物流信息"
		                }
                	}else{
                		that.shipCompanyName ="由于外部技术问题，暂无物流信息"
						that.shipDeliveryCode ="暂无"
                	}
                }
			})
		}else{//原来物流
			wx.request({
				url: that.$root.apiServer+that.$root.appid+'/basic/api/ord/ordDetail',
				data: {
					token: getApp().globalData.token,
	                ordId: options.id
				},
				method: 'POST',
				header: {
	                'Content-Type': 'application/x-www-form-urlencoded'
				},
				success (res) {
					let data = res.data.data
					if(res.data.code == "100"){
	                	if(data.shipCompanyName !== null){
	                		that.shipCompanyName = data.shipCompanyName 
	                	}else{
	                		that.shipCompanyName = "暂无"
	                	}
						if(data.shipDeliveryCode !== null){
	                		that.shipDeliveryCode = data.shipDeliveryCode
	                	}else{
	                		that.shipDeliveryCode = "暂无"
	                	}		                		                
		                that.logistics = JSON.parse(data.shipDeliveryInfo)
		                if(that.logistics && that.logistics.Traces && that.logistics.Traces.length){
		                that.traces = that.logistics.Traces.reverse()  	
		                }else{
		                	that.info = "暂无物流信息"
		                }
					}else{
						that.shipCompanyName ="由于外部技术问题，暂无物流信息"
						that.shipDeliveryCode ="暂无"
					}
	              
				}
			})   
		}
		
    },    
}

</script>

<style scoped>

.page{background: #fff;}
.contant{font-size: 30rpx;}
.cont-title{}
.cont-back{border-bottom:solid 2rpx #E7E7E7;margin-bottom: 20rpx;}
.cont-top{padding:30rpx 30rpx 30rpx 0;border-bottom:#e7e7e7 2rpx solid;margin-left: 30rpx;}
.cont-items{border-left:1rpx #cfcfcf solid;position:relative;}
.cont-items:first-child{border-left: none; }
.cont-items:first-child:before{content:""; position:absolute; left:-1rpx; bottom:0; height:50%; width:1rpx; background-color:#cfcfcf}
.cont-items:last-child{border-left: none; }
.cont-items:last-child:before{content:""; position:absolute; left:-1rpx; top:0; height:50%; width:1rpx; background-color:#cfcfcf}

.cont-news{width: 20rpx;height: 20rpx;position: absolute;left:-10rpx;top:50%;margin-top: -10rpx;background: #cfcfcf;border-radius: 50%;}
.cont-items:first-child .cont-news{width: 24rpx;height: 24rpx;background: #ff507f;border:4rpx solid #cfcfcf;left:-16rpx;top:50%;margin-top: -16rpx;}


.cont-item{padding: 30rpx 30rpx 30rpx 0;border-bottom: #E7E7E7 2rpx solid;margin-left: 40rpx;}

.cont-info{width: 600rpx;}
</style>