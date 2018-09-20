<template>
  <div>
    <form class="sc-user-long-input" :class="{active: inputActive}" :style="{background: colors.userInput.bg}">
      <div
        role="button"
        tabIndex="0"
        @focus="setInputActive(true)"
        @blur="setInputActive(false)"
        @input="userInput"
        @keypress="onKeyPress"
        contentEditable="true"
        :placeholder="placeholder"
        class="sc-user-long-input--text"
        ref="userInput"
        :style="{color: colors.userInput.text}"
      >
      </div>
      <div class="sc-user-long-input--buttons">
        <template v-if="showConfirmationMessage">
          <div>Are you sure you want to submit?</div>
          <div class="sc-user-long-input--button">
            <button @click="submitYes">Yes</button>
            <button @click="submitEdit">Edit</button>
          </div>
        </template>
        <template v-else>
          <template v-if="maxInputCharacters">
            <div class="sc-user-long-input--counter">
              {{ charactersCount }} / {{ maxInputCharacters }}
            </div>
          </template>
          <div class="sc-user-long-input--button">
            <button @click="submitText">{{ buttonText }}</button>
          </div>
        </template>
      </div>
    </form>
  </div>
</template>


<script>
export default {
  components: {
  },
  props: {
    onSubmit: {
      type: Function,
      required: true
    },
    buttonText: {
      type: String,
      default: 'Submit'
    },
    maxInputCharacters: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: String,
      default: 'Write a reply'
    },
    colors: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      charactersCount: 0,
      inputActive: false,
      showConfirmationMessage: false
    }
  },
  methods: {
    onKeyPress(event) {
      if (this.maxInputCharacters && this.charactersCount >= this.maxInputCharacters) {
        event.preventDefault()
      }
    },
    userInput() {
      const text = this.$refs.userInput.textContent

      this.charactersCount = (text) ? text.length : 0
    },
    setInputActive (onoff) {
      this.inputActive = onoff
    },
    submitYes(event) {
      event.preventDefault()

      this.showConfirmationMessage = false
      this._submitText()
    },
    submitEdit(event) {
      event.preventDefault()

      this.showConfirmationMessage = false
    },
    submitText(event) {
      event.preventDefault()

      this.showConfirmationMessage = true
    },
    _submitText() {
      const text = this.$refs.userInput.textContent

      if (text && text.length > 0) {
        this.onSubmit({
          author: 'me',
          type: 'text',
          data: { text }
        })
        this.$refs.userInput.innerHTML = ''
      }
    }
  }
}
</script>

<style>
.sc-user-long-input {
  min-height: 55px;
  margin: 0px;
  position: relative;
  bottom: 0;
  display: flex;
  background-color: #f4f7f9;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  transition: background-color .2s ease,box-shadow .2s ease;
}

.sc-user-long-input--text {
  width: 300px;
  resize: none;
  border: none;
  outline: none;
  border-bottom-left-radius: 10px;
  box-sizing: border-box;
  padding: 18px;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.33;
  white-space: pre-wrap;
  word-wrap: break-word;
  color: #565867;
  -webkit-font-smoothing: antialiased;
  min-height: 300px;
  overflow: scroll;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
}

.sc-user-long-input--text:empty:before {
  content: attr(placeholder);
  display: block; /* For Firefox */
  /* color: rgba(86, 88, 103, 0.3); */
  filter: contrast(15%);
  outline: none;
}

.sc-user-long-input--buttons {
  position: absolute;
  right: 0;
  bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.sc-user-long-input--counter {
  margin-left: 15px;
}

.sc-user-long-input--button {
  display: flex;
  margin-left: auto;
}

.sc-user-long-input--button button {
  cursor: pointer;
  color: white;
  background-color: #4e8cff;
  border-radius: 15px;
  border: none;
  font-size: 14px;
  padding: 12px 17px;
  margin-right: 15px;
}

.sc-user-long-input.active {
  box-shadow: none;
  background-color: white;
  box-shadow: 0px -5px 20px 0px rgba(150, 165, 190, 0.2);
}

.sc-user-long-input--button label {
  position: relative;
  height: 24px;
  padding-left: 3px;
  cursor: pointer;
}

.sc-user-long-input--button label:hover path {
  fill: rgba(86, 88, 103, 1);
}

.sc-user-long-input--button input {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 99999;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  overflow: hidden;
}
</style>
