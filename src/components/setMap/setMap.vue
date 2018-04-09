<template>
	<view>
  		<!--<map wx:if="{{isH5}}" class="map" id="map" scale="{{scale}}" longitude="{{mytude[1]}}" latitude="{{mytude[0]}}" markers="{{markers}}" style="{{'height:' + height*2+'rpx'}}"/>-->
	    <view class="handler" id="handler" @tap="handler">
	      <view>
	        <image class="icon-1" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAcCAMAAAC9M9RRAAAATlBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzsfMPcAAAAGXRSTlMAB1hsFvjnJBB2vNUb3mU3LIqVf63N8USicL+Z0wAAALtJREFUKM91kVkCgyAMRKeALAruVrn/RduSoBTb96MZSDIkIB7i0DFGvYoHCvomZhqJjGpjyaZYDvEb7VPpLdZ0nyYu3lkAm/s5Y418cqTQc6qiXlxUgr347I3CFpQ5IzNTVdB5j4wg4a/epc9R1QlY6NyA8BROMPQTPNnpzmtrfuOoRsdzXQFKqBjxZrrJE+1K13PmnQ2VPoCoRu1wUi6yxYUNV3GLAtOUFpmy946KPckCN0Ra3w9k6fAFYwMjK9UYWNIAAAAASUVORK5CYII="></image>
	        <text class="address">{{mytude[2]}}</text>
	      </view>
	      <view class="btn">
	        <image class="icon-2" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAATlBMVEUAAAAJuwcJuwcJuwcJuwcJuwcJuwcJuwcJuwcJuwcJuwcJuwcJuwcJuwcJuwcJuwcJuwcJuwcJuwcJuwcJuwcJuwcJuwcJuwcJuwcJuwe1lbRaAAAAGXRSTlMA8GgBdhf4Tw6ltQbmQNjijsebgSlbITcw9cK27gAAAJJJREFUKM9t0OsWRCAYheFQUnSQw8y+/xud1YRU3/Pz3RaKUSbejUQ+PYB2+GhEvqyDXJGI4tX9got6ZbEh+z55D3hZ72w0CvJf58Oi5IZ0GNT6+PyCxjjHQSqLyvYc65Q8uDwIVpB3D6zSI9mby05dlzX/oGkHFbtlLR6HgxgMgC4ejvo6ZxQHTOSg4BlJdvk2fnhsFIM3fBcUAAAAAElFTkSuQmCC"/></image>
	        <text>位置</text>
	      </view>
	    </view>  		
 	</view>
</template>

<script>
export default {
  editorConfig: {
    height: {
      el: ['number'],
      label: '调整图片高度',
      type:'Number',
      value: '280',
      director : 'Fsize'
    },
    mytude: {
      el: ['number'],
      label: '调整经纬度',
      type:'Array',
      value: [39.916056,116.385384,'北京市西城区'],
      director : 'setMap'
    }
  },
  props: {
    height: {
      default: '280',
      type: String
    },
    mytude: {
      default: function(){
      	return [39.916056,116.385384,'北京市西城区']     	
      },
      type: Array
    },
    scale: {
      default: 13,
      type: Number
    }
  },
  data () {
    return {
    	isTrue:true,
    	mapbottom: 0,
    	navtop: 0,
    	isH5:false,
    }
  },    
  computed: {
    markers() {
      let arr = [{
        iconPath: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAYCAYAAAAYl8YPAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAqNJREFUOI2F1EuIlmUUB/DffI7WZCFlUZCFm8opqMWLEkJtYkKjSYIuFETlwFkWQkFRtLGYIkmwRXKgyBbBtOhKZUYFhaDVt+hGaRcmkHCR1SwksslavGfs7XNmejbnfZ7/5Tmc9zxnyDwrIkaxGddiDZbhGL7BHjyXmV8P6oYGTFbgKdw9iA2sv/E8tmTmzElmEbEK7+HiOprGFPbhF5yFK3ErVhfnIK7JzEMnzCqjT3ARZvEgdmTmsXlKsAz3YBLD+BZrM3NmuDjbO0bjmbm7Iz4Pq3AoMw/XBdsi4ku8Ubrt2DxUxf6qsrw/M7d1TJ7FdZ3E3sJEZh4uzn14smp4WQ8TZTSNHUUaqfp1jdT+/cIVf7r0Ez2MFTDVqdEduBTHcRdWVvwLo4Ur/lRpxoYLhI87GVxd8dXM3FXfuyLietxUeA7oRntYWpufO2azFUf8d502gNO2DSwdxlEsx4oOYQ/uxMaIeEj718b9W8N3O9wzKh7tafsL1nYIL2FvfT+Kzyqq86kOd063r4dXanPzHJqZs9iAZypzFXdiQ+EiYqije20oIs7W/t7l2JSZr3duFRFLcSZ+zcw/B7Ab8TJmsHruOU3iAe1UuHxQNN+KiFPwufYtb83MR3qFTeIn7bjZ+n9GtR4rox/xOCyBfr//R9M03+E2rG+aZn+/3/9+kazG8XRtb8nMAzCXmarVzjqbiog1CxhdgRdr+0RmnmiT3gB3Cz7V9tzuiDh/wOhCvInT8QEe7uInTdOIuEDbe+fiC1yVmTMRcQ4+wiX4Aesy88iiZmXYlHAEH2IT3tZO2iNYn5kHB3ULzvmIuEHb0L0yWInfMZaZe+fTLFnIrN/vH2ia5jds1D7w47g9M99ZSLOgWRnub5rmVKzDvZn5wmL8fwDuKea3sTR5iwAAAABJRU5ErkJggg==",
        id: 0,
        latitude: this.mytude[0],
        longitude: this.mytude[1],
        width: 19,
        height: 24
      }]
      return arr
    }
  },
onLoad () {	  
//	var that = this
//  that.isH5 = !wx.hasOwnProperty('version')
},
  
  methods: {	
    handler () {
      var that = this
      wx.openLocation({
        longitude: that.mytude[1],
        latitude: that.mytude[0],
        address: that.mytude[2],
      })
    }
  }
}
</script>

<style scoped="scoped">
.map{
  width: 100%;
}
.handler{
  height: 60rpx;
  line-height: 60rpx;
  display: flex;
  padding: 30rpx 20rpx;
  justify-content: space-between;
}
.handler .icon-1{
  width: 24rpx;
  height: 30rpx;
  margin-top: 15rpx;
  margin-right: 4rpx
}
.handler .icon-2{
  width: 24rpx;
  height: 24rpx;
}
.handler .address{
  font-size: 30rpx;
  line-height: 60rpx;
  max-width: 500rpx;
  overflow: hidden;
  display: inline-block;
  height: 60rpx;
  vertical-align: top;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.btn{
  font-size: 30rpx;	
  width: 136rpx;
  height: 60rpx;
  text-align: center;
  line-height: 60rpx;
  border: 2rpx solid #dcdcdc;
  border-radius:6rpx;
}
</style>