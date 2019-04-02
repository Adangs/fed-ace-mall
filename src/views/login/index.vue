<template>
  <div class="g-login-all">
    <div class="bg" />
    <div class="content">
      <div class="code">
        <x-qrcode v-if="socketId" :value="codeVal" :options="codeOptions" />
      </div>
      <dl class="tips">
        <dt>请使用手机扫码登录</dt>
        <dd>5分钟后失效</dd>
      </dl>
    </div>
    <div class="copy">
      &copy; 2019 Adang All Rights Reserved
    </div>
  </div>
</template>

<script>
import { XQrcode } from '~/components'
import { mapGetters } from 'vuex'

export default {
  name: 'Login',
  components: {
    XQrcode

  },
  data() {
    return {
      codeOptions: {
        width: 260
      }
    }
  },
  computed: {
    ...mapGetters([
      'socketId'
    ]),
    // 二维码内容
    codeVal() {
      return `${window.location.origin}/mobile?id=${this.socketId}`
    }
  },
  created() {
    this.socket()
  },
  methods: {
    async socket() {
      // 发送信息
      const socket = await this.$socket()
      console.log(socket)
      socket.on('message', (res) => {
        console.log('message-> ', res)
      })
    }
  }
}
</script>

<style lang="scss">
  .g-login-all{
    height: 100%; position: relative; background-color: rgba(0,0,0,.2);
    .bg{ position: absolute; left: 0; top: 0; width: 100%; height: 100%; background: url('../../assets/images/bg-login.jpg') no-repeat center center; background-size: cover; filter: blur(50px); opacity: .4; z-index: -1;}
    .content{
      width: 360px; position: absolute; padding: 40px 20px; left: 50%; top: 50%; background: #fff; min-height: 300px; box-shadow: 0 0 10px rgba(0,0,0,.2); transform: translate(-50%, -50%); border-radius: 5px; overflow: hidden;
      .code{
        text-align: center; padding: 10px 0;
      }
      .tips{
        text-align: center; font-size: 19px; color: #111; padding-bottom: 50px;
        dd{ font-size: 15px; color: #999; padding-top: 15px;}
      }
    }
    .copy{ position: absolute; right: 20px; bottom: 20px; color: #fff;}
  }
</style>
