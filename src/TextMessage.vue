<template>
  <div @click="_handleClick" class="sc-message--text" :style="messageColors" v-linkified:options="{ format: function (value, type) { return '<span>' + value + '</span>'; } }">
    <span v-html="data.text"></span>
    <p v-if="data.meta" class='sc-message--meta' :style="{color: messageColors.color}">{{data.meta}}</p>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    messageColors: {
      type: Object,
      required: true
    },
    onLinkClick: {
      type: Function,
      required: true
    }
  },
  methods: {
    _handleClick (e) {
      if (e.target.tagName === 'A') {
        this.onLinkClick(e.target.href)
      }
    }
  }
}
</script>

<style scoped>

</style>
