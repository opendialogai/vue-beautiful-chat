<template>
  <div v-if="externalButtons.length" class="sc-external-buttons">
    <div class="sc-external-buttons--arrows">
      <div
        v-show="showLeftArrow"
        class="sc-external-buttons--left-arrow"
        ref="leftArrow"
        v-longclick="scrollLeft">
        <img src="./assets/left-arrow.svg" />
      </div>
      <div
        v-show="showRightArrow"
        class="sc-external-buttons--right-arrow"
        ref="rightArrow"
        v-longclick="scrollRight">
        <img src="./assets/right-arrow.svg" />
      </div>
    </div>

    <div
      class="sc-external-buttons-row"
      ref="externalButtonsRow"
      :style="{background: colors.messageList.bg}"
      @scroll.passive="onScroll">
      <div class="sc-external-buttons-row-wrapper fade-enter-active">
        <template v-for="(externalButton, idx) in externalButtons">
          <button
            v-if="externalButton.display && externalButton.text"
            class="sc-external-buttons-element"
            :class="(buttonClicked == idx) ? 'sc-external-buttons-element--clicked' : ''"
            @click="_handleClick(externalButton, idx)"
            :style="{background: colors.externalButton.bg, color: colors.externalButton.text, '--button-hover': colors.externalButton.hoverbg}"
            ref="externalButton"
            :key="idx">
            <div class="sc-external-buttons-element--top"></div>
            <div class="sc-external-buttons-element--right"></div>
            <div class="sc-external-buttons-element--bottom"></div>
            <div class="sc-external-buttons-element--left"></div>
            <div class="sc-external-buttons-element--background"></div>

            <span v-html="externalButton.text"></span>
          </button>
        </template>
      </div>
    </div>
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
      buttonClicked: -1,
      showLeftArrow: false,
      showRightArrow: false
    }
  },
  watch: {
    externalButtons() {
      if (this.externalButtons.length == 0) {
        this.buttonClicked = -1
      } else {
        this.showLeftArrow = false
        this.showRightArrow = false

        setTimeout(() => {
          if (this.$refs.externalButtonsRow) {
            if (this.$refs.externalButtonsRow.scrollWidth > (this.$refs.externalButtonsRow.offsetWidth + this.$refs.externalButtonsRow.scrollLeft)) {
              this.showRightArrow = true
            }
          }
        }, 1600)
      }
    }
  },
  methods: {
    onScroll() {
      if (this.$refs.externalButtonsRow) {
        if (this.$refs.externalButtonsRow.scrollLeft > 0) {
          this.showLeftArrow = true
        } else {
          this.$refs.leftArrow.dispatchEvent(new Event('onmouseup'))
          this.showLeftArrow = false
        }

        if (this.$refs.externalButtonsRow.scrollWidth > (this.$refs.externalButtonsRow.offsetWidth + this.$refs.externalButtonsRow.scrollLeft)) {
          this.showRightArrow = true
        } else {
          this.$refs.rightArrow.dispatchEvent(new Event('onmouseup'))
          this.showRightArrow = false
        }
      }
    },
    scrollLeft() {
      const rowScrollLeft = this.$refs.externalButtonsRow.scrollLeft

      let scrollLeft = this.$refs.externalButtonsRow.scrollLeft
      this.$refs.externalButton.forEach((button, i) => {
        const style = window.getComputedStyle(button)
        const marginLeft = parseFloat(style.getPropertyValue('margin-left'))
        const marginRight = parseFloat(style.getPropertyValue('margin-right'))

        if (((button.offsetLeft - marginLeft) < rowScrollLeft) && ((button.offsetLeft + button.offsetWidth + marginRight) >= rowScrollLeft)) {
          scrollLeft = (i > 0) ? button.offsetLeft - marginLeft - 30 : 0
        }
      })

      this.scroll(this.$refs.externalButtonsRow.scrollLeft, scrollLeft)
    },
    scrollRight() {
      const rowScrollRight = this.$refs.externalButtonsRow.offsetWidth + this.$refs.externalButtonsRow.scrollLeft

      let scrollLeft = this.$refs.externalButtonsRow.scrollLeft
      this.$refs.externalButton.forEach((button) => {
        const style = window.getComputedStyle(button)
        const marginLeft = parseFloat(style.getPropertyValue('margin-left'))
        const marginRight = parseFloat(style.getPropertyValue('margin-right'))

        if (((button.offsetLeft - marginLeft) <= rowScrollRight) && ((button.offsetLeft + button.offsetWidth + marginRight) > rowScrollRight)) {
          scrollLeft = button.offsetLeft + button.offsetWidth + marginRight + 30 - this.$refs.externalButtonsRow.offsetWidth
        }
      })

      this.scroll(this.$refs.externalButtonsRow.scrollLeft, scrollLeft)
    },
    scroll(oldScrollLeft, newScrollLeft) {
      const scrollStep = (newScrollLeft - oldScrollLeft) / 15

      let i = 0
      const scrollInterval = setInterval(() => {
        this.$refs.externalButtonsRow.scrollLeft = this.$refs.externalButtonsRow.scrollLeft + scrollStep
        i = i + 1
        if (i == 15) clearInterval(scrollInterval)
      }, 20)
    },
    _handleClick(externalButton, idx) {
      this.buttonClicked = idx
      this.$emit('sendExternalButton', externalButton)
    }
  },
  mounted () {
    window.addEventListener('resize', () => {
      this.onScroll()
    })
  }
}
</script>

<style scoped>
.sc-external-buttons {
  position: relative;
}
.sc-external-buttons-row {
  text-align: center;
  padding: 10px;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
}
.sc-external-buttons-row-wrapper {
  animation-duration: 0s;
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

.sc-external-buttons-element--top,
.sc-external-buttons-element--right,
.sc-external-buttons-element--bottom,
.sc-external-buttons-element--left,
.sc-external-buttons-element--background {
  display: none;
}

.sc-external-buttons--left-arrow,
.sc-external-buttons--right-arrow {
  position: absolute;
  top: 0;
  cursor: pointer;
}
.sc-external-buttons--left-arrow {
  left: 0;
}
.sc-external-buttons--right-arrow {
  right: 0;
}
.sc-external-buttons--left-arrow img,
.sc-external-buttons--right-arrow img {
  height: 145px;
}
</style>
