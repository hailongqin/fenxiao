<template>
  <view class="classify">
    <scroll-view scroll-x="true" class="navs" style="{{'background:'+bgColor}}" wx:if="{{tshow.show == 1}}">
      <view class="item-box" style="{{'padding-top:'+pt*2+'rpx;'}}">
        <view class="nav" wx:for="{{arrData}}" wx:key="cId" @tap="handler(item.cId,index)">
					<view wx:if="{{active==index}}" class="_item">
            <image wx:if="{{tshow.showIcon==1}}" src="{{item.coverImg}}" class="nav-icon" style="{{'width:'+tshow.iconSize*2+'rpx;height:'+tshow.iconSize*2+'rpx;margin-bottom:'+tshow.spacing*2+'rpx;'}}"></image>
            <text class="text" style="{{'margin-left:'+ marginlr*2+'rpx;margin-right:'+ marginlr*2+'rpx;font-size:' + fontSize*2+'rpx;color:'+activeColor+';padding-bottom:'+pb*2+'rpx;border-bottom-color:'+activeColor}}">{{item.name}}</text>
          </view>
          <view wx:else class="_item">
            <image wx:if="{{tshow.showIcon==1}}" src="{{item.coverImg}}" class="nav-icon" style="{{'width:'+tshow.iconSize*2+'rpx;height:'+tshow.iconSize*2+'rpx;margin-bottom:'+tshow.spacing*2+'rpx;'}}"></image>
            <text class="text" style="{{'margin-left:'+ marginlr*2+'rpx;margin-right:'+ marginlr*2+'rpx;font-size:' + fontSize*2+'rpx;color:'+color+';padding-bottom:'+pb*2+'rpx'}}">{{item.name}}</text>
          </view>
				</view>				
      </view>
    </scroll-view>
    <view class="lists" wx:if="{{lists.length >0 &&model.type==1}}">    	
      <view wx:for="{{lists}}" wx:key="index" class="items">
        <view wx:if="{{item.style&&item.status}}"  class="item" @tap="itemTapHandler(item.id)">
          <image class="img" mode="aspectFill" src="{{item.cover}}"/>
          <text class="title">{{item.title}}</text>
          <view class="info">
            <text class="date">{{item.createTime}}</text>
            <view>
              <image class="icon" mode="aspectFit" src="http://image.vdongchina.com/M00/00/15/ZSUkmVlfHh2EYwcZAAAAAISvvMw527.png"/>
								{{item.readerNum}}
            </view>
                   
            
          </view>
        </view>
        <view wx:elif="{{item.status}}"class="sitem" @tap="itemTapHandler(item.id)">
          <view class="item-media">
            <image class="img" mode="aspectFill" src="{{item.cover}}"/>
          </view>
          <view class="item-main">
            <view class="item-desc" style="width:100%">
                {{item.title}}
            </view>
            <view class="item-title-row">
              <view class="item-title date">{{item.createTime}}</view>
              <view class="item-after">
              	<image class="icon" mode="aspectFit" src="http://image.vdongchina.com/M00/00/15/ZSUkmVlfHh2EYwcZAAAAAISvvMw527.png"/>
              	<text class="eyes">{{item.readerNum}}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    
    <scroll-view scroll-x="true" wx:if="{{lists.length >0 && model.type==2}}" class="uploadWrap">
       <view class="upload_Item" wx:for="{{lists}}" wx:key="gg"  @tap="itemTapHandler(item.id)" style="{{'width:'+model.width*2+'rpx;'}}">
         <image class="img" mode="aspectFill" src="{{item.cover}}" style="{{'height:'+model.height*2+'rpx;'}}"/>
         <text class="title">{{item.title}}</text>
       </view>
    </scroll-view>
    
    <view wx:if="{{isNo && lists.length == 0}}" class="lists">
      <view class="nolists">暂无数据</view>
    </view>

		<view class="lists" wx:if="{{!isNo && lists.length == 0}}">
			数据正在加载中...
		</view>	



  </view>
</template>

