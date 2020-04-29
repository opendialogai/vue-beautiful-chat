<template>
  <div
    class="sc-full-page-form-input"
    :class="{ loader: showLoader }"
    :style="{
            '--messageListBg': colors.messageList.bg,
            '--btn-bg': colors.button.bg,
            '--btn-bg-hover': colors.button.hoverbg,
            '--btn-text-color': colors.button.text,
            '--btn-text-color-hover':  colors.button.hoverText,
            '--btn-border-color':colors.button.border,
            '--btn-border-color-hover':colors.button.hoverBorder,
            '--labelTextColor' :colors.form.labelTextColor,
            '--formHighlightColor'  :colors.form.formHighlightColor,
            '--inputBorderColor' :colors.form.inputBorderColor }"
  >
    <div class="sc-full-page-form-input__elements">
      <div
        class="sc-full-page-form-input__title animateStartingState animateDelay1"
        :class="{animateSlideUp: isOpen}"
        v-html="message.data.text"
      ></div>

      <div
        v-for="element in message.data.elements"
        class="sc-full-page-form-input__element animateStartingState animateDelay2"
        :class="[{animateSlideUp: isOpen}, element.name]"
        v-bind:key="element.id"
        :ref="element.name"
      >
        <span
          v-if="element.display && element.element_type == 'radio'"
          class="sc-full-page-form-input__label"
          :class="[
          { 'sc-full-page-form-input__label--radio' : element.element_type == 'radio'},
          { 'sc-full-page-form-input__label--error' : errors.find(x => x.type === element.name)}
          ]"
        >{{ element.display }}</span>

        <template v-if="element.element_type == 'text'">
          <input
            type="text"
            class="sc-full-page-form-input__input"
            v-model="form.data[element.name].value"
            v-on:keyup.enter="_handleClick"
            :placeholder="element.display"
            :class="{ 'sc-full-page-form-input__input--error' : errors.find(x => x.type === element.name)}"
          />
        </template>

        <template v-if="element.element_type == 'textarea'">
          <textarea
            class="sc-full-page-form-input__input sc-full-page-form-input__textarea"
            v-model="form.data[element.name].value"
            :placeholder="element.display"
          />
        </template>

        <template v-if="element.element_type == 'select'">
          <select
            @change="onSelectChange"
            class="sc-full-page-form-input__select"
            v-model="form.data[element.name].value"
          >
            <option value>{{ element.display }}</option>
            <option
              v-for="(option_text, option_value) in element.options"
              v-bind:value="option_value"
            >{{ option_text }}</option>
          </select>
        </template>

        <template v-if="element.element_type == 'radio'">
          <div class="sc-full-page-form-input__radio">
            <div
              class="sc-full-page-form-input__radio-btn"
              v-for="(radio_text, radio_value) in element.options"
              :key="radio_value"
            >
              <input
                name="radio"
                type="radio"
                v-bind:id="radio_value"
                v-bind:value="radio_value"
                v-model="form.data[element.name].value"
              />

              <label v-bind:for="radio_value">{{ radio_text }}</label>
            </div>
          </div>
        </template>

        <template v-if="element.element_type == 'auto-select'">
          <v-select
            class="sc-full-page-form-input__auto-select style-chooser"
            @input="onSelectChange"
            @open="onSelectOpen(element.name)"
            @close="onSelectClose(element.name)"
            v-model="form.data[element.name].value"
            :options="element.options"
            :reduce="option => option.key"
            :placeholder="element.display"
            :select-on-tab="true"
            label="value"
            :class="{ 'sc-full-page-form-input__v-select--error' : errors.find(x => x.type === element.name)}"
          ></v-select>
        </template>

        <template v-if="element.element_type == 'email'">
          <input
            type="email"
            class="sc-full-page-form-input__input"
            v-model="form.data[element.name].value"
            v-on:keyup.enter="_handleClick"
            :placeholder="element.display"
            :class="{ 'sc-full-page-form-input__input--error' : errors.find(x => x.type === element.name)}"
          />
        </template>

        <template v-if="element.element_type == 'number'">
          <input
            type="tel"
            class="sc-full-page-form-input__input"
            v-model="form.data[element.name].value"
            v-on:keyup.enter="_handleClick"
            :placeholder="element.display"
            :class="{ 'sc-full-page-form-input__input--error' : errors.find(x => x.type === element.name)}"
          />
        </template>
      </div>

      <div class="sc-full-page-form-input__submit-wrapper">
        <button
          class="sc-full-page-form-input__submit"
          v-if="!message.data.auto_submit"
          @click="_handleClick"
        >{{ message.data.submit_text }}</button>
      </div>

      <div
        v-if="message.data.cancel_text && message.data.cancel_callback"
        class="sc-full-page-form-input__cancel-wrapper"
      >
        <button class="sc-full-page-form-input__cancel" @click="_handleCancel">{{ message.data.cancel_text }}</button>
      </div>
    </div>

    <template v-if="showLoader">
      <div class="fp-loader">
        <img src="./assets/fp-loader.svg" />
      </div>
    </template>
  </div>
