<template>
  <div class="g-login-all">
    <div class="bg" />
  </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<style lang="scss">
  .g-login-all{
    height: 100%; position: relative; background-color: rgba(0,0,0,.2);
    .bg{ position: absolute; left: 0; top: 0; width: 100%; height: 100%; background: url('~@/assets/images/bg-login.jpg') no-repeat center center; background-size: cover; filter: blur(50px); opacity: .4;}
  }
</style>