<script>
	export default {
		  editorConfig: {	
				model:{
		      label: '布局',
		      type: 'Object',
		      value: {
		        type: 1,
		        width: 200,
		        height: 105
		      },
		      director : 'radioModel'
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
		      director: 'tuwen'
		    },	
		  },
		  props: {
			    model:{
			      default:function(){
			        return {
			          type:1,
			          width:200,
			          height: 105
			        }
			      },
			      type:Object
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
		      items: [],
		      active:"",
		      lists: [],
		      catCid:null,    //切换栏目要用到
      		arrData:this.tshow.tabIds,
      		isNo:false
		    }
		  },
		  onLoad () {
		    var that = this
		    var ids = []
		    wx.request({
		        url: this.$root.apiServer+ this.$root.appid +'/basic/api/imagetext/category/get',
		        method: 'GET',
		        header: {
		            'content-type': 'application/json'
		        },
		        success (res) {
		         if(res.statusCode==200 && res.data.categorys.length){
							 var result = res.data.categorys
		           var resArr = []
		           var resIds = []
		           result.forEach(function(item,idx){
		             resIds.push(item.cId)
		             resArr.push({cId:item.cId,name:item.name,coverImg:item.coverImg})
		           })
		
		           that.tshow.tabIds && that.tshow.tabIds.forEach(function(item,idx){
		             var index = resIds.indexOf(item.cId)
		             if(index!=-1){
		               item.name = resArr[index].name
		               item.coverImg = resArr[index].coverImg
		             }else{
		               that.tshow.tabIds.splice(idx,1)
		             }
		           })
		           
								that.items = resArr
								that.catCid = resArr[0].cId								
		           	if(that.tshow.show){
		           		that.arrData = that.tshow.tabIds
		            	if(that.tshow.tabIds.length){
		            		that.tshow.tabIds.forEach(function(item,idx){
		                  ids.push(item.cId+'')
		                })
		                var index = ids.indexOf(that.tshow.initial)
		                if(index!==-1){
		                  that.handler(that.tshow.initial,index)
		                }else{
		                  that.handler(that.tshow.tabIds[0].cId,0)
		                }
		            	}else{
		            		that.handler(that.catCid,0)
		            	}
		            }else{
		              that.handler(that.tshow.cId,0)
		            } 
		            if(that.tshow.tabIds && that.tshow.tabIds.length==0){
		              that.arrData=that.items
		              that.tshow.tabIds=that.items
		            }
		          }   
		    	}
		  	})
	    },
		  methods: {
		    handler (cid,index) {
		      this.active = index
		      var that = this
		      wx.request({
		          url: this.$root.apiServer+ this.$root.appid +'/basic/api/imagetext/select/categoryid',
		          method: 'POST',
		          data: {
		            cId: cid
		          },
		          header: {
		              'content-type': 'application/x-www-form-urlencoded'
		          },
		          success (res) {
		          	that.isNo=true
		            that.lists = res.data.imageTextList
		          },
			       	fail(){
	            	that.isNo=true
	            }
		      })
		    },
			itemTapHandler(id){				
				var openid = getApp().globalData.openid
				var that = this
		      wx.request({
		          url: this.$root.apiServer+ this.$root.appid +'/basic/api/imagetext/select/id',
		          method: 'POST',
		          data: {
		            id: id,
		            openid:openid
		          },
		          header: {
		              'content-type': 'application/x-www-form-urlencoded'
		          },
		          success (res) {
									that.onLoad ()
		          }
		      })
		      wx.navigateTo({		      	
		          url: '../graphic/graphic' + '?id=' + id
		      })
		    }
		  },
		  watch:{
		    tshow(e){
		      if(e.show !=1){
		        this.handler(e.cId,0)
		      }else{
		        if(this.tshow.tabIds.length==0){
		          this.handler(this.catCid,0)
		        }else{
		          this.handler(this.tshow.tabIds[0].cId,0)
		        }
		      }      
		    }    
		  }		  
	}
</script>
<style scoped>

.classify{
  background: #fff;
  padding-bottom: 2rpx;
}
.navs{
  border-bottom: 2rpx solid #e5e5e5;
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
  width: 20rpx;
  height: 20rpx;
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
    display: inline-block;
}
.info{
  display: flex;
  justify-content:space-between;
  font-size: 24rpx;
  color: #999;
   padding:0 6rpx;
}
.data{
	font-size:28rpx;
	color:#999;

}
.icon{
	font-size:24rpx;	
  color:#999;
  width: 30rpx;
  height: 24rpx;
  margin-right: 6rpx;
}
.nolists{
  padding: 60rpx;
  background: #fff;
  font-size: 24rpx;
  text-align: center;
  margin-bottom: 20rpx;
}
.sitem,.item-main,.item-title-row .item-title{
	
  font-size:24rpx;
  color:#999;
}
.sitem,.item-main,.item-title-row{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.sitem{
  background-color:#fff;
  position:relative;
  padding:30rpx 0;
}


.item-media+.item-main {
    margin-left:20rpx;
}
.item-media{width: 180rpx;height: 180rpx;}
.item-media .img{
  width:100%;
  height:100%;
}
.item-main{
  height:180rpx;
  flex-direction:column;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
.item-desc{
  position:relative;
  top:12rpx;
}
.item-title-row{
  position:relative;
  bottom:12rpx;
  width:100%;

}

.item-desc {
	  position:relative;
  top:12rpx;
    font-size:32rpx;
    color: #333;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    letter-spacing: 1.24rpx;
    line-height: 42rpx;
    max-height: 84rpx;
}



.eyes{font-size: 24rpx;color: #999999;}
.date{font-size: 24rpx;color: #999;}
.lists .items{
  border-bottom:#efeff4 1px solid ;
}  
.lists .items:last-child{
	border-bottom: none;
}

.uploadWrap{
  width:100%;
  white-space:nowrap;
  padding-left:20rpx;
	box-sizing:border-box;

}
.upload_Item{
   width:400rpx;
   margin-right: 20rpx;
   display: inline-block;
   overflow: hidden;
   vertical-align: top;
   background: #fff;
 }
.uploadWrap .img{
  width: 100%;
  height: 210rpx;
}
.uploadWrap .title{
	display: block;
  font-size: 32rpx;
   padding-left:6rpx;
  color: #333;
  height: 56rpx;
  line-height: 56rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
}
.classify .uploadWrap{
  padding-top: 20rpx;
}
.uploadWrap .upload_Item{
  padding-bottom: 10rpx;
}
.classify .lists{
  padding:0 30rpx;
}

.lists .items .item{
  padding:30rpx 0;
  background: #fff;
}
.lists .items .item .title{
  font-size: 32rpx;
  color: #333;
  height: 40rpx;
  line-height: 40rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  margin: 24rpx 0;
  padding:0 6rpx;
}
.lists .items .item .img{
  width: 100%;
  height: 340rpx;
  border-radius: 10rpx;
  overflow: hidden;
}
</style>