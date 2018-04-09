<template>
    <swiper @change="swiperChange" style="{{'height:' + height*2 + 'rpx'}}" indicator-dots="{{indicatorDots}}" indicator-color="{{indicatorColor}}" indicator-active-color="{{indicatorActiveColor}}" autoplay="{{autoplay}}" interval="{{interval}}" duration="{{duration}}" current="{{current}}" circular="{{circular}}">
        <swiper-item wx:for="{{swiperSlides}}" wx:key="url">
            <image style="{{'height:' + height*2 + 'rpx;width:100%'}}"  src="{{item.url}}" @tap="itemTapHandler(item.to)" ></image>
        </swiper-item>
    </swiper>
</template>

<script>
export default {
  editorConfig: {
    height: {
      el: ['number'],
      label: '调整轮播图整体高度',
      type: 'Number',
      value: '315',
      director: 'Fsize',
      tip:'ps:建议尺寸为300左右'
    },
    indicatorDots: {
      label : '是否显示面板指示点',
      type : 'Boolean',
      value : true ,
      director : 'switch'
    },
    indicatorColor:{
      label:'轮播指示点颜色',
      type:'String',
      value:'rgba(0, 0, 0, .3)',
      director: 'ColorPicker'
    },
    indicatorActiveColor:{
      label:'轮播选中的指示点颜色',
      type :'String',
      value : '#000000',
      director : 'ColorPicker'
    },
    swiperSlides: {
      el: ['slider'],
      label: '图片填充',
      type: 'slider',
      value: [
        {
          url: 'http://image.vdongchina.com/M00/00/B7/ZSUkmVmbqe2Ef5EJAAAAAHrp8co145.png',
          to: '',
          code: ''
        },
        {
          url: 'http://image.vdongchina.com/M00/00/B7/ZSUkmVmbqe2Ef5EJAAAAAHrp8co145.png',
          to: '',
          code: ''
        }
      ],
      director: 'slider'
    }
  },
  comName:"轮播图",
  props: {
      height: {
        default: '315',
        type:String
      },      
      swiperSlides: {
        default:function(){
        	return  [
	          {
	            url: 'http://image-dev.vdongchina.com/group2/M00/00/01/wKgfyFkK1GaENjB5AAAAAHrp8co482.png',
	            to: '',
	            code: ''
	          },
	          {
	            url: 'http://image-dev.vdongchina.com/group2/M00/00/01/wKgfyFkK1GaENjB5AAAAAHrp8co482.png',
	            to: '',
	            code: ''
	          }
	        ]
        },
        type: Array
      },
      indicatorDots: {
          type: Boolean,
          default: true
      },
      indicatorColor: {
          type: String,
          default: 'rgba(225, 8, 37, 1)'
      },
      indicatorActiveColor: {
          type: String,
          default: '#ffffff'
      },
      autoplay: {
          type: Boolean,
          default: true
      },
      current: {
          type: Number,
          default: 0
      },
      interval: {
          type: Number,
          default: 5000
      },
      duration: {
          type: Number,
          default: 500
      },
      circular: {
          type: Boolean,
          circular: false
      }
  },
  methods: {
      swiperChange (e) {
          this.$emit('change', e)
      },
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
