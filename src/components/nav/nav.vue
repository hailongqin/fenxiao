<template>
	<view style="{{'background:' + bgColor}}" class="bottom-navs" id="nav" wx:if="{{hidden}}">
      <view class="nav-item" wx:for="{{navs}}" wx:key="to">
        <view wx:if="{{active==index && item.to!=='kefu'}}" @tap="itemTapHandler(item.to)">
          <image src="{{item.activeUrl}}" style="{{'height:' + size*2+'rpx; width:' + size*2+'rpx'}}" class="nav-icon"></image>
          <text style="{{'color:' + activeColor }}" class="nav-text">{{item.text}}</text>
        </view>

        <view wx:if="{{active!==index && item.to!=='kefu'}}" @tap="itemTapHandler(item.to,index)">
          <image src="{{item.url}}" style="{{'height:' + size*2+'rpx; width:' + size*2+'rpx'}}" class="nav-icon"></image>
          <text style="{{'color:' + color }}" class="nav-text">{{item.text}}</text>
        </view>
		
	    <button  open-type="contact" class="kefu" wx:if="{{item.to=='kefu'}}" session-from="{{appid}}">
	        <image src="{{item.url}}" style="{{'height:' + size*2+'rpx; width:' + size*2+'rpx'}}" class="nav-icon"></image>
	        <text :style="'color:'+color" class="nav-text">{{item.text}}</text>
	    </button>
      </view>
    </view>
