<template>
    <view>
        <view class="topLine"></view>
        <view wx:if="{{carNum > 0}}">
            <checkbox-group class="group" @change="checkboxChange">
                <view class="items"  wx:for="{{items}}" wx:key="userId">
                    <view class="scroll" @touchstart="touchS(index, $event)" @touchmove="touchM(index, $event)" @touchend="touchE(index, $event)" style="{{item.txtStyle}}">
                        <view class="goods-item clear" >
                            <view class="good-prod left">
                                <view class="auto clear good-cant">
                                    <view class="goods-check" >
                                        <checkbox class="item-checkbox" value="{{item.shoppingCartId}}" checked="{{item.checked}}"></checkbox>   
                                        <view class="label-icon">
                                            <view class="label-icon-checked firstColor" style="{{item.checked ? 'opacity:1;'+'background:' + color2 : 'opacity:0'}}">
                                                <image src="http://image.vdongchina.com/M00/0E/AB/ZSUkmVqrOcyEYkZFAAAAAJIOxWY360.png" class="label-icon-checked-image"></image>
                                            </view>
                                        </view>                
                                    </view>
                                    <view class="goods-img">
                                    	<view wx:if="{{item.productImageUrl && img.startsWith('http://')}}">
                                    		<image src="{{item.productImageUrl}}" class="goods-img-image"></image>
                                    	</view>
                                        <view wx:if="{{item.productImageUrl && !img.startsWith('http://')}}">
                                    		<image src="{{'http://image.vdongchina.com/'+item.productImageUrl}}" class="goods-img-image"></image>
                                    	</view>
                                        <view wx:if="{{!item.productImageUrl}}" class="empty goods-img">暂无图片</view>
                                    </view>
                                    <view class="goods-text">
                                        <view class="goods-name">
                                        	<text wx:if="{{item.type == 1}}" style="color:#11BD50">#一键购#</text>
                                        	<text wx:if="{{item.type == 2}}" style="color:#11BD50">#分销#</text>
                                        	<text wx:if="{{item.type == 3}}" style="color:#11BD50">#餐饮#</text>
                                        	{{item.productName}}
                                        </view>

                                        <view class="goods-norms">{{item.skuName}}</view>
                                        <view class="classname clear">
                                            
                                            <!--<view class="{{item.display ? 'goods-num right none' : 'goods-num right '}}" @tap="goodsNum(item.id)">
                                                <text>x{{item.quantity}}</text>
                                                <view class="numBtn"><image src="http://image.vdongchina.com/M00/03/33/ZSUkmVnfK9OEXodVAAAAABLfGnU893.png" class="numBtn-image"></image></view>
                                            </view>   
                                            <view class="{{item.display ? 'stepper right block' : 'stepper right none'}}">
                                                <text class="{{item.quantity > 1 ? 'normal stepper-text' : 'disabled stepper-text'}}" @tap="bindMinus(item.id)">-</text>
                                                <view class="stepper-view">{{item.quantity}}</view>
                                                <text class="normal stepper-text" @tap="bindPlus(item.id)">+</text>
                                            </view>                          -->
                                            <view class="stepper">
                                                <text class="{{item.quantity > 1 ? 'normal stepper-text' : 'disabled stepper-text'}}" @tap="bindMinus(item.shoppingCartId)">-</text>
                                                <view class="stepper-view">{{item.quantity}}</view>
                                                <text class="normal stepper-text" @tap="bindPlus(item.shoppingCartId)">+</text>
                                            </view>
                                        </view>                                
                                    </view>   
                                    <view class="goods-price main-color right" style="{{'color:' + color2 }}">￥{{item.skuPrice}}</view>                 
                                </view>            
                            </view>
                        </view>
                    </view>
                    <view class="good-del left">              
                        <view class="main-back good-b" @tap="del(item.shoppingCartId)" style="{{'background:' + color2}}">
