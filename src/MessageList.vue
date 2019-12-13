<template>
  <div class="sc-message-list" :class="scrollClass" ref="scrollList" :style="{backgroundColor: colors.messageList.bg}">
    <Message v-for="(message, idx) in messages"
             :message="message"
             :read="message.read"
             :chatImageUrl="chatImageUrl"
             :key="message.id"
             :colors="colors"
             :onButtonClick="onButtonClick"
             :onLinkClick="onLinkClick"
             :onListButtonClick="onListButtonClick"
             :onFormButtonClick="onFormButtonClick" />
    <Message v-show="showTypingIndicator"
             :message="{author: 'them', type: 'typing'}"
             :chatImageUrl="chatImageUrl"
             :colors="colors"
             :onLinkClick="onLinkClick"
             :onButtonClick="onButtonClick"
             :onListButtonClick="onListButtonClick"
             :onFormButtonClick="onFormButtonClick" />
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
    },
    onFormButtonClick: {
      type: Function,
      required: true
    },
    onListButtonClick: {
      type: Function,
      required: true
    },
    onLinkClick: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      scrollClass: ''
    }
  },
  methods: {
    _scrollDown () {
      if (this.$refs.scrollList) {
        this.$refs.scrollList.scrollTop = this.$refs.scrollList.scrollHeight
      }
    },
    _disableScroll () {
      this.scrollClass = 'no-scroll'
    },
    _enableScroll () {
      this.scrollClass = ''
    },
    shouldScrollToBottom() {
      return this.alwaysScrollToBottom || (this.$refs.scrollList.scrollTop > this.$refs.scrollList.scrollHeight - 300)
    }
  },
  mounted () {
    this._scrollDown()
    this.$root.$on('scroll-down-message-list', () => {
      this._scrollDown()
    })
    this.$root.$on('disable-message-list-scroll', () => {
      this._disableScroll()
    })
    this.$root.$on('enable-message-list-scroll', () => {
      this._enableScroll()
    })
  },
  updated () {
    if (this.shouldScrollToBottom())
      this.$nextTick(this._scrollDown())
  }
}
</script>

<style scoped>
.sc-message-list {
  height: 100%;
  overflow-y: auto;
  background-size: 100%;
  padding: 20px 0px;
}

.sc-message-list.no-scroll {
  overflow-y: hidden;
}

.sc-chat-window.fullscreen .sc-message-list {
  padding-left: 20px;
  padding-right: 20px;
}
</style>
