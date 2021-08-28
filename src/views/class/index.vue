<template>
  <div>
    <!-- v-for  循环自动生成盒子 -->
    <div v-for="item in URI" :key="item.uri" class="demo-image__preview">
      <video :v-bind:id="item.uri" controls class="video" />
    </div>
  </div>
</template>

<script>
import Hls from '@/dist/hls'
import axios from 'axios'
import ip from '@/ip.json'

export default {
  data() {
    return {
      streamUrl: [],
      URL: ip.rh,
      URI: [
        { uri: '$ {ip.rr}/stream1' },
        { uri: `$ {ip.rr}/stream2` }
      ]
    }
  },

  mounted() {
    this.init()
  },
  methods: {
    async init() {
      await this.getStreamUrl(this.URI)
      console.log(this.streamUrl)
      for (const [index, url] of this.streamUrl.entries()) {
        this.playStream(url, index)
      }
    },

    /**
     * 获取.m3u8视频地址
     */
    async getStreamUrl(URI) {
      const urlList = []
      for (const uri of URI) {
        const res = await axios.post(`${this.URL}/start`, { uri: uri.uri })
        console.log(res)
        const url = `${this.URL}${res.data.uri}`
        urlList.push(url)
      }
      this.streamUrl = urlList
    },

    /**
     * hls协议播放视频
     */
    playStream(url, index) {
      if (Hls.isSupported()) {
        const hls = new Hls()
        const video = document.getElementsByClassName('video')[index]
        hls.loadSource(url)
        hls.attachMedia(video)
      // } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      //   video.src = url
      }
    }
  }
}
</script>

<style lang="scss">
//外面盒子样式
.demo-image__preview {
  display: inline-block;
  margin-left: 20px;
  width: 500px;
  height: 300px;
}
.video {
  object-fit: fill;
  float: left;
  margin-left: 20px;
  margin-top: 30px;
  width: 100%;
  height: 100%;
}
</style>

