<template>
  <div class="sc-message--button">
    <p class="sc-message--button--text" v-linkified>{{data.text}}</p>

    <div class="sc-message--button--buttons">
      <button v-for="button in data.buttons" @click="_handleClick(button)">{{button.text}}</button>
    </div>
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
    onButtonClick: {
      type: Function,
      required: true
    }
  },
  methods: {
    _handleClick (button) {
      this.onButtonClick(button, this.message);
    }
  }
}
</script>

<style scoped>
.sc-message--button button {
  cursor: pointer;
  color: white;
  background-color: #4e8cff;
  border-radius: 6px;
  border: none;
  font-size: 14px;
  padding: 17px 20px;
  margin-right: 10px;
}

.sc-message--button button:last-child {
  margin-right: 0;
}
</style>
