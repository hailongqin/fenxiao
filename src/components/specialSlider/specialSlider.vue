<template>
    <swiper @change="swiperChange" style="{{'height:' + swiperSlides.height*2 + 'rpx'}}" indicator-dots="{{swiperSlides.open==1}}"  indicator-color="{{swiperSlides.pointColor}}" indicator-active-color="{{swiperSlides.checkedPointColor}}" autoplay="{{autoplay}}" interval="{{interval}}" duration="{{duration}}" current="{{current}}" circular="{{circular}}">
        <swiper-item wx:for="{{swiperSlides.carouselImgs}}" wx:key="url" style="{{'height:' + swiperSlides.height*2 + 'rpx;width:100%'}}">
            <image mode="scaleToFill" src="{{item.fullImg}}" style="{{'height:' + swiperSlides.height*2 + 'rpx;width:100%'}}" @tap="itemTapHandler(item.link,item.appid)" class="carousel"/></image>
        </swiper-item>
    </swiper>
</template>

<script>
export default {
  editorConfig: {
    value: {
      label :'轮播图列表',
      type: Number,
      value: 0,
      director: 'carousel'
    }
  },
  comName:"特殊轮播",
  props: {
    value:{
      default:function(){
        return 0
      },
      type:Number
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
  data () {
    return {
        swiperSlides: {}
    }
  },
  methods: {
      swiperChange (e) {
          this.$emit('change', e)
      },
      itemTapHandler (to,appid) {
          if(appid){
            wx.navigateToMiniProgram({
              appId: appid,
              path: to
            })
          }else{
            if (!to || typeof to !== 'string') return
            wx.navigateTo({
                url: to
            })
          }
      },
      loadData (id) {
        var that = this
        wx.request({
            url: this.$root.apiServer+this.$root.appid+'/basic/api/carousel/single',
            method: 'POST',
            data:{
                id:id
            },
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success (res) {
                that.swiperSlides = res.data.carousel
            }
        })
    }
  },
  onLoad () {
    var that = this
    if(that.value == 0){
        wx.request({
            url: this.$root.apiServer + this.$root.appid + '/basic/api/carousel/list',
            method: 'GET',
            header: {
            'content-type': 'application/json'
            },
            success(res) {
                that.loadData(res.data.carousels[0].id)
            }
        })
    }else{
        that.loadData(that.value)
    }
  }
}
</script>
<style scoped>
.carousel{
    vertical-align: top;
}
</style>
