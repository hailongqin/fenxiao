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
           title: '',//--活动名称唯一
           orderList: [],//--目的为了获取预约活动创建时间及已预约活动列表每一项对应的id
           formId: '',//--当前活动的id
           pageSize: 10,//--已预约活动列表单页个数
           currentPage: 1,//--已预约活动列表从第一页开始查询
           pages: 0,//--查询已预约列表总共的页数
           temps: [],//--表单必填项对应的名字
           detailsList: []//--表单必填项对应的数据
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
                        //--为了避开返回数据对象内有以数字作为参数名的尴尬情况，筛选出需要的数据放在一个指定的数组中备用
                        for (var i=0; i<res.data.formContent.list.length; i++) {
                            for(var k in res.data.formContent.list[i].details){
                                allList.push(res.data.formContent.list[i].details[k])
                            }
                        }
                        var singleList = []
                        that.pages = res.data.formContent.pages
                        that.orderList = that.orderList.concat(list)
                        that.detailsList = that.detailsList.concat(allList)//--筛选后的有效数据
                        that.currentPage += 1
                        console.log(that.orderList,that.detailsList)
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
            //--选出单次预约必选项对应的数据
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

