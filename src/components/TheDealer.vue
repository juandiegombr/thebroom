<template>
  <div class="the-dealer">
    <!-- <message-ok player="dealer"/> -->
    <transition-group name="deal" tag="div" class="the-dealer-hand">
      <Card v-for="(card, i) in $store.state.hands[1].cards" :key="i + 10" :index="i" :card="card"/>
    </transition-group>
  </div>
</template>

<script>
import Card from './Card'
import MessageOk from '@/components/messages/MessageOk'
import { mapState } from 'vuex'
import { getAllCombinations, getPlays, getBestPlay } from '@/utils/game'

export default {
  name: 'TheDealer',
  computed: {
    ...mapState(['turn', 'commonCards']),
    dealerCards () {
      return this.$store.state.hands[1].cards
    },
    playerCards () {
      return this.$store.state.hands[0].cards
    }
  },
  watch: {
    turn (newTurn) {
      if (newTurn === 'dealer') {
        this.play()
      }
    }
  },
  methods: {
    play () {
      const combinations = getAllCombinations(this.commonCards)
      const plays = getPlays(this.dealerCards, combinations)
      const bestPlay = getBestPlay(plays)
      console.log('dealerCards', this.dealerCards)
      console.log(plays)
      console.log(bestPlay)
      if (bestPlay.length > 0) {
        this.$store.dispatch('dealerPlay', bestPlay)
          .then(() => {
            setTimeout(() => {
              this.$store.dispatch('correctPlay')
              if (this.playerCards.length === 0 && this.dealerCards.length === 0) {
                this.$store.dispatch('startDeal')
              }
            }, 3000)
          })
      } else {
        this.$store.commit('selectCard', {card: this.dealerCards[0], index: 0, player: 'dealer'})
            setTimeout(() => {
              this.$store.dispatch('dealerPass', {player: 1, card: this.dealerCards[0]})
              if (this.playerCards.length === 0 && this.dealerCards.length === 0) {
                this.$store.dispatch('startDeal')
              }
            }, 3000)
      }
    }
  },
  components: {
    Card,
    MessageOk
  }
}
</script>

<style lang="scss">
.the-dealer {
  display: flex;
  position: absolute;
  top: 60px;
}
.the-dealer-hand {
  display: flex;
}
</style>