<!--                            <view class="delBtn"><image src="http://image.vdongchina.com/M00/03/2E/ZSUkmVnfBnyEPE0dAAAAANxFDZQ252.png" class="good-del-image"></image></view>-->
                            <view class="del">删除</view>               
                        </view>
                    </view> 
                </view>
            </checkbox-group> 
            <view class="set-cant">
            	<view class="clear">
                    <view class="left allcheck clear">
                        <checkbox-group class="group left" @change="allChange">
                            <checkbox value="10" checked="{{check}}" class="item-checkbox allcheck-checkbox"></checkbox>   
                            <view class="label-icon">
                                <view class="label-icon-checked" style="{{check ? 'opacity:1;'+'background:' + color2 : 'opacity:0'}}">
                                    <image src="http://image.vdongchina.com/M00/0E/AB/ZSUkmVqrOcyEYkZFAAAAAJIOxWY360.png" class="label-icon-checked-image allcheck-image"></image>
                                </view>
                            </view>                            
                        </checkbox-group>
                        <text class="left groupTxt">全部</text>
                    </view>
                    <view class="right clear">
                        <view class="left setText clear">
                            
                            <view class="count left">不含运费</view>
                            <view class="main-color left"  style="{{'color:' + color2}}">合计：￥<text style="font-size: 28rpx;">{{totalPrice}}</text></view>
                        </view>
                        <view class="left setBtn main-back" @tap="checkoutHandler" style="{{'background:' + color2}}">结算({{checkedCount}})</view>
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
					
				    <button  open-type="contact" class="kefu" wx:if="{{item.to=='kefu'}}" session-from="{{appid}}">
				        <image src="{{item.url}}" style="{{'height:' + size*2+'rpx; width:' + size*2+'rpx'}}" class="nav-icon"></image>
				        <text style="{{'color:'+color}}" class="nav-text">{{item.text}}</text>
				    </button>
			      </view>
			    </view>
            </view>
        </view>
        <view class="defaults"  wx:if="{{carNum == 0}}">
            <view class="classname"><image class="defaultsImg" src="http://image.vdongchina.com/M00/03/2A/ZSUkmVnewUyETdleAAAAAPK5Awc667.png"></image></view>
            <view class="classname">很遗憾，您的购物车是空的</view>
            <view class="defBtn main-bord main-color clear" @tap="defBtn">
                <view class="left defBtn-img"><image class="defBtn-image" src="http://image.vdongchina.com/M00/03/2A/ZSUkmVnexKCEU6pqAAAAAFtgt7o086.png"></image></view>
                <text class="left defBtn-text">返回</text>
            </view>
        </view>

        <view class="{{load}}" style="width: 124rpx;height: 124rpx;position: fixed;z-index: 99;left: 50%;top: 50%;margin-left: -62rpx;margin-top: -62rpx;">
            <image src="http://image.vdongchina.com/M00/03/31/ZSUkmVnfH2uEeywSAAAAAIKylIc100.gif" style="width:124rpx;height:124rpx;"></image>
        </view>
    </view>
</template>

