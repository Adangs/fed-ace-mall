<template>
  <div>
    <ul v-infinite-scroll="load" class="infinite-list" style="overflow-y: auto;">
      <li v-for="i in count" :key="i" class="infinite-list-item">{{ i }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MobileLogin',
  components: {},
  props: {},
  data() {
    return {
      count: 0
    }
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
    },
    load() {
      this.count += 2
    }
  }
}
</script>

<style>

</style>
