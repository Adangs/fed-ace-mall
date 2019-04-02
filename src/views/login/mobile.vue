<template>
  <p>{{ query }}</p>
</template>

<script>
export default {
  name: 'MobileLogin',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {
    query() {
      return this.$route.query
    }
  },
  watch: {},
  created() {
    this.get()
  },
  methods: {
    get() {
      this.$http({
        url: 'code',
        data: { id: this.query.id }
      })
    }
  }
}
</script>

<style>

</style>