<script>
export default {
  editorConfig: {
    fixed: {
      label: "导航位置",
      type: "String",
      value: "bottom",
      director: "radio2"
    },
    hidden: {
      label: "底部导航显示与否",
      type: "Boolean",
      value: false,
      director: "switch2"
    },
    color: {
      el: ["text", "color"],
      label: "文本初始颜色",
      type: "String",
      value: "#000",
      director: "ColorPicker"
    },
    activeColor: {
      el: ["text", "color"],
      label: "文本选中颜色",
      type: "String",
      value: "#38adff",
      director: "ColorPicker"
    },
    bgColor: {
      el: ["text", "color"],
      label: "导航背景色",
      type: "String",
      value: "#f7f7fa",
      director: "ColorPicker"
    },
    size: {
      el: ["number"],
      label: "图标尺寸设定",
      type: "Number",
      value: "25",
      director: "Fsize"
    },
    navs: {
      el: ["navigation"],
      label: "图片填充",
      type: "navigation",
      value: [
        {
          text: "首页",
          url:
            "http://image.vdongchina.com/M00/00/B7/ZSUkmVmbvwaEJusMAAAAABh0uRY923.png",
          activeUrl:
            "http://image.vdongchina.com/M00/00/B8/ZSUkmVmbvw6ESqIOAAAAALEJgTo719.png",
          to: "",
          code: ""
        },
        {
          text: "发现",
          url:
            "http://image.vdongchina.com/M00/00/B8/ZSUkmVmbvz2EaQl3AAAAANpYvKA331.png",
          activeUrl:
            "http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv0KEJc-SAAAAAN0ThAI854.png",
          to: "",
          code: ""
        },
        {
          text: "购物车",
          url:
            "http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv2KEPMfBAAAAAInFaaE694.png",
          activeUrl:
            "http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv2eEeDyxAAAAAPgfdec987.png",
          to: "",
          code: ""
        },
        {
          text: "我的",
          url:
            "http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv3mESU8_AAAAAM9rVBU163.png",
          activeUrl:
            "http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv3-ELsyiAAAAAHyl0bU181.png",
          to: "",
          code: ""
        }
      ],
      director: "navigation"
    }
  },
  comName: "购物车",
  props: {
    fixed: {
      default: "bottom",
      type: String
    },
    hidden: {
      default: false,
      type: Boolean
    },
    bgColor: {
      default: "#f7f7fa",
      type: String
    },
    color: {
      default: "#000",
      type: String
    },
    activeColor: {
      default: "#38adff",
      type: String
    },
    size: {
      default: "25",
      type: String
    },
    navs: {
      default: function() {
        return [
          {
            text: "首页",
            url:
              "http://image.vdongchina.com/M00/00/B7/ZSUkmVmbvwaEJusMAAAAABh0uRY923.png",
            activeUrl:
              "http://image.vdongchina.com/M00/00/B8/ZSUkmVmbvw6ESqIOAAAAALEJgTo719.png",
            to: "",
            code: ""
          },
          {
            text: "发现",
            url:
              "http://image.vdongchina.com/M00/00/B8/ZSUkmVmbvz2EaQl3AAAAANpYvKA331.png",
            activeUrl:
              "http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv0KEJc-SAAAAAN0ThAI854.png",
            to: "",
            code: ""
          },
          {
            text: "购物车",
            url:
              "http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv2KEPMfBAAAAAInFaaE694.png",
            activeUrl:
              "http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv2eEeDyxAAAAAPgfdec987.png",
            to: "",
            code: ""
          },
          {
            text: "我的",
            url:
              "http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv3mESU8_AAAAAM9rVBU163.png",
            activeUrl:
              "http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv3-ELsyiAAAAAHyl0bU181.png",
            to: "",
            code: ""
          }
        ];
      },
      type: Array
    }
  },
  data() {
    return {
      active: null,
      color2: "#262833",
      check: false,
      items: [],
      totalPrice: 0,
      checkedCount: 0,
      display: 0,
      delBtnWidth: 60, //删除按钮宽度单位（px）
      carNum: 1, //购物车商品数量
      load: "display:none", //加载动画
      appid: this.$root.appid
    };
  },
  computed: {
    //      loadClasses () {
    //          return `loading ${this.load}`
    //      }
  },
  onLoad() {
    var that = this;
    var navData = this.navs;
    var isExit = false; // 存在对象没
    var pageName;
    if (typeof this.$store == "object") {
      //说明在编辑器里编辑
      pageName = this.$store.state.pageName;
    } else if (typeof window == "object") {
      // H5
      pageName = window.location.href.split("#/")[1].split("/")[0];
    } else if (typeof getCurrentPages == "function") {
      // 小程序
      pageName = getCurrentPages()[
        getCurrentPages().length - 1
      ].__route__.split("/")[1];
    }
    navData.forEach(function(item, idx) {
      if (item.to != "" && item.to.split("/").pop() == pageName) {
        that.active = idx;
        isExit = true;
      }
    });
    !isExit && (this.active = null);
    //  	if(this.$root.globalData.color){
    //  		this.color2=this.$root.globalData.color
    //  	}

    var that = this;
    var servsers = that.$root.globalData.servsers;

    // wx.request({
    //     url: this.$root.apiServer+this.$root.appid+'/basic/api/cart/listProduct',
    //     data: {
    //         token: that.$root.globalData.token
    //     },
    //     method: 'POST',
    //     header: {
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //     },
    //     success (res) {
    //         that.items = res.data.data
    //         that.carNum = res.data.data.length
    //         that.items.forEach(item => {
    //             item.display = false
    //         })
    //     }
    // })

    wx.request({
      url:
        this.$root.apiServer +
        this.$root.variate +
        this.$root.appid +
        "/basic/client/shoppingCart/cart/listProduct/",
      data: {
        token: that.$root.globalData.token
      },
      method: "GET",
      header: {
        "Content-Type": "application/json"
      },
      success(res) {
        if (res.data.success == true) {
          that.items = res.data.object;
          that.carNum = res.data.object.length;
        }
      }
    });
  },
  methods: {
    itemTapHandler(to, index) {
      if (!to || typeof to !== "string") return;
      if (to.indexOf("appid=") !== -1) {
        var path = to.split("appid=")[0];
        var appid = to.split("appid=")[1];
        wx.navigateToMiniProgram({
          appId: appid,
          path: path
        });
      } else {
        if (
          to == "../orderList/orderList" ||
          to == "../car/car" ||
          to == "../personCenter/personCenter"
        ) {
          wx.navigateTo({
            url: to
          });
        } else {
          wx.redirectTo({
            url: to
          });
        }
      }
    },
    findItemIndexByUserId(userId) {
      if (userId >= 0) {
        for (var i = 0, len = this.items.length; i < len; i++) {
          if (this.items[i].shoppingCartId == userId) return i;
        }
      }
    },

    changeNum(userId, isPlus) {
      //获取点击的是哪一个
      var items = this.items; //所有items
      var index = this.findItemIndexByUserId(userId);
      var item = items[index]; //被点击的item
      if (item) {
        var num = item.quantity;

        if (isPlus) {
          //加
          num++;
          wx.request({
            url:
              this.$root.apiServer +
              this.$root.appid +
              "/basic/client/shoppingCart/cart/updateStock",
            data: {
              token: getApp().globalData.token,
              shoppingCartId: item.shoppingCartId,
              quantity: num
            },
            method: "POST",
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            success(res) {
              console.log("购物车数量刷新成功");
            }
          });
        } else if (num > 1) {
          //减（大于1）
          num--;
          wx.request({
            url:
              this.$root.apiServer +
              this.$root.appid +
              "/basic/client/shoppingCart/cart/updateStock",
            data: {
              token: getApp().globalData.token,
              shoppingCartId: item.shoppingCartId,
              quantity: num
            },
            method: "POST",
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            success(res) {
              console.log("购物车数量刷新成功");
            }
          });
        }
        items[index].quantity = num;

        this.items = items;
      }

      this.getTotalPrice();
    },
    bindMinus(index) {
      this.changeNum(index, false);
    },
    bindPlus(index) {
      this.changeNum(index, true);
    },
    goodsNum(id) {
      var items = this.items; //所有items
      var index = this.findItemIndexByUserId(id);
      var item = items[index]; //被点击的item
      if (item) {
        item.display = true;
      }
      items[index] = item;
      this.items = items;
    },
    //计算总金额
    getTotalPrice() {
      var to = 0;
      for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].checked)
          to += this.items[i].skuPrice * this.items[i].quantity;
      }
      this.totalPrice = to.toFixed(2);
    },
    //购物车单选
    checkboxChange(e) {
      var checked = e.detail.value;
      this.checkedCount = checked.length;

      var items = [];
      for (var i = 0; i < this.items.length; i++) {
        if (checked.indexOf(this.items[i].shoppingCartId.toString()) !== -1) {
          items[i] = Object.assign({}, this.items[i], { checked: true });
        } else {
          items[i] = Object.assign({}, this.items[i], { checked: false });
        }
      }
      this.items = items;
      this.getTotalPrice();
    },
    //购物车全选
    allChange(e) {
      var checked = e.detail.value;
      if (this.check == false) {
        this.check = true;
        //所有chekcbox选中
        var values = [];
        for (var i = 0, len = this.items.length; i < len; i++) {
          values.push(this.items[i].shoppingCartId.toString());
        }
        this.checkboxChange({ detail: { value: values } });
      } else {
        this.check = false;
        this.checkboxChange({ detail: { value: [] } });
      }
    },
    //手指刚放到屏幕触发
    touchS(_, e) {
      //判断是否只有一个触摸点
      if (e.touches.length == 1) {
        //记录触摸起始位置的X坐标
        this.startX = e.touches[0].clientX;
      }
    },
    //触摸时触发，手指在屏幕上每移动一次，触发一次
    touchM(index, e) {
      var that = this;
      if (e.touches.length == 1) {
        //记录触摸点位置的X坐标
        var moveX = e.touches[0].clientX;
        //计算手指起始点的X坐标与当前触摸点的X坐标的差值
        var disX = that.startX - moveX;
        //delBtnWidth 为右侧按钮区域的宽度
        var delBtnWidth = that.delBtnWidth;
        var txtStyle = "";
        if (disX == 0 || disX < 0) {
          //如果移动距离小于等于0，文本层位置不变
          txtStyle = "left:0";
        } else if (disX > 0) {
          //移动距离大于0，文本层left值等于手指移动距离
          txtStyle = "left:-" + disX + "px";
          if (disX >= delBtnWidth) {
            //控制手指移动距离最大值为删除按钮的宽度
            txtStyle = "left:-" + delBtnWidth + "px";
          }
        }
        //获取手指触摸的是哪一个item
        var list = JSON.parse(JSON.stringify(that.items));
        //将拼接好的样式设置到当前item中
        list[index].txtStyle = txtStyle;
        //更新列表的状态
        this.items = list;
      }
    },
    touchE(index, e) {
      var that = this;
      if (e.changedTouches.length == 1) {
        //手指移动结束后触摸点位置的X坐标
        var endX = e.changedTouches[0].clientX;
        //触摸开始与结束，手指移动的距离
        var disX = that.startX - endX;
        var delBtnWidth = that.delBtnWidth;
        //如果距离小于删除按钮的1/2，不显示删除按钮
        var txtStyle =
          disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0";
        //获取手指触摸的是哪一项
        var list = JSON.parse(JSON.stringify(that.items));
        list[index].txtStyle = txtStyle;
        //更新列表的状态
        that.items = list;
      }
    },
    confirmDel(data) {
      //先选择是否删除，再调用接口
      if (data) {
        var that = this;
        wx.showModal({
          title: "删除商品",
          content: "是否删除",
          success(res) {
            if (res.confirm) {
              that.postDel(data);
              that.load = "display:block";
            } else {
              console.log("取消操作");
            }
          }
        });
      }
    },
    //购物车删除
    postDel(data) {
      var servsers = getApp().globalData.servsers;
      if (data) {
        var that = this;
        wx.request({
          url:
            this.$root.apiServer +
            this.$root.appid +
            "/basic/client/shoppingCart/cart/batchRemoveProduct",
          data: {
            shopIdList: data,
            token: getApp().globalData.token
          },
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success(res) {
            //删除成功，清除页面上对应的记录
            if (res.data.code == "200") {
              that.onLoad(); //重新从后台获取删除后的记录
            }
            that.load = "display:none";
          }
        });
      }
    },
    del(id) {
      //删除
      if (id) {
        this.confirmDel(id);
      }
    },
    checkoutHandler() {
      var to = [];
      this.items.map(function(item, i) {
        if (item.checked) {
          to.push(item);
        }
      });
      if (to.length) {
        var isAllEqual = true; //默认全等
        for (var i = 0; i < to.length; i++) {
          if (to[0].type !== to[i].type) {
            //发现一个不等，改为false
            isAllEqual = false;
            break; //跳出循环
          }
        }
        if (isAllEqual) {
          if (to[0].type == 1) {
            //一键购

            wx.redirectTo({
              url: "../order/order" + "?setBtn=" + JSON.stringify(to)
            });
          }
          if (to[0].type == 2) {
            //分销
            var shoppingCartId = [];
            for (var i = 0; i < to.length; i++) {
              shoppingCartId.push(to[i].shoppingCartId);
            }
            wx.request({
              url:
                this.$root.apiServer +
                this.$root.appid +
                this.$root.variate +
                "/basic/client/distribution/order/save",
              data: {
                token: getApp().globalData.token,
                idsList: shoppingCartId
              },
              method: "POST",
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              success(res) {
                if (res.data.code == "200") {
                  if (res.data.object.length) {
                    var ordNum = res.data.object[0];
                    wx.redirectTo({
                      url: "../f_confirmorder/f_confirmorder?ordno=" + ordNum
                    });
                  }
                } else {
                  wx.showModal({
                    title: "提示",
                    content: res.data.message
                  });
                }
              }
            });
          }
          if (to[0].type == 3) {
            var newTo = [];
            this.items.map(function(item, i) {
              if (item.type == "3") {
                newTo.push(item);
              }
            });
            if (to.length < newTo.length) {
              wx.showModal({
                title: "提示",
                content: "餐饮商品必须全选"
              });
            } else {
              wx.navigateTo({
                url:
                  "../k_order/k_order?addressId=" +
                  "" +
                  "&name=" +
                  "" +
                  "&phone=" +
                  "" +
                  "&address=" +
                  "" +
                  "&totalBoxAmount=" +
                  "" +
                  "&sendType=" +
                  ""
              });
            }
          }
        } else {
          wx.showModal({
            title: "提示",
            content: "请选择同类型商品"
          });
        }
      } else {
        wx.showModal({
          title: "提示",
          content: "请选择商品"
        });
      }
    },
    defBtn() {
      wx.navigateBack();
    }
  }
};
</script>

