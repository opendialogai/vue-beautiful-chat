<template>
  <div class="sc-message--form">
    <div class="sc-message--form--text" v-html="data.text"></div>
    <div v-if="errors.length" class="sc-message--form--errors">
      <div v-for="error in errors">
        <span v-html="error"></span>
      </div>
    </div>
    <div v-for="element in data.elements" class="sc-message--form--element">
      <span class="sc-message--form--element-label">{{ element.display }}:</span>
      <input class="sc-message--form--element-input" v-model="form.data[element.name].value" v-on:keyup.enter="_handleClick" />
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
      },
      errors: []
    }
  },
  methods: {
    _handleClick () {
      this.validateForm();

      if (!this.errors.length) {
        this.onFormButtonClick(this.form.data, this.message)
      }
    },
    validateForm () {
      this.errors = [];

      this.data.elements.forEach((element) => {
        if (element.required && !this.form.data[element.name].value.length) {
          this.errors.push('<em>' + element.display + '</em> field is required')
        }
      })
    }
  },
  created () {
    this.data.elements.forEach((element) => {
      this.form.data[element.name] = {
        name: element.name,
        value: ''
      }
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
}
.sc-message--content.received .sc-message--form {
  color: #263238;
  background-color: #f4f7f9;
}

.sc-message--form .sc-message--form--text {
  margin-bottom: 10px;
}

.sc-message--form .sc-message--form--element {
  margin-bottom: 10px;
}

.sc-message--form .sc-message--form--element-label {
  margin-right: 5px;
  vertical-align: middle;
}
.sc-message--form .sc-message--form--element-input {
  font-size: 13px;
  border-radius: 5px;
  border: 1px solid #a9a9a9;
  padding: 2px 7px;
}

.sc-message--form .sc-message--form--errors {
  background: #f55555;
  color: white;
  padding: 2px 7px;
  border-radius: 5px;
  margin-bottom: 10px;
}
</style>
