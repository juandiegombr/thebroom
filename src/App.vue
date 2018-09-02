<template>
  <div id="app">
    <TheGameArea/>
    <Menu/>
    <ThePlayButton/>
    <Card v-for="(card, index) in deck" :key="index" :card="card" :index="0" :position="0"/>
    <CardPositionMark v-for="index in [0,1,2]" :key="index + 999" :positionIndex="index" position="dealer"/>
    <CardPositionMark v-for="index in [0,1,2]" :key="index + 99 " :positionIndex="index" position="player"/>
  </div>
</template>

<script>
import TheGameArea from '@/components/TheGameArea'
import ThePlayButton from '@/components/ThePlayButton'
import Card from '@/components/Card'
import CardPositionMark from '@/components/CardPositionMark'
import Menu from '@/components/Menu'
import MessageOk from '@/components/messages/MessageOk'
import { mapState } from 'vuex'
export default {
  name: 'app',
  computed: {
    ...mapState(['status', 'turn', 'deal', 'deck', 'playerCards', 'dealerCards']),
    test () {
      return this.$store.state.restart
    },
    playersCards () {
      return this.playerCards.length + this.dealerCards.length
    }
  },
  watch: {
    playersCards (value) {
      if (!value && !this.test && this.status !== 'finished') {
        this.$store.dispatch('startDeal')
      }
    },
    restart (value) {
      console.log(value, this.playersCards)
    }
  },
  mounted () {
    this.$store.dispatch('startBroomGame')
  },
  components: {
    Menu,
    Card,
    CardPositionMark,
    TheGameArea,
    ThePlayButton,
    MessageOk
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
button {
  font-family: 'Montserrat', 'sans-serif';
  &:focus {
    outline: none
  }
}
#app {
  font-family: 'Montserrat', 'sans-serif';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.game-area {
  display: grid;
  box-sizing: border-box;
  height: 100%;
  padding: 60px;
  grid-template-columns: 10% 10% 10% 10% 10% 10% 10% 10% 10% 10%;
  grid-template-rows: 25% 25% 25% 25%;
  justify-content: center;
  align-items: center;
}
</style>
