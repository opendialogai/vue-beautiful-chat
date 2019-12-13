<template>
  <div :style="{background: colors.messageList.bg}">
    <transition
      enter-active-class="fadeIn"
      leave-active-class="fadeOut"
    >
      <div v-if="externalButtons.length" :class="buttonsRowClass" class="sc-external-buttons-row" style="animation-duration: 2s">
        <button class="sc-external-buttons-element" :class="(currentId === idx) ? 'button-clicked' : ''" v-for="(externalButton, idx) in externalButtons" v-on:click="_handleClick(externalButton, idx)" :style="{background: colors.externalButton.bg, color: colors.externalButton.text, '--button-hover': colors.externalButton.hoverbg}" :key="idx">{{externalButton.text}}</button>
      </div>
    </transition>
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
  },
  data() {
    return {
      buttonsRowClass: 'hide-overflow',
      currentId: false
    }
  },
  methods: {
    _handleClick (button, id) {
      this.currentId = id
      this.buttonsRowClass = ''

      this.$emit('sendExternalButton', button)

      setTimeout(() => {
        this.buttonsRowClass = 'hide-overflow'
        setTimeout(() => {
          this.currentId = false
        }, 2000)
      }, 2000)
    }
  }
}
</script>

<style scoped>
.sc-external-buttons-row {
  text-align: center;
  background: inherit;
  padding: 10px;
  white-space: nowrap;
  height: 37px;
}
.sc-external-buttons-row.hide-overflow {
  overflow-x: scroll;
  overflow-y: hidden;
}
.sc-external-buttons-element {
  margin: 3px;
  padding: 5px 10px 5px 10px;
  border: 1px solid;
  border-radius: 15px;
  font-size: 14px;
  background: inherit;
  cursor: pointer;
  vertical-align: top;
  outline: none;
  transition: all 2s;
}

.sc-external-buttons-element:hover {
  background-color: var(--button-hover) !important;
}
</style>
