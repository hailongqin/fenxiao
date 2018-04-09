<template>
	<view>  
		<image class="img" mode="scaleToFill" style="{{'height:' + height*2 + 'rpx;width:'+width+'%;'+position+'z-index:'+zIndex+';padding-top:'+ spacings[0] + ';padding-right:'+spacings[1]+ ';padding-bottom:'+ spacings[2] + '; padding-left:'+ spacings[3] + ';'}}" src="{{currentSrc}}" @tap="itemTapHandler(currentToNew.to)"></image>
	</view>
</template>

<script>
export default {
  editorConfig: {
    height: {
      el: ['number'],
      label: '调整图片高度',
      type:'Number',
      value: '315',
      director : 'Fsize'
    },
    width: {
      el: ['number'],
      label: '调整图片宽度',
      type:'Number',
      value: '100',
      director : 'Fsize'
    }, 
    currentSrc: {
      el: ['uploader'],
      label: '上传图片',
      type: 'String',
      value: 'http://image-dev.vdongchina.com/group2/M00/00/01/wKgfyFkK1GaENjB5AAAAAHrp8co482.png',
      director : 'uploader'
    },
    // currentTo: {
    //   el: ['navtor'],
    //   label: '选择跳转页面',
    //   type: 'String',
    //   value: '',
    //   director : 'redirect'
    // },
    currentToNew: {
      el: ['navtor'],
      label: '选择跳转页面',
      type : Object,
      newlink:"",
      value : {
          to: '',
          code: ''
      },
      director : 'redirectNew'
    },    
    spacing: {
      el: ['number'],
      label: '调整间距',
      type: 'Array',
      value: [0,0,0,0],
      director : 'spacing'
    }
  },
  props: {
    currentToNew:{
      type: Object,
      default: function(){
        return {
          to:"",
          code:''
          }
      }
    },  	
    width :{
      default: '100',
      type :String
    },
    height: {
      default: '315',
      type: String
    },
    currentSrc: {
      default: 'http://image-dev.vdongchina.com/group2/M00/00/01/wKgfyFkK1GaENjB5AAAAAHrp8co482.png',
      type: String
    },
    // currentTo: {
    //   default: '',
    //   type: String
    // },
    position:{
      default:"",
      type: String
    },
    zIndex :{
      default:null,
      type: Number
    },
    spacing: {
      default:function(){
        return [0,0,0,0]
      },
      type:Array
    }
  },
  data(){
     var spacings = []
      for (var i = 0; i < this.spacing.length; i++) {
        if (this.spacing[i] == 0) {
          spacings[i] = this.spacing[i] + 'px';
        } else {
          spacings[i] = this.spacing[i] * 2 + 'rpx';
        }
      }
      return {
        spacings: spacings
      } 
  },
  methods: {
    itemTapHandler (to) {
      	if (!to || typeof to !== 'string') return
	    if(to.indexOf('appid=')!==-1){
	      var path = to.split('appid=')[0]
	      var appid = to.split('appid=')[1]
	      wx.navigateToMiniProgram({
	        appId: appid,
	        path: path
	      })
	    }else{
	      wx.navigateTo({
	        url: to
	      })
	    }
    }
  }
}
</script>

<style scoped>
  .img{
    margin: 0 auto;
    display: block;
    box-sizing: border-box;
  }
</style>
