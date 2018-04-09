<template>
  <view clas="order">
  	<scroll-view scroll-x="true" class="navs" style="{{'background:'+bgColor}}" wx:if="{{tshow.show == 1}}">
      <view class="item-box" style="{{'padding-top:'+pt*2+'rpx;'}}">
        <view class="nav" wx:for="{{arrData}}" wx:key="id" @tap="handler(item.id,index)">
          <view wx:if="{{active==index}}" class="_item">
            <image wx:if="{{tshow.showIcon==1}}" src="{{item.fullImage}}" class="nav-icon" style="{{'width:'+tshow.iconSize*2+'rpx;height:'+tshow.iconSize*2+'rpx;margin-bottom:'+tshow.spacing*2+'rpx;'}}"></image>
            <text class="text" style="{{'margin-left:'+ marginlr*2+'rpx;margin-right:'+ marginlr*2+'rpx;font-size:' + fontSize*2+'rpx;color:'+activeColor+';padding-bottom:'+pb*2+'rpx;border-bottom-color:'+activeColor}}">{{item.name}}</text>
          </view>
          <view wx:else class="_item">
            <image wx:if="{{tshow.showIcon==1}}" src="{{item.fullImage}}" class="nav-icon" style="{{'width:'+tshow.iconSize*2+'rpx;height:'+tshow.iconSize*2+'rpx;margin-bottom:'+tshow.spacing*2+'rpx;'}}"></image>
            <text class="text" style="{{'margin-left:'+ marginlr*2+'rpx;margin-right:'+ marginlr*2+'rpx;font-size:' + fontSize*2+'rpx;color:'+color+';padding-bottom:'+pb*2+'rpx'}}">{{item.name}}</text>
          </view>
        </view>
      </view>
    </scroll-view>
    
    <view wx:if="{{lists.length>0}}" class="{{model=='2'?'lists-two lists':'lists-one lists'}}">
      <view wx:for="{{lists}}" wx:key="index">
        <view class="sitem">
          <view class="shop" @tap="toM(item.id)">
            <view class="shop_image">
              <image class="img" src="{{item.fullCover}}"  mode="aspectFill"></image>
            </view>
            <view class="shop_intro">
              <view class="shop_name">{{item.title}}</view>
              <view class="shop_time">{{item.beginTime}} 至 {{item.endTime }} </view>
              <view class="number">{{item.partQuantity}} 人已申请</view>
            </view>
          </view>
        </view>  
      </view>
      <!-- <view class="show_more" wx:if="{{total>2}}" @tap="moreTapHandler">
        更 多<image class="turn" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAeCAYAAAAl+Z4RAAAAAXNSR0IArs4c6QAAApxJREFUOBGVlc1rU0EUxfOSl1aChUTddFHowixEVBBEFwVJlRApBFpqEAlqvhfixn+iCxfiRsiHycZgjS6s0ERsa2i7sCBuutWFoAtB0KgQS9Ik/m7ISBJfmpeB4c6bOefMeXfe3Kclk8mSxWKZHBsb84VCoa+MR2pW0MfoZ+r1+jpiMh6piYBf07SPrVbrJHEtn8+7RlHQBJzNZqdwsMVwGpF3DofjcjAY/GVGSBxYwuHwZ6vVOgv5C07OVavVUqFQOGxGoO1AAXO5nLtWq23yPInYptPpvBIIBP6odaPYdqAWOIUPOLkE+RtOLlYqlZVisTiu1o1ijwMFSKfTpxEo048wt0qfTyQSdbXeHXscqIVYLLaLCy/PP+lzjJ+Wy2VdrXdHQwcKgJMLuHhNn0BkmZwEyUlDrUs0dKAAONmBOMdzFZFr5CRL7Nn0QAERQmTbZrPJx7YH+Qaukt0iQwVEJBqNbhAWEKlBjiHyQOalmRIQYDweLyEQYLiPyJ1UKnVP5nveRyaGNS7cVYSeIGJrNpszph0oYcgTjNs8SkDT8GwVuD+y+3V2TjOPjrYUiUTemn4FErcIeVmsQ75PTu7KBqYESJgf4nPwdsgPId8WsrShAplMxtdoNF6AHYf8iO8iRmy12cMEsD3Lzqv0Q2Afs/NNyE1FljjwFEjYDMSXHfIzl8t1q58sAoavAPk84DXIcolW3G73osfj2RdCf/vPAeSzkF51yCVuYGAQWcR6BCCfYk6ur5O4YbfbF7i+NQEOav8ESNgJQOv0ozjYJvopcXuDiGq+nQOO6jhHtcWkFNMdrq+Xr+y3Ah0UrVTiachvOuT32PeZJYuwThmXojnFzrtUZC93X+qg6aZD/AT6h67r8/xgvptmdoB/ATo3C+Y5jaOIAAAAAElFTkSuQmCC"/>
      </view> -->
    </view>
    <view wx:else class="lists">
      <view class="nolists">暂无数据</view>
    </view>
  </view>
</template>

