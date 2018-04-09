<template>
 <view class="_lookover bmg" @tap="clickLookover" style="{{'background:'+bgColor}}">
  	<view style="{{'color:'+titColor+';font-size:'+fontSize*2+'rpx;margin-top:'+mt*2+'rpx;margin-bottom:'+mb*2+'rpx;'}}">{{text}}</view>
  </view>
</template>

<script>
export default{
  editorConfig: {
  	bgColor: {
      el: ['text', 'color'],
      label: '设置组件背景色',
      type: 'String',
      value: '#ffffff',
      director : 'ColorPicker'
    },
    text: {
			el: ['textarea'],
			label: '请输入文本',
			type: 'String',
			value: '查看更多改商户项目',
			director: 'Input'
		},
    titColor: {
      el: ['text', 'color'],
      label: '设置文字颜色',
      type: 'String',
      value: '#FF4C90',
      director : 'ColorPicker'
    },
    fontSize: {
			el: ['number'],
			label: '调整字号',
			type: 'Number',
			value: '16',
			director: 'Fsize'
		},
     mt: {
      el: ['number'],
      label: '设置顶部外边距',
      type: 'Number',
      value: '0',
      director: 'Fsize'
    },
     mb: {
      el: ['number'],
      label: '设置底部外边距',
      type: 'Number',
      value: '0',
      director: 'Fsize'
    }
  },
  comName:"更多项目",
  props: {
		bgColor: {
      default: '#ffffff',
      type: String
    },
    text: {
			default: '查看更多改商户项目',
			type: String
    },
    fontSize: {
			default: '16',
			type: String
		},
    titColor: {
      default: '#FF4C90',
      type: String
    },
    mt: {
      default: '0',
      type:String
    },
    mb: {
      default: '0',
      type:String
    }
  },
  methods: {
      //跳转更多商户
      clickLookover(){
        wx.navigateTo({
          url: '../secondPagesStore/secondPagesStore'
        })
      },
  }
}

</script>

<style scoped>
._lookover {line-height:88rpx;text-align:center;color:#FF4C90;font-weight:bold;font-size:28rpx;}
.margint {margin-top:20rpx;}
.bmg {background:#fff;}
</style>
