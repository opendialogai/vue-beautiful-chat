<template>
  <div class="sc-message--carousel-list">
    <slider
      :direction="data.view_type"
      :pagination-visible="true"
      :pagination-clickable="true"
    >
      <div v-for="(item, idx) in data.items" :key="idx">
        <TextMessage v-if="item.message_type === 'text'" :data="item" :messageColors="messageColors" :onLinkClick="onLinkClick" />
        <ButtonMessage v-else-if="item.message_type === 'button'" :message="message" :data="item" :messageColors="messageColors" :onButtonClick="onButtonClick" />
        <ImageMessage v-else-if="item.message_type === 'image'" :data="item" :messageColors="messageColors" />
        <RichMessage v-else-if="item.message_type === 'rich'" :message="message" :data="item" :messageColors="messageColors" :onButtonClick="onButtonClick" />
      </div>
    </slider>
  </div>
</template>

<script>
import Slider from 'vue-plain-slider'

import ImageMessage from './ImageMessage.vue'
import ButtonMessage from './ButtonMessage.vue'
import RichMessage from './RichMessage.vue'
import TextMessage from './TextMessage.vue'

export default {
  components: {
    ButtonMessage,
    ImageMessage,
    RichMessage,
    TextMessage,
    Slider
  },
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
    },
    onLinkClick: {
      type: Function,
      required: true
    }
  }
}
</script>

<style scoped>
.sc-message--carousel-list {
  background: #eaeaea;
  border-radius: 6px;
  padding: 0 12px;
  max-width: calc(100% - 40px);
}

.sc-message--carousel-list .slider.horizontal {
  padding-bottom: 30px;
}
.sc-message--carousel-list .slider.vertical {
  padding-right: 30px;
}
</style>
