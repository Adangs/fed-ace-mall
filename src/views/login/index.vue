<template>
  <div class="g-login-all">
    <div class="bg" />
    <x-qrcode :value="code" />
    <button @click="onQrcode">
      换内容
    </button>
    <div class="copy">
      &copy; 2019 Adang All Rights Reserved
    </div>
  </div>
</template>

<script>
import { XQrcode } from '~@/components'

export default {
  name: 'Login',
  components: {
    XQrcode
  },
  data() {
    return {
      code: '222222222'
    }
  },
  computed: {},
  created() {},
  methods: {
    onQrcode() {
      this.code = +new Date()
    }
  }
}
</script>

<style lang="scss">
  .g-login-all{
    height: 100%; position: relative; background-color: rgba(0,0,0,.2);
    .bg{ position: absolute; left: 0; top: 0; width: 100%; height: 100%; background: url('~@/assets/images/bg-login.jpg') no-repeat center center; background-size: cover; filter: blur(50px); opacity: .4; z-index: -1;}
    .copy{ position: absolute; right: 20px; bottom: 20px; color: #fff;}
  }
</style>
