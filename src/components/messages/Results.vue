<template>
  <div>
    <transition name="wrapper">
      <div
        v-if="status === 'finished'"
        class="message-wrapper">
      </div>
    </transition>
    <transition name="message">
      <div 
      v-if="status === 'finished'"
      class="message-result"
      :class="{smartphone: device === 'smartphone'}">
      <div v-if="isFinished" class="finish-message">
        <div v-if="winner === 'player'">
          <i class="far fa-thumbs-up"></i>
          You won!
        </div>
        <div v-else>
          <i class="far fa-thumbs-down"></i>
          You lost!
        </div>
      </div>
        <table>
          <tr>
            <th v-for="(column, i) in columns" :key="i">{{ column }}</th>
          </tr>
          <tr v-for="(row, i) in rows" :key="i">
            <td v-for="(data, i) in row" :key="i+10">{{ data }}</td>
          </tr>
        </table>
      <div class="buttons" :style="{gridTemplateColumns: isFinished ? '1fr' : '1fr 1fr'}">
				<button class="the-button" @click="newGame">
					START A NEW GAME
				</button>
				<button v-if="!isFinished" class="the-button" @click="newRound">
					NEXT ROUND
        </button>
      </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
      return {
          show: false,
          table: [
            ['Player', 1, 2, 3],
            ['Dealer', 1, 2, 3],
          ]
      }
  },
  computed: {
    ...mapState(['results', 'round', 'status', 'device', 'gamePoints']),
    columns () {
      let columns = ['Round']
      for (let i = 0; i <= this.round; i++) {
        if (i === this.round) {
          columns.push('Total')
        } else {
          columns.push(i + 1)
        }
      }
      return columns
    },
    rows () {
      let rows = [['Player'],['Dealer']]
      for (let i = 0; i <= this.results.player.length; i++) {
        if (i === this.results.player.length) {
          const total = this.results.player.reduce((a, b) => a + b, 0)
          rows[0].push(total)
        } else {
          rows[0].push(this.results.player[i])
        }
      }
      for (let i = 0; i <= this.results.dealer.length; i++) {
        if (i === this.results.dealer.length) {
          const total = this.results.dealer.reduce((a, b) => a + b)
          rows[1].push(total)
        } else {
          rows[1].push(this.results.dealer[i])
        }
      }
      return rows
    },
    total () {
      return {
        player: this.results.player.reduce((a, b) => a + b),
        dealer: this.results.dealer.reduce((a, b) => a + b)
      }
    },
    isFinished () {
      return this.total.player >= this.gamePoints || this.total.dealer >= this.gamePoints
    },
    winner () {
      let winner
      if (this.isFinished) {
        winner = this.total.player >= this.gamePoints ? 'player' : 'dealer'
      }
      return winner
    }
  },
  watch: {
    status (newValue) {
      if (status === 'finished') {
        console.log('new results')
      }
    }
  },
  methods: {
    timer () {
        this.show = !this.show
    },
		newRound () {
			this.$store.dispatch('newRound')
		},
		newGame () {
			this.$store.dispatch('resetGame')
		}
  },
  mounted () {
      // setInterval(this.timer, 2000)
  }
}
</script>

<style lang="scss">
.message-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.5);
}
.message-result {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: fit-content;
  box-sizing: border-box;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  border-radius: 5px;
  text-align: center;
  z-index: 999;
  padding: 2rem;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 30px, rgba(0, 0, 0, 0.23) 0px 6px 10px;
  background: linear-gradient(135deg, #0c2430 1%, #0c2430 49%, #0c2430 100%);
  color: rgb(186, 186, 186);
  font-size: 2rem;

  &.smartphone {
    width: 100vw;
    height: 100vh;
  }
  .finish-message {
    margin-bottom: 2rem;
  }
  .buttons {
    display: grid;
    grid-gap: 1rem;
    margin-top: 2rem;
    .the-button {
      user-select: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 15px;
      background-color: transparent;
      border: 0.1rem solid rgb(186, 186, 186);
      font-weight: 700;
      font-size: 17px;
      color: white;
      // color: rgb(186, 186, 186);
      box-sizing: border-box;
      // box-shadow: 0 3px 0 0 rgba(0,0,0,.25);
      transition: all .5s;
      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }
    .fa-right {
      margin-left: .5rem;
    }
  }
  table {
    border-spacing: 0;
    td {
      min-width: 3rem;
    }
    tr:nth-child(1) {
      th {
        border-bottom: 1px solid #777;
        padding: 0 1rem 1rem;
      }
    }
    tr:last-child {
      td {
        padding: 1rem 1rem 0;
      }
    }
    tr{
      th, td {
        border-right: 1px solid #777;
        padding: 1rem;
      }
    }
    tr{
      th:last-child, td:last-child {
        border-right: none;
      }
    }
  }
}
.wrapper-enter-active {
  transition: all 1s ease-in-out;
}
.wrapper-leave-active {
  transition: all 1s ease-in-out;
}
.wrapper-enter {
  background-color: rgba(0, 0, 0, 0);
}
.wrapper-enter-to {
  background-color: rgba(0, 0, 0, 0.5);
}
.wrapper-leave-to {
  background-color: rgba(0, 0, 0, 0);
}
.message-enter-active {
  transition: all 1s ease-in-out;
}
.message-leave-active {
  transition: all 1s ease-in-out;
}
.message-enter {
  transform: translateX(100px);
  opacity: 0;
}
.message-leave-to {
  transform: translateX(-100px);
  opacity: 0;
}
.is-spinningg {
  animation: spin 1s ease;
  transform-origin: center;
  transform-box: fill-box;
  transform-style: preserve-3d;
  backface-visibility: hidden;
}
@keyframes spin {
  0% {
    transform: rotateX(0);
  }
  100% {
    transform: rotateX(1160deg);
  }
}

</style>

