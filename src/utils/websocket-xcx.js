/*调用示例
//连接
wslib.websocket({
  url: app.globalData.wsdomain +
  'websocket?accountId=' + wx.getStorageSync('accountId') +
  '&userId=' + wx.getStorageSync('userId') +
  '&userAvatar=' + wx.getStorageSync('userAvatar') +
  '&userName=' + encodeURIComponent(encodeURIComponent(wx.getStorageSync('userName'))) +
  '&gender=' + wx.getStorageSync('gender') +
  '&level=' + wx.getStorageSync('level')
});
//接受
wslib.onMessage(function (res){
        console.log(res.data+"-----")
      });
//发送
wslib.sendMessage();
//关闭
wslib.closeSocket();
 */

/**config内的参数可重载 */
(function(){
  function websocket(config){
    wslib.url = config.url || wslib.url;
    wslib.reconnectime = config.reconnectime || wslib.reconnectime;
    wslib.heartbeattime = config.heartbeattime || wslib.heartbeattime;
    wslib.heartbeattext = config.heartbeattext || wslib.heartbeattext;
    wslib.retrysndtime = config.retrysndtime || wslib.retrysndtime;
    wslib._connect();
  };

  function sendMessage(message){
    wslib.sendMessage(message);
  };

  function onMessage(res){
    wslib.message = res;
  };

  function closeSocket(){
    wslib.closeSocket = true;
    wx.closeSocket();
  }

  module.exports = {
    sendMessage: sendMessage,
    onMessage: onMessage,
    websocket: websocket,
    closeSocket: closeSocket
  }

  var wslib = {
    url: null,
    reconnectime: 1000, //重试:间隔时间
    delaysndtime: 2000, //重试:发送延时
    retrysndtime: 3,	 //重试:重发次数
    _retrytmptime: 0,
    _reconnecting: false,
    heartbeattime: 55000,//心跳包重试时间
    heartbeattext: { "start": "socket open" }, //心跳包内容
    _heartbeatobj1: null,
    _heartbeatobj2: null,
    // socketOpen: false,
    closeSocket:false,//主动关闭socket
    _connect: function () {
      try {
          wx.onSocketOpen(function() {
            wx.closeSocket()
          })
        // wx.closeSocket();
        if(wslib.url){
           wx.connectSocket({ url: wslib.url });
          wslib._bindevent();
        }
      } catch (e) {
        console.error("WebSocket Connect Error:" + e);
        this._reconnect();
      }
    },
    _reconnect: function () {
      if (wslib._reconnecting) return;
      wslib._reconnecting = true;
      setTimeout(function () {
        wslib._connect();
        wslib._reconnecting = false;
      }, wslib.reconnectime);
    },
    _bindevent: function () {
      wx.onSocketOpen(function (res) {
        // wslib.socketOpen = true;
        console.log('WebSocket连接已打开');
        wslib._reset()._start();
      });
      wx.onSocketClose(function (res) {
        // wslib.socketOpen = false;
        
        console.log('WebSocket 已关闭！');
        if (!closeSocket){
          wslib._reconnect();
        }
      });
      wx.onSocketMessage(function (res) {
        wslib.message(res);
        wslib._reset()._start();
      });
      wx.onSocketError(function (res) {
        console.log('WebSocket连接打开失败，请检查！')
      })
    },
    _reset: function () {
      clearTimeout(wslib._heartbeatobj1);
      clearTimeout(wslib._heartbeatobj2);
      return wslib;
    },
    _start: function () {
      wslib._heartbeatobj1 = setTimeout(function () {
        wslib.sendMessage(wslib.heartbeattext);
      }, wslib.heartbeattime);
    },
    message: function (event) {
      console.debug("TODO: ON MESSAGE: " + event.data);
    },
    sendMessage: function (message) {
      wx.sendSocketMessage({
        data: JSON.stringify(message),
        fail:function(){
          wslib._reconnect();
          wslib._retrytmptime -= 1;
          if (wslib._retrytmptime > 0) {
            setTimeout(function () { wslib.sendMessage(message); }, wslib.delaysndtime);
          }
        },
        success:function(){
          wslib._reset()._start();
          wslib._retrytmptime = wslib.retrysndtime;
        }
      });
    }
  };
})();