</template>
<script>
	export default {
	  editorConfig: {
	    fixed:{
	      label:'导航位置',
	      type:'String',
	      value:'bottom',
	      director:'radio2'
	    },
	    hidden:{
	      label:'底部导航显示与否',
	      type:'Boolean',
	      value:true,
	      director : 'switch'
	    },	    
	    color: {
	      el: ['text', 'color'],
	      label: '文本初始颜色',
	      type: 'String',
	      value: '#000',
	      director : 'ColorPicker'
	    },
	    activeColor: {
	      el: ['text', 'color'],
	      label: '文本选中颜色',
	      type: 'String',
	      value: '#38adff',
	      director : 'ColorPicker'
	    },
	    bgColor: {
	      el: ['text', 'color'],
	      label: '导航背景色',
	      type: 'String',
	      value: '#f7f7fa',
	      director : 'ColorPicker'
	    },
	    size: {
	      el: ['number'],
	      label: '图标尺寸设定',
	      type: 'Number',
	      value: '27',
	      director: 'Fsize'
	    },
	    navs: {
	      el: ['navigation'],
	      label: '图片填充',
	      type: 'navigation',
	      value: [
	        {
	            text: '首页',
	            url: 'http://image.vdongchina.com/M00/00/B7/ZSUkmVmbvwaEJusMAAAAABh0uRY923.png',
	            activeUrl: 'http://image.vdongchina.com/M00/00/B8/ZSUkmVmbvw6ESqIOAAAAALEJgTo719.png',
	            to: '',
	            code: ''
          	},
          	{
	            text: '客服',
	            url: 'http://image.vdongchina.com/M00/00/B8/ZSUkmVmbvz2EaQl3AAAAANpYvKA331.png',
	            activeUrl: 'http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv0KEJc-SAAAAAN0ThAI854.png',
	            to: '',
	            code: ''
          	},
          	{
	            text: '购物车',
	            url: 'http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv2KEPMfBAAAAAInFaaE694.png',
	            activeUrl: 'http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv2eEeDyxAAAAAPgfdec987.png',
	            to: '',
            	code: ''
          	},
          	{
	            text: '我的',
	            url: 'http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv3mESU8_AAAAAM9rVBU163.png',
	            activeUrl: 'http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv3-ELsyiAAAAAHyl0bU181.png',
	            to: '',
	            code: ''
          	}
	      ],
	      director: 'navigation'
	    }
	  },
	  props: {
	      fixed: {
	        default: 'bottom',
	        type: String
	      },
	      hidden:Boolean,
	      bgColor: {
	        default: '#f7f7fa',
	        type: String
	      },
	      color: {
	        default: '#000',
	        type: String
	      },
	      activeColor: {
	        default: '#38adff',
	        type: String
	      },
	      size: {
	        default: '27',
	        type:String
	      },
	      navs: {
	        default:function(){
	         	return [
		          {
		            text: '首页',
		            url: 'http://image.vdongchina.com/M00/00/B7/ZSUkmVmbvwaEJusMAAAAABh0uRY923.png',
		            activeUrl: 'http://image.vdongchina.com/M00/00/B8/ZSUkmVmbvw6ESqIOAAAAALEJgTo719.png',
		            to: '',
		            code: ''
		          },
		          {
		            text: '客服',
		            url: 'http://image.vdongchina.com/M00/00/B8/ZSUkmVmbvz2EaQl3AAAAANpYvKA331.png',
		            activeUrl: 'http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv0KEJc-SAAAAAN0ThAI854.png',
		            to: '',
		            code: ''
		          },
		          {
		            text: '购物车',
		            url: 'http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv2KEPMfBAAAAAInFaaE694.png',
		            activeUrl: 'http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv2eEeDyxAAAAAPgfdec987.png',
		            to: '',
		            code: ''
		          },
		          {
		            text: '我的',
		            url: 'http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv3mESU8_AAAAAM9rVBU163.png',
		            activeUrl: 'http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv3-ELsyiAAAAAHyl0bU181.png',
		            to: '../myorder/myorder',
		            code: ''
		          }
		        ]
	        },
	        type: Array
	      }
	  },
	  data () {
	    return {
				active: null,
				appid:this.$root.appid
	    }
	  },
	  methods: {	

	    itemTapHandler (to,index) {
//	        if(to == "../orderList/orderList" || to == "../car/car" || to == "../personCenter/personCenter"){
//		        wx.navigateTo({
//		            url: to
//		        })	        	
//	        }else{
	        if(to == "../orderList/orderList" || to == "../car/car"){
		        wx.navigateTo({
		            url: to
		        })	        	
	        }else{	
		        wx.redirectTo({
		            url: to
		        })	        	
	        }
	    }
	  },
	  computed: {
	    curPage () {
	    	if(typeof this.$store == 'object')
	      return this.$store.state.curPage
	    }
	  },
	  onLoad () {	  	
	    var that = this
	    var navData = this.navs
	    var isExit = false // 存在对象没
	    var pageName 
	    if(typeof this.$store == 'object'){ //说明在编辑器里编辑
	      pageName = this.$store.state.pageName
	    }else if(typeof window == 'object'){  // H5
	      pageName = window.location.href.split('#/')[1].split('/')[0]
	    }else if(typeof getCurrentPages == 'function'){ // 小程序
      		pageName = getCurrentPages()[getCurrentPages().length-1].__route__.split('/')[1]
	    }
	    navData.forEach(function(item,idx){
	      if(item.to !=''&&item.to.split('/').pop()==pageName){
	        that.active = idx
	        isExit = true
	      }
	    });
	    !isExit&&(this.active=null)
	  },
	  watch:{
	    navs(){
	      this.onLoad ()
	    }
	  }	  
	}
</script>
<style scoped>
.bottom-navs{
  padding: 8rpx 0 6rpx;
  box-sizing: border-box;
  border-top: 2rpx solid #ccc;
  display: flex;
  position:fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 999;
}
.bottom-navs .nav-item{
  flex: 1;
  text-align: center;
}
.bottom-navs .nav-icon{
  vertical-align: top;
}
.bottom-navs .nav-text{
  font-size: 20rpx;
  display: block;
  height: 22rpx;
  line-height: 22rpx;
	margin-top: 11rpx;
}
.txt-c{
  text-align:center;
  font-size:32rpx;
  padding:20rpx;
}
.bottom-navs .kefu{
  background: rgba(0,0,0,0);
  border:none;
  margin: 0;
  padding: 0;
  border-radius: 0;
  font-size: 0;
  display: inline-block;
  height: 100%;
  vertical-align: top;
}
.bottom-navs .kefu::after{
  content: none;
}
</style>