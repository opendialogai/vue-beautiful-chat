<template>
  <div class="sc-message-list" ref="scrollList" :style="{backgroundColor: colors.messageList.bg}">
    <template v-if="showOnlyLastMessage">
      <Message :message="lastMessage" :chatImageUrl="chatImageUrl" :colors="colors" :onButtonClick="onButtonClick" />
    </template>
    <template v-else>
      <Message v-for="(message, idx) in messages" :message="message" :chatImageUrl="chatImageUrl" :key="idx" :colors="colors" :onButtonClick="onButtonClick" />
      <Message v-show="showTypingIndicator" :message="{author: 'them', type: 'typing'}" :chatImageUrl="chatImageUrl" :colors="colors" :onButtonClick="onButtonClick" />
    </template>
  </div>
</template>
<script>
import Message from './Message.vue'
import chatIcon from './assets/chat-icon.svg'

export default {
  components: {
    Message
  },
  props: {
    messages: {
      type: Array,
      required: true
    },
    chatImageUrl: {
      type: String,
      default: chatIcon
    },
    showTypingIndicator: {
      type: Boolean,
      default: () => false
    },
    showOnlyLastMessage: {
      type: Boolean,
      default: () => false
    },
    colors: {
      type: Object,
      required: true
    },
    alwaysScrollToBottom: {
      type: Boolean,
      required: true
    },
    onButtonClick: {
      type: Function,
      required: true
    }
  },
  computed: {
    lastMessage() {
      if (!this.messages.length) return [];

      return this.messages[this.messages.length - 1]
    }
  },
  methods: {
    _scrollDown () {
      this.$refs.scrollList.scrollTop = this.$refs.scrollList.scrollHeight
    },
    shouldScrollToBottom() {
      return this.alwaysScrollToBottom || (this.$refs.scrollList.scrollTop > this.$refs.scrollList.scrollHeight - 300)
    }
  },
  mounted () {
    this._scrollDown()
  },
  updated () {
    if (this.shouldScrollToBottom())
      this.$nextTick(this._scrollDown())
  }
}
</script>

<style scoped>
.sc-message-list {
  height: 80%;
  overflow-y: auto;
  background-size: 100%;
  padding: 40px 0px;
}
</style>
