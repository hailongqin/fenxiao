<template>
    <view @tap="itemTapHandler(currentToNew.to)" style="{{'color: '+ color +';display:'+ display +';z-index:' + zIndex + ';padding-top:'+ spacing[0]*2+ 'rpx;padding-right:'+spacing[1]*2 + 'rpx;padding-bottom:'+ spacing[2]*2 + 'rpx; padding-left:'+ spacing[3]*2 + 'rpx;'+ position+'width:'+(!txtwidth|| txtwidth==0?'auto':txtwidth*2+'rpx')}}" class="wx-text">
    	<rich-text nodes="{{text}}" wx:if="{{text!=''&&text!='<p><br></p>'&&text!='<p></p>'}}"></rich-text>
    </view>
</template>
<script>
export default{
  editorConfig: {
    text: {
      el: ['textarea'],
      label: '请输入文本',
      type: 'String',
      value: '',
      director : 'editor'
    },
    txtwidth:{
      label:'文本自定义宽度',
      type:'Number',
      value:0,
      director :'txtwidth'
    },
    positionxy:{
      label:'位置定位',
      type:'Array',
      value:[],
      director :'positionxy'
    },    
    color: {
      el: ['text', 'color'],
      label: '请输入颜色',
      type: 'String',
      value: '#303030',
      director : 'ColorPicker'
    },
    spacing: {
      el: ['number'],
      label: '调整间距',
      type: 'Array',
      value: [0,0,0,0],
      director : 'spacing'
    },
    currentToNew: {
      el: ['navtor'],
      label: '选择跳转',
      type : Object,
      newlink:"",
      value : {
          to: '',
          code: ''
      },
      director:{'java':'redirectNew','php':'redirectNewB'}
    }
  },
  comName:"文本",
  props: {
    text: {
      default: '',
      type: String
    },
    txtwidth:{
      type:Number,
      default:0
    },    
    color: {
      default: '#303030',
      type: String
    },
    display:{
      default:'block',
      type:String
    },
    position:{
      default:'',
      type:String
    },
    positionxy:Array,
    zIndex :{
      default:null,
      type: Number
    },
    spacing: {
      default:function(){
        return [0,0,0,0]
      },
      type:Array
    },
    currentToNew:{
      type: Object,
      default: function(){
        return {
          to:"",
          code:''
          }
      }
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
  .wx-text{
    display: block;
  }
  .wx-text i,.wx-text em{
    font-style: italic!important;
  }
</style>
