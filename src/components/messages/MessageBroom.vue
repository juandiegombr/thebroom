<template>
  <transition name="message">
    <div
        v-if="show"
        class="hand-result"
    >
        <div class="message message-broom is-spinning">
          <i class="fas fa-broom"></i>
          BROOM!
        </div>
      </div>
  </transition>
</template>

<script>
export default {
  components: {
  },
  props: {
    player: {
      type: String,
      required: false
    }
  },
  data () {
      return {
          show: false
      }
  },
  computed: {
    turn () {
      return this.$store.state.turn
    }
  },
  watch: {
    turn (value) {
      if (value === 'player')
      this.show = true
      setTimeout(() => {
        this.show = false
      }, 2000)
    }
  },
  methods: {
      timer () {
          this.show = !this.show
      }
  },
  mounted () {
      // setInterval(this.timer, 2000)
  }
}
</script>

<style lang="scss">
.hand-result {
  position: absolute;
  width: 100%;
  text-align: center;
  z-index: 99;
}
.message {
  position: absolute;
  width: fit-content;
  height: fit-content;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  border-radius: 5px;
  text-align: center;
  z-index: 99;
  padding: 1rem 2rem;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 30px, rgba(0, 0, 0, 0.23) 0px 6px 10px;
  &.message-broom {
    background-color: #ffa547;
    color: white;
    font-size: 3rem;
  }
}
.message-enter-active {
  transition: all .3s ease-in-out;
}
.message-leave-active {
  transition: all .8s ease-in-out;
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

