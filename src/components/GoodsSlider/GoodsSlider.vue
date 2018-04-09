<template>
	    <swiper @change="swiperChange" style="{{'height:' + height*2+'rpx'}}" indicator-dots="{{indicatorDots}}" indicator-color="{{indicatorColor}}" indicator-active-color="{{indicatorActiveColor}}" autoplay="{{autoplay}}" interval="{{interval}}" duration="{{duration}}" current="{{current}}" circular="{{circular}}">
	        <swiper-item wx:for="{{swiperSlides}}" wx:key="url">
	          <image style="{{'height:' + height*2+'rpx;width:100%'}}" src="{{item.url}}"></image>
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
      director: 'Fsize'
    },
    indicatorDots: {
      label : '是否显示面板指示点',
      type : 'Boolean',
      value : true ,
      director : 'switch'
    },
    indicatorColor:{
      label:'轮播点颜色',
      type:'String',
      value:'rgba(213,43,136,1)',
      director: 'ColorPicker'
    }
  },
  data(){
  	return {
  		swiperSlides: [
	          {
	            url: 'http://image-dev.vdongchina.com/group2/M00/00/01/wKgfyFkK1GaENjB5AAAAAHrp8co482.png',
	            to: ''
	          },
	          {
	            url: 'http://image-dev.vdongchina.com/group2/M00/00/01/wKgfyFkK1GaENjB5AAAAAHrp8co482.png',
	            to: ''
	          }
	        ]
  	}
  },
  props: {
      height: {
        default: '315',
        type:String
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
	onLoad (options) {
	  var app = this.$root
	  if(app.globalData){
	    var that = this
	    this.version = app.globalData.appName
	    wx.request({
	      url: this.$root.apiServer+ this.$root.appid + '/basic/api/product/uuid',
	      data: {
	        uuid: options.id
	      },
	      method: 'GET',
	      header: {
	        'content-type': 'application/json'
	      },
	      success (res) {
	        if (res.data.code == '100') {
            that.swiperSlides = res.data.data.bannerImgs
            console.log(that.swiperSlides)
	        }
	      }
	    })
	  }
  },
  // onShow(){
  //   this.swiperSlides =[]
  // },
  methods: {
      swiperChange (e) {
          this.$emit('change', e)
      },
      itemTapHandler (to) {
          if (!to || typeof to !== 'string') return
          wx.navigateTo({
              url: to
          })
      }
  }
}
</script>