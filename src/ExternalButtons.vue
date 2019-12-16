<template>
  <div v-if="externalButtons.length" class="sc-external-buttons-row" :style="{background: colors.messageList.bg}">
    <button class="sc-external-buttons-element" v-for="(externalButton, idx) in externalButtons" v-on:click="$emit('sendExternalButton', externalButton)" :style="{background: colors.externalButton.bg, color: colors.externalButton.text, '--button-hover': colors.externalButton.hoverbg}" :key="idx" v-html="externalButton.text"></button>
  </div>
</template>

<script>
export default {
  props: {
    externalButtons: {
      type: Array,
      default: () => []
    },
    colors: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.sc-external-buttons-row {
  text-align: center;
  background: inherit;
  padding: 10px;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
}
.sc-external-buttons-element {
  margin: 3px;
  padding: 5px 10px 5px 10px;
  border: 1px solid;
  border-radius: 15px;
  font-size: 14px;
  background: inherit;
  cursor: pointer;
}

.sc-external-buttons-element:hover {
  background-color: var(--button-hover) !important;
}
</style>
