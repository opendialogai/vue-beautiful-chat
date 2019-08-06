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
.sc-message--text {
  padding: 10px 12px;
  border-radius: 6px;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.4;
  white-space: pre-wrap;
  -webkit-font-smoothing: subpixel-antialiased;
}

.sc-message--content.sent .sc-message--text {
  color: white;
  background-color: #4e8cff;
  max-width: calc(100% - 120px);
  word-wrap: break-word;
}
.sc-message--content.received .sc-message--text {
  color: #263238;
  background-color: #f4f7f9;
  margin-right: 40px;
  max-width: calc(100% - 40px);
  word-wrap: break-word;
}
</style>
