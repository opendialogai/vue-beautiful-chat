<template>
  <div class="sc-message--rich" :style="messageColors">
    <div class="sc-message--rich--title">{{ data.title }}</div>
    <div class="sc-message--rich--subtitle">{{ data.subtitle }}</div>
    <p class="sc-message--rich--text" v-linkified>
      <span v-html="data.text"></span>
    </p>

    <template v-if="data.image">
      <template v-if="data.image.url">
        <a :href="data.image.url" :target="data.image.link_new_tab ? '_blank' : '_parent'"><img :src="data.image.src" /></a>
      </template>
      <template v-else>
        <img :src="data.image.src" />
      </template>
    </template>

    <template v-if="data.button">
      <button @click="_handleClick(data.button)">{{ data.button.text }}</button>
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
    _handleClick(button) {
      this.onButtonClick(button, this.message)
    }
  }
}
</script>

<style scoped>
.sc-message--rich {
  background: #eaeaea;
  border-radius: 6px;
  padding: 0 12px;
  max-width: calc(100% - 40px);
}

.sc-message--rich .sc-message--rich--title {
}

.sc-message--rich .sc-message--rich--subtitle {
}

.sc-message--rich .sc-message--rich--text {
  font-weight: 400;
  font-size: 14px;
  line-height: 1.4;
  white-space: pre-wrap;
  word-wrap: break-word;
  -webkit-font-smoothing: subpixel-antialiased;
}

.sc-message--rich button {
  cursor: pointer;
  color: white;
  background-color: #4e8cff;
  border-radius: 30px;
  border: none;
  font-size: 14px;
  padding: 12px 17px;
  margin: 0 10px 10px 0;
}
.sc-message--rich button:hover {
  background-color: blue;
}

.sc-message--rich img {
  max-width: 100%;
}
</style>
