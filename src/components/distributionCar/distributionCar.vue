left setBtn<template>
    <view>
<!--        <view class="topLine"></view>-->
        <view wx:if="{{carNum}}">
            <checkbox-group class="group" @change="checkboxChange">
                <view class="items"  wx:for="{{items}}" wx:key="userId">
                    <view class="scroll" @touchstart="touchS(index, $event)" @touchmove="touchM(index, $event)" @touchend="touchE(index, $event)" style="{{item.txtStyle}}">
                        <view class="goods-item">
                            <view class="good-prod">
                                <view class="auto clear good-cant">
                                    <view class="goods-check" >
                                        <checkbox class="item-checkbox" value="{{item.id}}" checked="{{item.checked}}"></checkbox>   
                                        <view class="label-icon">
                                            <view class="label-icon-checked" style="{{item.checked ? 'opacity:1' : 'opacity:0'}}"><image src="http://image.vdongchina.com/M00/06/26/ZSUkmVoZD4SEZscSAAAAALbSXGM412.png" class="label-icon-checked-image"></image></view>
                                        </view>                
                                    </view>
                                    <view class="goods-img">
                                        <image src="{{item.product.imageList[0].url}}" wx:if="{{item.product.imageList[0].url}}" class="goods-img-image"></image>
                                        <view wx:else class="empty goods-img">暂无图片</view>
                                    </view>
                                    <view class="goods-text">
                                    	<view class="clear">
                                    		<view class="goods-name left">{{item.product.name}}</view>
                                    		<view class="goods-price right">
                                                <text class="goods-price-text">￥{{item.price}}</text>
                                                <!-- <text class="goods-price-text">￥{{item.price}}</text> -->
                                            </view>
                                    	</view>
                                        
                                        <view class="clear" style="margin-top:50rpx;">
	                                        <view class="goods-norms clear left">
						                    	<view class="left" wx:for="{{item.sku.salePropertyList}}" wx:key="gg">
						                     		{{item.salePropertyName+'   '}}                     		
						                    	</view>
	                                        </view>	                                       	                                        
	                                        <view class="classname clear right">	                                            
	                                            <view class="{{item.display ? 'goods-num right none' : 'goods-num right '}}" @tap="goodsNum(item.id)">
	                                                <text class="right clear" style="color:#999;">x{{item.quantity}}</text>
	                                                <!--<view class="numBtn"><image src="http://image.vdongchina.com/M00/03/33/ZSUkmVnfK9OEXodVAAAAABLfGnU893.png" class="numBtn-image"></image></view>-->
	                                            </view>   
	                                            <view class="{{item.display ? 'stepper right block' : 'stepper right none'}}">
	                                                <text class="{{item.quantity > 1 ? 'normal stepper-text' : 'disabled stepper-text'}}" @tap="bindMinus(item.id)">-</text>
	                                                <view class="stepper-view">{{item.quantity}}</view>
	                                                <text class="normal stepper-text" @tap="bindPlus(item.id)">+</text>
	                                            </view>                          
	                                        </view>    
                                        </view>
                                    </view>                    
                                </view>            
                            </view>
                        </view>
                    </view>
                    <view class="good-del left">              
                        <view class="good-b" @tap="del(item.shoppingCartId)">
                            <!--<view class="delBtn"><image src="http://image.vdongchina.com/M00/03/2E/ZSUkmVnfBnyEPE0dAAAAANxFDZQ252.png" class="good-del-image"></image></view>-->
                            <view class="del">删除</view>               
                        </view>
                    </view> 
                </view>
            </checkbox-group> 
            <view class="set-cant">
            	<view class="clear">
                    <view class="left allcheck">
                        <checkbox-group class="group" @change="allChange">
                            <checkbox value="10" checked="{{check}}" class="item-checkbox allcheck-checkbox"></checkbox>   
                            <view class="label-icon">
                                <view class="label-icon-checked" style="{{check ? 'opacity:1' : 'opacity:0'}}"><image src="http://image.vdongchina.com/M00/06/26/ZSUkmVoZD4SEZscSAAAAALbSXGM412.png" class="label-icon-checked-image allcheck-image"></image></view>
                            </view>
                            <text style="height: 88rpx;line-height: 96rpx;">全部</text>
                        </checkbox-group>
                    </view>
                    <view class="right clear">
                        <view class="left setText">
                            <view class="count1">不含运费</view>
                            <view class="count2" style="color: #262833;">合计：￥<view class="price_num">{{totalPrice}}</view></view>
                            <!-- <view class="count">不含运费、优惠扣减</view> -->
                        </view>
                        <view class="left setBtn" @tap="checkoutHandler">结算({{checkedCount}})</view>
                    </view>  
            	</view>
            	
            	<view style="{{'background:' + bgColor}}" class="bottom-navs" id="nav" wx:if="{{hidden}}">
			      <view class="nav-item" wx:for="{{navs}}" wx:key="to">
			        <view wx:if="{{active==index && item.to!=='kefu'}}" @tap="itemTapHandler(item.to)">
			          <image src="{{item.activeUrl}}" style="{{'height:' + size*2+'rpx; width:' + size*2+'rpx'}}" class="nav-icon"></image>
			          <text style="{{'color:' + activeColor }}" class="nav-text">{{item.text}}</text>
			        </view>
			
			        <view wx:if="{{active!==index && item.to!=='kefu'}}" @tap="itemTapHandler(item.to,index)">
			          <image src="{{item.url}}" style="{{'height:' + size*2+'rpx; width:' + size*2+'rpx'}}" class="nav-icon"></image>
			          <text style="{{'color:' + color }}" class="nav-text">{{item.text}}</text>
			        </view>
					
				    <button  open-type="contact" class="kefu" wx:if="{{item.to=='kefu'}}">
				        <image src="{{item.url}}" style="{{'height:' + size*2+'rpx; width:' + size*2+'rpx'}}" class="nav-icon"></image>
				        <text :style="'color:'+color" class="nav-text">{{item.text}}</text>
				    </button>
			      </view>
			    </view>
            </view>
        </view>
        <view class="defaults" wx:else>
            <!-- <view class="classname"><image class="defaultsImg" src="http://image.vdongchina.com/M00/03/2A/ZSUkmVnewUyETdleAAAAAPK5Awc667.png"></image></view>
            <view class="classname">很遗憾，您的购物车是空的</view>
            <view class="defBtn main-bord main-color clear" @tap="defBtn">
                <view class="left defBtn-img"><image class="defBtn-image" src="http://image.vdongchina.com/M00/03/2A/ZSUkmVnexKCEU6pqAAAAAFtgt7o086.png"></image></view>
                <text class="left defBtn-text">返回</text>
            </view> -->
            <image class="shop_t" src="http://image.vdongchina.com/M00/06/2A/ZSUkmVoZPA2EVA4PAAAAAGMTcJY204.png"></image>
            <view class="shop_m">购物车还是为空的哦～</view>
            <view class="shop_b">这里的东西不错哦，赶紧去挑选几样不错的 商品吧！</view>
            
            <view class="set-cant">
            	<view style="{{'background:' + bgColor}}" class="bottom-navs" id="nav" wx:if="{{hidden}}">
			      <view class="nav-item" wx:for="{{navs}}" wx:key="to">
			        <view wx:if="{{active==index && item.to!=='kefu'}}" @tap="itemTapHandler(item.to)">
			          <image src="{{item.activeUrl}}" style="{{'height:' + size*2+'rpx; width:' + size*2+'rpx'}}" class="nav-icon"></image>
			          <text style="{{'color:' + activeColor }}" class="nav-text">{{item.text}}</text>
			        </view>
			
			        <view wx:if="{{active!==index && item.to!=='kefu'}}" @tap="itemTapHandler(item.to,index)">
			          <image src="{{item.url}}" style="{{'height:' + size*2+'rpx; width:' + size*2+'rpx'}}" class="nav-icon"></image>
			          <text style="{{'color:' + color }}" class="nav-text">{{item.text}}</text>
			        </view>
					
				    <button  open-type="contact" class="kefu" wx:if="{{item.to=='kefu'}}" session-from="{{appid}}">
				        <image src="{{item.url}}" style="{{'height:' + size*2+'rpx; width:' + size*2+'rpx'}}" class="nav-icon"></image>
				        <text :style="'color:'+color" class="nav-text">{{item.text}}</text>
				    </button>
			      </view>
			    </view>
            </view>
        </view>

        <view class="{{loadClasses}}">
            <image src="http://image.vdongchina.com/M00/03/31/ZSUkmVnfH2uEeywSAAAAAIKylIc100.gif" style="width:124rpx;height:124rpx;"></image>
        </view>
    </view>