<script>	
export default {
  editorConfig: {
    model:{
      label: '布局',
      type: 'Number',
      value:1,
      director : 'switchStyle'
    },
    tshow: {
      label :'分类导航显示状态',
      type: 'Object',
      value:{
        show: 1,
        cId: 1,
        showIcon: 0,
        iconSize: 40,
        spacing: 0,
        tabIds:[],
        initial: ''
      },
      director: 'order'
    },
    bgColor: {
      el: ['text', 'color'],
      label: '背景色',
      type: 'String',
      value: '#fff',
      director : 'ColorPicker'
    },
    color: {
      el: ['text', 'color'],
      label: '文本初始颜色',
      type: 'String',
      value: '#3a3a3a',
      director : 'ColorPicker'
    },
    activeColor: {
      el: ['text', 'color'],
      label: '文本选中颜色',
      type: 'String',
      value: '#38adff',
      director : 'ColorPicker'
    },
    fontSize: {
      el: ['number'],
      label: '文字大小',
      type: 'Number',
      value: '14',
      director: 'Fsize'
    },
    pt: {
      el: ['number'],
      label: '分类栏顶部间距',
      type: 'Number',
      value: '10',
      director: 'Fsize'
    },
    marginlr:{
      el: ['number'],
      label: '分类栏左右间距',
      type: 'Number',
      value: '10',
      director: 'Fsize'
    },
    pb: {
      el: ['number'],
      label: '分类栏底部间距',
      type: 'Number',
      value: '10',
      director: 'Fsize'
    }
  },
  comName:'预约',
  props: {
    model: {
      default: 2,
      type: Number
    },
    bgColor: {
      default: '#fff',
      type: String
    },
    color: {
      default: '#3a3a3a',
      type: String
    },
    activeColor: {
      default: '#38adff',
      type: String
    },
    fontSize: {
      default: '14',
      type:String
    },
    pt: {
      default: '10',
      type:String
    },
    pb: {
      default: '10',
      type:String
    },
    marginlr: {
      default: '10',
      type:String
    },
    tshow:{
      default:function(){
        return {
          show:1,
          cId:1,
          showIcon: 0,
          iconSize: 40,
          spacing: 0,
          tabIds:[],
          initial: ''
        }
      },
      type:Object
    }
  },  
  data () {
    return {
      //total: 0,
      items: [],
      active: 0,
      lists: [],
      catCid:null,   //切换栏目要用到
      arrData:this.tshow.tabIds
		}
  },
  onLoad () {
    var that = this
   	var ids = []    
    wx.request({
        url: this.$root.apiServer+ this.$root.appid +'/basic/plugin/form/category/list',
        method: 'GET',
        header: {
            'content-type': 'application/json'
        },
        success (res) {
          if(res.data.success&&res.data.list.length){
							var result = res.data.list
              var resArr = []
              var resIds = []
              result.forEach(function(item,idx){
                resIds.push(item.id)
                resArr.push({id:item.id,name:item.name,fullImage:item.fullImage})
              })

              that.tshow.tabIds && that.tshow.tabIds.forEach(function(item,idx){
                var index = resIds.indexOf(item.id)
                if(index!=-1){
                  item.name = resArr[index].name
                  item.fullImage = resArr[index].fullImage
                }else{
                  that.tshow.tabIds.splice(idx,1)
                }
              });
              
              
              that.items = resArr
              that.catCid = resArr[0].id
            if(that.tshow.show){
            	that.arrData = that.tshow.tabIds
            	if(that.tshow.tabIds.length){
	                that.tshow.tabIds.forEach(function(item,idx){
	                  ids.push(item.id+'')
	                })
	                var index = ids.indexOf(that.tshow.initial)
	                if(index!==-1){
	                  that.handler(that.tshow.initial,index)
	                }else{
	                  that.handler(that.tshow.tabIds[0].id,0)
	                }
            	}else{
            		that.handler(that.catCid,0)
            	}
            }else{
              that.handler(that.tshow.cId,0)
            }            
            if(that.tshow.tabIds && that.tshow.tabIds.length==0){
              that.arrData=res.data.list
            }
          }
        }       
    })
  },
  methods: {
     // 相当于使用过滤器的表达式
    filter(value) {
      return value.substring(0,16)
    },  	
		//补0操作  
		getzf(num){  
		    if(parseInt(num) < 10){  
		        num = '0'+num;  
		    }  
		    return num;  
		},
		toM(id){
			wx.navigateTo({
		      url: '../course_order/course_order' + '?id=' + id
		  }) 
		},
		// moreTapHandler(){
		//   wx.navigateTo({
		//       url: '../order_list/order_list?catCid='+this.catCid
		//   })
		// },
		handler (id,index) {
      this.active = index
      this.catCid = id
      var that = this     
      wx.request({
          url: this.$root.apiServer+ this.$root.appid +'/basic/plugin/form/paging',
          method: 'GET',
          data: {
            categoryId: id,
            status: 1,
            pageNum: 1,
            pageSize: 10
          },
          header: {
              'content-type': 'application/json'
          },
          success (res) {
            if(res.data.success && res.data.pagination.list.length){

              that.lists = res.data.pagination.list.filter(item => {
                return item.isOpen
              })
              that.lists = res.data.pagination.list.filter(item => {
                return item.dateStatus !== 2
              })
              //that.total = that.lists.length              
              //that.lists = that.lists.splice(0, 2)
              for(var i = 0;i<that.lists.length;i++){
              		that.lists[i].beginTime=that.filter(that.lists[i].beginTime)
              		that.lists[i].endTime=that.filter(that.lists[i].endTime)
              }
              that.lists = that.lists             
            }else{
             // that.total = 0
              that.lists = []
            }
          }
      })
    } 
  },
  watch:{
    tshow(e){
      if(e.show !=1){
        this.handler(e.cId,0)
      }else{
        // this.handler(this.catCid,0)
      if(this.tshow.tabIds.length==0){
          this.handler(this.catCid,0)
        }else{
          this.handler(this.tshow.tabIds[0].id,0)
        }
      }
    }
  } 
}
</script>

