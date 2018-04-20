<template>
    <view>
    	<view class="o_lists">
            <view class="o_item" wx:for="{{orderList}}" @tap="toDetail(item.id)">
                <view class="o_left">
                    <view class="o_activity">活动名称：{{title}}</view>
                    <view class="o_order">预约时间：{{item.createTime}}</view>
                </view>
                <view class="o_right">
                    <image class="o_arrow" src="http://image.vdongchina.com/M00/12/C9/ZSUkmVrYglaEd7S8AAAAAIZTr30222.png"></image>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
export default {
    config: {
        "navigationBarTitleText": "单个预约列表"
    },
    data() {
        return {
           title: '',
           orderList: [],
           formId: '',
           pageSize: 10,
           currentPage: 1,
           pages: 0,
           temps: [],
           detailsList: []
        }
    },
    onLoad (e) {   
        var that = this 
        that.title = e.title
        that.formId = parseInt(e.id)
        that.listLoading()
    },
    methods: {
        listLoading(){
	    	var that = this
	        wx.request({
	            url:that.$root.apiServer + that.$root.appid + that.$root.variate + '/basic/plugin/form/content/obtain',
	            data:{
                    formId: that.formId,
	                token: that.$root.globalData.token,
	                pageSize:that.pageSize,
	                pageNum:that.currentPage
	            },
	            method:"GET",
	                header: {
	                'content-type': 'application/x-www-form-urlencoded'
	            },
	            success: function(res) {
		            if(res.data.success){
                        that.temps = res.data.temps
                        var list = res.data.formContent.list
                        var allList = []
                        for (var i=0; i<res.data.formContent.list.length; i++) {
                            for(var k in res.data.formContent.list[i].details){
                                allList.push(res.data.formContent.list[i].details[k])
                            }
                        }
                        var singleList = []
//                      list.forEach(function(item,index,array){
//                          array[index] = {
//                              firstImage:item.imageList[0].url,
//                              name:item.name,
//                              productId:item.productId
//                          }
//                      });
//                  return    
                        that.pages = res.data.formContent.pages
                        that.orderList = that.orderList.concat(list)
                        that.detailsList = that.detailsList.concat(allList)
                        that.currentPage += 1
					} else {
                        wx.showToast({
                            title: "网络异常！",
                            icon: "loading",
                            duration: 2000
                        });
                    }
	            }
	        })    	
	    },			
				
		onReachBottom() {
			if(this.currentPage <= this.pages) //当前将获取的页码不超过总页数		        
			{
				this.listLoading()
			}
		},	
        toDetail(id){
            let soleList = []
            for (var i=0; i<this.detailsList.length; i++) {
                if(this.detailsList[i].contentId == id){
                    soleList.push(this.detailsList[i])
                }
            }
            soleList = JSON.stringify(soleList)
            wx.navigateTo({
            	url: '../order_succ/order_succ?id=' + id + '&temps=' + JSON.stringify(this.temps) + '&soleList=' + soleList,
            })
        }
    }
}	
</script>
<style scoped>
page {
    height: 100%;
    width:100%;
    background: #f2f2f2;
}
.o_lists{
    width:100%;
    height:100%;
    overflow: scroll;
    background: #f2f2f2;
}
.o_item {
    height: 130rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    margin-bottom:10rpx;
}
.o_left{
    width:600rpx;
    height:130rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}
.o_activity{
    margin-left:25rpx;
    font-size: 32rpx;
    height:32rpx;
    line-height: 32rpx;
    color:#000000;
    margin-bottom: 22rpx;
}
.o_order{
    margin-left: 25rpx;
    font-size: 24rpx;
    height:24rpx;
    line-height: 24rpx;
    color:#333333;
}
.o_right{
    width:150rpx;
    display: flex;
    height:130rpx;
    justify-content: center;
    align-items: center;
}
.o_arrow{
    padding-left:30rpx;
    width: 40rpx;
    height:60rpx;
    display: block;
}
</style>