</template>

<script>
export default {
    editorConfig: {
	    fixed:{
	      label:'导航位置',
	      type:'String',
	      value:'bottom',
	      director:'radio2'
	    },
	    hidden:{
	      label:'底部导航显示与否',
	      type:'Boolean',
	      value:false,
	      director : 'switch2'
	    },
	    color: {
	      el: ['text', 'color'],
	      label: '文本初始颜色',
	      type: 'String',
	      value: '#000',
	      director : 'ColorPicker'
	    },
	    activeColor: {
	      el: ['text', 'color'],
	      label: '文本选中颜色',
	      type: 'String',
	      value: '#38adff',
	      director : 'ColorPicker'
	    },
	    bgColor: {
	      el: ['text', 'color'],
	      label: '导航背景色',
	      type: 'String',
	      value: '#f7f7fa',
	      director : 'ColorPicker'
	    },
	    size: {
	      el: ['number'],
	      label: '图标尺寸设定',
	      type: 'Number',
	      value: '25',
	      director: 'Fsize'
	    },
	    navs: {
	      el: ['navigation'],
	      label: '图片填充',
	      type: 'navigation',
	      value: [
	        {
	          text: '首页',
	          url: 'http://image.vdongchina.com/M00/00/B7/ZSUkmVmbvwaEJusMAAAAABh0uRY923.png',
	          activeUrl: 'http://image.vdongchina.com/M00/00/B8/ZSUkmVmbvw6ESqIOAAAAALEJgTo719.png',
	          to: '',
	          code: ''
	        },
	        {
	          text: '发现',
	          url: 'http://image.vdongchina.com/M00/00/B8/ZSUkmVmbvz2EaQl3AAAAANpYvKA331.png',
	          activeUrl: 'http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv0KEJc-SAAAAAN0ThAI854.png',
	          to: '',
	          code: ''
	        },
	        {
	          text: '购物车',
	          url: 'http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv2KEPMfBAAAAAInFaaE694.png',
	          activeUrl: 'http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv2eEeDyxAAAAAPgfdec987.png',
	          to: '',
	          code: ''
	        },
	        {
	          text: '我的',
	          url: 'http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv3mESU8_AAAAAM9rVBU163.png',
	          activeUrl: 'http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv3-ELsyiAAAAAHyl0bU181.png',
	          to: '',
	          code: ''
	        }
	      ],
	      director: 'navigation'
	    }
	  },
	  comName:"购物车",
	  props: {
	      fixed: {
	        default: 'bottom',
	        type: String
	      },
	      hidden:{
	        default: false,
	        type: Boolean
	      },
	      bgColor: {
	        default: '#f7f7fa',
	        type: String
	      },
	      color: {
	        default: '#000',
	        type: String
	      },
	      activeColor: {
	        default: '#38adff',
	        type: String
	      },
	      size: {
	        default: '25',
	        type:String
	      },
	      navs: {
	        default:function(){
	        return [
	          {
	            text: '首页',
	            url: 'http://image.vdongchina.com/M00/00/B7/ZSUkmVmbvwaEJusMAAAAABh0uRY923.png',
	            activeUrl: 'http://image.vdongchina.com/M00/00/B8/ZSUkmVmbvw6ESqIOAAAAALEJgTo719.png',
	            to: '',
	            code: ''
	          },
	          {
	            text: '发现',
	            url: 'http://image.vdongchina.com/M00/00/B8/ZSUkmVmbvz2EaQl3AAAAANpYvKA331.png',
	            activeUrl: 'http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv0KEJc-SAAAAAN0ThAI854.png',
	            to: '',
	            code: ''
	          },
	          {
	            text: '购物车',
	            url: 'http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv2KEPMfBAAAAAInFaaE694.png',
	            activeUrl: 'http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv2eEeDyxAAAAAPgfdec987.png',
	            to: '',
	            code: ''
	          },
	          {
	            text: '我的',
	            url: 'http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv3mESU8_AAAAAM9rVBU163.png',
	            activeUrl: 'http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv3-ELsyiAAAAAHyl0bU181.png',
	            to: '',
	            code: ''
	          }
	        ]
	      },
	        type: Array
	      }
	  },
    data () {
        return  {
        	active: null,
        	color2:'',
            check: false,
            items: [],
            totalPrice: 0,
            checkedCount: 0,
            display: 0,
            delBtnWidth: 60,//删除按钮宽度单位（px）
            carNum:1,//购物车商品数量
            load: 'none',//加载动画
            ordno:'',
            appid:this.$root.appid
        }
    },
    computed: {
        loadClasses () {
            return `loading ${this.load}`
        }
    },
    onShow () {
		var that = this
	    var navData = this.navs
	    var isExit = false // 存在对象没
	    var pageName 
	    if(typeof this.$store == 'object'){ //说明在编辑器里编辑
	      pageName = this.$store.state.pageName
	    }else if(typeof window == 'object'){  // H5
	      pageName = window.location.href.split('#/')[1].split('/')[0]
	    }else if(typeof getCurrentPages == 'function'){ // 小程序
      		pageName = getCurrentPages()[getCurrentPages().length-1].__route__.split('/')[1]
	    }
	    navData.forEach(function(item,idx){
	      if(item.to !=''&&item.to.split('/').pop()==pageName){
	        that.active = idx
	        isExit = true
	      }
	    });
	    !isExit&&(this.active=null)
    	
    	this.color2=this.$root.globalData.color
        var that = this    

        wx.request({
            url: this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/shopping/list',
            data: {
                token: that.$root.globalData.token,
                pid:that.$root.globalData.pid
            },
            method: 'GET',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success (res) {
            	if (res.data.code == '200') {
            		that.items = res.data.object
            		that.carNum = res.data.object.length           		
            	}else{
                    that.carNum = 0
                }

            }
        })


    },
    methods: {
    	itemTapHandler (to,index) {
	        if(to == "../orderList/orderList" || to == "../car/car" || to == "../personCenter/personCenter"){
		        wx.navigateTo({
		            url: to
		        })	        	
	        }else{
		        wx.redirectTo({
		            url: to
		        })	        	
	        }
	    },
        findItemIndexByUserId (userId) {
            if (userId >= 0) {
                for (var i = 0, len = this.items.length; i < len; i++) {
                    if (this.items[i].id == userId)
                    return i
                }
            }
        },
        
        changeNum (userId, isPlus) {    
        	var that = this
            //获取点击的是哪一个
            var items = this.items//所有items
            var index = this.findItemIndexByUserId(userId)
            var item = items[index]//被点击的item           
            if (item) {
                var num = item.quantity
                
            if (isPlus){//加
                num++
                    wx.request({
                        url: this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/shopping/updateStock',
                        data: {
                            token: getApp().globalData.token,
                            shoppingCartId: item.shoppingCartId,
                            quantity:num,
                            pid:that.$root.globalData.pid
                        },
                        method: 'POST',
                        header: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        success (res) {		
                        	console.log("购物车数量刷新成功")
                        }
                    }) 
               }
            else if (num > 1){//减（大于1）
                num--
                    wx.request({
                        url: this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/shopping/updateStock',
                        data: {
                            token: getApp().globalData.token,
                            shoppingCartId: item.shoppingCartId,
                            quantity:num,
                            pid:that.$root.globalData.pid
                        },
                        method: 'POST',
                        header: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        success (res) {		
                        	console.log("购物车数量刷新成功")
                        }
                    }) 
               }
                items[index].quantity = num  

                this.items = items               
            }


            this.getTotalPrice()
            
        },
        bindMinus (index) {
            this.changeNum(index, false)
        },
        bindPlus (index) {
            this.changeNum(index, true)
        },
        goodsNum (id) {
            var items = this.items//所有items
            var index = this.findItemIndexByUserId(id)
            var item = items[index]//被点击的item
            if (item) {
                item.display = true
            }
            items[index] = item
            this.items = items
        },
        //计算总金额
        getTotalPrice () {
        	
            var to = 0
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].checked)
                    to += this.items[i].price * this.items[i].quantity
            } 
            this.totalPrice = to.toFixed(2)
            
            console.log(this.totalPrice,"this.totalPrice=====")
        },
        //购物车单选
        checkboxChange (e) {
            var checked = e.detail.value
            this.checkedCount = checked.length

            var items = []
            for (var i = 0; i < this.items.length; i++) {
                if (checked.indexOf((this.items[i].id).toString()) !== -1) {
                    items[i] = Object.assign({}, this.items[i], {checked:true})

                } else {
                    items[i] = Object.assign({}, this.items[i], {checked:false})
                }
            }
            this.items = items
            this.getTotalPrice()
        },
        //购物车全选
        allChange (e) {
            var checked = e.detail.value
            if (this.check == false) {
                this.check = true
                //所有chekcbox选中       
                var values = []
                for (var i = 0, len = this.items.length; i < len; i++) {
                    values.push((this.items[i].id).toString())
                }
                this.checkboxChange({ detail: { value: values } })
            } else {
                this.check = false
                this.checkboxChange({ detail: { value: [] } })
            }
        },
        //手指刚放到屏幕触发
        touchS (_, e) {
            //判断是否只有一个触摸点
            if (e.touches.length == 1) {
                //记录触摸起始位置的X坐标
                this.startX = e.touches[0].clientX
            }
        },
        //触摸时触发，手指在屏幕上每移动一次，触发一次
        touchM (index, e) {
            var that = this
            if (e.touches.length == 1) {
                //记录触摸点位置的X坐标
                var moveX = e.touches[0].clientX
                //计算手指起始点的X坐标与当前触摸点的X坐标的差值
                var disX = that.startX - moveX
                //delBtnWidth 为右侧按钮区域的宽度
                var delBtnWidth = that.delBtnWidth
                var txtStyle = ''
                if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
                    txtStyle = 'left:0'
                } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
                    txtStyle = 'left:-' + disX + 'px'
                    if (disX >= delBtnWidth) {
                        //控制手指移动距离最大值为删除按钮的宽度
                        txtStyle = 'left:-' + delBtnWidth + 'px'
                    }
                }
                //获取手指触摸的是哪一个item
                var list = JSON.parse(JSON.stringify(that.items))
                //将拼接好的样式设置到当前item中
                list[index].txtStyle = txtStyle
                //更新列表的状态
                this.items = list
            }
        },
        touchE (index, e) {
            var that = this
            if (e.changedTouches.length == 1) {
                //手指移动结束后触摸点位置的X坐标
                var endX = e.changedTouches[0].clientX
                //触摸开始与结束，手指移动的距离
                var disX = that.startX - endX
                var delBtnWidth = that.delBtnWidth
                //如果距离小于删除按钮的1/2，不显示删除按钮
                var txtStyle = disX > delBtnWidth / 2 ? 'left:-' + delBtnWidth + 'px' : 'left:0'
                //获取手指触摸的是哪一项
                var list = JSON.parse(JSON.stringify(that.items))
                list[index].txtStyle = txtStyle
                //更新列表的状态
                that.items = list
            }
        },
        confirmDel (data) {//先选择是否删除，再调用接口
            if (data) {
                var that = this
                wx.showModal({
                    title: '删除商品',
                    content: '是否删除',
                    success (res) {
                        if (res.confirm) {
                            that.postDel(data)
                            that.load = 'block'
                        } else {
                        }
                    }
                })
            }
        },
        //购物车删除
        postDel (data) {
            if (data) {
                var that = this
                wx.request({
                    url: this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/shopping/delete',
                    data: {
                        idsList: data,
                        token: getApp().globalData.token,
                        pid:that.$root.globalData.pid
                    },
                    method: 'POST',
                    header: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    success (res) {
                        //删除成功，清除页面上对应的记录
                        if (res.data.code == "200") {
                            that.onShow() //重新从后台获取删除后的记录
                        }
                        that.load = 'none'
                    },
                })
            }
        },
        del (id) {//删除
            if(id) {
            	this.confirmDel(id)
            }
        },
        checkoutHandler() {
                var that = this
                var to = []
                this.items.map(function(item, i) {
                    if(item.checked){ 	    					
                    to.push(item)
                    }
                })   
                if(to.length) {
                    var shoppingCartId=[]
                    for(var i=0;i<to.length;i++){
                        shoppingCartId.push(to[i].shoppingCartId)
                    }
                        wx.request({
                        url: this.$root.apiServer + this.$root.appid + this.$root.variate + '/basic/client/distribution/order/save',
                        data: {
                            token: getApp().globalData.token,
                            idsList:shoppingCartId,
                            pid:that.$root.globalData.pid
                        },
                        method: 'POST',
                        header: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        success (res) {
                            if (res.data.code == '200') {
                                if(res.data.object.length == 1){
                                    var ordNum = res.data.object[0]
                                    wx.navigateTo({
                                        url: '../f_confirmorder/f_confirmorder?ordno='+ordNum
                                    })
                                }else{
                                    wx.navigateTo({
                                        url: '../f_order/f_order?ordno='+res.data.object
                                    })
                                }
                            } else {
                                wx.showModal({
                                    title: '提示',
                                    content: res.data.message,
                                })
                            }
                        }
                    }) 	    				
                } else {
                    wx.showModal({
                        title: '提示',
                        content: '请选择商品'
                    })
                }

            },
            defBtn() {
                wx.redirectTo({
                    url: '../index/index'
                })
            }
        }
    }