<style scoped>
.lists-two{
  display: flex;
  flex-direction: column;
 background: #FFF;
  padding:0 15px;
}
.lists-two .sitem{
  background: #FFFFFF;
  width: 100%;
  border-bottom: 1px solid #e5e5e5;
}
.lists-two .sitem .shop{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.lists-two .sitem .shop .shop_image{
  margin: 20rpx 0;
  width: 100%;
}
.lists-two .sitem .shop .shop_image .img{
  width: 100%;
  border-radius: 12rpx;
  height: 340rpx;
}
.lists-two .shop_intro{
  width: 100%;
}
.lists-two .shop_name{
  font-size: 32rpx;
  color: #333;
  height: 50rpx;
  line-height: 50rpx;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden; 
}
.lists-two .shop_time{
  color: #999999;
  font-size: 24rpx;
  height: 33rpx;
  line-height: 33rpx;
  padding: 20rpx 0;
  display: inline-block;
}
.lists-two .number{
  margin-left:49rpx;
  color: #999999;
  font-size: 24rpx;
  height: 33rpx;
  line-height: 33rpx;
  padding: 2r0px 0;
  display: inline-block;
}

.lists-two .show_more{text-align: center;line-height: 92rpx;position: relative;background: #FFFFFF;}
.lists-one{
  padding:0 15px;
  background: #fff;
}
.lists-one .sitem{display: -ms-flexbox; display: flex; -webkit-box-pack: justify; -ms-flex-pack: justify; justify-content: space-between; -webkit-box-align: center; -ms-flex-align: center; align-items: center;}
.lists-one .sitem { background-color: #fff; position: relative; padding: 34rpx 0;}
.lists-one .sitem:after,
.lists-one .sitem:before { content: " "; position: absolute; left: 0; right: 0; height: 1px; color: #e5e5e5; z-index: 2;}
.lists-one .sitem:after {bottom: 0; border-bottom: 1px solid #e5e5e5; -webkit-transform-origin: 0 100%; transform-origin: 0 100%; -webkit-transform: scaleY(.5); transform: scaleY(.5);}
.lists-one .shop{display: inline-flex;width: 100%;overflow: hidden}
.lists-one .shop_image .img{width: 200rpx;height: 200rpx;overflow: hidden;}
.lists-one .shop_intro{margin-left: 20rpx;width: 70%;height:200rpx; flex-direction: column; -webkit-box-flex: 1; -ms-flex: 1; flex: 1; display: flex; justify-content: space-between; align-items: center;}
.lists-one .shop_name{width:100%;text-align:left; line-height: 52rpx; font-size: 32rpx; color: #333; text-overflow: ellipsis; -webkit-line-clamp: 2; overflow: hidden; letter-spacing: .62px; max-height: 84rpx;white-space: nowrap;}
.lists-one .shop_time{width:100%;font-size: 24rpx; color: #999999; letter-spacing: 0.19px; margin-top: -60rpx;}
.lists-one .number{width:100%;font-size: 24rpx; color: #999999;}
.lists-one .show_more{text-align: center;line-height: 92rpx;position: relative;font-size: 30rpx;}
.show_more .turn{ width: 16rpx; height:28rpx; margin: 0 10rpx;position: absolute;top:32rpx;}
.nolists{ padding: 60rpx; background: #fff; font-size: 30rpx; text-align: center; margin-bottom: 20rpx; }

.order{
  background: #efeff4;
  padding-bottom: 2rpx;
}
.navs{
  margin-bottom: 20rpx;
}
.nav{
  display: inline-block;
}
._item{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.nav-icon{
  vertical-align: top;
  width: 80rpx;
  height: 80rpx;
  margin-bottom: 0;
}
.text{
  display: inline-block;
  padding: 0 20rpx;
  border-bottom: 8rpx solid transparent;
  margin: 0 18rpx;
  box-sizing: border-box;
}

.item-box{
    white-space: nowrap;
    border-bottom: 2rpx solid #e5e5e5;
}
</style>
