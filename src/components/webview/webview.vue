<template>
	<viwe wx:if="{{text !== ''}}"><web-view src="{{text}}"></web-view></viwe>
    <view wx:else class="web-div">该功能只能展示在小程序当中</view>
    
</template>
<script>
export default{
  editorConfig: {
      text: {
      el: ['textarea'],
      label: '请输入网址',
      type: 'String',
      tip:'<a href="http://note.youdao.com/noteshare?id=e6bf8ee388ed2b4e3c4652b2fb848095">操作说明</a>',
      value: '',
      director : 'linkInput'
    }
  },
  comName:"网页容器",
  props: {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
    text: {
      //default: 'https://xiaochengxu.vdongchina.com/2LmmiCKOL2.txt',
      default:'',
      type: String
    },
  }   
}

</script>
<style scoped>
  /*.wx-text{
    display: block;
  }*/
  .web-div{
    height: 615px;
    font-size: 18px;
    line-height: 615px;
    text-align: center;
  }
</style>
