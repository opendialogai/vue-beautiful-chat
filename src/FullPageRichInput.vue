<template>
  <div
    class="sc-full-page-rich-input"
    :class="{ loader: showLoader, isOpen: isOpen }"
    :style="{
            '--background': colors.messageList.bg,
            '--btn-bg': colors.button.bg,
            '--btn-bg-hover': colors.button.hoverbg,
            '--btn-color': colors.button.text,
            '--btn-color-hover':  colors.button.hoverText,
            '--btn-border-color':colors.button.border,
            '--btn-border-color-hover':colors.button.hoverBorder }"
  >
    <div class="sc-full-page-rich-input-wrapper">
      <div v-if="message.data.title">
        <div
          class="sc-full-page-rich-input__title animateStartingState animateDelay1"
          :class="{animateSlideUp: isOpen}"
        >{{ message.data.title }}</div>
      </div>

      <div v-if="message.data.subtitle">
        <div
          class="sc-full-page-rich-input__subtitle animateStartingState animateDelay1"
          :class="{animateSlideUp: isOpen}"
        >{{ message.data.subtitle }}</div>
      </div>

      <div v-if="message.data.text">
        <p
          class="sc-full-page-rich-input__text animateStartingState animateDelay1"
          :class="{animateSlideUp: isOpen}"
        >
          <span v-html="message.data.text"></span>
        </p>
      </div>
      <template v-if="message.data.image">
        <div class="sc-full-page-rich-input__image animateStartingState" :class="{animateSlideUp: isOpen}">
          <template v-if="message.data.image.url">
            <a
              :href="message.data.image.url"
              :target="message.data.image.link_new_tab ? '_blank' : '_parent'"
            >
              <img :src="message.data.image.src" />
            </a>
          </template>
          <template v-else>
            <img :src="message.data.image.src" />
          </template>
        </div>
      </template>


      <template v-if="message.data.buttons.length">
        <div class="sc-full-page-rich-input__buttons">
          <button
            class="animateStartingState"
            :class="{
              animateSlideUp: isOpen,
              [`button-delay${idx + 1}`]: true,
              downloadButton: button.download,
            }"
            v-for="(button, idx) in message.data.buttons"
            :key="idx"
            :myAttr="idx"
            @click="_handleClick(button)"
          >{{button.text}}</button>
        </div>
      </template>
    </div>

    <template v-if="showLoader">
      <div class="fp-loader">
        <img src="./assets/fp-loader.svg" />
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    onSubmit: {
      type: Function,
      required: true
    },
    message: {
      type: Object,
      required: true
    },
    colors: {
      type: Object,
      required: true
    },
    isOpen: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      showLoader: false
    }
  },
  watch: {
    message() {
      this.showLoader = false
    }
  },
  methods: {
    _handleClick(button) {
      if (!this.showLoader) {
        this.onSubmit(button)

        if (!button.download) {
          this.showLoader = true
        }
      }
    }
  }
}
</script>

<style scoped>
.sc-full-page-rich-input {
  background-color: var(--background);
  text-align: center;
  position: relative;
  overflow-x: hidden;
  height: 100%;
}
.sc-full-page-rich-input .sc-full-page-rich-input-wrapper {
  padding: 20px 0;
}
.sc-full-page-rich-input.loader {
  overflow-y: hidden;
}

.sc-full-page-rich-input__title {
  font-family: PlayfairDisplay;
  font-size: 26px;
  font-weight: bold;
  line-height: 1.5;
  text-align: center;
  color: #000000;
  margin: 0 10px 20px 10px;
  letter-spacing: 1px;
}
.sc-full-page-rich-input__subtitle {
  margin: 0 10px 20px 10px;
}

.sc-full-page-rich-input__text {
  margin: 0 10px 35px 10px;
  line-height: 1.3em;
}

.sc-full-page-rich-input__image {
  width: 100%;
  margin-bottom: 10px;
}

.sc-full-page-rich-input__buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.sc-full-page-rich-input__buttons button {
  margin-bottom: 10px;

  border: 1px solid;
  font-size: 15px;
  line-height: 1.33;

  text-align: center;
  color: #ffffff;

  font-weight: normal;
  cursor: pointer;

  border: none;
  outline: none;
  position: relative;
  transition: 0.4s;
  width: 95%;
  max-width: 325px;
  min-height: 61px;
  border-radius: 34.5px;

  padding: 0 20px;
  @media (min-width: 450px) {
    padding: 0 10px;
  }
}

.sc-full-page-rich-input__buttons button {
  background-color: var(--btn-bg);
  color: var(--btn-color);
  border: 2px solid var(--btn-border-color);
}

.sc-full-page-rich-input__buttons button:hover {
  background-color: var(--btn-bg-hover);
  color: var(--btn-color-hover);
  border: 2px solid var(--btn-border-color-hover);
}

.sc-full-page-rich-input__buttons button.downloadButton {
  background: none !important;
  border: none !important;
  color: var(--labelTextColor) !important;
  text-decoration: underline;
  font-size: 16px;
  width: auto;
  padding: 0;
  min-height: 0;
  margin-top: 30px;
}
.sc-full-page-rich-input__buttons button.downloadButton:before {
  content: "";
  width: 13px;
  height: 19px;
  background: red;
  display: inline-block;
  margin-right: 8px;
  vertical-align: middle;
  background: url("/vendor/webchat/images/download-button.svg");
}

@keyframes sc-full-page-rich-input__button-fade-in {
  from {
    transform: translate(0px, 30px);
    opacity: 0;
  }
  to {
    transform: translate(0px, 0px);
    opacity: 1;
  }
}

.sc-full-page-rich-input__button--animate {
  animation: sc-full-page-rich-input__button-fade-in 1s forwards;
}

.fp-loader {
  position: sticky;
  width: 100%;
  height: 100%;
  text-align: center;
  top: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
}
.fp-loader img {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
</style>
