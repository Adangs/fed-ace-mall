<template>
  <div class="g-login-all">
    <div class="bg" />
    <div class="content">
      <!--二维码-->
      <div class="qrcode">
        <div v-if="status !== 2" class="header">
          <x-qrcode v-if="socketId" :value="codeVal" :options="codeOptions" />
          <div v-if="refresh" class="refresh">
            <i class="i-ace i-ace-62" />
          </div>
        </div>
        <div v-if="status === 2" class="header">
          <i class="i-ace i-ace-61" />
        </div>
        <div class="tips">
          <dl v-if="status === 1">
            <dt>请使用手机扫码登录</dt>
            <dd>5分钟后失效</dd>
          </dl>
          <dl v-else-if="status === 2">
            <dt>扫描成功</dt>
            <dd>请在手机上点击确认以登录</dd>
          </dl>
          <div v-else-if="status === 3">
            权限不足，请申请权限
          </div>
          <div v-else-if="status === 4">
            <p>二维码失效，点击刷新</p>
          </div>
        </div>
      </div>
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
      status: 1, // 状态
      socket: null,
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
    },
    // 显示刷新按钮
    refresh() {
      return [3, 4].indexOf(this.status) !== -1
    }
  },
  created() {
    this.initSocket()
  },
  methods: {
    initSocket() {
      // 初始化socket
      this.socket = this.$socket()
      // 扫码成功
      this.socket.on('success', (res) => {
        this.status = res.status
        console.log('success-> ', res)
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
      width: 360px; position: absolute; padding: 40px 20px; left: 50%; top: 50%; background: #fff; box-shadow: 0 0 10px rgba(0,0,0,.2); transform: translate(-50%, -50%); border-radius: 5px; overflow: hidden;
      .header{
        text-align: center; padding: 10px 0; height: 280px; line-height: 280px; overflow: hidden; position: relative;
        > .i-ace{ font-size: 200px; color: #666;}
        .refresh{
          position: absolute; width: 100%; height: 100%; line-height: 100px; text-align: center; z-index: 3; left: 0; top: 0; background: rgba(255, 255, 255, .8);
          .i-ace{ position: absolute; font-size: 70px; left: 50%; top: 50%; width: 100px; height: 100px; border-radius: 50%; transform: translate(-50%, -50%); background: #FFF; color: #555; box-shadow: 0 0 10px rgba(0,0,0,.2); cursor: pointer; }
        }
      }
      .tips{
        text-align: center; font-size: 19px; color: #111; padding: 20px 0 50px; min-height: 120px;
        dd{ font-size: 15px; color: #999; padding-top: 15px;}
      }
    }
    .copy{ position: absolute; right: 20px; bottom: 20px; color: #fff;}
  }
</style>
