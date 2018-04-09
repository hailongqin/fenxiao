<template>
    <view>
    <scroll-view scroll-x="true" class="navs" style="{{'background:'+bgColor}}" wx:if="{{tshow.show == 1}}">
      <view class="item-box" style="{{'padding-top:'+pt*2+'rpx;'}}">
        <view class="nav" wx:for="{{arrData}}" wx:key="cId" @tap="handler(item.id,index)">
		<view wx:if="{{active==index}}" class="_item">
            <image wx:if="{{tshow.showIcon==1}}" src="{{'http://image.vdongchina.com/'+ item.thumbnail}}" class="nav-icon" style="{{'width:'+tshow.iconSize*2+'rpx;height:'+tshow.iconSize*2+'rpx;margin-bottom:'+tshow.spacing*2+'rpx;'}}"></image>
            <text class="text" style="{{'margin-left:'+ marginlr*2+'rpx;margin-right:'+ marginlr*2+'rpx;font-size:' + fontSize*2+'rpx;color:'+activeColor+';padding-bottom:'+pb*2+'rpx;border-bottom-color:'+activeColor}}">{{item.name}}</text>
          </view>
          <view wx:else class="_item">
            <image wx:if="{{tshow.showIcon==1}}" src="{{'http://image.vdongchina.com/'+ item.thumbnail}}" class="nav-icon" style="{{'width:'+tshow.iconSize*2+'rpx;height:'+tshow.iconSize*2+'rpx;margin-bottom:'+tshow.spacing*2+'rpx;'}}"></image>
            <text class="text" style="{{'margin-left:'+ marginlr*2+'rpx;margin-right:'+ marginlr*2+'rpx;font-size:' + fontSize*2+'rpx;color:'+color+';padding-bottom:'+pb*2+'rpx'}}">{{item.name}}</text>
          </view>
		</view>				
      </view>
    </scroll-view>
  
        <view wx:if="{{list.length}}" class="godetails" style="{{'background:'+bgItemColor}}">
            <view class="t_index_one" wx:if="{{model == 3}}">
                <view class="one_box" wx:for="{{list}}" wx:key="index" @tap="godetails(item.id)">
                    <image class="one_box_img" src="{{'http://image.vdongchina.com/'+ item.titlePic}}"></image>
                    <view class="shop_name" style="{{'font-size:'+fontSizeName*2+'rpx;font-weight:'+fontWeightName+';color:'+colorName+';'}}">{{item.name}}</view>
                    <view class="shop_bottom">
                        <view class="shop_bottom_money" style="{{'font-size:'+fontSizeMark*2+'rpx;font-weight:'+fontWeightMark+';color:'+colorMark+';'}}">￥
                            <text class="texts" style="{'font-size:'+fontSizePrice*2+'rpx;font-weight:'+fontWeightPrice+';color:'+colorPrice+';'}">{{item.groupPrice}}</text>
                        </view>
                        <view class="shop_bottom_num" style="{{'font-size:'+fontSizeGroup*2+'rpx;font-weight:'+fontWeightGroup+';color:'+colorPrice+';'}}">已团{{item.issvirtual == '1'?item.virtualNum:item.ptNum}}件</view>
                    </view>
                </view>
            </view>
            <view class="t_index_two" wx:if="{{model == 2}}">
                <view class="two_box" wx:for="{{list}}" wx:key="index" @tap="godetails(item.id)" >
                    <image class="shop_image" src="{{'http://image.vdongchina.com/'+ item.titlePic}}" mode="aspectFill"  style="{{'height:'+eheight*2+'rpx;'}}"></image>
                    <view class="two_shop_name" style="{{'font-size:'+fontSizeName*2+'rpx;font-weight:'+fontWeightName+';color:'+colorName+';'}}">{{item.name}}</view>
                    <view class="two_shop_bottom">
                        <view class="two_shop_bottom_money" style="{{'font-size:'+fontSizeMark*2+'rpx;font-weight:'+fontWeightMark+';color:'+colorMark+';'}}">￥
                            <text class="texts" style="{{'font-size:'+fontSizePrice*2+'rpx;font-weight:'+fontWeightPrice+';color:'+colorPrice+';'}}">{{item.groupPrice}}</text>
                        </view>
                        <view class="two_shop_bottom_num" style="{{'font-size:'+fontSizeGroup*2+'rpx;font-weight:'+fontWeightGroup+';color:'+colorGroup+';'}}">已团{{item.issvirtual == '1'?item.virtualNum:item.ptNum}}件</view>

                        <view class="two_shop_button" style="{{'background:'+goBgColor+';color:'+colorGoGroup+';'}}">去开团
                            <image class="image" src="http://image.vdongchina.com/M00/03/BC/ZSUkmVnu7yGECnenAAAAAI36WNI272.png">
                            </image>
                        </view>
                    </view>
                </view>
            </view>
            <view class="t_index_three" wx:if="{{model == 1}}">
                <scroll-view class="scroll_three" scroll-x="true">
                    <view class="three_box" style="{{item.index == 0?'margin-left:15px;':''}}" wx:for="{{list}}" wx:key="index" @tap="godetails(item.id)">
                        <image class="image" src="{{'http://image.vdongchina.com/'+ item.titlePic}}" style="{{'width:'+ewidth+'px;height:'+eheight+'px;'}}"></image>
                        <text class="three_shop_name" style="{{'width:'+ewidth*2+'rpx;font-size:'+fontSizeName*2+'rpx;font-weight:'+fontWeightName+';color:'+colorName+';'}}">{{item.name}}</text>
                        <view class="three_shop_bottom">
                            <view class="three_shop_bottom_money" style="{{'font-size:'+fontSizeMark*2+'rpx;font-weight:'+fontWeightMark+';color:'+colorMark+';'}}">￥
                                <text class="texts" style="{{'font-size:'+fontSizePrice*2+'rpx;font-weight:'+fontWeightPrice+';color:'+colorPrice+';'}}">{{item.groupPrice}}</text>
                            </view>
                            <view class="three_shop_bottom_num" style="{{'font-size:'+fontSizeGroup*2+'rpx;font-weight:'+fontWeightGroup+';color:'+colorGroup+';'}}">已团{{item.issvirtual == '1'?item.virtualNum:item.ptNum}}件</view>
                        </view>
                    </view>
                </scroll-view>
            </view>
            <view class="t_index_four" wx:if="{{model == 4}}">
                <view class="four_box" wx:for="{{list}}" wx:key="index" @tap="godetails(item.id)">
                    <image class="image" src="{{'http://image.vdongchina.com/'+ item.titlePic}}"></image>
                    <view class="four_infor">
                        <view class="four_shop_name" style="{{'font-size:'+fontSizeName*2+'rpx;font-weight:'+fontWeightName+';color:'+colorName+';'}}">{{item.name}}</view>
                        <view class="four_shop_num">
                            <text class="texts" style="{{'font-size:'+fontSizeGroup*2+'rpx;font-weight:'+fontWeightGroup+';color:'+colorGroup+';'}}">已团{{item.issvirtual == '1'?item.virtualNum:item.ptNum}}件</text>
                        </view>
                        <view class="four_shop_bottom ">
                            <view class="four_shop_bottom_money" >
                            	<text style="{{'font-size:'+fontSizeMark*2+'rpx;font-weight:'+fontWeightMark+';color:'+colorMark+';'}}">￥</text>
                                <text style="{{'font-size:'+fontSizePrice*2+'rpx;font-weight:'+fontWeightPrice+';color:'+colorPrice+';'}}">
                                    {{item.groupPrice}}</text>
                            </view>                         
                            <view class="four_shop_button" style="{{'background:'+goBgColor+';color:'+colorGoGroup+';'}}">去开团
                                <image class="image" src="http://image.vdongchina.com/M00/03/BC/ZSUkmVnu7yGECnenAAAAAI36WNI272.png">
                                </image>
                            </view>
                        </view>
                    </view>
                </view>
            </view>				
        </view>

        <view class="noData" wx:else>
            没有商品数据...
        </view>
    </view>
