<template>
  <div class="sc-message--author">{{data.text}}<p v-if="data.meta" class='sc-message--meta'>{{data.meta}}</p>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    },
  }
}
</script>

<style scoped>
.sc-message--author {
  color: #2d2d2d;
  background-color: white;
  padding: none;
  border-radius: 6px;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.2;
  white-space: pre-wrap;
  -webkit-font-smoothing: subpixel-antialiased;
}

.sc-message--meta {
  font-size: xx-small;
  margin-bottom: 0px;
  margin-top: 5px;
  opacity: .5;
  text-align: center;
}
</style>
