<template>
  <div class="sc-message--form">
    <div class="sc-message--form--text" v-html="data.text"></div>
    <div v-for="(element, key) in data.elements" class="sc-message--form--element">
      <span class="sc-message--form--element-label">{{ element }}:</span>
      <input class="sc-message--form--element-input" v-model="form.data[key].value" />
    </div>
    <button @click="_handleClick">{{ data.submit_text }}</button>
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
    onFormButtonClick: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      form: {
        data: []
      }
    }
  },
  methods: {
    _handleClick () {
      this.onFormButtonClick(this.form.data, this.message)
    }
  },
  created () {
    this.data.elements.forEach((element) => {
      this.form.data.push({
        label: element,
        value: ''
      })
    })
  }
}
</script>

<style scoped>
.sc-message--form {
  padding: 17px 20px;
  border-radius: 6px;
  font-weight: 300;
  font-size: 14px;
  line-height: 1.4;
  white-space: pre-wrap;
  word-wrap: break-word;
  max-width: 100%;
  -webkit-font-smoothing: subpixel-antialiased;
}

.sc-message--form button {
  cursor: pointer;
  color: white;
  background-color: #4e8cff;
  border-radius: 15px;
  border: none;
  font-size: 14px;
  padding: 12px 17px;
  margin-top: 5px;
}
.sc-message--form button:hover {
  background-color: blue;
}

.sc-message--content.sent .sc-message--form {
  color: white;
  background-color: #4e8cff;
  max-width: calc(100% - 120px);
  word-wrap: break-word;
}
.sc-message--content.received .sc-message--form {
  color: #263238;
  background-color: #f4f7f9;
  margin-right: 40px;
}

.sc-message--form .sc-message--form--element {
  margin-bottom: 10px;
}

.sc-message--form .sc-message--form--element-label {
  margin-right: 5px;
}
.sc-message--form .sc-message--form--element-input {
  font-size: 13px;
}
</style>
