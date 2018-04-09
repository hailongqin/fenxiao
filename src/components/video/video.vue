<template>
	<view>
		<!--<view @tap="showVideo">
	  		<image style="width: 100%;" src="{{imgSrc}}" />
  		</view>-->
  		
  		<view class="ui-video" @tap="showVideo">
		    <image src="{{poster}}" class="poster"></image>
		    <image src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAArlBMVEXX19fQ0NDW1tb////T09PS0tLW1tYAAADX19fR0dHe3t7i4uL////T09PT09PZ2dn////W1tbT09Po6Ojs7Oz////w8PD////////i4uLg4ODp6enl5eXf39/////////////29vb19fXz8/Pq6urf39/////////g4ODd3d3////////////////////5+fn////////////////////z8/P////////5+fn7+/tADHeGAAAAN3RSTlNNLEPbPzhHAE4xYW/+Oz1Q7Eo1krH63jSzeGubgmfEZwj889KfbPQjale4Fz5G0NwsnaCBfr8E+12dhgAAAjNJREFUSMel1ml7ojAQAOBJIDTBDSCHQMH7aLWHvXyG/v8/trq7LMKAVp2v8DIkmUwCdyTiz8TwIsTIM5LPmD5vkvh9hcUgDPI0zYNwUODqPT5JXl5xltlcKaEdRwuluJ3N8PWlkzyMcL70lWnB/7BM5S/nOHpoJ2OcDZnuS6iF7Gs2nOG4jSQYKAEVqBAIFWBCyMQobFZlaGZidmFM6mTiFVzJUlAjFS+8SY0YhSNcOBGucArjmCTfnAhi+HdSkTHaighilI3jkjxhxiScDckyfPpHRlNm/YRYbDr6S55xKI6F5LzDiCE+/yHGgNU/tl6LjhViA+NA3vBRH79guQZmwmkzUj/i2558TP0+HIXTwxC3a9WWqO9PP/YkWqjaQ7OHruth7pvUSLWI7iBG24QGWTK9wLn0gSDTxhi+Cm41yb1pqWGEqeJNY/HiCzYDBZSAFGaIO4vsBjXYgBG2EpBc9fBXT1myTkIDvEC0EpDgWzsMTV4zIvAgynU7OSTy02Lr1oaq8wgwdboISM12jQl1UjxBZF/ZHqalqEjnj0lHZzh3fZCNH+sa/j7FeouBMEtQDb9jkqXpB2WhkUluW8qlo+QcF1ofAFnK1oKxWY6eXa4iKRhSlk66egwxNMsUtCxp8duIq/sqBSl+usWAZ2G/Kke6xehGlqBFlYJuZNIuSJB2QZoSCdKULm59VzTYy9v45YfF5UfSFQffDcdrGZszh/jtV4XzF5KLrz23Xq6uuML9Bn/rUTH81g3uAAAAAElFTkSuQmCC" class="icon"></image>
	  	</view>
	  	
		<view class="v-dialog" hidden="{{!isplay}}">		 	
			<view class="dialog-f pos-r">
				<video id="{{myVideo}}" wx:if="{{isLook}}" class="kcvideo" src="{{url}}" controls="true"></video>
			</view>
			<view class="dialog-del pos-a" @tap="delVideo">x</view>
		</view> 		
	</view>	
</template>
<script>
export default{
  editorConfig: {
    url: {
      el: ['text'],
      label: '请输入视频地址',
      type: String,
      value: 'http://video.vdongchina.com/vdong',
      director : 'Input'
    },
    poster: {
      el: ['uploader'],
      label: '替换视频封面',
      type: String,
      value: 'https://image.vdongchina.com/M00/00/42/ZSUkmVl_6nGEcd7cAAAAALxCc6s588.png',
      director : 'uploader',
      tip: "推荐视频封面尺寸750*450"
    }
  },
  props: {
    url: {
      default: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
      type: String
    },
    poster: {
      default: 'https://image.vdongchina.com/M00/00/42/ZSUkmVl_6nGEcd7cAAAAALxCc6s588.png',
      type: String
    }
  },
  data () {
  	let rm = Math.floor(Math.random() * 10000)
    return {
    	isplay:false,
    	isLook:true,
    	myVideo: 'vd' + rm
    }
  },
  onReady(e) {
  	this.videoCtx = wx.createVideoContext(this.myVideo)
  },
  methods: {
	showVideo() {
		this.isplay = true
		this.videoCtx.play()
	},
 	delVideo() {
	  this.isplay = false
	  this.videoCtx.seek(0)
	  this.videoCtx.pause()
	} 
  }
}

</script>
<style scoped>
.v-dialog {
position:fixed;
z-index:1000;
width:100%;
height:100%;
top:0;
left:0;
background:#000000;
}
.pos-r {
  position: relative;
}
.pos-a{
	position: absolute;
}
.dialog-f {
width:100%;
height:360rpx;
-webkit-transition:all 1s ease;
-moz-transition:all 1s ease;
-ms-transition:all 1s ease;
-o-transition:all 1s ease;
transition:all 1s ease;
-webkit-transition:-webkit-transform .3s;
transition:-webkit-transform .3s;
transition:transform .3s;
transition:transform .3s,-webkit-transform .3s;
position:relative;
top:50%;
left:0;
webkit-transform:translate(0, -50%);
transform:translate(0, -50%);
}
.play-tip{
	position:absolute;
	bottom:-90rpx;
	left: 50%;
	padding:10rpx 20rpx;
	color: #ffffff;
	border-radius: 28rpx;
	background-color: rgba(0,0,0,0.7);
	webkit-transform: translate(-50%,0);
    transform: translate(-50%,0);
    z-index: 1001;
	transition: opacity 2s;
    -webkit-transition: opacity 2s;
}
.kcvideo{
	width:100%;
	height: 360rpx;

}
.dialog-del{
	width:48rpx;
	height:48rpx;
	border-radius: 50%;
	border: 2rpx #ffffff solid;
	bottom:66rpx;
	left:50%;
	margin-left: -24rpx;
	font-size:38rpx;
	line-height:40rpx;
	color: #ffffff;
	z-index: 1001;
	text-align: center;
}	
.ui-video{
  position: relative;
  height: 450rpx;
}
.ui-video .video{
  vertical-align: top;
}
.ui-video .poster{
  width: 100%;
  height: 450rpx;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}
.ui-video .icon{
  width: 100rpx;
  height: 100rpx;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -50rpx 0 0 -50rpx;
  z-index: 2;
}
</style>