<style scoped>
page {
  background: #f9f9f9;
  padding-bottom: 120rpx;
}
.page {
  background: #f9f9f9;
}

.auto {
  width: 690rpx;
}
.items {
  position: relative;
  width: 100%;
  height: 236rpx;
  margin-top: 20rpx;
  overflow: hidden;
  background: #fff;
}
.scroll {
  height: 236rpx;
  white-space: nowrap;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
}
.goods-item {
  background: #ffffff;
  width: 100%;
  height: 236rpx;
  display: inline-block;
  overflow: hidden;
}

.good-prod {
  width: 100%;
  height: 236rpx;
}
.good-cant {
  margin-top: 30rpx;
}
.goods-check,
.goods-img,
.goods-text {
  float: left;
  margin-right: 24rpx;
}
.goods-check {
  margin-top: 68rpx;
  position: relative;
}
.item-checkbox {
  opacity: 0;
  position: absolute;
  left: 0;
  top: 0;
  width: 40rpx;
  height: 40rpx;
  z-index: 99;
}
.label-icon {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: 36rpx;
  height: 36rpx;
  border: solid 2rpx #c9c9c9;
  border-radius: 50%;
}
.label-icon-checked {
  position: absolute;
  top: -1rpx;
  left: -1rpx;
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
}
.label-icon-checked .label-icon-checked-image {
  position: absolute;
  width: 40rpx;
  height: 40rpx;
}

