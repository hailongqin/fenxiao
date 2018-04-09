<template>
    <view>
		<view class="goods-sort" style="{{'background:'+bgColor}}" wx:if="{{model==1}}">
		<!--商品排序-->
			<view>
				<scroll-view scroll-x="true" class="navs" wx:if="{{tshow.show == 1}}">
						<view class="item-box">
						<view class="nav _navbar_title"  wx:for="{{tabIds}}" wx:key="id"  @tap="handler(item.id,index)">
								<!-- /改 -->
								<view class="text"  wx:if="{{active==index}}" style="{{'color:'+activeColor+';border-bottom-color:'+activeColor+';'}}" data-idx="id">							
										{{item.name}}
								</view>
							
								<view class="text" wx:else  style="{{'color:'+color+';'}}" data-idx="id">
										{{item.name}}							
								</view>
								<!-- 改 /-->


						</view>
					</view>
				</scroll-view>
				<view class="_navbar_matter" wx:if="{{layout==1 || layout.type==1}}">
					<view wx:if="{{currentTab==0}}" class="_composite clear">
						<view class="_composite_item left bmg" wx:for="{{lists}}" wx:key="index" @tap="toGoods(item.id)">
							<view class="_composite_img"  style="{{'width:'+ewidth*2+'rpx;height:'+eheight*2+'rpx;'}}">
								<image class="_composite_img_image" src="{{'http://image.vdongchina.com/'+item.thumbUrl+'?w='+ewidth*2+'&h=9999'}}" mode="aspectFill"/>
							</view>
							<view class="_composite_cant" wx:if="{{decshow==1}}">
								<view class="_composite_name"  style="{{'font-size:'+fontSizeName+'px;font-weight:'+fontWeightName+';color:'+colorName+';'}}">{{item.name}}</view>
								<view class="_composite_info clear">
									<view class="_composite_price clear left">
										<view class="_composite_now left" style="{{'font-size:'+fontSizeMark+'px;font-weight:'+fontWeightMark+';color:'+colorMark+';'}}">￥<text class="_composite_now_text" style="{{'font-size:'+fontSizePrice+'px;font-weight:'+fontWeightPrice+';color:'+colorPrice+';'}}">{{item.guidePrice}}</text></view>
										<!-- <view class="_composite_former left">￥<text class="_composite_former_text">{{item.guidePrice}}</text></view> -->
									</view>
									<view class="_composite_like right">{{item.collectNum}}人喜欢</view>
								</view>
							</view>
						</view>
					</view>
				</view>

				<view class="product-list" wx:if="{{layout==2 || layout.type==2}}">
		          <view class="large" wx:for="{{lists}}" wx:key="index" @tap="toGoods(item.id)">
		              <view>
		                  <view class="product-img">
		                  	<image  mode="aspectFill" class="product-img-image" src="{{'http://image.vdongchina.com/'+item.thumbUrl+'?w=375&h=9999'}}"></image>
		                  </view>
		                  <view class="product-name" style="{{'font-size:'+fontSizeName+'px;font-weight:'+fontWeightName+';color:'+colorName+';'}}">{{item.name}}</view>
		                  <view class="clear product-price">
		                      <view class="left main-color" style="{{'font-size:'+fontSizeMark+'px;font-weight:'+fontWeightMark+';color:'+colorMark+';'}}">￥<text class="product-price-text" style="{{'font-size:'+fontSizePrice+'px;font-weight:'+fontWeightPrice+';color:'+colorPrice+';'}}">{{item.guidePrice}}</text></view>
		                      <view class="right">{{item.collectNum}}人喜欢</view>
		                  </view>
		              </view>
		          </view>
		        </view>
		        
		        <scroll-view scroll-x="true" wx:if="{{layout.type==3}}" class="uploadWrap">
		          <view class="upload_Item" wx:for="{{lists}}" wx:key="index"  @tap="toGoods(item.id)" style="{{'width:'+layout.width+'px;'}}">
		            <image class="img" mode="aspectFill" src="{{'http://image.vdongchina.com/'+item.thumbUrl}}" style="{{'height:'+layout.height+'px;width:100%;'}}"></image>
		            <view class="product-name" style="{{'font-size:'+fontSizeName+'px;font-weight:'+fontWeightName+';color:'+colorName+';'}}" wx:if="{{decshow==1}}">{{item.name}}</view>
		            <view class="clear product-price"   wx:if="{{decshow==1}}">
		                <view class="left main-color" style="{{'font-size:'+fontSizeMark+'px;font-weight:'+fontWeightMark+';color:'+colorMark+';'}}">￥<text class="product-price-text" style="{{'font-size:'+fontSizePrice+'px;font-weight:'+fontWeightPrice+';color:'+colorPrice+';'}}">{{item.guidePrice}}</text></view>
		                <view class="right">{{item.collectNum}}人喜欢</view>										
		            </view>
		          </view>
		        </scroll-view>
		        
        <view class="product-list clear" wx:if="{{layout.type==4}}">
          <view class="sitem" wx:for="{{lists}}" wx:key="index"  @tap="toGoods(item.id)">
            <view class="left item-media">
              <image class="img" mode="aspectFill" src="{{'http://image.vdongchina.com/'+item.thumbUrl}}"/>
            </view>
            <view class="right item-main" wx:if="{{decshow==1}}">
              <view class="item-desc" style="{{'font-size:'+fontSizeName+'px;font-weight:'+fontWeightName+';color:'+colorName+';width:100%;'}}">
                  {{item.name}}
              </view>
              <view class="item-title-row">
                <view class="left main-color"  style="{{'font-size:'+fontSizeMark+'px;font-weight:'+fontWeightMark+';color:'+colorMark+';'}}">￥<text class="product-price-text" style="{{'font-size:'+fontSizePrice+'px;font-weight:'+fontWeightPrice+';color:'+colorPrice+';'}}">{{item.guidePrice}}</text></view>
                <view class="right">{{item.collectNum}}人喜欢</view>
              </view>
            </view>
          </view>
        </view>		        
		        
		        
			</view>
			<view class="nonePro" wx:if="{{lists.length<1}}">
						暂无商品
			</view>
		</view>
	</view>
