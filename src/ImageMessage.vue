<template>
  <div class="sc-message--image" :style="messageColors">
    <img :src="data.img_src" />
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    messageColors: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.sc-message--image {
  padding: 17px 20px;
  border-radius: 6px;
  max-width: 100%;
}

.sc-message--image img {
  max-width: 100%;
}

.sc-message--content.sent .sc-message--image {
  color: white;
  background-color: #4e8cff;
}
.sc-message--content.received .sc-message--image {
  color: #263238;
  background-color: #f4f7f9;
}
</style>
