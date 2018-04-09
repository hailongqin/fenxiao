<template>
	<!--<contact-button type="default-light" Msgtype="{{currentSrc}}" size="20"session-from="weapp">
	 		<image class="img" open-type="contact" mode="aspectFit" style="{{'height:' + height + 'px;width:'+width+'px'}}" src="{{currentSrc}}"/></image>			
	</contact-button>-->
	<button open-type="contact" class="kefu" session-from="{{appid}}">
		
		<image class="img" mode="aspectFit" style="{{'height:' + height*2+'rpx;width:'+width*2+'rpx'}}" src="{{currentSrc}}"/></image>
	</button>
 
</template>

<script>
export default{
  editorConfig: {
    height: {
      el: ['number'],
      label: '调整图片高度',
      type:'Number',
      value: '55',
      director : 'Fsize'
    },
    width: {
      el: ['number'],
      label: '调整图片宽度',
      type:'Number',
      value: '55',
      director : 'Fsize'
    },
    currentSrc: {
      el: ['uploader'],
      label: '上传图片',
      type: 'String',
      value: 'http://image.vdongchina.com/M00/00/35/ZSUkmVl6l06ELLCrAAAAALKZXAc823.png',
      director : 'uploader'
    }
  },
  props: {
    width :{
      default: '55',
      type :String
    },
    height: {
      default: '55',
      type: String
    },
    currentSrc: {
      default: 'http://image.vdongchina.com/M00/00/35/ZSUkmVl6l06ELLCrAAAAALKZXAc823.png',
      type: String
    }
  },
  data(){
  	return{
  		appid:this.$root.appid 		
  	}
  },
  methods: {

  }
}

</script>

<style scoped>
  .img{
    margin: 0 auto;
    display: block;   
    z-index: 9999;
  }
  .kefu{
  	position: fixed;
    right: 10rpx;
    bottom: 200rpx;
  	background: rgba(0,0,0,0);
  	border:none;
  	margin: 0;
  	padding: 0;
  	z-index: 999;
  	border-radius: 0;
  }
 	.kefu::after{
 		content: none;
 	}
</style>