</template>
<script>
export default{
    editorConfig: {   //该编辑器所有配置项
        model: {
            label: '布局',
            type: 'Number',
            value: 1,
            director: 'radio3'
        },
        ewidth: {
            el: ['number'],
            label: '列表图片宽度',
            labelshow: "",
            type: 'Number',
            value: 141,
            director: 'isShow',
            tip: ''
        },
        eheight: {
            el: ['number'],
            label: '列表图片高度',
            labelshow: "",
            type: 'Number',
            value: 174,
            director: 'isShow'
        },
        tshow: {
            label: '分类导航显示状态',
            type: Object,
            value: {
                show: 1,
                cId: 1,
                showIcon: 0,
                iconSize: 40,
                spacing: 0,
                tabIds: [],
                initial: ''
            },
            director: 'goods2'
        },
        bgColor: {
            el: ['text', 'color'],
            label: '分类背景色',
            type: 'String',
            value: '#ffffff',
            director: 'ColorPicker'
        },
        bgItemColor: {
            el: ['text', 'color'],
            label: '列表背景色',
            type: 'String',
            value: '#f2f2f2',
            director: 'ColorPicker'
        },
        goBgColor: {
            el: ['text', 'color'],
            label: '按钮背景色',
            type: 'String',
            value: '#DD2727',
            director: 'ColorPicker'
        },
        color: {
            el: ['text', 'color'],
            label: '文本初始颜色',
            type: 'String',
            value: '#3a3a3a',
            director: 'ColorPicker'
        },
        activeColor: {
            el: ['text', 'color'],
            label: '文本选中颜色',
            type: 'String',
            value: '#38adff',
            director: 'ColorPicker'
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
        marginlr: {
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
        fontSizeName: {
            el: ['number'],
            label: '商品名称文字大小',
            type: 'Number',
            value: '13',
            director: 'Fsize'
        },
        fontSizeMark: {
            el: ['number'],
            label: '商品价格符号大小',
            type: 'Number',
            value: '11',
            director: 'Fsize'
        },
        fontSizePrice: {
            el: ['number'],
            label: '商品价格文字大小',
            type: 'Number',
            value: '11',
            director: 'Fsize'
        },
        fontSizeGroup: {
            el: ['number'],
            label: '已开团文字大小',
            type: 'Number',
            value: '11',
            director: 'Fsize'
        },

        fontWeightName: {
            el: ['number'],
            label: '商品名称文字粗细',
            type: 'Number',
            value: '100',
            director: 'fontWeightSelect'
        },
        fontWeightMark: {
            el: ['number'],
            label: '商品价格符号粗细',
            type: 'Number',
            value: '100',
            director: 'fontWeightSelect'
        },
        fontWeightPrice: {
            el: ['number'],
            label: '商品价格文字粗细',
            type: 'Number',
            value: '100',
            director: 'fontWeightSelect'
        },
        fontWeightGroup: {
            el: ['number'],
            label: '已开团文字粗细',
            type: 'Number',
            value: '100',
            director: 'fontWeightSelect'
        },
        colorName: {
            el: ['text', 'color'],
            label: '商品名称文字颜色',
            type: 'String',
            value: '#333333',
            director: 'ColorPicker'
        },
        colorMark: {
            el: ['text', 'color'],
            label: '商品价格符号颜色',
            type: 'String',
            value: '#b4282d',
            director: 'ColorPicker'
        },
        colorPrice: {
            el: ['text', 'color'],
            label: '商品价格文字颜色',
            type: 'String',
            value: '#b4282d',
            director: 'ColorPicker'
        },
        colorGroup: {
            el: ['text', 'color'],
            label: '已开团文字颜色',
            type: 'String',
            value: '#b4282d',
            director: 'ColorPicker'
        },
        colorGoGroup: {
            el: ['text', 'color'],
            label: '去开团文字颜色',
            type: 'String',
            value: '#ffffff',
            director: 'ColorPicker'
        }

    },
    comName: "新商品列表",
    props: {
        model: {
            default: 4,
            type: Number
        },
        ewidth: {
            label: '列表图片宽度',
            default: 141,
            type: Number
        },
        eheight: {
            label: '列表图片高度',
            default: 174,
            type: Number
        },
        tshow: {
            default: function() {
                return {
                    show: 1,
                    cId: 1,
                    showIcon: 0,
                    iconSize: 40,
                    spacing: 0,
                    tabIds: [],
                    initial: ''
                }
            },
            type: Object
        },
        shopcartShow: {
            type: Object,
            default: function() {
                return { open: true, pic: 'http://image.vdongchina.com/M00/01/17/ZSUkmVmnc72EcSKxAAAAAFkCQJQ691.png' }
            }
        },
        bgColor: {
            default: '#fff',
            type: String
        },
        bgItemColor: {
            default: '#fff',
            type: String
        },
        goBgColor: {
            default: '#DD2727',
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
            type: String
        },
        pt: {
            default: '10',
            type: String
        },
        pb: {
            default: '10',
            type: String
        },
        marginlr: {
            default: '10',
            type: String
        },
        fontSizeGroup: {
            default: '13',
            type: String
        },
        fontWeightGroup: {
            default: '100',
            type: String
        },
        fontSizeName: {
            default: '13',
            type: String
        },
        fontSizeMark: {
            default: '11',
            type: String
        },
        fontSizePrice: {
            default: '11',
            type: String
        },
        fontWeightName: {
            default: '100',
            type: String
        },
        fontWeightMark: {
            default: '100',
            type: String
        },
        fontWeightPrice: {
            default: '100',
            type: String
        },
        colorName: {
            default: '#333333',
            type: String
        },
        colorMark: {
            default: '#b4282d',
            type: String
        },
        colorPrice: {
            default: '#b4282d',
            type: String
        },
        colorGroup: {
            default: '#b4282d',
            type: String
        },
        colorGoGroup: {
            default: '#ffffff',
            type: String
        }
    },
    data() {
        return {
            obj: [],
            currentTab: 0,
            list: [],
            items:[],
            catCid:'',
            active:0,
            arrData:this.tshow.tabIds	
        }
    },
    methods: {
        godetails(id) {
            wx.navigateTo({
                url: '../t_details/t_details?id=' + id
            })
        },
        handler (cid,index) {
        this.active = index
        this.currentTab = cid
        var that = this
        console.log(cid)
        that.require(cid)
      },
        require(id) {
        	console.log(id)
            var that = this;
            let _url =  this.$root.apiServer+ this.$root.appid +'/basic/fgroup/applet/shopList'
            wx.request({
                url: _url,
                method: 'GET',
                header: {
                    'content-type': 'application/json'
                },

                data: {
                    id: id
                },
                success: function(res) {
        				var obj =res.data.obj
        				that.list = obj
//                      for (let i in obj) {
//                          obj[i].picarry = "http://image.vdongchina.com/" + obj[i].picarry.split(",")[0]
//                      }
//                      that.list = obj
                }
            })
        }
    },
    onLoad() {
        var that = this
        var ids = []
    // 获取商品分类
    wx.request({
        url:  this.$root.apiServer+ this.$root.appid +'/basic/fgroup/applet/typeList',
        method: 'GET',
        header: {
            'content-type': 'application/json'
        },
        success (res) {
        	
    	  var obj = res.data.obj
          if (obj) {
              var result = res.data.obj
              var resArr = []
              var resIds = []
              result.forEach(function(item,idx){
                resIds.push(item.id)
                resArr.push({id:item.id,name:item.name,thumbnail:item.pic})
              })

              that.tshow.tabIds && that.tshow.tabIds.forEach(function(item,idx){
                var index = resIds.indexOf(item.id)
                if(index!=-1){
                  item.name = resArr[index].name
                  item.thumbnail = resArr[index].thumbnail
                }else{
                  that.tshow.tabIds.splice(idx,1)
                }
              })
              
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
              that.arrData=that.items
            }
          }
        }
    })
    },
    watch: {
        tshow(e){
      if(this.isFirst){
        return
      }
      if(e.show !=1){
        this.handler(this.catCid,0)
      }else{
        if(this.tshow.tabIds.length==0){
          this.handler(this.catCid,0)
        }else{
          this.handler(this.tshow.tabIds[0].id,0)
        }
      }
    },
    }
}
</script>
<style scoped>
.navs{
  margin-bottom: 20rpx;
  border-bottom: 2rpx solid #e5e5e5;
}
.nav{
  display: inline-block;
}
.text{
  display: block;
  padding: 0 10px;
  border-bottom: 4px solid transparent;
  margin: 0 9px;
  box-sizing: border-box;
}
.item-box{
    white-space: nowrap;
}
._item{
  text-align: center;
}
.nav-icon{
  vertical-align: top;
  height: 80rpx;
  width: 80rpx;
  margin-bottom: 0;
}

/*.godetails {
    border-top: 2rpx solid #E5E5E5;
}*/

._me_title_items {
    display: flex;
    width: 100%;
    white-space: nowrap;
}

._me_title_Item {
    display: inline-block;
    line-height: 92rpx;
    text-align: center;
    color: #999999;
    width: 140rpx;
    font-size: 30rpx;
}

.active {
    border-bottom: solid 4rpx #FF4C90;
    color: #FF4C90
}

.t_index {
    background-color: #f2f2f2;
}


/*a  */

.t_index {
    width: 100%;
    background-color: #f2f2f2;
    font-family: PingFangSC-Regular;
}

.t_index_one {
    width: 100%;
    margin-bottom: 16rpx;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.one_box {
    width: 370rpx;
    background: #fefefe;
    display: inline-block;
    box-sizing: border-box;
    margin-top: 10rpx; 
}


.one_box .one_box_img {
    width: 100%;
    height: 370rpx;
} 

.shop_name {
    width: 100%;
    height: 70rpx;
    font-size: 28rpx;
    color: #222222;
    line-height: 34rpx;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    margin-top: 10rpx;
    padding: 0 16rpx;
    box-sizing: border-box;
}

.shop_bottom {
    width: 100%;
    line-height: 56rpx;
    padding: 0 20rpx;
    box-sizing: border-box;
}

.shop_bottom_money {
    float: left;
    color: #DD2727;
    font-size: 24rpx;
}

.shop_bottom_money .texts {
    font-size: 32rpx;
}

.shop_bottom_num {
    float: right;
    font-size: 20rpx;
    color: #999;
}


/*b  */

.t_index_two {
    margin-bottom: 20rpx;
}

.two_box {
    width: 100%;
    background-color: #fff;
    margin-bottom: 20rpx;
}

.two_box .shop_image {
    width: 100%;
    height: 375rpx;
    margin: 0;
    padding: 0;
    display: block;
}

.two_shop_name {
    width: 100%;
    padding: 26rpx;
    box-sizing: border-box;
    font-size: 32rpx;
    color: #222;
    line-height: 40rpx;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}

.two_shop_bottom {
    padding: 0 30rpx 30rpx;
    box-sizing: border-box;
    height: 98rpx;
    width: 100%;
    line-height: 68rpx;
}

.two_shop_bottom_money {
    float: left;
    font-size: 32rpx;
    line-height: 40rpx;
    padding-top: 10rpx;
    color: #DD2727;
}

.two_shop_bottom_money .text {
    font-size: 42rpx;
    color: #DD2727;
}

.two_shop_bottom_num {
    float: left;
    font-size: 24rpx;
    color: #999;
    line-height: 40rpx;
    padding: 10rpx 0 0 18rpx;
}

.two_shop_button {
    width: 178rpx;
    height: 68rpx;
    background: #DD2727;
    border-radius: 8rpx;
    font-size: 28rpx;
    line-height: 68rpx;
    float: right;
    padding-left: 36rpx;
    box-sizing: border-box;
    color: #fff;
    position: relative;
}

.two_shop_button .image {
    width: 24rpx;
    height: 28rpx;
    position: absolute;
    right: 24rpx;
    top: 22rpx;
}

.two_shop_bottom_person {
    width: 160rpx;
    float: right;
    margin-right: 20rpx;
    position: relative;
}

.two_shop_bottom_person .image {
    width: 60rpx;
    height: 60rpx;
    border-radius: 50%;
    border: 6rpx solid #fff;
    position: absolute;
    top: 0;
}

.noData {
    width: 100%;
    height: 300rpx;
    line-height: 300rpx;
    text-align: center;
    font-size: 30rpx;
    color: #ccc;
}









/*c  */

.t_index_three {
    margin-bottom: 20rpx;
}

.scroll_three {
    width: 100%;
    white-space: nowrap;
}

.three_box {
    background-color: #fff;
    display: inline-block;
    margin-right: 20rpx;
}

.three_box .image {
    width: 246rpx;
    height: 246rpx;
}

.three_shop_name {
    padding: 0 20rpx;
    margin-top: 20rpx;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 48rpx;
    color: #222;
    display: block;
}

.three_shop_bottom {
    width: 100%;
    padding: 0 14rpx;
    box-sizing: border-box;
}

.three_shop_bottom_money {
    font-size: 24rpx;
    color: #DD2727;
    float: left;
    margin-top: 10rpx;
}

.three_shop_bottom_money .text {
    font-size: 32rpx;
}

.three_shop_bottom_num {
    font-size: 20rpx;
    color: #999;
    float: right;
    margin-top: 10rpx;
}

.noData {
    width: 100%;
    height: 300rpx;
    line-height: 300rpx;
    text-align: center;
    font-size: 30rpx;
    color: #ccc;
}







/*d  */

.t_index_four {
    width: 100%;
    background-color: #fff;
    margin-bottom: 16rpx;
}

.four_box {
    width: 100%;
    background-color: #fff;
    padding: 20rpx 30rpx;
    border-top: 2rpx solid #f2f2f2;
    display: inline-flex;
    box-sizing: border-box;
}

.four_box .image {
    float: left;
    width: 246rpx;
    height: 246rpx;
}

.four_infor {
    width: calc(100% - 123px);
    float: right;
    padding-left: 20rpx;
    position: relative;
}

.four_shop_name {
    width: 100%;
    font-family: PingFangSC-Regular;
    font-size: 48rpx;
    color: #222222;
    line-height: 34rpx;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}

.four_shop_num {
    width: 100%;
    padding-top: 24rpx;
}

.four_shop_num .texts {
    line-height: 52rpx;
    padding-left: 10rpx;
    font-family: PingFang-SC-Regular;
    font-size: 24rpx;
    color: #999999;
    letter-spacing: 0;
}
.foer_userImg_box {
    width:90rpx;
    height: 52rpx;
    float: left;
    position: relative;
}

.foer_userImg_box .image {
    width: 88rpx;
    height: 88rpx;
    border-radius: 50%;
    border: 4rpx solid #fff;
    position: absolute;
    top: 0;
}

.four_shop_bottom {
    width: 100%;
    height: 66rpx;
    padding-left: 20rpx;
    box-sizing: border-box;
    position: absolute;
    bottom: 0px;
    left: 0;
}

.four_shop_bottom_money {
    font-family: SFUIDisplay-Medium;
    font-size: 30rpx;
    color: #DD2727;
    letter-spacing: 0;
    line-height: 40rpx;
    float: left;
    overflow: hidden;
}
.four_shop_bottom_money text{
	/*float: left;*/
	line-height: 40rpx;
	display: inline-block;
}
.four_shop_bottom_money .texts {
	display: inline-block;
    font-size: 40rpx;
}

.four_shop_button {
    width: 172rpx;
    height: 66rpx;
    background: #DD2727;
    border-radius: 8rpx;
    font-size: 26rpx;
    float: right;
    padding-left: 36rpx;
    box-sizing: border-box;
    line-height: 66rpx;
    color: #fff;
    position: relative;
}

.four_shop_button .image {
    width: 24rpx;
    height: 28rpx;
    position: absolute;
    right: 24rpx;
    top: 22rpx;
}

.noData {
    width: 100%;
    height: 300rpx;
    line-height: 300rpx;
    text-align: center;
    font-size: 30rpx;
    color: #ccc;
}
</style>

