<template>
  <canvas />
</template>

<script>
import QRCode from 'qrcode/build/qrcode'

export default {
  name: 'Qrcode',

  props: {
    /**
     * The value of the QR code.
     */
    value: {
      type: [String, Number],
      required: true
    },

    /**
     * The options for the QR code generator.
     * {@link https://github.com/soldair/node-qrcode#qr-code-options}
     */
    options: {
      type: Object,
      default() {
        return {
          margin: 2,
          width: 200
        }
      }
    },

    /**
     * The tag name of the component's root element.
     */
    tag: {
      type: String,
      default: 'canvas'
    }
  },

  watch: {
    value: {
      deep: true,
      immediate: true,
      /**
       * Update the QR code when props changed.
       */
      handler(val) {
        console.log(val)
        this.$nextTick(() => {
          this.generate()
        })
      }
    }
  },
  methods: {
    /**
     * Generate QR code.
     */
    generate() {
      const { options, tag } = this
      if (tag === 'canvas') {
        QRCode.toCanvas(this.$el, String(this.value), options, (error) => {
          if (error) {
            throw error
          }
        })
      }
    }
  }
}
</script>

<style>

</style>