</template>

<script>
import vSelect from "vue-select"
import "vue-select/dist/vue-select.css"

export default {
  components: {
    vSelect
  },
  props: {
    onSubmit: {
      type: Function,
      required: true
    },
    onCancel: {
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
      picked: "",
      form: {
        data: []
      },
      errors: [],
      showLoader: false
    }
  },
  watch: {
    message() {
      this.setUp()
    }
  },
  methods: {
    setUp() {
      this.showLoader = false

      this.form.data = []

      this.message.data.elements.forEach(element => {
        this.form.data[element.name] = {
          name: element.name,
          value: ""
        }

        if (element.default_value) {
          this.form.data[element.name].value = element.default_value
        }
      })
    },
    onSelectChange() {
      if (this.message.data.auto_submit) {
        this._handleClick()
      }
    },
    onSelectOpen(element) {
      this.$refs[element][0].style.zIndex = 1
    },
    onSelectClose(element) {
      this.$refs[element][0].style.zIndex = ''
    },
    _handleCancel() {
      if (!this.showLoader) {
        this.onCancel(this.form.data)
        this.showLoader = true
      }
    },
    _handleClick() {
      if (!this.showLoader) {
        this.validateForm()
        if (!this.errors.length) {
          this.onSubmit(this.form.data)

          this.showLoader = true
        }
      }
    },
    validateEmail(emailAddress) {
      if (/^[^\s@]+@[^\s@]+$/.test(emailAddress)) {
        return true
      }

      return false
    },
    validateForm() {
      this.errors = []

      this.message.data.elements.forEach(element => {
        if (
          element.required &&
          this.isEmpty(this.form.data[element.name].value)
        ) {
          this.errors.push({
            type: element.name,
            message: "<em>" + element.display + "</em> is required"
          })
        }

        if (
          element.element_type === "email" &&
          !this.isEmpty(this.form.data[element.name].value)
        ) {
          if (!this.validateEmail(this.form.data[element.name].value)) {
            this.errors.push({
              type: element.name,
              message:
                "<em>" +
                element.display +
                "</em> field is not a valid email address"
            })
          }
        }
      })
    },
    isEmpty(value) {
      return value === null || value === undefined || value === ""
    }
  },
  created() {
    this.setUp()
  }
}
</script>

<style scoped>
.sc-full-page-form-input {
  background-color: var(--messageListBg);
  overflow-x: hidden;
  position: relative;
  height: 100%;
}

.sc-full-page-form-input__title {
  margin-bottom: 20px;
  width: 100%;
  text-align: center;
}

.sc-full-page-form-input.loader {
  overflow-y: hidden;
}

.sc-full-page-form-input__elements {
  width: 90%;
  margin: 0 auto;
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-top: 20px;
  overflow-y: auto;
}

.sc-full-page-form-input__element {
  position: relative;
  width: 100%;
  margin: 0 auto 18px;
}

.sc-full-page-form-input__label {
  z-index: 1;
  position: absolute;
  top: -5px;
  left: 10px;
  background-color: white;
  font-size: 13px;
  line-height: 1;
  margin: 0;
  color: var(--labelTextColor);
}