</script>

<style scoped>
.defaults{
    margin-top:0;
    height:737rpx;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.shop_t{
    height: 200rpx;
    width:200rpx;
    display: block;
    margin-top:200rpx;
}
.shop_m{
    height: 56rpx;
    line-height: 56rpx;
    text-align: center;
    margin:40rpx 0 30rpx;
    font-size:40rpx;
    color:#000;
}
.shop_b{
    height: 84rpx;
    line-height: 42rpx;
    font-size:28rpx;
    color:888;
    width:532rpx;
    text-align: center;
}
page{background:#f9f9f9;}
.page{background:#f9f9f9;}
.items{position: relative; width: 100%;height: 210rpx;margin-top: 20rpx;overflow: hidden;background: #fff}
.scroll{height: 210rpx;white-space: nowrap;display: flex;position: absolute; top:0;left:0;width:100%;z-index: 10}
.goods-item{background:#ffffff; width: 100%; height: 236rpx; display: inline-block;overflow: hidden;}

.good-prod{width: 100%;height: 210rpx;}
.good-cant{margin-top: 30rpx;position: relative;}
.goods-check,.goods-img,.goods-text{float: left;}
.goods-check{margin-top: 50rpx;position: relative;margin-left:10rpx;}
.item-checkbox{opacity: 0;position: absolute;left: 0;top: 0;width: 50rpx;height: 50rpx;z-index: 99}
.label-icon {position: relative;display: inline-block;vertical-align: middle;width:36rpx;height:36rpx; border:solid 2rpx #c8c8c8;border-radius: 50%;margin-right:24rpx;margin-bottom:8rpx;}
.label-icon-checked { position: absolute;top:-1rpx;left:-1rpx;width:40rpx;height: 40rpx;}
.label-icon-checked .label-icon-checked-image{position: absolute;width:40rpx;height:40rpx; }

.goods-img{width: 140rpx; height: 140rpx;margin-right:20rpx;}
.empty{border:solid 2rpx #e3e3e3;font-size:30rpx;line-height: 140rpx;text-align: center }

.goods-img .goods-img-image{width: 100%; height: 100%;border-radius: 6rpx;display: block;}
.goods-text{font-size: 24rpx;width: 470rpx;}
.goods-name{
	color:#333;
    width: 300rpx;
    font-size: 26rpx;
    line-height: 32rpx;
    height:64rpx;
    overflow:hidden;
    text-overflow: ellipsis;
    display:-webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient:vertical;
    white-space: normal;
}
.goods-norms{color: #999;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width: 300rpxrpx;}
.goods-price{font-size: 20rpx; color:#333;}
.goods-price text{font-size: 28rpx;}
.goods-num{color: #333333;position: relative} 
.numBtn{position: absolute;right: 0;top:0;}
.numBtn .numBtn-image{width:30rpx;height: 30rpx;}
.stepper {width: 158rpx;height: 36rpx;border: 1px solid #ccc;border-radius: 4rpx;line-height: 36rpx;}
.stepper .stepper-text {width: 50rpx;text-align: center;float: left;font-size: 24rpx;}
.stepper .stepper-view {width: 54rpx;height: 36rpx;float: left;text-align: center;font-size: 30rpx;border-left: 1px solid #ccc;border-right: 1px solid #ccc;}

.block{display: block}
.none{display: none}

.stepper .normal{color: black;background: #ffffff}
.stepper .disabled{color: #ccc;background: #f6f6f6}

.good-del{width: 120rpx;position: absolute;right: 0;top: 0;z-index: 9;height: 210rpx;background: #262833}
.good-b{text-align: center;color:#ffffff;width: 120rpx;height: 210rpx;}
.good-del .delBtn{padding-top:75rpx; }
.good-del .delBtn .good-del-image{width: 34rpx;height: 34rpx;}
.good-del .del{font-size: 28rpx;line-height: 210rpx;}

.set-cant{width: 100%;background: #ffffff;position: fixed;bottom: 0;z-index: 10;}
.allcheck{line-height: 88rpx;font-size: 26rpx;margin-left: 30rpx;}
.allcheck .allcheck-checkbox{left: 20rpx;}
.allcheck .label-icon{width: 36rpx;height: 36rpx;position: relative;}
.allcheck .label-icon-checked {width:38rpx; height: 38rpx;position: absolute;left:-1rpx;}
.allcheck .label-icon-checked .allcheck-image{width:40rpx; height: 40rpx}
.setText{min-width:300rpx; display: flex; justify-content: flex-end;align-items: center;height:88rpx;margin-right:30rpx;}
.count1{font-size: 22rpx;color:#878787;line-height: 96rpx;height:88rpx;margin-right:6rpx;}
.count2{
    font-size:22rpx;color:#333333;line-height: 92rpx;height:88rpx;
}
.count2 .price_num{
    font-size:30rpx;color:#262626;line-height: 88rpx;
    height: 88rpx;
    display: inline-block;
}
.setBtn{width: 210rpx;height: 94rpx;text-align: center;line-height: 96rpx;color: #ffffff;font-size: 32rpx;background: #262833;}
.defBtn{width: 280rpx;box-sizing: border-box;border:2rpx solid #ff3e78}
.defBtn-img{margin-left: 80rpx;position: relative;width:40rpx ;height: 90rpx;}
.defBtn .defBtn-image{width: 37rpx;height: 30rpx;margin:0;position: absolute;left: 0;top:50%;margin-top: -15rpx;}
.defBtn-text{margin-left:10rpx; }


.bottom-navs{
  padding: 8rpx 0 6rpx;
  box-sizing: border-box;
  border-top: 2rpx solid #ccc;
  display: flex;
  position:static;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 999;
}
.bottom-navs .nav-item{
  flex: 1;
  text-align: center;
}
.bottom-navs .nav-icon{
  vertical-align: top;
}
.bottom-navs .nav-text{
  font-size: 20rpx;
  display: block;
  height: 22rpx;
  line-height: 22rpx;
	margin-top: 11rpx;
}
.txt-c{
  text-align:center;
  font-size:32rpx;
  padding:20rpx;
}
.bottom-navs .kefu{
  background: rgba(0,0,0,0);
  border:none;
  margin: 0;
  padding: 0;
  border-radius: 0;
  font-size: 0;
  display: inline-block;
  height: 100%;
  vertical-align: top;
}
.bottom-navs .kefu::after{
  content: none;
}
</style>