</template>
<script>
export default{
  editorConfig: {
	layout:{
      label: '布局',
      value:  {
          type:1,
          height: 100,
          width: 215
      },
      director : 'layout'
    },
	model:{
      label: '是否显示服务项目',
      type: 'Number',
      value:1,
      director : 'switch'
	},
	bgColor: {
      el: ['text', 'color'],
      label: '设置组件背景色',
      type: 'String',
      value: '#ffffff',
      director : 'ColorPicker'
	},
		color: {
      el: ['text', 'color'],
      label: '导航栏文本颜色',
      type: 'String',
      value: '#3a3a3a',
      director : 'ColorPicker'
    },
    activeColor: {
      el: ['text', 'color'],
      label: '导航栏文本选中颜色',
      type: 'String',
      value: '#38adff',
      director : 'ColorPicker'
    },
	decshow:{
      label: '是否显示服务描述',
      type: 'Number',
      value:1,
      director : 'switch'
		},
		tshow: {
      label :'分类导航显示状态',
      type: Object,
      value:{
        show: 1,
        cId: 1,
        // showIcon: 0,
        // iconSize: 40,
        // spacing: 0,
        tabIds:[],
        initial: ''
      },
      director: 'goodsedit'
    },	
	ewidth:{
      el: ['number'],
      label: '列表图片宽度',
      type: 'Number',
      value: '185',
      director: 'Fsize'
    },
    eheight: {
      el: ['number'],
      label: '列表图片高度',
      type: 'Number',
      value: '185',
      director: 'Fsize'
    },
	fontSizeName:{
      el: ['number'],
      label: '服务项目名称文字大小',
      type: 'Number',
      value: '13',
      director: 'Fsize'
    },
    fontSizeMark:{
      el: ['number'],
      label: '服务项目价格符号大小',
      type: 'Number',
      value: '11',
      director: 'Fsize'
    },
    fontSizePrice:{
      el: ['number'],
      label: '服务项目价格文字大小',
      type: 'Number',
      value: '11',
      director: 'Fsize'
    },
    fontWeightName:{
      el: ['number'],
      label: '服务项目名称文字粗细',
      type: 'Number',
      value: '100',
      director: 'fontWeightSelect'
    },
    fontWeightMark:{
      el: ['number'],
      label: '服务项目价格符号粗细',
      type: 'Number',
      value: '100',
      director: 'fontWeightSelect'
    },
    fontWeightPrice:{
      el: ['number'],
      label: '服务项目价格文字粗细',
      type: 'Number',
      value: '100',
      director: 'fontWeightSelect'
    },
    colorName:{
      el: ['text', 'color'],
      label: '服务项目名称文字颜色',
      type: 'String',
      value: '#333333',
      director : 'ColorPicker'
    },
    colorMark:{
      el: ['text', 'color'],
      label: '服务项目价格符号颜色',
      type: 'String',
      value: '#b4282d',
      director : 'ColorPicker'
    },
    colorPrice:{
      el: ['text', 'color'],
      label: '服务项目价格文字颜色',
      type: 'String',
      value: '#b4282d',
      director : 'ColorPicker'
    }    
  },
  comName:"服务项目",
  props: {
	layout:{
		default:function(){
			return {
				type: 1,
				height: 100,
				width: 215
			}
		},
    type:Object
  },
	color: {
      default: '#3a3a3a',
      type: String
    },
    activeColor: {
      default: '#38adff',
      type: String
    },	 
	tshow:{
      default:function(){
        return {
          show:1,
          cId:1,
          tabIds:[],
          initial: ''
        }
      },
      type:Object
    },	   
	decshow: {
      default: 1,
      type: Number
    },	   
	 ewidth: {
      default: '141',
      type:String
    },
    eheight: {
      default: '174',
      type:String
    },
		model: {
      default: 1,
      type: Number
    },
		bgColor: {
      default: '#ffffff',
      type: String
    },
	  fontSizeName:{
        default: '13',
        type:String
      },
      fontSizeMark:{
        default: '11',
        type:String
      },
      fontSizePrice:{
        default: '11',
        type:String
      },
      fontWeightName:{
        default: '100',
        type:String
      },
      fontWeightMark:{
        default: '100',
        type:String
      },
      fontWeightPrice:{
        default: '100',
        type:String
      },
      colorName:{
        default: '#333333',
        type: String
      },
      colorMark:{
        default: '#b4282d',
        type: String
      },
      colorPrice:{
        default: '#b4282d',
        type: String
      }    
  },
  data() {
		return {
			currentTab: 0,
			items: [],
			active: 0,
			lists: [],
			catCid:null,    //切换栏目要用到
			tabIds:this.tshow.tabIds
		}
  	},
    onLoad () {
		var that = this	
		var ids = []
		wx.request({
			url: this.$root.apiServer + this.$root.appid + '/basic/api/server/catalogServers',
            method: 'GET',
            data:{
				perMaxNum:50						
          	},
         	 header: {
            	'content-type': 'application/json'
         	},
			success: function(res) {
				if(res.data.success && res.data.data.length){
				  var result = res.data.data
	              var resArr = []
	              var resIds = []
	              result.forEach(function(item,idx){
	                resIds.push(item.id)
	                resArr.push({id:item.id,name:item.name})
	              })
	
	              that.tshow.tabIds && that.tshow.tabIds.forEach(function(item,idx){
	                var index = resIds.indexOf(item.id)
	                if(index!=-1){
	                  item.name = resArr[index].name
	                }else{
	                  that.tshow.tabIds.splice(idx,1)
	                }
	              })
	              
					that.items = resArr
					that.catCid = resArr[0].id
					if(that.tshow.show){
						that.tabIds = that.tshow.tabIds
						if(that.tshow.tabIds.length==0){
								that.handler(that.catCid,0)
						}else{
		                    that.tshow.tabIds.forEach(function(item,idx){
		                      ids.push(item.id+'')
		                    })
		                    var index = ids.indexOf(that.tshow.initial)
		                    if(index!==-1){
		                      that.handler(that.tshow.initial,index)
		                    }else{
		                      that.handler(that.tshow.tabIds[0].id,0)
		                    }
						}
						
					}else{
						 that.handler(that.tshow.cId,0)
					}
					
					if(that.tshow.tabIds && that.tshow.tabIds.length==0){
						that.tshow.tabIds=that.items
						that.tabIds=that.items
					}

              // if(that.tshow.show){
              //   if(that.tshow.tabIds.length==0){
              //       that.handler(that.catCid,0)
              //   }else{
              //       that.handler(that.tshow.tabIds[0].id,0)
              //   }

              // }else{
              //   that.handler(that.tshow.cId,0)
              // }

              // if(that.tshow.tabIds.length==0){
              //   that.tshow.tabIds=that.items
              // }


				}
				
			}
		})
	},
   		methods: {
			handler (cid,index) {
				this.active = index
						var that = this
				wx.request({
						url: this.$root.apiServer + this.$root.appid + '/basic/api/server/catalogServers',
					method: 'GET',
					data:{
						perMaxNum:50
					},
					header: {
						'content-type': 'application/json'
					},
					success (res) {
						if(res.data.success){
							for (var i = 0; i < res.data.data.length; i++) {
								if (res.data.data[i].id==cid) {
									that.lists = 	res.data.data[i].servers.filter(item => {
					              	return item.status == 1
	         		 			})
								break
								}
							}
						}
					}
				})
			},			
			toGoods(id){
				wx.navigateTo({
					url: '../levelPagesGoods/levelPagesGoods?id='+id
				})
			},
		},
		watch:{
			tshow(e){
				if(e.show !=1){
					this.handler(e.id,0)
				}else{
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
 .sitem{
    height:180rpx;
    background-color: #fff;
    padding: 34rpx;
    border-bottom: #efeff4 2rpx solid;
    display: flex;
  }
  .sitem:last-child{
    border:none;
  }
  .sitem .item-media{
    width:180rpx;
  }
  .sitem .item-media .img{
    width:180rpx;
    height:180rpx;
    border-radius: 10rpx;
    overflow: hidden;
  }
  .sitem .item-main{
    flex:1;
    height:180rpx;
    margin-left:20rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .item-title-row{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .item-title-row .right{
    font-size: 24rpx;
    color: #999;
  }


	._navbar_item {
		flex: 1;
		position: relative
	}

	._navbar_icon_image {
		width:18rpx;
		height: 10rpx;
		position: absolute;
		right: 60rpx;
		top: 40rpx;
	}

	._navbar_item_icon image {
		width: 18rpx;
		height: 10rpx;
	}

	._navbar_title .active {
		 color: rgb(56, 173, 255); border-bottom-color: rgb(56, 173, 255); 
	}

	/* ._navbar_matter {
		margin-top: 5px;
	} */
	._composite{
		display: flex;
		justify-content:space-between ;
		flex-wrap:wrap;
	}
	._composite_item {
		width: 50%;
		position: relative;
		margin-top: 10rpx;
		overflow: hidden;
		/* flex:1 */
	}

	._composite_item_head {
		position: absolute;
		left: 30rpx;
		top: 326rpx;
		line-height: 50rpx;
		color: #fff;
		display: flex;
    	align-items: center;
	}

	._composite_item_img {
		width: 50rpx;
		height: 50rpx;
		overflow: hidden;
		border-radius: 50%;
		margin-right: 20rpx;
	}

	._composite_item_img_image {
		width: 50rpx;
		height: 50rpx;
	}

	._composite_item:nth-child(2) {
		margin-right: 0
	}
	._composite_img{margin: 0 auto;display: flex;display: -webkit-flex;}
	._composite_img_image {
		width: 100%;
		height: 100%;
		flex:1
	}
	._composite_cant {
		padding: 10rpx 20rpx 20rpx 24rpx;
	}

	._composite_name {
		font-size: 28rpx;
		color: #333333;
		min-height: 84rpx;
	}

	._composite_info {
		margin-top: 22rpx;
		color: #999999;
	}

	._composite_price {
		font-size: 22rpx;
	}

	._composite_now {
		color: #FF4C90
	}

	._composite_now ._composite_now_text {
		line-height: 48rpx;
		font-size: 34rpx;
		font-weight: bold
	}
	._composite_former {
		margin-left: 10rpx;
		text-decoration: line-through
	}

	._composite_former_text {
		line-height: 48rpx;
	}

	._composite_like {
		line-height: 48rpx;
		font-size: 24rpx;
		color: #999;
	}

	._lookover {
		line-height:88rpx;
		text-align: center;
		color: #FF4C90;
		font-weight: bold;
		font-size: 28rpx;
	}
  .clear::after {
    display:block;
    clear:both;
    content:"";
    height:0;
    overflow:hidden;
	
    visibility:hidden;
  }

  .left{
    float: left;
  }

  .right{
    float: right;
  }
	.nonePro{height:400rpx;line-height: 400rpx;text-align: center;position:relative;}

.navs{
    white-space: nowrap;
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
.text{
  display: inline-block;
  padding: 0 20rpx;
  border-bottom: 8rpx solid transparent;
  margin: 0 18rpx;
  box-sizing: border-box;
  margin-left: 20rpx; margin-right: 20rpx; font-size: 28rpx;padding-bottom: 20rpx;
}
.item-box{
		padding-top: 20rpx;

}
.item{
  padding: 30rpx;
  background: #fff;
  margin-bottom: 20rpx;
}	




.product-img .product-img-image{
  width:100%;
  height:100%;
}
.product-img{text-align: center;}
.product-list .large{
  padding: 20rpx;
  background: #fff;
}
.product-list .large .product-img{
  width: 100%;
  height: 340rpx;
  margin: 0 auto;
}
.product-list .large .product-name{
  font-size: 30rpx;
	white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
}
.product-price{
  height: 50rpx;
  line-height: 50rpx;
}
.product-list .large .product-price{
  margin-top: 18rpx;
}
.product-list .large .product-price-text{
  font-size: 36rpx;
}


.uploadWrap{
  width:100%;
  white-space:nowrap;
  padding-left: 20rpx;
	padding-top: 20rpx;
  box-sizing: border-box;
}
.upload_Item{
   width:400rpx;
   margin-right: 20rpx;
   display: inline-block;
   overflow: hidden;
   vertical-align: top;
 }
.uploadWrap .img{
  width: 100%;
  height: 210rpx;
}
.uploadWrap .title{
  padding-left:6rpx;
  font-size: 32rpx;
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
  padding-bottom: 20rpx;
}
.product-price .right{
	font-size: 24rpx;
	color: #999;
}
._composite_name,.product-name{
	line-height: 1.5;
	overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
