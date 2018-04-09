<template>
<view class="container">
    <view class="_contant clear bmg">
        <view class="left _contant_grade">总分</view>
        <view class="left clear">
            <view class="left clear _contant_stars">
                <view data-item="0" class="_contant_star left" @tap="clickImg">
                     <view><image class="_contant_star_image" src="http://image.vdongchina.com/M00/03/3B/ZSUkmVngILmEGWGfAAAAAA8wcFU969.png"> </image></view>
                     <view class="_contant_s" wx:if="{{current > -1}}"><image class="_contant_s_image" src="http://image.vdongchina.com/M00/03/3B/ZSUkmVngII6EPf32AAAAAKJBglU396.png"> </image></view>
                </view>
                <view data-item="1" class="_contant_star left" @tap="clickImg">
                     <view><image class="_contant_star_image" src="http://image.vdongchina.com/M00/03/3B/ZSUkmVngILmEGWGfAAAAAA8wcFU969.png"> </image></view>
                     <view class="_contant_s" wx:if="{{current > 0}}"><image class="_contant_s_image" src="http://image.vdongchina.com/M00/03/3B/ZSUkmVngII6EPf32AAAAAKJBglU396.png"> </image></view>
                </view>
                <view data-item="2" class="_contant_star left" @tap="clickImg">
                     <view><image class="_contant_star_image" src="http://image.vdongchina.com/M00/03/3B/ZSUkmVngILmEGWGfAAAAAA8wcFU969.png"> </image></view>
                     <view class="_contant_s" wx:if="{{current > 1}}"><image class="_contant_s_image" src="http://image.vdongchina.com/M00/03/3B/ZSUkmVngII6EPf32AAAAAKJBglU396.png"> </image></view>
                </view>
                <view data-item="3" class="_contant_star left" @tap="clickImg">
                     <view><image class="_contant_star_image" src="http://image.vdongchina.com/M00/03/3B/ZSUkmVngILmEGWGfAAAAAA8wcFU969.png"> </image></view>
                     <view class="_contant_s" wx:if="{{current > 2}}"><image class="_contant_s_image" src="http://image.vdongchina.com/M00/03/3B/ZSUkmVngII6EPf32AAAAAKJBglU396.png"> </image></view>
                </view>
                <view data-item="4" class="_contant_star left" @tap="clickImg">
                     <view><image class="_contant_star_image" src="http://image.vdongchina.com/M00/03/3B/ZSUkmVngILmEGWGfAAAAAA8wcFU969.png"> </image></view>
                     <view class="_contant_s" wx:if="{{current > 3}}"><image class="_contant_s_image" src="http://image.vdongchina.com/M00/03/3B/ZSUkmVngII6EPf32AAAAAKJBglU396.png"> </image></view>                   
                </view>
            </view>
            <view class="left">{{level}}</view>
        </view>
    </view>
    <view class="_contant bmg margint">
        <view class="_contant_title clear">
            <view class="_contant_head left"><image class="_contant_head_image" src="{{avatarUrl}}"></image></view>
            <view class="_contant_name left">{{nickName}}</view>
        </view>
        <view class="_contant_text margint clear">
            <view class="left _contant_txt">
                <textarea class="weui-textarea" @input="inputText" placeholder="有什么想对商家说的可以在这里说哦~"/>          
            </view>
            <view class="left _contant_upload" @tap="chooseImage">
                <image class="_contant_upload_image" src="http://image.vdongchina.com/M00/03/39/ZSUkmVngEeKEYDP-AAAAAJ5FJec041.png"></image>
            </view>
            <view class="_contant_uploadimg" >
            	<view wx:for="{{images}}" wx:key="uploadimg">
	                <view class="_contant_uploadimgs">
	                <image class="_contant_uploadimgs_image" class="_contant_img" src="{{item.url}}"></image>
	                <image class="close" src="http://image.vdongchina.com/M00/03/3C/ZSUkmVngJ7mEdMVfAAAAAAhS0dE738.png" @tap="remove" data-index="{{index}}"></image>
	                </view>           
                </view>
            </view>
        </view>
    </view>

    <view class="issue_contant" @tap="subPraise">发布评价</view>
</view>	
</template>

