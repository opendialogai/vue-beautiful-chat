<template>
  <div :style="{background: backgroundColor}">
    <beautiful-chat
      :agentProfile="agentProfile"
      :expand="expandChat"
      :is-expand="isExpand"
      :on-message-was-sent="onMessageWasSent"
      :messageList="messageList"
      :newMessagesCount="newMessagesCount"
      :isOpen="isChatOpen"
      :close="closeChat"
      :open="openChat"
      :on-button-click="onButtonClick"
      :on-form-button-click="onFormButtonClick"
      :on-list-button-click="onListButtonClick"
      :on-link-click="onLinkClick"
      :showEmoji="true"
      :showFile="true"
      :showTypingIndicator="showTypingIndicator"
      :colors="colors"
      :alwaysScrollToBottom="alwaysScrollToBottom"
      :fullScreen="true" />
  </div>
</template>

<script>
import messageHistory from './messageHistory'
import availableColors from './colors'

export default {
  name: 'app',
  data() {
    return {
      agentProfile: {
        teamName: 'Vue Beautiful Chat',
        imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
      },
      messageList: messageHistory,
      newMessagesCount: 0,
      isChatOpen: true,
      isExpand: false,
      showTypingIndicator: false,
      colors: null,
      availableColors,
      chosenColor: null,
      alwaysScrollToBottom: false
    }
  },
  created() {
    this.setColor('blue')
  },
  methods: {
    handleMessageFromTextArea (text) {
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
        this.messageList.push({author: 'them', type: 'text', data: { text }})
      }
    },
    handleTyping (text) {
      this.showTypingIndicator = text.length > 0;
    },
    onMessageWasSent (msg) {
      this.messageList.push(msg)
    },
    openChat () {
      this.isChatOpen = true
      this.newMessagesCount = 0
    },
    closeChat () {
      this.isChatOpen = false
    },
    onButtonClick() {

    },
    onFormButtonClick(data, msg) {

    },
    onLinkClick(url) {

    },
    onListButtonClick(callback) {

    },
    expandChat() {

    },
    setColor (color) {
      this.colors = this.availableColors[color]
      this.chosenColor = color
    }
  },
  computed: {
    linkColor() {
      return this.chosenColor === 'dark' ? this.colors.sentMessage.text : this.colors.launcher.bg
    },
    backgroundColor() {
      return this.chosenColor === 'dark' ? this.colors.messageList.bg : '#fff'
    }
  }
}
</script>

<style>
body {
  padding: 0px;
  margin: 0px;
}

* {
  font-family: Avenir Next, Helvetica Neue, Helvetica,sans-serif;
}

.demo-description {
  max-width: 500px;
}

.demo-description img {
  max-width: 500px;
}

.demo-test-area {
  width: 300px;
  box-sizing: border-box;
}

.demo-test-area--text {
  box-sizing: border-box;
  width: 100%;
  margin: 0px;
  padding: 0px;
  resize: none;
  font-family: Avenir Next, Helvetica Neue, Helvetica,sans-serif;
  background: #fafbfc;
  color: #8da2b5;
  border: 1px solid #dde5ed;
  font-size: 16px;
  padding: 16px 15px 14px;
  margin: 0;
  border-radius: 6px;
  outline: none;
  height: 150px;
  margin-bottom: 10px;
}

.demo-monster-img {
  width: 400px;
  display: block;
  margin: 60px auto;
}

.text-center {
  text-align: center;
}

.colors a {
  color: #fff;
  text-decoration: none;
  padding: 4px 10px;
  border-radius: 10px;
}

.toggle a {
  text-decoration: none;
}
</style>