.sc-full-page-form-input__label--radio {
  position: unset;
  font-size: 16px;
  font-weight: normal;
  line-height: 1.38;
  letter-spacing: normal;
  color: unset;
  background-color: transparent;
}

.sc-full-page-form-input__label--error {
  color: var(--btn-bg);
}

.sc-full-page-form-input__label--error:before {
  content: "*";
}

.sc-full-page-form-input__label--error:after {
  /* content: " Required"; */
}

.sc-full-page-form-input__input {
  border-radius: 4px;
  border: 1px solid #979797;
  height: 40px;
  padding: 0 10px;
  width: 100%;
}

.sc-full-page-form-input__input--error {
  outline: none;
  border: 1px solid var(--btn-bg);
}

.sc-full-page-form-input__input:focus {
  outline: none;
  border: 1px solid var(--btn-bg);
}

.sc-full-page-form-input__textarea {
  height: 100px;
  padding: 10px;
}

.sc-full-page-form-input__select {
  width: 100%;
  display: block;
  padding: 0.6em 1.4em 0.5em 0.8em;
  font-size: 20px;
  line-height: 2.5;
  height: 40px;
}

.sc-full-page-form-input__select:focus {
  outline: none;
  border: 1px solid var(--btn-bg);
}

.sc-full-page-form-input__select:active,
.sc-full-page-form-input__select:hover {
  outline: none;
  border: 1px solid var(--btn-bg);
}

.sc-full-page-form-input__auto-select {
  width: 100%;
  display: block;
  font-size: 20px;
  line-height: 2.5;
  height: 40px;
  margin: 0;
}

.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle,
.style-chooser .vs__dropdown-menu {
  background: #dfe5fb;
  border: none;
  color: #394066;
  text-transform: lowercase;
  font-variant: small-caps;
}

.style-chooser .vs__clear,
.style-chooser .vs__open-indicator {
  fill: #394066;
}

.sc-full-page-form-input__radio {
  display: flex;
  margin: 20px auto 20px;
  padding: 0 0 0 30px;
}

.sc-full-page-form-input__radio-btn {
  margin-right: 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  width: 80px;
}

.sc-full-page-form-input__radio-btn:first-child {
  margin-left: 8px;
}

.sc-full-page-form-input__radio-btn input[type="radio"] {
  opacity: 0;
}

.sc-full-page-form-input__radio-btn label {
  font-size: 16px;
  line-height: 1;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  cursor: pointer;
}

.sc-full-page-form-input__radio-btn label:after {
  content: "";
  position: absolute;

  left: -30px;
  width: 15px;
  height: 15px;
  border-radius: 100%;
  background-color: #da291c;
  transition: 0.4s;
  opacity: 0;
}

.sc-full-page-form-input__radio-btn input[type="radio"]:checked + label:after {
  opacity: 1;
}

.sc-full-page-form-input__radio-btn label:before {
  content: "";
  position: absolute;
  left: -38px;
  top: -9px;
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #979797;
}

.sc-full-page-form-input__submit-wrapper {
  width: 100%;
  text-align: center;
}

.sc-full-page-form-input__submit {
  color: var(--btn-text-color);
  background-color: var(--btn-bg);
  border: 1px solid var(--btn-border-color);
  min-height: 60px;
  width: 280px;
  padding: 0 20px;
  border-radius: 30px;
  margin: 0 auto 20px;
  font-size: 18px;
}

.sc-full-page-form-input__submit:hover {
  color: var(--btn-text-color-hover);
  background-color: var(--btn-bg-hover);
}

.sc-full-page-form-input__submit:focus {
  outline: none;
  border: 1px solid var(--btn-bg-hover);
}

.sc-full-page-form-input__cancel-wrapper {
  width: 100%;
  text-align: center;
  margin-bottom: 40px;
}

.sc-full-page-form-input__cancel,
.sc-full-page-form-input__cancel:hover,
.sc-full-page-form-input__cancel:focus {
  border: none;
  outline: none;
  background: none;
  text-decoration: underline;
}

@keyframes confirmCloseChatAnim {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.confirmCloseChat {
  opacity: 0;
}

.confirmCloseChatAnimate {
  animation: confirmCloseChatAnim 0.6s forwards;
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
