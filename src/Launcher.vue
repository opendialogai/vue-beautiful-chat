<template>
  <div>
    <ChatWindow
      :messageList="messageList"
      :onUserInputSubmit="onMessageWasSent"
      :agentProfile="agentProfile"
      :isOpen="isOpen"
      :onClose="close"
      :onButtonClick="onButtonClick"
      :onFormButtonClick="onFormButtonClick"
      :contentEditable="contentEditable"
      :showEmoji="showEmoji"
      :showFile="showFile"
      :placeholder="placeholder"
      :showTypingIndicator="showTypingIndicator"
      :colors="colors"
      :alwaysScrollToBottom="alwaysScrollToBottom"
      :showLongTextInput="showLongTextInput"
      :showMessages="showMessages"
      :maxInputCharacters="maxInputCharacters"
      :headerText="headerText"
      :buttonText="buttonText"
      :initialText="initialText"
    />
  </div>
</template>
<script>
import ChatWindow from './ChatWindow.vue'

export default {
  props: {
    contentEditable: {
      type: Boolean,
      default: true
    },
    showEmoji: {
      type: Boolean,
      default: false
    },
    isOpen: {
      type: Boolean,
      required: true
    },
    open: {
      type: Function,
      required: true
    },
    close: {
      type: Function,
      required: true
    },
    showFile: {
      type: Boolean,
      default: false
    },
    agentProfile: {
      type: Object,
      required: true
    },
    onMessageWasSent: {
      type: Function,
      required: true
    },
    messageList: {
      type: Array,
      default: () => []
    },
    newMessagesCount: {
      type: Number,
      default: () => 0
    },
    placeholder: {
      type: String,
      default: 'Write a reply'
    },
    showTypingIndicator: {
      type: Boolean,
      default: () => true
    },
    showLongTextInput: {
      type: Boolean,
      default: () => false
    },
    showMessages: {
      type: Boolean,
      default: () => true
    },
    maxInputCharacters: {
      type: Number,
      default: 0
    },
    headerText: {
      type: String,
      default: ''
    },
    buttonText: {
      type: String,
      default: 'Submit'
    },
    onButtonClick: {
      type: Function,
      required: true
    },
    onFormButtonClick: {
      type: Function,
      required: true
    },
    initialText: {
       type: String,
       default: null
    },
    colors: {
      type: Object,
      required: false,
      validator: c => 
        'header' in c
        && 'bg' in c.header && 'text' in c.header
        && 'launcher' in c
        && 'bg' in c.launcher
        && 'messageList' in c
        && 'bg' in c.messageList
        && 'sentMessage' in c
        && 'bg' in c.sentMessage && 'text' in c.sentMessage
        && 'receivedMessage' in c
        && 'bg' in c.receivedMessage && 'text' in c.receivedMessage
        && 'userInput' in c
        && 'bg' in c.userInput && 'text' in c.userInput,
      default: function () {
        return {
          header: {
            bg: '#4e8cff',
            text: '#ffffff'
          },
          launcher: {
            bg: '#4e8cff'
          },
          messageList: {
            bg: '#ffffff'
          },
          sentMessage: {
            bg: '#4e8cff',
            text: '#ffffff'
          },
          receivedMessage: {
            bg: '#f4f7f9',
            text: '#ffffff'
          },
          userInput: {
            bg: '#f4f7f9',
            text: '#565867'
          }
        }
      }
    },
    alwaysScrollToBottom: {
      type: Boolean,
      default: () => false
    }
  },
  data () {
    return {

    }
  },
  components: {
    ChatWindow
  }
}
</script>
<style scoped>

</style>
