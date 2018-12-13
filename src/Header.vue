<template>
  <div class="sc-header" @click="onClose" :style="{background: colors.header.bg, color: colors.header.text}">
    <div v-if="showExpandButton" @click.stop="onExpand" class="sc-header--expand-button">
      <img src="./assets/pop_out.svg" />
    </div>
    <img v-if="imageUrl" class="sc-header--img" :src="imageUrl" alt="" />
    <div class="sc-header--team-name">{{teamName}}</div>
    <div class="sc-header--minimize-button">
      <img src="./assets/down-arrow.svg" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    imageUrl: {
      type: String,
    },
    teamName: {
      type: String
    },
    onClose: {
      type: Function,
      required: true
    },
    onExpand: {
      type: Function,
      required: true
    },
    showExpandButton: {
      type: Boolean,
      default: true
    },
    colors: {
      type: Object,
      required: true
    }
  }
}
</script>
<style scoped>
.sc-header {
  min-height: 56px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  padding: 10px;
  box-shadow: 0 1px 4px rgba(0,0,0,.2);
  position: relative;
  box-sizing: border-box;
  display: flex;
  cursor: pointer;
}

.sc-header--img {
  align-self: center;
  padding: 10px;
}

.sc-header--team-name {
  align-self: center;
  padding: 10px;
  flex: 1;
  user-select: none;
}

.sc-header--expand-button {
  width: 40px;
  align-self: center;
  height: 40px;
  margin-right: 10px;
  box-sizing: border-box;
  display: none;
}

.sc-header--expand-button img {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}
.sc-chat-window.expanded .sc-header--expand-button img {
  transform: rotate(180deg);
}

.sc-header--minimize-button {
  width: 40px;
  align-self: center;
  height: 40px;
  margin-right: 10px;
  box-sizing: border-box;
  display: none;
}

.sc-header--minimize-button img {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}
.sc-chat-window.closed .sc-header--minimize-button img {
  transform: rotate(180deg);
}

</style>