.goods-img {
  width: 176rpx;
  height: 176rpx;
}
.empty {
  border: solid 2rpx #e3e3e3;
  font-size: 30rpx;
  line-height: 140rpx;
  text-align: center;
}

.goods-img .goods-img-image {
  width: 176rpx;
  height: 176rpx;
}
.goods-text {
  font-size: 26rpx;
  width: 300rpx;
}
.goods-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #333333;
}
.goods-norms {
  margin-top: 18rpx;
  color: #999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.goods-price {
  font-size: 28rpx;
}
.goods-num {
  color: #333333;
  padding-right: 40rpx;
  position: relative;
}
.numBtn {
  position: absolute;
  right: 0;
  top: 0;
}
.numBtn .numBtn-image {
  width: 30rpx;
  height: 30rpx;
}
.stepper {
  width: 158rpx;
  height: 36rpx;
  border: 1px solid #ccc;
  border-radius: 4rpx;
  line-height: 36rpx;
  position: absolute;
  right: 30rpx;
  bottom: 30rpx;
}
.stepper .stepper-text {
  width: 50rpx;
  text-align: center;
  float: left;
  font-size: 24rpx;
}
.stepper .stepper-view {
  width: 54rpx;
  height: 36rpx;
  float: left;
  text-align: center;
  font-size: 30rpx;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}

