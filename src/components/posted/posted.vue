<template>
	  <view class="posted" @tap="posted" style="width:110rpx; height:110rpx;"  wx:if="{{communityToggle}}">
	    <image class="posted_img" src="http://image.vdongchina.com/M00/03/2F/ZSUkmVnfD1yEOjKYAAAAAMx-qbU906.png" style="width:98rpx; height:98rpx;" mode="aspectFit"/>
	  </view>
</template>


<script>
export default {
  editorConfig: {
    
  },
  comName:"评论",
  props: {
      
  },
  methods: {
    posted() { //发帖
        wx.navigateTo({
            url: '../posted/posted',
        })
    },
  },
  data() {
      return {
          communityToggle:true, //判断是否有社区功能
        //flag:''
      }
  },
  onLoad() {
    var that = this
    wx.request({
        url: this.$root.apiServer + this.$root.appid+ '/basic/community/app/special/getSpecial',
        method:'GET',
        data: {
            cloudAppId:this.$root.appid
        },
        header:{
            'content-type': 'application/json'
        },
        success(res){
            console.log(res)
            if (res.data.object.examine == 2) {
                that.communityToggle = true
               // that.flag = 1
            } else {
                that.communityToggle = false
                //that.flag = 2
            }
        },
        fail(){
            that.communityToggle = true
            //that.flag = 1
        }

    })  
  } 
}

</script>

<style scoped>
  /*.posted{
    background: rgba(0,0,0,0);
  	border:none;
  	margin: 0;
  	padding: 0;
    z-index: 999;
    border-radius: 0;
  }
  .posted::after{
 		content: none;
 	}
  .posted_img{
    margin: 0 auto;
    display: block;
  }
  */
 .posted {
    position: fixed;
    bottom: 150rpx;
    right: 40rpx;
    z-index: 9999999;
}

.posted_img {

} 
</style>
