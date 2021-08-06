<template>
  <div class="demo-image__placeholder">
    <div class="block">
      <!-- 使用原生html标签，如使用element组件会造成图片显示频闪 -->
      <img id="video" :src="img" alt="">
    </div>
    <div style="width: 70%;margin-left: 30px;margin-top: 30px;">
      <br>
    </div>
  </div>
</template>

<script>
export default {
  data() {

    return {
      img: ''
    }
  },
  mounted: function() {
    this.webSocket();
  },
  methods: {
    webSocket() {
      const _this = this
      if (typeof (WebSocket) == 'undefined') {
        this.$notify({
          title: '提示',
          message: '当前浏览器无法接收实时报警信息，请使用谷歌浏览器！',
          type: 'warning',
          duration: 0
        })
      } else {
        // 实例化socket
        const socketUrl = 'ws://127.0.0.1:8000/img/'
        this.socket = new WebSocket(socketUrl)
        // 监听socket打开
        this.socket.onopen = function() {
          console.log('浏览器WebSocket已打开')
          _this.socket.send(JSON.stringify({
            'code': '200',
            'msg': 'wesocket已打开'
          }))
        }
        // 监听socket消息接收
        this.socket.onmessage = function(msg) {
          // 追加到内容显示列表中
          var content = msg.data
          _this.img = 'data:image/jpg;base64,' + content
        }
        // 监听socket错误
        this.socket.onerror = function() {
          _this.$notify({
            title: '错误',
            message: '服务器错误，无法接收实时报警信息',
            type: 'error',
            duration: 0
          })
        }
        // 监听socket关闭
        this.socket.onclose = function() {
          console.log('WebSocket已关闭')
        }
      }
    }
  }
}
</script>

<style>
.block {
  width: 1500px;
  height: 1200px;
}

</style>