.block {
  display: block;
}
.none {
  display: none;
}

.stepper .normal {
  color: black;
  background: #ffffff;
}
.stepper .disabled {
  color: #ccc;
  background: #f6f6f6;
}

.good-del {
  width: 120rpx;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 9;
  height: 236rpx;
  background: #fff;
}
.good-b {
  text-align: center;
  color: #ffffff;
  width: 120rpx;
  height: 236rpx;
  line-height: 236rpx;
}
.good-del .delBtn {
  padding-top: 40rpx;
}
.good-del .delBtn .good-del-image {
  width: 34rpx;
  height: 34rpx;
}
.good-del .del {
  font-size: 24rpx;
}

.set-cant {
  width: 100%;
  background: #ffffff;
  position: fixed;
  bottom: 0;
  z-index: 10;
}
.allcheck {
  line-height: 100rpx;
  font-size: 26rpx;
  margin-left: 20rpx;
}
.allcheck .allcheck-checkbox {
  left: 20rpx;
}
.allcheck .label-icon {
  width: 36rpx;
  height: 36rpx;
  position: relative;
}
.allcheck .label-icon-checked {
  width: 38rpx;
  height: 38rpx;
  position: absolute;
  left: -1rpx;
}
.allcheck .label-icon-checked .allcheck-image {
  width: 40rpx;
  height: 40rpx;
}
.groupTxt {
  line-height: 40rpx;
  margin-top: 35rpx;
  margin-left: 24rpx;
}
.setText {
  font-size: 24rpx;
  text-align: right;
  margin-right: 30rpx;
  line-height: 100rpx;
}
.count {
  color: #999999;
  margin-right: 8rpx;
}
.setBtn {
  width: 210rpx;
  height: 100rpx;
  text-align: center;
  line-height: 100rpx;
  color: #ffffff;
  font-size: 32rpx;
}
.defBtn {
  width: 280rpx;
  box-sizing: border-box;
  border: 2rpx solid #ff3e78;
}
.defBtn-img {
  margin-left: 80rpx;
  position: relative;
  width: 40rpx;
  height: 90rpx;
}
.defBtn .defBtn-image {
  width: 37rpx;
  height: 30rpx;
  margin: 0;
  position: absolute;
  left: 0;
  top: 50%;
  margin-top: -15rpx;
}
.defBtn-text {
  margin-left: 10rpx;
}

.bottom-navs {
  padding: 8rpx 0 6rpx;
  box-sizing: border-box;
  border-top: 2rpx solid #ccc;
  display: flex;
  position: static;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 999;
}
.bottom-navs .nav-item {
  flex: 1;
  text-align: center;
}
.bottom-navs .nav-icon {
  vertical-align: top;
}
.bottom-navs .nav-text {
  font-size: 20rpx;
  display: block;
  height: 22rpx;
  line-height: 22rpx;
  margin-top: 11rpx;
}
.txt-c {
  text-align: center;
  font-size: 32rpx;
  padding: 20rpx;
}
.bottom-navs .kefu {
  background: rgba(0, 0, 0, 0);
  border: none;
  margin: 0;
  padding: 0;
  border-radius: 0;
  font-size: 0;
  display: inline-block;
  height: 100%;
  vertical-align: top;
}
.bottom-navs .kefu::after {
  content: none;
}
</style>