<script>
	export default {
		config: {
			"navigationBarTitleText": "评价"
		},	
		data() {
			return {
			    current:-1,
			    level:"满意度" ,
			    inputText:'',
			    files:[],  //评价图片 
			    avatarUrl: '',
				nickName: '',
				images:[]
			}
		},
		onLoad() {
			var that = this
			wx.getUserInfo({
				success: function(res) {
					that.avatarUrl = res.userInfo.avatarUrl
					that.nickName = res.userInfo.nickName
				}
			})

		},
		methods: {
//		  clickImg:function(e){		
//		    this.current=e.currentTarget.dataset.item
//		    switch (this.current) {		    	
//		      case '0':{
//		        return this.level="不满意"
//		      }
//		      case '1':{
//		        return this.level="不满意"
//		      }
//		      case '2': {
//		        return this.level="基本满意"
//		      }
//		      case '3': {
//		        return this.level="很满意"
//		      }
//		      case '4': {
//		        return this.level="超出期待"
//		      }
//		    }
//		
//		  },
//		  inputText(e){
//		  	this.inputText = e.detail.value
//		  },
//		  chooseImage(e) {		
//		    var that = this		    
//		    if (that.images.length <= 4) {
//		      wx.chooseImage({
//		        count: 5 - that.images.length,
//		        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
//		        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
//		        success: function (res) {
//		          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
//		         //that.files = that.files.concat(res.tempFilePaths)		         
//		         wx.uploadFile({
//		         	url: "http://upload.vdongchina.com/",
//		         	filePath:res.tempFilePaths[0],
//		         	name:'file',
//		         	success: function(data){		         		
//		         		var imageUrl = JSON.parse(data.data)
//		         		var img = 'http://image.vdongchina.com/'+ imageUrl.fileid			         		
//		         		that.images.push({"url":img})
//		         		that.images = that.images
//		         	}
//		        })
//		        }
//		      })
//		    } else {
//		      wx.showToast({
//		        title: '您上传的图片太多了',
//		        icon: 'loading',
//		        duration: 2000
//		      })
//		    }
//		
//		  },
//
//		  remove(e) {
//		    var index = e.currentTarget.dataset.index;
//		    var images = this.images;
//		    var array = [];
//		    for (var i = 0; i < images.length; i++) {
//		      if (i != index) {
//		        array.push(images[i])
//		      }
//		      this.images=array
//		    }
//		  },	
//		  subPraise(){		  	
//			
//			var that = this
//			if(that.current == -1){
//				wx.showToast({
//				  title: '请打分',
//				  duration: 1000
//				})	
//				return false
//			}
//			if(that.inputText == ''){
//				wx.showToast({
//				  title: '请评论',
//				  duration: 1000
//				})	
//				return false
//			}	
//			if(that.images.length == 0){
//				wx.showToast({
//				  title: '请上传评论图片',
//				  duration: 1000
//				})	
//				return false
//			}				
//			wx.request({				
//			  url: that.$root.apiServer + that.$root.appid + "/basic/api/comment/submit",
//			  data: {
//			  	ordId:2,//订单id
//			  	ordCode:'111111',//订单编号
//				itemId:1,	//项目id
//				itemTitle:1,	//项目编号
//				technicianId:1,	//技师id
//				technicianName:'美甲',	//技师名称
//				storeId:1,	//分店id
//				storeName:'沙县',	//分店名称	
//				providerId:1,	//商铺id	
//				providerName:'沙县小吃',	//商铺名称	
//				userId:1,//用户id	
//				userHeadImg:that.avatarUrl,	//用户头像	
//				userNickname:that.nickName,//用户昵称	
//				starNum:that.current,	//星星数量	
//				starName:that.level,	//星星数对应的称号	
//				content:that.inputText,	//内容	
//				images:that.images	//评论图片数组				
//			  },
//			  method:"POST",
//			  header: {
//			      'content-type': 'application/json'
//			  },
//			  success: function(res) {
//			  	if(res.data.success == true){
//			  		console.log('提交评论成功')
//			  	}					
//			  }			  
//			})			  	
//		  }
		}
	}	
</script>

<style scoped>
._contant{padding: 30rpx;font-size: 30rpx;color: #111111;line-height: 48rpx}

._contant_grade{margin-right: 50rpx}
._contant_stars{margin-right: 70rpx}
._contant_star{width: 52rpx;height: 48rpx;margin-right: 20rpx;position: relative}
._contant_star_image{width: 52rpx;height: 48rpx}
._contant_s{position: absolute;left: 0;top: 0}
._contant_s_image{width: 52rpx;height: 48rpx}

._contant_head{width: 80rpx;height: 80rpx;border-radius: 50%;border:solid 2rpx #f8f8f8}
._contant_head_image{width: 80rpx;height: 80rpx;border-radius: 50%;}
._contant_name{margin-left: 30rpx;line-height: 80rpx}

/*._contant_text{margin-bottom: 20rpx}*/
._contant_txt{width: 512rpx;height: 88rpx;background: #f7f7f7;border-radius: 8rpx;padding: 20rpx}
._contant_txt textarea{width: 100%;height: 88rpx;font-size: 28rpx}
._contant_upload{width: 128rpx;height: 128rpx;background: #f7f7f7;border-radius: 8rpx;margin-left: 10rpx}
._contant_upload_image{width: 44rpx;height: 36rpx;margin:42rpx 46rpx}
._contant_uploadimg{display: flex;justify-content: flex-start;width: 100%;clear: both;padding-top: 19rpx;}
._contant_uploadimgs{position: relative}

._contant_img{width: 120rpx;height: 120rpx;padding: 0 9rpx;}

.close{position: absolute;top: 0;right: 9rpx;width: 30rpx;height: 30rpx;}


.issue_contant{width: 100%;height: 88rpx;text-align: center;background: #ff4c90;color: #fff;font-size: 30rpx;line-height: 88rpx;position: fixed;bottom: 0}
	
</style>