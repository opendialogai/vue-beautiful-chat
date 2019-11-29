<template>
  <div class="sc-message--button" :style="messageColors">
    <div class="sc-message--button--text" v-linkified>
      <span v-html="data.text"></span>
    </div>

    <template v-if="data.buttons.length">
      <div class="sc-message--button--buttons">
        <template v-for="(button, idx) in data.buttons">
          <template v-if="button.trigger">
            <div @click="_handleClick(button)" :key="idx" class="sc-message--button--trigger">
              <div class="sc-message--button--trigger-wrapper">
                <span v-html="button.text" class="sc-message--button--trigger-expand-text"></span>
                <span>?</span>
              </div>
            </div>
          </template>
          <template v-else>
            <button @click="_handleClick(button)" :key="idx" :style="{backgroundColor: colors.button.bg, color: colors.button.text, '--button-hover': colors.button.hoverbg}">
              {{button.text}}
            </button>
          </template>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    colors: {
      type: Object,
      required: true
    },
    message: {
      type: Object,
      required: true
    },
    messageColors: {
      type: Object,
      required: true
    },
    onButtonClick: {
      type: Function,
      required: true
    }
  },
  methods: {
    _handleClick (button) {
      this.onButtonClick(button, this.message)
    }
  }
}
</script>

<style scoped>
.sc-message--button {
  background: #eaeaea;
  border-radius: 6px;
  padding: 10px 12px;
  max-width: calc(100% - 40px);
  position: relative;
}

.sc-message--button .sc-message--button--buttons {
  padding-top: 15px;
}

.sc-message--button button {
  cursor: pointer;
  border-radius: 30px;
  border: none;
  font-size: 14px;
  padding: 12px 17px;
  margin: 0 10px 10px 0;
}

.sc-message--button button:hover {
  background-color: var(--button-hover) !important;
}

.sc-message--button button:last-child {
  margin-right: 0;
}

.sc-message--button .sc-message--button--text {
  font-weight: 400;
  font-size: 14px;
  line-height: 1.4;
  white-space: pre-wrap;
  word-wrap: break-word;
  -webkit-font-smoothing: subpixel-antialiased;
}

.sc-message--button .sc-message--button--trigger {
  cursor: pointer;
  position: absolute;
  top: -10px;
  left: 100%;
  background: #07131f;
  border-radius: 15px;
  color: #f09ea0;
  min-width: 30px;
  height: 30px;
  padding: 4px 10px;
  margin-left: 5px;
  box-sizing: border-box;
}
.sc-message--button .sc-message--button--trigger-wrapper {
  white-space: nowrap;
}
.sc-message--button .sc-message--button--trigger-expand-text {
  color: #fff;
  display: none;
}
.sc-message--button .sc-message--button--trigger:hover .sc-message--button--trigger-expand-text {
  display: inline-block;
}
</style>
