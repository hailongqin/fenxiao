<template>
<view class="container">
    <view class="_add_cant clear bmg">
        <view class="_cant_door left "  data-idx="0" @tap="navbarTap">
              <view class="{{currentTab==0 ? 'active _cant_item' : '_cant_item'}}">
                <view class="_cant_doorimg" wx:if="{{currentTab==1}}"><image class="_cant_doorimg_image" src="http://image.vdongchina.com/M00/03/2E/ZSUkmVnfBAWES4ZMAAAAAE1tnKk550.png"></image></view>
                <view class="_cant_doorimg" wx:else><image class="_cant_doorimg_image" src="http://image.vdongchina.com/M00/03/2E/ZSUkmVnfA9GEcFvzAAAAAFCgZ_o767.png"></image></view>
                <view class="_cant_txt">匠星上门</view>
              </view>  
        </view>
        <view class="_cant_shop right "  data-idx="1" @tap="navbarTap">
              <view class="{{currentTab==1 ? 'active _cant_item' : '_cant_item'}}">
                <view class="_cant_shopimg" wx:if="{{currentTab==0}}"><image class="_cant_shopimg_image" src="http://image.vdongchina.com/M00/03/2E/ZSUkmVnfBJaEfcrPAAAAAM58BuM734.png"></image></view>
                <view class="_cant_shopimg" wx:else><image class="_cant_shopimg_image" src="http://image.vdongchina.com/M00/03/2E/ZSUkmVnfBGCEIxXRAAAAAIN43DA763.png"></image></view>
                <view class="_cant_txt">顾客到店</view>    
             </view>       
        </view>
    </view>
    <view class="margint bmg">
        <view class="goods_list" wx:if="{{currentTab==0}}">
            <radio-group class="group" @change="checkboxChange">
                <view class="clear goods_item"   wx:for="{{addss}}" wx:key="gg">
                      <view class="goods_text left">
                          <view class="goods_title">{{item.title}}</view>
                          <view class="goods_address">{{item.address}}</view>
                      </view>
                      <view class="goods_check right" >
                          <radio value="{{item.uuid}}" checked="{{item.checked}}"></radio>   
                          <view class="label-icon">
                              <view class="{{item.checked ? 'opac1 label_icon_checked' :'label_icon_checked'}}">
                                <image class="label_icon_checked_image" src="http://image.vdongchina.com/M00/03/30/ZSUkmVnfFxeEBe4CAAAAAIoEfoI864.png"></image>
                              </view>
                          </view>                
                      </view>

                      <!--<view class="goods-del" data-id="{{item.historyid}}" @tap="del"></view>-->
                  </view>
              </radio-group>
        </view>
        <view class="goods_list" wx:if="{{currentTab==1}}">
            <radio-group class="group" @change="checkboxChange">
                <view class="clear goods_item"   wx:for="{{items}}" wx:key="gg">
                      <view class="goods_text left">
                          <view class="goods_title">{{item.title}}</view>
                          <view class="goods_address">{{item.address}}</view>
                      </view>
                      <view class="goods_check right" >
                          <radio value="{{item.uuid}}" checked="{{item.checked}}"></radio>   
                          <view class="label-icon">
                              
                              <view class="{{item.checked ? 'opac1 label_icon_checked' :'label_icon_checked'}}">
                                <image class="label_icon_checked_image" src="http://image.vdongchina.com/M00/03/30/ZSUkmVnfFxeEBe4CAAAAAIoEfoI864.png"></image>
                              </view>
                          </view>                
                      </view>

                      <!--<view class="goods-del" data-id="{{item.historyid}}" @tap="del"></view>-->
                  </view>
              </radio-group>
        </view>
    </view>
    <view wx:if="{{currentTab==0}}" class="_add_btn">添加新地址</view>
</view>	
</template>

<script>
	export default {
		config: {
			"navigationBarTitleText": "选择服务地址"
		},	
		data() {
			return {
			    currentTab: 1,
			    checked: null,
			    address:'',
			    items:[
			      { uuid: 300, title: "coffee(罗蒙环球城店111)", address:"浙江省宁波市罗蒙环球城银泰城5F",checked:true},
			      { uuid: 400, title: "VOX.coffee(南部商务区店222)", address: "浙江省宁波市南部商务区汇港大厦1F",checked:false }
			    ],
			    addss:[
			      { uuid: 300, title: "coffee(罗蒙环球城店111)", address: "浙江省宁波市罗蒙环球城银泰城5F",checked:true },
			      { uuid: 400, title: "VOX.coffee(南部商务区店222)", address: "浙江省宁波市南部商务区汇港大厦1F",checked:false }    
			    ],			
			}
		},
		methods: {
			  navbarTap(e) {
			    this.currentTab=e.currentTarget.dataset.idx
			  },
			  
			  checkboxChange(e) {
			    var checked = e.detail.value
			    var changed = {}
			    var address = ''
                var itemsArr  = this.items
                var addssArr  = this.addss
                if(this.currentTab ==1){
                     for (var i = 0; i < this.items.length; i++) {     
			      if (checked.indexOf((this.items[i].uuid).toString()) !== -1) {
			        itemsArr[i].checked = true
			        address = itemsArr[i].title
			      } else {
			        itemsArr[i].checked = false
			      }
			    }
                this.items = itemsArr
                }else{
                     for (var i = 0; i < addssArr.length; i++) {     
			      if (checked.indexOf((addssArr[i].uuid).toString()) !== -1) {
			        addssArr[i].checked = true
			        address = addssArr[i].title
			      } else {
			        addssArr[i].checked = false
			      }
			    }
                 this.addss = addssArr
                }
			    this.changed = changed
			    this.address=address
			  }		
		}
	}	
</script>

<style scoped>
.opac1{opacity: 1;}	
._add_cant{padding-top: 40rpx;text-align: center}
._cant_door,._cant_shop{width:374rpx;}
._cant_door{border-right: 2rpx #f7f7f7 solid}

._cant_item{margin-left: 126rpx;width: 120rpx}
._cant_txt{padding-bottom: 10rpx;border-bottom: 4rpx dashed #fff}

.active ._cant_txt{border-bottom: 4rpx solid #FF4C90;color: #FF4C90}

._cant_doorimg{width: 80rpx;height: 76rpx;margin-bottom: 20rpx;margin-left: 20rpx}
._cant_doorimg_image{width: 80rpx;height: 76rpx}
._cant_shopimg{width: 80rpx;height: 72rpx;margin-bottom: 20rpx;margin-left: 20rpx}
._cant_shopimg_image{width: 80rpx;height: 72rpx}



.goods_item{border-bottom:1rpx solid #f8f8f8;padding: 30rpx }
.goods_check{position: relative;margin-top: 30rpx}
radio{opacity: 0;position: absolute;left: 0;top: 0;width: 50rpx;height: 50rpx;z-index: 99}
.goods_title{color: #111111;font-size: 30rpx;line-height: 42rpx}
.goods_address{line-height: 40rpx;color: #999999;font-size: 28rpx;margin-top: 20rpx}



.label-icon {position: relative;margin-right: 10px;display: inline-block;vertical-align: middle;width: 40rpx;height: 40rpx; border:solid 2rpx #c8c8c8;border-radius: 50%;}

.label_icon_checked { position: absolute;top:0;left:0;width:40rpx; height: 40rpx;opacity: 0;}

.label_icon_checked_image{width: 40rpx;height: 40rpx}


._add_btn{position: fixed;width: 750rpx;bottom: 0;left: 0;background: #FF4C90;height: 100rpx;line-height: 100rpx;text-align: center;color: #fff;font-size: 32rpx}
</style>